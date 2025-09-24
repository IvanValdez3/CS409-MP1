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

//Looking at youtube documentation for allowing a video to be played on repeat
//https://developers.google.com/youtube/player_parameters#loop

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('intro-video-iframe');
}

const introVideo = document.getElementById('intro-video');
const play = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            player.playVideo();
        } else {
            player.pauseVideo();
        }
    });
});

play.observe(introVideo);