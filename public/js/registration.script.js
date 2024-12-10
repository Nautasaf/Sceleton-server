const registrationDiv = document.querySelector('.registrationDiv');
const regForm = document.querySelector('.registrationForm')
const messageDiv = document.querySelector('.messageDiv')

registrationDiv?.addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.id === "regBtn") {
        try {
            const body = Object.fromEntries(new FormData(regForm));
            const response = await fetch("/registration", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const result = await response.json();
            if (response.status === 201) {
                messageDiv.textContent = result.data;
                setTimeout(() => {
                    window.location.assign('/');
                }, 2500);
            } else {
                messageDiv.textContent = result.data;
                setTimeout(() => {
                    messageDiv.innerText = 'Checkout your data';
                    regForm.reset();
                }, 2500);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }
})