// webgl_postprocessing/webgl_postprocessing_ssaa.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from '../jsm/libs/stats.module.js';
import { GUI } from '../jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from '../jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from '../jsm/postprocessing/ShaderPass.js';
import { SSAARenderPass } from '../jsm/postprocessing/SSAARenderPass.js';
import { CopyShader } from '../jsm/shaders/CopyShader.js';

var requestId
Page({
	onUnload() {
		cancelAnimationFrame(requestId, this.canvas)

if( this.renderer){
        this.renderer.dispose()
        this.renderer.forceContextLoss()
        this.renderer.context = null
        this.renderer.domElement = null
        this.renderer = null  }
	},
  async onLoad(){
const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this
let scene, renderer, composer, copyPass;
let cameraP, ssaaRenderPassP;
let cameraO, ssaaRenderPassO;
let gui, stats;

const params = {
    sampleLevel: 4,
    renderToScreen: false,
    unbiased: true,
    camera: 'perspective',
    clearColor: 'black',
    clearAlpha: 1.0,
    viewOffsetX: 0,
    autoRotate: true

};

init();
animate();

clearGui();

function clearGui() {

    if ( gui ) gui.destroy();

    gui = new GUI();

    gui.add( params, 'unbiased' );
    gui.add( params, 'renderToScreen' );
    gui.add( params, 'sampleLevel', {
        'Level 0: 1 Sample': 0,
        'Level 1: 2 Samples': 1,
        'Level 2: 4 Samples': 2,
        'Level 3: 8 Samples': 3,
        'Level 4: 16 Samples': 4,
        'Level 5: 32 Samples': 5
    } );
    gui.add( params, 'camera', [ 'perspective', 'orthographic' ] );
    gui.add( params, 'clearColor', [ 'black', 'white', 'blue', 'green', 'red' ] );
    gui.add( params, 'clearAlpha', 0, 1 );
    gui.add( params, 'viewOffsetX', - 100, 100 );
    gui.add( params, 'autoRotate' );

    gui.open();

}

function init() {

    const container = document.getElementById( 'container' );

    const width = window.innerWidth || 1;
    const height = window.innerHeight || 1;
    const aspect = width / height;
    const devicePixelRatio = window.devicePixelRatio || 1;

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( devicePixelRatio );
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    cameraP = new THREE.PerspectiveCamera( 65, aspect, 3, 10 );
    cameraP.position.z = 7;
    cameraP.setViewOffset( width, height, params.viewOffsetX, 0, width, height );

    cameraO = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 3, 10 );
    cameraO.position.z = 7;

    const fov = THREE.MathUtils.degToRad( cameraP.fov );
    const hyperfocus = ( cameraP.near + cameraP.far ) / 2;
    const _height = 2 * Math.tan( fov / 2 ) * hyperfocus;
    cameraO.zoom = height / _height;


    scene = new THREE.Scene();

    const group = new THREE.Group();
    scene.add( group );

    const light = new THREE.PointLight( 0xddffdd, 1.0 );
    light.position.z = 70;
    light.position.y = - 70;
    light.position.x = - 70;
    scene.add( light );

    const light2 = new THREE.PointLight( 0xffdddd, 1.0 );
    light2.position.z = 70;
    light2.position.x = - 70;
    light2.position.y = 70;
    scene.add( light2 );

    const light3 = new THREE.PointLight( 0xddddff, 1.0 );
    light3.position.z = 70;
    light3.position.x = 70;
    light3.position.y = - 70;
    scene.add( light3 );

    const light4 = new THREE.AmbientLight( 0xffffff, 0.05 );
    scene.add( light4 );

    const geometry = new THREE.SphereGeometry( 3, 48, 24 );

    for ( let i = 0; i < 120; i ++ ) {

        const material = new THREE.MeshStandardMaterial();
        material.roughness = 0.5 * Math.random() + 0.25;
        material.metalness = 0;
        material.color.setHSL( Math.random(), 1.0, 0.3 );

        const mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = Math.random() * 4 - 2;
        mesh.position.y = Math.random() * 4 - 2;
        mesh.position.z = Math.random() * 4 - 2;
        mesh.rotation.x = Math.random();
        mesh.rotation.y = Math.random();
        mesh.rotation.z = Math.random();

        mesh.scale.setScalar( Math.random() * 0.2 + 0.05 );
        group.add( mesh );

    }

    // postprocessing

    composer = new EffectComposer( renderer );
    composer.setPixelRatio( 1 ); // ensure pixel ratio is always 1 for performance reasons
    ssaaRenderPassP = new SSAARenderPass( scene, cameraP );
    composer.addPass( ssaaRenderPassP );
    ssaaRenderPassO = new SSAARenderPass( scene, cameraO );
    composer.addPass( ssaaRenderPassO );
    copyPass = new ShaderPass( CopyShader );
    composer.addPass( copyPass );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    cameraP.aspect = aspect;
    cameraP.setViewOffset( width, height, params.viewOffset, 0, width, height );
    cameraO.updateProjectionMatrix();

    cameraO.left = - height * aspect;
    cameraO.right = height * aspect;
    cameraO.top = height;
    cameraO.bottom = - height;
    cameraO.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );

}

function animate() {

    requestId = requestAnimationFrame(animate);

    stats.begin();

    if ( params.autoRotate ) {

        for ( let i = 0; i < scene.children.length; i ++ ) {

            const child = scene.children[ i ];

            child.rotation.x += 0.005;
            child.rotation.y += 0.01;

        }

    }

    let newColor = ssaaRenderPassP.clearColor;

    switch ( params.clearColor ) {

        case 'blue': newColor = 0x0000ff; break;
        case 'red': newColor = 0xff0000; break;
        case 'green': newColor = 0x00ff00; break;
        case 'white': newColor = 0xffffff; break;
        case 'black': newColor = 0x000000; break;

    }

    ssaaRenderPassP.clearColor = ssaaRenderPassO.clearColor = newColor;
    ssaaRenderPassP.clearAlpha = ssaaRenderPassO.clearAlpha = params.clearAlpha;

    ssaaRenderPassP.sampleLevel = ssaaRenderPassO.sampleLevel = params.sampleLevel;
    ssaaRenderPassP.unbiased = ssaaRenderPassO.unbiased = params.unbiased;

    ssaaRenderPassP.enabled = ( params.camera === 'perspective' );
    ssaaRenderPassO.enabled = ( params.camera === 'orthographic' );

    copyPass.enabled = ! params.renderToScreen;

    cameraP.view.offsetX = params.viewOffsetX;

    composer.render();

    stats.end();

}
}
})