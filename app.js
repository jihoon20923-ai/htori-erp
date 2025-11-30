// Load pages dynamically
function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(res => res.text())
        .then(html => {
            document.getElementById("content").innerHTML = html;
        })
        .catch(() => {
            document.getElementById("content").innerHTML = "<h2>Page not found</h2>";
        });
}

// Language switcher
function setLanguage(lang) {
    localStorage.setItem("HTORI_LANG", lang);
    alert("Language changed to: " + lang);
}
