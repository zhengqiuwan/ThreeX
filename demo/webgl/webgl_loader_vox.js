// webgl/webgl_loader_vox.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { VOXLoader, VOXMesh } from './jsm/loaders/VOXLoader.js';

var requestId
Page({
	   
         onUnload() {
	   		cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
		setTimeout(() => {
			if (this.renderer instanceof THREE.WebGLRenderer) {
				this.renderer.dispose()
				this.renderer.forceContextLoss()
				this.renderer.context = null
				this.renderer.domElement = null
				this.renderer = null
			}
		}, 0)
        
	},
         webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

        let camera, controls, scene, renderer;

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 10 );
				camera.position.set( 0.175, 0.075, 0.175 );

				scene = new THREE.Scene();
				scene.add( camera );

				// light

				const hemiLight = new THREE.HemisphereLight( 0x888888, 0x444444, 1 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff, 0.75 );
				dirLight.position.set( 1.5, 3, 2.5 );
				scene.add( dirLight );

				const dirLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
				dirLight2.position.set( - 1.5, - 3, - 2.5 );
				scene.add( dirLight2 );

				const loader = new VOXLoader();
				loader.load( 'models/vox/monu10.vox', function ( chunks ) {

					for ( let i = 0; i < chunks.length; i ++ ) {

						const chunk = chunks[ i ];

						// displayPalette( chunk.palette );

						const mesh = new VOXMesh( chunk );
						mesh.scale.setScalar( 0.0015 );
						scene.add( mesh );

					}

				} );

				// renderer

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				// controls

				controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = .1;
				controls.maxDistance = 0.5;

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			/*
			function displayPalette( palette ) {

				const canvas = document.createElement( 'canvas' );
				canvas.width = 8;
				canvas.height = 32;
				canvas.style.position = 'absolute';
				canvas.style.top = '0';
				canvas.style.width = '100px';
				canvas.style.imageRendering = 'pixelated';
				document.body.appendChild( canvas );

				const context = canvas.getContext( '2d' );

				for ( let c = 0; c < 256; c ++ ) {

					const x = c % 8;
					const y = Math.floor( c / 8 );

					const hex = palette[ c + 1 ];
					const r = hex >> 0 & 0xff;
					const g = hex >> 8 & 0xff;
					const b = hex >> 16 & 0xff;
					context.fillStyle = `rgba(${r},${g},${b},1)`;
					context.fillRect( x, 31 - y, 1, 1 );

				}

			}
			*/

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				controls.update();

				renderer.render( scene, camera );

			}
    }
})