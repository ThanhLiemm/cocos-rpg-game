import { _decorator, Component, Node } from "cc";
const { ccclass, property, type } = _decorator;

@ccclass("Skill")
export class Skill extends Component {
  @type(Number)
  protected cooldown: number;
  private cooldownTimer: number;

  public useSkill(): void {}

  public canUseSkill(): boolean {
    if (this.cooldownTimer > 0) return false;

    this.useSkill();
    this.cooldownTimer = this.cooldown;
    return true;
  }

  protected update(dt: number): void {
    this.cooldownTimer -= dt;
  }
}
