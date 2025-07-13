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
  - [📜 Available Scripts](#-available-scripts)
  - [⚡ Vite](#-vite)
  - [🌐 Progressive Web App (PWA)](#-progressive-web-app-pwa)
  - [🖼 Assets Management](#-assets-management)
  - [📁 Project Structure Highlights](#-project-structure-highlights)
  - [📚 Documentation \& Resources](#-documentation--resources)
- [PWA Criteria](#pwa-criteria)
  - [Progressive](#progressive)
  - [Responsive](#responsive)
  - [Connectivity Indipendent](#connectivity-indipendent)
  - [App-like](#app-like)
  - [Fresh](#fresh)
  - [Safe](#safe)
  - [Dicoverable](#dicoverable)
  - [Reengageable](#reengageable)
  - [Installable](#installable)
  - [Linkable](#linkable)
  - [Sensorik](#sensorik)

---


## Generelles Setup

```bash
git clone https://github.com/Fiinleyyy/webeng2.git
```

## 🐳 Docker Setup & Development Workflow

### ▶️ Run with Docker Compose

```bash
cd docker
docker-compose up --build
```

This builds the container and starts the Vite preview server. Open `http://localhost:4173` in your browser to view the app.

The application is normally being hosted via http but can also be changed to https by performing following changes:
1. Reset the cache of your browser to avoid conflicts: Safari -> Developer -> Emtpy Cache 
2. go to docker/Dockerfile: change `CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173", "--config", "vite.config.http.js"]` with `CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "4173", "--config", "vite.config.https.js"]`
3. got to docker/docker-compose.yaml: change ` npx vite preview --host 0.0.0.0 --port 4173 --config vite.config.http.js` with ` npx vite preview --host 0.0.0.0 --port 4173 --config vite.config.https.js`
4. run the command to build and run the container either with http or https

## 📜 Available Scripts besided docker compose

| Script              | Description                                        |
|---------------------|----------------------------------------------------|
| `npm start  `       | Start the development server using http            |
| `npm run dev:https` | Start the development servier using https          |
| `npm run build`     | Build the app for production                       |
| `npm run lint`      | Run ESLint on the project source files             |


## Run Project with development server 

run following steps to execute project in development server via http or https

```bash
npm install
npm run build
npm start (for http)
npm run dev:https (for https)
docker-compose up --build
```

---

# Scrum 

The Scrum tickets, poker planning and the Scrum Board can be found in the Github Projects.

---

# PWA Criteria

## Progressive 

The PWA is working on Edge, Chrome, Firefox and Safari

## Responsive

The PWA is responsive adpating to the screen size smoothly without any overheads

## Connectivity Indipendent

The PWA is not completely connectivity independent due to the use of multiple API's like the wikipedia API, Nominatim API for geocoding and reverse geocoding and the OpenStreetMap API. 
The service worker tries to cache the Map and the nominatim results. This allows fast connection even if there is low internet power and even allows to look on the Map and get the users position if there is no internet connection.

## App-like

The PWA acts like a native application adapting perfectly to phone or ipad size as well.

## Fresh

The offline copy of the PWA updates when changes in the online version are made due to the service worker. 

This is only testable outside the docker container because changing parts of the code and rebuilding the container requires a reset of the Browser Cache as well to reload the application running on a certain port. By resetting this cache the service worker cache is also resetted. Due to the fact that the offline copy is updated by changes recognized by the service worker, a reset of its cache will make an update of the desktop shortcut not possible.

## Safe

The PWA is routed on HTTPS. Therefor a personalized ssl certificate is being used. Without that, the application wouldn't be running on IOS because IOS blocks the call of HTTP websites completely.

## Dicoverable

fullfilled

## Reengageable

the application sends a push message every morning at 7 am and every time the application is started. This feature is currently not compatible with Safari, as the browser imposes stricter restrictions on access to certain system-level resources. User interaction is required to grant access to the system-level resources necessary for sending push messages. On Chrome for example this is not required.

## Installable 

A desktop shortcut can be created

## Linkable

Done

## Sensorik

The PWA uses access on native interface. In the case of this PWA it uses GPS to get the users current position and asks the user to allow getting push-messages.

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
- `vite.config.http.js` — Vite config for http
- `vite.config.https.js` - Vite config for https
- `docker/` — Dockerfile and Compose setup
- `.devcontainer/` — Devcontainer configuration for VSCode

---

## 📚 Documentation & Resources

- [Framework7 Docs](https://framework7.io/docs/)
- [Framework7 React](https://framework7.io/react/)
- [Vite Documentation](https://vitejs.dev/)
- [Workbox Docs](https://developer.chrome.com/docs/workbox/)
- [Community Forum](https://forum.framework7.io)

---