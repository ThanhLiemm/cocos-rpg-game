import {
  _decorator,
  CCFloat,
  ERaycast2DType,
  find,
  Node,
  PhysicsSystem2D,
  RaycastResult2D,
  Vec2,
  Vec3
} from "cc";
import { CharacterManageMovement } from "../character/CharacterManageMovement";
const { ccclass, property } = _decorator;

@ccclass("EnemyManageMovement")
export class EnemyManageMovement extends CharacterManageMovement {
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public playerDetectRange: number;
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public playerAttackDistance: number;
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public seePlayerDistance: number;

  private whatIsPlayer = 1 << 3;
  public target: Node;
  public distanceToPlayer: number;

  protected start(): void {
    this.target = find("/Canvas/Player");
    this.speed = this.maxSpeed;
  }

  protected update(dt: number): void {
    this.isSeePlayer();
  }

  public isSeePlayer(): RaycastResult2D {
    const p1 = this.wallCheck.node.worldPosition;
    const p2 = new Vec3(p1.x + this.facDirection * this.seePlayerDistance, p1.y, 0);
    const result = PhysicsSystem2D.instance.raycast(
      p1,
      p2,
      ERaycast2DType.Closest,
      this.whatIsPlayer
    );
    if (result.length > 0) {
      this.target = result[0].collider.node;
      this.distanceToPlayer = result[0].fraction * this.seePlayerDistance;
    }

    return result[0];
  }

  public isDetectPlayer(character: Node): boolean {
    return (
      Vec2.distance(character.worldPosition, this.target.worldPosition) <= this.playerDetectRange
    );
  }

  public isForgotPlayer(character: Node): boolean {
    return (
      Vec2.distance(character.worldPosition, this.target.worldPosition) > this.seePlayerDistance
    );
  }
}
