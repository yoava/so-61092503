# so-61092503

Minimal Electron demo showing how to keep a `BrowserWindow` from drifting onto
another monitor on macOS. Written to accompany this Stack Overflow answer:

<https://stackoverflow.com/questions/61092503/how-to-prevent-my-apps-window-from-going-to-another-monitor-electron-macos>

## What this demonstrates

`main.js` exports a `setPosition(x, y)` helper that clamps a window's
position to the bounds of the **primary** display, and shrinks its width/height
as it approaches an edge so it can never straddle onto a second monitor:

```js
function setPosition(x, y) {
  const displayBounds = screen.getPrimaryDisplay().bounds
  const fixedX = Math.min(
    displayBounds.x + displayBounds.width,
    Math.max(x, displayBounds.x)
  );
  // ... same for y, plus width/height clamping
  mainWindow.setPosition(fixedX, fixedY);
}
```

On launch, the demo calls this on a `setInterval` with random coordinates every
500ms (`demoSetPosition()`), so you can watch the window get repeatedly
"pulled back" onto the primary display instead of moving to a second one. In a
real app, you'd call `setPosition` (or the clamping logic inside it) from your
own `move`/`will-move` handling instead of the random demo loop.

## Run it

Requires Node.js and Yarn.

```bash
yarn install
yarn start
```

This opens a small Electron window and immediately starts jittering it to
random positions, clamped to your primary display, once every 500ms.

## Notes

- Targets Electron 41. The Electron version is bumped periodically (via
  Dependabot) to keep the demo runnable; the clamping logic itself hasn't
  changed since the original 2020 answer.
- `main.js` references a `preload.js` (for populating Node/Chromium/Electron
  version text in `index.html`), but that file is not part of this repo — it's
  a known gap, not relevant to the demo, and `index.html` loads fine without it.
- This is a narrow, single-purpose repro for the linked Stack Overflow
  question, not a general-purpose library — there's no packaged API to import,
  just the pattern shown in `main.js` to copy into your own app.
