import { _decorator, Vec3 } from "cc";
import { SkillManager } from "../../global/SkillManager";
import { PlayerState } from "./PlayerState";
const { ccclass, property } = _decorator;

@ccclass("PlayerAimSwordState")
export class PlayerAimSwordState extends PlayerState {
  public enter(): void {
    super.enter();
    SkillManager.instance.swordSkill.setActiveDots(true);
  }

  public update(dt?: number): void {
    super.update();

    SkillManager.instance.swordSkill.aim(new Vec3(0, 0), this.combat.aimDir);
    if (!this.combat.pressMouseRight) this.stateMachine.changeState(this.character.idleState);
  }
}
