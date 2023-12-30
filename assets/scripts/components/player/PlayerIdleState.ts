import { _decorator } from 'cc';
import { PlayerState } from './PlayerState';
const { ccclass } = _decorator;

@ccclass('PlayerIdleState')
export class PlayerIdleState extends PlayerState {
    public update(): void {
        super.update();

        if (this.player.getSpeed() !== 0)
            this.stateMachine.changeState(this.player.moveState);
    }
}


