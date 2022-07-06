import { Curve } from "three";

class ParametricCurve extends Curve {
  constructor() {
    super();

    this.type = "parametric";
  }

  getTangents(divisions = 5) {
    const tangents = [];

    for (let d = 0; d <= divisions; d++) {
      tangents.push(this.getTangent(d / divisions));
    }

    return tangents;
  }
}

export { ParametricCurve };
