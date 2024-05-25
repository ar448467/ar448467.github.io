document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('imageContainer');
    let startX, startY, currentRect;
    const colorPicker = document.getElementById('colorPicker');
     let selectedRect = null;
    
    // Funkcja tworząca nowy prostokąt do podglądu
    function createPreviewRect(x, y, width, height, color) {
        const rect = document.createElement('div');
        rect.style.position = 'absolute';
        rect.style.left = `${x}px`;
        rect.style.top = `${y}px`;
        rect.style.width = `${width}px`;
        rect.style.height = `${height}px`;
        rect.style.border = `2px solid ${color}`;
        rect.style.backgroundColor = color; // Ustawienie koloru wnętrza
        rect.addEventListener('click', selectRectangle);
        return rect;
    }

    // Funkcja rozpoczynająca rysowanie prostokąta
    function startDrawRect(event) {
        startX = event.offsetX;
        startY = event.offsetY;
        const selectedColor = colorPicker.value;
        currentRect = createPreviewRect(startX, startY, 0, 0, selectedColor);
        imageContainer.appendChild(currentRect);
        document.addEventListener('mousemove', drawRect);
        document.addEventListener('mouseup', stopDrawRect);
    }

    // Funkcja rysująca prostokąt w czasie przeciągania
    function drawRect(event) {
        const width = event.offsetX - startX;
        const height = event.offsetY - startY;
        currentRect.style.width = `${Math.abs(width)}px`;
        currentRect.style.height = `${Math.abs(height)}px`;
        currentRect.style.left = `${width < 0 ? event.offsetX : startX}px`;
        currentRect.style.top = `${height < 0 ? event.offsetY : startY}px`;
    }

    // Funkcja kończąca rysowanie prostokąta
    function stopDrawRect() {
        document.removeEventListener('mousemove', drawRect);
        document.removeEventListener('mouseup', stopDrawRect);
    }

    // Dodajemy nasłuchiwanie zdarzenia "mousedown" na kontenerze obrazków
    imageContainer.addEventListener('mousedown', startDrawRect);

    // Funkcja tworząca prostokąt na podstawie podanych wartości
    function createRectangle(x, y, width, height, color) {
        const rect = document.createElement('div');
        rect.classList.add('rectangle');
        rect.style.left = `${x}px`;
        rect.style.top = `${y}px`;
        rect.style.width = `${width}px`;
        rect.style.height = `${height}px`;
        rect.style.borderColor = color;
        rect.style.backgroundColor = color; // Ustawienie koloru wnętrza
        rect.addEventListener('click', selectRectangle);
        return rect;
    }

    // Funkcja dodająca prostokąt na podstawie wartości z formularza
    window.addRectangle = function() {
        const x1 = parseInt(document.getElementById('x1').value);
        const y1 = parseInt(document.getElementById('y1').value);
        const x2 = parseInt(document.getElementById('x2').value);
        const y2 = parseInt(document.getElementById('y2').value);
        const selectedColor = colorPicker.value;

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
            alert("Proszę wpisać poprawne wartości współrzędnych.");
            return;
        }

        const x = Math.min(x1, x2);
        const y = Math.min(y1, y2);
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);

        const rect = createRectangle(x, y, width, height, selectedColor);
        imageContainer.appendChild(rect);
    }
    // Funkcja zaznaczająca prostokąt do usunięcia
    function selectRectangle(event) {
        if (selectedRect) {
            selectedRect.style.borderColor = selectedRect.style.backgroundColor;
        }
        selectedRect = event.target;
        selectedRect.style.borderColor = 'red';

        const rectInfo = `Współrzędne: (${selectedRect.style.left}, ${selectedRect.style.top}), Wymiary: ${selectedRect.style.width} x ${selectedRect.style.height}`;
        document.getElementById('deleteInfo').value = rectInfo;
    }

    // Funkcja usuwająca zaznaczony prostokąt
    window.deleteRectangle = function() {
        if (selectedRect) {
            selectedRect.remove();
            document.getElementById('deleteInfo').value = '';
            selectedRect = null;
        } else {
            alert("Proszę wybrać prostokąt do usunięcia.");
        }
    }

     window.serializeRectangles = function() {
        const rectangles = Array.from(document.getElementsByClassName('rectangle')).map(rect => {
            return {
                left: rect.style.left,
                top: rect.style.top,
                width: rect.style.width,
                height: rect.style.height,
                color: rect.style.backgroundColor
            };
        });
        const jsonOutput = document.getElementById('jsonOutput');
        jsonOutput.value = JSON.stringify(rectangles, null, 2);
    }
});
