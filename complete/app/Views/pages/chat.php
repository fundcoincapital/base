<?= $this->extend("App\Views\home") ?>
<?= $this->section('main') ?>
<?= $this->section('javascript') ?>
<script src="/assets/js/socket.io.js?v=2.0.2"></script>
    <script type="text/javascript">
      var socket = io("https://expressiq.co", {
        withCredentials: false,
        extraHeaders: {
          "username": "<?php echo user_id();?>"
        }
      });
      
      const inboxPeople = document.querySelector(".inbox__people");
      const inputField = document.querySelector(".message_form__input");
      const messageForm = document.querySelector(".message_form");
      const messageBox = document.querySelector(".messages__history");
      const fallback = document.querySelector(".fallback");

      let userName = "";

      const newUserConnected = (user) => {
        userName = user || `User${Math.floor(Math.random() * 1000000)}`;
        socket.emit("new user", <?php echo user_id();?>);
        addToUsersBox(<?php echo user_id();?>);
      };

      const addToUsersBox = (userName) => {
        if ($('.'+userName+'-userlist').length > 0) {
          return;
        }

        const userBox = `
          <div class="chat_ib ${userName}-userlist">
            <h5>${userName}</h5>
          </div>
        `;
        inboxPeople.innerHTML += userBox;
      };

      const addNewMessage = ({ user, message }) => {
        const time = new Date();
        const formattedTime = time.toLocaleString("en-US", { hour: "numeric", minute: "numeric" });

        const receivedMsg = `
        <li class="list-group-item text-right border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                  
                  
                
            <div class="incoming__message">
              <div class="d-flex flex-column received__message">
                <h6 class="mb-3 text-sm">${message}</h6>
                <div class="message__info">
                  <span class="mb-2 text-xs message__author">${user}</span>
                  <span class="text-dark font-weight-bold ms-sm-2 time_date">${formattedTime}</span>
                </div>
              </div>
            </div>
        </li>
        `;

        const myMsg = `
        <li class="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                  
                  
                
            <div class="incoming__message">
              <div class="d-flex flex-column received__message">
                <h6 class="mb-3 text-sm">${message}</h6>
                <div class="message__info">
                  <span class="mb-2 text-xs message__author">${user}</span>
                  <span class="text-dark font-weight-bold ms-sm-2 time_date">${formattedTime}</span>
                </div>
              </div>
            </div>
        </li>`;

        if($("ul.messages__history li:first").length > 0){
          $("ul.messages__history li:first").before(user === userName ? myMsg : receivedMsg);
        }else{
          $("ul.messages__history").append(user === userName ? myMsg : receivedMsg);
        }
        
      };

      // new user is created so we generate nickname and emit event
      newUserConnected();

      messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!inputField.value) {
          return;
        }

        socket.emit("chat message", {
          message: inputField.value,
          nick: userName,
        });

        inputField.value = "";
      });

      inputField.addEventListener("keyup", () => {
        socket.emit("typing", {
          isTyping: inputField.value.length > 0,
          nick: userName,
        });
      });

      socket.on("new user", function (data) {
        data.map((user) => addToUsersBox(user));
      });

      socket.on("user disconnected", function (userName) {
        document.querySelector(`.${userName}-userlist`).remove();
      });

      socket.on("chat message", function (data) {
        addNewMessage({ user: "Administrator", message: data.message });
      });


      socket.on("typing", function (data) {
        const { isTyping, nick } = data;

        if (!isTyping) {
          fallback.innerHTML = "";
          return;
        }

        fallback.innerHTML = `<p>${nick} is typing...</p>`;
      });
</script>
<?= $this->endSection() ?>
    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-lg-8">
          <div class="row">
            <div class="col-xl-6 mb-xl-0 mb-4">
              <div class="card bg-transparent shadow-xl">
                <div class="overflow-hidden position-relative border-radius-xl" style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/card-visa.jpg');">
                  <span class="mask bg-gradient-dark"></span>
                  <div class="card-body position-relative z-index-1 p-3">
                    <i class="fas fa-wifi text-white p-2"></i>
                    <h5 class="text-white mt-4 mb-5 pb-2">4562&nbsp;&nbsp;&nbsp;1122&nbsp;&nbsp;&nbsp;4594&nbsp;&nbsp;&nbsp;7852</h5>
                    <div class="d-flex">
                      <div class="d-flex">
                        <div class="me-4">
                          <p class="text-white text-sm opacity-8 mb-0">Card Holder</p>
                          <h6 class="text-white mb-0">Jack Peterson</h6>
                        </div>
                        <div>
                          <p class="text-white text-sm opacity-8 mb-0">Expires</p>
                          <h6 class="text-white mb-0">11/22</h6>
                        </div>
                      </div>
                      <div class="ms-auto w-20 d-flex align-items-end justify-content-end">
                        <img class="w-60 mt-2" src="../assets/img/logos/mastercard.png" alt="logo">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-6">
              <div class="row">
                <div class="col-md-6">
                  <div class="card">
                    <div class="card-header mx-4 p-3 text-center">
                      <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                        <i class="fas fa-landmark opacity-10"></i>
                      </div>
                    </div>
                    <div class="card-body pt-0 p-3 text-center">
                      <h6 class="text-center mb-0">Offer</h6>
                      <span class="text-xs">Offer Number</span>
                      <hr class="horizontal dark my-3">
                      <h5 class="mb-0">+2000</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mt-md-0 mt-4">
                  <div class="card">
                    <div class="card-header mx-4 p-3 text-center">
                      <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                        <i class="fab fa-paypal opacity-10"></i>
                      </div>
                    </div>
                    <div class="card-body pt-0 p-3 text-center">
                      <h6 class="text-center mb-0">Total</h6>
                      <span class="text-xs">Total Work</span>
                      <hr class="horizontal dark my-3">
                      <h5 class="mb-0">$455.00</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12 mb-lg-0 mb-4">
              <div class="card mt-4">
                <div class="card-header pb-0 p-3">
                  <div class="row">
                    <div class="col-6 d-flex align-items-center">
                      <h6 class="mb-0">Best Offer</h6>
                    </div>
                    <div class="col-6 text-end">
                      <a class="btn bg-gradient-dark mb-0" href="javascript:;"><i class="fas fa-plus"></i>&nbsp;&nbsp;Add New Card</a>
                    </div>
                  </div>
                </div>
                <div class="card-body p-3">
                  <div class="row">
                    <div class="col-md-6 mb-md-0 mb-4">
                      <div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                        <img class="w-10 me-3 mb-0" src="../assets/img/logos/mastercard.png" alt="logo">
                        <h6 class="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852</h6>
                        <i class="fas fa-pencil-alt ms-auto text-dark cursor-pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Card"></i>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
                        <img class="w-10 me-3 mb-0" src="../assets/img/logos/visa.png" alt="logo">
                        <h6 class="mb-0">****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;5248</h6>
                        <i class="fas fa-pencil-alt ms-auto text-dark cursor-pointer" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Card"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card h-100">
            <div class="card-header pb-0 p-3">
              <div class="row">
                <div class="col-6 d-flex align-items-center">
                  <h6 class="mb-0">Test Offer</h6>
                </div>
                <div class="col-6 text-end">
                  <button class="btn btn-outline-primary btn-sm mb-0">View All</button>
                </div>
              </div>
            </div>
            <div class="card-body p-3 pb-0">
              <ul class="list-group">
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div class="d-flex flex-column">
                    <h6 class="mb-1 text-dark font-weight-bold text-sm">March, 01, 2020</h6>
                    <span class="text-xs">#MS-415646</span>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    $180
                    <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fas fa-file-pdf text-lg me-1"></i> PDF</button>
                  </div>
                </li>
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div class="d-flex flex-column">
                    <h6 class="text-dark mb-1 font-weight-bold text-sm">February, 10, 2021</h6>
                    <span class="text-xs">#RV-126749</span>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    $250
                    <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fas fa-file-pdf text-lg me-1"></i> PDF</button>
                  </div>
                </li>
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div class="d-flex flex-column">
                    <h6 class="text-dark mb-1 font-weight-bold text-sm">April, 05, 2020</h6>
                    <span class="text-xs">#FB-212562</span>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    $560
                    <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fas fa-file-pdf text-lg me-1"></i> PDF</button>
                  </div>
                </li>
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div class="d-flex flex-column">
                    <h6 class="text-dark mb-1 font-weight-bold text-sm">June, 25, 2019</h6>
                    <span class="text-xs">#QW-103578</span>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    $120
                    <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fas fa-file-pdf text-lg me-1"></i> PDF</button>
                  </div>
                </li>
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 border-radius-lg">
                  <div class="d-flex flex-column">
                    <h6 class="text-dark mb-1 font-weight-bold text-sm">March, 01, 2019</h6>
                    <span class="text-xs">#AR-803481</span>
                  </div>
                  <div class="d-flex align-items-center text-sm">
                    $300
                    <button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4"><i class="fas fa-file-pdf text-lg me-1"></i> PDF</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-0" style="display: none;">
          <div class="inbox">
            <div class="inbox__people">
              <h4>Active users</h4>
            </div>
            
          </div>
        </div>
        <div class="col-md-7 mt-4">
          <div class="card">
            <div class="card-header pb-0 px-3">
              <h6 class="mb-0">Chat's</h6>
            </div>
            <div class="card-body pt-4 p-3">
              <div class="inbox__messages" style="height:300px; overflow-y: auto;">
                <ul class="messages__history list-group"></ul>
                <div class=""></div>
                
              </div>
              <div class="fallback"></div>
              
              <form class="message_form">
                <div class="input-group">
                  <input type="text" class="message_form__input form-control input-sm" placeholder="Enter Msg">
                  <button class="btn btn-lg btn-secondary message_form__button" type="submit" id="button-addon2">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-5 mt-4">
          <div class="card h-100 mb-4">
            <div class="card-header pb-0 px-3">
              <div class="row">
                <div class="col-md-6">
                  <h6 class="mb-0">Leading (All member)</h6>
                </div>
                <div class="col-md-6 d-flex justify-content-end align-items-center">
                  <i class="far fa-calendar-alt me-2"></i>
                  <small>23 - 30 March 2020</small>
                </div>
              </div>
            </div>
            <div class="card-body pt-4 p-3">
              <h6 class="text-uppercase text-body text-xs font-weight-bolder mb-3">Newest</h6>
              <ul class="list-group">
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div class="d-flex align-items-center">
                    <button class="btn btn-icon-only btn-rounded btn-outline-danger mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-down"></i></button>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">Netflix</h6>
                      <span class="text-xs">27 March 2020, at 12:30 PM</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center text-danger text-gradient text-sm font-weight-bold">
                    - $ 2,500
                  </div>
                </li>
                
              </ul>
              
            </div>
          </div>
        </div>
      </div>
     
    </div>
  
<?= $this->endSection() ?>