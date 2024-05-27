document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.getElementById('imageContainer') as HTMLElement;
    let startX: number, startY: number, currentRect: HTMLDivElement | null = null;
    const colorPicker = document.getElementById('colorPicker') as HTMLSelectElement;
    let selectedRect: HTMLDivElement | null = null;

    // Funkcja tworząca nowy prostokąt do podglądu
    function createPreviewRect(x: number, y: number, width: number, height: number, color: string): HTMLDivElement {
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
    function startDrawRect(event: MouseEvent): void {
        startX = event.offsetX;
        startY = event.offsetY;
        const selectedColor = colorPicker.value;
        currentRect = createPreviewRect(startX, startY, 0, 0, selectedColor);
        imageContainer.appendChild(currentRect);
        document.addEventListener('mousemove', drawRect);
        document.addEventListener('mouseup', stopDrawRect);
    }

    // Funkcja rysująca prostokąt w czasie przeciągania
    function drawRect(event: MouseEvent): void {
        if (!currentRect) return;
        const width = event.offsetX - startX;
        const height = event.offsetY - startY;
        currentRect.style.width = `${Math.abs(width)}px`;
        currentRect.style.height = `${Math.abs(height)}px`;
        currentRect.style.left = `${width < 0 ? event.offsetX : startX}px`;
        currentRect.style.top = `${height < 0 ? event.offsetY : startY}px`;
    }

    // Funkcja kończąca rysowanie prostokąta
    function stopDrawRect(): void {
        document.removeEventListener('mousemove', drawRect);
        document.removeEventListener('mouseup', stopDrawRect);
        currentRect = null;
    }

    // Dodajemy nasłuchiwanie zdarzenia "mousedown" na kontenerze obrazków
    imageContainer.addEventListener('mousedown', startDrawRect);

    // Funkcja tworząca prostokąt na podstawie podanych wartości
    function createRectangle(x: number, y: number, width: number, height: number, color: string): HTMLDivElement {
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
    (window as any).addRectangle = function (): void {
        const x1 = parseInt((document.getElementById('x1') as HTMLInputElement).value);
        const y1 = parseInt((document.getElementById('y1') as HTMLInputElement).value);
        const x2 = parseInt((document.getElementById('x2') as HTMLInputElement).value);
        const y2 = parseInt((document.getElementById('y2') as HTMLInputElement).value);
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
    function selectRectangle(event: MouseEvent): void {
        if (selectedRect) {
            selectedRect.style.borderColor = selectedRect.style.backgroundColor;
        }
        selectedRect = event.target as HTMLDivElement;
        selectedRect.style.borderColor = 'red';

        const rectInfo = `Współrzędne: (${selectedRect.style.left}, ${selectedRect.style.top}), Wymiary: ${selectedRect.style.width} x ${selectedRect.style.height}`;
        (document.getElementById('deleteInfo') as HTMLInputElement).value = rectInfo;
    }

    // Funkcja usuwająca zaznaczony prostokąt
    (window as any).deleteRectangle = function (): void {
        if (selectedRect) {
            selectedRect.remove();
            (document.getElementById('deleteInfo') as HTMLInputElement).value = '';
            selectedRect = null;
        } else {
            alert("Proszę wybrać prostokąt do usunięcia.");
        }
    }

    // Funkcja serializująca obrazek zawierający prostokąty do formatu JSON
    (window as any).serializeImage = function (): void {
        const rectangles = Array.from(document.getElementsByClassName('rectangle')).map(rect => {
            return {
                left: rect.style.left,
                top: rect.style.top,
                width: rect.style.width,
                height: rect.style.height,
                color: rect.style.backgroundColor
            };
        });

        const imageContainerStyle = {
            width: imageContainer.style.width,
            height: imageContainer.style.height,
            border: imageContainer.style.border
        };

        const imageData = {
            container: imageContainerStyle,
            rectangles: rectangles
        };

        const jsonOutput = document.getElementById('jsonOutput') as HTMLTextAreaElement;
        jsonOutput.value = JSON.stringify(imageData, null, 2);
    }
});
