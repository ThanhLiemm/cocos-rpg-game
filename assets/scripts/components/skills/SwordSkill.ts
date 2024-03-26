import { _decorator, CCFloat, Component, director, instantiate, Node, Prefab, Vec2, Vec3 } from "cc";
import { Skill } from "./Skill";
import { SwordSkillController } from "./SwordSkillController";
const { ccclass, property, type } = _decorator;

@ccclass("SwordSkill")
export class SwordSkill extends Skill {
  @type(Prefab)
  private swordPrefab: Prefab;
  @type(Vec2)
  private launchDir: Vec2;
  @type(Number)
  private swordGravity: number;

  public createSword(_newPos: Vec3): void {
    const newClone: Node = instantiate(this.swordPrefab);
    newClone.parent = director.getScene().getChildByName("Canvas");
    newClone.getComponent(SwordSkillController).setupSword(_newPos, this.launchDir, this.swordGravity)
}
}
