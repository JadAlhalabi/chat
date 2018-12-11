/* eslint-disable no-unused-vars */
import style from '../css/style.css';
/* eslint-enable no-unused-vars */

import password from './config';

function printmsg(printer, author, time, color) {
  const temp = document.getElementById('temp');
  const clone = document.importNode(temp.content.firstElementChild, true);
  clone.textContent = ` ${new Date(time).toString().substr(15, 6)} ${author}: ${printer}`;
  clone.style = `color: ${color}`;
  const paste = document.getElementById('paste');
  paste.appendChild(clone);
}

const connection = new WebSocket('ws://104.248.143.87:1337');
connection.onmessage = message => {
  const obj = JSON.parse(message.data);
  console.log(obj.data.text);
  console.log(obj);
  console.log(obj.data.time);

  if (obj.type === 'color') {
    const msg = document.getElementById('msg');
    msg.setAttribute('placeholder', 'Input message');
  }

  if (obj.type === 'history') {
    console.log(obj.data);
    const history = obj.data;
    history.forEach(element => {
      console.log(element.text);
      printmsg(element.text, element.author, element.time, element.color);
    });
  }
  if (obj.type === 'message') {
    printmsg(obj.data.text, obj.data.author, obj.data.time, obj.data.color);
  }
};

const btnEl = document.getElementById('btn');

const send_msg = event => {
  event.preventDefault();
  const textinput = document.getElementById('msg');
  const obj = {
    type: 'message',
    data: textinput.value,
    key: password
  };

  const JsonObj = JSON.stringify(obj);
  connection.send(JsonObj);
};

window.addEventListener('keydown', event => {
  if (event.code === `Enter`) {
    send_msg(event);
  }
});

btnEl.addEventListener('click', send_msg);
