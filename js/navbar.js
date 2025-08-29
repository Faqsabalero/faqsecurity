// Navbar Mobile Toggle - Simple y adaptado al proyecto existente
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menu-btn');
    const mainMenu = document.getElementById('mainmenu');
    
    // Verificar que los elementos existen
    if (!menuBtn || !mainMenu) {
        console.warn('Navbar elements not found');
        return;
    }
    
    // Toggle del menú móvil
    menuBtn.addEventListener('click', function() {
        // Toggle clase active en el menú
        mainMenu.classList.toggle('active');
        
        // Toggle clase menu-open en el botón para cambiar el ícono
        menuBtn.classList.toggle('menu-open');
    });
    
    // Cerrar menú al hacer click en un enlace (mobile)
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Solo cerrar en mobile
            if (window.innerWidth <= 992) {
                mainMenu.classList.remove('active');
                menuBtn.classList.remove('menu-open');
            }
        });
    });
    
    // Cerrar menú al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            mainMenu.classList.remove('active');
            menuBtn.classList.remove('menu-open');
        }
    });
});
