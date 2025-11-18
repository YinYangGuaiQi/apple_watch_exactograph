import { resizeParams, getAngles } from "./util.js";
import { 
  drawHourCircle, drawHand, drawRing 
} from "./draw.js";

let canvas, ctx, params;

export function initClock(c) {
  canvas = c;
  ctx = canvas.getContext("2d");
  onResize();

  window.addEventListener("resize", onResize);
  requestAnimationFrame(loop);
}

function onResize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  params = resizeParams(canvas);
}

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const { hour, min, sec } = getAngles();

  drawHourCircle(ctx, params);
  drawHand(ctx, params.center, hour, params.rHour, params.color.hour);
  drawHand(ctx, params.center, min, params.lMin, params.color.min);
  drawHand(ctx, params.center, sec, params.lSec, params.color.sec);

  const minCenter = shiftCenter(params.center, min, params.fixedMin);
  const secCenter = shiftCenter(params.center, sec, params.fixedSec);

  ctx.save();
  ctx.translate(minCenter.x - params.center.x, minCenter.y - params.center.y);
  drawRing(ctx, params.rMin, params);
  ctx.restore();

  ctx.save();
  ctx.translate(secCenter.x - params.center.x, secCenter.y - params.center.y);
  drawRing(ctx, params.rSec, params);
  ctx.restore();

  requestAnimationFrame(loop);
}

function shiftCenter(center, angle, dist) {
  return {
    x: center.x + Math.cos(angle + Math.PI) * dist,
    y: center.y + Math.sin(angle + Math.PI) * dist
  };
}
