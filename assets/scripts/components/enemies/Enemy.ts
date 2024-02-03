import { _decorator } from "cc";
import { Character } from "../character/Character";
const { ccclass, property } = _decorator;

@ccclass("Enemy")
export class Enemy extends Character {}
