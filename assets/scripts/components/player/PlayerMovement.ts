import { _decorator, Component } from 'cc';
import { PLAYER_MOVEMENT_EVENTS } from '../../concerns/type';
const { ccclass, property } = _decorator;

@ccclass('PlayerMovement')
export class PlayerMovement extends Component {
    private accLeft: Boolean = false;
    private accRight: Boolean = false;
    public speed: number = 0;
    @property
    protected accelerate: number = 50;
    @property
    protected maxSpeed: number = 20;

    protected onLoad(): void {
        this.node.on(PLAYER_MOVEMENT_EVENTS.PRESS_FORWARD, this.handleMoveForward, this);
        this.node.on(PLAYER_MOVEMENT_EVENTS.PRESS_BACK, this.handleMoveBack, this);
        this.node.on(PLAYER_MOVEMENT_EVENTS.RELEASE_KEY, this.handleReleaseKey, this);
    }

    protected update(dt: number): void {
        if (this.accLeft)
            this.speed -= this.accelerate * dt;
        if (this.accRight)
            this.speed += this.accelerate * dt;
        if (Math.abs(this.speed) > this.maxSpeed)
            this.speed = this.maxSpeed * this.speed / Math.abs(this.speed);
    }

    private handleMoveForward(): void {
        this.accRight = true;
    }

    private handleMoveBack(): void {
        this.accLeft = true;
    }
    private handleReleaseKey(): void {
        this.accLeft = false;
        this.accRight = false;
        this.speed = 0;
    }

    public getSpeed(): number {
        console.log(this.speed);
        return this.speed;
    }
}


