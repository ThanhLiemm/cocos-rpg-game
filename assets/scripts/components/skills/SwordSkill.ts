import {
  _decorator,
  director,
  instantiate,
  Node,
  PHYSICS_2D_PTM_RATIO,
  PhysicsSystem2D,
  Prefab,
  Vec2,
  Vec3,
} from "cc";
import { toVec3 } from "../../concerns/utils/commons";
import { Skill } from "./Skill";
import { SwordSkillController } from "./SwordSkillController";
const { ccclass, property, type } = _decorator;

@ccclass("SwordSkill")
export class SwordSkill extends Skill {
  @type(Prefab)
  private swordPrefab: Prefab;
  @type(Vec2)
  private forceDir: Vec2 = new Vec2(30, 25);
  @type(Number)
  private swordGravity: number;

  //aim dots
  @type(Number)
  private numberOfDots: number;
  @type(Number)
  private spaceBetweenDots: number;
  @type(Prefab)
  private dotPrefab: Prefab;
  @type(Node)
  private dotParent: Node;

  private dots: Node[];
  private gravity = new Vec2(
    PhysicsSystem2D.instance.gravity.x / PHYSICS_2D_PTM_RATIO,
    PhysicsSystem2D.instance.gravity.y / PHYSICS_2D_PTM_RATIO
  );

  protected start(): void {
    this.generateDots();
  }

  private aimForceDir(aimDir: Vec2): Vec2 {
    return new Vec2(aimDir.normalize().x * this.forceDir.x, aimDir.normalize().y * this.forceDir.y);
  }

  public createSword(originPos: Vec3, aimDir: Vec2): void {
    const newClone: Node = instantiate(this.swordPrefab);
    newClone.parent = director.getScene().getChildByName("Canvas");
    newClone
      .getComponent(SwordSkillController)
      .setupSword(originPos, this.aimForceDir(aimDir), this.swordGravity);
    this.setActiveDots(false);
  }

  public aimDirection(): Vec2 {
    return;
  }

  private generateDots(): void {
    this.dots = new Array(this.numberOfDots).fill(new Node());
    this.dots = this.dots.map((dot) => {
      dot = instantiate(this.dotPrefab);
      dot.setParent(this.dotParent);
      dot.active = false;
      return dot;
    });
  }

  public setActiveDots(isActive: boolean): void {
    this.dots.forEach((dot) => (dot.active = isActive));
  }

  private dotsPosition(t: number, originPos: Vec3, aimDir: Vec2): Vec3 {
    const gravityDir = new Vec2(this.gravity.x, this.gravity.y)
      .multiplyScalar(this.swordGravity / PHYSICS_2D_PTM_RATIO)
      .multiplyScalar(0.5)
      .multiplyScalar(t * t);
    const destinationPosV2 = this.aimForceDir(aimDir).multiplyScalar(t);

    return new Vec3().add(originPos).add(toVec3(destinationPosV2)).add(toVec3(gravityDir));
  }

  public aim(originPos: Vec3, aimDir: Vec2): void {
    this.dots.forEach((dot, index) => {
      dot.position = this.dotsPosition(index * this.spaceBetweenDots, originPos, aimDir);
    });
  }
}
