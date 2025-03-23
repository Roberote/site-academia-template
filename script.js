// Configuração do gráfico
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

// Efeito de confete
function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Inicializar Particles.js
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('Efeito de partículas carregado!');
});