const messageBox = document.getElementById('message-box');
const email = document.getElementById('emailAddress');
const passwd1 = document.getElementById('password');
const btn = document.getElementById('form-button');

validate = (value) => {
  if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/.test(value)) {
    return true;
  } else {
    return false;
  }
};

submitForm = () => {

  if (validate(messageBox.value)) {
    success(result);
  } else {
    error(result);
  }
};


btn.addEventListener('click', (e) => {
  e.preventDefault();

  if (email.value == '') {
    error(messageBox, 'Please enter your email address');

  } else if (passwd1.value == '') {
    error(messageBox, 'Please enter your password');

  } else {
    success(messageBox);
    setTimeout(() => {
      messageBox.style.display = 'none';
    }, 5000);
  window.location.href = "../html/inbox.html";
  }
});

const success = (element) => {
  element.style.backgroundColor = '#a0db8e';
  element.innerHTML = 'Login successful';
  element.style.opacity = '1';
  element.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 5000);
};

const error = (element, info) => {
  element.style.backgroundColor = '#ff5252';
  element.innerHTML = info == undefined ? 'Login unsuccessful, Please check your details' : info;
  element.style.opacity = '1';
  element.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
  }, 5000);
};
