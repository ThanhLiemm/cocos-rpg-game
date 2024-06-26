import { _decorator, Component, EventKeyboard, EventMouse, Input, input, KeyCode } from "cc";
import { PlayerManageCombat } from "../../components/player/PlayerManageCombat";
import { PlayerManageMovement } from "../../components/player/PlayerManageMovement";
import { PlayerManager } from "./PlayerManager";
import { screenToWorldPosition } from "../../concerns/utils/commons";
const { ccclass } = _decorator;

@ccclass("InputManager")
export class InputManager extends Component {
  private playerMovement: PlayerManageMovement;
  private playerCombat: PlayerManageCombat;
  protected start(): void {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);

    this.playerMovement = PlayerManager.instance.player.getComponent(PlayerManageMovement);
    this.playerCombat = PlayerManager.instance.player.getComponent(PlayerManageCombat);
  }

  private onKeyDown(event: EventKeyboard): void {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.playerMovement.handleMoveBack();
        break;
      case KeyCode.KEY_D:
        this.playerMovement.handleMoveForward();
        break;
      case KeyCode.SPACE:
        this.playerMovement.handlePressJump();
        break;
      case KeyCode.SHIFT_LEFT:
        this.playerMovement.handlePressDash();
        break;
      case KeyCode.KEY_S:
        this.playerMovement.handlePressDown();
        break;
    }
  }

  private onKeyUp(event: EventKeyboard): void {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.playerMovement.handleReleaseKey();
        break;
      case KeyCode.KEY_D:
        this.playerMovement.handleReleaseKey();
        break;
      case KeyCode.SPACE:
        this.playerMovement.handleReleaseJump();
        break;
      case KeyCode.SHIFT_LEFT:
        this.playerMovement.handleReleaseDash();
        break;
      case KeyCode.KEY_S:
        this.playerMovement.handleReleaseDown();
        break;
    }
  }

  private onMouseDown(event: EventMouse): void {
    switch (event.getButton()) {
      case EventMouse.BUTTON_LEFT:
        this.playerCombat.handlePressPrimaryAttack();
        break;
      case EventMouse.BUTTON_RIGHT:
        this.playerCombat.handlePressAim(screenToWorldPosition(event.getLocation()));
        break;
    }
  }

  private onMouseUp(event: EventMouse): void {
    switch (event.getButton()) {
      case EventMouse.BUTTON_LEFT:
        this.playerCombat.handleReleasePrimaryAttack();
        break;
      case EventMouse.BUTTON_RIGHT:
        this.playerCombat.handleReleaseAim(screenToWorldPosition(event.getLocation()));
        break;
    }
  }
}
