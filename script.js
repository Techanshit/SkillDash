// DATA
const categories = [
    { name: 'React', icon: '💻' }, { name: 'Cooking', icon: '🍳' }, 
    { name: 'Yoga', icon: '🧘' }, { name: 'UI/UX', icon: '🎨' },
    { name: 'Python', icon: '🐍' }, { name: 'Finance', icon: '💰' },
    { name: 'Music', icon: '🎸' }, { name: 'Marketing', icon: '📢' }
];

const mentors = [
    { name: 'Ananya Sharma', skill: 'React Expert', rate: '₹899', rating: 4.9, icon: '👩‍💻', online: true },
    { name: 'Rahul Verma', skill: 'System Design', rate: '₹1,200', rating: 5.0, icon: '👨‍💻', online: true },
    { name: 'Priya Patel', skill: 'UI/UX Designer', rate: '₹750', rating: 4.8, icon: '🎨', online: true },
    { name: 'Vikram Malhotra', skill: 'Data Science', rate: '₹1,500', rating: 4.9, icon: '🧬', online: false },
    { name: 'Neha Gupta', skill: 'Yoga & Wellness', rate: '₹500', rating: 4.9, icon: '🧘', online: true },
    { name: 'Sameer Khan', skill: 'Python Developer', rate: '₹800', rating: 4.7, icon: '🐍', online: false },
    { name: 'Aditi Rao', skill: 'Finance Advisor', rate: '₹2,000', rating: 5.0, icon: '💰', online: false },
    { name: 'Rohan Das', skill: 'Digital Marketing', rate: '₹600', rating: 4.6, icon: '📢', online: true }
];

// AUTH STATE (In-memory simulation)
let currentUser = null;

// NAVIGATION
function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-'+id).classList.add('active');
    window.scrollTo(0,0);
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
}

function toggleNav() { 
    document.getElementById('navLinks').classList.toggle('active');
    document.getElementById('hamburger').classList.toggle('active');
}

function scrollToRadar() {
    const target = document.getElementById('connect-now');
    window.scrollTo({top: target.offsetTop - 100, behavior: 'smooth'});
    document.getElementById('navLinks').classList.remove('active');
    document.getElementById('hamburger').classList.remove('active');
}

// SEARCH
function handleSearch() {
    const q = document.getElementById('mainSearch').value.trim();
    if(!q) return;
    document.getElementById('queryDisplay').innerText = q;
    const grid = document.getElementById('resultsGrid');
    grid.innerHTML = '';
    const filtered = mentors.filter(m => 
        m.skill.toLowerCase().includes(q.toLowerCase()) || 
        m.name.toLowerCase().includes(q.toLowerCase())
    );
    if(filtered.length > 0) {
        filtered.forEach((m, idx) => {
            const card = createMentorCard(m);
            card.style.animationDelay = `${idx * 0.1}s`;
            grid.appendChild(card);
        });
    } else {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 4rem; font-weight: 700; color: #999;">No mentors matching that criteria. Try "React" or "Yoga".</p>';
    }
    showPage('results');
}

// MENTOR CARD COMPONENT
function createMentorCard(m) {
    const div = document.createElement('div');
    div.className = 'mentor-card';
    div.onclick = () => {
        if(!currentUser) {
            openModal('Login Required', 'Please sign in to connect with mentors.', '🔐');
            setTimeout(() => showPage('login'), 2000);
        } else {
            openModal('Request Sent ⚡', `We are connecting you with ${m.name} for an instant session. Please ensure your microphone is active.`, '⚡');
        }
    };
    div.innerHTML = `
        <div class="mentor-img">${m.icon}</div>
        <div class="mentor-body">
            <div class="mentor-name">${m.name}</div>
            <div class="mentor-skill">${m.skill}</div>
            <div class="mentor-footer">
                <span style="font-weight: 800; color: #f08c00;">★ ${m.rating}</span>
                <span class="price">${m.rate}</span>
            </div>
        </div>
    `;
    return div;
}

// CHATBOT LOGIC
function toggleChat() {
    const win = document.getElementById('chatWindow');
    win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
}

function sendChat() {
    const input = document.getElementById('chatInput');
    const val = input.value.trim();
    if(!val) return;
    addMsg(val, 'user');
    input.value = '';
    setTimeout(() => {
        let reply = "That's a great request! One moment while I check the availability of our experts...";
        if(val.toLowerCase().includes('react')) reply = "Ananya Sharma is our top React mentor and she's online right now for an instant call!";
        if(val.toLowerCase().includes('hello') || val.toLowerCase().includes('hi')) reply = "Namaste! 🙏 I can help you find a world-class mentor in under 60 seconds. What do you want to learn?";
        if(val.toLowerCase().includes('price') || val.toLowerCase().includes('cost')) reply = "Mentorship starts as low as ₹450 per session. Each expert sets their own rate based on experience.";
        if(val.toLowerCase().includes('login') || val.toLowerCase().includes('account')) reply = "You can sign in or create an account by clicking the button in the top right corner!";
        addMsg(reply, 'bot');
    }, 800);
}

function addMsg(text, sender) {
    const box = document.getElementById('chatBox');
    const div = document.createElement('div');
    div.className = `msg msg-${sender}`;
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

// MODAL CONTROLS
function openModal(t, b, i) {
    document.getElementById('modalTitle').innerText = t;
    document.getElementById('modalBody').innerText = b;
    document.getElementById('modalIcon').innerText = i;
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() { 
    document.getElementById('modalOverlay').style.display = 'none'; 
}

// AUTHENTICATION SIMULATION
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');
    const successDiv = document.getElementById('loginSuccess');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    // Dummy user check (in real apps, use a database or Firebase)
    const users = JSON.parse(localStorage.getItem('skilldashUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if(user) {
        currentUser = user;
        localStorage.setItem('skilldashCurrentUser', JSON.stringify(user));
        successDiv.textContent = 'Login successful! Redirecting...';
        successDiv.style.display = 'block';
        updateUIForUser();
        setTimeout(() => showPage('home'), 1500);
    } else {
        errorDiv.textContent = 'Invalid email or password. Please try again.';
        errorDiv.style.display = 'block';
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const errorDiv = document.getElementById('signupError');
    const successDiv = document.getElementById('signupSuccess');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';

    if(password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters long.';
        errorDiv.style.display = 'block';
        return;
    }

    const users = JSON.parse(localStorage.getItem('skilldashUsers') || '[]');
    if(users.find(u => u.email === email)) {
        errorDiv.textContent = 'An account with this email already exists.';
        errorDiv.style.display = 'block';
        return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('skilldashUsers', JSON.stringify(users));
    
    currentUser = newUser;
    localStorage.setItem('skilldashCurrentUser', JSON.stringify(newUser));
    
    successDiv.textContent = 'Account created successfully! Redirecting...';
    successDiv.style.display = 'block';
    updateUIForUser();
    setTimeout(() => showPage('home'), 1500);
}

function logout() {
    currentUser = null;
    localStorage.removeItem('skilldashCurrentUser');
    updateUIForUser();
    showPage('home');
    openModal('Logged Out', 'You have been successfully logged out.', '👋');
}

function updateUIForUser() {
    const authBtn = document.getElementById('authBtn');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');

    if(currentUser) {
        authBtn.style.display = 'none';
        userMenu.classList.add('active');
        userName.textContent = currentUser.name.split(' ')[0];
        userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        logoutBtn.style.display = 'inline-block';
    } else {
        authBtn.style.display = 'inline-block';
        userMenu.classList.remove('active');
        logoutBtn.style.display = 'none';
    }
}

function toggleUserDropdown() {
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.style.display = logoutBtn.style.display === 'inline-block' ? 'none' : 'inline-block';
}

// INITIALIZATION
window.onload = () => {
    // Check for logged in user
    const savedUser = localStorage.getItem('skilldashCurrentUser');
    if(savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            updateUIForUser();
        } catch(e) {
            console.error("Auth init error", e);
        }
    }

    // Populate Categories
    const homeCats = document.getElementById('homeCats');
    const allCats = document.getElementById('allCatsGrid');
    categories.forEach((c, idx) => {
        const card = document.createElement('div');
        card.className = 'mentor-card';
        card.style.padding = '1.5rem';
        card.style.textAlign = 'center';
        card.style.animationDelay = `${idx * 0.1}s`;
        card.onclick = () => { 
            document.getElementById('mainSearch').value = c.name; 
            handleSearch(); 
        };
        card.innerHTML = `<span style="font-size: 3rem;">${c.icon}</span><br><span style="font-weight: 900; margin-top: 10px; display: block;">${c.name}</span>`;
        if(idx < 4) homeCats.appendChild(card.cloneNode(true));
        allCats.appendChild(card);
    });

    // Populate Featured Mentors
    const homeMentors = document.getElementById('homeMentors');
    mentors.slice(0, 4).forEach((m, idx) => {
        const card = createMentorCard(m);
        card.style.animationDelay = `${idx * 0.1}s`;
        homeMentors.appendChild(card);
    });

    // Populate Radar
    const radarGrid = document.getElementById('onlineMentors');
    mentors.filter(m => m.online).slice(0, 4).forEach(m => {
        const div = document.createElement('div');
        div.className = 'online-mentor-card';
        div.onclick = () => {
            if(!currentUser) {
                openModal('Login Required', 'Please sign in to connect with mentors.', '🔐');
                setTimeout(() => showPage('login'), 2000);
            } else {
                openModal('Connecting... ⚡', `Establishing a 1:1 video call with ${m.name}. Sit tight!`, '⚡');
            }
        };
        div.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 0.8rem;">${m.icon}</div>
            <div style="font-weight: 900; font-size: 1.1rem;">${m.name}</div>
            <div style="font-size: 0.85rem; color: #777; font-weight: 600;">${m.skill}</div>
            <div style="margin-top: 12px; font-weight: 800; color: #4CAF50; font-size: 0.75rem;">LIVE NOW</div>
        `;
        radarGrid.appendChild(div);
    });
};
