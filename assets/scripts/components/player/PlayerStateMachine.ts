import { _decorator } from 'cc';
import { PlayerState } from './PlayerState';
const { ccclass } = _decorator;

@ccclass('PlayerStateMachine')
export class PlayerStateMachine {
    private currentState: PlayerState;

    public getCurrentState(): PlayerState {
        return this.currentState;
    }

    public initialize(_startState: PlayerState): void {
        this.currentState = _startState;
        this.currentState.enter();
    }

    public changeState(_newState: PlayerState): void {
        if (this.currentState === _newState) {
            this.currentState.enter();
            return;
        }
        this.currentState.exit();
        this.currentState = _newState;
        this.currentState.enter();
    }
}


