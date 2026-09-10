const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const speakBtn = document.getElementById('speak-btn');

let voices = [];

function populateVoiceList() {
  voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = voices
    .map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Voices are loaded asynchronously
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

speakBtn.addEventListener('click', () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
  }

  if (textInput.value !== '') {
    const utterThis = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) {
      utterThis.voice = selectedVoice;
    }
    speechSynthesis.speak(utterThis);
  }
});