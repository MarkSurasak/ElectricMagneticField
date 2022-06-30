import { Vector3 } from "three";
import { VectorField } from "./VectorField";

class MagneticField extends VectorField {
  constructor(parametric, cerrent, precision = 1000) {
    super();

    this.parametric = parametric;
    this.current = cerrent;
    this.precision = precision;
  }

  getVector(position, optionalTarget = new Vector3()) {
    for (let i = 0; i < this.precision; i++) {
      const point = this.parametric.getPoint();
    }

    return optionalTarget;
  }
}

export { MagneticField };
