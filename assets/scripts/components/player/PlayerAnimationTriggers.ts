import { _decorator, Component, find, Node } from "cc";
import { Player } from "./Player";
const { ccclass, property } = _decorator;

@ccclass("PlayerAnimationTriggers")
export class PlayerAnimationTriggers extends Component {
  private player: Player;

  protected onLoad(): void {
    const parentsNode = find("Canvas/Player");
    this.player = parentsNode.getComponent(Player);
  }

  private animationTrigger(): void {
    this.player.animationTrigger();
  }
}
