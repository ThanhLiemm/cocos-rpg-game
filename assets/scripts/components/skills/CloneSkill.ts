import { Prefab, Vec3, _decorator, instantiate, Node, director, CCFloat } from 'cc';
import { Skill } from './Skill';
import { CloneSkillController } from './CloneSkillController';
const { ccclass, property, type } = _decorator;

@ccclass('CloneSkill')
export class CloneSkill extends Skill {
    @type(Prefab)
    private clonePrefab: Prefab;
    
    public duration: number = 1;

    public createClone(_newPos: Vec3): void {
        const newClone: Node = instantiate(this.clonePrefab);
        newClone.parent = director.getScene().getChildByName("Canvas");
        newClone.getComponent(CloneSkillController).setupClone(_newPos, this.duration)
    }
}


