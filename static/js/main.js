document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const urlInputs = document.getElementById('urlInputs');
    const addUrlBtn = document.getElementById('addUrlBtn');
    const results = document.getElementById('results');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const combinedSummary = document.getElementById('combinedSummary');
    const combiningSpinner = document.getElementById('combiningSpinner');

    // Add URL input field
    addUrlBtn.addEventListener('click', () => {
        const inputDiv = document.createElement('div');
        inputDiv.className = 'mb-3';
        inputDiv.innerHTML = `
            <div class="input-group">
                <span class="input-group-text"><i class="fab fa-youtube"></i></span>
                <input type="url" class="form-control" placeholder="YouTube URLを入力してください" required>
                <button type="button" class="btn btn-danger remove-url">
                    <i class="fas fa-times"></i>
                </button>
            </div>
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
        combinedSummary.classList.add('d-none');

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
            let validSummaries = [];
            data.forEach(result => {
                if (result.error) {
                    displayError(result.error);
                } else {
                    displayArticle(result);
                    validSummaries.push({
                        title: result.title,
                        summary: result.summary
                    });
                }
            });

            // Generate combined summary if multiple articles
            if (validSummaries.length > 1) {
                await generateCombinedSummary(validSummaries);
            }
        } catch (error) {
            displayError('要約の生成中にエラーが発生しました。');
        } finally {
            loadingSpinner.classList.add('d-none');
        }
    });

    function displayError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        results.appendChild(errorDiv);
    }

    function displayArticle(article) {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'col-md-6';
        
        // Generate quality score badge HTML
        const qualityScoreBadge = article.quality_score ? `
            <div class="quality-score-badge ${getQualityScoreClass(article.quality_score)}">
                <i class="fas fa-star"></i> 品質スコア: ${article.quality_score}
            </div>
        ` : '';
        
        articleDiv.innerHTML = `
            <div class="card article-card">
                <div class="card-body">
                    <div class="position-relative">
                        <img src="${article.thumbnail_url}" alt="${article.title}" class="img-fluid mb-3">
                        ${qualityScoreBadge}
                    </div>
                    <h3 class="card-title">${article.title}</h3>
                    <div class="markdown-content">${marked.parse(article.summary)}</div>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-download" onclick="downloadSummary('${article.title}', '${encodeURIComponent(article.summary)}')">
                            <i class="fas fa-download"></i> 要約をダウンロード
                        </button>
                        <button class="btn btn-outline-primary btn-sm share-btn" data-id="${article.id}">
                            <i class="fas fa-share-alt"></i> 共有
                        </button>
                        <button class="btn btn-outline-secondary btn-sm copy-btn" data-id="${article.id}">
                            <i class="fas fa-copy"></i> テキストをコピー
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add share button handler
        articleDiv.querySelector('.share-btn').addEventListener('click', () => {
            const url = `${window.location.origin}/article/${article.id}`;
            navigator.clipboard.writeText(url)
                .then(() => showToast('リンクをクリップボードにコピーしました！'))
                .catch(() => showToast('リンクのコピーに失敗しました', 'error'));
        });

        // Add copy text button handler
        articleDiv.querySelector('.copy-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(article.summary)
                .then(() => showToast('要約をクリップボードにコピーしました！'))
                .catch(() => showToast('要約のコピーに失敗しました', 'error'));
        });

        results.appendChild(articleDiv);
    }

    function getQualityScoreClass(score) {
        if (score >= 90) return 'quality-excellent';
        if (score >= 80) return 'quality-good';
        if (score >= 70) return 'quality-fair';
        return 'quality-needs-improvement';
    }

    async function generateCombinedSummary(summaries) {
        combinedSummary.classList.remove('d-none');
        combiningSpinner.classList.remove('d-none');
        
        try {
            const response = await fetch('/api/combine-summaries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ summaries })
            });

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            document.getElementById('combinedContent').innerHTML = marked.parse(data.summary);
        } catch (error) {
            showToast('統合要約の生成に失敗しました', 'error');
        } finally {
            combiningSpinner.classList.add('d-none');
        }
    }
});

function downloadSummary(title, summary) {
    const content = `# ${title}\n\n${decodeURIComponent(summary)}`;
    downloadMarkdown(content, `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.md`);
}

function downloadCombinedSummary() {
    const content = document.getElementById('combinedContent').getAttribute('data-markdown') ||
                   marked.parse(document.getElementById('combinedContent').innerHTML);
    downloadMarkdown(content, 'combined_summary.md');
}

function downloadMarkdown(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function showToast(message, type = 'success') {
    const toastDiv = document.createElement('div');
    toastDiv.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0`;
    toastDiv.setAttribute('role', 'alert');
    toastDiv.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i> ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    document.body.appendChild(toastDiv);
    const toast = new bootstrap.Toast(toastDiv);
    toast.show();
    
    toastDiv.addEventListener('hidden.bs.toast', () => {
        toastDiv.remove();
    });
}
