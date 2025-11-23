import Konva from 'konva';

export function limitToStage(this: Konva.Node, pos: Konva.Vector2d): Konva.Vector2d {
  const node = this;
  const stage = node.getStage();
  if (!stage) return pos;

  const stageWidth = stage.width();
  const stageHeight = stage.height();

  // node.width() / height() are unreliable for some shapes
  // size() returns the shape's configured width/height for Rect/Ellipse;
  // for Circle/RegularPolygon you must compute manually if needed.
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  let width = 0;
  let height = 0;

  if (typeof (node as any).radius === 'function') {
    const r = (node as any).radius();
    width = r * 2 * scaleX;
    height = r * 2 * scaleY;
  } else if (typeof (node as any).radiusX === 'function') {
    const rx = (node as any).radiusX();
    const ry = (node as any).radiusY();
    width = rx * 2 * scaleX;
    height = ry * 2 * scaleY;
  } else if (node.size) {
    const s = node.size();
    width = s.width * scaleX;
    height = s.height * scaleY;
  }

  let x = pos.x;
  let y = pos.y;

  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + width > stageWidth) x = stageWidth - width;
  if (y + height > stageHeight) y = stageHeight - height;

  return { x, y };
}
