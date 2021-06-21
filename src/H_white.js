/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'

const Model= forwardRef(( props, ref) => {
  const { nodes, materials } = useGLTF('/H_white.glb')
  return (
    <group ref={ref} {...props} dispose={null} position={props.position} >
      <mesh
        geometry={nodes.Text.geometry}
        material={materials['Material.001']}
        position={[0, 0.0001, 0]}
        rotation={[Math.PI / 2, 0,  Math.PI-0.5]}
        scale={[6,6,6]}
      />
    </group>
  )
})

useGLTF.preload('/H_white.glb')

export default Model