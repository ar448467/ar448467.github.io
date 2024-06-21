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
  const xCoord = document.getElementById('xCoord');
  const yCoord = document.getElementById('yCoord');

  // Pobierz dane z formularza
  const color = colorPicker.value;
  const x = parseInt(xCoord.value);
  const y = parseInt(yCoord.value);
  const width = 50; // Szerokość nowego prostokąta
  const height = 50; // Wysokość nowego prostokąta

  // Sprawdź, czy współrzędne są w zakresie canvas
  if (x < 0 || x + width > canvas.width || y < 0 || y + height > canvas.height) {
    alert("Współrzędne wykraczają poza obszar canvas.");
    return;
  }

  // Dodaj nowy prostokąt do tablicy
  rectangles.push({ x, y, width, height, color });

  // Odśwież wyświetlanie canvasa
  drawRectangles();

  // Wyczyść formularz
  xCoord.value = '';
  yCoord.value = '';
}

// Nasłuchuj zdarzenie submit na formularzu
const form = document.getElementById('rectangleForm');
form.addEventListener('submit', addRectangle);
