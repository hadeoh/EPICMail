const messageBox = document.getElementById('message-box');
const email = document.getElementById('email');
const sub = document.getElementById('sub');
const msg = document.getElementById('msg');
const btn = document.getElementById('snd');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (email.value == '') {
    error(messageBox, 'Please enter an email address');
  
  } else if (sub.value == '') {
    error(messageBox, 'Please enter subject of the message');
  
  } else if (msg.value == '') {
    error(messageBox, 'Please fill in the message field');
    
  } else {
    success(messageBox);
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);

  }
});
  
const success = (element) => {
  element.style.backgroundColor = '#a0db8e';
  element.innerHTML = 'Message sent successfully';
  element.style.opacity = '1';
  element.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 5000);
};
  
const error = (element, info) => {
  element.style.backgroundColor = '#ff5252';
  element.innerHTML = info == undefined ? 'Please check your details' : info;
  element.style.opacity = '1';
  element.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 5000);
};