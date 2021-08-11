//读取
var openFile = function(event) {
	var input = event.target;
	var reader = new FileReader();
	reader.readAsText(input.files[0]);
	reader.onload = function() {
		if(reader.result) {
			var version = reader.result.match(/v.*#/)[0];
			version = version.substr(0, version.length-1);
			document.getElementById("ver").innerHTML = version;
			var dataJson = reader.result.replace(/^#.*#/, "");
			localStorage.setItem("SUPERMAEKET_FILE_VERSION", version);
			localStorage.setItem("SUPERMAEKET_FILE_DATA", dataJson);
			mui.toast("已选择")
		}
	};
};

//上传
function writeFile(data) {
	plus.io.requestFileSystem(plus.io.PUBLIC_DOCUMENTS, function(success) {
		success.root.getFile('supermarket.txt', {
			create: true
		}, function(entry) {
			//console.log(plus.io.convertLocalFileSystemURL(entry.toURL()));
			entry.createWriter(function(suc) {
				//全部更改
				suc.write(data)
//				if(suc.length == 0) { //如果没有存放过长度应为0直接添加
//					suc.write(JsonArray)
//				} else { //存放过就从最后开始添加
//					suc.seek(suc.length)
//					suc.write('^' + JsonArray)
//				}
				mui.toast('ok')
			}, function(eee) {
				mui.toast('写入失败,' + ee.message)
			})
		}, function(ee) {
			mui.toast('创建失败,' + ee.message)
		})
	}, function(e) {
		mui.toast(e.message + '获取目录')
	});
}

//获取版本
function getVersion() {
	var date = new Date(); //获取当前时间

	var year = date.getFullYear() + ""; //年
	var month = ("0" + (date.getMonth() + 1)).slice(-2); //月 保留两位
	var day = date.getDate(); //日
	var hour = date.getHours(); // 时
	var min = date.getMinutes(); //分
	var seconds = date.getSeconds(); //秒
	
	var version = "# "+ year + month + day +" v"+ year.substr(2, 4) +"."+ month +"."+ day +"."+ hour +"."+ min +"."+ seconds +"#"
	
	return version;
}

//写入缓存
function writeLocal(data) {
	var version = data.match(/v.*#/)[0];
	version = version.substr(0, version.length-1);
	document.getElementById("ver").innerHTML = version;
	
	var dataJson = data.replace(/^#.*#/, "");
	localStorage.setItem("SUPERMAEKET_FILE_VERSION", version);
	localStorage.setItem("SUPERMAEKET_FILE_DATA", dataJson);
}
