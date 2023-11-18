import { _decorator, Component, Node } from 'cc';
import { PlayerStateMachine } from './PlayerStateMachine';
import { Player } from './Player';
const { ccclass, property } = _decorator;

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
        console.log("I update ", this.animBoolName);

    }

    public exit(): void {
        this.player.getAnim().setValue(this.animBoolName, false);
    }
}


