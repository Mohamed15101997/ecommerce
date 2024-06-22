document.addEventListener("DOMContentLoaded", () => {
    toggleForm("login");
});

function toggleForm(formType) {
    // console.log("in toggle form function " + formType);

    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    if (formType === "login") {
        loginForm.classList.add("active");
        registerForm.classList.remove("active");
    } else {
        loginForm.classList.remove("active");
        registerForm.classList.add("active");
    }
}

function verifyUserName(usename) {
    const regex = /^([a-zA-Z]{3,10})(\s+[a-zA-Z]{3,10}){0,2}$/;
    return regex.test(usename);
}

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
}

function showError(message, form) {
    const errorElement = document.getElementById(`${form}-error`);
    errorElement.textContent = message;
}

function register() {
    let email = document.getElementById("register-email").value;
    let username = document.getElementById("register-username").value;
    let password = document.getElementById("register-password").value;
    let confirmPassword = document.getElementById(
        "register-confirm-password"
    ).value;
    let id = new Date().getTime().toString();
    let role = document.getElementById("register-role").value;

    showError("", "register");

    if (!verifyUserName(username)) {
        showError(
            "The username must consist of one, two, or three words. The minimum number of letters per word is three letters, and the largest number is ten letters per word.",
            "register"
        );
        return;
    }

    if (!validateEmail(email)) {
        showError(
            'Email must be like this example "user@example.com"',
            "register"
        );
        return;
    }

    if (!validatePassword(password)) {
        showError(
            "Password must be at least 8 characters long, at least one uppercase letter, at least one lowercase letter, and at least one number",
            "register"
        );
        return;
    }

    if (password !== confirmPassword) {
        showError("Passwords do not match", "register");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((user) => user.email === email)) {
        showError("Email already exists", "register");
        return;
    }

    users.push({ username, email, password, role, id });
    localStorage.setItem("users", JSON.stringify(users));
    showError("Registration successful. Please login.", "register");
    setInterval(function () {
        toggleForm("login");
    }, 2000);
    // window.location.reload()
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    // showError('', 'login');
    if (!validateEmail(email)) {
        showError("Invalid email or password", "login");
        return;
    }

    if (!validatePassword(password)) {
        showError("Invalid email or password", "login");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
        (user) => user.email === email && user.password === password
    );
    if (!user) {
        showError(`Invalid email or password`, "login");
        return;
    }

    showError("", "login");
    localStorage.setItem("login-data", user.id);
    if (user.role == "0") {
        window.location.href = "index.html";
    } else {
        window.location.href = "dashboard.html";
    }
}

// Events
const registerLink = document.getElementById(`register-link`);
registerLink.addEventListener("mouseover", function () {
    registerLink.style.opacity = 0.5;
});
registerLink.addEventListener("mouseout", function () {
    registerLink.style.opacity = 1;
});

const loginLink = document.getElementById(`login-link`);
loginLink.addEventListener("mouseover", function () {
    loginLink.style.opacity = 0.5;
});
loginLink.addEventListener("mouseout", function () {
    loginLink.style.opacity = 1;
});
