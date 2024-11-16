function showBackground(id) {
    document.getElementById(id).classList.add('active');
}

function hideBackground(id) {
    document.getElementById(id).classList.remove('active');
}

function toggleDynamicText(show) {
    const dynamicText = document.getElementById('dynamic-text');
    if (show) {
        dynamicText.classList.add('visible');
    } else {
        dynamicText.classList.remove('visible');
    }
}