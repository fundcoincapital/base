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

      socket.on("signal create", function (data) {
        
        var html = `<tr>
                      <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-icon-only btn-rounded btn-outline-${data.type == "buy" ? "info" : "danger"} mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-${data.type == "buy" ? "up" : "down"}"></i></button>
                            <div class="d-flex flex-column">
                              <h6 class="mb-1 text-dark text-sm">${data.symbol}</h6>
                              <span class="text-xs">${moment().format('D MMM, YYYY')}</span>
                            </div>
                          </div>
                          
                      </td>
                      <td>${data.open}</td>
                      <td>${data.sl}</td>
                      <td>${data.tp}</td>
                      <td>${moment().format('D MMM, YYYY')}</td>
                    </tr>`;
        if($("#tablesignal tbody tr").length > 0){
            $("#tablesignal tbody tr:first").before(html);
        }else{
          $("#tablesignal tbody").append(html);
        }
        const audio = new Audio("/assets/sound/qcodes_3.mp3" );
        audio.play();


      });
    socket.on("signal finish", function (data) {
        
        var html = `<li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div class="d-flex align-items-center">
                    <button class="btn btn-icon-only btn-rounded btn-outline-${data.type == "buy" ? "info" : "danger"}  mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-${data.type == "buy" ? "up" : "down"}"></i></button>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm">${data.symbol} ${data.type} [Open : ${data.open} - Sl : ${data.sl} - Close : ${data.close_at}]</h6>
                      <span class="text-xs">${moment().format('D MMM, YYYY')} - ${moment().format('D MMM, YYYY')}</span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center text-${data.profit_pip > 0  ? "info text-gradient" : (data.profit_pip < 0 ? "danger text-gradient" : "secondary")} text-sm font-weight-bold">
                    ${data.profit_pip > 0  ? "+" : (data.profit_pip < 0 ? "" : ":")} ${data.profit_pip} pip(s)
                  </div>
                </li>`;
        if($("#orderComplete ul li").length > 0){
            $("#orderComplete ul li:first").before(html);
        }else{
          $("#orderComplete ul").append(html);
        }
        const audio = new Audio("/assets/sound/qcodes_3.mp3" );
        audio.play();


      });

    (function(){
        setInterval(function(){
            var html =`<ins class="adsbygoogle" style="display:inline-block;width:100%;height:250px" data-ad-client="ca-pub-4099957745291159" data-ad-slot="1384479382"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});<\/script>`;
          $(".adsbygoogle").html(html);
        },600000);
    })();
    </script>

    
    <?= $this->endSection() ?>


    <div class="container-fluid py-4">
      <div class="row">
        <div class="col-lg-12">
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
                <div class="col-md-3">
                  <div class="card">
                    <div class="card-header mx-4 p-3 text-center">
                      <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                        <i class="fas fa-landmark opacity-10"></i>
                      </div>
                    </div>
                    <div class="card-body pt-0 p-3 text-center">
                      <h6 class="text-center mb-0">Signal</h6>
                      <span class="text-xs">Belong Interactive</span>
                      <hr class="horizontal dark my-3">
                      <h5 class="mb-0">+$2000</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 mt-md-0 mt-4">
                  <div class="card">
                    <div class="card-header mx-4 p-3 text-center">
                      <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                        <i class="fab fa-paypal opacity-10"></i>
                      </div>
                    </div>
                    <div class="card-body pt-0 p-3 text-center">
                      <h6 class="text-center mb-0">Win</h6>
                      <span class="text-xs">Freelance Payment</span>
                      <hr class="horizontal dark my-3">
                      <h5 class="mb-0">$455.00</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 mt-md-0 mt-4">
                  <div class="card">
                    <div class="card-header mx-4 p-3 text-center">
                      <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                        <i class="fab fa-paypal opacity-10"></i>
                      </div>
                    </div>
                    <div class="card-body pt-0 p-3 text-center">
                      <h6 class="text-center mb-0">Loss</h6>
                      <span class="text-xs">Freelance Payment</span>
                      <hr class="horizontal dark my-3">
                      <h5 class="mb-0">$455.00</h5>
                    </div>
                  </div>
                </div>
                <div class="col-md-3 mt-md-0 mt-4">
                  <div class="card">
                    <div class="card-header mx-4 p-3 text-center">
                      <div class="icon icon-shape icon-lg bg-gradient-primary shadow text-center border-radius-lg">
                        <i class="fab fa-paypal opacity-10"></i>
                      </div>
                    </div>
                    <div class="card-body pt-0 p-3 text-center">
                      <h6 class="text-center mb-0">USD</h6>
                      <span class="text-xs">Freelance Payment</span>
                      <hr class="horizontal dark my-3">
                      <h5 class="mb-0">$455.00</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
      <div class="row">
        <div class="col-md-7 mt-4">
          
          <div class="card">
            <div class="card-header pb-0 px-3">
              <h6 class="mb-0">Mã giao dịch</h6>
            </div>
            <div class="card-body px-0 pt-0 pb-2">
              <div class="table-responsive p-0">
                <table class="table align-items-center mb-0" id="tablesignal">
                  <thead>
                    <tr>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Symbol</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Open</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Stoploss</th>
                      <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Take Profit</th>
                      <th class="text-secondary opacity-7"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <?php foreach($data as $item){?>
                    <tr>
                      <td>
                        <div class="d-flex align-items-center">
                            <button class="btn btn-icon-only btn-rounded btn-outline-<?php echo $item->type == "buy" ? "info" : "danger";?> mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-<?php echo $item->type == "buy" ? "up" : "down";?>"></i></button>
                            <div class="d-flex flex-column">
                              <h6 class="mb-1 text-dark text-sm"><?php echo $item->symbol;?></h6>
                              <span class="text-xs"><?php echo $item->opentime;?></span>
                            </div>
                          </div>
                          
                      </td>
                      <td><?php echo $item->open;?></td>
                      <td><?php echo $item->sl;?></td>
                      <td><?php echo $item->tp;?></td>
                      <td class="text-right"><button class="btn btn-icon-only btn-rounded btn-outline-primary mb-0 me-3 btn-sm  align-items-center justify-content-center"><i class="fas fa-arrow-right"></i></button></td>
                    </tr>
                    <?php } ?>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 mt-4">
          <div class="card mb-4 adsbygoogle">
            
          
          </div>
          <div class="card h-100 mb-4">
            <div class="card-header pb-0 px-3">
              <div class="row">
                <div class="col-md-6">
                  <h6 class="mb-0">Giao dịch hoàn tất</h6>
                </div>
                <div class="col-md-6 d-flex justify-content-end align-items-center">
                  <i class="far fa-calendar-alt me-2"></i>
                  <small><?php echo date('m-d-y h:i:s A');?></small>
                </div>
              </div>
            </div>
            <div class="card-body pt-4 p-3">
              
              <ul class="list-group" id="orderComplete">
                <?php foreach($finish as $item){ ?>
                <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                  <div class="d-flex align-items-center">
                    <button class="btn btn-icon-only btn-rounded btn-outline-<?php echo $item->type == "buy" ? "info" : "danger";?> mb-0 me-3 btn-sm d-flex align-items-center justify-content-center"><i class="fas fa-arrow-<?php echo $item->type == "buy" ? "up" : "down";?>"></i></button>
                    <div class="d-flex flex-column">
                      <h6 class="mb-1 text-dark text-sm"><?php echo $item->symbol;?> <?php echo $item->type;?> [Open : <?php echo $item->open;?> - Sl : <?php echo $item->sl;?> - Close : <?php echo $item->close_at;?>]</h6>
                      <span class="text-xs"><?php echo date("d-m h:i A",$item->opentime);?> - <?php echo date("d-m h:i A",$item->close_time);?></span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center text-<?php echo $item->profit_pip > 0 ? "info text-gradient " : ($item->profit_pip < 0 ? "danger text-gradient " : "secondary");?> text-sm font-weight-bold">
                    <?php echo $item->profit_pip > 0 ? "+" : ($item->profit_pip < 0 ? "" : ":");?> <?php echo $item->profit_pip;?> pip(s)
                  </div>
                </li>
                <?php } ?>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
     
    </div>

<?= $this->endSection() ?>