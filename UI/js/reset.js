const messageBox = document.getElementById("message-box");
const passwd1 = document.getElementById("password");
const passwd2 = document.getElementById("password2");
const btn = document.getElementById("form-button");

validate = value => {
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

btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (passwd1.value == "") {
        error(messageBox, "Please enter your password");

    } else if (passwd2.value == "") {
        error(messageBox, "Please confirm your password");
    } else if (passwd1.value != passwd2.value) {
        error(messageBox, "Password does not match!");
    } else {
        success(messageBox);
        setTimeout(() => {
            messageBox.style.display = "none";
        }, 15000);
        window.location.href = "../html/signin.html";
    }
});

success = element => {
    element.style.backgroundColor = "#a0db8e";
    element.innerHTML = `Password reset successful`;
    element.style.opacity = "1";
    element.style.display = "block";
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 5000);
};

error = (element, info) => {
    element.style.backgroundColor = "#ff5252";
    element.innerHTML = info == undefined ? `Password reset unsuccessful, Please check your details` : info;
    element.style.opacity = "1";
    element.style.display = "block";
    setTimeout(() => {
        messageBox.style.display = "none";
    }, 5000);
};