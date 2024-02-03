import { _decorator } from "cc";
import { SKELETON_ANIMATION_STATE } from "../../../concerns/type";
import { CharacterStateMachine } from "../../character/CharacterStateMachine";
import { Enemy } from "../Enemy";
import { SkeletonManageCombat } from "./SkeletonManageCombat";
import { SkeletonManageMovement } from "./SkeletonManageMovement";
import { SkeletonAttackState } from "./state/SkeletonAttackState";
import { SkeletonBattleState } from "./state/SkeletonBattleState";
import { SkeletonIdleState } from "./state/SkeletonIdleState";
import { SkeletonMoveState } from "./state/SkeletonMoveState";
import { SkeletonState } from "./state/SkeletonState";
const { ccclass, property } = _decorator;

@ccclass("Skeleton")
export class Skeleton extends Enemy {
  public idleState: SkeletonIdleState;
  public moveState: SkeletonMoveState;
  public battleState: SkeletonBattleState;
  public attackState: SkeletonAttackState;

  protected onLoad(): void {
    super.onLoad();
    this.characterMovement = this.getComponent(SkeletonManageMovement);
    this.characterCombat = this.getComponent(SkeletonManageCombat);
    this.stateMachine = new CharacterStateMachine<SkeletonState>();

    this.idleState = new SkeletonIdleState(this, SKELETON_ANIMATION_STATE.IDLE);
    this.moveState = new SkeletonMoveState(this, SKELETON_ANIMATION_STATE.MOVE);
    this.battleState = new SkeletonBattleState(this, SKELETON_ANIMATION_STATE.MOVE);
    this.attackState = new SkeletonAttackState(this, SKELETON_ANIMATION_STATE.ATTACK);
  }

  protected start(): void {
    this.stateMachine.initialize(this.idleState);
  }
}
