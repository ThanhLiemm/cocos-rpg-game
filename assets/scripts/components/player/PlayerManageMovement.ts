import { _decorator } from "cc";
import { CharacterManageMovement } from "../character/CharacterManageMovement";
const { ccclass, property } = _decorator;

@ccclass("PlayerMovement")
export class PlayerManageMovement extends CharacterManageMovement {
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

  protected update(dt: number): void {
    this.dashTimer -= dt;
  }

  public handleMoveForward(): void {
    this.speed = this.maxSpeed;
  }

  public handleMoveBack(): void {
    this.speed = this.maxSpeed * -1;
  }

  public handleReleaseKey(): void {
    this.speed = 0;
  }

  public handlePressJump(): void {
    this.pressJumpKey = true;
  }

  public handleReleaseJump(): void {
    this.pressJumpKey = false;
  }

  public handlePressDash(): void {
    this.pressDash = true;
  }

  public handleReleaseDash(): void {
    this.pressDash = false;
  }

  public handlePressDown(): void {
    this.pressDown = true;
  }

  public handleReleaseDown(): void {
    this.pressDown = false;
  }
}
