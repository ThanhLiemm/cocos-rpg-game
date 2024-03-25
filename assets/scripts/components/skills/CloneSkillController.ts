import {
    _decorator,
    animation,
    CircleCollider2D,
    Collider2D,
    Color,
    Component,
    Contact2DType,
    IPhysics2DContact,
    math,
    Sprite,
    Vec3
} from "cc";
import { getRandomIntInclusive } from "../../concerns/utils/commons";
import { Character } from "../character/Character";
import { PlayerManager } from "../global/PlayerManager";
const { ccclass, type } = _decorator;

@ccclass("CloneSkillController")
export class CloneSkillController extends Component {
  @type(Number)
  private loseColorSpeed: number = 200;

  private cloneTimer: number;
  private sprite: Sprite;
  private anim: animation.AnimationController;
  private collider: CircleCollider2D;
  private attackCheck: Component;
  private inAttackRange: boolean;

  protected onLoad(): void {
    this.sprite = this.getComponent(Sprite);
    this.anim = this.getComponent(animation.AnimationController);
    this.attackCheck = this.getComponentInChildren(Component);
    this.collider = this.attackCheck.getComponent(CircleCollider2D);
  }

  protected start(): void {
    if (this.collider) {
      this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
  }

  protected update(dt: number): void {
    this.updateAttackCheck();
    this.cloneTimer -= dt;
    if (this.cloneTimer <= 0) {
      this.decreaseColor(dt);
    }
  }

  public setupClone(_newPos: Vec3, cloneDuration: number): void {
    const playerDirection = PlayerManager.instance.player.getCharacterMovement().facDirection;
    this.node.position = _newPos;
    this.node.setScale(playerDirection * this.node.scale.x, this.node.scale.y);
    this.cloneTimer = cloneDuration;
    this.anim.setValue("Attack_Number", getRandomIntInclusive(1, 3));
  }

  protected onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    this.inAttackRange = true;
    contact.disabledOnce;
    PlayerManager.instance.player.getCharacterCombat().target =
      otherCollider.getComponent(Character);
  }

  protected onEndContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    this.inAttackRange = false;
    PlayerManager.instance.player.getCharacterCombat().target = undefined;
  }

  private decreaseColor(dt): void {
    const opacity = math.clamp(this.sprite.color.a - dt * this.loseColorSpeed, 0, 255);
    this.sprite.color = new Color(255, 255, 255, opacity);
    if (this.sprite.color.a <= 0) this.node.destroy();
  }

  private updateAttackCheck(): void {
    this.attackCheck.node.position = new Vec3(
      this.attackCheck.node.position.x,
      this.attackCheck.node.position.y
    );
  }

  private animationTrigger(): void {
    this.cloneTimer = -1; // < 0
  }

  private attackTrigger(): void {
    if (this.inAttackRange) PlayerManager.instance.player.getCharacterCombat().attack();
  }
}
