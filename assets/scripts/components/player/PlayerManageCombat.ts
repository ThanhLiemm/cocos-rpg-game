import { _decorator } from "cc";
import { CharacterManageCombat } from "../character/CharacterManageCombat";
const { ccclass, property } = _decorator;

@ccclass("PlayerManageCombat")
export class PlayerManageCombat extends CharacterManageCombat {
  private _pressMouseLeft = false;
  private _pressMouseRight = false;

  public get pressMouseLeft(): boolean {
    return this._pressMouseLeft;
  }

  public get pressMouseRight(): boolean {
    return this._pressMouseRight;
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

  public handleReleaseAim(): void {
    this._pressMouseRight = false;
  }

  public attack(): void {
    super.attack();
    console.log("Player Attack");
  }
}
