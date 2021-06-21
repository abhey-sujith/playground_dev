/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'

const Model= forwardRef(( props, ref) => {
  const { nodes, materials } = useGLTF('/J.glb')
  return (
    <group ref={ref} {...props} dispose={null}  position={props.position} >
      <mesh
        geometry={nodes.Text.geometry}
        material={materials['Material.001']}
        position={[0, 0.5, 0]}
        rotation={[Math.PI / 2, 0, Math.PI-0.5 ]}
        scale={[5,5,5]}
      />
    </group>
  )
})

useGLTF.preload('/J.glb')

export default Model