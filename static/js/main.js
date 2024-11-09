document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const urlInputs = document.getElementById('urlInputs');
    const addUrlBtn = document.getElementById('addUrlBtn');
    const results = document.getElementById('results');
    const loadingSpinner = document.getElementById('loadingSpinner');

    // Add URL input field
    addUrlBtn.addEventListener('click', () => {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'mb-3 d-flex gap-2';
        inputDiv.innerHTML = `
            <input type="url" class="form-control" placeholder="Enter YouTube URL" required>
            <button type="button" class="btn btn-danger remove-url">×</button>
        `;
        urlInputs.appendChild(inputDiv);

        // Add remove button handler
        inputDiv.querySelector('.remove-url').addEventListener('click', () => {
            inputDiv.remove();
        });
    });

    // Form submission
    urlForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Collect URLs
        const urls = [...document.querySelectorAll('#urlInputs input')].map(input => input.value);
        
        // Show loading spinner
        loadingSpinner.classList.remove('d-none');
        results.innerHTML = '';

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ urls })
            });

            const data = await response.json();
            
            // Display results
            data.forEach(result => {
                if (result.error) {
                    displayError(result.error);
                } else {
                    displayArticle(result);
                }
            });
        } catch (error) {
            displayError('An error occurred while processing your request.');
        } finally {
            loadingSpinner.classList.add('d-none');
        }
    });

    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.textContent = message;
        results.appendChild(errorDiv);
    }

    function displayArticle(article) {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'card article-card';
        articleDiv.innerHTML = `
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <img src="${article.thumbnail_url}" alt="${article.title}" class="img-fluid">
                    </div>
                    <div class="col-md-8">
                        <h3 class="card-title">${article.title}</h3>
                        <p class="card-text">${article.summary}</p>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm share-btn" data-id="${article.id}">
                                Share
                            </button>
                            <button class="btn btn-outline-secondary btn-sm copy-btn" data-id="${article.id}">
                                Copy Text
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add share button handler
        articleDiv.querySelector('.share-btn').addEventListener('click', () => {
            const url = `${window.location.origin}/article/${article.id}`;
            navigator.clipboard.writeText(url)
                .then(() => alert('Link copied to clipboard!'))
                .catch(() => alert('Failed to copy link'));
        });

        // Add copy text button handler
        articleDiv.querySelector('.copy-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(article.summary)
                .then(() => alert('Summary copied to clipboard!'))
                .catch(() => alert('Failed to copy summary'));
        });

        results.appendChild(articleDiv);
    }
});
