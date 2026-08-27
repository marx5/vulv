import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeSkillsCanvas({ activeCategoryIndex = 0 }) {
  const containerRef = useRef(null)
  const activeIdxRef = useRef(activeCategoryIndex)

  useEffect(() => {
    activeIdxRef.current = activeCategoryIndex
  }, [activeCategoryIndex])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Track disposables for complete cleanup
    const geometries = []
    const materials = []

    const regG = (geo) => {
      geometries.push(geo)
      return geo
    }
    const regM = (mat) => {
      materials.push(mat)
      return mat
    }

    // 1. Scene & Camera Setup (Isometric Angle)
    const scene = new THREE.Scene()
    const aspect = (container.clientWidth || 300) / (container.clientHeight || 300)
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100)
    camera.position.set(4.4, 3.6, 5.0)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      precision: 'mediump',
    })
    renderer.setSize(container.clientWidth || 300, container.clientHeight || 300)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Master System Group
    const systemGroup = new THREE.Group()
    scene.add(systemGroup)

    // Shared Palette Colors
    const COLOR_FRONTEND = new THREE.Color('#38bdf8') // Cyan
    const COLOR_BACKEND = new THREE.Color('#818cf8')  // Indigo/Purple
    const COLOR_DEVOPS = new THREE.Color('#34d399')   // Emerald
    const COLOR_DARK = new THREE.Color('#0b1329')     // Dark Plate Base

    // ==========================================
    // LAYER 1: FRONTEND / CLIENT UI VIEWPORT (TOP)
    // ==========================================
    const layerFrontend = new THREE.Group()
    systemGroup.add(layerFrontend)

    // Glass Base Plate
    const plateGeo = regG(new THREE.BoxGeometry(2.6, 0.06, 2.2))
    const plateMatFe = regM(
      new THREE.MeshPhongMaterial({
        color: COLOR_DARK,
        emissive: COLOR_FRONTEND,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.82,
      })
    )
    const fePlateMesh = new THREE.Mesh(plateGeo, plateMatFe)
    layerFrontend.add(fePlateMesh)

    // Plate Edge Glow Wireframe
    const plateEdges = regG(new THREE.EdgesGeometry(plateGeo))
    const feEdgeMat = regM(new THREE.LineBasicMaterial({ color: COLOR_FRONTEND, transparent: true, opacity: 0.8 }))
    const feEdgeLine = new THREE.LineSegments(plateEdges, feEdgeMat)
    layerFrontend.add(feEdgeLine)

    // UI Component Blocks on Frontend Plate
    // 1. Browser/Hero Viewport Screen (React App)
    const heroBoxGeo = regG(new THREE.BoxGeometry(1.4, 0.12, 0.85))
    const heroBoxMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x0369a1,
        emissive: COLOR_FRONTEND,
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.9,
      })
    )
    const heroBox = new THREE.Mesh(heroBoxGeo, heroBoxMat)
    heroBox.position.set(-0.35, 0.09, -0.35)
    layerFrontend.add(heroBox)

    // 2. Component Card A (JavaScript Logic)
    const cardGeo = regG(new THREE.BoxGeometry(0.7, 0.08, 0.5))
    const cardMatA = regM(
      new THREE.MeshPhongMaterial({
        color: 0x0284c7,
        emissive: COLOR_FRONTEND,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.85,
      })
    )
    const cardA = new THREE.Mesh(cardGeo, cardMatA)
    cardA.position.set(0.75, 0.07, -0.5)
    layerFrontend.add(cardA)

    // 3. Component Card B (Vite & HTML/CSS Assets)
    const cardMatB = regM(
      new THREE.MeshPhongMaterial({
        color: 0x075985,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.85,
      })
    )
    const cardB = new THREE.Mesh(cardGeo, cardMatB)
    cardB.position.set(0.75, 0.07, 0.15)
    layerFrontend.add(cardB)

    // 4. Interactive UI Cursor Pin
    const cursorGeo = regG(new THREE.ConeGeometry(0.08, 0.2, 4))
    cursorGeo.rotateX(Math.PI)
    const cursorMat = regM(new THREE.MeshBasicMaterial({ color: 0xffffff }))
    const cursorMesh = new THREE.Mesh(cursorGeo, cursorMat)
    cursorMesh.position.set(-0.35, 0.32, -0.35)
    layerFrontend.add(cursorMesh)

    // ==========================================
    // LAYER 2: BACKEND / API & DATABASE TIER (MIDDLE)
    // ==========================================
    const layerBackend = new THREE.Group()
    systemGroup.add(layerBackend)

    const plateMatBe = regM(
      new THREE.MeshPhongMaterial({
        color: COLOR_DARK,
        emissive: COLOR_BACKEND,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.82,
      })
    )
    const bePlateMesh = new THREE.Mesh(plateGeo, plateMatBe)
    layerBackend.add(bePlateMesh)

    const beEdgeMat = regM(new THREE.LineBasicMaterial({ color: COLOR_BACKEND, transparent: true, opacity: 0.8 }))
    const beEdgeLine = new THREE.LineSegments(plateEdges, beEdgeMat)
    layerBackend.add(beEdgeLine)

    // API Gateway Router Block (Express/Node.js)
    const routerGeo = regG(new THREE.BoxGeometry(0.9, 0.22, 0.6))
    const routerMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x312e81,
        emissive: COLOR_BACKEND,
        emissiveIntensity: 0.45,
      })
    )
    const routerMesh = new THREE.Mesh(routerGeo, routerMat)
    routerMesh.position.set(-0.6, 0.14, 0)
    layerBackend.add(routerMesh)

    // Database Stack (PostgreSQL & MongoDB Cylinders)
    const dbCylinderGeo = regG(new THREE.CylinderGeometry(0.3, 0.3, 0.12, 20))
    const dbMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x4338ca,
        emissive: COLOR_BACKEND,
        emissiveIntensity: 0.35,
      })
    )
    
    // Stack 3 DB discs
    const dbGroup = new THREE.Group()
    for (let i = 0; i < 3; i++) {
      const disc = new THREE.Mesh(dbCylinderGeo, dbMat)
      disc.position.y = 0.08 + i * 0.15
      dbGroup.add(disc)
    }
    dbGroup.position.set(0.65, 0, -0.45)
    layerBackend.add(dbGroup)

    // Redis Cache Cube (Memory Block)
    const cacheGeo = regG(new THREE.BoxGeometry(0.45, 0.35, 0.45))
    const cacheMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        emissive: 0xa855f7,
        emissiveIntensity: 0.5,
        wireframe: true,
      })
    )
    const cacheMesh = new THREE.Mesh(cacheGeo, cacheMat)
    cacheMesh.position.set(0.65, 0.2, 0.5)
    layerBackend.add(cacheMesh)

    // ==========================================
    // LAYER 3: DEVOPS & INFRASTRUCTURE TIER (BOTTOM)
    // ==========================================
    const layerDevOps = new THREE.Group()
    systemGroup.add(layerDevOps)

    const plateMatDev = regM(
      new THREE.MeshPhongMaterial({
        color: COLOR_DARK,
        emissive: COLOR_DEVOPS,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.82,
      })
    )
    const devPlateMesh = new THREE.Mesh(plateGeo, plateMatDev)
    layerDevOps.add(devPlateMesh)

    const devEdgeMat = regM(new THREE.LineBasicMaterial({ color: COLOR_DEVOPS, transparent: true, opacity: 0.8 }))
    const devEdgeLine = new THREE.LineSegments(plateEdges, devEdgeMat)
    layerDevOps.add(devEdgeLine)

    // Docker Container 3D Blocks
    const containerGeo = regG(new THREE.BoxGeometry(0.65, 0.35, 1.1))
    const containerMat1 = regM(
      new THREE.MeshPhongMaterial({
        color: 0x065f46,
        emissive: COLOR_DEVOPS,
        emissiveIntensity: 0.35,
      })
    )
    const dockerBox1 = new THREE.Mesh(containerGeo, containerMat1)
    dockerBox1.position.set(-0.55, 0.2, 0.1)
    layerDevOps.add(dockerBox1)

    const dockerBox2 = new THREE.Mesh(containerGeo, containerMat1)
    dockerBox2.position.set(0.35, 0.2, 0.3)
    dockerBox2.scale.set(0.85, 0.85, 0.85)
    layerDevOps.add(dockerBox2)

    // CI/CD Pipeline Ring / Deployment Orbit
    const pipelineRingGeo = regG(new THREE.TorusGeometry(0.4, 0.02, 10, 32))
    const pipelineRingMat = regM(new THREE.MeshBasicMaterial({ color: COLOR_DEVOPS, wireframe: true }))
    const pipelineRing = new THREE.Mesh(pipelineRingGeo, pipelineRingMat)
    pipelineRing.rotation.x = Math.PI / 2
    pipelineRing.position.set(0.45, 0.15, -0.6)
    layerDevOps.add(pipelineRing)

    // ==========================================
    // VERTICAL DATA FLOW BUS & PACKET PARTICLES
    // ==========================================
    // 4 Corner Data Pillars
    const pillarGeo = regG(new THREE.CylinderGeometry(0.018, 0.018, 2.6, 8))
    const pillarMat = regM(new THREE.MeshBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.4 }))

    const cornerPositions = [
      [-1.25, 0, -1.05],
      [1.25, 0, -1.05],
      [-1.25, 0, 1.05],
      [1.25, 0, 1.05],
    ]
    cornerPositions.forEach(([x, y, z]) => {
      const pillar = new THREE.Mesh(pillarGeo, pillarMat)
      pillar.position.set(x, y, z)
      systemGroup.add(pillar)
    })

    // Animated Data Packets (Beams of data travelling vertically)
    const packetCount = 12
    const packetGeo = regG(new THREE.SphereGeometry(0.045, 8, 8))
    const packetMat = regM(new THREE.MeshBasicMaterial({ color: 0x38bdf8 }))
    const packets = []

    for (let i = 0; i < packetCount; i++) {
      const pMesh = new THREE.Mesh(packetGeo, packetMat)
      const corner = cornerPositions[i % 4]
      pMesh.position.set(corner[0], (Math.random() - 0.5) * 2.2, corner[2])
      systemGroup.add(pMesh)
      packets.push({
        mesh: pMesh,
        speed: 0.8 + Math.random() * 0.8,
        dir: i % 2 === 0 ? 1 : -1,
      })
    }

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(6, 8, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.5)
    fillLight.position.set(-6, -4, -4)
    scene.add(fillLight)

    // Interaction State & Throttling
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0
    let targetRotationY = -0.45 // Default pleasant isometric 3/4 angle
    let targetRotationX = 0.12
    let mouseParallaxX = 0
    let mouseParallaxY = 0
    let isVisible = true
    let isRunning = false
    let cachedRect = { left: 0, top: 0, width: 300, height: 300 }

    const updateCachedBounds = () => {
      if (container) cachedRect = container.getBoundingClientRect()
    }
    updateCachedBounds()

    // Pointer Events
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
        targetRotationX += deltaY * 0.005
        prevMouseX = clientX
        prevMouseY = clientY
      } else if (e.clientX !== undefined && cachedRect.width > 0) {
        const x = (clientX - cachedRect.left) / cachedRect.width - 0.5
        const y = (clientY - cachedRect.top) / cachedRect.height - 0.5
        mouseParallaxX = x * 0.25
        mouseParallaxY = y * 0.2
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
            camera.position.set(5.2, 4.4, 5.8)
          } else {
            camera.position.set(4.4, 3.6, 5.0)
          }
          camera.lookAt(0, 0, 0)
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
      }
    })
    resizeObserver.observe(container)

    // Animation Loop with Exploded Layer Lerping
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isVisible) {
        isRunning = false
        return
      }

      animationFrameId = requestAnimationFrame(animate)
      const delta = Math.min(clock.getDelta(), 0.08)
      const elapsedTime = clock.getElapsedTime()

      // Calculate Target Layer Y Offsets based on Active Category (Exploded Focus)
      const activeIdx = activeIdxRef.current
      let targetFeY = 1.0
      let targetBeY = 0.0
      let targetDevY = -1.0

      if (activeIdx === 0) {
        // Frontend focused: Top layer lifts up and expands
        targetFeY = 1.35
        targetBeY = -0.15
        targetDevY = -1.25
      } else if (activeIdx === 1) {
        // Backend focused: Middle layer expands
        targetFeY = 1.2
        targetBeY = 0.05
        targetDevY = -1.25
      } else if (activeIdx === 2) {
        // DevOps focused: Bottom layer drops and expands
        targetFeY = 1.25
        targetBeY = 0.15
        targetDevY = -0.85
      }

      // Smooth Lerp Layer Positions
      layerFrontend.position.y += (targetFeY - layerFrontend.position.y) * Math.min(1, delta * 6)
      layerBackend.position.y += (targetBeY - layerBackend.position.y) * Math.min(1, delta * 6)
      layerDevOps.position.y += (targetDevY - layerDevOps.position.y) * Math.min(1, delta * 6)

      // Highlight active layer emissive intensities
      plateMatFe.emissiveIntensity = activeIdx === 0 ? 0.65 : 0.15
      plateMatBe.emissiveIntensity = activeIdx === 1 ? 0.65 : 0.15
      plateMatDev.emissiveIntensity = activeIdx === 2 ? 0.65 : 0.15

      // Sub-element micro-animations
      // 1. Frontend UI cursor pulsing
      cursorMesh.position.y = 0.32 + Math.sin(elapsedTime * 4) * 0.04

      // 2. Database Discs gentle rotation
      dbGroup.rotation.y += 0.4 * delta
      cacheMesh.rotation.y -= 0.6 * delta

      // 3. DevOps CI/CD pipeline ring spin
      pipelineRing.rotation.z += 1.2 * delta

      // 4. Data Packets vertical flow
      packets.forEach((p) => {
        p.mesh.position.y += p.speed * p.dir * delta
        if (p.mesh.position.y > 1.4) {
          p.mesh.position.y = -1.3
        } else if (p.mesh.position.y < -1.3) {
          p.mesh.position.y = 1.4
        }
      })

      // Overall Subtle System Orbit & User Drag Inertia
      targetRotationY += 0.12 * delta
      systemGroup.rotation.y += (targetRotationY + mouseParallaxX - systemGroup.rotation.y) * Math.min(1, delta * 5)
      systemGroup.rotation.x += (targetRotationX + mouseParallaxY - systemGroup.rotation.x) * Math.min(1, delta * 5)

      renderer.render(scene, camera)
    }

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true
        clock.getDelta()
        animate()
      }
    }

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

    // Full Resource Disposal
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

      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div className="three-skills-wrapper">
      <div className="three-canvas-container" ref={containerRef} />
    </div>
  )
}


