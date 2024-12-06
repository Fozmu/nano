// script.js
const form = document.getElementById('serviceForm');
const statusMessage = document.getElementById('statusMessage');

// Zmień to na swój webhook Discorda
const discordWebhookURL = "https://discord.com/api/webhooks/1314326418510839901/YOl1JKbRFJZpOvVfvoISm1nCHQxZHbQmXEgI57nGo3LCC9lc9KuvBtKfXmyS-_2_p3_S";

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pobierz dane z formularza
    const name = document.getElementById('name').value;
    const userid = document.getElementById('userid').value;
    const issue = document.getElementById('issue').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    // Przygotuj payload do wysłania
    const payload = {
        content: "**New Nano Support Ticket**",
        embeds: [
            {
                title: "Ticket Request from " + name,
                fields: [
                    { name: "User ID", value: userid },
                    { name: "Needs help with", value: issue },
                    { name: "Subject", value: subject },
                    { name: "Description", value: description }
                ],
                color: 57228// Kolor w HEX (0x58B9FF -> DEC)
            }
        ]
    
    };

    // Wyślij dane do webhooka
    try {
        const response = await fetch(discordWebhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            statusMessage.textContent = "Support Request has beent sent! You may close this Tab now.";
            statusMessage.style.color = "green";
            form.style.display ="none";
            form.reset();
        } else {
            throw new Error("It appears to be an error while sending your request, please try again later!");
        }
    } catch (error) {
        statusMessage.textContent = "error: " + error.message;
        statusMessage.style.color = "red";
    }
});