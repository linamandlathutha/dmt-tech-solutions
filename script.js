(function () {
    'use strict';

    /* ---- 1. Theme Switcher (Light/Dark) ---- */
    const themeToggleBtn = document.getElementById('themeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Check local storage or default to light
    const savedTheme = localStorage.getItem('dmt-theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('dmt-theme', 'light');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('dmt-theme', 'dark');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    });

    /* ---- 2. SAST Clock ---- */
    const clockEl = document.getElementById('sastClock');
    if (clockEl) {
        function updateClock() {
            const now = new Date();
            const options = { timeZone: 'Africa/Johannesburg', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
            clockEl.textContent = now.toLocaleTimeString('en-GB', options) + ' SAST';
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    /* ---- 3. Typewriter Effect ---- */
    const phrases = [
        "Software built for South African SMEs.",
        "Websites that build trust.",
        "Cloud systems that save time.",
        "Point-of-sale tools that simply work."
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const targetEl = document.getElementById('typewriterText');
    const typingSpeed = 70;
    const deletingSpeed = 35;
    const delayBetween = 2000;

    function typeLoop() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            targetEl.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            targetEl.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIdx === currentPhrase.length) {
            currentSpeed = delayBetween;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            currentSpeed = 500;
        }

        setTimeout(typeLoop, currentSpeed);
    }

    if (targetEl) {
        typeLoop();
    }

    /* ---- 4. Mobile Nav Toggle ---- */
    const burger = document.getElementById('headerBurger');
    const nav = document.getElementById('headerNav');
    if (burger && nav) {
        burger.addEventListener('click', function () {
            nav.classList.toggle('open');
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
            });
        });
    }
})();

/* ---- 5. Modal Logic for Legal & Standards ---- */
const modalData = {
    'popia': {
        title: 'POPIA Compliance Policy',
        content: 'DMT Tech Solutions strictly enforces South Africa\'s Protection of Personal Information Act (POPIA). All user personal data, transaction records, and administrative details processed across our custom websites and software applications are collected legally, processed securely, and never shared without explicit consent.'
    },
    'fixed-scope': {
        title: 'Fixed-Scope Guarantee',
        content: 'We operate under our core value of "Honest Scope, Honest Price". Every engagement begins with a fully detailed statement of work, delivery milestones, and costs. We promise zero hidden charges or unexpected invoice adjustments unless scope modifications are explicitly requested and approved in writing.'
    },
    'ip-ownership': {
        title: 'Full Intellectual Property Handover',
        content: 'Upon receipt of final project payments, our clients gain 100% full ownership of their custom deliverables, including code repositories, database schemas, and digital assets. DMT retains only rights to baseline open-source utilities and general engineering frameworks.'
    }
};

function openModal(type) {
    const data = modalData[type];
    if (data) {
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalBody').textContent = data.content;
        document.getElementById('legalModal').classList.add('active');
    }
}

function closeModal() {
    document.getElementById('legalModal').classList.remove('active');
}

function closeModalOnOuter(event) {
    if (event.target.id === 'legalModal') {
        closeModal();
    }
}
