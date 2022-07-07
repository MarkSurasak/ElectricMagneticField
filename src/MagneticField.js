import { Vector3 } from "three";
import { VectorField } from "./VectorField";

import { Solenoid } from "./curve/Solenoid";

class MagneticField extends VectorField {
  constructor(
    parametric = new Solenoid(10, 4, 2),
    cerrent = 1,
    precision = 50
  ) {
    super();

    this.parametric = parametric;
    this.current = cerrent;
    this.precision = precision;

    this.delta = 1 / this.precision;

    this.generateVectorField();
  }

  getVector(position, optionalTarget = new Vector3(0, 0, 0)) {
    const func = (t) => {
      const point = this.parametric.getPoint(t);
      const tangent = this.parametric.getTangent(t);
      const direction = new Vector3();

      direction.subVectors(position, point);

      const distance = direction.lengthSq();

      direction.normalize();

      return tangent.cross(direction).divideScalar(distance);
    };

    // simpson's integration

    optionalTarget.add(func(0));

    for (let n = 1; n < this.precision; n++) {
      const t = this.delta * n;

      if (n % 2 === 0) {
        optionalTarget.add(func(t).multiplyScalar(2));
      } else {
        optionalTarget.add(func(t).multiplyScalar(4));
      }
    }

    optionalTarget.add(func(1));

    return optionalTarget.multiplyScalar(this.delta / 3);
  }
}

export { MagneticField };
