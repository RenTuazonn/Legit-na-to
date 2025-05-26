// Dummy data
const events = [
  "Tech Conference 2025 - May 10th",
  "Music Festival 2025 - May 15th",
  "Art Exhibition - May 20th",
  "AI Workshop - May 22nd",
  "Robotics Fair 2025 - May 30th"
];

const notifications = [
  "New event added: 'Robotics Fair 2025'",
  "Reminder: AI Workshop on May 22nd",
  "Update: Venue change for Music Festival"
];

document.addEventListener("DOMContentLoaded", () => {
  displayEvents(events);
  displayNotifications(notifications);
});

function searchEvents() {
  const input = document.getElementById("search-input").value.toLowerCase().trim();
  const filtered = events.filter(e => e.toLowerCase().includes(input));
  displayEvents(filtered);
  showSection('events');
}

function displayEvents(eventList) {
  const container = document.getElementById("event-list");
  container.innerHTML = "";

  if (eventList.length === 0) {
    container.innerHTML = "<li>No events found.</li>";
  } else {
    eventList.forEach(event => {
      const li = document.createElement("li");
      li.textContent = `• ${event}`;
      container.appendChild(li);
    });
  }
}

function displayNotifications(notifList) {
  const container = document.getElementById("notif-list");
  container.innerHTML = "";

  notifList.forEach(note => {
    const li = document.createElement("li");
    li.textContent = `• ${note}`;
    container.appendChild(li);
  });
}

function showSection(sectionId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach(section => section.classList.remove("active"));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add("active");
  }
}

function logout() {
  alert("You have been logged out.");
  window.location.href = "index.html";
}
