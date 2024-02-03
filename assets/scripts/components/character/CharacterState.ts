import { _decorator } from "cc";
import { Character } from "./Character";
import { CharacterStateMachine } from "./CharacterStateMachine";
const { ccclass } = _decorator;

@ccclass("CharacterState")
export class CharacterState<T extends Character> {
  protected stateMachine: CharacterStateMachine<any>;
  protected character: T;
  protected stateTimer: number = 0;
  protected triggerCalled: boolean;
  protected animBoolName: string;

  public enter(): void {
    this.character.getAnim().setValue(this.animBoolName, true);
    this.triggerCalled = false;
  }

  public update(dt?: number): void {
    this.stateTimer -= dt;
  }

  public exit(): void {
    this.character.getAnim().setValue(this.animBoolName, false);
  }

  public animationFinishTrigger(): void {
    this.triggerCalled = true;
  }
}
