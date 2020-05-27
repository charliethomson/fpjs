class Square {
    constructor() {
        this.genLines = function* () {
            for (let i = 0; i < this.points.length; i++) {
                if (i == this.points.length - 1) {
                    yield new Line(this.points[i], this.points[0]);
                }
                else {
                    yield new Line(this.points[i], this.points[i + 1]);
                }
            }
            return null;
        };
    }
}
class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}
function lineLineCollide(l1, l2) {
    let uA = ((l2.p2.x - l2.p1.x) * (l1.p1.y - l2.p1.y) - (l2.p2.y - l2.p1.y) * (l1.p1.x - l2.p1.x)) / ((l2.p2.y - l2.p1.y) * (l1.p2.x - l1.p1.x) - (l2.p2.x - l2.p1.x) * (l1.p2.y - l1.p1.y));
    let uB = ((l1.p2.x - l1.p1.x) * (l1.p1.y - l2.p1.y) - (l1.p2.y - l1.p1.y) * (l1.p1.x - l2.p1.x)) / ((l2.p2.y - l2.p1.y) * (l1.p2.x - l1.p1.x) - (l2.p2.x - l2.p1.x) * (l1.p2.y - l1.p1.y));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}
class Vec2D {
    constructor(x, y, mag, angle) {
        this.x = x;
        this.y = y;
        this.mag = mag !== undefined ? mag : 1;
        this.angle = angle !== undefined ? angle : 0;
    }
    collidesWith(object) {
        let myLine = this.asLine();
        let lines = object.genLines();
        let curr = lines.next();
        while (!curr.done) {
            if (curr === null) {
                return false;
            }
            else if (lineLineCollide(myLine, curr.value)) {
                return true;
            }
        }
        return false;
    }
    add(amt) {
        let x = this.x + (Math.cos(this.angle) * amt);
        let y = this.y + (Math.sin(this.angle) * amt);
        return new Vec2D(x, y);
    }
    asLine() {
        return {
            p1: this,
            p2: this.add(this.mag)
        };
    }
    distBetween(other) {
        return 0;
    }
}
