import { _decorator, Component } from "cc";
import { SkillManager } from "../global/SkillManager";
import { Player } from "./Player";
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
    SkillManager.instance.swordSkill.createSword(this.player.node.position);
  }
}
