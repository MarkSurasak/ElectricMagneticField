import { ParametricCurve } from "./ParametricCurve.js";
import { Vector3 } from "three";

class Solenoid extends ParametricCurve {

  constructor(period = 10, length = 4, radius = 2) {
    super();

    this.type = "parametric";

    this.period = period;
    this.length = length;
    this.radius = radius;
  }

  getPoint(t, optionalTarget = new Vector3()) {
    if (!(0 <= t <= 1)) {
      console.error("t value must between 0 and 1");
    }

    const x = this.radius * Math.sin(2 * Math.PI * this.period * t);
    const y = this.length * t;
    const z = this.radius * Math.cos(2 * Math.PI * this.period * t);

    return optionalTarget.set(x, y, z);
  }

  getTangent(t, optionalTarget = new Vector3()) {
    const x =
      this.radius *
      Math.cos(2 * Math.PI * this.period * t) *
      2 *
      Math.PI *
      this.period;
    const y = this.length;
    const z =
      -this.radius *
      Math.sin(2 * Math.PI * this.period * t) *
      2 *
      Math.PI *
      this.period;

    return optionalTarget.set(x, y, z).normalize();
  }

  onChange(func) {
    this.__onChange = func
  }

  addController (folder) {
    folder.add(this, 'period', 0, 50, 1).onChange((value) => {this.onChange('period', value)})
    folder.add(this, 'length', 0, 5, 0.1).onChange((value) => {this.onChange('length', value)})
    folder.add(this, 'radius', 0, 5, 0.1).onChange((value) => {this.onChange('radius', value)})
    
    return this
  }
}

export { Solenoid };
