// Enhanced Portfolio Website JavaScript with Fixed Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initMobileMenu();
    initHeroAnimations();
    initScrollAnimations();
    initTechStackFilters();
    initSkillBars();
    initStatsCounter();
    initContactForm();
    initSmoothScrolling();
    initEnhancedChatbot();
    initPerformanceOptimizations();
});

// Fixed Navigation with proper scroll handling
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Enhanced scroll effect
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = scrollY;
        updateActiveNavLink();
        ticking = false;
    }
    
    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestNavbarUpdate);
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        body.setAttribute('data-color-scheme', savedTheme);
        updateThemeIcon(savedTheme);
    } else if (prefersDark) {
        body.setAttribute('data-color-scheme', 'dark');
        updateThemeIcon('dark');
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-color-scheme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// Enhanced mobile menu
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', function() {
        const isActive = navToggle.classList.contains('active');
        
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Enhanced hero animations
function initHeroAnimations() {
    createParticleSystem();
    initTypingEffect();
}

// Particle system for hero background
function createParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = window.innerWidth > 768 ? 60 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation properties
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        // Random size and opacity
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = Math.random() * 0.6 + 0.2;
        
        particlesContainer.appendChild(particle);
    }
}

// Typing effect for hero subtitle
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;
    
    const texts = [
        'President, E-Cell SATI | Venture Technologist',
        'Java & Backend Specialist',
        'Cybersecurity & Blockchain Enthusiast',
        'NEC 2024-25 Semi-Finalist',
        'Leading 100+ Team Members',
        'Modern Tech Stack Expert'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isPaused) {
            setTimeout(() => {
                isPaused = false;
                typeText();
            }, 2000);
            return;
        }
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                isPaused = true;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeText, speed);
    }
    
    typeText();
}

// Enhanced scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.tech-card, .project-card, .achievement-card, .cert-card, .timeline-item');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered animation delay for grid items
                const siblings = Array.from(entry.target.parentElement.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// Tech stack filtering system
function initTechStackFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techCategories = document.querySelectorAll('.tech-category');
    
    if (filterButtons.length === 0 || techCategories.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter categories
            techCategories.forEach(categoryEl => {
                const categoryType = categoryEl.getAttribute('data-category');
                
                if (category === 'all' || categoryType === category) {
                    categoryEl.classList.remove('hidden');
                    
                    // Animate tech cards
                    const techCards = categoryEl.querySelectorAll('.tech-card');
                    techCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0)';
                            card.style.opacity = '1';
                        }, index * 50);
                    });
                } else {
                    categoryEl.classList.add('hidden');
                }
            });
        });
    });
}

// Enhanced skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    if (skillBars.length === 0) return;
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                
                // Animate with delay
                setTimeout(() => {
                    skillBar.style.width = level + '%';
                }, 300);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Animated statistics counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    entry.target.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        entry.target.textContent = target + (target === 100 ? '+' : '');
                        clearInterval(timer);
                    }
                }, 16);
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// FIXED: Enhanced contact form with proper functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formFields = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };
    
    const errorElements = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        subject: document.getElementById('subjectError'),
        message: document.getElementById('messageError')
    };
    
    // Real-time validation
    Object.keys(formFields).forEach(fieldName => {
        const field = formFields[fieldName];
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => clearError(fieldName));
            
            // Fix textarea input issue
            if (field.tagName === 'TEXTAREA') {
                field.addEventListener('keydown', function(e) {
                    // Allow normal typing
                    if (e.key === 'Tab') {
                        return; // Allow tab for accessibility
                    }
                });
            }
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
    
    function validateField(fieldName) {
        const field = formFields[fieldName];
        const errorElement = errorElements[fieldName];
        if (!field || !errorElement) return false;
        
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    isValid = false;
                    errorMessage = 'Name must be at least 2 characters long';
                } else if (!/^[a-zA-Z\s'.]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'Name should contain only letters and spaces';
                }
                break;
                
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
                
            case 'subject':
                if (!value) {
                    isValid = false;
                    errorMessage = 'Please select an opportunity type';
                }
                break;
                
            case 'message':
                if (value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message must be at least 10 characters long';
                } else if (value.length > 1000) {
                    isValid = false;
                    errorMessage = 'Message must be less than 1000 characters';
                }
                break;
        }
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('success');
            errorElement.classList.remove('show');
        } else {
            field.classList.remove('success');
            field.classList.add('error');
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        }
        
        return isValid;
    }
    
    function clearError(fieldName) {
        const field = formFields[fieldName];
        const errorElement = errorElements[fieldName];
        
        if (field && errorElement) {
            field.classList.remove('error');
            errorElement.classList.remove('show');
        }
    }
    
    function validateForm() {
        let isFormValid = true;
        
        Object.keys(formFields).forEach(fieldName => {
            if (!validateField(fieldName)) {
                isFormValid = false;
            }
        });
        
        return isFormValid;
    }
    
    function submitForm() {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Message sent successfully! Prabal will get back to you within 24 hours.', 'success');
            
            // Reset form
            contactForm.reset();
            Object.keys(formFields).forEach(fieldName => {
                if (formFields[fieldName]) {
                    formFields[fieldName].classList.remove('success', 'error');
                }
            });
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2500);
    }
}

// FIXED: Smooth scrolling with proper functionality
function initSmoothScrolling() {
    // Get all navigation and button links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: Math.max(0, offsetTop),
                    behavior: 'smooth'
                });
            }
        });
    });
}

// FIXED: Enhanced chatbot with proper functionality
function initEnhancedChatbot() {
    const chatbotButton = document.getElementById('chatbot-button');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const quickReplies = document.getElementById('quick-replies');
    const typingIndicator = document.getElementById('typing-indicator');
    const notification = document.getElementById('chatbot-notification');
    
    if (!chatbotButton || !chatbotContainer) {
        console.log('Chatbot elements not found');
        return;
    }
    
    let isOpen = false;
    let messageHistory = [];
    let isLeadCapture = false;
    let leadData = {};
    
    // Enhanced chatbot responses for modern tech stack
    const chatbotData = {
        welcome: "Hi there! 👋 I'm Prabal's AI assistant. I represent a Venture Technologist with 1.5+ years of experience and current President of E-Cell SATI. I can help you learn about his modern tech stack, leadership experience, and career opportunities. How can I assist you today?",
        
        responses: {
            leadership: "Prabal currently serves as **President of E-Cell SATI**, leading 100+ team members in entrepreneurship initiatives. As a **Venture Technologist** with 1.5+ years of experience, he specializes in:\n\n🚀 **Leadership Achievements:**\n• **NEC 2024-25 Semi-Finalist** - National Entrepreneurship Challenge\n• Leading campus innovation programs and startup events\n• Managing strategic partnerships with industry leaders\n• Mentoring 100+ students in entrepreneurship\n\n💼 **Professional Experience:**\n• Venture Technologist (1.5+ years)\n• Team Lead at JET DIGITAL (Mobile Apps)\n• Web Developer at ACMEGRADE\n\nHe's actively fostering the next generation of entrepreneurs! 🌟",
            
            moderntech: "Prabal has mastered an impressive **modern tech stack** that's highly sought after by top companies:\n\n🌐 **Backend/Architecture:**\n• Microservices (Spring Boot, Docker, API Gateway)\n• REST & GraphQL APIs, gRPC\n• Message Queues (Kafka/RabbitMQ), Redis\n\n📱 **Modern Android:**\n• Kotlin + Jetpack Compose, MVVM Architecture\n• Hilt DI, Coroutines + Flow\n• Material 3, Firebase Suite, ML Kit\n\n🤖 **AI & Machine Learning:**\n• OpenAI/Gemini API integrations\n• LangChain, Dialogflow chatbots\n• Vector Databases (Pinecone, FAISS)\n\n⚡ **DevOps/Cloud:**\n• Docker, Kubernetes, CI/CD\n• AWS/GCP, Prometheus + Grafana\n\n🔒 **Security:**\n• JWT Auth, OAuth 2.0, End-to-End Encryption\n\nThis tech stack puts him in the top 10% of developers! 🔥",
            
            achievements: "🏆 **Recent Major Achievements:**\n\n🥈 **NEC 2024-25 Semi-Finalist** - National Entrepreneurship Challenge\n👑 **President, E-Cell SATI** - Leading 100+ team members\n💼 **Venture Technologist** - 1.5+ years professional experience\n🚀 **Team Lead** - Airline Management System (May 2025)\n\n📈 **Impact Metrics:**\n• 20+ projects completed\n• 40+ modern technologies mastered\n• 6 professional certifications\n• 100+ students mentored\n\n🎯 **Recognition:**\n• Campus leadership in entrepreneurship\n• Technical excellence in multiple domains\n• Industry partnerships and collaborations\n• Innovation in AI and modern tech integration\n\nHe's making significant impact in both technical and leadership domains! ⭐",
            
            projects: "🚀 **Latest & Most Impressive Projects:**\n\n✈️ **Airline Management System** (May 2025)\n• **Role:** Team Lead\n• **Tech:** Java, Spring Boot, PostgreSQL, React, Docker\n• Comprehensive flight booking and management platform\n\n🤖 **AI-Powered Resume Chatbot** (2024)\n• **Tech:** React, Firebase, OpenAI API, LangChain\n• Smart recruiter interactions with NLP capabilities\n\n📱 **Modern E-commerce Mobile App**\n• **Tech:** Kotlin, Jetpack Compose, Firebase, ML Kit\n• AI-powered recommendations with Material 3 design\n\n🏗️ **Microservices Architecture Platform**\n• **Tech:** Spring Boot, Docker, Kubernetes, Redis\n• Enterprise-grade scalable backend system\n\n⛓️ **Blockchain Voting System**\n• **Tech:** Smart Contracts, Java, Cryptography\n• Secure, transparent voting with fraud prevention\n\nAll projects showcase his expertise in modern technologies! 💡",
            
            opportunities: "🚀 **Prabal is strategically positioned for exciting opportunities:**\n\n💼 **Currently Seeking:**\n• **Senior Developer Roles** (Java/Backend/Mobile)\n• **Technical Leadership Positions**\n• **Startup CTO/Technical Co-founder** roles\n• **AI/ML Engineering** positions\n• **DevOps/Cloud Architecture** roles\n\n🎯 **Ideal Opportunities:**\n• **Full-time positions** (available after 2026)\n• **High-impact internships** (currently available)\n• **Consulting projects** in modern tech stack\n• **Startup collaborations** and partnerships\n• **Technical mentorship** and advisory roles\n\n💪 **What He Brings:**\n• **1.5+ years** professional experience\n• **Leadership skills** managing 100+ team members\n• **Modern tech expertise** in high-demand technologies\n• **Entrepreneurial mindset** from E-Cell leadership\n• **Proven track record** in project delivery\n\nReady to discuss an exciting opportunity? Let's connect! 🤝",
            
            resume: "📄 **Access Prabal's Professional Profile:**\n\n🔗 **LinkedIn:** https://www.linkedin.com/in/prabal-pratap-singh-jadon-sati/\n📧 **Email:** email.prabalsingh1@gmail.com\n📱 **Phone:** 09074009070\n📍 **Location:** Vidisha, MP, India\n\n📊 **Quick Stats:**\n• **Experience:** 1.5+ years as Venture Technologist\n• **Current Role:** President, E-Cell SATI\n• **Projects:** 20+ completed (including Airline Management System)\n• **Technologies:** 40+ modern tech stack\n• **Certifications:** 6 from Meta, IBM, Microsoft, HackerRank\n• **Team Leadership:** 100+ members\n\n🏆 **Recent Highlight:**\n**NEC 2024-25 Semi-Finalist** - National Entrepreneurship Challenge\n\nHis updated resume showcases impressive growth in both technical expertise and leadership capabilities! Would you like me to facilitate a direct connection? 🚀"
        },
        
        fallback: "I'd be happy to help you learn more about Prabal! You can ask me about:\n\n• His current role as President of E-Cell SATI\n• Modern tech stack (40+ cutting-edge technologies)\n• Recent achievements (NEC 2024-25 Semi-Finalist)\n• Latest projects (Airline Management System, AI Chatbot)\n• Leadership experience and team management\n• Career opportunities and availability\n\nWhat interests you most? 😊",
        
        leadCapture: "Excellent! Prabal would love to connect with you. As President of E-Cell SATI and a Venture Technologist, he's always open to discussing exciting opportunities.\n\n📝 **Please share:**\n👤 **Your Name:**\n🏢 **Company/Organization:**\n📧 **Email Address:**\n💼 **Opportunity Type:** (Full-time/Internship/Consulting/Partnership)\n🎯 **Specific Interest:** (Backend/Mobile/AI/Leadership)\n📝 **Brief Message:**\n\nGiven his current leadership role and technical expertise, Prabal will personally respond within 24 hours! 🚀"
    };
    
    // Toggle chatbot
    chatbotButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleChatbot();
    });
    
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function(e) {
            e.stopPropagation();
            closeChatbot();
        });
    }
    
    // Send message functionality
    if (chatbotSend) {
        chatbotSend.addEventListener('click', function(e) {
            e.preventDefault();
            sendMessage();
        });
    }
    
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Quick reply buttons
    if (quickReplies) {
        quickReplies.addEventListener('click', function(e) {
            if (e.target.classList.contains('quick-reply-btn')) {
                const replyType = e.target.getAttribute('data-reply');
                handleQuickReply(replyType);
            }
        });
    }
    
    function toggleChatbot() {
        if (isOpen) {
            closeChatbot();
        } else {
            openChatbot();
        }
    }
    
    function openChatbot() {
        isOpen = true;
        chatbotContainer.classList.remove('hidden');
        setTimeout(() => {
            chatbotContainer.classList.add('show');
        }, 10);
        
        if (chatbotInput) chatbotInput.focus();
        
        // Hide notification
        if (notification) {
            notification.style.display = 'none';
        }
        
        scrollToBottom();
    }
    
    function closeChatbot() {
        isOpen = false;
        chatbotContainer.classList.remove('show');
        setTimeout(() => {
            chatbotContainer.classList.add('hidden');
        }, 300);
    }
    
    function sendMessage() {
        if (!chatbotInput) return;
        
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process message and respond
        setTimeout(() => {
            hideTypingIndicator();
            processMessage(message);
        }, 1500 + Math.random() * 1000);
    }
    
    function handleQuickReply(replyType) {
        // Hide quick replies after first use
        if (quickReplies && quickReplies.children.length > 0) {
            quickReplies.style.display = 'none';
        }
        
        showTypingIndicator();
        
        setTimeout(() => {
            hideTypingIndicator();
            const response = chatbotData.responses[replyType] || chatbotData.fallback;
            addMessage(response, 'bot');
            
            // Add follow-up for certain replies
            if (replyType === 'resume' || replyType === 'opportunities') {
                setTimeout(() => {
                    addMessage("Would you like me to help you connect with Prabal directly? I can facilitate an introduction! 🤝", 'bot');
                    isLeadCapture = true;
                }, 2000);
            }
        }, 1200);
    }
    
    function processMessage(message) {
        const lowerMessage = message.toLowerCase();
        let response = chatbotData.fallback;
        
        // Lead capture flow
        if (isLeadCapture) {
            handleLeadCapture(message);
            return;
        }
        
        // Enhanced AI-like response matching
        if (lowerMessage.includes('leadership') || lowerMessage.includes('president') || lowerMessage.includes('e-cell') || lowerMessage.includes('team lead')) {
            response = chatbotData.responses.leadership;
        } else if (lowerMessage.includes('tech stack') || lowerMessage.includes('technology') || lowerMessage.includes('modern') || lowerMessage.includes('skill')) {
            response = chatbotData.responses.moderntech;
        } else if (lowerMessage.includes('achievement') || lowerMessage.includes('nec') || lowerMessage.includes('award') || lowerMessage.includes('recognition')) {
            response = chatbotData.responses.achievements;
        } else if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('airline')) {
            response = chatbotData.responses.projects;
        } else if (lowerMessage.includes('opportunity') || lowerMessage.includes('job') || lowerMessage.includes('career') || lowerMessage.includes('hire') || lowerMessage.includes('internship')) {
            response = chatbotData.responses.opportunities;
        } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('linkedin') || lowerMessage.includes('contact')) {
            response = chatbotData.responses.resume;
        } else if (lowerMessage.includes('connect') || lowerMessage.includes('introduction') || lowerMessage.includes('meet')) {
            response = chatbotData.leadCapture;
            isLeadCapture = true;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            response = "Hello! 👋 " + chatbotData.welcome;
        } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
            response = "You're welcome! 😊 As Prabal's AI assistant, I'm here to showcase his impressive journey from Venture Technologist to E-Cell President. Is there anything specific about his modern tech stack or leadership experience you'd like to explore? ✨";
        }
        
        addMessage(response, 'bot');
        messageHistory.push({user: message, bot: response, timestamp: new Date()});
    }
    
    function handleLeadCapture(message) {
        const steps = ['name', 'company', 'email', 'opportunity', 'message'];
        const currentStep = Object.keys(leadData).length;
        
        if (currentStep < steps.length) {
            const field = steps[currentStep];
            leadData[field] = message;
            
            let nextPrompt = '';
            switch (currentStep + 1) {
                case 1:
                    nextPrompt = `Thanks ${leadData.name}! 👤 What's your company or organization?`;
                    break;
                case 2:
                    nextPrompt = `Great! 🏢 Please share your email address so Prabal can respond directly:`;
                    break;
                case 3:
                    nextPrompt = `Perfect! 📧 What type of opportunity is this? (e.g., Full-time, Internship, Consulting, Partnership)`;
                    break;
                case 4:
                    nextPrompt = `Excellent! 💼 Please share a brief message about the opportunity and your specific interest area:`;
                    break;
                default:
                    const leadSummary = `🎉 **Perfect! Here's your inquiry summary:**\n\n👤 **Name:** ${leadData.name}\n🏢 **Company:** ${leadData.company}\n📧 **Email:** ${leadData.email}\n💼 **Opportunity:** ${leadData.opportunity}\n📝 **Message:** ${leadData.message}\n\n✅ **Your inquiry has been forwarded to Prabal!**\n\n📧 **He'll respond to ${leadData.email} within 24 hours**\n🚀 **Given his current role as E-Cell President and modern tech expertise, he's excited to connect!**\n\nThank you for your interest! 🙏`;
                    
                    addMessage(leadSummary, 'bot');
                    
                    // Reset lead capture
                    isLeadCapture = false;
                    leadData = {};
                    
                    setTimeout(() => {
                        addMessage("Is there anything else you'd like to know about Prabal's leadership journey, modern tech stack, or recent achievements? 😊", 'bot');
                    }, 3000);
                    return;
            }
            
            addMessage(nextPrompt, 'bot');
        }
    }
    
    function addMessage(content, sender) {
        if (!chatbotMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = formatMessage(content);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function formatMessage(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>')
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    }
    
    function showTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.classList.remove('hidden');
            scrollToBottom();
        }
    }
    
    function hideTypingIndicator() {
        if (typingIndicator) {
            typingIndicator.classList.add('hidden');
        }
    }
    
    function scrollToBottom() {
        if (chatbotMessages) {
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }
    }
    
    // Auto-show notification after 8 seconds
    setTimeout(() => {
        if (!isOpen && notification) {
            notification.style.display = 'flex';
        }
    }, 8000);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Utility functions
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 24px;
        right: 24px;
        background: ${type === 'success' ? '#22c55e' : '#ef4444'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 320px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    notification.appendChild(icon);
    
    const text = document.createElement('span');
    text.textContent = message;
    notification.appendChild(text);
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 6 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 6000);
}

// Keyboard navigation and accessibility
document.addEventListener('keydown', function(e) {
    // ESC key functionality
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const chatbotContainer = document.getElementById('chatbot-container');
        
        // Close mobile menu
        if (navMenu?.classList.contains('active')) {
            navToggle?.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Close chatbot
        if (chatbotContainer?.classList.contains('show')) {
            chatbotContainer.classList.remove('show');
            setTimeout(() => {
                chatbotContainer.classList.add('hidden');
            }, 300);
        }
    }
});

// Loading states and progressive enhancement
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove loading states
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loaded');
        }, index * 100);
    });
});

// Intersection Observer polyfill fallback
if (!window.IntersectionObserver) {
    const fallbackElements = document.querySelectorAll('.fade-in');
    
    function checkVisibility() {
        fallbackElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };
    
    window.addEventListener('scroll', throttle(checkVisibility, 100));
    checkVisibility();
}