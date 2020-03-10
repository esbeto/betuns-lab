// Highlights your name if you're the owner of a ticket. (Pivotal Tracker)
function highlightAvatars() {
  const avatar = document.querySelector('[data-aid="Avatar__image"]');
  document.querySelectorAll(".backlog div.story").forEach(story => {
    const owners = story.querySelectorAll("a.owner");
    const owned = Array.from(owners).find(owner => owner.title === avatar.getAttribute("alt"));
    if (owned) owned.classList.add("user-is-owner");
  });
}

// Resolves if element is found on page. Rejects after 30 seconds
function waitUntilElementInPage(selector) {
  return new Promise((resolve, reject) => {
    let timesRun = 0;
    const interval = setInterval(() => {
      if (timesRun > 60) {
        reject();
        clearInterval(interval);
      }

      const el = document.querySelectorAll(selector);
      if (el.length > 0) {
        resolve();
        clearInterval(interval);
      }

      timesRun += 1;
    }, 500);
  });
}

window.addEventListener("load", async () => {
  await waitUntilElementInPage(".panel .container");
  highlightAvatars();
});
