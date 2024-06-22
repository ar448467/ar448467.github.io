document.addEventListener("DOMContentLoaded", function () {
    var placeholder = document.querySelector("p");
    var reconnectButton = document.getElementById("reconnect-button");
    var socket = null;
    // Funkcja do aktualizacji tekstu w placeholderze
    function updatePlaceholder(current) {
        if (placeholder) {
            placeholder.textContent = "Aktualna wartość: " + current;
        }
    }
    // Funkcja do wyświetlania błędów
    function showError(message) {
        if (placeholder) {
            placeholder.textContent = "Błąd: " + message;
        }
    }
    // Funkcja do pobrania początkowej wartości
    function fetchCurrent() {
        fetch('https://example.com/current') // Zaktualizuj URL na adres publiczny
            .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error! status: " + response.status);
            }
            return response.json();
        })
            .then(function (data) {
            if (typeof data.current !== 'number') {
                throw new Error('Received invalid data');
            }
            updatePlaceholder(data.current);
        })
            .catch(function (error) {
            console.error("Error fetching the current value:", error);
            showError("Nie udało się pobrać początkowej wartości");
        });
    }
    // Funkcja do ustanowienia połączenia WebSocket
    function establishWebSocketConnection() {
        socket = new WebSocket("wss://example.com/ws"); // Użyj wss:// dla bezpiecznych połączeń WebSocket
        socket.onmessage = function (event) {
            try {
                var data = JSON.parse(event.data);
                var current = data.value;
                if (typeof current !== 'number') {
                    throw new Error('Received invalid data');
                }
                if (data.method === "multiply") {
                    if (placeholder) {
                        placeholder.textContent = "Zmieniona wartość (mnożenie): " + current;
                    }
                }
                else if (data.method === "divide") {
                    if (placeholder) {
                        placeholder.textContent = "Zmieniona wartość (dzielenie): " + current;
                    }
                }
                else {
                    throw new Error('Unknown method');
                }
            }
            catch (error) {
                console.error("Error processing WebSocket message:", error);
                showError("Otrzymano nieprawidłowe dane z serwera");
            }
        };
        socket.onopen = function () {
            console.log("WebSocket connection established");
            fetchCurrent();
        };
        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log("WebSocket connection closed cleanly");
            }
            else {
                console.error("WebSocket connection closed unexpectedly");
                showError("Połączenie z serwerem zostało utracone");
            }
        };
        socket.onerror = function (error) {
            console.error("WebSocket error:", error);
            showError("Wystąpił błąd połączenia WebSocket");
        };
    }
    establishWebSocketConnection();
    if (reconnectButton) {
        reconnectButton.addEventListener("click", function () {
            if (socket && socket.readyState === WebSocket.OPEN) {
                console.log("Already connected, no need to reconnect");
                return;
            }
            if (socket) {
                socket.close();
            }
            establishWebSocketConnection();
        });
    }
});
