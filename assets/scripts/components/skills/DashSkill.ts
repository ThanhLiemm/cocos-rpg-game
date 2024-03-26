import { _decorator, CCFloat, Component, Node } from "cc";
import { Skill } from "./Skill";
const { ccclass, property, type } = _decorator;

@ccclass("DashSkill")
export class DashSkill extends Skill {
  @type(Number)
  public dashSpeed: number = 20;
  public duration = 0.3
}
