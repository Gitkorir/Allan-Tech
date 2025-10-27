document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step');
    const progressBar = document.getElementById('progressBar').querySelector('.progress-bar');
    const form = document.getElementById('diagnosisForm');
    const results = document.getElementById('results');
    let currentStep = 0;

    // Function to show step
    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        progressBar.style.width = `${(index + 1) / steps.length * 100}%`;
        progressBar.textContent = `Step ${index + 1} of ${steps.length}`;
    }

    // Next/Prev buttons
    form.addEventListener('click', (e) => {
        if (e.target.classList.contains('next')) {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        } else if (e.target.classList.contains('prev')) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Simple validation (ensure selection)
    function validateStep(step) {
        if (step === 0 && !document.getElementById('brand').value) {
            alert('Please select a brand.');
            return false;
        }
        if (step === 1 && !document.getElementById('issue').value) {
            alert('Please select an issue.');
            return false;
        }
        // Step 3 & 4 optional
        return true;
    }

    // See Results - Simulate quote based on inputs
    document.getElementById('seeResults').addEventListener('click', () => {
        const brand = document.getElementById('brand').value;
        const issue = document.getElementById('issue').value;
        // Logic to generate quote (expand this)
        let description = 'Faulty screen cable or display panel';
        let cost = '7,000 – 10,000';
        let time = '1–2 days';

        if (issue === 'Battery not charging') {
            description = 'Battery replacement needed';
            cost = '5,000 – 8,000';
            time = 'Same day';
        }
        // Add more conditions based on details/brand

        document.getElementById('issueDescription').textContent = description;
        document.getElementById('costRange').textContent = cost;
        document.getElementById('timeRange').textContent = time;

        form.classList.add('d-none');
        results.classList.remove('d-none');
        // Optionally, store data in localStorage for pre-filling book form
        localStorage.setItem('diagnosisData', JSON.stringify({ brand, issue, description, cost }));
    });

    showStep(0); // Start at step 1
});