const wanFa_dafeiji = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_dafeiji.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_dafeiji.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_dafeiji.gameDestroy);
		//重置全局变量
		dafeijiFuncs.resetAll()
		clearInterval(dafeijiFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}
		engine.log(levelInfos.gameIdList)



		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_dafeiji.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("dafeiji")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						dafeijiFuncs.CountPlay();
					}
					break;
				case 22:
					dafeijiFuncs.monitorArr()
					break;
				case 23:
					clearInterval(wanFa_dafeiji.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("dafeiji")) {
			//根据游戏名称绘制游戏地图
			dafeijiFuncs.feijiPoint(gameid)
			dafeijiInfos.feijiOldPoint = dafeijiInfos.feijiPoint
			nowInfos.gameCountTime = 90;
			nowInfos.lifePoint = 6;
			gameCtl = 0;
			nowInfos.nowGameid = gameid;
			setTimeout(() => {
				gameRules.lifeMove();
			}, 500);
			dafeijiFuncs.ScorePlay()
			//提前讲子弹节点生成
			for (let i = 120; i < 145; i++) {
				for (let j = 120; j < 140; j++) {
					let opInfo = {
						opId: "addBullet" + i + j, //操作id 再控制用
						opType: "addNode", // 操作类型，添加一个节点或精灵
						opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
						nodes: [
							{
								nodeId: "bullet" + i + j, // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: { x: -1, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: true,
								visible: true, //显示，如果为false，逻辑数据会跳过
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
									rgba: { r: 1, g: i, b: j, a: 1 }
								},
							}
						]
					}
					gameFuncs.op(opInfo);
					dafeijiInfos.bulletId.push("bullet" + i + j)
				}
			}
			if (gameid == "dafeiji007-hf" || gameid == "dafeiji002-hf" || gameid == "dafeiji004-hf" || gameid == "dafeiji006-hf") {
				let zidanDiMianArr = dafeijiFuncs.generateRandomArray([], 50)
				for (let i = 0; i < zidanDiMianArr.length; i++) {
					let opInfo = {
						opId: "addDiMian" + i, //操作id 再控制用
						opType: "addNode", // 操作类型，添加一个节点或精灵
						opNode: "dimianFather", // 父节点，如果没有配置，默认到棋盘根节点0,0
						nodes: [
							{
								nodeId: "dimian" + i, // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								pt: { x: zidanDiMianArr[i][0] + 1, y: zidanDiMianArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: true,
								visible: true, //显示，如果为false，逻辑数据会跳过
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
									rgba: { r: 5, g: 145, b: 140, a: 1 }
								},
							}
						]
					}
					gameFuncs.op(opInfo);
				}
				let opInfoFuGai = {
					opId: "addDiMianHeiSe", //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "heise", // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							pt: { x: -1, y: -1 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 0,
										y: 0
									},
									rb: {
										x: 17,
										y: 0
									}
								},
								rgba: { r: 0, g: 0, b: 0, a: 1 }
							},
						}
					]
				}
				gameFuncs.op(opInfoFuGai);
			}

			for (let i = 230; i <= 254; i++) {
				for (let j = 0; j < 10; j++) {
					let opInfo = {
						opId: "addRed" + i + j, //操作id 再控制用
						opType: "addNode", // 操作类型，添加一个节点或精灵
						opNode: "redFather", // 父节点，如果没有配置，默认到棋盘根节点0,0
						nodes: [
							{
								nodeId: "red" + i + j, // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: true,
								visible: true, //显示，如果为false，逻辑数据会跳过
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
									rgba: { r: i, g: 2, b: j, a: 1 }
								},
							}
						]
					}
					gameFuncs.op(opInfo);
					dafeijiInfos.redId.push("red" + i + j)
				}

			}

			if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == 0) {
				if (gameid == "dafeiji008-hf") {
					roomFunction.playSound(false, "dafeijijiaoxue");
					setTimeout(() => {
						roomFunction.playSound(true, "damifengbossbgm", "background")
						dafeijiFuncs.CountPlay()
						engine.addEventListener("gameTaped", wanFa_dafeiji.gameTaped)
					}, 10000);
					return
				} else {
					roomFunction.playSound(false, "dafeijirules");
					setTimeout(() => {
						roomFunction.playSound(true, "damifengbossbgm", "background")
					}, 6000)
				}
			}
			setTimeout(() => {
				// engine.log("hhhhhhhhhaaaa")
				dafeijiFuncs.CountPlay()
				engine.addEventListener("gameTaped", wanFa_dafeiji.gameTaped)
			}, 6000)




		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (nowInfos.nowGameid.startsWith("dafeiji")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}


			engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
			dafeijiFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			dafeijiFuncs.greenTap(face, x, y, onOff, nodeId, event);
			// gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if ((nowInfos.nowGameid == "dafeiji007-hf" || nowInfos.nowGameid == "dafeiji002-hf" || nowInfos.nowGameid == "dafeiji004-hf" || nowInfos.nowGameid == "dafeiji006-hf") && nodeId.startsWith("dimianFather.dimian")) {
				fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
				dafeijiFuncs.tapBiu(face, x, y, onOff, nodeId, event)
			} else if (nowInfos.nowGameid == "dafeiji008-hf" || nowInfos.nowGameid == "dafeiji001-hf" || nowInfos.nowGameid == "dafeiji003-hf" || nowInfos.nowGameid == "dafeiji005-hf") {
				dafeijiFuncs.tapBiu(face, x, y, onOff, nodeId, event)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(dafeijiFuncs.CountPlay.innerCount)
		clearInterval(dafeijiFuncs.CountPlay.innerCount)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			// if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
			// 	roomFunction.goToNextGame()
			// 	roomFunction.playSound(false, "levelup")
			// } else {
			// wanFa_dafeiji.gameLevelEnd()
			// }
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(dafeijiFuncs.CountPlay.innerCount)
		opClear = 1
		roomFunction.stopSound("damifengbgm")
		roomFunction.stopSound("damifengbossbgm")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("fenwei")
		roomFunction.goToGameLevel("leave_hold", "none")
		dafeijiFuncs.rmAllListener()
		wanFaCtl_dafeijiCtl.gameEndCtl(nowInfos.lifePoint, nowInfos.nowGameid)
		levelInfos.gameIdList = []
	}

}


// r1g140b120

const dafeijiFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		opClear = 0;
		dafeijiInfos.bulletId = [];
		dafeijiInfos.redId = [];
		dafeijiInfos.bulletCtl = 0;
		dafeijiInfos.bulletProject = {};
		dafeijiInfos.feijiPoint = 0;
		dafeijiInfos.feijiOldPoint = 0;
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_dafeiji.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_dafeiji.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_dafeiji.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_dafeiji.gameTaped)
	},
	feijiPoint(gameid) {
		switch (gameid) {
			case "dafeiji001-hf":
				dafeijiInfos.feijiPoint = 15
				let feiji001 = [[0, 6], [1, 6], [1, 9], [2, 5], [2, 6], [2, 7], [2, 9], [3, 4], [3, 5], [3, 6], [3, 7], [3, 8], [3, 9], [4, 5], [4, 6], [4, 7], [4, 9], [5, 6], [5, 9], [6, 6], [9, 6], [10, 6], [10, 9], [11, 5], [11, 6], [11, 7], [11, 9], [12, 4], [12, 5], [12, 6], [12, 7], [12, 8], [12, 9], [13, 5], [13, 6], [13, 7], [13, 9], [14, 6], [14, 9], [15, 6]]
				let feijizidan001 = [[1, 5], [2, 4], [3, 3], [4, 4], [5, 5], [10, 5], [11, 4], [12, 3], [13, 4], [14, 5]]
				for (let i = 0; i < feiji001.length; i++) {
					fastop.addDafeiji("addfeiji001-" + i, "feiji001", "feiji001--" + i, "b", (feiji001[i][0] >= 7 ? feiji001[i][0] - 2 : feiji001[i][0]), (feiji001[i][1] - 3), { r: 254, g: 254, b: 254, a: 1 })
				}
				for (let i = 0; i < feijizidan001.length; i++) {
					fastop.addDafeiji("addfeijizidan001-" + i, "feiji001", "feijizidan001--" + i, "b", (feijizidan001[i][0] >= 7 ? feijizidan001[i][0] - 2 : feijizidan001[i][0]), (feijizidan001[i][1] - 3), { r: 254, g: 0, b: 0, a: 1 })
				}
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay001",
						opType: "play",
						opNode: "feiji001",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 0
									}
								}
							},
							{
								t: 0.5,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 42
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 34
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo);
				}, 1000);
				break;
			case "dafeiji002-hf":
				dafeijiInfos.feijiPoint = 15
				let feiji002 = [[1, 4], [2, 4], [2, 5], [3, 3], [3, 4], [3, 5], [3, 6], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [5, 3], [5, 4], [5, 5], [5, 6], [6, 4], [6, 5], [6, 8], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [9, 4], [9, 5], [9, 8], [10, 3], [10, 4], [10, 5], [10, 6], [11, 2], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [12, 3], [12, 4], [12, 5], [12, 6], [13, 4], [13, 5], [14, 4]]
				let feijizidan002 = [[2, 3], [3, 2], [4, 1], [5, 2], [7, 0], [8, 0], [10, 2], [11, 1], [12, 2], [13, 3]]
				for (let i = 0; i < feiji002.length; i++) {
					fastop.addDafeiji("addfeiji002-" + i, "feiji002", "feiji002--" + i, "b", feiji002[i][0], (feiji002[i][1]), { r: 254, g: 254, b: 254, a: 1 })
				}
				for (let i = 0; i < feijizidan002.length; i++) {
					fastop.addDafeiji("addfeijizidan002-" + i, "feiji002", "feijizidan002--" + i, "b", feijizidan002[i][0], (feijizidan002[i][1]), { r: 254, g: 0, b: 0, a: 1 })
				}
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay002",
						opType: "play",
						opNode: "feiji002",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: -16,
										y: 7
									}
								}
							},
							{
								t: 0.33,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: 7
									}
								}
							},
							{
								t: 0.66,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: 33
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 33
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo);
				}, 1000);
				dafeijiInfos.feijizidanArr = feijizidan002
				break;
			case "dafeiji003-hf":
				dafeijiInfos.feijiPoint = 15
				let feiji003 = [[0, 2], [1, 2], [1, 4], [2, 1], [2, 2], [2, 3], [2, 4], [3, 2], [3, 4], [3, 6], [4, 2], [4, 5], [4, 6], [5, 4], [5, 5], [5, 9], [6, 3], [6, 4], [6, 5], [6, 6], [6, 8], [6, 9], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 3], [9, 4], [9, 5], [9, 6], [9, 8], [9, 9], [10, 4], [10, 5], [10, 9], [11, 2], [11, 5], [11, 6], [12, 2], [12, 4], [12, 6], [13, 1], [13, 2], [13, 3], [13, 4], [14, 2], [14, 4], [15, 2]]
				let feijizidan003 = [[1, 1], [2, 0], [3, 1], [5, 3], [6, 2], [7, 1], [8, 1], [9, 2], [10, 3], [12, 1], [13, 0], [14, 1]]
				for (let i = 0; i < feiji003.length; i++) {
					fastop.addDafeiji("addfeiji003-" + i, "feiji003", "feiji003--" + i, "b", feiji003[i][0], (feiji003[i][1]), { r: 254, g: 254, b: 254, a: 1 })
				}
				for (let i = 0; i < feijizidan003.length; i++) {
					fastop.addDafeiji("addfeijizidan003-" + i, "feiji003", "feijizidan003--" + i, "b", feijizidan003[i][0], (feijizidan003[i][1]), { r: 254, g: 0, b: 0, a: 1 })
				}
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay003",
						opType: "play",
						opNode: "feiji003",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 41
									}
								}
							},
							{
								t: 0.4,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: -16
									}
								}
							},
							{
								t: 0.5,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: -16
									}
								}
							},
							{
								t: 0.55,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: 42
									}
								}
							},
							{
								t: 0.6,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 42
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 32
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo);
				}, 1000);
				dafeijiInfos.feijizidanArr = feijizidan003
				break;
			case "dafeiji004-hf":
				dafeijiInfos.feijiPoint = 15
				let feiji004 = [[1, 6], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [5, 4], [5, 5], [5, 6], [5, 7], [5, 9], [6, 3], [6, 4], [6, 5], [6, 6], [6, 7], [6, 9], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 3], [9, 4], [9, 5], [9, 6], [9, 7], [9, 9], [10, 4], [10, 5], [10, 6], [10, 7], [10, 9], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [12, 4], [12, 5], [12, 6], [13, 5], [13, 6], [14, 6]]
				let feijizidan004 = [[1, 5], [2, 4], [3, 3], [4, 2], [7, 0], [8, 0], [11, 2], [12, 3], [13, 4], [14, 5]]
				for (let i = 0; i < feiji004.length; i++) {
					fastop.addDafeiji("addfeiji004-" + i, "feiji004", "feiji004--" + i, "b", feiji004[i][0], (feiji004[i][1]), { r: 254, g: 254, b: 254, a: 1 })
				}
				for (let i = 0; i < feijizidan004.length; i++) {
					fastop.addDafeiji("addfeijizidan004-" + i, "feiji004", "feijizidan004--" + i, "b", feijizidan004[i][0], (feijizidan004[i][1]), { r: 254, g: 0, b: 0, a: 1 })
				}
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay004",
						opType: "play",
						opNode: "feiji004",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: -10
									}
								}
							},
							{
								t: 0.4,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 15
									}
								}
							},
							{
								t: 0.7,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: 15
									}
								}
							},
							{
								t: 0.75,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: 32
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 32
									},
								}
							}
						]
					}
					gameFuncs.op(opInfo);
				}, 1000);
				dafeijiInfos.feijizidanArr = feijizidan004
				break;
			case "dafeiji005-hf":
				dafeijiInfos.feijiPoint = 15
				let feiji005 = [[0, 5], [1, 4], [1, 5], [1, 6], [2, 5], [3, 4], [3, 5], [3, 6], [3, 7], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [4, 8], [5, 4], [5, 5], [5, 6], [5, 7], [6, 5], [6, 6], [6, 7], [6, 9], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 7], [7, 8], [7, 9], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6], [8, 7], [8, 8], [8, 9], [9, 5], [9, 6], [9, 7], [9, 9], [10, 4], [10, 5], [10, 6], [10, 7], [11, 3], [11, 4], [11, 5], [11, 6], [11, 7], [11, 8], [12, 4], [12, 5], [12, 6], [12, 7], [13, 5], [14, 4], [14, 5], [14, 6], [15, 5]]
				let feijizidan005 = [[1, 3], [3, 3], [4, 2], [5, 3], [7, 0], [8, 0], [10, 3], [11, 2], [12, 3], [14, 3]]
				for (let i = 0; i < feiji005.length; i++) {
					fastop.addDafeiji("addfeiji005-" + i, "feiji005", "feiji005--" + i, "b", feiji005[i][0], (feiji005[i][1]), { r: 254, g: 254, b: 254, a: 1 })
				}
				for (let i = 0; i < feijizidan005.length; i++) {
					fastop.addDafeiji("addfeijizidan005-" + i, "feiji005", "feijizidan005--" + i, "b", feijizidan005[i][0], (feijizidan005[i][1]), { r: 254, g: 0, b: 0, a: 1 })
				}
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay005",
						opType: "play",
						opNode: "feiji005",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 41
									}
								}
							},
							{
								t: 0.25,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: -10
									}
								}
							},
							{
								t: 0.5,
								keyFrame: {
									surface: "b",
									pt: {
										x: -16,
										y: -10
									}
								}
							},
							{
								t: 0.75,
								keyFrame: {
									surface: "b",
									pt: {
										x: -16,
										y: 32
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 32
									}

								}
							}

						]
					}
					gameFuncs.op(opInfo);
				}, 1000);
				dafeijiInfos.feijizidanArr = feijizidan005
				break;
			case "dafeiji006-hf":
				dafeijiInfos.feijiPoint = 15
				let feiji006A = [[2, 2], [2, 7], [3, 3], [3, 6], [3, 8], [4, 1], [4, 4], [4, 5], [4, 6], [4, 8], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6], [5, 8], [6, 4], [6, 5], [6, 9], [7, 4], [7, 5], [7, 9], [8, 4], [8, 5], [8, 9], [9, 4], [9, 5], [9, 9], [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 8], [11, 1], [11, 4], [11, 5], [11, 6], [11, 8], [12, 3], [12, 6], [12, 8], [13, 2], [13, 7]]
				let feiji006B = [[4, 7], [11, 7]]
				let feiji006C = [[3, 7], [5, 7], [10, 7], [12, 7]]
				let feijizidan006 = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0]]
				for (let i = 0; i < feiji006A.length; i++) {
					fastop.addDafeiji("addfeiji006A-" + i, "feiji006", "feiji006A--" + i, "b", feiji006A[i][0], (feiji006A[i][1]), { r: 153, g: 0, b: 254, a: 1 })
				}
				for (let i = 0; i < feiji006B.length; i++) {
					fastop.addDafeiji("addfeiji006B-" + i, "feiji006", "feiji006B--" + i, "b", feiji006B[i][0], (feiji006B[i][1]), { r: 253, g: 0, b: 0, a: 1 })
				}
				for (let i = 0; i < feiji006C.length; i++) {
					fastop.addDafeiji("addfeiji006C-" + i, "feiji006", "feiji006C--" + i, "b", feiji006C[i][0], (feiji006C[i][1]), { r: 254, g: 254, b: 254, a: 1 })
				}
				setTimeout(() => {
					for (let i = 0; i < feijizidan006.length; i++) {
						fastop.addDafeiji("addfeijizidan006-" + i, "feiji006", "feijizidan006--" + i, "b", feijizidan006[i][0], (feijizidan006[i][1]), { r: 254, g: 0, b: 0, a: 1 })
					}
				}, 5500);
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay006",
						opType: "play",
						opNode: "feiji006",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: -10
									}
								}
							},
							{
								t: 0.3,
								keyFrame: {
									surface: "b",
									pt: {
										x: 0,
										y: 16
									}
								}
							},
							{
								t: 0.79,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 0,
										y: 16
									}
								}
							},
							{
								t: 0.8,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 0,
										y: 16
									}
								}
							},
							{
								t: 0.9,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 0,
										y: 32
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: 0,
										y: 32
									}

								}
							}

						]
					}
					gameFuncs.op(opInfo);
				}, 1000);
				dafeijiInfos.feijizidanArr = feijizidan006
				break;
			case "dafeiji007-hf":
				dafeijiInfos.feijiPoint = usersInfos.usersResult.length * 2;

				let feiji007A = [[0, 1], [1, 1], [2, 1]]
				switch (usersInfos.usersResult.length) {
					case 2:
						for (let j = 0; j < feiji007A.length; j++) {
							fastop.addDafeiji("feiji007.feiji254" + j, "feiji007.feiji254", "feiji007.feiji254" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji253" + j, "feiji007.feiji253", "feiji007.feiji253" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji252" + j, "feiji007.feiji252", "feiji007.feiji252" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 252, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji251" + j, "feiji007.feiji251", "feiji007.feiji251" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji007.feiji254", "feiji007.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji253", "feiji007.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji252", "feiji007.feiji252", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji251", "feiji007.feiji251", 0.1, true, true, true, true)
						break;
					case 3:
						for (let j = 0; j < feiji007A.length; j++) {
							fastop.addDafeiji("feiji007.feiji254" + j, "feiji007.feiji254", "feiji007.feiji254" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji253" + j, "feiji007.feiji253", "feiji007.feiji253" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji252" + j, "feiji007.feiji252", "feiji007.feiji252" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 252, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji251" + j, "feiji007.feiji251", "feiji007.feiji251" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji249" + j, "feiji007.feiji249", "feiji007.feiji249" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 249, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji248" + j, "feiji007.feiji248", "feiji007.feiji248" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 248, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji007.feiji254", "feiji007.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji253", "feiji007.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji252", "feiji007.feiji252", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji251", "feiji007.feiji251", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji249", "feiji007.feiji249", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji248", "feiji007.feiji248", 0.1, true, true, true, true)
						break;
					case 4:
						for (let j = 0; j < feiji007A.length; j++) {
							fastop.addDafeiji("feiji007.feiji254" + j, "feiji007.feiji254", "feiji007.feiji254" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji253" + j, "feiji007.feiji253", "feiji007.feiji253" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji252" + j, "feiji007.feiji252", "feiji007.feiji252" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 252, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji251" + j, "feiji007.feiji251", "feiji007.feiji251" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji249" + j, "feiji007.feiji249", "feiji007.feiji249" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 249, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji248" + j, "feiji007.feiji248", "feiji007.feiji248" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 248, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji250" + j, "feiji007.feiji250", "feiji007.feiji250" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 250, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji247" + j, "feiji007.feiji247", "feiji007.feiji247" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 247, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji007.feiji254", "feiji007.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji253", "feiji007.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji252", "feiji007.feiji252", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji251", "feiji007.feiji251", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji249", "feiji007.feiji249", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji248", "feiji007.feiji248", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji247", "feiji007.feiji247", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji250", "feiji007.feiji250", 0.1, true, true, true, true)
						break;
					case 5:
						for (let j = 0; j < feiji007A.length; j++) {
							fastop.addDafeiji("feiji007.feiji254" + j, "feiji007.feiji254", "feiji007.feiji254" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji253" + j, "feiji007.feiji253", "feiji007.feiji253" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji252" + j, "feiji007.feiji252", "feiji007.feiji252" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 252, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji251" + j, "feiji007.feiji251", "feiji007.feiji251" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji249" + j, "feiji007.feiji249", "feiji007.feiji249" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 249, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji248" + j, "feiji007.feiji248", "feiji007.feiji248" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 248, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji250" + j, "feiji007.feiji250", "feiji007.feiji250" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 250, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji247" + j, "feiji007.feiji247", "feiji007.feiji247" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 247, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji245" + j, "feiji007.feiji245", "feiji007.feiji245" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 245, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji244" + j, "feiji007.feiji244", "feiji007.feiji244" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 244, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji007.feiji254", "feiji007.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji253", "feiji007.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji252", "feiji007.feiji252", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji251", "feiji007.feiji251", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji249", "feiji007.feiji249", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji248", "feiji007.feiji248", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji247", "feiji007.feiji247", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji250", "feiji007.feiji250", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji245", "feiji007.feiji245", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji244", "feiji007.feiji244", 0.1, true, true, true, true)
						break;
					case 6:
						for (let j = 0; j < feiji007A.length; j++) {
							fastop.addDafeiji("feiji007.feiji254" + j, "feiji007.feiji254", "feiji007.feiji254" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji253" + j, "feiji007.feiji253", "feiji007.feiji253" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji252" + j, "feiji007.feiji252", "feiji007.feiji252" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 252, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji251" + j, "feiji007.feiji251", "feiji007.feiji251" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji249" + j, "feiji007.feiji249", "feiji007.feiji249" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 249, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji248" + j, "feiji007.feiji248", "feiji007.feiji248" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 248, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji250" + j, "feiji007.feiji250", "feiji007.feiji250" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 250, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji247" + j, "feiji007.feiji247", "feiji007.feiji247" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 247, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji245" + j, "feiji007.feiji245", "feiji007.feiji245" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 245, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji244" + j, "feiji007.feiji244", "feiji007.feiji244" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 244, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji246" + j, "feiji007.feiji246", "feiji007.feiji246" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 246, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji007.feiji243" + j, "feiji007.feiji243", "feiji007.feiji243" + j, "b", feiji007A[j][0], (feiji007A[j][1]), { r: 243, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji007.feiji254", "feiji007.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji253", "feiji007.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji252", "feiji007.feiji252", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji251", "feiji007.feiji251", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji249", "feiji007.feiji249", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji248", "feiji007.feiji248", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji247", "feiji007.feiji247", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji250", "feiji007.feiji250", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji245", "feiji007.feiji245", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji244", "feiji007.feiji244", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji246", "feiji007.feiji246", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji007.feiji243", "feiji007.feiji243", 0.1, true, true, true, true)
						break;
				}
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay007",
						opType: "play",
						opNode: "feiji007",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: true,
									canTap: true,
									surface: "b",
									pt: {
										x: 0,
										y: -10
									}
								}
							},
							{
								t: 0.5,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 0,
										y: 32
									}
								}
							},
							{
								t: 0.5,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 16,
										y: 32
									}
								}
							},
							{
								t: 0.51,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 16,
										y: 41
									}
								}
							},
							{
								t: 0.52,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: 41
									}
								}
							},
							{
								t: 0.53,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: -16,
										y: 41
									}
								}
							},
							{
								t: 0.54,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: -16,
										y: 33
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: 0,
										y: 33
									}

								}
							}

						]
					}
					gameFuncs.op(opInfo);
				}, 500);
				break
			case "dafeiji008-hf":
				dafeijiInfos.feijiPoint = usersInfos.usersResult.length
				let feiji008A = [[0, 1], [1, 1], [2, 1]]
				switch (usersInfos.usersResult.length) {
					case 2:
						for (let j = 0; j < feiji008A.length; j++) {
							fastop.addDafeiji("feiji008.feiji254" + j, "feiji008.feiji254", "feiji008.feiji254" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji253" + j, "feiji008.feiji253", "feiji008.feiji253" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji008.feiji254", "feiji008.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji253", "feiji008.feiji253", 0.1, true, true, true, true)
						break;
					case 3:
						for (let j = 0; j < feiji008A.length; j++) {
							fastop.addDafeiji("feiji008.feiji254" + j, "feiji008.feiji254", "feiji008.feiji254" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji253" + j, "feiji008.feiji253", "feiji008.feiji253" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji252" + j, "feiji008.feiji252", "feiji008.feiji252" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 252, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji008.feiji254", "feiji008.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji253", "feiji008.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji252", "feiji008.feiji252", 0.1, true, true, true, true)
						break;
					case 4:
						for (let j = 0; j < feiji008A.length; j++) {
							fastop.addDafeiji("feiji008.feiji253" + j, "feiji008.feiji253", "feiji008.feiji253" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji251" + j, "feiji008.feiji251", "feiji008.feiji251" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji250" + j, "feiji008.feiji250", "feiji008.feiji250" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 250, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji249" + j, "feiji008.feiji249", "feiji008.feiji249" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 249, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji008.feiji251", "feiji008.feiji251", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji253", "feiji008.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji250", "feiji008.feiji250", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji249", "feiji008.feiji249", 0.1, true, true, true, true)
						break;
					case 5:
						for (let j = 0; j < feiji008A.length; j++) {
							fastop.addDafeiji("feiji008.feiji247" + j, "feiji008.feiji247", "feiji008.feiji247" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 247, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji248" + j, "feiji008.feiji248", "feiji008.feiji248" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 248, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji251" + j, "feiji008.feiji251", "feiji008.feiji251" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji250" + j, "feiji008.feiji250", "feiji008.feiji250" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 250, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji249" + j, "feiji008.feiji249", "feiji008.feiji249" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 249, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji008.feiji251", "feiji008.feiji251", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji248", "feiji008.feiji248", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji247", "feiji008.feiji247", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji250", "feiji008.feiji250", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji249", "feiji008.feiji249", 0.1, true, true, true, true)
						break;
					case 6:
						for (let j = 0; j < feiji008A.length; j++) {
							fastop.addDafeiji("feiji008.feiji254" + j, "feiji008.feiji254", "feiji008.feiji254" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 254, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji253" + j, "feiji008.feiji253", "feiji008.feiji253" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 253, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji252" + j, "feiji008.feiji252", "feiji008.feiji252" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 252, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji251" + j, "feiji008.feiji251", "feiji008.feiji251" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 251, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji250" + j, "feiji008.feiji250", "feiji008.feiji250" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 250, g: 254, b: 254, a: 1 })
							fastop.addDafeiji("feiji008.feiji249" + j, "feiji008.feiji249", "feiji008.feiji249" + j, "b", feiji008A[j][0], (feiji008A[j][1]), { r: 249, g: 254, b: 254, a: 1 })
						}
						fastop.setNodeVisible("feiji008.feiji251", "feiji008.feiji251", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji252", "feiji008.feiji252", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji253", "feiji008.feiji253", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji254", "feiji008.feiji254", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji250", "feiji008.feiji250", 0.1, true, true, true, true)
						fastop.setNodeVisible("feiji008.feiji249", "feiji008.feiji249", 0.1, true, true, true, true)
						break;
				}
				setTimeout(() => {
					let opInfo = {
						opId: "feijiPlay008",
						opType: "play",
						opNode: "feiji008",
						timeLen: 5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: true,
									canTap: true,
									surface: "b",
									pt: {
										x: 0,
										y: -10
									}
								}
							},
							{
								t: 0.5,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 0,
										y: 32
									}
								}
							},
							{
								t: 0.5,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 16,
										y: 32
									}
								}
							},
							{
								t: 0.51,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: 16,
										y: 41
									}
								}
							},
							{
								t: 0.52,
								keyFrame: {
									surface: "b",
									pt: {
										x: 16,
										y: 41
									}
								}
							},
							{
								t: 0.53,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: -16,
										y: 41
									}
								}
							},
							{
								t: 0.54,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: -16,
										y: 33
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: 0,
										y: 33
									}

								}
							}

						]
					}
					gameFuncs.op(opInfo);
				}, 500);
				break
		}

		// dafeijiInfos.feijiPoint = 1
	},

	tapBiu(face, x, y, onOff, nodeId, event) {
		let name = []
		name.push(x)
		name.push(y)
		if (onOff == true && (nodeId == "" || nodeId.startsWith("dimianFather.dimian")) && face == "b" && y < 32 && (dafeijiInfos.bulletProject[(name).toString()] == 0 || dafeijiInfos.bulletProject[(name).toString()] == undefined)) {
			roomFunction.playSoundTivite(false, "biu", "positive");
			dafeijiInfos.bulletProject[(name).toString()] = 1
			setTimeout(() => {
				dafeijiInfos.bulletProject[(name).toString()] = 0
			}, 2000);
			if (dafeijiInfos.bulletCtl == 498) {
				dafeijiInfos.bulletCtl = 0
			}
			let opInfo = {
				opId: dafeijiInfos.bulletId[dafeijiInfos.bulletCtl] + "Play",
				opType: "play",
				opNode: dafeijiInfos.bulletId[dafeijiInfos.bulletCtl],
				timeLen: Math.floor((42 - y) / (42 / 4)),
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: true,
							pt: {
								x: x,
								y: y
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							surface: "b",
							pt: {
								x: x,
								y: 42
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo);
			dafeijiInfos.bulletCtl++
		}

	},

	// 生成一个长度为length的与已知的二维数组不重复的二维数组
	generateRandomArray(knownArr, length) {
		const result = [];
		const set = new Set();
		while (result.length < length) {
			let x = Math.floor(Math.random() * 16); // 生成随机的x坐标
			let y = Math.floor(Math.random() * 29); // 生成随机的y坐标
			const isD = knownArr.some((item) => item[0] === x && item[1] === y); // 判断是否与已知数组重复
			const str = [x, y].join(); // 将生成的二维坐标转为字符串
			if (!isD && !set.has(str)) {
				set.add(str); // 将该字符串添加到set中
				result.push([x, y]); // 添加到数组中
			}
		}
		return result;
	},

	monitorArr() {
		let cha = setInterval(() => {
			if (opClear == 1) {
				clearInterval(cha)
				return
			}
			let arrBlue = []
			let arrRed = []
			let feijiArr = []
			for (let x = 0; x < 16; x++) {
				for (let y = 0; y < 42; y++) {
					let str = gameFuncs.surfacePointInfo("b", x, y);
					let info = JSON.parse(str)
					if (info.rgb.R == 1) {
						arrBlue.push([x, y])
					}
					if (info.rgb.G == 2) {
						arrRed.push([x, y])
					}

				}
				for (let y = 32; y < 42; y++) {
					let str = gameFuncs.surfacePointInfo("b", x, y);
					let info = JSON.parse(str)
					if (info.rgb.G == 254 && info.rgb.B == 254) {
						feijiArr.push([x, y])
					}
					if (info.rgb.R == 153 && info.rgb.B == 254 && nowInfos.nowGameid == "dafeiji006-hf") {
						feijiArr.push([x, y])
					}
				}
			}

			// engine.log("feijiArr", JSON.stringify(feijiArr))
			this.collisionFun(arrBlue, arrRed, feijiArr)
		}, 100);
	},
	collisionFun(arrBlue, arrRed, feijiArr) {
		for (let i = 0; i < arrBlue.length; i++) {
			for (let j = 0; j < arrRed.length; j++) {
				if (arrBlue[i][0] == arrRed[j][0] && Math.abs(arrBlue[i][1] - arrRed[j][1]) == 1) {
					engine.log("我要碰撞子弹了")
					let strBlue = gameFuncs.surfacePointInfo("b", arrBlue[i][0], arrBlue[i][1]);
					let infoBlue = JSON.parse(strBlue)
					let opInfo = {
						opId: "bullet" + infoBlue.rgb.G + infoBlue.rgb.B + "Play",
						opType: "play",
						opNode: "bullet" + infoBlue.rgb.G + infoBlue.rgb.B,
						timeLen: 1,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: 2,
										y: 43
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo);
					let strRed = gameFuncs.surfacePointInfo("b", arrRed[j][0], arrRed[j][1]);
					let infoRed = JSON.parse(strRed)
					let sname = "redFather.red" + infoRed.rgb.R + infoRed.rgb.B
					let opInfo1 = {
						opId: sname + "Play",
						opType: "play",
						opNode: sname,
						timeLen: 0.5,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									visible: false,
									canTap: false,
									pt: {
										x: -1,
										y: 0
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",

									pt: {
										x: -2,
										y: 0
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo1);

				}
			}
			for (let k = 0; k < feijiArr.length; k++) {
				if (arrBlue[i][0] == feijiArr[k][0] && Math.abs(arrBlue[i][1] - feijiArr[k][1]) == 1) {
					engine.log("我要碰撞飞机了")
					let strBlue = gameFuncs.surfacePointInfo("b", arrBlue[i][0], arrBlue[i][1]);
					let infoBlue = JSON.parse(strBlue)
					engine.log("bullet" + infoBlue.rgb.G + infoBlue.rgb.B)

					let opInfo = {
						opId: "bulletFeiji" + infoBlue.rgb.G + infoBlue.rgb.B + "Play",
						opType: "play",
						opNode: "bullet" + infoBlue.rgb.G + infoBlue.rgb.B,
						timeLen: 1,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: false,
									canTap: false,
									surface: "b",
									pt: {
										x: 2,
										y: 43
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: 3,
										y: 43
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo);
					if (nowInfos.nowGameid == "dafeiji007-hf" || nowInfos.nowGameid == "dafeiji008-hf") {
						let strRed = gameFuncs.surfacePointInfo("b", feijiArr[k][0], feijiArr[k][1]);
						let infoRed = JSON.parse(strRed)

						let sname = "feiji007.feiji" + infoRed.rgb.R
						if (nowInfos.nowGameid == "dafeiji008-hf") {
							sname = "feiji008.feiji" + infoRed.rgb.R
						}
						let opInfo1 = {
							opId: sname + "Play",
							opType: "play",
							opNode: sname,
							timeLen: 0.5,
							loop: false,
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										surface: "b",
										visible: false,
										canTap: false,
										pt: {
											x: -1,
											y: 0
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										surface: "b",

										pt: {
											x: -2,
											y: 0
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo1);
					}
					dafeijiInfos.feijiPoint--
					roomFunction.playSoundTivite(false, "right", "positive")
					//使墙面背景颜色发生变化
					dafeijiFuncs.blockLife()
					if (dafeijiInfos.feijiPoint == 0) {
						usersInfos.gameScore += 40
						usersInfos.levelScore += 40
						if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
							dafeijiInfos.interCount = 4
							roomFunction.goToNextGame()
							engine.removeEventListener("gameTaped", wanFa_dafeiji.gameTaped)

							roomFunction.playSoundTivite(false, "levelup", "positive")

						} else {
							wanFa_dafeiji.gameLevelEnd()
						}
					}

				}

			}
		}
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			let feijiName = nowInfos.nowGameid.replace(/.*?(feiji\d+)/, '$1').split('-')[0];
			if ((nodeId.startsWith("redFather") || nodeId.startsWith("red") || nodeId.startsWith(feijiName + ".red") || nodeId.startsWith("feiji001")) && onOff == true) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				dafeijiFuncs.addBlink(x, y)
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
					wanFa_dafeiji.gameLevelEnd()
				}

			}
		}
	},
	feijiBiu(arr, zidanName) {
		// engine.log("zidanName", zidanName)
		for (let i = zidanName; i < (arr.length + zidanName); i++) {
			let opInfo = {
				opId: dafeijiInfos.redId[i] + "Play",
				opType: "play",
				opNode: "redFather." + dafeijiInfos.redId[i],
				timeLen: arr[i - zidanName][1] / (42 / 2),
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: true,
							pt: {
								x: arr[i - zidanName][0] + 1,
								y: arr[i - zidanName][1]
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							surface: "b",
							pt: {
								x: arr[i - zidanName][0] + 1,
								y: -1
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo);
		}

	},
	greenTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("green") && onOff == false) {
			roomFunction.playSoundTivite(false, "right", "positive")
			fastop.nodeMove(nodeId, nodeId, 1, false, "a", -1, 0, -1, 0)//节点移动zzptx,zzpty,
			nowInfos.lifePoint++;
			gameRules.lifeMove();
		}

	},
	blockLife() {
		let all = 15
		let y = 31
		if (nowInfos.nowGameid == "dafeiji007-hf" || nowInfos.nowGameid == "dafeiji008-hf" || nowInfos.nowGameid == "dafeiji001-hf") {
			y = 41
		}
		let blockLifeX = dafeijiInfos.feijiPoint == 0 ? -1 : Math.floor(dafeijiInfos.feijiPoint / dafeijiInfos.feijiOldPoint * all)
		let opInfo = {
			opId: "feijiLifePlay",
			opType: "play",
			opNode: "feijiLife",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						visible: true,
						canTap: true,
						pt: {
							x: blockLifeX,
							y: y
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						surface: "b",
						pt: {
							x: blockLifeX,
							y: y
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo);


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
	feijiBiuZidanFun() {
		let redArr = []
		for (let x = 0; x < 16; x++) {
			for (let y = 32; y < 42; y++) {
				let str = gameFuncs.surfacePointInfo("b", x, y);
				let info = JSON.parse(str)
				let R = 254
				if (nowInfos.nowGameid == "dafeiji007-hf" || nowInfos.nowGameid == "dafeiji008-hf") {
					R = 240
				}
				if (info.rgb.R == R && info.rgb.G == 0 && info.rgb.B == 0) {
					redArr.push([x, y])
				}
			}
		}
		if (dafeijiInfos.feijiZidanNums == 20) {
			dafeijiInfos.feijiZidanNums = 0
		}
		dafeijiFuncs.feijiBiu(redArr, (dafeijiInfos.feijiZidanNums * redArr.length))
		dafeijiInfos.feijiZidanNums++

	},
	feijiBiuJiguangFun() {
		// let redArr = []
		// for (let x = 0; x < 16; x++) {
		// 	for (let y = 32; y < 42; y++) {
		// 		let str = gameFuncs.surfacePointInfo("b", x, y);
		// 		let info = JSON.parse(str)
		// 		if (info.rgb.R == 254 && info.rgb.G == 0 && info.rgb.B == 0) {
		// 			redArr.push([x, y])
		// 		}
		// 	}
		// }
		let redArr = dafeijiInfos.feijizidanArr
		let feijiName = nowInfos.nowGameid.replace(/.*?(feiji\d+)/, '$1').split('-')[0];
		//飞机激光发射
		for (let i = 0; i < redArr.length; i++) {
			let opInfo = {
				opId: "addhuan" + i, //操作id 再控制用
				opType: "addNode", // 操作类型，添加一个节点或精灵
				opNode: feijiName, // 父节点，如果没有配置，默认到棋盘根节点0,0
				nodes: [
					{
						nodeId: "red" + i, // 节点id，定位用
						surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
						// node参数
						pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
						rotation: 180, // 角度
						anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
						rotation: 0, // 角度
						nodes: [], // 子节点
						canTap: true,
						visible: true, //显示，如果为false，逻辑数据会跳过
						shape: {
							"type": "rect",
							"rect": {
								"lt": {
									"x": 0,
									"y": 0
								},
								"rb": {
									"x": 0,
									"y": 0
								}
							},
							"ringWidth": 1,
							"ringRgba": {
								"r": 254,
								"g": 0,
								"b": 0,
								"a": 1
							},
							"onOff": true
						}
					}
				]
			}
			gameFuncs.op(opInfo);
			setTimeout(() => {
				let opInfo = {
					opId: feijiName + "red" + i,
					opType: "play",
					opNode: feijiName + ".red" + i,
					timeLen: 2,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
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
									ringRgba: {
										r: 253,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						},
						{
							t: 0.1,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
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
									ringRgba: {
										r: 0,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						},
						{
							t: 0.2,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
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
									ringRgba: {
										r: 253,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						},
						{
							t: 0.3,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
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
									ringRgba: {
										r: 0,
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
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
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
									ringRgba: {
										r: 253,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						},
						{
							t: 0.5,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
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
									ringRgba: {
										r: 0,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						},
						{
							t: 0.6,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
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
									ringRgba: {
										r: 253,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						},
						{
							t: 0.9,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								shape: {
									type: "rect",
									// ringWidth: 2,
									rect: {
										lt: {
											x: 0,
											y: 0
										},
										rb: {
											x: 0,
											y: 42
										}
									},
									ringRgba: {
										r: 253,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						}
						,
						{
							t: 1,
							keyFrame: {
								surface: "b",
								pt: { x: redArr[i][0], y: redArr[i][1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 180, // 角度
								anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
								visible: false,
								canTap: false,
								shape: {
									type: "rect",
									// ringWidth: 2,
									rect: {
										lt: {
											x: 0,
											y: 0
										},
										rb: {
											x: 0,
											y: 42
										}
									},
									ringRgba: {
										r: 253,
										g: 0,
										b: 0,
										a: 1
									}
								}
							}
						}
					]
				}
				gameFuncs.op(opInfo);
			}, 50);
		}


	},
	feijiBiuZhadanFun() {
		let donghua1 = [0, 0, 0, 2, 1, 1, 2, 0, 3, 0, 4, 1, 4, 2, 5, 0, 5, 2]
		let donghua2 = [0, 1, 1, 2, 2, 0, 3, 0, 4, 2, 5, 1, 5, 2, -100, -100, -100, -100]
		let donghua3 = [1, 1, 1, 2, 2, 0, 3, 0, 4, 1, 4, 2, -100, -100, -100, -100, -100]
		let donghua4 = [-100, -100, -100, -100, -100, -100, -100, -100, -100, -100 - 100, -100, -100, -100, -100 - 100, -100, -100, -100, -100]
		let zhaDanWei = []
		dafeijiInfos.interCount = 0
		let feijiName = nowInfos.nowGameid.replace(/.*?(feiji\d+)/, '$1').split('-')[0];
		let donghuaInter = setInterval(() => {
			switch (dafeijiInfos.interCount) {
				case 0:
					for (let i = 0; i < donghua1.length; i += 2) {
						fastop.addDafeiji("donghua" + i, feijiName, feijiName + ".donghua" + i, "b", (donghua1[i] + 5), (donghua1[i + 1] - 3), { r: 254, g: 0, b: 0, a: 1 })
					}
					break;
				case 1:
					for (let i = 0; i < donghua2.length; i += 2) {
						fastop.addDafeiji("donghua" + i, feijiName, feijiName + ".donghua" + i, "b", (donghua2[i] + 5), (donghua2[i + 1] - 3), { r: 254, g: 0, b: 0, a: 1 })

					}
					break;
				case 2:
					for (let i = 0; i < donghua3.length; i += 2) {
						fastop.addDafeiji("donghua" + i, feijiName, feijiName + ".donghua" + i, "b", (donghua3[i] + 5), (donghua3[i + 1] - 3), { r: 254, g: 0, b: 0, a: 1 })

					}
					for (let x = 0; x < 16; x++) {
						let str = gameFuncs.surfacePointInfo("b", x, 31);
						let info = JSON.parse(str)
						if (info.rgb.R == 254 && info.rgb.G == 0 && info.rgb.B == 0) {
							zhaDanWei.push(x)
						}
					}
					break;
				case 3:
					for (let i = 0; i < donghua4.length; i += 2) {
						fastop.addDafeiji("donghua" + i, feijiName, feijiName + ".donghua" + i, "b", (donghua4[i] + 5), (donghua4[i + 1] - 3), { r: 254, g: 0, b: 0, a: 1 })
					}
					engine.log("zhaDanWei[0]" + zhaDanWei[0])
					var randomNum = Math.floor(Math.random() * 10) + 8;
					let opInfo2 = {
						opId: "red9999Play",
						opType: "play",
						opNode: "red999999",
						timeLen: 5,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									pt: {
										x: zhaDanWei[0] + 1,
										y: 31,
									},
									visible: true,
									canTap: "true",
									shape: {
										rect: {
											lt: { x: 0, y: 0 },
											rb: { x: 1, y: 1 }
										}
									}
								}
							},
							{
								t: 0.25,
								keyFrame: {
									surface: "b",
									pt: {
										x: zhaDanWei[0] + 1,
										y: randomNum,
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
											lt: { x: -7, y: -7 },
											rb: { x: 8, y: 8 }
										}
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									visible: "false",
									canTap: "fasle"
								}
							}
						]
					}
					gameFuncs.op(opInfo2);
					break;
				case 4:
					clearInterval(donghuaInter)
					break;
			}
			dafeijiInfos.interCount++
		}, 500);
		let opInfo = {
			opId: "addRed999999", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "red999999", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					pt: { x: -1, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
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
						rgba: { r: 253, g: 0, b: 0, a: 1 }
					},
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	CountPlay() {
		dafeijiFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						label1: "敌人",
						value1: "#FFFFFF",
						label2: "血量",
						value2: dafeijiInfos.feijiPoint
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
			nowInfos.gameCountTime--;

			if (nowInfos.gameCountTime == 10) {
				roomFunction.playSound(false, "daoshu10")
			}
			if (nowInfos.gameCountTime == 0) {
				wanFa_dafeiji.gameLevelEnd()
			}
			if (nowInfos.gameCountTime % 1 == 0) {
				dafeijiFuncs.feijiBiuZidanFun()
			}
			switch (nowInfos.gameCountTime % 10) {
				case 8:
					if (nowInfos.nowGameid != "dafeiji001-hf" && nowInfos.nowGameid != "dafeiji007-hf" && nowInfos.nowGameid != "dafeiji008-hf") {
						dafeijiFuncs.feijiBiuJiguangFun()
					}
					break;
				case 4:
					if (nowInfos.nowGameid != "dafeiji001-hf" && nowInfos.nowGameid != "dafeiji007-hf" && nowInfos.nowGameid != "dafeiji008-hf") {
						dafeijiFuncs.feijiBiuZhadanFun()
					}
					break;

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
					label1: "敌人",
					value1: "#FFFFFF",
					label2: "血量",
					value2: dafeijiInfos.feijiPoint
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
