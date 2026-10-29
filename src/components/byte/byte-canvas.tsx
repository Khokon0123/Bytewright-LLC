"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { CUBES, cubePose, groupYaw, type Pose } from "./timeline";

const BLUE = "#4f8ef7";

/** Fine, slightly uneven grain for roughness + bump: matte, not plastic. Deterministic seed. */
function useGrain() {
  return useMemo(() => {
    const size = 256;
    const data = new Uint8Array(size * size * 4);
    let s = 1337;
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < size * size; i++) {
      const v = 190 + Math.floor(rand() * 34); // 0.75–0.88 roughness: fine grain, no glitter
      data.set([v, v, v, 255], i * 4);
    }
    const tex = new THREE.DataTexture(data, size, size);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(2, 2);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

/** Soft radial texture, white for the floor glow or black for the contact shadow. */
function useRadial(rgb: string, mid = 0.35) {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grd.addColorStop(0, `rgba(${rgb},1)`);
    grd.addColorStop(0.35, `rgba(${rgb},${mid})`);
    grd.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [rgb, mid]);
}

type Props = {
  /** live: own clock + cursor tilt. capture: time driven by window.__byteSetTime(t). */
  mode?: "live" | "capture";
  /** stop rendering (hero off screen) */
  paused?: boolean;
  onFirstFrame?: () => void;
};

function Byte({ mode, paused, onFirstFrame }: Required<Pick<Props, "mode">> & Props) {
  const group = useRef<THREE.Group>(null);
  const tilt = useRef<THREE.Group>(null);
  const cubes = useRef<(THREE.Mesh | null)[]>([]);
  const clock = useRef(0);
  const captured = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const first = useRef(false);
  const pose = useMemo<Pose>(() => ({ position: new THREE.Vector3(), quaternion: new THREE.Quaternion() }), []);
  const grain = useGrain();
  const glow = useRadial("255,255,255");
  const blob = useRadial("0,0,0", 0.55);
  const invalidate = useThree((s) => s.invalidate);

  // cursor tilt (desktop live only)
  useEffect(() => {
    if (mode !== "live") return;
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mode]);

  // capture hook for rendering the still and the phone video frame by frame
  useEffect(() => {
    if (mode !== "capture") return;
    const w = window as unknown as { __byteSetTime?: (t: number) => Promise<void> };
    w.__byteSetTime = (t: number) =>
      new Promise((resolve) => {
        captured.current = t;
        invalidate();
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
    return () => {
      delete w.__byteSetTime;
    };
  }, [mode, invalidate]);

  useFrame((_, delta) => {
    if (mode === "live" && !paused) clock.current += Math.min(delta, 0.05);
    const t = mode === "live" ? clock.current : captured.current;
    if (group.current) group.current.rotation.y = groupYaw(t) + 0.35;
    for (let i = 0; i < 8; i++) {
      const m = cubes.current[i];
      if (!m) continue;
      cubePose(i, t, pose);
      m.position.copy(pose.position);
      m.quaternion.copy(pose.quaternion);
    }
    if (tilt.current && mode === "live") {
      // ease toward the cursor: ±0.18 rad, never more
      const k = 1 - Math.exp(-delta * 2.5);
      tilt.current.rotation.x += (pointer.current.y * 0.18 - tilt.current.rotation.x) * k;
      tilt.current.rotation.z += (-pointer.current.x * 0.12 - tilt.current.rotation.z) * k;
    }
    if (!first.current) {
      first.current = true;
      requestAnimationFrame(() => onFirstFrame?.());
    }
  });

  return (
    <>
      {/* reflections only: one big softbox top-left and a thin blue strip behind, built in-scene (no HDR download) */}
      <Environment resolution={64} frames={1} environmentIntensity={0.5}>
        <Lightformer form="rect" intensity={3} color="#fff4e6" position={[-5, 6, 3]} scale={[6, 4, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.5} color={BLUE} position={[-4, -0.4, -6]} scale={[6, 0.2, 1]} target={[0, 0, 0]} />
      </Environment>

      {/* key: soft, top-left, long falloff */}
      <spotLight
        position={[-5, 8, 3.5]}
        angle={0.45}
        penumbra={1}
        intensity={1500}
        decay={2}
        color="#fff6ea"
      />
      {/* faint fill so the dark side keeps its form */}
      <directionalLight position={[4, 1, 5]} intensity={0.12} color="#dfe4ff" />
      {/* thin rim in brand blue: directly behind the object relative to the camera, so only silhouette edges catch it */}
      <directionalLight position={[-5.45, -0.4, -6.6]} intensity={9} color={BLUE} />
      <ambientLight intensity={0.02} />

      <group ref={tilt}>
        <group ref={group}>
          {CUBES.map((_, i) => (
            <RoundedBox
              key={i}
              ref={(m: THREE.Mesh | null) => {
                cubes.current[i] = m;
              }}
              args={[0.92, 0.92, 0.92]}
              radius={0.07}
              smoothness={5}
            >
              <meshStandardMaterial
                color="#151517"
                roughness={0.7}
                roughnessMap={grain}
                bumpMap={grain}
                bumpScale={0.18}
                metalness={0.12}
              />
            </RoundedBox>
          ))}
        </group>
      </group>

      {/* floor: a faint glow pooled under the object, and a soft contact shadow.
          A baked blob instead of shadow maps: no hard plane edges, and no shadow pass every frame. */}
      <mesh rotation-x={-Math.PI / 2} position-y={-1.42}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial map={blob} transparent opacity={0.85} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-1.41}>
        {/* must fade to nothing inside the frame, or the canvas edge shows as a line */}
        <planeGeometry args={[3.6, 3.6]} />
        <meshBasicMaterial map={glow} transparent opacity={0.16} depthWrite={false} toneMapped={false} />
      </mesh>
    </>
  );
}

/** Compiles every shader off the main thread (KHR_parallel_shader_compile) before the first visible frame. */
function Warmup({ onReady }: { onReady: () => void }) {
  const { gl, scene, camera } = useThree();
  useEffect(() => {
    let alive = true;
    gl.compileAsync(scene, camera)
      .catch(() => {})
      .finally(() => alive && onReady());
    return () => {
      alive = false;
    };
  }, [gl, scene, camera, onReady]);
  return null;
}

export default function ByteCanvas({ mode = "live", paused = false, onFirstFrame }: Props) {
  const [compiled, setCompiled] = useState(mode === "capture");
  const ready = useCallback(() => setCompiled(true), []);
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={mode === "capture" ? "demand" : paused || !compiled ? "never" : "always"}
      camera={{ position: [5.45, 4.0, 6.6], fov: 30, near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: mode === "capture", powerPreference: "high-performance" }}
      onCreated={({ camera }) => camera.lookAt(0, -0.15, 0)}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      {!compiled && <Warmup onReady={ready} />}
      <Byte mode={mode} paused={paused} onFirstFrame={onFirstFrame} />
    </Canvas>
  );
}
