$(function(){
  var nextColorIndex = 0;
  var colors = [
    'grey-100', 'grey-200', 'grey-300',
    'green-100', 'green-200',
    'pink-100',
    'purple-100'
  ];
  colors = _.shuffle(colors);

  // export to global variable
  utils.getColors = function() {
    if (nextColorIndex == colors.length) {
      nextColorIndex = 0;
      colors = _.shuffle(colors)
      return colors[nextColorIndex++];
    }
    return colors[nextColorIndex++];
  };
});
