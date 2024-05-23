document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('imageForm');
    const imageContainer = document.getElementById('imageContainer');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        const imageUrl = document.getElementById('imageUrl').value;
        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Added Image';
            img.style.maxWidth = '100%'; // Optional: limit the width of the image

            imageContainer.appendChild(img);
            document.getElementById('imageUrl').value = ''; // Clear the input field
        }
    });
});