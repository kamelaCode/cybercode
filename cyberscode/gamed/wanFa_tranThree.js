const wanFa_tranThree = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_tranThree.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_tranThree.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_tranThree.gameDestroy);
		//重置全局变量
		tranThreeFuncs.resetAll()
		//clearInterval(tranThreeFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}
		//内屏显示每个用户名称对应的颜色
		pickInfos.neiUser = []
		for (var i = 0; i < usersInfos.usersResult.length; i++) {
			pickInfos.neiUser[i] = usersInfos.allUsers[i].Nick
		}
		pickInfos.levelScoreAll = pickInfos.neiUser.toString()
		let wodiu = 0
		let qbq = 0
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			for (let j = 0; j < 10; j++) {
				if (wodiu == i) {
					if (pickInfos.neiUser[i].charCodeAt(j) > 255) {
						qbq++
						duoshao += 1.666666666
					} else {
						qbq++
						duoshao += 1
					}
					if (duoshao >= 7) {
						engine.log("第" + i + "个人显示前" + qbq + "个字")
						pkNameList[i] = pickInfos.neiUser[i].substring(0, qbq) + "..."
						duoshao = 0
						wodiu++
						qbq = 0
					}
				}
			}
			if (pickInfos.neiUser[i].length < 6) {
				pkNameList[i] = pickInfos.neiUser[i]
			}
		}


		cbjh = 0
		zwy = 0


		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		roomFunction.playSound(false, "ding")
		let countTime = 0
		wanFa_tranThree.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					break;
				case 5:
					roomFunction.playSound(false, "gamestart");
					if (usersInfos.usersResult.length <= 3) {
						for (let i = 0; i < 30; i++) {
							cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
							qishi.push(cxxxx)
							qishi.sort(() => Math.random() - 0.5)
							arrNew[0] = qishi[0]
							for (let j = 1; j < qishi.length;) {
								if (arrNew[arrNew.length - 1] == qishi[j]) {
									while (arrNew[arrNew.length - 1] == qishi[j]) {
										j++;
									}
									// arrNew.shift();
									arrNew.slice(1, usersInfos.usersResult.length)
									//arrNew.pop()
								} else {
									arrNew.push(qishi[j])
									j++
								}

							}
						}
						engine.log("存入---" + arrNew)
					} else if (usersInfos.usersResult.length > 3) {
						for (let i = 0; i < 30; i++) {
							cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
							qishi.push(cxxxx)
						}
						qishi.sort(() => Math.random() - 0.5)
						engine.log("存入---" + qishi)
					}
					break;
				case 16:
					if (levelInfos.wanFa.startsWith("tran")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						tranThreeFuncs.CountPlay();
					}
					break;
				case 17:
					clearInterval(wanFa_tranThree.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_tranThree.gameTaped)
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)



		if (gameid.startsWith("trans")) {
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			tranThreeFuncs.CountPlay()
			tranThreeFuncs.ScorePlay()
			tranThreeFuncs.blueFor()

			wanFa_tranThree.gamePlay.innerCount = setInterval(() => {
				nowInfos.gameCountTime--
				if (nowInfos.gameCountTime == 11) {
					roomFunction.playSound(false, "daoshu10")
					//roomFunction.stopSound("jingjiBgm01");
				}
				if (nowInfos.gameCountTime == 1) {
					wanFa_tranThree.gameLevelEnd()
				}
			}, 1000)
			setIntervalCount(function (index, count) {
				pickInfos.levelScoreAll = ""
			}, 5000, 26)
			if (zwy == 0) {
				roomFunction.playSound(false, "gotoGreen")
			}
			// tranThreeFuncs.blueShow(usersInfos.usersResult.length)
			tranThreeFuncs.blueShowOne()

			tranThreeFuncs.blueNoTap(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
			tranThreeFuncs.wallMoveTwo(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
			setTimeout(() => {
				if (levelInfos.level != 1) {
					tranInfos.blueProject = 1
					dontMove = 1
				}
				if (levelInfos.level != 5) {
					clearInterval(hahaha)
				}
				if (nowInfos.lifePoint == 6) {
					if (levelInfos.level == 1) {
						roomFunction.playSound(false, "tranCCCRules")
						wanFa_tranThree.gamePlay.count = setTimeout(() => {
							roomFunction.playSound(true, "tranActBgm", "background")
						}, 11000);
					} else {
						roomFunction.playSound(false, "tranCCCRules2")
						wanFa_tranThree.gamePlay.dontBgm = setTimeout(() => {
							roomFunction.playSound(true, "tranActBgm", "background")
						}, 4000);
					}

				}
				//tranThreeFuncs.greenRm()
				if (levelInfos.level == 1) {
					setTimeout(() => {
						tranInfos.blueProject = 1
						dontMove = 1
						tranThreeFuncs.addRedJiaoxue1()
						tranThreeFuncs.addRedJiaoxue2()
						tranThreeFuncs.redPlayJiaoxue1()
						tranThreeFuncs.redPlayJiaoxue2()
					}, 11000);
				} else if (levelInfos.level == 2) {
					//fastop.nodeMove("redMove", "red301", 3, true, "b", 0, 0, 0, 0, 0, 30)
					tranThreeFuncs.addRed()
					tranThreeFuncs.addRed1()
					tranThreeFuncs.redPlay()
					tranThreeFuncs.redPlay1()

				} else if (levelInfos.level == 3) {

					tranThreeFuncs.addRed()
					tranThreeFuncs.redPlay()
				} else if (levelInfos.level == 4) {
					tranThreeFuncs.redPlay13()
				} else if (levelInfos.level == 5) {
					tranProFuncs.addRed2()
					tranProFuncs.addRed3()
					// setTimeout(() => {
					// 	tranProFuncs.redPlay2()
					// }, 1200);
					tranProFuncs.addRed4()
					// setTimeout(() => {
					// 	tranProFuncs.redPlay3()
					// }, 900);
					tranProFuncs.addRed5()
					// setTimeout(() => {
					// 	tranProFuncs.redPlay4()
					// }, 600);
					tranProFuncs.addRed7()
					// setTimeout(() => {
					// 	tranProFuncs.redPlay9()
					// }, 300);
					let hefeng = 0
					hahaha = setInterval(() => {
						engine.log("我是电锯")
						hefeng++
						switch (hefeng) {
							case 1:
								tranProFuncs.redPlay9()
								break;
							case 2:
								tranProFuncs.redPlay4()
								break;
							case 3:
								tranProFuncs.redPlay3()
								break;
							case 4:
								tranProFuncs.redPlay2()
								break;
							case 5:
								clearInterval(hahaha)
								break;
						}
					}, 300);
				} else if (levelInfos.level == 6) {
					tranThreeFuncs.redPlay5()
				} else if (levelInfos.level == 7) {
					tranThreeFuncs.redPlay6()
				} else if (levelInfos.level == 8) {
					tranThreeFuncs.redPlay7()
				} else if (levelInfos.level == 9) {
					tranThreeFuncs.redPlay8()
				}
				else if (levelInfos.level == 10) {
					//tranThreeFuncs.redPlay8()
					tranThreeFuncs.addRed()
					tranThreeFuncs.addRed1()
					tranThreeFuncs.redPlay10()
					tranThreeFuncs.redPlay11()
				}
			}, 4000);


		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("trans")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			tranThreeFuncs.blueTap(face, x, y, onOff, nodeId, event);
			tranThreeFuncs.greenTap(face, x, y, onOff, nodeId, event);
			tranThreeFuncs.greenTapTwo(face, x, y, onOff, nodeId, event);
			tranThreeFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(tranThreeFuncs.tapWrong.determine)
			}

		}

	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		//clearInterval(tranThreeFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_tranThree.gameTaped)
		engine.log("移除tap监听")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		// if (gameid != "__system_wait" && gameid != "leave_hold") {
		// 	if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
		// 		roomFunction.goToNextGame()
		// 		roomFunction.playSoundTivite(false, "levelup", "positive")
		// 	} else {
		// 		wanFa_tranThree.gameLevelEnd()
		// 	}
		// }
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		//clearInterval(tranThreeFuncs.CountPlay.innerCount)
		clearInterval(wanFa_tranThree.gamePlay.count)
		clearInterval(wanFa_tranThree.gamePlay.dontBgm)
		clearInterval(wanFa_tranThree.gamePlay.innerCount)
		roomFunction.stopSound("tranActBgm")
		roomFunction.stopSound("tranActRules")
		roomFunction.stopSound("tranActRules02")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teachBlue2")
		roomFunction.stopSound("teachRed")
		roomFunction.goToGameLevel("leave_hold", "none")
		tranThreeFuncs.rmAllListener()
		wanFaCtl_tranThreeCtl.gameEndCtl(usersInfos.levelScore, nowInfos.lifePoint)
		levelInfos.gameIdList = []
		tranInfos.removeWall = 1
		pickInfos.screenCirCtl = 1
	}

}




const tranThreeFuncs = {
	//重置所有变量
	resetAll() {
		if (levelInfos.level == 1) {
			nowInfos.gameCountTime = 120;

		} else if (levelInfos.level != 1) {
			nowInfos.gameCountTime = 90;
		}
		arrNew = []
		weights = []
		qishi = []
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 20
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		canTapNum = [];
		pkNameList = []
		tranInfos.blueProject = 0
		tranInfos.oldId = ""
		tranInfos.wallNum = 0
		tranInfos.removeWall = 0
		dontMove = 0
		tranInfos.remonber = []
		tranInfos.whoClos = 0
		firstNum = 0
		Firstchart = [6, 7, 8, 14, 15, 16]
		pickInfos.screenCirCtl = 0

	},
	// randomAn(num){

	// 	for (let i = 0; i <= num; i++) {
	// 		let x = Math.floor(Math.random() * 6)
	// 	fastop.addtran("blue"+i,"blue"+i,x,0,0,0,0,0,254)
	// 	if (x==1) {
	// 		fastop.addDuobi("green2024","green2024",0,27,1,1,0,254,0,0)
	// 	}

	// }




	// },
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
								"x": 15,
								"y": 41
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
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
								"x": 15,
								"y": 39
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
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
								"x": 15,
								"y": 37
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
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
								"x": 15,
								"y": 34
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo4);
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
	addRed6() {
		let opInfo = {
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
							x: 7,
							y: 9
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
			timeLen: 3,
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
			timeLen: 3,
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
	//墙面倒计时动画
	wallMove() {
		//tranInfos.removeWall = 0
		tranThreeFuncs.wallMove.wallCode = setInterval(() => {
			if (tranInfos.removeWall == 1) {
				clearInterval(tranThreeFuncs.wallMove.wallCode)
				engine.log("移除了")
				return
			}
			tranInfos.wallNum++
			if (levelInfos.level == 1) {
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
						break;
					case 3:
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
						break;
					case 5:
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
						break;
					case 7:
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
						break;
					case 8:
						usersInfos.UseLife++
						if (nowInfos.lifePoint > 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							//dontMove = 0
							roomFunction.stopSound("tranActRules")
							roomFunction.stopSound("tranActRules02")
							roomFunction.playSoundTivite(false, "wrong", "negative");
							tranThreeFuncs.wallMoveTwo(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
							usersInfos.RetryCount++
							cbjh = 1
							zwy = 1
							//tranInfos.blueProject = 0
							engine.log("chongqiqqqqqqqqqq")
						} else if (nowInfos.lifePoint == 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							roomFunction.playSoundTivite(false, "wrong", "negative");

							wanFa_tranThree.gameLevelEnd()

						}
						break;
				}
			} else if (levelInfos.level == 2) {
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
						break;
					case 4:
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
						break;
					case 6:
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
						break;
					case 7:
						usersInfos.UseLife++
						if (nowInfos.lifePoint > 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							//dontMove = 0
							roomFunction.stopSound("tranActRules")
							roomFunction.stopSound("tranActRules02")
							roomFunction.playSoundTivite(false, "wrong", "negative");
							tranThreeFuncs.wallMoveTwo(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
							usersInfos.RetryCount++
							cbjh = 1
							zwy = 1
							//tranInfos.blueProject = 0
							engine.log("chongqiqqqqqqqqqq")
						} else if (nowInfos.lifePoint == 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							roomFunction.playSoundTivite(false, "wrong", "negative");

							wanFa_tranThree.gameLevelEnd()

						}
						break;
				}
			} else if (levelInfos.level == 3) {
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
						break;
					case 5:
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
						break;
					case 6:
						usersInfos.UseLife++
						if (nowInfos.lifePoint > 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							//dontMove = 0
							roomFunction.stopSound("tranActRules")
							roomFunction.stopSound("tranActRules02")
							roomFunction.playSoundTivite(false, "wrong", "negative");
							tranThreeFuncs.wallMoveTwo(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
							usersInfos.RetryCount++
							cbjh = 1
							zwy = 1
							//tranInfos.blueProject = 0
							engine.log("chongqiqqqqqqqqqq")
						} else if (nowInfos.lifePoint == 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							roomFunction.playSoundTivite(false, "wrong", "negative");

							wanFa_tranThree.gameLevelEnd()

						}
						break;
				}
			} else if (levelInfos.level >= 4) {
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
						break;
					case 5:
						usersInfos.UseLife++
						if (nowInfos.lifePoint > 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							//dontMove = 0
							roomFunction.stopSound("tranActRules")
							roomFunction.stopSound("tranActRules02")
							roomFunction.playSoundTivite(false, "wrong", "negative");
							tranThreeFuncs.wallMoveTwo(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
							usersInfos.RetryCount++
							cbjh = 1
							zwy = 1
							//tranInfos.blueProject = 0
							engine.log("chongqiqqqqqqqqqq")
						} else if (nowInfos.lifePoint == 1) {
							nowInfos.lifePoint--;
							gameRules.lifeMove();
							roomFunction.playSoundTivite(false, "wrong", "negative");

							wanFa_tranThree.gameLevelEnd()

						}
						break;
				}
			}

		}, 1000);



	},
	wallMoveTwo(randm) {
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
								"x": 15,
								"y": 41
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
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
								"x": 15,
								"y": 39
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
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
								"x": 15,
								"y": 37
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
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
								"x": 15,
								"y": 34
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo4);



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
	//控制地面和按钮随机亮起
	blueShow() {
		let chart = 0
		while (true) {
			chart = Math.floor(Math.random() * 23)
			if (canTapNum.indexOf(chart) === -1) {
				break
			}
		}
		canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]] = chart
		engine.log("canTapNum[]" + canTapNum)
		tranInfos.wallNum = 0
		tranThreeFuncs.wallMove()
		let opInfo2 = {
			opId: "green" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
			opType: "play",
			opNode: "green00" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
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
	//控制目标点位闪烁
	blueReveal() {
		let opInfo3 = {
			opId: "blue" + canTapNum[0],
			opType: "play",
			opNode: "blue00" + canTapNum[0],
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
		//脚底绿色目标是否闪烁
		// let opInfo4 = {
		// 	opId: "green" + canTapNum[0],
		// 	opType: "play",
		// 	opNode: "green00" + canTapNum[0],
		// 	timeLen: 6,
		// 	loop: "false",
		// 	keyFrames: [
		// 		{
		// 			t: 0,
		// 			keyFrame: {
		// 				shape: {
		// 					rgba: {
		// 						r: 0,
		// 						g: 254,
		// 						b: 0,
		// 						a: 1
		// 					}
		// 				}
		// 			}
		// 		},
		// 		{
		// 			t: 1,
		// 			keyFrame: {
		// 				visible: false,
		// 				canTap: false,
		// 				shape: {
		// 					rgba: {
		// 						r: 0,
		// 						g: 254,
		// 						b: 0,
		// 						a: 0.1
		// 					}
		// 				}
		// 			}
		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo4);
	},
	allblack() {
		let opInfo1 = {
			opId: "black0089",
			opType: "play",
			opNode: "black0089",
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
			opId: "black0089",
			opType: "play",
			opNode: "black0089",
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
		setTimeout(() => {
			dontMove = 1
			gameFuncs.op(opInfo2);
		}, 7000);

	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_tranThree.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_tranThree.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_tranThree.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_tranThree.gameTimeOver)
	},


	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				// setTimeout(() => {
				// 	tranThreeFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				tranThreeFuncs.tapWrong.determine = setTimeout(() => {
					tranThreeFuncs.addBlink(x, y)
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
						roomFunction.playSoundTivite(false, "wrong", "negative");
						wanFa_tranThree.gameLevelEnd()

					}
				}, 75);
			}

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
	randomRed(redNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 12) + 2
			let y = Math.floor(Math.random() * 31) + 2
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = ""
		let i = 0;
		while (i < redNum) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x
			let y = res.y
			temp += "," + res.key

			let opInfo = {
				opId: "addRed" + i,
				opType: "addNode",
				opNode: "red300",
				nodes: [{
					nodeId: "red" + i,
					surface: "b",
					pt: {
						x: x,
						y: y
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
							r: 254,
							g: 0,
							b: 0,
							a: 1
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},


	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		// engine.log("blue--------" + tranInfos.blueProject)

		if (nodeId == ("blue00" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]]) && onOff == true && dontMove == 1 && tranInfos.blueProject == 1) {
			usersInfos.ValidTarget++
			tranThreeFuncs.wallMoveTwo(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
			clearInterval(tranThreeFuncs.wallMove.wallCode)
			let opInfo1 = {
				opId: "blue" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
				opType: "play",
				opNode: "blue00" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
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

			// gameFuncs.op(opInfo2);

			engine.log("tranInfos.whoClos--=" + tranInfos.whoClos)
			engine.log("tranInfos.remonber999=" + tranInfos.remonber)
			//cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
			if (usersInfos.usersResult.length <= 3) {
				arrNew.shift()

			} else if (usersInfos.usersResult.length >= 3) {
				qishi.shift()
			}
			engine.log("qishi---" + arrNew)
			tranInfos.remonber = canTapNum
			tranInfos.whoClos = canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]]
			tranThreeFuncs.blueShow()
			tranThreeFuncs.blueNoTap(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
			if (nowInfos.target > 1) {
				roomFunction.playSoundTivite(false, "pick", "positive")
				nowInfos.target--
				nowInfos.allTarget++
				usersInfos.gameScore += 5
				usersInfos.levelScore += 5
				tranThreeFuncs.ScorePlay()
			} else if (nowInfos.target == 1) {
				roomFunction.playSoundTivite(false, "pick", "positive")
				nowInfos.target--
				nowInfos.allTarget++
				usersInfos.gameScore += 5
				usersInfos.levelScore += 5
				tranThreeFuncs.ScorePlay()
				wanFa_tranThree.gameLevelEnd()
			}
		}



	},
	greenTapTwo(face, x, y, onOff, nodeId, event) {
		if (face == "b" && (nodeId == ("green00" + canTapNum[canTapNum.length - 1])) && onOff == true && dontMove == 0) {
			tranInfos.blueProject = 1
		}
	},

	greenTap(face, x, y, onOff, nodeId, event) {
		if (face == "b" && (nodeId == ("green00" + tranInfos.remonber[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]])) && onOff == true) {
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
		let screenCir = setInterval(() => {
			if (pickInfos.screenCirCtl == 1) {
				clearInterval(screenCir)
				return
			}
			let usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"]
			let ganmeEndScreenShow = []
			for (let i = 0; i < usersInfos.allUsers.length; i++) {
				ganmeEndScreenShow.push({
					userColor: usercolors[i],
					userName: pkNameList[i],
					//userScore: pickInfos.block2Infos[i]
				})
			}
			//将数组排序
			ganmeEndScreenShow.sort((a, b) => b.userScore - a.userScore)
			//engine.log("xxxxxxxx-hefenghefeng-xxxxxxxx" + JSON.stringify(ganmeEndScreenShow))
			//将排序后数据遍历出来在屏幕显示那里转成字符串
			let userColorShowString = ganmeEndScreenShow.map(item => item.userColor);
			let userNameShowString = ganmeEndScreenShow.map(item => item.userName);
			let userScoreShowString = ganmeEndScreenShow.map(item => item.userScore);
			//内屏显示模块
			let opInfo = {
				opId: "jingjiLevel",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_3b01",
					block1: {
						model: "dis_b_columnRank", //排列
						label1: "得 分 排 名", //标题
						value1: userColorShowString.join(','), //色值逗号分隔
						label2: userNameShowString.join(','), //用户排列名
						value2: userScoreShowString.join(','), //用户排列值
					},
					block2: {
						model: "dis_b_numUnit",
						label1: "SECONDS",
						value1: nowInfos.gameCountTime - 1
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "目标块数",
						value1: nowInfos.target
					}
				}
			}
			gameFuncs.op(opInfo)
		}, 100)
	},
	//基础红绿蓝游戏内屏倒计时、目标数量、得分显示。该函数用于刷新得分。
	ScorePlay() {
		let opInfo = {
			opId: "selectQuestion",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_3b01",
				block1: {
					model: "dis_b_choice",
					label1: "各组消灭块数",
					value1: pkNameList.toString(),
					lavel2: "",
					value2: "#FF0000,#0000fe,#00fe00,#fec300,#00FFFF,#8b4513"
				},
				block2: {
					model: "dis_b_numUnit",
					label1: "SECONDS",
					value1: nowInfos.gameCountTime - 1
				},
				block3: {
					model: "dis_b_numUnit",
					label1: "目 标 块 数",
					value1: nowInfos.target
				},
			}
		}
		gameFuncs.op(opInfo)
	},


}
