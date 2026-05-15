document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    // Apply observer to destination cards
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.dest-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        cardObserver.observe(card);
    });

    // Newsletter form submission mock
    const newsletterForm = document.getElementById('newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            
            if (!input || !button) return;

            const email = input.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            const originalText = button.textContent;
            button.disabled = true;
            button.textContent = 'Joining...';
            
            setTimeout(() => {
                button.textContent = 'Welcome Aboard!';
                newsletterForm.reset();
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const selector = this.getAttribute('href');
            try {
                const target = document.querySelector(selector);
                if (target) {
                    const headerOffset = document.querySelector('header')?.offsetHeight || 80;
                    window.scrollTo({
                        top: target.offsetTop - headerOffset,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('Invalid scroll target:', selector);
            }
        });
    });
});
