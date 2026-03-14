document.addEventListener('DOMContentLoaded', () => {
    // Select our action buttons and elements
    const newMeetingBtn = document.querySelectorAll('.action-btn')[0];
    const meetingLinkBtn = document.querySelectorAll('.action-btn')[1];
    const meetingLinkText = meetingLinkBtn.querySelector('span');
    const meetingLinkIcon = meetingLinkBtn.querySelector('i');

    const joinBtn = document.querySelector('.join-btn');
    const inputField = document.querySelector('.meeting-input');

    let generatedLink = "";

    function generateMeetingLink() {
        // Generate a random mock meeting ID like abc-defg-hij
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        const segment = (len) => Array.from({ length: len }).map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
        const meetingId = `${segment(3)}-${segment(4)}-${segment(3)}`;

        // Use the current domain, fallback to a dummy domain if opened as a local file
        const baseUrl = (window.location.origin === "null" || window.location.origin === "file://")
            ? "https://seeu.app" : window.location.origin;
        return `${baseUrl}/${meetingId}`;
    }

    newMeetingBtn.addEventListener('click', () => {
        generatedLink = generateMeetingLink();
        meetingLinkText.textContent = generatedLink;

        // Reset icon in case it was a checkmark previously
        meetingLinkIcon.className = "fa-solid fa-link";
    });

    meetingLinkBtn.addEventListener('click', () => {
        if (!generatedLink) {
            // Can add a small visual shake or alert here if no link generated
            alert('Please click "New Meeting" to generate a link first.');
            return;
        }

        // Copy to clipboard
        navigator.clipboard.writeText(generatedLink).then(() => {
            // Visual feedback loop
            const originalText = meetingLinkText.textContent;
            meetingLinkText.textContent = 'Copied!';
            meetingLinkIcon.className = "fa-solid fa-check";

            setTimeout(() => {
                meetingLinkText.textContent = originalText;
                meetingLinkIcon.className = "fa-solid fa-link";
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy link. Please manually copy: ' + generatedLink);
        });
    });

    joinBtn.addEventListener('click', () => {
        const value = inputField.value.trim();
        if (value) {
            alert(`Joining meeting with code: ${value}`);
        } else {
            alert('Please enter a valid meeting code or link.');
        }
    });

    // Optional: Allow pressing Enter to join
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            joinBtn.click();
        }
    });
});
