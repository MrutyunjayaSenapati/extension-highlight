document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('highlight-list');
    const clearBtn = document.getElementById('clear-btn');

    chrome.storage.local.get(['highlights'], (result) => {
        const highlights = result.highlights || [];
        highlights.forEach((text, index) => {
            const item = document.createElement('div');
            item.textContent = text;
            item.style.marginBottom = '10px';
            list.appendChild(item);
        });
    });

    clearBtn.addEventListener('click', () => {
        chrome.storage.local.remove(['highlights'], () => {
            list.innerHTML = '';
        });
    });
});
