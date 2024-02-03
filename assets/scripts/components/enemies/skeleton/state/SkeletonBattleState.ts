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
    this.followTarget();
    this.attack();
  }

  private followTarget(): void {
    const { speed, facDirection, target } = this.movement;
    let facDir;

    if (target.position.x > this.character.node.position.x) facDir = 1;
    else if (target.position.x < this.character.node.position.x) facDir = -1;

    this.movement.controlFlip(facDir, this.character);
    this.character.setVelocity(speed * facDirection, this.character.getYVelocity());
  }

  private attack(): void {
    const { playerAttackDistance, distanceToPlayer } = this.movement;
    if (distanceToPlayer < playerAttackDistance) {
      this.stateTimer = this.combat.battleTime;
      this.character.setZeroVelocity();
      if (this.canAttack()) this.stateMachine.changeState(this.character.attackState);
    } else {
      if (this.stateTimer < 0 || this.movement.isForgotPlayer(this.character.node))
        this.stateMachine.changeState(this.character.idleState);
    }
  }

  private canAttack(): boolean {
    return new Date().getTime() >= this.combat.lastAttack + this.combat.primaryCoolDown * 1000;
  }
}
