window.onload = function () {
    const storedText = localStorage.getItem('inputText');
    const displayText = document.getElementById('displayText');

    if (storedText) {
        displayText.innerText = storedText;
    }
}
