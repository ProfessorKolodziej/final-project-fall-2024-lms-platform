console.log("Lesson Balance page loaded");

const refillBtn = document.getElementById("refill-btn");
const balanceCount = document.getElementById("balance-count");

refillBtn.addEventListener("click", () => {
  const currentBalance = parseInt(balanceCount.textContent);
  const newBalance = currentBalance + 1;
  balanceCount.textContent = `${newBalance} lessons`;
});

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