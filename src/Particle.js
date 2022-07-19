import { Box3, BufferAttribute, BufferGeometry, Vector3 } from "three";

class Particle extends BufferGeometry {
  constructor(
    dentity = 1,
    box = new Box3(new Vector3(-5, -5, -5), new Vector3(5, 5, 5))
  ) {
    super();

    this.dentity = dentity;
    this.setBorder(box);
    this.generateParticle();
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

  generateParticle() {
    const points = [];

    for (let x = this.start.x; x < this.end.x; x++) {
      for (let y = this.start.y; y < this.end.y; y++) {
        for (let z = this.start.z; z < this.end.z; z++) {
          points.push(x);
          points.push(y);
          points.push(z);
        }
      }
    }
    this.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(points), 3)
    );
  }

  move(delta_time) {
    this.getAttribute("position");
  }
}

export { Particle };
