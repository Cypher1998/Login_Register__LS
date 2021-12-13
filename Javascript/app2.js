// import person class
import Person from './app3.js';

// import storage function
import { Storage, showMessage, congrats } from './app3.js';

// Register form DOM variables
const firstName = document.getElementById('fname');
const lastName = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confPassword = document.getElementById('confirm-password');
const phone = document.getElementById('phone');
const checkbox = document.getElementById('checkbox');
const registerBtn = document.querySelector('#register');

// check first name
function validatefName() {
  const regex = /^[a-zA-Z]{2,}$/;

  if (firstName.value === '') {
    firstName.classList.remove('input-border');
    document.querySelector('.invalid.fname').style.display = 'none';
  } else if (!regex.test(firstName.value)) {
    firstName.classList.add('input-border');
    document.querySelector('.invalid.fname').style.display = 'block';
  } else {
    firstName.classList.remove('input-border');
    document.querySelector('.invalid.fname').style.display = 'none';
  }
}

// check last name
function validatelName() {
  const regex = /^[a-zA-Z]{2,}$/;

  if (lastName.value === '') {
    lastName.classList.remove('input-border');
    document.querySelector('.invalid.lname').style.display = 'none';
  } else if (!regex.test(lastName.value)) {
    lastName.classList.add('input-border');
    document.querySelector('.invalid.lname').style.display = 'block';
  } else {
    lastName.classList.remove('input-border');
    document.querySelector('.invalid.lname').style.display = 'none';
  }
}

// validate email
function validateEmail() {
  const regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if (email.value === '') {
    email.classList.remove('input-border');
    document.querySelector('.invalid.email').style.display = 'none';
  } else if (!regex.test(email.value)) {
    email.classList.add('input-border');
    document.querySelector('.invalid.email').style.display = 'block';
  } else {
    email.classList.remove('input-border');
    document.querySelector('.invalid.email').style.display = 'none';
  }
}

// valid number format
function validatePhone() {
  const regex = /\(?\+?\d{3}\)?[- ]?\d{2,6}[- ]?\d{3,6}[- ]?\d{3,}$/;

  if (phone.value === '') {
    phone.classList.remove('input-border');
    document.querySelector('.invalid.number').style.display = 'none';
  } else if (!regex.test(phone.value)) {
    phone.classList.add('input-border');
    document.querySelector('.invalid.number').style.display = 'block';
  } else {
    phone.classList.remove('input-border');
    document.querySelector('.invalid.number').style.display = 'none';
  }
}

// check password
function validatePassword() {
  const regex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!.@#$%^&*? '"])[a-zA-Z0-9!.@#$%^&*? '"]{8,}$/;

  if (password.value === '') {
    password.classList.remove('input-border');
    document.querySelector('.invalid.pword').style.display = 'none';
  } else if (!regex.test(password.value)) {
    password.classList.add('input-border');
    document.querySelector('.invalid.pword').style.display = 'block';
  } else {
    password.classList.remove('input-border');
    document.querySelector('.invalid.pword').style.display = 'none';
  }
}

// validate password
function validatePasswordTwo() {
  if (confPassword.value !== password.value) {
    confPassword.classList.add('input-border');
    document.querySelector('.invalid.conf-pword').style.display = 'block';
  } else {
    confPassword.classList.remove('input-border');
    document.querySelector('.invalid.conf-pword').style.display = 'none';
  }
}

// events that validate all input fields
if ((firstName, lastName, password, email, phone, confPassword)) {
  firstName.addEventListener('keyup', validatefName);
  lastName.addEventListener('keyup', validatelName);
  password.addEventListener('keyup', validatePassword);
  email.addEventListener('keyup', validateEmail);
  phone.addEventListener('keyup', validatePhone);
  confPassword.addEventListener('keyup', validatePasswordTwo);
}

// check if checkbox is in the html
if (checkbox) {
  // toggle error details on checkbox
  checkbox.addEventListener('click', function () {
    if (checkbox.checked === true) {
      document.querySelector('.invalid-terms').style.display = 'none';
    } else if (checkbox.checked === false) {
      document.querySelector('.invalid-terms').style.display = 'block';
    }
  });

  // register button event
  registerBtn.addEventListener('click', function (e) {
    if (
      checkbox.checked === false ||
      firstName.value === '' ||
      lastName.value === '' ||
      phone.value === '' ||
      confPassword.value === '' ||
      email.value === '' ||
      password.value === ''
    ) {
      // set alert
      showMessage('Fields cannot be empty', 'text-center alert alert-danger');
    } else if (
      document.querySelector('.invalid.fname').style.display === 'block' ||
      document.querySelector('.invalid.lname').style.display === 'block' ||
      document.querySelector('.invalid.email').style.display === 'block' ||
      document.querySelector('.invalid.number').style.display === 'block' ||
      document.querySelector('.invalid.pword').style.display === 'block' ||
      document.querySelector('.invalid.conf-pword').style.display === 'block'
    ) {
      showMessage('Treat the Errors!', ' text-center alert alert-danger');
    } else {
      //
      const customers = Storage.getItems();
      // check array is email exists already
      const userLogin = customers.find((customer) => {
        return customer.email === email.value;
      });
      // if user already exists
      if (userLogin !== undefined) {
        showMessage(
          'Registration failed. Email already exists!',
          'text-center alert alert-danger'
        );
      } else {
        // if no user
        const firstname = firstName.value;
        const lastname = lastName.value;
        const myEmail = email.value;
        const number = phone.value;
        const pasword = password.value;

        const persons = Storage.getItems();
        // create user ID
        let ID;
        if (persons.length > 0) {
          ID = persons[persons.length - 1].id + 1;
        } else {
          ID = 10001;
        }

        // instantiate person class
        const person = new Person(
          ID,
          firstname,
          lastname,
          myEmail,
          number,
          pasword
        );

        persons.push(person);
        Storage.storeItems(person);

        showMessage(
          'Registration successful',
          'text-center alert alert-success'
        );
        setTimeout(function () {
          // clear input fields
          clearRegisterFields();
        }, 2000);

        setTimeout(function () {
          // show congratulatory message
          congrats();
        }, 3000);
      }
    }

    e.preventDefault();
  });
}

// function that clear input fields in register form
function clearRegisterFields() {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  password.value = '';
  confPassword.value = '';
  phone.value = '';
}

// get hide/show buttons from Register DOM
const buttonOne = document.getElementById('button-one');
const buttonTwo = document.getElementById('button-two');

// event that hide/show password in register form
if (buttonOne) {
  buttonOne.addEventListener('click', function (e) {
    if (buttonOne.textContent === 'Show') {
      document.getElementById('password').type = 'text';
      buttonOne.textContent = 'Hide';
    } else if (buttonOne.textContent === 'Hide') {
      document.getElementById('password').type = 'password';
      buttonOne.textContent = 'Show';
    }
    e.preventDefault();
  });
}

if (buttonTwo) {
  buttonTwo.addEventListener('click', function (e) {
    if (buttonTwo.textContent === 'Show') {
      document.getElementById('confirm-password').type = 'text';
      buttonTwo.textContent = 'Hide';
    } else if (buttonTwo.textContent === 'Hide') {
      document.getElementById('confirm-password').type = 'password';
      buttonTwo.textContent = 'Show';
    }
    e.preventDefault();
  });
}

// Login form
const loginBtn = document.querySelector('#submit');

if (loginBtn) {
  loginBtn.addEventListener('click', function (e) {
    const emailLogin = document.getElementById('emailLogin').value;
    const passwordLogin = document.getElementById('passwordLogin').value;

    if (emailLogin === '' || passwordLogin === '') {
      showMessage('Fields cannot be empty', 'text-center alert alert-danger');
    } else {
      const customers = Storage.getItems();
      // check if user exists already
      const userLogin = customers.find((customer) => {
        return customer.email === emailLogin;
      });

      // if no user details exist
      if (userLogin === undefined) {
        showMessage(
          'Unrecognized user!!! Register as a new user',
          'text-center alert alert-danger'
        );
      } else {
        // check if user password match
        if (passwordLogin !== userLogin.password) {
          showMessage(
            'Incorrect password!!!',
            'text-center alert alert-danger'
          );
        } else {
          showMessage(
            'User login details are correct!',
            'text-center alert alert-success'
          );

          /* store current user in storage (to be used in DOM later) */
          const currentUser = userLogin;
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          setTimeout(function () {
            clearLoginFields();
          }, 2500);
          setTimeout(function () {
            window.location.href = '/HTML/webpage.html';
          }, 3500);
        }
      }
    }

    e.preventDefault();
  });
}

// function that clears login fields
function clearLoginFields() {
  emailLogin.value = '';
  passwordLogin.value = '';
}

const buttonThree = document.getElementById('button-three');

// event that hide/show password in login form
if (buttonThree) {
  buttonThree.addEventListener('click', function (e) {
    if (buttonThree.textContent === 'Show') {
      document.getElementById('passwordLogin').type = 'text';
      buttonThree.textContent = 'Hide';
    } else if (buttonThree.textContent === 'Hide') {
      document.getElementById('passwordLogin').type = 'password';
      buttonThree.textContent = 'Show';
    }

    e.preventDefault();
  });
}
