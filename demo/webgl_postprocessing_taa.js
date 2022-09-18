// webgl_postprocessing/webgl_postprocessing_taa.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';

import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
import { TAARenderPass } from './jsm/postprocessing/TAARenderPass.js';
import { CopyShader } from './jsm/shaders/CopyShader.js';

Page({
  onUnload(){
    cancelAnimationFrame()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
},
async onLoad(){
var that = this
const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")


let camera, scene, renderer, composer, copyPass, taaRenderPass, renderPass;
let gui, stats;
let index = 0;

const param = { TAAEnabled: '1', TAASampleLevel: 0 };

init();
animate();

clearGui();

function clearGui() {

    if ( gui ) gui.destroy();

    gui = new GUI();

    gui.add( param, 'TAAEnabled', {
        'Disabled': '0',
        'Enabled': '1'
    } ).onFinishChange( function () {

        if ( taaRenderPass ) {

            taaRenderPass.enabled = ( param.TAAEnabled === '1' );
            renderPass.enabled = ( param.TAAEnabled !== '1' );

        }

    } );

    gui.add( param, 'TAASampleLevel', {
        'Level 0: 1 Sample': 0,
        'Level 1: 2 Samples': 1,
        'Level 2: 4 Samples': 2,
        'Level 3: 8 Samples': 3,
        'Level 4: 16 Samples': 4,
        'Level 5: 32 Samples': 5
    } ).onFinishChange( function () {

        if ( taaRenderPass ) {

            taaRenderPass.sampleLevel = param.TAASampleLevel;

        }

    } );

    gui.open();

}

function init() {

    const container = document.getElementById( 'container' );

    renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 300;

    scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 120, 120, 120 );
    const material1 = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );

    const mesh1 = new THREE.Mesh( geometry, material1 );
    mesh1.position.x = - 100;
    scene.add( mesh1 );

    const texture = new THREE.TextureLoader().load( 'textures/brick_diffuse.jpg' );
    texture.minFilter = THREE.NearestFilter;
    texture.magFilter = THREE.NearestFilter;
    texture.anisotropy = 1;
    texture.generateMipmaps = false;

    const material2 = new THREE.MeshBasicMaterial( { map: texture } );

    const mesh2 = new THREE.Mesh( geometry, material2 );
    mesh2.position.x = 100;
    scene.add( mesh2 );

    // postprocessing

    composer = new EffectComposer( renderer );

    taaRenderPass = new TAARenderPass( scene, camera );
    taaRenderPass.unbiased = false;
    composer.addPass( taaRenderPass );

    renderPass = new RenderPass( scene, camera );
    renderPass.enabled = false;
    composer.addPass( renderPass );

    copyPass = new ShaderPass( CopyShader );
    composer.addPass( copyPass );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );

}

function animate() {

    requestAnimationFrame( animate );

    index ++;

    if ( Math.round( index / 200 ) % 2 === 0 ) {

        for ( let i = 0; i < scene.children.length; i ++ ) {

            const child = scene.children[ i ];

            child.rotation.x += 0.005;
            child.rotation.y += 0.01;

        }

        if ( taaRenderPass ) taaRenderPass.accumulate = false;

    } else {

        if ( taaRenderPass ) taaRenderPass.accumulate = true;

    }

    composer.render();

    stats.update();

}

}
})