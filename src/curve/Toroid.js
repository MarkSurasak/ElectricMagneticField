import { ParametricCurve } from "./ParametricCurve.js";
import { Vector3 } from "three";

class Toroid extends ParametricCurve {
  constructor(period, length, innerRadius, outerRadius) {
    super();

    this.type = "parametric";

    this.period = period;
    this.length = length;

    this.outerRadius = outerRadius;
    this.innerRadius = innerRadius;
  }

  getPoint(t, optionalTarget = new Vector3()) {
    if (!(0 <= t <= 1)) {
      console.error("t value must between 0 and 1");
    }

    let x =
      Math.cos(this.length * t) *
      (this.outerRadius +
        this.innerRadius * Math.cos(2 * Math.PI * this.period * t));
    let y =
      Math.sin(this.length * t) *
      (this.outerRadius +
        this.innerRadius * Math.cos(2 * Math.PI * this.period * t));
    let z = this.innerRadius * Math.sin(2 * Math.PI * this.period * t);

    return optionalTarget.set(x, y, z);
  }
}

export { Toroid };
