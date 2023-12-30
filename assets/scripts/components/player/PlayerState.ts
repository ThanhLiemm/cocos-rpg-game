import { _decorator, Vec2 } from 'cc';
import { Player } from './Player';
import { PlayerStateMachine } from './PlayerStateMachine';
const { ccclass } = _decorator;

@ccclass('PlayerState')
export class PlayerState {
    protected stateMachine: PlayerStateMachine;
    protected player: Player;
    private animBoolName: string;

    constructor(_player: Player, _stateMachine: PlayerStateMachine, _animBoolName: string) {
        this.player = _player;
        this.stateMachine = _stateMachine;
        this.animBoolName = _animBoolName;
    }

    public enter(): void {
        this.player.getAnim().setValue(this.animBoolName, true);
    }

    public update(): void {
        this.player.getRb().linearVelocity = new Vec2(this.player.getSpeed(), this.player.getRb().linearVelocity.y);

        if (this.player.getSpeed() == 0)
            this.stateMachine.changeState(this.player.idleState);

    }

    public exit(): void {
        this.player.getAnim().setValue(this.animBoolName, false);
    }
}


