import { _decorator } from "cc";
import { SkeletonGroundState } from "./SkeletonGroundState";
const { ccclass } = _decorator;

@ccclass("SkeletonIdleState")
export class SkeletonIdleState extends SkeletonGroundState {
  public enter(): void {
    super.enter();
    this.stateTimer = this.movement.thinkTime;
    this.character.setZeroVelocity();
  }

  public update(dt?: number): void {
    super.update(dt);
    if (this.stateTimer < 0) this.stateMachine.changeState(this.character.moveState);
  }
}
