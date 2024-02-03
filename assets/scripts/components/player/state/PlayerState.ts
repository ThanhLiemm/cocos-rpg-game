import { _decorator } from "cc";
import { CharacterState } from "../../character/CharacterState";
import { Player } from "../Player";
import { PlayerManageCombat } from "../PlayerManageCombat";
import { PlayerManageMovement } from "../PlayerManageMovement";
import { Character } from "../../character/Character";
const { ccclass } = _decorator;

@ccclass("PlayerState")
export class PlayerState extends CharacterState<Player> {
  protected movement: PlayerManageMovement;
  protected combat: PlayerManageCombat;

  constructor(_player: Player, _animBoolName: string) {
    super();
    this.character = _player;
    this.animBoolName = _animBoolName;
    this.stateMachine = _player.getStateMachine();
    this.movement = _player.getCharacterMovement() as PlayerManageMovement;
    this.combat = _player.getCharacterCombat() as PlayerManageCombat;
  }

  public update(dt?: number): void {
    super.update(dt);
    this.checkPlayerDash();
  }

  public checkPlayerDash(): void {
    if (this.movement.pressDash && this.movement.dashTimer < 0) {
      this.movement.dashTimer = this.movement.dashCoolDown;
      this.stateMachine.changeState(this.character.dashState);
    }
  }
}
