document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission
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

  // Clear results
  document.getElementById('clear-btn').addEventListener('click', function () {
    document.getElementById('results').innerHTML = '';
  });

  // Toggle dropdown
  const supportLink = document.getElementById('support-link');
  const dropdown = document.getElementById('support-dropdown');

  supportLink.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent global click close
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  });

  // Close dropdown when clicking outside
  window.addEventListener('click', function () {
    dropdown.style.display = 'none';
  });

  // Email Us click
  document.getElementById('email-us').addEventListener('click', function (e) {
    e.stopPropagation(); // prevent dropdown from closing early
    window.location.href = 'mailto:sahisnp@gmail.com';
  });

  // LinkedIn click
  document.getElementById('LinkedIn').addEventListener('click', function (e) {
    e.stopPropagation();
    window.open('https://www.linkedin.com/in/mohammed-sahis-n-p-b08141227', '_blank');
  });
});
