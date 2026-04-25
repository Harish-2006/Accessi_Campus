import os
import time
import csv
import docx
import PyPDF2
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room, leave_room
from dotenv import load_dotenv

# --- 1. Setup ---
load_dotenv()

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
# CORS fully enabled for localhost:3000 (React frontend)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SECRET_KEY'] = 'your-very-secret-key!'

# Wrap Flask app with SocketIO (for WebSockets)
socketio = SocketIO(app, cors_allowed_origins="*")

# --- Hardcoded Login Credentials ---
VALID_USERNAME = "Swarna"
VALID_PASSWORD = "Swarna@2006"

# --- Login route with OPTIONS handling ---
@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    """Simple login route for React frontend"""
    # Respond OK to preflight request
    if request.method == 'OPTIONS':
        return '', 200

    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No data provided"}), 400

        username = data.get("username")
        password = data.get("password")

        if username == VALID_USERNAME and password == VALID_PASSWORD:
            return jsonify({"success": True, "message": "Login successful"}), 200
        else:
            return jsonify({"success": False, "message": "Invalid username or password"}), 401
    except Exception as e:
        return jsonify({"success": False, "message": f"Server error: {str(e)}"}), 500

# --- 2. Campus Navigation with Coordinates ---
campus_routes = {
    "library": {
        "destination": "Central Library",
        "time": "4 minutes",
        "steps": [
            {"instruction": "From main entrance, walk straight.", "distance": "100m", "lat": 12.9716, "lng": 77.5946},
            {"instruction": "Turn left at the fountain.", "distance": "50m", "lat": 12.9718, "lng": 77.5948},
            {"instruction": "The Library is in front of you.", "distance": "75m", "lat": 12.9720, "lng": 77.5950},
        ]
    },
    "canteen": {
        "destination": "Main Canteen",
        "time": "2 minutes",
        "steps": [
            {"instruction": "From main entrance, take first right.", "distance": "60m", "lat": 12.9716, "lng": 77.5946},
            {"instruction": "Walk past CSE department.", "distance": "40m", "lat": 12.9717, "lng": 77.5949},
            {"instruction": "The canteen is on your right.", "distance": "20m", "lat": 12.9718, "lng": 77.5950},
        ]
    },
    "cse block": {
        "destination": "CSE Department Block",
        "time": "2 minutes",
        "steps": [
            {"instruction": "From main entrance, take first right.", "distance": "60m", "lat": 12.9716, "lng": 77.5946},
            {"instruction": "CSE Block is first building on left.", "distance": "30m", "lat": 12.9717, "lng": 77.5948},
        ]
    },
}

@app.route('/api/navigate', methods=['POST', 'OPTIONS'])
def get_route():
    if request.method == 'OPTIONS':
        return '', 200

    dest = request.json.get("destination", "").lower().strip()

    if not dest:
        return jsonify({"error": "Destination required"}), 400

    route = None
    for key in campus_routes:
        if key in dest:
            route = campus_routes[key]
            break

    if route:
        return jsonify(route)
    else:
        return jsonify({
            "destination": dest,
            "time": "N/A",
            "steps": [{"instruction": f"Route to {dest} not found", "distance": "", "lat": 0, "lng": 0}]
        }), 404

@app.route('/api/locations', methods=['GET', 'OPTIONS'])
def get_locations():
    if request.method == 'OPTIONS':
        return '', 200

    return jsonify([
        {"id": 1, "name": "Library"},
        {"id": 2, "name": "Canteen"},
        {"id": 3, "name": "CSE Block"}
    ])

# --- 3. File Upload/Download API ---
@app.route('/api/upload', methods=['POST', 'OPTIONS'])
def upload_file():
    if request.method == 'OPTIONS':
        return '', 200

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    filename = file.filename
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    extracted_text = ""
    try:
        if filename.endswith('.pdf'):
            with open(filepath, 'rb') as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    extracted_text += page.extract_text() + "\n"
        elif filename.endswith('.docx'):
            doc = docx.Document(filepath)
            extracted_text = '\n'.join([para.text for para in doc.paragraphs])
        elif filename.endswith('.csv'):
            with open(filepath, mode='r', encoding='utf-8') as f:
                extracted_text = "\n".join([" ".join(row) for row in csv.reader(f)])
        else:
            return jsonify({'error': 'Unsupported file type.'}), 415
    except Exception as e:
        extracted_text = f"Could not extract text. Error: {e}"

    return jsonify({
        'filename': filename,
        'text': extracted_text,
        'download_url': f'/api/download/{filename}'
    }), 200

@app.route('/api/download/<filename>', methods=['GET', 'OPTIONS'])
def download_file(filename):
    if request.method == 'OPTIONS':
        return '', 200
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# --- 4. WebSocket Handlers ---
@socketio.on('connect')
def handle_connect():
    print('Client connected:', request.sid)

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected:', request.sid)

@socketio.on('join_session')
def handle_join_session(data):
    username = data.get('username', 'Anonymous')
    room = data.get('room', 'default_session')
    join_room(room)
    print(f'{username} joined {room}')
    emit('receive_message', {'user': 'System', 'text': f'{username} has joined the session.'}, room=room)

@socketio.on('send_message')
def handle_send_message(data):
    room = data.get('room', 'default_session')
    emit('receive_message', data, room=room)

# --- 5. Run the App ---
if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, host="0.0.0.0")
