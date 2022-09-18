// webgl/webgl_math_obb.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event} from 'dhtml-weixin';
import * as THREE from 'three-weixin';

import { OBB } from './jsm/math/OBB.js';
import { OrbitControls } from './jsm/controls/OrbitControls.js';

import Stats from './jsm/libs/stats.module.js';
Page({
	async onLoad() {
var that = this
        const canvas3d = this.canvas = await document.createElementAsync("canvas","webgl")

        let camera, scene, renderer, clock, controls, stats, raycaster, hitbox;

        const objects = [], mouse = new THREE.Vector2();

        init();
        animate();

        function init() {

            camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
            camera.position.set( 0, 0, 75 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xffffff );

            clock = new THREE.Clock();

            raycaster = new THREE.Raycaster();

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x222222, 1.5 );
            hemiLight.position.set( 1, 1, 1 );
            scene.add( hemiLight );

            const size = new THREE.Vector3( 10, 5, 6 );
            const geometry = new THREE.BoxGeometry( size.x, size.y, size.z );

            // setup OBB on geometry level (doing this manually for now)

            geometry.userData.obb = new OBB();
            geometry.userData.obb.halfSize.copy( size ).multiplyScalar( 0.5 );

            for ( let i = 0; i < 100; i ++ ) {

                const object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x00ff00 } ) );
                object.matrixAutoUpdate = false;

                object.position.x = Math.random() * 80 - 40;
                object.position.y = Math.random() * 80 - 40;
                object.position.z = Math.random() * 80 - 40;

                object.rotation.x = Math.random() * 2 * Math.PI;
                object.rotation.y = Math.random() * 2 * Math.PI;
                object.rotation.z = Math.random() * 2 * Math.PI;

                object.scale.x = Math.random() + 0.5;
                object.scale.y = Math.random() + 0.5;
                object.scale.z = Math.random() + 0.5;

                scene.add( object );

                // bounding volume on object level (this will reflect the current world transform)

                object.userData.obb = new OBB();

                objects.push( object );

            }

            //

            hitbox = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } ) );

            //

            renderer = that.renderer = new  THREE.WebGLRenderer({canvas:canvas3d, antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            //

            controls = new OrbitControls( camera, renderer.domElement );
            controls.enableDamping = true;

            //

            stats = new Stats();
            document.body.appendChild( stats.dom );


            //

            window.addEventListener( 'resize', onWindowResize );

            document.addEventListener( 'click', onClick );

        }

        function onClick( event ) {

            event.preventDefault();

            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            raycaster.setFromCamera( mouse, camera );

            const intersectionPoint = new THREE.Vector3();
            const intersections = [];

            for ( let i = 0, il = objects.length; i < il; i ++ ) {

                const object = objects[ i ];
                const obb = object.userData.obb;

                const ray = raycaster.ray;

                if ( obb.intersectRay( ray, intersectionPoint ) !== null ) {

                    const distance = ray.origin.distanceTo( intersectionPoint );
                    intersections.push( { distance: distance, object: object } );

                }

            }

            if ( intersections.length > 0 ) {

                // determine closest intersection and highlight the respective 3D object

                intersections.sort( sortIntersections );

                intersections[ 0 ].object.add( hitbox );

            } else {

                const parent = hitbox.parent;

                if ( parent ) parent.remove( hitbox );

            }

        }

        function sortIntersections( a, b ) {

            return a.distance - b.distance;

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function animate() {

            requestAnimationFrame( animate );

            controls.update();

            // transform cubes

            const delta = clock.getDelta();

            for ( let i = 0, il = objects.length; i < il; i ++ ) {

                const object = objects[ i ];

                object.rotation.x += delta * Math.PI * 0.20;
                object.rotation.y += delta * Math.PI * 0.1;

                object.updateMatrix();
                object.updateMatrixWorld();

                // update OBB

                object.userData.obb.copy( object.geometry.userData.obb );
                object.userData.obb.applyMatrix4( object.matrixWorld );

                // reset

                object.material.color.setHex( 0x00ff00 );

            }

            // collision detection

            for ( let i = 0, il = objects.length; i < il; i ++ ) {

                const object = objects[ i ];
                const obb = object.userData.obb;

                for ( let j = i + 1, jl = objects.length; j < jl; j ++ ) {

                    const objectToTest = objects[ j ];
                    const obbToTest = objectToTest.userData.obb;

                    // now perform intersection test

                    if ( obb.intersectsOBB( obbToTest ) === true ) {

                        object.material.color.setHex( 0xff0000 );
                        objectToTest.material.color.setHex( 0xff0000 );

                    }

                }

            }

            renderer.render( scene, camera );

            stats.update();

        }
    }
})