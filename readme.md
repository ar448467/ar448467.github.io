# Zadanie 2 - Konfiguracja TypeScript

## Instalacja TypeScript globalnie

Najpierw zainstalowałem TypeScript globalnie używając npm:

```bash
npm install -g typescript

Konfiguracja pliku `tsconfig.json`

Aby skonfigurować kompilację TypeScript, utworzyłem plik `tsconfig.json` w głównym katalogu projektu i dodałem do niego następujące opcje:

```json
{
    "compilerOptions": {
        "target": "ES2015",
        "lib": ["ES2015", "DOM"],
        "outDir": "./dist"
    },
    "include": ["./zad2.ts"]
}

Kompilacja
tsc zad2.ts


Zmieniłem plik zad2.html, dodałem przycisk odswiezajacy połączenie z websocket
<!DOCTYPE html>
<html>
<head lang="pl">
    <title>zad2</title>
</head>
<body>
    <h1>zad2</h1>
    <p>Miejsce na liczbę</p>
    <button id="reconnect-button">Połącz ponownie</button>
    <script src="zad2.js"></script>
</body>
</html>
