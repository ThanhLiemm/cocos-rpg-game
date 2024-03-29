import { _decorator } from "cc";
import { SkeletonState } from "./SkeletonState";
const { ccclass, property } = _decorator;

@ccclass("SkeletonGroundState")
export class SkeletonGroundState extends SkeletonState {
  start() {}

  update(deltaTime: number) {
    super.update(deltaTime);
    if (this.movement.hasTarget()) this.stateMachine.changeState(this.character.battleState);
  }
}
