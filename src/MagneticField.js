import { Vector3 } from "three";
import { VectorField } from "./VectorField";

class MagneticField extends VectorField {
  constructor(parametric, cerrent, precision = 100) {
    super();

    this.parametric = parametric;
    this.current = cerrent;
    this.precision = precision;
  }

  getVector(position, optionalTarget = new Vector3(0, 0, 0)) {
    const delta = 1 / this.precision;

    for (let t = 0; t <= 1; t += delta) {
      const point = this.parametric.getPoint(t);
      const tangent = this.parametric.getTangent(t);
      const direction = new Vector3();

      direction.subVectors(point, position);

      const distance = direction.lengthSq();

      direction.normalize();

      optionalTarget.add(tangent.cross(direction).divideScalar(distance));
    }

    return optionalTarget;
  }
}

export { MagneticField };
