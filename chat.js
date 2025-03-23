const OPENAI_API_KEY = "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"; // Substitua pela sua chave

document.getElementById('send-message').addEventListener('click', async () => {
  const input = document.getElementById('chat-input');
  const output = document.getElementById('chat-output');

  if (input.value.trim() === '') return;

  const userMessage = input.value;
  output.innerHTML += `<p><strong>Você:</strong> ${userMessage}</p>`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  const data = await response.json();
  const aiResponse = data.choices[0].message.content;
  output.innerHTML += `<p><strong>IA:</strong> ${aiResponse}</p>`;

  input.value = '';
  output.scrollTop = output.scrollHeight;
});