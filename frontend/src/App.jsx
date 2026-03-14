import { useState, useRef } from 'react';
import './index.css';


function App() {
    const [meetingCode, setMeetingCode] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    const [copyStatus, setCopyStatus] = useState('MeetingLink');
    const [isFocused, setIsFocused] = useState(false);

    // const handleNewMeeting = () => {
    //     // Generate a secure mock meeting ID
    //     const chars = 'abcdefghijklmnopqrstuvwxyz';
    //     const segment = (len) => Array.from({ length: len }).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    //     const meetingId = `${segment(3)}-${segment(4)}-${segment(3)}`;

    //     // Construct frontend URL (in real app, could point to /room/:id)
    //     const baseUrl = window.location.origin;
    //     const link = `${baseUrl}/${meetingId}`;

    //     setGeneratedLink(link);
    //     setCopyStatus(link);
    // };

    const handleNewMeeting = async () => {
        try {

        const res = await fetch('http://localhost:5001/api/meeting/create',{
            method: 'POST',
        });
        const data = await res.json();

        const MeetingId = data.meetingId;
        const baseUrl = window.location.origin;
        const link = `${baseUrl}/room/${MeetingId}`;
        
        setGeneratedLink(link);
        setCopyStatus(link);

        }
        catch(err){
            console.error('Error creating meeting:', err);
            alert('Failed to create meeting. Please try again.');
        }
    };

    const handleCopyLink = () => {
        if (!generatedLink) {
            alert('Please click "New Meeting" to generate a link first.');
            return;
        }

        navigator.clipboard.writeText(generatedLink).then(() => {
            setCopyStatus('Copied!');
            setTimeout(() => setCopyStatus(generatedLink), 2000);
        }).catch(err => {
            console.error('Failed to copy', err);
            alert('Failed to copy. Please manually copy: ' + generatedLink);
        });
    };

    const handleJoin = () => {
        if (meetingCode.trim()) {
            alert(`Joining meeting with code: ${meetingCode}`);
            // Typically: window.location.href = `/${meetingCode}`;
        } else {
            alert('Please enter a valid meeting code or link.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleJoin();
        }
    };

    return (
        <main className="container">
            <h1 className="headline">Video Calls and Meetings for Everyone</h1>

            <div className="actions-wrapper">
                <button className="action-btn" onClick={handleNewMeeting}>
                    <i className="fa-solid fa-video"></i>
                    <span>New Meeting</span>
                </button>

                <div className={`input-group ${isFocused ? 'focused' : ''}`}>
                    <div className="input-wrapper">
                        <i className="fa-regular fa-keyboard"></i>
                        <input
                            type="text"
                            placeholder="Enter a code or link"
                            className="meeting-input"
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                            onKeyDown={handleKeyPress}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    <button className="join-btn" onClick={handleJoin}>Join</button>
                </div>

                <button className="action-btn" onClick={handleCopyLink}>
                    <i className={copyStatus === 'Copied!' ? 'fa-solid fa-check' : 'fa-solid fa-link'}></i>
                    <span>{copyStatus}</span>
                </button>
            </div>
        </main>
    );
}

export default App;
