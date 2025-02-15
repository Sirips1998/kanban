const attachCard = (card) => {
  const swimlanes = document.querySelectorAll(".swimlane");
  if (swimlanes.length === 0) return;

  const randomSwimlane = Math.floor(Math.random() * swimlanes.length);
  swimlanes[randomSwimlane].appendChild(card);
};

const createCard = (index) => {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  cardElement.style.width = "auto";
  cardElement.innerText = `ข้อ ${index}`;
  cardElement.draggable = true;

  const commentBox = document.createElement("textarea");
  commentBox.className = "comment-Box";
  commentBox.placeholder = "Add a comment...";
  cardElement.appendChild(commentBox);


  cardElement.addEventListener("dragstart", (event) => {
    event.target.id = "dragged";
    event.target.style.border = "1px solid black";
});

  cardElement.addEventListener("dragend", (e) => {
    e.target.id = undefined;
  });

  attachCard(cardElement);
};

// Create Add Card Button
const addCardButton = document.createElement("button");
addCardButton.textContent = "Add Card";
addCardButton.addEventListener("click", () => {
  const swimlanes = document.querySelectorAll(".swimlane");
  const nextIndex = document.querySelectorAll(".card").length + 1; // Get the next index
  createCard(nextIndex);
});

// Create Remove Card Button (removes the last card in a random swimlane)
const removeCardButton = document.createElement("button");
removeCardButton.textContent = "Remove Card";
removeCardButton.addEventListener("click", () => {
  const swimlanes = document.querySelectorAll(".swimlane");
  if (swimlanes.length > 0) {
    const randomSwimlane = Math.floor(Math.random() * swimlanes.length);
    const cardsInSwimlane = swimlanes[randomSwimlane].querySelectorAll(".card");
    if (cardsInSwimlane.length > 0) {
      const lastCard = cardsInSwimlane[cardsInSwimlane.length - 1];
      swimlanes[randomSwimlane].removeChild(lastCard);
    }
  }
});

const buttonContainer = document.createElement("div");
buttonContainer.className = "button-container";
buttonContainer.appendChild(addCardButton);
addCardButton.className = "addCardButton";
buttonContainer.appendChild(removeCardButton);
removeCardButton.className = "removeCardButton";
document.body.appendChild(buttonContainer, document.body.firstChild);


const createCards = (amount) => {
  for (let i = 0; i < amount; i++) {
    createCard(i);
  }
};
const addEventListenerToswimlanes = () => {
  const swimlanes = document.querySelectorAll(".swimlane");

  for (let i = 0; i < swimlanes.length; i++) {
    swimlanes[i].addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    swimlanes[i].addEventListener("drop", (e) => {
      e.preventDefault();

      const draggedCard = document.querySelector("#dragged");
      draggedCard.parentNode.removeChild(draggedCard);
      e.currentTarget.appendChild(draggedCard);
    });
  }
};

createCards(10);
addEventListenerToswimlanes();

