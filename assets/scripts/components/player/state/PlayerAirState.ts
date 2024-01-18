import { _decorator } from "cc";
import { PLAYER_ANIMATION_VARIABLES } from "../../../concerns/type";
import { PlayerState } from "./PlayerState";
const { ccclass } = _decorator;

@ccclass("PlayerAirState")
export class PlayerAirState extends PlayerState {
  public enter(): void {
    super.enter();
  }

  public update(): void {
    super.update();
    this.movement.controlFlip(this.movement.speed, this.player);

    this.player.setVelocity(
      this.movement.speed * this.movement.statDecreaseSpeed,
      this.player.getYVelocity()
    );
    this.player
      .getAnim()
      .setValue(PLAYER_ANIMATION_VARIABLES.Y_VELOCITY, this.player.getYVelocity());

    if (this.movement.isGroundDetected()) {
      this.stateMachine.changeState(this.player.idleState);
    }
    if (this.movement.isWallDetected()) this.stateMachine.changeState(this.player.wallSlideState);
    if (this.movement.pressDown) {
      this.player.setVelocity(0, this.movement.statMaxFall);
    }
  }
}
