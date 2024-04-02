import { _decorator, Component } from "cc";
import { SkillManager } from "../global/SkillManager";
import { Player } from "./Player";
import { PlayerManageCombat } from "./PlayerManageCombat";
const { ccclass, property } = _decorator;

@ccclass("PlayerAnimationTriggers")
export class PlayerAnimationTriggers extends Component {
  @property({ type: Player })
  private player: Player;

  private animationTrigger(): void {
    this.player.animationTrigger();
  }

  private attackTrigger(): void {
    if (this.player.getCharacterCombat().inAttackRange) this.player.getCharacterCombat().attack();
  }

  private throwSword(): void {
    const combat = this.player.getCharacterCombat() as PlayerManageCombat;
    SkillManager.instance.swordSkill.createSword(this.player.node.position, combat.aimDir);
  }
}
