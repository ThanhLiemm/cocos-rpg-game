import { _decorator, animation, Component, RigidBody2D, Vec2 } from "cc";
import { PLAYER_ANIMATION_STATE } from "../../concerns/type";
import { PlayerAirState } from "./state/PlayerAirState";
import { PlayerIdleState } from "./state/PlayerIdleState";
import { PlayerJumpState } from "./state/PlayerJumpState";
import { PlayerManageMovement } from "./PlayerManageMovement";
import { PlayerMoveState } from "./state/PlayerMoveState";
import { PlayerStateMachine } from "./PlayerStateMachine";
import { PlayerDashState } from "./state/PlayerDashState";
import { PlayerWallSlideState } from "./state/PlayerWallSlideState";
import { PlayerWallJumpState } from "./state/PlayerWallJumpState";
import { PlayerManageCombat } from "./PlayerManageCombat";
import { PlayerPrimaryAttackState } from "./state/PlayerPrimaryAttackState";
const { ccclass, property } = _decorator;

@ccclass("Player")
export class Player extends Component {
  public idleState: PlayerIdleState;
  public moveState: PlayerMoveState;
  public jumpState: PlayerJumpState;
  public airState: PlayerAirState;
  public dashState: PlayerDashState;
  public wallSlideState: PlayerWallSlideState;
  public wallJumpState: PlayerWallJumpState;
  public primaryAttackState: PlayerPrimaryAttackState;

  private stateMachine: PlayerStateMachine;
  private anim: animation.AnimationController;
  private rb: RigidBody2D;
  private playerMovement: PlayerManageMovement;
  private playerCombat: PlayerManageCombat;
  public isBusy = false;

  protected onLoad(): void {
    this.anim = this.getComponentInChildren(animation.AnimationController);
    this.rb = this.getComponent(RigidBody2D);
    this.playerMovement = this.getComponent(PlayerManageMovement);
    this.playerCombat = this.getComponent(PlayerManageCombat);
    this.stateMachine = new PlayerStateMachine();

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

  protected update(dt: number): void {
    this.stateMachine.getCurrentState().update(dt);
  }

  public getAnim(): animation.AnimationController {
    return this.anim;
  }

  public getRb(): RigidBody2D {
    return this.rb;
  }

  public getPlayerMovement(): PlayerManageMovement {
    return this.playerMovement;
  }

  public getPlayerCombat(): PlayerManageCombat {
    return this.playerCombat;
  }

  public getStateMachine(): PlayerStateMachine {
    return this.stateMachine;
  }

  public getXVelocity(): number {
    return this.rb.linearVelocity.x;
  }

  public getYVelocity(): number {
    return this.rb.linearVelocity.y;
  }

  public animationTrigger(): void {
    this.stateMachine.getCurrentState().animationFinishTrigger();
  }

  public setPlayerIsBusy(time: number): void {
    this.isBusy = true;
    this.scheduleOnce(() => (this.isBusy = false), time);
  }

  public setVelocity(x: number, y: number): void {
    this.rb.linearVelocity = new Vec2(x, y);
  }

  public setZeroVelocity(): void {
    this.rb.linearVelocity = new Vec2(0, 0);
  }
}
