/* ============================================================
   SCRIPT.JS - FAHAD ABDULLAH PORTFOLIO
   ============================================================ */

// ==========================================================
// SCROLL PROGRESS BAR
// ==========================================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
});

// ==========================================================
// MOUSE TRAILER
// ==========================================================
const mouseTrailer = document.getElementById('mouseTrailer');
let mouseX = 0,
    mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    mouseTrailer.style.left = mouseX + 'px';
    mouseTrailer.style.top = mouseY + 'px';
    mouseTrailer.classList.add('active');
});

document.addEventListener('mouseleave', () => {
    mouseTrailer.classList.remove('active');
});

// ==========================================================
// THEME TOGGLE
// ==========================================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeIcon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.className = 'fas fa-sun';
        currentTheme = 'light';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        currentTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
});

// ==========================================================
// GREETING BASED ON TIME
// ==========================================================
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingEmoji = document.querySelector('.greeting .emoji');
    const greetingText = document.getElementById('greetingText');

    if (hour < 12) {
        greetingEmoji.textContent = '🌅';
        greetingText.textContent = 'Good Morning!';
    } else if (hour < 17) {
        greetingEmoji.textContent = '☀️';
        greetingText.textContent = 'Good Afternoon!';
    } else if (hour < 21) {
        greetingEmoji.textContent = '🌇';
        greetingText.textContent = 'Good Evening!';
    } else {
        greetingEmoji.textContent = '🌙';
        greetingText.textContent = 'Good Night!';
    }
}

updateGreeting();

// ==========================================================
// TYPEWRITER EFFECT
// ==========================================================
const typewriterElement = document.getElementById('typed-text');
const phrases = [
    'Senior .NET Full Stack Developer',
    'ASP.NET Core · C# Expert',
    'React · Angular · Node.js',
    'Cloud & Enterprise Solutions'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 300;
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// ==========================================================
// SCROLL REVEAL ANIMATIONS
// ==========================================================
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ==========================================================
// COUNTER ANIMATION (Stats)
// ==========================================================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-count'));
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target + '+';
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 30);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ==========================================================
// SKILL BAR ANIMATION
// ==========================================================
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.setProperty('--target', width + '%');
            entry.target.classList.add('animate');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

skillFills.forEach(el => skillObserver.observe(el));

// ==========================================================
// PROJECT FILTERS
// ==========================================================
const filterButtons = document.querySelectorAll('.project-filters button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'messageIn 0.4s ease';
                }, 10);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==========================================================
// BACK TO TOP BUTTON
// ==========================================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================================
// PROFILE PHOTO 3D TILT
// ==========================================================
const profileWrapper = document.getElementById('profileWrapper');

if (profileWrapper) {
    profileWrapper.addEventListener('mousemove', (e) => {
        const rect = profileWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;
        profileWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    profileWrapper.addEventListener('mouseleave', () => {
        profileWrapper.style.transform = 'rotateX(0) rotateY(0)';
    });
}

// ==========================================================
// CONFETTI ON LOAD
// ==========================================================
function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(container);

    const colors = ['#4f8cf7', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#fb923c', '#60a5fa'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
            animation-delay: ${Math.random() * 1.5}s;
        `;
        container.appendChild(piece);
    }

    // Add keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotate(720deg) scale(0.5);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        container.remove();
        style.remove();
    }, 4000);
}

setTimeout(launchConfetti, 800);

// ==========================================================
// AI CHAT AGENT
// ==========================================================
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

chatToggle.addEventListener('click', () => {
    chatToggle.classList.toggle('active');
    chatBox.classList.toggle('open');
    if (chatBox.classList.contains('open')) {
        setTimeout(() => chatInput.focus(), 350);
    }
});

function getAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();

    // Easter Eggs
    if (msg.includes('sudo')) {
        return "🛠️ sudo access granted! You're now an admin. Just kidding 😄 What would you like to know about Fahad?";
    }
    if (msg.includes('ping')) {
        return "🏓 PONG! Response time: 1ms (✨ locally). Fahad's code is always this fast!";
    }
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        return "👋 Hey there! Great to see you. Ask me anything about Fahad — skills, projects, experience, or just say 'help'!";
    }
    if (msg.includes('thank') || msg.includes('thanks')) {
        return "🙌 You're welcome! Let me know if you need anything else. Have a great day!";
    }
    if (msg.includes('joke') || msg.includes('funny')) {
        const jokes = [
            "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
            "What's a programmer's favorite hangout spot? The Foo Bar! 🍻",
            "Why did the developer go broke? Because he used up all his cache! 💰",
            "What's a .NET developer's favorite drink? C#-ppuccino! ☕",
            "Why don't .NET developers like nature? It has too many bugs! 🌿"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // Skills
    if (msg.includes('skill') || msg.includes('tech') || msg.includes('stack') || msg.includes('know') ||
        msg.includes('language') || msg.includes('expertise')) {
        return "💻 Fahad's core expertise:\n• Backend: C#, .NET Core, ASP.NET Core, Web API, Entity Framework\n• Frontend: React.js, Angular, JavaScript, SPA\n• Cloud: Azure, Azure Functions, AWS S3\n• Database: SQL Server, PostgreSQL, Redis\n• Desktop: WPF, WinForms, DevExpress\n• Tools: Git, Jira, Docker, SignalR";
    }
    // Projects
    if (msg.includes('project') || msg.includes('build') || msg.includes('made') || msg.includes('create') ||
        msg.includes('work')) {
        return "🚀 Fahad's key projects:\n• Digital Publishing & eBook Platform (ASP.NET Core + React)\n• Client Onboarding Platform v2 (40% faster onboarding)\n• NSSR Client Reporting System (WPF + Azure Functions)\n• Azure Function Integration Suite\nCheck the Projects section for details!";
    }
    // Experience
    if (msg.includes('experience') || msg.includes('work') || msg.includes('job') || msg.includes('company') ||
        msg.includes('career')) {
        return "💼 Fahad's experience:\n• Senior Software Developer at Salnad (Jan 2025 - Present)\n• Senior .NET Developer at Astrik Digital (Jul 2023 - Oct 2024)\n• Software Engineer at M3 Technologies (Jan 2021 - Jul 2023)\n• Junior .NET Developer at Viftech Solutions (Jan 2019 - Oct 2020)\n7+ years of full-stack development experience!";
    }
    // Contact
    if (msg.includes('hire') || msg.includes('contact') || msg.includes('reach') || msg.includes('email') ||
        msg.includes('phone')) {
        return "📬 Contact Fahad:\n• Email: fahad5805@gmail.com\n• Phone: +92 312 4549028\n• Location: Karachi, Pakistan\n• LinkedIn: linkedin.com/in/fahad-a-955178a8\nUse the contact form on this page too!";
    }
    // About
    if (msg.includes('who') || msg.includes('about') || msg.includes('yourself') || msg.includes('bio')) {
        return "👨‍💻 Fahad Abdullah is a Senior .NET Full Stack Developer with 7+ years of experience. He specializes in ASP.NET Core, C#, React, Angular, and Azure. He has delivered scalable solutions across onboarding, hospitality, payments, and enterprise integration domains. Known for improving performance by 30% and response times by 25%.";
    }
    // Education
    if (msg.includes('edu') || msg.includes('study') || msg.includes('learn') || msg.includes('degree') ||
        msg.includes('school')) {
        return "🎓 Fahad is currently pursuing undergraduate studies at Allama Iqbal Open University (2022-Present). He believes in continuous learning and stays updated with the latest technologies.";
    }
    // Help
    if (msg.includes('help') || msg.includes('what can you') || msg.includes('commands') || msg.includes('do you do')) {
        return "🤖 I can tell you about:\n• Skills & Tech Stack\n• Projects\n• Experience\n• Contact/Hire\n• About Me\n• Education\n• Jokes\n• Easter eggs (try 'sudo' or 'ping')\nJust ask naturally!";
    }

    // Default
    const defaults = [
        "🤔 Great question! Check the Projects or Experience sections. Feel free to ask about Fahad's skills, tech stack, or how to contact him.",
        "📚 Good question! Ask me about Fahad's projects, experience, skills, or say 'help' to see what I can do.",
        "💡 I'm here to help! Ask about Fahad's .NET expertise, React projects, Azure work, or how to get in touch."
    ];
    return defaults[Math.floor(Math.random() * defaults.length)];
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.style.whiteSpace = 'pre-wrap';
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    indicator.style.display = 'flex';
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

function handleUserMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatInput.value = '';
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        addMessage(getAIResponse(message), 'bot');
    }, 400 + Math.random() * 400);
}

chatSend.addEventListener('click', handleUserMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserMessage();
});

// ==========================================================
// SMOOTH SCROLL
// ==========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==========================================================
// FOOTER YEAR
// ==========================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ==========================================================
// CONSOLE EASTER EGG
// ==========================================================
console.log('%c🚀 Fahad Abdullah\'s Portfolio', 'font-size:24px;font-weight:bold;color:#4f8cf7;');
console.log('%c💬 Chat with the AI agent on the bottom right!', 'font-size:14px;color:#888;');
console.log('%c🛠️ Try "sudo" or "ping" in the chat!', 'font-size:14px;color:#888;');
console.log('%c📊 7+ Years · .NET Core · React · Angular · Azure', 'font-size:13px;color:#a78bfa;');
console.log('✨ Made with ❤️ for Fahad Abdullah');

// ==========================================================
// CONTACT FORM - Mailto (Simple & Working)
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('formSuccess');
    
    if (!form) {
        console.error('❌ Form not found!');
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get values
        const name = document.getElementById('userName').value.trim();
        const email = document.getElementById('userEmail').value.trim();
        const subject = document.getElementById('userSubject').value.trim() || 'Portfolio Contact';
        const message = document.getElementById('userMessage').value.trim();
        
        console.log('📝 Form Values:', { name, email, subject, message });
        
        // Validation
        if (!name) {
            alert('⚠️ Please enter your name.');
            document.getElementById('userName').focus();
            return;
        }
        
        if (!email) {
            alert('⚠️ Please enter your email address.');
            document.getElementById('userEmail').focus();
            return;
        }
        
        if (!email.includes('@') || !email.includes('.')) {
            alert('⚠️ Please enter a valid email address (e.g., name@example.com).');
            document.getElementById('userEmail').focus();
            return;
        }
        
        if (!message) {
            alert('⚠️ Please enter your message.');
            document.getElementById('userMessage').focus();
            return;
        }
        
        // Create mailto link
        const mailtoLink = `mailto:fahad5805@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        )}`;
        
        console.log('📧 Opening email client:', mailtoLink);
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        successDiv.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 5000);
    });
});


// ==========================================================
// LAST UPDATED DATE
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        const date = new Date();
        lastUpdated.textContent = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
});

// ==========================================================
// VISITOR COUNTER
// ==========================================================
async function getVisitorCount() {
    try {
        const response = await fetch('https://api.countapi.xyz/hit/fahad-portfolio/visits');
        const data = await response.json();
        console.log(`👁️ Visitors: ${data.value}`);
        
        // Display in footer
        const visitorEl = document.getElementById('visitorCount');
        if (visitorEl) {
            visitorEl.textContent = data.value;
        }
    } catch (error) {
        console.log('Visitor counter not available');
    }
}

// Call on load
document.addEventListener('DOMContentLoaded', getVisitorCount);




// ==========================================================
// GITHUB STATS - JavaScript Version
// ==========================================================
async function fetchGitHubStats() {
    const username = 'Faaddiii'; // Fahad ka GitHub username
    
    try {
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error('User not found');
        const userData = await userRes.json();
        
        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        const reposData = await reposRes.json();
        
        // Calculate stats
        const totalRepos = userData.public_repos || 0;
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        const followers = userData.followers || 0;
        const following = userData.following || 0;
        
        // Top languages
        const languages = {};
        reposData.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        const sortedLangs = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);
        
        // Update HTML
        document.getElementById('githubRepos').textContent = totalRepos;
        document.getElementById('githubStars').textContent = totalStars;
        document.getElementById('githubFollowers').textContent = followers;
        document.getElementById('githubFollowing').textContent = following;
        
        // Update languages
        const langContainer = document.getElementById('githubLangs');
        if (langContainer) {
            langContainer.innerHTML = sortedLangs.map(([lang, count]) => 
                `<span style="display:inline-block;background:var(--surface-light);padding:4px 14px;border-radius:100px;margin:4px;font-size:0.8rem;color:var(--text-muted);border:1px solid var(--border);">
                    ${lang} (${count})
                </span>`
            ).join('');
        }
        
        console.log('✅ GitHub Stats loaded:', { totalRepos, totalStars, followers });
        
    } catch (error) {
        console.error('❌ GitHub API Error:', error);
        document.getElementById('githubRepos').textContent = '⚠️';
        document.getElementById('githubStars').textContent = '⚠️';
        document.getElementById('githubFollowers').textContent = '⚠️';
        document.getElementById('githubFollowing').textContent = '⚠️';
        document.getElementById('githubLangs').innerHTML = '<span style="color:var(--text-muted);">⚠️ Unable to load</span>';
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', fetchGitHubStats);



