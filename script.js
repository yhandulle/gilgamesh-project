document.addEventListener('DOMContentLoaded', function() {
    // Title Page Audio + Scroll
    const audio = document.getElementById('title-audio');
    let hasPlayed = false;

    function playAudio() {
        if (!hasPlayed) {
            audio.play().catch(err => console.log('Autoplay blocked:', err));
            hasPlayed = true;

            // Manual smooth horizontal scroll
            const scrollDistance = window.innerWidth; // how far to scroll
            const scrollDuration = 3000; // how long to scroll (3 seconds)
            const startTime = performance.now();
            const startScrollLeft = window.scrollX;

            function animateScroll(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / scrollDuration, 1); // cap at 1
                window.scrollTo({
                    left: startScrollLeft + scrollDistance * progress,
                    top: 0
                });

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }

            requestAnimationFrame(animateScroll);

            document.removeEventListener('click', playAudio);
            document.removeEventListener('keydown', playAudio);
            document.removeEventListener('wheel', playAudio);
            document.removeEventListener('touchstart', playAudio);
        }
    }

    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    document.addEventListener('wheel', playAudio);
    document.addEventListener('touchstart', playAudio);

    // Shamhat Summon Page Button
    const summonButton = document.getElementById('summon-button');
    const summonRight = document.getElementById('summon-right');
    const shamhatAudio = document.getElementById('shamhat-audio');

    if (summonButton && summonRight && shamhatAudio) { // Only if the elements exist
        summonButton.addEventListener('click', function() {
            summonRight.style.visibility = 'visible';
            summonRight.style.opacity = '1';
            shamhatAudio.play();
        });
    }
  
    
    const finalScene = document.getElementById('final-scene');
    const paragraph1 = document.getElementById('paragraph1');
    const paragraph2 = document.getElementById('paragraph2');
    const paragraph3 = document.getElementById('paragraph3');
    const paragraph4 = document.getElementById('paragraph4');
    const heartbeatAudio = document.getElementById('heartbeat-audio');

    if (finalScene && paragraph1 && paragraph2 && paragraph3 && paragraph4 && heartbeatAudio) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heartbeatAudio.play(); // Start heartbeat
                    paragraph1.style.opacity = '1'; // Fade in 1st immediately

                    setTimeout(() => {
                        paragraph2.style.opacity = '1'; 
                    }, 15000);

                    setTimeout(() => {
                        paragraph3.style.opacity = '1'; 
                    }, 30000);

                    setTimeout(() => {
                        paragraph4.style.opacity = '1'; 
                    }, 45000);

                    // Keep looping heartbeat until 60s have passed
                    let heartbeatStartTime = Date.now();
                    
                    heartbeatAudio.addEventListener('ended', function loopHeartbeat() {
                        const elapsed = (Date.now() - heartbeatStartTime) / 1000;
                        if (elapsed < 60) {
                            heartbeatAudio.play();
                        } else {
                            heartbeatAudio.removeEventListener('ended', loopHeartbeat);
                        }
                    });

                    observer.disconnect(); // Only happen once
                }
            });
        }, {
            threshold: 0.5
        });

        observer.observe(finalScene);
    }
    
    
});
