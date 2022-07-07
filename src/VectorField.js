import { ArrowHelper, Box3, Group, Vector3, Matrix3, Color } from "three";

class VectorField extends Group {
  constructor(
    box = new Box3(new Vector3(0, 0, 0), new Vector3(1, 1, 1)),
    minColor = new Color("rgb(0,0,255)"),
    maxColor = new Color("rgb(255,0,0)"),
    minMagnitude = 0,
    maxMagnitude = 0.01
  ) {
    super();

    this.box = box;
    this.minColor = minColor;
    this.maxColor = maxColor;
    this.minMagnitude = minMagnitude;
    this.maxMagnitude = maxMagnitude;
  }

  getVector(position, optionalTaget = new Vector3(1, 0, 0)) {
    return optionalTaget;
  }

  updateVectorField() {
    console.log(this.getVector(new Vector3(0, 0, 0)));
    this.children.forEach((child) => {
      const arrow = this.getArrowAt(child.position);
      child = arrow;
    });
  }

  getArrowAt(position) {
    const direction = this.getVector(position);

    const t =
      (direction.length() - this.minMagnitude) /
      (this.maxMagnitude - this.minMagnitude);

    const color = new Color();
    color.lerpColors(this.minColor, this.maxColor, t);

    return new ArrowHelper(
      direction.normalize(),
      position,
      0.8,
      color,
      0.2,
      0.05
    );
  }

  generateVectorField() {
    const startX = Math.round(Math.min(this.box.min.x, this.box.max.x));
    const startY = Math.round(Math.min(this.box.min.y, this.box.max.y));
    const startZ = Math.round(Math.min(this.box.min.z, this.box.max.z));

    const endX = Math.round(Math.max(this.box.min.x, this.box.max.x));
    const endY = Math.round(Math.max(this.box.min.y, this.box.max.y));
    const endZ = Math.round(Math.max(this.box.min.z, this.box.max.z));

    for (let x = startX; x <= endX; x++) {
      for (let y = startY; y <= endY; y++) {
        for (let z = startZ; z <= endZ; z++) {
          this.add(this.getArrowAt(new Vector3(x, y, z)));
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
