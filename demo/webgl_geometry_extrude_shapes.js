// webgl/webgl_geometry_extrude_shapes.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';
import { TrackballControls } from './jsm/controls/TrackballControls.js';
Page({
	async onLoad() {
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

        let camera, scene, renderer, controls;

			init();
			animate();

			function init() {

				const info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.style.color = '#fff';
				info.style.link = '#f80';
				info.innerHTML = '<a href="https://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - geometry extrude shapes';
				document.body.appendChild( info );

				renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0x222222 );

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.set( 0, 0, 500 );

				controls = new TrackballControls( camera, renderer.domElement );
				controls.minDistance = 200;
				controls.maxDistance = 500;

				scene.add( new THREE.AmbientLight( 0x222222 ) );

				const light = new THREE.PointLight( 0xffffff );
				light.position.copy( camera.position );
				scene.add( light );

				//

				const closedSpline = new THREE.CatmullRomCurve3( [
					new THREE.Vector3( - 60, - 100, 60 ),
					new THREE.Vector3( - 60, 20, 60 ),
					new THREE.Vector3( - 60, 120, 60 ),
					new THREE.Vector3( 60, 20, - 60 ),
					new THREE.Vector3( 60, - 100, - 60 )
				] );

				closedSpline.curveType = 'catmullrom';
				closedSpline.closed = true;

				const extrudeSettings1 = {
					steps: 100,
					bevelEnabled: false,
					extrudePath: closedSpline
				};


				const pts1 = [], count = 3;

				for ( let i = 0; i < count; i ++ ) {

					const l = 20;

					const a = 2 * i / count * Math.PI;

					pts1.push( new THREE.Vector2( Math.cos( a ) * l, Math.sin( a ) * l ) );

				}

				const shape1 = new THREE.Shape( pts1 );

				const geometry1 = new THREE.ExtrudeGeometry( shape1, extrudeSettings1 );

				const material1 = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );

				const mesh1 = new THREE.Mesh( geometry1, material1 );

				scene.add( mesh1 );


				//


				const randomPoints = [];

				for ( let i = 0; i < 10; i ++ ) {

					randomPoints.push( new THREE.Vector3( ( i - 4.5 ) * 50, THREE.MathUtils.randFloat( - 50, 50 ), THREE.MathUtils.randFloat( - 50, 50 ) ) );

				}

				const randomSpline = new THREE.CatmullRomCurve3( randomPoints );

				//

				const extrudeSettings2 = {
					steps: 200,
					bevelEnabled: false,
					extrudePath: randomSpline
				};


				const pts2 = [], numPts = 5;

				for ( let i = 0; i < numPts * 2; i ++ ) {

					const l = i % 2 == 1 ? 10 : 20;

					const a = i / numPts * Math.PI;

					pts2.push( new THREE.Vector2( Math.cos( a ) * l, Math.sin( a ) * l ) );

				}

				const shape2 = new THREE.Shape( pts2 );

				const geometry2 = new THREE.ExtrudeGeometry( shape2, extrudeSettings2 );

				const material2 = new THREE.MeshLambertMaterial( { color: 0xff8000, wireframe: false } );

				const mesh2 = new THREE.Mesh( geometry2, material2 );

				scene.add( mesh2 );


				//

				const materials = [ material1, material2 ];

				const extrudeSettings3 = {
					depth: 20,
					steps: 1,
					bevelEnabled: true,
					bevelThickness: 2,
					bevelSize: 4,
					bevelSegments: 1
				};

				const geometry3 = new THREE.ExtrudeGeometry( shape2, extrudeSettings3 );

				const mesh3 = new THREE.Mesh( geometry3, materials );

				mesh3.position.set( 50, 100, 50 );

				scene.add( mesh3 );

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update();
				renderer.render( scene, camera );

			}
    }
})