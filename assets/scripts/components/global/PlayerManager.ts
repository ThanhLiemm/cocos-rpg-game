import { _decorator, Component } from "cc";
import { Player } from "../player/Player";
const { ccclass, property, type } = _decorator;

@ccclass("PlayerManager")
export class PlayerManager extends Component {
  @type(Player)
  private playerInput: Player;

  private static _instance: PlayerManager;

  protected onLoad(): void {
    //prevent duplicate PlayerManger Node in Scene
    if (!!PlayerManager._instance) PlayerManager._instance.node.destroy();
    PlayerManager._instance = this;
  }
  
  public get player() {
    return this.playerInput;
  }

  public static get instance() {
    return PlayerManager._instance;
  }
}
