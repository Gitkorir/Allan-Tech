document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const setTheme = (theme) => {
        document.documentElement.dataset.theme = theme;
        document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
            button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            button.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        });
    };
    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', theme);
            setTheme(theme);
        });
    });

    const whatsappNumber = '254791969250';
    const whatsappUrl = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    document.querySelectorAll('[data-whatsapp]').forEach((link) => {
        link.href = whatsappUrl(link.dataset.whatsapp || 'Hello TechFix Kenya, I would like help with my laptop.');
    });

    const diagnosisForm = document.getElementById('diagnosisForm');
    if (diagnosisForm) {
        const steps = [...document.querySelectorAll('.step')];
        const progressBar = document.querySelector('#progressBar .progress-bar');
        const results = document.getElementById('results');
        let currentStep = 0;
        const serviceType = document.getElementById('serviceType');
        const repairFields = document.getElementById('repairFields');
        const upgradeFields = document.getElementById('upgradeFields');
        const syncServiceFields = () => {
            const isUpgrade = serviceType.value === 'upgrade';
            repairFields.classList.toggle('d-none', isUpgrade);
            upgradeFields.classList.toggle('d-none', !isUpgrade);
        };
        const showStep = (index) => {
            currentStep = Math.max(0, Math.min(index, steps.length - 1));
            steps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex === currentStep));
            progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
            progressBar.textContent = `Step ${currentStep + 1} of ${steps.length}`;
        };
        diagnosisForm.addEventListener('click', (event) => {
            if (event.target.matches('.next')) {
                const requiredField = steps[currentStep].querySelector('[required]');
                if (requiredField && !requiredField.value) { requiredField.focus(); return; }
                showStep(currentStep + 1);
            }
            if (event.target.matches('.prev')) showStep(currentStep - 1);
        });
        serviceType.addEventListener('change', syncServiceFields);
        syncServiceFields();
        document.getElementById('seeResults').addEventListener('click', () => {
            const type = document.getElementById('serviceType').value;
            const brand = document.getElementById('brand').value;
            const model = document.getElementById('model').value || 'your laptop';
            const currentRam = Number(document.getElementById('currentRam').value || 0);
            const targetRam = Number(document.getElementById('targetRam').value || 0);
            const issue = document.getElementById('issue').value;
            let description = 'A technician will inspect the laptop and confirm the exact parts needed.';
            let cost = 'Quote after inspection';
            let time = 'Usually same day';
            if (type === 'upgrade') {
                const extraRam = Math.max(targetRam - currentRam, 0);
                description = `RAM upgrade for ${model}: ${currentRam}GB to ${targetRam}GB${extraRam ? ` (+${extraRam}GB)` : ''}. We will confirm compatibility before fitting.`;
                cost = targetRam >= 16 ? 'KSh 6,500 - 12,000' : 'KSh 3,500 - 7,500';
                time = '30-90 minutes after parts are confirmed';
            } else {
                const estimates = {
                    "Won't power on": ['Power diagnosis and board or charging check', 'KSh 1,000 - 8,000', '1-3 days'],
                    'Screen problem': ['Screen, cable or hinge inspection', 'KSh 5,500 - 18,000', '1-2 days'],
                    'Battery not charging': ['Battery and charging circuit test', 'KSh 3,500 - 10,000', 'Same day - 2 days'],
                    'Runs slow / noisy': ['Storage, thermal and performance service', 'KSh 2,500 - 12,000', 'Same day'],
                    'Keyboard / touchpad issue': ['Keyboard, touchpad or palmrest inspection', 'KSh 2,500 - 9,000', '1-2 days']
                };
                [description, cost, time] = estimates[issue] || [description, cost, time];
            }
            document.getElementById('issueDescription').textContent = description;
            document.getElementById('costRange').textContent = cost;
            document.getElementById('timeRange').textContent = time;
            document.getElementById('resultWhatsApp').href = whatsappUrl(`Hello TechFix Kenya. I need help with my ${type}: ${brand} ${model}. ${description}`);
            diagnosisForm.classList.add('d-none');
            results.classList.remove('d-none');
            localStorage.setItem('diagnosisData', JSON.stringify({ type, brand, model, issue, currentRam, targetRam, description, cost, time }));
        });
        showStep(0);
    }

    const bookingForm = document.getElementById('bookForm');
    if (bookingForm) {
        const saved = JSON.parse(localStorage.getItem('diagnosisData') || '{}');
        if (saved.brand) document.getElementById('brand').value = `${saved.brand} ${saved.model || ''}`.trim();
        if (saved.description) document.getElementById('description').value = saved.description;
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = new FormData(bookingForm);
            const message = `Hello TechFix Kenya, I would like to book a ${data.get('serviceType')} for ${data.get('brand')}. Name: ${data.get('name')}. Phone: ${data.get('phone')}. Details: ${data.get('description')}. Preferred option: ${data.get('pickup')}. Location: ${data.get('location') || 'To be confirmed'}.`;
            document.getElementById('bookingMessage').classList.remove('d-none');
            window.location.href = whatsappUrl(message);
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(contactForm);
        window.location.href = whatsappUrl(`Hello TechFix Kenya. My name is ${data.get('name')}. ${data.get('message')}`);
    });
});
