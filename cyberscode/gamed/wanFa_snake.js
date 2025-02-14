const wanFa_snake = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_snake.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_snake.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_snake.gameDestroy);
		//重置全局变量
		snakeFuncs.resetAll()
		clearInterval(snakeFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}





		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		setTimeout(() => {
			surfaceCtr.ctlDoor(1, 7000);
		}, 500);

		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)


		setTimeout(function () {
			roomFunction.playSound(false, "snaketeach")
			snakeFuncs.lettargetList()
			setTimeout(function () {
				roomFunction.playSound(true, "snakebgm")
			}, 17000);

			if (levelInfos.wanFa.startsWith("snake")) {
				roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
				snakeFuncs.CountPlay();
			}
		}, sec * 1000 + 1000);

		setTimeout(() => {
			surfaceCtr.ctlDoor(0, 5000);
			roomFunction.playSound(false, "gamestart");
		}, 3500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_snake.gameTaped)
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)

		nowInfos.gameCountTime = 90
		nowInfos.nowGameid = gameid;
		snakeFuncs.createTarget();
		setTimeout(() => {
			snakeFuncs.createSnake()
		}, 500);
		setTimeout(() => {
			noZuoBi = 1
			snakeFuncs.snakeMove()
			gameRules.lifeMove();
			snakeFuncs.CountPlay()
			snakeFuncs.ScorePlay()
		}, 17000);
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		snakeFuncs.wrongTap(nodeId, onOff)
		if (nodeId.indexOf("target") != -1 && noZuoBi == 1) {
			snakeFuncs.playerTap(x, y, nodeId)
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(snakeFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_snake.gameTaped)
		engine.log("移除tap监听")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)

	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(snakeFuncs.CountPlay.innerCount)
		clearInterval(snakeFuncs.snakeMove.lyc)
		roomFunction.stopSound("snakebgm")
		setTimeout(() => {
			roomFunction.goToGameLevel("leave_hold", "none")
			snakeFuncs.rmAllListener()
			wanFaCtl_snakeCtl.gameEndCtl(playerTargetNum, snakeTargetNum, nowInfos.lifePoint)
			levelInfos.gameIdList = []
		}, 1000);

	}

}




const snakeFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		snakeList = [[7, 11], [7, 12], [7, 13], [7, 14], [7, 15], [7, 16], [7, 17]]
		snakeTargetNum = 0//蛇得分数
		playerTargetNum = 0//玩家得分数
		nx = 7//当前蛇头x
		ny = 11//当前蛇头y
		distanceList = []//目标点坐标总数数组
		nowTarget = []//当前目标点坐标
		nowTarName = 0//当前目标点下标数
		movenum = 0//用于控制蛇走斜角
		doubleUp = 0//重复结束
		noZuoBi = 0
		targetList = [[3, 3]]
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_snake.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_snake.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_snake.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_snake.gameTimeOver)
	},

	wrongTap(nodeId, onOff) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("snake") && onOff == true) {
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				if (nowInfos.lifePoint > 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSound(false, "wrong");
					if (nowInfos.lifePoint == 3) {
						roomFunction.playSound(false, "life")
					}
				} else if (nowInfos.lifePoint == 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSound(false, "wrong");
					wanFa_snake.gameLevelEnd()
				}
			}
		}
	},

	playerTap(x, y, nodeId) {
		roomFunction.playSound(false, "right")
		fastop.removeNode("plarrr", nodeId)
		let name = parseFloat(nodeId)
		targetList[name] = [999, 999]
		playerTargetNum++
		if (playerTargetNum + snakeTargetNum == 120 && doubleUp == 0) {
			wanFa_snake.gameLevelEnd()
			doubleUp = 1
		}
		// if (snakeList.length > 7) {
		// 	fastop.removeNode("remmmmmm", "snakeBody" + (snakeList.length - 1))
		// 	engine.log("snakeBody" + snakeList.length)
		// 	snakeList.pop()

		// }
	},

	lettargetList() {
		while (targetList.length != 120) {
			let x = Math.floor(Math.random() * 16)
			let y = Math.floor(Math.random() * 32)
			if (targetList.toString().indexOf([x, y].toString()) == -1 && snakeList.toString().indexOf([x, y].toString()) == -1) {
				targetList.push([x, y])
			}
		}
	},

	//生成目标点
	createTarget() {

		for (let i = 0; i < targetList.length; i++) {

			fastop.addNode("add" + i, i + "target", "b", targetList[i][0], targetList[i][1], 0, 0, 254)

		}


	},

	//生成斯内科
	createSnake() {
		fastop.addNode("adSnakeHead", "snakehead", "b", snakeList[0][0], snakeList[0][1], 254, 0, 0)
		for (let i = 1; i < snakeList.length; i++) {
			fastop.addNode("adSnake" + i, "snakeBody" + i, "b", snakeList[i][0], snakeList[i][1], 254, 102, 0)
		}
	},

	snakeMove() {
		snakeFuncs.snakeMove.lyc = setInterval(() => {
			movenum++
			for (let i = 0; i < targetList.length; i++) {
				distanceList[i] = Math.abs(targetList[i][0] - nx) + Math.abs(targetList[i][1] - ny) //从目标点一开始所有目标点与蛇头的距离

			}
			nowTarName = distanceList.indexOf(Math.min(...distanceList))//找出最小值的下标
			nowTarget[0] = targetList[nowTarName][0]//当前选中目标点x坐标
			nowTarget[1] = targetList[nowTarName][1]//当前选中目标点y坐标

			//蛇头移动方向算法
			if (nowTarget[0] - nx > 0 && nowTarget[1] - ny == 0) { //目标在蛇头右侧
				roalX = 1
				roalY = 0
				if (snakeList[0][0] == nx + roalX && snakeList[0][1] == ny + roalY) {

				}
			}
			if (nowTarget[0] - nx < 0 && nowTarget[1] - ny == 0) { //目标在蛇头左侧
				roalX = -1
				roalY = 0
			}
			if (nowTarget[1] - ny > 0 && nowTarget[0] - nx == 0) { //目标在蛇头下侧
				roalX = 0
				roalY = 1
			}
			if (nowTarget[1] - ny < 0 && nowTarget[0] - nx == 0) { //目标在蛇头上侧
				roalX = 0
				roalY = -1
			}
			if (nowTarget[0] - nx > 0 && nowTarget[1] - ny < 0) { //目标在蛇头右上侧
				if (movenum % 2 == 0) {
					roalX = 1
					roalY = 0

				} else {
					roalX = 0
					roalY = -1
				}
			}
			if (nowTarget[0] - nx < 0 && nowTarget[1] - ny < 0) { //目标在蛇头左上侧
				if (movenum % 2 == 0) {
					roalX = -1
					roalY = 0
				} else {
					roalY = -1
					roalX = 0
				}
			}
			if (nowTarget[1] - ny > 0 && nowTarget[0] - nx < 0) { //目标在蛇头左下侧
				if (movenum % 2 == 0) {
					roalX = -1
					roalY = 0
				} else {
					roalY = 1
					roalX = 0
				}
			}
			if (nowTarget[1] - ny > 0 && nowTarget[0] - nx > 0) { //目标在蛇头右下侧
				if (movenum % 2 == 0) {
					roalY = 0
					roalX = 1
				} else {
					roalY = 1
					roalX = 0
				}
			}
			//斯内科移动
			nx += roalX//蛇头x坐标
			ny += roalY//蛇头y坐标
			snakeList.unshift([nx, ny])
			if (nowTarget[1] - ny == 0 && nowTarget[0] - nx == 0) {//如果吃到了
				snakeTargetNum++
				if (playerTargetNum + snakeTargetNum == 120 && doubleUp == 0) {
					wanFa_snake.gameLevelEnd()
					doubleUp = 1
				}
				fastop.removeNode("awawaw", nowTarName + "target")
				targetList[nowTarName] = [999, 999]
			} else {
				snakeList.pop()//删除蛇体数组最后一格
			}

			snakeFuncs.createSnake();

		}, 200);

	},


	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true) {
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				if (nowInfos.nowGameid == "snaketeach001-cxx") {
					if (nowInfos.lifePoint == 6) {
						roomFunction.playSound(false, "teachRed")
						fastop.removeNode("rmred203", nodeId)
						setTimeout(() => {
							roomFunction.playSound(false, "teachBlue2")
							snakeFuncs.addGreen()
							snakeFuncs.addBlue()
							snakeFuncs.randomBlue(10)
							setTimeout(() => {
								snakeFuncs.redPlay2()
							}, 11000);
						}, 4500);

					}
				}
				if (nowInfos.lifePoint > 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSound(false, "wrong");
					if (nowInfos.lifePoint == 3) {
						roomFunction.playSound(false, "life")
					}
				} else if (nowInfos.lifePoint == 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSound(false, "wrong");
					wanFa_snake.gameLevelEnd()
				}
			}
		}
	},

	CountPlay() {
		snakeFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
			let opInfo = {
				opId: "screenCountPlay",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_3b01",
					block1: {
						model: "dis_b_numUnit",
						label1: "SECONDS",
						value1: nowInfos.gameCountTime
					},
					block2: {
						model: "dis_b_targetColor",
						label1: "目标",
						value1: "#0000ff",
						label2: "BLUE",
						value2: 120 - playerTargetNum - snakeTargetNum
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "玩家得分",
						value1: playerTargetNum,
						label2: "贪吃蛇得分",
						value2: snakeTargetNum
					}
				}
			}
			gameFuncs.op(opInfo);
			nowInfos.gameCountTime--;
			if (nowInfos.gameCountTime == 10 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				roomFunction.playSound(false, "daoshu10")
			}
		}, 1000, nowInfos.gameCountTime)
	},
	//基础红绿蓝游戏内屏倒计时、目标数量、得分显示。该函数用于刷新得分。
	ScorePlay() {
		let opInfo = {
			opId: "screenScorePlay",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_3b01",
				block1: {
					model: "dis_b_numUnit",
					label1: "SECONDS",
					value1: nowInfos.gameCountTime
				},
				block2: {
					model: "dis_b_targetColor",
					label1: "目标",
					value1: "#0000ff",
					label2: "BLUE",
					value2: 120 - playerTargetNum - snakeTargetNum

				},
				block3: {
					model: "dis_b_scoreGame",
					label1: "玩家得分",
					value1: playerTargetNum,
					label2: "贪吃蛇得分",
					value2: snakeTargetNum
				}
			}
		}
		gameFuncs.op(opInfo)
	},


}
