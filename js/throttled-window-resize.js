// Sometimes you don't need to react that quickly to a
// resize event, especially sliders, and other animated
// components.
//
// This function will capture the window `resize` event and
// instead dispatch a `throttledResize` event.
//
// You can subscribe to the new event just like the `resize`
// event. It will be the same, but will fire less often.

function throttleWindowResize() {
  let running = false;
  window.addEventListener("resize", () => {
    if (running) {
      return;
    }
    running = true;
    requestAnimationFrame(() => {
      window.dispatchEvent(new CustomEvent("throttledResize"));
      running = false;
    });
  });
}

// You can export the function as a module, then call it:
throttleWindowResize();
