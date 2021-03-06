/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useSphere} from '@react-three/cannon'

export default function Model({  ...props }) {
  const [ref] = useSphere(() => ({ mass: 0.2, ...props }))
  const { nodes, materials } = useGLTF('/ball.glb')
  return (
    <group ref={ref} {...props} dispose={null} position={props.position}>
      <mesh geometry={nodes.Cube.geometry} material={materials['Material.004']} />
    </group>
  )
}

useGLTF.preload('/ball.glb')
