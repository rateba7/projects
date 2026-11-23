import { forwardRef } from 'react';
import { RoundedBox } from '@react-three/drei';

const Backpack = forwardRef(function Backpack({ lidRef }, ref) {
  return (
    <group ref={ref} position={[0, -0.1, 0]} rotation={[0.02, -0.25, 0]}>
      <RoundedBox args={[2.45, 2.45, 0.9]} radius={0.42} smoothness={8} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#43c6c6" roughness={0.36} metalness={0.08} />
      </RoundedBox>
      <RoundedBox args={[1.82, 1.12, 0.18]} radius={0.24} smoothness={8} position={[0, -0.48, 0.52]} castShadow>
        <meshStandardMaterial color="#238f9e" roughness={0.42} />
      </RoundedBox>
      <RoundedBox args={[1.54, 0.07, 0.08]} radius={0.035} smoothness={5} position={[0, -0.08, 0.63]}>
        <meshStandardMaterial color="#f6d68c" metalness={0.25} roughness={0.3} />
      </RoundedBox>
      <group ref={lidRef} position={[0, 1.02, 0.05]}>
        <RoundedBox args={[2.15, 0.72, 0.24]} radius={0.28} smoothness={8} position={[0, 0.12, 0.48]} rotation={[-0.12, 0, 0]} castShadow>
          <meshStandardMaterial color="#236f91" roughness={0.34} />
        </RoundedBox>
        <RoundedBox args={[0.44, 0.22, 0.12]} radius={0.08} smoothness={5} position={[0, -0.34, 0.62]}>
          <meshStandardMaterial color="#f4d18b" metalness={0.2} roughness={0.32} />
        </RoundedBox>
      </group>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 1.18, -0.55, 0]}>
          <RoundedBox args={[0.34, 0.92, 0.58]} radius={0.14} smoothness={6}>
            <meshStandardMaterial color="#77d8d1" roughness={0.45} />
          </RoundedBox>
          <mesh position={[0, 0.49, 0]}>
            <torusGeometry args={[0.17, 0.035, 8, 24]} />
            <meshStandardMaterial color="#f6d68c" metalness={0.25} />
          </mesh>
        </group>
      ))}
      {[-0.78, 0.78].map((x) => (
        <RoundedBox key={x} args={[0.24, 1.9, 0.2]} radius={0.11} smoothness={6} position={[x, -0.08, -0.48]} rotation={[0.1, 0, x * 0.12]}>
          <meshStandardMaterial color="#236f91" roughness={0.55} />
        </RoundedBox>
      ))}
      <mesh position={[0, 0.18, 0.66]}>
        <circleGeometry args={[0.22, 48]} />
        <meshStandardMaterial color="#f6d68c" emissive="#f6d68c" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 0.18, 0.69]}>
        <circleGeometry args={[0.13, 5]} />
        <meshStandardMaterial color="#238f9e" />
      </mesh>
    </group>
  );
});

export default Backpack;