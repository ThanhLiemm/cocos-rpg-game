import { _decorator, CCFloat } from "cc";
import { CharacterManageCombat } from "../character/CharacterManageCombat";
const { ccclass, property } = _decorator;

@ccclass("EnemyManageCombat")
export class EnemyManageCombat extends CharacterManageCombat {
  @property({ group: { name: "Combat Stat", id: "3" }, type: CCFloat })
  public primaryCoolDown;
  @property({ group: { name: "Combat Stat", id: "3" }, type: CCFloat })
  public lastAttack = 0;
  @property({ group: { name: "Combat Stat", id: "3" }, type: CCFloat })
  public battleTime = 4;

  public attack(): void {
    super.attack();
    if (this.inAttackRange) console.log("Skeleton Attack");
  }
}
