import { _decorator, Component, Node, Vec2 } from "cc";
import { PlayerState } from "./PlayerState";
const { ccclass, property } = _decorator;

@ccclass("PlayerWallJumpState")
export class PlayerWallJumpState extends PlayerState {
  public enter(): void {
    super.enter();
    const jumpSpeed = this.movement.statWallJumpSpeed * -this.movement.facDirection;

    this.character.setVelocity(
      jumpSpeed,
      this.movement.jumpForce * this.movement.statDecreaseWallJump
    );
    this.movement.controlFlip(jumpSpeed, this.character);
  }

  update(dt: number) {
    this.stateMachine.changeState(this.character.airState);
  }
}
