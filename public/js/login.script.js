const loginDiv = document.querySelector('.loginDiv');
const logForm = document.querySelector('.loginForm')
const messageDiv = document.querySelector('.messageDiv')

loginDiv?.addEventListener('click', async (event) => {
    event.preventDefault();
    if (event.target.id === "logBtn") {
        try {
            const body = Object.fromEntries(new FormData(logForm));
            const response = await fetch("/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
            const result = await response.json();
            if (response.status === 200) {
                messageDiv.textContent = result.data;
                setTimeout(() => {
                    messageDiv.innerText = 'Success';
                    window.location.assign('/');
                }, 2500);
            } else {
                messageDiv.textContent = result.data;
                setTimeout(() => {
                    messageDiv.innerText = 'Incorrect login or password';
                    logForm.reset();
                }, 2500);
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    }
})