// cue-cards.js
const cards = [
    {
      category: "python",
      front: "images/q1.png",
      back: "images/1.png",
      learned: false,
      reviewLater: false
    },
    {
      category: "python",
      front: "images/q2.png",
      back: "images/2.png",
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
      front: "images/q3.png",
      back: "images/3.png",
      learned: false,
      reviewLater: false
    },
    {
      category: "python",
      front: "images/q4.png",
      back: "images/4.png",
      learned: false,
      reviewLater: false
    },
    {
      category: "python",
      front: "images/q5.png",
      back: "images/5.png",
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
    const tableHTML = `
      <div class="modal-overlay">
        <div class="modal">
          <h2>Learned Python Cards</h2>
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What is a Python list?</td>
                <td>A list is a collection of items in a defined order, written with square brackets <code>[]</code>.</td>
              </tr>
              <tr>
                <td>How do you define a function in Python?</td>
                <td>
                  Use the <code>def</code> keyword:
                  <pre><code>def greet():
      print("Hello")</code></pre>
                </td>
              </tr>
              <tr>
                <td>What does <code>len()</code> do?</td>
                <td>It returns the number of items in an object (like a list, string, etc.).</td>
              </tr>
              <tr>
                <td>How do you write a <code>for</code> loop?</td>
                <td>
                  <pre><code>for i in range(5):
      print(i)</code></pre>
                </td>
              </tr>
              <tr>
                <td>What's the difference between <code>==</code> and <code>=</code> in Python?</td>
                <td><code>=</code> is for assignment, <code>==</code> is for comparison.</td>
              </tr>
            </tbody>
          </table>
          <button id="close-modal">Close</button>
        </div>
      </div>
    `;
  
    document.body.insertAdjacentHTML("beforeend", tableHTML);
  
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
  