async function getScale() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['emoteScale'], (result) => {
      resolve(result.emoteScale || 1.8);
    });
  });
}

async function applyBigEmotes() {
  const scale = await getScale();

  const selectors = [
    'img.chat-image',
    'img.chat-line__message--emote',
    'img.seventv-emote',
    'img.bttv-emote',
    'img.ffz-emote',
    '.chat-line__message img',
    '[data-test-selector="chat-line-message-body"] img'
  ];

  const emotes = document.querySelectorAll(selectors.join(','));

  emotes.forEach((emote) => {
    emote.style.transform = `scale(${scale})`;
    emote.style.transformOrigin = 'center center';
    emote.style.margin = '0 6px';
    emote.style.verticalAlign = 'middle';
  });
}

applyBigEmotes();

const observer = new MutationObserver(() => {
  applyBigEmotes();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

chrome.storage.onChanged.addListener(() => {
  applyBigEmotes();
});
