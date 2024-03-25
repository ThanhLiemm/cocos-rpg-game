import { _decorator, Component } from "cc";
import { CloneSkill } from "../skills/CloneSkill";
import { DashSkill } from "../skills/DashSkill";
const { ccclass, property, type } = _decorator;

@ccclass("SkillManager")
export class SkillManager extends Component {
  private static _instance: SkillManager;
  private _dashSkill: DashSkill;
  private _cloneSkill: CloneSkill;

  protected onLoad(): void {
    this._dashSkill = this.getComponent(DashSkill);
    this._cloneSkill = this.getComponent(CloneSkill);
    //prevent duplicate SkillManager Node in Scene
    if (!!SkillManager.instance) SkillManager.instance.node.destroy();
    SkillManager._instance = this;
  }

  public get dashSkill() {
    return this._dashSkill;
  }

  public get cloneSkill() {
    return this._cloneSkill;
  }

  public static get instance() {
    return SkillManager._instance;
  }
}
