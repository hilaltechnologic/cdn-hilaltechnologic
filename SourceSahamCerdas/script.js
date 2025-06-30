// Enhanced Dark Mode Toggle Functionality untuk External Script
(function() {
    'use strict';
    
    function initDarkModeExternal() {
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const body = document.body;
        
        if (!themeToggleBtn) {
            console.warn('Theme toggle button not found in external script');
            return;
        }
        
        // Check for saved theme preference or default to 'light'
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        
        // Update toggle button state
        updateToggleButton(currentTheme);
        
        // Theme toggle event listener
        themeToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Apply new theme
            body.setAttribute('data-theme', newTheme);
            
            try {
                localStorage.setItem('theme', newTheme);
            } catch (error) {
                console.warn('Could not save theme preference:', error);
            }
            
            // Update button state
            updateToggleButton(newTheme);
            
            // Add animation effect
            themeToggleBtn.style.transform = 'scale(0.9)';
            setTimeout(function() {
                themeToggleBtn.style.transform = 'scale(1)';
            }, 150);
        });
        
        function updateToggleButton(theme) {
            const sunIcon = document.querySelector('.sun-icon');
            const moonIcon = document.querySelector('.moon-icon');
            
            if (theme === 'dark') {
                if (sunIcon) sunIcon.style.display = 'inline';
                if (moonIcon) moonIcon.style.display = 'none';
            } else {
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'inline';
            }
        }
        
        // Auto-detect system theme preference
        if (window.matchMedia && !localStorage.getItem('theme')) {
            try {
                const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                const systemTheme = mediaQuery.matches ? 'dark' : 'light';
                body.setAttribute('data-theme', systemTheme);
                updateToggleButton(systemTheme);
                
                // Listen for system theme changes
                mediaQuery.addEventListener('change', function(e) {
                    if (!localStorage.getItem('theme')) {
                        const newTheme = e.matches ? 'dark' : 'light';
                        body.setAttribute('data-theme', newTheme);
                        updateToggleButton(newTheme);
                    }
                });
            } catch (error) {
                console.warn('Could not detect system theme:', error);
            }
        }
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDarkModeExternal);
    } else {
        initDarkModeExternal();
    }
    
    // Fallback initialization
    setTimeout(initDarkModeExternal, 500);
})();

// Reading Time Calculator
document.addEventListener('DOMContentLoaded', function() {
    const postContent = document.querySelector('.post-content');
    const readingTimeElement = document.getElementById('reading-time-value');
    
    if (postContent && readingTimeElement) {
        const text = postContent.textContent || postContent.innerText;
        const wordsPerMinute = 200; // Average reading speed
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        
        readingTimeElement.textContent = readingTime;
    }
});

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    // Set styles individually to avoid cssText issues
    backToTopBtn.style.position = 'fixed';
    backToTopBtn.style.bottom = '20px';
    backToTopBtn.style.right = '20px';
    backToTopBtn.style.width = '50px';
    backToTopBtn.style.height = '50px';
    backToTopBtn.style.borderRadius = '50%';
    backToTopBtn.style.background = '#1a73e8';
    backToTopBtn.style.color = 'white';
    backToTopBtn.style.border = 'none';
    backToTopBtn.style.fontSize = '20px';
    backToTopBtn.style.cursor = 'pointer';
    backToTopBtn.style.opacity = '0';
    backToTopBtn.style.visibility = 'hidden';
    backToTopBtn.style.transition = 'all 0.3s ease';
    backToTopBtn.style.zIndex = '1000';
    
    // Safely append to body
    if (document.body) {
        document.body.appendChild(backToTopBtn);
    }
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Enhanced Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        // Add search suggestions (basic implementation)
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                // Here you could implement search suggestions
                console.log('Searching for:', query);
            }
        });
        
        // Enhanced search form submission
        const searchForm = document.querySelector('.search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                const query = searchInput.value.trim();
                if (!query) {
                    e.preventDefault();
                    searchInput.focus();
                }
            });
        }
    }
});

// Mobile Menu Enhancement (for future mobile menu implementation)
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu && window.innerWidth <= 768) {
        // Add mobile menu functionality here
        console.log('Mobile menu ready for implementation');
    }
});

// Performance Monitoring
document.addEventListener('DOMContentLoaded', function() {
    // Log page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        }
    });
});
