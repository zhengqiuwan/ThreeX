// webgl_advanced/webgl_shadowmap_csm.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { GUI } from './jsm/libs/lil-gui.module.min.js';
import { CSM } from './jsm/csm/CSM.js';
import { CSMHelper } from './jsm/csm/CSMHelper.js';
Page({
  onUnload(){
    cancelAnimationFrame()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.renderer.context = null
    this.renderer.domElement = null
    this.renderer = null
},
    webgl_touch(e){
        const web_e = Event.fix(e)
        window.dispatchEvent(web_e)
        this.canvas && this.canvas.dispatchEvent(web_e)
    },
async onLoad(){
var that = this
const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")
let renderer, scene, camera, orthoCamera, controls, csm, csmHelper;

			const params = {
				orthographic: false,
				fade: false,
				far: 1000,
				mode: 'practical',
				lightX: - 1,
				lightY: - 1,
				lightZ: - 1,
				margin: 100,
				lightFar: 5000,
				lightNear: 1,
				autoUpdateHelper: true,
				updateHelper: function () {

					csmHelper.update();

				}
			};

			init();
			animate();

			function updateOrthoCamera() {

				const size = controls.target.distanceTo( camera.position );
				const aspect = camera.aspect;

				orthoCamera.left = size * aspect / - 2;
				orthoCamera.right = size * aspect / 2;

				orthoCamera.top = size / 2;
				orthoCamera.bottom = size / - 2;
				orthoCamera.position.copy( camera.position );
				orthoCamera.rotation.copy( camera.rotation );
				orthoCamera.updateProjectionMatrix();

			}

			function init() {

				scene = new THREE.Scene();
				scene.background = new THREE.Color( '#454e61' );
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 5000 );
				orthoCamera = new THREE.OrthographicCamera();

				renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );
				renderer.shadowMap.enabled = true;
				renderer.shadowMap.type = THREE.PCFSoftShadowMap;

				controls = new OrbitControls( camera, renderer.domElement );
				controls.maxPolarAngle = Math.PI / 2;
				camera.position.set( 60, 60, 0 );
				controls.target = new THREE.Vector3( - 100, 10, 0 );
				controls.update();

				const ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
				scene.add( ambientLight );

				const additionalDirectionalLight = new THREE.DirectionalLight( 0x000020, 0.5 );
				additionalDirectionalLight.position.set( params.lightX, params.lightY, params.lightZ ).normalize().multiplyScalar( - 200 );
				scene.add( additionalDirectionalLight );

				csm = new CSM( {
					maxFar: params.far,
					cascades: 4,
					mode: params.mode,
					parent: scene,
					shadowMapSize: 1024,
					lightDirection: new THREE.Vector3( params.lightX, params.lightY, params.lightZ ).normalize(),
					camera: camera
				} );

				csmHelper = new CSMHelper( csm );
				csmHelper.visible = false;
				scene.add( csmHelper );

				const floorMaterial = new THREE.MeshPhongMaterial( { color: '#252a34' } );
				csm.setupMaterial( floorMaterial );

				const floor = new THREE.Mesh( new THREE.PlaneGeometry( 10000, 10000, 8, 8 ), floorMaterial );
				floor.rotation.x = - Math.PI / 2;
				floor.castShadow = true;
				floor.receiveShadow = true;
				scene.add( floor );

				const material1 = new THREE.MeshPhongMaterial( { color: '#08d9d6' } );
				csm.setupMaterial( material1 );

				const material2 = new THREE.MeshPhongMaterial( { color: '#ff2e63' } );
				csm.setupMaterial( material2 );

				const geometry = new THREE.BoxGeometry( 10, 10, 10 );

				for ( let i = 0; i < 40; i ++ ) {

					const cube1 = new THREE.Mesh( geometry, i % 2 === 0 ? material1 : material2 );
					cube1.castShadow = true;
					cube1.receiveShadow = true;
					scene.add( cube1 );
					cube1.position.set( - i * 25, 20, 30 );
					cube1.scale.y = Math.random() * 2 + 6;

					const cube2 = new THREE.Mesh( geometry, i % 2 === 0 ? material2 : material1 );
					cube2.castShadow = true;
					cube2.receiveShadow = true;
					scene.add( cube2 );
					cube2.position.set( - i * 25, 20, - 30 );
					cube2.scale.y = Math.random() * 2 + 6;

				}

				const gui = new GUI();

				gui.add( params, 'orthographic' ).onChange( function ( value ) {

					csm.camera = value ? orthoCamera : camera;
					csm.updateFrustums();

				} );

				gui.add( params, 'fade' ).onChange( function ( value ) {

					csm.fade = value;
					csm.updateFrustums();

				} );

				gui.add( params, 'far', 1, 5000 ).step( 1 ).name( 'shadow far' ).onChange( function ( value ) {

					csm.maxFar = value;
					csm.updateFrustums();

				} );

				gui.add( params, 'mode', [ 'uniform', 'logarithmic', 'practical' ] ).name( 'frustum split mode' ).onChange( function ( value ) {

					csm.mode = value;
					csm.updateFrustums();

				} );

				gui.add( params, 'lightX', - 1, 1 ).name( 'light direction x' ).onChange( function ( value ) {

					csm.lightDirection.x = value;

				} );

				gui.add( params, 'lightY', - 1, 1 ).name( 'light direction y' ).onChange( function ( value ) {

					csm.lightDirection.y = value;

				} );

				gui.add( params, 'lightZ', - 1, 1 ).name( 'light direction z' ).onChange( function ( value ) {

					csm.lightDirection.z = value;

				} );

				gui.add( params, 'margin', 0, 200 ).name( 'light margin' ).onChange( function ( value ) {

					csm.lightMargin = value;

				} );

				gui.add( params, 'lightNear', 1, 10000 ).name( 'light near' ).onChange( function ( value ) {

					for ( let i = 0; i < csm.lights.length; i ++ ) {

						csm.lights[ i ].shadow.camera.near = value;
						csm.lights[ i ].shadow.camera.updateProjectionMatrix();

					}

				} );

				gui.add( params, 'lightFar', 1, 10000 ).name( 'light far' ).onChange( function ( value ) {

					for ( let i = 0; i < csm.lights.length; i ++ ) {

						csm.lights[ i ].shadow.camera.far = value;
						csm.lights[ i ].shadow.camera.updateProjectionMatrix();

					}

				} );

				const helperFolder = gui.addFolder( 'helper' );

				helperFolder.add( csmHelper, 'visible' );

				helperFolder.add( csmHelper, 'displayFrustum' ).onChange( function () {

					csmHelper.updateVisibility();

				} );

				helperFolder.add( csmHelper, 'displayPlanes' ).onChange( function () {

					csmHelper.updateVisibility();

				} );

				helperFolder.add( csmHelper, 'displayShadowBounds' ).onChange( function () {

					csmHelper.updateVisibility();

				} );

				helperFolder.add( params, 'autoUpdateHelper' ).name( 'auto update' );

				helperFolder.add( params, 'updateHelper' ).name( 'update' );

				helperFolder.open();

				window.addEventListener( 'resize', function () {

					camera.aspect = window.innerWidth / window.innerHeight;
					camera.updateProjectionMatrix();

					updateOrthoCamera();
					csm.updateFrustums();

					renderer.setSize( window.innerWidth, window.innerHeight );

				} );

			}

			function animate() {

				requestAnimationFrame( animate );

				camera.updateMatrixWorld();
				csm.update();
				controls.update();

				if ( params.orthographic ) {

					updateOrthoCamera();
					csm.updateFrustums();

					if ( params.autoUpdateHelper ) {

						csmHelper.update();

					}

					renderer.render( scene, orthoCamera );

				} else {

					if ( params.autoUpdateHelper ) {

						csmHelper.update();

					}

					renderer.render( scene, camera );

				}

			}

}
})