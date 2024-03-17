import { RigidBody2D, Vec2, Vec3 } from "cc";

export const toLocalPosition = (rb: RigidBody2D, worldPosition: Vec3): Vec3 => {
  if (rb) {
    let localPosition: Vec2 = new Vec2(0, 0);
    rb.getLocalPoint(worldPosition, localPosition);
    const scale = rb.node.scale;
    return new Vec3(localPosition.x * scale.x, localPosition.y * scale.y, 0);
  }
};
