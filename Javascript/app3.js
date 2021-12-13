// MODULE FILE
export default class Person {
  constructor(id, firstName, lastName, email, phone, password) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }
}

export const Storage = (function () {
  return {
    storeItems: function (user) {
      let users;
      if (localStorage.getItem('users') === null) {
        users = [];
      } else {
        users = JSON.parse(localStorage.getItem('users'));
      }

      users.push(user);

      localStorage.setItem('users', JSON.stringify(users));
    },

    getItems: function () {
      let users;
      if (localStorage.getItem('users') === null) {
        users = [];
      } else {
        users = JSON.parse(localStorage.getItem('users'));
      }

      return users;
    },
  };
})();

const form = document.querySelector('.form');

// function that display alerts (Login, Register)
export function showMessage(message, className) {
  const div = document.createElement('div');
  div.className = className;
  div.append(document.createTextNode(message));

  form.insertAdjacentElement('beforebegin', div);

  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);
}

export function logUpdMessage(message, className) {
  const div = document.createElement('div');
  div.className = className;
  div.append(document.createTextNode(message));

  form.insertAdjacentElement('afterend', div);

  setTimeout(function () {
    document.querySelector('.alert-logupd').remove();
  }, 3000);
}

export function congrats() {
  document.querySelector('.congratulation').innerHTML = `
  <div class="text-center mt-5">
    <h2>Congratulations, you have successfully registered on our site.</h2>
    <p class="lead">You can now login to see the full functionality of the website</p>
    <a href="login.html" type="button" class="btn btn-primary">LOGIN</a>
  </div>
`;
}
