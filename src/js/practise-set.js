const practices = [
    {
      title: "JavaScript Syntax",
      tag: "Development",
      difficulty: "Difficult",
      image: "https://placehold.co/145x99"
    },
    {
      title: "Graphic Design for local store",
      tag: "Design",
      difficulty: "Easy",
      image: "https://placehold.co/145x99"
    },
    {
      title: "Digital Marketing top tips",
      tag: "Marketing",
      difficulty: "Difficult",
      image: "https://placehold.co/145x99"
    },
    {
      title: "Digital Marketing top tips",
      tag: "Marketing",
      difficulty: "Easy",
      image: "https://placehold.co/145x99"
    },
    {
      title: "JavaScript Syntax",
      tag: "Development",
      difficulty: "Difficult",
      image: "https://placehold.co/145x99"
    },
    {
      title: "Graphic Design for local store",
      tag: "Design",
      difficulty: "Easy",
      image: "https://placehold.co/145x99"
    }
  ];
  
  let backpack = [];
  
  function renderCards() {
    const grid = document.getElementById('practice-grid');
    grid.innerHTML = '';
  
    const itemsPerRow = 3;
  
    for (let i = 0; i < practices.length; i += itemsPerRow) {
      const row = document.createElement('div');
      row.className = 'row';
  
      const rowItems = practices.slice(i, i + itemsPerRow);
  
      rowItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
  
        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}" />
          <div class="tag">${item.tag}</div>
          <div class="title-text">${item.title}</div>
          <div class="difficulty ${item.difficulty.toLowerCase()}">${item.difficulty}</div>
          <button class="button" onclick="addToBackpack(${i + index})">Add to backpack</button>
        `;
  
        row.appendChild(card);
      });
  
      grid.appendChild(row);
    }
  }
  
  
  function addToBackpack(index) {
    backpack.push(practices[index]);
    document.getElementById('backpack-count').textContent = backpack.length;
  }
  
  window.onload = renderCards;
  

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