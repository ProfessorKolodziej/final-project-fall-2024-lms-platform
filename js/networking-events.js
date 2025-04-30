// Placeholder for future event interactivity, such as dynamic loading
console.log("Networking events page loaded.");

//menu in mobile 
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("sidebarToggle");

// Create overlay dynamically
const overlay = document.createElement("div");
overlay.classList.add("overlay");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");

  if (sidebar.classList.contains("open")) {
    document.body.appendChild(overlay);
  } else {
    if (document.body.contains(overlay)) {
      document.body.removeChild(overlay);
    }
  }
});

// Close sidebar when clicking outside
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  if (document.body.contains(overlay)) {
    document.body.removeChild(overlay);
  }
});