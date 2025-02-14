let consoleLog = console.log;
//let consoleLog = function(){}

//引擎管理
const engineListens = {}
const engine = {
	log: consoleLog,
	addEventListener(funName, func) {
		if (typeof engineListens[funName] == 'undefined') {
			engineListens[funName] = {}
		}
		engineListens[funName][func] = func;
	},
	removeEventListener(funName, func) {
		if (typeof engineListens[funName] == 'object') {
			if (typeof engineListens[funName][func] != 'undefined') {
				delete engineListens[funName][func]
			}
		}
	},
	fireEventListener(funName, func) {
		if (typeof engineListens[funName] == 'object') {
			let ar = Object.keys(engineListens[funName]);
			for (let key of ar) {
				let f = engineListens[funName][key];
				func(f);
			}
		}
	}

}

//作废console.log函数
console.log = function () { };

//音频播放状态
function soundPlayStatus(status, opid, src, progress, pt, total) {
	// engine.log("音频播放状态：" + status + " + 操作id:" + opid + " + 资源路径:" + src + " + 进度:" + progress + " + 读取长度:" + pt + " + 文件总长度:" + total)
	engine.fireEventListener("soundPlayStatus", function (f) {
		f(status, opid, src, progress, pt, total);
	})
}
//游戏关卡初始化
function playInit() {
	// engine.log("JS Player 初始完成")
	engine.fireEventListener("playInit", function (f) {
		f();
	})
	let conf = {}
	// conf.c1 = "#FF0000";//红
	// conf.c2 = "#0000fe";//蓝  
	// conf.c3 = "#00fe00";//绿
	// conf.c4 = "#fec300";//黄
	// conf.c5 = "#00FFFF";//青
	// conf.c6 = "#8b4513";//棕
	for (let i = 1; i < usercolors.length + 1; i++) {
		conf["c" + i] = usercolors[i - 1]
	}
	gameFuncs.setUserCardColor(conf)
}

//某个小游戏初始化
function gameInit(gameid) {
	// engine.log("JS GameId=" + gameid + " 初始完成")
	engine.fireEventListener("gameInit", function (f) {
		f(gameid);
	})
}

function gamePlay(gameid) {
	// engine.log("JS GameId=" + gameid + " 开始游戏")
	engine.fireEventListener("gamePlay", function (f) {
		f(gameid);
	})
}

function gameDestroy(gameid) {
	// console.log("JS GameId=" + gameid + " 游戏销毁")
	engine.fireEventListener("gameDestroy", function (f) {
		f(gameid);
	})
}

//游戏倒计时结束
function gameTimeOver(gameid) {
	// engine.log("倒计时结束，请结算游戏")
	engine.fireEventListener("gameTimeOver", function (f) {
		f(gameid);
	})
}

//游戏触发node节点
function gameTaped(face, x, y, onOff, nodeId, event) {
	// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + " 被触碰了"+event)
	engine.fireEventListener("gameTaped", function (f) {
		f(face, x, y, onOff, nodeId, event);
	})
}

//用户登陆
function userLoginToGame(users) {
	// engine.log("用户登陆游戏数量："+users.length)
	// engine.log(JSON.stringify(users))
	engine.fireEventListener("userLoginToGame", function (f) {
		f(users);
	})
}

//用户刷卡登陆数量改变
function userLoginNumChanged(count) {
	// engine.log("用户刷卡数量改变："+count)
	engine.fireEventListener("userLoginNumChanged", function (f) {
		f(count);
	})
}

//用户选定关卡
function userChoosePlayGameLevel(mode, wanFa, level, gameIds) {
	// engine.log("用户选定模式："+ mode + " + 玩法:"+ wanFa + " + 关卡:" + level + " + 游戏id数量：" +gameIds.length)
	// engine.log(JSON.stringify(gameIds))
	// engine.log(gameIds[0].GameId)
	engine.fireEventListener("userChoosePlayGameLevel", function (f) {
		f(mode, wanFa, level, gameIds);
	})
}

