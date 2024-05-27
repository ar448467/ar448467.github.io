const imagesDiv = document.getElementById("images") as HTMLDivElement;
const ws = new WebSocket("ws://127.0.0.1:7000/ws/images");
const addImageButton = document.getElementById("addImage") as HTMLButtonElement;

ws.onmessage = (event: MessageEvent) => {
    console.log("WebSocket message received:", event.data);
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imageContainer.innerHTML = event.data;
    imagesDiv.insertBefore(imageContainer, imagesDiv.firstChild);
};

ws.onopen = () => {
    console.log("WebSocket connection opened");
};

ws.onclose = () => {
    console.log("WebSocket connection closed");
};

addImageButton.addEventListener("click", () => {
    console.log("Button clicked");
    fetch("http://127.0.0.1:7000/add-image")
        .then(response => {
            console.log("Response status:", response.status);
            return response.json();
        })
        .then(data => {
            console.log("Response from server:", data);
        })
        .catch(error => console.error("Error:", error));
});
