import {
  _decorator,
  Component,
  EPhysics2DDrawFlags,
  ERigidBody2DType,
  find,
  Graphics,
  Node,
  PhysicsSystem2D,
  RigidBody2D,
  Vec2,
  Vec3,
} from "cc";
import { toLocalPosition } from "../../concerns/utils/commons";
const { ccclass, property } = _decorator;

@ccclass("DebugDraw")
export class DebugDraw extends Component {
  @property(Boolean)
  public isDraw: boolean = false;
  private physicGraphic: Graphics;

  protected onLoad(): void {
    this.physics2DDraw();
    this.custom2DDraw();
  }

  protected start(): void {
    setTimeout((): void => {
      this.physicGraphic = find("/Canvas/PHYSICS_2D_DEBUG_DRAW").getComponent(Graphics);
    }, 100);
  }

  protected update(dt: number): void {
    this.togglePhysics2DDraw();
  }

  public static drawLine(startPos: Vec3, endPos: Vec3, color = "#ff0000") {
    const node = find("/Canvas/CUSTOM_2D_DEBUG_DRAW");
    const graphic = node.getComponent(Graphics);
    const rb = node.getComponent(RigidBody2D);

    const localStartPos = toLocalPosition(rb, startPos);
    const localEndPos = toLocalPosition(rb, endPos);

    if (graphic) {
      graphic.clear();
      graphic.lineWidth = 3;
      graphic.strokeColor.fromHEX(color);
      graphic.fillColor.fromHEX(color);
      graphic.moveTo(localStartPos.x, localStartPos.y);
      graphic.lineTo(localEndPos.x, localEndPos.y);
      graphic.fill();
      graphic.stroke();
    }
  }

  private physics2DDraw(): void {
    PhysicsSystem2D.instance.debugDrawFlags =
      EPhysics2DDrawFlags.Aabb |
      EPhysics2DDrawFlags.Pair |
      EPhysics2DDrawFlags.CenterOfMass |
      EPhysics2DDrawFlags.Joint |
      EPhysics2DDrawFlags.Shape;
  }

  private custom2DDraw(): void {
    const custom2DDrawNode = new Node("CUSTOM_2D_DEBUG_DRAW");
    custom2DDrawNode.addComponent(Graphics);
    const rb = custom2DDrawNode.addComponent(RigidBody2D);
    rb.type = ERigidBody2DType.Static;
    this.node.addChild(custom2DDrawNode);

  }

  private togglePhysics2DDraw(): void {
    if (this.physicGraphic) this.physicGraphic.enabled = this.isDraw;
  }
}
