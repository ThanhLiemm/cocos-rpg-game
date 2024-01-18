import { _decorator } from "cc";
import { PlayerState } from "./PlayerState";
const { ccclass } = _decorator;

@ccclass("PlayerGroundState")
export class PlayerGroundState extends PlayerState {
  public update(): void {
    super.update();

    this.movement.controlFlip(this.movement.speed, this.player);

    if (this.movement.isGroundDetected() && this.movement.pressJumpKey)
      this.stateMachine.changeState(this.player.jumpState);
    if (!this.movement.isGroundDetected()) this.stateMachine.changeState(this.player.airState);
    if (this.combat.pressMouseRight) this.stateMachine.changeState(this.player.primaryAttackState);
  }
}
