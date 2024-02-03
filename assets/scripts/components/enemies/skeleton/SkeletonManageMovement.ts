import { _decorator } from "cc";
import { EnemyManageMovement } from "../EnemyManageMovement";
const { ccclass, property } = _decorator;

@ccclass("SkeletonManageMovement")
export class SkeletonManageMovement extends EnemyManageMovement {}
