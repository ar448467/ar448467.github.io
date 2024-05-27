document.addEventListener('DOMContentLoaded', () => {
    const imageContainer: HTMLElement | null = document.getElementById('imageContainer');
    let startX: number, startY: number, currentRect: HTMLDivElement | null = null;
    const colorPicker: HTMLSelectElement | null = document.getElementById('colorPicker') as HTMLSelectElement;
    let selectedRect: HTMLDivElement | null = null;
    
    function createPreviewRect(x: number, y: number, width: number, height: number, color: string): HTMLDivElement {
        const rect: HTMLDivElement = document.createElement('div');
        rect.style.position = 'absolute';
        rect.style.left = `${x}px`;
        rect.style.top = `${y}px`;
        rect.style.width = `${width}px`;
        rect.style.height = `${height}px`;
        rect.style.border = `2px solid ${color}`;
        rect.style.backgroundColor = color;
        rect.addEventListener('click', selectRectangle);
        return rect;
    }

    function startDrawRect(event: MouseEvent): void {
        startX = event.offsetX;
        startY = event.offsetY;
        const selectedColor: string = colorPicker ? colorPicker.value : 'black';
        currentRect = createPreviewRect(startX, startY, 0, 0, selectedColor);
        if (imageContainer && currentRect) imageContainer.appendChild(currentRect);
        document.addEventListener('mousemove', drawRect);
        document.addEventListener('mouseup', stopDrawRect);
    }

    function drawRect(event: MouseEvent): void {
        if (!currentRect) return;
        const width: number = event.offsetX - startX;
        const height: number = event.offsetY - startY;
        if (currentRect) {
            currentRect.style.width = `${Math.abs(width)}px`;
            currentRect.style.height = `${Math.abs(height)}px`;
            currentRect.style.left = `${width < 0 ? event.offsetX : startX}px`;
            currentRect.style.top = `${height < 0 ? event.offsetY : startY}px`;
        }
    }

    function stopDrawRect(): void {
        document.removeEventListener('mousemove', drawRect);
        document.removeEventListener('mouseup', stopDrawRect);
    }

    if (imageContainer) imageContainer.addEventListener('mousedown', startDrawRect);

    function createRectangle(x: number, y: number, width: number, height: number, color: string): HTMLDivElement {
        const rect: HTMLDivElement = document.createElement('div');
        rect.classList.add('rectangle');
        rect.style.left = `${x}px`;
        rect.style.top = `${y}px`;
        rect.style.width = `${width}px`;
        rect.style.height = `${height}px`;
        rect.style.borderColor = color;
        rect.style.backgroundColor = color;
        rect.addEventListener('click', selectRectangle);
        return rect;
    }

    (window as any).addRectangle = function(): void {
        const x1: number = parseInt((document.getElementById('x1') as HTMLInputElement).value);
        const y1: number = parseInt((document.getElementById('y1') as HTMLInputElement).value);
        const x2: number = parseInt((document.getElementById('x2') as HTMLInputElement).value);
        const y2: number = parseInt((document.getElementById('y2') as HTMLInputElement).value);
        const selectedColor: string = colorPicker ? colorPicker.value : 'black';

        if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
            alert("Proszę wpisać poprawne wartości współrzędnych.");
            return;
        }

        const x: number = Math.min(x1, x2);
        const y: number = Math.min(y1, y2);
        const width: number = Math.abs(x2 - x1);
        const height: number = Math.abs(y2 - y1);

        const rect: HTMLDivElement = createRectangle(x, y, width, height, selectedColor);
        if (imageContainer) imageContainer.appendChild(rect);
    }

    function selectRectangle(event: MouseEvent): void {
        if (selectedRect) {
            selectedRect.style.borderColor = selectedRect.style.backgroundColor;
        }
        selectedRect = event.target as HTMLDivElement;
        if (selectedRect) selectedRect.style.borderColor = 'red';

        const rectInfo: string = `Współrzędne: (${selectedRect.style.left}, ${selectedRect.style.top}), Wymiary: ${selectedRect.style.width} x ${selectedRect.style.height}`;
        (document.getElementById('deleteInfo') as HTMLInputElement).value = rectInfo;
    }

    (window as any).deleteRectangle = function(): void {
        if (selectedRect) {
            selectedRect.remove();
            (document.getElementById('deleteInfo') as HTMLInputElement).value = '';
            selectedRect = null;
        } else {
            alert("Proszę wybrać prostokąt do usunięcia.");
        }
    }

    (window as any).serializeImage = function(): void {
        const rectangles: any[] = Array.from(document.getElementsByClassName('rectangle')).map(rect => {
            return {
                left: rect.style.left,
                top: rect.style.top,
                width: rect.style.width,
                height: rect.style.height,
                color: rect.style.backgroundColor
            };
        });

        const imageContainerStyle: any = {
            width: imageContainer?.style.width,
            height: imageContainer?.style.height,
            border: imageContainer?.style.border
        };

        const imageData: any = {
            container: imageContainerStyle,
            rectangles: rectangles
        };

        const jsonOutput: HTMLInputElement | null = document.getElementById('jsonOutput') as HTMLInputElement;
        if (jsonOutput) jsonOutput.value = JSON.stringify(imageData, null, 2);
    }
});
