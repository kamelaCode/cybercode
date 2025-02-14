const wanFa_haiPlus = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_haiPlus.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_haiPlus.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_haiPlus.gameDestroy);
		//重置全局变量
		haiPlusFuncs.resetAll()
		clearInterval(haiPlusFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}


		engine.log("!!!gameIdList!!!=" + levelInfos.gameIdList)


		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_haiPlus.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("hai")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						roomFunction.playSound(true, "haiPlusBgm02", "background")
						haiPlusFuncs.CountPlay();
					}
					break;
				case 17:
					clearInterval(wanFa_haiPlus.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);


		// setTimeout(function () {
		// 	if (levelInfos.wanFa.startsWith("hai")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 		roomFunction.playSound(true, "haiPlusBgm02", "background")
		// 		haiPlusFuncs.CountPlay();
		// 	}
		// }, sec * 1000);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(0, 5000);
		// 	roomFunction.playSound(false, "gamestart");
		// }, 3500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_haiPlus.gameTaped)
		clearInterval(wanFa_haiPlus.gamePlay.lyc)
		engine.log("-------------------" + gameid)
		fastop.addNode("addStop", "StopRed", "a", 0, 0, 254, 254, 0)
		if (gameid.startsWith("hai")) {
			gameRules.lifeMove();
			haiPlusFuncs.CountPlay()
			haiPlusFuncs.ScorePlay()
			clearInterval(haiPlusFuncs.tiaoWin.Athree)
			clearNum = 0

			if (gameid == "haiColor-cxx") {
				roomFunction.playSoundTivite(false, "wrong3", "negative")
				haiPlusFuncs.addRed7() // lose
			}
			if (gameid != "haiColor-cxx") {
				nowInfos.nowGameid = gameid
				if (levelInfos.level == 1) {
					if (gameid == "haiPlus0011-hf") {
						let arr2023 = [4, 3, 4, 4, 4, 5, 4, 6, 4, 7, 4, 8, 4, 10, 4, 11, 4, 12, 4, 13, 4, 14, 4, 15, 4, 17, 4, 18, 4, 19, 4, 20, 4, 21, 4, 22, 4, 24, 4, 25, 4, 26, 4, 27, 4, 28, 4, 29, 5, 3, 5, 10, 5, 15, 5, 17, 5, 29, 6, 3, 6, 10, 6, 15, 6, 17, 6, 29, 7, 3, 7, 10, 7, 15, 7, 17, 7, 29, 8, 3, 8, 4, 8, 5, 8, 6, 8, 7, 8, 8, 8, 10, 8, 15, 8, 17, 8, 18, 8, 19, 8, 20, 8, 21, 8, 22, 8, 24, 8, 25, 8, 26, 8, 27, 8, 28, 8, 29, 9, 8, 9, 10, 9, 15, 9, 22, 9, 29, 10, 8, 10, 10, 10, 15, 10, 22, 10, 29, 11, 8, 11, 10, 11, 15, 11, 22, 11, 29, 12, 3, 12, 4, 12, 5, 12, 6, 12, 7, 12, 8, 12, 10, 12, 11, 12, 12, 12, 13, 12, 14, 12, 15, 12, 17, 12, 18, 12, 19, 12, 20, 12, 21, 12, 22, 12, 24, 12, 25, 12, 26, 12, 27, 12, 28, 12, 29]
						engine.log(" arr2023.length" + arr2023.length / 2)
						for (let i = 0; i < arr2023.length; i += 2) {
							let opInfo = {
								opId: "blue" + (i + 1), //操作id 再控制用
								opType: "addNode", // 操作类型，添加一个节点或精灵
								opNode: "mubiao001", // 父节点，如果没有配置，默认到棋盘根节点0,0
								nodes: [
									{
										nodeId: "blue" + (i + 1), // 节点id，定位用
										surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
										// node参数
										pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
										rotation: 0, // 角度
										nodes: [], // 子节点
										canTap: true,
										visible: true, //显示，如果为false，逻辑数据会跳过
										shape: {
											"type": "point",
											"points": [
												{
													"x": arr2023[i],
													"y": arr2023[i + 1]
												}
											],
											"rgba": {
												"r": 0,
												"g": 0,
												"b": 254,
												"a": 1
											},
											"onOff": true
										}
									}
								]
							}
							gameFuncs.op(opInfo);

						}
						nowInfos.target = 98
					}
					if (gameid == "haiPlus0010-hf") {
						let arr2024 = [4, 3, 4, 4, 4, 5, 4, 6, 4, 7, 4, 8, 4, 10, 4, 11, 4, 12, 4, 13, 4, 14, 4, 15, 4, 17, 4, 18, 4, 19, 4, 20, 4, 21, 4, 22, 4, 27, 4, 28, 5, 3, 5, 10, 5, 15, 5, 17, 5, 27, 5, 28, 6, 3, 6, 10, 6, 15, 6, 17, 6, 27, 6, 28, 7, 3, 7, 10, 7, 15, 7, 17, 7, 27, 7, 28, 8, 3, 8, 4, 8, 5, 8, 6, 8, 7, 8, 8, 8, 10, 8, 15, 8, 17, 8, 18, 8, 19, 8, 20, 8, 21, 8, 22, 8, 24, 8, 25, 8, 26, 8, 27, 8, 28, 8, 29, 8, 30, 9, 8, 9, 10, 9, 15, 9, 22, 9, 24, 9, 25, 9, 27, 9, 28, 10, 8, 10, 10, 10, 15, 10, 22, 10, 24, 10, 25, 10, 27, 10, 28, 11, 8, 11, 10, 11, 15, 11, 22, 11, 24, 11, 25, 11, 27, 11, 28, 12, 3, 12, 4, 12, 5, 12, 6, 12, 7, 12, 8, 12, 10, 12, 11, 12, 12, 12, 13, 12, 14, 12, 15, 12, 17, 12, 18, 12, 19, 12, 20, 12, 21, 12, 22, 12, 24, 12, 25, 12, 27, 12, 28]
						engine.log(" arr2024.length" + arr2024.length / 2)
						for (let i = 0; i < arr2024.length; i += 2) {
							let opInfo = {
								opId: "blue" + (i + 1), //操作id 再控制用
								opType: "addNode", // 操作类型，添加一个节点或精灵
								opNode: "mubiao001", // 父节点，如果没有配置，默认到棋盘根节点0,0
								nodes: [
									{
										nodeId: "blue" + (i + 1), // 节点id，定位用
										surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
										// node参数
										pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
										rotation: 0, // 角度
										nodes: [], // 子节点
										canTap: true,
										visible: true, //显示，如果为false，逻辑数据会跳过
										shape: {
											"type": "point",
											"points": [
												{
													"x": arr2024[i],
													"y": arr2024[i + 1]
												}
											],
											"rgba": {
												"r": 0,
												"g": 0,
												"b": 254,
												"a": 1
											},
											"onOff": true
										}
									}
								]
							}
							gameFuncs.op(opInfo);

						}
						nowInfos.target = 104
					}
					if (gameid == "haiPlus001-cxx") {
						nowInfos.target = 86

					}
					if (gameid == "haiPlus002-cxx") {
						nowInfos.target = 50
					}
					if (gameid == "haiPlus004-cxx") {
						nowInfos.target = 56
						// roomFunction.playSound(true,"haiPlusBgm03")
						//roomFunction.stopSound(levelInfos.level == 1 ? "haiPlusBgm02" : "")

					}
					if (gameid == "haiPlus006-cxx") {
						nowInfos.target = 92
					}
					if (gameid == "haiPlus007-cxx") {
						nowInfos.target = 30
						// roomFunction.stopSound("haiPlusBgm03")
						// roomFunction.playSound(true,"haiPlusBgm")
						//roomFunction.stopSound(levelInfos.level == 1 ? "haiPlusBgm03" : "")

					}
					if (gameid == "haiPlus008-cxx") {
						nowInfos.target = 52
					}
					if (gameid == "haiPlus009-cxx") {
						nowInfos.target = 68
					}
					if (gameid == "haiPlus010-cxx") {
						nowInfos.target = 54
					}
				} else if (levelInfos.level == 2) {

					if (gameid == "hai009PlusTwo-cxx") {
						nowInfos.target = 50
					}
					if (gameid == "hai014PlusTwo-cxx") {

						nowInfos.target = 30
					}
					if (gameid == "hai012PlusTwo-cxx") {
						nowInfos.target = 56
					}
					if (gameid == "hai019PlusTwo-cxx") {
						let arr2023 = [4, 3, 4, 4, 4, 5, 4, 6, 4, 7, 4, 8, 4, 10, 4, 11, 4, 12, 4, 13, 4, 14, 4, 15, 4, 17, 4, 18, 4, 19, 4, 20, 4, 21, 4, 22, 4, 24, 4, 25, 4, 26, 4, 27, 4, 28, 4, 29, 5, 3, 5, 10, 5, 15, 5, 17, 5, 29, 6, 3, 6, 10, 6, 15, 6, 17, 6, 29, 7, 3, 7, 10, 7, 15, 7, 17, 7, 29, 8, 3, 8, 4, 8, 5, 8, 6, 8, 7, 8, 8, 8, 10, 8, 15, 8, 17, 8, 18, 8, 19, 8, 20, 8, 21, 8, 22, 8, 24, 8, 25, 8, 26, 8, 27, 8, 28, 8, 29, 9, 8, 9, 10, 9, 15, 9, 22, 9, 29, 10, 8, 10, 10, 10, 15, 10, 22, 10, 29, 11, 8, 11, 10, 11, 15, 11, 22, 11, 29, 12, 3, 12, 4, 12, 5, 12, 6, 12, 7, 12, 8, 12, 10, 12, 11, 12, 12, 12, 13, 12, 14, 12, 15, 12, 17, 12, 18, 12, 19, 12, 20, 12, 21, 12, 22, 12, 24, 12, 25, 12, 26, 12, 27, 12, 28, 12, 29]
						engine.log(" arr2023.length" + arr2023.length / 2)
						for (let i = 0; i < arr2023.length; i += 2) {
							let opInfo = {
								opId: "blue" + (i + 1), //操作id 再控制用
								opType: "addNode", // 操作类型，添加一个节点或精灵
								opNode: "mubiao001", // 父节点，如果没有配置，默认到棋盘根节点0,0
								nodes: [
									{
										nodeId: "blue" + (i + 1), // 节点id，定位用
										surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
										// node参数
										pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
										rotation: 0, // 角度
										nodes: [], // 子节点
										canTap: true,
										visible: true, //显示，如果为false，逻辑数据会跳过
										shape: {
											"type": "point",
											"points": [
												{
													"x": arr2023[i],
													"y": arr2023[i + 1]
												}
											],
											"rgba": {
												"r": 0,
												"g": 0,
												"b": 254,
												"a": 1
											},
											"onOff": true
										}
									}
								]
							}
							gameFuncs.op(opInfo);

						}
						nowInfos.target = 98
					}
					if (gameid == "hai013PlusTwo-cxx") {
						let arr2024 = [4, 3, 4, 4, 4, 5, 4, 6, 4, 7, 4, 8, 4, 10, 4, 11, 4, 12, 4, 13, 4, 14, 4, 15, 4, 17, 4, 18, 4, 19, 4, 20, 4, 21, 4, 22, 4, 27, 4, 28, 5, 3, 5, 10, 5, 15, 5, 17, 5, 27, 5, 28, 6, 3, 6, 10, 6, 15, 6, 17, 6, 27, 6, 28, 7, 3, 7, 10, 7, 15, 7, 17, 7, 27, 7, 28, 8, 3, 8, 4, 8, 5, 8, 6, 8, 7, 8, 8, 8, 10, 8, 15, 8, 17, 8, 18, 8, 19, 8, 20, 8, 21, 8, 22, 8, 24, 8, 25, 8, 26, 8, 27, 8, 28, 8, 29, 8, 30, 9, 8, 9, 10, 9, 15, 9, 22, 9, 24, 9, 25, 9, 27, 9, 28, 10, 8, 10, 10, 10, 15, 10, 22, 10, 24, 10, 25, 10, 27, 10, 28, 11, 8, 11, 10, 11, 15, 11, 22, 11, 24, 11, 25, 11, 27, 11, 28, 12, 3, 12, 4, 12, 5, 12, 6, 12, 7, 12, 8, 12, 10, 12, 11, 12, 12, 12, 13, 12, 14, 12, 15, 12, 17, 12, 18, 12, 19, 12, 20, 12, 21, 12, 22, 12, 24, 12, 25, 12, 27, 12, 28]
						engine.log(" arr2024.length" + arr2024.length / 2)
						for (let i = 0; i < arr2024.length; i += 2) {
							let opInfo = {
								opId: "blue" + (i + 1), //操作id 再控制用
								opType: "addNode", // 操作类型，添加一个节点或精灵
								opNode: "mubiao001", // 父节点，如果没有配置，默认到棋盘根节点0,0
								nodes: [
									{
										nodeId: "blue" + (i + 1), // 节点id，定位用
										surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
										// node参数
										pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
										rotation: 0, // 角度
										nodes: [], // 子节点
										canTap: true,
										visible: true, //显示，如果为false，逻辑数据会跳过
										shape: {
											"type": "point",
											"points": [
												{
													"x": arr2024[i],
													"y": arr2024[i + 1]
												}
											],
											"rgba": {
												"r": 0,
												"g": 0,
												"b": 254,
												"a": 1
											},
											"onOff": true
										}
									}
								]
							}
							gameFuncs.op(opInfo);

						}
						nowInfos.target = 104
					}
					if (gameid == "hai0330PlusTwo-cxx") {
						nowInfos.target = 52
					}
					if (gameid == "hai0260PlusTwo-cxx") {
						nowInfos.target = 86
					}
					if (gameid == "hai0370PlusTwo-cxx") {
						nowInfos.target = 92
					}
					if (gameid == "hai0060PlusTwo-cxx") {
						nowInfos.target = 68
					}
					if (gameid == "hai0750PlusTwo-cxx") {
						nowInfos.target = 54
					}
				}
				wanFa_haiPlus.gamePlay.clearTime = setTimeout(() => {
					switch (guole) {
						case 0:
							haiPlusFuncs.addRed8()
							roomFunction.playSound(false, "levelOne")
							break;
						case 1:
							haiPlusFuncs.num2()
							roomFunction.playSound(false, "levelTwo")
							break;
						case 2:
							haiPlusFuncs.num3()
							roomFunction.playSound(false, "levelThree")
							break;
						case 3:
							haiPlusFuncs.addRed9()
							roomFunction.playSound(false, "levelFour")
							break;
						case 4:
							haiPlusFuncs.addRed10()
							roomFunction.playSound(false, "levelFive")
							break;
						case 5:
							haiPlusFuncs.addRed11()
							roomFunction.playSound(false, "levelSix")
							break;
						case 6:
							haiPlusFuncs.addRed12()
							roomFunction.playSound(false, "levelSeven")
							break;
						case 7:
							haiPlusFuncs.addRed13()
							roomFunction.playSound(false, "levelEight")
							break;
						case 8:
							haiPlusFuncs.addRed14()
							roomFunction.playSound(false, "levelNine")
							break;
						case 9:
							haiPlusFuncs.addRed15()
							roomFunction.playSound(false, "levelTen")
							break;
					}
				}, 6700);
				setTimeout(() => {
					engine.log("????????????")
					change = 0
				}, 5000);

			}
			if (gameid == "hai017-ljc") {
				nowInfos.target = 24
				setTimeout(() => {
					haiPlusFuncs.blueFor()
				}, 6000);
			}
			if (gameid == "hai17-cxx") {
				setTimeout(() => {
					haiPlusFuncs.randomBlue2(15)
					wanFa_haiPlus.gamePlay.haipro = setInterval(() => {
						haiPlusFuncs.randomBlue2(15)
					}, 10000);
				}, 6000);

			}
			//nowInfos.target = 2
		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (nowInfos.nowGameid.startsWith("hai")) {
			//engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			haiPlusFuncs.blueTap(face, x, y, onOff, nodeId, event);
			haiPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			haiPlusFuncs.gameEndControl(face, x, y, onOff, nodeId, event)
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(haiPlusFuncs.tapWrong.determine)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(haiPlusFuncs.CountPlay.innerCount)
		clearInterval(wanFa_haiPlus.gamePlay.haipro)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			wanFa_haiPlus.gameLevelEnd()
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(haiPlusFuncs.CountPlay.innerCount)
		clearInterval(haiPlusFuncs.tapWrong.awa)
		clearInterval(haiPlusFuncs.tiaoWin.Athree)
		clearInterval(wanFa_haiPlus.gamePlay.haipro)
		clearInterval(wanFa_haiPlus.gamePlay.lyc)
		clearTimeout(wanFa_haiPlus.gamePlay.clearTime)
		fastop.removeNode("rmNode", "StopRed")
		roomFunction.stopSound("haiPlusBgm02")

		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teachBlue2")
		roomFunction.stopSound("teachRed")
		roomFunction.stopSound("teachBlue")
		roomFunction.stopSound("fenwei")
		roomFunction.stopSound("award")
		roomFunction.stopSound("tishi6")
		roomFunction.stopSound("fenwei2")
		roomFunction.stopSound("fenwei3")
		roomFunction.stopSound("tishi8")
		roomFunction.stopSound("tishi9")
		roomFunction.stopSound("tishi10")
		//roomFunction.stopSound("shizhong")
		roomFunction.goToGameLevel("leave_hold", "none")
		haiPlusFuncs.rmAllListener()
		wanFaCtl_haiPlusCtl.gameEndCtl(usersInfos.levelScore)
		levelInfos.gameIdList = []
		let str = gameFuncs.playingAudioIds()
		let arr = JSON.parse(str)
		let soundName = arr?.map(item => item.slice(item.indexOf('d') + 1))
		engine.log(arr)

		engine.log(soundName)
		soundName?.map(item => {
			roomFunction.stopSound(item)
		})
		clearNum = 999
	}

}




const haiPlusFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 240;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		one11 = 0
		two11 = 0
		three11 = 0
		four11 = 0
		five11 = 0
		six11 = 0
		seven11 = 0
		eight11 = 0
		nine11 = 0
		ten11 = 0
		nowGameCout = 0
		aaa = 0
		guole = 0
		cuowu = 0
		clearNum = 0
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_haiPlus.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_haiPlus.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_haiPlus.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_haiPlus.gameTaped)
	},
	gameEndControl(face, x, y, onOff, nodeId, event) {
		if (nodeId == "StopRed" && onOff == true) {
			engine.log("开始定时器")
			haiPlusFuncs.gameEndControl.haha = setTimeout(() => {
				wanFa_haiPlus.gameLevelEnd()
				roomFunction.stopSound("haiPlusBgm02")
			}, 10000);
		}
		if (nodeId == "StopRed" && onOff == false) {
			engine.log("清除定时器")
			clearTimeout(haiPlusFuncs.gameEndControl.haha)
		}
	},

	//生日惊喜定制
	// happyBegin() {
	// 	clearTimeout(wanFa_haiPlus.gamePlay.clearTime)
	// 	fastop.addNode("addStop", "StopRed", "a", 0, 0, 254, 254, 0)
	// 	engine.removeEventListener("gamePlay", wanFa_haiPlus.gamePlay)
	// 	haiPlusFuncs.happyBegin.happy = setTimeout(() => {
	// 		roomFunction.stopSound("haiPlusBgm02")
	// 		roomFunction.playSound(true, "happil", "background")
	// 		roomFunction.goToGameLevel("haisrkl-JA-cxx", "none")
	// 		nowInfos.gameCountTime = 999;
	// 	}, 1000);
	// 	if (nodeId == "StopRed" && onOff == false) {
	// 		engine.log("清除定时器")
	// 		clearTimeout(haiPlusFuncs.happyBegin.happy)
	// 	}

	// },
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true && cuowu == 0) {
				// setTimeout(() => {
				// 	haiPlusFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				haiPlusFuncs.tapWrong.determine = setTimeout(() => {
					haiPlusFuncs.addBlink(x, y)
					usersInfos.UseLife++
					if (nowInfos.lifePoint > 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.playSound(false, "wrong", "negative");
						if (nowInfos.lifePoint == 3) {
							roomFunction.playSound(false, "life")
						}
					} else if (nowInfos.lifePoint == 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.playSound(false, "wrong", "negative");
						engine.log("lose动画----------32go动画--------重启这关")
						usersInfos.RetryCount++
						usersInfos.gameScore = 0
						//lose动画
						cuowu = 1
						roomFunction.goToGameLevel("haiColor-cxx", "none")
						haiPlusFuncs.tapWrong.awa = setTimeout(() => {
							if (nowInfos.gameCountTime <= 0) {
								clearTimeout(haiPlusFuncs.tapWrong.awa)
								return
							}
							switch (guole) {
								case 0:
									one11 = 0
									break;
								case 1:
									two11 = 0
								case 2:
									three11 = 0
									break;
								case 3:
									four11 = 0
									break;
								case 4:
									five11 = 0
									break;
								case 5:
									six11 = 0
									break;
								case 6:
									seven11 = 0
								case 7:
									eight11 = 0
									break;
								case 8:
									nine11 = 0
									break;
								case 9:
									ten11 = 0
									break;
							}
							roomFunction.goToGameLevel(nowInfos.nowGameid, "none")

							nowInfos.lifePoint = 6
							gameRules.lifeMove();
							cuowu = 0
							// roomFunction.goToGameLevel("haiColor-cxx", "none")//32go
							engine.log(nowInfos.nowGameid)
							if (nowInfos.nowGameid != "haizhibo001-hf") {
								setTimeout(() => {
									haiPlusFuncs.tiaoWin()
									nowInfos.allTarget = 0
								}, 1000);
							}

						}, 2000);
					}
				}, 75);

			}

		}
	},
	blueFor() {
		for (let i = 1; i < 25; i++) {
			let opInfo1 = {
				opId: "blue" + i,
				opType: "play",
				opNode: "blue" + i,
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: true
						}
					}
				]
			}
			gameFuncs.op(opInfo1)
		}
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

	tiaoWin() {
		if (clearNum == 999) {
			clearInterval(haiPlusFuncs.tiaoWin.Athree)
			return
		}
		roomFunction.playSoundTivite(false, "321Go", "positive")
		haiPlusFuncs.addRed5()
		haiPlusFuncs.tiaoWin.Athree = setInterval(() => {
			clearNum++
			switch (clearNum) {
				case 1:
					haiPlusFuncs.oneFor()
					haiPlusFuncs.addRed6()
					break;
				case 2:
					haiPlusFuncs.oneFor1()
					haiPlusFuncs.addRed90()
					break;
				case 3:
					haiPlusFuncs.oneFor90()
					haiPlusFuncs.addRed3()
					haiPlusFuncs.addRed4()
					break;
			}
		}, 1000);
	},
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		//engine.log(nodeId)
		if (nodeId.startsWith("blue") || nodeId.startsWith("mubiao001.blue") || nodeId.startsWith("mubiao002.blue") || nodeId.startsWith("mubiao003.blue")) {
			if (onOff == true) {
				usersInfos.ValidTarget++


				if (nowInfos.target > 1) {
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSoundTivite(false, "ok", "positive")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					// usersInfos.levelScore += nowInfos.scoreCoefficient;
					haiPlusFuncs.ScorePlay()

				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						// usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiPlusFuncs.ScorePlay();
						//nowInfos.gameCountTime += 30
						change = 1//过长动画时间暂停
						engine.log("32go--------next")
						winLose = 0
						nowGameCout = nowInfos.gameCountTime
						engine.log("nowGameCout-----===" + nowGameCout)
						// roomFunction.goToGameLevel("haiColor-cxx", "none")//32go
						// setTimeout(() => {
						switch (guole) {
							case 0:
								one11 = parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = one11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 1:
								two11 = one11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = two11
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 2:
								three11 = two11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = three11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 3:
								four11 = three11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = four11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 4:
								five11 = four11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = five11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 5:
								six11 = five11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = six11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 6:
								seven11 = six11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = seven11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
							case 7:
								eight11 = seven11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = eight11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 8:
								nine11 = eight11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = nine11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 9:
								ten11 = nine11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = ten11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
						}
						guole++
						engine.log(guole + "[][][[[][][][][][][]")

						roomFunction.goToNextGame();
						clearInterval(haiPlusFuncs.tiaoWin.Athree)
						setTimeout(() => {
							haiPlusFuncs.tiaoWin()
							nowInfos.allTarget = 0
						}, 1500);
						roomFunction.stopSound("fenwei")
						roomFunction.playSound(false, "levelup", "positive")
						// }, 2000);
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowGameCout = nowInfos.gameCountTime
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						// usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiPlusFuncs.ScorePlay()
						switch (guole) {
							case 0:
								one11 = parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = one11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 1:
								two11 = one11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = two11
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 2:
								three11 = two11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = three11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 3:
								four11 = three11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = four11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 4:
								five11 = four11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = five11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 5:
								six11 = five11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = six11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 6:
								seven11 = six11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = seven11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
							case 7:
								eight11 = seven11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = eight11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 8:
								nine11 = eight11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = nine11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
							case 9:
								ten11 = nine11 + parseInt((nowGameCout / 10) + (nowInfos.allTarget / 5))
								usersInfos.levelScore = ten11;
								engine.log("usersInfos.levelScore-----===" + usersInfos.levelScore)
								break;
						}
						guole++

						engine.log(guole + "[][][[[][][][][][][]")

						wanFa_haiPlus.gameLevelEnd();
					}
				}
			}
		}
	},
	oneFor() {
		let opInfo1 = {
			opId: "one222",
			opType: "play",
			opNode: "one222",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: false,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo1)
	},
	oneFor1() {
		let opInfo2 = {
			opId: "one223",
			opType: "play",
			opNode: "one223",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: false,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo2)
	},
	oneFor90() {
		let opInfo2 = {
			opId: "one01",
			opType: "play",
			opNode: "one01",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: false,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo2)
	},
	addRed3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "go001",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 11,
							y: 33
						},
						rb: {
							x: 13,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "go002",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 10,
									y: 34
								},
								rb: {
									x: 10,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go003",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 11,
									y: 40
								},
								rb: {
									x: 13,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go004",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 14,
									y: 37
								},
								rb: {
									x: 14,
									y: 39
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go005",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 12,
									y: 36
								},
								rb: {
									x: 13,
									y: 36
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go006",
						surface: "b",
						pt: {
							x: 11,
							y: 37
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},

				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed4() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "go007",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 5,
							y: 34
						},
						rb: {
							x: 6,
							y: 34
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "go008",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 3,
									y: 36
								},
								rb: {
									x: 3,
									y: 38
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go009",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 8,
									y: 36
								},
								rb: {
									x: 8,
									y: 38
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go010",
						surface: "b",
						pt: {
							x: 4,
							y: 35
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go011",
						surface: "b",
						pt: {
							x: 7,
							y: 35
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go012",
						surface: "b",
						pt: {
							x: 4,
							y: 39
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go013",
						surface: "b",
						pt: {
							x: 7,
							y: 39
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go014",
						surface: "b",
						pt: {
							x: 1,
							y: 33
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go015",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 1,
									y: 36
								},
								rb: {
									x: 1,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go016",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 40
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},


				]
			}]
		}
		gameFuncs.op(opInfo1)

		setTimeout(() => {
			fastop.removeNode("nmd", "go001")
			fastop.removeNode("cnmd", "go007")
		}, 2000);

	},
	//数字3
	addRed5() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one222",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 7,
							y: 33
						},
						rb: {
							x: 8,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "one002",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 34
								},
								rb: {
									x: 6,
									y: 36
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "one003",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 37
								},
								rb: {
									x: 8,
									y: 37
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "one004",
						surface: "b",
						pt: {
							x: 9,
							y: 34
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one005",
						surface: "b",
						pt: {
							x: 9,
							y: 40
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one006",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 38
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one007",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 41
								},
								rb: {
									x: 8,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字2
	addRed6() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one223",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 6,
							y: 33
						},
						rb: {
							x: 8,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
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
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 9,
									y: 33
								},
								rb: {
									x: 9,
									y: 35
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
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
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 38
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "one011",
						surface: "b",
						pt: {
							x: 8,
							y: 36
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one012",
						surface: "b",
						pt: {
							x: 7,
							y: 37
						},
						visible: true,
						canTap: true,
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
								b: 0,
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
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 41
								},
								rb: {
									x: 8,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one014",
						surface: "b",
						pt: {
							x: 9,
							y: 40
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed7() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "lose001",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 0,
							y: 34
						},
						rb: {
							x: 2,
							y: 34
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "lose0099999999",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "lose002",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 2,
									y: 35
								},
								rb: {
									x: 2,
									y: 39
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "lose003",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 37
								},
								rb: {
									x: 1,
									y: 37
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "lose004",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 40
								},
								rb: {
									x: 2,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose005",
						surface: "b",
						pt: {
							x: 7,
							y: 35
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose006",
						surface: "b",
						pt: {
							x: 4,
							y: 39
						},
						visible: true,
						canTap: true,
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
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose007",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 34
								},
								rb: {
									x: 6,
									y: 34
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose008",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 4,
									y: 35
								},
								rb: {
									x: 4,
									y: 36
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose009",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 37
								},
								rb: {
									x: 6,
									y: 37
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose010",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 38
								},
								rb: {
									x: 7,
									y: 39
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose011",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 40
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose012",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 10,
									y: 34
								},
								rb: {
									x: 11,
									y: 34
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose013",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 9,
									y: 35
								},
								rb: {
									x: 9,
									y: 39
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose014",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 12,
									y: 35
								},
								rb: {
									x: 12,
									y: 39
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose015",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 10,
									y: 40
								},
								rb: {
									x: 11,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose016",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 13,
									y: 34
								},
								rb: {
									x: 15,
									y: 34
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose017",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 15,
									y: 35
								},
								rb: {
									x: 15,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字3
	num3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [
				{
					nodeId: "one001",
					surface: "b",
					pt: {
						x: 0,
						y: 0
					},
					visible: true,
					canTap: true,
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 7,
								y: 33
							},
							rb: {
								x: 8,
								y: 33
							}
						},
						rgba: {
							r: 254,
							g: 69,
							b: 0,
							a: 1
						}
					},
					nodes: [
						{
							nodeId: "one002",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},

							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 6,
										y: 34
									},
									rb: {
										x: 6,
										y: 36
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}
						},
						{
							nodeId: "one003",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},
							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 7,
										y: 37
									},
									rb: {
										x: 8,
										y: 37
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}
						},
						{
							nodeId: "one004",
							surface: "b",
							pt: {
								x: 9,
								y: 34
							},
							visible: true,
							canTap: true,
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
									g: 69,
									b: 0,
									a: 1
								}
							}

						},
						{
							nodeId: "one005",
							surface: "b",
							pt: {
								x: 9,
								y: 40
							},
							visible: true,
							canTap: true,
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
									g: 69,
									b: 0,
									a: 1
								}
							}

						},
						{
							nodeId: "one006",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},
							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 6,
										y: 38
									},
									rb: {
										x: 6,
										y: 40
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}

						},
						{
							nodeId: "one007",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},
							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 7,
										y: 41
									},
									rb: {
										x: 8,
										y: 41
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}

						}
					]
				}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字2
	num2() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one008",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 6,
							y: 33
						},
						rb: {
							x: 8,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 20,
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
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 9,
									y: 33
								},
								rb: {
									x: 9,
									y: 35
								}
							},
							rgba: {
								r: 254,
								g: 20,
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
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 38
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 20,
								b: 147,
								a: 1
							}
						}
					},
					{
						nodeId: "one011",
						surface: "b",
						pt: {
							x: 8,
							y: 36
						},
						visible: true,
						canTap: true,
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
								g: 20,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one012",
						surface: "b",
						pt: {
							x: 7,
							y: 37
						},
						visible: true,
						canTap: true,
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
								g: 20,
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
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 41
								},
								rb: {
									x: 8,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 20,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one014",
						surface: "b",
						pt: {
							x: 9,
							y: 40
						},
						visible: true,
						canTap: true,
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
								g: 20,
								b: 147,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字1
	addRed8() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one015",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 35
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 8,
							y: 36
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 8,
							y: 39
						},
						{
							x: 8,
							y: 40
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
					],
					rgba: {
						r: 139,
						g: 69,
						b: 19,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRedTwo8() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one015",
			nodes: [{
				nodeId: "one015",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 35
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 8,
							y: 36
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 8,
							y: 39
						},
						{
							x: 8,
							y: 40
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
					],
					rgba: {
						r: 139,
						g: 69,
						b: 19,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed90() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one01",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 35
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 8,
							y: 36
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 8,
							y: 39
						},
						{
							x: 8,
							y: 40
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
					],
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				}
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字4
	addRed9() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one016",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 41
						},
					],
					rgba: {
						r: 148,
						g: 0,
						b: 211,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字5
	addRed10() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one017",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 41
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
					],
					rgba: {
						r: 50,
						g: 205,
						b: 50,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字6
	addRed11() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one018",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 9,
							y: 36
						},
						{
							x: 9,
							y: 37
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
					],
					rgba: {
						r: 30,
						g: 104,
						b: 254,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字7
	addRed12() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one019",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 33
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 8,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 41
						},
					],
					rgba: {
						r: 254,
						g: 215,
						b: 0,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字8
	addRed13() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one020",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 9,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
					],
					rgba: {
						r: 0,
						g: 254,
						b: 204,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字9
	addRed14() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one021",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 38
						},
					],
					rgba: {
						r: 254,
						g: 204,
						b: 102,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字10
	addRed15() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one022",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 5,
							y: 33
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 4,
							y: 34
						},
						{
							x: 4,
							y: 35
						},
						{
							x: 4,
							y: 36
						},
						{
							x: 4,
							y: 37
						},
						{
							x: 4,
							y: 38
						},
						{
							x: 4,
							y: 39
						},
						{
							x: 4,
							y: 40
						},
						{
							x: 5,
							y: 41
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 9,
							y: 36
						},
						{
							x: 9,
							y: 37
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 41
						},
						{
							x: 10,
							y: 39
						},
					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	redPlay4() {
		let opInfo1 = {
			opId: "redMove",
			opType: "play",
			opNode: "red999",
			timeLen: 20,
			loop: "true",
			keyFrames: [

				{
					t: 0.5,
					keyFrame: {
						visible: "true",
						canTap: "true",
						// surface: "a",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 41
								},
								rb: {
									x: 15,
									y: 41
								}
							}
						}
					}
				},
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
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	addRed() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red998",
			nodes: [{
				nodeId: "red998",
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
							y: 5
						},
						rb: {
							x: 15,
							y: 6
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
		gameFuncs.op(opInfo1)
		let opInfo2 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red997",
			nodes: [{
				nodeId: "red997",
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
							y: 10
						},
						rb: {
							x: 15,
							y: 11
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
		gameFuncs.op(opInfo2)
		let opInfo3 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red996",
			nodes: [{
				nodeId: "red996",
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
							y: 15
						},
						rb: {
							x: 15,
							y: 16
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
		gameFuncs.op(opInfo3)
		let opInfo4 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red995",
			nodes: [{
				nodeId: "red995",
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
							y: 20
						},
						rb: {
							x: 15,
							y: 21
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

	},
	addRed1() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red999",
			nodes: [{
				nodeId: "red999",
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
							y: 3
						},
						rb: {
							x: 0,
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
		gameFuncs.op(opInfo)
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red998",
			nodes: [{
				nodeId: "red998",
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
							x: 3,
							y: 3
						},
						rb: {
							x: 3,
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
		gameFuncs.op(opInfo1)
		let opInfo2 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red997",
			nodes: [{
				nodeId: "red997",
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
							x: 6,
							y: 3
						},
						rb: {
							x: 6,
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
		gameFuncs.op(opInfo2)
		let opInfo3 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red996",
			nodes: [{
				nodeId: "red996",
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
							x: 9,
							y: 3
						},
						rb: {
							x: 9,
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
		gameFuncs.op(opInfo3)
		let opInfo4 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red995",
			nodes: [{
				nodeId: "red995",
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
							x: 12,
							y: 3
						},
						rb: {
							x: 12,
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
			opId: "addRed",
			opType: "addNode",
			opNode: "red994",
			nodes: [{
				nodeId: "red994",
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
							y: 3
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
		gameFuncs.op(opInfo5)
	},
	addBlue() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2026", "a", 17, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "b", 9, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2041", "b", 5, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2043", "b", 4, 4, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "b", 5, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "b", 6, 8, 0, 0, 254)
		fastop.addNode("addBlue", "blue2046", "b", 1, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2047", "b", 4, 12, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "b", 6, 13, 0, 0, 254)
		fastop.addNode("addBlue", "blue2049", "b", 8, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue2050", "b", 7, 17, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "b", 11, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2052", "b", 6, 25, 0, 0, 254)
		fastop.addNode("addBlue", "blue2053", "b", 9, 24, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "b", 11, 28, 0, 0, 254)
	},
	addBlue1() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2026", "a", 17, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "b", 9, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2041", "b", 5, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2043", "b", 1, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "b", 2, 13, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "b", 2, 20, 0, 0, 254)
		fastop.addNode("addBlue", "blue2046", "b", 4, 8, 0, 0, 254)
		fastop.addNode("addBlue", "blue2047", "b", 4, 21, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "b", 5, 17, 0, 0, 254)
		fastop.addNode("addBlue", "blue2049", "b", 8, 5, 0, 0, 254)
		fastop.addNode("addBlue", "blue2050", "b", 8, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "b", 7, 26, 0, 0, 254)
		fastop.addNode("addBlue", "blue2052", "b", 11, 12, 0, 0, 254)
		fastop.addNode("addBlue", "blue2053", "b", 10, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "b", 14, 13, 0, 0, 254)
	},
	addBlue2() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "a", 3, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2043", "a", 8, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "a", 9, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "a", 10, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2047", "a", 12, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "a", 13, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2050", "a", 15, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "a", 19, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2053", "a", 21, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "a", 22, 0, 0, 0, 254)
	},
	addBlue3() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2026", "a", 17, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "b", 8, 8, 0, 0, 254)
		fastop.addNode("addBlue", "blue2041", "b", 11, 5, 0, 0, 254)
		fastop.addNode("addBlue", "blue2043", "b", 5, 11, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "b", 7, 17, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "b", 8, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2066", "b", 4, 24, 0, 0, 254)
		fastop.addNode("addBlue", "blue2047", "b", 6, 28, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "b", 13, 3, 0, 0, 254)
		fastop.addNode("addBlue", "blue2088", "b", 13, 31, 0, 0, 254)
		fastop.addNode("addBlue", "blue2050", "b", 12, 24, 0, 0, 254)
		fastop.addNode("addBlue", "blue2049", "a", 14, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "a", 22, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2052", "a", 20, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2046", "a", 11, 0, 0, 0, 254)
	},

	randomBlue(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 15)
			let y = Math.floor(Math.random() * 31)
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = ""
		let i = 0;
		while (i < blueNum) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x
			let y = res.y
			temp += "," + res.key

			let opInfo = {
				opId: "addBlue" + i,
				opType: "addNode",
				opNode: "blue200",
				nodes: [{
					nodeId: "blue" + i,
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
								x: x,
								y: y
							},
							rb: {
								x: x,
								y: y
							}
						},
						rgba: {
							r: 0,
							g: 0,
							b: 254,
							a: 1
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},
	randomBlue2(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 23)
			let y = Math.floor(Math.random() * 0)
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = ""
		let i = 0;
		while (i < blueNum) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x
			let y = res.y
			temp += "," + res.key

			let opInfo = {
				opId: "addBlue" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "blue" + i,
					surface: "a",
					pt: {
						x: x,
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
								y: 0
							},
							rb: {
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 0,
							g: 0,
							b: 254,
							a: 1
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},
	randomBlue1(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 15)
			let y = Math.floor(Math.random() * 28)
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = ""
		let i = 0;
		while (i < blueNum) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x
			let y = res.y
			temp += "," + res.key

			let opInfo = {
				opId: "addBlue" + i,
				opType: "addNode",
				opNode: "blue200",
				nodes: [{
					nodeId: "blue" + i,
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
								x: x,
								y: y
							},
							rb: {
								x: x,
								y: y
							}
						},
						rgba: {
							r: 0,
							g: 0,
							b: 254,
							a: 1
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},
	CountPlay() {
		haiPlusFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						value2: nowInfos.target
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "游戏得分",
						value1: usersInfos.gameScore,
						label2: "关卡总分",
						value2: usersInfos.levelScore
					}
				}
			}
			gameFuncs.op(opInfo);
			if (change == 0) {
				nowInfos.gameCountTime--;
			}
			if (nowInfos.gameCountTime == 5) {
				roomFunction.playSound(false, "fenwei")
			}
			if (nowInfos.gameCountTime == 0) {
				wanFa_haiPlus.gameTimeOver()
			}
			if (nowInfos.gameCountTime == 10 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				roomFunction.playSound(false, "daoshu10")
			}
		}, 1000, (nowInfos.gameCountTime + 6))

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
					value2: nowInfos.target
				},
				block3: {
					model: "dis_b_scoreGame",
					label1: "游戏得分",
					value1: usersInfos.gameScore,
					label2: "关卡总分",
					value2: usersInfos.levelScore
				}
			}
		}
		gameFuncs.op(opInfo)
	},


}
