/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/footballground.glb')
  return (
    <group ref={group} {...props} dispose={null} scale={[20,10,40]} position={[0,0.01,0]} rotation={[0,3.14,0]}>
       <mesh geometry={nodes.Plane.geometry} material={materials['Material.001']}>
        <mesh
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.002']}
          position={[0.23, 0.19, -0.83]}
          scale={[-0.008, -0.2, 0.008]}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/footballground.glb')