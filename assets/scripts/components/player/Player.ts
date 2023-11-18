import { _decorator, animation, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { PlayerStateMachine } from './PlayerStateMachine';
import { PlayerIdleState } from './PlayerIdleState';
import { PlayerMoveState } from './PlayerMoveState';
import { PLAYER_ANIMATION_STATE } from '../../concerns/type';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    private stateMachine: PlayerStateMachine;
    private idleState: PlayerIdleState;
    private moveState: PlayerMoveState;
    private anim: animation.AnimationController;

    protected onLoad(): void {
        this.stateMachine = new PlayerStateMachine();
        this.idleState = new PlayerIdleState(this, this.stateMachine, PLAYER_ANIMATION_STATE.IDLE);
        this.moveState = new PlayerMoveState(this, this.stateMachine, PLAYER_ANIMATION_STATE.MOVE);
        this.anim = this.getComponentInChildren(animation.AnimationController);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    protected start(): void {
        this.stateMachine.initialize(this.idleState);
    }

    protected update(dt: number): void {
        this.stateMachine.getCurrentState().update();
    }

    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    private onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_I:
                this.stateMachine.changeState(this.idleState);
                break;
            case KeyCode.KEY_M:
                this.stateMachine.changeState(this.moveState);
                break;
        }
    }

    public getAnim(): animation.AnimationController {
        return this.anim;
    }

}


