/* Template Saham Cerdas - JavaScript */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeTemplate();
});

// Initialize Template Functions
function initializeTemplate() {
    // Ensure body is available before setting up features
    if (document.body) {
        setupMobileMenu();
        setupSearchEnhancements();
        setupScrollEffects();
        setupLazyLoading();
        setupSmoothScrolling();
        setupStockPriceSimulation();
        setupBackToTop();
        setupReadingProgress();
        
        // Initialize reading progress on blog post pages
        if (document.querySelector('.post-content')) {
            setupReadingProgress();
        }
    } else {
        // If body is not available, wait for it
        window.addEventListener('load', initializeTemplate);
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // Insert mobile menu button
    const headerContent = document.querySelector('.header-content');
    if (headerContent && navMenu) {
        headerContent.appendChild(mobileMenuBtn);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
        });
    }
    
    // Mobile menu styles
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--primary-color);
                flex-direction: column;
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-menu.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
}

// Enhanced Search Functionality
function setupSearchEnhancements() {
    const searchInput = document.querySelector('.search-input');
    const searchForm = document.querySelector('.search-form');
    
    if (searchInput) {
        // Add search suggestions (placeholder functionality)
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                // Here you could implement search suggestions
                console.log('Searching for:', query);
            }
        });
        
        // Enhanced search form submission
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                const query = searchInput.value.trim();
                if (!query) {
                    e.preventDefault();
                    searchInput.focus();
                    showNotification('Masukkan kata kunci pencarian', 'warning');
                }
            });
        }
    }
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header shadow on scroll
        if (scrollTop > 10) {
            header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        // Hide/show header on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition to header
    header.style.transition = 'all 0.3s ease';
}

// Lazy Loading for Images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Stock Price Simulation (Demo Feature)
function setupStockPriceSimulation() {
    // Create stock ticker widget
    const stockWidget = createStockWidget();
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebar && stockWidget) {
        sidebar.insertBefore(stockWidget, sidebar.firstChild);
    }
}

// Create Stock Widget
function createStockWidget() {
    const widget = document.createElement('div');
    widget.className = 'widget stock-widget';
    
    const stockData = [
        { symbol: 'BBCA', name: 'Bank Central Asia', price: 8750, change: +125 },
        { symbol: 'BBRI', name: 'Bank Rakyat Indonesia', price: 4580, change: -45 },
        { symbol: 'BMRI', name: 'Bank Mandiri', price: 9200, change: +75 },
        { symbol: 'TLKM', name: 'Telkom Indonesia', price: 3850, change: +25 }
    ];
    
    widget.innerHTML = `
        <h3 class="widget-title">📈 Harga Saham Terkini</h3>
        <div class="stock-list">
            ${stockData.map(stock => `
                <div class="stock-item">
                    <div class="stock-info">
                        <div class="stock-symbol">${stock.symbol}</div>
                        <div class="stock-name">${stock.name}</div>
                    </div>
                    <div class="stock-price">
                        <div class="price">Rp ${stock.price.toLocaleString()}</div>
                        <div class="change ${stock.change >= 0 ? 'positive' : 'negative'}">
                            ${stock.change >= 0 ? '+' : ''}${stock.change}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        <div class="stock-disclaimer">
            <small>*Data simulasi untuk demo</small>
        </div>
    `;
    
    // Add stock widget styles
    const stockStyles = document.createElement('style');
    stockStyles.textContent = `
        .stock-widget .stock-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .stock-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem;
            background: #f8f9fa;
            border-radius: 6px;
            border-left: 4px solid var(--primary-color);
        }
        
        .stock-symbol {
            font-weight: 600;
            color: var(--primary-color);
            font-size: 0.9rem;
        }
        
        .stock-name {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .stock-price {
            text-align: right;
        }
        
        .price {
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .change {
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .change.positive {
            color: var(--secondary-color);
        }
        
        .change.negative {
            color: var(--danger-color);
        }
        
        .stock-disclaimer {
            margin-top: 1rem;
            text-align: center;
            color: var(--text-secondary);
        }
    `;
    document.head.appendChild(stockStyles);
    
    // Simulate price updates
    setInterval(() => {
        updateStockPrices(widget);
    }, 10000); // Update every 10 seconds
    
    return widget;
}

// Update Stock Prices
function updateStockPrices(widget) {
    const stockItems = widget.querySelectorAll('.stock-item');
    
    stockItems.forEach(item => {
        const priceElement = item.querySelector('.price');
        const changeElement = item.querySelector('.change');
        
        if (priceElement && changeElement) {
            // Simulate price change
            const currentPrice = parseInt(priceElement.textContent.replace(/[^\d]/g, ''));
            const changePercent = (Math.random() - 0.5) * 0.02; // ±1% change
            const newChange = Math.round(currentPrice * changePercent);
            const newPrice = currentPrice + newChange;
            
            // Update display
            priceElement.textContent = `Rp ${newPrice.toLocaleString()}`;
            changeElement.textContent = `${newChange >= 0 ? '+' : ''}${newChange}`;
            changeElement.className = `change ${newChange >= 0 ? 'positive' : 'negative'}`;
            
            // Add flash effect
            item.style.background = newChange >= 0 ? '#e8f5e8' : '#ffeaea';
            setTimeout(() => {
                item.style.background = '#f8f9fa';
            }, 1000);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Set background color based on type
    const colors = {
        info: '#1a73e8',
        success: '#34a853',
        warning: '#fbbc04',
        error: '#ea4335'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Reading Progress Bar
function setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--accent-color);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    });
}

// Back to Top Button
function setupBackToTop() {
    try {
        // Check if button already exists
        if (document.querySelector('.back-to-top')) return;
        
        // Ensure body exists
        if (!document.body) return;

        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } catch (error) {
        console.error('Error setting up back to top button:', error);
    }
}


// Console welcome message
console.log('%c🚀 Template Saham Cerdas berhasil dimuat!', 'color: #1a73e8; font-size: 16px; font-weight: bold;');
