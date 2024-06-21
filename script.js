const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let rectangles = [];
let selectedRectangleIndex = null;

function drawRectangles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangles.forEach(rect => {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
  });
}

function isInsideRect(x, y, rect) {
  return x >= rect.x && x <= rect.x + rect.width &&
         y >= rect.y && y <= rect.y + rect.height;
}

function addRectangle(event) {
  event.preventDefault();
  const colorPicker = document.getElementById('colorPicker');
  const x1Input = document.getElementById('x1');
  const y1Input = document.getElementById('y1');
  const x2Input = document.getElementById('x2');
  const y2Input = document.getElementById('y2');

  const color = colorPicker.value;
  const x1 = parseInt(x1Input.value);
  const y1 = parseInt(y1Input.value);
  const x2 = parseInt(x2Input.value);
  const y2 = parseInt(y2Input.value);

  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const width = Math.abs(x2 - x1);
  const height = Math.abs(y2 - y1);

  if (x < 0 || x + width > canvas.width || y < 0 || y + height > canvas.height) {
    alert("Współrzędne wykraczają poza obszar canvas.");
    return;
  }

  rectangles.push({ x, y, width, height, color });
  drawRectangles();

  x1Input.value = '';
  y1Input.value = '';
  x2Input.value = '';
  y2Input.value = '';
}

function deleteRectangle() {
  if (selectedRectangleIndex !== null) {
    rectangles.splice(selectedRectangleIndex, 1);
    drawRectangles();
    selectedRectangleIndex = null;
    document.getElementById('deleteInfo').style.display = 'none';
  }
}

canvas.addEventListener('click', function(event) {
  const mouseX = event.offsetX;
  const mouseY = event.offsetY;

  for (let i = rectangles.length - 1; i >= 0; i--) {
    if (isInsideRect(mouseX, mouseY, rectangles[i])) {
      selectedRectangleIndex = i;
      const rect = rectangles[i];
      document.getElementById('deleteRectInfo').textContent = `(${rect.x}, ${rect.y}) - (${rect.x + rect.width}, ${rect.y + rect.height})`;
      document.getElementById('deleteInfo').style.display = 'block';
      break;
    }
  }
});

const form = document.getElementById('rectangleForm');
form.addEventListener('submit', addRectangle);

const deleteButton = document.getElementById('deleteRectangle');
deleteButton.addEventListener('click', deleteRectangle);
