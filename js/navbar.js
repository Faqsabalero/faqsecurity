// Navbar Mobile Toggle - Mejorado y corregido
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const mainMenu = document.getElementById('mainmenu');
    
    // Verificar que los elementos existen
    if (!menuBtn || !mainMenu) {
        console.error('Navbar elements not found:', { menuBtn, mainMenu });
        return;
    }
    
    console.log('Navbar initialized successfully');
    
    // Función para cerrar el menú
    function closeMenu() {
        mainMenu.classList.remove('active');
        menuBtn.classList.remove('menu-open');
        console.log('Menu closed');
    }
    
    // Función para abrir el menú
    function openMenu() {
        mainMenu.classList.add('active');
        menuBtn.classList.add('menu-open');
        console.log('Menu opened');
    }
    
    // Toggle del menú móvil
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (mainMenu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Cerrar menú al hacer click en un enlace (mobile)
    const menuLinks = mainMenu.querySelectorAll('li a');
    console.log('Found menu links:', menuLinks.length);
    
    menuLinks.forEach(function(link, index) {
        link.addEventListener('click', function(e) {
            console.log('Link clicked:', link.textContent, 'Window width:', window.innerWidth);
            
            // Siempre cerrar en mobile (menos de 992px)
            if (window.innerWidth <= 992) {
                // Pequeño delay para permitir que la navegación ocurra
                setTimeout(function() {
                    closeMenu();
                }, 100);
            }
        });
    });
    
    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992 && mainMenu.classList.contains('active')) {
            // Si el click no es en el menú ni en el botón, cerrar
            if (!mainMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMenu();
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainMenu.classList.contains('active')) {
            closeMenu();
        }
    });
});
