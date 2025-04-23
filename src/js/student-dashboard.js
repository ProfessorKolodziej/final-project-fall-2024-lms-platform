// This is where you should write all JavaScript
// for your project. Remember a few things as you start!
// - Use let or const for all variables
// - Do not use jQuery - use JavaScript instead
// - Do not use onclick - use addEventListener instead
// - Run npm run test regularly to check autograding
// - You'll need to link this file to your HTML :)

const monthSelect = document.querySelector('.monthSelect');
const gaugeCanvas = document.querySelector('.gaugeCanvas');
const gradeValue = document.querySelector('.gradeValue');
if (gaugeCanvas) {
  const ctx = gaugeCanvas.getContext('2d');

// Example grade data per month
const grades = {
  march: 8.97,
  april: 7.23,
  may: 9.44
};

// Draw the gauge
function drawGauge(score) {
  ctx.clearRect(0, 0, gaugeCanvas.width, gaugeCanvas.height);

  const centerX = gaugeCanvas.width / 2;
  const centerY = gaugeCanvas.height;
  const radius = 80;
  const angle = (score / 10) * Math.PI;

  // Draw background arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, 0);
  ctx.strokeStyle = '#EEE4D6';
  ctx.lineWidth = 15;
  ctx.stroke();

  // Draw performance arc
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + angle, false);
  ctx.strokeStyle = '#A7BDD8';
  ctx.lineWidth = 15;
  ctx.stroke();

  // Draw pointer
  const pointerLength = 55;
  const pointerAngle = Math.PI + angle;
  const pointerX = centerX + pointerLength * Math.cos(pointerAngle);
  const pointerY = centerY + pointerLength * Math.sin(pointerAngle);

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(pointerX, pointerY);
  ctx.strokeStyle = '#A7BDD8';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Inner circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
  ctx.fillStyle = '#A7BDD8';
  ctx.fill();
}

// Update on change
monthSelect.addEventListener('change', (e) => {
  const selected = e.target.value;
  const newScore = grades[selected] || 0;
  gradeValue.textContent = newScore.toFixed(3);
  drawGauge(newScore);
});

// Initial render
window.addEventListener('DOMContentLoaded', () => {
  drawGauge(grades[monthSelect.value]);
});
}
/*performance end*/


/*to do list start*/  
// Toggle Task Complete
function toggleTask(el) {
    el.classList.toggle('checked');
    el.closest('li').classList.toggle('completed');
  }
  
  function formatDate(input) {
    const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
    const date = new Date(input.value);
    if (!isNaN(date)) {
      input.setAttribute('data-date', date.toLocaleDateString('en-GB', options));
      input.classList.add('filled');
    }
  }
  
  function toggleEdit(editBtn) {
    const li = editBtn.closest('li');
    const taskName = li.querySelector('.task-name');
  
    if (!li.querySelector('.delete-btn')) {
      const deleteBtn = document.createElement('span');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '🗑️';
      deleteBtn.addEventListener('click', () => li.remove());
      li.querySelector('.task-content').appendChild(deleteBtn);
    }
  }
  
  document.querySelector('.addTaskBtn').addEventListener('click', () => {
    const ul = document.querySelector('.todoList');
    const li = document.createElement('li');
  
    li.innerHTML = `
      <span class="checkbox"></span>
      <div class="task-content">
        <div contenteditable="true" class="task-name">New Task</div>
        <input type="date" class="task-date" />
      </div>
    `;
  
    li.querySelector('.checkbox').addEventListener('click', function () {
      toggleTask(this);
    });
  
    li.querySelector('.task-date').addEventListener('change', function () {
      formatDate(this);
    });
  
    const editBtn = document.createElement('span');
    editBtn.className = 'edit-btn';
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', function () {
      toggleEdit(this);
    });
  
    li.querySelector('.task-content').appendChild(editBtn);
    ul.appendChild(li);
  });
  
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.todoList li').forEach(li => {
      const checkbox = li.querySelector('.checkbox');
      const dateInput = li.querySelector('.task-date');
  
      if (checkbox) {
        checkbox.addEventListener('click', function () {
          toggleTask(this);
        });
      }
  
      if (dateInput) {
        dateInput.addEventListener('change', function () {
          formatDate(this);
        });
      }
  
      const editBtn = document.createElement('span');
      editBtn.className = 'edit-btn';
      editBtn.textContent = '✏️';
      editBtn.addEventListener('click', function () {
        toggleEdit(this);
      });
  
      li.querySelector('.task-content').appendChild(editBtn);
    });
  });
  
/*to do list end*/  





/*courses panel*/
const courseUX = document.querySelector(".course-item.active");
const courseVisual = document.querySelector("#course-visual");


courseUX.addEventListener("click", () => {
  courseUX.classList.add("active");
  courseVisual.classList.remove("active");
  courseUX.querySelector(".course-title").classList.remove("inactive");
  courseVisual.querySelector(".course-title").classList.add("inactive");
});

courseVisual.addEventListener("click", () => {
  courseVisual.classList.add("active");
  courseUX.classList.remove("active");
  courseVisual.querySelector(".course-title").classList.remove("inactive");
  courseUX.querySelector(".course-title").classList.add("inactive");
});

/*calendar*/
const monthYear = document.querySelector('.monthYear');
const calendarDates = document.getElementById('calendarDates');
const prevMonthBtn = document.querySelector('.prevMonth');
const nextMonthBtn = document.querySelector('.nextMonth');

let currentDate = new Date(2024, 5); // June 2024

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;
  calendarDates.innerHTML = '';

  // Add days from previous month
  for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.textContent = i;
  
    if (i === 10) {
      day.classList.add('active');
    } else if ([6, 13, 20, 27].includes(i)) {
      day.classList.add('highlighted');
    }
  
    // ✅ Make date clickable
    day.addEventListener('click', () => {
      // Clear existing active state
      document.querySelectorAll('#calendarDates div').forEach(d => d.classList.remove('active'));
      day.classList.add('active'); // highlight selected
      console.log(`Clicked on day ${i}`); // test action
    });
  
    calendarDates.appendChild(day);
  }
  
}

prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Initial render
window.addEventListener('DOMContentLoaded', () => {
  renderCalendar(currentDate); 
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