import { _decorator, CCFloat, Color, Component, Sprite } from "cc";
const { ccclass, property } = _decorator;

@ccclass("CharacterFx")
export class CharacterFx extends Component {
  private sprite: Sprite;

  @property({ type: Color, group: { name: "fx stat", id: "1" } })
  private originColor = new Color("#FFFFFF");
  @property({ type: Color, group: { name: "fx stat", id: "1" } })
  private hitColor: Color = new Color("#EC818192");
  @property({ type: CCFloat, group: { name: "fx stat", id: "1" } })
  private flashTime: number;

  protected onLoad(): void {
    this.sprite = this.getComponentInChildren(Sprite);
  }

  public flashFX(): void {
    this.sprite.color = this.hitColor;
    this.scheduleOnce((): void => {
      this.sprite.color = this.originColor;
    }, this.flashTime);
  }
}
