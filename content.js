document.addEventListener('mouseup', function (e) {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        const popup = document.createElement('div');
        popup.innerText = 'Save Highlight?';
        popup.style.position = 'absolute';
        popup.style.top = `${e.pageY}px`;
        popup.style.left = `${e.pageX}px`;
        popup.style.background = '#333';
        popup.style.color = '#fff';
        popup.style.padding = '5px 10px';
        popup.style.borderRadius = '5px';
        popup.style.cursor = 'pointer';
        popup.style.zIndex = 10000;

        popup.addEventListener('click', () => {
            chrome.storage.local.get(['highlights'], (result) => {
                const highlights = result.highlights || [];
                highlights.push(selectedText);
                chrome.storage.local.set({ highlights });
            });
            document.body.removeChild(popup);
        });

        document.body.appendChild(popup);

        setTimeout(() => {
            if (document.body.contains(popup)) {
                document.body.removeChild(popup);
            }
        }, 5000);
    }
});
