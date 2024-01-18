import { _decorator, Component, Node } from "cc";
import { PLAYER_ATTACK_EVENTS } from "../../concerns/type";
const { ccclass, property } = _decorator;

@ccclass("PlayerManageCombat")
export class PlayerManageCombat extends Component {
  public pressMouseRight = false;

  protected onLoad(): void {
    this.node.on(PLAYER_ATTACK_EVENTS.PRESS_PRIMARY_ATTACK, this.handlePressPrimaryAttack, this);
    this.node.on(
      PLAYER_ATTACK_EVENTS.RELEASE_PRIMARY_ATTACK,
      this.handleReleasePrimaryAttack,
      this
    );
  }
  start() {}

  update(deltaTime: number) {}

  private handlePressPrimaryAttack(): void {
    this.pressMouseRight = true;
  }

  private handleReleasePrimaryAttack(): void {
    this.pressMouseRight = false;
  }
}
