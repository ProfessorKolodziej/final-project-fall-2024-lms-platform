document.addEventListener("DOMContentLoaded", () => {
    const calendarBody = document.getElementById("calendarBody");
  
    const lessons = [
      {
        name: "UI/UX Design",
        instructor: "Eric Zakirov",
        days: [2, 4], // Monday, Wednesday
        time: "17:00",
        endTime: "18:00",
        color: "#FFF9C4",
        topic: "Wireframes and Prototypes",
        hwStatus: "Pending"
      },
      {
        name: "Python Fundamentals",
        instructor: "Aziza Koles",
        days: [2, 4],
        time: "21:00",
        endTime: "22:00",
        color: "#E1BEE7",
        topic: "syntax",
        hwStatus: "complete"
      },
      {
        name: "HTML CSS",
        instructor: "Temir Aganov",
        days: [3, 5],
        time: "17:00",
        endTime: "18:00",
        color: "#FFEBEE",
        topic: "padding vs margin",
        hwStatus: "Pending"
      },
      {
        name: "Java Script",
        instructor: "Temir Aganov",
        days: [3, 5],
        time: "20:00",
        endTime: "21:00",
        color: "#DCEDC8",
        topic: "toggle functions",
        hwStatus: "past due"
      },
      {
        name: "Backend Development",
        instructor: "Alua Zina",
        days: [6, 7],
        time: "13:00",
        endTime: "14:00",
        color: "#F3E5F5",
        topic: "node.js intro",
        hwStatus: "complete"
      }
    ];
  
    function convertTimeToGridRow(time) {
      const [hour, minute] = time.split(":").map(Number);
      const totalHalfHoursSince8am = (hour - 8) * 2 + (minute === 30 ? 1 : 0);
      return totalHalfHoursSince8am + 1;
    }
  
    function renderLessons() {
      calendarBody.innerHTML = "";
  
      lessons.forEach((lesson) => {
        const gridRowStart = convertTimeToGridRow(lesson.time);
        const gridRowEnd = convertTimeToGridRow(lesson.endTime);
  
        lesson.days.forEach((day) => {
          const div = document.createElement("div");
          div.classList.add("lesson");
          div.style.gridColumn = `${day}`;
          div.style.gridRow = `${gridRowStart} / ${gridRowEnd}`;
          div.style.backgroundColor = lesson.color;
          div.style.border = "1px solid #ccc";
          div.style.display = "flex";
          div.style.flexDirection = "column";
          div.style.justifyContent = "center";
          div.style.padding = "5px";
  
          const lessonDate = new Date(currentWeekStart);
          lessonDate.setDate(currentWeekStart.getDate() + (day - 1));
          const formattedDate = lessonDate.toLocaleDateString(undefined, {
            weekday: "short",
            month: "short",
            day: "numeric"
          });
  
          div.innerHTML = `
            <div class="lesson-name">${lesson.name}</div>
            <div class="lesson-time">${formattedDate}, ${lesson.time} - ${lesson.endTime}</div>
            <div class="lesson-instructor">${lesson.instructor}</div>
            <div class="lesson-extra hidden">
              <div class="lesson-topic"><strong>Latest Topic:</strong> ${lesson.topic}</div>
              <div class="lesson-hw"><strong>Homework:</strong> ${lesson.hwStatus}</div>
              <div class="lesson-buttons">
                <button class="join-btn">Join</button>
                <button class="change-btn">Change Time</button>
              </div>
            </div>
          `;
  
          div.addEventListener("click", () => {
            openModal(lesson);
          });
  
          calendarBody.appendChild(div);
        });
      });
    }
  
    function openModal(lesson) {
      document.getElementById("modalTitle").textContent = lesson.name;
      document.getElementById("modalTime").textContent = `${lesson.time} - ${lesson.endTime}`;
      document.getElementById("modalInstructor").textContent = lesson.instructor;
      document.getElementById("modalTopic").textContent = lesson.topic;
      document.getElementById("modalHw").textContent = lesson.hwStatus;
  
      document.getElementById("lessonModal").classList.remove("hidden");
  
      document.getElementById("modalJoinBtn").onclick = () => {
        alert(`Joining ${lesson.name}`);
      };
  
      document.getElementById("modalChangeBtn").onclick = () => {
        alert(`Change time for ${lesson.name}`);
      };
    }
  
    document.querySelector(".close-btn").addEventListener("click", () => {
      document.getElementById("lessonModal").classList.add("hidden");
    });
  
    // WEEK SWITCHING LOGIC
    let currentWeekStart = getStartOfWeek(new Date());
  
    function getStartOfWeek(date) {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      return new Date(d.setDate(diff));
    }
  
    function formatWeekRange(startDate) {
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      const options = { month: "short", day: "numeric" };
      return `${startDate.toLocaleDateString(undefined, options)} – ${endDate.toLocaleDateString(undefined, options)}`;
    }
  
    function updateDayHeaders() {
      const headerEls = document.querySelectorAll(".days-container .day-column");
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
      headerEls.forEach((el, i) => {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
  
        const day = date.getDate();
        const weekday = weekdays[date.getDay()];
  
        el.textContent = `${day}, ${weekday}`;
        el.setAttribute("data-day", `${day}, ${weekday}`);
      });
    }
  
    function updateWeekView() {
      document.getElementById("weekLabel").textContent = formatWeekRange(currentWeekStart);
      updateDayHeaders();
      renderLessons();
    }
  
    document.getElementById("prevWeekBtn").addEventListener("click", () => {
      currentWeekStart.setDate(currentWeekStart.getDate() - 7);
      updateWeekView();
    });
  
    document.getElementById("nextWeekBtn").addEventListener("click", () => {
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      updateWeekView();
    });
  
    updateWeekView();
  });
  