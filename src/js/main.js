/* Your JS here. */
console.log('Hello World!')

/*The goal is simple when we scroll the navbar and it's contents should shrink,
  but return to normal when at the top*/

//Random comment to commit

window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    const scrollPosition = window.scrollY;
    
    // Handle nav shrinking
    if (scrollPosition > 50) {
        nav.classList.add('shrink');
    } else {
        nav.classList.remove('shrink');
    }
    
    // When scrolling this should signify which section
    updateActiveNavItem();
});

function updateActiveNavItem() {
    const sections = ['brainrotters', 'more', 'footer'];
    const navLinks = document.querySelectorAll('.nav-right a');
    const navHeight = document.getElementById('nav').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 50; 
    
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Most important check what section we're in
    let currentSection = '';
    
    for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i]);
        if (section) {
            const Top = section.offsetTop;
            const bottom = Top + section.offsetHeight;

            if (scrollPosition >= Top && scrollPosition < bottom) {
                currentSection = sections[i];
                break;
            }
        }
    }
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        currentSection = 'footer';
    }
    
    if (currentSection) {
        const active = document.querySelector(`a[href="#${currentSection}"]`);
        if (active) {
            active.classList.add('active');
        }
    }
}

document.querySelectorAll('.nav-right a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const element = document.querySelector(targetId);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// In my page I want the video to play endlessly and autoplay
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('intro-video-element');
    
    if (video) {
        video.muted = true;
        video.loop = true;
        video.autoplay = true;

        video.addEventListener('loadeddata', function() {
            console.log('Video is ready to play');
        });
        
        video.addEventListener('error', function(e) {
            console.log('Error', e);
        });
        
        video.addEventListener('canplay', function() {
            video.play().catch(function(error) {
                console.log('Autoplay prevented:', error);
            });
        });
        
        //I think it would be nice to allow it to play when it's on screen
        //but pause when it's not that way the user doesn't miss anything
        const introVideo = document.getElementById('intro-video');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && video) {
                    video.play().catch(function(error) {
                        console.log('Play prevented:', error);
                    });
                } else if (!entry.isIntersecting && video) {
                    video.pause();
                }
            });
        }, {
            threshold: 0.3 // This should play when 30% of video section is visible
        });

        if (introVideo) {
            observer.observe(introVideo);
        }
    }

    // Modal functionality for brainrotter gallery
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeBtn = document.querySelector('.close');
    const brainrotterEntries = document.querySelectorAll('.brainrotter-entry');
    
    console.log('Modal element:', modal);
    console.log('Modal video:', modalVideo);
    console.log('Brainrotter entries:', brainrotterEntries.length);

    //Any brainrotter that the user clicks should open the video
    brainrotterEntries.forEach((entry, index) => {
        console.log('Adding click listener', index);
        entry.addEventListener('click', function(e) {
            console.log('Brainrotter clicked!', index);
            e.preventDefault();
            
            if (modal) {
                modal.classList.add('show');
                console.log('Modal should be visible');
                
                if (modalVideo) {
                    modalVideo.currentTime = 0;
                    modalVideo.play().catch(function(error) {
                        console.log('Video play prevented:', error);
                    });
                }
            } else {
                console.log('Modal element not found!');
            }
        });
    });
    
    // The video should stop if they close the browser or click outside the video
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
            modalVideo.pause();
            modalVideo.currentTime = 0;
        });
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    });

    const list = document.getElementById('carousel-list');
    const prevBtn = document.getElementById('prevbtn');
    const nextBtn = document.getElementById('nextbtn');
    
    let current = 0;
    
    function updateCarousel() {
        const translateX = -(current * 33.333);
        list.style.transform = `translateX(${translateX}%)`;
    }
    
    // Next button
    if (nextBtn) {
        nextBtn.innerHTML = '→';
        nextBtn.addEventListener('click', function() {
            current++;
            if (current >= 3) {
                current = 0; 
            }
            updateCarousel();
        });
    }
    
    // Previous button  
    if (prevBtn) {
        prevBtn.innerHTML = '←';
        prevBtn.addEventListener('click', function() {
            current--;
            if (current < 0) {
                current = 2;
            }
            updateCarousel();
        });
    }
    
});