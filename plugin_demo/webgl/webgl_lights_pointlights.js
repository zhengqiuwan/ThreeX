// webgl/webgl_lights_pointlights.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';

import { OBJLoader } from './jsm/loaders/OBJLoader.js';
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
        let camera, scene, renderer,
				light1, light2, light3, light4,
				object, stats;

			const clock = new THREE.Clock();

			init();
			animate();

			function init() {

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 100;

				scene = new THREE.Scene();

				//model

				const loader = new OBJLoader();
				loader.load( 'models/obj/walt/WaltHead.obj', function ( obj ) {

					object = obj;
					object.scale.multiplyScalar( 0.8 );
					object.position.y = - 30;
					scene.add( object );

				} );

				const sphere = new THREE.SphereGeometry( 0.5, 16, 8 );

				//lights

				light1 = new THREE.PointLight( 0xff0040, 2, 50 );
				light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
				scene.add( light1 );

				light2 = new THREE.PointLight( 0x0040ff, 2, 50 );
				light2.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x0040ff } ) ) );
				scene.add( light2 );

				light3 = new THREE.PointLight( 0x80ff80, 2, 50 );
				light3.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0x80ff80 } ) ) );
				scene.add( light3 );

				light4 = new THREE.PointLight( 0xffaa00, 2, 50 );
				light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
				scene.add( light4 );

				//renderer

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//stats

				stats = new Stats();
				document.body.appendChild( stats.dom );

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				render();
				// //stats.update();

			}

			function render() {

				const time = Date.now() * 0.0005;
				const delta = clock.getDelta();

				if ( object ) object.rotation.y -= 0.5 * delta;

				light1.position.x = Math.sin( time * 0.7 ) * 30;
				light1.position.y = Math.cos( time * 0.5 ) * 40;
				light1.position.z = Math.cos( time * 0.3 ) * 30;

				light2.position.x = Math.cos( time * 0.3 ) * 30;
				light2.position.y = Math.sin( time * 0.5 ) * 40;
				light2.position.z = Math.sin( time * 0.7 ) * 30;

				light3.position.x = Math.sin( time * 0.7 ) * 30;
				light3.position.y = Math.cos( time * 0.3 ) * 40;
				light3.position.z = Math.sin( time * 0.5 ) * 30;

				light4.position.x = Math.sin( time * 0.3 ) * 30;
				light4.position.y = Math.cos( time * 0.7 ) * 40;
				light4.position.z = Math.sin( time * 0.5 ) * 30;

				renderer.render( scene, camera );

			}
    }
})