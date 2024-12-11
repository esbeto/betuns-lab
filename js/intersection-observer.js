// Written in 2021, you should look into MDN instead
let callback = (entries, observer) => {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed
    // target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};

let options = {
  // The element that is used as the viewport for checking visibility of the target.
  // Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
  root: document.querySelector("#scrollArea"),
  // Margin around the root. Can have values similar to the CSS margin property,
  // e.g. "10px 20px 30px 40px" (top, right, bottom, left).
  // The values can be percentages. This set of values serves to grow or shrink each side of the root
  // element's bounding box before computing intersections. Defaults to all zeros.
  rootMargin: "0px",
  // Either a single number or an array of numbers which indicate at what percentage of the target's
  // visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark,
  // you can use a value of 0.5. If you want the callback to run every time visibility passes another 25%, you would specify the array
  // [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
  threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);

let target = document.querySelector("#listItem");
observer.observe(target);
