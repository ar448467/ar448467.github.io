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

// Funkcja sprawdzająca czy kliknięcie nastąpiło wewnątrz prostokąta
function isInsideRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.width &&
         y >= rect.y && y <= rect.y + rect.height;
}

// Obsługa dodawania nowego prostokąta
function addRectangle(event) {
  event.preventDefault(); // Zapobiegnij domyślnemu działaniu przycisku submit
  const colorPicker = document.getElementById('colorPicker');
  const x1Input = document.getElementById('x1');
  const y1Input = document.getElementById('y1');
  const x2Input = document.getElementById('x2');
  const y2Input = document.getElementById('y2');

  // Pobierz dane z formularza
  const color = colorPicker.value;
  const x1 = parseInt(x1Input.value);
  const y1 = parseInt(y1Input.value);
  const x2 = parseInt(x2Input.value);
  const y2 = parseInt(y2Input.value);

  // Oblicz współrzędne i wymiary prostokąta
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

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
  x1Input.value = '';
  y1Input.value = '';
  x2Input.value = '';
  y2Input.value = '';
}

// Obsługa usuwania prostokąta
function deleteRectangle(event) {
  event.preventDefault(); // Zapobiegnij domyślnemu działaniu przycisku submit

  // Znajdź prostokąt, który ma być usunięty
  const deleteRectIndex = rectangles.findIndex(rect => rect.delete);
  if (deleteRectIndex !== -1) {
    rectangles.splice(deleteRectIndex, 1); // Usuń prostokąt z tablicy
    drawRectangles(); // Odśwież wyświetlanie canvasa
  }

  // Ukryj informację o usuwanym prostokącie
  const deleteInfo = document.getElementById('deleteInfo');
  deleteInfo.style.display = 'none';
}

// Obsługa kliknięcia na canvas
canvas.addEventListener('click', function(event) {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  // Sprawdź każdy prostokąt, czy kliknięcie nastąpiło wewnątrz
  for (let i = rectangles.length - 1; i >= 0; i--) {
    if (isInsideRect(mouseX, mouseY, rectangles[i])) {
      // Oznacz prostokąt do usunięcia
      rectangles[i].delete = true;

      // Wyświetl informację o usuwanym prostokącie
      const deleteRectInfo = document.getElementById('deleteRectInfo');
      deleteRectInfo.textContent = `(${rectangles[i].x}, ${rectangles[i].y}) - (${rectangles[i].x + rectangles[i].width}, ${rectangles[i].y + rectangles[i].height})`;
      const deleteInfo = document.getElementById('deleteInfo');
      deleteInfo.style.display = 'block';
      
      break; // Przerywamy pętlę po pierwszym znalezionym prostokącie
    }
  }
});

// Nasłuchuj zdarzenie submit na formularzu
const form = document.getElementById('rectangleForm');
form.addEventListener('submit', addRectangle);

// Nasłuchuj zdarzenie kliknięcia na przycisku usuń
const deleteButton = document.getElementById('deleteRectangle');
deleteButton.addEventListener('click', deleteRectangle);
