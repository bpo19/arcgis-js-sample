# ArcGIS API for JavaScript with Angular CLI

This repo is a copy of an example from https://github.com/Esri/jsapi-resources/tree/master/esm-samples/jsapi-angular-cli.
Esri loader (latest) and  Angular 12 is used instead of the [@arcgis/core](https://www.npmjs.com/package/@arcgis/core) ES modules. 

---
## Known issues

`Unhandled Promise Rejection` console errors from the `WebMap` object are thrown when starting the map, and from `SceneView` when panning or changing the zoom level.

## Get Started

**Step 1** - Run `npm install`. 

**Step 2** - Run `ng serve`