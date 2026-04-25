import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search, Send, Mic, Eye, Loader2, ArrowLeft, ArrowRight, Repeat } from 'lucide-react';
import MapView from '../components/MapView';
import ToggleSwitch from '../components/ToggleSwitch';

const API_BASE_URL = 'http://localhost:5000';

const CampusNavigation = () => {
  // --- STATE MANAGEMENT ---
  const [inputMode, setInputMode] = useState('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [activeRoute, setActiveRoute] = useState(null);
  const [quickDestinations, setQuickDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // State for new toggles
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [hapticAlert, setHapticAlert] = useState(true);

  const recognitionRef = useRef(null);

  // --- SPEECH RECOGNITION SETUP ---
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      handleSearch(transcript);
    };
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
    recognitionRef.current = recognition;
  }, []);

  // --- DATA FETCHING ---
useEffect(() => {
  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/locations`);

      setQuickDestinations(response.data.slice(0, 3));
    } catch (err) {
      console.error("Failed to fetch locations", err);
    }
  };

  fetchLocations();
}, []);

  // --- HELPER FUNCTIONS ---
  const speak = (text) => {
    if (voiceGuidance && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const triggerHaptic = () => {
    if (hapticAlert && 'vibrate' in navigator) {
      navigator.vibrate(200);
    }
  };

  // --- HANDLER FUNCTIONS ---
  const handleToggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setSearchQuery('');
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleSearch = async (queryOverride) => {
    const query = queryOverride || searchQuery;
    if (!query.trim()) return;
    setIsLoading(true);
    setError('');
    setActiveRoute(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/navigate`, { destination: query });
      setActiveRoute(response.data);
      setCurrentStepIndex(0);
      if (response.data?.steps?.[0]?.instruction) {
        speak(response.data.steps[0].instruction);
        triggerHaptic();
      }
    } catch (err) {
      setError("Could not calculate the route.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleNextStep = () => {
    if (activeRoute && currentStepIndex < activeRoute.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      speak(activeRoute.steps[nextIndex].instruction);
      triggerHaptic();
    }
  };

  const handlePreviousStep = () => {
    if (activeRoute && currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      speak(activeRoute.steps[prevIndex].instruction);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>Campus Navigation</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
          Get voice-guided or visual directions to any campus location.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Left Column: Input and Quick Destinations (No Changes Here) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="card">
             <h3 style={{ marginTop: 0 }}>Find Your Destination</h3>
             <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
               <button onClick={() => setInputMode('voice')} className={`btn ${inputMode === 'voice' ? 'btn-primary' : ''}`} style={inputMode !== 'voice' ? {backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)'} : {}}>
                 <Mic size={20}/> Voice Guidance
               </button>
               <button onClick={() => setInputMode('text')} className={`btn ${inputMode === 'text' ? 'btn-primary' : ''}`} style={inputMode !== 'text' ? {backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)'} : {}}>
                 <Eye size={20}/> Visual Directions
               </button>
             </div>
             {inputMode === 'text' ? (
               <div style={{ display: 'flex', gap: '0.5rem' }}>
                 <input
                   type="text"
                   placeholder="Enter building, room, or service..."
                   className="form-input"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                 />
                 <button onClick={() => handleSearch()} className="btn btn-primary" disabled={isLoading}>
                   {isLoading ? <Loader2 size={20} className="animate-spin"/> : <Send size={20} />}
                 </button>
               </div>
             ) : (
               <div style={{ textAlign: 'center' }}>
                 <button onClick={handleToggleRecording} className="btn btn-primary" style={{ padding: '1rem', height: 'auto', borderRadius: '50%', width: '80px', height: '80px' }}>
                   <Mic size={32} />
                 </button>
                 <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', minHeight: '1.5rem' }}>
                   {isRecording ? "Listening..." : (searchQuery ? `Heard: "${searchQuery}"` : "Click the microphone to speak")}
                 </p>
               </div>
             )}
          </div>
          <div className="card">
             <h3 style={{ marginTop: 0 }}>Quick Destinations</h3>
             {quickDestinations.map(dest => (<p key={dest.id}>{dest.name}</p>))}
          </div>
        </div>

        {/* Right Column: Active Route Panel (Updated with Map and Toggles) */}
        <div className="right-column">
          {isLoading && <div className="card" style={{textAlign: 'center'}}><Loader2 className="animate-spin" size={32} /></div>}
          {error && <div className="card"><p style={{color: 'red'}}>{error}</p></div>}
          
          {!isLoading && activeRoute ? (
            <div className="navigation-panel card">
              {/* MAP VIEW ADDED HERE */}
              <MapView route={activeRoute} currentStepIndex={currentStepIndex} />
              
              {/* Audio Controls for Steps */}
              <div className="current-step-details">
                <p className="step-instruction">{activeRoute.steps[currentStepIndex].instruction}</p>
                <div className="audio-controls">
                  <button onClick={handlePreviousStep} disabled={currentStepIndex === 0} className="btn"><ArrowLeft size={20}/></button>
                  <button onClick={() => speak(activeRoute.steps[currentStepIndex].instruction)} className="btn btn-primary"><Repeat size={20}/></button>
                  <button onClick={handleNextStep} disabled={currentStepIndex === activeRoute.steps.length - 1} className="btn"><ArrowRight size={20}/></button>
                </div>
              </div>

              {/* Full Route List */}
              <ol className="full-route-list">
                {activeRoute.steps.map((step, index) => (
                  <li key={index} className={index === currentStepIndex ? 'active-step' : ''}>
                    {step.instruction} <span>{step.distance}</span>
                  </li>
                ))}
              </ol>

              {/* SETTINGS TOGGLES ADDED HERE */}
              <div className="settings-toggles" style={{borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem'}}>
                <ToggleSwitch 
                  label="Voice Guidance" 
                  checked={voiceGuidance}
                  onChange={() => setVoiceGuidance(!voiceGuidance)}
                />
                <ToggleSwitch 
                  label="Haptic Alert" 
                  checked={hapticAlert}
                  onChange={() => setHapticAlert(!hapticAlert)}
                />
              </div>
            </div>
          ) : (
            !isLoading && !error &&
            <div className="card">
              <h3>Active Route</h3>
              <p style={{color: 'var(--text-secondary)'}}>Search for a destination to see the route here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampusNavigation;