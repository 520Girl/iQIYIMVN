;(() => {
	document.oncontextmenu = function () {
		return false
	} // 禁止右键
	document.onkeydown = function (e) {
		if (e.keyCode === 123) {
			return false
		}
	} // 禁止F12

	function block() {
		if (
			window.outerHeight - window.innerHeight > 200 ||
			window.outerWidth - window.innerWidth > 200
		) {
			document.body.innerHTML = "检测到非法调试,请关闭后刷新重试!"
		}
		setInterval(() => {
			// if (typeof console.clear !== 'undefined') {
			//     location.reload();
			// }
			;(function () {
				return false
			})
				["constructor"]("debugger")
				["call"]()
		}, 500)
	}
	try {
		block()
	} catch (err) {}
})()
