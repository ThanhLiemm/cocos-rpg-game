import { _decorator, CCFloat, Component, ERaycast2DType, PhysicsSystem2D, Vec2, Vec3 } from "cc";
import { Character } from "./Character";
const { ccclass, property } = _decorator;

@ccclass("CharacterManageMovement")
export class CharacterManageMovement extends Component {
  @property({ type: Character })
  protected character: Character;

  //velocity info
  @property({ group: { name: "velocity stat", id: "1" }, type: CCFloat })
  public accelerate: number = 50;
  @property({ group: { name: "velocity stat", id: "1" }, type: CCFloat })
  public maxSpeed = 12;
  @property({ group: { name: "velocity stat", id: "1" }, type: CCFloat })
  public jumpForce: number = 12;
  @property({ group: { name: "velocity stat", id: "1" }, type: [Vec2] })
  public attackMovement: Vec2[];

  // collision info
  @property({ group: { name: "Collision Check", id: "2" }, type: Component })
  public groundCheck: Component;
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public groundCheckDistance: number;
  @property({ group: { name: "Collision Check", id: "2" }, type: Component })
  public wallCheck: Component;
  @property({ group: { name: "Collision Check", id: "2" }, type: CCFloat })
  public wallCheckDistance: number;

  private whatIsGround = 1 << 2; //layer ground
  private facRight = true;
  public facDirection = 1;
  public speed = 0;

  public isGroundDetected(): boolean {
    const p1 = this.groundCheck.node.worldPosition;
    const p2 = new Vec3(p1.x, p1.y - this.groundCheckDistance, 0);
    return (
      PhysicsSystem2D.instance.raycast(p1, p2, ERaycast2DType.Closest, this.whatIsGround).length > 0
    );
  }

  public isWallDetected(): boolean {
    const p1 = this.wallCheck.node.worldPosition;
    const p2 = new Vec3(p1.x + this.facDirection * this.wallCheckDistance, p1.y, 0);
    return (
      PhysicsSystem2D.instance.raycast(p1, p2, ERaycast2DType.Closest, this.whatIsGround).length > 0
    );
  }

  public flip(character: Character): void {
    this.facRight = !this.facRight;
    this.facDirection *= -1;
    character.node.setScale(character.node.scale.x * -1, character.node.scale.y);
  }

  public controlFlip(speed: number, character: Character): void {
    if (speed < 0 && this.facRight) this.flip(character);
    if (speed > 0 && !this.facRight) this.flip(character);
  }
}
