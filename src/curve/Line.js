import { Curve, Vector3 } from "three";

class Line extends Curve {
  constructor(length) {
    super();

    this.length = length;
  }

  getPoint(t, optionalTarget = new Vector3()) {
    return optionalTarget.set(0, t, 0);
  }

  getTangent(t, optionalTarget = new Vector3()) {
    return optionalTarget.set(0, 1, 0);
  }
}

export { Line };
