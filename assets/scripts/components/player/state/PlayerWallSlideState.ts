import { _decorator, Component, Node, Vec2 } from "cc";
import { PlayerState } from "./PlayerState";
const { ccclass, property } = _decorator;

@ccclass("PlayerWallSlideState")
export class PlayerWallSlideState extends PlayerState {
  public update(dt?: number): void {
    super.update();

    if (this.movement.pressJumpKey) {
      this.stateMachine.changeState(this.character.wallJumpState);
      return;
    }
    this.movement.pressDown
      ? this.character.setVelocity(0, this.movement.statMaxFall)
      : this.character.setVelocity(0, this.character.getYVelocity() * this.movement.statDecreaseFall);
    if (this.movement.isGroundDetected()) this.stateMachine.changeState(this.character.idleState);
    if (this.movement.speed != 0 && this.movement.speed * this.movement.facDirection < 0)
      this.stateMachine.changeState(this.character.idleState);
  }
}
