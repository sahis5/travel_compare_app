document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();

  const tbody = document.querySelector('#results tbody');
  tbody.innerHTML = '<tr><td colspan="4">Loading...</td></tr>';

  // ✅ Correct fetch URL with query string:
  fetch(`https://travel-compare-backend.onrender.com/compare?from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      tbody.innerHTML = '';
      const results = data.results;

      if (results.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No results found.</td></tr>';
      } else {
        results.forEach(entry => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${entry.mode}</td>
            <td>${entry.provider}</td>
            <td>₹${entry.price}</td>
            <td>${entry.time}</td>
          `;
          tbody.appendChild(row);
        });
      }
    })
    .catch(err => {
      console.error("Error fetching results:", err);
      tbody.innerHTML = '<tr><td colspan="4">Error fetching results.</td></tr>';
    });
});

// Clear Results button
document.getElementById('clear-btn').addEventListener('click', function () {
  document.querySelector('#results tbody').innerHTML = '';
});
