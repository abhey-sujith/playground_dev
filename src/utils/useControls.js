import { useEffect, useRef } from 'react'

export function useKeyPress(target, event) {
  useEffect(() => {
    const downHandler = ({ key }) => target.indexOf(key) !== -1 && event(true)
    const upHandler = ({ key }) => target.indexOf(key) !== -1 && event(false)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) 
}

export function useControls() {
  const keys = useRef({ forward: false, backward: false, left: false, right: false, brake: false, reset: false })
  useKeyPress(['ArrowUp', 'w'], (pressed) => (keys.current.forward = pressed))
  useKeyPress(['ArrowDown', 's'], (pressed) => (keys.current.backward = pressed))
  useKeyPress(['ArrowLeft', 'a'], (pressed) => (keys.current.left = pressed))
  useKeyPress(['ArrowRight', 'd'], (pressed) => (keys.current.right = pressed))
  useKeyPress([' '], (pressed) => (keys.current.brake = pressed))
  useKeyPress(['r'], (pressed) => (keys.current.reset = pressed))

    // Add touch event handlers
    useEffect(() => {
      const handleTouchStart = (action) => () => (keys.current[action] = true)
      const handleTouchEnd = (action) => () => (keys.current[action] = false)
  

      //const forwardButton = document.getElementById('forwardButton')
     const forwardButton = document.getElementsByClassName('aws-btn')[0];
      const backwardButton = document.getElementsByClassName('aws-btn')[2];
      const leftButton = document.getElementsByClassName('aws-btn')[1];
      const rightButton = document.getElementsByClassName('aws-btn')[3];

  
      if (forwardButton) {
        forwardButton.addEventListener('touchstart', handleTouchStart('forward'))
        forwardButton.addEventListener('touchend', handleTouchEnd('forward'))
      }
      if (backwardButton) {
        backwardButton.addEventListener('touchstart', handleTouchStart('backward'))
        backwardButton.addEventListener('touchend', handleTouchEnd('backward'))
      }
      if (leftButton) {
        leftButton.addEventListener('touchstart', handleTouchStart('left'))
        leftButton.addEventListener('touchend', handleTouchEnd('left'))
      }
      if (rightButton) {
        rightButton.addEventListener('touchstart', handleTouchStart('right'))
        rightButton.addEventListener('touchend', handleTouchEnd('right'))
      }

  
      return () => {
        if (forwardButton) {
          forwardButton.removeEventListener('touchstart', handleTouchStart('forward'))
          forwardButton.removeEventListener('touchend', handleTouchEnd('forward'))
        }
        if (backwardButton) {
          backwardButton.removeEventListener('touchstart', handleTouchStart('backward'))
          backwardButton.removeEventListener('touchend', handleTouchEnd('backward'))
        }
        if (leftButton) {
          leftButton.removeEventListener('touchstart', handleTouchStart('left'))
          leftButton.removeEventListener('touchend', handleTouchEnd('left'))
        }
        if (rightButton) {
          rightButton.removeEventListener('touchstart', handleTouchStart('right'))
          rightButton.removeEventListener('touchend', handleTouchEnd('right'))
        }
      }
    }, [])


  return keys
}


