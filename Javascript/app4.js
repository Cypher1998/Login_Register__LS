import Person from './app3.js';

import { logUpdMessage } from './app3.js';

// get userLogin from LS
const currentUser = JSON.parse(localStorage.getItem('currentUser'));

// check if user is signed in

if (currentUser === null) {
  document.getElementById('logout').setAttribute('href', '#');
  document.getElementById('logout').addEventListener('click', function () {
    // alert('Please Login!');
    console.log('alert');
  });

  // document.querySelector('.username').textContent = 'GuestUser';
  document.querySelector('main').innerHTML = `
      <div class="text-center mt-5">
        <h3 class="text-center text-danger pt-5">
          You have been logged out from your account. You have to login again.
        </h3>
        <a type="button" href="/HTML/login.html" class="btn btn-danger btn-lg mt-2">LOGIN</a>
      </div>
      
    `;
} else if (currentUser !== null) {
  if (document.querySelector('.username')) {
    document.querySelector(
      '.username'
    ).textContent = `${currentUser.firstName}`;
  }

  // set a var to today(hrs)
  const today = new Date().getHours();

  // check time of the day and display in UI
  if (document.querySelector('.time')) {
    if (today > -1 && today < 12) {
      document.querySelector('.time').textContent = 'Good Morning';
    } else if (today >= 12 && today < 17) {
      document.querySelector('.time').textContent = 'Good Afternoon';
    } else if (today >= 17 && today <= 23) {
      document.querySelector('.time').textContent = 'Good Evening';
    }
  }

  // logout button event
  document.getElementById('logout').addEventListener('click', function () {
    if (confirm('Do you want to logout?')) {
      logUpdMessage('Logout success', 'text-center alert-logupd alert-success');
    }
    localStorage.removeItem('currentUser');
  });

  // paint user profile in DOM
  if (document.querySelector('.user-details')) {
    document.querySelector('.user-details').innerHTML = `
      <div>
        <h1 class="text-center text-info mb-4">My Profile</h1>
        <p class="lead bg-dark mb-3 p-2 text-light">UserId - DS${currentUser.id}</p>
        <div class="mb-3">
          <label class="form-label">First Name</label>
          <input type="text" class="form-control" value="${currentUser.firstName}" id="user-fname" disabled/>
        </div>
        <div class="mb-3">
          <label class="form-label">Last Name</label>
          <input type="text" class="form-control" value="${currentUser.lastName}" id="user-lname" disabled/>
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="text" class="form-control" value="${currentUser.email}" id="user-email" disabled/>
          <p class="text-danger user-email-info">Email cannot be changed!</small>
        </div>
        <div class="mb-3">
          <label class="form-label">Phone Number</label>
          <input type="text" class="form-control" value="${currentUser.phone}" id="user-phone" disabled/>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="text" class="form-control" value="${currentUser.password}" id="user-pword" disabled/>
          <small class="invalid pword">Invalid password pattern</small>
        </div>
      </div>
    `;
  }

  const editBtn = document.querySelector('.edit');
  const updateBtn = document.querySelector('.update');
  const backBtn = document.querySelector('.back');

  // hide update and back buttons by default
  function defaultState() {
    updateBtn.style.display = 'none';
    backBtn.style.display = 'none';
    editBtn.style.display = 'block';
  }

  document.addEventListener('DOMContentLoaded', function () {
    if ((updateBtn, backBtn)) {
      defaultState();
    }
  });

  // function that show update and back button
  function editState() {
    updateBtn.style.display = 'inline';
    backBtn.style.display = 'inline';
    editBtn.style.display = 'none';
  }

  const fname = document.getElementById('user-fname');
  const lname = document.getElementById('user-lname');
  const phone = document.getElementById('user-phone');
  const password = document.getElementById('user-pword');
  const email = document.getElementById('user-email');

  // edit button event
  if (editBtn) {
    editBtn.addEventListener('click', function (e) {
      // enable input fields
      fname.disabled = false;
      lname.disabled = false;
      phone.disabled = false;
      password.disabled = false;

      // show email info
      document.querySelector('.user-email-info').style.display = 'block';

      // show update and back button
      editState();

      e.preventDefault();
    });
  }

  // back button event
  if (backBtn) {
    backBtn.addEventListener('click', function (e) {
      // disable input fields
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => {
        input.disabled = true;
      });

      defaultState();

      document.querySelector('.user-email-info').style.display = 'none';
      e.preventDefault();
    });
  }

  // update button event
  if (updateBtn) {
    updateBtn.addEventListener('click', function (e) {
      // set old values to new values
      const userFname = fname.value;
      const userLname = lname.value;
      const userEmail = email.value;
      const userPhone = phone.value;
      const userPword = password.value;
      const id = currentUser.id;

      // validate password pattern
      const regex =
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!.@#$%^&*? '"])[a-zA-Z0-9!.@#$%^&*? '"]{8,}$/;

      if (!regex.test(userPword)) {
        document.querySelector('.invalid.pword').style.display = 'block';
        setTimeout(() => {
          document.querySelector('.invalid.pword').style.display = 'none';
        }, 3000);
      } else {
        document.querySelector('.invalid.pword').style.display = 'none';
        // instantiate new person to new values
        const person = new Person(
          id,
          userFname,
          userLname,
          userEmail,
          userPhone,
          userPword
        );

        const users = JSON.parse(localStorage.getItem('users'));

        // replace old details with new details in LS
        users.forEach((user, index) => {
          if (user.id === person.id) {
            users.splice(index, 1, person);
          }
        });

        //
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(person));

        logUpdMessage(
          'Profile Update Successful!',
          'text-center alert-logupd alert-success'
        );

        // set profile back to default
        setTimeout(function () {
          fname.disabled = true;
          lname.disabled = true;
          phone.disabled = true;
          password.disabled = true;

          document.querySelector('.user-email-info').style.display = 'none';

          defaultState();
        }, 500);
      }

      e.preventDefault();
    });
  }
}
