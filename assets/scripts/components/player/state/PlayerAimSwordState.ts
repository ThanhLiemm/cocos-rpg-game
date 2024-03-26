import { _decorator, Component, Node } from "cc";
import { PlayerState } from "./PlayerState";
const { ccclass, property } = _decorator;

@ccclass("PlayerAimSwordState")
export class PlayerAimSwordState extends PlayerState {
  public update(dt?: number): void {
    super.update();
    if (!this.combat.pressMouseRight) this.stateMachine.changeState(this.character.idleState);
  }
}
