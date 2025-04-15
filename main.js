// Initialize animations when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing animations...');

    // Logo animation
    const logoAnimation = anime({
        targets: '.logo-path',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: 500,
        loop: true,
        direction: 'alternate'
    });

    // Floating heart animation with mouse follow
    const heart = document.querySelector('#floating-heart');
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const followMouse = anime({
        targets: '#floating-heart',
        translateX: () => mouseX * 0.05,
        translateY: () => mouseY * 0.05,
        easing: 'easeOutElastic(1, .8)',
        update: () => {
            console.log('Heart position updated');
        }
    });

    // Creative canvas animations
    const transformations = [
        { 
            shape: 'M10,10 L190,10 L190,190 L10,190 Z',
            name: 'Square',
            color: '#ff6b6b'
        },
        { 
            shape: 'M100,10 L190,190 L10,190 Z',
            name: 'Triangle',
            color: '#6366f1'
        },
        { 
            shape: 'M100,10 A90,90 0 1,1 100,190 A90,90 0 1,1 100,10',
            name: 'Circle',
            color: '#4834d4'
        },
        { 
            shape: 'M10,100 L100,10 L190,100 L100,190 Z',
            name: 'Diamond',
            color: '#ff4b8b'
        }
    ];

    let currentShape = 0;
    const descriptionEl = document.querySelector('.transform-description');
    const morphTarget = document.querySelector('.morph-target');
    
    // Update description text and animate it
    const updateDescription = (text) => {
        anime({
            targets: '.transform-description',
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 500,
            easing: 'easeInOutQuad',
            complete: () => {
                descriptionEl.textContent = text;
                anime({
                    targets: '.transform-description',
                    opacity: [0, 1],
                    translateY: [-10, 0],
                    duration: 500,
                    easing: 'easeOutQuad'
                });
            }
        });
    };

    // Initial description
    updateDescription('Square');

    const animateNextTransformation = () => {
        const current = transformations[currentShape];
        const next = transformations[(currentShape + 1) % transformations.length];

        // Update text first
        updateDescription(current.name);

        // Wait 1 second, then morph the shape
        setTimeout(() => {
            anime({
                targets: '.morph-target',
                d: current.shape,
                stroke: current.color,
                duration: 1500,
                easing: 'easeInOutQuad'
            });

            // Wait 3 seconds before starting the next transformation
            setTimeout(() => {
                currentShape = (currentShape + 1) % transformations.length;
                animateNextTransformation();
            }, 3000);
        }, 1000);
    };

    // Start the animation sequence
    animateNextTransformation();

    // Animate social proof section on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log('Social proof section in view');
                anime({
                    targets: '.avatar',
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    delay: anime.stagger(100),
                    duration: 800,
                    easing: 'easeOutElastic(1, .8)'
                });

                anime({
                    targets: '.stars',
                    scale: [0, 1],
                    opacity: [0, 1],
                    duration: 1000,
                    easing: 'easeOutElastic(1, .8)'
                });
            }
        });
    });

    observer.observe(document.querySelector('.social-proof'));

    // Add hover effects to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            anime({
                targets: button,
                scale: 1.05,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        });

        button.addEventListener('mouseleave', () => {
            anime({
                targets: button,
                scale: 1,
                duration: 300,
                easing: 'easeOutElastic(1, .8)'
            });
        });
    });

    // Creative particles animation
    const particlesContainer = document.querySelector('.particles-container');
    const particleColors = ['#ff6b6b', '#6366f1', '#4834d4', '#ff4b8b'];
    const numberOfParticles = 30; // Reduced number since particles are bigger
    const particles = [];

    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        particlesContainer.appendChild(particle);
        particles.push(particle);

        // Set random initial positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = x + '%';
        particle.style.top = y + '%';
    }

    // Animate particles
    const particleAnimation = anime({
        targets: '.particle',
        translateX: () => anime.random(-70, 70),
        translateY: () => anime.random(-70, 70),
        scale: [0, 1],
        opacity: [0, 0.7, 0],
        delay: anime.stagger(100),
        duration: 4000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        update: (anim) => {
            // Create swarm effect by updating positions based on neighbors
            particles.forEach((particle, index) => {
                const nextParticle = particles[(index + 1) % particles.length];
                const prevParticle = particles[(index - 1 + particles.length) % particles.length];
                
                const currentTransform = anime.get(particle, 'transform');
                const nextTransform = anime.get(nextParticle, 'transform');
                const prevTransform = anime.get(prevParticle, 'transform');
                
                // Add slight attraction to neighbors
                const attraction = 0.15;
                const newX = currentTransform.translateX + (nextTransform.translateX - currentTransform.translateX) * attraction;
                const newY = currentTransform.translateY + (prevTransform.translateY - currentTransform.translateY) * attraction;
                
                anime.set(particle, {
                    translateX: newX,
                    translateY: newY
                });
            });
        }
    });

    // Add pulsing effect to particles container
    anime({
        targets: '.creative-particles',
        backgroundColor: [
            { value: 'rgba(99, 102, 241, 0.03)', duration: 2000 },
            { value: 'rgba(99, 102, 241, 0.08)', duration: 2000 }
        ],
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad'
    });

    console.log('All animations initialized successfully');
}); 