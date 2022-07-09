import { ArrowHelper, Box3, Group, Vector3, Matrix3, Color } from "three";

class VectorField extends Group {
  constructor(
    box = new Box3(new Vector3(-5, -5, -5), new Vector3(5, 5, 5)),
    minLength = 0,
    maxLength = 1
  ) {
    super();

    this.getBorder(box)

    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  setBorder(box) {
    this.box = box

    const startX = Math.round(Math.min(this.box.min.x, this.box.max.x));
    const startY = Math.round(Math.min(this.box.min.y, this.box.max.y));
    const startZ = Math.round(Math.min(this.box.min.z, this.box.max.z));

    const endX = Math.round(Math.max(this.box.min.x, this.box.max.x));
    const endY = Math.round(Math.max(this.box.min.y, this.box.max.y));
    const endZ = Math.round(Math.max(this.box.min.z, this.box.max.z));

    this.start = new Vector(startX, startY, startZ)
    this.end = new Vector(endX, endY, endZ)
}

  getVector(position, optionalTaget = new Vector3(1, 0, 0)) {
    return optionalTaget;
  }

  updateVectorField() {
    for (let child in this.childen) {
      const vector = this.getVector(child.position)
      const length = vector.length()

      const t = (length - this.minLength)/(this.maxLength - this.minLength)

      child.setColor(`hsl(${t}, 1, 1)`)
      child.setDirection(vector.normalize())
    }
  }

  generateVectorField() {
    for (let x = this.start.x; x < this.end.x; x++) {
      for (let y = this.start.y; y < this.end.y; y++) {
        for (let z = this.start.z; z < this.end.z; z++) {
          this.add(new ArrowHelper (origin = new Vector3(x,y,z)));
        }
      }
    }
  }

  jacobianMatrix(position, optionalTaget = new Matrix3()) {
    const delta = 0.001;

    let x0 = position.x;
    let y0 = position.y;
    let z0 = position.z;

    let x1 = x0 + delta;
    let y1 = y0 + delta;
    let z1 = z0 + delta;

    const f0 = this.getVector(position);

    let fx = this.getVector(new Vector3(x1, y0, z0));
    let fy = this.getVector(new Vector3(x0, y1, z0));
    let fz = this.getVector(new Vector3(x0, y0, z1));

    let dx = fx.sub(f0).divideScalar(delta);
    let dy = fy.sub(f0).divideScalar(delta);
    let dz = fz.sub(f0).divideScalar(delta);

    optionalTaget.set(dx.x, dy.x, dz.x, dx.y, dy.y, dz.y, dx.z, dy.z, dz.z);

    return optionalTaget;
  }
}

export { VectorField };
