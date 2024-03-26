import { _decorator, Component } from "cc";
const { ccclass, property, type } = _decorator;

@ccclass("Skill")
export class Skill extends Component {
  @type(Number)
  protected cooldown: number;
  @type(Number)
  public duration: number;

  private cooldownTimer: number;

  protected update(dt: number): void {
    this.cooldownTimer -= dt;
  }

  public useSkill(): void {
    this.cooldownTimer = this.cooldown;
  }

  public canUseSkill(): boolean {
    return this.cooldownTimer > 0 ? false : true;
  }
}
