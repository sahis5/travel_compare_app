document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById('search-form');
  const resultsContainer = document.getElementById('results');
  const dropdown = document.getElementById('support-dropdown');
  const supportLink = document.getElementById('support-link');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const from = document.getElementById('from').value.trim();
    const to = document.getElementById('to').value.trim();

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

        results.forEach((entry, index) => {
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
          // ✅ Add staggered animation delay
          card.style.animationDelay = `${index * 0.15}s`;
          resultsContainer.appendChild(card);
        });
      })
      .catch(() => {
        resultsContainer.innerHTML = '<p>Error fetching results.</p>';
      });
  });

  document.getElementById('clear-btn').addEventListener('click', () => {
    resultsContainer.innerHTML = '';
  });

  supportLink.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  window.addEventListener('click', () => {
    dropdown.classList.remove('open');
  });


  document.getElementById('email-us').addEventListener('click', function (e) {
    e.stopPropagation();
    window.location.href = 'mailto:sahisnp@gmail.com';
  });

  document.getElementById('linkedin-us').addEventListener('click', function (e) {
    e.stopPropagation();
    window.open('https://www.linkedin.com/in/mohammed-sahis-n-p-b08141227', '_blank');
  });
});
