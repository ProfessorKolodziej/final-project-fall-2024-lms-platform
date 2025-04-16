// script.js

document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.pagination .page');
    const cardGrid = document.querySelector('.card-grid');
  
    const cardData = [
      // Simulated data (6 per page)
      [
        { title: "How To Become Ridiculously Self-Aware", category: "Marketing" },
        { title: "Get Started With UI Design", category: "Students" },
        { title: "Make Your Own Expanding Content", category: "Science" },
        { title: "What we are capable to discover", category: "Agency" },
        { title: "Develop Visual Thinking", category: "Design" },
        { title: "Mastering Motion Graphics", category: "Animation" }
      ],
      [
        { title: "Behind the Soundtrack", category: "Music" },
        { title: "Filmmaking 101", category: "Film" },
        { title: "Lighting for Video", category: "Production" },
        { title: "Writing for the Screen", category: "Screenwriting" },
        { title: "Podcast Studio Setup", category: "Audio" },
        { title: "Editing Techniques", category: "Post Production" }
      ],
      [
        { title: "Set Design Essentials", category: "Theatre" },
        { title: "Virtual Reality Shows", category: "VR" },
        { title: "Acting Tips for Beginners", category: "Performance" },
        { title: "Voice-Over Tricks", category: "Audio" },
        { title: "Drone Cinematography", category: "Film" },
        { title: "Creative Directing", category: "Production" }
      ]
    ];
  
    function renderCards(cards) {
      cardGrid.innerHTML = '';
      cards.forEach(data => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="https://placehold.co/140x110" alt="Card Image" />
          <div class="category-badge">${data.category}</div>
          <div class="meta">20 July, 2024 • by Admin</div>
          <div class="title">${data.title}</div>
        `;
        cardGrid.appendChild(card);
      });
    }
  
    pages.forEach((page, index) => {
      page.addEventListener('click', () => {
        pages.forEach(p => p.classList.remove('active'));
        page.classList.add('active');
  
        renderCards(cardData[index]);
      });
    });
  
    // Initial render for page 1
    renderCards(cardData[0]);
  });
  