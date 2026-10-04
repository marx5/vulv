import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { buildSkillsScene } from './three/buildSkillsScene'
import { createTrackballControls } from './three/createTrackballControls'

export default function ThreeSkillsCanvas({ activeCategoryIndex = 0, hoveredTech = null }) {
  const containerRef = useRef(null)
  const activeIdxRef = useRef(activeCategoryIndex)
  const hoveredTechRef = useRef(hoveredTech)

  useEffect(() => {
    activeIdxRef.current = activeCategoryIndex
  }, [activeCategoryIndex])

  useEffect(() => {
    hoveredTechRef.current = hoveredTech
  }, [hoveredTech])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // 1. Scene, Camera & Renderer
    const scene = new THREE.Scene()
    const aspect = (container.clientWidth || 300) / (container.clientHeight || 300)
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100)
    camera.position.set(0, 0, 7.2)
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

    // Master System Group (Initial isometric 3D angle)
    const systemGroup = new THREE.Group()
    systemGroup.rotation.set(0.35, -0.65, 0)
    scene.add(systemGroup)

    // 2. Objects + Controls
    const {
      layerFrontend,
      layerBackend,
      layerDevOps,
      plateMatFe,
      plateMatBe,
      plateMatDev,
      techRegistry,
      mysqlGroup,
      mongoGroup,
      redisGroup,
      pipelineRing,
      viteGroup,
      packets,
      dispose: disposeScene,
    } = buildSkillsScene(scene, systemGroup)

    const domEl = renderer.domElement
    const controls = createTrackballControls({ domEl, systemGroup, initialDistance: 7.2 })

    let isVisible = true
    let isRunning = false

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        const height = entry.contentRect.height
        if (width > 0 && height > 0) {
          camera.aspect = width / height
          if (width < 480) {
            controls.targetDistance = 8.6
          } else if (width < 768) {
            controls.targetDistance = 7.8
          } else {
            controls.targetDistance = 7.0
          }
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }
      }
    })
    resizeObserver.observe(container)

    // 3. Animation Loop
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

      // Target Layer Y Offsets (Exploded View Focus)
      const activeIdx = activeIdxRef.current
      let targetFeY = 1.0
      let targetBeY = 0.0
      let targetDevY = -1.0

      if (activeIdx === 0) {
        targetFeY = 1.38
        targetBeY = -0.15
        targetDevY = -1.28
      } else if (activeIdx === 1) {
        targetFeY = 1.2
        targetBeY = 0.08
        targetDevY = -1.28
      } else if (activeIdx === 2) {
        targetFeY = 1.25
        targetBeY = 0.15
        targetDevY = -0.82
      }

      layerFrontend.position.y += (targetFeY - layerFrontend.position.y) * Math.min(1, delta * 6)
      layerBackend.position.y += (targetBeY - layerBackend.position.y) * Math.min(1, delta * 6)
      layerDevOps.position.y += (targetDevY - layerDevOps.position.y) * Math.min(1, delta * 6)

      plateMatFe.emissiveIntensity = activeIdx === 0 ? 0.65 : 0.15
      plateMatBe.emissiveIntensity = activeIdx === 1 ? 0.65 : 0.15
      plateMatDev.emissiveIntensity = activeIdx === 2 ? 0.65 : 0.15

      // Individual 1-to-1 Tech Highlight Animation (Hovered Tech Glow & Scale)
      const currentHovered = hoveredTechRef.current
      Object.entries(techRegistry).forEach(([name, item]) => {
        const isHovered = currentHovered === name
        const targetScaleMult = isHovered ? 1.35 : 1.0
        const targetEmissive = isHovered
          ? 1.35 + Math.sin(elapsedTime * 8) * 0.35 // Pulsing bright glow
          : item.baseEmissive
        const targetPosY = item.basePosY + (isHovered ? 0.12 : 0)

        item.mat.emissiveIntensity += (targetEmissive - item.mat.emissiveIntensity) * Math.min(1, delta * 10)
        item.group.scale.lerp(item.baseScale.clone().multiplyScalar(targetScaleMult), Math.min(1, delta * 10))
        item.group.position.y += (targetPosY - item.group.position.y) * Math.min(1, delta * 10)
      })

      // Micro-animations
      mysqlGroup.rotation.y += 0.45 * delta
      mongoGroup.rotation.y += 0.45 * delta
      redisGroup.rotation.y -= 0.6 * delta
      pipelineRing.rotation.z += 1.4 * delta
      viteGroup.rotation.y += 0.8 * delta

      packets.forEach((p) => {
        p.mesh.position.y += p.speed * p.dir * delta
        if (p.mesh.position.y > 1.45) p.mesh.position.y = -1.35
        else if (p.mesh.position.y < -1.35) p.mesh.position.y = 1.45
      })

      // Trackball Inertia Momentum & Idle Auto-Rotation
      controls.update(delta)

      camera.position.z += (controls.targetDistance - camera.position.z) * Math.min(1, delta * 7)

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
      controls.dispose()

      if (container.contains(domEl)) {
        container.removeChild(domEl)
      }

      disposeScene()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="three-skills-wrapper">
      <div
        className="three-canvas-container"
        ref={containerRef}
        role="img"
        aria-label="Mô hình 3D minh hoạ kiến trúc fullstack gồm 3 tầng: Frontend, Backend và DevOps"
      />
      <div className="three-canvas-hint">
        <span className="three-hint-pulse" />
        <span>Cuộn để zoom</span>
      </div>
    </div>
  )
}
