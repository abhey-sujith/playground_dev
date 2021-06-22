import React, { Suspense ,useRef,useEffect} from 'react'
import { Canvas,useThree,useFrame } from '@react-three/fiber'
import { Physics, usePlane,useBox } from '@react-three/cannon'
import { OrbitControls ,MapControls,Loader} from '@react-three/drei'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
// import {SpotLightHelper,SpotLight} from 'three'
import { Vector3 } from 'three';
import { useControls,Leva  } from 'leva'

//Vehicle
import Vehicle from './items/Vehicle'
import Ball from './items/Ball'

//Blender Items
import Footballground from './items/Footballground'
import MarsGallery from './items/MarsGallery'

import A from './characters/A'
import B from './characters/B'
import H from './characters/H'
import E from './characters/E'
import Y from './characters/Y'
import S from './characters/S'
import U from './characters/U'
import J from './characters/J'
import I from './characters/I'
import T from './characters/T'
import H1 from './characters/H_white'


function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

function range4(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => (start + idx)*4)
}

// Empty boxes
let world = []
for (let i = 0; i < 500; i++) {
  var x=(Math.random() * 1600 - 800)
  var y=(Math.random() * 1600 - 800)
  world.push(
    <mesh key={i} position={[(x)<50?((x<0)?((x<(-50))?x:-50):50):x, 0,(y)<50?((y<0)?((y<(-50))?y:-50):50):y]} scale={[10, Math.random() * 160 + 10, 10]}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /*ref={ref => ref && ref.translate(0, 0.5, 0)}*/ />
      <meshPhongMaterial attach="material" color="#FC2E20" flatShading={true} />
    </mesh>
  )
}


// Component - camera follows vehicle
function Camera(props) {

  const ref = useRef()
  const set = useThree(state => state.set)

  useEffect(() => void set({ camera: ref.current }), [])

  useFrame(() => {
    if (ref.current && props.target.current && props.cameraDummy.current) {
      const temp = new Vector3().setFromMatrixPosition(
        props.cameraDummy.current.matrixWorld
      );
      ref.current.position.lerp(temp, 0.05);
      ref.current.lookAt(props.target.current.position);
    }
  });

  return <perspectiveCamera ref={ref} zoom={true} {...props} />
}

//Dev tool
function LevaComponent(props) {
  const { MapControl,FollowVehicle } = useControls({ MapControl: true, FollowVehicle:false })
  
  if(FollowVehicle)
  return <Camera position={[0, 10, -15]} fov={50} target={props.vehicle} cameraDummy={props.cameraDummy}/> 


  if(MapControl)
      return  <MapControls />
  
  return  <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI /2.2} />
}

function CheckViewportSize(props) {
  const {size} = useThree()
  
  if(size.width<440){
    document.getElementById('INSTRUCTION').classList.add('hidden');
    return null
  }
  if(document.getElementById('INSTRUCTION').classList[1]==="hidden"){
    document.getElementById('INSTRUCTION').classList.remove('hidden');
  }
  return null
}


function App() {

  const vehicle = useRef(null);
  const cameraDummy = useRef(null);

  const Boxz1axis = [...range4(0,9)];
  const Boxz2axis = [...range4(0,9)];
  const Boxx1axis = [...range(-17,17)];
  const Boxx2axis = [...range4(-4,4)];

  return (
    <>
      <Leva oneLineLabels collapsed/>
      <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 20, -40], fov: 50 ,minPolarAngle:0 ,maxPolarAngle:Math.PI /2.2}}
      >
        <Suspense fallback={ null}>

        <fog attach="fog" args={['#FD7F20', 0.1, 400]} />
        <color attach="background" args={['#FD8F42']} />
        <directionalLight position={[1, 1, 1]} color="#FD8F42" />
        <directionalLight position={[-1, -1, -1]} color="#FD8F42" />
        <ambientLight color="#FD8F42" />

        <LevaComponent vehicle={vehicle} cameraDummy={cameraDummy}/>
        <CheckViewportSize/>
        
        <Physics broadphase="SAP" contactEquationRelaxation={4} friction={1e-3} allowSleep>

        <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: 'floor' }} />
          
        {
        Boxz1axis.map((value, index) => {
        return  <Box4 key ={index} args={[1, 1, 4]} position={[17.5, 1, value-0.5]} />
        })
        }

        {
        Boxz2axis.map((value, index) => {
        return  <Box4 key ={index} position={[-17.5, 1, value-0.5]} />
        })
        }

       {
       Boxx1axis.map((value, index) => {
        return  <Box1 key ={index}  position={[value, 1, 38]} />
        })
        } 

        {
        Boxx2axis.map((value, index) => {
        return  <Box4 key ={index} args={[4, 1, 1]} position={[value, 1, -3]} />
        })
        } 
 
        {world}

        <AText position={[40,5,30]}/>
        <BText position={[35,5,35]}/>
        <HText position={[30,5,40]}/>
        <EText position={[25,5,45]}/>
        <YText position={[20,5,50]}/>
        <SText position={[15,5,55]}/>
        <UText position={[10,5,60]}/>
        <JText position={[5,5,65]}/>
        <IText position={[0,5,70]}/>
        <TText position={[-5,5,75]}/>
        <H1Text position={[-10,5,80]}/>

        <Vehicle ref={vehicle} position={[-10, 1, 5]} rotation={[0, -Math.PI *1.8, 0]} angularVelocity={[0, 0.5, 0]} wheelRadius={0.3} >
          <object3D ref={cameraDummy} name="CameraDummy" position={[0, 11, -30]}  />
        </Vehicle>


        <Footballground/>
        <Ball position={[0,10,20]}/>
        
        <MarsGallery/>

        </Physics>
        </Suspense>
        <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={20} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.02} />
        <Vignette eskil={true} offset={0.1} darkness={25} />
      </EffectComposer>
      </Canvas>
      <Loader
         containerStyles={{background:'#FD8F42'}} // Flex layout styles
        // innerStyles={} // Inner container styles
        // barStyles={...bar} // Loading-bar styles
        // dataStyles={...data} // Text styles
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`} // Text
        // initialState={(active) => active} // Initial black out state
      />

      <div class="INSTRUCTION" id="INSTRUCTION" name="INSTRUCTION" style={{ position: 'absolute', top: 30, left: 40 }}>
        <pre>
          Version 1.02
          <br />
          WASD to drive, space to brake
          <br />R to reset 
        </pre>
      </div>
      {/* <div class="LOADING" id="LOADING" name="LOADING" style={{ position: 'absolute', top:75, left: 40 }}>  <pre>Loading {progress}%  </pre></div> */}
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

function AText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <A ref={ref} />
  )
}
function BText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <B  ref={ref} />
  )
}
function HText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <H ref={ref} />
  )
}
function EText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <E ref={ref} />
  )
}
function YText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <Y ref={ref} />
  )
}
function SText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <S ref={ref} />
  )
}
function UText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <U ref={ref} />
  )
}
function JText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <J ref={ref} />
  )
}
function IText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <I ref={ref} />
  )
}
function TText({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <T ref={ref} />
  )
}
function H1Text({args = [2, 4, 2],position=[0,5,10], ...props }) {
  const [ref] = useBox(() => ({ mass: 0.2 ,args,position,...props}))
  return (
    <H1 ref={ref} />
  )

}

export default App;




// function Light() {
//   const light = useRef()
//   useHelper(light, SpotLightHelper, 'cyan')
//   return <spotLight ref={light} intensity={0.5} position={[0, 10, -30]}  shadow-mapSize-width={64} shadow-mapSize-height={64} castShadow shadow-bias={-0.001} />
// }

// function MarsLights() {
//   const light = useMemo(() => new SpotLight(0xffffff), [])
//   return (
//     <>
//     <primitive object={light} position={[-10, 10, -30]} intensity={0.5} angle={0.5} shadow-mapSize-width={64} shadow-mapSize-height={64} castShadow shadow-bias={-0.001}/>
//     <primitive object={light.target} position={[-26,2,-15]}  />
//     </>
//   );
// }

// function Lights() {
//   const light = useMemo(() => new SpotLight(0xffffff), [])
//   return (
//     <>
//     <primitive object={light} position={[10, 200, -20]} intensity={0.2} angle={0.5}  />
//     <primitive object={light.target} position={[0,0,0]}  />
//     </>
//   );
// }


// function Loading() {
//   return (
//     <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
//       <sphereGeometry attach="geometry" args={[1, 16, 16]} />
//       <meshStandardMaterial
//         attach="material"
//         color="white"
//         transparent
//         opacity={0.6}
//         roughness={1}
//         metalness={0}
//       />
//     </mesh>
//   );
// }


// function hideLoadingDiv(progressvalue) {
  //   // setTimeout(function(){
  //   //   document.getElementById('LOADING').classList.add('hidden');
  //   // },10000)
  //   if(progressvalue===100){
  //      setTimeout(function(){
  //     document.getElementById('LOADING').classList.add('hidden');
  //   },1000)
  //   }
  // }
  
  // function Loaderr() {
  //   const { active, progress, errors, item, loaded, total } = useProgress()
  //   return progress
  // }