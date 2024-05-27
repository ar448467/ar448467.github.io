 const imagesDiv = document.getElementById("images");
        const ws = new WebSocket("ws://127.0.0.1:7000/ws/images");
        const addImageButton = document.getElementById("addImage");

        ws.onmessage = (event) => {
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
                .then(response => response.json())
                .then(data => {
                    console.log("Response from server:", data);
                })
                .catch(error => console.error("Error:", error));
        });
