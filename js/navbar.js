// Navbar Mobile Toggle - Funcionalidad Corregida para Cierre Automático
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
    
    // Función para cerrar el menú con efectos - MEJORADA
    function closeMenu() {
        console.log('Attempting to close menu, current state:', isMenuOpen);
        
        mainMenu.classList.remove('active');
        menuBtn.classList.remove('menu-open');
        body.classList.remove('menu-open');
        header.classList.remove('menu-active');
        isMenuOpen = false;
        
        // Restaurar scroll INMEDIATAMENTE
        body.style.overflow = '';
        body.style.position = '';
        
        console.log('Menu closed with enhanced effects - FORCED');
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
            body.style.position = 'fixed';
            body.style.width = '100%';
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
    
    // Cerrar menú al hacer click en un enlace - CORREGIDO
    const menuLinks = mainMenu.querySelectorAll('li a');
    console.log('Found menu links:', menuLinks.length);
    
    menuLinks.forEach(function(link, index) {
        link.addEventListener('click', function(e) {
            console.log('Link clicked:', link.textContent, 'Window width:', window.innerWidth);
            console.log('Menu open state before click:', isMenuOpen);
            
            // FORZAR CIERRE INMEDIATO EN MOBILE
            if (window.innerWidth <= 992 && isMenuOpen) {
                e.preventDefault(); // Prevenir navegación inmediata
                
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
                
                // CERRAR MENÚ INMEDIATAMENTE
                closeMenu();
                
                // Navegar después de cerrar el menú
                setTimeout(() => {
                    const href = link.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        const target = document.querySelector(href);
                        if (target) {
                            const headerHeight = header.offsetHeight;
                            const targetPosition = target.offsetTop - headerHeight - 20;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    } else if (href) {
                        window.location.href = href;
                    }
                    
                    // Limpiar ripple
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 100);
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
    
    // Cerrar menú al hacer click fuera de él - MEJORADO
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && isMenuOpen) {
            if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                console.log('Clicking outside menu, closing...');
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
            body.style.position = '';
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('Escape pressed, closing menu...');
            closeMenu();
        }
    });
    
    // Efecto de scroll en header - DESHABILITADO CUANDO MENU ABIERTO
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        // No manejar scroll si el menú está abierto
        if (isMenuOpen) return;
        
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
    
    // Detectar cambios de orientación en mobile
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (isMenuOpen) {
                console.log('Orientation changed, closing menu...');
                closeMenu();
            }
        }, 100);
    });
    
    // Detectar cambio de visibilidad de página
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isMenuOpen) {
            console.log('Page hidden, closing menu...');
            closeMenu();
        }
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
            position: fixed !important;
            width: 100% !important;
        }
        
        header.menu-active {
            box-shadow: 0 8px 40px rgba(0, 191, 255, 0.3), 0 0 0 1px rgba(0, 191, 255, 0.4);
        }
    `;
    document.head.appendChild(rippleStyles);
    
    // Función de emergencia para cerrar menú
    window.forceCloseMenu = function() {
        console.log('FORCE CLOSING MENU');
        closeMenu();
    };
    
    // Inicialización completa
    console.log('Enhanced navbar with FIXED mobile menu closing ready');
});

// Función global para cerrar menú (útil para otros scripts) - MEJORADA
window.closeNavbarMenu = function() {
    console.log('Global close menu called');
    const mainMenu = document.getElementById('mainmenu');
    const menuBtn = document.getElementById('menu-btn');
    const body = document.body;
    const header = document.querySelector('header.header-mobile');
    
    if (mainMenu && menuBtn) {
        mainMenu.classList.remove('active');
        menuBtn.classList.remove('menu-open');
        body.classList.remove('menu-open');
        if (header) header.classList.remove('menu-active');
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        console.log('Global menu close completed');
    }
};
