document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();

  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '<p>Loading...</p>';

  fetch(`https://travel-compare-backend.onrender.com/compare?from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      resultsContainer.innerHTML = '';

      const results = data.results;
      if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
      }

      results.forEach(entry => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${entry.provider}</h3>
          <div class="details">
            <span><strong>Mode:</strong> ${entry.mode}</span>
            <span><strong>Price:</strong> ₹${entry.price}</span>
            <span><strong>Duration:</strong> ${entry.time}</span>
          </div>
        `;
        resultsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Error fetching results:", err);
      resultsContainer.innerHTML = '<p>Error fetching results.</p>';
    });
});

document.getElementById('clear-btn').addEventListener('click', function () {
  document.getElementById('results').innerHTML = '';
});

document.getElementById('support-link').addEventListener('click', function () {
  alert("Contact Us:\n📧 sahisnp@gmail.com\n🔗 www.linkedin.com/in/mohammed-sahis-n-p-b08141227");
});
