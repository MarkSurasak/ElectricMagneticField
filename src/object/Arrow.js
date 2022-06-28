import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshPhongMaterial,
  Vector3
} from "three";

class Arrow extends Group {
  constructor() {
    super();

    //modeling
    const body = new CylinderGeometry(0.03, 0.03, 1, 8, 1);
    const head = new CylinderGeometry(0, 0.08, 0.2, 8, 1);

    const red = new MeshPhongMaterial({ color: "red" });

    const stick = new Mesh(body, red);
    const arrow = new Mesh(head, red);

    stick.translateY(0.5);

    arrow.translateY(1);

    this.add(stick, arrow);
    this.lookAt(0, 0, -1);
  }
}

export { Arrow };
