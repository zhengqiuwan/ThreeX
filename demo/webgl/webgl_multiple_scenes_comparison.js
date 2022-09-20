// webgl/webgl_multiple_scenes_comparison.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';

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
        let container, camera, renderer, controls;
			let sceneL, sceneR;

			let sliderPos = window.innerWidth / 2;

			init();

			function init() {

				container = document.querySelector( '.container' );

				sceneL = new THREE.Scene();
				sceneL.background = new THREE.Color( 0xBCD48F );

				sceneR = new THREE.Scene();
				sceneR.background = new THREE.Color( 0x8FBCD4 );

				camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.z = 6;

				controls = new OrbitControls( camera, container );

				const light = new THREE.HemisphereLight( 0xffffff, 0x444444, 1 );
				light.position.set( - 2, 2, 2 );
				sceneL.add( light.clone() );
				sceneR.add( light.clone() );

				initMeshes();
				initSlider();

				renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.setScissorTest( true );
				renderer.setAnimationLoop( render );
				container.appendChild( renderer.domElement );

				window.addEventListener( 'resize', onWindowResize );

			}

			function initMeshes() {

				const geometry = new THREE.IcosahedronGeometry( 1, 3 );

				const meshL = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial() );
				sceneL.add( meshL );

				const meshR = new THREE.Mesh( geometry, new THREE.MeshStandardMaterial( { wireframe: true } ) );
				sceneR.add( meshR );

			}

			function initSlider() {

				const slider = document.querySelector( '.slider' );

				function onPointerDown() {

					if ( event.isPrimary === false ) return;

					controls.enabled = false;

					window.addEventListener( 'pointermove', onPointerMove );
					window.addEventListener( 'pointerup', onPointerUp );

				}

				function onPointerUp() {

					controls.enabled = true;

					window.removeEventListener( 'pointermove', onPointerMove );
					window.removeEventListener( 'pointerup', onPointerUp );

				}

				function onPointerMove( e ) {

					if ( event.isPrimary === false ) return;

					sliderPos = Math.max( 0, Math.min( window.innerWidth, e.pageX ) );

					slider.style.left = sliderPos - ( slider.offsetWidth / 2 ) + 'px';

				}

				slider.style.touchAction = 'none'; // disable touch scroll
				slider.addEventListener( 'pointerdown', onPointerDown );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function render() {

				renderer.setScissor( 0, 0, sliderPos, window.innerHeight );
				renderer.render( sceneL, camera );

				renderer.setScissor( sliderPos, 0, window.innerWidth, window.innerHeight );
				renderer.render( sceneR, camera );

			}
    }
})