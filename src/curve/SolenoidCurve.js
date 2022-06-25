import { Curve, Vector3} from "three";

class SoleniodCurve extends Curve {
    
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
    	    
    	    return optionalTarget.set(
                this.radius*Math.sin(this.period*2*Math.pi*t,
                t*this.length, 
                this.radius*Math.cos(this.period*2*Math.pi*t)
    }
}

export { SoleniodCurve };
