import { _decorator } from "cc";
import { CharacterManageCombat } from "../character/CharacterManageCombat";
const { ccclass, property } = _decorator;

@ccclass("PlayerManageCombat")
export class PlayerManageCombat extends CharacterManageCombat {
  public pressMouseRight = false;

  public handlePressPrimaryAttack(): void {
    this.pressMouseRight = true;
  }

  public handleReleasePrimaryAttack(): void {
    this.pressMouseRight = false;
  }

  public attack(): void {
    super.attack();
    console.log("Player Attack");
  }
}
