# Webdue Studio — Creator Studio

A local-first, browser-based design editor prototype with a dark glass UI and neon-green accents.

## Open it

Open [studio/index.html](./index.html) on the deployed Webdue site or serve the repository locally. Fabric.js and jsPDF are loaded from jsDelivr, so the first load requires internet access. The editor's project storage and editing data are local to the browser.

For local testing, run from the repository root:

```bash
py -m http.server 8000
```

Then visit `http://localhost:8000/studio/`.

## Included features

- Preset canvases for YouTube thumbnails, square posts, vertical stories, posters, and slides
- Editable text, rectangles, circles, lines, uploaded images, and freehand drawing
- Object selection, resizing, rotation, layer list, visibility, lock controls, basic properties, duplication, and deletion
- Four original editable starter templates
- Multiple pages
- Undo/redo snapshots
- IndexedDB project persistence and recent-project dashboard
- PNG, JPG, PDF, and editable JSON project export
- Project JSON import with basic schema and size validation
- Responsive desktop/mobile layout
- Keyboard shortcuts: Ctrl/Cmd+S, Ctrl/Cmd+Z, Ctrl/Cmd+Shift+Z, Ctrl/Cmd+D, Delete, and arrow-key nudging

## Privacy and storage

There is no app backend, account, or project upload service. Projects are stored in the current browser's IndexedDB. Browser storage can be cleared or evicted; use **Project JSON** to create backups. Project data does not sync across browsers or devices.

The app loads Fabric.js and jsPDF from jsDelivr. Therefore, editing from a fresh load is not fully offline yet. The application does not currently include a service worker or installable PWA.

## Known limitations

This is an initial working build, not a full Canva replacement. Advanced cropping, sophisticated group editing, font embedding, transparent PDF output, full-resolution asset packaging in project JSON, robust history for every text keystroke, and automated browser tests still need further work. Imported projects containing images may include image data URLs, which can make JSON backups large. Large canvases or many high-resolution images can exceed browser memory limits.

## Tech

- HTML, CSS, JavaScript
- Fabric.js 5.3
- jsPDF 2.5
- IndexedDB

No API keys or environment variables are required.
