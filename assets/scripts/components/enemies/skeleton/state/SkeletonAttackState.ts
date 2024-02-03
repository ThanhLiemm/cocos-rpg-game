import { _decorator } from "cc";
import { SkeletonState } from "./SkeletonState";
const { ccclass, property } = _decorator;

@ccclass("SkeletonAttackState")
export class SkeletonAttackState extends SkeletonState {
  public enter(): void {
    super.enter();
    this.character.setZeroVelocity();
  }

  public update(dt?: number): void {
    if (this.triggerCalled) this.stateMachine.changeState(this.character.battleState);
  }

  public exit(): void {
    super.exit();
    this.combat.lastAttack = new Date().getTime();
  }
}
