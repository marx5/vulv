import * as THREE from 'three'

/**
 * Điều khiển trackball 360° (kéo xoay, quán tính, pinch/wheel zoom) cho nhóm 3D.
 * Quản lý khoảng cách camera mục tiêu và tự gỡ toàn bộ event listener khi dispose.
 */
export function createTrackballControls({ domEl, systemGroup, initialDistance }) {
  let targetCameraDistance = initialDistance
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let initialPinchDist = null
    let lastInteractionTime = Date.now()
    const velocity = { x: 0, y: 0 }

    const onPointerDown = (e) => {
      if (e.touches && e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        initialPinchDist = Math.hypot(dx, dy)
        return
      }
      isDragging = true
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0
      velocity.x = 0
      velocity.y = 0
      lastInteractionTime = Date.now()
    }

    const onPointerMove = (e) => {
      if (e.touches && e.touches.length === 2 && initialPinchDist) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const currentDist = Math.hypot(dx, dy)
        const pinchDelta = (initialPinchDist - currentDist) * 0.015
        targetCameraDistance = THREE.MathUtils.clamp(targetCameraDistance + pinchDelta, 4.2, 9.5)
        initialPinchDist = currentDist
        lastInteractionTime = Date.now()
        return
      }

      if (!isDragging) return

      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

      const deltaX = clientX - prevMouseX
      const deltaY = clientY - prevMouseY

      const sensitivity = 0.0075
      const rotX = deltaY * sensitivity
      const rotY = deltaX * sensitivity

      const deltaQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(rotX, rotY, 0, 'XYZ')
      )
      systemGroup.quaternion.multiplyQuaternions(deltaQuat, systemGroup.quaternion)

      velocity.x = rotY
      velocity.y = rotX

      prevMouseX = clientX
      prevMouseY = clientY
      lastInteractionTime = Date.now()
    }

    const onPointerUp = () => {
      isDragging = false
      initialPinchDist = null
      lastInteractionTime = Date.now()
    }

    const onWheel = (e) => {
      e.preventDefault()
      const zoomStep = Math.sign(e.deltaY) * 0.45
      targetCameraDistance = THREE.MathUtils.clamp(targetCameraDistance + zoomStep, 4.2, 9.5)
      lastInteractionTime = Date.now()
    }

    domEl.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    window.addEventListener('mouseup', onPointerUp, { passive: true })

    domEl.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('touchmove', onPointerMove, { passive: true })
    window.addEventListener('touchend', onPointerUp, { passive: true })
    domEl.addEventListener('wheel', onWheel, { passive: false })

  return {
    get targetDistance() {
      return targetCameraDistance
    },
    set targetDistance(value) {
      targetCameraDistance = value
    },
    /** Áp dụng quán tính hoặc tự xoay khi không tương tác */
    update(delta) {
      if (!isDragging) {
        if (Math.abs(velocity.x) > 0.0001 || Math.abs(velocity.y) > 0.0001) {
          const inertiaQuat = new THREE.Quaternion().setFromEuler(
            new THREE.Euler(velocity.y, velocity.x, 0, 'XYZ')
          )
          systemGroup.quaternion.multiplyQuaternions(inertiaQuat, systemGroup.quaternion)
          velocity.x *= 0.91
          velocity.y *= 0.91
        } else if (Date.now() - lastInteractionTime > 1200) {
          const autoRotateQuat = new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            0.22 * delta
          )
          systemGroup.quaternion.multiplyQuaternions(autoRotateQuat, systemGroup.quaternion)
        }
      }
    },
    dispose() {
      domEl.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      domEl.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)
      domEl.removeEventListener('wheel', onWheel)
    },
  }
}
