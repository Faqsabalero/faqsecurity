// Navbar Mobile Toggle - Ocultación Completa y Menú Más Pequeño
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
    
    console.log('Enhanced navbar with COMPACT menu initialized successfully');
    
    // Variables de estado
    let isMenuOpen = false;
    let scrollTimeout;
    
    // Función para cerrar el menú COMPLETAMENTE
    function closeMenu() {
        console.log('FORCING COMPLETE MENU CLOSURE');
        
        // Remover todas las clases activas
        mainMenu.classList.remove('active');
        menuBtn.classList.remove('menu-open');
        body.classList.remove('menu-open');
        header.classList.remove('menu-active');
        
        // FORZAR OCULTACIÓN COMPLETA CON MÚLTIPLES MÉTODOS
        mainMenu.style.display = 'none';
        mainMenu.style.opacity = '0';
        mainMenu.style.visibility = 'hidden';
        mainMenu.style.pointerEvents = 'none';
        mainMenu.style.transform = 'translateX(-50%) translateY(-20px) scale(0.9)';
        
        // Restaurar scroll del body INMEDIATAMENTE
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.height = '';
        
        // Actualizar estado
        isMenuOpen = false;
        
        console.log('Menu COMPLETELY HIDDEN with all methods');
    }
    
    // Función para abrir el menú
    function openMenu() {
        if (isMenuOpen) return;
        
        console.log('Opening compact menu');
        
        // Agregar clases activas
        mainMenu.classList.add('active');
        menuBtn.classList.add('menu-open');
        body.classList.add('menu-open');
        header.classList.add('menu-active');
        
        // FORZAR VISIBILIDAD COMPLETA
        mainMenu.style.display = 'flex';
        mainMenu.style.opacity = '1';
        mainMenu.style.visibility = 'visible';
        mainMenu.style.pointerEvents = 'all';
        mainMenu.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        
        // Prevenir scroll en mobile
        if (window.innerWidth <= 992) {
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.width = '100%';
            body.style.height = '100%';
        }
        
        // Actualizar estado
        isMenuOpen = true;
        
        console.log('Compact menu opened successfully');
    }
    
    // Toggle del menú móvil
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Menu button clicked, current state:', isMenuOpen);
        
        // Vibración en mobile
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Cerrar menú al hacer click en un enlace - MEJORADO
    const menuLinks = mainMenu.querySelectorAll('li a');
    console.log('Found menu links:', menuLinks.length);
    
    menuLinks.forEach(function(link, index) {
        link.addEventListener('click', function(e) {
            console.log('Link clicked:', link.textContent, 'Window width:', window.innerWidth);
            console.log('Menu state before link click:', isMenuOpen);
            
            // FORZAR CIERRE INMEDIATO EN MOBILE
            if (window.innerWidth <= 992 && isMenuOpen) {
                e.preventDefault(); // Prevenir navegación inmediata
                
                // Crear efecto ripple más pequeño
                const ripple = document.createElement('span');
                const rect = link.getBoundingClientRect();
                const size = Math.min(rect.width, rect.height) * 0.8; // MÁS PEQUEÑO
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(0, 191, 255, 0.5) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.4s ease-out;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                link.appendChild(ripple);
                
                // CERRAR MENÚ INMEDIATAMENTE Y COMPLETAMENTE
                closeMenu();
                
                // Navegar después de cerrar
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
                }, 50); // DELAY MÁS CORTO
            }
        });
        
        // Efectos hover mejorados para desktop
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 992) {
                link.style.transform = 'translateY(-2px) scale(1.03)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (window.innerWidth > 992) {
                link.style.transform = '';
            }
        });
    });
    
    // Cerrar menú al hacer click fuera - MEJORADO
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && isMenuOpen) {
            if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                console.log('Clicking outside compact menu, closing...');
                closeMenu();
            }
        }
    });
    
    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && isMenuOpen) {
            closeMenu();
        }
        
        // Restaurar estilos del body en desktop
        if (window.innerWidth > 992) {
            body.style.overflow = '';
            body.style.position = '';
            body.style.width = '';
            body.style.height = '';
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            console.log('Escape pressed, closing compact menu...');
            closeMenu();
        }
    });
    
    // Efecto de scroll en header - DESHABILITADO CUANDO MENU ABIERTO
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        // No manejar scroll si el menú está abierto
        if (isMenuOpen) return;
        
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Auto-hide header en scroll (opcional)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }
    
    // Throttle scroll events
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Detectar cambios de orientación
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (isMenuOpen) {
                console.log('Orientation changed, closing compact menu...');
                closeMenu();
            }
        }, 100);
    });
    
    // Detectar cambio de visibilidad de página
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isMenuOpen) {
            console.log('Page hidden, closing compact menu...');
            closeMenu();
        }
    });
    
    // Detectar pérdida de foco
    window.addEventListener('blur', function() {
        if (isMenuOpen) {
            console.log('Window lost focus, closing compact menu...');
            closeMenu();
        }
    });
    
    // Agregar estilos CSS para efectos
    const compactStyles = document.createElement('style');
    compactStyles.textContent = `
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
            height: 100% !important;
        }
        
        header.menu-active {
            box-shadow: 0 8px 40px rgba(0, 191, 255, 0.3), 0 0 0 1px rgba(0, 191, 255, 0.4);
        }
        
        /* FORZAR OCULTACIÓN COMPLETA */
        #mainmenu:not(.active) {
            display: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
        }
    `;
    document.head.appendChild(compactStyles);
    
    // Función de emergencia para cerrar menú
    window.forceCloseCompactMenu = function() {
        console.log('EMERGENCY: FORCE CLOSING COMPACT MENU');
        closeMenu();
    };
    
    // Inicialización completa
    console.log('Compact navbar with COMPLETE hiding ready');
});

// Función global mejorada
window.closeNavbarMenu = function() {
    console.log('Global close compact menu called');
    const mainMenu = document.getElementById('mainmenu');
    const menuBtn = document.getElementById('menu-btn');
    const body = document.body;
    const header = document.querySelector('header.header-mobile');
    
    if (mainMenu && menuBtn) {
        // Remover clases
        mainMenu.classList.remove('active');
        menuBtn.classList.remove('menu-open');
        body.classList.remove('menu-open');
        if (header) header.classList.remove('menu-active');
        
        // FORZAR OCULTACIÓN COMPLETA
        mainMenu.style.display = 'none';
        mainMenu.style.opacity = '0';
        mainMenu.style.visibility = 'hidden';
        mainMenu.style.pointerEvents = 'none';
        
        // Restaurar body
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.height = '';
        
        console.log('Global compact menu close completed');
    }
};
