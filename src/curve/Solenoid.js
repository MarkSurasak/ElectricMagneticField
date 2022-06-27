import { Curve } from "three";
import { Vector3 } from "three";

class Solenoid extends Curve {
  constructor(period, length, radius) {
    super();

    this.period = period;
    this.length = length;
    this.radius = radius;
  }

  getPoint(t, optionalTarget = new Vector3()) {
    if (!(0 <= t <= 1)) {
      console.error("t value must between 0 and 1");
    }

    let x = this.radius * Math.cos(2 * Math.PI * this.period * t);
    let y = this.radius * Math.sin(2 * Math.PI * this.period * t);
    let z = this.length * t;

    optionalTarget.set(x, y, z);

    return optionalTarget;
  }
}

export { Solenoid };
