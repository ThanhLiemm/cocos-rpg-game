import { _decorator, animation, Component, RigidBody2D, Vec2 } from "cc";
import { PLAYER_ANIMATION_STATE } from "../../concerns/type";
import { PlayerAirState } from "./state/PlayerAirState";
import { PlayerIdleState } from "./state/PlayerIdleState";
import { PlayerJumpState } from "./state/PlayerJumpState";
import { PlayerManageMovement } from "./PlayerManageMovement";
import { PlayerMoveState } from "./state/PlayerMoveState";
import { PlayerDashState } from "./state/PlayerDashState";
import { PlayerWallSlideState } from "./state/PlayerWallSlideState";
import { PlayerWallJumpState } from "./state/PlayerWallJumpState";
import { PlayerManageCombat } from "./PlayerManageCombat";
import { PlayerPrimaryAttackState } from "./state/PlayerPrimaryAttackState";
import { CharacterStateMachine } from "../character/CharacterStateMachine";
import { PlayerState } from "./state/PlayerState";
import { Character } from "../character/Character";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Character {
  public idleState: PlayerIdleState;
  public moveState: PlayerMoveState;
  public jumpState: PlayerJumpState;
  public airState: PlayerAirState;
  public dashState: PlayerDashState;
  public wallSlideState: PlayerWallSlideState;
  public wallJumpState: PlayerWallJumpState;
  public primaryAttackState: PlayerPrimaryAttackState;

  protected onLoad(): void {
    super.onLoad();
    this.characterMovement = this.getComponent(PlayerManageMovement);
    this.characterCombat = this.getComponent(PlayerManageCombat);
    this.stateMachine = new CharacterStateMachine<PlayerState>();

    this.idleState = new PlayerIdleState(this, PLAYER_ANIMATION_STATE.IDLE);
    this.moveState = new PlayerMoveState(this, PLAYER_ANIMATION_STATE.MOVE);
    this.jumpState = new PlayerJumpState(this, PLAYER_ANIMATION_STATE.JUMP);
    this.airState = new PlayerAirState(this, PLAYER_ANIMATION_STATE.JUMP);
    this.dashState = new PlayerDashState(this, PLAYER_ANIMATION_STATE.DASH);
    this.wallSlideState = new PlayerWallSlideState(this, PLAYER_ANIMATION_STATE.WALL_SLIDE);
    this.wallJumpState = new PlayerWallJumpState(this, PLAYER_ANIMATION_STATE.JUMP);
    this.primaryAttackState = new PlayerPrimaryAttackState(this, PLAYER_ANIMATION_STATE.ATTACK);
  }

  protected start(): void {
    this.stateMachine.initialize(this.idleState);
  }

}
