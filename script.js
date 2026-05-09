document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

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
    document.querySelectorAll('.dest-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
        
        // Custom observation logic
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        cardObserver.observe(card);
    });

    // Newsletter form submission mock
    const newsletterForm = document.getElementById('newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            const button = newsletterForm.querySelector('button');
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
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
