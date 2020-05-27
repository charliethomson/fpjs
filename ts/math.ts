

interface PhysicsObject {
    points: Array<Vec2D>;
    genLines(): Generator<Line, null, boolean>;
    render(): null;
}

class Square implements PhysicsObject {
    points: Array<Vec2D>;

    genLines: (this: PhysicsObject) => Generator<Line, null, boolean> = function* (this: Square): Generator<Line, null, boolean> {
        for (let i = 0; i < this.points.length; i++) {
            if (i == this.points.length - 1) {
                yield new Line(
                    this.points[i],
                    this.points[0],
                );
            } else {
                yield new Line(
                    this.points[i],
                    this.points[i + 1],
                )
            }
        }

        return null;
    }

    render(): null {
        return null;
    }

    constructor(points: Array<Vec2D>) {
        if (points.length != 4) {
            console.error(`Unable to instantiate square with ${points.length} arguments: ${points}`);
            return null;
        }

        this.points = points;
    }
}



class Line {
    p1: Vec2D;
    p2: Vec2D;

    constructor(p1: Vec2D, p2: Vec2D) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

function lineLineCollide(l1: Line, l2: Line): Boolean {
    let uA: number = ((l2.p2.x - l2.p1.x) * (l1.p1.y - l2.p1.y) - (l2.p2.y - l2.p1.y) * (l1.p1.x - l2.p1.x)) / ((l2.p2.y - l2.p1.y) * (l1.p2.x - l1.p1.x) - (l2.p2.x - l2.p1.x) * (l1.p2.y - l1.p1.y));
    let uB: number = ((l1.p2.x - l1.p1.x) * (l1.p1.y - l2.p1.y) - (l1.p2.y - l1.p1.y) * (l1.p1.x - l2.p1.x)) / ((l2.p2.y - l2.p1.y) * (l1.p2.x - l1.p1.x) - (l2.p2.x - l2.p1.x) * (l1.p2.y - l1.p1.y));
    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true;
    }
    return false;
}

class Vec2D {
    x: number;
    y: number;
    mag: number;
    angle: number;

    constructor(x: number, y: number, mag?: number, angle?: number) {
        this.x = x;
        this.y = y;
        this.mag = mag !== undefined ? mag : 1;
        this.angle = angle !== undefined ? angle : 0;
    }

    collidesWith(object: PhysicsObject): Boolean {
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

    add(amt: number): Vec2D {
        let x = this.x + (Math.cos(this.angle) * amt);
        let y = this.y + (Math.sin(this.angle) * amt);
        return new Vec2D(x, y);
    }

    asLine(): Line {
        return {
            p1: this,
            p2: this.add(this.mag)
        }
    }

    distBetween(other: Vec2D): number {
        return 0;
    }
}