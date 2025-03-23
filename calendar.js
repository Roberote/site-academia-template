const calendar = document.getElementById('calendar');

function renderCalendar() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let html = '<table>';
  html += '<tr><th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sáb</th></tr>';
  html += '<tr>';

  for (let i = 0; i < firstDay; i++) {
    html += '<td></td>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if ((day + firstDay - 1) % 7 === 0 && day !== 1) {
      html += '</tr><tr>';
    }
    html += `<td>${day}</td>`;
  }

  html += '</tr></table>';
  calendar.innerHTML = html;
}

renderCalendar();