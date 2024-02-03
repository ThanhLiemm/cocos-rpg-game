import { _decorator } from "cc";
import { PlayerGroundState } from "./PlayerGroundState";
const { ccclass } = _decorator;

@ccclass("PlayerIdleState")
export class PlayerIdleState extends PlayerGroundState {
  public enter(): void {
    super.enter();
    this.character.setZeroVelocity();
  }
  public update(): void {
    super.update();

    if (this.movement.speed !== 0 && this.movement.isGroundDetected() && !this.character.getIsBusy()) {
      this.stateMachine.changeState(this.character.moveState);
    }
  }
}
