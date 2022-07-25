import { Curve, Vector3, Vector2, ArrowHelper, Color, Group } from "three";

class ParametricCurve extends Curve {
  constructor() {
    super();

    this.type = "parametric";

    this.arrowHelperColor = new Color("rgb(0,255,0)");
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

  getArrowHelper(t) {
    return new ArrowHelper(
      this.getTangent(t),
      this.getPoint(t),
      1,
      this.arrowHelperColor
    );
  }

  getDirectionals(count = 10) {
    const arrows = new Group();
    const delta = 1 / count;

    for (let n = 0; n < count; n++) {
      const t = n * delta;
      arrows.add(this.getArrowHelper(t));
    }

    return arrows;
  }
}

export { ParametricCurve };
