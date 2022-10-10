// webgl/webgl_shadowmap_performance.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';
import { FirstPersonControls } from './jsm/controls/FirstPersonControls.js';
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
import { FontLoader } from './jsm/loaders/FontLoader.js';
import { TextGeometry } from './jsm/geometries/TextGeometry.js';
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
        const SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 1024;

        let SCREEN_WIDTH = window.innerWidth;
        let SCREEN_HEIGHT = window.innerHeight;
        const FLOOR = - 250;

        const ANIMATION_GROUPS = 25;

        let camera, controls, scene, renderer;
        let stats;

        const NEAR = 5, FAR = 3000;

        let morph, mixer;

        const morphs = [], animGroups = [];

        const clock = new THREE.Clock();

        init();
        animate();


        function init() {

            const container = document.createElement( 'div' );
            document.body.appendChild( container );

            // CAMERA

            camera = new THREE.PerspectiveCamera( 23, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR );
            camera.position.set( 700, 50, 1900 );

            // SCENE

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0x59472b );
            scene.fog = new THREE.Fog( 0x59472b, 1000, FAR );

            // LIGHTS

            const ambient = new THREE.AmbientLight( 0x444444 );
            scene.add( ambient );

            const light = new THREE.SpotLight( 0xffffff, 1, 0, Math.PI / 5, 0.3 );
            light.position.set( 0, 1500, 1000 );
            light.target.position.set( 0, 0, 0 );

            light.castShadow = true;
            light.shadow.camera.near = 1200;
            light.shadow.camera.far = 2500;
            light.shadow.bias = 0.0001;

            light.shadow.mapSize.width = SHADOW_MAP_WIDTH;
            light.shadow.mapSize.height = SHADOW_MAP_HEIGHT;

            scene.add( light );

            createScene();

            // RENDERER

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
            container.appendChild( renderer.domElement );

            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.autoClear = false;

            //

            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;

            // CONTROLS

            controls = new FirstPersonControls( camera, renderer.domElement );

            controls.lookSpeed = 0.0125;
            controls.movementSpeed = 500;
            controls.noFly = false;
            controls.lookVertical = true;

            controls.lookAt( scene.position );

            // STATS

            stats = new Stats();
            container.appendChild( stats.dom );

            //

            window.addEventListener( 'resize', onWindowResize );

        }

        function onWindowResize() {

            SCREEN_WIDTH = window.innerWidth;
            SCREEN_HEIGHT = window.innerHeight;

            camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
            camera.updateProjectionMatrix();

            renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

            controls.handleResize();

        }

        function createScene( ) {

            // GROUND

            const geometry = new THREE.PlaneGeometry( 100, 100 );
            const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xffb851 } );

            const ground = new THREE.Mesh( geometry, planeMaterial );

            ground.position.set( 0, FLOOR, 0 );
            ground.rotation.x = - Math.PI / 2;
            ground.scale.set( 100, 100, 100 );

            ground.castShadow = false;
            ground.receiveShadow = true;

            scene.add( ground );

            // TEXT

            const loader = new FontLoader();
            loader.load( 'fonts/helvetiker_bold.typeface.json', function ( font ) {

                const textGeo = new TextGeometry( 'THREE.JS', {

                    font: font,

                    size: 200,
                    height: 50,
                    curveSegments: 12,

                    bevelThickness: 2,
                    bevelSize: 5,
                    bevelEnabled: true

                } );

                textGeo.computeBoundingBox();
                const centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

                const textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

                const mesh = new THREE.Mesh( textGeo, textMaterial );
                mesh.position.x = centerOffset;
                mesh.position.y = FLOOR + 67;

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                scene.add( mesh );

            } );

            // CUBES

            const cubes1 = new THREE.Mesh( new THREE.BoxGeometry( 1500, 220, 150 ), planeMaterial );

            cubes1.position.y = FLOOR - 50;
            cubes1.position.z = 20;

            cubes1.castShadow = true;
            cubes1.receiveShadow = true;

            scene.add( cubes1 );

            const cubes2 = new THREE.Mesh( new THREE.BoxGeometry( 1600, 170, 250 ), planeMaterial );

            cubes2.position.y = FLOOR - 50;
            cubes2.position.z = 20;

            cubes2.castShadow = true;
            cubes2.receiveShadow = true;

            scene.add( cubes2 );

            mixer = new THREE.AnimationMixer( scene );

            for ( let i = 0; i !== ANIMATION_GROUPS; ++ i ) {

                const group = new THREE.AnimationObjectGroup();
                animGroups.push( group );

            }

            // MORPHS

            function addMorph( mesh, clip, speed, duration, x, y, z, fudgeColor, massOptimization ) {

                mesh = mesh.clone();
                mesh.material = mesh.material.clone();

                if ( fudgeColor ) {

                    mesh.material.color.offsetHSL( 0, Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25 );

                }

                mesh.speed = speed;

                if ( massOptimization ) {

                    const index = Math.floor( Math.random() * ANIMATION_GROUPS ),
                        animGroup = animGroups[ index ];

                    animGroup.add( mesh );

                    if ( ! mixer.existingAction( clip, animGroup ) ) {

                        const randomness = 0.6 * Math.random() - 0.3;
                        const phase = ( index + randomness ) / ANIMATION_GROUPS;

                        mixer.clipAction( clip, animGroup ).
                            setDuration( duration ).
                            startAt( - duration * phase ).
                            play();

                    }

                } else {

                    mixer.clipAction( clip, mesh ).
                        setDuration( duration ).
                        startAt( - duration * Math.random() ).
                        play();

                }

                mesh.position.set( x, y, z );
                mesh.rotation.y = Math.PI / 2;

                mesh.castShadow = true;
                mesh.receiveShadow = true;

                scene.add( mesh );

                morphs.push( mesh );

            }

            const gltfLoader = new GLTFLoader();
            gltfLoader.load( 'models/gltf/Horse.glb', function ( gltf ) {

                const mesh = gltf.scene.children[ 0 ];
                const clip = gltf.animations[ 0 ];

                for ( let i = - 600; i < 601; i += 2 ) {

                    addMorph( mesh, clip, 550, 1, 100 - Math.random() * 3000, FLOOR, i, true, true );

                }

            } );

        }

        //

        function animate() {

            requestId = requestAnimationFrame(animate);

            stats.begin();
            render();
            stats.end();

        }

        function render() {

            const delta = clock.getDelta();

            if ( mixer ) mixer.update( delta );

            for ( let i = 0; i < morphs.length; i ++ ) {

                morph = morphs[ i ];

                morph.position.x += morph.speed * delta;

                if ( morph.position.x > 2000 ) {

                    morph.position.x = - 1000 - Math.random() * 500;

                }

            }

            controls.update( delta );

            renderer.clear();
            renderer.render( scene, camera );

        }

    }
})