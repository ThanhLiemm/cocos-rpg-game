import { _decorator, Component, find } from "cc";
import { Skeleton } from "../enemies/skeleton/Skeleton";
import { Player } from "../player/Player";
const { ccclass, property } = _decorator;

@ccclass("CharacterAnimationTriggers")
export class CharacterAnimationTriggers extends Component {
  private player: Player;
  private skeleton: Skeleton;

  protected onLoad(): void {
    this.player = find("Canvas/Player").getComponent(Player);
    this.skeleton = find("Canvas/Skeleton").getComponent(Skeleton);
  }

  private playerAnimationTrigger(): void {
    this.player.animationTrigger();
  }

  private skeletonAnimationTrigger(): void {
    this.skeleton.animationTrigger();
  }
}
