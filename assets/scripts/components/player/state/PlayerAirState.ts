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
    this.movement.controlFlip(this.movement.speed, this.character);

    this.character.setVelocity(
      this.movement.speed * this.movement.statDecreaseSpeed,
      this.character.getYVelocity()
    );
    this.character
      .getAnim()
      .setValue(PLAYER_ANIMATION_VARIABLES.Y_VELOCITY, this.character.getYVelocity());

    if (this.movement.isGroundDetected()) {
      this.stateMachine.changeState(this.character.idleState);
    }
    if (this.movement.isWallDetected()) this.stateMachine.changeState(this.character.wallSlideState);
    if (this.movement.pressDown) {
      this.character.setVelocity(0, this.movement.statMaxFall);
    }
  }
}
