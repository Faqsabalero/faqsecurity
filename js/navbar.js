// Navbar Mobile Toggle - Funcionalidad y Efectos Mejorados
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const mainMenu = document.getElementById('mainmenu');
    const header = document.querySelector('header.header-mobile');
    const body = document.body;
    
    // Verificar que los elementos existen
    if (!menuBtn || !mainMenu || !header) {
        console.error('Navbar elements not found:', { menuBtn, mainMenu, header });
        return;
    }
    
    console.log('Enhanced navbar initialized successfully');
    
    // Variables de estado
    let isMenuOpen = false;
    let scrollTimeout;
    
    // Función para cerrar el menú con efectos
    function closeMenu() {
        if (!isMenuOpen) return;
        
        mainMenu.classList.remove('active');
        menuBtn.classList.remove('menu-open');
        body.classList.remove('menu-open');
        header.classList.remove('menu-active');
        isMenuOpen = false;
        
        // Restaurar scroll
        body.style.overflow = '';
        
        console.log('Menu closed with enhanced effects');
    }
    
    // Función para abrir el menú con efectos
    function openMenu() {
        if (isMenuOpen) return;
        
        mainMenu.classList.add('active');
        menuBtn.classList.add('menu-open');
        body.classList.add('menu-open');
        header.classList.add('menu-active');
        isMenuOpen = true;
        
        // Prevenir scroll en mobile cuando el menú está abierto
        if (window.innerWidth <= 992) {
            body.style.overflow = 'hidden';
        }
        
        console.log('Menu opened with enhanced effects');
    }
    
    // Toggle del menú móvil con efectos mejorados
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Efecto de vibración en mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Cerrar menú al hacer click en un enlace con efectos
    const menuLinks = mainMenu.querySelectorAll('li a');
    console.log('Found menu links:', menuLinks.length);
    
    menuLinks.forEach(function(link, index) {
        // Agregar efecto de ripple
        link.addEventListener('click', function(e) {
            console.log('Link clicked:', link.textContent, 'Window width:', window.innerWidth);
            
            // Crear efecto ripple
            const ripple = document.createElement('span');
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 191, 255, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            link.appendChild(ripple);
            
            // Remover ripple después de la animación
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
            
            // Cerrar menú en mobile con delay para permitir navegación
            if (window.innerWidth <= 992) {
                setTimeout(function() {
                    closeMenu();
                }, 150);
            }
        });
        
        // Efectos hover mejorados
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                link.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                link.style.transform = '';
            }
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && isMenuOpen) {
            if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && isMenuOpen) {
            closeMenu();
        }
        
        // Restaurar overflow del body
        if (window.innerWidth > 992) {
            body.style.overflow = '';
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Efecto de scroll en header
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Agregar clase scrolled cuando se hace scroll
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar header en scroll (opcional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events para mejor performance
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Preloader para transiciones
    function showLoader() {
        header.classList.add('navbar-loading');
        setTimeout(() => {
            header.classList.remove('navbar-loading');
        }, 300);
    }
    
    // Detectar cambios de orientación en mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (isMenuOpen) {
                closeMenu();
            }
        }, 100);
    });
    
    // Agregar estilos CSS para ripple effect
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .menu-open {
            overflow: hidden !important;
        }
        
        header.menu-active {
            box-shadow: 0 8px 40px rgba(0, 191, 255, 0.3), 0 0 0 1px rgba(0, 191, 255, 0.4);
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Inicialización completa
    console.log('Enhanced navbar with advanced effects ready');
});

// Función global para cerrar menú (útil para otros scripts)
window.closeNavbarMenu = function() {
    const mainMenu = document.getElementById('mainmenu');
    const menuBtn = document.getElementById('menu-btn');
    const body = document.body;
    
    if (mainMenu && menuBtn) {
        mainMenu.classList.remove('active');
        menuBtn.classList.remove('menu-open');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
};
