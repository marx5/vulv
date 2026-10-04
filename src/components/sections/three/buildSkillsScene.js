import * as THREE from 'three'

/**
 * Dựng toàn bộ mô hình 3D kiến trúc fullstack (3 tầng, 15 công nghệ, đường dữ liệu & ánh sáng).
 * Trả về các đối tượng cần thiết cho vòng lặp animation và hàm dispose để giải phóng bộ nhớ.
 * @param {THREE.Scene} scene
 * @param {THREE.Group} systemGroup
 */
export function buildSkillsScene(scene, systemGroup) {
    // Track disposables for complete memory cleanup
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

    // Shared Palette Colors
    const COLOR_FRONTEND = new THREE.Color('#38bdf8') // Cyan
    const COLOR_BACKEND = new THREE.Color('#818cf8')  // Indigo
    const COLOR_DEVOPS = new THREE.Color('#34d399')   // Emerald
    const COLOR_DARK = new THREE.Color('#0b1329')     // Dark Plate Base

    // Dictionary of 15 Tech Objects for 1-1 Hover Glow Tracking
    const techRegistry = {}

    // Shared Plate Geometries & Outlines
    const plateGeo = regG(new THREE.BoxGeometry(2.6, 0.06, 2.2))
    const plateEdges = regG(new THREE.EdgesGeometry(plateGeo))

    // Helper to register tech object
    const registerTechObj = (name, group, mat, baseEmissive, basePosY) => {
      techRegistry[name] = {
        group,
        mat,
        baseEmissive,
        basePosY,
        baseScale: group.scale.clone(),
      }
    }

    // ==========================================
    // LAYER 1: FRONTEND (TOP TIER - 4 TECHS)
    // ==========================================
    const layerFrontend = new THREE.Group()
    systemGroup.add(layerFrontend)

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

    const feEdgeMat = regM(new THREE.LineBasicMaterial({ color: COLOR_FRONTEND, transparent: true, opacity: 0.8 }))
    layerFrontend.add(new THREE.LineSegments(plateEdges, feEdgeMat))

    // 1.1 REACT: Hero UI Viewport Window with glowing wireframe
    const reactGroup = new THREE.Group()
    const reactGeo = regG(new THREE.BoxGeometry(1.15, 0.12, 0.8))
    const reactMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x0369a1,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.35,
      })
    )
    const reactMesh = new THREE.Mesh(reactGeo, reactMat)
    reactGroup.add(reactMesh)
    reactGroup.position.set(-0.5, 0.09, -0.4)
    layerFrontend.add(reactGroup)
    registerTechObj('React', reactGroup, reactMat, 0.35, 0.09)

    // 1.2 JAVASCRIPT: Logic Engine Card (Amber/Gold)
    const jsGroup = new THREE.Group()
    const jsGeo = regG(new THREE.BoxGeometry(0.7, 0.09, 0.45))
    const jsMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0xb45309,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.35,
      })
    )
    const jsMesh = new THREE.Mesh(jsGeo, jsMat)
    jsGroup.add(jsMesh)
    jsGroup.position.set(0.65, 0.08, -0.45)
    layerFrontend.add(jsGroup)
    registerTechObj('JavaScript', jsGroup, jsMat, 0.35, 0.08)

    // 1.3 HTML5/CSS3: Style & Layout Structure Panel (Orange/Cyan)
    const cssGroup = new THREE.Group()
    const cssGeo = regG(new THREE.BoxGeometry(0.75, 0.08, 0.55))
    const cssMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0xc2410c,
        emissive: 0xf97316,
        emissiveIntensity: 0.35,
      })
    )
    const cssMesh = new THREE.Mesh(cssGeo, cssMat)
    cssGroup.add(cssMesh)
    cssGroup.position.set(0.65, 0.07, 0.35)
    layerFrontend.add(cssGroup)
    registerTechObj('HTML5/CSS3', cssGroup, cssMat, 0.35, 0.07)

    // 1.4 VITE: Fast Bundler Lightning Crystal (Cyan/Purple Prism)
    const viteGroup = new THREE.Group()
    const viteGeo = regG(new THREE.OctahedronGeometry(0.25, 0))
    const viteMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x7c3aed,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.45,
        wireframe: true,
      })
    )
    const viteMesh = new THREE.Mesh(viteGeo, viteMat)
    viteGroup.add(viteMesh)
    viteGroup.position.set(-0.5, 0.22, 0.45)
    layerFrontend.add(viteGroup)
    registerTechObj('Vite', viteGroup, viteMat, 0.45, 0.22)

    // ==========================================
    // LAYER 2: BACKEND & APIS (MIDDLE TIER - 5 TECHS)
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
    layerBackend.add(new THREE.LineSegments(plateEdges, beEdgeMat))

    // 2.1 NODE.JS: Server Core Runtime (Hexagonal Cylinder - Green)
    const nodeGroup = new THREE.Group()
    const nodeGeo = regG(new THREE.CylinderGeometry(0.35, 0.35, 0.2, 6))
    const nodeMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x15803d,
        emissive: 0x22c55e,
        emissiveIntensity: 0.35,
      })
    )
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat)
    nodeGroup.add(nodeMesh)
    nodeGroup.position.set(-0.65, 0.14, -0.35)
    layerBackend.add(nodeGroup)
    registerTechObj('Node.js', nodeGroup, nodeMat, 0.35, 0.14)

    // 2.2 EXPRESS: API Gateway Router Bus (Indigo Box)
    const expressGroup = new THREE.Group()
    const expressGeo = regG(new THREE.BoxGeometry(0.85, 0.18, 0.5))
    const expressMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x312e81,
        emissive: 0x818cf8,
        emissiveIntensity: 0.35,
      })
    )
    const expressMesh = new THREE.Mesh(expressGeo, expressMat)
    expressGroup.add(expressMesh)
    expressGroup.position.set(-0.65, 0.12, 0.45)
    layerBackend.add(expressGroup)
    registerTechObj('Express', expressGroup, expressMat, 0.35, 0.12)

    // 2.3 MYSQL: Relational Database Discs (Blue Cylinder Stack)
    const mysqlGroup = new THREE.Group()
    const dbCylinderGeo = regG(new THREE.CylinderGeometry(0.24, 0.24, 0.1, 16))
    const mysqlMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x0369a1,
        emissive: 0x0284c7,
        emissiveIntensity: 0.35,
      })
    )
    for (let i = 0; i < 2; i++) {
      const disc = new THREE.Mesh(dbCylinderGeo, mysqlMat)
      disc.position.y = 0.06 + i * 0.13
      mysqlGroup.add(disc)
    }
    mysqlGroup.position.set(0.12, 0.08, -0.45)
    layerBackend.add(mysqlGroup)
    registerTechObj('MySQL', mysqlGroup, mysqlMat, 0.35, 0.08)

    // 2.4 MONGODB: Document Database Discs (Emerald Cylinder Stack)
    const mongoGroup = new THREE.Group()
    const mongoMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x047857,
        emissive: 0x10b981,
        emissiveIntensity: 0.35,
      })
    )
    for (let i = 0; i < 2; i++) {
      const disc = new THREE.Mesh(dbCylinderGeo, mongoMat)
      disc.position.y = 0.06 + i * 0.13
      mongoGroup.add(disc)
    }
    mongoGroup.position.set(0.75, 0.08, -0.45)
    layerBackend.add(mongoGroup)
    registerTechObj('MongoDB', mongoGroup, mongoMat, 0.35, 0.08)

    // 2.5 REDIS: In-Memory Cache Grid Cube (Red/Purple)
    const redisGroup = new THREE.Group()
    const redisGeo = regG(new THREE.BoxGeometry(0.46, 0.34, 0.46))
    const redisMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0xb91c1c,
        emissive: 0xef4444,
        emissiveIntensity: 0.45,
        wireframe: true,
      })
    )
    const redisMesh = new THREE.Mesh(redisGeo, redisMat)
    redisGroup.add(redisMesh)
    redisGroup.position.set(0.55, 0.2, 0.4)
    layerBackend.add(redisGroup)
    registerTechObj('Redis', redisGroup, redisMat, 0.45, 0.2)

    // ==========================================
    // LAYER 3: DEVOPS & TOOLS (BOTTOM TIER - 6 TECHS)
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
    layerDevOps.add(new THREE.LineSegments(plateEdges, devEdgeMat))

    // 3.1 DOCKER: Shipping Container Box (Blue/Teal)
    const dockerGroup = new THREE.Group()
    const dockerGeo = regG(new THREE.BoxGeometry(0.65, 0.32, 0.95))
    const dockerMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x0284c7,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.35,
      })
    )
    const dockerMesh = new THREE.Mesh(dockerGeo, dockerMat)
    dockerGroup.add(dockerMesh)
    dockerGroup.position.set(-0.65, 0.18, -0.3)
    layerDevOps.add(dockerGroup)
    registerTechObj('Docker', dockerGroup, dockerMat, 0.35, 0.18)

    // 3.2 NGINX: Reverse Proxy Tower (Green)
    const nginxGroup = new THREE.Group()
    const nginxGeo = regG(new THREE.CylinderGeometry(0.2, 0.24, 0.42, 8))
    const nginxMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x047857,
        emissive: 0x10b981,
        emissiveIntensity: 0.35,
      })
    )
    const nginxMesh = new THREE.Mesh(nginxGeo, nginxMat)
    nginxGroup.add(nginxMesh)
    nginxGroup.position.set(0.05, 0.22, -0.5)
    layerDevOps.add(nginxGroup)
    registerTechObj('Nginx', nginxGroup, nginxMat, 0.35, 0.22)

    // 3.3 GIT / GITHUB: Branch Node Cluster (Orange)
    const gitGroup = new THREE.Group()
    const gitNodeGeo = regG(new THREE.SphereGeometry(0.1, 12, 12))
    const gitMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0xc2410c,
        emissive: 0xf97316,
        emissiveIntensity: 0.4,
      })
    )
    const gNode1 = new THREE.Mesh(gitNodeGeo, gitMat)
    const gNode2 = new THREE.Mesh(gitNodeGeo, gitMat)
    gNode2.position.set(0.18, 0.12, -0.15)
    gitGroup.add(gNode1)
    gitGroup.add(gNode2)
    gitGroup.position.set(0.72, 0.15, -0.4)
    layerDevOps.add(gitGroup)
    registerTechObj('Git / GitHub', gitGroup, gitMat, 0.4, 0.15)

    // 3.4 LINUX: OS Kernel Base Chip (Yellow/Gold)
    const linuxGroup = new THREE.Group()
    const linuxGeo = regG(new THREE.BoxGeometry(0.65, 0.1, 0.65))
    const linuxMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0xa16207,
        emissive: 0xeab308,
        emissiveIntensity: 0.35,
      })
    )
    const linuxMesh = new THREE.Mesh(linuxGeo, linuxMat)
    linuxGroup.add(linuxMesh)
    linuxGroup.position.set(-0.65, 0.1, 0.5)
    layerDevOps.add(linuxGroup)
    registerTechObj('Linux', linuxGroup, linuxMat, 0.35, 0.1)

    // 3.5 POSTMAN: API Testing Console (Orange/Red)
    const postmanGroup = new THREE.Group()
    const postmanGeo = regG(new THREE.CylinderGeometry(0.18, 0.24, 0.2, 12))
    const postmanMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0xc2410c,
        emissive: 0xf97316,
        emissiveIntensity: 0.4,
      })
    )
    const postmanMesh = new THREE.Mesh(postmanGeo, postmanMat)
    postmanGroup.add(postmanMesh)
    postmanGroup.position.set(0.05, 0.16, 0.5)
    layerDevOps.add(postmanGroup)
    registerTechObj('Postman', postmanGroup, postmanMat, 0.4, 0.16)

    // 3.6 CI/CD: Automated Pipeline Ring (Emerald Torus)
    const cicdGroup = new THREE.Group()
    const pipelineRingGeo = regG(new THREE.TorusGeometry(0.3, 0.025, 10, 28))
    const cicdMat = regM(
      new THREE.MeshPhongMaterial({
        color: 0x059669,
        emissive: 0x34d399,
        emissiveIntensity: 0.45,
        wireframe: true,
      })
    )
    const pipelineRing = new THREE.Mesh(pipelineRingGeo, cicdMat)
    pipelineRing.rotation.x = Math.PI / 2
    cicdGroup.add(pipelineRing)
    cicdGroup.position.set(0.7, 0.16, 0.45)
    layerDevOps.add(cicdGroup)
    registerTechObj('CI/CD', cicdGroup, cicdMat, 0.45, 0.16)

    // ==========================================
    // VERTICAL DATA FLOW BUS & PARTICLES
    // ==========================================
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

  return {
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
    dispose() {
      geometries.forEach((g) => g.dispose())
      materials.forEach((m) => m.dispose())
    },
  }
}
