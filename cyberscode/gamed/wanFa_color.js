const wanFa_color = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_color.gamePlay);
		engine.addEventListener("gameDestroy", wanFa_color.gameDestroy);

		//重置全局变量
		colorFuncs.resetAll()
		nowInfos.scoreCoefficient = scoreC;
		playerNum = usersInfos.allUsers.length

		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		roomFunction.playSound(false, "ding")
		let countTime = 0
		wanFa_color.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					break;
				case 5:
					roomFunction.playSound(false, "gamestart");
					break;
				case 16:
					if (levelInfos.wanFa.startsWith("color")) {
						if (levelInfos.level != 5) {
							roomFunction.playSound(false, "colorRules")
						}
						if (levelInfos.level == 5) {
							roomFunction.playSound(false, "colorRules-2")
						}
					}
					break;
				case 23:
					roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					roomFunction.playSound(true, "colorBgm", "background")
					break;
				case 24:
					clearInterval(wanFa_color.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);

		// setTimeout(() => {
		// 	roomFunction.playSound(false, "gamestart");
		// 	surfaceCtr.ctlDoor(0, 7000);
		// }, 3000);



		// setTimeout(function () {
		// 	if (levelInfos.wanFa.startsWith("color")) {
		// 		if (levelInfos.level != 5) {
		// 			roomFunction.playSound(false, "colorRules")
		// 		}
		// 		if (levelInfos.level == 5) {
		// 			roomFunction.playSound(false, "colorRules-2")

		// 		}
		// 		setTimeout(() => {
		// 			roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 			roomFunction.playSound(true, "colorBgm", "background")
		// 		}, 3500);
		// 	}
		// }, sec * 1015);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_color.gameTaped)
		engine.log("-------------------" + gameid)
		switch (levelInfos.level) {// rightnum有几个正确点    fakernum有几个假点
			case 1:
				engine.log("不想弄")
				rightnum = playerNum
				fakernum = 0
				break;
			case 2:
				rightnum = playerNum
				fakernum = 0
				break;
			case 3:
				rightnum = playerNum
				fakernum = 2
				break;
			case 4:
				rightnum = playerNum
				fakernum = 3
				break;
			case 5:
				rightnum = playerNum
				fakernum = 2
				break;
			case 6:
				rightnum = playerNum//第六关
				fakernum = 4
				//fastop.addRedMove("addColorPlay", "red001", 0, 15, 15, 15, 254, 0, 0)
				break;
			case 7:
				rightnum = playerNum
				fakernum = 5
				break;
			case 8:
				rightnum = playerNum
				fakernum = 1
				break;
			case 9:
				rightnum = playerNum
				fakernum = 1
				break;
			case 10:
				rightnum = playerNum
				fakernum = 1
				break;

		}
		if (gameid.startsWith("color")) {
			let cxxCode = setInterval(() => { //主线程 生成+判定
				if (remove == 1) {
					clearInterval(cxxCode)
					engine.log("移除了")
					return
				}
				if (gameMove == 0 && levelInfos.level == 1) {
					colorFuncs.colorPlay(true)
				}
				gameMove++
				engine.log(gameMove + "------++++")
				switch (gameMove) {
					case 1:
						tapPanding = 0
						if (levelInfos.level == 1) {
							colorFuncs.colorPlay(false)

						}

						for (let i = 1; i < target + 1; i++) {
							fastop.removeNode("qaq" + i, "target" + i)
						}
						colorFuncs.addTargetList()//添加目标点
						colorFuncs.addColor()//杂乱色
						colorFuncs.addFaker()//假点
						colorFuncs.sixRedMove()

						if (levelInfos.level == 5) {//如果是答题轮
							colorFuncs.ScorePlay2()
						} else {
							colorFuncs.ScorePlay()
						}
						break;
					case 9:
						engine.log("panding")
						for (let i = 0; i < luanList.length; i++) {
							fastop.removeNode("qwq" + i, luanList[i])
						}
						tapPanding = 1
						wrongNum = 0
						if (colorInfos.noBody == 0) {
							wrongNum = 1
							colorFuncs.tapWrong(0, 0)
						}
						let code = setTimeout(() => {
							if (wrongNum == 0) {
								if (wrongNum == 1) {
									clearTimeout(code)
									engine.log("ok了")
									return
								}
								usersInfos.levelScore += 10
								roomFunction.playSoundTivite(false, "right", "positive")
								colorFuncs.rightAnimation()
								tapPanding = 0
							}
						}, 500);
						lunNum++
						engine.log(lunNum + "-----")
						break;
					case 10:
						if (lunNum == 10) {
							wanFa_color.gameLevelEnd()
						}
						if (levelInfos.level == 1 && lunNum == 3) {
							gameMove = 100
							fastop.addColorPlay("addColorPlay", "keep", 0, 0, 15, 31)
							control = 1
							roomFunction.playSound(false, "Interfere")
							setTimeout(() => {
								gameMove = -1
								control = 0
								tapPanding = 0

							}, 6000);
							return
						} else if (levelInfos.level == 1 && lunNum == 6) {
							gameMove = 100
							fastop.addColorPlay("addColorPlay", "keep", 0, 0, 15, 31)
							control = 1
							roomFunction.playSound(false, "linshi")
							setTimeout(() => {
								fakernum = 1
								gameMove = -1
								control = 0
								tapPanding = 0

							}, 8000);
							return
						} else if (levelInfos.level == 2 && lunNum == 5) {
							fakernum = 2
						}
						gameMove = 0
						tapPanding = 0
						colorInfos.noBody = 0
						break;
				}
			}, 1000);





		}

	},

	// let feijizidanyidong001 =[[1, 34], [2, 33], [3, 32], [4, 33], [5, 34], [10, 34], [11, 33], [12, 32], [13, 33], [14, 34]]
	// let feijizidanyidong002 =[[2, 35], [3, 34], [4, 33], [5, 34], [7, 32], [8, 32], [10, 34], [11, 33], [12, 34], [13, 35]]
	// let feijizidanyidong003 =[[1, 33], [2, 32], [3, 33], [5, 34], [6, 33], [7, 32], [8, 32], [9, 33], [10, 34], [12, 33], [13, 32], [14, 33]]
	// let feijizidanyidong004 =[[1, 33], [3, 34], [4, 33], [5, 34], [7, 32], [8, 32], [10, 34], [11, 33], [12, 34], [14, 33]]
	// let feijizidanyidong005 =[[1, 36], [2, 35], [3, 34], [4, 33], [6, 33], [7, 32], [8, 32], [9, 33], [11, 33], [12, 34], [13, 35], [14, 36]]
	// let feijizidanyidong006 =[[0, 32], [1, 32], [2, 32], [3, 32], [4, 32], [5, 32], [6, 32], [7, 32], [8, 32], [9, 32], [10, 32], [11, 32], [12, 32], [13, 32], [14, 32], [15, 32]]


	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		colorInfos.noBody = 1
		if (tapPanding == 1) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			if (levelInfos.level == 1 && control == 0 && lunNum == 3 || lunNum == 6) {
				if (nodeId == "low") {//如果踩错的直接扣血走动画
					colorFuncs.tapWrong(x, y)
				}
			} else {
				if (nodeId == "low") {//如果踩错的直接扣血走动画
					wrongNum = 1
					colorFuncs.tapWrong(x, y)
				}
			}

		}
		colorFuncs.tapWrong2(face, x, y, onOff, nodeId, event)
		if (nodeId.startsWith("faker") && onOff == true && (arrColorSss[nodeId.toString()] == 0 || arrColorSss[nodeId.toString()] == undefined)) {
			colorFuncs.fakerTap(nodeId)
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-xxx-" + gameid)

	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-xxx-" + gameid)
		if (gameid != "__system_wait") {
			if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
				//roomFunction.playSound(false, "levelup")
			} else {
				wanFa_color.gameLevelEnd()
			}
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		roomFunction.stopSound("colorBgm")
		roomFunction.goToGameLevel("leave_hold", "none");
		colorFuncs.rmAllListener()
		wanFaCtl_colorCtl.gameEndCtl(usersInfos.levelScore, nowInfos.lifePoint)
		levelInfos.gameIdList = []
		remove = 1
		let str = gameFuncs.playingAudioIds()
		let arr = JSON.parse(str)
		let soundName = arr?.map(item => item.slice(item.indexOf('d') + 1))
		engine.log(arr)

		engine.log(soundName)
		soundName?.map(item => {
			roomFunction.stopSound(item)
		})
	}

}




const colorFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.lifeProtect = 0;
		lunNum = 0
		moveColor = 1
		colorInfos.noBody = 0
		arrColorSss = {}
		//sjColor = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]//坐标地图
		sjColor = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]//坐标地图
		colornum = 0
		targetnumm = 0
		gameMove = 0
		control = 0
		remove = 0
		wrongNum = 1
		tapPanding = 0
	},




	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_color.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_color.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_color.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_color.gameTaped)
	},

	colorPlay(onoff) {
		let opInfo = {
			opId: "keepPlay", //操作id 再控制用
			opType: "play", // 操作类型，修改节点属性
			opNode: "keep", // 仅能操作node类型
			timeLen: 8, //秒 支持小数
			loop: false,
			keyFrames: [ // 过程数组
				{
					t: 0, //0-1的时间点位
					keyFrame: {

						canTap: false, //控制
						visible: onoff, //显示，如果为false，逻辑数据会跳过

					}
				},
				{
					t: 1,
					keyFrame: {

						canTap: false, //控制
						visible: onoff, //显示，如果为false，逻辑数据会跳过

					}
				}
			],
		}
		gameFuncs.op(opInfo);
	},
	addTargetList() {
		noSame = [0, 1, 2, 3, 4, 5, 6, 7]//售后李禹辰
		target = Math.floor(Math.random() * 8)//用哪个sai当目标点
		engine.log(target + "当前目标点")
		let qwq = noSame.indexOf(target)
		engine.log(qwq + "此目标点在nosame下标")
		noSame.splice(qwq, 1)
		engine.log(noSame + "当前杂乱色块选择数组")
		// if (levelInfos.level == 1) {
		// 	target = Math.floor(Math.random() * 5 + 3)//用哪个sai当目标点
		// }
		if (levelInfos.level == 5) {
			switch (target) {
				case 0:
					roomFunction.playSound(false, "Blue-l");
					break;
				case 1:
					roomFunction.playSound(false, "Green-l");
					break;
				case 2:
					roomFunction.playSound(false, "Black-l");
					break;
				case 3:
					roomFunction.playSound(false, "Yellow-l");
					break;
				case 4:
					roomFunction.playSound(false, "Purple-l");
					break;
				case 5:
					roomFunction.playSound(false, "Brown-l");
					break;
				case 6:
					roomFunction.playSound(false, "Pink-l");
					break;
				case 7:
					roomFunction.playSound(false, "Orange-l");
					break;
			}
		} else {
			switch (target) {
				case 0:
					roomFunction.playSound(false, "blue");
					break;
				case 1:
					roomFunction.playSound(false, "green");
					break;
				case 2:
					roomFunction.playSound(false, "Black");
					break;
				case 3:
					roomFunction.playSound(false, "yellow");
					break;
				case 4:
					roomFunction.playSound(false, "purple");
					break;
				case 5:
					roomFunction.playSound(false, "brown");
					break;
				case 6:
					roomFunction.playSound(false, "pink");
					break;
				case 7:
					roomFunction.playSound(false, "orange");
					break;
			}
		}
		sjColor = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]//坐标地图
		targetnumm = 0
		for (let i = 0; i < rightnum; i++) {
			targetnumm++
			let x = Math.floor(Math.random() * 8)
			let y = Math.floor(Math.random() * 16)
			while (sjColor[x][y] != 0) {
				x = Math.floor(Math.random() * 8)
				y = Math.floor(Math.random() * 16)
			}
			sjColor[x][y] = 2

			fastop.addColor(x + "add" + y, "target" + targetnumm, x * 2, y * 2, colorInfos.arrColor[target].r, colorInfos.arrColor[target].g, colorInfos.arrColor[target].b)
			if (levelInfos.level != 5) {
				let opInfo1 = {
					opId: "colorPlay001",
					opType: "play",
					opNode: "color001",
					timeLen: 8,
					canTap: false,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								visible: false,
								shape: {
									rgba: {
										r: colorInfos.arrColor[target].r,
										g: colorInfos.arrColor[target].g,
										b: colorInfos.arrColor[target].b,
										a: colorInfos.arrColor[target].a,
									}
								}

							}
						},
						{
							t: 0.15,
							keyFrame: {
								visible: true,
								shape: {
									rgba: {
										r: colorInfos.arrColor[target].r,
										g: colorInfos.arrColor[target].g,
										b: colorInfos.arrColor[target].b,
										a: colorInfos.arrColor[target].a,
									}
								}

							}
						},
						{
							t: 0.2,
							keyFrame: {
								visible: false,
								shape: {
									rgba: {
										r: colorInfos.arrColor[target].r,
										g: colorInfos.arrColor[target].g,
										b: colorInfos.arrColor[target].b,
										a: colorInfos.arrColor[target].a,
									}
								}

							}
						},
						{
							t: 0.25,
							keyFrame: {
								visible: true,
								shape: {
									rgba: {
										r: colorInfos.arrColor[target].r,
										g: colorInfos.arrColor[target].g,
										b: colorInfos.arrColor[target].b,
										a: colorInfos.arrColor[target].a,
									}
								}

							}
						},
						{
							t: 0.97,
							keyFrame: {
								visible: true,
								shape: {
									rgba: {
										r: colorInfos.arrColor[target].r,
										g: colorInfos.arrColor[target].g,
										b: colorInfos.arrColor[target].b,
										a: colorInfos.arrColor[target].a,
									}
								}

							}
						},
						{
							t: 1,
							keyFrame: {
								visible: false,
								shape: {
									rgba: {
										r: colorInfos.arrColor[target].r,
										g: colorInfos.arrColor[target].g,
										b: colorInfos.arrColor[target].b,
										a: colorInfos.arrColor[target].a,
									}
								}

							}
						}
					],

				}
				gameFuncs.op(opInfo1);
			}



		}



	},
	//第五关墙面动画
	addWold() {
		let opInfo = {
			opId: "addColor",
			opType: "addNode",
			//opNode: "one008",
			nodes: [{
				nodeId: "one008",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: false,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 11,
							y: 34
						},
						rb: {
							x: 12,
							y: 34
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 147,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "one009",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 10,
									y: 35
								},
								rb: {
									x: 10,
									y: 36
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}
					},
					{
						nodeId: "one010",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 13,
									y: 35
								},
								rb: {
									x: 13,
									y: 36
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}
					},
					{
						nodeId: "one011",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 11,
									y: 37
								},
								rb: {
									x: 12,
									y: 37
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one012",
						surface: "b",
						pt: {
							x: 9,
							y: 34
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one013",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 34
								},
								rb: {
									x: 7,
									y: 34
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one014",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 4,
									y: 35
								},
								rb: {
									x: 4,
									y: 39
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one099",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 8,
									y: 35
								},
								rb: {
									x: 8,
									y: 39
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 40
								},
								rb: {
									x: 7,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 1,
									y: 41
								},
								rb: {
									x: 2,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one096",
						surface: "b",
						pt: {
							x: 0,
							y: 40
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one095",
						surface: "b",
						pt: {
							x: 3,
							y: 40
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one094",
						surface: "b",
						pt: {
							x: 1,
							y: 39
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one093",
						surface: "b",
						pt: {
							x: 2,
							y: 38
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one092",
						surface: "b",
						pt: {
							x: 2,
							y: 37
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one091",
						surface: "b",
						pt: {
							x: 2,
							y: 36
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one090",
						surface: "b",
						pt: {
							x: 2,
							y: 34
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 0
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 147,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo)
	},

	//创建杂乱色块
	addColor() {
		if (levelInfos.level == 5) {
			colorFuncs.addWold()
		}
		luanList = []
		let awa = 0
		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 32; y++) {
				if (sjColor[x][y] == 0) {
					colornum++
					// engine.log(colornum)
					sjColor[x][y] = 1
					// if (awa != target) {
					// engine.log("是这个")
					if (levelInfos.level == 1) {
						switch (lunNum) {
							case 0:
								awa = noSame[0]
								break
							case 1:
								awa = noSame[0]
								break
							case 2:
								awa = noSame[0]
								break
							case 3:
								awa = noSame[Math.floor(Math.random() * 2)]
								break
							case 4:
								awa = noSame[Math.floor(Math.random() * 2)]
								break
							case 5:
								awa = noSame[Math.floor(Math.random() * 2)]
								break
							case 6:
								awa = noSame[Math.floor(Math.random() * 3)]
								break
							case 7:
								awa = noSame[Math.floor(Math.random() * 3)]
								break
							case 8:
								awa = noSame[Math.floor(Math.random() * 3)]
								break
							case 9:
								awa = noSame[Math.floor(Math.random() * 3)]
								break
						}

					} else if (levelInfos.level == 2 || levelInfos.level == 3) {
						awa = noSame[Math.floor(Math.random() * 4)]
					} else {
						awa = noSame[Math.floor(Math.random() * 7)]
					}
					fastop.addColor(x + "add" + y, "qwq" + colornum, x * 2, y * 2, colorInfos.arrColor[awa].r, colorInfos.arrColor[awa].g, colorInfos.arrColor[awa].b)
					luanList.push("qwq" + colornum)
				}
			}
		}
	},

	//添加假点
	addFaker() {
		if (fakernum != 0) {
			for (let i = 0; i < fakernum; i++) {
				targetnumm++
				let x = Math.floor(Math.random() * 8)
				let y = Math.floor(Math.random() * 16)
				while (sjColor[x][y] != 1) {
					x = Math.floor(Math.random() * 8)
					y = Math.floor(Math.random() * 16)
				}
				sjColor[x][y] = 3
				fastop.addColor(x + "add" + y, "faker" + targetnumm, x * 2, y * 2, colorInfos.arrColor[target].r, colorInfos.arrColor[target].g, colorInfos.arrColor[target].b)
				luanList.push("faker" + targetnumm)
			}
		}

	},


	fakerTap(nodeId) {
		//moveColor = 0
		arrColorSss[nodeId.toString()] = 1
		roomFunction.playSoundTivite(false, "wrong3", "negative")
		fastop.fakerChange("awa" + nodeId, nodeId)
		luanList = luanList.filter(item => item !== nodeId)
		setTimeout(() => {
			//moveColor = 1
			arrColorSss[nodeId.toString()] = 0
			fastop.removeNode("qwq" + nodeId, nodeId)
		}, 1000);
	},


	//判定错误并播放错误音效，减生命值。
	tapWrong(x, y) {
		wrongNum++
		tapPanding = 0
		for (let i = 1; i < target + 1; i++) {
			fastop.targetOff("qaq" + i, "target" + i)
		}
		if (nowInfos.lifeProtect == 0) {
			colorFuncs.wrongAnimation(x, y)
			nowInfos.lifeProtect = 1;
			setTimeout(function () {
				nowInfos.lifeProtect = 0
			}, 1000);
			colorFuncs.addBlink(x, y)
			usersInfos.UseLife++
			if (nowInfos.lifePoint > 1) {
				nowInfos.lifePoint--;
				gameRules.lifeMove();
				roomFunction.playSoundTivite(false, "wrong", "negative");
			} else if (nowInfos.lifePoint == 1) {
				nowInfos.lifePoint--;
				gameRules.lifeMove();
				roomFunction.playSoundTivite(false, "wrong", "negative");
				wanFa_color.gameLevelEnd()
			}
		}
	},
	tapWrong2(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff != false) {
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				usersInfos.UseLife++
				if (nowInfos.lifePoint > 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSoundTivite(false, "wrong", "negative");
				} else if (nowInfos.lifePoint == 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSoundTivite(false, "wrong", "negative");
					wanFa_color.gameLevelEnd()
				}
			}
		}
	},

	//成功动画
	rightAnimation() {
		engine.log("============正确动画")
		usersInfos.ValidTarget++
		let opInfo2 = {
			opId: "rightPlay",
			opType: "play",
			opNode: "right",
			timeLen: 1.5,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						shape: {
							rect: {
								lt: { x: 0, y: 0 },
								rb: { x: 1, y: 1 }
							},
							rgba: {
								r: colorInfos.arrColor[target].r,
								g: colorInfos.arrColor[target].g,
								b: colorInfos.arrColor[target].b,
								a: 1,
							}
						}
					}
				},
				{
					t: 0.5,
					keyFrame: {

						shape: {
							rect: {
								lt: { x: -16, y: -42 },
								rb: { x: 16, y: 42 }
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false

					}
				}
			]
		}
		gameFuncs.op(opInfo2);
	},
	addBlink(x, y) {
		fastop.addNode("addBlink" + x + "_" + y, "wrongBlink" + x + "_" + y, "b", x, y, 254, 254, 0)
		setTimeout(() => {
			let opInfo = {
				opId: "doWrongBlink" + x + "_" + y,
				opType: "play",
				opNode: "wrongBlink" + x + "_" + y,
				timeLen: 1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 0,
									a: 1
								}
							}

						}
					},
					{
						t: 0.2,
						keyFrame: {
							shape: {
								rgba: {
									r: 254,
									g: 0,
									b: 0,
									a: 1
								}
							}

						}
					},
					{
						t: 0.4,
						keyFrame: {
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 0,
									a: 1
								}
							}

						}
					},
					{
						t: 0.6,
						keyFrame: {
							shape: {
								rgba: {
									r: 254,
									g: 0,
									b: 0,
									a: 1
								}
							}

						}
					},
					{
						t: 0.8,
						keyFrame: {
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 0,
									a: 1
								}
							}

						}
					},
					{
						t: 1,
						keyFrame: {
							shape: {
								rgba: {
									r: 254,
									g: 0,
									b: 0,
									a: 1
								}
							}

						}
					},

				]
			}
			gameFuncs.op(opInfo);
			setTimeout(() => {
				fastop.removeNode("rmBlink" + x + "_" + y, "wrongBlink" + x + "_" + y)
			}, 1000);
		}, 100);
	},
	//失败动画
	wrongAnimation(x, y) {

		engine.log("============错误动画")

		let opInfo2 = {
			opId: "wrongPlay",
			opType: "play",
			opNode: "wrong",
			timeLen: 2,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: x,
							y: y,
						},
						visible: true,
						shape: {
							rect: {
								lt: { x: 0, y: 0 },
								rb: { x: 1, y: 1 }
							}
						}
					}
				},
				{
					t: 0.5,
					keyFrame: {

						shape: {
							rect: {
								lt: { x: -16, y: -42 },
								rb: { x: 16, y: 42 }
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false
					}
				}
			]
		}
		gameFuncs.op(opInfo2);
	},
	ScorePlay() {
		let opInfo1 = {
			opId: "screenScorePlay",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_3b01",
				block1: {
					model: "dis_b_targetColor",
					label1: "目标",
					value1: colorInfos.arrColor[target].value,
					label2: colorInfos.arrColor[target].color,
				},
				block2: {
					model: "dis_b_scoreGame",
					label2: "关卡总分",
					value2: usersInfos.levelScore
				},
				block3: {
					model: "dis_b_scoreGame",
					value1: colorInfos.arrColor[target].value2,
				}
			}
		}
		gameFuncs.op(opInfo1);
	},

	ScorePlay2() {
		let opInfo1 = {
			opId: "screenScorePlay",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_3b01",
				block1: {
					model: "dis_b_targetColor",
					label1: "目标",
					value1: colorInfos.arrColor2[target].value,
					label2: colorInfos.arrColor2[target].color,
				},
				block2: {
					model: "dis_b_scoreGame",
					label2: "关卡总分",
					value2: usersInfos.levelScore
				},
				block3: {
					model: "dis_b_scoreGame",
					value1: colorInfos.arrColor2[target].value2,
				}
			}
		}
		gameFuncs.op(opInfo1);
	},
	//动态红色
	sixRedMove() {
		switch (levelInfos.level) {
			case 8:
				let opInfo4 = {
					opId: "addRed",
					opType: "addNode",
					opNode: "",
					nodes: [{
						nodeId: "red003",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 31
								},
								rb: {
									x: 15,
									y: 31
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					}]
				}
				gameFuncs.op(opInfo4)
				let opInfo5 = {
					opId: "redMove",
					opType: "play",
					opNode: "red003",
					timeLen: 8,
					loop: "false",
					keyFrames: [

						{
							t: 1,
							keyFrame: {
								visible: "true",
								canTap: "true",
								// surface: "a",
								shape: {
									type: "rect",
									rect: {
										lt: {
											x: 0,
											y: 0
										},
										rb: {
											x: 15,
											y: 0
										}
									}
								}
							}
						},
						{
							t: 1,
							keyFrame: {
								visible: "false",
								canTap: "false",
								// surface: "a",
							}
						}
					]
				}
				gameFuncs.op(opInfo5);
				break
			case 9:
				let opInfo6 = {
					opId: "addRed",
					opType: "addNode",
					opNode: "",
					nodes: [{
						nodeId: "red004",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 15,
									y: 0
								},
								rb: {
									x: 15,
									y: 31
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					}]
				}
				gameFuncs.op(opInfo6)
				let opInfo7 = {
					opId: "redMove",
					opType: "play",
					opNode: "red004",
					timeLen: 7,
					loop: "false",
					keyFrames: [

						{
							t: 1,
							keyFrame: {
								visible: "true",
								canTap: "true",
								// surface: "a",
								shape: {
									type: "rect",
									rect: {
										lt: {
											x: 0,
											y: 0
										},
										rb: {
											x: 0,
											y: 31
										}
									}
								}
							}
						},
						{
							t: 1,
							keyFrame: {
								visible: "false",
								canTap: "false",
								// surface: "a",
							}
						}
					]
				}
				gameFuncs.op(opInfo7);
				break
			case 10:
				let opInfo8 = {
					opId: "addRed",
					opType: "addNode",
					opNode: "",
					nodes: [{
						nodeId: "red005",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 31
								},
								rb: {
									x: 15,
									y: 31
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					}]
				}
				gameFuncs.op(opInfo8)
				let opInfo9 = {
					opId: "redMove",
					opType: "play",
					opNode: "red005",
					timeLen: 8,
					loop: "false",
					keyFrames: [

						{
							t: 1,
							keyFrame: {
								visible: "true",
								canTap: "true",
								// surface: "a",
								shape: {
									type: "rect",
									rect: {
										lt: {
											x: 0,
											y: 0
										},
										rb: {
											x: 15,
											y: 0
										}
									}
								}
							}
						},
						{
							t: 1,
							keyFrame: {
								visible: "false",
								canTap: "false",
								// surface: "a",
							}
						}
					]
				}
				gameFuncs.op(opInfo9);
				let opInfo10 = {
					opId: "addRed",
					opType: "addNode",
					opNode: "",
					nodes: [{
						nodeId: "red006",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 15,
									y: 0
								},
								rb: {
									x: 15,
									y: 31
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					}]
				}
				gameFuncs.op(opInfo10)
				let opInfo11 = {
					opId: "redMove",
					opType: "play",
					opNode: "red006",
					timeLen: 8,
					loop: "false",
					keyFrames: [

						{
							t: 1,
							keyFrame: {
								visible: "true",
								canTap: "true",
								// surface: "a",
								shape: {
									type: "rect",
									rect: {
										lt: {
											x: 0,
											y: 0
										},
										rb: {
											x: 0,
											y: 31
										}
									}
								}
							}
						},
						{
							t: 1,
							keyFrame: {
								visible: "false",
								canTap: "false",
								// surface: "a",
							}
						}
					]
				}
				gameFuncs.op(opInfo11);
				break
		}
	},
}
