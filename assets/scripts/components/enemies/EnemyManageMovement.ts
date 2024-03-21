import {
  _decorator,
  CCFloat,
  ERaycast2DType,
  Node,
  PhysicsSystem2D,
  RaycastResult2D,
  Vec3,
} from "cc";
import { CharacterManageMovement } from "../character/CharacterManageMovement";
const { ccclass, property, type } = _decorator;

@ccclass("EnemyManageMovement")
export class EnemyManageMovement extends CharacterManageMovement {
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public playerDetectRange: number;
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public playerAttackDistance: number;
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public playerVisionDistance: number;

  @type(Number)
  public thinkTime = 1;

  public target: Node;
  private whatIsPlayer = 1 << 3;

  protected start(): void {
    this.speed = this.maxSpeed;
  }

  protected update(dt: number): void {
    this.guard();
  }

  public guard(): RaycastResult2D {
    const p1 = this.character.node.worldPosition;
    const p2 = new Vec3(p1.x + this.facDirection * this.playerVisionDistance, p1.y, 0);
    const result = PhysicsSystem2D.instance.raycast(p1, p2, ERaycast2DType.All, this.whatIsPlayer);
    if (result.length > 0) this.target = result[0].collider.node;

    return result[0];
  }

  public isOutOfDetectRange(): boolean {
    return this.distanceToTarget() > this.playerDetectRange;
  }

  public hasTarget(): boolean {
    return !!this.target;
  }

  public checkTargetDirection(): number {
    return this.target.position.x > this.character.node.position.x ? 1 : -1;
  }

  public followTarget(): void {
    const { character, speed, facDirection } = this;
    this.controlFlip(this.checkTargetDirection(), character);
    character.setVelocity(speed * facDirection, character.getYVelocity());
  }

  public forgetTarget(): void {
    this.target = undefined;
  }

  public distanceToTarget(): number {
    return Vec3.distance(this.character.node.position, this.target.position);
  }
}
