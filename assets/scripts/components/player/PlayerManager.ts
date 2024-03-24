import { _decorator, Component } from "cc";
import { Player } from "./Player";
const { ccclass, property, type } = _decorator;

@ccclass("PlayerManager")
export class PlayerManager extends Component {
  private static instance: PlayerManager;
  @type(Player)
  public player: Player;

  protected onLoad(): void {
    //prevent duplicate PlayerManger Node in Scene
    if (!!PlayerManager.instance) PlayerManager.instance.node.destroy();
    PlayerManager.instance = this;
  }

  public static getInstance(): PlayerManager {
    return PlayerManager.instance;
  }
}
