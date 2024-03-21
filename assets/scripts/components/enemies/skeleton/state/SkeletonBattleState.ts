import { _decorator } from "cc";
import { SkeletonState } from "./SkeletonState";
const { ccclass, property } = _decorator;

@ccclass("SkeletonBattleState")
export class SkeletonBattleState extends SkeletonState {
  public enter(): void {
    super.enter();
    this.stateTimer = this.combat.battleTime;
  }
  public update(dt?: number): void {
    super.update(dt);
    this.battle();
  }

  private canAttack(): boolean {
    return new Date().getTime() >= this.combat.lastAttack + this.combat.primaryCoolDown * 1000;
  }

  private attack(): void {
    this.stateTimer = this.combat.battleTime;
    this.character.setZeroVelocity();
    if (this.canAttack()) this.stateMachine.changeState(this.character.attackState);
  }

  private battle(): void {
    this.movement.followTarget();

    if (this.movement.distanceToTarget() < this.movement.playerAttackDistance) {
      this.attack();
    }

    if (this.stateTimer < 0 || this.movement.isOutOfDetectRange()) {
      this.movement.forgetTarget();
      this.stateMachine.changeState(this.character.idleState);
    }
  }
}
