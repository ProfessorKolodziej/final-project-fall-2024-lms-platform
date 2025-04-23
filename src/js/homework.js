const homeworkData = [
    {
      course: "JavaScript",
      description: "An introductory guide to the fundamentals of coding",
      due: "2025-04-03",
      progress: 85,
    },
    {
      course: "HTML CSS",
      description: "This homework has exercises on basic syntax",
      due: "2025-04-05",
      progress: 90,
    },
    {
      course: "Python Fundamentals",
      description: "Let's quickly create some realistic and shiny metal @figma ✨",
      due: "2025-04-23",
      progress: 75,
    },
    {
      course: "Auto-layout",
      description: "Responsive layout exercise",
      due: "2025-05-30",
      progress: 65,
    },
    {
      course: "Auto-layout",
      description: "Alignment & spacing task",
      due: "2025-05-30",
      progress: 55,
    },
    {
      course: "Auto-layout",
      description: "Final layout project",
      due: "2025-06-30",
      progress: 70,
    },
  ];
  
  // Get the container
  const homeworkList = document.getElementById("homework-list");
  
  // Sort by due date ascending
  homeworkData.sort((a, b) => new Date(a.due) - new Date(b.due));
  
  // Render each item
  homeworkData.forEach((item) => {
    const div = document.createElement("div");
    div.className = "homework-item";
  
    div.innerHTML = `
      <div class="course-name">${item.course}</div>
      <div class="description">${item.description}</div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${item.progress}%"></div>
      </div>
      <div class="due-date">Due: ${new Date(item.due).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric'
      })}</div>
    `;
  
    homeworkList.appendChild(div);
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