import { ParametricCurve } from "./ParametricCurve.js";
import { Vector3 } from "three";

class Toroid extends ParametricCurve {
  constructor(
    period = 70,
    length = 2 * Math.PI,
    outerRadius = 5,
    innerRadius = 1
  ) {
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

  onFinishChange(func) {
    this.onFinishChange = func;
  }

  addController(folder) {
    folder.add(this, "period", 0, 50, 1).onFinishChange((value) => {
      this.onFinishChange("period", value);
    });
    folder.add(this, "length", 0, Math.PI * 2, 0.1).onFinishChange((value) => {
      this.onFinishChange("length", value);
    });
    folder.add(this, "innerRadius", 0, 1, 0.1).onFinishChange((value) => {
      this.onFinishChange("innerRadius", value);
    });
    folder.add(this, "outerRadius", 0, 5, 0.05).onFinishChange((value) => {
      this.onFinishChange("outerRadius", value);
    });

    return this;
  }
}

export { Toroid };
