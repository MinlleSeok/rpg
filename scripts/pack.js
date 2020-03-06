var sun = new Image();
var moon = new Image();
var earth = new Image();

function draw() {
  var canvas = document.getElementById("canvas");
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.setAttribute("width", width + "px");
  canvas.setAttribute("height", height + "px");

  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    roundedRect(ctx, 12, 12, width - 24, height - 24, 15);
    roundedRect(ctx, width / 2, height / 2 + 100, 300, 200, 10);
    roundedRect(ctx, 20, height / 4, 300, 100, 6);

    ctx.beginPath();
    ctx.arc(100, 100, 60, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(100, 100);
    ctx.fill();

    for (var i = 0; i < 9; i++) {
      ctx.fillRect(200 + i * 32, 100, 8, 8);
    }

    for (i = 0; i < 10; i++) {
      ctx.fillRect(490, 100 + i * 32, 8, 8);
    }

    //   for (i = 0; i < 8; i++) {
    //     ctx.fillRect(51 + i * 16, 99, 4, 4);
    //   }

    //   ctx.beginPath();
    //   ctx.moveTo(83, 116);
    //   ctx.lineTo(83, 102);
    //   ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    //   ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    //   ctx.lineTo(111, 116);
    //   ctx.lineTo(106.333, 111.333);
    //   ctx.lineTo(101.666, 116);
    //   ctx.lineTo(97, 111.333);
    //   ctx.lineTo(92.333, 116);
    //   ctx.lineTo(87.666, 111.333);
    //   ctx.lineTo(83, 116);
    //   ctx.fill();

    //   ctx.fillStyle = 'white';
    //   ctx.beginPath();
    //   ctx.moveTo(91, 96);
    //   ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    //   ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    //   ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    //   ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    //   ctx.moveTo(103, 96);
    //   ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    //   ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    //   ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    //   ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    //   ctx.fill();

    //   ctx.fillStyle = 'black';
    //   ctx.beginPath();
    //   ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    //   ctx.fill();

    //   ctx.beginPath();
    //   ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    //   ctx.fill();
    // }

    sun.src = "https://mdn.mozillademos.org/files/1456/Canvas_sun.png";
    moon.src = "https://mdn.mozillademos.org/files/1443/Canvas_moon.png";
    earth.src = "https://mdn.mozillademos.org/files/1429/Canvas_earth.png";
    window.requestAnimationFrame(spaceDraw);
  }
}

function spaceDraw() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  var ctx = document.getElementById("canvas").getContext("2d");

  ctx.globalCompositeOperation = "destination-over";
  ctx.clearRect(0, 0, width, height); // clear canvas

  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.strokeStyle = "rgba(0, 153, 255, 0.4)";
  ctx.save();
  ctx.translate(width / 2.5, height / 2.5);

  // Earth
  var time = new Date();
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctx.translate(width / 2.5, 0);
  ctx.fillRect(0, -12, 40, 24); // Shadow
  ctx.drawImage(earth, -12, -12);

  // Moon
  ctx.save();
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds()
  );
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5);
  ctx.restore();

  ctx.restore();

  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 200, 0, Math.PI * 2, false); // Earth orbit
  ctx.stroke();

  ctx.drawImage(sun, 0, 0, width, height);

  window.requestAnimationFrame(spaceDraw);
}
// A utility function to draw a rectangle with rounded corners.

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}

draw();
