$(function(){
  $('.product').each(function(productIndex, product){
    $(product).find('.image-wrapper').each(function(index, wrapper){
      // random product colors
      var color = utils.getColors();
      $(wrapper).addClass(color);

      setProductTitleCircleColor($(product), productIndex, color);
      setProductIdentity($(product));
    });
  });

  // Filter products
  $('#product-search-input').keyup(function(){
    var input = $(this).val().trim();
    input = input.replace(/\s/g, '|');
    var queryRegExp = new RegExp('(' + input + ')', 'i');

    $('.product').each(function(index, product){
      var $productContainer = $(product).parent();
      $productContainer.hide();
      var productIdentity = $(product).data('identity');
      if (queryRegExp.test(productIdentity)) {
        $productContainer.show();
      }
    });
  });

  function setProductTitleCircleColor($product, productIndex, color) {
    var $circle = $product.find('.over-circle');
    if (productIndex % 2 == 0) {
      $circle.addClass(color);
    } else {
      $circle.addClass('white');
    }
  }

  function setProductIdentity($product) {
    var productIdentity = [
      $product.data('brand'),
      $product.data('model'),
      $product.data('price'),
      $product.data('year'),
    ].join(' ');
    $product.data('identity', productIdentity);
  }
});
