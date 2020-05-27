
window.onresize = () => {
    let canvas = document.getElementById("defaultCanvas0");
    if (canvas) {
        let width = window.innerWidth;
        let height = window.innerHeight * 0.95;
        resizeCanvas(width, height)
    }
}

const WIDTH = window.innerWidth;

const HEIGHT = window.innerHeight * 0.95;


let manager;

function setup() {
    manager = new Manager();
    createCanvas(WIDTH, HEIGHT).parent("render");
}

function draw() {
    background(55);
    manager.onFrame();
}