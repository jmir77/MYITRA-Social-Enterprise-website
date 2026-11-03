import { useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls, ContactShadows, RoundedBox, Html, Edges, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { img } from "@/lib/site";
import { BOX_CONTENTS, type BoxItemId } from "./box-contents";

/* Units: 1 = 10 cm. Box is 25.5 x 25.5 x 6.3 cm. */
const W = 2.55;
const H = 0.63;
const T = 0.035;
const HALF = W / 2;
const CAM = new THREE.Vector3(2.9, 4.3, 3.9);
const TARGET = new THREE.Vector3(0, 0.05, -0.1);

export type BoxSceneProps = {
  open: boolean;
  labels: boolean;
  active: BoxItemId | null;
  setActive: (id: BoxItemId | null) => void;
  controls: boolean;
  zoom: boolean;
  running: boolean;
  resetKey: number;
  idle: boolean;
  onInteract: () => void;
};

function useKraftTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    g.fillStyle = "#d4a872";
    g.fillRect(0, 0, 256, 256);
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 2600; i++) {
      const v = rnd();
      g.fillStyle = v > 0.5 ? `rgba(120,82,40,${0.05 + rnd() * 0.08})` : `rgba(255,236,200,${0.05 + rnd() * 0.08})`;
      g.fillRect(rnd() * 256, rnd() * 256, 1 + rnd() * 9, 1);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(2, 2);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Card({ size, position, map }: { size: [number, number, number]; position: [number, number, number]; map: THREE.Texture }) {
  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial map={map} roughness={0.92} color="#fff4e6" />
      <Edges threshold={20} color="#8e6a3e" />
    </mesh>
  );
}

function Lid({ open, map }: { open: boolean; map: THREE.Texture }) {
  const ref = useRef<THREE.Group>(null);
  const s = useRef({ a: 0, v: 0 });
  const [kc, my] = useTexture([img("kotak-cantik-logo.png"), img("myitra-logo.jpeg")]);
  kc.colorSpace = my.colorSpace = THREE.SRGBColorSpace;
  useFrame((_, dt) => {
    const target = open ? 1.95 : 0;
    const d = Math.min(dt, 1 / 30);
    const st = s.current;
    st.v += (70 * (target - st.a) - 11 * st.v) * d;
    st.a += st.v * d;
    if (ref.current) ref.current.rotation.x = -st.a;
  });
  return (
    <group ref={ref} position={[0, H, -HALF]}>
      <Card size={[W + 0.04, T, W + 0.04]} position={[0, T / 2, HALF]} map={map} />
      <Card size={[W + 0.04, 0.32, T]} position={[0, -0.16 + T, W + 0.02]} map={map} />
      <Card size={[T, 0.26, W - 0.4]} position={[HALF - 1.6 * T, -0.13 + T, HALF + 0.1]} map={map} />
      <Card size={[T, 0.26, W - 0.4]} position={[-HALF + 1.6 * T, -0.13 + T, HALF + 0.1]} map={map} />
      <mesh position={[0, T + 0.003, HALF - 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 48]} />
        <meshStandardMaterial map={kc} transparent roughness={0.8} />
      </mesh>
      <mesh position={[0.82, T + 0.003, W - 0.32]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.46, 0.3]} />
        <meshStandardMaterial map={my} roughness={0.8} />
      </mesh>
      {/* underside: light card */}
      <mesh position={[0, -0.001, HALF]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, W]} />
        <meshStandardMaterial map={map} color="#fff8ee" roughness={1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Filler() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const N = 420;
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const o = new THREE.Object3D();
    const col = new THREE.Color();
    const palette = ["#b07c45", "#c4925a", "#9c6a38", "#d2a36c", "#a87444"];
    let seed = 3;
    const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) {
      o.position.set((r() - 0.5) * (W - 0.15), T + 0.008 + r() * 0.035, (r() - 0.5) * (W - 0.15));
      o.rotation.set((r() - 0.5) * 0.5, r() * Math.PI, (r() - 0.5) * 0.5);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      m.setColorAt(i, col.set(palette[Math.floor(r() * palette.length)]));
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N]}>
      <boxGeometry args={[0.15, 0.008, 0.025]} />
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}

const LABEL_POS: Record<BoxItemId, [number, number, number]> = {
  pads: [-0.67, 0.42, 0.62],
  liners: [0.15, 0.5, 0.85],
  brushes: [0.76, 0.4, 0.15],
  paste: [-0.45, 0.48, -0.82],
  soap: [-0.6, 0.42, -0.3],
  wash: [0.78, 0.48, -0.85],
};

function Item({ id, active, setActive, children }: { id: BoxItemId; active: BoxItemId | null; setActive: (i: BoxItemId | null) => void; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const on = active === id;
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, on ? 0.07 : 0, 10, dt);
  });
  useEffect(() => {
    ref.current?.traverse((o) => {
      const mat = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if (mat && "emissive" in mat) {
        mat.emissive.set(on ? "#5fbf4c" : "#000000");
        mat.emissiveIntensity = on ? 0.45 : 0;
      }
    });
  }, [on]);
  return (
    <group
      ref={ref}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => { e.stopPropagation(); if (e.pointerType === "mouse") setActive(id); }}
      onPointerOut={(e: ThreeEvent<PointerEvent>) => { if (e.pointerType === "mouse") setActive(null); }}
      onClick={(e: ThreeEvent<MouseEvent>) => { e.stopPropagation(); setActive(on ? null : id); }}
    >
      {children}
    </group>
  );
}

const WRAP = <meshStandardMaterial color="#ffffff" transparent opacity={0.22} roughness={0.15} depthWrite={false} />;

/* Layout follows the reference photo: toothpaste and wash bottle at the back, soap in the middle,
   pad and liner packs at the front left, five bamboo toothbrushes with a kraft band on the right. */
function Contents({ active, setActive }: { active: BoxItemId | null; setActive: (i: BoxItemId | null) => void }) {
  const p = { active, setActive };
  const roll = (key: number, x: number, y: number, len: number) => (
    <mesh key={key} position={[x, y, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
      <cylinderGeometry args={[0.046, 0.046, len, 14]} />
      <meshStandardMaterial color="#fbfbf9" roughness={0.85} />
    </mesh>
  );
  return (
    <>
      <Item id="pads" {...p}>
        <group position={[-0.67, T + 0.06, 0.62]}>
          {Array.from({ length: 10 }, (_, i) => roll(i, -0.42 + i * 0.094, 0, 0.92))}
          <RoundedBox args={[0.98, 0.13, 1.0]} radius={0.04} smoothness={2}>{WRAP}</RoundedBox>
        </group>
      </Item>
      <Item id="liners" {...p}>
        <group position={[0.15, T + 0.06, 0.65]}>
          {Array.from({ length: 5 }, (_, i) => roll(i, -0.2 + i * 0.1, 0, 0.84))}
          {Array.from({ length: 5 }, (_, i) => roll(i + 5, -0.2 + i * 0.1, 0.085, 0.84))}
          <RoundedBox args={[0.56, 0.21, 0.94]} radius={0.04} smoothness={2} position={[0, 0.04, 0]}>{WRAP}</RoundedBox>
        </group>
      </Item>
      <Item id="brushes" {...p}>
        {Array.from({ length: 5 }, (_, i) => (
          <group key={i} position={[0.5 + i * 0.13, T + 0.05, 0.25]} rotation={[0, (i - 2) * 0.025, 0]}>
            <RoundedBox args={[0.075, 0.035, 1.4]} radius={0.015} smoothness={2} castShadow>
              <meshStandardMaterial color="#efd6a8" roughness={0.6} />
            </RoundedBox>
            <mesh position={[0, 0.045, -0.6]}>
              <boxGeometry args={[0.06, 0.06, 0.18]} />
              <meshStandardMaterial color="#1d1d1d" roughness={0.95} />
            </mesh>
          </group>
        ))}
        <mesh position={[0.76, T + 0.075, 0.4]} castShadow>
          <boxGeometry args={[0.68, 0.035, 0.26]} />
          <meshStandardMaterial color="#c99c64" roughness={0.9} />
        </mesh>
      </Item>
      <Item id="paste" {...p}>
        <group position={[-0.45, T + 0.12, -0.82]}>
          <mesh rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.82]} castShadow>
            <cylinderGeometry args={[0.135, 0.11, 0.98, 24]} />
            <meshStandardMaterial color="#f8f8f6" roughness={0.35} />
          </mesh>
          <mesh position={[0.53, -0.02, 0]}>
            <boxGeometry args={[0.1, 0.025, 0.27]} />
            <meshStandardMaterial color="#f1f1ee" roughness={0.4} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.56, 0, 0]}>
            <cylinderGeometry args={[0.085, 0.085, 0.14, 18]} />
            <meshStandardMaterial color="#ececea" roughness={0.6} />
          </mesh>
        </group>
      </Item>
      <Item id="soap" {...p}>
        <group position={[-0.6, T + 0.1, -0.3]}>
          <RoundedBox args={[0.72, 0.17, 0.38]} radius={0.04} smoothness={3} castShadow>
            <meshStandardMaterial color="#efe09c" roughness={0.55} />
          </RoundedBox>
          <RoundedBox args={[0.84, 0.2, 0.48]} radius={0.03} smoothness={2}>{WRAP}</RoundedBox>
        </group>
      </Item>
      <Item id="wash" {...p}>
        <group position={[0.8, T + 0.14, -0.85]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <capsuleGeometry args={[0.13, 0.32, 8, 20]} />
            <meshStandardMaterial color="#fbfbf8" roughness={0.3} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.32, 0, 0]}>
            <cylinderGeometry args={[0.105, 0.105, 0.16, 20]} />
            <meshStandardMaterial color="#f3a9c4" roughness={0.45} />
          </mesh>
        </group>
      </Item>
    </>
  );
}

function Labels({ active, setActive }: { active: BoxItemId | null; setActive: (i: BoxItemId | null) => void }) {
  /* Narrow canvases (phones) get numbered pins that match the legend; the active pin expands to its full label. */
  const compact = useThree((s) => s.size.width) < 520;
  return (
    <>
      {BOX_CONTENTS.map((c, i) => {
        const on = active === c.id;
        if (compact && !on)
          return (
            <Html key={c.id} position={LABEL_POS[c.id]} center zIndexRange={[30, 0]} style={{ pointerEvents: "auto" }}>
              <button
                type="button"
                tabIndex={-1}
                aria-label={`${c.n} ${c.t}`}
                onClick={() => setActive(c.id)}
                className="grid size-6 select-none place-items-center rounded-full bg-[#EAF4E7]/95 text-[11px] font-bold text-deep shadow-[2px_2px_6px_rgba(62,112,50,.3),-2px_-2px_5px_rgba(255,255,255,.8)]"
              >
                {i + 1}
              </button>
            </Html>
          );
        return (
          <Html key={c.id} position={LABEL_POS[c.id]} center zIndexRange={[30, 0]} style={{ pointerEvents: "auto" }}>
            <button
              type="button"
              tabIndex={-1}
              onMouseEnter={() => setActive(c.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(on ? null : c.id)}
              className={`select-none whitespace-nowrap rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-[background-color,color,transform] duration-200 shadow-[3px_3px_8px_rgba(62,112,50,.25),-2px_-2px_6px_rgba(255,255,255,.8)] ${on ? "scale-110 bg-deep text-white" : "bg-[#EAF4E7]/95 text-deep"}`}
            >
              <span className="tabular-nums">{c.n}</span> {c.t}
            </button>
          </Html>
        );
      })}
    </>
  );
}

function Rig({ idle, resetKey, controls }: { idle: boolean; resetKey: number; controls: boolean }) {
  const { camera, controls: ctl } = useThree();
  const spin = useRef<THREE.Group | null>(null);
  useFrame((state, dt) => {
    spin.current = spin.current ?? (state.scene.getObjectByName("box-root") as THREE.Group | null);
    if (idle && spin.current) spin.current.rotation.y += dt * 0.22;
  });
  useEffect(() => {
    camera.position.copy(CAM);
    camera.lookAt(TARGET);
    const c = ctl as unknown as { target?: THREE.Vector3; update?: () => void } | null;
    if (c?.target) { c.target.copy(TARGET); c.update?.(); }
    if (spin.current) spin.current.rotation.y = -0.45;
  }, [resetKey, camera, ctl, controls]);
  return null;
}

function Scene(props: BoxSceneProps) {
  const map = useKraftTexture();
  return (
    <>
      <hemisphereLight args={["#ffffff", "#cfe6c8", 0.95]} />
      <directionalLight position={[3, 6, 4]} intensity={1.35} castShadow={false} />
      <directionalLight position={[-4, 3, -2]} intensity={0.35} color="#e8f6e2" />
      <group name="box-root" rotation={[0, -0.45, 0]} position={[0, -0.25, 0]} onPointerMissed={() => props.setActive(null)}>
        <Card size={[W, T, W]} position={[0, T / 2, 0]} map={map} />
        <Card size={[W, H, T]} position={[0, H / 2, HALF - T / 2]} map={map} />
        <Card size={[W, H, T]} position={[0, H / 2, -HALF + T / 2]} map={map} />
        <Card size={[T, H, W - 2 * T]} position={[HALF - T / 2, H / 2, 0]} map={map} />
        <Card size={[T, H, W - 2 * T]} position={[-HALF + T / 2, H / 2, 0]} map={map} />
        <Filler />
        <Contents active={props.active} setActive={props.setActive} />
        <Lid open={props.open} map={map} />
        {props.labels && props.open && <Labels active={props.active} setActive={props.setActive} />}
      </group>
      <ContactShadows position={[0, -0.26, 0]} opacity={0.38} scale={7} blur={2.6} far={2.2} color="#2D5E27" resolution={512} />
      {props.controls && (
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={props.zoom}
          minDistance={3.6}
          maxDistance={7.2}
          minPolarAngle={0.2}
          maxPolarAngle={1.32}
          enableDamping
          dampingFactor={0.08}
          target={TARGET}
          onStart={props.onInteract}
        />
      )}
      <Rig idle={props.idle} resetKey={props.resetKey} controls={props.controls} />
    </>
  );
}

export default function BoxScene(props: BoxSceneProps) {
  return (
    <Canvas
      camera={{ position: CAM.toArray(), fov: 37, near: 0.1, far: 60 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      frameloop={props.running ? "always" : "never"}
      onCreated={({ camera }) => camera.lookAt(TARGET)}
      style={{ touchAction: props.controls && props.zoom ? "none" : "pan-y" }}
    >
      <Scene {...props} />
    </Canvas>
  );
}
