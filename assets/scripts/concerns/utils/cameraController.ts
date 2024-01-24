import { _decorator, Camera, CCFloat, Component, misc, Node, Vec2, Vec3 } from 'cc';
import { Player } from '../../components/player/Player';
const { ccclass, type, property } = _decorator;

@ccclass('cameraController')
export class cameraController extends Component {

    @type(Node)
    public player: Node;
    @property({ group: { name: "camera stat", id: "1" }, type: CCFloat })
    public ratio: number = 0.1;
    @property({ group: { name: "camera stat", id: "1" }, type: CCFloat })
    public minHeight: number = 0;
    @property({ group: { name: "camera stat", id: "1" }, type: CCFloat })
    public maxHeight: number = 0;
    @property({ group: { name: "camera stat", id: "1" }, type: CCFloat })
    public orthHeight: number = 0;

    private camera: Camera;

    protected onLoad(): void {
        this.camera = this.node.getComponent(Camera);
    }

    protected start(): void {
        this.camera.orthoHeight = this.orthHeight;
    }

    update(deltaTime: number) {
        this.followPlayer();
    }

    private followPlayer(): void {
        const { player, node, minHeight, maxHeight, ratio } = this;
        let targetPos = player.position;
        const currentPos = node.position;
        targetPos = new Vec3(targetPos.x, misc.clampf(targetPos.y, minHeight, maxHeight), currentPos.z);
        Vec2.lerp(currentPos, currentPos, targetPos, ratio);
        this.node.setPosition(currentPos);
    }
}


