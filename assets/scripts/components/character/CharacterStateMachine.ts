import { _decorator } from "cc";
import { CharacterState } from "./CharacterState";
const { ccclass, property } = _decorator;

@ccclass("CharacterStateMachine")
export class CharacterStateMachine<T extends CharacterState<any>> {
  private currentState: T;

  public getCurrentState(): T {
    return this.currentState;
  }

  public initialize(_startState: T): void {
    this.currentState = _startState;
    this.currentState.enter();
  }

  public changeState(_newState: T): void {
    if (this.currentState === _newState) {
      this.currentState.enter();
      return;
    }
    this.currentState.exit();
    this.currentState = _newState;
    this.currentState.enter();
  }
}
