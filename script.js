// ===== TOASTIFY NOTIFICATIONS =====
function showToast(message, type = 'info', duration = 3000) {
    const backgroundColor = {
        'success': '#4CAF50',
        'error': '#f44336',
        'info': '#2196F3',
        'warning': '#ff9800'
    }[type] || '#2196F3';

    Toastify({
        text: message,
        duration: duration,
        gravity: "top",
        position: "right",
        backgroundColor: backgroundColor,
        stopOnFocus: true,
        close: true
    }).showToast();
}

function showSuccessToast(message, duration = 3000) {
    showToast(message, 'success', duration);
}

function showErrorToast(message, duration = 3000) {
    showToast(message, 'error', duration);
}

function showInfoToast(message, duration = 3000) {
    showToast(message, 'info', duration);
}

function showWarningToast(message, duration = 3000) {
    showToast(message, 'warning', duration);
}

// ===== USER PROFILE MANAGEMENT =====
class UserProfile {
    constructor() {
        this.name = localStorage.getItem('userName') || 'Alex';
        this.email = localStorage.getItem('userEmail') || 'alex@ecotrack.com';
        this.level = localStorage.getItem('userLevel') || '5';
        this.points = localStorage.getItem('userPoints') || '1500';
        this.co2Saved = localStorage.getItem('userCO2') || '85';
    }

    setName(name) {
        this.name = name;
        localStorage.setItem('userName', name);
        updateGreeting();
    }

    setEmail(email) {
        this.email = email;
        localStorage.setItem('userEmail', email);
    }

    setLevel(level) {
        this.level = level;
        localStorage.setItem('userLevel', level);
    }

    setPoints(points) {
        this.points = points;
        localStorage.setItem('userPoints', points);
    }

    setCO2(co2) {
        this.co2Saved = co2;
        localStorage.setItem('userCO2', co2);
    }

    save() {
        localStorage.setItem('userName', this.name);
        localStorage.setItem('userEmail', this.email);
        localStorage.setItem('userLevel', this.level);
        localStorage.setItem('userPoints', this.points);
        localStorage.setItem('userCO2', this.co2Saved);
    }
}

const userProfile = new UserProfile();

// Update greeting based on user name
function updateGreeting() {
    const greetingElements = document.querySelectorAll('.welcome-section h1');
    greetingElements.forEach(el => {
        el.textContent = `Hello, ${userProfile.name}!`;
    });

    const profileNameElements = document.querySelectorAll('.profile-info h1');
    profileNameElements.forEach(el => {
        el.textContent = userProfile.name;
    });
}

// ===== GEMINI AI CHATBOT INTEGRATION =====
class EcoTrackChatbot {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.conversationHistory = [];
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    }

    async sendMessage(userMessage) {
        try {
            this.conversationHistory.push({
                role: 'user',
                parts: [{ text: userMessage }]
            });

            const systemPrompt = `You are EcoBot, a helpful AI assistant for the EcoTrack sustainability platform. 
You help users learn about environmental sustainability, get eco-friendly tips, discover local events, and answer questions about green living.
Keep responses concise, friendly, and actionable. Always provide practical eco-tips when relevant.`;

            const requestBody = {
                contents: [{
                    role: 'user',
                    parts: [{
                        text: systemPrompt + '\n\nUser: ' + userMessage
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500,
                }
            };

            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = data.candidates[0].content.parts[0].text;

            this.conversationHistory.push({
                role: 'model',
                parts: [{ text: botMessage }]
            });

            return botMessage;
        } catch (error) {
            console.error('Error communicating with Gemini AI:', error);
            return "I'm having trouble connecting to the AI service. Please try again later or contact support.";
        }
    }

    clearHistory() {
        this.conversationHistory = [];
    }
}

// Demo Chatbot (for testing without API key)
class DemoChatbot {
    constructor() {
        this.conversationHistory = [];
        this.responses = [
            "Did you know that reducing meat consumption is one of the most effective ways to lower your carbon footprint?",
            "Recycling is important, but the best practice is to reduce and reuse first!",
            "Planting trees is an excellent way to offset carbon emissions. Each tree can absorb about 48 pounds of CO2 per year!",
            "Walking or biking instead of driving can save up to 4.6 metric tons of CO2 annually!",
            "Using reusable bags can save 127 bags per person per year from entering landfills!",
            "Switching to LED bulbs can reduce energy consumption by up to 75%!",
            "Composting organic waste reduces methane emissions from landfills!",
            "A shorter shower can save 12.5 gallons of water. Every drop counts!",
            "Electric vehicles can reduce your carbon emissions by 50-70%!",
            "Supporting local products reduces transportation emissions!"
        ];
    }

    async sendMessage(userMessage) {
        this.conversationHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });

        let response = this.selectResponse(userMessage);

        this.conversationHistory.push({
            role: 'model',
            parts: [{ text: response }]
        });

        return response;
    }

    selectResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('carbon') || lowerMessage.includes('emission')) {
            return "Great question! Reducing your carbon footprint can be done through sustainable transportation, renewable energy, and conscious consumption. What specific area would you like to focus on?";
        } else if (lowerMessage.includes('recycle') || lowerMessage.includes('plastic')) {
            return "Recycling is crucial! Try using reusable bags, bottles, and containers. Plastic takes 500+ years to decompose!";
        } else if (lowerMessage.includes('tree') || lowerMessage.includes('plant')) {
            return "Planting trees is wonderful! Each tree absorbs about 48 lbs of CO2 annually and supports wildlife!";
        } else if (lowerMessage.includes('energy') || lowerMessage.includes('electric')) {
            return "Energy conservation is key! Try LED bulbs, unplug devices when not in use, and use renewable energy!";
        } else if (lowerMessage.includes('water')) {
            return "Water conservation matters! Take shorter showers, fix leaks, and use water-efficient appliances!";
        } else {
            return this.responses[Math.floor(Math.random() * this.responses.length)];
        }
    }

    clearHistory() {
        this.conversationHistory = [];
    }
}

let chatbot = null;

function initializeChatbot(apiKey) {
    // if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    //     chatbot = new EcoTrackChatbot(apiKey);
    //     console.log('EcoBot initialized with Gemini API');
    // } else {
    //     console.log('EcoBot initialized in demo mode');
    //     chatbot = new DemoChatbot();
    // }
}

// Navigation and page interaction
document.addEventListener('DOMContentLoaded', function() {
    // Initialize app
    initializeApp();
});

function initializeApp() {
    // Initialize chatbot
    initializeChatbot('YOUR_GEMINI_API_KEY_HERE');

    // Update greeting
    // Enforce auth - redirect to auth page if no token
    const token = localStorage.getItem('ecotrack_token');
    if (!token) {
        // Not authenticated, redirect to auth page before initializing UI
        window.location.href = 'auth.html';
        return;
    }

    // If there's an authenticated user object from serverless auth, prefer its username
    const currentUser = getCurrentUser();
    if (currentUser && (currentUser.username || currentUser.name)) {
        const nameFromAuth = currentUser.username || currentUser.name;
        userProfile.setName(nameFromAuth);
        // persist to local storage
        userProfile.save();
    }

    updateGreeting();

    // Setup listeners
    setupEventListeners();
    initializeTabs();
    initializeChatUI();
    setupFunctionalButtons();
    setupButtonAnimations();
    setupNavAndEntranceAnimations();
    setupProfileForm();
    displayTreesPlanted();

    // Wire logout button if present
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logoutUser();
        });
    }
}

function displayTreesPlanted() {
        const treesElement = document.getElementById('totalTreesPlanted');
        const co2Element = document.getElementById('totalCO2Offset');
        const historyElement = document.getElementById('treePlantingHistory');
    
        if (!treesElement) return;
    
        const plants = JSON.parse(localStorage.getItem('plantsPlanted')) || [];
        const totalTrees = plants.length;
        const totalCO2 = totalTrees * 21;
    
        treesElement.textContent = totalTrees;
        co2Element.textContent = totalCO2 + ' kg';
    
        if (historyElement) {
            if (plants.length === 0) {
                historyElement.innerHTML = '<p style="text-align: center; color: #999;">No trees planted yet. Start playing games to earn points!</p>';
            } else {
                const html = plants.map((plant, index) => {
                    return '<div style="padding: 10px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;"><div><div style="font-weight: 600; color: #1f2937;">🌳 Tree #' + (index + 1) + '</div><div style="font-size: 0.85rem; color: #6b7280;">' + plant.date + '</div></div><div style="font-weight: 700; color: #22c55e;">-1000 pts</div></div>';
                }).reverse().join('');
                historyElement.innerHTML = html;
            }
        }
}

// ===== Auth helpers (client) =====
function getCurrentUser() {
    try { return JSON.parse(localStorage.getItem('ecotrack_user') || 'null'); } catch(e) { return null; }
}

function logoutUser() {
    localStorage.removeItem('ecotrack_token');
    localStorage.removeItem('ecotrack_user');
    // keep local progress but redirect to auth
    window.location.href = 'auth.html';
}

async function callRegisterClient(payload) {
    try {
        const resp = await fetch('/.netlify/functions/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await resp.json();
        return data;
    } catch (err) {
        return { error: 'Registration unavailable' };
    }
}

async function callLoginClient(payload) {
    try {
        const resp = await fetch('/.netlify/functions/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        const data = await resp.json();
        return data;
    } catch (err) {
        return { error: 'Login unavailable' };
    }
}

// ===== CHATBOT UI =====
function initializeChatUI() {
    if (!document.querySelector('.chatbot-widget')) {
        createChatbotWidget();
    }

    const chatToggle = document.querySelector('.chat-toggle-btn');
    const chatClose = document.querySelector('.chat-close-btn');
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send-btn');

    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChatbot);
    }

    if (chatClose) {
        chatClose.addEventListener('click', closeChatbot);
    }

    if (chatSend && chatInput) {
        chatSend.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
}

function createChatbotWidget() {
    const chatbotHTML = `
        <div class="chatbot-widget">
            <div class="chatbot-header">
                <h3>🤖 EcoBot</h3>
                <button class="chat-close-btn">✕</button>
            </div>
            <div class="chatbot-messages">
                <div class="chat-message bot-message">
                    <p>Hello! I'm EcoBot, your sustainability assistant. How can I help you today?</p>
                </div>
            </div>
            <div class="chatbot-input-area">
                <input type="text" class="chat-input" placeholder="Ask me about eco-friendly tips...">
                <button class="chat-send-btn">Send</button>
            </div>
        </div>
        <button class="chat-toggle-btn">💬</button>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

function toggleChatbot() {
    const widget = document.querySelector('.chatbot-widget');
    const toggle = document.querySelector('.chat-toggle-btn');

    if (widget.classList.contains('open')) {
        widget.classList.remove('open');
        toggle.style.display = 'block';
    } else {
        widget.classList.add('open');
        toggle.style.display = 'none';
    }
}

function closeChatbot() {
    const widget = document.querySelector('.chatbot-widget');
    const toggle = document.querySelector('.chat-toggle-btn');

    widget.classList.remove('open');
    toggle.style.display = 'block';
}

async function sendChatMessage() {
    const input = document.querySelector('.chat-input');
    const message = input.value.trim();

    if (!message) return;

    const messagesContainer = document.querySelector('.chatbot-messages');
    const userMessageEl = document.createElement('div');
    userMessageEl.className = 'chat-message user-message';
    userMessageEl.innerHTML = `<p>${escapeHtml(message)}</p>`;
    messagesContainer.appendChild(userMessageEl);

    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const typingEl = document.createElement('div');
    typingEl.className = 'chat-message bot-message typing';
    typingEl.innerHTML = '<p>Typing...</p>';
    messagesContainer.appendChild(typingEl);

    try {
        // First, try serverless chatbot proxy
        let serverResp = await callChatbotServer(message);
        let reply = null;
        reply = serverResp?.candidates?.[0]?.content?.parts?.[0]?.text || null;


        // If server didn't provide a reply, fallback to client-side chatbot instance
        if (!reply) {
            try {
                reply = await chatbot.sendMessage(message);
            } catch (err) {
                console.warn('Client chatbot failed, returning generic message', err);
                reply = "I'm sorry, I couldn't process that right now.";
            }
        }

        typingEl.remove();
        const botMessageEl = document.createElement('div');
        botMessageEl.className = 'chat-message bot-message';
        botMessageEl.innerHTML = `<p>${escapeHtml(reply)}</p>`;
        messagesContainer.appendChild(botMessageEl);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch (error) {
        console.error('Error in chat flow:', error);
        typingEl.remove();
        const errorEl = document.createElement('div');
        errorEl.className = 'chat-message bot-message error';
        errorEl.innerHTML = '<p>Sorry, I encountered an error. Please try again.</p>';
        messagesContainer.appendChild(errorEl);
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ===== Button click animations (ripple + press) =====
function setupButtonAnimations() {
    const selector = '.btn-primary, .btn-secondary, .btn-suggest, .btn-primary-large, .action-btn, .icon-btn, .profile-btn, .nav-item';
    document.querySelectorAll(selector).forEach(el => {
        // remove existing listeners if re-run
        el.style.position = el.style.position || '';

        el.addEventListener('mousedown', () => el.classList.add('pressed'));
        el.addEventListener('mouseup', () => el.classList.remove('pressed'));
        el.addEventListener('mouseleave', () => el.classList.remove('pressed'));
        el.addEventListener('touchstart', (e) => {
            el.classList.add('pressed');
        }, {passive: true});
        el.addEventListener('touchend', () => el.classList.remove('pressed'));

        el.addEventListener('click', function(e) {
            // ripple effect
            const rect = el.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            el.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 700);
        });
    });
}

// ===== Nav & entrance animations =====
function setupNavAndEntranceAnimations() {
    // mark active nav item based on current path
    try {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-item').forEach(a => {
            const href = a.getAttribute('href') || '';
            if (href.endsWith(path) || (path === '' && href.endsWith('index.html'))) {
                a.classList.add('active');
            }
            // pulse on click
            a.addEventListener('click', (e) => {
                a.classList.add('pulse');
                setTimeout(() => a.classList.remove('pulse'), 300);
            });
        });
    } catch (e) { /* ignore */ }

    // staggered entrance for key cards
    const selectors = ['.stat-card', '.game-card', '.achievement-badge', '.activity-item', '.recent-activities .activity-item', '.get-started-grid .action-btn'];
    const elems = [];
    selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => elems.push(el)));

    elems.forEach(el => el.classList.add('animate-in'));
    elems.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 80 * i);
    });
}


// ===== FUNCTIONAL BUTTONS =====
function setupFunctionalButtons() {
    const logActivityBtn = document.querySelector('.action-btn:nth-child(1)');
    if (logActivityBtn) {
        logActivityBtn.addEventListener('click', () => showActivityModal());
    }

    const setGoalBtn = document.querySelector('.action-btn:nth-child(2)');
    if (setGoalBtn) {
        setGoalBtn.addEventListener('click', () => showGoalModal());
    }

    const quizBtn = document.querySelector('.action-btn:nth-child(3)');
    if (quizBtn) {
        quizBtn.addEventListener('click', () => showQuizModal());
    }

    const suggestBtn = document.querySelector('.btn-suggest');
    if (suggestBtn) {
        suggestBtn.addEventListener('click', () => showSuggestEventModal());
    }

    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('RSVP')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const eventName = btn.closest('.event-card') ?.querySelector('h3') ?.textContent;
                showNotification(`✓ You've RSVP'd to "${eventName}"!`);
                btn.textContent = 'RSVP\'d ✓';
                btn.disabled = true;
            });
        } else if (btn.textContent.includes('Buy')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const itemName = btn.closest('.product-card') ?.querySelector('h3') ?.textContent;
                const cost = btn.closest('.product-card') ?.querySelector('.product-cost') ?.textContent;
                showRedeemModal(itemName, cost);
            });
        }
    });

    document.querySelectorAll('.game-card .btn-secondary').forEach(btn => {
        btn.addEventListener('click', () => {
            const gameName = btn.closest('.game-card') ?.querySelector('h3') ?.textContent;
            showGameModal(gameName);
        });
    });

    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent.includes('Learn More')) {
            btn.addEventListener('click', () => {
                const title = btn.closest('.event-card') ?.querySelector('h3') ?.textContent;
                showNotification(`📚 More info about "${title}" coming soon!`);
            });
        }
    });
}

// ===== PROFILE FORM =====
function setupProfileForm() {
    const editProfileBtn = document.querySelector('.profile-actions .btn-primary');

    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => showEditProfileModal());
    }
}

function showEditProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Edit Profile</h2>
                <button class="modal-close">✕</button>
            </div>
            <form class="profile-form">
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="fullName" value="${userProfile.name}" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="userEmail" value="${userProfile.email}" required>
                </div>
                <div class="form-group">
                    <label>Eco Level</label>
                    <input type="number" id="userLevel" value="${userProfile.level}" min="1" max="10">
                </div>
                <div class="form-group">
                    <label>Reward Points</label>
                    <input type="number" id="userPoints" value="${userProfile.points}" min="0">
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Save Changes</button>
                    <button type="button" class="btn-secondary modal-close">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.querySelector('.profile-form').addEventListener('submit', (e) => {
        e.preventDefault();
        userProfile.setName(document.getElementById('fullName').value);
        userProfile.setEmail(document.getElementById('userEmail').value);
        userProfile.setLevel(document.getElementById('userLevel').value);
        userProfile.setPoints(document.getElementById('userPoints').value);
        userProfile.save();
        updateGreeting();
        showNotification('✓ Profile updated successfully!');
        modal.remove();
    });
}

// ===== MODALS =====
function showActivityModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Log Activity</h2>
                <button class="modal-close">✕</button>
            </div>
            <form class="activity-form">
                <div class="form-group">
                    <label>Activity Type</label>
                    <select required>
                        <option>Select an activity...</option>
                        <option>🚴 Cycling</option>
                        <option>🚶 Walking</option>
                        <option>🚌 Public Transit</option>
                        <option>🥗 Vegetarian Meal</option>
                        <option>♻️ Recycling</option>
                        <option>🌱 Tree Planting</option>
                        <option>💡 Energy Saving</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Duration/Amount</label>
                    <input type="text" placeholder="e.g., 30 minutes or 5 kg" required>
                </div>
                <div class="form-group">
                    <label>Notes</label>
                    <textarea placeholder="Any additional notes..." rows="3"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Log Activity</button>
                    <button type="button" class="btn-secondary modal-close">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.querySelector('.activity-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const activityType = modal.querySelector('select').value;
        showNotification(`✓ Activity "${activityType}" logged successfully!`);
        modal.remove();
    });
}

function showGoalModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Set New Goal</h2>
                <button class="modal-close">✕</button>
            </div>
            <form class="goal-form">
                <div class="form-group">
                    <label>Goal Title</label>
                    <input type="text" placeholder="e.g., Reduce Plastic by 50%" required>
                </div>
                <div class="form-group">
                    <label>Target Date</label>
                    <input type="date" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe your goal..." rows="3"></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Create Goal</button>
                    <button type="button" class="btn-secondary modal-close">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.querySelector('.goal-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const goalTitle = modal.querySelector('input[type="text"]').value;
        showNotification(`✓ Goal "${goalTitle}" created successfully!`);
        modal.remove();
    });
}

function showQuizModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Eco-Quiz</h2>
                <button class="modal-close">✕</button>
            </div>
            <div class="quiz-content">
                <div class="quiz-question">
                    <h3>Question 1 of 5</h3>
                    <p>How much CO2 does an average car emit per year?</p>
                    <div class="quiz-options">
                        <label><input type="radio" name="q1"> 4.6 metric tons</label>
                        <label><input type="radio" name="q1"> 2.3 metric tons</label>
                        <label><input type="radio" name="q1"> 8.9 metric tons</label>
                        <label><input type="radio" name="q1"> 1.2 metric tons</label>
                    </div>
                </div>
                <div class="form-actions">
                    <button class="btn-primary quiz-next">Next Question</button>
                    <button type="button" class="btn-secondary modal-close">Exit Quiz</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.querySelector('.quiz-next').addEventListener('click', () => {
        showNotification('✓ Quiz completed! You earned 50 XP!');
        modal.remove();
    });
}

function showGameModal(gameName) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content game-modal">
            <div class="modal-header">
                <h2>${gameName}</h2>
                <button class="modal-close">✕</button>
            </div>
            <div class="game-area">
                <p style="text-align: center; padding: 2rem;">Game loading...</p>
                <div style="text-align: center;">
                    <div class="game-score">Score: 0</div>
                    <div class="game-timer">Time: 60s</div>
                </div>
            </div>
            <div class="form-actions">
                <button class="btn-primary game-start">Start Game</button>
                <button type="button" class="btn-secondary modal-close">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.querySelector('.game-start').addEventListener('click', () => {
        showNotification(`🎮 ${gameName} started! You earned 25 XP!`);
        modal.remove();
    });
}

function showRedeemModal(itemName, points) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Confirm Payment</h2>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <p>You are about to buy:</p>
                <h3>${itemName}</h3>
                <p>Cost: <strong>${points}</strong></p>
            </div>
            <div class="form-actions">
                <button class="btn-primary redeem-confirm">Confirm Payment</button>
                <button type="button" class="btn-secondary modal-close">Cancel</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.querySelector('.redeem-confirm').addEventListener('click', () => {
        showNotification(`✓ "${itemName}" has been added to your cart!`);
        modal.remove();
    });
}

function showSuggestEventModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Suggest an Event</h2>
                <button class="modal-close">✕</button>
            </div>
            <form class="suggest-form">
                <div class="form-group">
                    <label>Event Name</label>
                    <input type="text" placeholder="e.g., Community Beach Cleanup" required>
                </div>
                <div class="form-group">
                    <label>Date</label>
                    <input type="date" required>
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input type="text" placeholder="City, State" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea placeholder="Describe the event..." rows="3" required></textarea>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn-primary">Submit Suggestion</button>
                    <button type="button" class="btn-secondary modal-close">Cancel</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    modal.querySelector('.suggest-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const eventName = modal.querySelector('input[type="text"]').value;
        showNotification(`✓ Event "${eventName}" suggested successfully! Thank you!`);
        modal.remove();
    });
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Profile button navigation
    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', function() {
            window.location.href = 'profile.html';
        });
    }

    // Notification button
    const notificationBtn = document.querySelector('.navbar-icons .icon-btn:first-child');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('You have no new notifications');
        });
    }
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn, .filter-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.querySelectorAll('.tab-btn, .filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #22c55e;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }

    /* Chatbot Styles */
    .chatbot-widget {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 9999;
    }

    .chatbot-widget.open {
        opacity: 1;
        pointer-events: all;
    }

    .chatbot-header {
        background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
        color: white;
        padding: 1rem;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .chatbot-header h3 {
        margin: 0;
        font-size: 1.1rem;
    }

    .chat-close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 1rem;
        background: #f9fafb;
    }

    .chat-message {
        margin-bottom: 0.75rem;
        display: flex;
        animation: fadeIn 0.3s ease;
    }

    .chat-message p {
        margin: 0;
        padding: 0.75rem 1rem;
        border-radius: 8px;
        max-width: 80%;
        word-wrap: break-word;
    }

    .user-message {
        justify-content: flex-end;
    }

    .user-message p {
        background: #22c55e;
        color: white;
    }

    .bot-message p {
        background: white;
        color: #333;
        border: 1px solid #e5e7eb;
    }

    .bot-message.typing p {
        font-style: italic;
        color: #999;
    }

    .chatbot-input-area {
        display: flex;
        gap: 0.5rem;
        padding: 1rem;
        border-top: 1px solid #e5e7eb;
    }

    .chat-input {
        flex: 1;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-size: 0.9rem;
    }

    .chat-input:focus {
        outline: none;
        border-color: #22c55e;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .chat-send-btn {
        padding: 0.75rem 1rem;
        background: #22c55e;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s ease;
    }

    .chat-send-btn:hover {
        background: #15803d;
    }

    .chat-toggle-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: #22c55e;
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
        transition: all 0.3s ease;
        z-index: 9998;
    }

    .chat-toggle-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(34, 197, 94, 0.6);
    }

    /* Modal Styles */
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 11000;
        animation: fadeIn 0.2s ease;
    }

    .modal-content {
        background: white;
        border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
    }

    .modal-header {
        padding: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
    }

    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-close:hover {
        color: #1f2937;
    }

    .modal-body {
        padding: 1.5rem;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #1f2937;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-size: 0.95rem;
        font-family: inherit;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: #22c55e;
        box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
    }

    .form-actions {
        padding: 1.5rem;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        border-top: 1px solid #e5e7eb;
    }

    .form-actions button {
        flex: 1;
    }

    .quiz-options {
        margin: 1rem 0;
    }

    .quiz-options label {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        cursor: pointer;
        font-weight: normal;
    }

    .quiz-options input[type="radio"] {
        margin-right: 0.5rem;
        width: auto;
        accent-color: #22c55e;
    }

    @media (max-width: 768px) {
        .chatbot-widget {
            width: 100%;
            height: 60vh;
            bottom: 0;
            right: 0;
            border-radius: 12px 12px 0 0;
        }

        .modal-content {
            width: 95%;
        }
    }
`;
document.head.appendChild(style);

// Pagination and Search
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.pagination-btn').forEach(b => b.classList.remove('active'));
            if (!this.textContent.includes('‹') && !this.textContent.includes('›')) {
                this.classList.add('active');
            }
        });
    });

    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = this.closest('main').querySelectorAll('.event-card, .game-card, .product-card');
            if (cards) {
                cards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    card.style.display = text.includes(searchTerm) || searchTerm === '' ? 'block' : 'none';
                });
            }
        });
    });

    const filterCheckboxes = document.querySelectorAll('.checkbox-label input');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedFilters = Array.from(filterCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.nextElementSibling.textContent);
            console.log('Active filters:', checkedFilters);
        });
    });

    const calendarDates = document.querySelectorAll('.calendar-date');
    calendarDates.forEach(date => {
        date.addEventListener('click', function() {
            calendarDates.forEach(d => d.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

console.log('EcoTrack app initialized successfully!');

// ===== TREE PLANTING REWARD SYSTEM =====
function plantTreeReward() {
    // Try serverless plantTree first (falls back to localStorage)
    (async () => {
        const result = await callPlantTree();
        if (result && result.success) {
            const newPoints = result.points;
            // update user profile object if present
            if (window.userProfile) window.userProfile.setPoints(newPoints);
            displayTreesPlanted();
            showNotification('🌳 Tree Planted Successfully!', 'You planted a tree!\nPoints spent: 1000\nRemaining points: ' + newPoints, 'success');
            return true;
        }

        if (result && result.error) {
            showNotification('❌ Could not plant tree', (result.error || 'Not enough points') + (result.points !== undefined ? ('\nCurrent points: ' + result.points) : ''), 'error');
            return false;
        }

        // Generic fallback message
        showNotification('❌ Could not plant tree', 'An unexpected error occurred. Please try again later.', 'error');
        return false;
    })();
}

function showNotification(title, message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
        color: white;
        padding: 20px 30px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 8px;">${title}</div>
        <div style="font-size: 0.95rem; line-height: 1.5;">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ===== Client helper: call serverless chatbot =====
async function callChatbotServer(message) {


    const apiKey = "AIzaSyDGQ6NcJL6SCrfhD-cGwiawU5BVmoZOu6E"; // Replace with your actual key
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();
    
    // Log the full response or access specific text
    return data;
    // To access just the text answer:
    // console.log(data.candidates[0].content.parts[0].text);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


// ===== Client helpers for points & planting (serverless, with fallback) =====
async function callAddPoints(delta) {
    try {
        const resp = await fetch('/.netlify/functions/addPoints', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ points: delta })
        });

        if (!resp.ok) {
            const txt = await resp.text();
            console.warn('addPoints server error:', resp.status, txt);
            // fallback to local
            const current = parseInt(localStorage.getItem('userPoints')) || 1500;
            const newTotal = current + delta;
            localStorage.setItem('userPoints', newTotal);
            return { points: newTotal };
        }

        const data = await resp.json();
        localStorage.setItem('userPoints', data.points);
        return data;
    } catch (err) {
        console.warn('addPoints unreachable, using local fallback:', err);
        const current = parseInt(localStorage.getItem('userPoints')) || 1500;
        const newTotal = current + delta;
        localStorage.setItem('userPoints', newTotal);
        return { points: newTotal };
    }
}

async function callPlantTree() {
    try {
        const resp = await fetch('/.netlify/functions/plantTree', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!resp.ok) {
            const txt = await resp.text();
            console.warn('plantTree server error:', resp.status, txt);
            // try to parse json error
            try { const errJson = JSON.parse(txt); return { error: errJson.error || txt, points: errJson.points }; } catch(e) { return { error: txt }; }
        }

        const data = await resp.json();
        // update local state
        if (data.points !== undefined) localStorage.setItem('userPoints', data.points);
        const plants = JSON.parse(localStorage.getItem('plantsPlanted')) || [];
        if (data.plant) plants.push(data.plant);
        localStorage.setItem('plantsPlanted', JSON.stringify(plants));
        return data;
    } catch (err) {
        console.warn('plantTree unreachable, using local fallback:', err);
        const currentPoints = parseInt(localStorage.getItem('userPoints')) || 1500;
        if (currentPoints < 1000) return { error: 'Not enough points', points: currentPoints };
        const newPoints = currentPoints - 1000;
        localStorage.setItem('userPoints', newPoints);
        const plant = { date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), points: 1000, type: 'tree' };
        const plants = JSON.parse(localStorage.getItem('plantsPlanted')) || [];
        plants.push(plant);
        localStorage.setItem('plantsPlanted', JSON.stringify(plants));
        return { success: true, points: newPoints, plant };
    }
}

// Example integration point: use this function from your UI/chat widget.
// If the server returns no reply, you can fall back to the demo chatbot already implemented in the frontend.

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    setupChatbot();
    setupFunctionalButtons();
    setupProfileForm();
    setupEventListeners();
    initializeTabs();
});




// Инициализация Stripe
const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // сюда твой публичный ключ Stripe

// Обработчик кнопки "Посади дерево"
document.getElementById('plant-tree-btn').addEventListener('click', async () => {
    await createCheckoutSession('plant_tree');
});

// Обработчик кнопки "Магазин"
document.getElementById('shop-btn').addEventListener('click', async () => {
    await createCheckoutSession('shop');
});

async function createCheckoutSession(product) {
    try {
        // Создаем сессию на сервере
        const response = await fetch('/.netlify/functions/createCheckoutSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ product })
        });
        const data = await response.json();

        // Редирект на Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });

        if (result.error) {
            alert(result.error.message);
        }
    } catch (err) {
        console.error('Ошибка создания платежа:', err);
        alert('Не удалось создать платеж. Попробуйте позже.');
    }
}