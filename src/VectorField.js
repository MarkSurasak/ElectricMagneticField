import { ArrowHelper, Box3, Group, Vector3, Matrix3, Color, LineBasicMaterial, BufferGeometry, Mesh, Line } from "three";

class VectorField extends Group {
  constructor(
    param = {
      minLength: 0,
      maxLength: 1
    },
    box = new Box3(new Vector3(-5, -5, -5), new Vector3(5, 5, 5)),
  ) {
    super();

    this.setBorder(box);

    this.minLength = param.minLength;
    this.maxLength = param.maxLength;
  }

  setBorder(box) {
    this.box = box;

    const startX = Math.round(Math.min(this.box.min.x, this.box.max.x));
    const startY = Math.round(Math.min(this.box.min.y, this.box.max.y));
    const startZ = Math.round(Math.min(this.box.min.z, this.box.max.z));

    const endX = Math.round(Math.max(this.box.min.x, this.box.max.x));
    const endY = Math.round(Math.max(this.box.min.y, this.box.max.y));
    const endZ = Math.round(Math.max(this.box.min.z, this.box.max.z));

    this.start = new Vector3(startX, startY, startZ);
    this.end = new Vector3(endX, endY, endZ);
  }

  getVector(position, optionalTaget = new Vector3(1, 0, 0)) {
    return optionalTaget;
  }

  getPath(position = new Vector3(1,1,1), sampleRate = 50, time = 7, arrowEvery = 2) {
    const points = [position]
    const directional = new Group()

    const delta = time/sampleRate

    for(let n = 1; n < sampleRate;n++) {
      const previous = points[n-1]
      const direction = this.getVector(previous)

      const next = new Vector3();
      next.addVectors(previous, direction.multiplyScalar(delta))

      points.push(next)

      if(n%arrowEvery === 0 ) {
        directional.add(new ArrowHelper(direction, previous, 0, new Color("rgb(255,255,255)")))
      }

    }

    console.log(points)

    const geometry = new BufferGeometry().setFromPoints(points)

    const line = new Line(geometry, new LineBasicMaterial({color: 'white'}))
  
    const result = new Group();

    result.add(line)
    result.add(directional)

    return result
  }

  generateVectorField() {
    for (let x = this.start.x; x <= this.end.x; x++) {
      for (let y = this.start.y; y <= this.end.y; y++) {
        for (let z = this.start.z; z <= this.end.z; z++) {
          const vector = this.getVector(new Vector3(x, y, z));
          const length = vector.lengthSq();

          const t = (length - this.minLength) / (this.maxLength - this.minLength);
          const color = new Color("rgb(0,0,255)");
          color.lerp(new Color("rgb(255,0,0)"), t);

          this.add(new ArrowHelper(vector.normalize(),new Vector3(x, y, z),0.8,color));
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

class Vertex extends VectorField {
  getVector(position, optionalTaget = new Vector3()) {
    const {x, y} = position

    const p = -y
    const q = x
    const r = 0

    return optionalTaget.set(p,q,r)
  }
}

export { VectorField, Vertex };


