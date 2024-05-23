document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('imageContainer');
    let startX, startY, currentRect;

    // Funkcja tworząca nowy prostokąt SVG
    function createSVGRect(x, y, width, height, fillColor) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', fillColor);
        return rect;
    }

    // Funkcja rozpoczynająca rysowanie prostokąta
    function startDrawRect(event) {
        startX = event.clientX;
        startY = event.clientY;
        currentRect = createSVGRect(startX, startY, 0, 0, 'blue');
        imageContainer.appendChild(currentRect);
        document.addEventListener('mousemove', drawRect);
        document.addEventListener('mouseup', stopDrawRect);
    }

    // Funkcja rysująca prostokąt w czasie przeciągania
    function drawRect(event) {
        const width = event.clientX - startX;
        const height = event.clientY - startY;
        currentRect.setAttribute('width', Math.abs(width));
        currentRect.setAttribute('height', Math.abs(height));
        currentRect.setAttribute('x', width < 0 ? event.clientX : startX);
        currentRect.setAttribute('y', height < 0 ? event.clientY : startY);
    }

    // Funkcja kończąca rysowanie prostokąta
    function stopDrawRect() {
        document.removeEventListener('mousemove', drawRect);
        document.removeEventListener('mouseup', stopDrawRect);
    }

    // Dodajemy nasłuchiwanie zdarzenia "mousedown" na kontenerze obrazków
    imageContainer.addEventListener('mousedown', startDrawRect);
});
