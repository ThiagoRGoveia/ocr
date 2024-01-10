var img;
var imageLoaded = false; // Define the imageLoaded flag globally

window.onload = function() {
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var rect = {};
    var drag = false;
    img = new Image(); // Define the image globally

    function init() {
        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('mousemove', mouseMove, false);
    }

    function mouseDown(e) {
        rect.startX = e.pageX - this.offsetLeft;
        rect.startY = e.pageY - this.offsetTop;
        drag = true;
    }

    function mouseUp() {
        drag = false;
        console.log('Rectangle:', rect);
    }

    function mouseMove(e) {
        if (drag) {
            rect.w = (e.pageX - this.offsetLeft) - rect.startX;
            rect.h = (e.pageY - this.offsetTop) - rect.startY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (imageLoaded) {
                ctx.drawImage(img, 0, 0); // Redraw the image
            }
            draw();
        }
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; // Change fill style to semi-transparent
        ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
    }

    init();
};

// Load image onto canvas
document.getElementById('imageLoader').addEventListener('change', handleImage, false);
function handleImage(e){
    var canvas = document.getElementById('imageCanvas');
    var ctx = canvas.getContext('2d');
    var reader = new FileReader();
    reader.onload = function(event){
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            imageLoaded = true; // Set the flag that the image is loaded
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}
