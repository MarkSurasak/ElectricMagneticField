import { Curve } from "three/extras/core/Curve.js";
import { Vector3 } from "three/math/Vector3.js";

class Soleniod extends Curve {
    
    constructer(period, length, radius) {
        super();
        
        this.period = period;
        this.length = lenght;
        this.radius = redius;
    }
    
    getPoint(t, optionalTarget = new Vector3()) {
    	    if !(0 <= t <= 1) {
    	    	console.error("t value must between 0 and 1");
    	    }
            
            x = this.radius*Math.cos(2*Math.pi*this.period*t)
    	    y = this.radius*Math.sin(2*Math.pi*this.period*t)
            z = this.length*t
            
    	    return optionalTarget.set(x, y, z)
    }
}

export { Soleniod };
