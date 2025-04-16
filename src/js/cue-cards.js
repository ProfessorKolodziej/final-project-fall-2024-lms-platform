// cue-cards.js
const cards = [
    {
      category: "python",
      front: "https://placehold.co/303x207?text=Python+Card+1",
      back: "https://placehold.co/303x207?text=Answer+1",
      learned: false,
      reviewLater: false
    },
    {
      category: "python",
      front: "https://placehold.co/303x207?text=Python+Card+2",
      back: "https://placehold.co/303x207?text=Answer+2",
      learned: false,
      reviewLater: false
    },
    {
      category: "marketing",
      front: "https://placehold.co/303x207?text=Marketing+Card+1",
      back: "https://placehold.co/303x207?text=Answer+1",
      learned: false,
      reviewLater: false
    },
    {
      category: "python",
      front: "https://placehold.co/303x207?text=What+is+a+variable%3F",
      back: "A named location used to store data in memory.",
      learned: false,
      reviewLater: false
    },
    {
      category: "python",
      front: "https://placehold.co/303x207?text=What+is+a+list%3F",
      back: "A collection of items ordered and changeable.",
      learned: false,
      reviewLater: false
    },
    {
      category: "python",
      front: "https://placehold.co/303x207?text=What+is+%27if%27+used+for%3F",
      back: "To make decisions in code based on conditions.",
      learned: false,
      reviewLater: false
    },
    {
      category: "marketing",
      front: "https://placehold.co/303x207?text=What+is+SEO%3F",
      back: "Search Engine Optimization — improving site visibility in search.",
      learned: false,
      reviewLater: false
    },
    {
      category: "marketing",
      front: "https://placehold.co/303x207?text=What+is+a+CTA%3F",
      back: "Call To Action — encourages users to take specific action.",
      learned: false,
      reviewLater: false
    },
    {
      category: "marketing",
      front: "https://placehold.co/303x207?text=Define+Conversion+Rate",
      back: "The percentage of users who take a desired action.",
      learned: false,
      reviewLater: false
    }
  ];
  
  let currentIndex = 0;
  let flipped = false;
  let currentCategory = 'python';
  
  const cardEl = document.querySelector(".card");
  const cardImg = document.querySelector(".card img");
  const flipBtn = document.getElementById("flip-button");
  const nextBtn = document.getElementById("next-card");
  const prevBtn = document.getElementById("prev-card");
  const categorySelect = document.getElementById("category-select");
  
  function getCurrentCardList() {
    return cards.filter(card => card.category === currentCategory && !card.learned && !card.reviewLater);
  }
  
  function showCard() {
    const list = getCurrentCardList();
    if (list.length === 0) {
      cardImg.src = "https://placehold.co/303x207?text=No+Cards";
      return;
    }
    const currentCard = list[currentIndex];
    cardImg.src = flipped ? currentCard.back : currentCard.front;
  }
  
  function flipCard() {
    flipped = !flipped;
    showCard();
    renderStacks();
  }
  
  function animateAndTag(action) {
    cardEl.classList.add(action);
  
    setTimeout(() => {
      const list = getCurrentCardList();
      if (list.length === 0) return;
      const currentCard = list[currentIndex];
      if (action === "to-learn") {
        currentCard.reviewLater = true;
      } else if (action === "learned") {
        currentCard.learned = true;
      }
  
      cardEl.classList.remove(action);
      currentIndex = 0;
      flipped = false;
      showCard();
      renderStacks();
    }, 500);
  }
  
  function markUnderstood() {
    animateAndTag("learned");
  }
  
  function markReviewLater() {
    animateAndTag("to-learn");
  }
  
  function updateCategory(e) {
    currentCategory = e.target.value;
    currentIndex = 0;
    flipped = false;
    showCard();
    renderStacks();
  }
  
  function renderStacks() {
    const learnedContainer = document.getElementById("learned-stack");
    const toLearnContainer = document.getElementById("tolearn-stack");
  
    if (!learnedContainer || !toLearnContainer) return;
  
    learnedContainer.innerHTML = "";
    toLearnContainer.innerHTML = "";
  
    const learned = cards.filter(c => c.learned);
    const reviewLater = cards.filter(c => c.reviewLater);
  
    if (learned.length === 0) {
      const placeholder = document.createElement("div");
      placeholder.className = "preview-placeholder";
      placeholder.innerText = "No cards yet";
      learnedContainer.appendChild(placeholder);
    } else {
      learned.slice(0, 3).forEach(card => {
        const div = document.createElement("div");
        div.className = "preview-card";
        div.style.backgroundImage = `url('${card.front}')`;
        learnedContainer.appendChild(div);
      });
    }
  
    if (reviewLater.length === 0) {
      const placeholder = document.createElement("div");
      placeholder.className = "preview-placeholder";
      placeholder.innerText = "No cards yet";
      toLearnContainer.appendChild(placeholder);
    } else {
      reviewLater.slice(0, 3).forEach(card => {
        const div = document.createElement("div");
        div.className = "preview-card";
        div.style.backgroundImage = `url('${card.front}')`;
        toLearnContainer.appendChild(div);
      });
    }
  
    learnedContainer.onclick = () => showLearnedTable();
    toLearnContainer.onclick = () => resetToCueCards();
  }
  
  function resetToCueCards() {
    cards.forEach(card => {
      if (card.reviewLater) card.reviewLater = false;
    });
    currentIndex = 0;
    flipped = false;
    showCard();
    renderStacks();
  }
  
  function showLearnedTable() {
    const learned = cards.filter(card => card.learned);
    if (learned.length === 0) return;
  
    const tableHTML = `
      <div class="modal-overlay">
        <div class="modal">
          <h2>Learned Cards</h2>
          <table>
            <thead>
              <tr><th>Question</th><th>Answer</th></tr>
            </thead>
            <tbody>
              ${learned.map(c => `<tr><td>${decodeURIComponent(c.front.split("=")[1].replaceAll('+', ' '))}</td><td>${c.back}</td></tr>`).join('')}
            </tbody>
          </table>
          <button id="close-modal">Close</button>
        </div>
      </div>
    `;
  
    document.body.insertAdjacentHTML('beforeend', tableHTML);
  
    document.getElementById("close-modal").onclick = () => {
      document.querySelector(".modal-overlay").remove();
    };
  }
  
  nextBtn.textContent = "Review Later";
  prevBtn.textContent = "Understood";
  nextBtn.addEventListener("click", markReviewLater);
  prevBtn.addEventListener("click", markUnderstood);
  flipBtn.addEventListener("click", flipCard);
  categorySelect.addEventListener("change", updateCategory);
  
  showCard();
  renderStacks();
  