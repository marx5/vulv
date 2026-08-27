import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PALETTE = [
  new THREE.Color('#38bdf8'), // Cyan (Frontend)
  new THREE.Color('#818cf8'), // Indigo/Purple (Backend)
  new THREE.Color('#34d399'), // Emerald (DevOps)
  new THREE.Color('#f472b6'), // Rose/Pink (Architecture/Extra)
]

export default function ThreeSkillsCanvas({ activeCategoryIndex = 0 }) {
  const containerRef = useRef(null)
  const activeIdxRef = useRef(activeCategoryIndex)

  // Sync active category index into ref without re-creating scene
  useEffect(() => {
    activeIdxRef.current = activeCategoryIndex
  }, [activeCategoryIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Track disposables for complete memory cleanup
    const geometries = []
    const materials = []

    const registerGeometry = (geo) => {
      geometries.push(geo)
      return geo
    }

    const registerMaterial = (mat) => {
      materials.push(mat)
      return mat
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      (container.clientWidth || 300) / (container.clientHeight || 300),
      0.1,
      100
    )
    camera.position.z = 6.5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    })
    renderer.setSize(container.clientWidth || 300, container.clientHeight || 300)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    container.appendChild(renderer.domElement)

    // Master Group
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // 2. Core Glowing Polyhedron
    const coreGeometry = registerGeometry(new THREE.IcosahedronGeometry(1.35, 2))
    const initialColor = PALETTE[activeIdxRef.current % PALETTE.length] || PALETTE[0]
    const coreMaterial = registerMaterial(
      new THREE.MeshPhongMaterial({
        color: 0x0c1e3d,
        emissive: initialColor.clone(),
        emissiveIntensity: 0.45,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      })
    )
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    mainGroup.add(coreMesh)

    // Inner Core Sphere
    const innerGeo = registerGeometry(new THREE.SphereGeometry(0.7, 16, 16))
    const innerMat = registerMaterial(
      new THREE.MeshBasicMaterial({
        color: initialColor.clone(),
        transparent: true,
        opacity: 0.22,
      })
    )
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    mainGroup.add(innerMesh)

    // 3. Orbital Rings (Torus with optimized segments)
    const createRing = (radius, colorHex, rotationX, rotationY) => {
      const ringGeo = registerGeometry(new THREE.TorusGeometry(radius, 0.016, 12, 64))
      const ringMat = registerMaterial(
        new THREE.MeshBasicMaterial({
          color: colorHex,
          transparent: true,
          opacity: 0.5,
        })
      )
      const ring = new THREE.Mesh(ringGeo, ringMat)
      ring.rotation.x = rotationX
      ring.rotation.y = rotationY
      return ring
    }

    const ring1 = createRing(2.1, 0x38bdf8, Math.PI / 3, Math.PI / 6)
    const ring2 = createRing(2.4, 0x818cf8, -Math.PI / 4, Math.PI / 4)
    const ring3 = createRing(2.7, 0x34d399, Math.PI / 2.2, -Math.PI / 5)

    mainGroup.add(ring1)
    mainGroup.add(ring2)
    mainGroup.add(ring3)

    // 4. Floating Orbital Nodes (Share 1 single SphereGeometry instance)
    const nodeCount = 6
    const nodes = []
    const sharedNodeGeo = registerGeometry(new THREE.SphereGeometry(0.11, 12, 12))

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 2.3 + (i % 2) * 0.3
      const nodeMat = registerMaterial(
        new THREE.MeshBasicMaterial({
          color: PALETTE[i % PALETTE.length].clone(),
        })
      )
      const nodeMesh = new THREE.Mesh(sharedNodeGeo, nodeMat)
      nodes.push({
        mesh: nodeMesh,
        speed: 0.5 + (i % 3) * 0.25,
        angle: angle,
        radius: radius,
        elevation: (Math.random() - 0.5) * 1.1,
      })
      mainGroup.add(nodeMesh)
    }

    // 5. Stardust Particles Cloud
    const particleCount = 220
    const particleGeo = registerGeometry(new THREE.BufferGeometry())
    const positions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
      const phi = THREE.MathUtils.randFloat(0, Math.PI)
      const dist = THREE.MathUtils.randFloat(1.8, 4.2)

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = dist * Math.cos(phi)

      const col = PALETTE[i % PALETTE.length]
      particleColors[i * 3] = col.r
      particleColors[i * 3 + 1] = col.g
      particleColors[i * 3 + 2] = col.b
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = registerMaterial(
      new THREE.PointsMaterial({
        size: 0.042,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      })
    )
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    mainGroup.add(particleSystem)

    // 6. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 20)
    pointLight1.position.set(4, 3, 4)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x818cf8, 2.5, 20)
    pointLight2.position.set(-4, -3, -2)
    scene.add(pointLight2)

    // Interaction State & Cached Container Bounds (Prevents Layout Thrashing)
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let mouseParallaxX = 0
    let mouseParallaxY = 0
    let isVisible = true
    let isRunning = false
    let cachedRect = { left: 0, top: 0, width: 300, height: 300 }

    const updateCachedBounds = () => {
      if (container) {
        cachedRect = container.getBoundingClientRect()
      }
    }
    updateCachedBounds()

    // Pointer Event Handlers
    const onPointerDown = (e) => {
      isDragging = true
      prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0
      prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0
    }

    const onPointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0

      if (isDragging) {
        const deltaX = clientX - prevMouseX
        const deltaY = clientY - prevMouseY
        targetRotationY += deltaX * 0.006
        targetRotationX += deltaY * 0.006
        prevMouseX = clientX
        prevMouseY = clientY
      } else if (e.clientX !== undefined && cachedRect.width > 0 && cachedRect.height > 0) {
        // Fast mouse parallax calculation without layout reflow
        const x = (clientX - cachedRect.left) / cachedRect.width - 0.5
        const y = (clientY - cachedRect.top) / cachedRect.height - 0.5
        mouseParallaxX = x * 0.35
        mouseParallaxY = y * 0.35
      }
    }

    const onPointerUp = () => {
      isDragging = false
    }

    const domEl = renderer.domElement
    domEl.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    window.addEventListener('mouseup', onPointerUp, { passive: true })

    domEl.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('touchmove', onPointerMove, { passive: true })
    window.addEventListener('touchend', onPointerUp, { passive: true })

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width
        const height = entry.contentRect.height
        if (width > 0 && height > 0) {
          updateCachedBounds()
          camera.aspect = width / height
          if (width < 480) {
            camera.position.z = 7.5
          } else if (width < 768) {
            camera.position.z = 7.0
          } else {
            camera.position.z = 6.2
          }
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
      }
    })
    resizeObserver.observe(container)

    // Animation Loop with Clock Delta (Framerate independent)
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isVisible) {
        isRunning = false
        return
      }

      animationFrameId = requestAnimationFrame(animate)

      const delta = Math.min(clock.getDelta(), 0.08) // cap max delta to avoid huge jumps
      const elapsedTime = clock.getElapsedTime()

      // Target active palette color lerping
      const activeColor = PALETTE[activeIdxRef.current % PALETTE.length] || PALETTE[0]
      coreMaterial.emissive.lerp(activeColor, delta * 4)
      innerMat.color.lerp(activeColor, delta * 4)
      pointLight1.color.lerp(activeColor, delta * 3)

      // Auto rotation + inertia lerp
      targetRotationY += 0.15 * delta
      mainGroup.rotation.y += (targetRotationY + mouseParallaxX - mainGroup.rotation.y) * Math.min(1, delta * 5)
      mainGroup.rotation.x += (targetRotationX + mouseParallaxY - mainGroup.rotation.x) * Math.min(1, delta * 5)

      // Core Breathing & Ring Motion
      coreMesh.rotation.y -= 0.3 * delta
      coreMesh.rotation.z += 0.12 * delta
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.05
      coreMesh.scale.set(scale, scale, scale)

      ring1.rotation.z += 0.45 * delta
      ring2.rotation.z -= 0.35 * delta
      ring3.rotation.x += 0.3 * delta

      // Orbiting Skill Nodes
      nodes.forEach((node) => {
        node.angle += node.speed * delta
        node.mesh.position.x = Math.cos(node.angle) * node.radius
        node.mesh.position.z = Math.sin(node.angle) * node.radius
        node.mesh.position.y = Math.sin(node.angle * 2 + elapsedTime) * 0.35 + node.elevation
      })

      // Particle subtle rotation
      particleSystem.rotation.y -= 0.06 * delta

      renderer.render(scene, camera)
    }

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true
        clock.getDelta() // reset delta timing
        animate()
      }
    }

    // Visibility Observer: Completely pause RAF when out of viewport to save 100% CPU/GPU
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
          if (isVisible) {
            updateCachedBounds()
            startAnimation()
          }
        })
      },
      { threshold: 0.05 }
    )
    visibilityObserver.observe(container)

    startAnimation()

    // Complete Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()

      domEl.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)

      domEl.removeEventListener('touchstart', onPointerDown)
      window.removeEventListener('touchmove', onPointerMove)
      window.removeEventListener('touchend', onPointerUp)

      if (container.contains(domEl)) {
        container.removeChild(domEl)
      }

      // Dispose all registered Geometries & Materials
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      renderer.dispose()
    }
  }, []) // Mount once!

  return (
    <div className="three-skills-wrapper">
      <div className="three-canvas-container" ref={containerRef} />
    </div>
  )
}

