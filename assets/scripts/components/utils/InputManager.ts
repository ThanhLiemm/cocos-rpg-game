import { _decorator, Component, EventKeyboard, EventMouse, Input, input, KeyCode } from "cc";
import { PLAYER_ATTACK_EVENTS, PLAYER_MOVEMENT_EVENTS } from "../../concerns/type";
const { ccclass } = _decorator;

@ccclass("InputManager")
export class InputManager extends Component {
  protected onLoad(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  private onKeyDown(event: EventKeyboard): void {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.PRESS_BACK);
        break;
      case KeyCode.KEY_D:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.PRESS_FORWARD);
        break;
      case KeyCode.SPACE:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.PRESS_JUMP);
        break;
      case KeyCode.SHIFT_LEFT:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.PRESS_DASH);
        break;
      case KeyCode.KEY_S:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.PRESS_DOWN);
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
      case KeyCode.SPACE:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.RELEASE_JUMP);
        break;
      case KeyCode.SHIFT_LEFT:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.RELEASE_DASH);
        break;
      case KeyCode.KEY_S:
        this.node.emit(PLAYER_MOVEMENT_EVENTS.RELEASE_DOWN);
        break;
    }
  }

  private onMouseDown(event: EventMouse): void {
    switch (event.getButton()) {
      case EventMouse.BUTTON_LEFT:
        this.node.emit(PLAYER_ATTACK_EVENTS.PRESS_PRIMARY_ATTACK);
    }
  }

  private onMouseUp(event: EventMouse): void {
    switch (event.getButton()) {
      case EventMouse.BUTTON_LEFT:
        this.node.emit(PLAYER_ATTACK_EVENTS.RELEASE_PRIMARY_ATTACK);
    }
  }
}
