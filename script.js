document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('imageContainer');
    let startX, startY, currentRect;
    const colorPicker = document.getElementById('colorPicker');
    // Funkcja tworząca nowy prostokąt do podglądu
    function createPreviewRect(x, y, width, height, color) {
        const rect = document.createElement('div');
        rect.style.position = 'absolute';
        rect.style.left = `${x}px`;
        rect.style.top = `${y}px`;
        rect.style.width = `${width}px`;
        rect.style.height = `${height}px`;
        rect.style.border = `2px solid ${color}`;
        rect.style.backgroundColor = `${color}33`;
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
});
