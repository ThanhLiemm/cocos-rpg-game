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

    this.character.setVelocity(this.movement.dashSpeed * this.movement.facDirection, 0);

    if (this.stateTimer < 0) {
      this.movement.isGroundDetected()
        ? this.stateMachine.changeState(this.character.idleState)
        : this.stateMachine.changeState(this.character.airState);
    }
    if (!this.movement.isGroundDetected() && this.movement.isWallDetected())
      this.stateMachine.changeState(this.character.wallSlideState);
  }

  public exit(): void {
    super.exit();
    this.character.setVelocity(0, this.character.getYVelocity());
  }
}
