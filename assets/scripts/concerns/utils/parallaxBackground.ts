import { _decorator, Camera, Component, find, Vec3 } from "cc";
const { ccclass, property, type } = _decorator;

@ccclass("parallaxBackground")
export class parallaxBackground extends Component {
  private cam: Camera;
  private xPosition: number;
  private length = 1600; //320*5

  protected onLoad(): void {
    this.cam = find("Canvas/Camera").getComponent(Camera);
    this.xPosition = this.node.position.x;
  }

  update(deltaTime: number) {
    this.node.position = new Vec3(this.xPosition, this.node.position.y, this.node.position.z);
    if (this.cam.node.position.x > this.xPosition + this.length) this.xPosition += this.length;
    if (this.cam.node.position.x < this.xPosition - this.length) this.xPosition -= this.length;
  }
}
