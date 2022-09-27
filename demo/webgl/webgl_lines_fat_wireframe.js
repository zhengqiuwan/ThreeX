// webgl/webgl_lines_fat_wireframe.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import Stats from '../jsm/libs/stats.module.js';

import { GUI } from '../jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from '../jsm/controls/OrbitControls.js';
import { LineMaterial } from '../jsm/lines/LineMaterial.js';
import { Wireframe } from '../jsm/lines/Wireframe.js';
import { WireframeGeometry2 } from '../jsm/lines/WireframeGeometry2.js';

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
         webgl_touch(e) {
        const web_e = Event.fix(e)
        //window.dispatchEvent(web_e)
        //document.dispatchEvent(web_e)
        this.canvas.dispatchEvent(web_e)
    },
async onLoad() {
        const canvas3d = this.canvas =await document.createElementAsync("canvas","webgl")
var that = this

        let wireframe, renderer, scene, camera, camera2, controls;
			let wireframe1;
			let matLine, matLineBasic, matLineDashed;
			let stats;
			let gui;

			// viewport
			let insetWidth;
			let insetHeight;

			init();
			animate();

			function init() {

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setClearColor( 0x000000, 0.0 );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( - 50, 0, 50 );

				camera2 = new THREE.PerspectiveCamera( 40, 1, 1, 1000 );
				camera2.position.copy( camera.position );

				controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 10;
				controls.maxDistance = 500;


				// Wireframe ( WireframeGeometry2, LineMaterial )

				let geo = new THREE.IcosahedronGeometry( 20, 1 );

				const geometry = new WireframeGeometry2( geo );

				matLine = new LineMaterial( {

					color: 0x4080ff,
					linewidth: 5, // in pixels
					//resolution:  // to be set by renderer, eventually
					dashed: false

				} );

				wireframe = new Wireframe( geometry, matLine );
				wireframe.computeLineDistances();
				wireframe.scale.set( 1, 1, 1 );
				scene.add( wireframe );


				// Line ( THREE.WireframeGeometry, THREE.LineBasicMaterial ) - rendered with gl.LINE

				geo = new THREE.WireframeGeometry( geo );

				matLineBasic = new THREE.LineBasicMaterial( { color: 0x4080ff } );
				matLineDashed = new THREE.LineDashedMaterial( { scale: 2, dashSize: 1, gapSize: 1 } );

				wireframe1 = new THREE.LineSegments( geo, matLineBasic );
				wireframe1.computeLineDistances();
				wireframe1.visible = false;
				scene.add( wireframe1 );

				//

				window.addEventListener( 'resize', onWindowResize );
				onWindowResize();

				stats = new Stats();
				document.body.appendChild( stats.dom );

				initGui();

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

				insetWidth = window.innerHeight / 4; // square
				insetHeight = window.innerHeight / 4;

				camera2.aspect = insetWidth / insetHeight;
				camera2.updateProjectionMatrix();

			}

			function animate() {

				requestAnimationFrame(animate);

			//	//stats.update();

				// main scene

				renderer.setClearColor( 0x000000, 0 );

				renderer.setViewport( 0, 0, window.innerWidth, window.innerHeight );

				// renderer will set this eventually
				matLine.resolution.set( window.innerWidth, window.innerHeight ); // resolution of the viewport

				renderer.render( scene, camera );

				// inset scene

				renderer.setClearColor( 0x222222, 1 );

				renderer.clearDepth(); // important!

				renderer.setScissorTest( true );

				renderer.setScissor( 20, 20, insetWidth, insetHeight );

				renderer.setViewport( 20, 20, insetWidth, insetHeight );

				camera2.position.copy( camera.position );
				camera2.quaternion.copy( camera.quaternion );

				// renderer will set this eventually
				matLine.resolution.set( insetWidth, insetHeight ); // resolution of the inset viewport

				renderer.render( scene, camera2 );

				renderer.setScissorTest( false );

			}

			//

			function initGui() {

				gui = new GUI();

				const param = {
					'line type': 0,
					'width (px)': 5,
					'dashed': false,
					'dash scale': 1,
					'dash / gap': 1
				};


				gui.add( param, 'line type', { 'LineGeometry': 0, 'gl.LINE': 1 } ).onChange( function ( val ) {

					switch ( val ) {

						case 0:
							wireframe.visible = true;

							wireframe1.visible = false;

							break;

						case 1:
							wireframe.visible = false;

							wireframe1.visible = true;

							break;

					}

				} );

				gui.add( param, 'width (px)', 1, 10 ).onChange( function ( val ) {

					matLine.linewidth = val;

				} );

				gui.add( param, 'dashed' ).onChange( function ( val ) {

					matLine.dashed = val;

					// dashed is implemented as a defines -- not as a uniform. this could be changed.
					// ... or THREE.LineDashedMaterial could be implemented as a separate material
					// temporary hack - renderer should do this eventually
					if ( val ) matLine.defines.USE_DASH = ''; else delete matLine.defines.USE_DASH;
					matLine.needsUpdate = true;

					wireframe1.material = val ? matLineDashed : matLineBasic;

				} );

				gui.add( param, 'dash scale', 0.5, 1, 0.1 ).onChange( function ( val ) {

					matLine.dashScale = val;
					matLineDashed.scale = val;

				} );

				gui.add( param, 'dash / gap', { '2 : 1': 0, '1 : 1': 1, '1 : 2': 2 } ).onChange( function ( val ) {

					switch ( val ) {

						case 0:
							matLine.dashSize = 2;
							matLine.gapSize = 1;

							matLineDashed.dashSize = 2;
							matLineDashed.gapSize = 1;

							break;

						case 1:
							matLine.dashSize = 1;
							matLine.gapSize = 1;

							matLineDashed.dashSize = 1;
							matLineDashed.gapSize = 1;

							break;

						case 2:
							matLine.dashSize = 1;
							matLine.gapSize = 2;

							matLineDashed.dashSize = 1;
							matLineDashed.gapSize = 2;

							break;

					}

				} );

			}
    }
})