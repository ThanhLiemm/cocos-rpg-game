import { Vec2, Vec3, _decorator } from "cc";
import { CharacterManageCombat } from "../character/CharacterManageCombat";
const { ccclass, property } = _decorator;

@ccclass("PlayerManageCombat")
export class PlayerManageCombat extends CharacterManageCombat {
  private _pressMouseLeft = false;
  private _pressMouseRight = false;
  private _aimDir: Vec2 = new Vec2;

  public get pressMouseLeft(): boolean {
    return this._pressMouseLeft;
  }

  public get pressMouseRight(): boolean {
    return this._pressMouseRight;
  }

  public get aimDir(): Vec2 {
    return this._aimDir;
  }

  public handlePressPrimaryAttack(): void {
    this._pressMouseLeft = true;
  }

  public handleReleasePrimaryAttack(): void {
    this._pressMouseLeft = false;
  }

  public handlePressAim(): void {
    this._pressMouseRight = true;
  }

  public handleReleaseAim(_mousePos: Vec3): void {
    this._pressMouseRight = false;
    Vec2.subtract(
      this._aimDir,
      new Vec2(_mousePos.x, _mousePos.y),
      new Vec2(this.character.node.worldPosition.x, this.character.node.worldPosition.y));
  }

  public attack(): void {
    super.attack();
    console.log("Player Attack");
  }
}
