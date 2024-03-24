import {
  _decorator,
  CCFloat,
  CircleCollider2D,
  Collider2D,
  Component,
  Contact2DType,
  IPhysics2DContact,
  Vec2,
  Vec3,
} from "cc";
import { Character } from "./Character";
const { ccclass, property } = _decorator;

@ccclass("CharacterManageCombat")
export class CharacterManageCombat extends Component {
  @property({ type: Character })
  protected character: Character;

  //attack info
  @property({ group: { name: "range stat", id: "1" }, type: CCFloat })
  public attackCheckRadius: number;
  @property({ group: { name: "range stat", id: "1" }, type: Component })
  public attackCheck: Component;

  @property({ group: { name: "knock back stat", id: "2" }, type: Vec2 })
  private knockBackDirection: Vec2 = new Vec2(0,0);
  @property({ group: { name: "knock back stat", id: "2" }, type: CCFloat })
  private knockBackDuration: number;
  public isKnocked: boolean;

  private collider: CircleCollider2D;
  private target: Character;
  protected inAttackRange: boolean = false;

  protected onLoad(): void {
    this.collider = this.attackCheck.getComponent(CircleCollider2D);
  }

  protected update(dt: number): void {
    this.attackCheck.node.position = new Vec3(
      this.attackCheck.node.position.x,
      this.attackCheck.node.position.y
    );
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
    this.target = otherCollider.getComponent(Character);
  }

  protected onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    this.inAttackRange = false;
    this.target = undefined;
  }

  protected impAttack(): void {
    this.sendDamage();
  }

  public attack(): void {
    if (this.inAttackRange) {
      this.impAttack();
    }
  }

  public receiveDamage(): void {
    this.character.getFx().flashFX();
    this.character.getCharacterCombat().hitKnockBack();
  }

  public sendDamage(): void {
    if (this.target) {
      this.target.getCharacterCombat().receiveDamage();
    }
  }

  public hitKnockBack(): void {
    const { knockBackDirection, knockBackDuration, character } = this;
    this.isKnocked = true;

    character.setKnockBack(
      knockBackDirection.x * -character.getCharacterMovement().facDirection,
      knockBackDirection.y
    );

    this.scheduleOnce((): void => {
      this.isKnocked = false;
    }, knockBackDuration);
  }
}
