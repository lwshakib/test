document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const destination = document.getElementById('destination').value;
    const messageElement = document.getElementById('message');

    if (!name || !email || !destination) {
        messageElement.textContent = 'Please fill in all fields before requesting a quote.';
        messageElement.style.color = '#dc2626';
        return;
    }

messageElement.textContent = `Thank you, ${name}! Your quote request for ${destination} has been received. We'll contact you at ${email}.`;
    messageElement.style.color = '#0f766e';
    event.target.reset();
});
