import { _decorator } from "cc";
import { PlayerGroundState } from "./PlayerGroundState";
const { ccclass } = _decorator;

@ccclass("PlayerMoveState")
export class PlayerMoveState extends PlayerGroundState {
  public update(): void {
    super.update();

    this.player.setVelocity(this.movement.speed, this.player.getYVelocity());

    if (this.movement.speed === 0) this.stateMachine.changeState(this.player.idleState);
  }
}
