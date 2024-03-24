import { _decorator, Component, Node } from 'cc';
import { DashSkill } from '../skills/DashSkill';
const { ccclass, property, type } = _decorator;

@ccclass('SkillManager')
export class SkillManager extends Component {
    private static instance: SkillManager;
    public dashSkill: DashSkill;
  
    protected onLoad(): void {
        this.dashSkill = this.getComponent(DashSkill);
      //prevent duplicate SkillManager Node in Scene
      if (!!SkillManager.instance) SkillManager.instance.node.destroy();
      SkillManager.instance = this;
    }
  
    public static getInstance(): SkillManager {
      return SkillManager.instance;
    }
}


