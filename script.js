// ===== DOM Content Loaded ===== 
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== Initialize Application =====
function initializeApp() {
    initNavigation();
    initAnimatedCounters();
    initScrollAnimations();
    initProgressBars();
    initSmoothScrolling();
    initParallaxEffects();
    initInteractiveElements();
    initLoadingAnimations();
    initializeProgressTracker();
}

// ===== Navigation Functions =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('mobile-active');
        });
    }

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Animated Counters =====
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('ar-SA');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('ar-SA');
        }
    }, 20);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .program-card, .stat-card, .section-header, .hero-card'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100);
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        scrollObserver.observe(element);
    });
}

// ===== Progress Bars Animation =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const observerOptions = {
        threshold: 0.5
    };

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-out';
                    progressBar.style.width = width;
                }, 500);
                
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Parallax Effects =====
function initParallaxEffects() {
    const floatingShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.02}deg)`;
        });
    });
}

// ===== Interactive Elements =====
function initInteractiveElements() {
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Program cards 3D effect
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Button animations
    const buttons = document.querySelectorAll('.btn, .service-btn, .program-btn, .login-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
        });

        // Ripple effect
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== Loading Animations =====
function initLoadingAnimations() {
    // Add loading classes to elements
    const elements = document.querySelectorAll('.hero-title, .hero-description, .hero-visual');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 200));
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.title-main');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 800);
    }
}

// ===== Intersection Observer for General Animations =====
function createIntersectionObserver(elements, className, options = {}) {
    const defaultOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
        ...options
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
}

// ===== Utility Functions =====
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
    }
}

// ===== Performance Optimizations =====
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events with throttling
    updateNavbarOnScroll();
    updateParallaxEffects();
}, 16); // ~60fps

const optimizedResizeHandler = debounce(() => {
    // Handle resize events with debouncing
    updateLayoutOnResize();
}, 250);

function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function updateParallaxEffects() {
    // Update parallax elements efficiently
    const scrolled = window.pageYOffset;
    document.documentElement.style.setProperty('--scroll', scrolled);
}

function updateLayoutOnResize() {
    // Update layout calculations on window resize
    const heroHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${heroHeight * 0.01}px`);
}

// ===== CSS Animation Styles =====
const animationStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInFromLeft {
        from {
            transform: translateX(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideInFromRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes bounceIn {
        0% {
            transform: scale(0.3);
            opacity: 0;
        }
        50% {
            transform: scale(1.05);
        }
        70% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .animate-slide-left {
        animation: slideInFromLeft 0.6s ease-out forwards;
    }
    
    .animate-slide-right {
        animation: slideInFromRight 0.6s ease-out forwards;
    }
    
    .animate-bounce-in {
        animation: bounceIn 0.6s ease-out forwards;
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// ===== Event Listeners =====
window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// ===== Touch Device Optimizations =====
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Optimize hover effects for touch devices
    const hoverElements = document.querySelectorAll('.service-card, .program-card, .stat-card');
    hoverElements.forEach(element => {
        element.addEventListener('touchstart', () => {
            element.classList.add('touch-hover');
        });
        
        element.addEventListener('touchend', () => {
            setTimeout(() => {
                element.classList.remove('touch-hover');
            }, 300);
        });
    });
}

// ===== Dark Mode Toggle (Future Enhancement) =====
function initDarkMode() {
    const darkModeToggle = document.querySelector('#dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Load saved preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// ===== Form Validation (Future Enhancement) =====
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            validateForm(form);
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            showError(input, 'هذا الحقل مطلوب');
            isValid = false;
        } else {
            hideError(input);
        }
    });
    
    if (isValid) {
        // Submit form
        submitForm(form);
    }
}

function showError(input, message) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    input.classList.add('error');
}

function hideError(input) {
    const errorElement = input.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    input.classList.remove('error');
}

function submitForm(form) {
    // Handle form submission
    console.log('Form submitted successfully');
}

// ===== Initialize Additional Features =====
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initFormValidation();
});

// ===== Console Welcome Message =====
console.log(`
    🌟 مرحباً بك في موقع زامل 🌟
    
    تم تطوير هذا الموقع بأحدث التقنيات:
    ✅ HTML5 Semantic
    ✅ CSS3 Advanced
    ✅ JavaScript ES6+
    ✅ Responsive Design
    ✅ Performance Optimized
    
    للمطورين: هذا الموقع يستخدم Intersection Observer API
    و CSS Grid و Flexbox و CSS Custom Properties
    
    🚀 استمتع بالتصفح!
`);

// ===== Performance Monitoring =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`⚡ Page Load Time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

// ===== Sign Out Popup Functionality =====
function createSignOutPopup() {
    // Remove existing popup if any
    const existingPopup = document.getElementById('signOutModal');
    if (existingPopup) {
        existingPopup.remove();
    }

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'signOutModal';
    overlay.className = 'modal-overlay';
    
    // Create modal content
    const modalContent = `
        <div class="modal-container">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="fas fa-sign-out-alt"></i>
                    تسجيل الخروج
                </h3>
            </div>
            <div class="modal-body">
                <div class="modal-icon">
                    <i class="fas fa-question-circle"></i>
                </div>
                <p class="modal-message">هل أنت متأكد من رغبتك في تسجيل الخروج؟</p>
                <p class="modal-submessage">سيتم حذف جميع البيانات المحفوظة محلياً</p>
            </div>
            <div class="modal-actions">
                <button id="confirmLogoutBtn" class="btn btn-danger">
                    <i class="fas fa-check"></i>
                    نعم، تسجيل الخروج
                </button>
                <button id="cancelLogoutBtn" class="btn btn-secondary">
                    <i class="fas fa-times"></i>
                    إلغاء
                </button>
            </div>
        </div>
    `;
    
    overlay.innerHTML = modalContent;
    document.body.appendChild(overlay);
    
    // Show modal with animation
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    // Handle confirm logout
    document.getElementById('confirmLogoutBtn').addEventListener('click', function() {
        const btn = this;
        // Show loading state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الخروج...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        // Clear data and redirect
        setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            
            // Show success toast if available
            if (typeof showToast === 'function') {
                showToast('✅ تم تسجيل الخروج بنجاح', 'success');
            }
            
            // Close modal and redirect
            closeSignOutModal();
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1000);
    });
    
    // Handle cancel
    document.getElementById('cancelLogoutBtn').addEventListener('click', closeSignOutModal);
    
    // Close on overlay click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeSignOutModal();
        }
    });
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeSignOutModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function closeSignOutModal() {
    const modal = document.getElementById('signOutModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Main function to show sign out popup
function showSignOutPopup() {
    createSignOutPopup();
}

// Simple toast notification function for sign out feedback
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
}

// ===== Enhanced Progress Tracker =====
function initializeProgressTracker() {
    // Calculate total width needed to reach the medal
    const progressPath = document.querySelector('.progress-path');
    const progressSteps = document.querySelectorAll('.progress-step');
    const finalMedal = document.querySelector('.final-medal');
    
    if (progressPath && progressSteps.length > 0 && finalMedal) {
        const firstStep = progressSteps[0];
        const lastStep = progressSteps[progressSteps.length - 1];
        
        // Calculate positions
        const firstStepRect = firstStep.getBoundingClientRect();
        const lastStepRect = lastStep.getBoundingClientRect();
        const medalRect = finalMedal.getBoundingClientRect();
        
        // Calculate total width needed
        const totalWidth = medalRect.right - firstStepRect.left;
        
        // Set container width
        progressPath.style.width = `${totalWidth}px`;
        
        // Update progress line colors based on module completion
        updateDynamicLineColors();
    }
    
    // Show progress line immediately
    const progressFill = document.querySelector('.progress-line-fill');
    if (progressFill) {
        // Make line visible immediately
        progressFill.style.width = '100%';
    }
    
    // Add tooltips to progress steps
    addProgressTooltips();
    
    // Add click handlers for progress steps
    addProgressStepHandlers();
}

function updateDynamicLineColors() {
    // Get all progress steps and their percentages
    const progressSteps = document.querySelectorAll('.progress-step');
    const colors = [];
    
    progressSteps.forEach((step, index) => {
        const percentage = parseInt(step.getAttribute('data-percentage')) || 0;
        let color;
        
        // Create smooth color transition based on percentage
        if (percentage === 100) {
            color = '#28a745'; // Full green for 100%
        } else if (percentage >= 80) {
            color = '#32cd32'; // Lime green for 80-99%
        } else if (percentage >= 60) {
            color = '#90ee90'; // Light green for 60-79%
        } else if (percentage >= 40) {
            color = '#98fb98'; // Pale green for 40-59%
        } else if (percentage >= 20) {
            color = '#f0fff0'; // Honeydew for 20-39%
        } else if (percentage > 0) {
            color = '#f8f8ff'; // Ghost white for 1-19%
        } else {
            color = '#e5e5e5'; // Light gray for 0%
        }
        
        colors.push(color);
    });
    
    // Add medal color (full green) - extends line to medal
    colors.push('#28a745');
    
    // Update the progress line gradient with smooth transitions
    const progressFill = document.querySelector('.progress-line-fill');
    
    if (progressFill) {
        // Create gradient stops based on module positions
        let gradientStops = '';
        const stepCount = progressSteps.length;
        
        progressSteps.forEach((step, index) => {
            const position = (index / stepCount) * 100;
            const color = colors[index];
            gradientStops += `${color} ${position}%, `;
        });
        
        // Add final medal color
        gradientStops += `${colors[colors.length - 1]} 100%`;
        
        progressFill.style.background = `linear-gradient(to right, ${gradientStops})`;
        progressFill.style.width = '100%'; // Ensure line reaches medal
    }
}

function addProgressTooltips() {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    progressSteps.forEach(step => {
        const module = step.getAttribute('data-module');
        const percentage = step.getAttribute('data-percentage');
        const status = step.getAttribute('data-status');
        
        let statusText = '';
        switch(status) {
            case 'completed':
                statusText = 'مكتمل';
                break;
            case 'in-progress':
                statusText = 'قيد التقدم';
                break;
            case 'not-started':
                statusText = 'لم يبدأ';
                break;
            default:
                statusText = 'غير محدد';
        }
        
        const tooltip = `الوحدة ${module}: ${percentage}% - ${statusText}`;
        step.setAttribute('data-tooltip', tooltip);
    });
}

function addProgressStepHandlers() {
    const progressSteps = document.querySelectorAll('.progress-step');
    
    progressSteps.forEach(step => {
        step.addEventListener('click', () => {
            const module = step.getAttribute('data-module');
            const percentage = step.getAttribute('data-percentage');
            
            // Show module details
            showModuleDetails(module, percentage);
        });
        
        step.addEventListener('mouseenter', () => {
            step.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        step.addEventListener('mouseleave', () => {
            step.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function showModuleDetails(module, percentage) {
    // Create and show modal with module details
    const modal = document.createElement('div');
    modal.className = 'module-details-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-navy) 100%);
            border-radius: 1rem;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            color: white;
            position: relative;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        ">
            <button style="
                position: absolute;
                top: 1rem;
                left: 1rem;
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            " onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3 style="margin: 0 0 1rem 0; text-align: center;">الوحدة ${module}</h3>
            <div style="text-align: center; margin-bottom: 2rem;">
                <div style="font-size: 3rem; font-weight: bold; color: var(--accent-gold);">${percentage}%</div>
                <div style="color: rgba(255, 255, 255, 0.8);">نسبة الإكمال</div>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button style="
                    background: var(--gradient-button);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                    transition: transform 0.3s ease;
                " onclick="this.parentElement.parentElement.parentElement.remove()">
                    الذهاب للوحدة
                </button>
                <button style="
                    background: transparent;
                    color: white;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                " onclick="this.parentElement.parentElement.parentElement.remove()">
                    إغلاق
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // Close modal with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}