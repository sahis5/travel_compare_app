document.getElementById('search-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop form from refreshing the page

  const dummyData = [
    { mode: "Bus", provider: "RedBus", price: 850, time: "10h 15m" },
    { mode: "Train", provider: "IRCTC", price: 620, time: "8h 30m" },
    { mode: "Flight", provider: "IndiGo", price: 2200, time: "2h 5m" }
  ];

  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = ''; // Clear previous results
  document.getElementById('clear-btn').addEventListener('click', () => {
  document.querySelector('#results tbody').innerHTML = '';
});

  dummyData.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.mode}</td>
      <td>${entry.provider}</td>
      <td>${entry.price}</td>
      <td>${entry.time}</td>
    `;
    tbody.appendChild(row);
  });
});
