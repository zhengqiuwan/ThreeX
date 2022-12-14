// webgl/webgl_geometry_convex.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  { OrbitControls } from './jsm/controls/OrbitControls.js';
import { ConvexGeometry } from './jsm/geometries/ConvexGeometry.js';
import * as BufferGeometryUtils from './jsm/utils/BufferGeometryUtils.js';
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

        
			let group, camera, scene, renderer;

			init();
			animate();

			function init() {

				scene = new THREE.Scene();

				renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				// camera

				camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 15, 20, 30 );
				scene.add( camera );

				// controls

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 20;
				controls.maxDistance = 50;
				controls.maxPolarAngle = Math.PI / 2;

				// ambient light

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				// point light

				const light = new THREE.PointLight( 0xffffff, 1 );
				camera.add( light );

				// helper

				scene.add( new THREE.AxesHelper( 20 ) );

				// textures

				const loader = new THREE.TextureLoader( );
				const texture = loader.load( 'textures/sprites/disc.png' );

				group = new THREE.Group();
				scene.add( group );

				// points

				let dodecahedronGeometry = new THREE.DodecahedronGeometry( 10 );

				// if normal and uv attributes are not removed, mergeVertices() can't consolidate indentical vertices with different normal/uv data

				dodecahedronGeometry.deleteAttribute( 'normal' );
				dodecahedronGeometry.deleteAttribute( 'uv' );

				dodecahedronGeometry = BufferGeometryUtils.mergeVertices( dodecahedronGeometry );

				const vertices = [];
				const positionAttribute = dodecahedronGeometry.getAttribute( 'position' );

				for ( let i = 0; i < positionAttribute.count; i ++ ) {

					const vertex = new THREE.Vector3();
					vertex.fromBufferAttribute( positionAttribute, i );
					vertices.push( vertex );

				}

				const pointsMaterial = new THREE.PointsMaterial( {

					color: 0x0080ff,
					map: texture,
					size: 1,
					alphaTest: 0.5

				} );

				const pointsGeometry = new THREE.BufferGeometry().setFromPoints( vertices );

				const points = new THREE.Points( pointsGeometry, pointsMaterial );
				group.add( points );

				// convex hull

				const meshMaterial = new THREE.MeshLambertMaterial( {
					color: 0xffffff,
					opacity: 0.5,
					transparent: true
				} );

				const meshGeometry = new ConvexGeometry( vertices );

				const mesh1 = new THREE.Mesh( meshGeometry, meshMaterial );
				mesh1.material.side = THREE.BackSide; // back faces
				mesh1.renderOrder = 0;
				group.add( mesh1 );

				const mesh2 = new THREE.Mesh( meshGeometry, meshMaterial.clone() );
				mesh2.material.side = THREE.FrontSide; // front faces
				mesh2.renderOrder = 1;
				group.add( mesh2 );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestId = requestAnimationFrame(animate);

				group.rotation.y += 0.005;

				render();

			}

			function render() {

				renderer.render( scene, camera );

			}
    }
})