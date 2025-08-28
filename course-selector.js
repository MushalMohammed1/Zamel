// ===== Universal Course Selector Component =====
// This module provides standardized course selector functionality for all pages

/**
 * Initialize course selector functionality
 * @param {Object} options - Configuration options
 * @param {string} options.containerSelector - CSS selector for the course selector container (default: '#studySelector')
 * @param {string} options.triggerSelector - CSS selector for the dropdown trigger (default: '#studyInfo')
 * @param {string} options.dropdownSelector - CSS selector for the dropdown menu (default: '#studyDropdown')
 * @param {string} options.itemsSelector - CSS selector for dropdown items (default: '.study-dropdown-item')
 * @param {Function} options.onCourseChange - Callback function when course is changed
 * @param {boolean} options.showToast - Whether to show toast notifications (default: true)
 */
function initCourseSelector(options = {}) {
    const config = {
        containerSelector: '#studySelector',
        triggerSelector: '#studyInfo',
        dropdownSelector: '#studyDropdown',
        itemsSelector: '.study-dropdown-item',
        onCourseChange: null,
        showToast: true,
        ...options
    };

    // Get DOM elements
    const container = document.querySelector(config.containerSelector);
    const trigger = document.querySelector(config.triggerSelector);
    const dropdown = document.querySelector(config.dropdownSelector);
    const items = document.querySelectorAll(config.itemsSelector);

    // Validate required elements
    if (!container || !trigger || !dropdown) {
        console.warn('Course selector: Required elements not found', {
            container: !!container,
            trigger: !!trigger,
            dropdown: !!dropdown
        });
        return false;
    }

    // Toggle dropdown on trigger click
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const isOpen = dropdown.classList.contains('show');
        if (isOpen) {
            dropdown.classList.remove('show');
            container.classList.remove('open');
        } else {
            dropdown.classList.add('show');
            container.classList.add('open');
        }
        
        // Close other potential dropdowns
        closeOtherDropdowns();
    });

    // Handle course selection
    items.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Check if it's a coming soon item
            if (this.classList.contains('coming-soon-item')) {
                if (config.showToast) {
                    showCourseToast('هذه المادة ستكون متاحة قريباً! 🚀', 'info');
                }
                return;
            }
            
            // Remove active from all available items
            items.forEach(i => {
                if (!i.classList.contains('coming-soon-item')) {
                    i.classList.remove('active');
                }
            });
            
            // Add active to clicked item
            this.classList.add('active');
            
            // Get course information
            const courseData = extractCourseData(this);
            
            // Update trigger text
            updateTriggerText(trigger, courseData);
            
            // Close dropdown
            dropdown.classList.remove('show');
            container.classList.remove('open');
            
            // Show notification
            if (config.showToast) {
                showCourseToast(`تم تغيير المادة إلى ${courseData.name}`);
            }
            
            // Call custom callback if provided
            if (config.onCourseChange && typeof config.onCourseChange === 'function') {
                config.onCourseChange(courseData, this);
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
            dropdown.classList.remove('show');
            container.classList.remove('open');
        }
    });

    // Close dropdown when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            dropdown.classList.remove('show');
            container.classList.remove('open');
        }
    });

    return true;
}

/**
 * Extract course data from a dropdown item element
 * @param {Element} element - The clicked dropdown item
 * @returns {Object} Course data object
 */
function extractCourseData(element) {
    const nameEl = element.querySelector('.course-name');
    const codeEl = element.querySelector('.course-code');
    const iconEl = element.querySelector('.course-icon');
    
    return {
        id: element.getAttribute('data-course') || '',
        name: nameEl ? nameEl.textContent.trim() : '',
        code: codeEl ? codeEl.textContent.trim() : '',
        symbol: iconEl ? iconEl.textContent.trim() : '',
        element: element
    };
}

/**
 * Update the trigger text with new course information
 * @param {Element} trigger - The trigger element
 * @param {Object} courseData - Course data object
 */
function updateTriggerText(trigger, courseData) {
    const textSpan = trigger.querySelector('span');
    if (textSpan) {
        textSpan.textContent = `تدرس للحصول على: SOCPA`;
    }
}

/**
 * Close other potential dropdowns (user dropdown, etc.)
 */
function closeOtherDropdowns() {
    // Close user dropdown if exists
    const userDropdown = document.getElementById('userDropdown');
    const mobileUserDropdown = document.getElementById('mobileUserDropdown');
    
    if (userDropdown) userDropdown.classList.remove('show');
    if (mobileUserDropdown) mobileUserDropdown.classList.remove('show');
}

/**
 * Show a toast notification for course selector actions
 * @param {string} message - Message to display
 * @param {string} type - Toast type ('success', 'info', 'warning', 'error')
 */
function showCourseToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.course-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `course-toast course-toast-${type}`;
    
    // Toast styles
    const styles = {
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'success' ? 'linear-gradient(135deg, #4caf50, #66bb6a)' : 
                   type === 'info' ? 'linear-gradient(135deg, #2196f3, #42a5f5)' :
                   type === 'warning' ? 'linear-gradient(135deg, #ff9800, #ffb74d)' :
                   'linear-gradient(135deg, #f44336, #ef5350)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '10000',
        opacity: '0',
        transition: 'all 0.3s ease',
        fontFamily: "'Tajawal', sans-serif",
        fontWeight: '500',
        backdropFilter: 'blur(10px)',
        maxWidth: '400px',
        textAlign: 'center'
    };
    
    Object.assign(toast.style, styles);
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

/**
 * Generate standard course selector HTML
 * @param {Object} options - HTML generation options
 * @returns {string} HTML string for course selector
 */
function generateCourseSelectorHTML(options = {}) {
    const config = {
        containerId: 'studySelector',
        triggerId: 'studyInfo',
        dropdownId: 'studyDropdown',
        defaultText: 'تدرس للحصول على: SOCPA',
        showComingSoon: true,
        ...options
    };

    return `
        <div class="study-selector" id="${config.containerId}">
            <div class="study-info" id="${config.triggerId}">
                <i class="fas fa-book"></i>
                <span>${config.defaultText}</span>
                <i class="fas fa-chevron-down study-dropdown-arrow"></i>
            </div>
            <div class="study-dropdown" id="${config.dropdownId}">
                <div class="study-dropdown-header">
                    اختر المادة التي تدرسها
                </div>
                <div class="study-dropdown-menu">
                    <!-- Currently Available Courses -->
                    <div class="dropdown-section-header">المواد المتوفرة (حالياً)</div>
                    <div class="study-dropdown-item active" data-course="accounting">
                        <div class="course-icon accounting">محا</div>
                        <div class="course-info">
                            <div class="course-name">المحاسبة المالية</div>
                            <div class="course-code">Financial Accounting</div>
                        </div>
                    </div>
                    <div class="study-dropdown-item" data-course="tax">
                        <div class="course-icon tax">زك</div>
                        <div class="course-info">
                            <div class="course-name">الزكاة والضريبة</div>
                            <div class="course-code">Zakat & Tax</div>
                        </div>
                    </div>
                    ${config.showComingSoon ? `
                    <!-- Coming Soon Section -->
                    <div class="dropdown-section-divider"></div>
                    <div class="dropdown-section-header coming-soon">قريباً</div>
                    <div class="study-dropdown-item coming-soon-item" data-course="management">
                        <div class="course-icon management">إإ</div>
                        <div class="course-info">
                            <div class="course-name">إدارة الأعمال</div>
                            <div class="course-code">Business Management</div>
                        </div>
                    </div>
                    <div class="study-dropdown-item coming-soon-item" data-course="auditing">
                        <div class="course-icon auditing">مر</div>
                        <div class="course-info">
                            <div class="course-name">المراجعة</div>
                            <div class="course-code">Auditing</div>
                        </div>
                    </div>
                    <div class="study-dropdown-item coming-soon-item" data-course="business">
                        <div class="course-icon business">قإ</div>
                        <div class="course-info">
                            <div class="course-name">قانون الأعمال</div>
                            <div class="course-code">Business Law</div>
                        </div>
                    </div>
                    <div class="study-dropdown-item coming-soon-item" data-course="systems">
                        <div class="course-icon systems">نم</div>
                        <div class="course-info">
                            <div class="course-name">نظم المعلومات</div>
                            <div class="course-code">Information Systems</div>
                        </div>
                    </div>` : ''}
                </div>
            </div>
        </div>
    `;
}

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Only auto-init if no custom initialization is detected
        if (!window.courseSelektorInitialized) {
            initCourseSelector();
        }
    });
} else {
    // DOM is already loaded
    if (!window.courseSelektorInitialized) {
        initCourseSelector();
    }
}

// Export functions for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCourseSelector,
        generateCourseSelectorHTML,
        showCourseToast
    };
}

// Global functions for direct use
window.initCourseSelector = initCourseSelector;
window.generateCourseSelectorHTML = generateCourseSelectorHTML;
window.showCourseToast = showCourseToast;
