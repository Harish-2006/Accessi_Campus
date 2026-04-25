# backend/database.py
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables from .env
load_dotenv()
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

# Initialize Supabase client
supabase: Client = create_client(url, key)
print("Supabase client initialized.")

def seed_locations():
    """Inserts additional sample data into the locations table."""
    print("Seeding locations table...")
    try:
        data, count = supabase.table('locations').insert([
            {'name': 'Arts & Humanities Hall', 'category': 'Academic', 'description': 'Lecture halls for arts, history, and literature.'},
            {'name': 'Campus Gymnasium', 'category': 'Recreation', 'description': 'Basketball courts, weight room, and swimming pool.'}
        ]).execute()
        print(f"Successfully inserted data.")
    except Exception as e:
        print(f"Error seeding database: {e}")

if __name__ == "__main__":
    # This block runs when you execute `python database.py` in the terminal
    seed_locations()