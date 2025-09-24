/* Your JS here. */
console.log('Hello World!')

/*The goal is simple when we scroll the navbar and it's contents should shrink,
  but return to normal when at the top*/
window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        nav.classList.add('shrink');
    } else {
        nav.classList.remove('shrink');
    }
});

document.querySelectorAll('.nav-right a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
