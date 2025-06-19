# WebEng2

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "/Users/maxdomitrovic/Studium/6. Semester/webeng/",
  "type": [
    "pwa"
  ],
  "name": "WebEng2",
  "framework": "react",
  "template": "single-view",
  "bundler": "vite",
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

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## PWA

This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)

* [Framework7 React Documentation](https://framework7.io/react/)

* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7

# Start PWA with service worker to cache Map and Nominatim and to Activate Fresh


# After changes 

`npm run build`
`npx http-server www/ -S -C cert.pem -K key.pem -p 4443`

# Start Applikation with service worker using local ssl certificate

`npx http-server www/ -S -C cert.pem -K key.pem -p 4443`


# PWA Criteria

## Progressive 

The PWA is working on Edge, Chrome, Firefox and Safari

## Responsive

The PWA is responsive adpating to the screen size smoothly without any overheads

## Connectivity Indipendent

The PWA is not completely connectivity independent due to the use of multiple API's like the wikipedia API, Nominatim API for geocoding and reverse geocoding and the OpenStreetMap API. 
The service worker tries to cache the Map and the nominatim results. This allows fast connection even if there is low internet power and even allows to look on the Map and get the users position of there is no internet connection.

## App-like

The PWA acts like a native application adapting perfectly to phone or ipad size as well.

## Fresh

The offline copy of the PWA updates when changes in the online version are made due to the service worker

## Safe

The PWA is routed on HTTPS. Therefor a personalized ssl certificate is being used. Without that, the application wouldn't be running on IOS because IOS blocks the call of HTTP websites completely.

## Dicoverable

fullfilled

## Reengageable

not yet fullfilled

## Installable 

Chrone:
Firefox:
Edge:
Safari:

## Linkable

not yet

## Sensorik

The PWA uses access on native interface. In the case of this PWA it uses GPS to get the users current position