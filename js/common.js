$(document).ready(function(){
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  $('.item').each(function(){
    var priority = $(this).attr('data-priority');
   
    if (priority === '1') {
       $(this).css({'height': getRandomInt(650,725)})
    } else if (priority === '2') {
        $(this).css({'height': getRandomInt(525,600)})
    } else if (priority === '3') {
        $(this).css({'height': getRandomInt(350,450)})
    } else if (priority === '4') {
        $(this).css({'height': getRandomInt(250,300)})
    }
   
  })




$('#projects-list').masonry({
  // options
  itemSelector: '.item',
  gutter: 20,
  fitWidth: true,
  columnWidth: 300
  // originTop: false
});


})

function caenvasOcean() {
        var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');

      canvas.width = window.innerWidth;
      canvas.height = '200';

      var waves = ["rgba(25, 63, 123, 0.35)",
                   "rgba(25, 63, 123, 0.45)",
                   "rgba(25, 63, 123, 0.55)",
                   "rgba(25, 63, 123, 0.65)"]

      var i = 0;

      function draw() {
        canvas.width = canvas.width;

        for(var j = waves.length - 1; j >= 0; j--) {
          var offset = i + j * Math.PI * 12;
          ctx.fillStyle = (waves[j]);
          var randomLeft            = (Math.sin(offset/100)  + 1)       / 2 * 200;
          var randomRight           = (Math.sin((offset/100) + 10) + 1) / 2 * 200;
          var randomLeftConstraint  = (Math.sin((offset/60)  + 2)  + 1) / 2 * 200;
          var randomRightConstraint = (Math.sin((offset/60)  + 1)  + 1) / 2 * 200;

          ctx.beginPath();
          ctx.moveTo(0, randomLeft + 100);

          ctx.bezierCurveTo(canvas.width / 3, randomLeftConstraint, canvas.width / 3 * 2, randomRightConstraint, canvas.width, randomRight + 100);
          ctx.lineTo(canvas.width , canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.lineTo(0, randomLeft + 100);

          ctx.closePath();
          ctx.fill();
        }

        i = i + 3;
      }
      setInterval("draw()", 50);
      

}
