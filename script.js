document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = document.getElementById('uploadForm');

    const webhookUrl = "https://discord.com/api/webhooks/1314326418510839901/YOl1JKbRFJZpOvVfvoISm1nCHQxZHbQmXEgI57nGo3LCC9lc9KuvBtKfXmyS-_2_p3_S";
    const fileInput = document.getElementById('fileInput');
    const statusText = document.getElementById('status');
    const name = document.getElementById('name').value;
    const userid = document.getElementById('userid').value;
    const issue = document.getElementById('issue').value;
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    // Przygotuj payload do wysłania
    
    if (!webhookUrl || !fileInput.files[0]) {
        statusText.textContent = 'Please fill out all questions';
        return;
    }

    statusText.textContent = 'Uploading Attachment...';

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
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
    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.status === 200) {
            statusText.textContent = 'Succesfully sent';
            statusText.style.color = "green";
    
        } else {
            statusText.textContent = `Error: ${response.statusText}`;
            statusText.style.color = "white";
        }


        const response1 = await fetch(webhookUrl, {
            method: 'POST',
            body: formData,
        });

        if (response1.status === 200) {
            statusText.textContent = 'Request Succesfully sent, you may close this tab now!';
            statusText.style.color = "white";
            form.style.display ="none";
            form.reset();
            


        } else {
            statusText.textContent = `Error: ${response1.statusText}`;
            statusText.style.color = "white";
        }
    } catch (error) {
        statusText.textContent = `It appears to be an error: ${error.message}`;
        statusText.style.color = "white";
    }
});