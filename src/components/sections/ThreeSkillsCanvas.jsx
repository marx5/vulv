import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeSkillsCanvas({ activeCategoryIndex = 0 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 6.5

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Master Group to rotate everything
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // Palette Colors
    const colors = [
      new THREE.Color('#38bdf8'), // Cyan (Frontend)
      new THREE.Color('#818cf8'), // Indigo/Purple (Backend)
      new THREE.Color('#34d399'), // Emerald (DevOps)
    ]

    // 1. Core Glowing Polyhedron (Liquid Tech Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.35, 2)
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0x0c1e3d,
      emissive: colors[activeCategoryIndex % colors.length] || colors[0],
      emissiveIntensity: 0.35,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    mainGroup.add(coreMesh)

    // Inner Solid Glowing Core
    const innerGeo = new THREE.SphereGeometry(0.7, 24, 24)
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
      wireframe: false,
    })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    mainGroup.add(innerMesh)

    // 2. Orbital Rings
    const createRing = (radius, color, rotationX, rotationY) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.018, 16, 100)
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
      })
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

    // 3. Floating Orbital Nodes (Representing Skill Hubs)
    const nodeCount = 6
    const nodes = []
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16)

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = 2.3 + (i % 2) * 0.3
      const nodeMat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
      })
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat)
      
      // Store orbital params
      nodes.push({
        mesh: nodeMesh,
        speed: 0.008 + (i % 3) * 0.004,
        angle: angle,
        radius: radius,
        elevation: (Math.random() - 0.5) * 1.2,
      })
      mainGroup.add(nodeMesh)
    }

    // 4. Stardust Particles Cloud
    const particleCount = 280
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const particleColors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2)
      const phi = THREE.MathUtils.randFloat(0, Math.PI)
      const dist = THREE.MathUtils.randFloat(1.8, 4.5)

      positions[i * 3] = dist * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = dist * Math.cos(phi)

      const col = colors[i % colors.length]
      particleColors[i * 3] = col.r
      particleColors[i * 3 + 1] = col.g
      particleColors[i * 3 + 2] = col.b
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })
    const particleSystem = new THREE.Points(particleGeo, particleMat)
    mainGroup.add(particleSystem)

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 20)
    pointLight1.position.set(4, 3, 4)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x818cf8, 2.5, 20)
    pointLight2.position.set(-4, -3, -2)
    scene.add(pointLight2)

    // Interaction State
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let mouseParallaxX = 0
    let mouseParallaxY = 0
    let isVisible = true

    // Mouse / Touch Event Handlers
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
        targetRotationY += deltaX * 0.007
        targetRotationX += deltaY * 0.007
        prevMouseX = clientX
        prevMouseY = clientY
      } else if (e.clientX !== undefined) {
        // Desktop subtle mouse parallax
        const rect = container.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        mouseParallaxX = x * 0.4
        mouseParallaxY = y * 0.4
      }
    }

    const onPointerUp = () => {
      isDragging = false
    }

    const domEl = renderer.domElement
    domEl.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)

    domEl.addEventListener('touchstart', onPointerDown, { passive: true })
    window.addEventListener('touchmove', onPointerMove, { passive: true })
    window.addEventListener('touchend', onPointerUp, { passive: true })

    // Resize Observer for optimal responsiveness across Smartphone, Tablet, Desktop
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width
        const height = entry.contentRect.height
        if (width > 0 && height > 0) {
          camera.aspect = width / height
          if (width < 480) {
            camera.position.z = 7.6
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

    // Visibility Observer to pause rendering when section is out of viewport (saves CPU/Battery)
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting
      })
    }, { threshold: 0.05 })
    visibilityObserver.observe(container)

    // Animation Loop
    let animationFrameId
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      if (!isVisible) return

      const elapsedTime = clock.getElapsedTime()

      // Idle Rotation + Inertia Lerp
      targetRotationY += 0.003
      mainGroup.rotation.y += (targetRotationY + mouseParallaxX - mainGroup.rotation.y) * 0.05
      mainGroup.rotation.x += (targetRotationX + mouseParallaxY - mainGroup.rotation.x) * 0.05

      // Core Breathing & Ring Motion
      coreMesh.rotation.y -= 0.005
      coreMesh.rotation.z += 0.002
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.05
      coreMesh.scale.set(scale, scale, scale)

      ring1.rotation.z += 0.008
      ring2.rotation.z -= 0.006
      ring3.rotation.x += 0.005

      // Orbiting Skill Nodes
      nodes.forEach((node) => {
        node.angle += node.speed
        node.mesh.position.x = Math.cos(node.angle) * node.radius
        node.mesh.position.z = Math.sin(node.angle) * node.radius
        node.mesh.position.y = Math.sin(node.angle * 2 + elapsedTime) * 0.35 + node.elevation
      })

      // Particle subtle rotation
      particleSystem.rotation.y -= 0.001

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
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

      // Dispose Three.js objects
      coreGeometry.dispose()
      coreMaterial.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      nodeGeo.dispose()
      renderer.dispose()
    }
  }, [activeCategoryIndex])

  return (
    <div className="three-skills-wrapper">
      <div className="three-canvas-container" ref={containerRef} />
    </div>
  )
}
