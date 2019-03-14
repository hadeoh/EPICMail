const messageBox = document.getElementById('message-box');
const group = document.getElementById('name');
const add = document.getElementById('add');
const gMsg = document.getElementById('gMsg');
const btn = document.getElementById('sav1');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  
  if (group.value == '') {
    error(messageBox, 'Please enter your group title');
  
  } else if (add.value == '') {
    error(messageBox, 'Please enter emails/username here');
  
  } else if (gMsg.value == '') {
    error(messageBox, 'Please enter a description here');
    
  } else {
    success(messageBox);
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);

  }
});
  
const success = (element) => {
  element.style.backgroundColor = '#a0db8e';
  element.innerHTML = 'Group successfully created';
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