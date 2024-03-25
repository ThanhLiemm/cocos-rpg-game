import { Node } from "cc";

export enum PLAYER_ANIMATION_STATE {
  IDLE = "Idle",
  MOVE = "Move",
  JUMP = "Jump",
  DASH = "Dash",
  WALL_SLIDE = "WallSlide",
  ATTACK = "Attack",
}

export enum SKELETON_ANIMATION_STATE {
  IDLE = "Idle",
  MOVE = "Move",
  HIT = "Hit",
  REACT = "React",
  DEAD = "Dead",
  ATTACK = "Attack",
}

export enum PLAYER_MOVEMENT_EVENTS {
  PRESS_FORWARD = "press_forward",
  PRESS_BACK = "press_back",
  RELEASE_KEY = "release_key",
  PRESS_JUMP = "press_jump",
  RELEASE_JUMP = "release_jump",
  PRESS_DASH = "press_dash",
  RELEASE_DASH = "release_dash",
  PRESS_DOWN = "press_down",
  RELEASE_DOWN = "release_down",
}

export enum PLAYER_ATTACK_EVENTS {
  PRESS_PRIMARY_ATTACK = "press_primary_attack",
  RELEASE_PRIMARY_ATTACK = "release_primary_attack",
}

export enum PLAYER_ANIMATION_VARIABLES {
  Y_VELOCITY = "YVelocity",
  COMBO_COUNTER = "ComboCounter",
}

export enum RENDER_ORDER {
  CAMERA = 0,
  BACKGROUND = 1,
  SKELETON = 2,
  PLAYER_CLONE = 3,
  PLAYER = 4,
  TILE_MAP = 5,
}

export interface RaycastResults {
  target: Node;
  distance: number;
}
