import { _decorator } from "cc";
import { SkillManager } from "../../global/SkillManager";
import { PlayerState } from "./PlayerState";
const { ccclass } = _decorator;

@ccclass("PlayerDashState")
export class PlayerDashState extends PlayerState {
  public enter(): void {
    super.enter();
    SkillManager.instance.cloneSkill.createClone(this.character.node.position);
    this.stateTimer = SkillManager.instance.dashSkill.duration;
  }

  public update(dt?: number): void {
    super.update(dt);
    const speed = SkillManager.instance.dashSkill.dashSpeed;
    this.character.setVelocity(speed * this.movement.facDirection, 0);

    if (this.stateTimer < 0) {
      this.movement.isGroundDetected()
        ? this.stateMachine.changeState(this.character.idleState)
        : this.stateMachine.changeState(this.character.airState);
    }

    if (!this.movement.isGroundDetected() && this.movement.isWallDetected())
      this.stateMachine.changeState(this.character.wallSlideState);
  }

  public exit(): void {
    super.exit();
    this.character.setVelocity(0, this.character.getYVelocity());
  }
}
