  // Clase Carta
class Card {
    constructor(image) {
      this.image = image;
      this.isRevealed = false;
    }
  
    reveal() {
      this.isRevealed = true;
    }
  
    hide() {
      this.isRevealed = false;
    }
  }
  
  // Clase Juego de Memorama
  class MemoryGame {
    constructor(images) {
      this.images = images;
      this.cards = [];
      this.firstCard = null;
      this.secondCard = null;
      this.completedPairs = 0;
    }
  
    createCards() {
      // Duplica las imágenes para formar los pares
      this.images = this.images.concat(this.images);
  
      // Baraja las imágenes antes de asignarlas a las cartas
      this.shuffle(this.images);
  
      for (let i = 0; i < this.images.length; i++) {
        const card = new Card(this.images[i]);
        this.cards.push(card);
      }
    }
  
    shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
  
    revealCard(card) {
      card.reveal();
  
      if (this.firstCard === null) {
        this.firstCard = card;
      } else if (this.secondCard === null && this.firstCard !== card) {
        this.secondCard = card;
  
        // Comparamos las cartas
        setTimeout(() => {
          this.compareCards();
        }, 1000);
      }
    }
  
    compareCards() {
      if (this.firstCard.image === this.secondCard.image) {
        // Las cartas son iguales, las dejamos reveladas
        this.firstCard = null;
        this.secondCard = null;
        this.completedPairs++;
  
        // Verificamos si se completó el juego
        this.checkCompletion();
      } else {
        // Las cartas son diferentes, las volvemos a ocultar
        this.firstCard.hide();
        this.secondCard.hide();
        this.firstCard = null;
        this.secondCard = null;
      }
    }
  
    checkCompletion() {
      if (this.completedPairs === this.images.length / 2) {
        const message = document.getElementById("message");
        message.style.display = "block";
        message.textContent = "¡Juego completado!";
      }
    }
  }
  
  // Función de inicio de juego
  function startGame() {
    const images = [
        "pantalla_carga/recursos/img_memo/card_elajolote.png",
        "pantalla_carga/recursos/img_memo/card_elcotorro.png",
        "pantalla_carga/recursos/img_memo/card_elmundo.png",
        "pantalla_carga/recursos/img_memo/card_larana.png",
        "pantalla_carga/recursos/img_memo/card_elcamaron.png",
      // Agrega aquí más imágenes si lo deseas
    ];

    let numPairs = parseInt(prompt("Ingrese el número de pares de tarjetas (mínimo 1, máximo " + images.length / 2 + ")"));

    if (isNaN(numPairs) || numPairs < 1 || numPairs > images.length / 2) {
      alert("Número de pares no válido");
      return;
    }

    let selectedImages = images.slice(0, numPairs);
    let game = new MemoryGame(selectedImages);
    game.createCards();
  
    let cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
  
    game.cards.forEach((card) => {
      let cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.style.backgroundImage = `url('images/${card.image}')`;
      cardElement.addEventListener("click", () => {
        if (!card.isRevealed && game.secondCard === null) {
          game.revealCard(card);
          cardElement.style.backgroundImage = `url('images/${card.image}')`;
        }
      });
      cardContainer.appendChild(cardElement);
    });
  }
  
  // Evento del botón para iniciar el juego
  let startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startGame);
  