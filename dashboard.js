// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
        // Initialize variables from dashboard
                const alertNotification = document.getElementById('alertNotification');
        const mobileAlertNotification = document.getElementById('mobileAlertNotification');
        const userAvatarNumber = document.getElementById('userAvatarNumber');
        const userDropdown = document.getElementById('userDropdown');
        const studySelector = document.getElementById('studySelector');
        const studyInfo = document.getElementById('studyInfo');
        const studyDropdown = document.getElementById('studyDropdown');
        const studyDropdownItems = document.querySelectorAll('.study-dropdown-item');

    // Study selector functionality
    if (studyInfo) {
        studyInfo.addEventListener('click', function () {
            studySelector.classList.toggle('open');
            studyDropdown.classList.toggle('show');
        });
    }

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
        if (studySelector && !studySelector.contains(e.target)) {
                studySelector.classList.remove('open');
                studyDropdown.classList.remove('show');
            }
        });

        // Study dropdown items
        studyDropdownItems.forEach(item => {
            item.addEventListener('click', function (e) {
                e.stopPropagation();
                
                // Check if it's a coming soon item
                if (this.classList.contains('coming-soon-item')) {
                    showToast('هذه المادة ستكون متاحة قريباً! 🚀', 'info');
                    return;
                }
                
                // Remove active class from all available items (not coming soon)
                studyDropdownItems.forEach(i => {
                    if (!i.classList.contains('coming-soon-item')) {
                        i.classList.remove('active');
                    }
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Update the study info text
                const courseName = this.querySelector('.course-name').textContent;
            if (studyInfo && studyInfo.querySelector('span')) {
                studyInfo.querySelector('span').textContent = `تدرس للحصول على: ${courseName}`;
            }
                
                // Close dropdown
                studySelector.classList.remove('open');
                studyDropdown.classList.remove('show');
                
                showToast(`تم تغيير المادة إلى ${courseName} ✅`, 'success');
            });
        });

        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        const editExamTrackerBtn = document.getElementById('editExamTrackerBtn');
    
    // Sidebar interaction for footer positioning
    if (sidebar && mainContent) {
        // Handle sidebar hover
        sidebar.addEventListener('mouseenter', function() {
            mainContent.classList.add('sidebar-expanded');
        });
        
        sidebar.addEventListener('mouseleave', function() {
            if (!sidebar.classList.contains('expanded')) {
                mainContent.classList.remove('sidebar-expanded');
            }
        });
        
        // Handle sidebar toggle (if you have a toggle button)
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('expanded');
                mainContent.classList.toggle('sidebar-expanded');
            });
        }
    }
        
        // Mobile-specific elements
        const mobileUserDropdown = document.getElementById('mobileUserDropdown');
        const mobileUserInfoBtn = document.getElementById('mobileUserInfoBtn');
        const mobileUserDropdownMenu = document.getElementById('mobileUserDropdownMenu');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileOverlay = document.getElementById('mobileOverlay');
    
        // Course Color Mapping
        const courseColors = {
            'accounting': {
                primary: '#4a9960',
                secondary: '#3b7a4f',
                light: '#68b876',
                gradient: 'linear-gradient(135deg, #4a9960, #68b876)'
            },
            'tax': {
                primary: '#2d7a3d',
                secondary: '#1e5829',
                light: '#4a9960',
                gradient: 'linear-gradient(135deg, #2d7a3d, #4a9960)'
            },
            'management': {
                primary: '#2d5aa0',
                secondary: '#1e3a6b',
                light: '#4a7ab8',
                gradient: 'linear-gradient(135deg, #2d5aa0, #4a7ab8)'
            },
            'auditing': {
                primary: '#3b5998',
                secondary: '#2c4373',
                light: '#5a7bb0',
                gradient: 'linear-gradient(135deg, #3b5998, #5a7bb0)'
            },
            'business': {
                primary: '#2f4d7a',
                secondary: '#1e3252',
                light: '#4a6a92',
                gradient: 'linear-gradient(135deg, #2f4d7a, #4a6a92)'
            },
            'systems': {
                primary: '#4a6fa5',
            secondary: '#2f4d7a',
            light: '#6a8fb8',
            gradient: 'linear-gradient(135deg, #4a6fa5, #6a8fb8)'
        }
    };

    // Apply course colors
    function applyCourseColors(courseType) {
        const colors = courseColors[courseType] || courseColors['accounting'];
        const root = document.documentElement;
        
        root.style.setProperty('--course-primary', colors.primary);
        root.style.setProperty('--course-secondary', colors.secondary);
        root.style.setProperty('--course-light', colors.light);
        root.style.setProperty('--course-gradient', colors.gradient);
        
        // Update RGB values for transparency effects
        const rgb = hexToRgb(colors.primary);
        if (rgb) {
            root.style.setProperty('--course-primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
            }
        }

        // Helper function to convert hex to RGB
        function hexToRgb(hex) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

    // Toast notification function
    function showToast(message, type = 'success') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification ${type}`;
        toast.textContent = message;
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        
        // Add to body
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Hide and remove toast after 3 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // User dropdown functionality
    if (userAvatarNumber && userDropdown) {
        userAvatarNumber.addEventListener('click', function(e) {
                    e.stopPropagation();
                userDropdown.classList.toggle('show');
        });
    }

    // Mobile user dropdown functionality
    if (mobileUserInfoBtn && mobileUserDropdown) {
        mobileUserInfoBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                        mobileUserDropdown.classList.toggle('show');
                });
            }

            // Close user dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (userDropdown && !userDropdown.contains(e.target) && !userAvatarNumber.contains(e.target)) {
                    userDropdown.classList.remove('show');
                }
        if (mobileUserDropdown && !mobileUserDropdown.contains(e.target)) {
                    mobileUserDropdown.classList.remove('show');
                }
            });

    // Mobile menu functionality
    if (mobileMenuBtn && sidebar && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                        sidebar.classList.toggle('mobile-open');
                    mobileOverlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
        });

        // Close mobile menu when clicking overlay
        mobileOverlay.addEventListener('click', function() {
                sidebar.classList.remove('mobile-open');
                mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Progress tracking functionality
    function updateProgressLine() {
        const progressSteps = document.querySelectorAll('.progress-step:not(.final-medal)');
        const progressLineFill = document.querySelector('.progress-line-fill');
        
        if (!progressLineFill || progressSteps.length === 0) return;
        
        let completedSteps = 0;
        progressSteps.forEach(step => {
            const percentage = parseInt(step.getAttribute('data-percentage') || '0');
            if (percentage === 100) {
                completedSteps++;
            }
        });
        
        const progressPercentage = (completedSteps / progressSteps.length) * 100;
        progressLineFill.style.width = `${progressPercentage}%`;
    }

    // Medal water level functionality
    function updateMedalWaterLevel() {
        const finalMedal = document.getElementById('finalMedal');
        if (!finalMedal) return;
        
        const progressSteps = document.querySelectorAll('.progress-step:not(.final-medal)');
        let totalProgress = 0;
        let moduleCount = 0;
        
        progressSteps.forEach(step => {
            const percentage = parseInt(step.getAttribute('data-percentage') || '0');
            totalProgress += percentage;
            moduleCount++;
        });
        
        const averageProgress = moduleCount > 0 ? Math.round(totalProgress / moduleCount) : 0;
        const waterLevel = Math.floor(averageProgress / 10) * 10;
        
        // Remove existing water level classes
        for (let i = 0; i <= 100; i += 10) {
            finalMedal.classList.remove(`green-water-level-${i}`);
        }
        
        // Add new water level class
        finalMedal.classList.add(`green-water-level-${waterLevel}`);
        finalMedal.setAttribute('data-progress', averageProgress);
    }

    // Initialize progress tracking
    updateProgressLine();
    updateMedalWaterLevel();

    // Modal Functions
    function initModals() {
        // Get modal elements
        const termsModal = document.getElementById('termsModal');
        const privacyModal = document.getElementById('privacyModal');
        
        if (!termsModal || !privacyModal) return;
        
        // Get close buttons
        const closeTermsModal = document.getElementById('closeTermsModal');
        const closePrivacyModal = document.getElementById('closePrivacyModal');
        const acceptTerms = document.getElementById('acceptTerms');
        const acceptPrivacy = document.getElementById('acceptPrivacy');
        
        // Get all links that should open modals
        const termsLinks = document.querySelectorAll('a[href="#"]:not(.login-link-text)');
        
        // Add click listeners to terms and privacy links
        termsLinks.forEach(link => {
            const linkText = link.textContent.trim();
            if (linkText.includes('شروط الاستخدام')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    showModal(termsModal);
                });
            } else if (linkText.includes('سياسة الخصوصية')) {
                link.addEventListener('click', (e) => {
                e.preventDefault();
                    showModal(privacyModal);
                });
            }
        });
        
        // Add click listeners to close buttons
        if (closeTermsModal) {
            closeTermsModal.addEventListener('click', () => closeModal(termsModal));
        }
        if (closePrivacyModal) {
            closePrivacyModal.addEventListener('click', () => closeModal(privacyModal));
        }
        if (acceptTerms) {
            acceptTerms.addEventListener('click', () => closeModal(termsModal));
        }
        if (acceptPrivacy) {
            acceptPrivacy.addEventListener('click', () => closeModal(privacyModal));
        }
        
        // Close modal when clicking overlay
        [termsModal, privacyModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal(modal);
                    }
                });
            }
        });
    }
    
    function showModal(modal) {
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Initialize modals
    initModals();

    // Initialize course colors (default to accounting)
    applyCourseColors('accounting');

    // Handle course selection changes
    studyDropdownItems.forEach(item => {
        if (!item.classList.contains('coming-soon-item')) {
            item.addEventListener('click', function() {
                const courseType = this.getAttribute('data-course');
                if (courseType) {
                    applyCourseColors(courseType);
                }
            });
        }
    });

    // Logout functionality
    const logoutButtons = document.querySelectorAll('#logoutBtn, #mobileLogoutBtn');
    logoutButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                        e.preventDefault();
                showLogoutModal();
            });
        }
    });

    // Profile buttons functionality
    const profileButtons = document.querySelectorAll('#profileBtn, #mobileProfileBtn');
    profileButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                showProfileModal();
            });
        }
    });

    // Settings buttons functionality
    const settingsButtons = document.querySelectorAll('#settingsBtn, #mobileSettingsBtn');
    settingsButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                        e.preventDefault();
                showToast('صفحة الإعدادات قيد التطوير', 'info');
            });
        }
    });

    // Edit exam tracker functionality
        if (editExamTrackerBtn) {
        editExamTrackerBtn.addEventListener('click', function(e) {
                e.preventDefault();
            showToast('تحرير متتبع الامتحان قيد التطوير', 'info');
        });
    }

    // Alert notification functionality (removed - using specific ID handler below)
            
    // Smooth scrolling for progress steps on mobile
    function smoothScrollToStep(step) {
        const progressPath = document.querySelector('.progress-path');
        if (progressPath && step) {
            const stepRect = step.getBoundingClientRect();
            const containerRect = progressPath.getBoundingClientRect();
            const scrollLeft = progressPath.scrollLeft + stepRect.left - containerRect.left - (containerRect.width / 2) + (stepRect.width / 2);
            
            progressPath.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        // Update progress line on resize
        updateProgressLine();
        
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && sidebar && sidebar.classList.contains('mobile-open')) {
                sidebar.classList.remove('mobile-open');
            if (mobileOverlay) {
                mobileOverlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });

    // Alert notification functionality
    if (alertNotification) {
        alertNotification.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotificationsDropdown();
        });
    }

    // Mobile alert notification functionality
    if (mobileAlertNotification) {
        mobileAlertNotification.addEventListener('click', function(e) {
            e.stopPropagation();
            showNotificationsDropdown();
        });
    }

    // Initialize notification state if not set
    if (localStorage.getItem('hasUnreadNotifications') === null) {
        localStorage.setItem('hasUnreadNotifications', 'true');
    }
    // Show notifications dropdown 
        function showNotificationsDropdown() {
                const existingDropdown = document.querySelector('.notifications-dropdown');
                if (existingDropdown) {
                    existingDropdown.remove();
                    return;
                }
                
                const dropdown = document.createElement('div');
                dropdown.className = 'notifications-dropdown';
            dropdown.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 1rem;
                width: 400px;
                height: 450px;
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                z-index: 2000;
                animation: dropdownSlideDown 0.3s ease-out;
                overflow: hidden;
                color: var(--primary-navy);
                display: flex;
                flex-direction: column;
            `;
                
                dropdown.innerHTML = `
                <div class="notifications-header" style="padding: 1.5rem; border-bottom: 1px solid var(--gray-200); display: flex; justify-content: flex-start; align-items: center; gap: 1rem; background: linear-gradient(135deg, var(--primary-blue) 0%, rgba(107, 163, 247, 0.9) 100%); position: relative;">
                    <div style="width: 2.5rem; height: 2.5rem; background: var(--accent-gold); border: 3px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(247, 200, 69, 0.3); position: relative; flex-shrink: 0;">
                        <i class="fas fa-bell" style="color: var(--primary-navy); font-size: 1rem;"></i>
                        <div style="position: absolute; top: -4px; right: -4px; width: 8px; height: 8px; background: var(--primary-blue); border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;"></div>
                    </div>
                    <h4 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">الإشعارات</h4>
                    </div>
                <div class="notifications-content" style="padding: 3rem 2rem; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center;">
                    <div style="width: 4rem; height: 4rem; background: rgba(107, 163, 247, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; position: relative;">
                        <i class="fas fa-bell-slash" style="font-size: 1.75rem; color: var(--primary-blue);"></i>
                        <div style="position: absolute; top: -3px; right: -3px; width: 1rem; height: 1rem; background: var(--accent-gold); border: 2px solid white; border-radius: 50%;"></div>
                </div>
                    <h4 style="margin: 0 0 0.75rem 0; font-weight: 600; color: var(--primary-navy); font-size: 1.25rem;">لا توجد إشعارات جديدة</h4>
                    <p style="margin: 0; font-size: 1rem; color: var(--gray-600); line-height: 1.5;">ستظهر إشعاراتك هنا عند وصولها</p>
                </div>
                <div class="notifications-footer" style="padding: 1.5rem; border-top: 1px solid var(--gray-200); text-align: center; background: var(--gray-50); position: relative;">
                    <button class="mark-all-read-btn" id="markAllReadBtn" style="background: linear-gradient(135deg, var(--accent-gold) 0%, #ffd76b 100%); border: 2px solid var(--accent-gold); color: var(--primary-navy); padding: 0.875rem 2rem; border-radius: 0.75rem; cursor: pointer; transition: all 0.3s ease; font-size: 1rem; font-weight: 700; box-shadow: 0 4px 12px rgba(247, 200, 69, 0.3); position: relative; overflow: hidden;" onmouseover="this.style.background='linear-gradient(135deg, var(--primary-blue) 0%, rgba(107, 163, 247, 0.9) 100%)'; this.style.borderColor='var(--primary-blue)'; this.style.color='white'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(107, 163, 247, 0.4)'" onmouseout="this.style.background='linear-gradient(135deg, var(--accent-gold) 0%, #ffd76b 100%)'; this.style.borderColor='var(--accent-gold)'; this.style.color='var(--primary-navy)'; this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(247, 200, 69, 0.3)'">
                        <i class="fas fa-check-double" style="margin-left: 0.75rem;"></i>
                            تمييز الكل كمقروء
                        </button>
                    </div>
                `;
                
                document.body.appendChild(dropdown);
                
                // Add event listener for mark all read button
            const markAllReadBtn = document.getElementById('markAllReadBtn');
            if (markAllReadBtn) {
                markAllReadBtn.addEventListener('click', function() {
                    markAllAsRead();
                    this.innerHTML = '<i class="fas fa-check" style="margin-left: 0.75rem;"></i>تم التمييز';
                    this.style.background = 'linear-gradient(135deg, var(--success-green) 0%, #68d391 100%)';
                    this.style.borderColor = 'var(--success-green)';
                    this.style.color = 'white';
                    this.style.boxShadow = '0 4px 12px rgba(104, 211, 145, 0.4)';
                    setTimeout(() => {
                        const dropdown = document.querySelector('.notifications-dropdown');
                        if (dropdown) {
                            dropdown.remove();
                        }
                    }, 1000);
                });
            }
            
            // Add styles for dropdown animation
            if (!document.querySelector('#notification-styles')) {
                const notificationStyles = document.createElement('style');
                notificationStyles.id = 'notification-styles';
                notificationStyles.textContent = `
                    @keyframes dropdownSlideDown {
                        from { 
                            opacity: 0; 
                            transform: translate(-50%, -50%) scale(0.95); 
                            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
                        }
                        to { 
                            opacity: 1; 
                            transform: translate(-50%, -50%) scale(1); 
                            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                        }
                    }
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 1; }
                        50% { transform: scale(1.1); opacity: 0.8; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `;
                document.head.appendChild(notificationStyles);
                }
                
                setTimeout(() => {
                    document.addEventListener('click', closeDropdownHandler);
                }, 100);
            
            function closeDropdownHandler(e) {
                const alertBtn = document.getElementById('alertNotification');
                const mobileAlertBtn = document.getElementById('mobileAlertNotification');
                
                const clickedOnAlert = (alertBtn && alertBtn.contains(e.target)) || 
                                     (mobileAlertBtn && mobileAlertBtn.contains(e.target));
                
                if (!dropdown.contains(e.target) && !clickedOnAlert) {
                    dropdown.remove();
                    document.removeEventListener('click', closeDropdownHandler);
                }
            }
        }

        // Update notification badge 
    function updateNotificationBadge() {
        const badge = document.getElementById('alertBadge');
        const mobileBadge = document.getElementById('mobileAlertBadge');
        
        // Check if there are unread notifications
        const hasUnread = localStorage.getItem('hasUnreadNotifications') !== 'false';
        
        // Update desktop badge
        if (badge) {
            if (hasUnread) {
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        }
        
        // Update mobile badge
        if (mobileBadge) {
            if (hasUnread) {
                mobileBadge.style.display = 'flex';
            } else {
                mobileBadge.style.display = 'none';
            }
        }
    }

        // Mark all notifications as read
            function markAllAsRead() {
                localStorage.setItem('hasUnreadNotifications', 'false');
                    updateNotificationBadge();
        }

    // Initialize notification badge on page load
    updateNotificationBadge();
    
     // Profile Modal functionality
     function showProfileModal() {
            const profileOverlay = document.createElement('div');
            profileOverlay.id = 'profileOverlay';
            profileOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const profileModal = document.createElement('div');
            profileModal.style.cssText = `
                background: white;
                border-radius: 1rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                direction: rtl;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;

            profileModal.innerHTML = `
                <div style="padding: 2rem; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="color: var(--primary-navy); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-user"></i>
                            الملف الشخصي
                        </h2>
                        <button id="closeProfileBtn" style="background: none; border: none; font-size: 1.5rem; color: var(--medium-gray); cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <div style="padding: 2rem;">
                    <!-- User Info Section -->
                    <div style="background: var(--gradient-primary); color: white; padding: 1.5rem; border-radius: 0.75rem; margin-bottom: 2rem; text-align: center;">
                        <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1rem;">
                            أ
                        </div>
                        <h3 style="margin: 0 0 0.5rem 0;">مشعل الشقحا</h3>
                        <p style="margin: 0; opacity: 0.9;">mushal@gmail.com</p>
                        <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem; font-size: 0.9rem;">
                            <div style="background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 0.5rem;">
                                <i class="fas fa-calendar"></i> انضم في يناير 2024
                            </div>
                            <div style="background: rgba(255,255,255,0.2); padding: 0.5rem 1rem; border-radius: 0.5rem;">
                                <i class="fas fa-graduation-cap"></i> طالب SOCPA
                            </div>
                        </div>
                    </div>

                    <!-- Personal Information Section -->
                    <div style="border: 1px solid #e5e7eb; border-radius: 0.75rem; padding: 1.5rem;">
                        <h4 style="color: var(--primary-navy); margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-id-card"></i>
                            المعلومات الشخصية
                        </h4>
                        <div style="display: grid; gap: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                                <span style="color: var(--medium-gray);">الاسم الأول</span>
                                <span style="color: black; font-weight: 600;">مشعل</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                                <span style="color: var(--medium-gray);">اسم العائلة</span>
                                <span style="color: black; font-weight: 600;">الشقحا</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                                <span style="color: var(--medium-gray);">البريد الإلكتروني</span>
                                <span style="color: black; font-weight: 600;">mushal@gmail.com</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                                <span style="color: var(--medium-gray);">رقم الجوال</span>
                                <span style="color: black; font-weight: 600;">05xxxxxxxx</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                                <span style="color: var(--medium-gray);">الجنس</span>
                                <span style="color: black; font-weight: 600;">ذكر</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; background: #f9fafb; border-radius: 0.5rem;">
                                <span style="color: var(--medium-gray);">جهة العمل</span>
                                <span style="color: black; font-weight: 600;">شركة زامل للتطوير</span>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 1rem; margin-top: 2rem; justify-content: center;">
                        <button id="editProfileBtn" style="
                            background: var(--gradient-primary);
                            color: white;
                            border: none;
                            padding: 0.75rem 2rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                        ">
                            <i class="fas fa-edit"></i>
                            تعديل الملف الشخصي
                        </button>
                        <button id="changePasswordBtn" style="
                            background: transparent;
                            color: var(--primary-navy);
                            border: 1px solid var(--primary-navy);
                            padding: 0.75rem 2rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                        ">
                            <i class="fas fa-key"></i>
                            تغيير كلمة المرور
                        </button>
                    </div>
                </div>
            `;

            profileOverlay.appendChild(profileModal);
            document.body.appendChild(profileOverlay);

            // Animate in
            setTimeout(() => {
                profileOverlay.style.opacity = '1';
                profileModal.style.transform = 'scale(1)';
            }, 10);

            // Event listeners
    document.getElementById('closeProfileBtn').addEventListener('click', function() {
                profileOverlay.style.opacity = '0';
                profileModal.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    profileOverlay.remove();
                }, 300);
            });

    document.getElementById('editProfileBtn').addEventListener('click', function() {
                profileOverlay.style.opacity = '0';
                profileModal.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    profileOverlay.remove();
                    showEditProfileModal();
                }, 300);
            });

    document.getElementById('changePasswordBtn').addEventListener('click', function() {
                profileOverlay.style.opacity = '0';
                profileModal.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    profileOverlay.remove();
                    showChangePasswordModal();
                }, 300);
            });

            // Close on overlay click
    profileOverlay.addEventListener('click', function(e) {
                if (e.target === profileOverlay) {
                    document.getElementById('closeProfileBtn').click();
                }
            });
        }

        // Edit Profile Modal functionality
        function showEditProfileModal() {
            const editOverlay = document.createElement('div');
            editOverlay.id = 'editProfileOverlay';
            editOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const editModal = document.createElement('div');
            editModal.style.cssText = `
                background: white;
                border-radius: 1rem;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                direction: rtl;
                transform: scale(0.9);
                transition: transform 0.3s ease;
            `;

            editModal.innerHTML = `
                <div style="padding: 2rem; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="color: var(--primary-navy); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-edit"></i>
                            تعديل الملف الشخصي
                        </h2>
                        <button id="closeEditBtn" style="background: none; border: none; font-size: 1.5rem; color: var(--medium-gray); cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                <form id="editProfileForm" style="padding: 2rem;">
                    <div style="display: grid; gap: 1.5rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                    الاسم الأول
                                </label>
                                <div style="position: relative;">
                                    <i class="fas fa-user" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                    <input type="text" id="editFirstName" value="مشعل" style="
                                        width: 100%;
                                        padding: 0.875rem 1rem 0.875rem 3rem;
                                        border: 1px solid var(--gray-300);
                                        border-radius: 0.5rem;
                                        font-size: 1rem;
                                        transition: var(--transition);
                                        background: var(--white);
                                        color: var(--gray-900);
                                        font-family: 'Tajawal', sans-serif;
                                        box-sizing: border-box;
                                    " required>
                                </div>
                            </div>
                            <div>
                                <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                    اسم العائلة
                                </label>
                                <div style="position: relative;">
                                    <i class="fas fa-user" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                    <input type="text" id="editLastName" value="الشقحا" style="
                                        width: 100%;
                                        padding: 0.875rem 1rem 0.875rem 3rem;
                                        border: 1px solid var(--gray-300);
                                        border-radius: 0.5rem;
                                        font-size: 1rem;
                                        transition: var(--transition);
                                        background: var(--white);
                                        color: var(--gray-900);
                                        font-family: 'Tajawal', sans-serif;
                                        box-sizing: border-box;
                                    " required>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                البريد الإلكتروني
                            </label>
                            <div style="position: relative;">
                                <i class="fas fa-envelope" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                <input type="email" id="editEmail" value="mushal@gmail.com" style="
                                    width: 100%;
                                    padding: 0.875rem 1rem 0.875rem 3rem;
                                    border: 1px solid var(--gray-300);
                                    border-radius: 0.5rem;
                                    font-size: 1rem;
                                    transition: var(--transition);
                                    background: var(--white);
                                    color: var(--gray-900);
                                    font-family: 'Tajawal', sans-serif;
                                    box-sizing: border-box;
                                " required>
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div>
                                <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                    رقم الجوال
                                </label>
                                <div style="position: relative;">
                                    <i class="fas fa-phone" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                    <input type="tel" id="editPhone" value="0512345678" style="
                                        width: 100%;
                                        padding: 0.875rem 1rem 0.875rem 3rem;
                                        border: 1px solid var(--gray-300);
                                        border-radius: 0.5rem;
                                        font-size: 1rem;
                                        transition: var(--transition);
                                        background: var(--white);
                                        color: var(--gray-900);
                                        font-family: 'Tajawal', sans-serif;
                                        box-sizing: border-box;
                                    " required>
                                </div>
                            </div>
                            <div>
                                <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                    الجنس
                                </label>
                                <div style="position: relative;">
                                    <i class="fas fa-venus-mars" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                    <select id="editGender" style="
                                        width: 100%;
                                        padding: 0.875rem 1rem 0.875rem 3rem;
                                        border: 1px solid var(--gray-300);
                                        border-radius: 0.5rem;
                                        font-size: 1rem;
                                        transition: var(--transition);
                                        background: var(--white);
                                        color: var(--gray-900);
                                        font-family: 'Tajawal', sans-serif;
                                        cursor: pointer;
                                        box-sizing: border-box;
                                    " required>
                                        <option value="male" selected>ذكر</option>
                                        <option value="female">أنثى</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                جهة العمل
                            </label>
                            <div style="position: relative;">
                                <i class="fas fa-building" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                <input type="text" id="editWorkplace" value="شركة زامل للتطوير" style="
                                    width: 100%;
                                    padding: 0.875rem 1rem 0.875rem 3rem;
                                    border: 1px solid var(--gray-300);
                                    border-radius: 0.5rem;
                                    font-size: 1rem;
                                    transition: var(--transition);
                                    background: var(--white);
                                    color: var(--gray-900);
                                    font-family: 'Tajawal', sans-serif;
                                    box-sizing: border-box;
                                ">
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; gap: 1rem; margin-top: 2rem; justify-content: center;">
                        <button type="submit" id="saveProfileBtn" style="
                            background: var(--gradient-primary);
                            color: white;
                            border: none;
                            padding: 0.75rem 2rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            transition: var(--transition);
                        ">
                            <i class="fas fa-save"></i>
                            حفظ التغييرات
                        </button>
                        <button type="button" id="cancelEditBtn" style="
                            background: transparent;
                            color: var(--medium-gray);
                            border: 1px solid var(--light-gray);
                            padding: 0.75rem 2rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 600;
                            transition: var(--transition);
                        ">
                            إلغاء
                        </button>
                    </div>
                </form>
            `;

            editOverlay.appendChild(editModal);
            document.body.appendChild(editOverlay);

            // Animate in
            setTimeout(() => {
                editOverlay.style.opacity = '1';
                editModal.style.transform = 'scale(1)';
            }, 10);

            // Add focus styles
            const inputs = editModal.querySelectorAll('input, select');
            inputs.forEach(input => {
        input.addEventListener('focus', function() {
                    this.style.borderColor = 'var(--primary-blue)';
                    this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                });
        input.addEventListener('blur', function() {
                    this.style.borderColor = 'var(--gray-300)';
                    this.style.boxShadow = 'none';
                });
            });

            // Event listeners
    document.getElementById('closeEditBtn').addEventListener('click', function() {
                closeEditModal();
            });

    document.getElementById('cancelEditBtn').addEventListener('click', function() {
                closeEditModal();
            });

    document.getElementById('editProfileForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    firstName: document.getElementById('editFirstName').value,
                    lastName: document.getElementById('editLastName').value,
                    email: document.getElementById('editEmail').value,
                    phone: document.getElementById('editPhone').value,
                    gender: document.getElementById('editGender').value,
                    workplace: document.getElementById('editWorkplace').value
                };

                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(formData.email)) {
                    showToast('❌ يرجى إدخال عنوان بريد إلكتروني صحيح');
                    return;
                }

                // Validate phone
                const phoneRegex = /^05[0-9]{8}$/;
                if (!phoneRegex.test(formData.phone)) {
                    showToast('❌ يرجى إدخال رقم جوال صحيح (05xxxxxxxx)');
                    return;
                }

                // Show loading state
                const saveBtn = document.getElementById('saveProfileBtn');
                const originalText = saveBtn.innerHTML;
                saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
                saveBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    closeEditModal();
                    showToast('✅ تم حفظ التغييرات بنجاح');
                    
                    // Update profile data in localStorage
                    localStorage.setItem('userProfile', JSON.stringify(formData));
                }, 1500);
            });

            function closeEditModal() {
                editOverlay.style.opacity = '0';
                editModal.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    editOverlay.remove();
                }, 300);
            }

            // Close on overlay click
    editOverlay.addEventListener('click', function(e) {
                if (e.target === editOverlay) {
                    closeEditModal();
                }
            });
        }

        // Change Password Modal functionality
        function showChangePasswordModal() {
            const passwordOverlay = document.createElement('div');
            passwordOverlay.id = 'changePasswordOverlay';
            passwordOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            const passwordModal = document.createElement('div');
                         passwordModal.style.cssText = `
                 background: white;
                 border-radius: 1rem;
                 max-width: 520px;
                 width: 90%;
                 max-height: 85vh;
                 overflow-y: auto;
                 box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                 direction: rtl;
                 transform: scale(0.9);
                 transition: transform 0.3s ease;
                 margin: 2rem auto;
             `;

            passwordModal.innerHTML = `
                <div style="padding: 2rem; border-bottom: 1px solid #f0f0f0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <h2 style="color: var(--primary-navy); margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-key"></i>
                            تغيير كلمة المرور
                        </h2>
                        <button id="closePasswordBtn" style="background: none; border: none; font-size: 1.5rem; color: var(--medium-gray); cursor: pointer;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                
                                 <form id="changePasswordForm" style="padding: 2rem 2rem 1.5rem 2rem;">
                     <div style="display: grid; gap: 2rem;">
                        <div>
                            <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                كلمة المرور الحالية
                            </label>
                            <div style="position: relative;">
                                <i class="fas fa-lock" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                <input type="password" id="currentPassword" placeholder="أدخل كلمة المرور الحالية" style="
                                    width: 100%;
                                    padding: 0.875rem 3rem 0.875rem 3rem;
                                    border: 1px solid var(--gray-300);
                                    border-radius: 0.5rem;
                                    font-size: 1rem;
                                    transition: var(--transition);
                                    background: var(--white);
                                    color: var(--gray-900);
                                    font-family: 'Tajawal', sans-serif;
                                " required>
                                <button type="button" class="password-toggle-btn" data-target="currentPassword" style="
                                    position: absolute;
                                    right: 1rem;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    background: none;
                                    border: none;
                                    color: var(--gray-400);
                                    cursor: pointer;
                                    padding: 0.25rem;
                                ">
                                    <i class="far fa-eye"></i>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                كلمة المرور الجديدة
                            </label>
                            <div style="position: relative;">
                                <i class="fas fa-lock" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                <input type="password" id="newPassword" placeholder="أدخل كلمة المرور الجديدة" style="
                                    width: 100%;
                                    padding: 0.875rem 3rem 0.875rem 3rem;
                                    border: 1px solid var(--gray-300);
                                    border-radius: 0.5rem;
                                    font-size: 1rem;
                                    transition: var(--transition);
                                    background: var(--white);
                                    color: var(--gray-900);
                                    font-family: 'Tajawal', sans-serif;
                                " required>
                                <button type="button" class="password-toggle-btn" data-target="newPassword" style="
                                    position: absolute;
                                    right: 1rem;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    background: none;
                                    border: none;
                                    color: var(--gray-400);
                                    cursor: pointer;
                                    padding: 0.25rem;
                                ">
                                    <i class="far fa-eye"></i>
                                </button>
                            </div>
                                                         <div id="passwordStrengthIndicator" style="margin-top: 0.75rem; display: none;">
                                 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                     <span style="font-size: 0.75rem; font-weight: 500; color: var(--gray-600);">قوة كلمة المرور:</span>
                                     <div id="passwordStrengthText" style="font-size: 0.75rem; font-weight: 600;">ضعيفة</div>
                                 </div>
                                 <div style="width: 100%; height: 6px; background: var(--gray-200); border-radius: 3px; overflow: hidden;">
                                     <div id="passwordStrengthBar" style="height: 100%; border-radius: 3px; transition: width 0.3s ease, background-color 0.3s ease; width: 0%;"></div>
                                 </div>
                             </div>
                        </div>

                        <div>
                            <label style="display: block; font-weight: 500; color: var(--gray-700); margin-bottom: 0.5rem; font-size: 0.875rem;">
                                تأكيد كلمة المرور الجديدة
                            </label>
                            <div style="position: relative;">
                                <i class="fas fa-lock" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--gray-400);"></i>
                                <input type="password" id="confirmNewPassword" placeholder="أعد إدخال كلمة المرور الجديدة" style="
                                    width: 100%;
                                    padding: 0.875rem 3rem 0.875rem 3rem;
                                    border: 1px solid var(--gray-300);
                                    border-radius: 0.5rem;
                                    font-size: 1rem;
                                    transition: var(--transition);
                                    background: var(--white);
                                    color: var(--gray-900);
                                    font-family: 'Tajawal', sans-serif;
                                " required>
                                <button type="button" class="password-toggle-btn" data-target="confirmNewPassword" style="
                                    position: absolute;
                                    right: 1rem;
                                    top: 50%;
                                    transform: translateY(-50%);
                                    background: none;
                                    border: none;
                                    color: var(--gray-400);
                                    cursor: pointer;
                                    padding: 0.25rem;
                                ">
                                    <i class="far fa-eye"></i>
                                </button>
                            </div>
                                                         <div id="passwordMatchIndicator" style="margin-top: 0.75rem; font-size: 0.8rem; font-weight: 500; display: none; padding: 0.5rem; border-radius: 0.5rem; background: var(--gray-50);"></div>
                        </div>

                                                 <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 1.5rem; border-radius: 0.75rem; border: 1px solid var(--gray-200); position: relative; overflow: hidden;">
                             <div style="position: absolute; top: 0; right: 0; width: 4px; height: 100%; background: var(--gradient-primary);"></div>
                             <h4 style="margin: 0 0 1rem 0; color: var(--primary-navy); font-size: 0.9rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                                 <div style="width: 2rem; height: 2rem; background: var(--gradient-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                     <i class="fas fa-shield-alt" style="color: white; font-size: 0.75rem;"></i>
                                 </div>
                                 متطلبات كلمة المرور الآمنة
                             </h4>
                             <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin: 0;">
                                 <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--gray-700);">
                                     <i class="fas fa-check-circle" style="color: var(--success-green); font-size: 0.75rem;"></i>
                                     8 أحرف على الأقل
                                 </div>
                                 <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--gray-700);">
                                     <i class="fas fa-check-circle" style="color: var(--success-green); font-size: 0.75rem;"></i>
                                     حرف كبير واحد
                                 </div>
                                 <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--gray-700);">
                                     <i class="fas fa-check-circle" style="color: var(--success-green); font-size: 0.75rem;"></i>
                                     حرف صغير واحد
                                 </div>
                                 <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--gray-700);">
                                     <i class="fas fa-check-circle" style="color: var(--success-green); font-size: 0.75rem;"></i>
                                     رقم واحد على الأقل
                                 </div>
                                 <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: var(--gray-700); grid-column: 1 / -1;">
                                     <i class="fas fa-check-circle" style="color: var(--success-green); font-size: 0.75rem;"></i>
                                     رمز خاص واحد على الأقل (!@#$%^&*)
                                 </div>
                             </div>
                         </div>
                    </div>

                                         <div style="display: flex; gap: 1rem; margin-top: 2.5rem; justify-content: center; padding-top: 1.5rem; border-top: 1px solid var(--gray-200);">
                         <button type="submit" id="savePasswordBtn" style="
                             background: var(--gradient-primary);
                             color: white;
                             border: none;
                             padding: 1rem 2.5rem;
                             border-radius: 0.75rem;
                             cursor: pointer;
                             font-weight: 600;
                             display: flex;
                             align-items: center;
                             gap: 0.5rem;
                             transition: var(--transition);
                             font-size: 0.9rem;
                             box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
                         " disabled>
                             <i class="fas fa-key"></i>
                             تغيير كلمة المرور
                         </button>
                         <button type="button" id="cancelPasswordBtn" style="
                             background: var(--gray-100);
                             color: var(--gray-600);
                             border: 1px solid var(--gray-300);
                             padding: 1rem 2.5rem;
                             border-radius: 0.75rem;
                             cursor: pointer;
                             font-weight: 600;
                             transition: var(--transition);
                             font-size: 0.9rem;
                         ">
                             إلغاء
                         </button>
                     </div>
                </form>
            `;

            passwordOverlay.appendChild(passwordModal);
            document.body.appendChild(passwordOverlay);

            // Animate in
            setTimeout(() => {
                passwordOverlay.style.opacity = '1';
                passwordModal.style.transform = 'scale(1)';
            }, 10);

            // Initialize password functionality
            initPasswordChangeValidation();

            function closePasswordModal() {
                passwordOverlay.style.opacity = '0';
                passwordModal.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    passwordOverlay.remove();
                }, 300);
            }

            // Event listeners
            document.getElementById('closePasswordBtn').addEventListener('click', closePasswordModal);
            document.getElementById('cancelPasswordBtn').addEventListener('click', closePasswordModal);

            // Close on overlay click
    passwordOverlay.addEventListener('click', function(e) {
                if (e.target === passwordOverlay) {
                    closePasswordModal();
                }
            });

            // Password change form submission
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmNewPassword').value;

                // Validate current password (simulate check)
                if (currentPassword !== 'password123') {
                    showToast('❌ كلمة المرور الحالية غير صحيحة');
                    return;
                }

                if (newPassword !== confirmPassword) {
                    showToast('❌ كلمات المرور الجديدة غير متطابقة');
                    return;
                }

                // Show loading state
                const saveBtn = document.getElementById('savePasswordBtn');
                const originalText = saveBtn.innerHTML;
                saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التغيير...';
                saveBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    closePasswordModal();
                    showToast('✅ تم تغيير كلمة المرور بنجاح');
                }, 1500);
            });
        }

        // Password change validation helper
        function initPasswordChangeValidation() {
            const toggleButtons = document.querySelectorAll('.password-toggle-btn');
            const newPasswordInput = document.getElementById('newPassword');
            const confirmPasswordInput = document.getElementById('confirmNewPassword');
            const strengthIndicator = document.getElementById('passwordStrengthIndicator');
            const strengthBar = document.getElementById('passwordStrengthBar');
            const strengthText = document.getElementById('passwordStrengthText');
            const matchIndicator = document.getElementById('passwordMatchIndicator');
            const saveBtn = document.getElementById('savePasswordBtn');

            // Password toggle functionality
            toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
                    const targetId = this.dataset.target;
                    const input = document.getElementById(targetId);
                    const icon = this.querySelector('i');
                    
                    if (input.type === 'password') {
                        input.type = 'text';
                        icon.className = 'far fa-eye-slash';
                        } else {
                        input.type = 'password';
                        icon.className = 'far fa-eye';
                    }
                });
            });

            // Password strength indicator
    newPasswordInput.addEventListener('input', function() {
                const password = this.value;
                
                if (password.length === 0) {
                    strengthIndicator.style.display = 'none';
                    checkPasswordForm();
                    return;
                }
                
                strengthIndicator.style.display = 'block';
                
                let score = 0;
                let feedback = [];
                
                // Length check
                if (password.length >= 8) score += 20;
                else feedback.push('8 أحرف على الأقل');
                
                // Uppercase check
                if (/[A-Z]/.test(password)) score += 20;
                else feedback.push('حرف كبير');
                
                // Lowercase check
                if (/[a-z]/.test(password)) score += 20;
                else feedback.push('حرف صغير');
                
                // Number check
                if (/[0-9]/.test(password)) score += 20;
                else feedback.push('رقم');
                
                // Special character check
                if (/[^A-Za-z0-9]/.test(password)) score += 20;
                else feedback.push('رمز خاص');
                
                // Update strength bar
                strengthBar.style.width = score + '%';
                
                if (score < 40) {
                    strengthBar.style.background = '#ef4444';
                    strengthText.textContent = 'ضعيفة';
                    strengthText.style.color = '#ef4444';
                } else if (score < 60) {
                    strengthBar.style.background = '#f59e0b';
                    strengthText.textContent = 'متوسطة';
                    strengthText.style.color = '#f59e0b';
                } else if (score < 80) {
                    strengthBar.style.background = '#eab308';
                    strengthText.textContent = 'جيدة';
                    strengthText.style.color = '#eab308';
                } else {
                    strengthBar.style.background = '#22c55e';
                    strengthText.textContent = 'قوية';
                    strengthText.style.color = '#22c55e';
                }
                
                checkPasswordForm();
            });

            // Confirm password validation
    confirmPasswordInput.addEventListener('input', function() {
                const newPassword = newPasswordInput.value;
                const confirmPassword = this.value;
                
                if (confirmPassword.length === 0) {
                    matchIndicator.style.display = 'none';
                    checkPasswordForm();
                    return;
                }
                
                matchIndicator.style.display = 'block';
                
                if (newPassword === confirmPassword) {
                    matchIndicator.textContent = '✓ كلمات المرور متطابقة';
                    matchIndicator.style.color = '#22c55e';
                } else {
                    matchIndicator.textContent = '✗ كلمات المرور غير متطابقة';
                    matchIndicator.style.color = '#ef4444';
                }
                
                checkPasswordForm();
            });

            function checkPasswordForm() {
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = newPasswordInput.value;
                const confirmPassword = confirmPasswordInput.value;
                
                const isValid = currentPassword.length > 0 && 
                               newPassword.length >= 8 && 
                               /[A-Z]/.test(newPassword) &&
                               /[a-z]/.test(newPassword) &&
                               /[0-9]/.test(newPassword) &&
                               /[^A-Za-z0-9]/.test(newPassword) &&
                               newPassword === confirmPassword;
                
                saveBtn.disabled = !isValid;
                saveBtn.style.opacity = isValid ? '1' : '0.6';
            }

            // Add input event listeners to all password fields
            document.getElementById('currentPassword').addEventListener('input', checkPasswordForm);
        }

        // Logout Modal functionality
        function showLogoutModal() {
            const logoutOverlay = document.createElement('div');
            logoutOverlay.id = 'logoutOverlay';
            logoutOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                backdrop-filter: blur(5px);
            `;

            const logoutModal = document.createElement('div');
            logoutModal.style.cssText = `
                background: white;
                border-radius: 1rem;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                direction: rtl;
                transform: scale(0.9);
                transition: transform 0.3s ease;
                overflow: hidden;
                border: 1px solid var(--gray-200);
            `;

            logoutModal.innerHTML = `
                <!-- Header with Icon -->
                <div style="background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-blue) 100%); padding: 1.5rem; text-align: center; position: relative;">
                    <div style="width: 3rem; height: 3rem; background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem; position: relative;">
                        <i class="fas fa-sign-out-alt" style="color: white; font-size: 1.2rem;"></i>
                        <div style="position: absolute; top: -3px; right: -3px; width: 0.75rem; height: 0.75rem; background: var(--accent-gold); border: 2px solid white; border-radius: 50%; animation: pulse 2s infinite;"></div>
                    </div>
                    <h2 style="color: white; margin: 0; font-size: 1.2rem; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                        تسجيل الخروج
                    </h2>
                </div>

                <!-- Content -->
                <div style="padding: 1.5rem;">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <p style="color: var(--gray-700); font-size: 1rem; line-height: 1.5; margin: 0 0 0.75rem 0; font-weight: 500;">
                            هل أنت متأكد من تسجيل الخروج؟
                        </p>
                        <p style="color: var(--gray-500); font-size: 0.875rem; line-height: 1.4; margin: 0;">
                            سيتم حفظ تقدمك وستحتاج لتسجيل الدخول مرة أخرى
                        </p>
                    </div>

                    <!-- User Info Summary -->
                    <div style="background: linear-gradient(135deg, var(--gray-50) 0%, #f8fafc 100%); border: 1px solid var(--gray-200); border-radius: 0.5rem; padding: 1rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 2.5rem; height: 2.5rem; background: var(--gradient-primary); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1rem; flex-shrink: 0;">
                            م
                        </div>
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: var(--primary-navy); margin-bottom: 0.125rem; font-size: 0.95rem;">
                                مشعل الشقحا
                            </div>
                            <div style="font-size: 0.8rem; color: var(--gray-600);">
                                mushal@gmail.com
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 0.7rem; color: var(--gray-500);">نشط الآن</div>
                            <div style="width: 0.5rem; height: 0.5rem; background: var(--success-green); border-radius: 50%; margin: 0.25rem auto;"></div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 0.75rem; justify-content: center;">
                        <button id="confirmLogoutBtn" style="
                            background: var(--gradient-primary);
                            color: white;
                            border: none;
                            padding: 0.75rem 1.5rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 0.9rem;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            transition: all 0.3s ease;
                            box-shadow: 0 3px 10px rgba(59, 130, 246, 0.2);
                        " onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 20px rgba(59, 130, 246, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 3px 10px rgba(59, 130, 246, 0.2)'">
                            <i class="fas fa-sign-out-alt"></i>
                            تسجيل الخروج
                        </button>
                        <button id="cancelLogoutBtn" style="
                            background: white;
                            color: var(--gray-700);
                            border: 1px solid var(--gray-300);
                            padding: 0.75rem 1.5rem;
                            border-radius: 0.5rem;
                            cursor: pointer;
                            font-weight: 600;
                            font-size: 0.9rem;
                            display: flex;
                            align-items: center;
                            gap: 0.5rem;
                            transition: all 0.3s ease;
                        " onmouseover="this.style.background='var(--gray-50)'; this.style.borderColor='var(--gray-400)'" onmouseout="this.style.background='white'; this.style.borderColor='var(--gray-300)'">
                            <i class="fas fa-times"></i>
                            إلغاء
                        </button>
                    </div>
                </div>
            `;

            logoutOverlay.appendChild(logoutModal);
            document.body.appendChild(logoutOverlay);

            // Close on Escape key (local to this modal)
            function handleEscapeKey(e) {
                if (e.key === 'Escape') {
                    closeLogoutModal();
                    document.removeEventListener('keydown', handleEscapeKey);
                }
            }

            function closeLogoutModal() {
                logoutOverlay.style.opacity = '0';
                logoutModal.style.transform = 'scale(0.9)';
                document.removeEventListener('keydown', handleEscapeKey);
                setTimeout(() => {
                    logoutOverlay.remove();
                }, 300);
            }

            // Animate in
            setTimeout(() => {
                logoutOverlay.style.opacity = '1';
                logoutModal.style.transform = 'scale(1)';
            }, 10);

            // Event listeners
    document.getElementById('confirmLogoutBtn').addEventListener('click', function() {
                // Show loading state
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الخروج...';
                this.disabled = true;
                this.style.opacity = '0.7';
                
                // Clear data and redirect
                setTimeout(() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    document.removeEventListener('keydown', handleEscapeKey);
                    closeLogoutModal();
                    showToast('✅ تم تسجيل الخروج بنجاح', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1500);
                }, 1000);
            });

            document.getElementById('cancelLogoutBtn').addEventListener('click', closeLogoutModal);

            // Close on overlay click
    logoutOverlay.addEventListener('click', function(e) {
                if (e.target === logoutOverlay) {
                    closeLogoutModal();
                }
            });

            // Add escape key listener
            document.addEventListener('keydown', handleEscapeKey);
        }
    
// Toast notification function (same as flashcards)
        function showToast(message, type = 'info') {
            // Remove existing toast if any
            const existingToast = document.querySelector('.toast-notification');
            if (existingToast) {
                existingToast.remove();
            }
    
            const toast = document.createElement('div');
            toast.className = 'toast-notification';
            toast.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
        background: white;
        color: var(--gray-800);
                padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                border-left: 4px solid var(--primary-blue);
                z-index: 10001;
        max-width: 400px;
                opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
                font-family: 'Tajawal', sans-serif;
                direction: rtl;
                font-weight: 500;
    `;

    toast.innerHTML = message;
            document.body.appendChild(toast);
    
            // Animate in
            setTimeout(() => {
                toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
            }, 10);
    
            // Remove after 4 seconds
            setTimeout(() => {
                toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.remove();
                    }
                }, 300);
            }, 4000);
        }
    
// Close the main DOMContentLoaded function
});