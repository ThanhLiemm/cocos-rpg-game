import { Vec2, _decorator } from "cc";
import { PlayerState } from "./PlayerState";
const { ccclass } = _decorator;

@ccclass("PlayerDashState")
export class PlayerDashState extends PlayerState {
  public enter(): void {
    super.enter();
    this.stateTimer = this.movement.dashDuration;
  }

  public update(dt?: number): void {
    super.update(dt);

    this.player.setVelocity(this.movement.dashSpeed * this.movement.facDirection, 0);

    if (this.stateTimer < 0) {
      this.movement.isGroundDetected()
        ? this.stateMachine.changeState(this.player.idleState)
        : this.stateMachine.changeState(this.player.airState);
    }
    if (!this.movement.isGroundDetected() && this.movement.isWallDetected())
      this.stateMachine.changeState(this.player.wallSlideState);
  }

  public exit(): void {
    super.exit();
    this.player.setVelocity(0, this.player.getYVelocity());
  }
}
