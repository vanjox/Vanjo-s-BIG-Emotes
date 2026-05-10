const scaleSlider = document.getElementById('scale');
const scaleValue = document.getElementById('scaleValue');

chrome.storage.sync.get(['emoteScale'], (result) => {
  const scale = result.emoteScale || 1.8;

  scaleSlider.value = scale;
  scaleValue.textContent = `${scale}x`;
});

scaleSlider.addEventListener('input', () => {
  const value = parseFloat(scaleSlider.value);

  scaleValue.textContent = `${value}x`;

  chrome.storage.sync.set({
    emoteScale: value
  });
});
