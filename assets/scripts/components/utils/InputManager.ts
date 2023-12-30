import { _decorator, Component, EventKeyboard, Input, input, KeyCode } from 'cc';
import { PLAYER_MOVEMENT_EVENTS } from '../../concerns/type';
const { ccclass } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {

    protected onLoad(): void {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.node.emit(PLAYER_MOVEMENT_EVENTS.PRESS_BACK)
                break;
            case KeyCode.KEY_D:
                this.node.emit(PLAYER_MOVEMENT_EVENTS.PRESS_FORWARD);
                break;
        }
    }

    private onKeyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.node.emit(PLAYER_MOVEMENT_EVENTS.RELEASE_KEY);
                break;

            case KeyCode.KEY_D:
                this.node.emit(PLAYER_MOVEMENT_EVENTS.RELEASE_KEY);
                break;
        }
    }
}


