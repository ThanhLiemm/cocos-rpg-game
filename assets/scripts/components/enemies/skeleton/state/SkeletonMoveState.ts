import { _decorator, Component, Node } from "cc";
import { SkeletonState } from "./SkeletonState";
import { SkeletonGroundState } from "./SkeletonGroundState";
const { ccclass, property } = _decorator;

@ccclass("SkeletonMoveState")
export class SkeletonMoveState extends SkeletonGroundState {
  public update(dt?: number): void {
    super.update(dt);

    this.character.setVelocity(
      this.movement.speed * this.movement.facDirection,
      this.character.getYVelocity()
    );
    if (this.movement.isWallDetected() || !this.movement.isGroundDetected()) {
      this.movement.flip(this.character);
      this.stateMachine.changeState(this.character.idleState);
    }
  }
}
