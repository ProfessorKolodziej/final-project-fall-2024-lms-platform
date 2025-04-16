console.log("Lesson Balance page loaded");

const refillBtn = document.getElementById("refill-btn");
const balanceCount = document.getElementById("balance-count");

refillBtn.addEventListener("click", () => {
  const currentBalance = parseInt(balanceCount.textContent);
  const newBalance = currentBalance + 1;
  balanceCount.textContent = `${newBalance} lessons`;
});
