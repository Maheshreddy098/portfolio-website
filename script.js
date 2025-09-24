// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initContactForm();
    initResumeDownload();
    initParallaxEffects();
    initTypingAnimation();
    initCounters();
    initScrollIndicator();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger bars
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.getBoundingClientRect().top + window.scrollY;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// Theme Toggle functionality
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    
    // Update theme toggle icon based on current theme
    function updateThemeIcon() {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if (themeToggle) {
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
    
    // Initialize icon
    updateThemeIcon();
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
            
            // Smooth transition effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillItems(entry.target.parentElement);
                }
                if (entry.target.classList.contains('stat-card')) {
                    animateCounter(entry.target);
                }
                if (entry.target.classList.contains('timeline-item')) {
                    animateTimelineItem(entry.target);
                }
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll(
        '.about-content, .skill-category, .stat-card, .timeline-item, ' +
        '.project-card, .achievement-card, .contact-item, .contact-form'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Animate skill items with stagger effect
function animateSkillItems(container) {
    const skillItems = container.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'scale(1)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Counter animation for stats
function animateCounter(statCard) {
    const counter = statCard.querySelector('h3');
    const finalValue = parseInt(counter.textContent);
    
    if (!isNaN(finalValue)) {
        let currentValue = 0;
        const increment = finalValue / 30;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                counter.textContent = finalValue + (counter.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(currentValue);
            }
        }, 50);
    }
}

// Timeline item animation
function animateTimelineItem(item) {
    const content = item.querySelector('.timeline-content');
    const dot = item.querySelector('.timeline-dot');
    
    setTimeout(() => {
        dot.style.transform = 'scale(1.2)';
        setTimeout(() => {
            dot.style.transform = 'scale(1)';
        }, 200);
    }, 300);
    
    content.style.animation = 'slideInUp 0.6s ease forwards';
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        }, 2000);
    });
    
    // Input focus animations
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

// Resume download functionality
function initResumeDownload() {
    const downloadBtn = document.getElementById('download-resume');
    const modal = document.getElementById('resume-modal');
    const closeModal = modal.querySelector('.close');
    
    downloadBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        
        // Start download animation
        setTimeout(() => {
            generateAndDownloadResume();
        }, 1000);
        
        // Close modal after download
        setTimeout(() => {
            modal.style.display = 'none';
        }, 4000);
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Generate and download resume
function generateAndDownloadResume() {
    // Open the professional resume template in a new window for printing/saving
    const resumeWindow = window.open('assets/resume-professional.html', '_blank', 'width=800,height=1000');
    
    // Focus on the new window
    if (resumeWindow) {
        resumeWindow.focus();
        
        // Wait for the window to load, then trigger print dialog
        resumeWindow.onload = function() {
            setTimeout(() => {
            }, 500);
        };
        
        showNotification('Professional resume opened for download/print!', 'success');
    } else {
        // Fallback: create a text version if popup is blocked
        createTextResume();
    }
}

// Fallback function to create text resume
function createTextResume() {
    const resumeContent = `
KOMMA MAHESWAR REDDY
Computer Science Graduate & AWS Enthusiast
Phone: +91 8688665705
Email: kmaheshwarreddy6@gmail.com
Location: Kadiri, Andhra Pradesh, 515521

CAREER OBJECTIVE
Highly motivated and detail-oriented computer science graduate with a solid foundation in Python and AWS. Seeking to leverage my skills in full-stack development and problem-solving to contribute to a collaborative software development team. Passionate about creating efficient, user-friendly applications and driving innovation through technology.

TECHNICAL SKILLS
Programming Languages: Python, HTML5, CSS3
AWS Services: EC2, Lambda, S3, RDS, ELB, API Gateway, VPC
Database & OS: MySQL, Windows

PROJECT EXPERIENCE
Automated Vehicle Damage Localization and Severity Estimation (Feb 2025 - July 2025)
Technical Stack: Python (TensorFlow, PyTorch, OpenCV), Flask
Project Type: Machine Learning Development
Key Responsibilities:
→ Developed an end-to-end deep learning system for automated vehicle damage assessment
→ Designed and implemented three specialized deep learning modules for damage detection
→ Conducted comprehensive evaluation and performance analysis of each module
→ Successfully integrated multiple deep learning modules into a cohesive system
→ Utilized computer vision techniques with OpenCV for image processing and analysis

EDUCATION
2025 - Master of Computer Science (CGPA: 8.5/10.0)
       Annamacharya Institute of Technology & Sciences, Rajampeta, Andhra Pradesh, India

2023 - Bachelor of Science (CGPA: 6.4/10.0)
       STSN GCD, Kadiri, Andhra Pradesh, India

2017 - Secondary School Certificate (CGPA: 8.7/10.0)
       Adarsha High School, Andhra Pradesh, India

KEY ACHIEVEMENTS
• AWS Cloud Practitioner - Successfully completed certification course in Simple Learn
• Software Testing Certification - Certified in software testing by NPTEL

PERSONAL DETAILS
Date of Birth: 05 April 2002
Nationality: Indian
Marital Status: Single

DECLARATION
I hereby declare that the information furnished above is true to the best of my knowledge and belief.

Date: 09/08/2025                                    Komma Maheswar Reddy
    `;
    
    // Create and download file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Komma_Maheswar_Reddy_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showNotification('Resume downloaded successfully!', 'success');
}

// Parallax effects (disabled for better scroll performance)
function initParallaxEffects() {
    // Parallax disabled to prevent scroll interference with About section
    // If you want to re-enable, use a throttled scroll event and target only specific elements
    
    /* 
    const throttledScroll = throttle(function() {
        const scrolled = window.pageYOffset;
        const heroElement = document.querySelector('.hero');
        
        if (heroElement && scrolled < window.innerHeight) {
            const speed = 0.3;
            heroElement.style.transform = `translateY(${scrolled * speed}px)`;
        }
    }, 16); // 60fps
    
    window.addEventListener('scroll', throttledScroll);
    */
}

// Typing animation for hero section
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    const text = subtitle.textContent;
    subtitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1500);
}

// Initialize counters
function initCounters() {
    // This is handled in the scroll animations
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
    
    scrollIndicator.addEventListener('click', function() {
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(notificationStyles);

// Performance optimization: Use requestAnimationFrame for smooth animations
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
}

// Initialize smooth scrolling
smoothScroll();

// Add loading animation for images (if any are added later)
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// Call image loading function
initImageLoading();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close modal if open
        const modal = document.getElementById('resume-modal');
        if (modal.style.display === 'block') {
            modal.style.display = 'none';
        }
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add focus trap for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Apply focus trap to modal
const modal = document.getElementById('resume-modal');
trapFocus(modal);

console.log('Portfolio website initialized successfully! ✨');