/**
 * "The Byte": 8 cubes in a 2×2×2 block (8 bits, 1 byte).
 * Everything is a pure function of time, so the live canvas, the still image and the phone video
 * all come from the same motion.
 *
 * Every CYCLE seconds the block opens slightly, the top ring of four cubes steps one slot clockwise
 * while the bottom ring steps the other way, each cube turns a quarter, and everything settles back
 * with a spring. The block also turns 45° per cycle, so after two cycles (12 s) it looks exactly as it
 * started: that is the loop length of the video.
 */
import * as THREE from "three";

export const CYCLE = 6; // seconds
export const LOOP = CYCLE * 2; // seconds until the object looks identical again
export const HALF = 0.5; // centre-to-centre half spacing; cubes are 0.92 wide → 0.08 seams

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const window01 = (u: number, a: number, b: number) => clamp01((u - a) / (b - a));
const easeInOutCubic = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
/** Spring-ish settle: overshoots ~6% then comes to rest. */
const easeOutBack = (x: number, k = 1.4) => 1 + (k + 1) * Math.pow(x - 1, 3) + k * Math.pow(x - 1, 2);

/** Per-cube constants: starting ring angle, layer, and the axis it spins on during each event. */
export const CUBES = Array.from({ length: 8 }, (_, i) => {
  const top = i < 4;
  const theta = Math.PI / 4 + (i % 4) * (Math.PI / 2);
  const axes = [
    [1, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, 1],
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
  ];
  return { top, theta, spinAxis: new THREE.Vector3(...(axes[i] as [number, number, number])), spinDir: i % 2 ? 1 : -1 };
});

const R = HALF * Math.SQRT2; // ring radius in xz
const _q1 = new THREE.Quaternion();
const _q2 = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);

export type Pose = { position: THREE.Vector3; quaternion: THREE.Quaternion };

/** Group yaw at time t: a slow, constant turn. */
export const groupYaw = (t: number) => (t / CYCLE) * (Math.PI / 4);

/** Writes the pose of cube i at time t into `out`. */
export function cubePose(i: number, t: number, out: Pose) {
  const n = Math.floor(t / CYCLE);
  const u = t - n * CYCLE;

  // open → hold → spring back
  const open = easeInOutCubic(window01(u, 3.8, 4.5));
  const close = easeOutBack(window01(u, 5.15, 6.0));
  const spread = u < 5.15 ? open : 1 - close; // goes slightly negative on overshoot: a tiny squeeze
  const scale = 1 + 0.42 * spread;

  // ring step (rings move while the block is open)
  const step = easeInOutCubic(window01(u, 4.35, 5.25));
  const c = CUBES[i];
  const ringDir = c.top ? 1 : -1;
  const ring = ringDir * (n + step) * (Math.PI / 2);
  const angle = c.theta + ring;
  out.position.set(Math.cos(angle) * R * scale, (c.top ? HALF : -HALF) * scale, Math.sin(angle) * R * scale);

  // orientation: follow the ring, plus a quarter spin per event with the same spring settle
  const spin = (n + easeOutBack(window01(u, 3.95, 5.7), 1.1)) * (Math.PI / 2) * c.spinDir;
  _q1.setFromAxisAngle(_up, -ring);
  _q2.setFromAxisAngle(c.spinAxis, spin);
  out.quaternion.copy(_q1).multiply(_q2);
}
