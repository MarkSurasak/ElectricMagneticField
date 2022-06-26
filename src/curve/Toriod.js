import { Curve } from "three/core/Curve.js";
import { Vector3 } from "three/math/Vector3.js";

class Toriod extends Curve {
    
    constructer(period, length, innerRadius, outerRadius) {
        super();
        
        this.period = period;
        this.length = lenght;

        this.outerRadius = outerRedius;
        this.innerRadius = innerRedius;
        
    }
    
    getPoint(t, optionalTarget = new Vector3()) {
    	    if !(0 <= t <= 1) {
    	    	console.error("t value must between 0 and 1");
    	    }
            
            x = this.length*Math.cos(2*Math.pi*t)*(this.innerRadius*Math.cos(2*Math.pi*this.period*t))
    	    y = this.length*Math.sin(2*Math.pi*t)*(this.innerRadius*Math.cos(2*Math.pi*this.period*t))
            z = this.innerRadius*Math.sin(2*Math.pi*this.period*t)
            
    	    return optionalTarget.set(x, y, z)
    }
}

export { Toriod };
