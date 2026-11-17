document.getElementById('pgpToggle')?.addEventListener('click', function() {
    const pgpKey = document.getElementById('pgpKey');
    const isHidden = pgpKey.classList.toggle('hidden');
    this.textContent = this.textContent.replace(isHidden ? 'Hide' : 'Show', isHidden ? 'Show' : 'Hide');
});
