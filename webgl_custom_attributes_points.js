// webgl_advanced/webgl_custom_attributes_points.js
import {document,window,requestAnimationFrame} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';
const onekit = {
"vertexshader":`

    attribute float size;
    attribute vec3 customColor;

    varying vec3 vColor;

    void main() {

        vColor = customColor;

        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

        gl_PointSize = size * ( 300.0 / -mvPosition.z );

        gl_Position = projectionMatrix * mvPosition;

    }
`,"fragmentshader":`

    uniform vec3 color;
    uniform sampler2D pointTexture;

    varying vec3 vColor;

    void main() {

        gl_FragColor = vec4( color * vColor, 1.0 );
        gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );

    }
`

}
Page({
  async onLoad(){
getApp().canvas = await document.createElementAsync("canvas","webgl")
let renderer, scene, camera, stats;

let sphere;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 40, WIDTH / HEIGHT, 1, 10000 );
    camera.position.z = 300;

    scene = new THREE.Scene();

    const amount = 100000;
    const radius = 200;

    const positions = new Float32Array( amount * 3 );
    const colors = new Float32Array( amount * 3 );
    const sizes = new Float32Array( amount );

    const vertex = new THREE.Vector3();
    const color = new THREE.Color( 0xffffff );

    for ( let i = 0; i < amount; i ++ ) {

        vertex.x = ( Math.random() * 2 - 1 ) * radius;
        vertex.y = ( Math.random() * 2 - 1 ) * radius;
        vertex.z = ( Math.random() * 2 - 1 ) * radius;
        vertex.toArray( positions, i * 3 );

        if ( vertex.x < 0 ) {

            color.setHSL( 0.5 + 0.1 * ( i / amount ), 0.7, 0.5 );

        } else {

            color.setHSL( 0.0 + 0.1 * ( i / amount ), 0.9, 0.5 );

        }

        color.toArray( colors, i * 3 );

        sizes[ i ] = 10;

    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    geometry.setAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );

    //

    const material = new THREE.ShaderMaterial( {

        uniforms: {
            color: { value: new THREE.Color( 0xffffff ) },
            pointTexture: { value: new THREE.TextureLoader().load( 'textures/sprites/spark1.png' ) }
        },
        vertexShader:onekit['vertexshader' ],
        fragmentShader: onekit['fragmentshader' ],

        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true

    } );

    //

    sphere = new THREE.Points( geometry, material );
    scene.add( sphere );

    //

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );

    const container = document.getElementById( 'container' );
    container.appendChild( renderer.domElement );

    stats = new Stats();
    container.appendChild( stats.dom );

    //

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    render();
    stats.update();

}

function render() {

    const time = Date.now() * 0.005;

    sphere.rotation.z = 0.01 * time;

    const geometry = sphere.geometry;
    const attributes = geometry.attributes;

    for ( let i = 0; i < attributes.size.array.length; i ++ ) {

        attributes.size.array[ i ] = 14 + 13 * Math.sin( 0.1 * i + time );

    }

    attributes.size.needsUpdate = true;

    renderer.render( scene, camera );

}

}
})