# WebEng2

A **React + Framework7** Progressive Web App (PWA) built using **Vite** as the bundler. The app features modern frontend tooling, service workers for offline capability, and Docker support for containerized deployment.

---

## 📚 Table of Contents

- [WebEng2](#webeng2)
  - [📚 Table of Contents](#-table-of-contents)
  - [🐳 Docker Setup \& Development Workflow](#-docker-setup--development-workflow)
    - [▶️ Run with Docker Compose](#️-run-with-docker-compose)
  - [🧠 Using VSCode with Docker (Devcontainer)](#-using-vscode-with-docker-devcontainer)
  - [🛠 Framework7 CLI Setup](#-framework7-cli-setup)
  - [🚀 Getting Started](#-getting-started)
    - [📦 Install Dependencies](#-install-dependencies)
  - [📜 Available Scripts](#-available-scripts)
  - [⚡ Vite](#-vite)
  - [🌐 Progressive Web App (PWA)](#-progressive-web-app-pwa)
  - [🖼 Assets Management](#-assets-management)
  - [📁 Project Structure Highlights](#-project-structure-highlights)
  - [📚 Documentation \& Resources](#-documentation--resources)

---

## 🐳 Docker Setup & Development Workflow

### ▶️ Run with Docker Compose

```bash
cd docker
docker-compose up --build
```

This builds the container and starts the Vite preview server. Open `http://localhost:4173` in your browser to view the app.

---

## 🧠 Using VSCode with Docker (Devcontainer)

Development should be done **exclusively using the Devcontainer setup in VSCode**, which ensures proper environment configuration, Git integration, and live reload functionality.

Steps:

1. Ensure you have the **Remote - Containers** extension installed in VSCode.
2. Open the project folder in VSCode.
3. Open the Command Palette: `Ctrl+Shift+P` → `Dev Containers: Reopen in Container`.
4. VSCode will use the `.devcontainer/devcontainer.json` file to:
    - Use the Docker Compose-based container
    - Mount your local project directory into the container
    - Forward port `4173` & `5173`
    - Install Node dependencies via `npm install`
    - Enable ESLint and GitHub CLI support

Once inside the container, simply run:

```bash
npm run dev
```

The app will be served with hot reload at `http://localhost:5173`.

---

## 🛠 Framework7 CLI Setup

This app was scaffolded using the Framework7 CLI with the following configuration:

```json
{
  "name": "WebEng2",
  "framework": "react",
  "template": "single-view",
  "bundler": "vite",
  "type": ["pwa"],
  "cssPreProcessor": false,
  "theming": {
    "customColor": false,
    "color": "#007aff",
    "darkMode": true,
    "iconFonts": true
  },
  "customBuild": false
}
```

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

---

## 📜 Available Scripts

| Script         | Description                                        |
|----------------|----------------------------------------------------|
| `npm run dev`  | Start the development server with hot reload       |
| `npm run build`| Build the app for production                       |
| `npm run lint` | Run ESLint on the project source files             |

---

## ⚡ Vite

This project uses [Vite](https://vitejs.dev) for fast development and bundling. Source code resides in `/src`, and the config is in `vite.config.js`.

---

## 🌐 Progressive Web App (PWA)

This project is a PWA. In development, disable the service worker in DevTools if necessary.

To regenerate the service worker manually:

```bash
npx workbox generateSW workbox-config.js
```

---

## 🖼 Assets Management

Source images for icons and splash screens are in `assets-src`. To regenerate assets:

```bash
framework7 assets
```

Or use the asset editor UI:

```bash
framework7 assets --ui
```

---

## 📁 Project Structure Highlights

- `src/` — Application source code
- `public/` — Static files
- `assets-src/` — Editable source assets
- `workbox-config.js` — Service worker configuration
- `vite.config.js` — Vite config
- `docker/` — Dockerfile and Compose setup
- `.devcontainer/` — Devcontainer configuration for VSCode

---

## 📚 Documentation & Resources

- [Framework7 Docs](https://framework7.io/docs/)
- [Framework7 React](https://framework7.io/react/)
- [Vite Documentation](https://vitejs.dev/)
- [Workbox Docs](https://developer.chrome.com/docs/workbox/)
