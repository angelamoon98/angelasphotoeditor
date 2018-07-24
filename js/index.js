// Filter Functions //

var img = null;
function upload() {
  var fileinput = document.getElementById("finput");
  img = new SimpleImage(fileinput);
  var canvas = document.getElementById("can");
  img.drawTo(canvas);
}

function makeGray() {
  var output = new SimpleImage(img.getWidth(), img.getHeight());
  var imagecan = document.getElementById("can");
  var imagecont = imagecan.getContext("2d");
  imagecont.clearRect(0, 0, imagecan.width, imagecan.height);
  for(var pixel of image.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    var outputpixel = output.getPixel(x, y);
    outputpixel.setRed(avg);
    outputpixel.setGreen(avg);
    outputpixel.setBlue(avg);
  }
  output.drawTo(imagecan);
}
function makeRed() {
  var output = new SimpleImage(img.getWidth(), img.getHeight());
  var imagecan = document.getElementById("can");
  var imagecont = imagecan.getContext("2d");
  imagecont.clearRect(0, 0, imagecan.width, imagecan.height);
  for(var pixel of img.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var outputpixel = output.getPixel(x, y);
    outputpixel.setRed(pixel.getRed() + 50);
    outputpixel.setGreen(pixel.getGreen());
    outputpixel.setBlue(pixel.getBlue());

  }
  output.drawTo(imagecan);
}
function makeGreen() {
  var output = new SimpleImage(img.getWidth(), img.getHeight());
  var imagecan = document.getElementById("can");
  var imagecont = imagecan.getContext("2d");
  imagecont.clearRect(0, 0, imagecan.width, imagecan.height);
  for(var pixel of img.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var outputpixel = output.getPixel(x, y);
    outputpixel.setRed(pixel.getRed());
    outputpixel.setGreen(pixel.getGreen() + 50);
    outputpixel.setBlue(pixel.getBlue());

  }
  output.drawTo(imagecan);
}

function makeBlue() {
  var output = new SimpleImage(img.getWidth(), img.getHeight());
  var imagecan = document.getElementById("can");
  var imagecont = imagecan.getContext("2d");
  imagecont.clearRect(0, 0, imagecan.width, imagecan.height);
  for(var pixel of img.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var outputpixel = output.getPixel(x, y);
    outputpixel.setRed(pixel.getRed());
    outputpixel.setGreen(pixel.getGreen());
    outputpixel.setBlue(pixel.getBlue() + 50);

  }
  output.drawTo(imagecan);
}

function makeRainbow() {
  var output = new SimpleImage(img.getWidth(), img.getHeight());
  var imagecan = document.getElementById("can");
  var imagecont = imagecan.getContext("2d");
  imagecont.clearRect(0, 0, imagecan.width, imagecan.height);
  for(var pixel of img.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var outputpixel = output.getPixel(x, y);
    var num = img.getWidth()/7
    if(x < num) {
       outputpixel.setRed(pixel.getRed());
    }
    if(x >= num && x <= 2 * num) {
      outputpixel.setRed(pixel.getRed());
      outputpixel.setGreen(pixel.getGreen() / 2);
    }
    if(x >= 2 * num && x <= 3 * num) {
      outputpixel.setRed(pixel.getRed());
      outputpixel.setGreen(pixel.getGreen());
    }
    if(x >= 3 * num && x <= 4 * num) {
      outputpixel.setGreen(pixel.getGreen());
    }
    if(x >= 4 * num && x <= 5 * num) {
      outputpixel.setBlue(pixel.getBlue());
    } 
    if(x >= 5 * num && x <= 6 * num) {
      outputpixel.setBlue(pixel.getBlue());
      outputpixel.setRed(pixel.getRed() / 2);
    }
    if(x >= 6 * num && x <= 7 * num) {
      outputpixel.setBlue(pixel.getBlue());
      outputpixel.setRed(pixel.getRed());
    }
  }
  output.drawTo(imagecan);
}

function resetCanvas() {
  var imagecan = document.getElementById("can");
  var imagecont = imagecan.getContext("2d");
  imagecont.clearRect(0, 0, imagecan.width, imagecan.height);
  img.drawTo(imagecan);
  
}


// Green Screen Functions //

var bgImage = null;
var fgImage = null;

function loadForegroundImage() { 
  var imgFile = document.getElementById("fgfile");
  fgImage = new SimpleImage(imgFile);
  var canvas = document.getElementById("fgcan");
  fgImage.drawTo(canvas);
}

function loadBackgroundImage() { 
  var imgFile = document.getElementById("bgfile");
  bgImage = new SimpleImage(imgFile);
  var canvas = document.getElementById("bgcan");
  bgImage.drawTo(canvas);
}

function doGreenScreen() {
  if(fgImage == null || !fgImage.complete()) {
    alert("foreground not loaded");
    return;
  }
  if(bgImage == null || ! bgImage.complete()) {
    alert("background not loaded");
  }
  clearCanvas();
  var output = new SimpleImage(fgImage.getWidth(), fgImage.getHeight());
  for(var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    if(pixel.getGreen() > pixel.getRed() + pixel.getBlue()) {
      var bgPixel = bgImage.getPixel(x,y);
      output.setPixel(x, y, bgPixel);
    }
    else {
      output.setPixel(x, y, pixel);
    }
  }
  var fgcan = document.getElementById("fgcan");
  output.drawTo(fgcan);
}

function clearCanvas() {
  var bgcan = document.getElementById("bgcan");
  var fgcan = document.getElementById("fgcan");
  var bgcont = bgcan.getContext("2d");
  var fgcont = fgcan.getContext("2d");
  bgcont.clearRect(0, 0, bgcan.width, bgcan.height);
  fgcont.clearRect(0, 0, fgcan.width, fgcan.height);
  // fgImage = null;
  // bgImage = null;
  alert("canvases have been cleared");
}


// Steganography Functions //
var hideImage = null;
var showImage = null;
var stego = null;
var decode1 = null;
var decode2 = null;

function clearbits(pixval) {
  var x = Math.floor(pixval / 16) * 16;
  return x;
}

function chop2hide(image) {
  var n = new SimpleImage(image.getWidth(), image.getHeight());
  for(var px of image.values()) {
    var x = px.getX();
    var y = px.getY();
    var np = n.getPixel(x,y);
    np.setRed(clearbits(px.getRed()));
    np.setGreen(clearbits(px.getGreen()));
    np.setBlue(clearbits(px.getBlue()));
  }
  return n;
}

function shift(image) {
  var n = new SimpleImage(image.getWidth(), image.getHeight());
  for(var px of image.values()) {
    var x = px.getX();
    var y = px.getY();
    var np = n.getPixel(x,y);
    np.setRed(px.getRed() / 16);
    np.setGreen(px.getGreen() / 16);
    np.setBlue(px.getBlue() / 16);
  }
  return n;
}

function shiftleft(image) {
  var n = new SimpleImage(image.getWidth(), image.getHeight());
  for(var px of image.values()) {
    var x = px.getX();
    var y = px.getY();
    var np = n.getPixel(x,y);
    np.setRed((px.getRed() % 16) * 16);
    np.setGreen((px.getGreen() % 16) * 16);
    np.setBlue((px.getBlue() % 16) * 16);
  }
  return n;
}

function combine(show, hide) {
  var newImage = new SimpleImage(show.getWidth(), show.getHeight());
  for(var px of newImage.values()) {
    var x = px.getX();
    var y = px.getY();
    var showPixel = show.getPixel(x,y);
    var hidePixel = hide.getPixel(x,y);
    px.setRed(showPixel.getRed() + hidePixel.getRed());
    px.setGreen(showPixel.getGreen() + hidePixel.getGreen());
    px.setBlue(showPixel.getBlue() + hidePixel.getBlue());
  }
  return newImage;
}

function crop(image, width, height) {
  var n = new SimpleImage(width, height);
  for(var p of image.values()) {
    var x = p.getX();
    var y = p.getY();
    if(x < width && y < height) {
      var np = n.getPixel(x,y);
      np.setRed(p.getRed());
      np.setGreen(p.getGreen());
      np.setBlue(p.getBlue());
    }
  }
  return n;
}

function steganography() {
  if(showImage == null || !showImage.complete()) {
    alert("image to show not loaded");
    return;
  }
  if(hideImage == null || !hideImage.complete()) {
    alert("image to hide not loaded");
  }
  clearCanvasSteg();
  var width = 0;
  var height = 0;
  if(hideImage.getWidth() < showImage.getWidth()) {
    width = hideImage.getWidth();
  } else {
    width = showImage.getWidth();
  }
  if(hideImage.getHeight() < showImage.getHeight()) {
    height = hideImage.getHeight();
  } else {
    height = showImage.getHeight();
  }
  var showcan = document.getElementById("showcan");
  var hidecan = document.getElementById("hidecan");
  
  showImage = crop(showImage, width, height); 
  hideImage = crop(hideImage, width, height);
  showImage = chop2hide(showImage);
  hideImage = shift(hideImage);
  // showImage.drawTo(showcan);
  // hideImage.drawTo(hidecan);
  stego = combine(showImage, hideImage);
  stego.drawTo(hidecan);
}

function loadHideImage() { 
  var imgFile = document.getElementById("hidefile");
  hideImage = new SimpleImage(imgFile);
  var canvas = document.getElementById("hidecan");
  hideImage.drawTo(canvas);
}

function loadShowImage() { 
  var imgFile = document.getElementById("showfile");
  showImage = new SimpleImage(imgFile);
  var canvas = document.getElementById("showcan");
  showImage.drawTo(canvas);
}

function clearCanvasSteg() {
  var hidecan = document.getElementById("hidecan");
  var showcan = document.getElementById("showcan");
  var hidecont = hidecan.getContext("2d");
  var showcont = showcan.getContext("2d");
  hidecont.clearRect(0, 0, hidecan.width, hidecan.height);
  showcont.clearRect(0, 0, showcan.width, showcan.height);
  alert("canvases have been cleared");
}

function undosteg() {
  var hidecan = document.getElementById("hidecan");
  var showcan = document.getElementById("showcan");
  if(stego == null || !stego.complete()) {
    alert("steganography not loaded");
    return;
  }
  clearCanvasSteg();
  decode1 = stego;
  decode2 = stego;
  decode1 = shiftleft(decode1);
  decode2 = chop2hide(decode2);
  decode1.drawTo(hidecan);
  decode2.drawTo(showcan);
}