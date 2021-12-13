// State pattern
function PageState() {
  this.currentState = new HomeState();

  this.init = function () {
    this.change(new HomeState());
  };
  this.change = function (state) {
    this.currentState = state;
  };
}

// paint Homepage
const HomeState = function () {
  document.querySelector('.header').innerHTML = `
    <div class="text-center mt-4 mb-3">
      <h1>WELCOME TO OUR WEBSITE</h1>
      <span class="lead mb-5 text-success">Let's get you started.</span>
    </div>
  `;

  document.querySelector('.body').innerHTML = `
    <p class="lead p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui necessitatibus impedit, commodi ipsam vel est tempore animi numquam, in minima soluta magni fugit ab repellat sunt minus enim maiores omnis!</p>
    <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui necessitatibus impedit, commodi ipsam vel est tempore animi numquam, in minima soluta magni fugit ab repellat sunt minus enim maiores omnis!</p>
    <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui necessitatibus impedit, commodi ipsam vel est tempore animi numquam, in minima soluta magni fugit ab repellat sunt minus enim maiores omnis!</p>
  `;

  document.querySelector('.buttons').innerHTML = `
    <div class="text-center">
      <a href="HTML/login.html" class="btn btn-info btn-lg m-2">LOGIN</a>
      <a href="HTML/register.html" class="btn btn-danger btn-lg m-2 register-me">REGISTER</a>
    </div>
  `;
};

// paint about page
const AboutState = function () {
  document.querySelector('.header').innerHTML = `
    <div class="text-center mt-4 mb-3">
      <h1 class="text-primary">ABOUT US</h1>
      <span class="lead mb-5 text-success">We aim for the best.</span>
    </div>
  `;
  document.querySelector('.body').innerHTML = `
    <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui necessitatibus impedit, commodi ipsam vel est tempore animi numquam, in minima soluta magni fugit ab repellat sunt minus enim maiores omnis!</p>
    <p class="lead">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui necessitatibus impedit, commodi ipsam vel est tempore animi numquam</p>
  `;

  document.querySelector('.buttons').textContent = null;
};

// paint FAQ page
const QuestionState = function () {
  document.querySelector('.header').innerHTML = `
    <h1 class="text-center m-3">Frequently Asked Questions</h1> 
  `;
  document.querySelector('.body').innerHTML = `
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Question One
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores praesentium asperiores alias omnis beatae tempora exercitationem officia odit mollitia earum assumenda repudiandae in eligendi possimus voluptatum, esse officiis quaerat explicabo?</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            Question Two
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores praesentium asperiores alias omnis beatae tempora exercitationem officia odit mollitia earum assumenda repudiandae.</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingThree">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            Question Three
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingFour">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
            Question Four
          </button>
        </h2>
        <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFOur" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the fourth item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="flush-headingFive">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
            Question Five
          </button>
        </h2>
        <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the fifth item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
        </div>
      </div>
    </div>
  `;

  document.querySelector('.buttons').textContent = null;
};

const page = new PageState();
page.init();

// homepage event
document.getElementById('home').addEventListener('click', function () {
  page.change(new HomeState());
});

// about page event
document.getElementById('about').addEventListener('click', function () {
  page.change(new AboutState());
});

// faq page event
document.getElementById('faq').addEventListener('click', function () {
  page.change(new QuestionState());
});
