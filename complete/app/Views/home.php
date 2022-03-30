<?php echo view('header',is_array($header) ? $header : []); ?>
  <div class="min-height-300 bg-primary position-absolute w-100"></div>
  <aside class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
    <div class="sidenav-header">
      <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
      <a class="navbar-brand m-0" href="/ " target="_blank">
        <img src="./assets/img/logo-ct-dark.png" class="navbar-brand-img h-100" alt="main_logo">
        <span class="ms-1 font-weight-bold">Fundcoin Capital</span>
      </a>
    </div>
    <hr class="horizontal dark mt-0">
    <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
      <?php echo view('leftmenu'); ?>
    </div>
    
  </aside>
  <main class="main-content position-relative border-radius-lg ">
    
    <!-- Navbar -->
    <?php if($nav != false) echo view('nav'); ?>
    <!-- End Navbar -->
    <?= $this->renderSection('main') ?>
  </main>
 <?= $this->renderSection('javascript') ?>
 <?= $this->renderSection('style') ?>
 <?php echo view('footer',is_array($footer) ? $footer : []); ?>