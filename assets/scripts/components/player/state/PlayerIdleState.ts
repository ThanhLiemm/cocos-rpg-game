import { _decorator } from "cc";
import { PlayerGroundState } from "./PlayerGroundState";
const { ccclass } = _decorator;

@ccclass("PlayerIdleState")
export class PlayerIdleState extends PlayerGroundState {
  public enter(): void {
    super.enter();
    this.player.setZeroVelocity();
  }
  public update(): void {
    super.update();

    if (this.movement.speed !== 0 && this.movement.isGroundDetected() && !this.player.isBusy) {
      this.stateMachine.changeState(this.player.moveState);
    }
  }
}
