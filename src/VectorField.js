import { ArrowHelper, Box3, Group, Vector3, Matrix3 } from "three";

class VectorField extends Group {
	getVector(position, optionalTaget = new Vector3(0, 1, 0)) {
		return optionalTaget.multiplyScalar(-1);
	}

	generateVectorField(
		box = new Box3(new Vector3(-5, -5, -5), new Vector3(5, 5, 5))
	) {
		const startX = Math.min(box.min.x, box.max.x);
		const startY = Math.min(box.min.y, box.max.y);
		const startZ = Math.min(box.min.z, box.max.z);

		const endX = Math.max(box.min.x, box.max.x);
		const endY = Math.max(box.min.y, box.max.y);
		const endZ = Math.max(box.min.z, box.max.z);

		for (let x = startX; x <= endX; x++) {
			for (let y = startY; y <= endY; y++) {
				for (let z = startZ; z <= endZ; z++) {
					const position = new Vector3(x, y, z);
					const direction = this.getVector(position);
					const arrow = new ArrowHelper(
						direction.normalize(),
						position,
						1
					);

					this.add(arrow);
				}
			}
		}
		return this;
	}

	jacobianMatrix(position, optionalTaget = new Matrix3()) {
		const delta = 0.001;

		let x0 = position.x;
		let y0 = position.y;
		let z0 = position.z;

		let x1 = x0 + delta;
		let y1 = y0 + delta;
		let z1 = z0 + delta;

		const f0 = this.getVector(position);

		let fx = this.getVector(new Vector3(x1, y0, z0));
		let fy = this.getVector(new Vector3(x0, y1, z0));
		let fz = this.getVector(new Vector3(x0, y0, z1));

		let dx = fx.sub(f0).divideScalar(delta);
		let dy = fy.sub(f0).divideScalar(delta);
		let dz = fz.sub(f0).divideScalar(delta);

		optionalTaget.set(dx.x, dy.x, dz.x, dx.y, dy.y, dz.y, dx.z, dy.z, dz.z);

		return optionalTaget;
	}
}

export { VectorField };
