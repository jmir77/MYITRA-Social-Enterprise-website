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
    g.fillStyle = "#c89c66";
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
      <meshStandardMaterial map={map} roughness={0.92} color="#e2bd8a" />
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
        <meshStandardMaterial color="#efe2cc" roughness={1} />
      </mesh>
    </group>
  );
}

function Filler() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const N = 240;
  useLayoutEffect(() => {
    const m = ref.current;
    if (!m) return;
    const o = new THREE.Object3D();
    const col = new THREE.Color();
    const palette = ["#d8b07a", "#b98a52", "#e6c999", "#9fd28f", "#7dc36b"];
    let seed = 3;
    const r = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < N; i++) {
      o.position.set((r() - 0.5) * (W - 0.15), T + 0.02 + r() * 0.07, (r() - 0.5) * (W - 0.15));
      o.rotation.set(r() * 0.6, r() * Math.PI, r() * 0.6);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      m.setColorAt(i, col.set(palette[Math.floor(r() * palette.length)]));
    }
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, N]}>
      <boxGeometry args={[0.16, 0.012, 0.022]} />
      <meshStandardMaterial roughness={1} />
    </instancedMesh>
  );
}

const LABEL_POS: Record<BoxItemId, [number, number, number]> = {
  pads: [0, 0.5, -0.78],
  liners: [-0.85, 0.62, 0.78],
  brushes: [-0.6, 0.38, 0.02],
  paste: [0.62, 0.42, 0.02],
  soap: [-0.1, 0.45, 0.8],
  wash: [0.76, 0.52, 0.8],
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

function Contents({ active, setActive }: { active: BoxItemId | null; setActive: (i: BoxItemId | null) => void }) {
  const p = { active, setActive };
  return (
    <>
      <Item id="pads" {...p}>
        {Array.from({ length: 10 }, (_, i) => (
          <group key={i} position={[-1.0 + i * 0.222, T + 0.09, -0.78]}>
            <RoundedBox args={[0.19, 0.17, 0.82]} radius={0.04} smoothness={3} castShadow>
              <meshStandardMaterial color={i % 2 ? "#2f6fc4" : "#3b7fd6"} roughness={0.55} />
            </RoundedBox>
            <mesh position={[0, 0.087, 0]}>
              <boxGeometry args={[0.15, 0.004, 0.18]} />
              <meshStandardMaterial color="#f4f8ff" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </Item>
      <Item id="liners" {...p}>
        {Array.from({ length: 10 }, (_, i) => (
          <RoundedBox key={i} args={[0.56, 0.032, 0.36]} radius={0.012} smoothness={2} position={[-0.85, T + 0.02 + i * 0.035, 0.78]} rotation={[0, (i % 2 ? 1 : -1) * 0.03, 0]} castShadow>
            <meshStandardMaterial color={i % 2 ? "#f6cfdc" : "#fdf1f5"} roughness={0.7} />
          </RoundedBox>
        ))}
      </Item>
      <Item id="brushes" {...p}>
        {Array.from({ length: 5 }, (_, i) => (
          <group key={i} position={[-0.55, T + 0.06, -0.22 + i * 0.11]}>
            <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.032, 0.036, 1.0, 12]} />
              <meshStandardMaterial color="#c79a5c" roughness={0.75} />
            </mesh>
            <mesh position={[-0.42, 0.045, 0]}>
              <boxGeometry args={[0.16, 0.05, 0.05]} />
              <meshStandardMaterial color={["#f4f4ee", "#a6dd94", "#f4f4ee", "#7dc36b", "#f4f4ee"][i]} roughness={0.9} />
            </mesh>
          </group>
        ))}
      </Item>
      <Item id="paste" {...p}>
        <group position={[0.62, T + 0.11, 0.02]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.1, 0.12, 0.82, 20]} />
            <meshStandardMaterial color="#f7f9f6" roughness={0.45} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.05, 0, 0]}>
            <cylinderGeometry args={[0.114, 0.114, 0.22, 20]} />
            <meshStandardMaterial color="#468B34" roughness={0.5} />
          </mesh>
          <mesh position={[0.44, -0.01, 0]}>
            <boxGeometry args={[0.07, 0.03, 0.26]} />
            <meshStandardMaterial color="#e9eee7" roughness={0.5} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.47, 0, 0]}>
            <cylinderGeometry args={[0.055, 0.055, 0.12, 16]} />
            <meshStandardMaterial color="#2D5E27" roughness={0.4} />
          </mesh>
        </group>
      </Item>
      <Item id="soap" {...p}>
        <RoundedBox args={[0.58, 0.2, 0.38]} radius={0.06} smoothness={4} position={[-0.1, T + 0.11, 0.8]} castShadow>
          <meshStandardMaterial color="#f3ecd8" roughness={0.5} />
        </RoundedBox>
      </Item>
      <Item id="wash" {...p}>
        <group position={[0.76, T + 0.16, 0.8]}>
          <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.6, 24]} />
            <meshStandardMaterial color="#fbfbf8" roughness={0.35} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.153, 0.153, 0.28, 24]} />
            <meshStandardMaterial color="#e9a3bb" roughness={0.5} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.36, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.14, 16]} />
            <meshStandardMaterial color="#c2456f" roughness={0.4} />
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
      camera={{ position: CAM.toArray(), fov: 34, near: 0.1, far: 60 }}
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
