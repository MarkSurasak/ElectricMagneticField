import { BufferGeometry, Vector3 } from "three";

class Parametric extends BufferGeometry {
  constructor(
    func = (t) => new Vector3(Math.sin(t), t, Math.cos(t)),
    start = 0,
    end = 1,
    rate = 100
  ) {
    super();

    this.type = "paramatric";
    this.func = func;

    const points = [];
    for (let t = start; t <= end; t += (start + end) / rate) {
      points.push(func(t));
    }

    this.setFromPoints(points);
  }
}

export { Parametric };
