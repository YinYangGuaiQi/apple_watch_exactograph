import { darken } from "./util.js";

export function drawHand(ctx, center, angle, length, color) {
  ctx.save();
  ctx.translate(center.x, center.y);
  ctx.rotate(angle);

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.lineTo(length, 0);
  ctx.stroke();

  ctx.restore();
}

export function drawHourCircle(ctx, p) {
  const { x: CX, y: CY } = p.center;
  const r = p.rHourCircle;

  ctx.save();
  ctx.translate(CX, CY);

  for (let i = 0; i < 48; i++) {
    const angle = -Math.PI/2 + (i/48)*Math.PI*2;
    const isMajor = i % 4 === 0;
    const isMedium = i % 4 === 2;

    let len, w = 3, c = p.color.hour;
    if (isMajor) len = p.tick.major;
    else if (isMedium) { len = p.tick.medium; c = darken(c, 0.4); }
    else { len = p.tick.minor; c = darken(c, 0.7); }

    ctx.beginPath();
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.moveTo(Math.cos(angle)*r, Math.sin(angle)*r);
    ctx.lineTo(Math.cos(angle)*(r-len), Math.sin(angle)*(r-len));
    ctx.stroke();
  }

  ctx.font = p.font.hour;
  ctx.fillStyle = p.color.hour;

  const nums = [
    { a: -Math.PI/2, t: "12" },
    { a: 0, t: "3" },
    { a: Math.PI/2, t: "6" },
    { a: Math.PI, t: "9" }
  ];

  for (const n of nums) {
    const x = Math.cos(n.a) * (r + p.offset.hour);
    const y = Math.sin(n.a) * (r + p.offset.hour);
    ctx.fillText(n.t, x, y);
  }

  ctx.restore();
}

export function drawRing(ctx, radius, p) {
  const { x: CX, y: CY } = p.center;

  ctx.save();
  ctx.translate(CX, CY);

  for (let i = 0; i < 600; i++) {
    const angle = -Math.PI/2 + (i / 600) * Math.PI * 2;
    const isMajor = i % 10 === 0;
    const isMedium = i % 10 === 5;

    let inner, w = 3, c = p.color.min;
    if (isMajor) {
      inner = radius - p.tick.major;
      c = p.color.min;
    } else if (isMedium) {
      inner = radius - p.tick.medium;
      c = darken(p.color.min, 0.4);
    } else {
      inner = radius - p.tick.minor;
      c = darken(p.color.min, 0.7);
    }

    ctx.beginPath();
    ctx.lineWidth = w;
    ctx.strokeStyle = c;
    ctx.moveTo(Math.cos(angle)*radius, Math.sin(angle)*radius);
    ctx.lineTo(Math.cos(angle)*inner, Math.sin(angle)*inner);
    ctx.stroke();

    if (isMajor) {
      let num = i/10 + 1;
      num = num === 1 ? 60 : num - 1;
      const txt = num.toString().padStart(2, "0");

      const tx = Math.cos(angle) * (radius + p.offset.outer);
      const ty = Math.sin(angle) * (radius + p.offset.outer);

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(angle + Math.PI/2);
      if (num >= 16 && num <= 44) ctx.rotate(Math.PI);
      ctx.font = p.font.outer;
      ctx.fillStyle = p.color.min;
      ctx.fillText(txt, 0, 0);
      ctx.restore();
    }
  }

  ctx.restore();
}
