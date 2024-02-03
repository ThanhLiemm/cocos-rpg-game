import { _decorator, animation, Component, Node, RigidBody2D, Vec2 } from "cc";
import { CharacterStateMachine } from "./CharacterStateMachine";
import { CharacterManageMovement } from "./CharacterManageMovement";
import { CharacterManageCombat } from "./CharacterManageCombat";
const { ccclass } = _decorator;

@ccclass("Character")
export class Character extends Component {
  protected stateMachine: CharacterStateMachine<any>;
  protected anim: animation.AnimationController;
  protected rb: RigidBody2D;
  protected characterMovement: CharacterManageMovement;
  protected characterCombat: CharacterManageCombat;
  protected isBusy = false;

  protected onLoad(): void {
    this.anim = this.getComponentInChildren(animation.AnimationController);
    this.rb = this.getComponent(RigidBody2D);
  }

  protected update(dt: number): void {
    this.stateMachine.getCurrentState().update(dt);
  }

  public getAnim(): animation.AnimationController {
    return this.anim;
  }

  public getRb(): RigidBody2D {
    return this.rb;
  }

  public getCharacterMovement(): CharacterManageMovement {
    return this.characterMovement;
  }

  public getCharacterCombat(): CharacterManageCombat {
    return this.characterCombat;
  }

  public getStateMachine(): CharacterStateMachine<any> {
    return this.stateMachine;
  }

  public getXVelocity(): number {
    return this.rb.linearVelocity.x;
  }

  public getYVelocity(): number {
    return this.rb.linearVelocity.y;
  }

  public getIsBusy(): boolean {
    return this.isBusy;
  }

  public animationTrigger(): void {
    this.stateMachine.getCurrentState().animationFinishTrigger();
  }

  public setPlayerIsBusy(time: number): void {
    this.isBusy = true;
    this.scheduleOnce(() => (this.isBusy = false), time);
  }

  public setVelocity(x: number, y: number): void {
    this.rb.linearVelocity = new Vec2(x, y);
  }

  public setZeroVelocity(): void {
    this.rb.linearVelocity = new Vec2(0, 0);
  }

  public setIsBusy(_isBusy: boolean): void {
    this.isBusy = _isBusy;
  }
}
