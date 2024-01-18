import { _decorator, CCFloat, Component, ERaycast2DType, PhysicsSystem2D, Vec2, Vec3 } from "cc";
import { PLAYER_MOVEMENT_EVENTS } from "../../concerns/type";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("PlayerMovement")
export class PlayerManageMovement extends Component {
  public pressJumpKey: boolean = false;
  public pressDash: boolean = false;
  public pressDown: boolean = false;
  public statDecreaseSpeed = 0.3;
  public statDecreaseFall = 0.7;
  public statDecreaseWallJump = 0.5;
  public statMaxFall = -15;
  public statWallJumpSpeed = 15;
  public dashDuration = 0.3;
  public dashTimer = 0;
  public dashCoolDown = 2;
  public speed = 0;

  //velocity info
  @property({ group: { name: "velocity stat", id: "1" }, type: CCFloat })
  public accelerate: number = 50;
  @property({ group: { name: "velocity stat", id: "1" }, type: CCFloat })
  public maxSpeed = 12;
  @property({ group: { name: "velocity stat", id: "1" }, type: CCFloat })
  public jumpForce: number = 12;
  @property({ group: { name: "velocity stat", id: "1" }, type: CCFloat })
  public dashSpeed: number = 20;
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

  protected onLoad(): void {
    this.node.on(PLAYER_MOVEMENT_EVENTS.PRESS_FORWARD, this.handleMoveForward, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.PRESS_BACK, this.handleMoveBack, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.RELEASE_KEY, this.handleReleaseKey, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.PRESS_JUMP, this.handlePressJump, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.RELEASE_JUMP, this.handleReleaseJump, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.PRESS_DASH, this.handlePressDash, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.RELEASE_DASH, this.handleReleaseDash, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.PRESS_DOWN, this.handlePressDown, this);
    this.node.on(PLAYER_MOVEMENT_EVENTS.RELEASE_DOWN, this.handleReleaseDown, this);
  }

  protected update(dt: number): void {
    this.dashTimer -= dt;
  }

  private handleMoveForward(): void {
    this.speed = this.maxSpeed;
  }

  private handleMoveBack(): void {
    this.speed = this.maxSpeed * -1;
  }

  private handleReleaseKey(): void {
    this.speed = 0;
  }

  private handlePressJump(): void {
    this.pressJumpKey = true;
  }

  private handleReleaseJump(): void {
    this.pressJumpKey = false;
  }

  private handlePressDash(): void {
    this.pressDash = true;
  }

  private handleReleaseDash(): void {
    this.pressDash = false;
  }

  private handlePressDown(): void {
    this.pressDown = true;
  }

  private handleReleaseDown(): void {
    this.pressDown = false;
  }

  public isGroundDetected(): boolean {
    const p1 = this.groundCheck.node.worldPosition;
    const p2 = new Vec3(p1.x, p1.y - this.groundCheckDistance, 0);
    return (
      PhysicsSystem2D.instance.raycast(p1, p2, ERaycast2DType.Closest, this.whatIsGround).length > 0
    );
  }

  public isWallDetected(): boolean {
    const p1 = this.wallCheck.node.worldPosition;
    const p2 = new Vec3(p1.x + (this.facDirection * this.wallCheckDistance), p1.y, 0);
    return (
      PhysicsSystem2D.instance.raycast(p1, p2, ERaycast2DType.Closest, this.whatIsGround).length > 0
    );
  }

  private flip(player: Player): void {
    this.facRight = !this.facRight;
    this.facDirection *= -1;
    player.node.setScale(player.node.scale.x * -1, player.node.scale.y);
  }

  public controlFlip(speed: number, player: Player): void {
    if (speed < 0 && this.facRight) this.flip(player);
    if (speed > 0 && !this.facRight) this.flip(player);
  }
}
