import { Vector3 } from "three";
import { VectorField } from "./VectorField.js";

class GravityField extends VectorField {
	getVector(Vector, optionalTarget = new Vector3()) {
		return optionalTarget.set(0, 1, 0).multiplyScalar(-9.8);
	}
}

export { GravityField };
