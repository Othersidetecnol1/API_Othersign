const API_BASE = '/meta';
let chart;

function getAuthHeaders() {
  const token = localStorage.getItem('firebaseToken');
  if (!token) {
    window.location.href = '/login.html';
    return {};
  }
  return { Authorization: `Bearer ${token}` };
}

function logout() {
  localStorage.removeItem('firebaseToken');
  window.location.href = '/login.html';
}

function formatCurrency(value) {
  return 'R$ ' + Number(value || 0).toFixed(2).replace('.', ',');
}

async function loadData() {
  const period = document.getElementById('periodSelect').value;

  try {
    const response = await fetch(
      `${API_BASE}/summary?period=${period}`,
      { headers: getAuthHeaders() }
    );

    const data = await response.json();

    if (!response.ok || data.status === 'error') {
      throw new Error(data.message);
    }

    if (data.status === 'waiting') {
      document.getElementById('statusMsg').innerText =
        '⏳ Aguardando dados da Meta...';
      return;
    }

    document.getElementById('statusMsg').innerText =
      data.status === 'cache'
        ? '⚡ Dados retornados do cache'
        : '✅ Dados atualizados da Meta';

    document.getElementById('impressions').innerText = data.impressions;
    document.getElementById('clicks').innerText = data.clicks;
    document.getElementById('spend').innerText = formatCurrency(data.spend);

    updateChart(data.impressions, data.clicks);

  } catch (error) {
    document.getElementById('statusMsg').innerText =
      '❌ Erro ao buscar dados';
    console.error(error);
  }
}

function updateChart(impressions, clicks) {
  const ctx = document.getElementById('chart');

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Impressões', 'Cliques'],
      datasets: [{
        data: [impressions, clicks],
        backgroundColor: ['#38bdf8', '#22c55e'],
        borderRadius: 6
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

document
  .getElementById('periodSelect')
  .addEventListener('change', loadData);

// 🚀 Inicialização
loadData();