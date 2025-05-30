// Interests with emoji
const interests = [
  { name: "Sports", emoji: "🏀" },
  { name: "Music", emoji: "🎵" },
  { name: "Art", emoji: "🎨" },
  { name: "Technology", emoji: "💻" },
  { name: "Science", emoji: "🔬" },
  { name: "Literature", emoji: "📚" },
  { name: "Gaming", emoji: "🎮" },
  { name: "Travel", emoji: "✈️" },
  { name: "Photography", emoji: "📸" },
  { name: "Cooking", emoji: "🍳" },
  { name: "Fitness", emoji: "🏋️‍♂️" },
  { name: "Movies", emoji: "🎬" },
  { name: "Theater", emoji: "🎭" },
  { name: "Dance", emoji: "💃" },
  { name: "Volunteering", emoji: "🤝" },
  { name: "Fashion", emoji: "👗" },
  { name: "Environment", emoji: "🌳" },
  { name: "History", emoji: "🏺" },
  { name: "Writing", emoji: "✍️" },
  { name: "Robotics", emoji: "🤖" },
  { name: "School Events", emoji: "🎉" },
  { name: "Debate", emoji: "🗣️" },
  { name: "Coding", emoji: "👨‍💻" },
  { name: "Astronomy", emoji: "🌌" },
  { name: "Meditation", emoji: "🧘" }
];

const maxSelection = 5;

const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions-list');
const selectedContainer = document.getElementById('selected-container');
const availableContainer = document.getElementById('available-container');
const counterElements = document.querySelectorAll('.counter');
const nextButton = document.querySelector('.next-button');

let selectedInterests = new Set();

// Levenshtein distance function stays same

// Helper to get full display text with emoji
function displayInterest(interest) {
  return `${interest.emoji} ${interest.name}`;
}

// Render pills in a container
function renderPills(container, items, selected = false) {
  container.innerHTML = '';
  items.forEach(interest => {
    const pill = document.createElement('button');
    pill.classList.add('pill');
    if (selected) pill.classList.add('selected');
    pill.textContent = displayInterest(interest);
    pill.disabled = selected ? false : selectedInterests.size >= maxSelection && !selectedInterests.has(interest.name);

    pill.addEventListener('click', () => {
      if (selectedInterests.has(interest.name)) {
        selectedInterests.delete(interest.name);
      } else {
        if (selectedInterests.size >= maxSelection) return;
        selectedInterests.add(interest.name);
      }
      updateUI();
    });

    container.appendChild(pill);
  });
}

// Update UI: selected, available, counters, next button
function updateUI() {
  const selected = interests.filter(i => selectedInterests.has(i.name));
  const available = interests.filter(i => !selectedInterests.has(i.name));
  
  renderPills(selectedContainer, selected, true);
  renderPills(availableContainer, available, false);

  counterElements.forEach(el => {
    el.textContent = `${selectedInterests.size}/${maxSelection}`;
  });

  nextButton.disabled = selectedInterests.size !== maxSelection;
  suggestionsList.style.display = 'none';
}

// Filter interests based on query with fuzzy matching on name only
function filterInterests(query) {
  if (!query.trim()) return [];
  const q = query.toLowerCase();

  let filtered = interests.filter(i => i.name.toLowerCase().includes(q) && !selectedInterests.has(i.name));
  if (filtered.length === 0) {
    filtered = interests.filter(i => !selectedInterests.has(i.name) && levenshtein(i.name.toLowerCase(), q) <= 2);
  }
  return filtered;
}

// Show suggestions with emoji + name
function showSuggestions(filtered) {
  suggestionsList.innerHTML = '';

  if (filtered.length === 0) {
    suggestionsList.style.display = 'none';
    return;
  }

  filtered.forEach(interest => {
    const li = document.createElement('li');
    li.textContent = displayInterest(interest);
    li.addEventListener('click', () => {
      if (selectedInterests.size < maxSelection) {
        selectedInterests.add(interest.name);
        updateUI();
        searchInput.value = '';
        suggestionsList.style.display = 'none';
      }
    });
    suggestionsList.appendChild(li);
  });

  suggestionsList.style.display = 'block';
}

// Event listeners remain same
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  const filtered = filterInterests(query);
  showSuggestions(filtered);
});

searchInput.addEventListener('focus', () => {
  if (searchInput.value.trim() !== '') {
    showSuggestions(filterInterests(searchInput.value));
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-bar')) {
    suggestionsList.style.display = 'none';
  }
});

// Initial UI render
updateUI();

function goToNextPage() {
  alert(`You selected: ${Array.from(selectedInterests).join(', ')}`);
  // Your next page logic here
}
