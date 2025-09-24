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


// In my page I want the video to play endlessly and autoplay
document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('intro-video-element');
    
    if (videoElement) {
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.autoplay = true;
        
        videoElement.addEventListener('loadeddata', function() {
            console.log('Video loaded and ready to play');
        });
        
        videoElement.addEventListener('error', function(e) {
            console.log('Error with the video:', e);
        });
        
        videoElement.addEventListener('canplay', function() {
            videoElement.play().catch(function(error) {
                console.log('Autoplay prevented:', error);
            });
        });
        
        //I think it would be nice to allow it to play when it's on screen
        //but pause when it's not that way the user doesn't miss anything
        const introVideoSection = document.getElementById('intro-video');
        const videoObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && videoElement) {
                    videoElement.play().catch(function(error) {
                        console.log('Play prevented:', error);
                    });
                } else if (!entry.isIntersecting && videoElement) {
                    videoElement.pause();
                }
            });
        }, {
            threshold: 0.3 // This should play when 30% of video section is visible
        });
        
        if (introVideoSection) {
            videoObserver.observe(introVideoSection);
        }
    }
});