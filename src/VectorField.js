import { Vector3, Matrix3 } from "three/math";

class VectorField {

    getVector(position, optionalTaget = new Vector3()){}

    jacobianMatrix (position, optionalTaget = new Matrix3()) {
    
        const delta = 0.001;

        let x0 = position.x
        let y0 = position.y
        let z0 = position.z
    
        let x1 = x0 + delta;
        let y1 = y0 + delta;
        let z1 = z0 + delta;

        const f0 = this.getVector(position);

        let fx = this.getVector(new Vector3 (x1, y0, z0));
        let fy = this.getVector(new Vector3 (x0, y1, z0));
        let fz = this.getVector(new Vector3 (x0, y0, z1));
        
        let dx = fx.sub(f0).divideScalar(delta);
        let dy = fy.sub(f0).divideScalar(delta);
        let dz = fz.sub(f0).divideScalar(delta);

        optionalTaget.set(dx.x, dy.x, dz.x,
                          dx.y, dy.y, dz.y,
                          dx.z, dy.z, dz.z);
        
       return optionalTaget;
    }

}




