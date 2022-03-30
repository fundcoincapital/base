<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="apple-touch-icon" sizes="76x76" href="./assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="./assets/img/favicon.png">
  <title><?php echo $title;?></title>
  <?php 
  if(is_array($meta)){
      foreach($meta as $metakey => $metahead){
        ?>
        <meta name="<?php echo $metakey;?>" content="<?php echo $metahead;?>">
        <?php
      }
  }
  ?>
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
  <!-- Nucleo Icons -->
  <link href="./assets/css/nucleo-icons.css" rel="stylesheet" />
  <link href="./assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- Font Awesome Icons -->
  <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
  <link href="./assets/css/nucleo-svg.css" rel="stylesheet" />
  <!-- CSS Files -->
  <link id="pagestyle" href="./assets/css/argon-dashboard.css?v=2.0.2" rel="stylesheet" />
  <script src="./assets/js/jquery.js?v=2.0.2"></script>
  <script src="./assets/js/core/popper.min.js"></script>
  <script src="./assets/js/core/bootstrap.min.js"></script>
  <script src="./assets/js/moment.js?v=2.0.2"></script>
  <script src="./assets/js/axios.js?v=2.0.2"></script>
  <?php 
  if(is_array($js)){
      foreach($js as $javascript){
        ?>
        <script src="<?php echo $javascript;?>"></script>
        <?php
      }
  }
  ?>
  <?php 
  if(is_array($css)){
      foreach($css as $style){
        ?>
        <link href="<?php echo $style;?>" rel="stylesheet"></script>
        <?php
      }
  }
  ?>
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4099957745291159" crossorigin="anonymous"></script>

<script id="mcjs">!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/be3bc6006513d53e05e195918/edc0c2d1c306b9ab9acf31a77.js");</script>
</head>

<body class="g-sidenav-show   bg-gray-100">