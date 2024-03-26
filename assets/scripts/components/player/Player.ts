import { _decorator } from "cc";
import { PLAYER_ANIMATION_STATE } from "../../concerns/type";
import { Character } from "../character/Character";
import { CharacterStateMachine } from "../character/CharacterStateMachine";
import { PlayerManageCombat } from "./PlayerManageCombat";
import { PlayerManageMovement } from "./PlayerManageMovement";
import { PlayerAimSwordState } from "./state/PlayerAimSwordState";
import { PlayerAirState } from "./state/PlayerAirState";
import { PlayerCatchSwordState } from "./state/PlayerCatchSwordState";
import { PlayerDashState } from "./state/PlayerDashState";
import { PlayerIdleState } from "./state/PlayerIdleState";
import { PlayerJumpState } from "./state/PlayerJumpState";
import { PlayerMoveState } from "./state/PlayerMoveState";
import { PlayerPrimaryAttackState } from "./state/PlayerPrimaryAttackState";
import { PlayerState } from "./state/PlayerState";
import { PlayerWallJumpState } from "./state/PlayerWallJumpState";
import { PlayerWallSlideState } from "./state/PlayerWallSlideState";
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
  public aimSwordState: PlayerAimSwordState;
  public catchSwordState: PlayerCatchSwordState;

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
    this.aimSwordState = new PlayerAimSwordState(this, PLAYER_ANIMATION_STATE.AIM_SWORD);
    this.catchSwordState = new PlayerCatchSwordState(this, PLAYER_ANIMATION_STATE.CATCH_SWORD);
  }

  protected start(): void {
    this.stateMachine.initialize(this.idleState);
  }
}
