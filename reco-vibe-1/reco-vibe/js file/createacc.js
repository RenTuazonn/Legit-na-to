document.getElementById("createAccountForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !username || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert(`Account for '${username}' has been created!`);

    // Redirect to login page
    window.location.href = "Homepage.html";
});

document.getElementById("backButton").addEventListener("click", function() {
    window.location.href = "index.html";
});
