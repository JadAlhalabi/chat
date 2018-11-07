/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */
// TODO: Skriva ut meddelanden
// TODO: Kunna välja ett användernamn
// TODO: Chatt user interface (html, css)
// TODO: Skicka meddelander med enter
// TODO: Läsa in chatt historik
// TODO: Användare ska ha olika färger
// TODO: Man ska kunna se vem som skicka ett meddelande
// TODO: Kunna se vilken tid ett meddelande skickades
// TODO: Enklare dokumentation
import password from './config';

const connection = new WebSocket('ws://104.248.143.87:1337');
connection.onmessage = message => {
  const obj = JSON.parse(message.data);
  console.log(obj.data.text);
  const temp = document.getElementById('temp');
  const clone = document.importNode(temp.content.firstElementChild, true);
  clone.textContent = obj.data.text;
  const paste = document.getElementById('paste');
  paste.appendChild(clone);
};

const btnEl = document.getElementById('btn');
btnEl.addEventListener('click', event => {
  event.preventDefault();
  const textinput = document.getElementById('msg');
  const obj = {
    type: 'Message',
    data: textinput.value,
    key: password
  };
  const JsonObj = JSON.stringify(obj);
  connection.send(JsonObj);
});
