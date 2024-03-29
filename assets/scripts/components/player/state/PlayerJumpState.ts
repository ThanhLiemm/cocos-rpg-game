import { _decorator } from "cc";
import { PlayerState } from "./PlayerState";
const { ccclass } = _decorator;

@ccclass("PlayerJumpState")
export class PlayerJumpState extends PlayerState {
  public enter(): void {
    super.enter();
    this.character.setVelocity(this.movement.speed, this.movement.jumpForce);
  }

  public update(): void {
    super.update();

    if (this.character.getYVelocity() > 0)
      this.stateMachine.changeState(this.character.airState);
  }
}
