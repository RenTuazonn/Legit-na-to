// Toggle category pills
document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', function () {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const selectedCategory = this.getAttribute('data-category');

        document.querySelectorAll('.event-card').forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            card.style.display = (selectedCategory === 'all' || selectedCategory === cardCategory) ? 'block' : 'none';
        });
    });
});

// Preferences Modal
const modal = document.getElementById('preferences-modal');
const editPreferencesBtn = document.getElementById('edit-preferences');
const closeModalBtn = document.getElementById('close-modal');
const savePreferencesBtn = document.getElementById('save-preferences');

editPreferencesBtn?.addEventListener('click', () => modal.classList.remove('hidden'));
closeModalBtn?.addEventListener('click', () => modal.classList.add('hidden'));
savePreferencesBtn?.addEventListener('click', () => modal.classList.add('hidden'));

window.addEventListener('click', e => {
    if (e.target === modal) modal.classList.add('hidden');
});

// Remove tags
document.querySelectorAll('.tag-remove-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.closest('span').remove();
    });
});

// Load more
document.getElementById('load-more')?.addEventListener('click', () => {
    alert('In a real app, this would load more events!');
});
