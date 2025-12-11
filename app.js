// Sample Mentor Data
let mentors = [
    {
        id: 1,
        name: "Sarah Chen",
        industry: "Technology",
        jobTitle: "Senior Product Manager",
        expertise: ["Product Strategy", "User Research", "Leadership"],
        bio: "Passionate about helping students understand product development and tech careers. 10+ years in the industry.",
        email: "sarah@tech.com",
        availability: ["Wednesdays 6-7 PM", "Saturdays 10 AM-12 PM"],
        status: "approved"
    },
    {
        id: 2,
        name: "James Rodriguez",
        industry: "Technology",
        jobTitle: "Full-Stack Engineer",
        expertise: ["Web Development", "Cloud Architecture", "React"],
        bio: "Love mentoring junior developers and sharing real-world coding experiences.",
        email: "james@tech.com",
        availability: ["Tuesdays 5-6 PM", "Thursdays 7-8 PM"],
        status: "approved"
    },
    {
        id: 3,
        name: "Dr. Amelia Williams",
        industry: "Healthcare",
        jobTitle: "Healthcare Administrator",
        expertise: ["Hospital Management", "Patient Care", "Policy"],
        bio: "Dedicated to supporting the next generation of healthcare leaders.",
        email: "amelia@health.com",
        availability: ["Mondays 4-5 PM", "Fridays 3-4 PM"],
        status: "approved"
    },
    {
        id: 4,
        name: "Marcus Thompson",
        industry: "Finance",
        jobTitle: "Investment Analyst",
        expertise: ["Stock Analysis", "Portfolio Management", "Economics"],
        bio: "Helping students understand financial markets and investment strategies.",
        email: "marcus@finance.com",
        availability: ["Wednesdays 5-6 PM", "Saturdays 2-3 PM"],
        status: "approved"
    },
    {
        id: 5,
        name: "Lisa Park",
        industry: "Marketing",
        jobTitle: "Chief Marketing Officer",
        expertise: ["Brand Strategy", "Digital Marketing", "Analytics"],
        bio: "Excited to guide students through the world of modern marketing.",
        email: "lisa@marketing.com",
        availability: ["Tuesdays 6-7 PM", "Thursdays 5-6 PM"],
        status: "approved"
    }
];

let requests = [];
let currentMentor = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderMentors(mentors);
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('mentorForm').addEventListener('submit', handleMentorProfileSubmit);
    document.getElementById('requestForm').addEventListener('submit', handleRequestSubmit);
    document.getElementById('searchInput').addEventListener('input', filterMentors);
    document.getElementById('industryFilter').addEventListener('change', filterMentors);
    document.getElementById('expertiseFilter').addEventListener('input', filterMentors);
}

// Render Mentors Grid
function renderMentors(mentorsToShow) {
    const grid = document.getElementById('mentorsGrid');
    grid.innerHTML = '';
    
    mentorsToShow.forEach(mentor => {
        const card = document.createElement('div');
        card.className = 'card mentor-card';
        card.innerHTML = `
            <div class="mb-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-3">
                    ${mentor.name.charAt(0)}
                </div>
                <h3 class="text-xl font-bold">${mentor.name}</h3>
                <p class="text-sm" style="color: var(--primary);">${mentor.jobTitle}</p>
                <p class="text-sm text-gray-500">${mentor.industry}</p>
            </div>
            
            <p class="text-sm text-gray-600 mb-4">${mentor.bio}</p>
            
            <div class="mb-4">
                <p class="text-xs font-bold text-gray-500 mb-2">EXPERTISE</p>
                <div>
                    ${mentor.expertise.map(exp => `<span class="badge">${exp}</span>`).join('')}
                </div>
            </div>
            
            <div class="mb-6">
                <p class="text-xs font-bold text-gray-500 mb-2">AVAILABILITY</p>
                <ul class="text-sm">
                    ${mentor.availability.map(slot => `<li class="text-gray-600">• ${slot}</li>`).join('')}
                </ul>
            </div>
            
            <button class="btn-primary w-full" onclick="openMentorModal(${mentor.id})">Request Guidance</button>
        `;
        grid.appendChild(card);
    });
}

// Filter Mentors
function filterMentors() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const industry = document.getElementById('industryFilter').value;
    const expertise = document.getElementById('expertiseFilter').value.toLowerCase();
    
    const filtered = mentors.filter(mentor => {
        const matchSearch = mentor.name.toLowerCase().includes(search);
        const matchIndustry = !industry || mentor.industry === industry;
        const matchExpertise = !expertise || 
            mentor.expertise.some(exp => exp.toLowerCase().includes(expertise));
        
        return matchSearch && matchIndustry && matchExpertise;
    });
    
    renderMentors(filtered);
}

// Open Mentor Modal
function openMentorModal(mentorId) {
    currentMentor = mentors.find(m => m.id === mentorId);
    const modal = document.getElementById('mentorModal');
    const detail = document.getElementById('mentorDetail');
    
    detail.innerHTML = `
        <div class="mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-4" style="font-size: 28px;">
                ${currentMentor.name.charAt(0)}
            </div>
            <h2 class="text-2xl font-bold">${currentMentor.name}</h2>
            <p style="color: var(--primary);" class="font-semibold">${currentMentor.jobTitle}</p>
            <p class="text-gray-500">${currentMentor.industry}</p>
        </div>
        
        <div class="mb-6">
            <h4 class="font-bold mb-2">About</h4>
            <p class="text-gray-600">${currentMentor.bio}</p>
        </div>
        
        <div class="mb-6">
            <h4 class="font-bold mb-2">Expertise</h4>
            <div>
                ${currentMentor.expertise.map(exp => `<span class="badge">${exp}</span>`).join('')}
            </div>
        </div>
        
        <div class="mb-6">
            <h4 class="font-bold mb-3">Available Time Slots</h4>
            <ul class="space-y-2">
                ${currentMentor.availability.map(slot => `<li class="text-gray-600 text-sm">✓ ${slot}</li>`).join('')}
            </ul>
        </div>
        
        <button class="btn-primary w-full" onclick="openRequestModal()">Request Mentorship</button>
    `;
    
    modal.classList.add('active');
}

// Close Mentor Modal
function closeMentorModal() {
    document.getElementById('mentorModal').classList.remove('active');
}

// Open Request Modal
function openRequestModal() {
    closeMentorModal();
    const timeSlotSelect = document.getElementById('requestTimeSlot');
    timeSlotSelect.innerHTML = '<option value="">Select a time slot</option>';
    
    currentMentor.availability.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSlotSelect.appendChild(option);
    });
    
    document.getElementById('requestModal').classList.add('active');
}

// Close Request Modal
function closeRequestModal() {
    document.getElementById('requestModal').classList.remove('active');
}

// Handle Request Submission
function handleRequestSubmit(e) {
    e.preventDefault();
    
    const request = {
        id: requests.length + 1,
        mentorId: currentMentor.id,
        mentorName: currentMentor.name,
        menteeName: document.getElementById('menteeName').value,
        menteeEmail: document.getElementById('menteeEmail').value,
        topic: document.getElementById('requestTopic').value,
        timeSlot: document.getElementById('requestTimeSlot').value,
        status: 'pending',
        createdAt: new Date().toLocaleDateString()
    };
    
    requests.push(request);
    
    alert('✓ Mentorship request submitted! Mentor will respond soon.');
    closeRequestModal();
    document.getElementById('requestForm').reset();
}

// Handle Mentor Profile Submit
function handleMentorProfileSubmit(e) {
    e.preventDefault();
    
    const newMentor = {
        id: mentors.length + 1,
        name: document.getElementById('mentorName').value,
        email: document.getElementById('mentorEmail').value,
        industry: document.getElementById('mentorIndustry').value,
        jobTitle: document.getElementById('mentorJobTitle').value,
        expertise: document.getElementById('mentorExpertise').value.split(',').map(e => e.trim()).slice(0, 5),
        bio: document.getElementById('mentorBio').value,
        availability: document.getElementById('mentorAvailability').value.split('\n').filter(a => a.trim()),
        status: 'pending'
    };
    
    mentors.push(newMentor);
    alert('✓ Profile created! Admin will review and approve it soon.');
    document.getElementById('mentorForm').reset();
    updateProfilePreview();
}

// Update Profile Preview
function updateProfilePreview() {
    const preview = document.getElementById('profilePreview');
    const name = document.getElementById('mentorName').value;
    const title = document.getElementById('mentorJobTitle').value;
    const industry = document.getElementById('mentorIndustry').value;
    const expertise = document.getElementById('mentorExpertise').value;
    
    if (name) {
        preview.innerHTML = `
            <p class="font-bold">${name}</p>
            <p class="text-sm" style="color: var(--primary);">${title}</p>
            <p class="text-xs text-gray-500">${industry}</p>
            ${expertise ? `<div class="mt-3"><div class="text-xs">${expertise.split(',').slice(0, 3).map(e => `<span class="badge">${e.trim()}</span>`).join('')}</div></div>` : ''}
        `;
    }
}

document.getElementById('mentorName').addEventListener('input', updateProfilePreview);
document.getElementById('mentorJobTitle').addEventListener('input', updateProfilePreview);
document.getElementById('mentorIndustry').addEventListener('input', updateProfilePreview);
document.getElementById('mentorExpertise').addEventListener('input', updateProfilePreview);

// Switch Views
function switchView(viewName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('nav-active'));
    
    document.getElementById(viewName).classList.add('active');
    event.target.classList.add('nav-active');
    
    // Render relevant content
    if (viewName === 'mentor-dashboard') {
        renderMenteeRequests();
        renderScheduledMeetings();
    } else if (viewName === 'mentee-dashboard') {
        renderMenteeRequests2();
    }
}

// Render Mentee Requests for Mentor
function renderMenteeRequests() {
    const container = document.getElementById('menteeRequests');
    container.innerHTML = '';
    
    const mentorRequests = requests.filter(r => r.mentorId === 1); // Assuming mentor ID 1 for demo
    
    if (mentorRequests.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No pending requests yet</p>';
        return;
    }
    
    mentorRequests.forEach(req => {
        if (req.status === 'pending') {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="font-bold">${req.menteeName}</h4>
                        <p class="text-sm text-gray-500">${req.menteeEmail}</p>
                    </div>
                    <span class="status-badge status-pending">Pending</span>
                </div>
                
                <p class="text-sm text-gray-600 mb-3"><strong>Topic:</strong> ${req.topic}</p>
                <p class="text-sm text-gray-600 mb-6"><strong>Requested:</strong> ${req.timeSlot}</p>
                
                <div class="flex gap-2">
                    <button class="btn-primary flex-1" onclick="approveRequest(${req.id})">Confirm Meeting</button>
                    <button class="btn-secondary flex-1" onclick="rejectRequest(${req.id})">Propose New Time</button>
                </div>
            `;
            container.appendChild(card);
        }
    });
}

// Render Scheduled Meetings
function renderScheduledMeetings() {
    const container = document.getElementById('scheduledMeetings');
    container.innerHTML = '';
    
    const confirmedRequests = requests.filter(r => r.mentorId === 1 && r.status === 'confirmed');
    
    if (confirmedRequests.length === 0) {
        container.innerHTML = '<p class="text-gray-500">No scheduled meetings yet</p>';
        return;
    }
    
    confirmedRequests.forEach(req => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="font-bold">${req.menteeName}</h4>
                    <p class="text-sm text-gray-500">${req.menteeEmail}</p>
                </div>
                <span class="status-badge status-confirmed">Confirmed</span>
            </div>
            
            <p class="text-sm text-gray-600 mb-2"><strong>Topic:</strong> ${req.topic}</p>
            <p class="text-sm text-gray-600 mb-6"><strong>Meeting:</strong> ${req.timeSlot}</p>
            
            <button class="btn-secondary w-full" onclick="giveFeedback(${req.id})">Give Feedback</button>
        `;
        container.appendChild(card);
    });
}

// Render Mentee Requests
function renderMenteeRequests2() {
    const container = document.getElementById('menteeRequests2');
    container.innerHTML = '';
    
    if (requests.length === 0) {
        container.innerHTML = '<p class="text-gray-500 col-span-2">You haven\'t made any requests yet. Go to "Find Mentors" to get started!</p>';
        return;
    }
    
    requests.forEach(req => {
        const card = document.createElement('div');
        card.className = 'card';
        const statusClass = req.status === 'pending' ? 'status-pending' : req.status === 'confirmed' ? 'status-confirmed' : 'status-pending';
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h4 class="font-bold">${req.mentorName}</h4>
                </div>
                <span class="status-badge ${statusClass}">${req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
            </div>
            
            <p class="text-sm text-gray-600 mb-2"><strong>Your Topic:</strong> ${req.topic}</p>
            <p class="text-sm text-gray-600 mb-2"><strong>Requested:</strong> ${req.timeSlot}</p>
            <p class="text-sm text-gray-500">Submitted: ${req.createdAt}</p>
        `;
        container.appendChild(card);
    });
}

// Approve Request
function approveRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'confirmed';
        alert(`✓ Meeting confirmed with ${request.menteeName} for ${request.timeSlot}`);
        renderMenteeRequests();
        renderScheduledMeetings();
    }
}

// Reject Request
function rejectRequest(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        request.status = 'rejected';
        alert('Request status updated. Consider sending them alternative times.');
        renderMenteeRequests();
    }
}

// Give Feedback
function giveFeedback(requestId) {
    const request = requests.find(r => r.id === requestId);
    if (request) {
        const feedback = prompt(`Give feedback for ${request.menteeName}'s mentorship session:`);
        if (feedback) {
            alert('✓ Feedback submitted! Student will receive your review.');
        }
    }
}