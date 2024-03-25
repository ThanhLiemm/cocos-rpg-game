import { _decorator, CCFloat, Component } from "cc";
const { ccclass, property, type } = _decorator;

@ccclass("Skill")
export class Skill extends Component {
  @property({ group: { name: "General", id: "1" }, type: CCFloat })
  protected cooldown: number;
  @property({ group: { name: "General", id: "1" }, type: CCFloat })
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
