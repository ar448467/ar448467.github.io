const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Tablica przechowująca wszystkie prostokąty na canvasie
let rectangles = [];

// Funkcja rysująca wszystkie prostokąty z tablicy rectangles
function drawRectangles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Wyczyść canvas przed narysowaniem
  rectangles.forEach(rect => {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  });
}

// Obsługa dodawania nowego prostokąta
function addRectangle(event) {
  event.preventDefault(); // Zapobiegnij domyślnemu działaniu przycisku submit
  const colorPicker = document.getElementById('colorPicker');

  // Pobierz dane z formularza
  const color = colorPicker.value;
  const x = Math.random() * (canvas.width - 50); // Losowa pozycja X (ograniczona przez szerokość canvasa)
  const y = Math.random() * (canvas.height - 50); // Losowa pozycja Y (ograniczona przez wysokość canvasa)
  const width = 50; // Szerokość nowego prostokąta
  const height = 50; // Wysokość nowego prostokąta

  // Dodaj nowy prostokąt do tablicy
  rectangles.push({ x, y, width, height, color });

  // Odśwież wyświetlanie canvasa
  drawRectangles();
}

// Nasłuchuj zdarzenie submit na formularzu
const form = document.getElementById('rectangleForm');
form.addEventListener('submit', addRectangle);
