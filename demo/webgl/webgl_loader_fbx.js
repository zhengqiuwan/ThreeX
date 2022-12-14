// webgl/webgl_loader_fbx.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';

import Stats from './jsm/libs/stats.module.js';

import { OrbitControls } from './jsm/controls/OrbitControls.js';
import { FBXLoader } from './jsm/loaders/FBXLoader.js';
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
        let camera, scene, renderer, stats;

        const clock = new THREE.Clock();

        let mixer;

        init();
        animate();

        function init() {

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
            camera.position.set( 100, 200, 300 );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );
            scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

            const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            hemiLight.position.set( 0, 200, 0 );
            scene.add( hemiLight );

            const dirLight = new THREE.DirectionalLight( 0xffffff );
            dirLight.position.set( 0, 200, 100 );
            dirLight.castShadow = true;
            dirLight.shadow.camera.top = 180;
            dirLight.shadow.camera.bottom = - 100;
            dirLight.shadow.camera.left = - 120;
            dirLight.shadow.camera.right = 120;
            scene.add( dirLight );

            // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

            // ground
            const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add( mesh );

            const grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
            grid.material.opacity = 0.2;
            grid.material.transparent = true;
            scene.add( grid );

            // model
            const loader = new FBXLoader();
            loader.load( 'models/fbx/Samba Dancing.fbx', function ( object ) {

                mixer = new THREE.AnimationMixer( object );

                const action = mixer.clipAction( object.animations[ 0 ] );
                action.play();

                object.traverse( function ( child ) {

                    if ( child.isMesh ) {

                        child.castShadow = true;
                        child.receiveShadow = true;

                    }

                } );

                scene.add( object );

            } );

            renderer = that.renderer = new THREE.WebGLRenderer( { canvas:canvas3d,antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );
            controls.target.set( 0, 100, 0 );
            controls.update();

            window.addEventListener( 'resize', onWindowResize );

            // stats
            stats = new Stats();
            container.appendChild( stats.dom );

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function animate() {

            requestId = requestAnimationFrame(animate);

            const delta = clock.getDelta();

            if ( mixer ) mixer.update( delta );

            renderer.render( scene, camera );

          //  //stats.update();

        }
    }
})