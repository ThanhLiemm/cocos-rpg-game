import { _decorator } from "cc";
import { PLAYER_ANIMATION_VARIABLES } from "../../../concerns/type";
import { PlayerState } from "./PlayerState";
const { ccclass } = _decorator;

@ccclass("PlayerPrimaryAttackState")
export class PlayerPrimaryAttackState extends PlayerState {
  private comboCounter = 0;
  private lastTimeAttacked: number;
  private comboWindow = 2;

  public enter(): void {
    super.enter();

    this.stateTimer = 0.1;
    if (
      this.comboCounter > 2 ||
      new Date().getTime() >= this.lastTimeAttacked + this.comboWindow * 1000
    )
      this.comboCounter = 0;
    this.player.getAnim().setValue(PLAYER_ANIMATION_VARIABLES.COMBO_COUNTER, this.comboCounter);

    let attackDirection = this.movement.facDirection;
    if (this.movement.speed !== 0)
      attackDirection = this.movement.speed / Math.abs(this.movement.speed);
    this.player.setVelocity(
      this.movement.attackMovement[this.comboCounter].x * attackDirection,
      this.movement.attackMovement[this.comboCounter].y
    );
  }

  update(dt: number) {
    super.update(dt);

    if (this.stateTimer < 0) this.player.setZeroVelocity();
    if (this.triggerCalled) this.stateMachine.changeState(this.player.idleState);
  }

  public exit(): void {
    super.exit();

    this.comboCounter++;
    this.lastTimeAttacked = new Date().getTime();
    this.player.setPlayerIsBusy(0.15);
  }
}
