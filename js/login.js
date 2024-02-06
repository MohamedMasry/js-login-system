////// Form Animation
const signUpBtn = document.getElementById('signUp');
const registerBtn = document.getElementById('registerBtn');
const signInBtn = document.getElementById('signIn');
const loginBtn = document.getElementById('loginBtn');
const container = document.getElementById('login-container');
const title = document.querySelector('title');


function registerForm() {
	container.classList.add("right-panel-active");
	title.innerHTML = 'Register - Mohamed Essam Ahmed';
}

function loginForm() {
	container.classList.remove("right-panel-active");
	title.innerHTML = 'Login - Mohamed Essam Ahmed';
}

signUpBtn.addEventListener('click', () => {
	registerForm();
});


signInBtn.addEventListener('click', () => {
	loginForm();
});

const nameSignup = document.getElementById('nameSignUp');
var genderSignUp = undefined;
const emailSignUp = document.getElementById('emailSignUp');
const passwordSignUp = document.getElementById('passwordSignUp');
const conPassSignUp = document.getElementById('conPassSignUp');

const emailSignIn = document.getElementById('emailSignIn');
const passwordSignIn = document.getElementById('passwordSignIn');

var account;
var accountsBase = [];
var accountsList = [];

if (localStorage.getItem("accounts") != null) {
	accountsList = JSON.parse(localStorage.getItem("accounts"));
}

if (localStorage.getItem("is-Logged") == null || localStorage.getItem("is-Logged") == null) {
	localStorage.setItem("is-Logged", "false");
	localStorage.setItem("stay-Logged", "false");
}

////// Validation
var nameRegex = /^(?:([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]{2,10}(?:\s([\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]{3,11}|[A-Z][\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]{2,10})){0,2})|([A-Z][A-Za-z]{2,10}(?:\s([a-z]{3,11}|[A-Z][a-z]{2,10})){0,2}))$/u;
var emailRegex = /^([\w.-]{3,20}|[\w.-]+@[\w.-]+\.[\w.-]+)$/;
var passwordRegex = /^(?=.{8,20}$)[a-zA-Z0-9!@#$%^&*()_+{}|:<>?.-]{8,20}$/;

var signUpError = new bootstrap.Modal(document.getElementById('signUpErrorModal'));
var duplicateError = new bootstrap.Modal(document.getElementById('duplicateErrorModal'));
var signUpSuccess = new bootstrap.Modal(document.getElementById('signUpSuccessModal'));

var emptyError = new bootstrap.Modal(document.getElementById('emptyErrorModal'));
var signInError = new bootstrap.Modal(document.getElementById('incorrectErrorModal'));
var signInSuccess = new bootstrap.Modal(document.getElementById('signInSuccessModal'));

var nameValid;
var emailValid;
var passwordValid;
var conPassValid;

// name validation
nameSignup.addEventListener("keyup", function () {
	nameValid = nameRegex.test(nameSignup.value);
	if (!nameValid) {
		nameSignup.classList.remove("is-valid")
		nameSignup.classList.add("is-invalid")
		nameSignupInvalid.classList.remove("d-none")
	}
	else {
		nameSignup.classList.remove("is-invalid")
		nameSignup.classList.add("is-valid")
		nameSignupInvalid.classList.add("d-none")
	}
})
// email validation
emailSignUp.addEventListener("keyup", function () {
	emailValid = emailRegex.test(emailSignUp.value);
	if (!emailValid) {
		emailSignUp.classList.remove("is-valid")
		emailSignUp.classList.add("is-invalid")
		emailSignUpInvalid.classList.remove("d-none")
	}
	else {
		emailSignUp.classList.remove("is-invalid")
		emailSignUp.classList.add("is-valid")
		emailSignUpInvalid.classList.add("d-none")
	}
})
// password validation
passwordSignUp.addEventListener("keyup", function () {
	passwordValid = passwordRegex.test(passwordSignUp.value);
	if (!passwordValid) {
		passwordSignUp.classList.remove("is-valid")
		passwordSignUp.classList.add("is-invalid")
		passwordSignUpInvalid.classList.remove("d-none")
	}
	else {
		passwordSignUp.classList.remove("is-invalid")
		passwordSignUp.classList.add("is-valid")
		passwordSignUpInvalid.classList.add("d-none")
	}
})
// confirm password validation
conPassSignUp.addEventListener("keyup", function () {
	conPassValid = conPassSignUp.value == passwordSignUp.value;
	if (!conPassValid) {
		conPassSignUp.classList.remove("is-valid")
		conPassSignUp.classList.add("is-invalid")
		conPassSignUpInvalid.classList.remove("d-none")
	}
	else {
		conPassSignUp.classList.remove("is-invalid")
		conPassSignUp.classList.add("is-valid")
		conPassSignUpInvalid.classList.add("d-none")
	}
})
// validation clear func after the signup
function accountValid() {
	nameSignup.classList.remove("is-valid")
	nameSignupInvalid.classList.add("d-none")

	emailSignUp.classList.remove("is-valid")
	emailSignUpInvalid.classList.add("d-none")

	passwordSignUp.classList.remove("is-valid")
	passwordSignUpInvalid.classList.add("d-none")

	conPassSignUp.classList.remove("is-valid")
	conPassSignUpInvalid.classList.add("d-none")

	genderInvalid.classList.add("d-none")
}

////// Adding Func and event
function addAccount() {
	accountsBase.push(account);
	localStorage.setItem("accounts", JSON.stringify(accountsBase))
	loginForm();
}


registerBtn.addEventListener("click", function () {
	//takes the values in the click's time

	genderSignUp = document.querySelector('input[name="gender"]:checked');
	nameValid = nameRegex.test(nameSignup.value);
	emailValid = emailRegex.test(emailSignUp.value);
	passwordValid = passwordRegex.test(passwordSignUp.value);
	conPassValid = conPassSignUp.value == passwordSignUp.value;

	if (!nameValid || !emailValid || !passwordValid || !conPassValid) {
		signUpError.toggle();
		setTimeout(() => {
			signUpError.hide();
		}, 8000)

	}
	else if (nameValid == "" || emailValid == "" || passwordValid == "" || conPassValid == "") {
		signUpError.toggle();
		setTimeout(() => {
			signUpError.hide();
		}, 8000)

	}
	else if (genderSignUp == null) {
		genderInvalid.classList.remove("d-none")
	}
	else {
		accountValid()

		account = {
			name: nameSignup.value,
			gender: genderSignUp.value,
			email: emailSignUp.value.toLowerCase(),
			password: passwordSignUp.value
		}

		//checkes if this is the first account
		if (accountsList == null || localStorage.getItem("accounts") == null) {

			signUpSuccess.toggle();
			setTimeout(() => {
				signUpSuccess.hide();
			}, 2000)

			addAccount()
			clearSignUp()
		}
		else {
			//checks if the account is already registered or not
			var dupEmail = accountsList.find(userEmail => userEmail.email == emailSignUp.value.toLowerCase());
			if (dupEmail != undefined) {
				duplicateError.toggle();
				setTimeout(() => {
					duplicateError.hide();
				}, 3000)
			}
			else {
				signUpSuccess.toggle();
				setTimeout(() => {
					signUpSuccess.hide();
				}, 2000)
				addAccount()
				clearSignUp()
			}
		}

	}
	accountsList = JSON.parse(localStorage.getItem("accounts"));
})

////// Clearing  Funcs
function clearSignUp() {
	nameSignup.value = "";
	genderSignUp.checked = false;
	emailSignUp.value = "";
	passwordSignUp.value = "";
	conPassSignUp.value = "";
}

function clearSignIn() {
	passwordSignIn.value = "";
}

////// Login  Funcs

emailSignIn.addEventListener("keyup", function () {
	emailSignIn.classList.remove("is-invalid")
})
passwordSignIn.addEventListener("keyup", function () {
	passwordSignIn.classList.remove("is-invalid")
})

var incorrectMsg = document.querySelector("#incorrectErrorModal h4");

loginBtn.addEventListener("click", function () {

	var enteredEmail = emailSignIn.value.toLowerCase();
	var enteredPassword = passwordSignIn.value;
	var currentEmail = accountsList.find(userEmail => userEmail.email == enteredEmail);


	if (enteredEmail == "" || enteredPassword == "") {
		emptyError.toggle();
		setTimeout(() => {
			emptyError.hide();
		}, 3000)
		if (enteredEmail == "") {
			emailSignIn.classList.add("is-invalid")
		}
		if (enteredPassword == "") {
			passwordSignIn.classList.add("is-invalid")
		}
	}
	else if (currentEmail == undefined) {
		incorrectMsg.innerHTML = "the Email/Username you have entered is incorrect";
		signInError.toggle();
		setTimeout(() => {
			signInError.hide();
		}, 5000)
		emailSignIn.classList.add("is-invalid")
	}
	else if (currentEmail.password != enteredPassword) {
		incorrectMsg.innerHTML = "the Password you have entered is incorrect";
		signInError.toggle();
		setTimeout(() => {
			signInError.hide();
		}, 5000)
		passwordSignIn.classList.add("is-invalid")
	}
	else {

		if (document.getElementById("stayLoggedBtn").checked == true) {
			localStorage.setItem("stay-Logged", "true")
		}
		localStorage.setItem("is-Logged", "true")
		localStorage.setItem("currentLogin", JSON.stringify(currentEmail))
		signInSuccess.toggle();
		setTimeout(() => {
			signInSuccess.hide();
		}, 2000)

		setTimeout(() => {
			window.location.href = "home.html"
		}, 2000)
	}
})
