// webgl/webgl_materials_envmaps.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';
Page({
	async onLoad() {
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

        
			let controls, camera, scene, renderer;
			let textureEquirec, textureCube;
			let sphereMesh, sphereMaterial;

			init();
			animate();

			function init() {

				// CAMERAS

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
				camera.position.set( 0, 0, 1000 );

				// SCENE

				scene = new THREE.Scene();

				// Textures

				const loader = new THREE.CubeTextureLoader();
				loader.setPath( 'textures/cube/Bridge2/' );

				textureCube = loader.load( [ 'posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg' ] );
				textureCube.encoding = THREE.sRGBEncoding;

				const textureLoader = new THREE.TextureLoader();

				textureEquirec = textureLoader.load( 'textures/2294472375_24a3b8ef46_o.jpg' );
				textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
				textureEquirec.encoding = THREE.sRGBEncoding;

				scene.background = textureCube;

				//

				const geometry = new THREE.IcosahedronGeometry( 400, 15 );
				sphereMaterial = new THREE.MeshBasicMaterial( { envMap: textureCube } );
				sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
				scene.add( sphereMesh );

				//

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.outputEncoding = THREE.sRGBEncoding;
				document.body.appendChild( renderer.domElement );

				//

				controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 500;
				controls.maxDistance = 2500;

				//

				const params = {
					Cube: function () {

						scene.background = textureCube;

						sphereMaterial.envMap = textureCube;
						sphereMaterial.needsUpdate = true;

					},
					Equirectangular: function () {

						scene.background = textureEquirec;

						sphereMaterial.envMap = textureEquirec;
						sphereMaterial.needsUpdate = true;

					},
					Refraction: false
				};

				const gui = new GUI();
				gui.add( params, 'Cube' );
				gui.add( params, 'Equirectangular' );
				gui.add( params, 'Refraction' ).onChange( function ( value ) {

					if ( value ) {

						textureEquirec.mapping = THREE.EquirectangularRefractionMapping;
						textureCube.mapping = THREE.CubeRefractionMapping;

					} else {

						textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
						textureCube.mapping = THREE.CubeReflectionMapping;

					}

					sphereMaterial.needsUpdate = true;

				} );
				gui.open();

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();

			}

			function render() {

				camera.lookAt( scene.position );
				renderer.render( scene, camera );

			}
    }
})