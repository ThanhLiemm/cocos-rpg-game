import { _decorator } from "cc";
import { CharacterState } from "../../../character/CharacterState";
import { Skeleton } from "../Skeleton";
import { SkeletonManageCombat } from "../SkeletonManageCombat";
import { SkeletonManageMovement } from "../SkeletonManageMovement";
const { ccclass, property } = _decorator;

@ccclass("SkeletonState")
export class SkeletonState extends CharacterState<Skeleton> {
  protected movement: SkeletonManageMovement;
  protected combat: SkeletonManageCombat;

  constructor(skeleton: Skeleton, _animBoolName: string) {
    super();
    this.character = skeleton;
    this.animBoolName = _animBoolName;
    this.stateMachine = skeleton.getStateMachine();
    this.movement = skeleton.getCharacterMovement() as SkeletonManageMovement;
    this.combat = skeleton.getCharacterCombat() as SkeletonManageCombat;
  }
}
