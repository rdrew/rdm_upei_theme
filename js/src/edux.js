/* Load jQuery.
--------------------------*/
jQuery(document).ready(function ($) {
  // Homepage blocks
  $(".region-content-home-top .block, .region-content-home-bottom .block").wrapInner( '<div class="container"></div>' );

  $('.accordion_block').accordionjs({
    activeIndex: false,
  });
/* End document
--------------------------*/
});
