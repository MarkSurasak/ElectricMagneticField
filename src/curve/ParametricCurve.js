import { Curve, Vector3, Vector2 } from "three";

class ParametricCurve extends Curve {
  constructor() {
    super();

    this.type = "parametric";
  }

  getTangent(t, optionalTaget = new Vector3()) {
    return optionalTaget.copy(this.getDerivative(t)).normalize();
  }

  getDerivative(t, optionalTarget = new Vector3()) {
    const delta = 0.0001;
    let t1 = t - delta;
    let t2 = t + delta;

    // Capping in case of danger

    if (t1 < 0) t1 = 0;
    if (t2 > 1) t2 = 1;

    const pt1 = this.getPoint(t1);
    const pt2 = this.getPoint(t2);

    const derivative =
      optionalTarget || (pt1.isVector2 ? new Vector2() : new Vector3());

    derivative.copy(pt2).sub(pt1);

    return derivative;
  }
}

export { ParametricCurve };
