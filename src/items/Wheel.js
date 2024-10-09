import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useCylinder } from '@react-three/cannon'

useGLTF.preload('/Wheel.glb')

// Auto-generated by: https://github.com/pmndrs/gltfjsx
const Wheel = forwardRef(({ radius = 0.7, leftSide, pos,posz,...props }, ref) => {
  const { nodes, materials } = useGLTF('/Wheel.glb')
  useCylinder(() => ({ mass: 1, type: 'Kinematic', material: 'wheel', collisionFilterGroup: 0, args: [radius, radius, 0.5, 16], ...props }), ref)
  return (
    <mesh ref={ref}>
       <group scale={[-1.3, -1.3, -1.3]}>
       <mesh geometry={nodes.Mesh_wheel_frontLeft012.geometry} material={materials['carTire.015']} />
      <mesh geometry={nodes.Mesh_wheel_frontLeft012_1.geometry} material={materials['plastic.016']} />
      <mesh geometry={nodes.Mesh_wheel_frontLeft012_2.geometry} material={materials.paintYellow} />
      </group>
    </mesh>
  )
})

export default Wheel