import { _decorator, animation, CircleCollider2D, Component, RigidBody2D, Vec2, Vec3 } from "cc";
import { RENDER_ORDER } from "../../concerns/type";
import { Player } from "../player/Player";
const { ccclass, property } = _decorator;

@ccclass("SwordSkillController")
export class SwordSkillController extends Component {
  private anim: animation.AnimationController;
  private rb: RigidBody2D;
  private collider: CircleCollider2D;
  private player: Player;

  protected onLoad(): void {
    this.anim = this.getComponent(animation.AnimationController);
    this.rb = this.getComponent(RigidBody2D);
    this.collider = this.getComponent(CircleCollider2D);
  }

  public setupSword(_newPos: Vec3, _dir: Vec2, _gravityScale: number): void {
    this.node.position = _newPos;
    this.node.setSiblingIndex(RENDER_ORDER.PLAYER_WEAPON);
    this.rb.linearVelocity = _dir;
    this.rb.gravityScale = _gravityScale;
  }
}
