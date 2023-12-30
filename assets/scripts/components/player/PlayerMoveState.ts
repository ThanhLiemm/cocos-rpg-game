import { _decorator, Vec2 } from 'cc';
import { PlayerState } from './PlayerState';
const { ccclass } = _decorator;

@ccclass('PlayerMoveState')
export class PlayerMoveState extends PlayerState {

    public update(): void {
        super.update();
        this.player.getRb().linearVelocity = new Vec2(this.player.getSpeed(), this.player.getRb().linearVelocity.y);

        if (this.player.getSpeed() == 0)
            this.stateMachine.changeState(this.player.idleState);
    }
}


