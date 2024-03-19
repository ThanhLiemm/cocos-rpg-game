import {
  _decorator,
  CCFloat,
  CircleCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  ERigidBody2DType,
  IPhysics2DContact,
  RigidBody2D,
  Vec2,
  Vec3,
} from "cc";
import { Character } from "./Character";
const { ccclass, property } = _decorator;

@ccclass("CharacterManageCombat")
export class CharacterManageCombat extends Component {

  @property({type: Character})
  protected character: Character;

  //attack info
  @property({ group: { name: "range stat", id: "1" }, type: CCFloat })
  public attackCheckRadius: number;
  @property({ group: { name: "range stat", id: "1" }, type: Component })

  public attackCheck: Component;
  private collider: CircleCollider2D;
  private rb: RigidBody2D;
  protected inAttackRange: boolean = false;

  protected onLoad(): void {
    this.collider = this.attackCheck.getComponent(CircleCollider2D);
    this.rb = this.attackCheck.getComponent(RigidBody2D);
  }

  protected update(dt: number): void {
    this.attackCheck.node.position = new Vec3(this.attackCheck.node.position.x, this.attackCheck.node.position.y);
  }

  protected start(): void {
    if (this.collider) {
      this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  protected onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    this.inAttackRange = true;
    contact.disabledOnce;
  }

  protected onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    this.inAttackRange = false;
  }

  public attack(): void {
  }
}
