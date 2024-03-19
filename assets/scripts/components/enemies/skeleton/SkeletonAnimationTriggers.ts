import { _decorator, Component, Node } from "cc";
import { Skeleton } from "./Skeleton";
const { ccclass, property } = _decorator;

@ccclass("SkeletonAnimationTriggers")
export class SkeletonAnimationTriggers extends Component {
  @property({ type: Skeleton })
  private skeleton: Skeleton;

  private animationTrigger(): void {
    this.skeleton.animationTrigger();
  }

  private attackTrigger(): void {
    this.skeleton.getCharacterCombat().attack();
  }
}
