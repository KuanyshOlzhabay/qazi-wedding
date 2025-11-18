AOS.init({
    duration: 1000,
    once: false,
    mirror: true,
    offset: 100
});

const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

function startMusic() {
    console.log('just check')
    if (!isPlaying) {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
        }).catch(err => {
            console.log('----')
        });
    }
}

window.addEventListener('load', function() {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicToggle.classList.add('playing');
    }).catch(err => {
        
        function initAudioOnInteraction() {
            startMusic();
            document.removeEventListener('click', initAudioOnInteraction);
            document.removeEventListener('touchstart', initAudioOnInteraction);
        }
        
        document.addEventListener('click', initAudioOnInteraction, { once: true });
        document.addEventListener('touchstart', initAudioOnInteraction, { once: true });
    });
});

musicToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        musicToggle.classList.remove('playing');
        musicToggle.querySelector('.music-icon').textContent = '🎶';
    } else {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
            musicToggle.querySelector('.music-icon').textContent = '🎶';
        }).catch(err => {
            console.log('Play error:', err);
        });
    }
});

const weddingDate = new Date('2026-01-10T18:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = '<div style="font-size: 2rem; color: var(--primary-color);">Той басталды! 🎉</div>';
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.couple-img');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: radial-gradient(circle, rgba(212, 165, 116, 0.6), transparent);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        particlesContainer.appendChild(particle);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

createParticles();

document.querySelector('.scroll-indicator').addEventListener('click', function() {
    document.getElementById('page2').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

const countdownItems = document.querySelectorAll('.countdown-item');
countdownItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function createConfetti() {
    const colors = ['#d4a574', '#c19a6b', '#f8f5f1'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            opacity: ${Math.random()};
            transform: rotate(${Math.random() * 360}deg);
            animation: confetti-fall ${Math.random() * 3 + 2}s linear;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confetti-fall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});

let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
}, false);

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            const currentSection = getCurrentSection();
            const nextSection = currentSection.nextElementSibling;
            if (nextSection && nextSection.classList.contains('page')) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            const currentSection = getCurrentSection();
            const prevSection = currentSection.previousElementSibling;
            if (prevSection && prevSection.classList.contains('page')) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('.page');
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    for (let section of sections) {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) {
            return section;
        }
    }
    return sections[0];
}

function animateText() {
    const texts = document.querySelectorAll('.invitation-text p, .betashar-poem p');
    texts.forEach((text, index) => {
        text.style.opacity = '0';
        text.style.transform = 'translateY(20px)';
        text.style.transition = `all 0.6s ease ${index * 0.1}s`;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        });
        
        observer.observe(text);
    });
}

animateText();



/* === RSVP: Native form submission to Google Apps Script === */
(function() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    const submitBtn = document.getElementById('rsvpSubmit');
    const statusEl = document.getElementById('formStatus');
    const resultWrap = document.getElementById('rsvpResult');
    const openSheetLink = document.getElementById('openSheetLink');
    const guestsWrapper = document.getElementById('guests-wrapper');
    const guestCountEl = document.getElementById('guestCount');

    // Put your deployed Web App URL here after you publish Apps Script
    const RSVP_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzFGD8UTV7Y8yQDICoBBBCxauVomTOn-T0kar2wTewkA8BYLQRwklLNsHvOj33OQDsxQQ/exec';
    const RSVP_SHEET_LINK = ''; // Optional: paste Google Sheet URL if you want the admin link to appear

    if (openSheetLink && RSVP_SHEET_LINK) {
        openSheetLink.href = RSVP_SHEET_LINK;
    } else if (openSheetLink) {
        openSheetLink.parentElement.style.display = 'none';
    }

    function getAttendingValue() {
        const checked = form.querySelector('input[name="attending"]:checked');
        return checked ? checked.value : '';
    }

    function toggleGuestsByAttendance() {
        const attending = getAttendingValue();
        const isAttending = attending === 'Иә';
        if (!guestsWrapper) return;
        if (isAttending) {
            guestsWrapper.classList.remove('is-hidden');
            guestCountEl && guestCountEl.setAttribute('required', 'required');
        } else {
            guestsWrapper.classList.add('is-hidden');
            guestCountEl && guestCountEl.removeAttribute('required');
        }
    }

    form.addEventListener('change', (e) => {
        if (e.target && e.target.name === 'attending') {
            toggleGuestsByAttendance();
        }
    });
    // Initialize state on load
    toggleGuestsByAttendance();

    function setError(id, msg) {
        const el = document.getElementById(id);
        if (el) el.textContent = msg || '';
    }

    function validate() {
        let ok = true;
        setError('err-fullName');
        setError('err-attending');
        setError('err-guestCount');

        const fullName = (document.getElementById('fullName')?.value || '').trim();
        if (!fullName) { setError('err-fullName', 'Аты‑жөніңізді жазыңыз.'); ok = false; }

        const attending = getAttendingValue();
        if (!attending) { setError('err-attending', 'Қатысатынын таңдаңыз.'); ok = false; }

        if (attending === 'Иә') {
            const guestCount = (guestCountEl?.value || '').trim();
            if (!guestCount) { setError('err-guestCount', 'Қонақ санын таңдаңыз.'); ok = false; }
        }
        return ok;
    }

    async function submitRSVP(e) {
        e.preventDefault();
        if (!validate()) return;

        const payload = {
            timestamp: new Date().toISOString(),
            fullName: (document.getElementById('fullName')?.value || '').trim(),
            attending: getAttendingValue(),
            guestCount: getAttendingValue() === 'Иә' ? (guestCountEl?.value || '1') : '0',
            phone: (document.getElementById('phone')?.value || '').trim(),
            note: (document.getElementById('note')?.value || '').trim(),
            ua: navigator.userAgent
        };

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        statusEl.textContent = 'Жіберілуде…';

        try {
            const res = await fetch(RSVP_ENDPOINT, {
                method: 'POST',
                // Use text/plain to avoid CORS preflight issues with Apps Script
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            let data = {};
            const text = await res.text().catch(() => '');
            try { data = JSON.parse(text || '{}'); } catch (_) { data = {}; }

            if (res.ok && (data.success === true || data.status === 'ok')) {
                statusEl.textContent = '';
                form.setAttribute('hidden', 'hidden');
                resultWrap.removeAttribute('hidden');
                form.reset();
            } else {
                const msg = (data && (data.message || data.error)) || (text && text.slice(0,200)) || `Қате орын алды (HTTP ${res.status}). Кейінірек қайталап көріңіз.`;
                throw new Error(msg);
            }
        } catch (err) {
            console.warn('Primary RSVP submit failed, attempting no-cors fallback…', err);
            // As a fallback for Apps Script CORS limits, retry with no-cors (opaque response)
            try {
                await fetch(RSVP_ENDPOINT, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                    body: JSON.stringify(payload)
                });
                // We cannot read response in no-cors mode; optimistically show success
                statusEl.textContent = '';
                form.setAttribute('hidden', 'hidden');
                resultWrap.removeAttribute('hidden');
                form.reset();
            } catch (fallbackErr) {
                console.error('RSVP fallback submit error:', fallbackErr);
                statusEl.textContent = String(fallbackErr.message || fallbackErr) || 'Қате орын алды.';
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    }

    form.addEventListener('submit', submitRSVP);
})();
