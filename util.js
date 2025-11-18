export function darken(hex, factor) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) hex = hex.split("").map(x => x + x).join("");

  const r = Math.floor(parseInt(hex.slice(0,2),16) * (1 - factor));
  const g = Math.floor(parseInt(hex.slice(2,4),16) * (1 - factor));
  const b = Math.floor(parseInt(hex.slice(4,6),16) * (1 - factor));

  return "#" + 
    r.toString(16).padStart(2,"0") +
    g.toString(16).padStart(2,"0") +
    b.toString(16).padStart(2,"0");
}

export function getAngles() {
  const t = new Date();
  const sec = t.getSeconds() + t.getMilliseconds() / 1000;
  const min = t.getMinutes() + sec / 60;
  const hour = (t.getHours() % 12) + min / 60;

  return {
    sec: -Math.PI/2 + (sec/60)*Math.PI*2,
    min: -Math.PI/2 + (min/60)*Math.PI*2,
    hour: -Math.PI/2 + (hour/12)*Math.PI*2
  };
}

export function resizeParams(canvas) {
  const base = Math.min(canvas.width, canvas.height);

  return {
    center: { x: canvas.width/2, y: canvas.height/2 },

    rHour: base * 0.2,
    rHourCircle: base * 0.2,

    rMin: base * 2,
    rSec: base * 3,

    lMin: base * 0.3,
    lSec: base * 0.42,

    fixedMin: base * 2 - base * 0.3,
    fixedSec: base * 3 - base * 0.42,

    tick: {
      major: base * 0.057,
      medium: base * 0.038,
      minor: base * 0.024,
    },

    offset: {
      outer: -base * 0.076,
      hour: -base * 0.095
    },

    font: {
      outer: `${base * 0.038}px "PingFangMedium"`,
      hour: `${base * 0.067}px "PingFangMedium"`
    },

    color: {
      min: "#ffeadd",
      sec: "#f0f0f0",
      hour: "#f0f0f0"
    }
  };
}
