import { _decorator, animation, Component, RigidBody2D } from 'cc';
import { PLAYER_ANIMATION_STATE } from '../../concerns/type';
import { PlayerIdleState } from './PlayerIdleState';
import { PlayerMovement } from './PlayerMovement';
import { PlayerMoveState } from './PlayerMoveState';
import { PlayerStateMachine } from './PlayerStateMachine';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    private stateMachine: PlayerStateMachine;
    public idleState: PlayerIdleState;
    public moveState: PlayerMoveState;
    private anim: animation.AnimationController;
    private rb: RigidBody2D;
    private speed = 0;
    @property({ type: PlayerMovement })
    public playerMovement: PlayerMovement;

    protected onLoad(): void {
        this.stateMachine = new PlayerStateMachine();
        this.idleState = new PlayerIdleState(this, this.stateMachine, PLAYER_ANIMATION_STATE.IDLE);
        this.moveState = new PlayerMoveState(this, this.stateMachine, PLAYER_ANIMATION_STATE.MOVE);
        this.anim = this.getComponentInChildren(animation.AnimationController);
        this.rb = this.getComponent(RigidBody2D);
    }

    protected start(): void {
        this.stateMachine.initialize(this.idleState);
    }

    protected update(dt: number): void {
        this.stateMachine.getCurrentState().update();
        this.speed = this.playerMovement.getSpeed();
    }

    public getAnim(): animation.AnimationController {
        return this.anim;
    }

    public getRb(): RigidBody2D {
        return this.rb;
    }

    public getSpeed(): number {
        return this.speed;
    }

}


