const wanFa_tranProMaxThree = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_tranProMaxThree.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_tranProMaxThree.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_tranProMaxThree.gameDestroy);
		//重置全局变量
		tranProThreeFuncs.resetAll()
		clearInterval(tranProThreeFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}


		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		roomFunction.playSound(false, "ding")
		let countTime = 0
		wanFa_tranProMaxThree.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("tranProMaxThree")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						roomFunction.playSound(true, "tranProMaxBgm", "background")
						engine.log(222222222)
						tranProThreeFuncs.CountPlay();
					}
					break;
				case 17:
					clearInterval(wanFa_tranProMaxThree.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_tranProMaxThree.gameTaped)
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)
		engine.log(canTapNum + "???")
		if (gameid.startsWith("transProMaxThree")) {
			clearInterval(tranProThreeFuncs.tiaoWin.Athree)
			clearNum = 0
			nowInfos.target = ((usersInfos.usersResult.length) * 3) + 1;
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			//roomFunction.playSound(false, "togreen")
			//tranProThreeFuncs.CountPlay()
			tranProThreeFuncs.ScorePlay()
			//这里
			tranProThreeFuncs.blueFor()
			if (guole == 0) {
				tranProThreeFuncs.wallMoveTwo()
				tranProThreeFuncs.blueShowOne()
				cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
				tranProThreeFuncs.blueNoTap(cxxxx)
			} else {
				tranProThreeFuncs.wallMoveFalse()
				tranProThreeFuncs.blueShowTwo()
				cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
				tranProThreeFuncs.blueNoTap(cxxxx)
			}

			if (gameid != "transProMaxThree05-cxx") {
				clearInterval(hahaha)
			}
			if (transs == 0) {
				roomFunction.playSound(false, "zhiyin");
			}
			wanFa_tranProMaxThree.gamePlay.gameAct = setTimeout(() => {
				dontMove = 1
				tranInfos.blueProject = 1
				tranProThreeFuncs.wallMoveTwo()
				if (gameid == "transProMaxThree-cxx") {
					tranProThreeFuncs.addRedJiaoxue1()
					tranProThreeFuncs.addRedJiaoxue2()
					tranProThreeFuncs.redPlayJiaoxue1()
					tranProThreeFuncs.redPlayJiaoxue2()


				} else if (gameid == "transProMaxThree03-cxx") {
					tranProThreeFuncs.addRed()
					tranProThreeFuncs.addRed1()
					tranProThreeFuncs.redPlay()
					tranProThreeFuncs.redPlay1()
				} else if (gameid == "transProMaxThree02-cxx") {

					tranProThreeFuncs.addRed()
					tranProThreeFuncs.redPlay()
				} else if (gameid == "transProMaxThree04-cxx") {
					tranProThreeFuncs.redPlay13()
				} if (gameid != "transProMaxThree05-cxx") {
					clearInterval(hahaha)
				}
				if (gameid == "transProMaxThree05-cxx") {
					tranProThreeFuncs.addRed2()
					tranProThreeFuncs.addRed3()
					tranProThreeFuncs.addRed4()
					tranProThreeFuncs.addRed5()
					tranProThreeFuncs.addRed7()
					let hefeng = 0
					hahaha = setInterval(() => {
						engine.log("我是电锯")
						hefeng++
						switch (hefeng) {
							case 1:
								tranProThreeFuncs.redPlay9()
								break;
							case 2:
								tranProThreeFuncs.redPlay4()
								break;
							case 3:
								tranProThreeFuncs.redPlay3()
								break;
							case 4:
								tranProThreeFuncs.redPlay2()
								break;
							case 5:
								clearInterval(hahaha)
								break;
						}
					}, 300);
				} else if (gameid == "transProMaxThree06-cxx") {
					tranProThreeFuncs.redPlay5()
				} else if (gameid == "transProMaxThree07-cxx") {
					tranProThreeFuncs.redPlay6()
				} else if (gameid == "transProMaxThree08-cxx") {
					tranProThreeFuncs.redPlay7()
				} else if (gameid == "transProMaxThree09-cxx") {
					tranProThreeFuncs.redPlay8()
				}
				else if (gameid == "transProMaxThree10-cxx") {
					//tranFuncs.redPlay8()
					tranProThreeFuncs.addRed()
					tranProThreeFuncs.addRed1()
					tranProThreeFuncs.redPlay10()
					tranProThreeFuncs.redPlay11()
				}
				switch (guole) {
					case 0:
						usersInfos.levelScore = 0;
						tranProThreeFuncs.addRed8()
						roomFunction.playSound(false, "levelOne")
						break;
					case 1:
						tranProThreeFuncs.num2()
						usersInfos.levelScore = 10;
						roomFunction.playSound(false, "levelTwo")
						break;
					case 2:
						tranProThreeFuncs.num3()
						usersInfos.levelScore = 20;
						roomFunction.playSound(false, "levelThree")
						break;
					case 3:
						tranProThreeFuncs.addRed9()
						usersInfos.levelScore = 30;
						roomFunction.playSound(false, "levelFour")
						break;
					case 4:
						tranProThreeFuncs.addRed10()
						usersInfos.levelScore = 40;
						roomFunction.playSound(false, "levelFive")
						break;
					case 5:
						tranProThreeFuncs.addRed11()
						usersInfos.levelScore = 60;
						roomFunction.playSound(false, "levelSix")
						break;
					case 6:
						tranProThreeFuncs.addRed120()
						usersInfos.levelScore = 80;
						roomFunction.playSound(false, "levelSeven")
						break;
					case 7:
						tranProThreeFuncs.addRed13()
						usersInfos.levelScore = 100;
						roomFunction.playSound(false, "levelEight")
						break;
					case 8:
						tranProThreeFuncs.addRed14()
						usersInfos.levelScore = 120;
						roomFunction.playSound(false, "levelNine")
						break;
					case 9:
						tranProThreeFuncs.addRed15()
						usersInfos.levelScore = 150;
						roomFunction.playSound(false, "levelTen")
						break;
				}


			}, 7000);
		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("transProMaxThree")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			tranProThreeFuncs.blueTap(face, x, y, onOff, nodeId, event);
			tranProThreeFuncs.greenTap(face, x, y, onOff, nodeId, event);
			tranProThreeFuncs.greenTapTwo(face, x, y, onOff, nodeId, event);
			tranProThreeFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			tranProThreeFuncs.gameEndControl(face, x, y, onOff, nodeId, event)
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(tranProThreeFuncs.tapWrong.determine)
			}

		}

	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		//clearInterval(tranProThreeFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_tranProMaxThree.gameTaped)
		engine.log("移除tap监听")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(tranProThreeFuncs.CountPlay.innerCount)
		clearInterval(wanFa_tranProMaxThree.gamePlay.count)
		clearInterval(tranProThreeFuncs.tiaoWin.Athree)
		clearInterval(tranProThreeFuncs.wallMove.wallCode)
		clearTimeout(tranProThreeFuncs.wallMove.awa)
		clearTimeout(wanFa_tranProMaxThree.gamePlay.gameAct)
		roomFunction.stopSound("tranProMaxBgm")
		roomFunction.stopSound("tranRules")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teachBlue2")
		roomFunction.stopSound("teachRed")
		roomFunction.stopSound("321Go")
		roomFunction.goToGameLevel("leave_hold", "none")
		tranProThreeFuncs.rmAllListener()
		usersInfos.levelScore = usersInfos.levelScore + parseInt(challengeTime / 10) + (challengeLife * 2)
		wanFaCtl_tranPlusCtl.gameEndCtl(usersInfos.levelScore)
		levelInfos.gameIdList = []
		tranInfos.removeWall = 1
		clearNum = 999
	}

}




const tranProThreeFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 280;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		guole = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		canTapNum = [];
		//pkNameList = []
		tranInfos.blueProject = 0
		tranInfos.oldId = ""
		tranInfos.wallNum = 0
		tranInfos.removeWall = 0
		dontMove = 0
		tranInfos.remonber = []
		tranInfos.whoClos = 0
		firstNum = 0
		Firstchart = [6, 7, 8, 14, 15, 16]
		//pickInfos.screenCirCtl = 0

	},
	gameEndControl(face, x, y, onOff, nodeId, event) {
		if (nodeId == "StopRed" && face == "a" && x == 0 && y == 0 && onOff == true) {
			engine.log("开始定时器")
			tranProThreeFuncs.gameEndControl.haha = setTimeout(() => {
				wanFa_tranProMaxThree.gameLevelEnd()
			}, 10000);
		}
		if (nodeId == "StopRed" && face == "a" && x == 0 && y == 0 && onOff == false) {
			engine.log("清除定时器")
			clearTimeout(tranProThreeFuncs.gameEndControl.haha)
		}
	},
	//墙面倒计时动画
	wallMove() {
		//tranInfos.removeWall = 0
		let opInfo = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 40
							},
							"rb": {
								"x": 2,
								"y": 41
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo);
		let opInfo2 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall01", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 38
							},
							"rb": {
								"x": 2,
								"y": 39
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall02", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 35
							},
							"rb": {
								"x": 2,
								"y": 37
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo3);
		let opInfo4 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall03", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 32
							},
							"rb": {
								"x": 2,
								"y": 34
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo4);
		let opInfo5 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall04", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 40
							},
							"rb": {
								"x": 15,
								"y": 41
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo5);
		let opInfo6 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall05", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 38
							},
							"rb": {
								"x": 15,
								"y": 39
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo6);
		let opInfo7 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall06", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 35
							},
							"rb": {
								"x": 15,
								"y": 37
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo7);
		let opInfo8 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall07", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 32
							},
							"rb": {
								"x": 15,
								"y": 34
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo8);

		tranProThreeFuncs.wallMove.wallCode = setInterval(() => {
			if (tranInfos.removeWall == 1) {
				clearInterval(tranProThreeFuncs.wallMove.wallCode)
				engine.log("移除了")
				return
			}
			tranInfos.wallNum++
			switch (tranInfos.wallNum) {
				case 1:
					let opInfo1 = {
						opId: "wall",
						opType: "play",
						opNode: "wall",
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
					gameFuncs.op(opInfo1);
					let opInfo9 = {
						opId: "wall04",
						opType: "play",
						opNode: "wall04",
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
					gameFuncs.op(opInfo9);
					break;
				case 2:
					let opInfo6 = {
						opId: "wall01",
						opType: "play",
						opNode: "wall01",
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
					gameFuncs.op(opInfo6);
					let opInfo10 = {
						opId: "wall05",
						opType: "play",
						opNode: "wall05",
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
					gameFuncs.op(opInfo10);
					break;
				case 3:
					let opInfo7 = {
						opId: "wall02",
						opType: "play",
						opNode: "wall02",
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
					gameFuncs.op(opInfo7);
					let opInfo11 = {
						opId: "wall06",
						opType: "play",
						opNode: "wall06",
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
					gameFuncs.op(opInfo11);
					break;
				case 4:
					let opInfo8 = {
						opId: "wall03",
						opType: "play",
						opNode: "wall03",
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
					gameFuncs.op(opInfo8);
					let opInfo12 = {
						opId: "wall07",
						opType: "play",
						opNode: "wall07",
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
					gameFuncs.op(opInfo12);
					break;
				case 5:
					usersInfos.UseLife++
					if (nowInfos.lifePoint > 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.stopSound("tranActRules")
						roomFunction.stopSound("tranActRules02")
						roomFunction.playSoundTivite(false, "wrong", "negative");
						tranProThreeFuncs.wallMoveTwo()
						usersInfos.RetryCount++
						engine.log("chongqiqqqqqqqqqq")
					} else if (nowInfos.lifePoint == 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.playSoundTivite(false, "wrong", "negative");
						wanFa_tranProMaxThree.gameLevelEnd()

					}
					break;
			}
		}, 1000);



	},
	wallMoveFalse() {
		engine.log("在这里呢")
		let opInfo8 = {
			opId: "wall03",
			opType: "play",
			opNode: "wall03",
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
		gameFuncs.op(opInfo8);
		let opInfo12 = {
			opId: "wall07",
			opType: "play",
			opNode: "wall07",
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
		gameFuncs.op(opInfo12);
		let opInfo1 = {
			opId: "wall",
			opType: "play",
			opNode: "wall",
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
		gameFuncs.op(opInfo1);
		let opInfo9 = {
			opId: "wall04",
			opType: "play",
			opNode: "wall04",
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
		gameFuncs.op(opInfo9);
		let opInfo6 = {
			opId: "wall01",
			opType: "play",
			opNode: "wall01",
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
		gameFuncs.op(opInfo6);
		let opInfo7 = {
			opId: "wall02",
			opType: "play",
			opNode: "wall02",
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
		gameFuncs.op(opInfo7);
		let opInfo11 = {
			opId: "wall06",
			opType: "play",
			opNode: "wall06",
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
		gameFuncs.op(opInfo11);
		let opInfo10 = {
			opId: "wall05",
			opType: "play",
			opNode: "wall05",
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
		gameFuncs.op(opInfo10);
	},
	wallMoveTwo() {
		//tranInfos.removeWall = 0
		let opInfo = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 40
							},
							"rb": {
								"x": 2,
								"y": 41
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo);
		let opInfo2 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall01", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 38
							},
							"rb": {
								"x": 2,
								"y": 39
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall02", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 35
							},
							"rb": {
								"x": 2,
								"y": 37
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo3);
		let opInfo4 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall03", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 32
							},
							"rb": {
								"x": 2,
								"y": 34
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo4);
		let opInfo5 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall04", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 40
							},
							"rb": {
								"x": 15,
								"y": 41
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo5);
		let opInfo6 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall05", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 38
							},
							"rb": {
								"x": 15,
								"y": 39
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo6);
		let opInfo7 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall06", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 35
							},
							"rb": {
								"x": 15,
								"y": 37
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo7);
		let opInfo8 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall07", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 13,
								"y": 32
							},
							"rb": {
								"x": 15,
								"y": 34
							}
						},
						//"ringWidth": 1,
						"rgba": {
							"r": 0,
							"g": 254,
							"b": 0,
							"a": 1
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo8);



	},
	//数字1
	addRed8() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one015",
			nodes: [{
				nodeId: "one015",
				surface: "b",
				pt: {
					x: 0,
					y: -1
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
							y: 36
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 8,
							y: 35
						},
						{
							x: 9,
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
							x: 7,
							y: 42
						},
						{
							x: 8,
							y: 42
						},
						{
							x: 9,
							y: 41
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
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 10,
							y: 40
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
					],
					rgba: {
						r: 139,
						g: 69,
						b: 19,
						a: 1
					}
				}
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字2
	num2() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one008",
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

					}
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
			opNode: "one001",
			nodes: [{
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
	//数字4
	addRed9() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one016",
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
				}
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字5
	addRed10() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one017",
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
		let opInfo = {
			opId: "addBlack",
			opType: "addNode",
			opNode: "black001",
			nodes: [{
				nodeId: "black001",
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
				canTap: "false",
				visible: "true",
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 0,
							y: 32
						},
						rb: {
							x: 15,
							y: 41
						}
					},
					rgba: {
						r: 0,
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
			opNode: "one018",
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
	addRed120() {
		let opInfo = {
			opId: "addBlack",
			opType: "addNode",
			opNode: "black001",
			nodes: [{
				nodeId: "black001",
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
				canTap: "false",
				visible: "true",
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 0,
							y: 32
						},
						rb: {
							x: 15,
							y: 41
						}
					},
					rgba: {
						r: 0,
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
			opNode: "one019",
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
			opNode: "one020",
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
			opNode: "one021",
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
			opNode: "one022",
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

	//最开始隐藏掉起始所有蓝色与绿色点位
	blueFor() {
		for (let i = 0; i < 24; i++) {

			let opInfo1 = {
				opId: "blue" + i,
				opType: "play",
				opNode: "blue00" + i,
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
			gameFuncs.op(opInfo1);

			let opInfo2 = {
				opId: "green" + i,
				opType: "play",
				opNode: "green00" + i,
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
			gameFuncs.op(opInfo2);

		}
	},
	//操控蓝色点位在红色出现前不可触碰
	blueNoTap(randm) {
		engine.log("radm" + randm)
		engine.log("colorList[randm][0]" + colorList[randm][0])
		engine.log("colorList[randm][0]" + colorList[randm][1])
		engine.log("colorList[randm][0]" + colorList[randm][2])

		let opInfo99 = {
			opId: "blue" + canTapNum[randm],
			opType: "play",
			opNode: "blue00" + canTapNum[randm],
			timeLen: 1,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						shape: {
							rgba: {
								r: colorList[randm][0],
								g: colorList[randm][1],
								b: colorList[randm][2],
								a: 1
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false,
						canTap: true,
						shape: {
							rgba: {
								r: colorList[randm][0],
								g: colorList[randm][1],
								b: colorList[randm][2],
								a: 1
							}
						}
					}
				},
			]
		}
		gameFuncs.op(opInfo99);
	},
	//可触碰
	blueYesTap(random) {
		let opInfo3 = {
			opId: "blue" + canTapNum[random],
			opType: "play",
			opNode: "blue00" + canTapNum[random],
			timeLen: 1,
			loop: "true",
			keyFrames: [
				{
					t: 0.25,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: false,
						canTap: true
					}
				},
				{
					t: 0.75,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false,
						canTap: true
					}
				}
			]
		}
		gameFuncs.op(opInfo3);
	},
	addRed2() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "red666",
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
							y: 9
						},
						rb: {
							x: 9,
							y: 22
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

	},
	addRed3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red001",
			nodes: [{
				nodeId: "red001",
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
							x: 5,
							y: 2
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
						nodeId: "red002",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red003",
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
									y: 5
								},
								rb: {
									x: 5,
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
					},
					{
						nodeId: "red004",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
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
			opNode: "red005",
			nodes: [{
				nodeId: "red005",
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
							x: 5,
							y: 2
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
						nodeId: "red006",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red007",
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
									y: 5
								},
								rb: {
									x: 5,
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
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},
					{
						nodeId: "red008",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},

				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed5() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red009",
			nodes: [{
				nodeId: "red009",
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
							x: 5,
							y: 2
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
						nodeId: "red010",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red011",
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
									y: 5
								},
								rb: {
									x: 5,
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
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},
					{
						nodeId: "red012",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
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
			opNode: "red013",
			nodes: [{
				nodeId: "red013",
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
							x: 5,
							y: 2
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
						nodeId: "red014",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red015",
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
									y: 5
								},
								rb: {
									x: 5,
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
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},
					{
						nodeId: "red016",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
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

	addRed() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red301",
			nodes: [{
				nodeId: "red301",
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
							y: 0
						},
						rb: {
							x: 15,
							y: 1
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

	},
	allRed() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "red0089",
			nodes: [{
				nodeId: "red0089",
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
				canTap: "false",
				visible: "true",
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 0,
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
		gameFuncs.op(opInfo)
		setTimeout(() => {
			fastop.removeNode("nmd", "red0089")
		}, 2000);

	},
	allblack() {
		let opInfo = {
			opId: "addblack",
			opType: "addNode",
			//opNode: "red0089",
			nodes: [{
				nodeId: "black0098",
				surface: "a",
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
							y: 0
						},
						rb: {
							x: 23,
							y: 0
						}
					},
					rgba: {
						r: 0,
						g: 0,
						b: 0,
						a: 1
					}
				}
			}]
		}
		gameFuncs.op(opInfo)
		setTimeout(() => {
			fastop.removeNode("nmd", "black0098")
		}, 8000);

	},
	addRed1() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red302",
			nodes: [{
				nodeId: "red302",
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
							y: 0
						},
						rb: {
							x: 1,
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

	},
	addRedJiaoxue1() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red302",
			nodes: [{
				nodeId: "red302",
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
							y: 0
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

	},
	addRedJiaoxue2() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red301",
			nodes: [{
				nodeId: "red301",
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
							y: 0
						},
						rb: {
							x: 16,
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
			}]
		}
		gameFuncs.op(opInfo)

	},
	redPlay() {
		let opInfo1 = {
			opId: "red301",
			opType: "play",
			opNode: "red301",
			timeLen: 5,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 31
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlay10() {
		let opInfo1 = {
			opId: "red301",
			opType: "play",
			opNode: "red301",
			timeLen: 2,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 31
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlay2() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlay3() {
		let opInfo1 = {
			opId: "red005",
			opType: "play",
			opNode: "red005",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlay4() {
		let opInfo1 = {
			opId: "red009",
			opType: "play",
			opNode: "red009",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlay9() {
		let opInfo1 = {
			opId: "red013",
			opType: "play",
			opNode: "red013",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlay5() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
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
		gameFuncs.op(opInfo1);
		let opInfo2 = {
			opId: "red002",
			opType: "play",
			opNode: "red002",
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
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "red003",
			opType: "play",
			opNode: "red003",
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
		gameFuncs.op(opInfo3);
		let opInfo4 = {
			opId: "red004",
			opType: "play",
			opNode: "red004",
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
		gameFuncs.op(opInfo4);
		let opInfo5 = {
			opId: "red005",
			opType: "play",
			opNode: "red005",
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
		gameFuncs.op(opInfo5);
		let opInfo6 = {
			opId: "red006",
			opType: "play",
			opNode: "red006",
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
		gameFuncs.op(opInfo6);
		let opInfo7 = {
			opId: "red007",
			opType: "play",
			opNode: "red007",
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
		gameFuncs.op(opInfo7);
		let opInfo8 = {
			opId: "red008",
			opType: "play",
			opNode: "red008",
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
		gameFuncs.op(opInfo8);
		let opInfo9 = {
			opId: "red009",
			opType: "play",
			opNode: "red009",
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
		gameFuncs.op(opInfo9);
		let opInfo10 = {
			opId: "red010",
			opType: "play",
			opNode: "red010",
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
		gameFuncs.op(opInfo10);
		let opInfo11 = {
			opId: "red011",
			opType: "play",
			opNode: "red011",
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
		gameFuncs.op(opInfo11);
		let opInfo12 = {
			opId: "red012",
			opType: "play",
			opNode: "red012",
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
		gameFuncs.op(opInfo12);
		let opInfo13 = {
			opId: "red013",
			opType: "play",
			opNode: "red013",
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
		gameFuncs.op(opInfo13);
		let opInfo14 = {
			opId: "red014",
			opType: "play",
			opNode: "red014",
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
		gameFuncs.op(opInfo14);
		let opInfo15 = {
			opId: "red015",
			opType: "play",
			opNode: "red015",
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
		gameFuncs.op(opInfo15);
		let opInfo16 = {
			opId: "red016",
			opType: "play",
			opNode: "red016",
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
		gameFuncs.op(opInfo16);

	},
	redPlay6() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
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
		gameFuncs.op(opInfo1);

	},
	redPlay7() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
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
		gameFuncs.op(opInfo1);
		let opInfo2 = {
			opId: "red004",
			opType: "play",
			opNode: "red004",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "red005",
			opType: "play",
			opNode: "red005",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo3);

	},
	redPlay8() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
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
		gameFuncs.op(opInfo1);
		let opInfo2 = {
			opId: "red002",
			opType: "play",
			opNode: "red002",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "red003",
			opType: "play",
			opNode: "red003",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo3);
		let opInfo4 = {
			opId: "red004",
			opType: "play",
			opNode: "red004",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo4);

	},
	redPlay1() {
		let opInfo1 = {
			opId: "red302",
			opType: "play",
			opNode: "red302",
			timeLen: 5,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 15,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlay13() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
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
		gameFuncs.op(opInfo1);
	},
	redPlay11() {
		let opInfo1 = {
			opId: "red302",
			opType: "play",
			opNode: "red302",
			timeLen: 2,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 15,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlayJiaoxue1() {
		let opInfo1 = {
			opId: "red302",
			opType: "play",
			opNode: "red302",
			timeLen: 15,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 15,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlayJiaoxue2() {
		let opInfo1 = {
			opId: "red301",
			opType: "play",
			opNode: "red301",
			timeLen: 15,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 31
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	blueShowOne() {
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			canTapNum.push(Firstchart[i])
		}
		engine.log(canTapNum)
		for (let i = 0; i < canTapNum.length; i++) {
			let opInfo2 = {
				opId: "green" + canTapNum[i],
				opType: "play",
				opNode: "green00" + canTapNum[i],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo2);
			let opInfo1 = {
				opId: "blue" + canTapNum[i],
				opType: "play",
				opNode: "blue00" + canTapNum[i],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: colorList[i][0],
									g: colorList[i][1],
									b: colorList[i][2],
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo1);
		}
	},
	blueShowTwo() {
		// for (let i = 0; i < usersInfos.usersResult.length; i++) {
		// 	canTapNum.push(Firstchart[i])
		// }
		engine.log(canTapNum)
		for (let i = 0; i < canTapNum.length; i++) {
			let opInfo2 = {
				opId: "green" + canTapNum[i],
				opType: "play",
				opNode: "green00" + canTapNum[i],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo2);
			let opInfo1 = {
				opId: "blue" + canTapNum[i],
				opType: "play",
				opNode: "blue00" + canTapNum[i],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: colorList[i][0],
									g: colorList[i][1],
									b: colorList[i][2],
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo1);
		}
	},
	//控制地面和按钮随机亮起
	blueShow() {
		let chart = 0
		while (true) {
			chart = Math.floor(Math.random() * 23)
			if (canTapNum.indexOf(chart) === -1) {
				break
			}
		}
		canTapNum[cxxxx] = chart
		engine.log("canTapNum[]" + canTapNum)
		tranInfos.wallNum = 0
		if (nowInfos.target != 1) {
			tranProThreeFuncs.wallMove()
		}
		let opInfo2 = {
			opId: "green" + canTapNum[cxxxx],
			opType: "play",
			opNode: "green00" + canTapNum[cxxxx],
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
						shape: {
							rgba: {
								r: 0,
								g: 254,
								b: 0,
								a: 1
							}
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo2);
	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_tranProMaxThree.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_tranProMaxThree.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_tranProMaxThree.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_tranProMaxThree.gameTimeOver)
	},


	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true && cuowu == 0) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				tranProThreeFuncs.tapWrong.determine = setTimeout(() => {
					tranProThreeFuncs.addBlink(x, y)
					usersInfos.UseLife++
					if (nowInfos.lifePoint > 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.playSoundTivite(false, "wrong", "negative");
						if (nowInfos.lifePoint == 3) {
							roomFunction.playSound(false, "life")
						}
					} else if (nowInfos.lifePoint == 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						usersInfos.RetryCount++
						usersInfos.RetryCount++
						wanFa_tranProMaxThree.gameLevelEnd()
					}
				}, 75);
			}

		}
	},
	tiaoWin() {
		if (clearNum == 999) {
			clearInterval(tranProThreeFuncs.tiaoWin.Athree)
			return
		}
		roomFunction.playSoundTivite(false, "321Go", "positive")
		tranProThreeFuncs.addRed50()
		tranProThreeFuncs.tiaoWin.Athree = setInterval(() => {
			clearNum++
			switch (clearNum) {
				case 1:
					tranProThreeFuncs.oneFor()
					tranProThreeFuncs.addRed60()
					break;
				case 2:
					tranProThreeFuncs.oneFor1()
					tranProThreeFuncs.addRed90()
					break;
				case 3:
					tranProThreeFuncs.oneFor90()
					tranProThreeFuncs.addRed30()
					tranProThreeFuncs.addRed40()
					break;
			}
		}, 1000);
	},
	addRed70() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "lose001",
			nodes: [{
				nodeId: "lose001",
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
		setTimeout(() => {
			fastop.removeNode("sssss", "lose001")
		}, 2000);
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
	addRed30() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "",
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
	addRed40() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "go007",
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
	addRed90() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one01",
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
		setTimeout(() => {
			fastop.removeNode("one01")
		}, 3000);
	},
	//数字3
	addRed50() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one222",
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
	addRed60() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one223",
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
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		// engine.log("blue--------" + tranInfos.blueProject)

		if (nodeId == ("blue00" + canTapNum[cxxxx]) && onOff == true && dontMove == 1 && tranInfos.blueProject == 1) {
			usersInfos.ValidTarget++
			// gameFuncs.op(opInfo2);
			if (nowInfos.target > 1) {
				roomFunction.playSoundTivite(false, "pick", "positive")
				tranProThreeFuncs.wallMoveTwo()
				clearInterval(tranProThreeFuncs.wallMove.wallCode)
				let opInfo1 = {
					opId: "blue" + canTapNum[cxxxx],
					opType: "play",
					opNode: "blue00" + canTapNum[cxxxx],
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
				gameFuncs.op(opInfo1);
				tranInfos.blueProject = 0
				let opInfo2 = {
					opId: "greenFlase" + canTapNum[0],
					opType: "play",
					opNode: "green00" + canTapNum[0],
					timeLen: 6,
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
				engine.log("tranInfos.whoClos--=" + tranInfos.whoClos)
				engine.log("tranInfos.remonber999=" + tranInfos.remonber)
				cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
				tranInfos.remonber = canTapNum
				tranInfos.whoClos = canTapNum[cxxxx]
				tranProThreeFuncs.blueShow()
				tranProThreeFuncs.blueNoTap(cxxxx)
				nowInfos.target--
				nowInfos.allTarget++
				//usersInfos.gameScore += 5
				//usersInfos.levelScore += 5
				tranProThreeFuncs.ScorePlay()
			} else if (nowInfos.target == 1) {
				if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
					roomFunction.playSoundTivite(false, "pick", "positive")
					//tranProThreeFuncs.allblack()
					clearInterval(tranProThreeFuncs.wallMove.wallCode)
					tranInfos.blueProject = 0
					nowInfos.target--
					nowInfos.allTarget++
					//usersInfos.gameScore += 5
					tranProThreeFuncs.ScorePlay()
					guole++
					//获取跳关后的时间作为判断积分规则
					challengeTime = nowInfos.gameCountTime
					//获取跳关后的生命值作为判断积分规则
					challengeLife = nowInfos.lifePoint
					//tranInfos.biepeng = 1
					roomFunction.goToNextGame()

					// tranInfos.remonber = canTapNum
					// tranInfos.whoClos = canTapNum[remberCxx]
					// tranProThreeFuncs.blueShowOne()
					// cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
					// tranProThreeFuncs.blueNoTap(cxxxx)
					transs = 1
					roomFunction.playSound(false, "levelup", "positive")
					setTimeout(() => {
						tranProThreeFuncs.tiaoWin()
						clearInterval(tranProThreeFuncs.wallMove.wallCode)
						//cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
						//重新生成
					}, 3000);
					engine.log("本轮已过关请站在绿色区域等待下一关开始")
				}
				else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
					roomFunction.playSoundTivite(false, "pick", "positive")
					nowInfos.target--
					nowInfos.allTarget++
					//usersInfos.gameScore += 5
					// usersInfos.levelScore += 5
					tranProActFuncs.ScorePlay()
					guole++
					wanFa_tranProMaxThree.gameLevelEnd()
				}
			}
		}



	},
	greenTapTwo(face, x, y, onOff, nodeId, event) {
		if (face == "b" && (nodeId == ("green00" + canTapNum[canTapNum.length - 1])) && onOff == true && dontMove == 0) {
			tranInfos.blueProject = 1
		}
	},

	greenTap(face, x, y, onOff, nodeId, event) {
		if (face == "b" && (nodeId == ("green00" + tranInfos.remonber[cxxxx])) && onOff == true) {
			tranInfos.blueProject = 1
			engine.log("tranInfos.whoClos2=====" + tranInfos.whoClos)
			let opInfo6 = {
				opId: "greenmei" + tranInfos.whoClos,
				opType: "play",
				opNode: "green00" + tranInfos.whoClos,
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

			gameFuncs.op(opInfo6);
			let opInfo7 = {
				opId: "bluemei" + tranInfos.whoClos,
				opType: "play",
				opNode: "blue00" + tranInfos.whoClos,
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

			gameFuncs.op(opInfo7);
		}
	},


	CountPlay() {
		tranProThreeFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						label2: "关卡总分",
						value2: usersInfos.levelScore
					}
				}
			}
			gameFuncs.op(opInfo);
			nowInfos.gameCountTime--;

			if (nowInfos.gameCountTime == 0) {
				wanFa_tranProMaxThree.gameLevelEnd()
			}
			if (nowInfos.gameCountTime == 10) {
				roomFunction.playSound(false, "daoshu10")
			}
		}, 1000, nowInfos.gameCountTime + 5)
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
					label2: "关卡总分",
					value2: usersInfos.levelScore
				}
			}
		}
		gameFuncs.op(opInfo)
	},


}
