import { Camera, RigidBody2D, Vec2, Vec3, find } from "cc";

export const toLocalPosition = (rb: RigidBody2D, worldPosition: Vec3): Vec3 => {
  if (rb) {
    let localPosition: Vec2 = new Vec2(0, 0);
    rb.getLocalPoint(worldPosition, localPosition);
    const scale = rb.node.scale;
    return new Vec3(localPosition.x * scale.x, localPosition.y * scale.y, 0);
  }
};

export const screenToWorldPosition = (screenPos: Vec2): Vec3 => {
  const camera: Camera = find("/Canvas/Camera").getComponent(Camera);
  const pos = new Vec3(0, 0, 0);
  camera.screenToWorld(new Vec3(screenPos.x, screenPos.y), pos);
  return pos;
};

export const getRandomIntInclusive = (min: number, max: number): number => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
};
