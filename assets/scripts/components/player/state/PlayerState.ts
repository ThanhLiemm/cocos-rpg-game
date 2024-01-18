import { _decorator } from "cc";
import { Player } from "../Player";
import { PlayerManageMovement } from "../PlayerManageMovement";
import { PlayerStateMachine } from "../PlayerStateMachine";
import { PlayerManageCombat } from "../PlayerManageCombat";
const { ccclass } = _decorator;

@ccclass("PlayerState")
export class PlayerState {
  protected stateMachine: PlayerStateMachine;
  protected player: Player;
  protected movement: PlayerManageMovement;
  protected combat: PlayerManageCombat;
  protected stateTimer: number;
  protected triggerCalled: boolean;
  private animBoolName: string;

  constructor(_player: Player, _animBoolName: string) {
    this.player = _player;
    this.animBoolName = _animBoolName;
    this.stateMachine = _player.getStateMachine();
    this.movement = _player.getPlayerMovement();
    this.combat = _player.getPlayerCombat();
  }

  public enter(): void {
    this.player.getAnim().setValue(this.animBoolName, true);
    this.triggerCalled = false;
  }

  public update(dt?: number): void {
    this.stateTimer -= dt;
    this.checkPlayerDash();
  }

  public exit(): void {
    this.player.getAnim().setValue(this.animBoolName, false);
  }

  public checkPlayerDash(): void {
    if (this.movement.pressDash && this.movement.dashTimer < 0) {
      this.movement.dashTimer = this.movement.dashCoolDown;
      this.stateMachine.changeState(this.player.dashState);
    }
  }

  public animationFinishTrigger(): void {
    this.triggerCalled = true;
  }
}
