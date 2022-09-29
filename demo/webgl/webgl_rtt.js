// webgl/webgl_rtt.js
import {document,window,requestAnimationFrame,cancelAnimationFrame,Event,core,performance} from 'dhtml-weixin';
import * as THREE from '../three/Three.js';
import  Stats from './jsm/libs/stats.module.js';
const onekit = {
    fragment_shader_screen:`	varying vec2 vUv;
    uniform sampler2D tDiffuse;

    void main() {

        gl_FragColor = texture2D( tDiffuse, vUv );

    }`,
    fragment_shader_pass_1:`	varying vec2 vUv;
    uniform float time;

    void main() {

        float r = vUv.x;
        if( vUv.y < 0.5 ) r = 0.0;
        float g = vUv.y;
        if( vUv.x < 0.5 ) g = 0.0;

        gl_FragColor = vec4( r, g, time, 1.0 );

    }`,
    vertexShader:`	varying vec2 vUv;

    void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`
}
var requestId
Page({
	   
         onUnload() {
	   		cancelAnimationFrame(requestId, this.canvas)
this.worker && this.worker.terminate()
		setTimeout(() => {
			if (this.renderer) {
				this.renderer.dispose()
				this.renderer.forceContextLoss()
				this.renderer.context = null
				this.renderer.domElement = null
				this.renderer = null
			}
		}, 100)
        
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

        let container, stats;

        let cameraRTT, camera, sceneRTT, sceneScreen, scene, renderer, zmesh1, zmesh2;

        let mouseX = 0, mouseY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        let rtTexture, material, quad;

        let delta = 0.01;

        init();
        animate();

        function init() {

            container = document.getElementById( 'container' );

            camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
            camera.position.z = 100;

            cameraRTT = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 10000, 10000 );
            cameraRTT.position.z = 100;

            //

            scene = new THREE.Scene();
            sceneRTT = new THREE.Scene();
            sceneScreen = new THREE.Scene();

            let light = new THREE.DirectionalLight( 0xffffff );
            light.position.set( 0, 0, 1 ).normalize();
            sceneRTT.add( light );

            light = new THREE.DirectionalLight( 0xffaaaa, 1.5 );
            light.position.set( 0, 0, - 1 ).normalize();
            sceneRTT.add( light );

            rtTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );

            material = new THREE.ShaderMaterial( {

                uniforms: { time: { value: 0.0 } },
                vertexShader: onekit['vertexShader'],
                fragmentShader: onekit['fragment_shader_pass_1']

            } );

            const materialScreen = new THREE.ShaderMaterial( {

                uniforms: { tDiffuse: { value: rtTexture.texture } },
                vertexShader: onekit['vertexShader'],
                fragmentShader: onekit['fragment_shader_screen'],

                depthWrite: false

            } );

            const plane = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );

            quad = new THREE.Mesh( plane, material );
            quad.position.z = - 100;
            sceneRTT.add( quad );

            const torusGeometry = new THREE.TorusGeometry( 100, 25, 15, 30 );

            const mat1 = new THREE.MeshPhongMaterial( { color: 0x555555, specular: 0xffaa00, shininess: 5 } );
            const mat2 = new THREE.MeshPhongMaterial( { color: 0x550000, specular: 0xff2200, shininess: 5 } );

            zmesh1 = new THREE.Mesh( torusGeometry, mat1 );
            zmesh1.position.set( 0, 0, 100 );
            zmesh1.scale.set( 1.5, 1.5, 1.5 );
            sceneRTT.add( zmesh1 );

            zmesh2 = new THREE.Mesh( torusGeometry, mat2 );
            zmesh2.position.set( 0, 150, 100 );
            zmesh2.scale.set( 0.75, 0.75, 0.75 );
            sceneRTT.add( zmesh2 );

            quad = new THREE.Mesh( plane, materialScreen );
            quad.position.z = - 100;
            sceneScreen.add( quad );

            const n = 5,
                geometry = new THREE.SphereGeometry( 10, 64, 32 ),
                material2 = new THREE.MeshBasicMaterial( { color: 0xffffff, map: rtTexture.texture } );

            for ( let j = 0; j < n; j ++ ) {

                for ( let i = 0; i < n; i ++ ) {

                    const mesh = new THREE.Mesh( geometry, material2 );

                    mesh.position.x = ( i - ( n - 1 ) / 2 ) * 20;
                    mesh.position.y = ( j - ( n - 1 ) / 2 ) * 20;
                    mesh.position.z = 0;

                    mesh.rotation.y = - Math.PI / 2;

                    scene.add( mesh );

                }

            }

            renderer = that.renderer = new THREE.WebGLRenderer({canvas:canvas3d});
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.autoClear = false;

            container.appendChild( renderer.domElement );

            stats = new Stats();
            container.appendChild( stats.dom );

            document.addEventListener( 'mousemove', onDocumentMouseMove );

        }

        function onDocumentMouseMove( event ) {

            mouseX = ( event.clientX - windowHalfX );
            mouseY = ( event.clientY - windowHalfY );

        }

        //

        function animate() {

            requestId = requestAnimationFrame(animate);

            render();
            stats.update();

        }

        function render() {

            const time = Date.now() * 0.0015;

            camera.position.x += ( mouseX - camera.position.x ) * .05;
            camera.position.y += ( - mouseY - camera.position.y ) * .05;

            camera.lookAt( scene.position );

            if ( zmesh1 && zmesh2 ) {

                zmesh1.rotation.y = - time;
                zmesh2.rotation.y = - time + Math.PI / 2;

            }

            if ( material.uniforms[ 'time' ].value > 1 || material.uniforms[ 'time' ].value < 0 ) {

                delta *= - 1;

            }

            material.uniforms[ 'time' ].value += delta;


            // Render first scene into texture

            renderer.setRenderTarget( rtTexture );
            renderer.clear();
            renderer.render( sceneRTT, cameraRTT );

            // Render full screen quad with generated texture

            renderer.setRenderTarget( null );
            renderer.clear();
            renderer.render( sceneScreen, cameraRTT );

            // Render second scene to screen
            // (using first scene as regular texture)

            renderer.render( scene, camera );

        }
    }
})