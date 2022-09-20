// webgl/webgl_loader_fbx_nurbs.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import Stats from './jsm/libs/stats.module.js';

			import { OrbitControls } from './jsm/controls/OrbitControls.js';
			import { FBXLoader } from './jsm/loaders/FBXLoader.js';
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
        
			let camera, scene, renderer, stats;

			init();
			animate();

			function init() {

				const container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 2, 18, 28 );

				scene = new THREE.Scene();

				const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
				hemiLight.position.set( 0, 1, 0 );
				scene.add( hemiLight );

				const dirLight = new THREE.DirectionalLight( 0xffffff );
				dirLight.position.set( 0, 1, 0 );
				scene.add( dirLight );

				// grid
				const gridHelper = new THREE.GridHelper( 28, 28, 0x303030, 0x303030 );
				scene.add( gridHelper );

				// stats
				stats = new Stats();
				container.appendChild( stats.dom );

				// model
				const loader = new FBXLoader();
				loader.load( 'models/fbx/nurbs.fbx', function ( object ) {

					scene.add( object );

				} );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.target.set( 0, 12, 0 );
				controls.update();

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

				renderer.render( scene, camera );

			//	//stats.update();

			}
    }
})