import * as THREE from 'three';
import html2canvas from 'html2canvas';

import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

let camera, controls, scene, renderer, effect;
let group;
const gltfLoader = new GLTFLoader()

const start = Date.now();

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0, 0, 0 );

    group = new THREE.Group();

    const pointLight1 = new THREE.PointLight( 0xffffff );
    pointLight1.position.set( 500, 500, 500 );
    scene.add( pointLight1 );

    const pointLight2 = new THREE.PointLight( 0xffffff, 0.25 );
    pointLight2.position.set( - 500, - 500, - 500 );
    scene.add( pointLight2 );

    gltfLoader.load(
        '/iphone.glb',
        (gltf) =>
        {
            gltf.scene.scale.set(4000,4000,4000)
            group.add(gltf.scene)
        }
    )

    scene.add(group)
    // group.rotation.x = 1;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    effect = new AsciiEffect( renderer, ' Yuhwanjun', { invert: true } );
    effect.setSize( window.innerWidth, window.innerHeight );
    effect.domElement.style.color = 'white';
    effect.domElement.style.backgroundColor = 'black';
    effect.domElement.id = "capture_area"

    document.body.appendChild( effect.domElement );
    // console.log(effect.domElement.id)

    controls = new TrackballControls( camera, effect.domElement )

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    effect.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    render();

}

function render() {

    const timer = Date.now() - start;

    controls.update();

    effect.render( scene, camera );
    group.rotation.x = -timer*0.0001;
    group.rotation.y = timer*0.0001;
    group.rotation.z = timer*0.0001;

}

// let btnDownload = document.getElementById("btn_download");

// function download() {
//     html2canvas(document.getElementById("capture_area")).then(function(canvas) {
//         var el = document.createElement("a")
//         el.href = canvas.toDataURL("image/jpeg")
//         el.download = '이미지.jpg' //다운로드 할 파일명 설정
//         el.click()
//     })
// }
// btnDownload.onclick = download()

// console.log(btnDownload)