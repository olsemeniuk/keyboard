const buttons = document.querySelectorAll('.key');
const textarea = document.querySelector('.text-field');
const keyboard = document.querySelector('.keyboard__inner');
const caps = document.querySelector('.key-capslock');

caps.onclick = () => caps.classList.toggle('key-capslock--active');

const doNothingKeys = ['Tab', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight', 'AltLeft', 'ControlLeft', 'MetaLeft', 'AltRight', 'ControlRight', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

document.addEventListener('keydown', event => {
  event.preventDefault();

  const { code } = event;
  const { key } = event;

  if (code === 'CapsLock') {
    caps.classList.toggle('key-capslock--active');
  }

  buttons.forEach(btn => {
    if (code === btn.dataset.code) {
      btn.classList.add('key--active');
    }
  })

  let stringValue = '';

  if (doNothingKeys.includes(code)) {
    stringValue += '';
  } else if (code === 'Backspace') {
    textarea.value = textarea.value.slice(0, textarea.value.length - 1);
  } else {
    if (caps.classList.contains('key-capslock--active') || event.shiftKey === true) {
      stringValue += key.toUpperCase();
    } else {
      stringValue += key.toLowerCase();
    }
  }

  textarea.value += stringValue;

  if (textarea.value !== '') {
    textarea.classList.add('text-field--active');
  } else {
    textarea.classList.remove('text-field--active');
  }
})

document.addEventListener('keyup', () => {
  buttons.forEach(btn => btn.classList.remove('key--active'));
})

keyboard.addEventListener('click', event => {
  const { target } = event;

  if (target.classList.contains('key')) {
    const text = target.textContent;
    const data = target.dataset.code;

    if (data === 'Backspace') {
      textarea.value = textarea.value.slice(0, textarea.value.length - 1);
    }
    if (text) {
      if (!(doNothingKeys.includes(data))) {
        if (caps.classList.contains('key-capslock--active') || event.shiftKey === true) {
          textarea.value += text.toUpperCase();
        } else {
          textarea.value += text.toLowerCase();
        }
      }
    }
  }

  if (textarea.value !== '') {
    textarea.classList.add('text-field--active');
  } else {
    textarea.classList.remove('text-field--active');
  }
})
