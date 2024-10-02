document.getElementById("pgpToggle").addEventListener("click", function() {
    var pgpKey = document.getElementById("pgpKey");
    if (pgpKey.classList.contains("hidden")) {
        pgpKey.classList.remove("hidden");
        this.textContent = "Hide Public PGP Key";
    } else {
        pgpKey.classList.add("hidden");
        this.textContent = "Show Public PGP Key";
    }
});