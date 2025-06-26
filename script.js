document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const date = document.getElementById('date').value;

  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

  fetch(`https://travel-compare-backend.onrender.com/compare?from=${from}&to=${to}&date=${date}`)
    .then(res => res.json())
    .then(data => {
      const results = data.results;
      tbody.innerHTML = '';
      results.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${entry.mode}</td>
          <td>${entry.provider}</td>
          <td>${entry.price}</td>
          <td>${entry.time}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error fetching results:", err);
      tbody.innerHTML = '<tr><td colspan="4">Failed to load results.</td></tr>';
    });
});
