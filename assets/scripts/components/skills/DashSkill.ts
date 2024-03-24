import { _decorator, Component, Node } from "cc";
import { Skill } from "./Skill";
const { ccclass, property, type } = _decorator;

@ccclass("DashSkill")
export class DashSkill extends Skill {
  @type(Number)
  public dashDuration: number = 0.3;
  @type(Number)
  public dashSpeed: number = 20;
}
