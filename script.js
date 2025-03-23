const OPENAI_API_KEY = "SUA_CHAVE_DA_OPENAI_AQUI"; // Substitua pela sua chave

// Gráfico de Progresso
const ctx = document.getElementById('progressChart').getContext('2d');
const progressChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Treinos', 'Refeições'],
    datasets: [{
      label: 'Progresso Diário',
      data: [0, 0],
      backgroundColor: ['#ff6b6b', '#4caf50'],
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100
      }
    }
  }
});

// Atualizar gráfico
function updateChart(workoutsCompleted, mealsCompleted) {
  progressChart.data.datasets[0].data = [workoutsCompleted, mealsCompleted];
  progressChart.update();
}

// Notificações
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// Barra de progresso
function updateProgressBar(percentage) {
  const progressBar = document.querySelector('.progress');
  progressBar.style.width = `${percentage}%`;
}

// Chat com IA
document.getElementById('send-message').addEventListener('click', async () => {
  const input = document.getElementById('chat-input');
  const output = document.getElementById('chat-output');

  if (input.value.trim() === '') return;

  const userMessage = input.value;
  output.innerHTML += `<p><strong>Você:</strong> ${userMessage}</p>`;

  const aiResponse = await sendMessageToAI(userMessage);
  output.innerHTML += `<p><strong>IA:</strong> ${aiResponse}</p>`;

  input.value = '';
  output.scrollTop = output.scrollHeight;
});

// Relatório corrigido
document.getElementById('generate-report').addEventListener('click', function () {
  const workouts = document.querySelectorAll('#workouts input[type="checkbox"]');
  const meals = document.querySelectorAll('#meals input[type="checkbox"]');

  let completedWorkouts = [];
  let missedWorkouts = [];
  let completedMeals = [];
  let missedMeals = [];

  workouts.forEach((workout) => {
    if (workout.checked) {
      completedWorkouts.push(workout.nextElementSibling.textContent);
    } else {
      missedWorkouts.push(workout.nextElementSibling.textContent);
    }
  });

  meals.forEach((meal) => {
    if (meal.checked) {
      completedMeals.push(meal.nextElementSibling.textContent);
    } else {
      missedMeals.push(meal.nextElementSibling.textContent);
    }
  });

  const report = `
    <h3>Relatório Diário</h3>
    <p><strong>Treinos Concluídos:</strong> ${completedWorkouts.join(', ') || 'Nenhum'}</p>
    <p><strong>Treinos Pendentes:</strong> ${missedWorkouts.join(', ') || 'Nenhum'}</p>
    <p><strong>Refeições Concluídas:</strong> ${completedMeals.join(', ') || 'Nenhuma'}</p>
    <p><strong>Refeições Pendentes:</strong> ${missedMeals.join(', ') || 'Nenhuma'}</p>
  `;

  document.getElementById('report').innerHTML = report;

  // Atualizar gráfico e barra de progresso
  const totalWorkouts = workouts.length;
  const totalMeals = meals.length;
  const workoutsCompleted = (completedWorkouts.length / totalWorkouts) * 100;
  const mealsCompleted = (completedMeals.length / totalMeals) * 100;
  updateChart(workoutsCompleted, mealsCompleted);
  updateProgressBar((workoutsCompleted + mealsCompleted) / 2);

  // Notificação
  showNotification('Relatório gerado com sucesso!');
});