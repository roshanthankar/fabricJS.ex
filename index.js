const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 1154,
        height: 1152,
        selection: false
    });
}

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url,(img)=> {
    canvas.backgroundImage = img
    canvas.renderAll()
})
}

const canvas = initCanvas('canvas');
let mousePressed = false;

const imgAdded = (e) => {
    console.log(e)
    const inputElem = document.getElementById('myImg')
    const file = inputElem.files[0]; 
    reader.readAsDataURL(file)
    // console.log(inputFile.files[0])
}

const reader = new FileReader()

//Sample Img
setBackground('https://img.freepik.com/free-photo/white-cloud-blue-sky_74190-7709.jpg?w=2000&t=st=1655116180~exp=1655116780~hmac=4cbb1a055f050614b48bdf406696e3d461c7ecacdd9a8d27dace823d43ad2563', canvas);

//User Input Img
const inputFile = document.getElementById('myImg');
inputFile.addEventListener('change', imgAdded)

reader.addEventListener("load", () => {
    // console.log(reader.result)
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img)
        canvas.requestRenderAll()
    })
})

// Zoom

  canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
    var vpt = this.viewportTransform;
    if (zoom < 1154 / 1152) {
      vpt[4] = 200 - 1154 * zoom / 2;
      vpt[5] = 200 - 1152 * zoom / 2;
    } else {
      if (vpt[4] >= 0) {
        vpt[4] = 0;
      } else if (vpt[4] < canvas.getWidth() - 1154 * zoom) {
        vpt[4] = canvas.getWidth() - 1154 * zoom;
      }
      if (vpt[5] >= 0) {
        vpt[5] = 0;
      } else if (vpt[5] < canvas.getHeight() - 1152 * zoom) {
        vpt[5] = canvas.getHeight() - 1152 * zoom;
      }
    }
})

