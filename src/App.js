import React, { Suspense ,useRef,useEffect,useMemo} from 'react'
import { Canvas,useThree,useFrame } from '@react-three/fiber'
import { Physics, useCylinder, usePlane,useBox } from '@react-three/cannon'
import { OrbitControls, Environment ,Stars,Billboard,MapControls,useHelper} from '@react-three/drei'
import {SpotLightHelper,SpotLight,primitive} from 'three'
import { Vector3 } from 'three';

import './App.css';
import Vehicle from './Vehicle'
import Footballground from './Footballground'
import MarsGallery from './MarsGallery'
import A from './A'
import B from './B'
import H from './H'
import E from './E'
import Y from './Y'
import S from './S'
import U from './U'
import J from './J'
import I from './I'
import T from './T'
import HWhite from './H_white'
import Ball from './Ball'

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function range4(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => (start + idx)*4)
}

let world = []
for (let i = 0; i < 50; i++) {
  var x=(Math.random() * 1600 - 800)
  var y=(Math.random() * 1600 - 800)
  world.push(
    <mesh key={i} position={[(x)<50?((x<0)?((x<(-50))?x:-50):50):x, 0,(y)<50?((y<0)?((y<(-50))?y:-50):50):y]} scale={[10, Math.random() * 160 + 10, 10]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /*ref={ref => ref && ref.translate(0, 0.5, 0)}*/ />
      <meshPhongMaterial attach="material" color="#FC2E20" flatShading={true} />
    </mesh>
  )
}



function Camera(props) {
  const ref = useRef()
  const set = useThree(state => state.set)
  // Make the camera known to the system
  useEffect(() => void set({ camera: ref.current }), [])
  // Update it every frame
  // useFrame(() => ref.current.updateMatrixWorld())

  useFrame(() => {
    if (ref.current && props.target.current && props.cameraDummy.current) {
      // console.log(props);
      const temp = new Vector3().setFromMatrixPosition(
        props.cameraDummy.current.matrixWorld
      );
      ref.current.position.lerp(temp, 0.08);
      ref.current.lookAt(props.target.current.position);
    }
  });
  return <perspectiveCamera ref={ref} zoom={true} {...props} />
}




function App() {
  const vehicle = useRef(null);
  const cameraDummy = useRef(null);
  const z1axis = [...range4(0,9)];
  const z2axis = [...range4(0,9)];
  const x1axis = [...range(-17,17)];
  const x2axis = [...range4(-4,4)];
  return (
    <>
      <Canvas dpr={[1, 1.5]} shadows //camera={{ position: [-20, 5, -5], fov: 50 ,target:vehicle}}
      >
        <fog attach="fog" args={['#FD7F20', 0.1, 400]} />
        {/* <fog attach="fog" args={['#ff6161', 100, 140]} /> */}
         {/* <Stars radius={100} depth={50} count={5000} factor={10} saturation={0} fade /> */}
        <color attach="background" args={['#FD8F42']} />
        {/* <ambientLight intensity={0.5} /> */}
        {/* <Lights /> */}
        <directionalLight position={[1, 1, 1]} color="#FD8F42" />
        <directionalLight position={[-1, -1, -1]} color="#FD8F42" />
        <ambientLight color="#FD8F42" />
       
        <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>
         
          <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
          
          
          {/* <Box position={[17.5, 1, -1]} /> */}
          {z1axis.map((value, index) => {
        return  <Box4 key ={index} args={[1, 1, 4]} position={[17.5, 1, value-0.5]} />
        })}

        {z2axis.map((value, index) => {
        return  <Box4 key ={index} position={[-17.5, 1, value-0.5]} />
        })}

       {x1axis.map((value, index) => {
        return  <Box1 key ={index}  position={[value, 1, 38]} />
        })} 

        {x2axis.map((value, index) => {
        return  <Box4 key ={index} args={[4, 1, 1]} position={[value, 1, -3]} />
        })} 

       
          
          {world}
        <A_Text position={[40,5,30]}/>
        <B_Text position={[35,5,35]}/>
        <H_Text position={[30,5,40]}/>
        <E_Text position={[25,5,45]}/>
        <Y_Text position={[20,5,50]}/>
        <S_Text position={[45,5,100]}/>
        <U_Text position={[45,10,100]}/>
        <J_Text position={[45,15,100]}/>
        <I_Text position={[45,20,100]}/>
        <T_Text position={[45,25,100]}/>
        <H_White_Text position={[45,30,100]}/>

        <Vehicle ref={vehicle} position={[-10, 1, 5]} rotation={[0, -Math.PI *1.8, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} >
          <object3D ref={cameraDummy} name="CameraDummy" position={[0, 11, -30]}  />
            </Vehicle>


          <Footballground/>
          <Ball position={[0,10,20]}/>
          <MarsGallery/>
          

        </Physics>
        <Suspense fallback={null}>
          <Environment preset="night" />
        </Suspense>
            <Camera position={[0, 10, -15]} target={vehicle} cameraDummy={cameraDummy}/>

        {/* <MapControls /> */}
        {/* <OrbitControls /> */}
      </Canvas>
      <div style={{ position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Must run fullscreen!
          <br />
          WASD to drive, space to brake
          <br />R to reset
        </pre>
      </div>
    </>
  )
}



function Plane(props) {
  const [ref] = usePlane(() => ({ type: 'Static', material: 'ground', ...props }))
  return (
    <group ref={ref}>
      <mesh receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#FC2E20" />
      </mesh>
    </group>
  )
}

function Light() {
  const light = useRef()
  useHelper(light, SpotLightHelper, 'cyan')
  return <spotLight ref={light} intensity={0.5} position={[0, 10, -30]}  shadow-mapSize-width={64} shadow-mapSize-height={64} castShadow shadow-bias={-0.001} />
}

function MarsLights() {
  const light = useMemo(() => new SpotLight(0xffffff), [])
  return (
    <>
    <primitive object={light} position={[-10, 10, -30]} intensity={0.5} angle={0.5} shadow-mapSize-width={64} shadow-mapSize-height={64} castShadow shadow-bias={-0.001}/>
    <primitive object={light.target} position={[-26,2,-15]}  />
    </>
  );
}

function Lights() {
  const light = useMemo(() => new SpotLight(0xffffff), [])
  return (
    <>
    <primitive object={light} position={[10, 200, -20]} intensity={0.2} angle={0.5}  />
    <primitive object={light.target} position={[0,0,0]}  />
    </>
  );
}

function Box1({ args = [1, 1, 1], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={'#D48C70'} />
    </mesh>
  )
}
function Box4({ args = [1, 1, 4], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2, args, ...props }))
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={args} />
      <meshStandardMaterial color={'#D48C70'} />
    </mesh>
  )
}

function A_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <A ref={ref} />
  )
}
function B_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <B  ref={ref} />
  )
}
function H_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <H ref={ref} />
  )
}
function E_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <E ref={ref} />
  )
}
function Y_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <Y ref={ref} />
  )
}
function S_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <S ref={ref} />
  )
}
function U_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <U ref={ref} />
  )
}
function J_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <J ref={ref} />
  )
}
function I_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <I ref={ref} />
  )
}
function T_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <T ref={ref} />
  )
}
function H_White_Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <HWhite ref={ref} />
  )
}
export default App;
