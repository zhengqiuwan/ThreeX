import files from './files.json'
var index = 0
var timer
Page({
    
	onLoad() {

		const sections = []
		const platform = wx.getSystemInfoSync()
		for (const sectionName of Object.keys(files)) {
			if (sectionName.startsWith("physics_")) {
				const type = platform == "ios" ? "js" : "wasm"
				if (!sectionName.endsWith("_" + type)) {
					continue
				}
			}
			sections.push({
				sectionName,
				demos: files[sectionName]
			})
		}
		this.setData({
			sections
		})
	},
	run() {
		//const sub = "webgl_nodes"
        var subs = Object.keys(files)
      //  subs = subs.slice(1)
		var x = index;
		for (var sub of subs) {
			var demos = files[sub]
			if (demos.length > x) {
				var demo = demos[x]
				console.error(index,sub,x, demo)
				wx.redirectTo({
					url: "/" + sub + "/" + demo
                })
                return
			} else {
                x -= demos.length
			}
		}
		clearInterval(timer)

	},
	onReady() {

		timer = setInterval(() => {
            index++
		this.run()
		}, 4000)
		this.run()
	},
	onHide() {
		clearInterval(timer)
	}
})
