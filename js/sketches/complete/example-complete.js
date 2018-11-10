
setup = () => {
    createCanvas(500, 500);
    background(255, 0, 100);
}


draw = () => {
    fill(0, 30, 230)
    ellipse(100, 100, 50, 50);

    fill(random(255), 0, 255)
    ellipse(mouseX, mouseY, 50,50);
    ellipse(mouseY, mouseX, 50, 50);
}