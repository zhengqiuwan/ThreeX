/**
 *  Ammo 将被开放至 window.Ammo 上
 * 
 */
(function () {
	const WebAssembly = typeof WXWebAssembly === 'object' ? WXWebAssembly : WebAssembly;

	function createCommonjsModule(fn, module) {
		return module = {
			exports: {}
		}, fn(module, module.exports), module.exports;
	}
	var ammo_wasm = createCommonjsModule(function (module, exports) {
		// This is ammo.js, a port of Bullet Physics to JavaScript. zlib licensed.

		var Ammo = (() => {
			var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
			if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
			return (
				function (Ammo) {
					Ammo = Ammo || {};


					var a;
					a || (a = typeof Ammo !== 'undefined' ? Ammo : {});
					var aa, ba;
					a.ready = new Promise(function (b, c) {
						aa = b;
						ba = c
					});
					var ca = Object.assign({}, a),
						da = "object" == typeof window,
						ea = "function" == typeof importScripts,
						fa = "",
						ha, ia, ja, fs, ka, la;
					if ("object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node) fa = ea ? require("path").dirname(fa) + "/" : __dirname + "/", la = () => {
							ka || (fs = require("fs"), ka = require("path"))
						}, ha = function (b, c) {
							la();
							b = ka.normalize(b);
							return fs.readFileSync(b, c ? void 0 : "utf8")
						}, ja = b => {
							b = ha(b, !0);
							b.buffer || (b = new Uint8Array(b));
							return b
						}, ia = (b, c, d) => {
							la();
							b = ka.normalize(b);
							fs.readFile(b, function (e, g) {
								e ? d(e) : c(g.buffer)
							})
						}, 1 < process.argv.length && process.argv[1].replace(/\\/g, "/"), process.argv.slice(2),
						process.on("uncaughtException", function (b) {
							throw b;
						}), process.on("unhandledRejection", function (b) {
							throw b;
						}), a.inspect = function () {
							return "[Emscripten Module object]"
						};
					else if (da || ea) ea ? fa = self.location.href : "undefined" != typeof document && document.currentScript && (fa = document.currentScript.src), _scriptDir && (fa = _scriptDir), fa = 0 !== fa.indexOf("blob:") ? fa.substr(0, fa.replace(/[?#].*/, "").lastIndexOf("/") + 1) : "", ha = b => {
						var c = new XMLHttpRequest;
						c.open("GET", b, !1);
						c.send(null);
						return c.responseText
					}, ea && (ja =
						b => {
							var c = new XMLHttpRequest;
							c.open("GET", b, !1);
							c.responseType = "arraybuffer";
							c.send(null);
							return new Uint8Array(c.response)
						}), ia = (b, c, d) => {
						var e = new XMLHttpRequest;
						e.open("GET", b, !0);
						e.responseType = "arraybuffer";
						e.onload = () => {
							200 == e.status || 0 == e.status && e.response ? c(e.response) : d()
						};
						e.onerror = d;
						e.send(null)
					};
					a.print || console.log.bind(console);
					var ma = a.printErr || console.warn.bind(console);
					Object.assign(a, ca);
					ca = null;
					var na = [],
						oa, pa;
					a.wasmBinary && (pa = a.wasmBinary);
					var noExitRuntime = a.noExitRuntime || !0;
					"object" != typeof WebAssembly && qa("no native wasm support detected");
					var ra, sa = !1,
						ta = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;

					function ua(b, c) {
						if (b) {
							var d = va,
								e = b + c;
							for (c = b; d[c] && !(c >= e);) ++c;
							if (16 < c - b && d.subarray && ta) b = ta.decode(d.subarray(b, c));
							else {
								for (e = ""; b < c;) {
									var g = d[b++];
									if (g & 128) {
										var n = d[b++] & 63;
										if (192 == (g & 224)) e += String.fromCharCode((g & 31) << 6 | n);
										else {
											var D = d[b++] & 63;
											g = 224 == (g & 240) ? (g & 15) << 12 | n << 6 | D : (g & 7) << 18 | n << 12 | D << 6 | d[b++] & 63;
											65536 > g ? e += String.fromCharCode(g) : (g -= 65536, e += String.fromCharCode(55296 | g >> 10, 56320 | g & 1023))
										}
									} else e += String.fromCharCode(g)
								}
								b = e
							}
						} else b = "";
						return b
					}
					var wa, va, xa, ya, za, Aa, Ba = [],
						Ca = [],
						Ea = [],
						Fa = !1;

					function Ga() {
						var b = a.preRun.shift();
						Ba.unshift(b)
					}
					var Ha = 0,
						Ia = null,
						Ja = null;
					a.preloadedImages = {};
					a.preloadedAudios = {};

					function qa(b) {
						if (a.onAbort) a.onAbort(b);
						b = "Aborted(" + b + ")";
						ma(b);
						sa = !0;
						b = new WebAssembly.RuntimeError(b + ". Build with -s ASSERTIONS=1 for more info.");
						ba(b);
						throw b;
					}

					function Ka() {
						return La.startsWith("data:application/octet-stream;base64,")
					}
					var La;
					La = "ammo.wasm.wasm";
					if (!Ka()) {
						var Ma = La;
						La = a.locateFile ? a.locateFile(Ma, fa) : fa + Ma
					}

					function Na() {
						var b = La;
						try {
							if (b == La && pa) return new Uint8Array(pa);
							if (ja) return ja(b);
							throw "both async and sync fetching of the wasm failed";
						} catch (c) {
							qa(c)
						}
					}

					function Oa() {
						if (!pa && (da || ea)) {
							if ("function" == typeof fetch && !La.startsWith("file://")) return fetch(La, {
								credentials: "same-origin"
							}).then(function (b) {
								if (!b.ok) throw "failed to load wasm binary file at '" + La + "'";
								return b.arrayBuffer()
							}).catch(function () {
								return Na()
							});
							if (ia) return new Promise(function (b, c) {
								ia(La, function (d) {
									b(new Uint8Array(d))
								}, c)
							})
						}
						return Promise.resolve().then(function () {
							return Na()
						})
					}
					var Pa = {
						27254: function (b, c, d, e) {
							b = a.getCache(a.DebugDrawer)[b];
							if (!b.hasOwnProperty("drawLine")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawLine.";
							b.drawLine(c, d, e)
						},
						27474: function (b, c, d, e, g, n) {
							b = a.getCache(a.DebugDrawer)[b];
							if (!b.hasOwnProperty("drawContactPoint")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawContactPoint.";
							b.drawContactPoint(c, d, e, g, n)
						},
						27724: function (b, c) {
							b = a.getCache(a.DebugDrawer)[b];
							if (!b.hasOwnProperty("reportErrorWarning")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::reportErrorWarning.";
							b.reportErrorWarning(c)
						},
						27968: function (b, c, d) {
							b = a.getCache(a.DebugDrawer)[b];
							if (!b.hasOwnProperty("draw3dText")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::draw3dText.";
							b.draw3dText(c, d)
						},
						28191: function (b, c) {
							b = a.getCache(a.DebugDrawer)[b];
							if (!b.hasOwnProperty("setDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::setDebugMode.";
							b.setDebugMode(c)
						},
						28417: function (b) {
							b = a.getCache(a.DebugDrawer)[b];
							if (!b.hasOwnProperty("getDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::getDebugMode.";
							return b.getDebugMode()
						},
						28648: function (b, c, d, e, g, n, D, T) {
							b = a.getCache(a.ConcreteContactResultCallback)[b];
							if (!b.hasOwnProperty("addSingleResult")) throw "a JSImplementation must implement all functions, you forgot ConcreteContactResultCallback::addSingleResult.";
							return b.addSingleResult(c, d, e, g, n, D, T)
						}
					};

					function Qa(b) {
						for (; 0 < b.length;) {
							var c = b.shift();
							if ("function" == typeof c) c(a);
							else {
								var d = c.HH;
								"number" == typeof d ? void 0 === c.DB ? Ra(d)() : Ra(d)(c.DB) : d(void 0 === c.DB ? null : c.DB)
							}
						}
					}
					var Sa = [];

					function Ra(b) {
						var c = Sa[b];
						c || (b >= Sa.length && (Sa.length = b + 1), Sa[b] = c = Aa.get(b));
						return c
					}
					var Ta = [];

					function Ua(b, c, d) {
						Ta.length = 0;
						var e;
						for (d >>= 2; e = va[c++];)(e = 105 > e) && d & 1 && d++, Ta.push(e ? za[d++ >> 1] : xa[d]), ++d;
						return Pa[b].apply(null, Ta)
					}
					var Va = {
						c: function () {
							qa("")
						},
						f: function (b, c, d) {
							return Ua(b, c, d)
						},
						b: Ua,
						e: function (b, c, d) {
							va.copyWithin(b, c, c + d)
						},
						d: function () {
							qa("OOM")
						},
						a: function (b) {
							var c = Date.now();
							xa[b >> 2] = c / 1E3 | 0;
							xa[b + 4 >> 2] = c % 1E3 * 1E3 | 0;
							return 0
						}
					};
					(function () {
						function b(g) {
							a.asm = g.exports;
							ra = a.asm.g;
							g = ra.buffer;
							a.HEAP8 = wa = new Int8Array(g);
							a.HEAP16 = new Int16Array(g);
							a.HEAP32 = xa = new Int32Array(g);
							a.HEAPU8 = va = new Uint8Array(g);
							a.HEAPU16 = new Uint16Array(g);
							a.HEAPU32 = new Uint32Array(g);
							a.HEAPF32 = ya = new Float32Array(g);
							a.HEAPF64 = za = new Float64Array(g);
							Aa = a.asm.cB;
							Ca.unshift(a.asm.h);
							Ha--;
							a.monitorRunDependencies && a.monitorRunDependencies(Ha);
							0 == Ha && (null !== Ia && (clearInterval(Ia), Ia = null), Ja && (g = Ja, Ja = null, g()))
						}

						function c(g) {
							b(g.instance)
						}

						function d(g) {
							return Oa().then(function (n) {
								return WebAssembly.instantiate(n,
									e)
							}).then(function (n) {
								return n
							}).then(g, function (n) {
								ma("failed to asynchronously prepare wasm: " + n);
								qa(n)
							})
						}
						var e = {
							a: Va
						};
						Ha++;
						a.monitorRunDependencies && a.monitorRunDependencies(Ha);
						if (a.instantiateWasm) try {
							return a.instantiateWasm(e, b)
						} catch (g) {
							return ma("Module.instantiateWasm callback failed with error: " + g), !1
						}(function () {
							return pa || "function" != typeof WebAssembly.instantiateStreaming || Ka() || La.startsWith("file://") || "function" != typeof fetch ? d(c) : fetch(La, {
								credentials: "same-origin"
							}).then(function (g) {
								return WebAssembly.instantiateStreaming(g,
									e).then(c, function (n) {
									ma("wasm streaming compile failed: " + n);
									ma("falling back to ArrayBuffer instantiation");
									return d(c)
								})
							})
						})().catch(ba);
						return {}
					})();
					a.___wasm_call_ctors = function () {
						return (a.___wasm_call_ctors = a.asm.h).apply(null, arguments)
					};
					var Wa = a._emscripten_bind_btCollisionShape_setLocalScaling_1 = function () {
							return (Wa = a._emscripten_bind_btCollisionShape_setLocalScaling_1 = a.asm.i).apply(null, arguments)
						},
						Xa = a._emscripten_bind_btCollisionShape_getLocalScaling_0 = function () {
							return (Xa = a._emscripten_bind_btCollisionShape_getLocalScaling_0 = a.asm.j).apply(null, arguments)
						},
						Ya = a._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = function () {
							return (Ya = a._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = a.asm.k).apply(null, arguments)
						},
						Za = a._emscripten_bind_btCollisionShape_setMargin_1 = function () {
							return (Za = a._emscripten_bind_btCollisionShape_setMargin_1 = a.asm.l).apply(null, arguments)
						},
						$a = a._emscripten_bind_btCollisionShape_getMargin_0 = function () {
							return ($a = a._emscripten_bind_btCollisionShape_getMargin_0 = a.asm.m).apply(null, arguments)
						},
						ab = a._emscripten_bind_btCollisionShape___destroy___0 = function () {
							return (ab = a._emscripten_bind_btCollisionShape___destroy___0 = a.asm.n).apply(null, arguments)
						},
						bb = a._emscripten_bind_btCollisionWorld_getDispatcher_0 =
						function () {
							return (bb = a._emscripten_bind_btCollisionWorld_getDispatcher_0 = a.asm.o).apply(null, arguments)
						},
						cb = a._emscripten_bind_btCollisionWorld_rayTest_3 = function () {
							return (cb = a._emscripten_bind_btCollisionWorld_rayTest_3 = a.asm.p).apply(null, arguments)
						},
						db = a._emscripten_bind_btCollisionWorld_getPairCache_0 = function () {
							return (db = a._emscripten_bind_btCollisionWorld_getPairCache_0 = a.asm.q).apply(null, arguments)
						},
						eb = a._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = function () {
							return (eb = a._emscripten_bind_btCollisionWorld_getDispatchInfo_0 =
								a.asm.r).apply(null, arguments)
						},
						fb = a._emscripten_bind_btCollisionWorld_addCollisionObject_1 = function () {
							return (fb = a._emscripten_bind_btCollisionWorld_addCollisionObject_1 = a.asm.s).apply(null, arguments)
						},
						gb = a._emscripten_bind_btCollisionWorld_addCollisionObject_2 = function () {
							return (gb = a._emscripten_bind_btCollisionWorld_addCollisionObject_2 = a.asm.t).apply(null, arguments)
						},
						hb = a._emscripten_bind_btCollisionWorld_addCollisionObject_3 = function () {
							return (hb = a._emscripten_bind_btCollisionWorld_addCollisionObject_3 =
								a.asm.u).apply(null, arguments)
						},
						ib = a._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = function () {
							return (ib = a._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = a.asm.v).apply(null, arguments)
						},
						jb = a._emscripten_bind_btCollisionWorld_getBroadphase_0 = function () {
							return (jb = a._emscripten_bind_btCollisionWorld_getBroadphase_0 = a.asm.w).apply(null, arguments)
						},
						kb = a._emscripten_bind_btCollisionWorld_convexSweepTest_5 = function () {
							return (kb = a._emscripten_bind_btCollisionWorld_convexSweepTest_5 = a.asm.x).apply(null,
								arguments)
						},
						lb = a._emscripten_bind_btCollisionWorld_contactPairTest_3 = function () {
							return (lb = a._emscripten_bind_btCollisionWorld_contactPairTest_3 = a.asm.y).apply(null, arguments)
						},
						mb = a._emscripten_bind_btCollisionWorld_contactTest_2 = function () {
							return (mb = a._emscripten_bind_btCollisionWorld_contactTest_2 = a.asm.z).apply(null, arguments)
						},
						nb = a._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = function () {
							return (nb = a._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = a.asm.A).apply(null, arguments)
						},
						ob =
						a._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = function () {
							return (ob = a._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = a.asm.B).apply(null, arguments)
						},
						pb = a._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = function () {
							return (pb = a._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = a.asm.C).apply(null, arguments)
						},
						qb = a._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = function () {
							return (qb = a._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = a.asm.D).apply(null, arguments)
						},
						rb = a._emscripten_bind_btCollisionWorld_debugDrawObject_3 =
						function () {
							return (rb = a._emscripten_bind_btCollisionWorld_debugDrawObject_3 = a.asm.E).apply(null, arguments)
						},
						sb = a._emscripten_bind_btCollisionWorld___destroy___0 = function () {
							return (sb = a._emscripten_bind_btCollisionWorld___destroy___0 = a.asm.F).apply(null, arguments)
						},
						tb = a._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = function () {
							return (tb = a._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = a.asm.G).apply(null, arguments)
						},
						ub = a._emscripten_bind_btCollisionObject_getCollisionShape_0 =
						function () {
							return (ub = a._emscripten_bind_btCollisionObject_getCollisionShape_0 = a.asm.H).apply(null, arguments)
						},
						vb = a._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = function () {
							return (vb = a._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = a.asm.I).apply(null, arguments)
						},
						wb = a._emscripten_bind_btCollisionObject_setActivationState_1 = function () {
							return (wb = a._emscripten_bind_btCollisionObject_setActivationState_1 = a.asm.J).apply(null, arguments)
						},
						xb = a._emscripten_bind_btCollisionObject_forceActivationState_1 =
						function () {
							return (xb = a._emscripten_bind_btCollisionObject_forceActivationState_1 = a.asm.K).apply(null, arguments)
						},
						yb = a._emscripten_bind_btCollisionObject_activate_0 = function () {
							return (yb = a._emscripten_bind_btCollisionObject_activate_0 = a.asm.L).apply(null, arguments)
						},
						zb = a._emscripten_bind_btCollisionObject_activate_1 = function () {
							return (zb = a._emscripten_bind_btCollisionObject_activate_1 = a.asm.M).apply(null, arguments)
						},
						Ab = a._emscripten_bind_btCollisionObject_isActive_0 = function () {
							return (Ab = a._emscripten_bind_btCollisionObject_isActive_0 =
								a.asm.N).apply(null, arguments)
						},
						Bb = a._emscripten_bind_btCollisionObject_isKinematicObject_0 = function () {
							return (Bb = a._emscripten_bind_btCollisionObject_isKinematicObject_0 = a.asm.O).apply(null, arguments)
						},
						Cb = a._emscripten_bind_btCollisionObject_isStaticObject_0 = function () {
							return (Cb = a._emscripten_bind_btCollisionObject_isStaticObject_0 = a.asm.P).apply(null, arguments)
						},
						Db = a._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = function () {
							return (Db = a._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 =
								a.asm.Q).apply(null, arguments)
						},
						Eb = a._emscripten_bind_btCollisionObject_getRestitution_0 = function () {
							return (Eb = a._emscripten_bind_btCollisionObject_getRestitution_0 = a.asm.R).apply(null, arguments)
						},
						Fb = a._emscripten_bind_btCollisionObject_getFriction_0 = function () {
							return (Fb = a._emscripten_bind_btCollisionObject_getFriction_0 = a.asm.S).apply(null, arguments)
						},
						Gb = a._emscripten_bind_btCollisionObject_getRollingFriction_0 = function () {
							return (Gb = a._emscripten_bind_btCollisionObject_getRollingFriction_0 = a.asm.T).apply(null,
								arguments)
						},
						Hb = a._emscripten_bind_btCollisionObject_setRestitution_1 = function () {
							return (Hb = a._emscripten_bind_btCollisionObject_setRestitution_1 = a.asm.U).apply(null, arguments)
						},
						Ib = a._emscripten_bind_btCollisionObject_setFriction_1 = function () {
							return (Ib = a._emscripten_bind_btCollisionObject_setFriction_1 = a.asm.V).apply(null, arguments)
						},
						Jb = a._emscripten_bind_btCollisionObject_setRollingFriction_1 = function () {
							return (Jb = a._emscripten_bind_btCollisionObject_setRollingFriction_1 = a.asm.W).apply(null, arguments)
						},
						Kb = a._emscripten_bind_btCollisionObject_getWorldTransform_0 = function () {
							return (Kb = a._emscripten_bind_btCollisionObject_getWorldTransform_0 = a.asm.X).apply(null, arguments)
						},
						Lb = a._emscripten_bind_btCollisionObject_getCollisionFlags_0 = function () {
							return (Lb = a._emscripten_bind_btCollisionObject_getCollisionFlags_0 = a.asm.Y).apply(null, arguments)
						},
						Mb = a._emscripten_bind_btCollisionObject_setCollisionFlags_1 = function () {
							return (Mb = a._emscripten_bind_btCollisionObject_setCollisionFlags_1 = a.asm.Z).apply(null, arguments)
						},
						Nb = a._emscripten_bind_btCollisionObject_setWorldTransform_1 = function () {
							return (Nb = a._emscripten_bind_btCollisionObject_setWorldTransform_1 = a.asm._).apply(null, arguments)
						},
						Ob = a._emscripten_bind_btCollisionObject_setCollisionShape_1 = function () {
							return (Ob = a._emscripten_bind_btCollisionObject_setCollisionShape_1 = a.asm.$).apply(null, arguments)
						},
						Pb = a._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = function () {
							return (Pb = a._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 = a.asm.aa).apply(null,
								arguments)
						},
						Qb = a._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = function () {
							return (Qb = a._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = a.asm.ba).apply(null, arguments)
						},
						Rb = a._emscripten_bind_btCollisionObject_getUserIndex_0 = function () {
							return (Rb = a._emscripten_bind_btCollisionObject_getUserIndex_0 = a.asm.ca).apply(null, arguments)
						},
						Sb = a._emscripten_bind_btCollisionObject_setUserIndex_1 = function () {
							return (Sb = a._emscripten_bind_btCollisionObject_setUserIndex_1 = a.asm.da).apply(null,
								arguments)
						},
						Tb = a._emscripten_bind_btCollisionObject_getUserPointer_0 = function () {
							return (Tb = a._emscripten_bind_btCollisionObject_getUserPointer_0 = a.asm.ea).apply(null, arguments)
						},
						Ub = a._emscripten_bind_btCollisionObject_setUserPointer_1 = function () {
							return (Ub = a._emscripten_bind_btCollisionObject_setUserPointer_1 = a.asm.fa).apply(null, arguments)
						},
						Vb = a._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = function () {
							return (Vb = a._emscripten_bind_btCollisionObject_getBroadphaseHandle_0 = a.asm.ga).apply(null,
								arguments)
						},
						Wb = a._emscripten_bind_btCollisionObject___destroy___0 = function () {
							return (Wb = a._emscripten_bind_btCollisionObject___destroy___0 = a.asm.ha).apply(null, arguments)
						},
						Xb = a._emscripten_bind_btConcaveShape_setLocalScaling_1 = function () {
							return (Xb = a._emscripten_bind_btConcaveShape_setLocalScaling_1 = a.asm.ia).apply(null, arguments)
						},
						Yb = a._emscripten_bind_btConcaveShape_getLocalScaling_0 = function () {
							return (Yb = a._emscripten_bind_btConcaveShape_getLocalScaling_0 = a.asm.ja).apply(null, arguments)
						},
						Zb = a._emscripten_bind_btConcaveShape_calculateLocalInertia_2 =
						function () {
							return (Zb = a._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = a.asm.ka).apply(null, arguments)
						},
						$b = a._emscripten_bind_btConcaveShape___destroy___0 = function () {
							return ($b = a._emscripten_bind_btConcaveShape___destroy___0 = a.asm.la).apply(null, arguments)
						},
						ac = a._emscripten_bind_btCollisionAlgorithm___destroy___0 = function () {
							return (ac = a._emscripten_bind_btCollisionAlgorithm___destroy___0 = a.asm.ma).apply(null, arguments)
						},
						bc = a._emscripten_bind_btTypedConstraint_enableFeedback_1 = function () {
							return (bc =
								a._emscripten_bind_btTypedConstraint_enableFeedback_1 = a.asm.na).apply(null, arguments)
						},
						cc = a._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = function () {
							return (cc = a._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = a.asm.oa).apply(null, arguments)
						},
						ec = a._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = function () {
							return (ec = a._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 = a.asm.pa).apply(null, arguments)
						},
						fc = a._emscripten_bind_btTypedConstraint_getParam_2 =
						function () {
							return (fc = a._emscripten_bind_btTypedConstraint_getParam_2 = a.asm.qa).apply(null, arguments)
						},
						gc = a._emscripten_bind_btTypedConstraint_setParam_3 = function () {
							return (gc = a._emscripten_bind_btTypedConstraint_setParam_3 = a.asm.ra).apply(null, arguments)
						},
						hc = a._emscripten_bind_btTypedConstraint___destroy___0 = function () {
							return (hc = a._emscripten_bind_btTypedConstraint___destroy___0 = a.asm.sa).apply(null, arguments)
						},
						ic = a._emscripten_bind_btDynamicsWorld_addAction_1 = function () {
							return (ic = a._emscripten_bind_btDynamicsWorld_addAction_1 =
								a.asm.ta).apply(null, arguments)
						},
						jc = a._emscripten_bind_btDynamicsWorld_removeAction_1 = function () {
							return (jc = a._emscripten_bind_btDynamicsWorld_removeAction_1 = a.asm.ua).apply(null, arguments)
						},
						kc = a._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = function () {
							return (kc = a._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = a.asm.va).apply(null, arguments)
						},
						lc = a._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = function () {
							return (lc = a._emscripten_bind_btDynamicsWorld_setInternalTickCallback_1 = a.asm.wa).apply(null,
								arguments)
						},
						mc = a._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = function () {
							return (mc = a._emscripten_bind_btDynamicsWorld_setInternalTickCallback_2 = a.asm.xa).apply(null, arguments)
						},
						nc = a._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = function () {
							return (nc = a._emscripten_bind_btDynamicsWorld_setInternalTickCallback_3 = a.asm.ya).apply(null, arguments)
						},
						oc = a._emscripten_bind_btDynamicsWorld_getDispatcher_0 = function () {
							return (oc = a._emscripten_bind_btDynamicsWorld_getDispatcher_0 = a.asm.za).apply(null,
								arguments)
						},
						pc = a._emscripten_bind_btDynamicsWorld_rayTest_3 = function () {
							return (pc = a._emscripten_bind_btDynamicsWorld_rayTest_3 = a.asm.Aa).apply(null, arguments)
						},
						qc = a._emscripten_bind_btDynamicsWorld_getPairCache_0 = function () {
							return (qc = a._emscripten_bind_btDynamicsWorld_getPairCache_0 = a.asm.Ba).apply(null, arguments)
						},
						rc = a._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = function () {
							return (rc = a._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = a.asm.Ca).apply(null, arguments)
						},
						sc = a._emscripten_bind_btDynamicsWorld_addCollisionObject_1 =
						function () {
							return (sc = a._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = a.asm.Da).apply(null, arguments)
						},
						tc = a._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = function () {
							return (tc = a._emscripten_bind_btDynamicsWorld_addCollisionObject_2 = a.asm.Ea).apply(null, arguments)
						},
						uc = a._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = function () {
							return (uc = a._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = a.asm.Fa).apply(null, arguments)
						},
						vc = a._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 =
						function () {
							return (vc = a._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 = a.asm.Ga).apply(null, arguments)
						},
						wc = a._emscripten_bind_btDynamicsWorld_getBroadphase_0 = function () {
							return (wc = a._emscripten_bind_btDynamicsWorld_getBroadphase_0 = a.asm.Ha).apply(null, arguments)
						},
						xc = a._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = function () {
							return (xc = a._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = a.asm.Ia).apply(null, arguments)
						},
						yc = a._emscripten_bind_btDynamicsWorld_contactPairTest_3 = function () {
							return (yc =
								a._emscripten_bind_btDynamicsWorld_contactPairTest_3 = a.asm.Ja).apply(null, arguments)
						},
						zc = a._emscripten_bind_btDynamicsWorld_contactTest_2 = function () {
							return (zc = a._emscripten_bind_btDynamicsWorld_contactTest_2 = a.asm.Ka).apply(null, arguments)
						},
						Ac = a._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = function () {
							return (Ac = a._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = a.asm.La).apply(null, arguments)
						},
						Bc = a._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = function () {
							return (Bc = a._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 =
								a.asm.Ma).apply(null, arguments)
						},
						Cc = a._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = function () {
							return (Cc = a._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = a.asm.Na).apply(null, arguments)
						},
						Dc = a._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = function () {
							return (Dc = a._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = a.asm.Oa).apply(null, arguments)
						},
						Ec = a._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = function () {
							return (Ec = a._emscripten_bind_btDynamicsWorld_debugDrawObject_3 = a.asm.Pa).apply(null,
								arguments)
						},
						Fc = a._emscripten_bind_btDynamicsWorld___destroy___0 = function () {
							return (Fc = a._emscripten_bind_btDynamicsWorld___destroy___0 = a.asm.Qa).apply(null, arguments)
						},
						Gc = a._emscripten_bind_btIDebugDraw_drawLine_3 = function () {
							return (Gc = a._emscripten_bind_btIDebugDraw_drawLine_3 = a.asm.Ra).apply(null, arguments)
						},
						Hc = a._emscripten_bind_btIDebugDraw_drawContactPoint_5 = function () {
							return (Hc = a._emscripten_bind_btIDebugDraw_drawContactPoint_5 = a.asm.Sa).apply(null, arguments)
						},
						Ic = a._emscripten_bind_btIDebugDraw_reportErrorWarning_1 =
						function () {
							return (Ic = a._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = a.asm.Ta).apply(null, arguments)
						},
						Jc = a._emscripten_bind_btIDebugDraw_draw3dText_2 = function () {
							return (Jc = a._emscripten_bind_btIDebugDraw_draw3dText_2 = a.asm.Ua).apply(null, arguments)
						},
						Kc = a._emscripten_bind_btIDebugDraw_setDebugMode_1 = function () {
							return (Kc = a._emscripten_bind_btIDebugDraw_setDebugMode_1 = a.asm.Va).apply(null, arguments)
						},
						Lc = a._emscripten_bind_btIDebugDraw_getDebugMode_0 = function () {
							return (Lc = a._emscripten_bind_btIDebugDraw_getDebugMode_0 =
								a.asm.Wa).apply(null, arguments)
						},
						Mc = a._emscripten_bind_btIDebugDraw___destroy___0 = function () {
							return (Mc = a._emscripten_bind_btIDebugDraw___destroy___0 = a.asm.Xa).apply(null, arguments)
						},
						Nc = a._emscripten_bind_btVector3_btVector3_0 = function () {
							return (Nc = a._emscripten_bind_btVector3_btVector3_0 = a.asm.Ya).apply(null, arguments)
						},
						Oc = a._emscripten_bind_btVector3_btVector3_3 = function () {
							return (Oc = a._emscripten_bind_btVector3_btVector3_3 = a.asm.Za).apply(null, arguments)
						},
						Pc = a._emscripten_bind_btVector3_length_0 =
						function () {
							return (Pc = a._emscripten_bind_btVector3_length_0 = a.asm._a).apply(null, arguments)
						},
						Qc = a._emscripten_bind_btVector3_x_0 = function () {
							return (Qc = a._emscripten_bind_btVector3_x_0 = a.asm.$a).apply(null, arguments)
						},
						Rc = a._emscripten_bind_btVector3_y_0 = function () {
							return (Rc = a._emscripten_bind_btVector3_y_0 = a.asm.ab).apply(null, arguments)
						},
						Sc = a._emscripten_bind_btVector3_z_0 = function () {
							return (Sc = a._emscripten_bind_btVector3_z_0 = a.asm.bb).apply(null, arguments)
						},
						Tc = a._emscripten_bind_btVector3_setX_1 = function () {
							return (Tc =
								a._emscripten_bind_btVector3_setX_1 = a.asm.cb).apply(null, arguments)
						},
						Uc = a._emscripten_bind_btVector3_setY_1 = function () {
							return (Uc = a._emscripten_bind_btVector3_setY_1 = a.asm.db).apply(null, arguments)
						},
						Vc = a._emscripten_bind_btVector3_setZ_1 = function () {
							return (Vc = a._emscripten_bind_btVector3_setZ_1 = a.asm.eb).apply(null, arguments)
						},
						Wc = a._emscripten_bind_btVector3_setValue_3 = function () {
							return (Wc = a._emscripten_bind_btVector3_setValue_3 = a.asm.fb).apply(null, arguments)
						},
						Xc = a._emscripten_bind_btVector3_normalize_0 =
						function () {
							return (Xc = a._emscripten_bind_btVector3_normalize_0 = a.asm.gb).apply(null, arguments)
						},
						Yc = a._emscripten_bind_btVector3_rotate_2 = function () {
							return (Yc = a._emscripten_bind_btVector3_rotate_2 = a.asm.hb).apply(null, arguments)
						},
						Zc = a._emscripten_bind_btVector3_dot_1 = function () {
							return (Zc = a._emscripten_bind_btVector3_dot_1 = a.asm.ib).apply(null, arguments)
						},
						$c = a._emscripten_bind_btVector3_op_mul_1 = function () {
							return ($c = a._emscripten_bind_btVector3_op_mul_1 = a.asm.jb).apply(null, arguments)
						},
						ad = a._emscripten_bind_btVector3_op_add_1 =
						function () {
							return (ad = a._emscripten_bind_btVector3_op_add_1 = a.asm.kb).apply(null, arguments)
						},
						bd = a._emscripten_bind_btVector3_op_sub_1 = function () {
							return (bd = a._emscripten_bind_btVector3_op_sub_1 = a.asm.lb).apply(null, arguments)
						},
						cd = a._emscripten_bind_btVector3___destroy___0 = function () {
							return (cd = a._emscripten_bind_btVector3___destroy___0 = a.asm.mb).apply(null, arguments)
						},
						dd = a._emscripten_bind_btQuadWord_x_0 = function () {
							return (dd = a._emscripten_bind_btQuadWord_x_0 = a.asm.nb).apply(null, arguments)
						},
						ed = a._emscripten_bind_btQuadWord_y_0 =
						function () {
							return (ed = a._emscripten_bind_btQuadWord_y_0 = a.asm.ob).apply(null, arguments)
						},
						fd = a._emscripten_bind_btQuadWord_z_0 = function () {
							return (fd = a._emscripten_bind_btQuadWord_z_0 = a.asm.pb).apply(null, arguments)
						},
						gd = a._emscripten_bind_btQuadWord_w_0 = function () {
							return (gd = a._emscripten_bind_btQuadWord_w_0 = a.asm.qb).apply(null, arguments)
						},
						hd = a._emscripten_bind_btQuadWord_setX_1 = function () {
							return (hd = a._emscripten_bind_btQuadWord_setX_1 = a.asm.rb).apply(null, arguments)
						},
						jd = a._emscripten_bind_btQuadWord_setY_1 =
						function () {
							return (jd = a._emscripten_bind_btQuadWord_setY_1 = a.asm.sb).apply(null, arguments)
						},
						kd = a._emscripten_bind_btQuadWord_setZ_1 = function () {
							return (kd = a._emscripten_bind_btQuadWord_setZ_1 = a.asm.tb).apply(null, arguments)
						},
						ld = a._emscripten_bind_btQuadWord_setW_1 = function () {
							return (ld = a._emscripten_bind_btQuadWord_setW_1 = a.asm.ub).apply(null, arguments)
						},
						md = a._emscripten_bind_btQuadWord___destroy___0 = function () {
							return (md = a._emscripten_bind_btQuadWord___destroy___0 = a.asm.vb).apply(null, arguments)
						},
						nd =
						a._emscripten_bind_btMotionState_getWorldTransform_1 = function () {
							return (nd = a._emscripten_bind_btMotionState_getWorldTransform_1 = a.asm.wb).apply(null, arguments)
						},
						od = a._emscripten_bind_btMotionState_setWorldTransform_1 = function () {
							return (od = a._emscripten_bind_btMotionState_setWorldTransform_1 = a.asm.xb).apply(null, arguments)
						},
						pd = a._emscripten_bind_btMotionState___destroy___0 = function () {
							return (pd = a._emscripten_bind_btMotionState___destroy___0 = a.asm.yb).apply(null, arguments)
						},
						qd = a._emscripten_bind_RayResultCallback_hasHit_0 =
						function () {
							return (qd = a._emscripten_bind_RayResultCallback_hasHit_0 = a.asm.zb).apply(null, arguments)
						},
						rd = a._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = function () {
							return (rd = a._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 = a.asm.Ab).apply(null, arguments)
						},
						sd = a._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = function () {
							return (sd = a._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = a.asm.Bb).apply(null, arguments)
						},
						td = a._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 =
						function () {
							return (td = a._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = a.asm.Cb).apply(null, arguments)
						},
						ud = a._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = function () {
							return (ud = a._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = a.asm.Db).apply(null, arguments)
						},
						vd = a._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = function () {
							return (vd = a._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = a.asm.Eb).apply(null, arguments)
						},
						wd = a._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 =
						function () {
							return (wd = a._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = a.asm.Fb).apply(null, arguments)
						},
						xd = a._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = function () {
							return (xd = a._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = a.asm.Gb).apply(null, arguments)
						},
						yd = a._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = function () {
							return (yd = a._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = a.asm.Hb).apply(null, arguments)
						},
						zd = a._emscripten_bind_RayResultCallback_get_m_flags_0 =
						function () {
							return (zd = a._emscripten_bind_RayResultCallback_get_m_flags_0 = a.asm.Ib).apply(null, arguments)
						},
						Ad = a._emscripten_bind_RayResultCallback_set_m_flags_1 = function () {
							return (Ad = a._emscripten_bind_RayResultCallback_set_m_flags_1 = a.asm.Jb).apply(null, arguments)
						},
						Bd = a._emscripten_bind_RayResultCallback___destroy___0 = function () {
							return (Bd = a._emscripten_bind_RayResultCallback___destroy___0 = a.asm.Kb).apply(null, arguments)
						},
						Cd = a._emscripten_bind_ContactResultCallback_addSingleResult_7 = function () {
							return (Cd =
								a._emscripten_bind_ContactResultCallback_addSingleResult_7 = a.asm.Lb).apply(null, arguments)
						},
						Dd = a._emscripten_bind_ContactResultCallback___destroy___0 = function () {
							return (Dd = a._emscripten_bind_ContactResultCallback___destroy___0 = a.asm.Mb).apply(null, arguments)
						},
						Ed = a._emscripten_bind_ConvexResultCallback_hasHit_0 = function () {
							return (Ed = a._emscripten_bind_ConvexResultCallback_hasHit_0 = a.asm.Nb).apply(null, arguments)
						},
						Fd = a._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
							return (Fd =
								a._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = a.asm.Ob).apply(null, arguments)
						},
						Gd = a._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
							return (Gd = a._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = a.asm.Pb).apply(null, arguments)
						},
						Hd = a._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = function () {
							return (Hd = a._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = a.asm.Qb).apply(null, arguments)
						},
						Id = a._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 =
						function () {
							return (Id = a._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 = a.asm.Rb).apply(null, arguments)
						},
						Jd = a._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = function () {
							return (Jd = a._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = a.asm.Sb).apply(null, arguments)
						},
						Kd = a._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = function () {
							return (Kd = a._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = a.asm.Tb).apply(null, arguments)
						},
						Ld = a._emscripten_bind_ConvexResultCallback___destroy___0 = function () {
							return (Ld = a._emscripten_bind_ConvexResultCallback___destroy___0 = a.asm.Ub).apply(null, arguments)
						},
						Md = a._emscripten_bind_btConvexShape_setLocalScaling_1 = function () {
							return (Md = a._emscripten_bind_btConvexShape_setLocalScaling_1 = a.asm.Vb).apply(null, arguments)
						},
						Nd = a._emscripten_bind_btConvexShape_getLocalScaling_0 = function () {
							return (Nd = a._emscripten_bind_btConvexShape_getLocalScaling_0 = a.asm.Wb).apply(null, arguments)
						},
						Od = a._emscripten_bind_btConvexShape_calculateLocalInertia_2 =
						function () {
							return (Od = a._emscripten_bind_btConvexShape_calculateLocalInertia_2 = a.asm.Xb).apply(null, arguments)
						},
						Pd = a._emscripten_bind_btConvexShape_setMargin_1 = function () {
							return (Pd = a._emscripten_bind_btConvexShape_setMargin_1 = a.asm.Yb).apply(null, arguments)
						},
						Qd = a._emscripten_bind_btConvexShape_getMargin_0 = function () {
							return (Qd = a._emscripten_bind_btConvexShape_getMargin_0 = a.asm.Zb).apply(null, arguments)
						},
						Rd = a._emscripten_bind_btConvexShape___destroy___0 = function () {
							return (Rd = a._emscripten_bind_btConvexShape___destroy___0 =
								a.asm._b).apply(null, arguments)
						},
						Sd = a._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = function () {
							return (Sd = a._emscripten_bind_btCapsuleShape_btCapsuleShape_2 = a.asm.$b).apply(null, arguments)
						},
						Td = a._emscripten_bind_btCapsuleShape_setMargin_1 = function () {
							return (Td = a._emscripten_bind_btCapsuleShape_setMargin_1 = a.asm.ac).apply(null, arguments)
						},
						Ud = a._emscripten_bind_btCapsuleShape_getMargin_0 = function () {
							return (Ud = a._emscripten_bind_btCapsuleShape_getMargin_0 = a.asm.bc).apply(null, arguments)
						},
						Vd = a._emscripten_bind_btCapsuleShape_getUpAxis_0 =
						function () {
							return (Vd = a._emscripten_bind_btCapsuleShape_getUpAxis_0 = a.asm.cc).apply(null, arguments)
						},
						Wd = a._emscripten_bind_btCapsuleShape_getRadius_0 = function () {
							return (Wd = a._emscripten_bind_btCapsuleShape_getRadius_0 = a.asm.dc).apply(null, arguments)
						},
						Xd = a._emscripten_bind_btCapsuleShape_getHalfHeight_0 = function () {
							return (Xd = a._emscripten_bind_btCapsuleShape_getHalfHeight_0 = a.asm.ec).apply(null, arguments)
						},
						Yd = a._emscripten_bind_btCapsuleShape_setLocalScaling_1 = function () {
							return (Yd = a._emscripten_bind_btCapsuleShape_setLocalScaling_1 =
								a.asm.fc).apply(null, arguments)
						},
						Zd = a._emscripten_bind_btCapsuleShape_getLocalScaling_0 = function () {
							return (Zd = a._emscripten_bind_btCapsuleShape_getLocalScaling_0 = a.asm.gc).apply(null, arguments)
						},
						$d = a._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = function () {
							return ($d = a._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = a.asm.hc).apply(null, arguments)
						},
						ae = a._emscripten_bind_btCapsuleShape___destroy___0 = function () {
							return (ae = a._emscripten_bind_btCapsuleShape___destroy___0 = a.asm.ic).apply(null,
								arguments)
						},
						be = a._emscripten_bind_btCylinderShape_btCylinderShape_1 = function () {
							return (be = a._emscripten_bind_btCylinderShape_btCylinderShape_1 = a.asm.jc).apply(null, arguments)
						},
						ce = a._emscripten_bind_btCylinderShape_setMargin_1 = function () {
							return (ce = a._emscripten_bind_btCylinderShape_setMargin_1 = a.asm.kc).apply(null, arguments)
						},
						de = a._emscripten_bind_btCylinderShape_getMargin_0 = function () {
							return (de = a._emscripten_bind_btCylinderShape_getMargin_0 = a.asm.lc).apply(null, arguments)
						},
						ee = a._emscripten_bind_btCylinderShape_setLocalScaling_1 =
						function () {
							return (ee = a._emscripten_bind_btCylinderShape_setLocalScaling_1 = a.asm.mc).apply(null, arguments)
						},
						fe = a._emscripten_bind_btCylinderShape_getLocalScaling_0 = function () {
							return (fe = a._emscripten_bind_btCylinderShape_getLocalScaling_0 = a.asm.nc).apply(null, arguments)
						},
						ge = a._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = function () {
							return (ge = a._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = a.asm.oc).apply(null, arguments)
						},
						he = a._emscripten_bind_btCylinderShape___destroy___0 = function () {
							return (he =
								a._emscripten_bind_btCylinderShape___destroy___0 = a.asm.pc).apply(null, arguments)
						},
						ie = a._emscripten_bind_btConeShape_btConeShape_2 = function () {
							return (ie = a._emscripten_bind_btConeShape_btConeShape_2 = a.asm.qc).apply(null, arguments)
						},
						je = a._emscripten_bind_btConeShape_setLocalScaling_1 = function () {
							return (je = a._emscripten_bind_btConeShape_setLocalScaling_1 = a.asm.rc).apply(null, arguments)
						},
						ke = a._emscripten_bind_btConeShape_getLocalScaling_0 = function () {
							return (ke = a._emscripten_bind_btConeShape_getLocalScaling_0 =
								a.asm.sc).apply(null, arguments)
						},
						le = a._emscripten_bind_btConeShape_calculateLocalInertia_2 = function () {
							return (le = a._emscripten_bind_btConeShape_calculateLocalInertia_2 = a.asm.tc).apply(null, arguments)
						},
						me = a._emscripten_bind_btConeShape___destroy___0 = function () {
							return (me = a._emscripten_bind_btConeShape___destroy___0 = a.asm.uc).apply(null, arguments)
						},
						ne = a._emscripten_bind_btStridingMeshInterface_setScaling_1 = function () {
							return (ne = a._emscripten_bind_btStridingMeshInterface_setScaling_1 = a.asm.vc).apply(null,
								arguments)
						},
						oe = a._emscripten_bind_btStridingMeshInterface___destroy___0 = function () {
							return (oe = a._emscripten_bind_btStridingMeshInterface___destroy___0 = a.asm.wc).apply(null, arguments)
						},
						pe = a._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = function () {
							return (pe = a._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = a.asm.xc).apply(null, arguments)
						},
						qe = a._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = function () {
							return (qe = a._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = a.asm.yc).apply(null,
								arguments)
						},
						re = a._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = function () {
							return (re = a._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = a.asm.zc).apply(null, arguments)
						},
						se = a._emscripten_bind_btTriangleMeshShape___destroy___0 = function () {
							return (se = a._emscripten_bind_btTriangleMeshShape___destroy___0 = a.asm.Ac).apply(null, arguments)
						},
						te = a._emscripten_bind_btPrimitiveManagerBase_is_trimesh_0 = function () {
							return (te = a._emscripten_bind_btPrimitiveManagerBase_is_trimesh_0 = a.asm.Bc).apply(null,
								arguments)
						},
						ue = a._emscripten_bind_btPrimitiveManagerBase_get_primitive_count_0 = function () {
							return (ue = a._emscripten_bind_btPrimitiveManagerBase_get_primitive_count_0 = a.asm.Cc).apply(null, arguments)
						},
						ve = a._emscripten_bind_btPrimitiveManagerBase_get_primitive_box_2 = function () {
							return (ve = a._emscripten_bind_btPrimitiveManagerBase_get_primitive_box_2 = a.asm.Dc).apply(null, arguments)
						},
						we = a._emscripten_bind_btPrimitiveManagerBase_get_primitive_triangle_2 = function () {
							return (we = a._emscripten_bind_btPrimitiveManagerBase_get_primitive_triangle_2 =
								a.asm.Ec).apply(null, arguments)
						},
						xe = a._emscripten_bind_btPrimitiveManagerBase___destroy___0 = function () {
							return (xe = a._emscripten_bind_btPrimitiveManagerBase___destroy___0 = a.asm.Fc).apply(null, arguments)
						},
						ye = a._emscripten_bind_btGImpactShapeInterface_updateBound_0 = function () {
							return (ye = a._emscripten_bind_btGImpactShapeInterface_updateBound_0 = a.asm.Gc).apply(null, arguments)
						},
						ze = a._emscripten_bind_btGImpactShapeInterface_postUpdate_0 = function () {
							return (ze = a._emscripten_bind_btGImpactShapeInterface_postUpdate_0 =
								a.asm.Hc).apply(null, arguments)
						},
						Ae = a._emscripten_bind_btGImpactShapeInterface_getShapeType_0 = function () {
							return (Ae = a._emscripten_bind_btGImpactShapeInterface_getShapeType_0 = a.asm.Ic).apply(null, arguments)
						},
						Be = a._emscripten_bind_btGImpactShapeInterface_getName_0 = function () {
							return (Be = a._emscripten_bind_btGImpactShapeInterface_getName_0 = a.asm.Jc).apply(null, arguments)
						},
						Ce = a._emscripten_bind_btGImpactShapeInterface_getGImpactShapeType_0 = function () {
							return (Ce = a._emscripten_bind_btGImpactShapeInterface_getGImpactShapeType_0 =
								a.asm.Kc).apply(null, arguments)
						},
						De = a._emscripten_bind_btGImpactShapeInterface_getPrimitiveManager_0 = function () {
							return (De = a._emscripten_bind_btGImpactShapeInterface_getPrimitiveManager_0 = a.asm.Lc).apply(null, arguments)
						},
						Ee = a._emscripten_bind_btGImpactShapeInterface_getNumChildShapes_0 = function () {
							return (Ee = a._emscripten_bind_btGImpactShapeInterface_getNumChildShapes_0 = a.asm.Mc).apply(null, arguments)
						},
						Fe = a._emscripten_bind_btGImpactShapeInterface_childrenHasTransform_0 = function () {
							return (Fe = a._emscripten_bind_btGImpactShapeInterface_childrenHasTransform_0 =
								a.asm.Nc).apply(null, arguments)
						},
						Ge = a._emscripten_bind_btGImpactShapeInterface_needsRetrieveTriangles_0 = function () {
							return (Ge = a._emscripten_bind_btGImpactShapeInterface_needsRetrieveTriangles_0 = a.asm.Oc).apply(null, arguments)
						},
						He = a._emscripten_bind_btGImpactShapeInterface_needsRetrieveTetrahedrons_0 = function () {
							return (He = a._emscripten_bind_btGImpactShapeInterface_needsRetrieveTetrahedrons_0 = a.asm.Pc).apply(null, arguments)
						},
						Ie = a._emscripten_bind_btGImpactShapeInterface_getBulletTriangle_2 = function () {
							return (Ie =
								a._emscripten_bind_btGImpactShapeInterface_getBulletTriangle_2 = a.asm.Qc).apply(null, arguments)
						},
						Je = a._emscripten_bind_btGImpactShapeInterface_getBulletTetrahedron_2 = function () {
							return (Je = a._emscripten_bind_btGImpactShapeInterface_getBulletTetrahedron_2 = a.asm.Rc).apply(null, arguments)
						},
						Ke = a._emscripten_bind_btGImpactShapeInterface_getChildShape_1 = function () {
							return (Ke = a._emscripten_bind_btGImpactShapeInterface_getChildShape_1 = a.asm.Sc).apply(null, arguments)
						},
						Le = a._emscripten_bind_btGImpactShapeInterface_getChildTransform_1 =
						function () {
							return (Le = a._emscripten_bind_btGImpactShapeInterface_getChildTransform_1 = a.asm.Tc).apply(null, arguments)
						},
						Me = a._emscripten_bind_btGImpactShapeInterface_setChildTransform_2 = function () {
							return (Me = a._emscripten_bind_btGImpactShapeInterface_setChildTransform_2 = a.asm.Uc).apply(null, arguments)
						},
						Ne = a._emscripten_bind_btGImpactShapeInterface_setLocalScaling_1 = function () {
							return (Ne = a._emscripten_bind_btGImpactShapeInterface_setLocalScaling_1 = a.asm.Vc).apply(null, arguments)
						},
						Oe = a._emscripten_bind_btGImpactShapeInterface_getLocalScaling_0 =
						function () {
							return (Oe = a._emscripten_bind_btGImpactShapeInterface_getLocalScaling_0 = a.asm.Wc).apply(null, arguments)
						},
						Pe = a._emscripten_bind_btGImpactShapeInterface_calculateLocalInertia_2 = function () {
							return (Pe = a._emscripten_bind_btGImpactShapeInterface_calculateLocalInertia_2 = a.asm.Xc).apply(null, arguments)
						},
						Qe = a._emscripten_bind_btGImpactShapeInterface___destroy___0 = function () {
							return (Qe = a._emscripten_bind_btGImpactShapeInterface___destroy___0 = a.asm.Yc).apply(null, arguments)
						},
						Re = a._emscripten_bind_btActivatingCollisionAlgorithm___destroy___0 =
						function () {
							return (Re = a._emscripten_bind_btActivatingCollisionAlgorithm___destroy___0 = a.asm.Zc).apply(null, arguments)
						},
						Se = a._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = function () {
							return (Se = a._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = a.asm._c).apply(null, arguments)
						},
						Te = a._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = function () {
							return (Te = a._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 =
								a.asm.$c).apply(null, arguments)
						},
						Ue = a._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = function () {
							return (Ue = a._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 = a.asm.ad).apply(null, arguments)
						},
						Ve = a._emscripten_bind_btDispatcher_getNumManifolds_0 = function () {
							return (Ve = a._emscripten_bind_btDispatcher_getNumManifolds_0 = a.asm.bd).apply(null, arguments)
						},
						We = a._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 = function () {
							return (We = a._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 =
								a.asm.cd).apply(null, arguments)
						},
						Xe = a._emscripten_bind_btDispatcher___destroy___0 = function () {
							return (Xe = a._emscripten_bind_btDispatcher___destroy___0 = a.asm.dd).apply(null, arguments)
						},
						Ye = a._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = function () {
							return (Ye = a._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = a.asm.ed).apply(null, arguments)
						},
						Ze = a._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = function () {
							return (Ze = a._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 =
								a.asm.fd).apply(null, arguments)
						},
						$e = a._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = function () {
							return ($e = a._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = a.asm.gd).apply(null, arguments)
						},
						af = a._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = function () {
							return (af = a._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = a.asm.hd).apply(null, arguments)
						},
						bf = a._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 = function () {
							return (bf = a._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 =
								a.asm.id).apply(null, arguments)
						},
						cf = a._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = function () {
							return (cf = a._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = a.asm.jd).apply(null, arguments)
						},
						df = a._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = function () {
							return (df = a._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = a.asm.kd).apply(null, arguments)
						},
						ef = a._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = function () {
							return (ef = a._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 =
								a.asm.ld).apply(null, arguments)
						},
						ff = a._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = function () {
							return (ff = a._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = a.asm.md).apply(null, arguments)
						},
						gf = a._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = function () {
							return (gf = a._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = a.asm.nd).apply(null, arguments)
						},
						hf = a._emscripten_bind_btGeneric6DofConstraint_getParam_2 = function () {
							return (hf =
								a._emscripten_bind_btGeneric6DofConstraint_getParam_2 = a.asm.od).apply(null, arguments)
						},
						jf = a._emscripten_bind_btGeneric6DofConstraint_setParam_3 = function () {
							return (jf = a._emscripten_bind_btGeneric6DofConstraint_setParam_3 = a.asm.pd).apply(null, arguments)
						},
						kf = a._emscripten_bind_btGeneric6DofConstraint___destroy___0 = function () {
							return (kf = a._emscripten_bind_btGeneric6DofConstraint___destroy___0 = a.asm.qd).apply(null, arguments)
						},
						lf = a._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = function () {
							return (lf =
								a._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 = a.asm.rd).apply(null, arguments)
						},
						mf = a._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = function () {
							return (mf = a._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = a.asm.sd).apply(null, arguments)
						},
						nf = a._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = function () {
							return (nf = a._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = a.asm.td).apply(null, arguments)
						},
						of = a._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 =
						function () {
							return ( of = a._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = a.asm.ud).apply(null, arguments)
						},
						pf = a._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = function () {
							return (pf = a._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = a.asm.vd).apply(null, arguments)
						},
						qf = a._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = function () {
							return (qf = a._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = a.asm.wd).apply(null, arguments)
						},
						rf = a._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 =
						function () {
							return (rf = a._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = a.asm.xd).apply(null, arguments)
						},
						sf = a._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = function () {
							return (sf = a._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = a.asm.yd).apply(null, arguments)
						},
						tf = a._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = function () {
							return (tf = a._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = a.asm.zd).apply(null, arguments)
						},
						uf = a._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 =
						function () {
							return (uf = a._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 = a.asm.Ad).apply(null, arguments)
						},
						vf = a._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = function () {
							return (vf = a._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = a.asm.Bd).apply(null, arguments)
						},
						wf = a._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = function () {
							return (wf = a._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = a.asm.Cd).apply(null, arguments)
						},
						xf = a._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 =
						function () {
							return (xf = a._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = a.asm.Dd).apply(null, arguments)
						},
						yf = a._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = function () {
							return (yf = a._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = a.asm.Ed).apply(null, arguments)
						},
						zf = a._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = function () {
							return (zf = a._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = a.asm.Fd).apply(null,
								arguments)
						},
						Af = a._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = function () {
							return (Af = a._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 = a.asm.Gd).apply(null, arguments)
						},
						Bf = a._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = function () {
							return (Bf = a._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = a.asm.Hd).apply(null, arguments)
						},
						Cf = a._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = function () {
							return (Cf = a._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = a.asm.Id).apply(null,
								arguments)
						},
						Df = a._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = function () {
							return (Df = a._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = a.asm.Jd).apply(null, arguments)
						},
						Ef = a._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = function () {
							return (Ef = a._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = a.asm.Kd).apply(null, arguments)
						},
						Ff = a._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = function () {
							return (Ff = a._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 =
								a.asm.Ld).apply(null, arguments)
						},
						Gf = a._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = function () {
							return (Gf = a._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 = a.asm.Md).apply(null, arguments)
						},
						Hf = a._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = function () {
							return (Hf = a._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = a.asm.Nd).apply(null, arguments)
						},
						If = a._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = function () {
							return (If = a._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 =
								a.asm.Od).apply(null, arguments)
						},
						Jf = a._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = function () {
							return (Jf = a._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = a.asm.Pd).apply(null, arguments)
						},
						Kf = a._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = function () {
							return (Kf = a._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = a.asm.Qd).apply(null, arguments)
						},
						Lf = a._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = function () {
							return (Lf = a._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 =
								a.asm.Rd).apply(null, arguments)
						},
						Mf = a._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = function () {
							return (Mf = a._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = a.asm.Sd).apply(null, arguments)
						},
						Nf = a._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = function () {
							return (Nf = a._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = a.asm.Td).apply(null, arguments)
						},
						Of = a._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = function () {
							return (Of = a._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 =
								a.asm.Ud).apply(null, arguments)
						},
						Pf = a._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = function () {
							return (Pf = a._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = a.asm.Vd).apply(null, arguments)
						},
						Qf = a._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = function () {
							return (Qf = a._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = a.asm.Wd).apply(null, arguments)
						},
						Rf = a._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = function () {
							return (Rf = a._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 =
								a.asm.Xd).apply(null, arguments)
						},
						Sf = a._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = function () {
							return (Sf = a._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 = a.asm.Yd).apply(null, arguments)
						},
						Tf = a._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = function () {
							return (Tf = a._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = a.asm.Zd).apply(null, arguments)
						},
						Uf = a._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 = function () {
							return (Uf = a._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_1 =
								a.asm._d).apply(null, arguments)
						},
						Vf = a._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = function () {
							return (Vf = a._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_2 = a.asm.$d).apply(null, arguments)
						},
						Wf = a._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = function () {
							return (Wf = a._emscripten_bind_btDiscreteDynamicsWorld_setInternalTickCallback_3 = a.asm.ae).apply(null, arguments)
						},
						Xf = a._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = function () {
							return (Xf =
								a._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = a.asm.be).apply(null, arguments)
						},
						Yf = a._emscripten_bind_btVehicleRaycaster_castRay_3 = function () {
							return (Yf = a._emscripten_bind_btVehicleRaycaster_castRay_3 = a.asm.ce).apply(null, arguments)
						},
						Zf = a._emscripten_bind_btVehicleRaycaster___destroy___0 = function () {
							return (Zf = a._emscripten_bind_btVehicleRaycaster___destroy___0 = a.asm.de).apply(null, arguments)
						},
						$f = a._emscripten_bind_btActionInterface_updateAction_2 = function () {
							return ($f = a._emscripten_bind_btActionInterface_updateAction_2 =
								a.asm.ee).apply(null, arguments)
						},
						ag = a._emscripten_bind_btActionInterface___destroy___0 = function () {
							return (ag = a._emscripten_bind_btActionInterface___destroy___0 = a.asm.fe).apply(null, arguments)
						},
						bg = a._emscripten_bind_btGhostObject_btGhostObject_0 = function () {
							return (bg = a._emscripten_bind_btGhostObject_btGhostObject_0 = a.asm.ge).apply(null, arguments)
						},
						cg = a._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = function () {
							return (cg = a._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = a.asm.he).apply(null,
								arguments)
						},
						dg = a._emscripten_bind_btGhostObject_getOverlappingObject_1 = function () {
							return (dg = a._emscripten_bind_btGhostObject_getOverlappingObject_1 = a.asm.ie).apply(null, arguments)
						},
						eg = a._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = function () {
							return (eg = a._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = a.asm.je).apply(null, arguments)
						},
						fg = a._emscripten_bind_btGhostObject_getCollisionShape_0 = function () {
							return (fg = a._emscripten_bind_btGhostObject_getCollisionShape_0 = a.asm.ke).apply(null,
								arguments)
						},
						gg = a._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = function () {
							return (gg = a._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = a.asm.le).apply(null, arguments)
						},
						hg = a._emscripten_bind_btGhostObject_setActivationState_1 = function () {
							return (hg = a._emscripten_bind_btGhostObject_setActivationState_1 = a.asm.me).apply(null, arguments)
						},
						ig = a._emscripten_bind_btGhostObject_forceActivationState_1 = function () {
							return (ig = a._emscripten_bind_btGhostObject_forceActivationState_1 = a.asm.ne).apply(null,
								arguments)
						},
						jg = a._emscripten_bind_btGhostObject_activate_0 = function () {
							return (jg = a._emscripten_bind_btGhostObject_activate_0 = a.asm.oe).apply(null, arguments)
						},
						kg = a._emscripten_bind_btGhostObject_activate_1 = function () {
							return (kg = a._emscripten_bind_btGhostObject_activate_1 = a.asm.pe).apply(null, arguments)
						},
						lg = a._emscripten_bind_btGhostObject_isActive_0 = function () {
							return (lg = a._emscripten_bind_btGhostObject_isActive_0 = a.asm.qe).apply(null, arguments)
						},
						mg = a._emscripten_bind_btGhostObject_isKinematicObject_0 =
						function () {
							return (mg = a._emscripten_bind_btGhostObject_isKinematicObject_0 = a.asm.re).apply(null, arguments)
						},
						ng = a._emscripten_bind_btGhostObject_isStaticObject_0 = function () {
							return (ng = a._emscripten_bind_btGhostObject_isStaticObject_0 = a.asm.se).apply(null, arguments)
						},
						og = a._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = function () {
							return (og = a._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 = a.asm.te).apply(null, arguments)
						},
						pg = a._emscripten_bind_btGhostObject_getRestitution_0 = function () {
							return (pg =
								a._emscripten_bind_btGhostObject_getRestitution_0 = a.asm.ue).apply(null, arguments)
						},
						qg = a._emscripten_bind_btGhostObject_getFriction_0 = function () {
							return (qg = a._emscripten_bind_btGhostObject_getFriction_0 = a.asm.ve).apply(null, arguments)
						},
						rg = a._emscripten_bind_btGhostObject_getRollingFriction_0 = function () {
							return (rg = a._emscripten_bind_btGhostObject_getRollingFriction_0 = a.asm.we).apply(null, arguments)
						},
						sg = a._emscripten_bind_btGhostObject_setRestitution_1 = function () {
							return (sg = a._emscripten_bind_btGhostObject_setRestitution_1 =
								a.asm.xe).apply(null, arguments)
						},
						tg = a._emscripten_bind_btGhostObject_setFriction_1 = function () {
							return (tg = a._emscripten_bind_btGhostObject_setFriction_1 = a.asm.ye).apply(null, arguments)
						},
						ug = a._emscripten_bind_btGhostObject_setRollingFriction_1 = function () {
							return (ug = a._emscripten_bind_btGhostObject_setRollingFriction_1 = a.asm.ze).apply(null, arguments)
						},
						vg = a._emscripten_bind_btGhostObject_getWorldTransform_0 = function () {
							return (vg = a._emscripten_bind_btGhostObject_getWorldTransform_0 = a.asm.Ae).apply(null, arguments)
						},
						wg = a._emscripten_bind_btGhostObject_getCollisionFlags_0 = function () {
							return (wg = a._emscripten_bind_btGhostObject_getCollisionFlags_0 = a.asm.Be).apply(null, arguments)
						},
						xg = a._emscripten_bind_btGhostObject_setCollisionFlags_1 = function () {
							return (xg = a._emscripten_bind_btGhostObject_setCollisionFlags_1 = a.asm.Ce).apply(null, arguments)
						},
						yg = a._emscripten_bind_btGhostObject_setWorldTransform_1 = function () {
							return (yg = a._emscripten_bind_btGhostObject_setWorldTransform_1 = a.asm.De).apply(null, arguments)
						},
						zg = a._emscripten_bind_btGhostObject_setCollisionShape_1 =
						function () {
							return (zg = a._emscripten_bind_btGhostObject_setCollisionShape_1 = a.asm.Ee).apply(null, arguments)
						},
						Ag = a._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = function () {
							return (Ag = a._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = a.asm.Fe).apply(null, arguments)
						},
						Bg = a._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = function () {
							return (Bg = a._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = a.asm.Ge).apply(null, arguments)
						},
						Cg = a._emscripten_bind_btGhostObject_getUserIndex_0 =
						function () {
							return (Cg = a._emscripten_bind_btGhostObject_getUserIndex_0 = a.asm.He).apply(null, arguments)
						},
						Dg = a._emscripten_bind_btGhostObject_setUserIndex_1 = function () {
							return (Dg = a._emscripten_bind_btGhostObject_setUserIndex_1 = a.asm.Ie).apply(null, arguments)
						},
						Eg = a._emscripten_bind_btGhostObject_getUserPointer_0 = function () {
							return (Eg = a._emscripten_bind_btGhostObject_getUserPointer_0 = a.asm.Je).apply(null, arguments)
						},
						Fg = a._emscripten_bind_btGhostObject_setUserPointer_1 = function () {
							return (Fg = a._emscripten_bind_btGhostObject_setUserPointer_1 =
								a.asm.Ke).apply(null, arguments)
						},
						Gg = a._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = function () {
							return (Gg = a._emscripten_bind_btGhostObject_getBroadphaseHandle_0 = a.asm.Le).apply(null, arguments)
						},
						Hg = a._emscripten_bind_btGhostObject___destroy___0 = function () {
							return (Hg = a._emscripten_bind_btGhostObject___destroy___0 = a.asm.Me).apply(null, arguments)
						},
						Ig = a._emscripten_bind_btSoftBodySolver___destroy___0 = function () {
							return (Ig = a._emscripten_bind_btSoftBodySolver___destroy___0 = a.asm.Ne).apply(null, arguments)
						},
						Jg = a._emscripten_bind_VoidPtr___destroy___0 = function () {
							return (Jg = a._emscripten_bind_VoidPtr___destroy___0 = a.asm.Oe).apply(null, arguments)
						},
						Kg = a._emscripten_bind_DebugDrawer_DebugDrawer_0 = function () {
							return (Kg = a._emscripten_bind_DebugDrawer_DebugDrawer_0 = a.asm.Pe).apply(null, arguments)
						},
						Lg = a._emscripten_bind_DebugDrawer_drawLine_3 = function () {
							return (Lg = a._emscripten_bind_DebugDrawer_drawLine_3 = a.asm.Qe).apply(null, arguments)
						},
						Mg = a._emscripten_bind_DebugDrawer_drawContactPoint_5 = function () {
							return (Mg =
								a._emscripten_bind_DebugDrawer_drawContactPoint_5 = a.asm.Re).apply(null, arguments)
						},
						Ng = a._emscripten_bind_DebugDrawer_reportErrorWarning_1 = function () {
							return (Ng = a._emscripten_bind_DebugDrawer_reportErrorWarning_1 = a.asm.Se).apply(null, arguments)
						},
						Og = a._emscripten_bind_DebugDrawer_draw3dText_2 = function () {
							return (Og = a._emscripten_bind_DebugDrawer_draw3dText_2 = a.asm.Te).apply(null, arguments)
						},
						Pg = a._emscripten_bind_DebugDrawer_setDebugMode_1 = function () {
							return (Pg = a._emscripten_bind_DebugDrawer_setDebugMode_1 =
								a.asm.Ue).apply(null, arguments)
						},
						Qg = a._emscripten_bind_DebugDrawer_getDebugMode_0 = function () {
							return (Qg = a._emscripten_bind_DebugDrawer_getDebugMode_0 = a.asm.Ve).apply(null, arguments)
						},
						Rg = a._emscripten_bind_DebugDrawer___destroy___0 = function () {
							return (Rg = a._emscripten_bind_DebugDrawer___destroy___0 = a.asm.We).apply(null, arguments)
						},
						Sg = a._emscripten_bind_btVector4_btVector4_0 = function () {
							return (Sg = a._emscripten_bind_btVector4_btVector4_0 = a.asm.Xe).apply(null, arguments)
						},
						Tg = a._emscripten_bind_btVector4_btVector4_4 =
						function () {
							return (Tg = a._emscripten_bind_btVector4_btVector4_4 = a.asm.Ye).apply(null, arguments)
						},
						Ug = a._emscripten_bind_btVector4_w_0 = function () {
							return (Ug = a._emscripten_bind_btVector4_w_0 = a.asm.Ze).apply(null, arguments)
						},
						Vg = a._emscripten_bind_btVector4_setValue_4 = function () {
							return (Vg = a._emscripten_bind_btVector4_setValue_4 = a.asm._e).apply(null, arguments)
						},
						Wg = a._emscripten_bind_btVector4_length_0 = function () {
							return (Wg = a._emscripten_bind_btVector4_length_0 = a.asm.$e).apply(null, arguments)
						},
						Xg = a._emscripten_bind_btVector4_x_0 =
						function () {
							return (Xg = a._emscripten_bind_btVector4_x_0 = a.asm.af).apply(null, arguments)
						},
						Yg = a._emscripten_bind_btVector4_y_0 = function () {
							return (Yg = a._emscripten_bind_btVector4_y_0 = a.asm.bf).apply(null, arguments)
						},
						Zg = a._emscripten_bind_btVector4_z_0 = function () {
							return (Zg = a._emscripten_bind_btVector4_z_0 = a.asm.cf).apply(null, arguments)
						},
						$g = a._emscripten_bind_btVector4_setX_1 = function () {
							return ($g = a._emscripten_bind_btVector4_setX_1 = a.asm.df).apply(null, arguments)
						},
						ah = a._emscripten_bind_btVector4_setY_1 =
						function () {
							return (ah = a._emscripten_bind_btVector4_setY_1 = a.asm.ef).apply(null, arguments)
						},
						bh = a._emscripten_bind_btVector4_setZ_1 = function () {
							return (bh = a._emscripten_bind_btVector4_setZ_1 = a.asm.ff).apply(null, arguments)
						},
						ch = a._emscripten_bind_btVector4_normalize_0 = function () {
							return (ch = a._emscripten_bind_btVector4_normalize_0 = a.asm.gf).apply(null, arguments)
						},
						dh = a._emscripten_bind_btVector4_rotate_2 = function () {
							return (dh = a._emscripten_bind_btVector4_rotate_2 = a.asm.hf).apply(null, arguments)
						},
						eh = a._emscripten_bind_btVector4_dot_1 =
						function () {
							return (eh = a._emscripten_bind_btVector4_dot_1 = a.asm.jf).apply(null, arguments)
						},
						fh = a._emscripten_bind_btVector4_op_mul_1 = function () {
							return (fh = a._emscripten_bind_btVector4_op_mul_1 = a.asm.kf).apply(null, arguments)
						},
						gh = a._emscripten_bind_btVector4_op_add_1 = function () {
							return (gh = a._emscripten_bind_btVector4_op_add_1 = a.asm.lf).apply(null, arguments)
						},
						hh = a._emscripten_bind_btVector4_op_sub_1 = function () {
							return (hh = a._emscripten_bind_btVector4_op_sub_1 = a.asm.mf).apply(null, arguments)
						},
						ih = a._emscripten_bind_btVector4___destroy___0 =
						function () {
							return (ih = a._emscripten_bind_btVector4___destroy___0 = a.asm.nf).apply(null, arguments)
						},
						jh = a._emscripten_bind_btQuaternion_btQuaternion_4 = function () {
							return (jh = a._emscripten_bind_btQuaternion_btQuaternion_4 = a.asm.of).apply(null, arguments)
						},
						kh = a._emscripten_bind_btQuaternion_setValue_4 = function () {
							return (kh = a._emscripten_bind_btQuaternion_setValue_4 = a.asm.pf).apply(null, arguments)
						},
						lh = a._emscripten_bind_btQuaternion_setEulerZYX_3 = function () {
							return (lh = a._emscripten_bind_btQuaternion_setEulerZYX_3 =
								a.asm.qf).apply(null, arguments)
						},
						mh = a._emscripten_bind_btQuaternion_setRotation_2 = function () {
							return (mh = a._emscripten_bind_btQuaternion_setRotation_2 = a.asm.rf).apply(null, arguments)
						},
						nh = a._emscripten_bind_btQuaternion_normalize_0 = function () {
							return (nh = a._emscripten_bind_btQuaternion_normalize_0 = a.asm.sf).apply(null, arguments)
						},
						oh = a._emscripten_bind_btQuaternion_length2_0 = function () {
							return (oh = a._emscripten_bind_btQuaternion_length2_0 = a.asm.tf).apply(null, arguments)
						},
						ph = a._emscripten_bind_btQuaternion_length_0 =
						function () {
							return (ph = a._emscripten_bind_btQuaternion_length_0 = a.asm.uf).apply(null, arguments)
						},
						qh = a._emscripten_bind_btQuaternion_dot_1 = function () {
							return (qh = a._emscripten_bind_btQuaternion_dot_1 = a.asm.vf).apply(null, arguments)
						},
						rh = a._emscripten_bind_btQuaternion_normalized_0 = function () {
							return (rh = a._emscripten_bind_btQuaternion_normalized_0 = a.asm.wf).apply(null, arguments)
						},
						sh = a._emscripten_bind_btQuaternion_getAxis_0 = function () {
							return (sh = a._emscripten_bind_btQuaternion_getAxis_0 = a.asm.xf).apply(null,
								arguments)
						},
						th = a._emscripten_bind_btQuaternion_inverse_0 = function () {
							return (th = a._emscripten_bind_btQuaternion_inverse_0 = a.asm.yf).apply(null, arguments)
						},
						uh = a._emscripten_bind_btQuaternion_getAngle_0 = function () {
							return (uh = a._emscripten_bind_btQuaternion_getAngle_0 = a.asm.zf).apply(null, arguments)
						},
						vh = a._emscripten_bind_btQuaternion_getAngleShortestPath_0 = function () {
							return (vh = a._emscripten_bind_btQuaternion_getAngleShortestPath_0 = a.asm.Af).apply(null, arguments)
						},
						wh = a._emscripten_bind_btQuaternion_angle_1 =
						function () {
							return (wh = a._emscripten_bind_btQuaternion_angle_1 = a.asm.Bf).apply(null, arguments)
						},
						xh = a._emscripten_bind_btQuaternion_angleShortestPath_1 = function () {
							return (xh = a._emscripten_bind_btQuaternion_angleShortestPath_1 = a.asm.Cf).apply(null, arguments)
						},
						yh = a._emscripten_bind_btQuaternion_op_add_1 = function () {
							return (yh = a._emscripten_bind_btQuaternion_op_add_1 = a.asm.Df).apply(null, arguments)
						},
						zh = a._emscripten_bind_btQuaternion_op_sub_1 = function () {
							return (zh = a._emscripten_bind_btQuaternion_op_sub_1 = a.asm.Ef).apply(null,
								arguments)
						},
						Ah = a._emscripten_bind_btQuaternion_op_mul_1 = function () {
							return (Ah = a._emscripten_bind_btQuaternion_op_mul_1 = a.asm.Ff).apply(null, arguments)
						},
						Bh = a._emscripten_bind_btQuaternion_op_mulq_1 = function () {
							return (Bh = a._emscripten_bind_btQuaternion_op_mulq_1 = a.asm.Gf).apply(null, arguments)
						},
						Ch = a._emscripten_bind_btQuaternion_op_div_1 = function () {
							return (Ch = a._emscripten_bind_btQuaternion_op_div_1 = a.asm.Hf).apply(null, arguments)
						},
						Dh = a._emscripten_bind_btQuaternion_x_0 = function () {
							return (Dh = a._emscripten_bind_btQuaternion_x_0 =
								a.asm.If).apply(null, arguments)
						},
						Eh = a._emscripten_bind_btQuaternion_y_0 = function () {
							return (Eh = a._emscripten_bind_btQuaternion_y_0 = a.asm.Jf).apply(null, arguments)
						},
						Fh = a._emscripten_bind_btQuaternion_z_0 = function () {
							return (Fh = a._emscripten_bind_btQuaternion_z_0 = a.asm.Kf).apply(null, arguments)
						},
						Gh = a._emscripten_bind_btQuaternion_w_0 = function () {
							return (Gh = a._emscripten_bind_btQuaternion_w_0 = a.asm.Lf).apply(null, arguments)
						},
						Hh = a._emscripten_bind_btQuaternion_setX_1 = function () {
							return (Hh = a._emscripten_bind_btQuaternion_setX_1 =
								a.asm.Mf).apply(null, arguments)
						},
						Ih = a._emscripten_bind_btQuaternion_setY_1 = function () {
							return (Ih = a._emscripten_bind_btQuaternion_setY_1 = a.asm.Nf).apply(null, arguments)
						},
						Jh = a._emscripten_bind_btQuaternion_setZ_1 = function () {
							return (Jh = a._emscripten_bind_btQuaternion_setZ_1 = a.asm.Of).apply(null, arguments)
						},
						Kh = a._emscripten_bind_btQuaternion_setW_1 = function () {
							return (Kh = a._emscripten_bind_btQuaternion_setW_1 = a.asm.Pf).apply(null, arguments)
						},
						Lh = a._emscripten_bind_btQuaternion___destroy___0 = function () {
							return (Lh =
								a._emscripten_bind_btQuaternion___destroy___0 = a.asm.Qf).apply(null, arguments)
						},
						Mh = a._emscripten_bind_btMatrix3x3_setEulerZYX_3 = function () {
							return (Mh = a._emscripten_bind_btMatrix3x3_setEulerZYX_3 = a.asm.Rf).apply(null, arguments)
						},
						Nh = a._emscripten_bind_btMatrix3x3_getRotation_1 = function () {
							return (Nh = a._emscripten_bind_btMatrix3x3_getRotation_1 = a.asm.Sf).apply(null, arguments)
						},
						Oh = a._emscripten_bind_btMatrix3x3_getRow_1 = function () {
							return (Oh = a._emscripten_bind_btMatrix3x3_getRow_1 = a.asm.Tf).apply(null, arguments)
						},
						Ph = a._emscripten_bind_btMatrix3x3___destroy___0 = function () {
							return (Ph = a._emscripten_bind_btMatrix3x3___destroy___0 = a.asm.Uf).apply(null, arguments)
						},
						Qh = a._emscripten_bind_btTransform_btTransform_0 = function () {
							return (Qh = a._emscripten_bind_btTransform_btTransform_0 = a.asm.Vf).apply(null, arguments)
						},
						Rh = a._emscripten_bind_btTransform_btTransform_2 = function () {
							return (Rh = a._emscripten_bind_btTransform_btTransform_2 = a.asm.Wf).apply(null, arguments)
						},
						Sh = a._emscripten_bind_btTransform_setIdentity_0 = function () {
							return (Sh =
								a._emscripten_bind_btTransform_setIdentity_0 = a.asm.Xf).apply(null, arguments)
						},
						Th = a._emscripten_bind_btTransform_setOrigin_1 = function () {
							return (Th = a._emscripten_bind_btTransform_setOrigin_1 = a.asm.Yf).apply(null, arguments)
						},
						Uh = a._emscripten_bind_btTransform_setRotation_1 = function () {
							return (Uh = a._emscripten_bind_btTransform_setRotation_1 = a.asm.Zf).apply(null, arguments)
						},
						Vh = a._emscripten_bind_btTransform_getOrigin_0 = function () {
							return (Vh = a._emscripten_bind_btTransform_getOrigin_0 = a.asm._f).apply(null, arguments)
						},
						Wh = a._emscripten_bind_btTransform_getRotation_0 = function () {
							return (Wh = a._emscripten_bind_btTransform_getRotation_0 = a.asm.$f).apply(null, arguments)
						},
						Xh = a._emscripten_bind_btTransform_getBasis_0 = function () {
							return (Xh = a._emscripten_bind_btTransform_getBasis_0 = a.asm.ag).apply(null, arguments)
						},
						Yh = a._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = function () {
							return (Yh = a._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = a.asm.bg).apply(null, arguments)
						},
						Zh = a._emscripten_bind_btTransform_inverse_0 = function () {
							return (Zh =
								a._emscripten_bind_btTransform_inverse_0 = a.asm.cg).apply(null, arguments)
						},
						$h = a._emscripten_bind_btTransform_op_mul_1 = function () {
							return ($h = a._emscripten_bind_btTransform_op_mul_1 = a.asm.dg).apply(null, arguments)
						},
						ai = a._emscripten_bind_btTransform___destroy___0 = function () {
							return (ai = a._emscripten_bind_btTransform___destroy___0 = a.asm.eg).apply(null, arguments)
						},
						bi = a._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = function () {
							return (bi = a._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 =
								a.asm.fg).apply(null, arguments)
						},
						ci = a._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = function () {
							return (ci = a._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = a.asm.gg).apply(null, arguments)
						},
						di = a._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = function () {
							return (di = a._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = a.asm.hg).apply(null, arguments)
						},
						ei = a._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = function () {
							return (ei = a._emscripten_bind_btDefaultMotionState_getWorldTransform_1 =
								a.asm.ig).apply(null, arguments)
						},
						fi = a._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = function () {
							return (fi = a._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = a.asm.jg).apply(null, arguments)
						},
						gi = a._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = function () {
							return (gi = a._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = a.asm.kg).apply(null, arguments)
						},
						hi = a._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = function () {
							return (hi = a._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 =
								a.asm.lg).apply(null, arguments)
						},
						ii = a._emscripten_bind_btDefaultMotionState___destroy___0 = function () {
							return (ii = a._emscripten_bind_btDefaultMotionState___destroy___0 = a.asm.mg).apply(null, arguments)
						},
						ji = a._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = function () {
							return (ji = a._emscripten_bind_btCollisionObjectWrapper_getWorldTransform_0 = a.asm.ng).apply(null, arguments)
						},
						ki = a._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 = function () {
							return (ki = a._emscripten_bind_btCollisionObjectWrapper_getCollisionObject_0 =
								a.asm.og).apply(null, arguments)
						},
						li = a._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = function () {
							return (li = a._emscripten_bind_btCollisionObjectWrapper_getCollisionShape_0 = a.asm.pg).apply(null, arguments)
						},
						mi = a._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = function () {
							return (mi = a._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = a.asm.qg).apply(null, arguments)
						},
						ni = a._emscripten_bind_ClosestRayResultCallback_hasHit_0 = function () {
							return (ni = a._emscripten_bind_ClosestRayResultCallback_hasHit_0 =
								a.asm.rg).apply(null, arguments)
						},
						oi = a._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = function () {
							return (oi = a._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = a.asm.sg).apply(null, arguments)
						},
						pi = a._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = function () {
							return (pi = a._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = a.asm.tg).apply(null, arguments)
						},
						qi = a._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 = function () {
							return (qi = a._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 =
								a.asm.ug).apply(null, arguments)
						},
						ri = a._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = function () {
							return (ri = a._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 = a.asm.vg).apply(null, arguments)
						},
						si = a._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = function () {
							return (si = a._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = a.asm.wg).apply(null, arguments)
						},
						ti = a._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = function () {
							return (ti = a._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 =
								a.asm.xg).apply(null, arguments)
						},
						ui = a._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = function () {
							return (ui = a._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = a.asm.yg).apply(null, arguments)
						},
						vi = a._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = function () {
							return (vi = a._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = a.asm.zg).apply(null, arguments)
						},
						wi = a._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = function () {
							return (wi =
								a._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = a.asm.Ag).apply(null, arguments)
						},
						xi = a._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = function () {
							return (xi = a._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = a.asm.Bg).apply(null, arguments)
						},
						yi = a._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = function () {
							return (yi = a._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = a.asm.Cg).apply(null, arguments)
						},
						zi = a._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = function () {
							return (zi = a._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = a.asm.Dg).apply(null, arguments)
						},
						Ai = a._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = function () {
							return (Ai = a._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = a.asm.Eg).apply(null, arguments)
						},
						Bi = a._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = function () {
							return (Bi = a._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 =
								a.asm.Fg).apply(null, arguments)
						},
						Ci = a._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = function () {
							return (Ci = a._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = a.asm.Gg).apply(null, arguments)
						},
						Di = a._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = function () {
							return (Di = a._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = a.asm.Hg).apply(null, arguments)
						},
						Ei = a._emscripten_bind_ClosestRayResultCallback_get_m_flags_0 = function () {
							return (Ei =
								a._emscripten_bind_ClosestRayResultCallback_get_m_flags_0 = a.asm.Ig).apply(null, arguments)
						},
						Fi = a._emscripten_bind_ClosestRayResultCallback_set_m_flags_1 = function () {
							return (Fi = a._emscripten_bind_ClosestRayResultCallback_set_m_flags_1 = a.asm.Jg).apply(null, arguments)
						},
						Gi = a._emscripten_bind_ClosestRayResultCallback___destroy___0 = function () {
							return (Gi = a._emscripten_bind_ClosestRayResultCallback___destroy___0 = a.asm.Kg).apply(null, arguments)
						},
						Hi = a._emscripten_bind_btConstCollisionObjectArray_size_0 = function () {
							return (Hi =
								a._emscripten_bind_btConstCollisionObjectArray_size_0 = a.asm.Lg).apply(null, arguments)
						},
						Ii = a._emscripten_bind_btConstCollisionObjectArray_at_1 = function () {
							return (Ii = a._emscripten_bind_btConstCollisionObjectArray_at_1 = a.asm.Mg).apply(null, arguments)
						},
						Ji = a._emscripten_bind_btConstCollisionObjectArray___destroy___0 = function () {
							return (Ji = a._emscripten_bind_btConstCollisionObjectArray___destroy___0 = a.asm.Ng).apply(null, arguments)
						},
						Ki = a._emscripten_bind_btScalarArray_size_0 = function () {
							return (Ki = a._emscripten_bind_btScalarArray_size_0 =
								a.asm.Og).apply(null, arguments)
						},
						Li = a._emscripten_bind_btScalarArray_at_1 = function () {
							return (Li = a._emscripten_bind_btScalarArray_at_1 = a.asm.Pg).apply(null, arguments)
						},
						Mi = a._emscripten_bind_btScalarArray___destroy___0 = function () {
							return (Mi = a._emscripten_bind_btScalarArray___destroy___0 = a.asm.Qg).apply(null, arguments)
						},
						Ni = a._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = function () {
							return (Ni = a._emscripten_bind_AllHitsRayResultCallback_AllHitsRayResultCallback_2 = a.asm.Rg).apply(null,
								arguments)
						},
						Oi = a._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = function () {
							return (Oi = a._emscripten_bind_AllHitsRayResultCallback_hasHit_0 = a.asm.Sg).apply(null, arguments)
						},
						Pi = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = function () {
							return (Pi = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObjects_0 = a.asm.Tg).apply(null, arguments)
						},
						Qi = a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 = function () {
							return (Qi = a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObjects_1 =
								a.asm.Ug).apply(null, arguments)
						},
						Ri = a._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = function () {
							return (Ri = a._emscripten_bind_AllHitsRayResultCallback_get_m_rayFromWorld_0 = a.asm.Vg).apply(null, arguments)
						},
						Si = a._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = function () {
							return (Si = a._emscripten_bind_AllHitsRayResultCallback_set_m_rayFromWorld_1 = a.asm.Wg).apply(null, arguments)
						},
						Ti = a._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 = function () {
							return (Ti = a._emscripten_bind_AllHitsRayResultCallback_get_m_rayToWorld_0 =
								a.asm.Xg).apply(null, arguments)
						},
						Ui = a._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = function () {
							return (Ui = a._emscripten_bind_AllHitsRayResultCallback_set_m_rayToWorld_1 = a.asm.Yg).apply(null, arguments)
						},
						Vi = a._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = function () {
							return (Vi = a._emscripten_bind_AllHitsRayResultCallback_get_m_hitNormalWorld_0 = a.asm.Zg).apply(null, arguments)
						},
						Wi = a._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 = function () {
							return (Wi = a._emscripten_bind_AllHitsRayResultCallback_set_m_hitNormalWorld_1 =
								a.asm._g).apply(null, arguments)
						},
						Xi = a._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = function () {
							return (Xi = a._emscripten_bind_AllHitsRayResultCallback_get_m_hitPointWorld_0 = a.asm.$g).apply(null, arguments)
						},
						Yi = a._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = function () {
							return (Yi = a._emscripten_bind_AllHitsRayResultCallback_set_m_hitPointWorld_1 = a.asm.ah).apply(null, arguments)
						},
						Zi = a._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 = function () {
							return (Zi = a._emscripten_bind_AllHitsRayResultCallback_get_m_hitFractions_0 =
								a.asm.bh).apply(null, arguments)
						},
						$i = a._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = function () {
							return ($i = a._emscripten_bind_AllHitsRayResultCallback_set_m_hitFractions_1 = a.asm.ch).apply(null, arguments)
						},
						aj = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = function () {
							return (aj = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterGroup_0 = a.asm.dh).apply(null, arguments)
						},
						bj = a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = function () {
							return (bj =
								a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterGroup_1 = a.asm.eh).apply(null, arguments)
						},
						cj = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = function () {
							return (cj = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionFilterMask_0 = a.asm.fh).apply(null, arguments)
						},
						dj = a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = function () {
							return (dj = a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionFilterMask_1 = a.asm.gh).apply(null, arguments)
						},
						ej = a._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = function () {
							return (ej = a._emscripten_bind_AllHitsRayResultCallback_get_m_closestHitFraction_0 = a.asm.hh).apply(null, arguments)
						},
						fj = a._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = function () {
							return (fj = a._emscripten_bind_AllHitsRayResultCallback_set_m_closestHitFraction_1 = a.asm.ih).apply(null, arguments)
						},
						gj = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 = function () {
							return (gj = a._emscripten_bind_AllHitsRayResultCallback_get_m_collisionObject_0 =
								a.asm.jh).apply(null, arguments)
						},
						hj = a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = function () {
							return (hj = a._emscripten_bind_AllHitsRayResultCallback_set_m_collisionObject_1 = a.asm.kh).apply(null, arguments)
						},
						ij = a._emscripten_bind_AllHitsRayResultCallback_get_m_flags_0 = function () {
							return (ij = a._emscripten_bind_AllHitsRayResultCallback_get_m_flags_0 = a.asm.lh).apply(null, arguments)
						},
						jj = a._emscripten_bind_AllHitsRayResultCallback_set_m_flags_1 = function () {
							return (jj = a._emscripten_bind_AllHitsRayResultCallback_set_m_flags_1 =
								a.asm.mh).apply(null, arguments)
						},
						kj = a._emscripten_bind_AllHitsRayResultCallback___destroy___0 = function () {
							return (kj = a._emscripten_bind_AllHitsRayResultCallback___destroy___0 = a.asm.nh).apply(null, arguments)
						},
						lj = a._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = function () {
							return (lj = a._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = a.asm.oh).apply(null, arguments)
						},
						mj = a._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = function () {
							return (mj = a._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 =
								a.asm.ph).apply(null, arguments)
						},
						nj = a._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = function () {
							return (nj = a._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 = a.asm.qh).apply(null, arguments)
						},
						oj = a._emscripten_bind_btManifoldPoint_getDistance_0 = function () {
							return (oj = a._emscripten_bind_btManifoldPoint_getDistance_0 = a.asm.rh).apply(null, arguments)
						},
						pj = a._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = function () {
							return (pj = a._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = a.asm.sh).apply(null,
								arguments)
						},
						qj = a._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = function () {
							return (qj = a._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = a.asm.th).apply(null, arguments)
						},
						rj = a._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = function () {
							return (rj = a._emscripten_bind_btManifoldPoint_get_m_localPointB_0 = a.asm.uh).apply(null, arguments)
						},
						sj = a._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = function () {
							return (sj = a._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = a.asm.vh).apply(null,
								arguments)
						},
						tj = a._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = function () {
							return (tj = a._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = a.asm.wh).apply(null, arguments)
						},
						uj = a._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = function () {
							return (uj = a._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 = a.asm.xh).apply(null, arguments)
						},
						vj = a._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = function () {
							return (vj = a._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 =
								a.asm.yh).apply(null, arguments)
						},
						wj = a._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = function () {
							return (wj = a._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = a.asm.zh).apply(null, arguments)
						},
						xj = a._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = function () {
							return (xj = a._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = a.asm.Ah).apply(null, arguments)
						},
						yj = a._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = function () {
							return (yj = a._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 =
								a.asm.Bh).apply(null, arguments)
						},
						zj = a._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = function () {
							return (zj = a._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = a.asm.Ch).apply(null, arguments)
						},
						Aj = a._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = function () {
							return (Aj = a._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = a.asm.Dh).apply(null, arguments)
						},
						Bj = a._emscripten_bind_btManifoldPoint___destroy___0 = function () {
							return (Bj = a._emscripten_bind_btManifoldPoint___destroy___0 =
								a.asm.Eh).apply(null, arguments)
						},
						Cj = a._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = function () {
							return (Cj = a._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = a.asm.Fh).apply(null, arguments)
						},
						Dj = a._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = function () {
							return (Dj = a._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = a.asm.Gh).apply(null, arguments)
						},
						Ej = a._emscripten_bind_ConcreteContactResultCallback___destroy___0 =
						function () {
							return (Ej = a._emscripten_bind_ConcreteContactResultCallback___destroy___0 = a.asm.Hh).apply(null, arguments)
						},
						Fj = a._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = function () {
							return (Fj = a._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = a.asm.Ih).apply(null, arguments)
						},
						Gj = a._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = function () {
							return (Gj = a._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = a.asm.Jh).apply(null, arguments)
						},
						Hj = a._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = function () {
							return (Hj =
								a._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = a.asm.Kh).apply(null, arguments)
						},
						Ij = a._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = function () {
							return (Ij = a._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = a.asm.Lh).apply(null, arguments)
						},
						Jj = a._emscripten_bind_LocalShapeInfo___destroy___0 = function () {
							return (Jj = a._emscripten_bind_LocalShapeInfo___destroy___0 = a.asm.Mh).apply(null, arguments)
						},
						Kj = a._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = function () {
							return (Kj = a._emscripten_bind_LocalConvexResult_LocalConvexResult_5 =
								a.asm.Nh).apply(null, arguments)
						},
						Lj = a._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = function () {
							return (Lj = a._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = a.asm.Oh).apply(null, arguments)
						},
						Mj = a._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = function () {
							return (Mj = a._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = a.asm.Ph).apply(null, arguments)
						},
						Nj = a._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 = function () {
							return (Nj = a._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 =
								a.asm.Qh).apply(null, arguments)
						},
						Oj = a._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = function () {
							return (Oj = a._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = a.asm.Rh).apply(null, arguments)
						},
						Pj = a._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = function () {
							return (Pj = a._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = a.asm.Sh).apply(null, arguments)
						},
						Qj = a._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = function () {
							return (Qj = a._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 =
								a.asm.Th).apply(null, arguments)
						},
						Rj = a._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = function () {
							return (Rj = a._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = a.asm.Uh).apply(null, arguments)
						},
						Sj = a._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = function () {
							return (Sj = a._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = a.asm.Vh).apply(null, arguments)
						},
						Tj = a._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = function () {
							return (Tj = a._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 =
								a.asm.Wh).apply(null, arguments)
						},
						Uj = a._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = function () {
							return (Uj = a._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = a.asm.Xh).apply(null, arguments)
						},
						Vj = a._emscripten_bind_LocalConvexResult___destroy___0 = function () {
							return (Vj = a._emscripten_bind_LocalConvexResult___destroy___0 = a.asm.Yh).apply(null, arguments)
						},
						Wj = a._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 = function () {
							return (Wj = a._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 =
								a.asm.Zh).apply(null, arguments)
						},
						Xj = a._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = function () {
							return (Xj = a._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = a.asm._h).apply(null, arguments)
						},
						Yj = a._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 = function () {
							return (Yj = a._emscripten_bind_ClosestConvexResultCallback_get_m_hitCollisionObject_0 = a.asm.$h).apply(null, arguments)
						},
						Zj = a._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 = function () {
							return (Zj =
								a._emscripten_bind_ClosestConvexResultCallback_set_m_hitCollisionObject_1 = a.asm.ai).apply(null, arguments)
						},
						ak = a._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = function () {
							return (ak = a._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = a.asm.bi).apply(null, arguments)
						},
						bk = a._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = function () {
							return (bk = a._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 = a.asm.ci).apply(null, arguments)
						},
						ck = a._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = function () {
							return (ck = a._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = a.asm.di).apply(null, arguments)
						},
						dk = a._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = function () {
							return (dk = a._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = a.asm.ei).apply(null, arguments)
						},
						ek = a._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = function () {
							return (ek = a._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 =
								a.asm.fi).apply(null, arguments)
						},
						fk = a._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = function () {
							return (fk = a._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = a.asm.gi).apply(null, arguments)
						},
						gk = a._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = function () {
							return (gk = a._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = a.asm.hi).apply(null, arguments)
						},
						hk = a._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = function () {
							return (hk =
								a._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = a.asm.ii).apply(null, arguments)
						},
						ik = a._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = function () {
							return (ik = a._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = a.asm.ji).apply(null, arguments)
						},
						jk = a._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = function () {
							return (jk = a._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = a.asm.ki).apply(null,
								arguments)
						},
						kk = a._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = function () {
							return (kk = a._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = a.asm.li).apply(null, arguments)
						},
						lk = a._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = function () {
							return (lk = a._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = a.asm.mi).apply(null, arguments)
						},
						mk = a._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 =
						function () {
							return (mk = a._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = a.asm.ni).apply(null, arguments)
						},
						nk = a._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = function () {
							return (nk = a._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = a.asm.oi).apply(null, arguments)
						},
						ok = a._emscripten_bind_ClosestConvexResultCallback___destroy___0 = function () {
							return (ok = a._emscripten_bind_ClosestConvexResultCallback___destroy___0 = a.asm.pi).apply(null, arguments)
						},
						pk = a._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = function () {
							return (pk = a._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = a.asm.qi).apply(null, arguments)
						},
						qk = a._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = function () {
							return (qk = a._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 = a.asm.ri).apply(null, arguments)
						},
						rk = a._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = function () {
							return (rk = a._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 =
								a.asm.si).apply(null, arguments)
						},
						sk = a._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = function () {
							return (sk = a._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = a.asm.ti).apply(null, arguments)
						},
						tk = a._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = function () {
							return (tk = a._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = a.asm.ui).apply(null, arguments)
						},
						uk = a._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = function () {
							return (uk = a._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 =
								a.asm.vi).apply(null, arguments)
						},
						vk = a._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = function () {
							return (vk = a._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = a.asm.wi).apply(null, arguments)
						},
						wk = a._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = function () {
							return (wk = a._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = a.asm.xi).apply(null, arguments)
						},
						xk = a._emscripten_bind_btBoxShape_btBoxShape_1 = function () {
							return (xk = a._emscripten_bind_btBoxShape_btBoxShape_1 = a.asm.yi).apply(null,
								arguments)
						},
						yk = a._emscripten_bind_btBoxShape_setMargin_1 = function () {
							return (yk = a._emscripten_bind_btBoxShape_setMargin_1 = a.asm.zi).apply(null, arguments)
						},
						zk = a._emscripten_bind_btBoxShape_getMargin_0 = function () {
							return (zk = a._emscripten_bind_btBoxShape_getMargin_0 = a.asm.Ai).apply(null, arguments)
						},
						Ak = a._emscripten_bind_btBoxShape_setLocalScaling_1 = function () {
							return (Ak = a._emscripten_bind_btBoxShape_setLocalScaling_1 = a.asm.Bi).apply(null, arguments)
						},
						Bk = a._emscripten_bind_btBoxShape_getLocalScaling_0 = function () {
							return (Bk =
								a._emscripten_bind_btBoxShape_getLocalScaling_0 = a.asm.Ci).apply(null, arguments)
						},
						Ck = a._emscripten_bind_btBoxShape_calculateLocalInertia_2 = function () {
							return (Ck = a._emscripten_bind_btBoxShape_calculateLocalInertia_2 = a.asm.Di).apply(null, arguments)
						},
						Dk = a._emscripten_bind_btBoxShape___destroy___0 = function () {
							return (Dk = a._emscripten_bind_btBoxShape___destroy___0 = a.asm.Ei).apply(null, arguments)
						},
						Ek = a._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 = function () {
							return (Ek = a._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 =
								a.asm.Fi).apply(null, arguments)
						},
						Fk = a._emscripten_bind_btCapsuleShapeX_setMargin_1 = function () {
							return (Fk = a._emscripten_bind_btCapsuleShapeX_setMargin_1 = a.asm.Gi).apply(null, arguments)
						},
						Gk = a._emscripten_bind_btCapsuleShapeX_getMargin_0 = function () {
							return (Gk = a._emscripten_bind_btCapsuleShapeX_getMargin_0 = a.asm.Hi).apply(null, arguments)
						},
						Hk = a._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = function () {
							return (Hk = a._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = a.asm.Ii).apply(null, arguments)
						},
						Ik = a._emscripten_bind_btCapsuleShapeX_getRadius_0 =
						function () {
							return (Ik = a._emscripten_bind_btCapsuleShapeX_getRadius_0 = a.asm.Ji).apply(null, arguments)
						},
						Jk = a._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = function () {
							return (Jk = a._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = a.asm.Ki).apply(null, arguments)
						},
						Kk = a._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = function () {
							return (Kk = a._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = a.asm.Li).apply(null, arguments)
						},
						Lk = a._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = function () {
							return (Lk = a._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 =
								a.asm.Mi).apply(null, arguments)
						},
						Mk = a._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = function () {
							return (Mk = a._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = a.asm.Ni).apply(null, arguments)
						},
						Nk = a._emscripten_bind_btCapsuleShapeX___destroy___0 = function () {
							return (Nk = a._emscripten_bind_btCapsuleShapeX___destroy___0 = a.asm.Oi).apply(null, arguments)
						},
						Ok = a._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = function () {
							return (Ok = a._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 = a.asm.Pi).apply(null,
								arguments)
						},
						Pk = a._emscripten_bind_btCapsuleShapeZ_setMargin_1 = function () {
							return (Pk = a._emscripten_bind_btCapsuleShapeZ_setMargin_1 = a.asm.Qi).apply(null, arguments)
						},
						Qk = a._emscripten_bind_btCapsuleShapeZ_getMargin_0 = function () {
							return (Qk = a._emscripten_bind_btCapsuleShapeZ_getMargin_0 = a.asm.Ri).apply(null, arguments)
						},
						Rk = a._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = function () {
							return (Rk = a._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = a.asm.Si).apply(null, arguments)
						},
						Sk = a._emscripten_bind_btCapsuleShapeZ_getRadius_0 =
						function () {
							return (Sk = a._emscripten_bind_btCapsuleShapeZ_getRadius_0 = a.asm.Ti).apply(null, arguments)
						},
						Tk = a._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = function () {
							return (Tk = a._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = a.asm.Ui).apply(null, arguments)
						},
						Uk = a._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = function () {
							return (Uk = a._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = a.asm.Vi).apply(null, arguments)
						},
						Vk = a._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = function () {
							return (Vk = a._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 =
								a.asm.Wi).apply(null, arguments)
						},
						Wk = a._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = function () {
							return (Wk = a._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = a.asm.Xi).apply(null, arguments)
						},
						Xk = a._emscripten_bind_btCapsuleShapeZ___destroy___0 = function () {
							return (Xk = a._emscripten_bind_btCapsuleShapeZ___destroy___0 = a.asm.Yi).apply(null, arguments)
						},
						Yk = a._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = function () {
							return (Yk = a._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = a.asm.Zi).apply(null,
								arguments)
						},
						Zk = a._emscripten_bind_btCylinderShapeX_setMargin_1 = function () {
							return (Zk = a._emscripten_bind_btCylinderShapeX_setMargin_1 = a.asm._i).apply(null, arguments)
						},
						$k = a._emscripten_bind_btCylinderShapeX_getMargin_0 = function () {
							return ($k = a._emscripten_bind_btCylinderShapeX_getMargin_0 = a.asm.$i).apply(null, arguments)
						},
						al = a._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = function () {
							return (al = a._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = a.asm.aj).apply(null, arguments)
						},
						bl = a._emscripten_bind_btCylinderShapeX_getLocalScaling_0 =
						function () {
							return (bl = a._emscripten_bind_btCylinderShapeX_getLocalScaling_0 = a.asm.bj).apply(null, arguments)
						},
						cl = a._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = function () {
							return (cl = a._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = a.asm.cj).apply(null, arguments)
						},
						dl = a._emscripten_bind_btCylinderShapeX___destroy___0 = function () {
							return (dl = a._emscripten_bind_btCylinderShapeX___destroy___0 = a.asm.dj).apply(null, arguments)
						},
						el = a._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = function () {
							return (el =
								a._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 = a.asm.ej).apply(null, arguments)
						},
						fl = a._emscripten_bind_btCylinderShapeZ_setMargin_1 = function () {
							return (fl = a._emscripten_bind_btCylinderShapeZ_setMargin_1 = a.asm.fj).apply(null, arguments)
						},
						gl = a._emscripten_bind_btCylinderShapeZ_getMargin_0 = function () {
							return (gl = a._emscripten_bind_btCylinderShapeZ_getMargin_0 = a.asm.gj).apply(null, arguments)
						},
						hl = a._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = function () {
							return (hl = a._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 =
								a.asm.hj).apply(null, arguments)
						},
						il = a._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = function () {
							return (il = a._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = a.asm.ij).apply(null, arguments)
						},
						jl = a._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = function () {
							return (jl = a._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = a.asm.jj).apply(null, arguments)
						},
						kl = a._emscripten_bind_btCylinderShapeZ___destroy___0 = function () {
							return (kl = a._emscripten_bind_btCylinderShapeZ___destroy___0 = a.asm.kj).apply(null,
								arguments)
						},
						ll = a._emscripten_bind_btSphereShape_btSphereShape_1 = function () {
							return (ll = a._emscripten_bind_btSphereShape_btSphereShape_1 = a.asm.lj).apply(null, arguments)
						},
						ml = a._emscripten_bind_btSphereShape_setMargin_1 = function () {
							return (ml = a._emscripten_bind_btSphereShape_setMargin_1 = a.asm.mj).apply(null, arguments)
						},
						nl = a._emscripten_bind_btSphereShape_getMargin_0 = function () {
							return (nl = a._emscripten_bind_btSphereShape_getMargin_0 = a.asm.nj).apply(null, arguments)
						},
						ol = a._emscripten_bind_btSphereShape_setLocalScaling_1 =
						function () {
							return (ol = a._emscripten_bind_btSphereShape_setLocalScaling_1 = a.asm.oj).apply(null, arguments)
						},
						pl = a._emscripten_bind_btSphereShape_getLocalScaling_0 = function () {
							return (pl = a._emscripten_bind_btSphereShape_getLocalScaling_0 = a.asm.pj).apply(null, arguments)
						},
						ql = a._emscripten_bind_btSphereShape_calculateLocalInertia_2 = function () {
							return (ql = a._emscripten_bind_btSphereShape_calculateLocalInertia_2 = a.asm.qj).apply(null, arguments)
						},
						rl = a._emscripten_bind_btSphereShape___destroy___0 = function () {
							return (rl =
								a._emscripten_bind_btSphereShape___destroy___0 = a.asm.rj).apply(null, arguments)
						},
						sl = a._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = function () {
							return (sl = a._emscripten_bind_btMultiSphereShape_btMultiSphereShape_3 = a.asm.sj).apply(null, arguments)
						},
						tl = a._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = function () {
							return (tl = a._emscripten_bind_btMultiSphereShape_setLocalScaling_1 = a.asm.tj).apply(null, arguments)
						},
						ul = a._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = function () {
							return (ul =
								a._emscripten_bind_btMultiSphereShape_getLocalScaling_0 = a.asm.uj).apply(null, arguments)
						},
						vl = a._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = function () {
							return (vl = a._emscripten_bind_btMultiSphereShape_calculateLocalInertia_2 = a.asm.vj).apply(null, arguments)
						},
						wl = a._emscripten_bind_btMultiSphereShape___destroy___0 = function () {
							return (wl = a._emscripten_bind_btMultiSphereShape___destroy___0 = a.asm.wj).apply(null, arguments)
						},
						xl = a._emscripten_bind_btConeShapeX_btConeShapeX_2 = function () {
							return (xl =
								a._emscripten_bind_btConeShapeX_btConeShapeX_2 = a.asm.xj).apply(null, arguments)
						},
						yl = a._emscripten_bind_btConeShapeX_setLocalScaling_1 = function () {
							return (yl = a._emscripten_bind_btConeShapeX_setLocalScaling_1 = a.asm.yj).apply(null, arguments)
						},
						zl = a._emscripten_bind_btConeShapeX_getLocalScaling_0 = function () {
							return (zl = a._emscripten_bind_btConeShapeX_getLocalScaling_0 = a.asm.zj).apply(null, arguments)
						},
						Al = a._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = function () {
							return (Al = a._emscripten_bind_btConeShapeX_calculateLocalInertia_2 =
								a.asm.Aj).apply(null, arguments)
						},
						Bl = a._emscripten_bind_btConeShapeX___destroy___0 = function () {
							return (Bl = a._emscripten_bind_btConeShapeX___destroy___0 = a.asm.Bj).apply(null, arguments)
						},
						Cl = a._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = function () {
							return (Cl = a._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = a.asm.Cj).apply(null, arguments)
						},
						Dl = a._emscripten_bind_btConeShapeZ_setLocalScaling_1 = function () {
							return (Dl = a._emscripten_bind_btConeShapeZ_setLocalScaling_1 = a.asm.Dj).apply(null, arguments)
						},
						El = a._emscripten_bind_btConeShapeZ_getLocalScaling_0 =
						function () {
							return (El = a._emscripten_bind_btConeShapeZ_getLocalScaling_0 = a.asm.Ej).apply(null, arguments)
						},
						Fl = a._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = function () {
							return (Fl = a._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = a.asm.Fj).apply(null, arguments)
						},
						Gl = a._emscripten_bind_btConeShapeZ___destroy___0 = function () {
							return (Gl = a._emscripten_bind_btConeShapeZ___destroy___0 = a.asm.Gj).apply(null, arguments)
						},
						Hl = a._emscripten_bind_btIntArray_size_0 = function () {
							return (Hl = a._emscripten_bind_btIntArray_size_0 =
								a.asm.Hj).apply(null, arguments)
						},
						Il = a._emscripten_bind_btIntArray_at_1 = function () {
							return (Il = a._emscripten_bind_btIntArray_at_1 = a.asm.Ij).apply(null, arguments)
						},
						Jl = a._emscripten_bind_btIntArray___destroy___0 = function () {
							return (Jl = a._emscripten_bind_btIntArray___destroy___0 = a.asm.Jj).apply(null, arguments)
						},
						Kl = a._emscripten_bind_btFace_get_m_indices_0 = function () {
							return (Kl = a._emscripten_bind_btFace_get_m_indices_0 = a.asm.Kj).apply(null, arguments)
						},
						Ll = a._emscripten_bind_btFace_set_m_indices_1 = function () {
							return (Ll =
								a._emscripten_bind_btFace_set_m_indices_1 = a.asm.Lj).apply(null, arguments)
						},
						Ml = a._emscripten_bind_btFace_get_m_plane_1 = function () {
							return (Ml = a._emscripten_bind_btFace_get_m_plane_1 = a.asm.Mj).apply(null, arguments)
						},
						Nl = a._emscripten_bind_btFace_set_m_plane_2 = function () {
							return (Nl = a._emscripten_bind_btFace_set_m_plane_2 = a.asm.Nj).apply(null, arguments)
						},
						Ol = a._emscripten_bind_btFace___destroy___0 = function () {
							return (Ol = a._emscripten_bind_btFace___destroy___0 = a.asm.Oj).apply(null, arguments)
						},
						Pl = a._emscripten_bind_btVector3Array_size_0 =
						function () {
							return (Pl = a._emscripten_bind_btVector3Array_size_0 = a.asm.Pj).apply(null, arguments)
						},
						Ql = a._emscripten_bind_btVector3Array_at_1 = function () {
							return (Ql = a._emscripten_bind_btVector3Array_at_1 = a.asm.Qj).apply(null, arguments)
						},
						Rl = a._emscripten_bind_btVector3Array___destroy___0 = function () {
							return (Rl = a._emscripten_bind_btVector3Array___destroy___0 = a.asm.Rj).apply(null, arguments)
						},
						Sl = a._emscripten_bind_btFaceArray_size_0 = function () {
							return (Sl = a._emscripten_bind_btFaceArray_size_0 = a.asm.Sj).apply(null,
								arguments)
						},
						Tl = a._emscripten_bind_btFaceArray_at_1 = function () {
							return (Tl = a._emscripten_bind_btFaceArray_at_1 = a.asm.Tj).apply(null, arguments)
						},
						Ul = a._emscripten_bind_btFaceArray___destroy___0 = function () {
							return (Ul = a._emscripten_bind_btFaceArray___destroy___0 = a.asm.Uj).apply(null, arguments)
						},
						Vl = a._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = function () {
							return (Vl = a._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = a.asm.Vj).apply(null, arguments)
						},
						Wl = a._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 =
						function () {
							return (Wl = a._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = a.asm.Wj).apply(null, arguments)
						},
						Xl = a._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = function () {
							return (Xl = a._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = a.asm.Xj).apply(null, arguments)
						},
						Yl = a._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = function () {
							return (Yl = a._emscripten_bind_btConvexPolyhedron_set_m_faces_1 = a.asm.Yj).apply(null, arguments)
						},
						Zl = a._emscripten_bind_btConvexPolyhedron___destroy___0 = function () {
							return (Zl =
								a._emscripten_bind_btConvexPolyhedron___destroy___0 = a.asm.Zj).apply(null, arguments)
						},
						$l = a._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = function () {
							return ($l = a._emscripten_bind_btConvexHullShape_btConvexHullShape_0 = a.asm._j).apply(null, arguments)
						},
						am = a._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = function () {
							return (am = a._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = a.asm.$j).apply(null, arguments)
						},
						bm = a._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = function () {
							return (bm =
								a._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = a.asm.ak).apply(null, arguments)
						},
						cm = a._emscripten_bind_btConvexHullShape_addPoint_1 = function () {
							return (cm = a._emscripten_bind_btConvexHullShape_addPoint_1 = a.asm.bk).apply(null, arguments)
						},
						dm = a._emscripten_bind_btConvexHullShape_addPoint_2 = function () {
							return (dm = a._emscripten_bind_btConvexHullShape_addPoint_2 = a.asm.ck).apply(null, arguments)
						},
						em = a._emscripten_bind_btConvexHullShape_setMargin_1 = function () {
							return (em = a._emscripten_bind_btConvexHullShape_setMargin_1 =
								a.asm.dk).apply(null, arguments)
						},
						fm = a._emscripten_bind_btConvexHullShape_getMargin_0 = function () {
							return (fm = a._emscripten_bind_btConvexHullShape_getMargin_0 = a.asm.ek).apply(null, arguments)
						},
						gm = a._emscripten_bind_btConvexHullShape_getNumVertices_0 = function () {
							return (gm = a._emscripten_bind_btConvexHullShape_getNumVertices_0 = a.asm.fk).apply(null, arguments)
						},
						hm = a._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = function () {
							return (hm = a._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 =
								a.asm.gk).apply(null, arguments)
						},
						im = a._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = function () {
							return (im = a._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = a.asm.hk).apply(null, arguments)
						},
						jm = a._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = function () {
							return (jm = a._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = a.asm.ik).apply(null, arguments)
						},
						km = a._emscripten_bind_btConvexHullShape_setLocalScaling_1 = function () {
							return (km = a._emscripten_bind_btConvexHullShape_setLocalScaling_1 =
								a.asm.jk).apply(null, arguments)
						},
						lm = a._emscripten_bind_btConvexHullShape_getLocalScaling_0 = function () {
							return (lm = a._emscripten_bind_btConvexHullShape_getLocalScaling_0 = a.asm.kk).apply(null, arguments)
						},
						mm = a._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = function () {
							return (mm = a._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = a.asm.lk).apply(null, arguments)
						},
						nm = a._emscripten_bind_btConvexHullShape___destroy___0 = function () {
							return (nm = a._emscripten_bind_btConvexHullShape___destroy___0 =
								a.asm.mk).apply(null, arguments)
						},
						om = a._emscripten_bind_btShapeHull_btShapeHull_1 = function () {
							return (om = a._emscripten_bind_btShapeHull_btShapeHull_1 = a.asm.nk).apply(null, arguments)
						},
						pm = a._emscripten_bind_btShapeHull_buildHull_1 = function () {
							return (pm = a._emscripten_bind_btShapeHull_buildHull_1 = a.asm.ok).apply(null, arguments)
						},
						qm = a._emscripten_bind_btShapeHull_numVertices_0 = function () {
							return (qm = a._emscripten_bind_btShapeHull_numVertices_0 = a.asm.pk).apply(null, arguments)
						},
						rm = a._emscripten_bind_btShapeHull_getVertexPointer_0 =
						function () {
							return (rm = a._emscripten_bind_btShapeHull_getVertexPointer_0 = a.asm.qk).apply(null, arguments)
						},
						sm = a._emscripten_bind_btShapeHull___destroy___0 = function () {
							return (sm = a._emscripten_bind_btShapeHull___destroy___0 = a.asm.rk).apply(null, arguments)
						},
						tm = a._emscripten_bind_btCompoundShape_btCompoundShape_0 = function () {
							return (tm = a._emscripten_bind_btCompoundShape_btCompoundShape_0 = a.asm.sk).apply(null, arguments)
						},
						um = a._emscripten_bind_btCompoundShape_btCompoundShape_1 = function () {
							return (um = a._emscripten_bind_btCompoundShape_btCompoundShape_1 =
								a.asm.tk).apply(null, arguments)
						},
						wm = a._emscripten_bind_btCompoundShape_addChildShape_2 = function () {
							return (wm = a._emscripten_bind_btCompoundShape_addChildShape_2 = a.asm.uk).apply(null, arguments)
						},
						xm = a._emscripten_bind_btCompoundShape_removeChildShape_1 = function () {
							return (xm = a._emscripten_bind_btCompoundShape_removeChildShape_1 = a.asm.vk).apply(null, arguments)
						},
						ym = a._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = function () {
							return (ym = a._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 =
								a.asm.wk).apply(null, arguments)
						},
						zm = a._emscripten_bind_btCompoundShape_getNumChildShapes_0 = function () {
							return (zm = a._emscripten_bind_btCompoundShape_getNumChildShapes_0 = a.asm.xk).apply(null, arguments)
						},
						Am = a._emscripten_bind_btCompoundShape_getChildShape_1 = function () {
							return (Am = a._emscripten_bind_btCompoundShape_getChildShape_1 = a.asm.yk).apply(null, arguments)
						},
						Bm = a._emscripten_bind_btCompoundShape_updateChildTransform_2 = function () {
							return (Bm = a._emscripten_bind_btCompoundShape_updateChildTransform_2 = a.asm.zk).apply(null,
								arguments)
						},
						Cm = a._emscripten_bind_btCompoundShape_updateChildTransform_3 = function () {
							return (Cm = a._emscripten_bind_btCompoundShape_updateChildTransform_3 = a.asm.Ak).apply(null, arguments)
						},
						Dm = a._emscripten_bind_btCompoundShape_setMargin_1 = function () {
							return (Dm = a._emscripten_bind_btCompoundShape_setMargin_1 = a.asm.Bk).apply(null, arguments)
						},
						Em = a._emscripten_bind_btCompoundShape_getMargin_0 = function () {
							return (Em = a._emscripten_bind_btCompoundShape_getMargin_0 = a.asm.Ck).apply(null, arguments)
						},
						Fm = a._emscripten_bind_btCompoundShape_setLocalScaling_1 =
						function () {
							return (Fm = a._emscripten_bind_btCompoundShape_setLocalScaling_1 = a.asm.Dk).apply(null, arguments)
						},
						Gm = a._emscripten_bind_btCompoundShape_getLocalScaling_0 = function () {
							return (Gm = a._emscripten_bind_btCompoundShape_getLocalScaling_0 = a.asm.Ek).apply(null, arguments)
						},
						Hm = a._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = function () {
							return (Hm = a._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = a.asm.Fk).apply(null, arguments)
						},
						Im = a._emscripten_bind_btCompoundShape___destroy___0 = function () {
							return (Im =
								a._emscripten_bind_btCompoundShape___destroy___0 = a.asm.Gk).apply(null, arguments)
						},
						Jm = a._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = function () {
							return (Jm = a._emscripten_bind_btIndexedMesh_get_m_numTriangles_0 = a.asm.Hk).apply(null, arguments)
						},
						Km = a._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = function () {
							return (Km = a._emscripten_bind_btIndexedMesh_set_m_numTriangles_1 = a.asm.Ik).apply(null, arguments)
						},
						Lm = a._emscripten_bind_btIndexedMesh___destroy___0 = function () {
							return (Lm = a._emscripten_bind_btIndexedMesh___destroy___0 =
								a.asm.Jk).apply(null, arguments)
						},
						Mm = a._emscripten_bind_btIndexedMeshArray_size_0 = function () {
							return (Mm = a._emscripten_bind_btIndexedMeshArray_size_0 = a.asm.Kk).apply(null, arguments)
						},
						Nm = a._emscripten_bind_btIndexedMeshArray_at_1 = function () {
							return (Nm = a._emscripten_bind_btIndexedMeshArray_at_1 = a.asm.Lk).apply(null, arguments)
						},
						Om = a._emscripten_bind_btIndexedMeshArray___destroy___0 = function () {
							return (Om = a._emscripten_bind_btIndexedMeshArray___destroy___0 = a.asm.Mk).apply(null, arguments)
						},
						Pm = a._emscripten_bind_btTriangleMesh_btTriangleMesh_0 =
						function () {
							return (Pm = a._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = a.asm.Nk).apply(null, arguments)
						},
						Qm = a._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = function () {
							return (Qm = a._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = a.asm.Ok).apply(null, arguments)
						},
						Rm = a._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = function () {
							return (Rm = a._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = a.asm.Pk).apply(null, arguments)
						},
						Sm = a._emscripten_bind_btTriangleMesh_addTriangle_3 = function () {
							return (Sm = a._emscripten_bind_btTriangleMesh_addTriangle_3 =
								a.asm.Qk).apply(null, arguments)
						},
						Tm = a._emscripten_bind_btTriangleMesh_addTriangle_4 = function () {
							return (Tm = a._emscripten_bind_btTriangleMesh_addTriangle_4 = a.asm.Rk).apply(null, arguments)
						},
						Um = a._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = function () {
							return (Um = a._emscripten_bind_btTriangleMesh_findOrAddVertex_2 = a.asm.Sk).apply(null, arguments)
						},
						Vm = a._emscripten_bind_btTriangleMesh_addIndex_1 = function () {
							return (Vm = a._emscripten_bind_btTriangleMesh_addIndex_1 = a.asm.Tk).apply(null, arguments)
						},
						Wm = a._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 =
						function () {
							return (Wm = a._emscripten_bind_btTriangleMesh_getIndexedMeshArray_0 = a.asm.Uk).apply(null, arguments)
						},
						Xm = a._emscripten_bind_btTriangleMesh_setScaling_1 = function () {
							return (Xm = a._emscripten_bind_btTriangleMesh_setScaling_1 = a.asm.Vk).apply(null, arguments)
						},
						Ym = a._emscripten_bind_btTriangleMesh___destroy___0 = function () {
							return (Ym = a._emscripten_bind_btTriangleMesh___destroy___0 = a.asm.Wk).apply(null, arguments)
						},
						Zm = a._emscripten_bind_btEmptyShape_btEmptyShape_0 = function () {
							return (Zm = a._emscripten_bind_btEmptyShape_btEmptyShape_0 =
								a.asm.Xk).apply(null, arguments)
						},
						$m = a._emscripten_bind_btEmptyShape_setLocalScaling_1 = function () {
							return ($m = a._emscripten_bind_btEmptyShape_setLocalScaling_1 = a.asm.Yk).apply(null, arguments)
						},
						an = a._emscripten_bind_btEmptyShape_getLocalScaling_0 = function () {
							return (an = a._emscripten_bind_btEmptyShape_getLocalScaling_0 = a.asm.Zk).apply(null, arguments)
						},
						bn = a._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = function () {
							return (bn = a._emscripten_bind_btEmptyShape_calculateLocalInertia_2 = a.asm._k).apply(null,
								arguments)
						},
						cn = a._emscripten_bind_btEmptyShape___destroy___0 = function () {
							return (cn = a._emscripten_bind_btEmptyShape___destroy___0 = a.asm.$k).apply(null, arguments)
						},
						dn = a._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = function () {
							return (dn = a._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = a.asm.al).apply(null, arguments)
						},
						en = a._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = function () {
							return (en = a._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 = a.asm.bl).apply(null, arguments)
						},
						fn = a._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = function () {
							return (fn = a._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = a.asm.cl).apply(null, arguments)
						},
						gn = a._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = function () {
							return (gn = a._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = a.asm.dl).apply(null, arguments)
						},
						hn = a._emscripten_bind_btStaticPlaneShape___destroy___0 = function () {
							return (hn = a._emscripten_bind_btStaticPlaneShape___destroy___0 = a.asm.el).apply(null, arguments)
						},
						jn = a._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = function () {
							return (jn = a._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = a.asm.fl).apply(null, arguments)
						},
						kn = a._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = function () {
							return (kn = a._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = a.asm.gl).apply(null, arguments)
						},
						ln = a._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = function () {
							return (ln = a._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 =
								a.asm.hl).apply(null, arguments)
						},
						mn = a._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = function () {
							return (mn = a._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = a.asm.il).apply(null, arguments)
						},
						nn = a._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = function () {
							return (nn = a._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = a.asm.jl).apply(null, arguments)
						},
						on = a._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = function () {
							return (on = a._emscripten_bind_btBvhTriangleMeshShape___destroy___0 =
								a.asm.kl).apply(null, arguments)
						},
						pn = a._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = function () {
							return (pn = a._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = a.asm.ll).apply(null, arguments)
						},
						qn = a._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = function () {
							return (qn = a._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = a.asm.ml).apply(null, arguments)
						},
						rn = a._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = function () {
							return (rn = a._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 =
								a.asm.nl).apply(null, arguments)
						},
						sn = a._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = function () {
							return (sn = a._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = a.asm.ol).apply(null, arguments)
						},
						tn = a._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = function () {
							return (tn = a._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = a.asm.pl).apply(null, arguments)
						},
						un = a._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = function () {
							return (un = a._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 =
								a.asm.ql).apply(null, arguments)
						},
						vn = a._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = function () {
							return (vn = a._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = a.asm.rl).apply(null, arguments)
						},
						wn = a._emscripten_bind_btAABB_btAABB_4 = function () {
							return (wn = a._emscripten_bind_btAABB_btAABB_4 = a.asm.sl).apply(null, arguments)
						},
						xn = a._emscripten_bind_btAABB_invalidate_0 = function () {
							return (xn = a._emscripten_bind_btAABB_invalidate_0 = a.asm.tl).apply(null, arguments)
						},
						yn = a._emscripten_bind_btAABB_increment_margin_1 =
						function () {
							return (yn = a._emscripten_bind_btAABB_increment_margin_1 = a.asm.ul).apply(null, arguments)
						},
						zn = a._emscripten_bind_btAABB_copy_with_margin_2 = function () {
							return (zn = a._emscripten_bind_btAABB_copy_with_margin_2 = a.asm.vl).apply(null, arguments)
						},
						An = a._emscripten_bind_btAABB___destroy___0 = function () {
							return (An = a._emscripten_bind_btAABB___destroy___0 = a.asm.wl).apply(null, arguments)
						},
						Bn = a._emscripten_bind_btPrimitiveTriangle_btPrimitiveTriangle_0 = function () {
							return (Bn = a._emscripten_bind_btPrimitiveTriangle_btPrimitiveTriangle_0 =
								a.asm.xl).apply(null, arguments)
						},
						Cn = a._emscripten_bind_btPrimitiveTriangle___destroy___0 = function () {
							return (Cn = a._emscripten_bind_btPrimitiveTriangle___destroy___0 = a.asm.yl).apply(null, arguments)
						},
						Dn = a._emscripten_bind_btTriangleShapeEx_btTriangleShapeEx_3 = function () {
							return (Dn = a._emscripten_bind_btTriangleShapeEx_btTriangleShapeEx_3 = a.asm.zl).apply(null, arguments)
						},
						En = a._emscripten_bind_btTriangleShapeEx_getAabb_3 = function () {
							return (En = a._emscripten_bind_btTriangleShapeEx_getAabb_3 = a.asm.Al).apply(null,
								arguments)
						},
						Fn = a._emscripten_bind_btTriangleShapeEx_applyTransform_1 = function () {
							return (Fn = a._emscripten_bind_btTriangleShapeEx_applyTransform_1 = a.asm.Bl).apply(null, arguments)
						},
						Gn = a._emscripten_bind_btTriangleShapeEx_buildTriPlane_1 = function () {
							return (Gn = a._emscripten_bind_btTriangleShapeEx_buildTriPlane_1 = a.asm.Cl).apply(null, arguments)
						},
						Hn = a._emscripten_bind_btTriangleShapeEx___destroy___0 = function () {
							return (Hn = a._emscripten_bind_btTriangleShapeEx___destroy___0 = a.asm.Dl).apply(null, arguments)
						},
						In =
						a._emscripten_bind_btTetrahedronShapeEx_btTetrahedronShapeEx_0 = function () {
							return (In = a._emscripten_bind_btTetrahedronShapeEx_btTetrahedronShapeEx_0 = a.asm.El).apply(null, arguments)
						},
						Jn = a._emscripten_bind_btTetrahedronShapeEx_setVertices_4 = function () {
							return (Jn = a._emscripten_bind_btTetrahedronShapeEx_setVertices_4 = a.asm.Fl).apply(null, arguments)
						},
						Kn = a._emscripten_bind_btTetrahedronShapeEx___destroy___0 = function () {
							return (Kn = a._emscripten_bind_btTetrahedronShapeEx___destroy___0 = a.asm.Gl).apply(null, arguments)
						},
						Ln = a._emscripten_bind_CompoundPrimitiveManager_get_primitive_count_0 = function () {
							return (Ln = a._emscripten_bind_CompoundPrimitiveManager_get_primitive_count_0 = a.asm.Hl).apply(null, arguments)
						},
						Mn = a._emscripten_bind_CompoundPrimitiveManager_get_primitive_box_2 = function () {
							return (Mn = a._emscripten_bind_CompoundPrimitiveManager_get_primitive_box_2 = a.asm.Il).apply(null, arguments)
						},
						Nn = a._emscripten_bind_CompoundPrimitiveManager_get_primitive_triangle_2 = function () {
							return (Nn = a._emscripten_bind_CompoundPrimitiveManager_get_primitive_triangle_2 =
								a.asm.Jl).apply(null, arguments)
						},
						On = a._emscripten_bind_CompoundPrimitiveManager_is_trimesh_0 = function () {
							return (On = a._emscripten_bind_CompoundPrimitiveManager_is_trimesh_0 = a.asm.Kl).apply(null, arguments)
						},
						Pn = a._emscripten_bind_CompoundPrimitiveManager_get_m_compoundShape_0 = function () {
							return (Pn = a._emscripten_bind_CompoundPrimitiveManager_get_m_compoundShape_0 = a.asm.Ll).apply(null, arguments)
						},
						Qn = a._emscripten_bind_CompoundPrimitiveManager_set_m_compoundShape_1 = function () {
							return (Qn = a._emscripten_bind_CompoundPrimitiveManager_set_m_compoundShape_1 =
								a.asm.Ml).apply(null, arguments)
						},
						Rn = a._emscripten_bind_CompoundPrimitiveManager___destroy___0 = function () {
							return (Rn = a._emscripten_bind_CompoundPrimitiveManager___destroy___0 = a.asm.Nl).apply(null, arguments)
						},
						Sn = a._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_0 = function () {
							return (Sn = a._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_0 = a.asm.Ol).apply(null, arguments)
						},
						Tn = a._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_1 = function () {
							return (Tn = a._emscripten_bind_btGImpactCompoundShape_btGImpactCompoundShape_1 =
								a.asm.Pl).apply(null, arguments)
						},
						Un = a._emscripten_bind_btGImpactCompoundShape_childrenHasTransform_0 = function () {
							return (Un = a._emscripten_bind_btGImpactCompoundShape_childrenHasTransform_0 = a.asm.Ql).apply(null, arguments)
						},
						Vn = a._emscripten_bind_btGImpactCompoundShape_getPrimitiveManager_0 = function () {
							return (Vn = a._emscripten_bind_btGImpactCompoundShape_getPrimitiveManager_0 = a.asm.Rl).apply(null, arguments)
						},
						Wn = a._emscripten_bind_btGImpactCompoundShape_getCompoundPrimitiveManager_0 = function () {
							return (Wn =
								a._emscripten_bind_btGImpactCompoundShape_getCompoundPrimitiveManager_0 = a.asm.Sl).apply(null, arguments)
						},
						Xn = a._emscripten_bind_btGImpactCompoundShape_getNumChildShapes_0 = function () {
							return (Xn = a._emscripten_bind_btGImpactCompoundShape_getNumChildShapes_0 = a.asm.Tl).apply(null, arguments)
						},
						Yn = a._emscripten_bind_btGImpactCompoundShape_addChildShape_2 = function () {
							return (Yn = a._emscripten_bind_btGImpactCompoundShape_addChildShape_2 = a.asm.Ul).apply(null, arguments)
						},
						Zn = a._emscripten_bind_btGImpactCompoundShape_getChildShape_1 =
						function () {
							return (Zn = a._emscripten_bind_btGImpactCompoundShape_getChildShape_1 = a.asm.Vl).apply(null, arguments)
						},
						$n = a._emscripten_bind_btGImpactCompoundShape_getChildAabb_4 = function () {
							return ($n = a._emscripten_bind_btGImpactCompoundShape_getChildAabb_4 = a.asm.Wl).apply(null, arguments)
						},
						ao = a._emscripten_bind_btGImpactCompoundShape_getChildTransform_1 = function () {
							return (ao = a._emscripten_bind_btGImpactCompoundShape_getChildTransform_1 = a.asm.Xl).apply(null, arguments)
						},
						bo = a._emscripten_bind_btGImpactCompoundShape_setChildTransform_2 =
						function () {
							return (bo = a._emscripten_bind_btGImpactCompoundShape_setChildTransform_2 = a.asm.Yl).apply(null, arguments)
						},
						co = a._emscripten_bind_btGImpactCompoundShape_calculateLocalInertia_2 = function () {
							return (co = a._emscripten_bind_btGImpactCompoundShape_calculateLocalInertia_2 = a.asm.Zl).apply(null, arguments)
						},
						eo = a._emscripten_bind_btGImpactCompoundShape_getName_0 = function () {
							return (eo = a._emscripten_bind_btGImpactCompoundShape_getName_0 = a.asm._l).apply(null, arguments)
						},
						fo = a._emscripten_bind_btGImpactCompoundShape_getGImpactShapeType_0 =
						function () {
							return (fo = a._emscripten_bind_btGImpactCompoundShape_getGImpactShapeType_0 = a.asm.$l).apply(null, arguments)
						},
						go = a._emscripten_bind_btGImpactCompoundShape_setLocalScaling_1 = function () {
							return (go = a._emscripten_bind_btGImpactCompoundShape_setLocalScaling_1 = a.asm.am).apply(null, arguments)
						},
						ho = a._emscripten_bind_btGImpactCompoundShape_getLocalScaling_0 = function () {
							return (ho = a._emscripten_bind_btGImpactCompoundShape_getLocalScaling_0 = a.asm.bm).apply(null, arguments)
						},
						io = a._emscripten_bind_btGImpactCompoundShape_updateBound_0 =
						function () {
							return (io = a._emscripten_bind_btGImpactCompoundShape_updateBound_0 = a.asm.cm).apply(null, arguments)
						},
						jo = a._emscripten_bind_btGImpactCompoundShape_postUpdate_0 = function () {
							return (jo = a._emscripten_bind_btGImpactCompoundShape_postUpdate_0 = a.asm.dm).apply(null, arguments)
						},
						ko = a._emscripten_bind_btGImpactCompoundShape_getShapeType_0 = function () {
							return (ko = a._emscripten_bind_btGImpactCompoundShape_getShapeType_0 = a.asm.em).apply(null, arguments)
						},
						lo = a._emscripten_bind_btGImpactCompoundShape_needsRetrieveTriangles_0 =
						function () {
							return (lo = a._emscripten_bind_btGImpactCompoundShape_needsRetrieveTriangles_0 = a.asm.fm).apply(null, arguments)
						},
						mo = a._emscripten_bind_btGImpactCompoundShape_needsRetrieveTetrahedrons_0 = function () {
							return (mo = a._emscripten_bind_btGImpactCompoundShape_needsRetrieveTetrahedrons_0 = a.asm.gm).apply(null, arguments)
						},
						no = a._emscripten_bind_btGImpactCompoundShape_getBulletTriangle_2 = function () {
							return (no = a._emscripten_bind_btGImpactCompoundShape_getBulletTriangle_2 = a.asm.hm).apply(null, arguments)
						},
						oo =
						a._emscripten_bind_btGImpactCompoundShape_getBulletTetrahedron_2 = function () {
							return (oo = a._emscripten_bind_btGImpactCompoundShape_getBulletTetrahedron_2 = a.asm.im).apply(null, arguments)
						},
						po = a._emscripten_bind_btGImpactCompoundShape___destroy___0 = function () {
							return (po = a._emscripten_bind_btGImpactCompoundShape___destroy___0 = a.asm.jm).apply(null, arguments)
						},
						qo = a._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_0 = function () {
							return (qo = a._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_0 =
								a.asm.km).apply(null, arguments)
						},
						ro = a._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_1 = function () {
							return (ro = a._emscripten_bind_TrimeshPrimitiveManager_TrimeshPrimitiveManager_1 = a.asm.lm).apply(null, arguments)
						},
						so = a._emscripten_bind_TrimeshPrimitiveManager_lock_0 = function () {
							return (so = a._emscripten_bind_TrimeshPrimitiveManager_lock_0 = a.asm.mm).apply(null, arguments)
						},
						to = a._emscripten_bind_TrimeshPrimitiveManager_unlock_0 = function () {
							return (to = a._emscripten_bind_TrimeshPrimitiveManager_unlock_0 =
								a.asm.nm).apply(null, arguments)
						},
						uo = a._emscripten_bind_TrimeshPrimitiveManager_is_trimesh_0 = function () {
							return (uo = a._emscripten_bind_TrimeshPrimitiveManager_is_trimesh_0 = a.asm.om).apply(null, arguments)
						},
						vo = a._emscripten_bind_TrimeshPrimitiveManager_get_vertex_count_0 = function () {
							return (vo = a._emscripten_bind_TrimeshPrimitiveManager_get_vertex_count_0 = a.asm.pm).apply(null, arguments)
						},
						wo = a._emscripten_bind_TrimeshPrimitiveManager_get_indices_4 = function () {
							return (wo = a._emscripten_bind_TrimeshPrimitiveManager_get_indices_4 =
								a.asm.qm).apply(null, arguments)
						},
						xo = a._emscripten_bind_TrimeshPrimitiveManager_get_vertex_2 = function () {
							return (xo = a._emscripten_bind_TrimeshPrimitiveManager_get_vertex_2 = a.asm.rm).apply(null, arguments)
						},
						yo = a._emscripten_bind_TrimeshPrimitiveManager_get_bullet_triangle_2 = function () {
							return (yo = a._emscripten_bind_TrimeshPrimitiveManager_get_bullet_triangle_2 = a.asm.sm).apply(null, arguments)
						},
						zo = a._emscripten_bind_TrimeshPrimitiveManager_get_m_margin_0 = function () {
							return (zo = a._emscripten_bind_TrimeshPrimitiveManager_get_m_margin_0 =
								a.asm.tm).apply(null, arguments)
						},
						Ao = a._emscripten_bind_TrimeshPrimitiveManager_set_m_margin_1 = function () {
							return (Ao = a._emscripten_bind_TrimeshPrimitiveManager_set_m_margin_1 = a.asm.um).apply(null, arguments)
						},
						Bo = a._emscripten_bind_TrimeshPrimitiveManager_get_m_meshInterface_0 = function () {
							return (Bo = a._emscripten_bind_TrimeshPrimitiveManager_get_m_meshInterface_0 = a.asm.vm).apply(null, arguments)
						},
						Co = a._emscripten_bind_TrimeshPrimitiveManager_set_m_meshInterface_1 = function () {
							return (Co = a._emscripten_bind_TrimeshPrimitiveManager_set_m_meshInterface_1 =
								a.asm.wm).apply(null, arguments)
						},
						Do = a._emscripten_bind_TrimeshPrimitiveManager_get_m_part_0 = function () {
							return (Do = a._emscripten_bind_TrimeshPrimitiveManager_get_m_part_0 = a.asm.xm).apply(null, arguments)
						},
						Eo = a._emscripten_bind_TrimeshPrimitiveManager_set_m_part_1 = function () {
							return (Eo = a._emscripten_bind_TrimeshPrimitiveManager_set_m_part_1 = a.asm.ym).apply(null, arguments)
						},
						Fo = a._emscripten_bind_TrimeshPrimitiveManager_get_m_lock_count_0 = function () {
							return (Fo = a._emscripten_bind_TrimeshPrimitiveManager_get_m_lock_count_0 =
								a.asm.zm).apply(null, arguments)
						},
						Go = a._emscripten_bind_TrimeshPrimitiveManager_set_m_lock_count_1 = function () {
							return (Go = a._emscripten_bind_TrimeshPrimitiveManager_set_m_lock_count_1 = a.asm.Am).apply(null, arguments)
						},
						Ho = a._emscripten_bind_TrimeshPrimitiveManager_get_numverts_0 = function () {
							return (Ho = a._emscripten_bind_TrimeshPrimitiveManager_get_numverts_0 = a.asm.Bm).apply(null, arguments)
						},
						Io = a._emscripten_bind_TrimeshPrimitiveManager_set_numverts_1 = function () {
							return (Io = a._emscripten_bind_TrimeshPrimitiveManager_set_numverts_1 =
								a.asm.Cm).apply(null, arguments)
						},
						Jo = a._emscripten_bind_TrimeshPrimitiveManager_get_type_0 = function () {
							return (Jo = a._emscripten_bind_TrimeshPrimitiveManager_get_type_0 = a.asm.Dm).apply(null, arguments)
						},
						Ko = a._emscripten_bind_TrimeshPrimitiveManager_set_type_1 = function () {
							return (Ko = a._emscripten_bind_TrimeshPrimitiveManager_set_type_1 = a.asm.Em).apply(null, arguments)
						},
						Lo = a._emscripten_bind_TrimeshPrimitiveManager_get_stride_0 = function () {
							return (Lo = a._emscripten_bind_TrimeshPrimitiveManager_get_stride_0 = a.asm.Fm).apply(null,
								arguments)
						},
						Mo = a._emscripten_bind_TrimeshPrimitiveManager_set_stride_1 = function () {
							return (Mo = a._emscripten_bind_TrimeshPrimitiveManager_set_stride_1 = a.asm.Gm).apply(null, arguments)
						},
						No = a._emscripten_bind_TrimeshPrimitiveManager_get_indexstride_0 = function () {
							return (No = a._emscripten_bind_TrimeshPrimitiveManager_get_indexstride_0 = a.asm.Hm).apply(null, arguments)
						},
						Oo = a._emscripten_bind_TrimeshPrimitiveManager_set_indexstride_1 = function () {
							return (Oo = a._emscripten_bind_TrimeshPrimitiveManager_set_indexstride_1 =
								a.asm.Im).apply(null, arguments)
						},
						Po = a._emscripten_bind_TrimeshPrimitiveManager_get_numfaces_0 = function () {
							return (Po = a._emscripten_bind_TrimeshPrimitiveManager_get_numfaces_0 = a.asm.Jm).apply(null, arguments)
						},
						Qo = a._emscripten_bind_TrimeshPrimitiveManager_set_numfaces_1 = function () {
							return (Qo = a._emscripten_bind_TrimeshPrimitiveManager_set_numfaces_1 = a.asm.Km).apply(null, arguments)
						},
						Ro = a._emscripten_bind_TrimeshPrimitiveManager_get_indicestype_0 = function () {
							return (Ro = a._emscripten_bind_TrimeshPrimitiveManager_get_indicestype_0 =
								a.asm.Lm).apply(null, arguments)
						},
						So = a._emscripten_bind_TrimeshPrimitiveManager_set_indicestype_1 = function () {
							return (So = a._emscripten_bind_TrimeshPrimitiveManager_set_indicestype_1 = a.asm.Mm).apply(null, arguments)
						},
						To = a._emscripten_bind_TrimeshPrimitiveManager___destroy___0 = function () {
							return (To = a._emscripten_bind_TrimeshPrimitiveManager___destroy___0 = a.asm.Nm).apply(null, arguments)
						},
						Uo = a._emscripten_bind_btGImpactMeshShapePart_btGImpactMeshShapePart_2 = function () {
							return (Uo = a._emscripten_bind_btGImpactMeshShapePart_btGImpactMeshShapePart_2 =
								a.asm.Om).apply(null, arguments)
						},
						Vo = a._emscripten_bind_btGImpactMeshShapePart_getTrimeshPrimitiveManager_0 = function () {
							return (Vo = a._emscripten_bind_btGImpactMeshShapePart_getTrimeshPrimitiveManager_0 = a.asm.Pm).apply(null, arguments)
						},
						Wo = a._emscripten_bind_btGImpactMeshShapePart_getVertexCount_0 = function () {
							return (Wo = a._emscripten_bind_btGImpactMeshShapePart_getVertexCount_0 = a.asm.Qm).apply(null, arguments)
						},
						Xo = a._emscripten_bind_btGImpactMeshShapePart_getVertex_2 = function () {
							return (Xo = a._emscripten_bind_btGImpactMeshShapePart_getVertex_2 =
								a.asm.Rm).apply(null, arguments)
						},
						Yo = a._emscripten_bind_btGImpactMeshShapePart_getPart_0 = function () {
							return (Yo = a._emscripten_bind_btGImpactMeshShapePart_getPart_0 = a.asm.Sm).apply(null, arguments)
						},
						Zo = a._emscripten_bind_btGImpactMeshShapePart_setLocalScaling_1 = function () {
							return (Zo = a._emscripten_bind_btGImpactMeshShapePart_setLocalScaling_1 = a.asm.Tm).apply(null, arguments)
						},
						$o = a._emscripten_bind_btGImpactMeshShapePart_getLocalScaling_0 = function () {
							return ($o = a._emscripten_bind_btGImpactMeshShapePart_getLocalScaling_0 =
								a.asm.Um).apply(null, arguments)
						},
						ap = a._emscripten_bind_btGImpactMeshShapePart_updateBound_0 = function () {
							return (ap = a._emscripten_bind_btGImpactMeshShapePart_updateBound_0 = a.asm.Vm).apply(null, arguments)
						},
						bp = a._emscripten_bind_btGImpactMeshShapePart_postUpdate_0 = function () {
							return (bp = a._emscripten_bind_btGImpactMeshShapePart_postUpdate_0 = a.asm.Wm).apply(null, arguments)
						},
						cp = a._emscripten_bind_btGImpactMeshShapePart_getShapeType_0 = function () {
							return (cp = a._emscripten_bind_btGImpactMeshShapePart_getShapeType_0 =
								a.asm.Xm).apply(null, arguments)
						},
						dp = a._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTriangles_0 = function () {
							return (dp = a._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTriangles_0 = a.asm.Ym).apply(null, arguments)
						},
						ep = a._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTetrahedrons_0 = function () {
							return (ep = a._emscripten_bind_btGImpactMeshShapePart_needsRetrieveTetrahedrons_0 = a.asm.Zm).apply(null, arguments)
						},
						fp = a._emscripten_bind_btGImpactMeshShapePart_getBulletTriangle_2 = function () {
							return (fp =
								a._emscripten_bind_btGImpactMeshShapePart_getBulletTriangle_2 = a.asm._m).apply(null, arguments)
						},
						gp = a._emscripten_bind_btGImpactMeshShapePart_getBulletTetrahedron_2 = function () {
							return (gp = a._emscripten_bind_btGImpactMeshShapePart_getBulletTetrahedron_2 = a.asm.$m).apply(null, arguments)
						},
						hp = a._emscripten_bind_btGImpactMeshShapePart___destroy___0 = function () {
							return (hp = a._emscripten_bind_btGImpactMeshShapePart___destroy___0 = a.asm.an).apply(null, arguments)
						},
						ip = a._emscripten_bind_btGImpactMeshShape_btGImpactMeshShape_1 =
						function () {
							return (ip = a._emscripten_bind_btGImpactMeshShape_btGImpactMeshShape_1 = a.asm.bn).apply(null, arguments)
						},
						jp = a._emscripten_bind_btGImpactMeshShape_getMeshInterface_0 = function () {
							return (jp = a._emscripten_bind_btGImpactMeshShape_getMeshInterface_0 = a.asm.cn).apply(null, arguments)
						},
						kp = a._emscripten_bind_btGImpactMeshShape_getMeshPartCount_0 = function () {
							return (kp = a._emscripten_bind_btGImpactMeshShape_getMeshPartCount_0 = a.asm.dn).apply(null, arguments)
						},
						lp = a._emscripten_bind_btGImpactMeshShape_getMeshPart_1 =
						function () {
							return (lp = a._emscripten_bind_btGImpactMeshShape_getMeshPart_1 = a.asm.en).apply(null, arguments)
						},
						mp = a._emscripten_bind_btGImpactMeshShape_calculateSerializeBufferSize_0 = function () {
							return (mp = a._emscripten_bind_btGImpactMeshShape_calculateSerializeBufferSize_0 = a.asm.fn).apply(null, arguments)
						},
						np = a._emscripten_bind_btGImpactMeshShape_setLocalScaling_1 = function () {
							return (np = a._emscripten_bind_btGImpactMeshShape_setLocalScaling_1 = a.asm.gn).apply(null, arguments)
						},
						op = a._emscripten_bind_btGImpactMeshShape_getLocalScaling_0 =
						function () {
							return (op = a._emscripten_bind_btGImpactMeshShape_getLocalScaling_0 = a.asm.hn).apply(null, arguments)
						},
						pp = a._emscripten_bind_btGImpactMeshShape_updateBound_0 = function () {
							return (pp = a._emscripten_bind_btGImpactMeshShape_updateBound_0 = a.asm.jn).apply(null, arguments)
						},
						qp = a._emscripten_bind_btGImpactMeshShape_postUpdate_0 = function () {
							return (qp = a._emscripten_bind_btGImpactMeshShape_postUpdate_0 = a.asm.kn).apply(null, arguments)
						},
						rp = a._emscripten_bind_btGImpactMeshShape_getShapeType_0 = function () {
							return (rp =
								a._emscripten_bind_btGImpactMeshShape_getShapeType_0 = a.asm.ln).apply(null, arguments)
						},
						sp = a._emscripten_bind_btGImpactMeshShape_needsRetrieveTriangles_0 = function () {
							return (sp = a._emscripten_bind_btGImpactMeshShape_needsRetrieveTriangles_0 = a.asm.mn).apply(null, arguments)
						},
						tp = a._emscripten_bind_btGImpactMeshShape_needsRetrieveTetrahedrons_0 = function () {
							return (tp = a._emscripten_bind_btGImpactMeshShape_needsRetrieveTetrahedrons_0 = a.asm.nn).apply(null, arguments)
						},
						up = a._emscripten_bind_btGImpactMeshShape_getBulletTriangle_2 =
						function () {
							return (up = a._emscripten_bind_btGImpactMeshShape_getBulletTriangle_2 = a.asm.on).apply(null, arguments)
						},
						vp = a._emscripten_bind_btGImpactMeshShape_getBulletTetrahedron_2 = function () {
							return (vp = a._emscripten_bind_btGImpactMeshShape_getBulletTetrahedron_2 = a.asm.pn).apply(null, arguments)
						},
						wp = a._emscripten_bind_btGImpactMeshShape___destroy___0 = function () {
							return (wp = a._emscripten_bind_btGImpactMeshShape___destroy___0 = a.asm.qn).apply(null, arguments)
						},
						xp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_0 =
						function () {
							return (xp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_0 = a.asm.rn).apply(null, arguments)
						},
						yp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_2 = function () {
							return (yp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_2 = a.asm.sn).apply(null, arguments)
						},
						zp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_dispatcher1_0 = function () {
							return (zp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_dispatcher1_0 =
								a.asm.tn).apply(null, arguments)
						},
						Ap = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_dispatcher1_1 = function () {
							return (Ap = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_dispatcher1_1 = a.asm.un).apply(null, arguments)
						},
						Bp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_manifold_0 = function () {
							return (Bp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_get_m_manifold_0 = a.asm.vn).apply(null, arguments)
						},
						Cp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_manifold_1 =
						function () {
							return (Cp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo_set_m_manifold_1 = a.asm.wn).apply(null, arguments)
						},
						Dp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo___destroy___0 = function () {
							return (Dp = a._emscripten_bind_btCollisionAlgorithmConstructionInfo___destroy___0 = a.asm.xn).apply(null, arguments)
						},
						Ep = a._emscripten_bind_btGImpactCollisionAlgorithm_btGImpactCollisionAlgorithm_3 = function () {
							return (Ep = a._emscripten_bind_btGImpactCollisionAlgorithm_btGImpactCollisionAlgorithm_3 =
								a.asm.yn).apply(null, arguments)
						},
						Fp = a._emscripten_bind_btGImpactCollisionAlgorithm_registerAlgorithm_1 = function () {
							return (Fp = a._emscripten_bind_btGImpactCollisionAlgorithm_registerAlgorithm_1 = a.asm.zn).apply(null, arguments)
						},
						Gp = a._emscripten_bind_btGImpactCollisionAlgorithm___destroy___0 = function () {
							return (Gp = a._emscripten_bind_btGImpactCollisionAlgorithm___destroy___0 = a.asm.An).apply(null, arguments)
						},
						Hp = a._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = function () {
							return (Hp =
								a._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 = a.asm.Bn).apply(null, arguments)
						},
						Ip = a._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = function () {
							return (Ip = a._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = a.asm.Cn).apply(null, arguments)
						},
						Jp = a._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = function () {
							return (Jp = a._emscripten_bind_btPersistentManifold_btPersistentManifold_0 = a.asm.Dn).apply(null, arguments)
						},
						Kp =
						a._emscripten_bind_btPersistentManifold_getBody0_0 = function () {
							return (Kp = a._emscripten_bind_btPersistentManifold_getBody0_0 = a.asm.En).apply(null, arguments)
						},
						Lp = a._emscripten_bind_btPersistentManifold_getBody1_0 = function () {
							return (Lp = a._emscripten_bind_btPersistentManifold_getBody1_0 = a.asm.Fn).apply(null, arguments)
						},
						Mp = a._emscripten_bind_btPersistentManifold_getNumContacts_0 = function () {
							return (Mp = a._emscripten_bind_btPersistentManifold_getNumContacts_0 = a.asm.Gn).apply(null, arguments)
						},
						Np = a._emscripten_bind_btPersistentManifold_getContactPoint_1 =
						function () {
							return (Np = a._emscripten_bind_btPersistentManifold_getContactPoint_1 = a.asm.Hn).apply(null, arguments)
						},
						Op = a._emscripten_bind_btPersistentManifold___destroy___0 = function () {
							return (Op = a._emscripten_bind_btPersistentManifold___destroy___0 = a.asm.In).apply(null, arguments)
						},
						Pp = a._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = function () {
							return (Pp = a._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = a.asm.Jn).apply(null, arguments)
						},
						Qp = a._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 =
						function () {
							return (Qp = a._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = a.asm.Kn).apply(null, arguments)
						},
						Rp = a._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = function () {
							return (Rp = a._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = a.asm.Ln).apply(null, arguments)
						},
						Sp = a._emscripten_bind_btCollisionDispatcher___destroy___0 = function () {
							return (Sp = a._emscripten_bind_btCollisionDispatcher___destroy___0 = a.asm.Mn).apply(null, arguments)
						},
						Tp = a._emscripten_bind_btOverlappingPairCallback___destroy___0 =
						function () {
							return (Tp = a._emscripten_bind_btOverlappingPairCallback___destroy___0 = a.asm.Nn).apply(null, arguments)
						},
						Up = a._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = function () {
							return (Up = a._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 = a.asm.On).apply(null, arguments)
						},
						Vp = a._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = function () {
							return (Vp = a._emscripten_bind_btOverlappingPairCache_getNumOverlappingPairs_0 = a.asm.Pn).apply(null, arguments)
						},
						Wp = a._emscripten_bind_btOverlappingPairCache___destroy___0 = function () {
							return (Wp = a._emscripten_bind_btOverlappingPairCache___destroy___0 = a.asm.Qn).apply(null, arguments)
						},
						Xp = a._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = function () {
							return (Xp = a._emscripten_bind_btAxisSweep3_btAxisSweep3_2 = a.asm.Rn).apply(null, arguments)
						},
						Yp = a._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = function () {
							return (Yp = a._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = a.asm.Sn).apply(null, arguments)
						},
						Zp = a._emscripten_bind_btAxisSweep3_btAxisSweep3_4 =
						function () {
							return (Zp = a._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = a.asm.Tn).apply(null, arguments)
						},
						$p = a._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = function () {
							return ($p = a._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = a.asm.Un).apply(null, arguments)
						},
						aq = a._emscripten_bind_btAxisSweep3___destroy___0 = function () {
							return (aq = a._emscripten_bind_btAxisSweep3___destroy___0 = a.asm.Vn).apply(null, arguments)
						},
						bq = a._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 = function () {
							return (bq = a._emscripten_bind_btBroadphaseInterface_getOverlappingPairCache_0 =
								a.asm.Wn).apply(null, arguments)
						},
						cq = a._emscripten_bind_btBroadphaseInterface___destroy___0 = function () {
							return (cq = a._emscripten_bind_btBroadphaseInterface___destroy___0 = a.asm.Xn).apply(null, arguments)
						},
						dq = a._emscripten_bind_btCollisionConfiguration___destroy___0 = function () {
							return (dq = a._emscripten_bind_btCollisionConfiguration___destroy___0 = a.asm.Yn).apply(null, arguments)
						},
						eq = a._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = function () {
							return (eq = a._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 =
								a.asm.Zn).apply(null, arguments)
						},
						fq = a._emscripten_bind_btDbvtBroadphase___destroy___0 = function () {
							return (fq = a._emscripten_bind_btDbvtBroadphase___destroy___0 = a.asm._n).apply(null, arguments)
						},
						gq = a._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = function () {
							return (gq = a._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = a.asm.$n).apply(null, arguments)
						},
						hq = a._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 = function () {
							return (hq = a._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 =
								a.asm.ao).apply(null, arguments)
						},
						iq = a._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = function () {
							return (iq = a._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = a.asm.bo).apply(null, arguments)
						},
						jq = a._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = function () {
							return (jq = a._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = a.asm.co).apply(null, arguments)
						},
						kq = a._emscripten_bind_btBroadphaseProxy___destroy___0 = function () {
							return (kq = a._emscripten_bind_btBroadphaseProxy___destroy___0 =
								a.asm.eo).apply(null, arguments)
						},
						lq = a._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = function () {
							return (lq = a._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = a.asm.fo).apply(null, arguments)
						},
						mq = a._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = function () {
							return (mq = a._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = a.asm.go).apply(null, arguments)
						},
						nq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 =
						function () {
							return (nq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = a.asm.ho).apply(null, arguments)
						},
						oq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = function () {
							return (oq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = a.asm.io).apply(null, arguments)
						},
						pq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = function () {
							return (pq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = a.asm.jo).apply(null,
								arguments)
						},
						qq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = function () {
							return (qq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = a.asm.ko).apply(null, arguments)
						},
						rq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = function () {
							return (rq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 = a.asm.lo).apply(null, arguments)
						},
						sq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 = function () {
							return (sq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 =
								a.asm.mo).apply(null, arguments)
						},
						tq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = function () {
							return (tq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = a.asm.no).apply(null, arguments)
						},
						uq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = function () {
							return (uq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = a.asm.oo).apply(null, arguments)
						},
						vq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 =
						function () {
							return (vq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = a.asm.po).apply(null, arguments)
						},
						wq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = function () {
							return (wq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = a.asm.qo).apply(null, arguments)
						},
						xq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = function () {
							return (xq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = a.asm.ro).apply(null,
								arguments)
						},
						yq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = function () {
							return (yq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = a.asm.so).apply(null, arguments)
						},
						zq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = function () {
							return (zq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = a.asm.to).apply(null, arguments)
						},
						Aq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 =
						function () {
							return (Aq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = a.asm.uo).apply(null, arguments)
						},
						Bq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = function () {
							return (Bq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 = a.asm.vo).apply(null, arguments)
						},
						Cq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 = function () {
							return (Cq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 =
								a.asm.wo).apply(null, arguments)
						},
						Dq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = function () {
							return (Dq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = a.asm.xo).apply(null, arguments)
						},
						Eq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = function () {
							return (Eq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = a.asm.yo).apply(null, arguments)
						},
						Fq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 =
						function () {
							return (Fq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 = a.asm.zo).apply(null, arguments)
						},
						Gq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = function () {
							return (Gq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = a.asm.Ao).apply(null, arguments)
						},
						Hq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = function () {
							return (Hq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 =
								a.asm.Bo).apply(null, arguments)
						},
						Iq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = function () {
							return (Iq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = a.asm.Co).apply(null, arguments)
						},
						Jq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = function () {
							return (Jq = a._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = a.asm.Do).apply(null, arguments)
						},
						Kq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = function () {
							return (Kq = a._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = a.asm.Eo).apply(null, arguments)
						},
						Lq = a._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = function () {
							return (Lq = a._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = a.asm.Fo).apply(null, arguments)
						},
						Mq = a._emscripten_bind_btRigidBody_btRigidBody_1 = function () {
							return (Mq = a._emscripten_bind_btRigidBody_btRigidBody_1 =
								a.asm.Go).apply(null, arguments)
						},
						Nq = a._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = function () {
							return (Nq = a._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = a.asm.Ho).apply(null, arguments)
						},
						Oq = a._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = function () {
							return (Oq = a._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = a.asm.Io).apply(null, arguments)
						},
						Pq = a._emscripten_bind_btRigidBody_setSleepingThresholds_2 = function () {
							return (Pq = a._emscripten_bind_btRigidBody_setSleepingThresholds_2 =
								a.asm.Jo).apply(null, arguments)
						},
						Qq = a._emscripten_bind_btRigidBody_getLinearDamping_0 = function () {
							return (Qq = a._emscripten_bind_btRigidBody_getLinearDamping_0 = a.asm.Ko).apply(null, arguments)
						},
						Rq = a._emscripten_bind_btRigidBody_getAngularDamping_0 = function () {
							return (Rq = a._emscripten_bind_btRigidBody_getAngularDamping_0 = a.asm.Lo).apply(null, arguments)
						},
						Sq = a._emscripten_bind_btRigidBody_setDamping_2 = function () {
							return (Sq = a._emscripten_bind_btRigidBody_setDamping_2 = a.asm.Mo).apply(null, arguments)
						},
						Tq = a._emscripten_bind_btRigidBody_setMassProps_2 =
						function () {
							return (Tq = a._emscripten_bind_btRigidBody_setMassProps_2 = a.asm.No).apply(null, arguments)
						},
						Uq = a._emscripten_bind_btRigidBody_getLinearFactor_0 = function () {
							return (Uq = a._emscripten_bind_btRigidBody_getLinearFactor_0 = a.asm.Oo).apply(null, arguments)
						},
						Vq = a._emscripten_bind_btRigidBody_setLinearFactor_1 = function () {
							return (Vq = a._emscripten_bind_btRigidBody_setLinearFactor_1 = a.asm.Po).apply(null, arguments)
						},
						Wq = a._emscripten_bind_btRigidBody_applyTorque_1 = function () {
							return (Wq = a._emscripten_bind_btRigidBody_applyTorque_1 =
								a.asm.Qo).apply(null, arguments)
						},
						Xq = a._emscripten_bind_btRigidBody_applyLocalTorque_1 = function () {
							return (Xq = a._emscripten_bind_btRigidBody_applyLocalTorque_1 = a.asm.Ro).apply(null, arguments)
						},
						Yq = a._emscripten_bind_btRigidBody_applyForce_2 = function () {
							return (Yq = a._emscripten_bind_btRigidBody_applyForce_2 = a.asm.So).apply(null, arguments)
						},
						Zq = a._emscripten_bind_btRigidBody_applyCentralForce_1 = function () {
							return (Zq = a._emscripten_bind_btRigidBody_applyCentralForce_1 = a.asm.To).apply(null, arguments)
						},
						$q = a._emscripten_bind_btRigidBody_applyCentralLocalForce_1 =
						function () {
							return ($q = a._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = a.asm.Uo).apply(null, arguments)
						},
						ar = a._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = function () {
							return (ar = a._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = a.asm.Vo).apply(null, arguments)
						},
						br = a._emscripten_bind_btRigidBody_applyImpulse_2 = function () {
							return (br = a._emscripten_bind_btRigidBody_applyImpulse_2 = a.asm.Wo).apply(null, arguments)
						},
						cr = a._emscripten_bind_btRigidBody_applyCentralImpulse_1 = function () {
							return (cr = a._emscripten_bind_btRigidBody_applyCentralImpulse_1 =
								a.asm.Xo).apply(null, arguments)
						},
						dr = a._emscripten_bind_btRigidBody_updateInertiaTensor_0 = function () {
							return (dr = a._emscripten_bind_btRigidBody_updateInertiaTensor_0 = a.asm.Yo).apply(null, arguments)
						},
						er = a._emscripten_bind_btRigidBody_getLinearVelocity_0 = function () {
							return (er = a._emscripten_bind_btRigidBody_getLinearVelocity_0 = a.asm.Zo).apply(null, arguments)
						},
						fr = a._emscripten_bind_btRigidBody_getAngularVelocity_0 = function () {
							return (fr = a._emscripten_bind_btRigidBody_getAngularVelocity_0 = a.asm._o).apply(null,
								arguments)
						},
						gr = a._emscripten_bind_btRigidBody_setLinearVelocity_1 = function () {
							return (gr = a._emscripten_bind_btRigidBody_setLinearVelocity_1 = a.asm.$o).apply(null, arguments)
						},
						hr = a._emscripten_bind_btRigidBody_setAngularVelocity_1 = function () {
							return (hr = a._emscripten_bind_btRigidBody_setAngularVelocity_1 = a.asm.ap).apply(null, arguments)
						},
						ir = a._emscripten_bind_btRigidBody_getMotionState_0 = function () {
							return (ir = a._emscripten_bind_btRigidBody_getMotionState_0 = a.asm.bp).apply(null, arguments)
						},
						jr = a._emscripten_bind_btRigidBody_setMotionState_1 =
						function () {
							return (jr = a._emscripten_bind_btRigidBody_setMotionState_1 = a.asm.cp).apply(null, arguments)
						},
						kr = a._emscripten_bind_btRigidBody_getAngularFactor_0 = function () {
							return (kr = a._emscripten_bind_btRigidBody_getAngularFactor_0 = a.asm.dp).apply(null, arguments)
						},
						lr = a._emscripten_bind_btRigidBody_setAngularFactor_1 = function () {
							return (lr = a._emscripten_bind_btRigidBody_setAngularFactor_1 = a.asm.ep).apply(null, arguments)
						},
						mr = a._emscripten_bind_btRigidBody_upcast_1 = function () {
							return (mr = a._emscripten_bind_btRigidBody_upcast_1 =
								a.asm.fp).apply(null, arguments)
						},
						nr = a._emscripten_bind_btRigidBody_getAabb_2 = function () {
							return (nr = a._emscripten_bind_btRigidBody_getAabb_2 = a.asm.gp).apply(null, arguments)
						},
						or = a._emscripten_bind_btRigidBody_applyGravity_0 = function () {
							return (or = a._emscripten_bind_btRigidBody_applyGravity_0 = a.asm.hp).apply(null, arguments)
						},
						pr = a._emscripten_bind_btRigidBody_getGravity_0 = function () {
							return (pr = a._emscripten_bind_btRigidBody_getGravity_0 = a.asm.ip).apply(null, arguments)
						},
						qr = a._emscripten_bind_btRigidBody_setGravity_1 =
						function () {
							return (qr = a._emscripten_bind_btRigidBody_setGravity_1 = a.asm.jp).apply(null, arguments)
						},
						rr = a._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = function () {
							return (rr = a._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = a.asm.kp).apply(null, arguments)
						},
						sr = a._emscripten_bind_btRigidBody_clearForces_0 = function () {
							return (sr = a._emscripten_bind_btRigidBody_clearForces_0 = a.asm.lp).apply(null, arguments)
						},
						tr = a._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = function () {
							return (tr = a._emscripten_bind_btRigidBody_setAnisotropicFriction_2 =
								a.asm.mp).apply(null, arguments)
						},
						ur = a._emscripten_bind_btRigidBody_getCollisionShape_0 = function () {
							return (ur = a._emscripten_bind_btRigidBody_getCollisionShape_0 = a.asm.np).apply(null, arguments)
						},
						vr = a._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = function () {
							return (vr = a._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 = a.asm.op).apply(null, arguments)
						},
						wr = a._emscripten_bind_btRigidBody_setActivationState_1 = function () {
							return (wr = a._emscripten_bind_btRigidBody_setActivationState_1 =
								a.asm.pp).apply(null, arguments)
						},
						xr = a._emscripten_bind_btRigidBody_forceActivationState_1 = function () {
							return (xr = a._emscripten_bind_btRigidBody_forceActivationState_1 = a.asm.qp).apply(null, arguments)
						},
						yr = a._emscripten_bind_btRigidBody_activate_0 = function () {
							return (yr = a._emscripten_bind_btRigidBody_activate_0 = a.asm.rp).apply(null, arguments)
						},
						zr = a._emscripten_bind_btRigidBody_activate_1 = function () {
							return (zr = a._emscripten_bind_btRigidBody_activate_1 = a.asm.sp).apply(null, arguments)
						},
						Ar = a._emscripten_bind_btRigidBody_isActive_0 =
						function () {
							return (Ar = a._emscripten_bind_btRigidBody_isActive_0 = a.asm.tp).apply(null, arguments)
						},
						Br = a._emscripten_bind_btRigidBody_isKinematicObject_0 = function () {
							return (Br = a._emscripten_bind_btRigidBody_isKinematicObject_0 = a.asm.up).apply(null, arguments)
						},
						Cr = a._emscripten_bind_btRigidBody_isStaticObject_0 = function () {
							return (Cr = a._emscripten_bind_btRigidBody_isStaticObject_0 = a.asm.vp).apply(null, arguments)
						},
						Dr = a._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = function () {
							return (Dr = a._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 =
								a.asm.wp).apply(null, arguments)
						},
						Er = a._emscripten_bind_btRigidBody_getRestitution_0 = function () {
							return (Er = a._emscripten_bind_btRigidBody_getRestitution_0 = a.asm.xp).apply(null, arguments)
						},
						Fr = a._emscripten_bind_btRigidBody_getFriction_0 = function () {
							return (Fr = a._emscripten_bind_btRigidBody_getFriction_0 = a.asm.yp).apply(null, arguments)
						},
						Gr = a._emscripten_bind_btRigidBody_getRollingFriction_0 = function () {
							return (Gr = a._emscripten_bind_btRigidBody_getRollingFriction_0 = a.asm.zp).apply(null, arguments)
						},
						Hr = a._emscripten_bind_btRigidBody_setRestitution_1 =
						function () {
							return (Hr = a._emscripten_bind_btRigidBody_setRestitution_1 = a.asm.Ap).apply(null, arguments)
						},
						Ir = a._emscripten_bind_btRigidBody_setFriction_1 = function () {
							return (Ir = a._emscripten_bind_btRigidBody_setFriction_1 = a.asm.Bp).apply(null, arguments)
						},
						Jr = a._emscripten_bind_btRigidBody_setRollingFriction_1 = function () {
							return (Jr = a._emscripten_bind_btRigidBody_setRollingFriction_1 = a.asm.Cp).apply(null, arguments)
						},
						Kr = a._emscripten_bind_btRigidBody_getWorldTransform_0 = function () {
							return (Kr = a._emscripten_bind_btRigidBody_getWorldTransform_0 =
								a.asm.Dp).apply(null, arguments)
						},
						Lr = a._emscripten_bind_btRigidBody_getCollisionFlags_0 = function () {
							return (Lr = a._emscripten_bind_btRigidBody_getCollisionFlags_0 = a.asm.Ep).apply(null, arguments)
						},
						Mr = a._emscripten_bind_btRigidBody_setCollisionFlags_1 = function () {
							return (Mr = a._emscripten_bind_btRigidBody_setCollisionFlags_1 = a.asm.Fp).apply(null, arguments)
						},
						Nr = a._emscripten_bind_btRigidBody_setWorldTransform_1 = function () {
							return (Nr = a._emscripten_bind_btRigidBody_setWorldTransform_1 = a.asm.Gp).apply(null, arguments)
						},
						Or = a._emscripten_bind_btRigidBody_setCollisionShape_1 = function () {
							return (Or = a._emscripten_bind_btRigidBody_setCollisionShape_1 = a.asm.Hp).apply(null, arguments)
						},
						Pr = a._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = function () {
							return (Pr = a._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = a.asm.Ip).apply(null, arguments)
						},
						Qr = a._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = function () {
							return (Qr = a._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = a.asm.Jp).apply(null, arguments)
						},
						Rr = a._emscripten_bind_btRigidBody_getUserIndex_0 =
						function () {
							return (Rr = a._emscripten_bind_btRigidBody_getUserIndex_0 = a.asm.Kp).apply(null, arguments)
						},
						Sr = a._emscripten_bind_btRigidBody_setUserIndex_1 = function () {
							return (Sr = a._emscripten_bind_btRigidBody_setUserIndex_1 = a.asm.Lp).apply(null, arguments)
						},
						Tr = a._emscripten_bind_btRigidBody_getUserPointer_0 = function () {
							return (Tr = a._emscripten_bind_btRigidBody_getUserPointer_0 = a.asm.Mp).apply(null, arguments)
						},
						Ur = a._emscripten_bind_btRigidBody_setUserPointer_1 = function () {
							return (Ur = a._emscripten_bind_btRigidBody_setUserPointer_1 =
								a.asm.Np).apply(null, arguments)
						},
						Vr = a._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = function () {
							return (Vr = a._emscripten_bind_btRigidBody_getBroadphaseHandle_0 = a.asm.Op).apply(null, arguments)
						},
						Wr = a._emscripten_bind_btRigidBody___destroy___0 = function () {
							return (Wr = a._emscripten_bind_btRigidBody___destroy___0 = a.asm.Pp).apply(null, arguments)
						},
						Xr = a._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = function () {
							return (Xr = a._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = a.asm.Qp).apply(null,
								arguments)
						},
						Yr = a._emscripten_bind_btConstraintSetting_get_m_tau_0 = function () {
							return (Yr = a._emscripten_bind_btConstraintSetting_get_m_tau_0 = a.asm.Rp).apply(null, arguments)
						},
						Zr = a._emscripten_bind_btConstraintSetting_set_m_tau_1 = function () {
							return (Zr = a._emscripten_bind_btConstraintSetting_set_m_tau_1 = a.asm.Sp).apply(null, arguments)
						},
						$r = a._emscripten_bind_btConstraintSetting_get_m_damping_0 = function () {
							return ($r = a._emscripten_bind_btConstraintSetting_get_m_damping_0 = a.asm.Tp).apply(null, arguments)
						},
						as = a._emscripten_bind_btConstraintSetting_set_m_damping_1 =
						function () {
							return (as = a._emscripten_bind_btConstraintSetting_set_m_damping_1 = a.asm.Up).apply(null, arguments)
						},
						bs = a._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = function () {
							return (bs = a._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = a.asm.Vp).apply(null, arguments)
						},
						cs = a._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = function () {
							return (cs = a._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = a.asm.Wp).apply(null, arguments)
						},
						ds = a._emscripten_bind_btConstraintSetting___destroy___0 =
						function () {
							return (ds = a._emscripten_bind_btConstraintSetting___destroy___0 = a.asm.Xp).apply(null, arguments)
						},
						es = a._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = function () {
							return (es = a._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = a.asm.Yp).apply(null, arguments)
						},
						gs = a._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = function () {
							return (gs = a._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = a.asm.Zp).apply(null, arguments)
						},
						hs = a._emscripten_bind_btPoint2PointConstraint_setPivotA_1 =
						function () {
							return (hs = a._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = a.asm._p).apply(null, arguments)
						},
						is = a._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = function () {
							return (is = a._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = a.asm.$p).apply(null, arguments)
						},
						js = a._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = function () {
							return (js = a._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = a.asm.aq).apply(null, arguments)
						},
						ks = a._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 =
						function () {
							return (ks = a._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = a.asm.bq).apply(null, arguments)
						},
						ls = a._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = function () {
							return (ls = a._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = a.asm.cq).apply(null, arguments)
						},
						ms = a._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = function () {
							return (ms = a._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = a.asm.dq).apply(null, arguments)
						},
						ns = a._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 =
						function () {
							return (ns = a._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 = a.asm.eq).apply(null, arguments)
						},
						ps = a._emscripten_bind_btPoint2PointConstraint_getParam_2 = function () {
							return (ps = a._emscripten_bind_btPoint2PointConstraint_getParam_2 = a.asm.fq).apply(null, arguments)
						},
						qs = a._emscripten_bind_btPoint2PointConstraint_setParam_3 = function () {
							return (qs = a._emscripten_bind_btPoint2PointConstraint_setParam_3 = a.asm.gq).apply(null, arguments)
						},
						rs = a._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 =
						function () {
							return (rs = a._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = a.asm.hq).apply(null, arguments)
						},
						ss = a._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = function () {
							return (ss = a._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = a.asm.iq).apply(null, arguments)
						},
						ts = a._emscripten_bind_btPoint2PointConstraint___destroy___0 = function () {
							return (ts = a._emscripten_bind_btPoint2PointConstraint___destroy___0 = a.asm.jq).apply(null, arguments)
						},
						us = a._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 =
						function () {
							return (us = a._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = a.asm.kq).apply(null, arguments)
						},
						vs = a._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = function () {
							return (vs = a._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = a.asm.lq).apply(null, arguments)
						},
						xs = a._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = function () {
							return (xs = a._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 =
								a.asm.mq).apply(null, arguments)
						},
						ys = a._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = function () {
							return (ys = a._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = a.asm.nq).apply(null, arguments)
						},
						zs = a._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = function () {
							return (zs = a._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = a.asm.oq).apply(null, arguments)
						},
						As = a._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 = function () {
							return (As = a._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_0 =
								a.asm.pq).apply(null, arguments)
						},
						Bs = a._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = function () {
							return (Bs = a._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_1 = a.asm.qq).apply(null, arguments)
						},
						Cs = a._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = function () {
							return (Cs = a._emscripten_bind_btGeneric6DofSpringConstraint_setEquilibriumPoint_2 = a.asm.rq).apply(null, arguments)
						},
						Ds = a._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 =
						function () {
							return (Ds = a._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = a.asm.sq).apply(null, arguments)
						},
						Es = a._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = function () {
							return (Es = a._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = a.asm.tq).apply(null, arguments)
						},
						Fs = a._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = function () {
							return (Fs = a._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = a.asm.uq).apply(null,
								arguments)
						},
						Gs = a._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = function () {
							return (Gs = a._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = a.asm.vq).apply(null, arguments)
						},
						Hs = a._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = function () {
							return (Hs = a._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = a.asm.wq).apply(null, arguments)
						},
						Is = a._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = function () {
							return (Is = a._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 =
								a.asm.xq).apply(null, arguments)
						},
						Js = a._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = function () {
							return (Js = a._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = a.asm.yq).apply(null, arguments)
						},
						Ks = a._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = function () {
							return (Ks = a._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = a.asm.zq).apply(null, arguments)
						},
						Ls = a._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 =
						function () {
							return (Ls = a._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 = a.asm.Aq).apply(null, arguments)
						},
						Ms = a._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = function () {
							return (Ms = a._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = a.asm.Bq).apply(null, arguments)
						},
						Ns = a._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = function () {
							return (Ns = a._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = a.asm.Cq).apply(null, arguments)
						},
						Os = a._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 =
						function () {
							return (Os = a._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = a.asm.Dq).apply(null, arguments)
						},
						Ps = a._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = function () {
							return (Ps = a._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = a.asm.Eq).apply(null, arguments)
						},
						Qs = a._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = function () {
							return (Qs = a._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = a.asm.Fq).apply(null,
								arguments)
						},
						Rs = a._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = function () {
							return (Rs = a._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 = a.asm.Gq).apply(null, arguments)
						},
						Ss = a._emscripten_bind_btConeTwistConstraint_setLimit_2 = function () {
							return (Ss = a._emscripten_bind_btConeTwistConstraint_setLimit_2 = a.asm.Hq).apply(null, arguments)
						},
						Ts = a._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = function () {
							return (Ts = a._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = a.asm.Iq).apply(null,
								arguments)
						},
						Us = a._emscripten_bind_btConeTwistConstraint_setDamping_1 = function () {
							return (Us = a._emscripten_bind_btConeTwistConstraint_setDamping_1 = a.asm.Jq).apply(null, arguments)
						},
						Vs = a._emscripten_bind_btConeTwistConstraint_enableMotor_1 = function () {
							return (Vs = a._emscripten_bind_btConeTwistConstraint_enableMotor_1 = a.asm.Kq).apply(null, arguments)
						},
						Ws = a._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = function () {
							return (Ws = a._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = a.asm.Lq).apply(null,
								arguments)
						},
						Xs = a._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = function () {
							return (Xs = a._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 = a.asm.Mq).apply(null, arguments)
						},
						Ys = a._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = function () {
							return (Ys = a._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = a.asm.Nq).apply(null, arguments)
						},
						Zs = a._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = function () {
							return (Zs = a._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 =
								a.asm.Oq).apply(null, arguments)
						},
						$s = a._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = function () {
							return ($s = a._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = a.asm.Pq).apply(null, arguments)
						},
						at = a._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = function () {
							return (at = a._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = a.asm.Qq).apply(null, arguments)
						},
						bt = a._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = function () {
							return (bt = a._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 =
								a.asm.Rq).apply(null, arguments)
						},
						ct = a._emscripten_bind_btConeTwistConstraint_getParam_2 = function () {
							return (ct = a._emscripten_bind_btConeTwistConstraint_getParam_2 = a.asm.Sq).apply(null, arguments)
						},
						dt = a._emscripten_bind_btConeTwistConstraint_setParam_3 = function () {
							return (dt = a._emscripten_bind_btConeTwistConstraint_setParam_3 = a.asm.Tq).apply(null, arguments)
						},
						et = a._emscripten_bind_btConeTwistConstraint___destroy___0 = function () {
							return (et = a._emscripten_bind_btConeTwistConstraint___destroy___0 = a.asm.Uq).apply(null,
								arguments)
						},
						ft = a._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = function () {
							return (ft = a._emscripten_bind_btHingeConstraint_btHingeConstraint_2 = a.asm.Vq).apply(null, arguments)
						},
						gt = a._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = function () {
							return (gt = a._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = a.asm.Wq).apply(null, arguments)
						},
						ht = a._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = function () {
							return (ht = a._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = a.asm.Xq).apply(null,
								arguments)
						},
						it = a._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = function () {
							return (it = a._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = a.asm.Yq).apply(null, arguments)
						},
						jt = a._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = function () {
							return (jt = a._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = a.asm.Zq).apply(null, arguments)
						},
						kt = a._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = function () {
							return (kt = a._emscripten_bind_btHingeConstraint_btHingeConstraint_7 = a.asm._q).apply(null,
								arguments)
						},
						lt = a._emscripten_bind_btHingeConstraint_getHingeAngle_0 = function () {
							return (lt = a._emscripten_bind_btHingeConstraint_getHingeAngle_0 = a.asm.$q).apply(null, arguments)
						},
						mt = a._emscripten_bind_btHingeConstraint_setLimit_4 = function () {
							return (mt = a._emscripten_bind_btHingeConstraint_setLimit_4 = a.asm.ar).apply(null, arguments)
						},
						nt = a._emscripten_bind_btHingeConstraint_setLimit_5 = function () {
							return (nt = a._emscripten_bind_btHingeConstraint_setLimit_5 = a.asm.br).apply(null, arguments)
						},
						ot = a._emscripten_bind_btHingeConstraint_enableAngularMotor_3 =
						function () {
							return (ot = a._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = a.asm.cr).apply(null, arguments)
						},
						pt = a._emscripten_bind_btHingeConstraint_setAngularOnly_1 = function () {
							return (pt = a._emscripten_bind_btHingeConstraint_setAngularOnly_1 = a.asm.dr).apply(null, arguments)
						},
						qt = a._emscripten_bind_btHingeConstraint_enableMotor_1 = function () {
							return (qt = a._emscripten_bind_btHingeConstraint_enableMotor_1 = a.asm.er).apply(null, arguments)
						},
						rt = a._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = function () {
							return (rt =
								a._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 = a.asm.fr).apply(null, arguments)
						},
						st = a._emscripten_bind_btHingeConstraint_setMotorTarget_2 = function () {
							return (st = a._emscripten_bind_btHingeConstraint_setMotorTarget_2 = a.asm.gr).apply(null, arguments)
						},
						tt = a._emscripten_bind_btHingeConstraint_enableFeedback_1 = function () {
							return (tt = a._emscripten_bind_btHingeConstraint_enableFeedback_1 = a.asm.hr).apply(null, arguments)
						},
						ut = a._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = function () {
							return (ut =
								a._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = a.asm.ir).apply(null, arguments)
						},
						vt = a._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = function () {
							return (vt = a._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = a.asm.jr).apply(null, arguments)
						},
						wt = a._emscripten_bind_btHingeConstraint_getParam_2 = function () {
							return (wt = a._emscripten_bind_btHingeConstraint_getParam_2 = a.asm.kr).apply(null, arguments)
						},
						xt = a._emscripten_bind_btHingeConstraint_setParam_3 = function () {
							return (xt =
								a._emscripten_bind_btHingeConstraint_setParam_3 = a.asm.lr).apply(null, arguments)
						},
						yt = a._emscripten_bind_btHingeConstraint___destroy___0 = function () {
							return (yt = a._emscripten_bind_btHingeConstraint___destroy___0 = a.asm.mr).apply(null, arguments)
						},
						zt = a._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = function () {
							return (zt = a._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = a.asm.nr).apply(null, arguments)
						},
						At = a._emscripten_bind_btSliderConstraint_btSliderConstraint_5 = function () {
							return (At = a._emscripten_bind_btSliderConstraint_btSliderConstraint_5 =
								a.asm.or).apply(null, arguments)
						},
						Bt = a._emscripten_bind_btSliderConstraint_getLinearPos_0 = function () {
							return (Bt = a._emscripten_bind_btSliderConstraint_getLinearPos_0 = a.asm.pr).apply(null, arguments)
						},
						Ct = a._emscripten_bind_btSliderConstraint_getAngularPos_0 = function () {
							return (Ct = a._emscripten_bind_btSliderConstraint_getAngularPos_0 = a.asm.qr).apply(null, arguments)
						},
						Dt = a._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = function () {
							return (Dt = a._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = a.asm.rr).apply(null,
								arguments)
						},
						Et = a._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = function () {
							return (Et = a._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = a.asm.sr).apply(null, arguments)
						},
						Ft = a._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = function () {
							return (Ft = a._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = a.asm.tr).apply(null, arguments)
						},
						Gt = a._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = function () {
							return (Gt = a._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = a.asm.ur).apply(null,
								arguments)
						},
						Ht = a._emscripten_bind_btSliderConstraint_setPoweredLinMotor_1 = function () {
							return (Ht = a._emscripten_bind_btSliderConstraint_setPoweredLinMotor_1 = a.asm.vr).apply(null, arguments)
						},
						It = a._emscripten_bind_btSliderConstraint_setMaxLinMotorForce_1 = function () {
							return (It = a._emscripten_bind_btSliderConstraint_setMaxLinMotorForce_1 = a.asm.wr).apply(null, arguments)
						},
						Jt = a._emscripten_bind_btSliderConstraint_setTargetLinMotorVelocity_1 = function () {
							return (Jt = a._emscripten_bind_btSliderConstraint_setTargetLinMotorVelocity_1 =
								a.asm.xr).apply(null, arguments)
						},
						Kt = a._emscripten_bind_btSliderConstraint_enableFeedback_1 = function () {
							return (Kt = a._emscripten_bind_btSliderConstraint_enableFeedback_1 = a.asm.yr).apply(null, arguments)
						},
						Lt = a._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = function () {
							return (Lt = a._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = a.asm.zr).apply(null, arguments)
						},
						Mt = a._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = function () {
							return (Mt = a._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 =
								a.asm.Ar).apply(null, arguments)
						},
						Nt = a._emscripten_bind_btSliderConstraint_getParam_2 = function () {
							return (Nt = a._emscripten_bind_btSliderConstraint_getParam_2 = a.asm.Br).apply(null, arguments)
						},
						Ot = a._emscripten_bind_btSliderConstraint_setParam_3 = function () {
							return (Ot = a._emscripten_bind_btSliderConstraint_setParam_3 = a.asm.Cr).apply(null, arguments)
						},
						Pt = a._emscripten_bind_btSliderConstraint___destroy___0 = function () {
							return (Pt = a._emscripten_bind_btSliderConstraint___destroy___0 = a.asm.Dr).apply(null, arguments)
						},
						Qt = a._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = function () {
							return (Qt = a._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = a.asm.Er).apply(null, arguments)
						},
						Rt = a._emscripten_bind_btFixedConstraint_enableFeedback_1 = function () {
							return (Rt = a._emscripten_bind_btFixedConstraint_enableFeedback_1 = a.asm.Fr).apply(null, arguments)
						},
						St = a._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = function () {
							return (St = a._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = a.asm.Gr).apply(null,
								arguments)
						},
						Tt = a._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = function () {
							return (Tt = a._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 = a.asm.Hr).apply(null, arguments)
						},
						Ut = a._emscripten_bind_btFixedConstraint_getParam_2 = function () {
							return (Ut = a._emscripten_bind_btFixedConstraint_getParam_2 = a.asm.Ir).apply(null, arguments)
						},
						Vt = a._emscripten_bind_btFixedConstraint_setParam_3 = function () {
							return (Vt = a._emscripten_bind_btFixedConstraint_setParam_3 = a.asm.Jr).apply(null, arguments)
						},
						Wt = a._emscripten_bind_btFixedConstraint___destroy___0 = function () {
							return (Wt = a._emscripten_bind_btFixedConstraint___destroy___0 = a.asm.Kr).apply(null, arguments)
						},
						Xt = a._emscripten_bind_btConstraintSolver___destroy___0 = function () {
							return (Xt = a._emscripten_bind_btConstraintSolver___destroy___0 = a.asm.Lr).apply(null, arguments)
						},
						Yt = a._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = function () {
							return (Yt = a._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = a.asm.Mr).apply(null, arguments)
						},
						Zt = a._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 =
						function () {
							return (Zt = a._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 = a.asm.Nr).apply(null, arguments)
						},
						$t = a._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = function () {
							return ($t = a._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = a.asm.Or).apply(null, arguments)
						},
						au = a._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = function () {
							return (au = a._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = a.asm.Pr).apply(null, arguments)
						},
						bu = a._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = function () {
							return (bu =
								a._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = a.asm.Qr).apply(null, arguments)
						},
						cu = a._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = function () {
							return (cu = a._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = a.asm.Rr).apply(null, arguments)
						},
						du = a._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = function () {
							return (du = a._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = a.asm.Sr).apply(null, arguments)
						},
						eu = a._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = function () {
							return (eu =
								a._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = a.asm.Tr).apply(null, arguments)
						},
						fu = a._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = function () {
							return (fu = a._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = a.asm.Ur).apply(null, arguments)
						},
						gu = a._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = function () {
							return (gu = a._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = a.asm.Vr).apply(null, arguments)
						},
						hu = a._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = function () {
							return (hu =
								a._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = a.asm.Wr).apply(null, arguments)
						},
						iu = a._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = function () {
							return (iu = a._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = a.asm.Xr).apply(null, arguments)
						},
						ju = a._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = function () {
							return (ju = a._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = a.asm.Yr).apply(null, arguments)
						},
						ku = a._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = function () {
							return (ku =
								a._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = a.asm.Zr).apply(null, arguments)
						},
						lu = a._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = function () {
							return (lu = a._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = a.asm._r).apply(null, arguments)
						},
						mu = a._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = function () {
							return (mu = a._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = a.asm.$r).apply(null, arguments)
						},
						nu = a._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 = function () {
							return (nu = a._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 =
								a.asm.as).apply(null, arguments)
						},
						ou = a._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = function () {
							return (ou = a._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = a.asm.bs).apply(null, arguments)
						},
						pu = a._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 = function () {
							return (pu = a._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 = a.asm.cs).apply(null, arguments)
						},
						qu = a._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 =
						function () {
							return (qu = a._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = a.asm.ds).apply(null, arguments)
						},
						ru = a._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = function () {
							return (ru = a._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = a.asm.es).apply(null, arguments)
						},
						su = a._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = function () {
							return (su = a._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 =
								a.asm.fs).apply(null, arguments)
						},
						tu = a._emscripten_bind_btDispatcherInfo___destroy___0 = function () {
							return (tu = a._emscripten_bind_btDispatcherInfo___destroy___0 = a.asm.gs).apply(null, arguments)
						},
						uu = a._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = function () {
							return (uu = a._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = a.asm.hs).apply(null, arguments)
						},
						vu = a._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = function () {
							return (vu = a._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 =
								a.asm.is).apply(null, arguments)
						},
						wu = a._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = function () {
							return (wu = a._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = a.asm.js).apply(null, arguments)
						},
						xu = a._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = function () {
							return (xu = a._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 = a.asm.ks).apply(null, arguments)
						},
						yu = a._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 =
						function () {
							return (yu = a._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = a.asm.ls).apply(null, arguments)
						},
						zu = a._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = function () {
							return (zu = a._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = a.asm.ms).apply(null, arguments)
						},
						Au = a._emscripten_bind_btContactSolverInfo___destroy___0 = function () {
							return (Au = a._emscripten_bind_btContactSolverInfo___destroy___0 = a.asm.ns).apply(null, arguments)
						},
						Bu = a._emscripten_bind_btVehicleTuning_btVehicleTuning_0 =
						function () {
							return (Bu = a._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = a.asm.os).apply(null, arguments)
						},
						Cu = a._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = function () {
							return (Cu = a._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = a.asm.ps).apply(null, arguments)
						},
						Du = a._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = function () {
							return (Du = a._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = a.asm.qs).apply(null, arguments)
						},
						Eu = a._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 =
						function () {
							return (Eu = a._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 = a.asm.rs).apply(null, arguments)
						},
						Fu = a._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = function () {
							return (Fu = a._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = a.asm.ss).apply(null, arguments)
						},
						Gu = a._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = function () {
							return (Gu = a._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = a.asm.ts).apply(null, arguments)
						},
						Hu = a._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 =
						function () {
							return (Hu = a._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = a.asm.us).apply(null, arguments)
						},
						Iu = a._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = function () {
							return (Iu = a._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = a.asm.vs).apply(null, arguments)
						},
						Ju = a._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = function () {
							return (Ju = a._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = a.asm.ws).apply(null, arguments)
						},
						Ku = a._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 =
						function () {
							return (Ku = a._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = a.asm.xs).apply(null, arguments)
						},
						Lu = a._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = function () {
							return (Lu = a._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = a.asm.ys).apply(null, arguments)
						},
						Mu = a._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = function () {
							return (Mu = a._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = a.asm.zs).apply(null, arguments)
						},
						Nu = a._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 =
						function () {
							return (Nu = a._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = a.asm.As).apply(null, arguments)
						},
						Ou = a._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = function () {
							return (Ou = a._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = a.asm.Bs).apply(null, arguments)
						},
						Pu = a._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = function () {
							return (Pu = a._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = a.asm.Cs).apply(null, arguments)
						},
						Qu = a._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = function () {
							return (Qu = a._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = a.asm.Ds).apply(null, arguments)
						},
						Ru = a._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = function () {
							return (Ru = a._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = a.asm.Es).apply(null, arguments)
						},
						Su = a._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = function () {
							return (Su = a._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 =
								a.asm.Fs).apply(null, arguments)
						},
						Tu = a._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = function () {
							return (Tu = a._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 = a.asm.Gs).apply(null, arguments)
						},
						Uu = a._emscripten_bind_btVehicleRaycasterResult___destroy___0 = function () {
							return (Uu = a._emscripten_bind_btVehicleRaycasterResult___destroy___0 = a.asm.Hs).apply(null, arguments)
						},
						Vu = a._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = function () {
							return (Vu = a._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 =
								a.asm.Is).apply(null, arguments)
						},
						Wu = a._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = function () {
							return (Wu = a._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = a.asm.Js).apply(null, arguments)
						},
						Xu = a._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = function () {
							return (Xu = a._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = a.asm.Ks).apply(null, arguments)
						},
						Yu = a._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 = function () {
							return (Yu = a._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 =
								a.asm.Ls).apply(null, arguments)
						},
						Zu = a._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = function () {
							return (Zu = a._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = a.asm.Ms).apply(null, arguments)
						},
						$u = a._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = function () {
							return ($u = a._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = a.asm.Ns).apply(null, arguments)
						},
						av = a._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = function () {
							return (av = a._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = a.asm.Os).apply(null,
								arguments)
						},
						bv = a._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = function () {
							return (bv = a._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 = a.asm.Ps).apply(null, arguments)
						},
						cv = a._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = function () {
							return (cv = a._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = a.asm.Qs).apply(null, arguments)
						},
						dv = a._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = function () {
							return (dv = a._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = a.asm.Rs).apply(null, arguments)
						},
						ev = a._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = function () {
							return (ev = a._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = a.asm.Ss).apply(null, arguments)
						},
						fv = a._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = function () {
							return (fv = a._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = a.asm.Ts).apply(null, arguments)
						},
						gv = a._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = function () {
							return (gv = a._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 = a.asm.Us).apply(null, arguments)
						},
						hv = a._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 =
						function () {
							return (hv = a._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = a.asm.Vs).apply(null, arguments)
						},
						iv = a._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = function () {
							return (iv = a._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = a.asm.Ws).apply(null, arguments)
						},
						jv = a._emscripten_bind_RaycastInfo_get_m_isInContact_0 = function () {
							return (jv = a._emscripten_bind_RaycastInfo_get_m_isInContact_0 = a.asm.Xs).apply(null, arguments)
						},
						kv = a._emscripten_bind_RaycastInfo_set_m_isInContact_1 = function () {
							return (kv = a._emscripten_bind_RaycastInfo_set_m_isInContact_1 =
								a.asm.Ys).apply(null, arguments)
						},
						lv = a._emscripten_bind_RaycastInfo_get_m_groundObject_0 = function () {
							return (lv = a._emscripten_bind_RaycastInfo_get_m_groundObject_0 = a.asm.Zs).apply(null, arguments)
						},
						mv = a._emscripten_bind_RaycastInfo_set_m_groundObject_1 = function () {
							return (mv = a._emscripten_bind_RaycastInfo_set_m_groundObject_1 = a.asm._s).apply(null, arguments)
						},
						nv = a._emscripten_bind_RaycastInfo___destroy___0 = function () {
							return (nv = a._emscripten_bind_RaycastInfo___destroy___0 = a.asm.$s).apply(null, arguments)
						},
						ov = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = function () {
							return (ov = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = a.asm.at).apply(null, arguments)
						},
						pv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = function () {
							return (pv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = a.asm.bt).apply(null, arguments)
						},
						qv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = function () {
							return (qv =
								a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = a.asm.ct).apply(null, arguments)
						},
						rv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = function () {
							return (rv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = a.asm.dt).apply(null, arguments)
						},
						sv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = function () {
							return (sv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = a.asm.et).apply(null, arguments)
						},
						tv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 =
						function () {
							return (tv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = a.asm.ft).apply(null, arguments)
						},
						uv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = function () {
							return (uv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = a.asm.gt).apply(null, arguments)
						},
						vv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 = function () {
							return (vv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 =
								a.asm.ht).apply(null, arguments)
						},
						wv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = function () {
							return (wv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = a.asm.it).apply(null, arguments)
						},
						xv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = function () {
							return (xv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = a.asm.jt).apply(null, arguments)
						},
						yv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 =
						function () {
							return (yv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = a.asm.kt).apply(null, arguments)
						},
						zv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = function () {
							return (zv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = a.asm.lt).apply(null, arguments)
						},
						Av = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = function () {
							return (Av = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = a.asm.mt).apply(null,
								arguments)
						},
						Bv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = function () {
							return (Bv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = a.asm.nt).apply(null, arguments)
						},
						Cv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = function () {
							return (Cv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = a.asm.ot).apply(null, arguments)
						},
						Dv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 =
						function () {
							return (Dv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 = a.asm.pt).apply(null, arguments)
						},
						Ev = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = function () {
							return (Ev = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = a.asm.qt).apply(null, arguments)
						},
						Fv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 = function () {
							return (Fv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 =
								a.asm.rt).apply(null, arguments)
						},
						Gv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = function () {
							return (Gv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = a.asm.st).apply(null, arguments)
						},
						Hv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = function () {
							return (Hv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = a.asm.tt).apply(null, arguments)
						},
						Iv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = function () {
							return (Iv =
								a._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = a.asm.ut).apply(null, arguments)
						},
						Jv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = function () {
							return (Jv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = a.asm.vt).apply(null, arguments)
						},
						Kv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = function () {
							return (Kv = a._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = a.asm.wt).apply(null, arguments)
						},
						Lv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = function () {
							return (Lv = a._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = a.asm.xt).apply(null, arguments)
						},
						Mv = a._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = function () {
							return (Mv = a._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 = a.asm.yt).apply(null, arguments)
						},
						Nv = a._emscripten_bind_btWheelInfo_btWheelInfo_1 = function () {
							return (Nv = a._emscripten_bind_btWheelInfo_btWheelInfo_1 = a.asm.zt).apply(null,
								arguments)
						},
						Ov = a._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = function () {
							return (Ov = a._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = a.asm.At).apply(null, arguments)
						},
						Pv = a._emscripten_bind_btWheelInfo_updateWheel_2 = function () {
							return (Pv = a._emscripten_bind_btWheelInfo_updateWheel_2 = a.asm.Bt).apply(null, arguments)
						},
						Qv = a._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = function () {
							return (Qv = a._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 = a.asm.Ct).apply(null, arguments)
						},
						Rv = a._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = function () {
							return (Rv = a._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = a.asm.Dt).apply(null, arguments)
						},
						Sv = a._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = function () {
							return (Sv = a._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 = a.asm.Et).apply(null, arguments)
						},
						Tv = a._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = function () {
							return (Tv = a._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = a.asm.Ft).apply(null, arguments)
						},
						Uv = a._emscripten_bind_btWheelInfo_get_m_engineForce_0 =
						function () {
							return (Uv = a._emscripten_bind_btWheelInfo_get_m_engineForce_0 = a.asm.Gt).apply(null, arguments)
						},
						Vv = a._emscripten_bind_btWheelInfo_set_m_engineForce_1 = function () {
							return (Vv = a._emscripten_bind_btWheelInfo_set_m_engineForce_1 = a.asm.Ht).apply(null, arguments)
						},
						Wv = a._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = function () {
							return (Wv = a._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = a.asm.It).apply(null, arguments)
						},
						Xv = a._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = function () {
							return (Xv =
								a._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = a.asm.Jt).apply(null, arguments)
						},
						Yv = a._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = function () {
							return (Yv = a._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = a.asm.Kt).apply(null, arguments)
						},
						Zv = a._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = function () {
							return (Zv = a._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = a.asm.Lt).apply(null, arguments)
						},
						$v = a._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = function () {
							return ($v =
								a._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 = a.asm.Mt).apply(null, arguments)
						},
						aw = a._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = function () {
							return (aw = a._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = a.asm.Nt).apply(null, arguments)
						},
						bw = a._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = function () {
							return (bw = a._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = a.asm.Ot).apply(null, arguments)
						},
						cw = a._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = function () {
							return (cw =
								a._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = a.asm.Pt).apply(null, arguments)
						},
						dw = a._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = function () {
							return (dw = a._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = a.asm.Qt).apply(null, arguments)
						},
						ew = a._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = function () {
							return (ew = a._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = a.asm.Rt).apply(null, arguments)
						},
						fw = a._emscripten_bind_btWheelInfo_get_m_steering_0 =
						function () {
							return (fw = a._emscripten_bind_btWheelInfo_get_m_steering_0 = a.asm.St).apply(null, arguments)
						},
						gw = a._emscripten_bind_btWheelInfo_set_m_steering_1 = function () {
							return (gw = a._emscripten_bind_btWheelInfo_set_m_steering_1 = a.asm.Tt).apply(null, arguments)
						},
						hw = a._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = function () {
							return (hw = a._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = a.asm.Ut).apply(null, arguments)
						},
						iw = a._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = function () {
							return (iw =
								a._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 = a.asm.Vt).apply(null, arguments)
						},
						jw = a._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = function () {
							return (jw = a._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = a.asm.Wt).apply(null, arguments)
						},
						kw = a._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = function () {
							return (kw = a._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = a.asm.Xt).apply(null, arguments)
						},
						lw = a._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 =
						function () {
							return (lw = a._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = a.asm.Yt).apply(null, arguments)
						},
						mw = a._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = function () {
							return (mw = a._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 = a.asm.Zt).apply(null, arguments)
						},
						nw = a._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = function () {
							return (nw = a._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = a.asm._t).apply(null, arguments)
						},
						ow = a._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 =
						function () {
							return (ow = a._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = a.asm.$t).apply(null, arguments)
						},
						pw = a._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = function () {
							return (pw = a._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = a.asm.au).apply(null, arguments)
						},
						qw = a._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = function () {
							return (qw = a._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = a.asm.bu).apply(null, arguments)
						},
						rw = a._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = function () {
							return (rw =
								a._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = a.asm.cu).apply(null, arguments)
						},
						sw = a._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = function () {
							return (sw = a._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 = a.asm.du).apply(null, arguments)
						},
						tw = a._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = function () {
							return (tw = a._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = a.asm.eu).apply(null, arguments)
						},
						uw = a._emscripten_bind_btWheelInfo_set_m_worldTransform_1 =
						function () {
							return (uw = a._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = a.asm.fu).apply(null, arguments)
						},
						vw = a._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = function () {
							return (vw = a._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = a.asm.gu).apply(null, arguments)
						},
						ww = a._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = function () {
							return (ww = a._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = a.asm.hu).apply(null, arguments)
						},
						xw = a._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = function () {
							return (xw =
								a._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = a.asm.iu).apply(null, arguments)
						},
						yw = a._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = function () {
							return (yw = a._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 = a.asm.ju).apply(null, arguments)
						},
						zw = a._emscripten_bind_btWheelInfo_get_m_rotation_0 = function () {
							return (zw = a._emscripten_bind_btWheelInfo_get_m_rotation_0 = a.asm.ku).apply(null, arguments)
						},
						Aw = a._emscripten_bind_btWheelInfo_set_m_rotation_1 = function () {
							return (Aw = a._emscripten_bind_btWheelInfo_set_m_rotation_1 =
								a.asm.lu).apply(null, arguments)
						},
						Bw = a._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = function () {
							return (Bw = a._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = a.asm.mu).apply(null, arguments)
						},
						Cw = a._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = function () {
							return (Cw = a._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = a.asm.nu).apply(null, arguments)
						},
						Dw = a._emscripten_bind_btWheelInfo_get_m_brake_0 = function () {
							return (Dw = a._emscripten_bind_btWheelInfo_get_m_brake_0 = a.asm.ou).apply(null, arguments)
						},
						Ew = a._emscripten_bind_btWheelInfo_set_m_brake_1 = function () {
							return (Ew = a._emscripten_bind_btWheelInfo_set_m_brake_1 = a.asm.pu).apply(null, arguments)
						},
						Fw = a._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = function () {
							return (Fw = a._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = a.asm.qu).apply(null, arguments)
						},
						Gw = a._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = function () {
							return (Gw = a._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 =
								a.asm.ru).apply(null, arguments)
						},
						Hw = a._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = function () {
							return (Hw = a._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = a.asm.su).apply(null, arguments)
						},
						Iw = a._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = function () {
							return (Iw = a._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = a.asm.tu).apply(null, arguments)
						},
						Jw = a._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = function () {
							return (Jw = a._emscripten_bind_btWheelInfo_get_m_skidInfo_0 =
								a.asm.uu).apply(null, arguments)
						},
						Kw = a._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = function () {
							return (Kw = a._emscripten_bind_btWheelInfo_set_m_skidInfo_1 = a.asm.vu).apply(null, arguments)
						},
						Lw = a._emscripten_bind_btWheelInfo___destroy___0 = function () {
							return (Lw = a._emscripten_bind_btWheelInfo___destroy___0 = a.asm.wu).apply(null, arguments)
						},
						Mw = a._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = function () {
							return (Mw = a._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 =
								a.asm.xu).apply(null, arguments)
						},
						Nw = a._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 = function () {
							return (Nw = a._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 = a.asm.yu).apply(null, arguments)
						},
						Ow = a._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = function () {
							return (Ow = a._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = a.asm.zu).apply(null, arguments)
						},
						Pw = a._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 =
						function () {
							return (Pw = a._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = a.asm.Au).apply(null, arguments)
						},
						Qw = a._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = function () {
							return (Qw = a._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = a.asm.Bu).apply(null, arguments)
						},
						Rw = a._emscripten_bind_btKinematicCharacterController_warp_1 = function () {
							return (Rw = a._emscripten_bind_btKinematicCharacterController_warp_1 = a.asm.Cu).apply(null, arguments)
						},
						Sw = a._emscripten_bind_btKinematicCharacterController_preStep_1 = function () {
							return (Sw = a._emscripten_bind_btKinematicCharacterController_preStep_1 = a.asm.Du).apply(null, arguments)
						},
						Tw = a._emscripten_bind_btKinematicCharacterController_playerStep_2 = function () {
							return (Tw = a._emscripten_bind_btKinematicCharacterController_playerStep_2 = a.asm.Eu).apply(null, arguments)
						},
						Uw = a._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 = function () {
							return (Uw = a._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 =
								a.asm.Fu).apply(null, arguments)
						},
						Vw = a._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = function () {
							return (Vw = a._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = a.asm.Gu).apply(null, arguments)
						},
						Ww = a._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = function () {
							return (Ww = a._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = a.asm.Hu).apply(null, arguments)
						},
						Xw = a._emscripten_bind_btKinematicCharacterController_canJump_0 = function () {
							return (Xw = a._emscripten_bind_btKinematicCharacterController_canJump_0 =
								a.asm.Iu).apply(null, arguments)
						},
						Yw = a._emscripten_bind_btKinematicCharacterController_jump_0 = function () {
							return (Yw = a._emscripten_bind_btKinematicCharacterController_jump_0 = a.asm.Ju).apply(null, arguments)
						},
						Zw = a._emscripten_bind_btKinematicCharacterController_setGravity_1 = function () {
							return (Zw = a._emscripten_bind_btKinematicCharacterController_setGravity_1 = a.asm.Ku).apply(null, arguments)
						},
						$w = a._emscripten_bind_btKinematicCharacterController_getGravity_0 = function () {
							return ($w = a._emscripten_bind_btKinematicCharacterController_getGravity_0 =
								a.asm.Lu).apply(null, arguments)
						},
						ax = a._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = function () {
							return (ax = a._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = a.asm.Mu).apply(null, arguments)
						},
						bx = a._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = function () {
							return (bx = a._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = a.asm.Nu).apply(null, arguments)
						},
						cx = a._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = function () {
							return (cx = a._emscripten_bind_btKinematicCharacterController_getGhostObject_0 =
								a.asm.Ou).apply(null, arguments)
						},
						dx = a._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = function () {
							return (dx = a._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = a.asm.Pu).apply(null, arguments)
						},
						ex = a._emscripten_bind_btKinematicCharacterController_onGround_0 = function () {
							return (ex = a._emscripten_bind_btKinematicCharacterController_onGround_0 = a.asm.Qu).apply(null, arguments)
						},
						fx = a._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = function () {
							return (fx =
								a._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = a.asm.Ru).apply(null, arguments)
						},
						gx = a._emscripten_bind_btKinematicCharacterController_updateAction_2 = function () {
							return (gx = a._emscripten_bind_btKinematicCharacterController_updateAction_2 = a.asm.Su).apply(null, arguments)
						},
						hx = a._emscripten_bind_btKinematicCharacterController___destroy___0 = function () {
							return (hx = a._emscripten_bind_btKinematicCharacterController___destroy___0 = a.asm.Tu).apply(null, arguments)
						},
						ix = a._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 =
						function () {
							return (ix = a._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = a.asm.Uu).apply(null, arguments)
						},
						jx = a._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = function () {
							return (jx = a._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = a.asm.Vu).apply(null, arguments)
						},
						kx = a._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = function () {
							return (kx = a._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = a.asm.Wu).apply(null, arguments)
						},
						lx = a._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 =
						function () {
							return (lx = a._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = a.asm.Xu).apply(null, arguments)
						},
						mx = a._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = function () {
							return (mx = a._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = a.asm.Yu).apply(null, arguments)
						},
						nx = a._emscripten_bind_btRaycastVehicle_addWheel_7 = function () {
							return (nx = a._emscripten_bind_btRaycastVehicle_addWheel_7 = a.asm.Zu).apply(null, arguments)
						},
						ox = a._emscripten_bind_btRaycastVehicle_getNumWheels_0 = function () {
							return (ox =
								a._emscripten_bind_btRaycastVehicle_getNumWheels_0 = a.asm._u).apply(null, arguments)
						},
						px = a._emscripten_bind_btRaycastVehicle_getRigidBody_0 = function () {
							return (px = a._emscripten_bind_btRaycastVehicle_getRigidBody_0 = a.asm.$u).apply(null, arguments)
						},
						qx = a._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = function () {
							return (qx = a._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = a.asm.av).apply(null, arguments)
						},
						rx = a._emscripten_bind_btRaycastVehicle_setBrake_2 = function () {
							return (rx = a._emscripten_bind_btRaycastVehicle_setBrake_2 =
								a.asm.bv).apply(null, arguments)
						},
						sx = a._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = function () {
							return (sx = a._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = a.asm.cv).apply(null, arguments)
						},
						tx = a._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = function () {
							return (tx = a._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = a.asm.dv).apply(null, arguments)
						},
						ux = a._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = function () {
							return (ux = a._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 =
								a.asm.ev).apply(null, arguments)
						},
						vx = a._emscripten_bind_btRaycastVehicle_rayCast_1 = function () {
							return (vx = a._emscripten_bind_btRaycastVehicle_rayCast_1 = a.asm.fv).apply(null, arguments)
						},
						wx = a._emscripten_bind_btRaycastVehicle_updateVehicle_1 = function () {
							return (wx = a._emscripten_bind_btRaycastVehicle_updateVehicle_1 = a.asm.gv).apply(null, arguments)
						},
						xx = a._emscripten_bind_btRaycastVehicle_resetSuspension_0 = function () {
							return (xx = a._emscripten_bind_btRaycastVehicle_resetSuspension_0 = a.asm.hv).apply(null, arguments)
						},
						yx = a._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = function () {
							return (yx = a._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = a.asm.iv).apply(null, arguments)
						},
						zx = a._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = function () {
							return (zx = a._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 = a.asm.jv).apply(null, arguments)
						},
						Ax = a._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = function () {
							return (Ax = a._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = a.asm.kv).apply(null,
								arguments)
						},
						Bx = a._emscripten_bind_btRaycastVehicle_setPitchControl_1 = function () {
							return (Bx = a._emscripten_bind_btRaycastVehicle_setPitchControl_1 = a.asm.lv).apply(null, arguments)
						},
						Cx = a._emscripten_bind_btRaycastVehicle_updateSuspension_1 = function () {
							return (Cx = a._emscripten_bind_btRaycastVehicle_updateSuspension_1 = a.asm.mv).apply(null, arguments)
						},
						Dx = a._emscripten_bind_btRaycastVehicle_updateFriction_1 = function () {
							return (Dx = a._emscripten_bind_btRaycastVehicle_updateFriction_1 = a.asm.nv).apply(null, arguments)
						},
						Ex = a._emscripten_bind_btRaycastVehicle_getRightAxis_0 = function () {
							return (Ex = a._emscripten_bind_btRaycastVehicle_getRightAxis_0 = a.asm.ov).apply(null, arguments)
						},
						Fx = a._emscripten_bind_btRaycastVehicle_getUpAxis_0 = function () {
							return (Fx = a._emscripten_bind_btRaycastVehicle_getUpAxis_0 = a.asm.pv).apply(null, arguments)
						},
						Gx = a._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = function () {
							return (Gx = a._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = a.asm.qv).apply(null, arguments)
						},
						Hx = a._emscripten_bind_btRaycastVehicle_getForwardVector_0 =
						function () {
							return (Hx = a._emscripten_bind_btRaycastVehicle_getForwardVector_0 = a.asm.rv).apply(null, arguments)
						},
						Ix = a._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = function () {
							return (Ix = a._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = a.asm.sv).apply(null, arguments)
						},
						Jx = a._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = function () {
							return (Jx = a._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = a.asm.tv).apply(null, arguments)
						},
						Kx = a._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 =
						function () {
							return (Kx = a._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = a.asm.uv).apply(null, arguments)
						},
						Lx = a._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = function () {
							return (Lx = a._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = a.asm.vv).apply(null, arguments)
						},
						Mx = a._emscripten_bind_btRaycastVehicle_updateAction_2 = function () {
							return (Mx = a._emscripten_bind_btRaycastVehicle_updateAction_2 = a.asm.wv).apply(null, arguments)
						},
						Nx = a._emscripten_bind_btRaycastVehicle___destroy___0 = function () {
							return (Nx =
								a._emscripten_bind_btRaycastVehicle___destroy___0 = a.asm.xv).apply(null, arguments)
						},
						Ox = a._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = function () {
							return (Ox = a._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 = a.asm.yv).apply(null, arguments)
						},
						Px = a._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = function () {
							return (Px = a._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = a.asm.zv).apply(null, arguments)
						},
						Qx = a._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 =
						function () {
							return (Qx = a._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = a.asm.Av).apply(null, arguments)
						},
						Rx = a._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = function () {
							return (Rx = a._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = a.asm.Bv).apply(null, arguments)
						},
						Sx = a._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = function () {
							return (Sx = a._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = a.asm.Cv).apply(null,
								arguments)
						},
						Tx = a._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = function () {
							return (Tx = a._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = a.asm.Dv).apply(null, arguments)
						},
						Ux = a._emscripten_bind_btPairCachingGhostObject_activate_0 = function () {
							return (Ux = a._emscripten_bind_btPairCachingGhostObject_activate_0 = a.asm.Ev).apply(null, arguments)
						},
						Vx = a._emscripten_bind_btPairCachingGhostObject_activate_1 = function () {
							return (Vx = a._emscripten_bind_btPairCachingGhostObject_activate_1 =
								a.asm.Fv).apply(null, arguments)
						},
						Wx = a._emscripten_bind_btPairCachingGhostObject_isActive_0 = function () {
							return (Wx = a._emscripten_bind_btPairCachingGhostObject_isActive_0 = a.asm.Gv).apply(null, arguments)
						},
						Xx = a._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = function () {
							return (Xx = a._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = a.asm.Hv).apply(null, arguments)
						},
						Yx = a._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = function () {
							return (Yx = a._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 =
								a.asm.Iv).apply(null, arguments)
						},
						Zx = a._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = function () {
							return (Zx = a._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = a.asm.Jv).apply(null, arguments)
						},
						$x = a._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = function () {
							return ($x = a._emscripten_bind_btPairCachingGhostObject_getRestitution_0 = a.asm.Kv).apply(null, arguments)
						},
						ay = a._emscripten_bind_btPairCachingGhostObject_getFriction_0 = function () {
							return (ay = a._emscripten_bind_btPairCachingGhostObject_getFriction_0 =
								a.asm.Lv).apply(null, arguments)
						},
						by = a._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = function () {
							return (by = a._emscripten_bind_btPairCachingGhostObject_getRollingFriction_0 = a.asm.Mv).apply(null, arguments)
						},
						cy = a._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = function () {
							return (cy = a._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = a.asm.Nv).apply(null, arguments)
						},
						dy = a._emscripten_bind_btPairCachingGhostObject_setFriction_1 = function () {
							return (dy = a._emscripten_bind_btPairCachingGhostObject_setFriction_1 =
								a.asm.Ov).apply(null, arguments)
						},
						ey = a._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = function () {
							return (ey = a._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = a.asm.Pv).apply(null, arguments)
						},
						fy = a._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = function () {
							return (fy = a._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = a.asm.Qv).apply(null, arguments)
						},
						gy = a._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = function () {
							return (gy = a._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 =
								a.asm.Rv).apply(null, arguments)
						},
						hy = a._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = function () {
							return (hy = a._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = a.asm.Sv).apply(null, arguments)
						},
						iy = a._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = function () {
							return (iy = a._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = a.asm.Tv).apply(null, arguments)
						},
						jy = a._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 = function () {
							return (jy = a._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 =
								a.asm.Uv).apply(null, arguments)
						},
						ky = a._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = function () {
							return (ky = a._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = a.asm.Vv).apply(null, arguments)
						},
						ly = a._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = function () {
							return (ly = a._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = a.asm.Wv).apply(null, arguments)
						},
						my = a._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = function () {
							return (my =
								a._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = a.asm.Xv).apply(null, arguments)
						},
						ny = a._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = function () {
							return (ny = a._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = a.asm.Yv).apply(null, arguments)
						},
						oy = a._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = function () {
							return (oy = a._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = a.asm.Zv).apply(null, arguments)
						},
						py = a._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 =
						function () {
							return (py = a._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = a.asm._v).apply(null, arguments)
						},
						qy = a._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = function () {
							return (qy = a._emscripten_bind_btPairCachingGhostObject_getBroadphaseHandle_0 = a.asm.$v).apply(null, arguments)
						},
						ry = a._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = function () {
							return (ry = a._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = a.asm.aw).apply(null, arguments)
						},
						sy = a._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = function () {
							return (sy = a._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = a.asm.bw).apply(null, arguments)
						},
						ty = a._emscripten_bind_btPairCachingGhostObject___destroy___0 = function () {
							return (ty = a._emscripten_bind_btPairCachingGhostObject___destroy___0 = a.asm.cw).apply(null, arguments)
						},
						uy = a._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 = function () {
							return (uy = a._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 =
								a.asm.dw).apply(null, arguments)
						},
						vy = a._emscripten_bind_btGhostPairCallback___destroy___0 = function () {
							return (vy = a._emscripten_bind_btGhostPairCallback___destroy___0 = a.asm.ew).apply(null, arguments)
						},
						wy = a._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = function () {
							return (wy = a._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = a.asm.fw).apply(null, arguments)
						},
						xy = a._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = function () {
							return (xy = a._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 =
								a.asm.gw).apply(null, arguments)
						},
						yy = a._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = function () {
							return (yy = a._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = a.asm.hw).apply(null, arguments)
						},
						zy = a._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = function () {
							return (zy = a._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = a.asm.iw).apply(null, arguments)
						},
						Ay = a._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = function () {
							return (Ay = a._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 =
								a.asm.jw).apply(null, arguments)
						},
						By = a._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = function () {
							return (By = a._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = a.asm.kw).apply(null, arguments)
						},
						Cy = a._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = function () {
							return (Cy = a._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = a.asm.lw).apply(null, arguments)
						},
						Dy = a._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = function () {
							return (Dy = a._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 =
								a.asm.mw).apply(null, arguments)
						},
						Ey = a._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = function () {
							return (Ey = a._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = a.asm.nw).apply(null, arguments)
						},
						Fy = a._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = function () {
							return (Fy = a._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 = a.asm.ow).apply(null, arguments)
						},
						Gy = a._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = function () {
							return (Gy = a._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 =
								a.asm.pw).apply(null, arguments)
						},
						Hy = a._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = function () {
							return (Hy = a._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 = a.asm.qw).apply(null, arguments)
						},
						Iy = a._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = function () {
							return (Iy = a._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = a.asm.rw).apply(null, arguments)
						},
						Jy = a._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = function () {
							return (Jy = a._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 =
								a.asm.sw).apply(null, arguments)
						},
						Ky = a._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = function () {
							return (Ky = a._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = a.asm.tw).apply(null, arguments)
						},
						Ly = a._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = function () {
							return (Ly = a._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = a.asm.uw).apply(null, arguments)
						},
						My = a._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 = function () {
							return (My = a._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 =
								a.asm.vw).apply(null, arguments)
						},
						Ny = a._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = function () {
							return (Ny = a._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = a.asm.ww).apply(null, arguments)
						},
						Oy = a._emscripten_bind_Face_get_m_n_1 = function () {
							return (Oy = a._emscripten_bind_Face_get_m_n_1 = a.asm.xw).apply(null, arguments)
						},
						Py = a._emscripten_bind_Face_set_m_n_2 = function () {
							return (Py = a._emscripten_bind_Face_set_m_n_2 = a.asm.yw).apply(null, arguments)
						},
						Qy = a._emscripten_bind_Face_get_m_normal_0 = function () {
							return (Qy =
								a._emscripten_bind_Face_get_m_normal_0 = a.asm.zw).apply(null, arguments)
						},
						Ry = a._emscripten_bind_Face_set_m_normal_1 = function () {
							return (Ry = a._emscripten_bind_Face_set_m_normal_1 = a.asm.Aw).apply(null, arguments)
						},
						Sy = a._emscripten_bind_Face_get_m_ra_0 = function () {
							return (Sy = a._emscripten_bind_Face_get_m_ra_0 = a.asm.Bw).apply(null, arguments)
						},
						Ty = a._emscripten_bind_Face_set_m_ra_1 = function () {
							return (Ty = a._emscripten_bind_Face_set_m_ra_1 = a.asm.Cw).apply(null, arguments)
						},
						Uy = a._emscripten_bind_Face___destroy___0 =
						function () {
							return (Uy = a._emscripten_bind_Face___destroy___0 = a.asm.Dw).apply(null, arguments)
						},
						Vy = a._emscripten_bind_tFaceArray_size_0 = function () {
							return (Vy = a._emscripten_bind_tFaceArray_size_0 = a.asm.Ew).apply(null, arguments)
						},
						Wy = a._emscripten_bind_tFaceArray_at_1 = function () {
							return (Wy = a._emscripten_bind_tFaceArray_at_1 = a.asm.Fw).apply(null, arguments)
						},
						Xy = a._emscripten_bind_tFaceArray___destroy___0 = function () {
							return (Xy = a._emscripten_bind_tFaceArray___destroy___0 = a.asm.Gw).apply(null, arguments)
						},
						Yy = a._emscripten_bind_Node_get_m_x_0 =
						function () {
							return (Yy = a._emscripten_bind_Node_get_m_x_0 = a.asm.Hw).apply(null, arguments)
						},
						Zy = a._emscripten_bind_Node_set_m_x_1 = function () {
							return (Zy = a._emscripten_bind_Node_set_m_x_1 = a.asm.Iw).apply(null, arguments)
						},
						$y = a._emscripten_bind_Node_get_m_q_0 = function () {
							return ($y = a._emscripten_bind_Node_get_m_q_0 = a.asm.Jw).apply(null, arguments)
						},
						az = a._emscripten_bind_Node_set_m_q_1 = function () {
							return (az = a._emscripten_bind_Node_set_m_q_1 = a.asm.Kw).apply(null, arguments)
						},
						bz = a._emscripten_bind_Node_get_m_v_0 = function () {
							return (bz =
								a._emscripten_bind_Node_get_m_v_0 = a.asm.Lw).apply(null, arguments)
						},
						cz = a._emscripten_bind_Node_set_m_v_1 = function () {
							return (cz = a._emscripten_bind_Node_set_m_v_1 = a.asm.Mw).apply(null, arguments)
						},
						dz = a._emscripten_bind_Node_get_m_f_0 = function () {
							return (dz = a._emscripten_bind_Node_get_m_f_0 = a.asm.Nw).apply(null, arguments)
						},
						ez = a._emscripten_bind_Node_set_m_f_1 = function () {
							return (ez = a._emscripten_bind_Node_set_m_f_1 = a.asm.Ow).apply(null, arguments)
						},
						fz = a._emscripten_bind_Node_get_m_n_0 = function () {
							return (fz = a._emscripten_bind_Node_get_m_n_0 =
								a.asm.Pw).apply(null, arguments)
						},
						gz = a._emscripten_bind_Node_set_m_n_1 = function () {
							return (gz = a._emscripten_bind_Node_set_m_n_1 = a.asm.Qw).apply(null, arguments)
						},
						hz = a._emscripten_bind_Node_get_m_im_0 = function () {
							return (hz = a._emscripten_bind_Node_get_m_im_0 = a.asm.Rw).apply(null, arguments)
						},
						iz = a._emscripten_bind_Node_set_m_im_1 = function () {
							return (iz = a._emscripten_bind_Node_set_m_im_1 = a.asm.Sw).apply(null, arguments)
						},
						jz = a._emscripten_bind_Node_get_m_area_0 = function () {
							return (jz = a._emscripten_bind_Node_get_m_area_0 =
								a.asm.Tw).apply(null, arguments)
						},
						kz = a._emscripten_bind_Node_set_m_area_1 = function () {
							return (kz = a._emscripten_bind_Node_set_m_area_1 = a.asm.Uw).apply(null, arguments)
						},
						lz = a._emscripten_bind_Node___destroy___0 = function () {
							return (lz = a._emscripten_bind_Node___destroy___0 = a.asm.Vw).apply(null, arguments)
						},
						mz = a._emscripten_bind_tNodeArray_size_0 = function () {
							return (mz = a._emscripten_bind_tNodeArray_size_0 = a.asm.Ww).apply(null, arguments)
						},
						nz = a._emscripten_bind_tNodeArray_at_1 = function () {
							return (nz = a._emscripten_bind_tNodeArray_at_1 =
								a.asm.Xw).apply(null, arguments)
						},
						oz = a._emscripten_bind_tNodeArray___destroy___0 = function () {
							return (oz = a._emscripten_bind_tNodeArray___destroy___0 = a.asm.Yw).apply(null, arguments)
						},
						pz = a._emscripten_bind_Material_get_m_kLST_0 = function () {
							return (pz = a._emscripten_bind_Material_get_m_kLST_0 = a.asm.Zw).apply(null, arguments)
						},
						qz = a._emscripten_bind_Material_set_m_kLST_1 = function () {
							return (qz = a._emscripten_bind_Material_set_m_kLST_1 = a.asm._w).apply(null, arguments)
						},
						rz = a._emscripten_bind_Material_get_m_kAST_0 = function () {
							return (rz =
								a._emscripten_bind_Material_get_m_kAST_0 = a.asm.$w).apply(null, arguments)
						},
						sz = a._emscripten_bind_Material_set_m_kAST_1 = function () {
							return (sz = a._emscripten_bind_Material_set_m_kAST_1 = a.asm.ax).apply(null, arguments)
						},
						tz = a._emscripten_bind_Material_get_m_kVST_0 = function () {
							return (tz = a._emscripten_bind_Material_get_m_kVST_0 = a.asm.bx).apply(null, arguments)
						},
						uz = a._emscripten_bind_Material_set_m_kVST_1 = function () {
							return (uz = a._emscripten_bind_Material_set_m_kVST_1 = a.asm.cx).apply(null, arguments)
						},
						vz = a._emscripten_bind_Material_get_m_flags_0 =
						function () {
							return (vz = a._emscripten_bind_Material_get_m_flags_0 = a.asm.dx).apply(null, arguments)
						},
						wz = a._emscripten_bind_Material_set_m_flags_1 = function () {
							return (wz = a._emscripten_bind_Material_set_m_flags_1 = a.asm.ex).apply(null, arguments)
						},
						xz = a._emscripten_bind_Material___destroy___0 = function () {
							return (xz = a._emscripten_bind_Material___destroy___0 = a.asm.fx).apply(null, arguments)
						},
						yz = a._emscripten_bind_tMaterialArray_size_0 = function () {
							return (yz = a._emscripten_bind_tMaterialArray_size_0 = a.asm.gx).apply(null,
								arguments)
						},
						zz = a._emscripten_bind_tMaterialArray_at_1 = function () {
							return (zz = a._emscripten_bind_tMaterialArray_at_1 = a.asm.hx).apply(null, arguments)
						},
						Az = a._emscripten_bind_tMaterialArray___destroy___0 = function () {
							return (Az = a._emscripten_bind_tMaterialArray___destroy___0 = a.asm.ix).apply(null, arguments)
						},
						Bz = a._emscripten_bind_Anchor_get_m_node_0 = function () {
							return (Bz = a._emscripten_bind_Anchor_get_m_node_0 = a.asm.jx).apply(null, arguments)
						},
						Cz = a._emscripten_bind_Anchor_set_m_node_1 = function () {
							return (Cz = a._emscripten_bind_Anchor_set_m_node_1 =
								a.asm.kx).apply(null, arguments)
						},
						Dz = a._emscripten_bind_Anchor_get_m_local_0 = function () {
							return (Dz = a._emscripten_bind_Anchor_get_m_local_0 = a.asm.lx).apply(null, arguments)
						},
						Ez = a._emscripten_bind_Anchor_set_m_local_1 = function () {
							return (Ez = a._emscripten_bind_Anchor_set_m_local_1 = a.asm.mx).apply(null, arguments)
						},
						Fz = a._emscripten_bind_Anchor_get_m_body_0 = function () {
							return (Fz = a._emscripten_bind_Anchor_get_m_body_0 = a.asm.nx).apply(null, arguments)
						},
						Gz = a._emscripten_bind_Anchor_set_m_body_1 = function () {
							return (Gz =
								a._emscripten_bind_Anchor_set_m_body_1 = a.asm.ox).apply(null, arguments)
						},
						Hz = a._emscripten_bind_Anchor_get_m_influence_0 = function () {
							return (Hz = a._emscripten_bind_Anchor_get_m_influence_0 = a.asm.px).apply(null, arguments)
						},
						Iz = a._emscripten_bind_Anchor_set_m_influence_1 = function () {
							return (Iz = a._emscripten_bind_Anchor_set_m_influence_1 = a.asm.qx).apply(null, arguments)
						},
						Jz = a._emscripten_bind_Anchor_get_m_c0_0 = function () {
							return (Jz = a._emscripten_bind_Anchor_get_m_c0_0 = a.asm.rx).apply(null, arguments)
						},
						Kz = a._emscripten_bind_Anchor_set_m_c0_1 =
						function () {
							return (Kz = a._emscripten_bind_Anchor_set_m_c0_1 = a.asm.sx).apply(null, arguments)
						},
						Lz = a._emscripten_bind_Anchor_get_m_c1_0 = function () {
							return (Lz = a._emscripten_bind_Anchor_get_m_c1_0 = a.asm.tx).apply(null, arguments)
						},
						Mz = a._emscripten_bind_Anchor_set_m_c1_1 = function () {
							return (Mz = a._emscripten_bind_Anchor_set_m_c1_1 = a.asm.ux).apply(null, arguments)
						},
						Nz = a._emscripten_bind_Anchor_get_m_c2_0 = function () {
							return (Nz = a._emscripten_bind_Anchor_get_m_c2_0 = a.asm.vx).apply(null, arguments)
						},
						Oz = a._emscripten_bind_Anchor_set_m_c2_1 =
						function () {
							return (Oz = a._emscripten_bind_Anchor_set_m_c2_1 = a.asm.wx).apply(null, arguments)
						},
						Pz = a._emscripten_bind_Anchor___destroy___0 = function () {
							return (Pz = a._emscripten_bind_Anchor___destroy___0 = a.asm.xx).apply(null, arguments)
						},
						Qz = a._emscripten_bind_tAnchorArray_size_0 = function () {
							return (Qz = a._emscripten_bind_tAnchorArray_size_0 = a.asm.yx).apply(null, arguments)
						},
						Rz = a._emscripten_bind_tAnchorArray_at_1 = function () {
							return (Rz = a._emscripten_bind_tAnchorArray_at_1 = a.asm.zx).apply(null, arguments)
						},
						Sz = a._emscripten_bind_tAnchorArray_clear_0 =
						function () {
							return (Sz = a._emscripten_bind_tAnchorArray_clear_0 = a.asm.Ax).apply(null, arguments)
						},
						Tz = a._emscripten_bind_tAnchorArray_push_back_1 = function () {
							return (Tz = a._emscripten_bind_tAnchorArray_push_back_1 = a.asm.Bx).apply(null, arguments)
						},
						Uz = a._emscripten_bind_tAnchorArray_pop_back_0 = function () {
							return (Uz = a._emscripten_bind_tAnchorArray_pop_back_0 = a.asm.Cx).apply(null, arguments)
						},
						Vz = a._emscripten_bind_tAnchorArray___destroy___0 = function () {
							return (Vz = a._emscripten_bind_tAnchorArray___destroy___0 = a.asm.Dx).apply(null,
								arguments)
						},
						Wz = a._emscripten_bind_Config_get_kVCF_0 = function () {
							return (Wz = a._emscripten_bind_Config_get_kVCF_0 = a.asm.Ex).apply(null, arguments)
						},
						Xz = a._emscripten_bind_Config_set_kVCF_1 = function () {
							return (Xz = a._emscripten_bind_Config_set_kVCF_1 = a.asm.Fx).apply(null, arguments)
						},
						Yz = a._emscripten_bind_Config_get_kDP_0 = function () {
							return (Yz = a._emscripten_bind_Config_get_kDP_0 = a.asm.Gx).apply(null, arguments)
						},
						Zz = a._emscripten_bind_Config_set_kDP_1 = function () {
							return (Zz = a._emscripten_bind_Config_set_kDP_1 = a.asm.Hx).apply(null,
								arguments)
						},
						$z = a._emscripten_bind_Config_get_kDG_0 = function () {
							return ($z = a._emscripten_bind_Config_get_kDG_0 = a.asm.Ix).apply(null, arguments)
						},
						aA = a._emscripten_bind_Config_set_kDG_1 = function () {
							return (aA = a._emscripten_bind_Config_set_kDG_1 = a.asm.Jx).apply(null, arguments)
						},
						bA = a._emscripten_bind_Config_get_kLF_0 = function () {
							return (bA = a._emscripten_bind_Config_get_kLF_0 = a.asm.Kx).apply(null, arguments)
						},
						cA = a._emscripten_bind_Config_set_kLF_1 = function () {
							return (cA = a._emscripten_bind_Config_set_kLF_1 = a.asm.Lx).apply(null,
								arguments)
						},
						dA = a._emscripten_bind_Config_get_kPR_0 = function () {
							return (dA = a._emscripten_bind_Config_get_kPR_0 = a.asm.Mx).apply(null, arguments)
						},
						eA = a._emscripten_bind_Config_set_kPR_1 = function () {
							return (eA = a._emscripten_bind_Config_set_kPR_1 = a.asm.Nx).apply(null, arguments)
						},
						fA = a._emscripten_bind_Config_get_kVC_0 = function () {
							return (fA = a._emscripten_bind_Config_get_kVC_0 = a.asm.Ox).apply(null, arguments)
						},
						gA = a._emscripten_bind_Config_set_kVC_1 = function () {
							return (gA = a._emscripten_bind_Config_set_kVC_1 = a.asm.Px).apply(null,
								arguments)
						},
						hA = a._emscripten_bind_Config_get_kDF_0 = function () {
							return (hA = a._emscripten_bind_Config_get_kDF_0 = a.asm.Qx).apply(null, arguments)
						},
						iA = a._emscripten_bind_Config_set_kDF_1 = function () {
							return (iA = a._emscripten_bind_Config_set_kDF_1 = a.asm.Rx).apply(null, arguments)
						},
						jA = a._emscripten_bind_Config_get_kMT_0 = function () {
							return (jA = a._emscripten_bind_Config_get_kMT_0 = a.asm.Sx).apply(null, arguments)
						},
						kA = a._emscripten_bind_Config_set_kMT_1 = function () {
							return (kA = a._emscripten_bind_Config_set_kMT_1 = a.asm.Tx).apply(null,
								arguments)
						},
						lA = a._emscripten_bind_Config_get_kCHR_0 = function () {
							return (lA = a._emscripten_bind_Config_get_kCHR_0 = a.asm.Ux).apply(null, arguments)
						},
						mA = a._emscripten_bind_Config_set_kCHR_1 = function () {
							return (mA = a._emscripten_bind_Config_set_kCHR_1 = a.asm.Vx).apply(null, arguments)
						},
						nA = a._emscripten_bind_Config_get_kKHR_0 = function () {
							return (nA = a._emscripten_bind_Config_get_kKHR_0 = a.asm.Wx).apply(null, arguments)
						},
						oA = a._emscripten_bind_Config_set_kKHR_1 = function () {
							return (oA = a._emscripten_bind_Config_set_kKHR_1 =
								a.asm.Xx).apply(null, arguments)
						},
						pA = a._emscripten_bind_Config_get_kSHR_0 = function () {
							return (pA = a._emscripten_bind_Config_get_kSHR_0 = a.asm.Yx).apply(null, arguments)
						},
						qA = a._emscripten_bind_Config_set_kSHR_1 = function () {
							return (qA = a._emscripten_bind_Config_set_kSHR_1 = a.asm.Zx).apply(null, arguments)
						},
						rA = a._emscripten_bind_Config_get_kAHR_0 = function () {
							return (rA = a._emscripten_bind_Config_get_kAHR_0 = a.asm._x).apply(null, arguments)
						},
						sA = a._emscripten_bind_Config_set_kAHR_1 = function () {
							return (sA = a._emscripten_bind_Config_set_kAHR_1 =
								a.asm.$x).apply(null, arguments)
						},
						tA = a._emscripten_bind_Config_get_kSRHR_CL_0 = function () {
							return (tA = a._emscripten_bind_Config_get_kSRHR_CL_0 = a.asm.ay).apply(null, arguments)
						},
						uA = a._emscripten_bind_Config_set_kSRHR_CL_1 = function () {
							return (uA = a._emscripten_bind_Config_set_kSRHR_CL_1 = a.asm.by).apply(null, arguments)
						},
						vA = a._emscripten_bind_Config_get_kSKHR_CL_0 = function () {
							return (vA = a._emscripten_bind_Config_get_kSKHR_CL_0 = a.asm.cy).apply(null, arguments)
						},
						wA = a._emscripten_bind_Config_set_kSKHR_CL_1 = function () {
							return (wA =
								a._emscripten_bind_Config_set_kSKHR_CL_1 = a.asm.dy).apply(null, arguments)
						},
						xA = a._emscripten_bind_Config_get_kSSHR_CL_0 = function () {
							return (xA = a._emscripten_bind_Config_get_kSSHR_CL_0 = a.asm.ey).apply(null, arguments)
						},
						yA = a._emscripten_bind_Config_set_kSSHR_CL_1 = function () {
							return (yA = a._emscripten_bind_Config_set_kSSHR_CL_1 = a.asm.fy).apply(null, arguments)
						},
						zA = a._emscripten_bind_Config_get_kSR_SPLT_CL_0 = function () {
							return (zA = a._emscripten_bind_Config_get_kSR_SPLT_CL_0 = a.asm.gy).apply(null, arguments)
						},
						AA = a._emscripten_bind_Config_set_kSR_SPLT_CL_1 =
						function () {
							return (AA = a._emscripten_bind_Config_set_kSR_SPLT_CL_1 = a.asm.hy).apply(null, arguments)
						},
						BA = a._emscripten_bind_Config_get_kSK_SPLT_CL_0 = function () {
							return (BA = a._emscripten_bind_Config_get_kSK_SPLT_CL_0 = a.asm.iy).apply(null, arguments)
						},
						CA = a._emscripten_bind_Config_set_kSK_SPLT_CL_1 = function () {
							return (CA = a._emscripten_bind_Config_set_kSK_SPLT_CL_1 = a.asm.jy).apply(null, arguments)
						},
						DA = a._emscripten_bind_Config_get_kSS_SPLT_CL_0 = function () {
							return (DA = a._emscripten_bind_Config_get_kSS_SPLT_CL_0 = a.asm.ky).apply(null,
								arguments)
						},
						EA = a._emscripten_bind_Config_set_kSS_SPLT_CL_1 = function () {
							return (EA = a._emscripten_bind_Config_set_kSS_SPLT_CL_1 = a.asm.ly).apply(null, arguments)
						},
						FA = a._emscripten_bind_Config_get_maxvolume_0 = function () {
							return (FA = a._emscripten_bind_Config_get_maxvolume_0 = a.asm.my).apply(null, arguments)
						},
						GA = a._emscripten_bind_Config_set_maxvolume_1 = function () {
							return (GA = a._emscripten_bind_Config_set_maxvolume_1 = a.asm.ny).apply(null, arguments)
						},
						HA = a._emscripten_bind_Config_get_timescale_0 = function () {
							return (HA =
								a._emscripten_bind_Config_get_timescale_0 = a.asm.oy).apply(null, arguments)
						},
						IA = a._emscripten_bind_Config_set_timescale_1 = function () {
							return (IA = a._emscripten_bind_Config_set_timescale_1 = a.asm.py).apply(null, arguments)
						},
						JA = a._emscripten_bind_Config_get_viterations_0 = function () {
							return (JA = a._emscripten_bind_Config_get_viterations_0 = a.asm.qy).apply(null, arguments)
						},
						KA = a._emscripten_bind_Config_set_viterations_1 = function () {
							return (KA = a._emscripten_bind_Config_set_viterations_1 = a.asm.ry).apply(null, arguments)
						},
						LA = a._emscripten_bind_Config_get_piterations_0 = function () {
							return (LA = a._emscripten_bind_Config_get_piterations_0 = a.asm.sy).apply(null, arguments)
						},
						MA = a._emscripten_bind_Config_set_piterations_1 = function () {
							return (MA = a._emscripten_bind_Config_set_piterations_1 = a.asm.ty).apply(null, arguments)
						},
						NA = a._emscripten_bind_Config_get_diterations_0 = function () {
							return (NA = a._emscripten_bind_Config_get_diterations_0 = a.asm.uy).apply(null, arguments)
						},
						OA = a._emscripten_bind_Config_set_diterations_1 = function () {
							return (OA =
								a._emscripten_bind_Config_set_diterations_1 = a.asm.vy).apply(null, arguments)
						},
						PA = a._emscripten_bind_Config_get_citerations_0 = function () {
							return (PA = a._emscripten_bind_Config_get_citerations_0 = a.asm.wy).apply(null, arguments)
						},
						QA = a._emscripten_bind_Config_set_citerations_1 = function () {
							return (QA = a._emscripten_bind_Config_set_citerations_1 = a.asm.xy).apply(null, arguments)
						},
						RA = a._emscripten_bind_Config_get_collisions_0 = function () {
							return (RA = a._emscripten_bind_Config_get_collisions_0 = a.asm.yy).apply(null, arguments)
						},
						SA = a._emscripten_bind_Config_set_collisions_1 = function () {
							return (SA = a._emscripten_bind_Config_set_collisions_1 = a.asm.zy).apply(null, arguments)
						},
						TA = a._emscripten_bind_Config___destroy___0 = function () {
							return (TA = a._emscripten_bind_Config___destroy___0 = a.asm.Ay).apply(null, arguments)
						},
						UA = a._emscripten_bind_btSoftBody_btSoftBody_4 = function () {
							return (UA = a._emscripten_bind_btSoftBody_btSoftBody_4 = a.asm.By).apply(null, arguments)
						},
						VA = a._emscripten_bind_btSoftBody_checkLink_2 = function () {
							return (VA = a._emscripten_bind_btSoftBody_checkLink_2 =
								a.asm.Cy).apply(null, arguments)
						},
						WA = a._emscripten_bind_btSoftBody_checkFace_3 = function () {
							return (WA = a._emscripten_bind_btSoftBody_checkFace_3 = a.asm.Dy).apply(null, arguments)
						},
						XA = a._emscripten_bind_btSoftBody_appendMaterial_0 = function () {
							return (XA = a._emscripten_bind_btSoftBody_appendMaterial_0 = a.asm.Ey).apply(null, arguments)
						},
						YA = a._emscripten_bind_btSoftBody_appendNode_2 = function () {
							return (YA = a._emscripten_bind_btSoftBody_appendNode_2 = a.asm.Fy).apply(null, arguments)
						},
						ZA = a._emscripten_bind_btSoftBody_appendLink_4 =
						function () {
							return (ZA = a._emscripten_bind_btSoftBody_appendLink_4 = a.asm.Gy).apply(null, arguments)
						},
						$A = a._emscripten_bind_btSoftBody_appendFace_4 = function () {
							return ($A = a._emscripten_bind_btSoftBody_appendFace_4 = a.asm.Hy).apply(null, arguments)
						},
						aB = a._emscripten_bind_btSoftBody_appendTetra_5 = function () {
							return (aB = a._emscripten_bind_btSoftBody_appendTetra_5 = a.asm.Iy).apply(null, arguments)
						},
						bB = a._emscripten_bind_btSoftBody_appendAnchor_4 = function () {
							return (bB = a._emscripten_bind_btSoftBody_appendAnchor_4 = a.asm.Jy).apply(null,
								arguments)
						},
						cB = a._emscripten_bind_btSoftBody_addForce_1 = function () {
							return (cB = a._emscripten_bind_btSoftBody_addForce_1 = a.asm.Ky).apply(null, arguments)
						},
						dB = a._emscripten_bind_btSoftBody_addForce_2 = function () {
							return (dB = a._emscripten_bind_btSoftBody_addForce_2 = a.asm.Ly).apply(null, arguments)
						},
						eB = a._emscripten_bind_btSoftBody_addAeroForceToNode_2 = function () {
							return (eB = a._emscripten_bind_btSoftBody_addAeroForceToNode_2 = a.asm.My).apply(null, arguments)
						},
						fB = a._emscripten_bind_btSoftBody_getTotalMass_0 = function () {
							return (fB =
								a._emscripten_bind_btSoftBody_getTotalMass_0 = a.asm.Ny).apply(null, arguments)
						},
						gB = a._emscripten_bind_btSoftBody_setTotalMass_2 = function () {
							return (gB = a._emscripten_bind_btSoftBody_setTotalMass_2 = a.asm.Oy).apply(null, arguments)
						},
						hB = a._emscripten_bind_btSoftBody_setMass_2 = function () {
							return (hB = a._emscripten_bind_btSoftBody_setMass_2 = a.asm.Py).apply(null, arguments)
						},
						iB = a._emscripten_bind_btSoftBody_transform_1 = function () {
							return (iB = a._emscripten_bind_btSoftBody_transform_1 = a.asm.Qy).apply(null, arguments)
						},
						jB = a._emscripten_bind_btSoftBody_translate_1 = function () {
							return (jB = a._emscripten_bind_btSoftBody_translate_1 = a.asm.Ry).apply(null, arguments)
						},
						kB = a._emscripten_bind_btSoftBody_rotate_1 = function () {
							return (kB = a._emscripten_bind_btSoftBody_rotate_1 = a.asm.Sy).apply(null, arguments)
						},
						lB = a._emscripten_bind_btSoftBody_scale_1 = function () {
							return (lB = a._emscripten_bind_btSoftBody_scale_1 = a.asm.Ty).apply(null, arguments)
						},
						mB = a._emscripten_bind_btSoftBody_generateClusters_1 = function () {
							return (mB = a._emscripten_bind_btSoftBody_generateClusters_1 =
								a.asm.Uy).apply(null, arguments)
						},
						nB = a._emscripten_bind_btSoftBody_generateClusters_2 = function () {
							return (nB = a._emscripten_bind_btSoftBody_generateClusters_2 = a.asm.Vy).apply(null, arguments)
						},
						oB = a._emscripten_bind_btSoftBody_generateBendingConstraints_2 = function () {
							return (oB = a._emscripten_bind_btSoftBody_generateBendingConstraints_2 = a.asm.Wy).apply(null, arguments)
						},
						pB = a._emscripten_bind_btSoftBody_upcast_1 = function () {
							return (pB = a._emscripten_bind_btSoftBody_upcast_1 = a.asm.Xy).apply(null, arguments)
						},
						qB =
						a._emscripten_bind_btSoftBody_getRestLengthScale_0 = function () {
							return (qB = a._emscripten_bind_btSoftBody_getRestLengthScale_0 = a.asm.Yy).apply(null, arguments)
						},
						rB = a._emscripten_bind_btSoftBody_setRestLengthScale_1 = function () {
							return (rB = a._emscripten_bind_btSoftBody_setRestLengthScale_1 = a.asm.Zy).apply(null, arguments)
						},
						sB = a._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = function () {
							return (sB = a._emscripten_bind_btSoftBody_setAnisotropicFriction_2 = a.asm._y).apply(null, arguments)
						},
						tB = a._emscripten_bind_btSoftBody_getCollisionShape_0 =
						function () {
							return (tB = a._emscripten_bind_btSoftBody_getCollisionShape_0 = a.asm.$y).apply(null, arguments)
						},
						uB = a._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = function () {
							return (uB = a._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 = a.asm.az).apply(null, arguments)
						},
						vB = a._emscripten_bind_btSoftBody_setActivationState_1 = function () {
							return (vB = a._emscripten_bind_btSoftBody_setActivationState_1 = a.asm.bz).apply(null, arguments)
						},
						wB = a._emscripten_bind_btSoftBody_forceActivationState_1 = function () {
							return (wB =
								a._emscripten_bind_btSoftBody_forceActivationState_1 = a.asm.cz).apply(null, arguments)
						},
						xB = a._emscripten_bind_btSoftBody_activate_0 = function () {
							return (xB = a._emscripten_bind_btSoftBody_activate_0 = a.asm.dz).apply(null, arguments)
						},
						yB = a._emscripten_bind_btSoftBody_activate_1 = function () {
							return (yB = a._emscripten_bind_btSoftBody_activate_1 = a.asm.ez).apply(null, arguments)
						},
						zB = a._emscripten_bind_btSoftBody_isActive_0 = function () {
							return (zB = a._emscripten_bind_btSoftBody_isActive_0 = a.asm.fz).apply(null, arguments)
						},
						AB = a._emscripten_bind_btSoftBody_isKinematicObject_0 = function () {
							return (AB = a._emscripten_bind_btSoftBody_isKinematicObject_0 = a.asm.gz).apply(null, arguments)
						},
						BB = a._emscripten_bind_btSoftBody_isStaticObject_0 = function () {
							return (BB = a._emscripten_bind_btSoftBody_isStaticObject_0 = a.asm.hz).apply(null, arguments)
						},
						CB = a._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = function () {
							return (CB = a._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = a.asm.iz).apply(null, arguments)
						},
						DB = a._emscripten_bind_btSoftBody_getRestitution_0 =
						function () {
							return (DB = a._emscripten_bind_btSoftBody_getRestitution_0 = a.asm.jz).apply(null, arguments)
						},
						EB = a._emscripten_bind_btSoftBody_getFriction_0 = function () {
							return (EB = a._emscripten_bind_btSoftBody_getFriction_0 = a.asm.kz).apply(null, arguments)
						},
						FB = a._emscripten_bind_btSoftBody_getRollingFriction_0 = function () {
							return (FB = a._emscripten_bind_btSoftBody_getRollingFriction_0 = a.asm.lz).apply(null, arguments)
						},
						GB = a._emscripten_bind_btSoftBody_setRestitution_1 = function () {
							return (GB = a._emscripten_bind_btSoftBody_setRestitution_1 =
								a.asm.mz).apply(null, arguments)
						},
						HB = a._emscripten_bind_btSoftBody_setFriction_1 = function () {
							return (HB = a._emscripten_bind_btSoftBody_setFriction_1 = a.asm.nz).apply(null, arguments)
						},
						IB = a._emscripten_bind_btSoftBody_setRollingFriction_1 = function () {
							return (IB = a._emscripten_bind_btSoftBody_setRollingFriction_1 = a.asm.oz).apply(null, arguments)
						},
						JB = a._emscripten_bind_btSoftBody_getWorldTransform_0 = function () {
							return (JB = a._emscripten_bind_btSoftBody_getWorldTransform_0 = a.asm.pz).apply(null, arguments)
						},
						KB = a._emscripten_bind_btSoftBody_getCollisionFlags_0 =
						function () {
							return (KB = a._emscripten_bind_btSoftBody_getCollisionFlags_0 = a.asm.qz).apply(null, arguments)
						},
						LB = a._emscripten_bind_btSoftBody_setCollisionFlags_1 = function () {
							return (LB = a._emscripten_bind_btSoftBody_setCollisionFlags_1 = a.asm.rz).apply(null, arguments)
						},
						MB = a._emscripten_bind_btSoftBody_setWorldTransform_1 = function () {
							return (MB = a._emscripten_bind_btSoftBody_setWorldTransform_1 = a.asm.sz).apply(null, arguments)
						},
						NB = a._emscripten_bind_btSoftBody_setCollisionShape_1 = function () {
							return (NB = a._emscripten_bind_btSoftBody_setCollisionShape_1 =
								a.asm.tz).apply(null, arguments)
						},
						OB = a._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = function () {
							return (OB = a._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = a.asm.uz).apply(null, arguments)
						},
						PB = a._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = function () {
							return (PB = a._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = a.asm.vz).apply(null, arguments)
						},
						QB = a._emscripten_bind_btSoftBody_getUserIndex_0 = function () {
							return (QB = a._emscripten_bind_btSoftBody_getUserIndex_0 = a.asm.wz).apply(null,
								arguments)
						},
						RB = a._emscripten_bind_btSoftBody_setUserIndex_1 = function () {
							return (RB = a._emscripten_bind_btSoftBody_setUserIndex_1 = a.asm.xz).apply(null, arguments)
						},
						SB = a._emscripten_bind_btSoftBody_getUserPointer_0 = function () {
							return (SB = a._emscripten_bind_btSoftBody_getUserPointer_0 = a.asm.yz).apply(null, arguments)
						},
						TB = a._emscripten_bind_btSoftBody_setUserPointer_1 = function () {
							return (TB = a._emscripten_bind_btSoftBody_setUserPointer_1 = a.asm.zz).apply(null, arguments)
						},
						UB = a._emscripten_bind_btSoftBody_getBroadphaseHandle_0 =
						function () {
							return (UB = a._emscripten_bind_btSoftBody_getBroadphaseHandle_0 = a.asm.Az).apply(null, arguments)
						},
						VB = a._emscripten_bind_btSoftBody_get_m_cfg_0 = function () {
							return (VB = a._emscripten_bind_btSoftBody_get_m_cfg_0 = a.asm.Bz).apply(null, arguments)
						},
						WB = a._emscripten_bind_btSoftBody_set_m_cfg_1 = function () {
							return (WB = a._emscripten_bind_btSoftBody_set_m_cfg_1 = a.asm.Cz).apply(null, arguments)
						},
						XB = a._emscripten_bind_btSoftBody_get_m_nodes_0 = function () {
							return (XB = a._emscripten_bind_btSoftBody_get_m_nodes_0 = a.asm.Dz).apply(null,
								arguments)
						},
						YB = a._emscripten_bind_btSoftBody_set_m_nodes_1 = function () {
							return (YB = a._emscripten_bind_btSoftBody_set_m_nodes_1 = a.asm.Ez).apply(null, arguments)
						},
						ZB = a._emscripten_bind_btSoftBody_get_m_faces_0 = function () {
							return (ZB = a._emscripten_bind_btSoftBody_get_m_faces_0 = a.asm.Fz).apply(null, arguments)
						},
						$B = a._emscripten_bind_btSoftBody_set_m_faces_1 = function () {
							return ($B = a._emscripten_bind_btSoftBody_set_m_faces_1 = a.asm.Gz).apply(null, arguments)
						},
						aC = a._emscripten_bind_btSoftBody_get_m_materials_0 = function () {
							return (aC =
								a._emscripten_bind_btSoftBody_get_m_materials_0 = a.asm.Hz).apply(null, arguments)
						},
						bC = a._emscripten_bind_btSoftBody_set_m_materials_1 = function () {
							return (bC = a._emscripten_bind_btSoftBody_set_m_materials_1 = a.asm.Iz).apply(null, arguments)
						},
						cC = a._emscripten_bind_btSoftBody_get_m_anchors_0 = function () {
							return (cC = a._emscripten_bind_btSoftBody_get_m_anchors_0 = a.asm.Jz).apply(null, arguments)
						},
						dC = a._emscripten_bind_btSoftBody_set_m_anchors_1 = function () {
							return (dC = a._emscripten_bind_btSoftBody_set_m_anchors_1 = a.asm.Kz).apply(null,
								arguments)
						},
						eC = a._emscripten_bind_btSoftBody___destroy___0 = function () {
							return (eC = a._emscripten_bind_btSoftBody___destroy___0 = a.asm.Lz).apply(null, arguments)
						},
						fC = a._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = function () {
							return (fC = a._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = a.asm.Mz).apply(null, arguments)
						},
						gC = a._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 =
						function () {
							return (gC = a._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 = a.asm.Nz).apply(null, arguments)
						},
						hC = a._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = function () {
							return (hC = a._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = a.asm.Oz).apply(null, arguments)
						},
						iC = a._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = function () {
							return (iC = a._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 =
								a.asm.Pz).apply(null, arguments)
						},
						jC = a._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = function () {
							return (jC = a._emscripten_bind_btDefaultSoftBodySolver___destroy___0 = a.asm.Qz).apply(null, arguments)
						},
						kC = a._emscripten_bind_btSoftBodyArray_size_0 = function () {
							return (kC = a._emscripten_bind_btSoftBodyArray_size_0 = a.asm.Rz).apply(null, arguments)
						},
						lC = a._emscripten_bind_btSoftBodyArray_at_1 = function () {
							return (lC = a._emscripten_bind_btSoftBodyArray_at_1 = a.asm.Sz).apply(null, arguments)
						},
						mC = a._emscripten_bind_btSoftBodyArray___destroy___0 =
						function () {
							return (mC = a._emscripten_bind_btSoftBodyArray___destroy___0 = a.asm.Tz).apply(null, arguments)
						},
						nC = a._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = function () {
							return (nC = a._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = a.asm.Uz).apply(null, arguments)
						},
						oC = a._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = function () {
							return (oC = a._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 = a.asm.Vz).apply(null, arguments)
						},
						pC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 =
						function () {
							return (pC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = a.asm.Wz).apply(null, arguments)
						},
						qC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = function () {
							return (qC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 = a.asm.Xz).apply(null, arguments)
						},
						rC = a._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = function () {
							return (rC = a._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = a.asm.Yz).apply(null, arguments)
						},
						sC = a._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 =
						function () {
							return (sC = a._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = a.asm.Zz).apply(null, arguments)
						},
						tC = a._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = function () {
							return (tC = a._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = a.asm._z).apply(null, arguments)
						},
						uC = a._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = function () {
							return (uC = a._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = a.asm.$z).apply(null, arguments)
						},
						vC = a._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 =
						function () {
							return (vC = a._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = a.asm.aA).apply(null, arguments)
						},
						wC = a._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = function () {
							return (wC = a._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 = a.asm.bA).apply(null, arguments)
						},
						xC = a._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = function () {
							return (xC = a._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = a.asm.cA).apply(null, arguments)
						},
						yC = a._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 =
						function () {
							return (yC = a._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = a.asm.dA).apply(null, arguments)
						},
						zC = a._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = function () {
							return (zC = a._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = a.asm.eA).apply(null, arguments)
						},
						AC = a._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = function () {
							return (AC = a._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = a.asm.fA).apply(null, arguments)
						},
						BC = a._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 =
						function () {
							return (BC = a._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = a.asm.gA).apply(null, arguments)
						},
						CC = a._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = function () {
							return (CC = a._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = a.asm.hA).apply(null, arguments)
						},
						DC = a._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = function () {
							return (DC = a._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = a.asm.iA).apply(null, arguments)
						},
						EC = a._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 =
						function () {
							return (EC = a._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = a.asm.jA).apply(null, arguments)
						},
						FC = a._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = function () {
							return (FC = a._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = a.asm.kA).apply(null, arguments)
						},
						GC = a._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = function () {
							return (GC = a._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = a.asm.lA).apply(null, arguments)
						},
						HC = a._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 =
						function () {
							return (HC = a._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = a.asm.mA).apply(null, arguments)
						},
						IC = a._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = function () {
							return (IC = a._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = a.asm.nA).apply(null, arguments)
						},
						JC = a._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = function () {
							return (JC = a._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = a.asm.oA).apply(null, arguments)
						},
						KC = a._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 =
						function () {
							return (KC = a._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = a.asm.pA).apply(null, arguments)
						},
						LC = a._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = function () {
							return (LC = a._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = a.asm.qA).apply(null, arguments)
						},
						MC = a._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = function () {
							return (MC = a._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = a.asm.rA).apply(null, arguments)
						},
						NC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 =
						function () {
							return (NC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = a.asm.sA).apply(null, arguments)
						},
						OC = a._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = function () {
							return (OC = a._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = a.asm.tA).apply(null, arguments)
						},
						PC = a._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = function () {
							return (PC = a._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = a.asm.uA).apply(null, arguments)
						},
						QC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 =
						function () {
							return (QC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = a.asm.vA).apply(null, arguments)
						},
						RC = a._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = function () {
							return (RC = a._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 = a.asm.wA).apply(null, arguments)
						},
						SC = a._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = function () {
							return (SC = a._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = a.asm.xA).apply(null, arguments)
						},
						TC = a._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 =
						function () {
							return (TC = a._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = a.asm.yA).apply(null, arguments)
						},
						UC = a._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = function () {
							return (UC = a._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = a.asm.zA).apply(null, arguments)
						},
						VC = a._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = function () {
							return (VC = a._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = a.asm.AA).apply(null,
								arguments)
						},
						WC = a._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = function () {
							return (WC = a._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = a.asm.BA).apply(null, arguments)
						},
						XC = a._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = function () {
							return (XC = a._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = a.asm.CA).apply(null, arguments)
						},
						YC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = function () {
							return (YC = a._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 =
								a.asm.DA).apply(null, arguments)
						},
						ZC = a._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = function () {
							return (ZC = a._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = a.asm.EA).apply(null, arguments)
						},
						$C = a._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = function () {
							return ($C = a._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_1 = a.asm.FA).apply(null, arguments)
						},
						aD = a._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = function () {
							return (aD =
								a._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_2 = a.asm.GA).apply(null, arguments)
						},
						bD = a._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = function () {
							return (bD = a._emscripten_bind_btSoftRigidDynamicsWorld_setInternalTickCallback_3 = a.asm.HA).apply(null, arguments)
						},
						cD = a._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = function () {
							return (cD = a._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 = a.asm.IA).apply(null, arguments)
						},
						dD = a._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 =
						function () {
							return (dD = a._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = a.asm.JA).apply(null, arguments)
						},
						eD = a._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = function () {
							return (eD = a._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = a.asm.KA).apply(null, arguments)
						},
						fD = a._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = function () {
							return (fD = a._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = a.asm.LA).apply(null, arguments)
						},
						gD = a._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = function () {
							return (gD =
								a._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = a.asm.MA).apply(null, arguments)
						},
						hD = a._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = function () {
							return (hD = a._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = a.asm.NA).apply(null, arguments)
						},
						iD = a._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = function () {
							return (iD = a._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = a.asm.OA).apply(null, arguments)
						},
						jD = a._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = function () {
							return (jD =
								a._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = a.asm.PA).apply(null, arguments)
						},
						kD = a._emscripten_bind_btSoftBodyHelpers___destroy___0 = function () {
							return (kD = a._emscripten_bind_btSoftBodyHelpers___destroy___0 = a.asm.QA).apply(null, arguments)
						},
						lD = a._emscripten_enum_PHY_ScalarType_PHY_FLOAT = function () {
							return (lD = a._emscripten_enum_PHY_ScalarType_PHY_FLOAT = a.asm.RA).apply(null, arguments)
						},
						mD = a._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = function () {
							return (mD = a._emscripten_enum_PHY_ScalarType_PHY_DOUBLE =
								a.asm.SA).apply(null, arguments)
						},
						nD = a._emscripten_enum_PHY_ScalarType_PHY_INTEGER = function () {
							return (nD = a._emscripten_enum_PHY_ScalarType_PHY_INTEGER = a.asm.TA).apply(null, arguments)
						},
						oD = a._emscripten_enum_PHY_ScalarType_PHY_SHORT = function () {
							return (oD = a._emscripten_enum_PHY_ScalarType_PHY_SHORT = a.asm.UA).apply(null, arguments)
						},
						pD = a._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = function () {
							return (pD = a._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = a.asm.VA).apply(null, arguments)
						},
						qD = a._emscripten_enum_PHY_ScalarType_PHY_UCHAR =
						function () {
							return (qD = a._emscripten_enum_PHY_ScalarType_PHY_UCHAR = a.asm.WA).apply(null, arguments)
						},
						rD = a._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_COMPOUND_SHAPE = function () {
							return (rD = a._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_COMPOUND_SHAPE = a.asm.XA).apply(null, arguments)
						},
						sD = a._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE_PART = function () {
							return (sD = a._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE_PART = a.asm.YA).apply(null, arguments)
						},
						tD = a._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE =
						function () {
							return (tD = a._emscripten_enum_eGIMPACT_SHAPE_TYPE_CONST_GIMPACT_TRIMESH_SHAPE = a.asm.ZA).apply(null, arguments)
						},
						uD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = function () {
							return (uD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = a.asm._A).apply(null, arguments)
						},
						vD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = function () {
							return (vD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = a.asm.$A).apply(null, arguments)
						},
						wD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM =
						function () {
							return (wD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = a.asm.aB).apply(null, arguments)
						},
						xD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = function () {
							return (xD = a._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = a.asm.bB).apply(null, arguments)
						};
					a._malloc = function () {
						return (a._malloc = a.asm.dB).apply(null, arguments)
					};
					a.UTF8ToString = ua;
					a.addFunction = function (b, c) {
						if (!oa) {
							oa = new WeakMap;
							for (var d = Aa.length, e = 0; e < 0 + d; e++) {
								var g = Ra(e);
								g && oa.set(g, e)
							}
						}
						if (oa.has(b)) return oa.get(b);
						if (na.length) d = na.pop();
						else {
							try {
								Aa.grow(1)
							} catch (T) {
								if (!(T instanceof RangeError)) throw T;
								throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
							}
							d = Aa.length - 1
						}
						try {
							e = d, Aa.set(e, b), Sa[e] = b
						} catch (T) {
							if (!(T instanceof TypeError)) throw T;
							if ("function" == typeof WebAssembly.Function) {
								g = {
									i: "i32",
									j: "i64",
									f: "f32",
									d: "f64"
								};
								var n = {
									parameters: [],
									results: "v" == c[0] ? [] : [g[c[0]]]
								};
								for (e = 1; e < c.length; ++e) n.parameters.push(g[c[e]]);
								e = new WebAssembly.Function(n, b)
							} else {
								g = [1, 0, 1, 96];
								n = c.slice(0, 1);
								c = c.slice(1);
								var D = {
									i: 127,
									j: 126,
									f: 125,
									d: 124
								};
								g.push(c.length);
								for (e = 0; e < c.length; ++e) g.push(D[c[e]]);
								"v" == n ? g.push(0) : g = g.concat([1, D[n]]);
								g[1] = g.length - 2;
								c = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0].concat(g, [2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0]));
								c = new WebAssembly.Module(c);
								e = (new WebAssembly.Instance(c, {
									e: {
										f: b
									}
								})).exports.f
							}
							c = d;
							Aa.set(c, e);
							Sa[c] = e
						}
						oa.set(b, d);
						return d
					};
					var yD;
					Ja = function zD() {
						yD || AD();
						yD || (Ja = zD)
					};

					function AD() {
						function b() {
							if (!yD && (yD = !0, a.calledRun = !0, !sa)) {
								Fa = !0;
								Qa(Ca);
								aa(a);
								if (a.onRuntimeInitialized) a.onRuntimeInitialized();
								if (a.postRun)
									for ("function" == typeof a.postRun && (a.postRun = [a.postRun]); a.postRun.length;) {
										var c = a.postRun.shift();
										Ea.unshift(c)
									}
								Qa(Ea)
							}
						}
						if (!(0 < Ha)) {
							if (a.preRun)
								for ("function" == typeof a.preRun && (a.preRun = [a.preRun]); a.preRun.length;) Ga();
							Qa(Ba);
							0 < Ha || (a.setStatus ? (a.setStatus("Running..."), setTimeout(function () {
								setTimeout(function () {
									a.setStatus("")
								}, 1);
								b()
							}, 1)) : b())
						}
					}
					a.run = AD;
					if (a.preInit)
						for ("function" == typeof a.preInit && (a.preInit = [a.preInit]); 0 < a.preInit.length;) a.preInit.pop()();
					AD();

					function f() {}
					f.prototype = Object.create(f.prototype);
					f.prototype.constructor = f;
					f.prototype.fB = f;
					f.gB = {};
					a.WrapperObject = f;

					function h(b) {
						return (b || f).gB
					}
					a.getCache = h;

					function k(b, c) {
						var d = h(c),
							e = d[b];
						if (e) return e;
						e = Object.create((c || f).prototype);
						e.eB = b;
						return d[b] = e
					}
					a.wrapPointer = k;
					a.castObject = function (b, c) {
						return k(b.eB, c)
					};
					a.NULL = k(0);
					a.destroy = function (b) {
						if (!b.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
						b.__destroy__();
						delete h(b.fB)[b.eB]
					};
					a.compare = function (b, c) {
						return b.eB === c.eB
					};
					a.getPointer = function (b) {
						return b.eB
					};
					a.getClass = function (b) {
						return b.fB
					};
					var BD = 0,
						CD = 0,
						DD = 0,
						ED = [],
						FD = 0;

					function GD() {
						if (FD) {
							for (var b = 0; b < ED.length; b++) a._free(ED[b]);
							ED.length = 0;
							a._free(BD);
							BD = 0;
							CD += FD;
							FD = 0
						}
						BD || (CD += 128, (BD = a._malloc(CD)) || qa(void 0));
						DD = 0
					}

					function HD(b, c) {
						BD || qa(void 0);
						b = b.length * c.BYTES_PER_ELEMENT;
						b = b + 7 & -8;
						DD + b >= CD ? (0 < b || qa(void 0), FD += b, c = a._malloc(b), ED.push(c)) : (c = BD + DD, DD += b);
						return c
					}

					function ID(b, c, d) {
						d >>>= 0;
						switch (c.BYTES_PER_ELEMENT) {
							case 2:
								d >>>= 1;
								break;
							case 4:
								d >>>= 2;
								break;
							case 8:
								d >>>= 3
						}
						for (var e = 0; e < b.length; e++) c[d + e] = b[e]
					}

					function JD(b) {
						if ("string" === typeof b) {
							for (var c = 0, d = 0; d < b.length; ++d) {
								var e = b.charCodeAt(d);
								55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | b.charCodeAt(++d) & 1023);
								127 >= e ? ++c : c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : c + 4
							}
							c = Array(c + 1);
							e = c.length;
							d = 0;
							if (0 < e) {
								e = d + e - 1;
								for (var g = 0; g < b.length; ++g) {
									var n = b.charCodeAt(g);
									if (55296 <= n && 57343 >= n) {
										var D = b.charCodeAt(++g);
										n = 65536 + ((n & 1023) << 10) | D & 1023
									}
									if (127 >= n) {
										if (d >= e) break;
										c[d++] = n
									} else {
										if (2047 >= n) {
											if (d + 1 >= e) break;
											c[d++] = 192 | n >> 6
										} else {
											if (65535 >= n) {
												if (d + 2 >= e) break;
												c[d++] = 224 |
													n >> 12
											} else {
												if (d + 3 >= e) break;
												c[d++] = 240 | n >> 18;
												c[d++] = 128 | n >> 12 & 63
											}
											c[d++] = 128 | n >> 6 & 63
										}
										c[d++] = 128 | n & 63
									}
								}
								c[d] = 0
							}
							b = HD(c, wa);
							ID(c, wa, b);
							return b
						}
						return b
					}

					function KD(b) {
						if ("object" === typeof b) {
							var c = HD(b, ya);
							ID(b, ya, c);
							return c
						}
						return b
					}

					function l() {
						throw "cannot construct a btCollisionShape, no constructor in IDL";
					}
					l.prototype = Object.create(f.prototype);
					l.prototype.constructor = l;
					l.prototype.fB = l;
					l.gB = {};
					a.btCollisionShape = l;
					l.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Wa(c, b)
					};
					l.prototype.getLocalScaling = function () {
						return k(Xa(this.eB), m)
					};
					l.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Ya(d, b, c)
					};
					l.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Za(c, b)
					};
					l.prototype.getMargin = function () {
						return $a(this.eB)
					};
					l.prototype.__destroy__ = function () {
						ab(this.eB)
					};

					function LD() {
						throw "cannot construct a btCollisionWorld, no constructor in IDL";
					}
					LD.prototype = Object.create(f.prototype);
					LD.prototype.constructor = LD;
					LD.prototype.fB = LD;
					LD.gB = {};
					a.btCollisionWorld = LD;
					LD.prototype.getDispatcher = function () {
						return k(bb(this.eB), MD)
					};
					LD.prototype.rayTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						cb(e, b, c, d)
					};
					LD.prototype.getPairCache = function () {
						return k(db(this.eB), ND)
					};
					LD.prototype.getDispatchInfo = function () {
						return k(eb(this.eB), p)
					};
					LD.prototype.addCollisionObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? fb(e, b) : void 0 === d ? gb(e, b, c) : hb(e, b, c, d)
					};
					LD.prototype.removeCollisionObject = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ib(c, b)
					};
					LD.prototype.getBroadphase = function () {
						return k(jb(this.eB), OD)
					};
					LD.prototype.convexSweepTest = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						kb(n, b, c, d, e, g)
					};
					LD.prototype.contactPairTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						lb(e, b, c, d)
					};
					LD.prototype.contactTest = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						mb(d, b, c)
					};
					LD.prototype.updateSingleAabb = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						nb(c, b)
					};
					LD.prototype.setDebugDrawer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ob(c, b)
					};
					LD.prototype.getDebugDrawer = function () {
						return k(pb(this.eB), PD)
					};
					LD.prototype.debugDrawWorld = function () {
						qb(this.eB)
					};
					LD.prototype.debugDrawObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						rb(e, b, c, d)
					};
					LD.prototype.__destroy__ = function () {
						sb(this.eB)
					};

					function q() {
						throw "cannot construct a btCollisionObject, no constructor in IDL";
					}
					q.prototype = Object.create(f.prototype);
					q.prototype.constructor = q;
					q.prototype.fB = q;
					q.gB = {};
					a.btCollisionObject = q;
					q.prototype.setAnisotropicFriction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						tb(d, b, c)
					};
					q.prototype.getCollisionShape = function () {
						return k(ub(this.eB), l)
					};
					q.prototype.setContactProcessingThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vb(c, b)
					};
					q.prototype.setActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wb(c, b)
					};
					q.prototype.forceActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xb(c, b)
					};
					q.prototype.activate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						void 0 === b ? yb(c) : zb(c, b)
					};
					q.prototype.isActive = function () {
						return !!Ab(this.eB)
					};
					q.prototype.isKinematicObject = function () {
						return !!Bb(this.eB)
					};
					q.prototype.isStaticObject = function () {
						return !!Cb(this.eB)
					};
					q.prototype.isStaticOrKinematicObject = function () {
						return !!Db(this.eB)
					};
					q.prototype.getRestitution = function () {
						return Eb(this.eB)
					};
					q.prototype.getFriction = function () {
						return Fb(this.eB)
					};
					q.prototype.getRollingFriction = function () {
						return Gb(this.eB)
					};
					q.prototype.setRestitution = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Hb(c, b)
					};
					q.prototype.setFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ib(c, b)
					};
					q.prototype.setRollingFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Jb(c, b)
					};
					q.prototype.getWorldTransform = function () {
						return k(Kb(this.eB), r)
					};
					q.prototype.getCollisionFlags = function () {
						return Lb(this.eB)
					};
					q.prototype.setCollisionFlags = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Mb(c, b)
					};
					q.prototype.setWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Nb(c, b)
					};
					q.prototype.setCollisionShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ob(c, b)
					};
					q.prototype.setCcdMotionThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Pb(c, b)
					};
					q.prototype.setCcdSweptSphereRadius = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Qb(c, b)
					};
					q.prototype.getUserIndex = function () {
						return Rb(this.eB)
					};
					q.prototype.setUserIndex = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Sb(c, b)
					};
					q.prototype.getUserPointer = function () {
						return k(Tb(this.eB), QD)
					};
					q.prototype.setUserPointer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ub(c, b)
					};
					q.prototype.getBroadphaseHandle = function () {
						return k(Vb(this.eB), RD)
					};
					q.prototype.__destroy__ = function () {
						Wb(this.eB)
					};

					function SD() {
						throw "cannot construct a btConcaveShape, no constructor in IDL";
					}
					SD.prototype = Object.create(l.prototype);
					SD.prototype.constructor = SD;
					SD.prototype.fB = SD;
					SD.gB = {};
					a.btConcaveShape = SD;
					SD.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Xb(c, b)
					};
					SD.prototype.getLocalScaling = function () {
						return k(Yb(this.eB), m)
					};
					SD.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Zb(d, b, c)
					};
					SD.prototype.__destroy__ = function () {
						$b(this.eB)
					};

					function TD() {
						throw "cannot construct a btCollisionAlgorithm, no constructor in IDL";
					}
					TD.prototype = Object.create(f.prototype);
					TD.prototype.constructor = TD;
					TD.prototype.fB = TD;
					TD.gB = {};
					a.btCollisionAlgorithm = TD;
					TD.prototype.__destroy__ = function () {
						ac(this.eB)
					};

					function UD() {
						throw "cannot construct a btTypedConstraint, no constructor in IDL";
					}
					UD.prototype = Object.create(f.prototype);
					UD.prototype.constructor = UD;
					UD.prototype.fB = UD;
					UD.gB = {};
					a.btTypedConstraint = UD;
					UD.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						bc(c, b)
					};
					UD.prototype.getBreakingImpulseThreshold = function () {
						return cc(this.eB)
					};
					UD.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ec(c, b)
					};
					UD.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return fc(d, b, c)
					};
					UD.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						gc(e, b, c, d)
					};
					UD.prototype.__destroy__ = function () {
						hc(this.eB)
					};

					function VD() {
						throw "cannot construct a btDynamicsWorld, no constructor in IDL";
					}
					VD.prototype = Object.create(LD.prototype);
					VD.prototype.constructor = VD;
					VD.prototype.fB = VD;
					VD.gB = {};
					a.btDynamicsWorld = VD;
					VD.prototype.addAction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ic(c, b)
					};
					VD.prototype.removeAction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jc(c, b)
					};
					VD.prototype.getSolverInfo = function () {
						return k(kc(this.eB), t)
					};
					VD.prototype.setInternalTickCallback = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? lc(e, b) : void 0 === d ? mc(e, b, c) : nc(e, b, c, d)
					};
					VD.prototype.getDispatcher = function () {
						return k(oc(this.eB), MD)
					};
					VD.prototype.rayTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						pc(e, b, c, d)
					};
					VD.prototype.getPairCache = function () {
						return k(qc(this.eB), ND)
					};
					VD.prototype.getDispatchInfo = function () {
						return k(rc(this.eB), p)
					};
					VD.prototype.addCollisionObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? sc(e, b) : void 0 === d ? tc(e, b, c) : uc(e, b, c, d)
					};
					VD.prototype.removeCollisionObject = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vc(c, b)
					};
					VD.prototype.getBroadphase = function () {
						return k(wc(this.eB), OD)
					};
					VD.prototype.convexSweepTest = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						xc(n, b, c, d, e, g)
					};
					VD.prototype.contactPairTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						yc(e, b, c, d)
					};
					VD.prototype.contactTest = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						zc(d, b, c)
					};
					VD.prototype.updateSingleAabb = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ac(c, b)
					};
					VD.prototype.setDebugDrawer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Bc(c, b)
					};
					VD.prototype.getDebugDrawer = function () {
						return k(Cc(this.eB), PD)
					};
					VD.prototype.debugDrawWorld = function () {
						Dc(this.eB)
					};
					VD.prototype.debugDrawObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Ec(e, b, c, d)
					};
					VD.prototype.__destroy__ = function () {
						Fc(this.eB)
					};

					function PD() {
						throw "cannot construct a btIDebugDraw, no constructor in IDL";
					}
					PD.prototype = Object.create(f.prototype);
					PD.prototype.constructor = PD;
					PD.prototype.fB = PD;
					PD.gB = {};
					a.btIDebugDraw = PD;
					PD.prototype.drawLine = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Gc(e, b, c, d)
					};
					PD.prototype.drawContactPoint = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						Hc(n, b, c, d, e, g)
					};
					PD.prototype.reportErrorWarning = function (b) {
						var c = this.eB;
						GD();
						b = b && "object" === typeof b ? b.eB : JD(b);
						Ic(c, b)
					};
					PD.prototype.draw3dText = function (b, c) {
						var d = this.eB;
						GD();
						b && "object" === typeof b && (b = b.eB);
						c = c && "object" === typeof c ? c.eB : JD(c);
						Jc(d, b, c)
					};
					PD.prototype.setDebugMode = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kc(c, b)
					};
					PD.prototype.getDebugMode = function () {
						return Lc(this.eB)
					};
					PD.prototype.__destroy__ = function () {
						Mc(this.eB)
					};

					function m(b, c, d) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						this.eB = void 0 === b ? Nc() : void 0 === c ? _emscripten_bind_btVector3_btVector3_1(b) : void 0 === d ? _emscripten_bind_btVector3_btVector3_2(b, c) : Oc(b, c, d);
						h(m)[this.eB] = this
					}
					m.prototype = Object.create(f.prototype);
					m.prototype.constructor = m;
					m.prototype.fB = m;
					m.gB = {};
					a.btVector3 = m;
					m.prototype.length = m.prototype.length = function () {
						return Pc(this.eB)
					};
					m.prototype.x = m.prototype.x = function () {
						return Qc(this.eB)
					};
					m.prototype.y = m.prototype.y = function () {
						return Rc(this.eB)
					};
					m.prototype.z = m.prototype.z = function () {
						return Sc(this.eB)
					};
					m.prototype.setX = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Tc(c, b)
					};
					m.prototype.setY = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Uc(c, b)
					};
					m.prototype.setZ = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Vc(c, b)
					};
					m.prototype.setValue = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Wc(e, b, c, d)
					};
					m.prototype.normalize = m.prototype.normalize = function () {
						Xc(this.eB)
					};
					m.prototype.rotate = m.prototype.rotate = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return k(Yc(d, b, c), m)
					};
					m.prototype.dot = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return Zc(c, b)
					};
					m.prototype.op_mul = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k($c(c, b), m)
					};
					m.prototype.op_add = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(ad(c, b), m)
					};
					m.prototype.op_sub = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(bd(c, b), m)
					};
					m.prototype.__destroy__ = function () {
						cd(this.eB)
					};

					function WD() {
						throw "cannot construct a btQuadWord, no constructor in IDL";
					}
					WD.prototype = Object.create(f.prototype);
					WD.prototype.constructor = WD;
					WD.prototype.fB = WD;
					WD.gB = {};
					a.btQuadWord = WD;
					WD.prototype.x = WD.prototype.x = function () {
						return dd(this.eB)
					};
					WD.prototype.y = WD.prototype.y = function () {
						return ed(this.eB)
					};
					WD.prototype.z = WD.prototype.z = function () {
						return fd(this.eB)
					};
					WD.prototype.w = WD.prototype.w = function () {
						return gd(this.eB)
					};
					WD.prototype.setX = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hd(c, b)
					};
					WD.prototype.setY = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jd(c, b)
					};
					WD.prototype.setZ = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						kd(c, b)
					};
					WD.prototype.setW = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ld(c, b)
					};
					WD.prototype.__destroy__ = function () {
						md(this.eB)
					};

					function XD() {
						throw "cannot construct a btMotionState, no constructor in IDL";
					}
					XD.prototype = Object.create(f.prototype);
					XD.prototype.constructor = XD;
					XD.prototype.fB = XD;
					XD.gB = {};
					a.btMotionState = XD;
					XD.prototype.getWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						nd(c, b)
					};
					XD.prototype.setWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						od(c, b)
					};
					XD.prototype.__destroy__ = function () {
						pd(this.eB)
					};

					function u() {
						throw "cannot construct a RayResultCallback, no constructor in IDL";
					}
					u.prototype = Object.create(f.prototype);
					u.prototype.constructor = u;
					u.prototype.fB = u;
					u.gB = {};
					a.RayResultCallback = u;
					u.prototype.hasHit = function () {
						return !!qd(this.eB)
					};
					u.prototype.get_m_collisionFilterGroup = u.prototype.hB = function () {
						return rd(this.eB)
					};
					u.prototype.set_m_collisionFilterGroup = u.prototype.jB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sd(c, b)
					};
					Object.defineProperty(u.prototype, "m_collisionFilterGroup", {
						get: u.prototype.hB,
						set: u.prototype.jB
					});
					u.prototype.get_m_collisionFilterMask = u.prototype.iB = function () {
						return td(this.eB)
					};
					u.prototype.set_m_collisionFilterMask = u.prototype.kB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ud(c, b)
					};
					Object.defineProperty(u.prototype, "m_collisionFilterMask", {
						get: u.prototype.iB,
						set: u.prototype.kB
					});
					u.prototype.get_m_closestHitFraction = u.prototype.lB = function () {
						return vd(this.eB)
					};
					u.prototype.set_m_closestHitFraction = u.prototype.mB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wd(c, b)
					};
					Object.defineProperty(u.prototype, "m_closestHitFraction", {
						get: u.prototype.lB,
						set: u.prototype.mB
					});
					u.prototype.get_m_collisionObject = u.prototype.pB = function () {
						return k(xd(this.eB), q)
					};
					u.prototype.set_m_collisionObject = u.prototype.wB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yd(c, b)
					};
					Object.defineProperty(u.prototype, "m_collisionObject", {
						get: u.prototype.pB,
						set: u.prototype.wB
					});
					u.prototype.get_m_flags = u.prototype.nB = function () {
						return zd(this.eB)
					};
					u.prototype.set_m_flags = u.prototype.oB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ad(c, b)
					};
					Object.defineProperty(u.prototype, "m_flags", {
						get: u.prototype.nB,
						set: u.prototype.oB
					});
					u.prototype.__destroy__ = function () {
						Bd(this.eB)
					};

					function YD() {
						throw "cannot construct a ContactResultCallback, no constructor in IDL";
					}
					YD.prototype = Object.create(f.prototype);
					YD.prototype.constructor = YD;
					YD.prototype.fB = YD;
					YD.gB = {};
					a.ContactResultCallback = YD;
					YD.prototype.addSingleResult = function (b, c, d, e, g, n, D) {
						var T = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						n && "object" === typeof n && (n = n.eB);
						D && "object" === typeof D && (D = D.eB);
						return Cd(T, b, c, d, e, g, n, D)
					};
					YD.prototype.__destroy__ = function () {
						Dd(this.eB)
					};

					function v() {
						throw "cannot construct a ConvexResultCallback, no constructor in IDL";
					}
					v.prototype = Object.create(f.prototype);
					v.prototype.constructor = v;
					v.prototype.fB = v;
					v.gB = {};
					a.ConvexResultCallback = v;
					v.prototype.hasHit = function () {
						return !!Ed(this.eB)
					};
					v.prototype.get_m_collisionFilterGroup = v.prototype.hB = function () {
						return Fd(this.eB)
					};
					v.prototype.set_m_collisionFilterGroup = v.prototype.jB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gd(c, b)
					};
					Object.defineProperty(v.prototype, "m_collisionFilterGroup", {
						get: v.prototype.hB,
						set: v.prototype.jB
					});
					v.prototype.get_m_collisionFilterMask = v.prototype.iB = function () {
						return Hd(this.eB)
					};
					v.prototype.set_m_collisionFilterMask = v.prototype.kB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Id(c, b)
					};
					Object.defineProperty(v.prototype, "m_collisionFilterMask", {
						get: v.prototype.iB,
						set: v.prototype.kB
					});
					v.prototype.get_m_closestHitFraction = v.prototype.lB = function () {
						return Jd(this.eB)
					};
					v.prototype.set_m_closestHitFraction = v.prototype.mB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kd(c, b)
					};
					Object.defineProperty(v.prototype, "m_closestHitFraction", {
						get: v.prototype.lB,
						set: v.prototype.mB
					});
					v.prototype.__destroy__ = function () {
						Ld(this.eB)
					};

					function ZD() {
						throw "cannot construct a btConvexShape, no constructor in IDL";
					}
					ZD.prototype = Object.create(l.prototype);
					ZD.prototype.constructor = ZD;
					ZD.prototype.fB = ZD;
					ZD.gB = {};
					a.btConvexShape = ZD;
					ZD.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Md(c, b)
					};
					ZD.prototype.getLocalScaling = function () {
						return k(Nd(this.eB), m)
					};
					ZD.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Od(d, b, c)
					};
					ZD.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Pd(c, b)
					};
					ZD.prototype.getMargin = function () {
						return Qd(this.eB)
					};
					ZD.prototype.__destroy__ = function () {
						Rd(this.eB)
					};

					function $D(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = Sd(b, c);
						h($D)[this.eB] = this
					}
					$D.prototype = Object.create(l.prototype);
					$D.prototype.constructor = $D;
					$D.prototype.fB = $D;
					$D.gB = {};
					a.btCapsuleShape = $D;
					$D.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Td(c, b)
					};
					$D.prototype.getMargin = function () {
						return Ud(this.eB)
					};
					$D.prototype.getUpAxis = function () {
						return Vd(this.eB)
					};
					$D.prototype.getRadius = function () {
						return Wd(this.eB)
					};
					$D.prototype.getHalfHeight = function () {
						return Xd(this.eB)
					};
					$D.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Yd(c, b)
					};
					$D.prototype.getLocalScaling = function () {
						return k(Zd(this.eB), m)
					};
					$D.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						$d(d, b, c)
					};
					$D.prototype.__destroy__ = function () {
						ae(this.eB)
					};

					function aE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = be(b);
						h(aE)[this.eB] = this
					}
					aE.prototype = Object.create(l.prototype);
					aE.prototype.constructor = aE;
					aE.prototype.fB = aE;
					aE.gB = {};
					a.btCylinderShape = aE;
					aE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ce(c, b)
					};
					aE.prototype.getMargin = function () {
						return de(this.eB)
					};
					aE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ee(c, b)
					};
					aE.prototype.getLocalScaling = function () {
						return k(fe(this.eB), m)
					};
					aE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						ge(d, b, c)
					};
					aE.prototype.__destroy__ = function () {
						he(this.eB)
					};

					function bE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = ie(b, c);
						h(bE)[this.eB] = this
					}
					bE.prototype = Object.create(l.prototype);
					bE.prototype.constructor = bE;
					bE.prototype.fB = bE;
					bE.gB = {};
					a.btConeShape = bE;
					bE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						je(c, b)
					};
					bE.prototype.getLocalScaling = function () {
						return k(ke(this.eB), m)
					};
					bE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						le(d, b, c)
					};
					bE.prototype.__destroy__ = function () {
						me(this.eB)
					};

					function cE() {
						throw "cannot construct a btStridingMeshInterface, no constructor in IDL";
					}
					cE.prototype = Object.create(f.prototype);
					cE.prototype.constructor = cE;
					cE.prototype.fB = cE;
					cE.gB = {};
					a.btStridingMeshInterface = cE;
					cE.prototype.setScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ne(c, b)
					};
					cE.prototype.__destroy__ = function () {
						oe(this.eB)
					};

					function dE() {
						throw "cannot construct a btTriangleMeshShape, no constructor in IDL";
					}
					dE.prototype = Object.create(SD.prototype);
					dE.prototype.constructor = dE;
					dE.prototype.fB = dE;
					dE.gB = {};
					a.btTriangleMeshShape = dE;
					dE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						pe(c, b)
					};
					dE.prototype.getLocalScaling = function () {
						return k(qe(this.eB), m)
					};
					dE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						re(d, b, c)
					};
					dE.prototype.__destroy__ = function () {
						se(this.eB)
					};

					function eE() {
						throw "cannot construct a btPrimitiveManagerBase, no constructor in IDL";
					}
					eE.prototype = Object.create(f.prototype);
					eE.prototype.constructor = eE;
					eE.prototype.fB = eE;
					eE.gB = {};
					a.btPrimitiveManagerBase = eE;
					eE.prototype.is_trimesh = function () {
						return !!te(this.eB)
					};
					eE.prototype.get_primitive_count = function () {
						return ue(this.eB)
					};
					eE.prototype.get_primitive_box = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						ve(d, b, c)
					};
					eE.prototype.get_primitive_triangle = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						we(d, b, c)
					};
					eE.prototype.__destroy__ = function () {
						xe(this.eB)
					};

					function w() {
						throw "cannot construct a btGImpactShapeInterface, no constructor in IDL";
					}
					w.prototype = Object.create(SD.prototype);
					w.prototype.constructor = w;
					w.prototype.fB = w;
					w.gB = {};
					a.btGImpactShapeInterface = w;
					w.prototype.updateBound = function () {
						ye(this.eB)
					};
					w.prototype.postUpdate = function () {
						ze(this.eB)
					};
					w.prototype.getShapeType = function () {
						return Ae(this.eB)
					};
					w.prototype.getName = function () {
						return ua(Be(this.eB))
					};
					w.prototype.getGImpactShapeType = function () {
						return Ce(this.eB)
					};
					w.prototype.getPrimitiveManager = function () {
						return k(De(this.eB), eE)
					};
					w.prototype.getNumChildShapes = function () {
						return Ee(this.eB)
					};
					w.prototype.childrenHasTransform = function () {
						return !!Fe(this.eB)
					};
					w.prototype.needsRetrieveTriangles = function () {
						return !!Ge(this.eB)
					};
					w.prototype.needsRetrieveTetrahedrons = function () {
						return !!He(this.eB)
					};
					w.prototype.getBulletTriangle = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Ie(d, b, c)
					};
					w.prototype.getBulletTetrahedron = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Je(d, b, c)
					};
					w.prototype.getChildShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Ke(c, b), l)
					};
					w.prototype.getChildTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Le(c, b), r)
					};
					w.prototype.setChildTransform = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Me(d, b, c)
					};
					w.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ne(c, b)
					};
					w.prototype.getLocalScaling = function () {
						return k(Oe(this.eB), m)
					};
					w.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Pe(d, b, c)
					};
					w.prototype.__destroy__ = function () {
						Qe(this.eB)
					};

					function fE() {
						throw "cannot construct a btActivatingCollisionAlgorithm, no constructor in IDL";
					}
					fE.prototype = Object.create(TD.prototype);
					fE.prototype.constructor = fE;
					fE.prototype.fB = fE;
					fE.gB = {};
					a.btActivatingCollisionAlgorithm = fE;
					fE.prototype.__destroy__ = function () {
						Re(this.eB)
					};

					function gE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = void 0 === b ? Se() : Te(b);
						h(gE)[this.eB] = this
					}
					gE.prototype = Object.create(f.prototype);
					gE.prototype.constructor = gE;
					gE.prototype.fB = gE;
					gE.gB = {};
					a.btDefaultCollisionConfiguration = gE;
					gE.prototype.__destroy__ = function () {
						Ue(this.eB)
					};

					function MD() {
						throw "cannot construct a btDispatcher, no constructor in IDL";
					}
					MD.prototype = Object.create(f.prototype);
					MD.prototype.constructor = MD;
					MD.prototype.fB = MD;
					MD.gB = {};
					a.btDispatcher = MD;
					MD.prototype.getNumManifolds = function () {
						return Ve(this.eB)
					};
					MD.prototype.getManifoldByIndexInternal = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(We(c, b), hE)
					};
					MD.prototype.__destroy__ = function () {
						Xe(this.eB)
					};

					function iE(b, c, d, e, g) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						this.eB = void 0 === e ? Ye(b, c, d) : void 0 === g ? _emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_4(b, c, d, e) : Ze(b, c, d, e, g);
						h(iE)[this.eB] = this
					}
					iE.prototype = Object.create(UD.prototype);
					iE.prototype.constructor = iE;
					iE.prototype.fB = iE;
					iE.gB = {};
					a.btGeneric6DofConstraint = iE;
					iE.prototype.setLinearLowerLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						$e(c, b)
					};
					iE.prototype.setLinearUpperLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						af(c, b)
					};
					iE.prototype.setAngularLowerLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						bf(c, b)
					};
					iE.prototype.setAngularUpperLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cf(c, b)
					};
					iE.prototype.getFrameOffsetA = function () {
						return k(df(this.eB), r)
					};
					iE.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ef(c, b)
					};
					iE.prototype.getBreakingImpulseThreshold = function () {
						return ff(this.eB)
					};
					iE.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gf(c, b)
					};
					iE.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return hf(d, b, c)
					};
					iE.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						jf(e, b, c, d)
					};
					iE.prototype.__destroy__ = function () {
						kf(this.eB)
					};

					function x(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = lf(b, c, d, e);
						h(x)[this.eB] = this
					}
					x.prototype = Object.create(VD.prototype);
					x.prototype.constructor = x;
					x.prototype.fB = x;
					x.gB = {};
					a.btDiscreteDynamicsWorld = x;
					x.prototype.setGravity = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						mf(c, b)
					};
					x.prototype.getGravity = function () {
						return k(nf(this.eB), m)
					};
					x.prototype.addRigidBody = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? of (e, b) : void 0 === d ? _emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_2(e, b, c) : pf(e, b, c, d)
					};
					x.prototype.removeRigidBody = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qf(c, b)
					};
					x.prototype.addConstraint = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						void 0 === c ? rf(d, b) : sf(d, b, c)
					};
					x.prototype.removeConstraint = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						tf(c, b)
					};
					x.prototype.stepSimulation = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						return void 0 === c ? uf(e, b) : void 0 === d ? vf(e, b, c) : wf(e, b, c, d)
					};
					x.prototype.setContactAddedCallback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xf(c, b)
					};
					x.prototype.setContactProcessedCallback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yf(c, b)
					};
					x.prototype.setContactDestroyedCallback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						zf(c, b)
					};
					x.prototype.getDispatcher = function () {
						return k(Af(this.eB), MD)
					};
					x.prototype.rayTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Bf(e, b, c, d)
					};
					x.prototype.getPairCache = function () {
						return k(Cf(this.eB), ND)
					};
					x.prototype.getDispatchInfo = function () {
						return k(Df(this.eB), p)
					};
					x.prototype.addCollisionObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? Ef(e, b) : void 0 === d ? Ff(e, b, c) : Gf(e, b, c, d)
					};
					x.prototype.removeCollisionObject = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Hf(c, b)
					};
					x.prototype.getBroadphase = function () {
						return k(If(this.eB), OD)
					};
					x.prototype.convexSweepTest = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						Jf(n, b, c, d, e, g)
					};
					x.prototype.contactPairTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Kf(e, b, c, d)
					};
					x.prototype.contactTest = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Lf(d, b, c)
					};
					x.prototype.updateSingleAabb = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Mf(c, b)
					};
					x.prototype.setDebugDrawer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Nf(c, b)
					};
					x.prototype.getDebugDrawer = function () {
						return k(Of(this.eB), PD)
					};
					x.prototype.debugDrawWorld = function () {
						Pf(this.eB)
					};
					x.prototype.debugDrawObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Qf(e, b, c, d)
					};
					x.prototype.addAction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Rf(c, b)
					};
					x.prototype.removeAction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Sf(c, b)
					};
					x.prototype.getSolverInfo = function () {
						return k(Tf(this.eB), t)
					};
					x.prototype.setInternalTickCallback = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? Uf(e, b) : void 0 === d ? Vf(e, b, c) : Wf(e, b, c, d)
					};
					x.prototype.__destroy__ = function () {
						Xf(this.eB)
					};

					function jE() {
						throw "cannot construct a btVehicleRaycaster, no constructor in IDL";
					}
					jE.prototype = Object.create(f.prototype);
					jE.prototype.constructor = jE;
					jE.prototype.fB = jE;
					jE.gB = {};
					a.btVehicleRaycaster = jE;
					jE.prototype.castRay = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Yf(e, b, c, d)
					};
					jE.prototype.__destroy__ = function () {
						Zf(this.eB)
					};

					function kE() {
						throw "cannot construct a btActionInterface, no constructor in IDL";
					}
					kE.prototype = Object.create(f.prototype);
					kE.prototype.constructor = kE;
					kE.prototype.fB = kE;
					kE.gB = {};
					a.btActionInterface = kE;
					kE.prototype.updateAction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						$f(d, b, c)
					};
					kE.prototype.__destroy__ = function () {
						ag(this.eB)
					};

					function y() {
						this.eB = bg();
						h(y)[this.eB] = this
					}
					y.prototype = Object.create(q.prototype);
					y.prototype.constructor = y;
					y.prototype.fB = y;
					y.gB = {};
					a.btGhostObject = y;
					y.prototype.getNumOverlappingObjects = function () {
						return cg(this.eB)
					};
					y.prototype.getOverlappingObject = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(dg(c, b), q)
					};
					y.prototype.setAnisotropicFriction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						eg(d, b, c)
					};
					y.prototype.getCollisionShape = function () {
						return k(fg(this.eB), l)
					};
					y.prototype.setContactProcessingThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gg(c, b)
					};
					y.prototype.setActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hg(c, b)
					};
					y.prototype.forceActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ig(c, b)
					};
					y.prototype.activate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						void 0 === b ? jg(c) : kg(c, b)
					};
					y.prototype.isActive = function () {
						return !!lg(this.eB)
					};
					y.prototype.isKinematicObject = function () {
						return !!mg(this.eB)
					};
					y.prototype.isStaticObject = function () {
						return !!ng(this.eB)
					};
					y.prototype.isStaticOrKinematicObject = function () {
						return !!og(this.eB)
					};
					y.prototype.getRestitution = function () {
						return pg(this.eB)
					};
					y.prototype.getFriction = function () {
						return qg(this.eB)
					};
					y.prototype.getRollingFriction = function () {
						return rg(this.eB)
					};
					y.prototype.setRestitution = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sg(c, b)
					};
					y.prototype.setFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						tg(c, b)
					};
					y.prototype.setRollingFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ug(c, b)
					};
					y.prototype.getWorldTransform = function () {
						return k(vg(this.eB), r)
					};
					y.prototype.getCollisionFlags = function () {
						return wg(this.eB)
					};
					y.prototype.setCollisionFlags = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xg(c, b)
					};
					y.prototype.setWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yg(c, b)
					};
					y.prototype.setCollisionShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						zg(c, b)
					};
					y.prototype.setCcdMotionThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ag(c, b)
					};
					y.prototype.setCcdSweptSphereRadius = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Bg(c, b)
					};
					y.prototype.getUserIndex = function () {
						return Cg(this.eB)
					};
					y.prototype.setUserIndex = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Dg(c, b)
					};
					y.prototype.getUserPointer = function () {
						return k(Eg(this.eB), QD)
					};
					y.prototype.setUserPointer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fg(c, b)
					};
					y.prototype.getBroadphaseHandle = function () {
						return k(Gg(this.eB), RD)
					};
					y.prototype.__destroy__ = function () {
						Hg(this.eB)
					};

					function lE() {
						throw "cannot construct a btSoftBodySolver, no constructor in IDL";
					}
					lE.prototype = Object.create(f.prototype);
					lE.prototype.constructor = lE;
					lE.prototype.fB = lE;
					lE.gB = {};
					a.btSoftBodySolver = lE;
					lE.prototype.__destroy__ = function () {
						Ig(this.eB)
					};

					function QD() {
						throw "cannot construct a VoidPtr, no constructor in IDL";
					}
					QD.prototype = Object.create(f.prototype);
					QD.prototype.constructor = QD;
					QD.prototype.fB = QD;
					QD.gB = {};
					a.VoidPtr = QD;
					QD.prototype.__destroy__ = function () {
						Jg(this.eB)
					};

					function mE() {
						this.eB = Kg();
						h(mE)[this.eB] = this
					}
					mE.prototype = Object.create(PD.prototype);
					mE.prototype.constructor = mE;
					mE.prototype.fB = mE;
					mE.gB = {};
					a.DebugDrawer = mE;
					mE.prototype.drawLine = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Lg(e, b, c, d)
					};
					mE.prototype.drawContactPoint = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						Mg(n, b, c, d, e, g)
					};
					mE.prototype.reportErrorWarning = function (b) {
						var c = this.eB;
						GD();
						b = b && "object" === typeof b ? b.eB : JD(b);
						Ng(c, b)
					};
					mE.prototype.draw3dText = function (b, c) {
						var d = this.eB;
						GD();
						b && "object" === typeof b && (b = b.eB);
						c = c && "object" === typeof c ? c.eB : JD(c);
						Og(d, b, c)
					};
					mE.prototype.setDebugMode = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Pg(c, b)
					};
					mE.prototype.getDebugMode = function () {
						return Qg(this.eB)
					};
					mE.prototype.__destroy__ = function () {
						Rg(this.eB)
					};

					function z(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = void 0 === b ? Sg() : void 0 === c ? _emscripten_bind_btVector4_btVector4_1(b) : void 0 === d ? _emscripten_bind_btVector4_btVector4_2(b, c) : void 0 === e ? _emscripten_bind_btVector4_btVector4_3(b, c, d) : Tg(b, c, d, e);
						h(z)[this.eB] = this
					}
					z.prototype = Object.create(m.prototype);
					z.prototype.constructor = z;
					z.prototype.fB = z;
					z.gB = {};
					a.btVector4 = z;
					z.prototype.w = z.prototype.w = function () {
						return Ug(this.eB)
					};
					z.prototype.setValue = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						Vg(g, b, c, d, e)
					};
					z.prototype.length = z.prototype.length = function () {
						return Wg(this.eB)
					};
					z.prototype.x = z.prototype.x = function () {
						return Xg(this.eB)
					};
					z.prototype.y = z.prototype.y = function () {
						return Yg(this.eB)
					};
					z.prototype.z = z.prototype.z = function () {
						return Zg(this.eB)
					};
					z.prototype.setX = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						$g(c, b)
					};
					z.prototype.setY = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ah(c, b)
					};
					z.prototype.setZ = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						bh(c, b)
					};
					z.prototype.normalize = z.prototype.normalize = function () {
						ch(this.eB)
					};
					z.prototype.rotate = z.prototype.rotate = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return k(dh(d, b, c), m)
					};
					z.prototype.dot = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return eh(c, b)
					};
					z.prototype.op_mul = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(fh(c, b), m)
					};
					z.prototype.op_add = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(gh(c, b), m)
					};
					z.prototype.op_sub = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(hh(c, b), m)
					};
					z.prototype.__destroy__ = function () {
						ih(this.eB)
					};

					function A(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = jh(b, c, d, e);
						h(A)[this.eB] = this
					}
					A.prototype = Object.create(WD.prototype);
					A.prototype.constructor = A;
					A.prototype.fB = A;
					A.gB = {};
					a.btQuaternion = A;
					A.prototype.setValue = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						kh(g, b, c, d, e)
					};
					A.prototype.setEulerZYX = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						lh(e, b, c, d)
					};
					A.prototype.setRotation = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						mh(d, b, c)
					};
					A.prototype.normalize = A.prototype.normalize = function () {
						nh(this.eB)
					};
					A.prototype.length2 = function () {
						return oh(this.eB)
					};
					A.prototype.length = A.prototype.length = function () {
						return ph(this.eB)
					};
					A.prototype.dot = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return qh(c, b)
					};
					A.prototype.normalized = function () {
						return k(rh(this.eB), A)
					};
					A.prototype.getAxis = function () {
						return k(sh(this.eB), m)
					};
					A.prototype.inverse = A.prototype.inverse = function () {
						return k(th(this.eB), A)
					};
					A.prototype.getAngle = function () {
						return uh(this.eB)
					};
					A.prototype.getAngleShortestPath = function () {
						return vh(this.eB)
					};
					A.prototype.angle = A.prototype.angle = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return wh(c, b)
					};
					A.prototype.angleShortestPath = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return xh(c, b)
					};
					A.prototype.op_add = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(yh(c, b), A)
					};
					A.prototype.op_sub = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(zh(c, b), A)
					};
					A.prototype.op_mul = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Ah(c, b), A)
					};
					A.prototype.op_mulq = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Bh(c, b), A)
					};
					A.prototype.op_div = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Ch(c, b), A)
					};
					A.prototype.x = A.prototype.x = function () {
						return Dh(this.eB)
					};
					A.prototype.y = A.prototype.y = function () {
						return Eh(this.eB)
					};
					A.prototype.z = A.prototype.z = function () {
						return Fh(this.eB)
					};
					A.prototype.w = A.prototype.w = function () {
						return Gh(this.eB)
					};
					A.prototype.setX = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Hh(c, b)
					};
					A.prototype.setY = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ih(c, b)
					};
					A.prototype.setZ = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Jh(c, b)
					};
					A.prototype.setW = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kh(c, b)
					};
					A.prototype.__destroy__ = function () {
						Lh(this.eB)
					};

					function nE() {
						throw "cannot construct a btMatrix3x3, no constructor in IDL";
					}
					nE.prototype = Object.create(f.prototype);
					nE.prototype.constructor = nE;
					nE.prototype.fB = nE;
					nE.gB = {};
					a.btMatrix3x3 = nE;
					nE.prototype.setEulerZYX = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Mh(e, b, c, d)
					};
					nE.prototype.getRotation = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Nh(c, b)
					};
					nE.prototype.getRow = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Oh(c, b), m)
					};
					nE.prototype.__destroy__ = function () {
						Ph(this.eB)
					};

					function r(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = void 0 === b ? Qh() : void 0 === c ? _emscripten_bind_btTransform_btTransform_1(b) : Rh(b, c);
						h(r)[this.eB] = this
					}
					r.prototype = Object.create(f.prototype);
					r.prototype.constructor = r;
					r.prototype.fB = r;
					r.gB = {};
					a.btTransform = r;
					r.prototype.setIdentity = function () {
						Sh(this.eB)
					};
					r.prototype.setOrigin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Th(c, b)
					};
					r.prototype.setRotation = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Uh(c, b)
					};
					r.prototype.getOrigin = function () {
						return k(Vh(this.eB), m)
					};
					r.prototype.getRotation = function () {
						return k(Wh(this.eB), A)
					};
					r.prototype.getBasis = function () {
						return k(Xh(this.eB), nE)
					};
					r.prototype.setFromOpenGLMatrix = function (b) {
						var c = this.eB;
						GD();
						"object" == typeof b && (b = KD(b));
						Yh(c, b)
					};
					r.prototype.inverse = r.prototype.inverse = function () {
						return k(Zh(this.eB), r)
					};
					r.prototype.op_mul = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k($h(c, b), r)
					};
					r.prototype.__destroy__ = function () {
						ai(this.eB)
					};

					function oE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = void 0 === b ? bi() : void 0 === c ? ci(b) : di(b, c);
						h(oE)[this.eB] = this
					}
					oE.prototype = Object.create(XD.prototype);
					oE.prototype.constructor = oE;
					oE.prototype.fB = oE;
					oE.gB = {};
					a.btDefaultMotionState = oE;
					oE.prototype.getWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ei(c, b)
					};
					oE.prototype.setWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						fi(c, b)
					};
					oE.prototype.get_m_graphicsWorldTrans = oE.prototype.gD = function () {
						return k(gi(this.eB), r)
					};
					oE.prototype.set_m_graphicsWorldTrans = oE.prototype.YF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hi(c, b)
					};
					Object.defineProperty(oE.prototype, "m_graphicsWorldTrans", {
						get: oE.prototype.gD,
						set: oE.prototype.YF
					});
					oE.prototype.__destroy__ = function () {
						ii(this.eB)
					};

					function pE() {
						throw "cannot construct a btCollisionObjectWrapper, no constructor in IDL";
					}
					pE.prototype = Object.create(f.prototype);
					pE.prototype.constructor = pE;
					pE.prototype.fB = pE;
					pE.gB = {};
					a.btCollisionObjectWrapper = pE;
					pE.prototype.getWorldTransform = function () {
						return k(ji(this.eB), r)
					};
					pE.prototype.getCollisionObject = function () {
						return k(ki(this.eB), q)
					};
					pE.prototype.getCollisionShape = function () {
						return k(li(this.eB), l)
					};

					function B(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = mi(b, c);
						h(B)[this.eB] = this
					}
					B.prototype = Object.create(u.prototype);
					B.prototype.constructor = B;
					B.prototype.fB = B;
					B.gB = {};
					a.ClosestRayResultCallback = B;
					B.prototype.hasHit = function () {
						return !!ni(this.eB)
					};
					B.prototype.get_m_rayFromWorld = B.prototype.IB = function () {
						return k(oi(this.eB), m)
					};
					B.prototype.set_m_rayFromWorld = B.prototype.SB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						pi(c, b)
					};
					Object.defineProperty(B.prototype, "m_rayFromWorld", {
						get: B.prototype.IB,
						set: B.prototype.SB
					});
					B.prototype.get_m_rayToWorld = B.prototype.JB = function () {
						return k(qi(this.eB), m)
					};
					B.prototype.set_m_rayToWorld = B.prototype.TB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ri(c, b)
					};
					Object.defineProperty(B.prototype, "m_rayToWorld", {
						get: B.prototype.JB,
						set: B.prototype.TB
					});
					B.prototype.get_m_hitNormalWorld = B.prototype.rB = function () {
						return k(si(this.eB), m)
					};
					B.prototype.set_m_hitNormalWorld = B.prototype.yB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ti(c, b)
					};
					Object.defineProperty(B.prototype, "m_hitNormalWorld", {
						get: B.prototype.rB,
						set: B.prototype.yB
					});
					B.prototype.get_m_hitPointWorld = B.prototype.sB = function () {
						return k(ui(this.eB), m)
					};
					B.prototype.set_m_hitPointWorld = B.prototype.zB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vi(c, b)
					};
					Object.defineProperty(B.prototype, "m_hitPointWorld", {
						get: B.prototype.sB,
						set: B.prototype.zB
					});
					B.prototype.get_m_collisionFilterGroup = B.prototype.hB = function () {
						return wi(this.eB)
					};
					B.prototype.set_m_collisionFilterGroup = B.prototype.jB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xi(c, b)
					};
					Object.defineProperty(B.prototype, "m_collisionFilterGroup", {
						get: B.prototype.hB,
						set: B.prototype.jB
					});
					B.prototype.get_m_collisionFilterMask = B.prototype.iB = function () {
						return yi(this.eB)
					};
					B.prototype.set_m_collisionFilterMask = B.prototype.kB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						zi(c, b)
					};
					Object.defineProperty(B.prototype, "m_collisionFilterMask", {
						get: B.prototype.iB,
						set: B.prototype.kB
					});
					B.prototype.get_m_closestHitFraction = B.prototype.lB = function () {
						return Ai(this.eB)
					};
					B.prototype.set_m_closestHitFraction = B.prototype.mB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Bi(c, b)
					};
					Object.defineProperty(B.prototype, "m_closestHitFraction", {
						get: B.prototype.lB,
						set: B.prototype.mB
					});
					B.prototype.get_m_collisionObject = B.prototype.pB = function () {
						return k(Ci(this.eB), q)
					};
					B.prototype.set_m_collisionObject = B.prototype.wB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Di(c, b)
					};
					Object.defineProperty(B.prototype, "m_collisionObject", {
						get: B.prototype.pB,
						set: B.prototype.wB
					});
					B.prototype.get_m_flags = B.prototype.nB = function () {
						return Ei(this.eB)
					};
					B.prototype.set_m_flags = B.prototype.oB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fi(c, b)
					};
					Object.defineProperty(B.prototype, "m_flags", {
						get: B.prototype.nB,
						set: B.prototype.oB
					});
					B.prototype.__destroy__ = function () {
						Gi(this.eB)
					};

					function qE() {
						throw "cannot construct a btConstCollisionObjectArray, no constructor in IDL";
					}
					qE.prototype = Object.create(f.prototype);
					qE.prototype.constructor = qE;
					qE.prototype.fB = qE;
					qE.gB = {};
					a.btConstCollisionObjectArray = qE;
					qE.prototype.size = qE.prototype.size = function () {
						return Hi(this.eB)
					};
					qE.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Ii(c, b), q)
					};
					qE.prototype.__destroy__ = function () {
						Ji(this.eB)
					};

					function rE() {
						throw "cannot construct a btScalarArray, no constructor in IDL";
					}
					rE.prototype = Object.create(f.prototype);
					rE.prototype.constructor = rE;
					rE.prototype.fB = rE;
					rE.gB = {};
					a.btScalarArray = rE;
					rE.prototype.size = rE.prototype.size = function () {
						return Ki(this.eB)
					};
					rE.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return Li(c, b)
					};
					rE.prototype.__destroy__ = function () {
						Mi(this.eB)
					};

					function C(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = Ni(b, c);
						h(C)[this.eB] = this
					}
					C.prototype = Object.create(u.prototype);
					C.prototype.constructor = C;
					C.prototype.fB = C;
					C.gB = {};
					a.AllHitsRayResultCallback = C;
					C.prototype.hasHit = function () {
						return !!Oi(this.eB)
					};
					C.prototype.get_m_collisionObjects = C.prototype.PC = function () {
						return k(Pi(this.eB), qE)
					};
					C.prototype.set_m_collisionObjects = C.prototype.GF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Qi(c, b)
					};
					Object.defineProperty(C.prototype, "m_collisionObjects", {
						get: C.prototype.PC,
						set: C.prototype.GF
					});
					C.prototype.get_m_rayFromWorld = C.prototype.IB = function () {
						return k(Ri(this.eB), m)
					};
					C.prototype.set_m_rayFromWorld = C.prototype.SB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Si(c, b)
					};
					Object.defineProperty(C.prototype, "m_rayFromWorld", {
						get: C.prototype.IB,
						set: C.prototype.SB
					});
					C.prototype.get_m_rayToWorld = C.prototype.JB = function () {
						return k(Ti(this.eB), m)
					};
					C.prototype.set_m_rayToWorld = C.prototype.TB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ui(c, b)
					};
					Object.defineProperty(C.prototype, "m_rayToWorld", {
						get: C.prototype.JB,
						set: C.prototype.TB
					});
					C.prototype.get_m_hitNormalWorld = C.prototype.rB = function () {
						return k(Vi(this.eB), sE)
					};
					C.prototype.set_m_hitNormalWorld = C.prototype.yB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Wi(c, b)
					};
					Object.defineProperty(C.prototype, "m_hitNormalWorld", {
						get: C.prototype.rB,
						set: C.prototype.yB
					});
					C.prototype.get_m_hitPointWorld = C.prototype.sB = function () {
						return k(Xi(this.eB), sE)
					};
					C.prototype.set_m_hitPointWorld = C.prototype.zB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Yi(c, b)
					};
					Object.defineProperty(C.prototype, "m_hitPointWorld", {
						get: C.prototype.sB,
						set: C.prototype.zB
					});
					C.prototype.get_m_hitFractions = C.prototype.lD = function () {
						return k(Zi(this.eB), rE)
					};
					C.prototype.set_m_hitFractions = C.prototype.cG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						$i(c, b)
					};
					Object.defineProperty(C.prototype, "m_hitFractions", {
						get: C.prototype.lD,
						set: C.prototype.cG
					});
					C.prototype.get_m_collisionFilterGroup = C.prototype.hB = function () {
						return aj(this.eB)
					};
					C.prototype.set_m_collisionFilterGroup = C.prototype.jB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						bj(c, b)
					};
					Object.defineProperty(C.prototype, "m_collisionFilterGroup", {
						get: C.prototype.hB,
						set: C.prototype.jB
					});
					C.prototype.get_m_collisionFilterMask = C.prototype.iB = function () {
						return cj(this.eB)
					};
					C.prototype.set_m_collisionFilterMask = C.prototype.kB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						dj(c, b)
					};
					Object.defineProperty(C.prototype, "m_collisionFilterMask", {
						get: C.prototype.iB,
						set: C.prototype.kB
					});
					C.prototype.get_m_closestHitFraction = C.prototype.lB = function () {
						return ej(this.eB)
					};
					C.prototype.set_m_closestHitFraction = C.prototype.mB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						fj(c, b)
					};
					Object.defineProperty(C.prototype, "m_closestHitFraction", {
						get: C.prototype.lB,
						set: C.prototype.mB
					});
					C.prototype.get_m_collisionObject = C.prototype.pB = function () {
						return k(gj(this.eB), q)
					};
					C.prototype.set_m_collisionObject = C.prototype.wB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hj(c, b)
					};
					Object.defineProperty(C.prototype, "m_collisionObject", {
						get: C.prototype.pB,
						set: C.prototype.wB
					});
					C.prototype.get_m_flags = C.prototype.nB = function () {
						return ij(this.eB)
					};
					C.prototype.set_m_flags = C.prototype.oB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jj(c, b)
					};
					Object.defineProperty(C.prototype, "m_flags", {
						get: C.prototype.nB,
						set: C.prototype.oB
					});
					C.prototype.__destroy__ = function () {
						kj(this.eB)
					};

					function E() {
						throw "cannot construct a btManifoldPoint, no constructor in IDL";
					}
					E.prototype = Object.create(f.prototype);
					E.prototype.constructor = E;
					E.prototype.fB = E;
					E.gB = {};
					a.btManifoldPoint = E;
					E.prototype.getPositionWorldOnA = function () {
						return k(lj(this.eB), m)
					};
					E.prototype.getPositionWorldOnB = function () {
						return k(mj(this.eB), m)
					};
					E.prototype.getAppliedImpulse = function () {
						return nj(this.eB)
					};
					E.prototype.getDistance = function () {
						return oj(this.eB)
					};
					E.prototype.get_m_localPointA = E.prototype.BD = function () {
						return k(pj(this.eB), m)
					};
					E.prototype.set_m_localPointA = E.prototype.sG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qj(c, b)
					};
					Object.defineProperty(E.prototype, "m_localPointA", {
						get: E.prototype.BD,
						set: E.prototype.sG
					});
					E.prototype.get_m_localPointB = E.prototype.CD = function () {
						return k(rj(this.eB), m)
					};
					E.prototype.set_m_localPointB = E.prototype.tG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sj(c, b)
					};
					Object.defineProperty(E.prototype, "m_localPointB", {
						get: E.prototype.CD,
						set: E.prototype.tG
					});
					E.prototype.get_m_positionWorldOnB = E.prototype.TD = function () {
						return k(tj(this.eB), m)
					};
					E.prototype.set_m_positionWorldOnB = E.prototype.KG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						uj(c, b)
					};
					Object.defineProperty(E.prototype, "m_positionWorldOnB", {
						get: E.prototype.TD,
						set: E.prototype.KG
					});
					E.prototype.get_m_positionWorldOnA = E.prototype.SD = function () {
						return k(vj(this.eB), m)
					};
					E.prototype.set_m_positionWorldOnA = E.prototype.JG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wj(c, b)
					};
					Object.defineProperty(E.prototype, "m_positionWorldOnA", {
						get: E.prototype.SD,
						set: E.prototype.JG
					});
					E.prototype.get_m_normalWorldOnB = E.prototype.ND = function () {
						return k(xj(this.eB), m)
					};
					E.prototype.set_m_normalWorldOnB = E.prototype.EG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yj(c, b)
					};
					Object.defineProperty(E.prototype, "m_normalWorldOnB", {
						get: E.prototype.ND,
						set: E.prototype.EG
					});
					E.prototype.get_m_userPersistentData = E.prototype.uE = function () {
						return zj(this.eB)
					};
					E.prototype.set_m_userPersistentData = E.prototype.mH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Aj(c, b)
					};
					Object.defineProperty(E.prototype, "m_userPersistentData", {
						get: E.prototype.uE,
						set: E.prototype.mH
					});
					E.prototype.__destroy__ = function () {
						Bj(this.eB)
					};

					function tE() {
						this.eB = Cj();
						h(tE)[this.eB] = this
					}
					tE.prototype = Object.create(YD.prototype);
					tE.prototype.constructor = tE;
					tE.prototype.fB = tE;
					tE.gB = {};
					a.ConcreteContactResultCallback = tE;
					tE.prototype.addSingleResult = function (b, c, d, e, g, n, D) {
						var T = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						n && "object" === typeof n && (n = n.eB);
						D && "object" === typeof D && (D = D.eB);
						return Dj(T, b, c, d, e, g, n, D)
					};
					tE.prototype.__destroy__ = function () {
						Ej(this.eB)
					};

					function uE() {
						throw "cannot construct a LocalShapeInfo, no constructor in IDL";
					}
					uE.prototype = Object.create(f.prototype);
					uE.prototype.constructor = uE;
					uE.prototype.fB = uE;
					uE.gB = {};
					a.LocalShapeInfo = uE;
					uE.prototype.get_m_shapePart = uE.prototype.bE = function () {
						return Fj(this.eB)
					};
					uE.prototype.set_m_shapePart = uE.prototype.UG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gj(c, b)
					};
					Object.defineProperty(uE.prototype, "m_shapePart", {
						get: uE.prototype.bE,
						set: uE.prototype.UG
					});
					uE.prototype.get_m_triangleIndex = uE.prototype.qE = function () {
						return Hj(this.eB)
					};
					uE.prototype.set_m_triangleIndex = uE.prototype.iH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ij(c, b)
					};
					Object.defineProperty(uE.prototype, "m_triangleIndex", {
						get: uE.prototype.qE,
						set: uE.prototype.iH
					});
					uE.prototype.__destroy__ = function () {
						Jj(this.eB)
					};

					function F(b, c, d, e, g) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						this.eB = Kj(b, c, d, e, g);
						h(F)[this.eB] = this
					}
					F.prototype = Object.create(f.prototype);
					F.prototype.constructor = F;
					F.prototype.fB = F;
					F.gB = {};
					a.LocalConvexResult = F;
					F.prototype.get_m_hitCollisionObject = F.prototype.GB = function () {
						return k(Lj(this.eB), q)
					};
					F.prototype.set_m_hitCollisionObject = F.prototype.QB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Mj(c, b)
					};
					Object.defineProperty(F.prototype, "m_hitCollisionObject", {
						get: F.prototype.GB,
						set: F.prototype.QB
					});
					F.prototype.get_m_localShapeInfo = F.prototype.DD = function () {
						return k(Nj(this.eB), uE)
					};
					F.prototype.set_m_localShapeInfo = F.prototype.uG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Oj(c, b)
					};
					Object.defineProperty(F.prototype, "m_localShapeInfo", {
						get: F.prototype.DD,
						set: F.prototype.uG
					});
					F.prototype.get_m_hitNormalLocal = F.prototype.nD = function () {
						return k(Pj(this.eB), m)
					};
					F.prototype.set_m_hitNormalLocal = F.prototype.eG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Qj(c, b)
					};
					Object.defineProperty(F.prototype, "m_hitNormalLocal", {
						get: F.prototype.nD,
						set: F.prototype.eG
					});
					F.prototype.get_m_hitPointLocal = F.prototype.pD = function () {
						return k(Rj(this.eB), m)
					};
					F.prototype.set_m_hitPointLocal = F.prototype.gG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Sj(c, b)
					};
					Object.defineProperty(F.prototype, "m_hitPointLocal", {
						get: F.prototype.pD,
						set: F.prototype.gG
					});
					F.prototype.get_m_hitFraction = F.prototype.kD = function () {
						return Tj(this.eB)
					};
					F.prototype.set_m_hitFraction = F.prototype.bG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Uj(c, b)
					};
					Object.defineProperty(F.prototype, "m_hitFraction", {
						get: F.prototype.kD,
						set: F.prototype.bG
					});
					F.prototype.__destroy__ = function () {
						Vj(this.eB)
					};

					function G(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = Wj(b, c);
						h(G)[this.eB] = this
					}
					G.prototype = Object.create(v.prototype);
					G.prototype.constructor = G;
					G.prototype.fB = G;
					G.gB = {};
					a.ClosestConvexResultCallback = G;
					G.prototype.hasHit = function () {
						return !!Xj(this.eB)
					};
					G.prototype.get_m_hitCollisionObject = G.prototype.GB = function () {
						return k(Yj(this.eB), q)
					};
					G.prototype.set_m_hitCollisionObject = G.prototype.QB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zj(c, b)
					};
					Object.defineProperty(G.prototype, "m_hitCollisionObject", {
						get: G.prototype.GB,
						set: G.prototype.QB
					});
					G.prototype.get_m_convexFromWorld = G.prototype.UC = function () {
						return k(ak(this.eB), m)
					};
					G.prototype.set_m_convexFromWorld = G.prototype.LF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						bk(c, b)
					};
					Object.defineProperty(G.prototype, "m_convexFromWorld", {
						get: G.prototype.UC,
						set: G.prototype.LF
					});
					G.prototype.get_m_convexToWorld = G.prototype.VC = function () {
						return k(ck(this.eB), m)
					};
					G.prototype.set_m_convexToWorld = G.prototype.MF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						dk(c, b)
					};
					Object.defineProperty(G.prototype, "m_convexToWorld", {
						get: G.prototype.VC,
						set: G.prototype.MF
					});
					G.prototype.get_m_hitNormalWorld = G.prototype.rB = function () {
						return k(ek(this.eB), m)
					};
					G.prototype.set_m_hitNormalWorld = G.prototype.yB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						fk(c, b)
					};
					Object.defineProperty(G.prototype, "m_hitNormalWorld", {
						get: G.prototype.rB,
						set: G.prototype.yB
					});
					G.prototype.get_m_hitPointWorld = G.prototype.sB = function () {
						return k(gk(this.eB), m)
					};
					G.prototype.set_m_hitPointWorld = G.prototype.zB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hk(c, b)
					};
					Object.defineProperty(G.prototype, "m_hitPointWorld", {
						get: G.prototype.sB,
						set: G.prototype.zB
					});
					G.prototype.get_m_collisionFilterGroup = G.prototype.hB = function () {
						return ik(this.eB)
					};
					G.prototype.set_m_collisionFilterGroup = G.prototype.jB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jk(c, b)
					};
					Object.defineProperty(G.prototype, "m_collisionFilterGroup", {
						get: G.prototype.hB,
						set: G.prototype.jB
					});
					G.prototype.get_m_collisionFilterMask = G.prototype.iB = function () {
						return kk(this.eB)
					};
					G.prototype.set_m_collisionFilterMask = G.prototype.kB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						lk(c, b)
					};
					Object.defineProperty(G.prototype, "m_collisionFilterMask", {
						get: G.prototype.iB,
						set: G.prototype.kB
					});
					G.prototype.get_m_closestHitFraction = G.prototype.lB = function () {
						return mk(this.eB)
					};
					G.prototype.set_m_closestHitFraction = G.prototype.mB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						nk(c, b)
					};
					Object.defineProperty(G.prototype, "m_closestHitFraction", {
						get: G.prototype.lB,
						set: G.prototype.mB
					});
					G.prototype.__destroy__ = function () {
						ok(this.eB)
					};

					function vE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = void 0 === c ? pk(b) : qk(b, c);
						h(vE)[this.eB] = this
					}
					vE.prototype = Object.create(ZD.prototype);
					vE.prototype.constructor = vE;
					vE.prototype.fB = vE;
					vE.gB = {};
					a.btConvexTriangleMeshShape = vE;
					vE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						rk(c, b)
					};
					vE.prototype.getLocalScaling = function () {
						return k(sk(this.eB), m)
					};
					vE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						tk(d, b, c)
					};
					vE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						uk(c, b)
					};
					vE.prototype.getMargin = function () {
						return vk(this.eB)
					};
					vE.prototype.__destroy__ = function () {
						wk(this.eB)
					};

					function wE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = xk(b);
						h(wE)[this.eB] = this
					}
					wE.prototype = Object.create(l.prototype);
					wE.prototype.constructor = wE;
					wE.prototype.fB = wE;
					wE.gB = {};
					a.btBoxShape = wE;
					wE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yk(c, b)
					};
					wE.prototype.getMargin = function () {
						return zk(this.eB)
					};
					wE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ak(c, b)
					};
					wE.prototype.getLocalScaling = function () {
						return k(Bk(this.eB), m)
					};
					wE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Ck(d, b, c)
					};
					wE.prototype.__destroy__ = function () {
						Dk(this.eB)
					};

					function xE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = Ek(b, c);
						h(xE)[this.eB] = this
					}
					xE.prototype = Object.create($D.prototype);
					xE.prototype.constructor = xE;
					xE.prototype.fB = xE;
					xE.gB = {};
					a.btCapsuleShapeX = xE;
					xE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fk(c, b)
					};
					xE.prototype.getMargin = function () {
						return Gk(this.eB)
					};
					xE.prototype.getUpAxis = function () {
						return Hk(this.eB)
					};
					xE.prototype.getRadius = function () {
						return Ik(this.eB)
					};
					xE.prototype.getHalfHeight = function () {
						return Jk(this.eB)
					};
					xE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kk(c, b)
					};
					xE.prototype.getLocalScaling = function () {
						return k(Lk(this.eB), m)
					};
					xE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Mk(d, b, c)
					};
					xE.prototype.__destroy__ = function () {
						Nk(this.eB)
					};

					function yE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = Ok(b, c);
						h(yE)[this.eB] = this
					}
					yE.prototype = Object.create($D.prototype);
					yE.prototype.constructor = yE;
					yE.prototype.fB = yE;
					yE.gB = {};
					a.btCapsuleShapeZ = yE;
					yE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Pk(c, b)
					};
					yE.prototype.getMargin = function () {
						return Qk(this.eB)
					};
					yE.prototype.getUpAxis = function () {
						return Rk(this.eB)
					};
					yE.prototype.getRadius = function () {
						return Sk(this.eB)
					};
					yE.prototype.getHalfHeight = function () {
						return Tk(this.eB)
					};
					yE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Uk(c, b)
					};
					yE.prototype.getLocalScaling = function () {
						return k(Vk(this.eB), m)
					};
					yE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Wk(d, b, c)
					};
					yE.prototype.__destroy__ = function () {
						Xk(this.eB)
					};

					function zE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = Yk(b);
						h(zE)[this.eB] = this
					}
					zE.prototype = Object.create(aE.prototype);
					zE.prototype.constructor = zE;
					zE.prototype.fB = zE;
					zE.gB = {};
					a.btCylinderShapeX = zE;
					zE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zk(c, b)
					};
					zE.prototype.getMargin = function () {
						return $k(this.eB)
					};
					zE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						al(c, b)
					};
					zE.prototype.getLocalScaling = function () {
						return k(bl(this.eB), m)
					};
					zE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						cl(d, b, c)
					};
					zE.prototype.__destroy__ = function () {
						dl(this.eB)
					};

					function AE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = el(b);
						h(AE)[this.eB] = this
					}
					AE.prototype = Object.create(aE.prototype);
					AE.prototype.constructor = AE;
					AE.prototype.fB = AE;
					AE.gB = {};
					a.btCylinderShapeZ = AE;
					AE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						fl(c, b)
					};
					AE.prototype.getMargin = function () {
						return gl(this.eB)
					};
					AE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hl(c, b)
					};
					AE.prototype.getLocalScaling = function () {
						return k(il(this.eB), m)
					};
					AE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						jl(d, b, c)
					};
					AE.prototype.__destroy__ = function () {
						kl(this.eB)
					};

					function BE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = ll(b);
						h(BE)[this.eB] = this
					}
					BE.prototype = Object.create(l.prototype);
					BE.prototype.constructor = BE;
					BE.prototype.fB = BE;
					BE.gB = {};
					a.btSphereShape = BE;
					BE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ml(c, b)
					};
					BE.prototype.getMargin = function () {
						return nl(this.eB)
					};
					BE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ol(c, b)
					};
					BE.prototype.getLocalScaling = function () {
						return k(pl(this.eB), m)
					};
					BE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						ql(d, b, c)
					};
					BE.prototype.__destroy__ = function () {
						rl(this.eB)
					};

					function CE(b, c, d) {
						GD();
						b && "object" === typeof b && (b = b.eB);
						"object" == typeof c && (c = KD(c));
						d && "object" === typeof d && (d = d.eB);
						this.eB = sl(b, c, d);
						h(CE)[this.eB] = this
					}
					CE.prototype = Object.create(l.prototype);
					CE.prototype.constructor = CE;
					CE.prototype.fB = CE;
					CE.gB = {};
					a.btMultiSphereShape = CE;
					CE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						tl(c, b)
					};
					CE.prototype.getLocalScaling = function () {
						return k(ul(this.eB), m)
					};
					CE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						vl(d, b, c)
					};
					CE.prototype.__destroy__ = function () {
						wl(this.eB)
					};

					function DE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = xl(b, c);
						h(DE)[this.eB] = this
					}
					DE.prototype = Object.create(bE.prototype);
					DE.prototype.constructor = DE;
					DE.prototype.fB = DE;
					DE.gB = {};
					a.btConeShapeX = DE;
					DE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yl(c, b)
					};
					DE.prototype.getLocalScaling = function () {
						return k(zl(this.eB), m)
					};
					DE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Al(d, b, c)
					};
					DE.prototype.__destroy__ = function () {
						Bl(this.eB)
					};

					function EE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = Cl(b, c);
						h(EE)[this.eB] = this
					}
					EE.prototype = Object.create(bE.prototype);
					EE.prototype.constructor = EE;
					EE.prototype.fB = EE;
					EE.gB = {};
					a.btConeShapeZ = EE;
					EE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Dl(c, b)
					};
					EE.prototype.getLocalScaling = function () {
						return k(El(this.eB), m)
					};
					EE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Fl(d, b, c)
					};
					EE.prototype.__destroy__ = function () {
						Gl(this.eB)
					};

					function FE() {
						throw "cannot construct a btIntArray, no constructor in IDL";
					}
					FE.prototype = Object.create(f.prototype);
					FE.prototype.constructor = FE;
					FE.prototype.fB = FE;
					FE.gB = {};
					a.btIntArray = FE;
					FE.prototype.size = FE.prototype.size = function () {
						return Hl(this.eB)
					};
					FE.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return Il(c, b)
					};
					FE.prototype.__destroy__ = function () {
						Jl(this.eB)
					};

					function GE() {
						throw "cannot construct a btFace, no constructor in IDL";
					}
					GE.prototype = Object.create(f.prototype);
					GE.prototype.constructor = GE;
					GE.prototype.fB = GE;
					GE.gB = {};
					a.btFace = GE;
					GE.prototype.get_m_indices = GE.prototype.sD = function () {
						return k(Kl(this.eB), FE)
					};
					GE.prototype.set_m_indices = GE.prototype.jG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ll(c, b)
					};
					Object.defineProperty(GE.prototype, "m_indices", {
						get: GE.prototype.sD,
						set: GE.prototype.jG
					});
					GE.prototype.get_m_plane = GE.prototype.RD = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return Ml(c, b)
					};
					GE.prototype.set_m_plane = GE.prototype.IG = function (b, c) {
						var d = this.eB;
						GD();
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Nl(d, b, c)
					};
					Object.defineProperty(GE.prototype, "m_plane", {
						get: GE.prototype.RD,
						set: GE.prototype.IG
					});
					GE.prototype.__destroy__ = function () {
						Ol(this.eB)
					};

					function sE() {
						throw "cannot construct a btVector3Array, no constructor in IDL";
					}
					sE.prototype = Object.create(f.prototype);
					sE.prototype.constructor = sE;
					sE.prototype.fB = sE;
					sE.gB = {};
					a.btVector3Array = sE;
					sE.prototype.size = sE.prototype.size = function () {
						return Pl(this.eB)
					};
					sE.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Ql(c, b), m)
					};
					sE.prototype.__destroy__ = function () {
						Rl(this.eB)
					};

					function HE() {
						throw "cannot construct a btFaceArray, no constructor in IDL";
					}
					HE.prototype = Object.create(f.prototype);
					HE.prototype.constructor = HE;
					HE.prototype.fB = HE;
					HE.gB = {};
					a.btFaceArray = HE;
					HE.prototype.size = HE.prototype.size = function () {
						return Sl(this.eB)
					};
					HE.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Tl(c, b), GE)
					};
					HE.prototype.__destroy__ = function () {
						Ul(this.eB)
					};

					function IE() {
						throw "cannot construct a btConvexPolyhedron, no constructor in IDL";
					}
					IE.prototype = Object.create(f.prototype);
					IE.prototype.constructor = IE;
					IE.prototype.fB = IE;
					IE.gB = {};
					a.btConvexPolyhedron = IE;
					IE.prototype.get_m_vertices = IE.prototype.wE = function () {
						return k(Vl(this.eB), sE)
					};
					IE.prototype.set_m_vertices = IE.prototype.oH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Wl(c, b)
					};
					Object.defineProperty(IE.prototype, "m_vertices", {
						get: IE.prototype.wE,
						set: IE.prototype.oH
					});
					IE.prototype.get_m_faces = IE.prototype.FB = function () {
						return k(Xl(this.eB), HE)
					};
					IE.prototype.set_m_faces = IE.prototype.PB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Yl(c, b)
					};
					Object.defineProperty(IE.prototype, "m_faces", {
						get: IE.prototype.FB,
						set: IE.prototype.PB
					});
					IE.prototype.__destroy__ = function () {
						Zl(this.eB)
					};

					function JE(b, c) {
						GD();
						"object" == typeof b && (b = KD(b));
						c && "object" === typeof c && (c = c.eB);
						this.eB = void 0 === b ? $l() : void 0 === c ? am(b) : bm(b, c);
						h(JE)[this.eB] = this
					}
					JE.prototype = Object.create(l.prototype);
					JE.prototype.constructor = JE;
					JE.prototype.fB = JE;
					JE.gB = {};
					a.btConvexHullShape = JE;
					JE.prototype.addPoint = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						void 0 === c ? cm(d, b) : dm(d, b, c)
					};
					JE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						em(c, b)
					};
					JE.prototype.getMargin = function () {
						return fm(this.eB)
					};
					JE.prototype.getNumVertices = function () {
						return gm(this.eB)
					};
					JE.prototype.initializePolyhedralFeatures = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return !!hm(c, b)
					};
					JE.prototype.recalcLocalAabb = function () {
						im(this.eB)
					};
					JE.prototype.getConvexPolyhedron = function () {
						return k(jm(this.eB), IE)
					};
					JE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						km(c, b)
					};
					JE.prototype.getLocalScaling = function () {
						return k(lm(this.eB), m)
					};
					JE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						mm(d, b, c)
					};
					JE.prototype.__destroy__ = function () {
						nm(this.eB)
					};

					function KE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = om(b);
						h(KE)[this.eB] = this
					}
					KE.prototype = Object.create(f.prototype);
					KE.prototype.constructor = KE;
					KE.prototype.fB = KE;
					KE.gB = {};
					a.btShapeHull = KE;
					KE.prototype.buildHull = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return !!pm(c, b)
					};
					KE.prototype.numVertices = function () {
						return qm(this.eB)
					};
					KE.prototype.getVertexPointer = function () {
						return k(rm(this.eB), m)
					};
					KE.prototype.__destroy__ = function () {
						sm(this.eB)
					};

					function LE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = void 0 === b ? tm() : um(b);
						h(LE)[this.eB] = this
					}
					LE.prototype = Object.create(l.prototype);
					LE.prototype.constructor = LE;
					LE.prototype.fB = LE;
					LE.gB = {};
					a.btCompoundShape = LE;
					LE.prototype.addChildShape = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						wm(d, b, c)
					};
					LE.prototype.removeChildShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xm(c, b)
					};
					LE.prototype.removeChildShapeByIndex = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ym(c, b)
					};
					LE.prototype.getNumChildShapes = function () {
						return zm(this.eB)
					};
					LE.prototype.getChildShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Am(c, b), l)
					};
					LE.prototype.updateChildTransform = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === d ? Bm(e, b, c) : Cm(e, b, c, d)
					};
					LE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Dm(c, b)
					};
					LE.prototype.getMargin = function () {
						return Em(this.eB)
					};
					LE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fm(c, b)
					};
					LE.prototype.getLocalScaling = function () {
						return k(Gm(this.eB), m)
					};
					LE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Hm(d, b, c)
					};
					LE.prototype.__destroy__ = function () {
						Im(this.eB)
					};

					function ME() {
						throw "cannot construct a btIndexedMesh, no constructor in IDL";
					}
					ME.prototype = Object.create(f.prototype);
					ME.prototype.constructor = ME;
					ME.prototype.fB = ME;
					ME.gB = {};
					a.btIndexedMesh = ME;
					ME.prototype.get_m_numTriangles = ME.prototype.PD = function () {
						return Jm(this.eB)
					};
					ME.prototype.set_m_numTriangles = ME.prototype.GG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Km(c, b)
					};
					Object.defineProperty(ME.prototype, "m_numTriangles", {
						get: ME.prototype.PD,
						set: ME.prototype.GG
					});
					ME.prototype.__destroy__ = function () {
						Lm(this.eB)
					};

					function NE() {
						throw "cannot construct a btIndexedMeshArray, no constructor in IDL";
					}
					NE.prototype = Object.create(f.prototype);
					NE.prototype.constructor = NE;
					NE.prototype.fB = NE;
					NE.gB = {};
					a.btIndexedMeshArray = NE;
					NE.prototype.size = NE.prototype.size = function () {
						return Mm(this.eB)
					};
					NE.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Nm(c, b), ME)
					};
					NE.prototype.__destroy__ = function () {
						Om(this.eB)
					};

					function OE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = void 0 === b ? Pm() : void 0 === c ? Qm(b) : Rm(b, c);
						h(OE)[this.eB] = this
					}
					OE.prototype = Object.create(cE.prototype);
					OE.prototype.constructor = OE;
					OE.prototype.fB = OE;
					OE.gB = {};
					a.btTriangleMesh = OE;
					OE.prototype.addTriangle = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						void 0 === e ? Sm(g, b, c, d) : Tm(g, b, c, d, e)
					};
					OE.prototype.findOrAddVertex = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return Um(d, b, c)
					};
					OE.prototype.addIndex = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Vm(c, b)
					};
					OE.prototype.getIndexedMeshArray = function () {
						return k(Wm(this.eB), NE)
					};
					OE.prototype.setScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Xm(c, b)
					};
					OE.prototype.__destroy__ = function () {
						Ym(this.eB)
					};

					function PE() {
						this.eB = Zm();
						h(PE)[this.eB] = this
					}
					PE.prototype = Object.create(SD.prototype);
					PE.prototype.constructor = PE;
					PE.prototype.fB = PE;
					PE.gB = {};
					a.btEmptyShape = PE;
					PE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						$m(c, b)
					};
					PE.prototype.getLocalScaling = function () {
						return k(an(this.eB), m)
					};
					PE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						bn(d, b, c)
					};
					PE.prototype.__destroy__ = function () {
						cn(this.eB)
					};

					function QE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = dn(b, c);
						h(QE)[this.eB] = this
					}
					QE.prototype = Object.create(SD.prototype);
					QE.prototype.constructor = QE;
					QE.prototype.fB = QE;
					QE.gB = {};
					a.btStaticPlaneShape = QE;
					QE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						en(c, b)
					};
					QE.prototype.getLocalScaling = function () {
						return k(fn(this.eB), m)
					};
					QE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						gn(d, b, c)
					};
					QE.prototype.__destroy__ = function () {
						hn(this.eB)
					};

					function RE(b, c, d) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						this.eB = void 0 === d ? jn(b, c) : kn(b, c, d);
						h(RE)[this.eB] = this
					}
					RE.prototype = Object.create(dE.prototype);
					RE.prototype.constructor = RE;
					RE.prototype.fB = RE;
					RE.gB = {};
					a.btBvhTriangleMeshShape = RE;
					RE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ln(c, b)
					};
					RE.prototype.getLocalScaling = function () {
						return k(mn(this.eB), m)
					};
					RE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						nn(d, b, c)
					};
					RE.prototype.__destroy__ = function () {
						on(this.eB)
					};

					function SE(b, c, d, e, g, n, D, T, Da) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						n && "object" === typeof n && (n = n.eB);
						D && "object" === typeof D && (D = D.eB);
						T && "object" === typeof T && (T = T.eB);
						Da && "object" === typeof Da && (Da = Da.eB);
						this.eB = pn(b, c, d, e, g, n, D, T, Da);
						h(SE)[this.eB] = this
					}
					SE.prototype = Object.create(SD.prototype);
					SE.prototype.constructor = SE;
					SE.prototype.fB = SE;
					SE.gB = {};
					a.btHeightfieldTerrainShape = SE;
					SE.prototype.setMargin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qn(c, b)
					};
					SE.prototype.getMargin = function () {
						return rn(this.eB)
					};
					SE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sn(c, b)
					};
					SE.prototype.getLocalScaling = function () {
						return k(tn(this.eB), m)
					};
					SE.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						un(d, b, c)
					};
					SE.prototype.__destroy__ = function () {
						vn(this.eB)
					};

					function TE(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = wn(b, c, d, e);
						h(TE)[this.eB] = this
					}
					TE.prototype = Object.create(f.prototype);
					TE.prototype.constructor = TE;
					TE.prototype.fB = TE;
					TE.gB = {};
					a.btAABB = TE;
					TE.prototype.invalidate = function () {
						xn(this.eB)
					};
					TE.prototype.increment_margin = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yn(c, b)
					};
					TE.prototype.copy_with_margin = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						zn(d, b, c)
					};
					TE.prototype.__destroy__ = function () {
						An(this.eB)
					};

					function UE() {
						this.eB = Bn();
						h(UE)[this.eB] = this
					}
					UE.prototype = Object.create(f.prototype);
					UE.prototype.constructor = UE;
					UE.prototype.fB = UE;
					UE.gB = {};
					a.btPrimitiveTriangle = UE;
					UE.prototype.__destroy__ = function () {
						Cn(this.eB)
					};

					function VE(b, c, d) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						this.eB = Dn(b, c, d);
						h(VE)[this.eB] = this
					}
					VE.prototype = Object.create(f.prototype);
					VE.prototype.constructor = VE;
					VE.prototype.fB = VE;
					VE.gB = {};
					a.btTriangleShapeEx = VE;
					VE.prototype.getAabb = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						En(e, b, c, d)
					};
					VE.prototype.applyTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fn(c, b)
					};
					VE.prototype.buildTriPlane = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gn(c, b)
					};
					VE.prototype.__destroy__ = function () {
						Hn(this.eB)
					};

					function WE() {
						this.eB = In();
						h(WE)[this.eB] = this
					}
					WE.prototype = Object.create(f.prototype);
					WE.prototype.constructor = WE;
					WE.prototype.fB = WE;
					WE.gB = {};
					a.btTetrahedronShapeEx = WE;
					WE.prototype.setVertices = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						Jn(g, b, c, d, e)
					};
					WE.prototype.__destroy__ = function () {
						Kn(this.eB)
					};

					function XE() {
						throw "cannot construct a CompoundPrimitiveManager, no constructor in IDL";
					}
					XE.prototype = Object.create(eE.prototype);
					XE.prototype.constructor = XE;
					XE.prototype.fB = XE;
					XE.gB = {};
					a.CompoundPrimitiveManager = XE;
					XE.prototype.get_primitive_count = function () {
						return Ln(this.eB)
					};
					XE.prototype.get_primitive_box = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Mn(d, b, c)
					};
					XE.prototype.get_primitive_triangle = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Nn(d, b, c)
					};
					XE.prototype.is_trimesh = function () {
						return !!On(this.eB)
					};
					XE.prototype.get_m_compoundShape = XE.prototype.QC = function () {
						return k(Pn(this.eB), H)
					};
					XE.prototype.set_m_compoundShape = XE.prototype.HF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Qn(c, b)
					};
					Object.defineProperty(XE.prototype, "m_compoundShape", {
						get: XE.prototype.QC,
						set: XE.prototype.HF
					});
					XE.prototype.__destroy__ = function () {
						Rn(this.eB)
					};

					function H(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = void 0 === b ? Sn() : Tn(b);
						h(H)[this.eB] = this
					}
					H.prototype = Object.create(w.prototype);
					H.prototype.constructor = H;
					H.prototype.fB = H;
					H.gB = {};
					a.btGImpactCompoundShape = H;
					H.prototype.childrenHasTransform = function () {
						return !!Un(this.eB)
					};
					H.prototype.getPrimitiveManager = function () {
						return k(Vn(this.eB), eE)
					};
					H.prototype.getCompoundPrimitiveManager = function () {
						return k(Wn(this.eB), XE)
					};
					H.prototype.getNumChildShapes = function () {
						return Xn(this.eB)
					};
					H.prototype.addChildShape = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Yn(d, b, c)
					};
					H.prototype.getChildShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Zn(c, b), l)
					};
					H.prototype.getChildAabb = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						$n(g, b, c, d, e)
					};
					H.prototype.getChildTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(ao(c, b), r)
					};
					H.prototype.setChildTransform = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						bo(d, b, c)
					};
					H.prototype.calculateLocalInertia = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						co(d, b, c)
					};
					H.prototype.getName = function () {
						return ua(eo(this.eB))
					};
					H.prototype.getGImpactShapeType = function () {
						return fo(this.eB)
					};
					H.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						go(c, b)
					};
					H.prototype.getLocalScaling = function () {
						return k(ho(this.eB), m)
					};
					H.prototype.updateBound = function () {
						io(this.eB)
					};
					H.prototype.postUpdate = function () {
						jo(this.eB)
					};
					H.prototype.getShapeType = function () {
						return ko(this.eB)
					};
					H.prototype.needsRetrieveTriangles = function () {
						return !!lo(this.eB)
					};
					H.prototype.needsRetrieveTetrahedrons = function () {
						return !!mo(this.eB)
					};
					H.prototype.getBulletTriangle = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						no(d, b, c)
					};
					H.prototype.getBulletTetrahedron = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						oo(d, b, c)
					};
					H.prototype.__destroy__ = function () {
						po(this.eB)
					};

					function I(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = void 0 === b ? qo() : ro(b);
						h(I)[this.eB] = this
					}
					I.prototype = Object.create(eE.prototype);
					I.prototype.constructor = I;
					I.prototype.fB = I;
					I.gB = {};
					a.TrimeshPrimitiveManager = I;
					I.prototype.lock = I.prototype.lock = function () {
						so(this.eB)
					};
					I.prototype.unlock = I.prototype.unlock = function () {
						to(this.eB)
					};
					I.prototype.is_trimesh = function () {
						return !!uo(this.eB)
					};
					I.prototype.get_vertex_count = function () {
						return vo(this.eB)
					};
					I.prototype.get_indices = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						wo(g, b, c, d, e)
					};
					I.prototype.get_vertex = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						xo(d, b, c)
					};
					I.prototype.get_bullet_triangle = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						yo(d, b, c)
					};
					I.prototype.get_m_margin = I.prototype.GD = function () {
						return zo(this.eB)
					};
					I.prototype.set_m_margin = I.prototype.xG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ao(c, b)
					};
					Object.defineProperty(I.prototype, "m_margin", {
						get: I.prototype.GD,
						set: I.prototype.xG
					});
					I.prototype.get_m_meshInterface = I.prototype.JD = function () {
						return k(Bo(this.eB), cE)
					};
					I.prototype.set_m_meshInterface = I.prototype.AG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Co(c, b)
					};
					Object.defineProperty(I.prototype, "m_meshInterface", {
						get: I.prototype.JD,
						set: I.prototype.AG
					});
					I.prototype.get_m_part = I.prototype.QD = function () {
						return Do(this.eB)
					};
					I.prototype.set_m_part = I.prototype.HG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Eo(c, b)
					};
					Object.defineProperty(I.prototype, "m_part", {
						get: I.prototype.QD,
						set: I.prototype.HG
					});
					I.prototype.get_m_lock_count = I.prototype.ED = function () {
						return Fo(this.eB)
					};
					I.prototype.set_m_lock_count = I.prototype.vG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Go(c, b)
					};
					Object.defineProperty(I.prototype, "m_lock_count", {
						get: I.prototype.ED,
						set: I.prototype.vG
					});
					I.prototype.get_numverts = I.prototype.GE = function () {
						return Ho(this.eB)
					};
					I.prototype.set_numverts = I.prototype.yH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Io(c, b)
					};
					Object.defineProperty(I.prototype, "numverts", {
						get: I.prototype.GE,
						set: I.prototype.yH
					});
					I.prototype.get_type = I.prototype.KE = function () {
						return Jo(this.eB)
					};
					I.prototype.set_type = I.prototype.CH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ko(c, b)
					};
					Object.defineProperty(I.prototype, "type", {
						get: I.prototype.KE,
						set: I.prototype.CH
					});
					I.prototype.get_stride = I.prototype.IE = function () {
						return Lo(this.eB)
					};
					I.prototype.set_stride = I.prototype.AH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Mo(c, b)
					};
					Object.defineProperty(I.prototype, "stride", {
						get: I.prototype.IE,
						set: I.prototype.AH
					});
					I.prototype.get_indexstride = I.prototype.bC = function () {
						return No(this.eB)
					};
					I.prototype.set_indexstride = I.prototype.TE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Oo(c, b)
					};
					Object.defineProperty(I.prototype, "indexstride", {
						get: I.prototype.bC,
						set: I.prototype.TE
					});
					I.prototype.get_numfaces = I.prototype.FE = function () {
						return Po(this.eB)
					};
					I.prototype.set_numfaces = I.prototype.xH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Qo(c, b)
					};
					Object.defineProperty(I.prototype, "numfaces", {
						get: I.prototype.FE,
						set: I.prototype.xH
					});
					I.prototype.get_indicestype = I.prototype.cC = function () {
						return Ro(this.eB)
					};
					I.prototype.set_indicestype = I.prototype.UE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						So(c, b)
					};
					Object.defineProperty(I.prototype, "indicestype", {
						get: I.prototype.cC,
						set: I.prototype.UE
					});
					I.prototype.__destroy__ = function () {
						To(this.eB)
					};

					function YE(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = Uo(b, c);
						h(YE)[this.eB] = this
					}
					YE.prototype = Object.create(w.prototype);
					YE.prototype.constructor = YE;
					YE.prototype.fB = YE;
					YE.gB = {};
					a.btGImpactMeshShapePart = YE;
					YE.prototype.getTrimeshPrimitiveManager = function () {
						return k(Vo(this.eB), I)
					};
					YE.prototype.getVertexCount = function () {
						return Wo(this.eB)
					};
					YE.prototype.getVertex = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Xo(d, b, c)
					};
					YE.prototype.getPart = function () {
						return Yo(this.eB)
					};
					YE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zo(c, b)
					};
					YE.prototype.getLocalScaling = function () {
						return k($o(this.eB), m)
					};
					YE.prototype.updateBound = function () {
						ap(this.eB)
					};
					YE.prototype.postUpdate = function () {
						bp(this.eB)
					};
					YE.prototype.getShapeType = function () {
						return cp(this.eB)
					};
					YE.prototype.needsRetrieveTriangles = function () {
						return !!dp(this.eB)
					};
					YE.prototype.needsRetrieveTetrahedrons = function () {
						return !!ep(this.eB)
					};
					YE.prototype.getBulletTriangle = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						fp(d, b, c)
					};
					YE.prototype.getBulletTetrahedron = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						gp(d, b, c)
					};
					YE.prototype.__destroy__ = function () {
						hp(this.eB)
					};

					function ZE(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = ip(b);
						h(ZE)[this.eB] = this
					}
					ZE.prototype = Object.create(w.prototype);
					ZE.prototype.constructor = ZE;
					ZE.prototype.fB = ZE;
					ZE.gB = {};
					a.btGImpactMeshShape = ZE;
					ZE.prototype.getMeshInterface = function () {
						return k(jp(this.eB), cE)
					};
					ZE.prototype.getMeshPartCount = function () {
						return kp(this.eB)
					};
					ZE.prototype.getMeshPart = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(lp(c, b), YE)
					};
					ZE.prototype.calculateSerializeBufferSize = function () {
						return mp(this.eB)
					};
					ZE.prototype.setLocalScaling = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						np(c, b)
					};
					ZE.prototype.getLocalScaling = function () {
						return k(op(this.eB), m)
					};
					ZE.prototype.updateBound = function () {
						pp(this.eB)
					};
					ZE.prototype.postUpdate = function () {
						qp(this.eB)
					};
					ZE.prototype.getShapeType = function () {
						return rp(this.eB)
					};
					ZE.prototype.needsRetrieveTriangles = function () {
						return !!sp(this.eB)
					};
					ZE.prototype.needsRetrieveTetrahedrons = function () {
						return !!tp(this.eB)
					};
					ZE.prototype.getBulletTriangle = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						up(d, b, c)
					};
					ZE.prototype.getBulletTetrahedron = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						vp(d, b, c)
					};
					ZE.prototype.__destroy__ = function () {
						wp(this.eB)
					};

					function $E(b, c) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						this.eB = void 0 === b ? xp() : void 0 === c ? _emscripten_bind_btCollisionAlgorithmConstructionInfo_btCollisionAlgorithmConstructionInfo_1(b) : yp(b, c);
						h($E)[this.eB] = this
					}
					$E.prototype = Object.create(f.prototype);
					$E.prototype.constructor = $E;
					$E.prototype.fB = $E;
					$E.gB = {};
					a.btCollisionAlgorithmConstructionInfo = $E;
					$E.prototype.get_m_dispatcher1 = $E.prototype.$C = function () {
						return k(zp(this.eB), MD)
					};
					$E.prototype.set_m_dispatcher1 = $E.prototype.RF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ap(c, b)
					};
					Object.defineProperty($E.prototype, "m_dispatcher1", {
						get: $E.prototype.$C,
						set: $E.prototype.RF
					});
					$E.prototype.get_m_manifold = $E.prototype.FD = function () {
						return k(Bp(this.eB), hE)
					};
					$E.prototype.set_m_manifold = $E.prototype.wG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Cp(c, b)
					};
					Object.defineProperty($E.prototype, "m_manifold", {
						get: $E.prototype.FD,
						set: $E.prototype.wG
					});
					$E.prototype.__destroy__ = function () {
						Dp(this.eB)
					};

					function aF(b, c, d) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						this.eB = Ep(b, c, d);
						h(aF)[this.eB] = this
					}
					aF.prototype = Object.create(fE.prototype);
					aF.prototype.constructor = aF;
					aF.prototype.fB = aF;
					aF.gB = {};
					a.btGImpactCollisionAlgorithm = aF;
					aF.prototype.registerAlgorithm = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fp(c, b)
					};
					aF.prototype.__destroy__ = function () {
						Gp(this.eB)
					};

					function bF() {
						this.eB = Hp();
						h(bF)[this.eB] = this
					}
					bF.prototype = Object.create(f.prototype);
					bF.prototype.constructor = bF;
					bF.prototype.fB = bF;
					bF.gB = {};
					a.btDefaultCollisionConstructionInfo = bF;
					bF.prototype.__destroy__ = function () {
						Ip(this.eB)
					};

					function hE() {
						this.eB = Jp();
						h(hE)[this.eB] = this
					}
					hE.prototype = Object.create(f.prototype);
					hE.prototype.constructor = hE;
					hE.prototype.fB = hE;
					hE.gB = {};
					a.btPersistentManifold = hE;
					hE.prototype.getBody0 = function () {
						return k(Kp(this.eB), q)
					};
					hE.prototype.getBody1 = function () {
						return k(Lp(this.eB), q)
					};
					hE.prototype.getNumContacts = function () {
						return Mp(this.eB)
					};
					hE.prototype.getContactPoint = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Np(c, b), E)
					};
					hE.prototype.__destroy__ = function () {
						Op(this.eB)
					};

					function cF(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = Pp(b);
						h(cF)[this.eB] = this
					}
					cF.prototype = Object.create(MD.prototype);
					cF.prototype.constructor = cF;
					cF.prototype.fB = cF;
					cF.gB = {};
					a.btCollisionDispatcher = cF;
					cF.prototype.getNumManifolds = function () {
						return Qp(this.eB)
					};
					cF.prototype.getManifoldByIndexInternal = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Rp(c, b), hE)
					};
					cF.prototype.__destroy__ = function () {
						Sp(this.eB)
					};

					function dF() {
						throw "cannot construct a btOverlappingPairCallback, no constructor in IDL";
					}
					dF.prototype = Object.create(f.prototype);
					dF.prototype.constructor = dF;
					dF.prototype.fB = dF;
					dF.gB = {};
					a.btOverlappingPairCallback = dF;
					dF.prototype.__destroy__ = function () {
						Tp(this.eB)
					};

					function ND() {
						throw "cannot construct a btOverlappingPairCache, no constructor in IDL";
					}
					ND.prototype = Object.create(f.prototype);
					ND.prototype.constructor = ND;
					ND.prototype.fB = ND;
					ND.gB = {};
					a.btOverlappingPairCache = ND;
					ND.prototype.setInternalGhostPairCallback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Up(c, b)
					};
					ND.prototype.getNumOverlappingPairs = function () {
						return Vp(this.eB)
					};
					ND.prototype.__destroy__ = function () {
						Wp(this.eB)
					};

					function eF(b, c, d, e, g) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						this.eB = void 0 === d ? Xp(b, c) : void 0 === e ? Yp(b, c, d) : void 0 === g ? Zp(b, c, d, e) : $p(b, c, d, e, g);
						h(eF)[this.eB] = this
					}
					eF.prototype = Object.create(f.prototype);
					eF.prototype.constructor = eF;
					eF.prototype.fB = eF;
					eF.gB = {};
					a.btAxisSweep3 = eF;
					eF.prototype.__destroy__ = function () {
						aq(this.eB)
					};

					function OD() {
						throw "cannot construct a btBroadphaseInterface, no constructor in IDL";
					}
					OD.prototype = Object.create(f.prototype);
					OD.prototype.constructor = OD;
					OD.prototype.fB = OD;
					OD.gB = {};
					a.btBroadphaseInterface = OD;
					OD.prototype.getOverlappingPairCache = function () {
						return k(bq(this.eB), ND)
					};
					OD.prototype.__destroy__ = function () {
						cq(this.eB)
					};

					function fF() {
						throw "cannot construct a btCollisionConfiguration, no constructor in IDL";
					}
					fF.prototype = Object.create(f.prototype);
					fF.prototype.constructor = fF;
					fF.prototype.fB = fF;
					fF.gB = {};
					a.btCollisionConfiguration = fF;
					fF.prototype.__destroy__ = function () {
						dq(this.eB)
					};

					function gF() {
						this.eB = eq();
						h(gF)[this.eB] = this
					}
					gF.prototype = Object.create(f.prototype);
					gF.prototype.constructor = gF;
					gF.prototype.fB = gF;
					gF.gB = {};
					a.btDbvtBroadphase = gF;
					gF.prototype.__destroy__ = function () {
						fq(this.eB)
					};

					function RD() {
						throw "cannot construct a btBroadphaseProxy, no constructor in IDL";
					}
					RD.prototype = Object.create(f.prototype);
					RD.prototype.constructor = RD;
					RD.prototype.fB = RD;
					RD.gB = {};
					a.btBroadphaseProxy = RD;
					RD.prototype.get_m_collisionFilterGroup = RD.prototype.hB = function () {
						return gq(this.eB)
					};
					RD.prototype.set_m_collisionFilterGroup = RD.prototype.jB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hq(c, b)
					};
					Object.defineProperty(RD.prototype, "m_collisionFilterGroup", {
						get: RD.prototype.hB,
						set: RD.prototype.jB
					});
					RD.prototype.get_m_collisionFilterMask = RD.prototype.iB = function () {
						return iq(this.eB)
					};
					RD.prototype.set_m_collisionFilterMask = RD.prototype.kB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jq(c, b)
					};
					Object.defineProperty(RD.prototype, "m_collisionFilterMask", {
						get: RD.prototype.iB,
						set: RD.prototype.kB
					});
					RD.prototype.__destroy__ = function () {
						kq(this.eB)
					};

					function J(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = void 0 === e ? lq(b, c, d) : mq(b, c, d, e);
						h(J)[this.eB] = this
					}
					J.prototype = Object.create(f.prototype);
					J.prototype.constructor = J;
					J.prototype.fB = J;
					J.gB = {};
					a.btRigidBodyConstructionInfo = J;
					J.prototype.get_m_linearDamping = J.prototype.yD = function () {
						return nq(this.eB)
					};
					J.prototype.set_m_linearDamping = J.prototype.pG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						oq(c, b)
					};
					Object.defineProperty(J.prototype, "m_linearDamping", {
						get: J.prototype.yD,
						set: J.prototype.pG
					});
					J.prototype.get_m_angularDamping = J.prototype.CC = function () {
						return pq(this.eB)
					};
					J.prototype.set_m_angularDamping = J.prototype.tF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qq(c, b)
					};
					Object.defineProperty(J.prototype, "m_angularDamping", {
						get: J.prototype.CC,
						set: J.prototype.tF
					});
					J.prototype.get_m_friction = J.prototype.fD = function () {
						return rq(this.eB)
					};
					J.prototype.set_m_friction = J.prototype.XF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sq(c, b)
					};
					Object.defineProperty(J.prototype, "m_friction", {
						get: J.prototype.fD,
						set: J.prototype.XF
					});
					J.prototype.get_m_rollingFriction = J.prototype.ZD = function () {
						return tq(this.eB)
					};
					J.prototype.set_m_rollingFriction = J.prototype.QG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						uq(c, b)
					};
					Object.defineProperty(J.prototype, "m_rollingFriction", {
						get: J.prototype.ZD,
						set: J.prototype.QG
					});
					J.prototype.get_m_restitution = J.prototype.XD = function () {
						return vq(this.eB)
					};
					J.prototype.set_m_restitution = J.prototype.OG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wq(c, b)
					};
					Object.defineProperty(J.prototype, "m_restitution", {
						get: J.prototype.XD,
						set: J.prototype.OG
					});
					J.prototype.get_m_linearSleepingThreshold = J.prototype.zD = function () {
						return xq(this.eB)
					};
					J.prototype.set_m_linearSleepingThreshold = J.prototype.qG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yq(c, b)
					};
					Object.defineProperty(J.prototype, "m_linearSleepingThreshold", {
						get: J.prototype.zD,
						set: J.prototype.qG
					});
					J.prototype.get_m_angularSleepingThreshold = J.prototype.DC = function () {
						return zq(this.eB)
					};
					J.prototype.set_m_angularSleepingThreshold = J.prototype.uF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Aq(c, b)
					};
					Object.defineProperty(J.prototype, "m_angularSleepingThreshold", {
						get: J.prototype.DC,
						set: J.prototype.uF
					});
					J.prototype.get_m_additionalDamping = J.prototype.xC = function () {
						return !!Bq(this.eB)
					};
					J.prototype.set_m_additionalDamping = J.prototype.oF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Cq(c, b)
					};
					Object.defineProperty(J.prototype, "m_additionalDamping", {
						get: J.prototype.xC,
						set: J.prototype.oF
					});
					J.prototype.get_m_additionalDampingFactor = J.prototype.yC = function () {
						return Dq(this.eB)
					};
					J.prototype.set_m_additionalDampingFactor = J.prototype.pF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Eq(c, b)
					};
					Object.defineProperty(J.prototype, "m_additionalDampingFactor", {
						get: J.prototype.yC,
						set: J.prototype.pF
					});
					J.prototype.get_m_additionalLinearDampingThresholdSqr = J.prototype.zC = function () {
						return Fq(this.eB)
					};
					J.prototype.set_m_additionalLinearDampingThresholdSqr = J.prototype.qF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gq(c, b)
					};
					Object.defineProperty(J.prototype, "m_additionalLinearDampingThresholdSqr", {
						get: J.prototype.zC,
						set: J.prototype.qF
					});
					J.prototype.get_m_additionalAngularDampingThresholdSqr = J.prototype.wC = function () {
						return Hq(this.eB)
					};
					J.prototype.set_m_additionalAngularDampingThresholdSqr = J.prototype.nF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Iq(c, b)
					};
					Object.defineProperty(J.prototype, "m_additionalAngularDampingThresholdSqr", {
						get: J.prototype.wC,
						set: J.prototype.nF
					});
					J.prototype.get_m_additionalAngularDampingFactor = J.prototype.vC = function () {
						return Jq(this.eB)
					};
					J.prototype.set_m_additionalAngularDampingFactor = J.prototype.mF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kq(c, b)
					};
					Object.defineProperty(J.prototype, "m_additionalAngularDampingFactor", {
						get: J.prototype.vC,
						set: J.prototype.mF
					});
					J.prototype.__destroy__ = function () {
						Lq(this.eB)
					};

					function K(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = Mq(b);
						h(K)[this.eB] = this
					}
					K.prototype = Object.create(q.prototype);
					K.prototype.constructor = K;
					K.prototype.fB = K;
					K.gB = {};
					a.btRigidBody = K;
					K.prototype.getCenterOfMassTransform = function () {
						return k(Nq(this.eB), r)
					};
					K.prototype.setCenterOfMassTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Oq(c, b)
					};
					K.prototype.setSleepingThresholds = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Pq(d, b, c)
					};
					K.prototype.getLinearDamping = function () {
						return Qq(this.eB)
					};
					K.prototype.getAngularDamping = function () {
						return Rq(this.eB)
					};
					K.prototype.setDamping = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Sq(d, b, c)
					};
					K.prototype.setMassProps = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Tq(d, b, c)
					};
					K.prototype.getLinearFactor = function () {
						return k(Uq(this.eB), m)
					};
					K.prototype.setLinearFactor = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Vq(c, b)
					};
					K.prototype.applyTorque = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Wq(c, b)
					};
					K.prototype.applyLocalTorque = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Xq(c, b)
					};
					K.prototype.applyForce = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Yq(d, b, c)
					};
					K.prototype.applyCentralForce = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zq(c, b)
					};
					K.prototype.applyCentralLocalForce = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						$q(c, b)
					};
					K.prototype.applyTorqueImpulse = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ar(c, b)
					};
					K.prototype.applyImpulse = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						br(d, b, c)
					};
					K.prototype.applyCentralImpulse = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cr(c, b)
					};
					K.prototype.updateInertiaTensor = function () {
						dr(this.eB)
					};
					K.prototype.getLinearVelocity = function () {
						return k(er(this.eB), m)
					};
					K.prototype.getAngularVelocity = function () {
						return k(fr(this.eB), m)
					};
					K.prototype.setLinearVelocity = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gr(c, b)
					};
					K.prototype.setAngularVelocity = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hr(c, b)
					};
					K.prototype.getMotionState = function () {
						return k(ir(this.eB), XD)
					};
					K.prototype.setMotionState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jr(c, b)
					};
					K.prototype.getAngularFactor = function () {
						return k(kr(this.eB), m)
					};
					K.prototype.setAngularFactor = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						lr(c, b)
					};
					K.prototype.upcast = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(mr(c, b), K)
					};
					K.prototype.getAabb = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						nr(d, b, c)
					};
					K.prototype.applyGravity = function () {
						or(this.eB)
					};
					K.prototype.getGravity = function () {
						return k(pr(this.eB), m)
					};
					K.prototype.setGravity = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qr(c, b)
					};
					K.prototype.getBroadphaseProxy = function () {
						return k(rr(this.eB), RD)
					};
					K.prototype.clearForces = function () {
						sr(this.eB)
					};
					K.prototype.setAnisotropicFriction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						tr(d, b, c)
					};
					K.prototype.getCollisionShape = function () {
						return k(ur(this.eB), l)
					};
					K.prototype.setContactProcessingThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vr(c, b)
					};
					K.prototype.setActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wr(c, b)
					};
					K.prototype.forceActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xr(c, b)
					};
					K.prototype.activate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						void 0 === b ? yr(c) : zr(c, b)
					};
					K.prototype.isActive = function () {
						return !!Ar(this.eB)
					};
					K.prototype.isKinematicObject = function () {
						return !!Br(this.eB)
					};
					K.prototype.isStaticObject = function () {
						return !!Cr(this.eB)
					};
					K.prototype.isStaticOrKinematicObject = function () {
						return !!Dr(this.eB)
					};
					K.prototype.getRestitution = function () {
						return Er(this.eB)
					};
					K.prototype.getFriction = function () {
						return Fr(this.eB)
					};
					K.prototype.getRollingFriction = function () {
						return Gr(this.eB)
					};
					K.prototype.setRestitution = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Hr(c, b)
					};
					K.prototype.setFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ir(c, b)
					};
					K.prototype.setRollingFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Jr(c, b)
					};
					K.prototype.getWorldTransform = function () {
						return k(Kr(this.eB), r)
					};
					K.prototype.getCollisionFlags = function () {
						return Lr(this.eB)
					};
					K.prototype.setCollisionFlags = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Mr(c, b)
					};
					K.prototype.setWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Nr(c, b)
					};
					K.prototype.setCollisionShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Or(c, b)
					};
					K.prototype.setCcdMotionThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Pr(c, b)
					};
					K.prototype.setCcdSweptSphereRadius = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Qr(c, b)
					};
					K.prototype.getUserIndex = function () {
						return Rr(this.eB)
					};
					K.prototype.setUserIndex = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Sr(c, b)
					};
					K.prototype.getUserPointer = function () {
						return k(Tr(this.eB), QD)
					};
					K.prototype.setUserPointer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ur(c, b)
					};
					K.prototype.getBroadphaseHandle = function () {
						return k(Vr(this.eB), RD)
					};
					K.prototype.__destroy__ = function () {
						Wr(this.eB)
					};

					function L() {
						this.eB = Xr();
						h(L)[this.eB] = this
					}
					L.prototype = Object.create(f.prototype);
					L.prototype.constructor = L;
					L.prototype.fB = L;
					L.gB = {};
					a.btConstraintSetting = L;
					L.prototype.get_m_tau = L.prototype.nE = function () {
						return Yr(this.eB)
					};
					L.prototype.set_m_tau = L.prototype.fH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zr(c, b)
					};
					Object.defineProperty(L.prototype, "m_tau", {
						get: L.prototype.nE,
						set: L.prototype.fH
					});
					L.prototype.get_m_damping = L.prototype.WC = function () {
						return $r(this.eB)
					};
					L.prototype.set_m_damping = L.prototype.NF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						as(c, b)
					};
					Object.defineProperty(L.prototype, "m_damping", {
						get: L.prototype.WC,
						set: L.prototype.NF
					});
					L.prototype.get_m_impulseClamp = L.prototype.rD = function () {
						return bs(this.eB)
					};
					L.prototype.set_m_impulseClamp = L.prototype.iG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cs(c, b)
					};
					Object.defineProperty(L.prototype, "m_impulseClamp", {
						get: L.prototype.rD,
						set: L.prototype.iG
					});
					L.prototype.__destroy__ = function () {
						ds(this.eB)
					};

					function hF(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = void 0 === d ? es(b, c) : void 0 === e ? _emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_3(b, c, d) : gs(b, c, d, e);
						h(hF)[this.eB] = this
					}
					hF.prototype = Object.create(UD.prototype);
					hF.prototype.constructor = hF;
					hF.prototype.fB = hF;
					hF.gB = {};
					a.btPoint2PointConstraint = hF;
					hF.prototype.setPivotA = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hs(c, b)
					};
					hF.prototype.setPivotB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						is(c, b)
					};
					hF.prototype.getPivotInA = function () {
						return k(js(this.eB), m)
					};
					hF.prototype.getPivotInB = function () {
						return k(ks(this.eB), m)
					};
					hF.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ls(c, b)
					};
					hF.prototype.getBreakingImpulseThreshold = function () {
						return ms(this.eB)
					};
					hF.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ns(c, b)
					};
					hF.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return ps(d, b, c)
					};
					hF.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						qs(e, b, c, d)
					};
					hF.prototype.get_m_setting = hF.prototype.aE = function () {
						return k(rs(this.eB), L)
					};
					hF.prototype.set_m_setting = hF.prototype.TG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ss(c, b)
					};
					Object.defineProperty(hF.prototype, "m_setting", {
						get: hF.prototype.aE,
						set: hF.prototype.TG
					});
					hF.prototype.__destroy__ = function () {
						ts(this.eB)
					};

					function iF(b, c, d, e, g) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						this.eB = void 0 === e ? us(b, c, d) : void 0 === g ? _emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(b, c, d, e) : vs(b, c, d, e, g);
						h(iF)[this.eB] = this
					}
					iF.prototype = Object.create(iE.prototype);
					iF.prototype.constructor = iF;
					iF.prototype.fB = iF;
					iF.gB = {};
					a.btGeneric6DofSpringConstraint = iF;
					iF.prototype.enableSpring = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						xs(d, b, c)
					};
					iF.prototype.setStiffness = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						ys(d, b, c)
					};
					iF.prototype.setDamping = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						zs(d, b, c)
					};
					iF.prototype.setEquilibriumPoint = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						void 0 === b ? As(d) : void 0 === c ? Bs(d, b) : Cs(d, b, c)
					};
					iF.prototype.setLinearLowerLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ds(c, b)
					};
					iF.prototype.setLinearUpperLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Es(c, b)
					};
					iF.prototype.setAngularLowerLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fs(c, b)
					};
					iF.prototype.setAngularUpperLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gs(c, b)
					};
					iF.prototype.getFrameOffsetA = function () {
						return k(Hs(this.eB), r)
					};
					iF.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Is(c, b)
					};
					iF.prototype.getBreakingImpulseThreshold = function () {
						return Js(this.eB)
					};
					iF.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ks(c, b)
					};
					iF.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return Ls(d, b, c)
					};
					iF.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Ms(e, b, c, d)
					};
					iF.prototype.__destroy__ = function () {
						Ns(this.eB)
					};

					function jF() {
						this.eB = Os();
						h(jF)[this.eB] = this
					}
					jF.prototype = Object.create(f.prototype);
					jF.prototype.constructor = jF;
					jF.prototype.fB = jF;
					jF.gB = {};
					a.btSequentialImpulseConstraintSolver = jF;
					jF.prototype.__destroy__ = function () {
						Ps(this.eB)
					};

					function kF(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = void 0 === d ? Qs(b, c) : void 0 === e ? _emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_3(b, c, d) : Rs(b, c, d, e);
						h(kF)[this.eB] = this
					}
					kF.prototype = Object.create(UD.prototype);
					kF.prototype.constructor = kF;
					kF.prototype.fB = kF;
					kF.gB = {};
					a.btConeTwistConstraint = kF;
					kF.prototype.setLimit = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Ss(d, b, c)
					};
					kF.prototype.setAngularOnly = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ts(c, b)
					};
					kF.prototype.setDamping = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Us(c, b)
					};
					kF.prototype.enableMotor = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Vs(c, b)
					};
					kF.prototype.setMaxMotorImpulse = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ws(c, b)
					};
					kF.prototype.setMaxMotorImpulseNormalized = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Xs(c, b)
					};
					kF.prototype.setMotorTarget = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ys(c, b)
					};
					kF.prototype.setMotorTargetInConstraintSpace = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zs(c, b)
					};
					kF.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						$s(c, b)
					};
					kF.prototype.getBreakingImpulseThreshold = function () {
						return at(this.eB)
					};
					kF.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						bt(c, b)
					};
					kF.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return ct(d, b, c)
					};
					kF.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						dt(e, b, c, d)
					};
					kF.prototype.__destroy__ = function () {
						et(this.eB)
					};

					function lF(b, c, d, e, g, n, D) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						n && "object" === typeof n && (n = n.eB);
						D && "object" === typeof D && (D = D.eB);
						this.eB = void 0 === d ? ft(b, c) : void 0 === e ? gt(b, c, d) : void 0 === g ? ht(b, c, d, e) : void 0 === n ? it(b, c, d, e, g) : void 0 === D ? jt(b, c, d, e, g, n) : kt(b, c, d, e, g, n, D);
						h(lF)[this.eB] = this
					}
					lF.prototype = Object.create(UD.prototype);
					lF.prototype.constructor = lF;
					lF.prototype.fB = lF;
					lF.gB = {};
					a.btHingeConstraint = lF;
					lF.prototype.getHingeAngle = function () {
						return lt(this.eB)
					};
					lF.prototype.setLimit = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						void 0 === g ? mt(n, b, c, d, e) : nt(n, b, c, d, e, g)
					};
					lF.prototype.enableAngularMotor = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						ot(e, b, c, d)
					};
					lF.prototype.setAngularOnly = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						pt(c, b)
					};
					lF.prototype.enableMotor = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qt(c, b)
					};
					lF.prototype.setMaxMotorImpulse = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						rt(c, b)
					};
					lF.prototype.setMotorTarget = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						st(d, b, c)
					};
					lF.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						tt(c, b)
					};
					lF.prototype.getBreakingImpulseThreshold = function () {
						return ut(this.eB)
					};
					lF.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vt(c, b)
					};
					lF.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return wt(d, b, c)
					};
					lF.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						xt(e, b, c, d)
					};
					lF.prototype.__destroy__ = function () {
						yt(this.eB)
					};

					function mF(b, c, d, e, g) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						this.eB = void 0 === e ? zt(b, c, d) : void 0 === g ? _emscripten_bind_btSliderConstraint_btSliderConstraint_4(b, c, d, e) : At(b, c, d, e, g);
						h(mF)[this.eB] = this
					}
					mF.prototype = Object.create(UD.prototype);
					mF.prototype.constructor = mF;
					mF.prototype.fB = mF;
					mF.gB = {};
					a.btSliderConstraint = mF;
					mF.prototype.getLinearPos = function () {
						return Bt(this.eB)
					};
					mF.prototype.getAngularPos = function () {
						return Ct(this.eB)
					};
					mF.prototype.setLowerLinLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Dt(c, b)
					};
					mF.prototype.setUpperLinLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Et(c, b)
					};
					mF.prototype.setLowerAngLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ft(c, b)
					};
					mF.prototype.setUpperAngLimit = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gt(c, b)
					};
					mF.prototype.setPoweredLinMotor = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ht(c, b)
					};
					mF.prototype.setMaxLinMotorForce = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						It(c, b)
					};
					mF.prototype.setTargetLinMotorVelocity = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Jt(c, b)
					};
					mF.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kt(c, b)
					};
					mF.prototype.getBreakingImpulseThreshold = function () {
						return Lt(this.eB)
					};
					mF.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Mt(c, b)
					};
					mF.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return Nt(d, b, c)
					};
					mF.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Ot(e, b, c, d)
					};
					mF.prototype.__destroy__ = function () {
						Pt(this.eB)
					};

					function nF(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = Qt(b, c, d, e);
						h(nF)[this.eB] = this
					}
					nF.prototype = Object.create(UD.prototype);
					nF.prototype.constructor = nF;
					nF.prototype.fB = nF;
					nF.gB = {};
					a.btFixedConstraint = nF;
					nF.prototype.enableFeedback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Rt(c, b)
					};
					nF.prototype.getBreakingImpulseThreshold = function () {
						return St(this.eB)
					};
					nF.prototype.setBreakingImpulseThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Tt(c, b)
					};
					nF.prototype.getParam = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return Ut(d, b, c)
					};
					nF.prototype.setParam = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Vt(e, b, c, d)
					};
					nF.prototype.__destroy__ = function () {
						Wt(this.eB)
					};

					function oF() {
						throw "cannot construct a btConstraintSolver, no constructor in IDL";
					}
					oF.prototype = Object.create(f.prototype);
					oF.prototype.constructor = oF;
					oF.prototype.fB = oF;
					oF.gB = {};
					a.btConstraintSolver = oF;
					oF.prototype.__destroy__ = function () {
						Xt(this.eB)
					};

					function p() {
						throw "cannot construct a btDispatcherInfo, no constructor in IDL";
					}
					p.prototype = Object.create(f.prototype);
					p.prototype.constructor = p;
					p.prototype.fB = p;
					p.gB = {};
					a.btDispatcherInfo = p;
					p.prototype.get_m_timeStep = p.prototype.pE = function () {
						return Yt(this.eB)
					};
					p.prototype.set_m_timeStep = p.prototype.hH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zt(c, b)
					};
					Object.defineProperty(p.prototype, "m_timeStep", {
						get: p.prototype.pE,
						set: p.prototype.hH
					});
					p.prototype.get_m_stepCount = p.prototype.gE = function () {
						return $t(this.eB)
					};
					p.prototype.set_m_stepCount = p.prototype.ZG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						au(c, b)
					};
					Object.defineProperty(p.prototype, "m_stepCount", {
						get: p.prototype.gE,
						set: p.prototype.ZG
					});
					p.prototype.get_m_dispatchFunc = p.prototype.YC = function () {
						return bu(this.eB)
					};
					p.prototype.set_m_dispatchFunc = p.prototype.PF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cu(c, b)
					};
					Object.defineProperty(p.prototype, "m_dispatchFunc", {
						get: p.prototype.YC,
						set: p.prototype.PF
					});
					p.prototype.get_m_timeOfImpact = p.prototype.oE = function () {
						return du(this.eB)
					};
					p.prototype.set_m_timeOfImpact = p.prototype.gH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						eu(c, b)
					};
					Object.defineProperty(p.prototype, "m_timeOfImpact", {
						get: p.prototype.oE,
						set: p.prototype.gH
					});
					p.prototype.get_m_useContinuous = p.prototype.rE = function () {
						return !!fu(this.eB)
					};
					p.prototype.set_m_useContinuous = p.prototype.jH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gu(c, b)
					};
					Object.defineProperty(p.prototype, "m_useContinuous", {
						get: p.prototype.rE,
						set: p.prototype.jH
					});
					p.prototype.get_m_enableSatConvex = p.prototype.cD = function () {
						return !!hu(this.eB)
					};
					p.prototype.set_m_enableSatConvex = p.prototype.UF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						iu(c, b)
					};
					Object.defineProperty(p.prototype, "m_enableSatConvex", {
						get: p.prototype.cD,
						set: p.prototype.UF
					});
					p.prototype.get_m_enableSPU = p.prototype.bD = function () {
						return !!ju(this.eB)
					};
					p.prototype.set_m_enableSPU = p.prototype.TF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ku(c, b)
					};
					Object.defineProperty(p.prototype, "m_enableSPU", {
						get: p.prototype.bD,
						set: p.prototype.TF
					});
					p.prototype.get_m_useEpa = p.prototype.tE = function () {
						return !!lu(this.eB)
					};
					p.prototype.set_m_useEpa = p.prototype.lH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						mu(c, b)
					};
					Object.defineProperty(p.prototype, "m_useEpa", {
						get: p.prototype.tE,
						set: p.prototype.lH
					});
					p.prototype.get_m_allowedCcdPenetration = p.prototype.AC = function () {
						return nu(this.eB)
					};
					p.prototype.set_m_allowedCcdPenetration = p.prototype.rF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ou(c, b)
					};
					Object.defineProperty(p.prototype, "m_allowedCcdPenetration", {
						get: p.prototype.AC,
						set: p.prototype.rF
					});
					p.prototype.get_m_useConvexConservativeDistanceUtil = p.prototype.sE = function () {
						return !!pu(this.eB)
					};
					p.prototype.set_m_useConvexConservativeDistanceUtil = p.prototype.kH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qu(c, b)
					};
					Object.defineProperty(p.prototype, "m_useConvexConservativeDistanceUtil", {
						get: p.prototype.sE,
						set: p.prototype.kH
					});
					p.prototype.get_m_convexConservativeDistanceThreshold = p.prototype.TC = function () {
						return ru(this.eB)
					};
					p.prototype.set_m_convexConservativeDistanceThreshold = p.prototype.KF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						su(c, b)
					};
					Object.defineProperty(p.prototype, "m_convexConservativeDistanceThreshold", {
						get: p.prototype.TC,
						set: p.prototype.KF
					});
					p.prototype.__destroy__ = function () {
						tu(this.eB)
					};

					function t() {
						throw "cannot construct a btContactSolverInfo, no constructor in IDL";
					}
					t.prototype = Object.create(f.prototype);
					t.prototype.constructor = t;
					t.prototype.fB = t;
					t.gB = {};
					a.btContactSolverInfo = t;
					t.prototype.get_m_splitImpulse = t.prototype.dE = function () {
						return !!uu(this.eB)
					};
					t.prototype.set_m_splitImpulse = t.prototype.WG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vu(c, b)
					};
					Object.defineProperty(t.prototype, "m_splitImpulse", {
						get: t.prototype.dE,
						set: t.prototype.WG
					});
					t.prototype.get_m_splitImpulsePenetrationThreshold = t.prototype.eE = function () {
						return wu(this.eB)
					};
					t.prototype.set_m_splitImpulsePenetrationThreshold = t.prototype.XG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xu(c, b)
					};
					Object.defineProperty(t.prototype, "m_splitImpulsePenetrationThreshold", {
						get: t.prototype.eE,
						set: t.prototype.XG
					});
					t.prototype.get_m_numIterations = t.prototype.OD = function () {
						return yu(this.eB)
					};
					t.prototype.set_m_numIterations = t.prototype.FG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						zu(c, b)
					};
					Object.defineProperty(t.prototype, "m_numIterations", {
						get: t.prototype.OD,
						set: t.prototype.FG
					});
					t.prototype.__destroy__ = function () {
						Au(this.eB)
					};

					function M() {
						this.eB = Bu();
						h(M)[this.eB] = this
					}
					M.prototype = Object.create(f.prototype);
					M.prototype.constructor = M;
					M.prototype.fB = M;
					M.gB = {};
					a.btVehicleTuning = M;
					M.prototype.get_m_suspensionStiffness = M.prototype.vB = function () {
						return Cu(this.eB)
					};
					M.prototype.set_m_suspensionStiffness = M.prototype.CB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Du(c, b)
					};
					Object.defineProperty(M.prototype, "m_suspensionStiffness", {
						get: M.prototype.vB,
						set: M.prototype.CB
					});
					M.prototype.get_m_suspensionCompression = M.prototype.hE = function () {
						return Eu(this.eB)
					};
					M.prototype.set_m_suspensionCompression = M.prototype.$G = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fu(c, b)
					};
					Object.defineProperty(M.prototype, "m_suspensionCompression", {
						get: M.prototype.hE,
						set: M.prototype.$G
					});
					M.prototype.get_m_suspensionDamping = M.prototype.iE = function () {
						return Gu(this.eB)
					};
					M.prototype.set_m_suspensionDamping = M.prototype.aH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Hu(c, b)
					};
					Object.defineProperty(M.prototype, "m_suspensionDamping", {
						get: M.prototype.iE,
						set: M.prototype.aH
					});
					M.prototype.get_m_maxSuspensionTravelCm = M.prototype.uB = function () {
						return Iu(this.eB)
					};
					M.prototype.set_m_maxSuspensionTravelCm = M.prototype.BB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ju(c, b)
					};
					Object.defineProperty(M.prototype, "m_maxSuspensionTravelCm", {
						get: M.prototype.uB,
						set: M.prototype.BB
					});
					M.prototype.get_m_frictionSlip = M.prototype.qB = function () {
						return Ku(this.eB)
					};
					M.prototype.set_m_frictionSlip = M.prototype.xB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Lu(c, b)
					};
					Object.defineProperty(M.prototype, "m_frictionSlip", {
						get: M.prototype.qB,
						set: M.prototype.xB
					});
					M.prototype.get_m_maxSuspensionForce = M.prototype.tB = function () {
						return Mu(this.eB)
					};
					M.prototype.set_m_maxSuspensionForce = M.prototype.AB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Nu(c, b)
					};
					Object.defineProperty(M.prototype, "m_maxSuspensionForce", {
						get: M.prototype.tB,
						set: M.prototype.AB
					});

					function pF() {
						throw "cannot construct a btVehicleRaycasterResult, no constructor in IDL";
					}
					pF.prototype = Object.create(f.prototype);
					pF.prototype.constructor = pF;
					pF.prototype.fB = pF;
					pF.gB = {};
					a.btVehicleRaycasterResult = pF;
					pF.prototype.get_m_hitPointInWorld = pF.prototype.oD = function () {
						return k(Ou(this.eB), m)
					};
					pF.prototype.set_m_hitPointInWorld = pF.prototype.fG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Pu(c, b)
					};
					Object.defineProperty(pF.prototype, "m_hitPointInWorld", {
						get: pF.prototype.oD,
						set: pF.prototype.fG
					});
					pF.prototype.get_m_hitNormalInWorld = pF.prototype.mD = function () {
						return k(Qu(this.eB), m)
					};
					pF.prototype.set_m_hitNormalInWorld = pF.prototype.dG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ru(c, b)
					};
					Object.defineProperty(pF.prototype, "m_hitNormalInWorld", {
						get: pF.prototype.mD,
						set: pF.prototype.dG
					});
					pF.prototype.get_m_distFraction = pF.prototype.aD = function () {
						return Su(this.eB)
					};
					pF.prototype.set_m_distFraction = pF.prototype.SF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Tu(c, b)
					};
					Object.defineProperty(pF.prototype, "m_distFraction", {
						get: pF.prototype.aD,
						set: pF.prototype.SF
					});
					pF.prototype.__destroy__ = function () {
						Uu(this.eB)
					};

					function qF(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = Vu(b);
						h(qF)[this.eB] = this
					}
					qF.prototype = Object.create(jE.prototype);
					qF.prototype.constructor = qF;
					qF.prototype.fB = qF;
					qF.gB = {};
					a.btDefaultVehicleRaycaster = qF;
					qF.prototype.castRay = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						Wu(e, b, c, d)
					};
					qF.prototype.__destroy__ = function () {
						Xu(this.eB)
					};

					function N() {
						throw "cannot construct a RaycastInfo, no constructor in IDL";
					}
					N.prototype = Object.create(f.prototype);
					N.prototype.constructor = N;
					N.prototype.fB = N;
					N.gB = {};
					a.RaycastInfo = N;
					N.prototype.get_m_contactNormalWS = N.prototype.RC = function () {
						return k(Yu(this.eB), m)
					};
					N.prototype.set_m_contactNormalWS = N.prototype.IF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zu(c, b)
					};
					Object.defineProperty(N.prototype, "m_contactNormalWS", {
						get: N.prototype.RC,
						set: N.prototype.IF
					});
					N.prototype.get_m_contactPointWS = N.prototype.SC = function () {
						return k($u(this.eB), m)
					};
					N.prototype.set_m_contactPointWS = N.prototype.JF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						av(c, b)
					};
					Object.defineProperty(N.prototype, "m_contactPointWS", {
						get: N.prototype.SC,
						set: N.prototype.JF
					});
					N.prototype.get_m_suspensionLength = N.prototype.jE = function () {
						return bv(this.eB)
					};
					N.prototype.set_m_suspensionLength = N.prototype.bH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cv(c, b)
					};
					Object.defineProperty(N.prototype, "m_suspensionLength", {
						get: N.prototype.jE,
						set: N.prototype.bH
					});
					N.prototype.get_m_hardPointWS = N.prototype.jD = function () {
						return k(dv(this.eB), m)
					};
					N.prototype.set_m_hardPointWS = N.prototype.aG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ev(c, b)
					};
					Object.defineProperty(N.prototype, "m_hardPointWS", {
						get: N.prototype.jD,
						set: N.prototype.aG
					});
					N.prototype.get_m_wheelDirectionWS = N.prototype.yE = function () {
						return k(fv(this.eB), m)
					};
					N.prototype.set_m_wheelDirectionWS = N.prototype.qH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gv(c, b)
					};
					Object.defineProperty(N.prototype, "m_wheelDirectionWS", {
						get: N.prototype.yE,
						set: N.prototype.qH
					});
					N.prototype.get_m_wheelAxleWS = N.prototype.xE = function () {
						return k(hv(this.eB), m)
					};
					N.prototype.set_m_wheelAxleWS = N.prototype.pH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						iv(c, b)
					};
					Object.defineProperty(N.prototype, "m_wheelAxleWS", {
						get: N.prototype.xE,
						set: N.prototype.pH
					});
					N.prototype.get_m_isInContact = N.prototype.uD = function () {
						return !!jv(this.eB)
					};
					N.prototype.set_m_isInContact = N.prototype.lG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						kv(c, b)
					};
					Object.defineProperty(N.prototype, "m_isInContact", {
						get: N.prototype.uD,
						set: N.prototype.lG
					});
					N.prototype.get_m_groundObject = N.prototype.iD = function () {
						return lv(this.eB)
					};
					N.prototype.set_m_groundObject = N.prototype.$F = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						mv(c, b)
					};
					Object.defineProperty(N.prototype, "m_groundObject", {
						get: N.prototype.iD,
						set: N.prototype.$F
					});
					N.prototype.__destroy__ = function () {
						nv(this.eB)
					};

					function O() {
						throw "cannot construct a btWheelInfoConstructionInfo, no constructor in IDL";
					}
					O.prototype = Object.create(f.prototype);
					O.prototype.constructor = O;
					O.prototype.fB = O;
					O.gB = {};
					a.btWheelInfoConstructionInfo = O;
					O.prototype.get_m_chassisConnectionCS = O.prototype.MC = function () {
						return k(ov(this.eB), m)
					};
					O.prototype.set_m_chassisConnectionCS = O.prototype.DF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						pv(c, b)
					};
					Object.defineProperty(O.prototype, "m_chassisConnectionCS", {
						get: O.prototype.MC,
						set: O.prototype.DF
					});
					O.prototype.get_m_wheelDirectionCS = O.prototype.LB = function () {
						return k(qv(this.eB), m)
					};
					O.prototype.set_m_wheelDirectionCS = O.prototype.VB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						rv(c, b)
					};
					Object.defineProperty(O.prototype, "m_wheelDirectionCS", {
						get: O.prototype.LB,
						set: O.prototype.VB
					});
					O.prototype.get_m_wheelAxleCS = O.prototype.KB = function () {
						return k(sv(this.eB), m)
					};
					O.prototype.set_m_wheelAxleCS = O.prototype.UB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						tv(c, b)
					};
					Object.defineProperty(O.prototype, "m_wheelAxleCS", {
						get: O.prototype.KB,
						set: O.prototype.UB
					});
					O.prototype.get_m_suspensionRestLength = O.prototype.lE = function () {
						return uv(this.eB)
					};
					O.prototype.set_m_suspensionRestLength = O.prototype.dH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vv(c, b)
					};
					Object.defineProperty(O.prototype, "m_suspensionRestLength", {
						get: O.prototype.lE,
						set: O.prototype.dH
					});
					O.prototype.get_m_maxSuspensionTravelCm = O.prototype.uB = function () {
						return wv(this.eB)
					};
					O.prototype.set_m_maxSuspensionTravelCm = O.prototype.BB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						xv(c, b)
					};
					Object.defineProperty(O.prototype, "m_maxSuspensionTravelCm", {
						get: O.prototype.uB,
						set: O.prototype.BB
					});
					O.prototype.get_m_wheelRadius = O.prototype.zE = function () {
						return yv(this.eB)
					};
					O.prototype.set_m_wheelRadius = O.prototype.rH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						zv(c, b)
					};
					Object.defineProperty(O.prototype, "m_wheelRadius", {
						get: O.prototype.zE,
						set: O.prototype.rH
					});
					O.prototype.get_m_suspensionStiffness = O.prototype.vB = function () {
						return Av(this.eB)
					};
					O.prototype.set_m_suspensionStiffness = O.prototype.CB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Bv(c, b)
					};
					Object.defineProperty(O.prototype, "m_suspensionStiffness", {
						get: O.prototype.vB,
						set: O.prototype.CB
					});
					O.prototype.get_m_wheelsDampingCompression = O.prototype.MB = function () {
						return Cv(this.eB)
					};
					O.prototype.set_m_wheelsDampingCompression = O.prototype.WB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Dv(c, b)
					};
					Object.defineProperty(O.prototype, "m_wheelsDampingCompression", {
						get: O.prototype.MB,
						set: O.prototype.WB
					});
					O.prototype.get_m_wheelsDampingRelaxation = O.prototype.NB = function () {
						return Ev(this.eB)
					};
					O.prototype.set_m_wheelsDampingRelaxation = O.prototype.XB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Fv(c, b)
					};
					Object.defineProperty(O.prototype, "m_wheelsDampingRelaxation", {
						get: O.prototype.NB,
						set: O.prototype.XB
					});
					O.prototype.get_m_frictionSlip = O.prototype.qB = function () {
						return Gv(this.eB)
					};
					O.prototype.set_m_frictionSlip = O.prototype.xB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Hv(c, b)
					};
					Object.defineProperty(O.prototype, "m_frictionSlip", {
						get: O.prototype.qB,
						set: O.prototype.xB
					});
					O.prototype.get_m_maxSuspensionForce = O.prototype.tB = function () {
						return Iv(this.eB)
					};
					O.prototype.set_m_maxSuspensionForce = O.prototype.AB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Jv(c, b)
					};
					Object.defineProperty(O.prototype, "m_maxSuspensionForce", {
						get: O.prototype.tB,
						set: O.prototype.AB
					});
					O.prototype.get_m_bIsFrontWheel = O.prototype.EB = function () {
						return !!Kv(this.eB)
					};
					O.prototype.set_m_bIsFrontWheel = O.prototype.OB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Lv(c, b)
					};
					Object.defineProperty(O.prototype, "m_bIsFrontWheel", {
						get: O.prototype.EB,
						set: O.prototype.OB
					});
					O.prototype.__destroy__ = function () {
						Mv(this.eB)
					};

					function P(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = Nv(b);
						h(P)[this.eB] = this
					}
					P.prototype = Object.create(f.prototype);
					P.prototype.constructor = P;
					P.prototype.fB = P;
					P.gB = {};
					a.btWheelInfo = P;
					P.prototype.getSuspensionRestLength = function () {
						return Ov(this.eB)
					};
					P.prototype.updateWheel = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Pv(d, b, c)
					};
					P.prototype.get_m_suspensionStiffness = P.prototype.vB = function () {
						return Qv(this.eB)
					};
					P.prototype.set_m_suspensionStiffness = P.prototype.CB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Rv(c, b)
					};
					Object.defineProperty(P.prototype, "m_suspensionStiffness", {
						get: P.prototype.vB,
						set: P.prototype.CB
					});
					P.prototype.get_m_frictionSlip = P.prototype.qB = function () {
						return Sv(this.eB)
					};
					P.prototype.set_m_frictionSlip = P.prototype.xB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Tv(c, b)
					};
					Object.defineProperty(P.prototype, "m_frictionSlip", {
						get: P.prototype.qB,
						set: P.prototype.xB
					});
					P.prototype.get_m_engineForce = P.prototype.dD = function () {
						return Uv(this.eB)
					};
					P.prototype.set_m_engineForce = P.prototype.VF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Vv(c, b)
					};
					Object.defineProperty(P.prototype, "m_engineForce", {
						get: P.prototype.dD,
						set: P.prototype.VF
					});
					P.prototype.get_m_rollInfluence = P.prototype.YD = function () {
						return Wv(this.eB)
					};
					P.prototype.set_m_rollInfluence = P.prototype.PG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Xv(c, b)
					};
					Object.defineProperty(P.prototype, "m_rollInfluence", {
						get: P.prototype.YD,
						set: P.prototype.PG
					});
					P.prototype.get_m_suspensionRestLength1 = P.prototype.mE = function () {
						return Yv(this.eB)
					};
					P.prototype.set_m_suspensionRestLength1 = P.prototype.eH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zv(c, b)
					};
					Object.defineProperty(P.prototype, "m_suspensionRestLength1", {
						get: P.prototype.mE,
						set: P.prototype.eH
					});
					P.prototype.get_m_wheelsRadius = P.prototype.AE = function () {
						return $v(this.eB)
					};
					P.prototype.set_m_wheelsRadius = P.prototype.sH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						aw(c, b)
					};
					Object.defineProperty(P.prototype, "m_wheelsRadius", {
						get: P.prototype.AE,
						set: P.prototype.sH
					});
					P.prototype.get_m_wheelsDampingCompression = P.prototype.MB = function () {
						return bw(this.eB)
					};
					P.prototype.set_m_wheelsDampingCompression = P.prototype.WB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cw(c, b)
					};
					Object.defineProperty(P.prototype, "m_wheelsDampingCompression", {
						get: P.prototype.MB,
						set: P.prototype.WB
					});
					P.prototype.get_m_wheelsDampingRelaxation = P.prototype.NB = function () {
						return dw(this.eB)
					};
					P.prototype.set_m_wheelsDampingRelaxation = P.prototype.XB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ew(c, b)
					};
					Object.defineProperty(P.prototype, "m_wheelsDampingRelaxation", {
						get: P.prototype.NB,
						set: P.prototype.XB
					});
					P.prototype.get_m_steering = P.prototype.fE = function () {
						return fw(this.eB)
					};
					P.prototype.set_m_steering = P.prototype.YG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gw(c, b)
					};
					Object.defineProperty(P.prototype, "m_steering", {
						get: P.prototype.fE,
						set: P.prototype.YG
					});
					P.prototype.get_m_maxSuspensionForce = P.prototype.tB = function () {
						return hw(this.eB)
					};
					P.prototype.set_m_maxSuspensionForce = P.prototype.AB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						iw(c, b)
					};
					Object.defineProperty(P.prototype, "m_maxSuspensionForce", {
						get: P.prototype.tB,
						set: P.prototype.AB
					});
					P.prototype.get_m_maxSuspensionTravelCm = P.prototype.uB = function () {
						return jw(this.eB)
					};
					P.prototype.set_m_maxSuspensionTravelCm = P.prototype.BB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						kw(c, b)
					};
					Object.defineProperty(P.prototype, "m_maxSuspensionTravelCm", {
						get: P.prototype.uB,
						set: P.prototype.BB
					});
					P.prototype.get_m_wheelsSuspensionForce = P.prototype.BE = function () {
						return lw(this.eB)
					};
					P.prototype.set_m_wheelsSuspensionForce = P.prototype.tH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						mw(c, b)
					};
					Object.defineProperty(P.prototype, "m_wheelsSuspensionForce", {
						get: P.prototype.BE,
						set: P.prototype.tH
					});
					P.prototype.get_m_bIsFrontWheel = P.prototype.EB = function () {
						return !!nw(this.eB)
					};
					P.prototype.set_m_bIsFrontWheel = P.prototype.OB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ow(c, b)
					};
					Object.defineProperty(P.prototype, "m_bIsFrontWheel", {
						get: P.prototype.EB,
						set: P.prototype.OB
					});
					P.prototype.get_m_raycastInfo = P.prototype.WD = function () {
						return k(pw(this.eB), N)
					};
					P.prototype.set_m_raycastInfo = P.prototype.NG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qw(c, b)
					};
					Object.defineProperty(P.prototype, "m_raycastInfo", {
						get: P.prototype.WD,
						set: P.prototype.NG
					});
					P.prototype.get_m_chassisConnectionPointCS = P.prototype.NC = function () {
						return k(rw(this.eB), m)
					};
					P.prototype.set_m_chassisConnectionPointCS = P.prototype.EF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sw(c, b)
					};
					Object.defineProperty(P.prototype, "m_chassisConnectionPointCS", {
						get: P.prototype.NC,
						set: P.prototype.EF
					});
					P.prototype.get_m_worldTransform = P.prototype.CE = function () {
						return k(tw(this.eB), r)
					};
					P.prototype.set_m_worldTransform = P.prototype.uH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						uw(c, b)
					};
					Object.defineProperty(P.prototype, "m_worldTransform", {
						get: P.prototype.CE,
						set: P.prototype.uH
					});
					P.prototype.get_m_wheelDirectionCS = P.prototype.LB = function () {
						return k(vw(this.eB), m)
					};
					P.prototype.set_m_wheelDirectionCS = P.prototype.VB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ww(c, b)
					};
					Object.defineProperty(P.prototype, "m_wheelDirectionCS", {
						get: P.prototype.LB,
						set: P.prototype.VB
					});
					P.prototype.get_m_wheelAxleCS = P.prototype.KB = function () {
						return k(xw(this.eB), m)
					};
					P.prototype.set_m_wheelAxleCS = P.prototype.UB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yw(c, b)
					};
					Object.defineProperty(P.prototype, "m_wheelAxleCS", {
						get: P.prototype.KB,
						set: P.prototype.UB
					});
					P.prototype.get_m_rotation = P.prototype.$D = function () {
						return zw(this.eB)
					};
					P.prototype.set_m_rotation = P.prototype.SG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Aw(c, b)
					};
					Object.defineProperty(P.prototype, "m_rotation", {
						get: P.prototype.$D,
						set: P.prototype.SG
					});
					P.prototype.get_m_deltaRotation = P.prototype.XC = function () {
						return Bw(this.eB)
					};
					P.prototype.set_m_deltaRotation = P.prototype.OF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Cw(c, b)
					};
					Object.defineProperty(P.prototype, "m_deltaRotation", {
						get: P.prototype.XC,
						set: P.prototype.OF
					});
					P.prototype.get_m_brake = P.prototype.GC = function () {
						return Dw(this.eB)
					};
					P.prototype.set_m_brake = P.prototype.xF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ew(c, b)
					};
					Object.defineProperty(P.prototype, "m_brake", {
						get: P.prototype.GC,
						set: P.prototype.xF
					});
					P.prototype.get_m_clippedInvContactDotSuspension = P.prototype.OC = function () {
						return Fw(this.eB)
					};
					P.prototype.set_m_clippedInvContactDotSuspension = P.prototype.FF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gw(c, b)
					};
					Object.defineProperty(P.prototype, "m_clippedInvContactDotSuspension", {
						get: P.prototype.OC,
						set: P.prototype.FF
					});
					P.prototype.get_m_suspensionRelativeVelocity = P.prototype.kE = function () {
						return Hw(this.eB)
					};
					P.prototype.set_m_suspensionRelativeVelocity = P.prototype.cH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Iw(c, b)
					};
					Object.defineProperty(P.prototype, "m_suspensionRelativeVelocity", {
						get: P.prototype.kE,
						set: P.prototype.cH
					});
					P.prototype.get_m_skidInfo = P.prototype.cE = function () {
						return Jw(this.eB)
					};
					P.prototype.set_m_skidInfo = P.prototype.VG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kw(c, b)
					};
					Object.defineProperty(P.prototype, "m_skidInfo", {
						get: P.prototype.cE,
						set: P.prototype.VG
					});
					P.prototype.__destroy__ = function () {
						Lw(this.eB)
					};

					function rF(b, c, d, e) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						this.eB = void 0 === e ? Mw(b, c, d) : Nw(b, c, d, e);
						h(rF)[this.eB] = this
					}
					rF.prototype = Object.create(kE.prototype);
					rF.prototype.constructor = rF;
					rF.prototype.fB = rF;
					rF.gB = {};
					a.btKinematicCharacterController = rF;
					rF.prototype.setUpAxis = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ow(c, b)
					};
					rF.prototype.setWalkDirection = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Pw(c, b)
					};
					rF.prototype.setVelocityForTimeInterval = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Qw(d, b, c)
					};
					rF.prototype.warp = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Rw(c, b)
					};
					rF.prototype.preStep = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Sw(c, b)
					};
					rF.prototype.playerStep = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Tw(d, b, c)
					};
					rF.prototype.setFallSpeed = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Uw(c, b)
					};
					rF.prototype.setJumpSpeed = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Vw(c, b)
					};
					rF.prototype.setMaxJumpHeight = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ww(c, b)
					};
					rF.prototype.canJump = function () {
						return !!Xw(this.eB)
					};
					rF.prototype.jump = function () {
						Yw(this.eB)
					};
					rF.prototype.setGravity = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zw(c, b)
					};
					rF.prototype.getGravity = function () {
						return $w(this.eB)
					};
					rF.prototype.setMaxSlope = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ax(c, b)
					};
					rF.prototype.getMaxSlope = function () {
						return bx(this.eB)
					};
					rF.prototype.getGhostObject = function () {
						return k(cx(this.eB), Q)
					};
					rF.prototype.setUseGhostSweepTest = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						dx(c, b)
					};
					rF.prototype.onGround = function () {
						return !!ex(this.eB)
					};
					rF.prototype.setUpInterpolate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						fx(c, b)
					};
					rF.prototype.updateAction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						gx(d, b, c)
					};
					rF.prototype.__destroy__ = function () {
						hx(this.eB)
					};

					function R(b, c, d) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						this.eB = ix(b, c, d);
						h(R)[this.eB] = this
					}
					R.prototype = Object.create(kE.prototype);
					R.prototype.constructor = R;
					R.prototype.fB = R;
					R.gB = {};
					a.btRaycastVehicle = R;
					R.prototype.applyEngineForce = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						jx(d, b, c)
					};
					R.prototype.setSteeringValue = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						kx(d, b, c)
					};
					R.prototype.getWheelTransformWS = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(lx(c, b), r)
					};
					R.prototype.updateWheelTransform = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						mx(d, b, c)
					};
					R.prototype.addWheel = function (b, c, d, e, g, n, D) {
						var T = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						n && "object" === typeof n && (n = n.eB);
						D && "object" === typeof D && (D = D.eB);
						return k(nx(T, b, c, d, e, g, n, D), P)
					};
					R.prototype.getNumWheels = function () {
						return ox(this.eB)
					};
					R.prototype.getRigidBody = function () {
						return k(px(this.eB), K)
					};
					R.prototype.getWheelInfo = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(qx(c, b), P)
					};
					R.prototype.setBrake = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						rx(d, b, c)
					};
					R.prototype.setCoordinateSystem = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						sx(e, b, c, d)
					};
					R.prototype.getCurrentSpeedKmHour = function () {
						return tx(this.eB)
					};
					R.prototype.getChassisWorldTransform = function () {
						return k(ux(this.eB), r)
					};
					R.prototype.rayCast = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return vx(c, b)
					};
					R.prototype.updateVehicle = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wx(c, b)
					};
					R.prototype.resetSuspension = function () {
						xx(this.eB)
					};
					R.prototype.getSteeringValue = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return yx(c, b)
					};
					R.prototype.updateWheelTransformsWS = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						void 0 === c ? zx(d, b) : Ax(d, b, c)
					};
					R.prototype.setPitchControl = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Bx(c, b)
					};
					R.prototype.updateSuspension = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Cx(c, b)
					};
					R.prototype.updateFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Dx(c, b)
					};
					R.prototype.getRightAxis = function () {
						return Ex(this.eB)
					};
					R.prototype.getUpAxis = function () {
						return Fx(this.eB)
					};
					R.prototype.getForwardAxis = function () {
						return Gx(this.eB)
					};
					R.prototype.getForwardVector = function () {
						return k(Hx(this.eB), m)
					};
					R.prototype.getUserConstraintType = function () {
						return Ix(this.eB)
					};
					R.prototype.setUserConstraintType = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Jx(c, b)
					};
					R.prototype.setUserConstraintId = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kx(c, b)
					};
					R.prototype.getUserConstraintId = function () {
						return Lx(this.eB)
					};
					R.prototype.updateAction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Mx(d, b, c)
					};
					R.prototype.__destroy__ = function () {
						Nx(this.eB)
					};

					function Q() {
						this.eB = Ox();
						h(Q)[this.eB] = this
					}
					Q.prototype = Object.create(y.prototype);
					Q.prototype.constructor = Q;
					Q.prototype.fB = Q;
					Q.gB = {};
					a.btPairCachingGhostObject = Q;
					Q.prototype.setAnisotropicFriction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Px(d, b, c)
					};
					Q.prototype.getCollisionShape = function () {
						return k(Qx(this.eB), l)
					};
					Q.prototype.setContactProcessingThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Rx(c, b)
					};
					Q.prototype.setActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Sx(c, b)
					};
					Q.prototype.forceActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Tx(c, b)
					};
					Q.prototype.activate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						void 0 === b ? Ux(c) : Vx(c, b)
					};
					Q.prototype.isActive = function () {
						return !!Wx(this.eB)
					};
					Q.prototype.isKinematicObject = function () {
						return !!Xx(this.eB)
					};
					Q.prototype.isStaticObject = function () {
						return !!Yx(this.eB)
					};
					Q.prototype.isStaticOrKinematicObject = function () {
						return !!Zx(this.eB)
					};
					Q.prototype.getRestitution = function () {
						return $x(this.eB)
					};
					Q.prototype.getFriction = function () {
						return ay(this.eB)
					};
					Q.prototype.getRollingFriction = function () {
						return by(this.eB)
					};
					Q.prototype.setRestitution = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cy(c, b)
					};
					Q.prototype.setFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						dy(c, b)
					};
					Q.prototype.setRollingFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ey(c, b)
					};
					Q.prototype.getWorldTransform = function () {
						return k(fy(this.eB), r)
					};
					Q.prototype.getCollisionFlags = function () {
						return gy(this.eB)
					};
					Q.prototype.setCollisionFlags = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						hy(c, b)
					};
					Q.prototype.setWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						iy(c, b)
					};
					Q.prototype.setCollisionShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jy(c, b)
					};
					Q.prototype.setCcdMotionThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ky(c, b)
					};
					Q.prototype.setCcdSweptSphereRadius = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ly(c, b)
					};
					Q.prototype.getUserIndex = function () {
						return my(this.eB)
					};
					Q.prototype.setUserIndex = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ny(c, b)
					};
					Q.prototype.getUserPointer = function () {
						return k(oy(this.eB), QD)
					};
					Q.prototype.setUserPointer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						py(c, b)
					};
					Q.prototype.getBroadphaseHandle = function () {
						return k(qy(this.eB), RD)
					};
					Q.prototype.getNumOverlappingObjects = function () {
						return ry(this.eB)
					};
					Q.prototype.getOverlappingObject = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(sy(c, b), q)
					};
					Q.prototype.__destroy__ = function () {
						ty(this.eB)
					};

					function sF() {
						this.eB = uy();
						h(sF)[this.eB] = this
					}
					sF.prototype = Object.create(f.prototype);
					sF.prototype.constructor = sF;
					sF.prototype.fB = sF;
					sF.gB = {};
					a.btGhostPairCallback = sF;
					sF.prototype.__destroy__ = function () {
						vy(this.eB)
					};

					function S() {
						this.eB = wy();
						h(S)[this.eB] = this
					}
					S.prototype = Object.create(f.prototype);
					S.prototype.constructor = S;
					S.prototype.fB = S;
					S.gB = {};
					a.btSoftBodyWorldInfo = S;
					S.prototype.get_air_density = S.prototype.YB = function () {
						return xy(this.eB)
					};
					S.prototype.set_air_density = S.prototype.PE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yy(c, b)
					};
					Object.defineProperty(S.prototype, "air_density", {
						get: S.prototype.YB,
						set: S.prototype.PE
					});
					S.prototype.get_water_density = S.prototype.ME = function () {
						return zy(this.eB)
					};
					S.prototype.set_water_density = S.prototype.EH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ay(c, b)
					};
					Object.defineProperty(S.prototype, "water_density", {
						get: S.prototype.ME,
						set: S.prototype.EH
					});
					S.prototype.get_water_offset = S.prototype.OE = function () {
						return By(this.eB)
					};
					S.prototype.set_water_offset = S.prototype.GH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Cy(c, b)
					};
					Object.defineProperty(S.prototype, "water_offset", {
						get: S.prototype.OE,
						set: S.prototype.GH
					});
					S.prototype.get_m_maxDisplacement = S.prototype.ID = function () {
						return Dy(this.eB)
					};
					S.prototype.set_m_maxDisplacement = S.prototype.zG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ey(c, b)
					};
					Object.defineProperty(S.prototype, "m_maxDisplacement", {
						get: S.prototype.ID,
						set: S.prototype.zG
					});
					S.prototype.get_water_normal = S.prototype.NE = function () {
						return k(Fy(this.eB), m)
					};
					S.prototype.set_water_normal = S.prototype.FH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gy(c, b)
					};
					Object.defineProperty(S.prototype, "water_normal", {
						get: S.prototype.NE,
						set: S.prototype.FH
					});
					S.prototype.get_m_broadphase = S.prototype.HC = function () {
						return k(Hy(this.eB), OD)
					};
					S.prototype.set_m_broadphase = S.prototype.yF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Iy(c, b)
					};
					Object.defineProperty(S.prototype, "m_broadphase", {
						get: S.prototype.HC,
						set: S.prototype.yF
					});
					S.prototype.get_m_dispatcher = S.prototype.ZC = function () {
						return k(Jy(this.eB), MD)
					};
					S.prototype.set_m_dispatcher = S.prototype.QF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ky(c, b)
					};
					Object.defineProperty(S.prototype, "m_dispatcher", {
						get: S.prototype.ZC,
						set: S.prototype.QF
					});
					S.prototype.get_m_gravity = S.prototype.hD = function () {
						return k(Ly(this.eB), m)
					};
					S.prototype.set_m_gravity = S.prototype.ZF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						My(c, b)
					};
					Object.defineProperty(S.prototype, "m_gravity", {
						get: S.prototype.hD,
						set: S.prototype.ZF
					});
					S.prototype.__destroy__ = function () {
						Ny(this.eB)
					};

					function U() {
						throw "cannot construct a Face, no constructor in IDL";
					}
					U.prototype = Object.create(f.prototype);
					U.prototype.constructor = U;
					U.prototype.fB = U;
					U.gB = {};
					a.Face = U;
					U.prototype.get_m_n = U.prototype.HB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Oy(c, b), Node)
					};
					U.prototype.set_m_n = U.prototype.RB = function (b, c) {
						var d = this.eB;
						GD();
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						Py(d, b, c)
					};
					Object.defineProperty(U.prototype, "m_n", {
						get: U.prototype.HB,
						set: U.prototype.RB
					});
					U.prototype.get_m_normal = U.prototype.MD = function () {
						return k(Qy(this.eB), m)
					};
					U.prototype.set_m_normal = U.prototype.DG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ry(c, b)
					};
					Object.defineProperty(U.prototype, "m_normal", {
						get: U.prototype.MD,
						set: U.prototype.DG
					});
					U.prototype.get_m_ra = U.prototype.VD = function () {
						return Sy(this.eB)
					};
					U.prototype.set_m_ra = U.prototype.MG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ty(c, b)
					};
					Object.defineProperty(U.prototype, "m_ra", {
						get: U.prototype.VD,
						set: U.prototype.MG
					});
					U.prototype.__destroy__ = function () {
						Uy(this.eB)
					};

					function tF() {
						throw "cannot construct a tFaceArray, no constructor in IDL";
					}
					tF.prototype = Object.create(f.prototype);
					tF.prototype.constructor = tF;
					tF.prototype.fB = tF;
					tF.gB = {};
					a.tFaceArray = tF;
					tF.prototype.size = tF.prototype.size = function () {
						return Vy(this.eB)
					};
					tF.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Wy(c, b), U)
					};
					tF.prototype.__destroy__ = function () {
						Xy(this.eB)
					};

					function Node() {
						throw "cannot construct a Node, no constructor in IDL";
					}
					Node.prototype = Object.create(f.prototype);
					Node.prototype.constructor = Node;
					Node.prototype.fB = Node;
					Node.gB = {};
					a.Node = Node;
					Node.prototype.get_m_x = Node.prototype.DE = function () {
						return k(Yy(this.eB), m)
					};
					Node.prototype.set_m_x = Node.prototype.vH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zy(c, b)
					};
					Object.defineProperty(Node.prototype, "m_x", {
						get: Node.prototype.DE,
						set: Node.prototype.vH
					});
					Node.prototype.get_m_q = Node.prototype.UD = function () {
						return k($y(this.eB), m)
					};
					Node.prototype.set_m_q = Node.prototype.LG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						az(c, b)
					};
					Object.defineProperty(Node.prototype, "m_q", {
						get: Node.prototype.UD,
						set: Node.prototype.LG
					});
					Node.prototype.get_m_v = Node.prototype.vE = function () {
						return k(bz(this.eB), m)
					};
					Node.prototype.set_m_v = Node.prototype.nH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cz(c, b)
					};
					Object.defineProperty(Node.prototype, "m_v", {
						get: Node.prototype.vE,
						set: Node.prototype.nH
					});
					Node.prototype.get_m_f = Node.prototype.eD = function () {
						return k(dz(this.eB), m)
					};
					Node.prototype.set_m_f = Node.prototype.WF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						ez(c, b)
					};
					Object.defineProperty(Node.prototype, "m_f", {
						get: Node.prototype.eD,
						set: Node.prototype.WF
					});
					Node.prototype.get_m_n = Node.prototype.HB = function () {
						return k(fz(this.eB), m)
					};
					Node.prototype.set_m_n = Node.prototype.RB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gz(c, b)
					};
					Object.defineProperty(Node.prototype, "m_n", {
						get: Node.prototype.HB,
						set: Node.prototype.RB
					});
					Node.prototype.get_m_im = Node.prototype.qD = function () {
						return hz(this.eB)
					};
					Node.prototype.set_m_im = Node.prototype.hG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						iz(c, b)
					};
					Object.defineProperty(Node.prototype, "m_im", {
						get: Node.prototype.qD,
						set: Node.prototype.hG
					});
					Node.prototype.get_m_area = Node.prototype.EC = function () {
						return jz(this.eB)
					};
					Node.prototype.set_m_area = Node.prototype.vF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						kz(c, b)
					};
					Object.defineProperty(Node.prototype, "m_area", {
						get: Node.prototype.EC,
						set: Node.prototype.vF
					});
					Node.prototype.__destroy__ = function () {
						lz(this.eB)
					};

					function uF() {
						throw "cannot construct a tNodeArray, no constructor in IDL";
					}
					uF.prototype = Object.create(f.prototype);
					uF.prototype.constructor = uF;
					uF.prototype.fB = uF;
					uF.gB = {};
					a.tNodeArray = uF;
					uF.prototype.size = uF.prototype.size = function () {
						return mz(this.eB)
					};
					uF.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(nz(c, b), Node)
					};
					uF.prototype.__destroy__ = function () {
						oz(this.eB)
					};

					function V() {
						throw "cannot construct a Material, no constructor in IDL";
					}
					V.prototype = Object.create(f.prototype);
					V.prototype.constructor = V;
					V.prototype.fB = V;
					V.gB = {};
					a.Material = V;
					V.prototype.get_m_kLST = V.prototype.wD = function () {
						return pz(this.eB)
					};
					V.prototype.set_m_kLST = V.prototype.nG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qz(c, b)
					};
					Object.defineProperty(V.prototype, "m_kLST", {
						get: V.prototype.wD,
						set: V.prototype.nG
					});
					V.prototype.get_m_kAST = V.prototype.vD = function () {
						return rz(this.eB)
					};
					V.prototype.set_m_kAST = V.prototype.mG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sz(c, b)
					};
					Object.defineProperty(V.prototype, "m_kAST", {
						get: V.prototype.vD,
						set: V.prototype.mG
					});
					V.prototype.get_m_kVST = V.prototype.xD = function () {
						return tz(this.eB)
					};
					V.prototype.set_m_kVST = V.prototype.oG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						uz(c, b)
					};
					Object.defineProperty(V.prototype, "m_kVST", {
						get: V.prototype.xD,
						set: V.prototype.oG
					});
					V.prototype.get_m_flags = V.prototype.nB = function () {
						return vz(this.eB)
					};
					V.prototype.set_m_flags = V.prototype.oB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wz(c, b)
					};
					Object.defineProperty(V.prototype, "m_flags", {
						get: V.prototype.nB,
						set: V.prototype.oB
					});
					V.prototype.__destroy__ = function () {
						xz(this.eB)
					};

					function vF() {
						throw "cannot construct a tMaterialArray, no constructor in IDL";
					}
					vF.prototype = Object.create(f.prototype);
					vF.prototype.constructor = vF;
					vF.prototype.fB = vF;
					vF.gB = {};
					a.tMaterialArray = vF;
					vF.prototype.size = vF.prototype.size = function () {
						return yz(this.eB)
					};
					vF.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(zz(c, b), V)
					};
					vF.prototype.__destroy__ = function () {
						Az(this.eB)
					};

					function W() {
						throw "cannot construct a Anchor, no constructor in IDL";
					}
					W.prototype = Object.create(f.prototype);
					W.prototype.constructor = W;
					W.prototype.fB = W;
					W.gB = {};
					a.Anchor = W;
					W.prototype.get_m_node = W.prototype.KD = function () {
						return k(Bz(this.eB), Node)
					};
					W.prototype.set_m_node = W.prototype.BG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Cz(c, b)
					};
					Object.defineProperty(W.prototype, "m_node", {
						get: W.prototype.KD,
						set: W.prototype.BG
					});
					W.prototype.get_m_local = W.prototype.AD = function () {
						return k(Dz(this.eB), m)
					};
					W.prototype.set_m_local = W.prototype.rG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Ez(c, b)
					};
					Object.defineProperty(W.prototype, "m_local", {
						get: W.prototype.AD,
						set: W.prototype.rG
					});
					W.prototype.get_m_body = W.prototype.FC = function () {
						return k(Fz(this.eB), K)
					};
					W.prototype.set_m_body = W.prototype.wF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Gz(c, b)
					};
					Object.defineProperty(W.prototype, "m_body", {
						get: W.prototype.FC,
						set: W.prototype.wF
					});
					W.prototype.get_m_influence = W.prototype.tD = function () {
						return Hz(this.eB)
					};
					W.prototype.set_m_influence = W.prototype.kG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Iz(c, b)
					};
					Object.defineProperty(W.prototype, "m_influence", {
						get: W.prototype.tD,
						set: W.prototype.kG
					});
					W.prototype.get_m_c0 = W.prototype.IC = function () {
						return k(Jz(this.eB), nE)
					};
					W.prototype.set_m_c0 = W.prototype.zF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Kz(c, b)
					};
					Object.defineProperty(W.prototype, "m_c0", {
						get: W.prototype.IC,
						set: W.prototype.zF
					});
					W.prototype.get_m_c1 = W.prototype.JC = function () {
						return k(Lz(this.eB), m)
					};
					W.prototype.set_m_c1 = W.prototype.AF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Mz(c, b)
					};
					Object.defineProperty(W.prototype, "m_c1", {
						get: W.prototype.JC,
						set: W.prototype.AF
					});
					W.prototype.get_m_c2 = W.prototype.KC = function () {
						return Nz(this.eB)
					};
					W.prototype.set_m_c2 = W.prototype.BF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Oz(c, b)
					};
					Object.defineProperty(W.prototype, "m_c2", {
						get: W.prototype.KC,
						set: W.prototype.BF
					});
					W.prototype.__destroy__ = function () {
						Pz(this.eB)
					};

					function wF() {
						throw "cannot construct a tAnchorArray, no constructor in IDL";
					}
					wF.prototype = Object.create(f.prototype);
					wF.prototype.constructor = wF;
					wF.prototype.fB = wF;
					wF.gB = {};
					a.tAnchorArray = wF;
					wF.prototype.size = wF.prototype.size = function () {
						return Qz(this.eB)
					};
					wF.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(Rz(c, b), W)
					};
					wF.prototype.clear = wF.prototype.clear = function () {
						Sz(this.eB)
					};
					wF.prototype.push_back = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Tz(c, b)
					};
					wF.prototype.pop_back = function () {
						Uz(this.eB)
					};
					wF.prototype.__destroy__ = function () {
						Vz(this.eB)
					};

					function X() {
						throw "cannot construct a Config, no constructor in IDL";
					}
					X.prototype = Object.create(f.prototype);
					X.prototype.constructor = X;
					X.prototype.fB = X;
					X.gB = {};
					a.Config = X;
					X.prototype.get_kVCF = X.prototype.uC = function () {
						return Wz(this.eB)
					};
					X.prototype.set_kVCF = X.prototype.lF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Xz(c, b)
					};
					Object.defineProperty(X.prototype, "kVCF", {
						get: X.prototype.uC,
						set: X.prototype.lF
					});
					X.prototype.get_kDP = X.prototype.hC = function () {
						return Yz(this.eB)
					};
					X.prototype.set_kDP = X.prototype.ZE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						Zz(c, b)
					};
					Object.defineProperty(X.prototype, "kDP", {
						get: X.prototype.hC,
						set: X.prototype.ZE
					});
					X.prototype.get_kDG = X.prototype.gC = function () {
						return $z(this.eB)
					};
					X.prototype.set_kDG = X.prototype.YE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						aA(c, b)
					};
					Object.defineProperty(X.prototype, "kDG", {
						get: X.prototype.gC,
						set: X.prototype.YE
					});
					X.prototype.get_kLF = X.prototype.jC = function () {
						return bA(this.eB)
					};
					X.prototype.set_kLF = X.prototype.aF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						cA(c, b)
					};
					Object.defineProperty(X.prototype, "kLF", {
						get: X.prototype.jC,
						set: X.prototype.aF
					});
					X.prototype.get_kPR = X.prototype.lC = function () {
						return dA(this.eB)
					};
					X.prototype.set_kPR = X.prototype.cF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						eA(c, b)
					};
					Object.defineProperty(X.prototype, "kPR", {
						get: X.prototype.lC,
						set: X.prototype.cF
					});
					X.prototype.get_kVC = X.prototype.tC = function () {
						return fA(this.eB)
					};
					X.prototype.set_kVC = X.prototype.kF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						gA(c, b)
					};
					Object.defineProperty(X.prototype, "kVC", {
						get: X.prototype.tC,
						set: X.prototype.kF
					});
					X.prototype.get_kDF = X.prototype.fC = function () {
						return hA(this.eB)
					};
					X.prototype.set_kDF = X.prototype.XE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						iA(c, b)
					};
					Object.defineProperty(X.prototype, "kDF", {
						get: X.prototype.fC,
						set: X.prototype.XE
					});
					X.prototype.get_kMT = X.prototype.kC = function () {
						return jA(this.eB)
					};
					X.prototype.set_kMT = X.prototype.bF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						kA(c, b)
					};
					Object.defineProperty(X.prototype, "kMT", {
						get: X.prototype.kC,
						set: X.prototype.bF
					});
					X.prototype.get_kCHR = X.prototype.eC = function () {
						return lA(this.eB)
					};
					X.prototype.set_kCHR = X.prototype.WE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						mA(c, b)
					};
					Object.defineProperty(X.prototype, "kCHR", {
						get: X.prototype.eC,
						set: X.prototype.WE
					});
					X.prototype.get_kKHR = X.prototype.iC = function () {
						return nA(this.eB)
					};
					X.prototype.set_kKHR = X.prototype.$E = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						oA(c, b)
					};
					Object.defineProperty(X.prototype, "kKHR", {
						get: X.prototype.iC,
						set: X.prototype.$E
					});
					X.prototype.get_kSHR = X.prototype.mC = function () {
						return pA(this.eB)
					};
					X.prototype.set_kSHR = X.prototype.dF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qA(c, b)
					};
					Object.defineProperty(X.prototype, "kSHR", {
						get: X.prototype.mC,
						set: X.prototype.dF
					});
					X.prototype.get_kAHR = X.prototype.dC = function () {
						return rA(this.eB)
					};
					X.prototype.set_kAHR = X.prototype.VE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						sA(c, b)
					};
					Object.defineProperty(X.prototype, "kAHR", {
						get: X.prototype.dC,
						set: X.prototype.VE
					});
					X.prototype.get_kSRHR_CL = X.prototype.pC = function () {
						return tA(this.eB)
					};
					X.prototype.set_kSRHR_CL = X.prototype.gF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						uA(c, b)
					};
					Object.defineProperty(X.prototype, "kSRHR_CL", {
						get: X.prototype.pC,
						set: X.prototype.gF
					});
					X.prototype.get_kSKHR_CL = X.prototype.nC = function () {
						return vA(this.eB)
					};
					X.prototype.set_kSKHR_CL = X.prototype.eF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wA(c, b)
					};
					Object.defineProperty(X.prototype, "kSKHR_CL", {
						get: X.prototype.nC,
						set: X.prototype.eF
					});
					X.prototype.get_kSSHR_CL = X.prototype.rC = function () {
						return xA(this.eB)
					};
					X.prototype.set_kSSHR_CL = X.prototype.iF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						yA(c, b)
					};
					Object.defineProperty(X.prototype, "kSSHR_CL", {
						get: X.prototype.rC,
						set: X.prototype.iF
					});
					X.prototype.get_kSR_SPLT_CL = X.prototype.qC = function () {
						return zA(this.eB)
					};
					X.prototype.set_kSR_SPLT_CL = X.prototype.hF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						AA(c, b)
					};
					Object.defineProperty(X.prototype, "kSR_SPLT_CL", {
						get: X.prototype.qC,
						set: X.prototype.hF
					});
					X.prototype.get_kSK_SPLT_CL = X.prototype.oC = function () {
						return BA(this.eB)
					};
					X.prototype.set_kSK_SPLT_CL = X.prototype.fF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						CA(c, b)
					};
					Object.defineProperty(X.prototype, "kSK_SPLT_CL", {
						get: X.prototype.oC,
						set: X.prototype.fF
					});
					X.prototype.get_kSS_SPLT_CL = X.prototype.sC = function () {
						return DA(this.eB)
					};
					X.prototype.set_kSS_SPLT_CL = X.prototype.jF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						EA(c, b)
					};
					Object.defineProperty(X.prototype, "kSS_SPLT_CL", {
						get: X.prototype.sC,
						set: X.prototype.jF
					});
					X.prototype.get_maxvolume = X.prototype.EE = function () {
						return FA(this.eB)
					};
					X.prototype.set_maxvolume = X.prototype.wH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						GA(c, b)
					};
					Object.defineProperty(X.prototype, "maxvolume", {
						get: X.prototype.EE,
						set: X.prototype.wH
					});
					X.prototype.get_timescale = X.prototype.JE = function () {
						return HA(this.eB)
					};
					X.prototype.set_timescale = X.prototype.BH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						IA(c, b)
					};
					Object.defineProperty(X.prototype, "timescale", {
						get: X.prototype.JE,
						set: X.prototype.BH
					});
					X.prototype.get_viterations = X.prototype.LE = function () {
						return JA(this.eB)
					};
					X.prototype.set_viterations = X.prototype.DH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						KA(c, b)
					};
					Object.defineProperty(X.prototype, "viterations", {
						get: X.prototype.LE,
						set: X.prototype.DH
					});
					X.prototype.get_piterations = X.prototype.HE = function () {
						return LA(this.eB)
					};
					X.prototype.set_piterations = X.prototype.zH = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						MA(c, b)
					};
					Object.defineProperty(X.prototype, "piterations", {
						get: X.prototype.HE,
						set: X.prototype.zH
					});
					X.prototype.get_diterations = X.prototype.aC = function () {
						return NA(this.eB)
					};
					X.prototype.set_diterations = X.prototype.SE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						OA(c, b)
					};
					Object.defineProperty(X.prototype, "diterations", {
						get: X.prototype.aC,
						set: X.prototype.SE
					});
					X.prototype.get_citerations = X.prototype.ZB = function () {
						return PA(this.eB)
					};
					X.prototype.set_citerations = X.prototype.QE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						QA(c, b)
					};
					Object.defineProperty(X.prototype, "citerations", {
						get: X.prototype.ZB,
						set: X.prototype.QE
					});
					X.prototype.get_collisions = X.prototype.$B = function () {
						return RA(this.eB)
					};
					X.prototype.set_collisions = X.prototype.RE = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						SA(c, b)
					};
					Object.defineProperty(X.prototype, "collisions", {
						get: X.prototype.$B,
						set: X.prototype.RE
					});
					X.prototype.__destroy__ = function () {
						TA(this.eB)
					};

					function Y(b, c, d, e) {
						GD();
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						"object" == typeof e && (e = KD(e));
						this.eB = UA(b, c, d, e);
						h(Y)[this.eB] = this
					}
					Y.prototype = Object.create(q.prototype);
					Y.prototype.constructor = Y;
					Y.prototype.fB = Y;
					Y.gB = {};
					a.btSoftBody = Y;
					Y.prototype.checkLink = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return !!VA(d, b, c)
					};
					Y.prototype.checkFace = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						return !!WA(e, b, c, d)
					};
					Y.prototype.appendMaterial = function () {
						return k(XA(this.eB), V)
					};
					Y.prototype.appendNode = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						YA(d, b, c)
					};
					Y.prototype.appendLink = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						ZA(g, b, c, d, e)
					};
					Y.prototype.appendFace = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						$A(g, b, c, d, e)
					};
					Y.prototype.appendTetra = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						aB(n, b, c, d, e, g)
					};
					Y.prototype.appendAnchor = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						bB(g, b, c, d, e)
					};
					Y.prototype.addForce = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						void 0 === c ? cB(d, b) : dB(d, b, c)
					};
					Y.prototype.addAeroForceToNode = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						eB(d, b, c)
					};
					Y.prototype.getTotalMass = function () {
						return fB(this.eB)
					};
					Y.prototype.setTotalMass = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						gB(d, b, c)
					};
					Y.prototype.setMass = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						hB(d, b, c)
					};
					Y.prototype.transform = Y.prototype.transform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						iB(c, b)
					};
					Y.prototype.translate = Y.prototype.translate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						jB(c, b)
					};
					Y.prototype.rotate = Y.prototype.rotate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						kB(c, b)
					};
					Y.prototype.scale = Y.prototype.scale = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						lB(c, b)
					};
					Y.prototype.generateClusters = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return void 0 === c ? mB(d, b) : nB(d, b, c)
					};
					Y.prototype.generateBendingConstraints = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						return oB(d, b, c)
					};
					Y.prototype.upcast = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(pB(c, b), Y)
					};
					Y.prototype.getRestLengthScale = function () {
						return qB(this.eB)
					};
					Y.prototype.setRestLengthScale = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						rB(c, b)
					};
					Y.prototype.setAnisotropicFriction = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						sB(d, b, c)
					};
					Y.prototype.getCollisionShape = function () {
						return k(tB(this.eB), l)
					};
					Y.prototype.setContactProcessingThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						uB(c, b)
					};
					Y.prototype.setActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						vB(c, b)
					};
					Y.prototype.forceActivationState = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						wB(c, b)
					};
					Y.prototype.activate = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						void 0 === b ? xB(c) : yB(c, b)
					};
					Y.prototype.isActive = function () {
						return !!zB(this.eB)
					};
					Y.prototype.isKinematicObject = function () {
						return !!AB(this.eB)
					};
					Y.prototype.isStaticObject = function () {
						return !!BB(this.eB)
					};
					Y.prototype.isStaticOrKinematicObject = function () {
						return !!CB(this.eB)
					};
					Y.prototype.getRestitution = function () {
						return DB(this.eB)
					};
					Y.prototype.getFriction = function () {
						return EB(this.eB)
					};
					Y.prototype.getRollingFriction = function () {
						return FB(this.eB)
					};
					Y.prototype.setRestitution = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						GB(c, b)
					};
					Y.prototype.setFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						HB(c, b)
					};
					Y.prototype.setRollingFriction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						IB(c, b)
					};
					Y.prototype.getWorldTransform = function () {
						return k(JB(this.eB), r)
					};
					Y.prototype.getCollisionFlags = function () {
						return KB(this.eB)
					};
					Y.prototype.setCollisionFlags = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						LB(c, b)
					};
					Y.prototype.setWorldTransform = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						MB(c, b)
					};
					Y.prototype.setCollisionShape = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						NB(c, b)
					};
					Y.prototype.setCcdMotionThreshold = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						OB(c, b)
					};
					Y.prototype.setCcdSweptSphereRadius = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						PB(c, b)
					};
					Y.prototype.getUserIndex = function () {
						return QB(this.eB)
					};
					Y.prototype.setUserIndex = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						RB(c, b)
					};
					Y.prototype.getUserPointer = function () {
						return k(SB(this.eB), QD)
					};
					Y.prototype.setUserPointer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						TB(c, b)
					};
					Y.prototype.getBroadphaseHandle = function () {
						return k(UB(this.eB), RD)
					};
					Y.prototype.get_m_cfg = Y.prototype.LC = function () {
						return k(VB(this.eB), X)
					};
					Y.prototype.set_m_cfg = Y.prototype.CF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						WB(c, b)
					};
					Object.defineProperty(Y.prototype, "m_cfg", {
						get: Y.prototype.LC,
						set: Y.prototype.CF
					});
					Y.prototype.get_m_nodes = Y.prototype.LD = function () {
						return k(XB(this.eB), uF)
					};
					Y.prototype.set_m_nodes = Y.prototype.CG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						YB(c, b)
					};
					Object.defineProperty(Y.prototype, "m_nodes", {
						get: Y.prototype.LD,
						set: Y.prototype.CG
					});
					Y.prototype.get_m_faces = Y.prototype.FB = function () {
						return k(ZB(this.eB), tF)
					};
					Y.prototype.set_m_faces = Y.prototype.PB = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						$B(c, b)
					};
					Object.defineProperty(Y.prototype, "m_faces", {
						get: Y.prototype.FB,
						set: Y.prototype.PB
					});
					Y.prototype.get_m_materials = Y.prototype.HD = function () {
						return k(aC(this.eB), vF)
					};
					Y.prototype.set_m_materials = Y.prototype.yG = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						bC(c, b)
					};
					Object.defineProperty(Y.prototype, "m_materials", {
						get: Y.prototype.HD,
						set: Y.prototype.yG
					});
					Y.prototype.get_m_anchors = Y.prototype.BC = function () {
						return k(cC(this.eB), wF)
					};
					Y.prototype.set_m_anchors = Y.prototype.sF = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						dC(c, b)
					};
					Object.defineProperty(Y.prototype, "m_anchors", {
						get: Y.prototype.BC,
						set: Y.prototype.sF
					});
					Y.prototype.__destroy__ = function () {
						eC(this.eB)
					};

					function xF(b) {
						b && "object" === typeof b && (b = b.eB);
						this.eB = void 0 === b ? fC() : gC(b);
						h(xF)[this.eB] = this
					}
					xF.prototype = Object.create(gE.prototype);
					xF.prototype.constructor = xF;
					xF.prototype.fB = xF;
					xF.gB = {};
					a.btSoftBodyRigidBodyCollisionConfiguration = xF;
					xF.prototype.__destroy__ = function () {
						hC(this.eB)
					};

					function yF() {
						this.eB = iC();
						h(yF)[this.eB] = this
					}
					yF.prototype = Object.create(lE.prototype);
					yF.prototype.constructor = yF;
					yF.prototype.fB = yF;
					yF.gB = {};
					a.btDefaultSoftBodySolver = yF;
					yF.prototype.__destroy__ = function () {
						jC(this.eB)
					};

					function zF() {
						throw "cannot construct a btSoftBodyArray, no constructor in IDL";
					}
					zF.prototype = Object.create(f.prototype);
					zF.prototype.constructor = zF;
					zF.prototype.fB = zF;
					zF.gB = {};
					a.btSoftBodyArray = zF;
					zF.prototype.size = zF.prototype.size = function () {
						return kC(this.eB)
					};
					zF.prototype.at = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						return k(lC(c, b), Y)
					};
					zF.prototype.__destroy__ = function () {
						mC(this.eB)
					};

					function Z(b, c, d, e, g) {
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						this.eB = nC(b, c, d, e, g);
						h(Z)[this.eB] = this
					}
					Z.prototype = Object.create(x.prototype);
					Z.prototype.constructor = Z;
					Z.prototype.fB = Z;
					Z.gB = {};
					a.btSoftRigidDynamicsWorld = Z;
					Z.prototype.addSoftBody = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						oC(e, b, c, d)
					};
					Z.prototype.removeSoftBody = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						pC(c, b)
					};
					Z.prototype.removeCollisionObject = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						qC(c, b)
					};
					Z.prototype.getWorldInfo = function () {
						return k(rC(this.eB), S)
					};
					Z.prototype.getSoftBodyArray = function () {
						return k(sC(this.eB), zF)
					};
					Z.prototype.getDispatcher = function () {
						return k(tC(this.eB), MD)
					};
					Z.prototype.rayTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						uC(e, b, c, d)
					};
					Z.prototype.getPairCache = function () {
						return k(vC(this.eB), ND)
					};
					Z.prototype.getDispatchInfo = function () {
						return k(wC(this.eB), p)
					};
					Z.prototype.addCollisionObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? xC(e, b) : void 0 === d ? yC(e, b, c) : zC(e, b, c, d)
					};
					Z.prototype.getBroadphase = function () {
						return k(AC(this.eB), OD)
					};
					Z.prototype.convexSweepTest = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						BC(n, b, c, d, e, g)
					};
					Z.prototype.contactPairTest = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						CC(e, b, c, d)
					};
					Z.prototype.contactTest = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						DC(d, b, c)
					};
					Z.prototype.updateSingleAabb = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						EC(c, b)
					};
					Z.prototype.setDebugDrawer = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						FC(c, b)
					};
					Z.prototype.getDebugDrawer = function () {
						return k(GC(this.eB), PD)
					};
					Z.prototype.debugDrawWorld = function () {
						HC(this.eB)
					};
					Z.prototype.debugDrawObject = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						IC(e, b, c, d)
					};
					Z.prototype.setGravity = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						JC(c, b)
					};
					Z.prototype.getGravity = function () {
						return k(KC(this.eB), m)
					};
					Z.prototype.addRigidBody = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? LC(e, b) : void 0 === d ? _emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_2(e, b, c) : MC(e, b, c, d)
					};
					Z.prototype.removeRigidBody = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						NC(c, b)
					};
					Z.prototype.addConstraint = function (b, c) {
						var d = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						void 0 === c ? OC(d, b) : PC(d, b, c)
					};
					Z.prototype.removeConstraint = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						QC(c, b)
					};
					Z.prototype.stepSimulation = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						return void 0 === c ? RC(e, b) : void 0 === d ? SC(e, b, c) : TC(e, b, c, d)
					};
					Z.prototype.setContactAddedCallback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						UC(c, b)
					};
					Z.prototype.setContactProcessedCallback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						VC(c, b)
					};
					Z.prototype.setContactDestroyedCallback = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						WC(c, b)
					};
					Z.prototype.addAction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						XC(c, b)
					};
					Z.prototype.removeAction = function (b) {
						var c = this.eB;
						b && "object" === typeof b && (b = b.eB);
						YC(c, b)
					};
					Z.prototype.getSolverInfo = function () {
						return k(ZC(this.eB), t)
					};
					Z.prototype.setInternalTickCallback = function (b, c, d) {
						var e = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						void 0 === c ? $C(e, b) : void 0 === d ? aD(e, b, c) : bD(e, b, c, d)
					};
					Z.prototype.__destroy__ = function () {
						cD(this.eB)
					};

					function AF() {
						this.eB = dD();
						h(AF)[this.eB] = this
					}
					AF.prototype = Object.create(f.prototype);
					AF.prototype.constructor = AF;
					AF.prototype.fB = AF;
					AF.gB = {};
					a.btSoftBodyHelpers = AF;
					AF.prototype.CreateRope = function (b, c, d, e, g) {
						var n = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						return k(eD(n, b, c, d, e, g), Y)
					};
					AF.prototype.CreatePatch = function (b, c, d, e, g, n, D, T, Da) {
						var dc = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						n && "object" === typeof n && (n = n.eB);
						D && "object" === typeof D && (D = D.eB);
						T && "object" === typeof T && (T = T.eB);
						Da && "object" === typeof Da && (Da = Da.eB);
						return k(fD(dc, b, c, d, e, g, n, D, T, Da), Y)
					};
					AF.prototype.CreatePatchUV = function (b, c, d, e, g, n, D, T, Da, dc) {
						var BF = this.eB;
						GD();
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						n && "object" === typeof n && (n = n.eB);
						D && "object" === typeof D && (D = D.eB);
						T && "object" === typeof T && (T = T.eB);
						Da && "object" === typeof Da && (Da = Da.eB);
						"object" == typeof dc && (dc = KD(dc));
						return k(gD(BF, b, c, d, e, g, n, D, T, Da, dc), Y)
					};
					AF.prototype.CreateEllipsoid = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						return k(hD(g, b, c, d, e), Y)
					};
					AF.prototype.CreateFromTriMesh = function (b, c, d, e, g) {
						var n = this.eB;
						GD();
						b && "object" === typeof b && (b = b.eB);
						"object" == typeof c && (c = KD(c));
						if ("object" == typeof d && "object" === typeof d) {
							var D = HD(d, xa);
							ID(d, xa, D);
							d = D
						}
						e && "object" === typeof e && (e = e.eB);
						g && "object" === typeof g && (g = g.eB);
						return k(iD(n, b, c, d, e, g), Y)
					};
					AF.prototype.CreateFromConvexHull = function (b, c, d, e) {
						var g = this.eB;
						b && "object" === typeof b && (b = b.eB);
						c && "object" === typeof c && (c = c.eB);
						d && "object" === typeof d && (d = d.eB);
						e && "object" === typeof e && (e = e.eB);
						return k(jD(g, b, c, d, e), Y)
					};
					AF.prototype.__destroy__ = function () {
						kD(this.eB)
					};
					(function () {
						function b() {
							a.PHY_FLOAT = lD();
							a.PHY_DOUBLE = mD();
							a.PHY_INTEGER = nD();
							a.PHY_SHORT = oD();
							a.PHY_FIXEDPOINT88 = pD();
							a.PHY_UCHAR = qD();
							a.CONST_GIMPACT_COMPOUND_SHAPE = rD();
							a.CONST_GIMPACT_TRIMESH_SHAPE_PART = sD();
							a.CONST_GIMPACT_TRIMESH_SHAPE = tD();
							a.BT_CONSTRAINT_ERP = uD();
							a.BT_CONSTRAINT_STOP_ERP = vD();
							a.BT_CONSTRAINT_CFM = wD();
							a.BT_CONSTRAINT_STOP_CFM = xD()
						}
						Fa ? b() : Ca.unshift(b)
					})();
					a.CONTACT_ADDED_CALLBACK_SIGNATURE = "iiiiiiii";
					a.CONTACT_DESTROYED_CALLBACK_SIGNATURE = "ii";
					a.CONTACT_PROCESSED_CALLBACK_SIGNATURE = "iiii";
					a.INTERNAL_TICK_CALLBACK_SIGNATURE = "vif";
					this.Ammo = a;


					return Ammo.ready
				}
			);
		})();
		module.exports = Ammo;
	});

	//load wasm
	const Ammo = {};

	function waitForAmmoInstantiation(path) {
		var ammoClosureThis = {};
		if (typeof path === 'string') {
			var WASM_FILE_PATH = path;
			Ammo.instantiateWasm = function (importObjects, receiveInstance) {
				return WebAssembly.instantiate(WASM_FILE_PATH, importObjects).then(function (result) {
					return receiveInstance(result.instance);
				});
			};
		}
		return new Promise(function (resolve, reject) {
			ammo_wasm.call(ammoClosureThis, Ammo).then(function () {
				resolve();
			}, (res) => {
				reject(res);
			});
		});
	}

	module.exports = function () {
		return new Promise(function (resolve, reject) {
			waitForAmmoInstantiation('physics/jsm/ammo/ammo.wasm.wasm').then(
				() => {
					getApp().onekit_ammo = Ammo;
					resolve();
				},
				(res) => {
					reject(res);
				}
			)
		})
	}

})();
