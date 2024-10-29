// 引入three.js
import * as THREE from 'three'
// 相机控件扩展库orbitControls.js
import { OrbitControls } from 'three/examples/jsm/controls/orbitControls.js'
// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'1
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// 引入 gltf 加载器
// 3D场景对象Scene
const scene = new THREE.Scene()

// 长方体网格模型公
// const geometry = new THREE.BoxGeometry(100, 100, 100)
// const material = new THREE.MeshLambertMaterial({
//   color: 0x00ffff,
//   transparent: true,
//   opacity: 0.5,
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('jsm/libs/draco/gltf/')
const loader = new GLTFLoader()
// loader.setDRACOLoader(dracoLoader)

loader.load('girl.glb', (gltf) => {
  // loader.load('LittlestTokyo.glb', (gltf) => {
  console.log('gltf:>>', gltf)
  scene.add(gltf.scene)
})

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
// 光源方向：平行光从位置80，100，50执行坐标原点
directionalLight.position.set(80, 100, 50)
scene.add(directionalLight)
directionalLight.intensity = 3.0

// AxesHeler：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(200)
scene.add(axesHelper)

// theejs输出画布的尺寸
const width = window.innerWidth //宽度
const height = window.innerHeight //高度
// 透视投影相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
camera.position.set(400, 400, 400)
camera.lookAt(0, 0, 0)

// WebGL渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true, //优化锯齿
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
document.body.appendChild(renderer.domElement)

//渲染循环
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

// 设置相机控件 orbitControls，设置它之后，可以在页面中拖动摄像头
new OrbitControls(camera, renderer.domElement)
// controls.addEventListener('hange', function () {
//   console.log('camera.positin', camera.position)
// })
// 窗口变化画布尺寸同步
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerlight
  camera.updateProjectionMatrix() //相机.aspect参数变化，需要更新
}
