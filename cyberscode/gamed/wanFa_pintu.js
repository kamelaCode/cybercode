const wanFa_pintu = {
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_pintu.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_pintu.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_pintu.gameDestroy);
		//重置全局变量
		pintuFuncs.resetAll()
		clearInterval(pintuFuncs.CountPlay.innerCount)
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
		wanFa_pintu.gameStart.startLoop = setInterval(() => {
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
					roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					//pintuFuncs.CountPlay();
					break;
				case 17:
					clearInterval(wanFa_pintu.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		nowInfos.nowGameid = gameid
		nowInfos.gameCountTime = 90;
		if (gameid.startsWith("pintu")) {
			pintuFuncs.CountPlay()

			setTimeout(() => {
				gameRules.lifeMove();
				engine.addEventListener("gameTaped", wanFa_pintu.gameTaped)
			}, 200);
			if (gameid == "pintu1-hf") {
				roomFunction.playSound(false, "pintuRules");
				setTimeout(() => {
					roomFunction.playSound(true, "pintuBgm", "background");
				}, 10000);
				let opInfo = {
					opId: "baohuPlay",
					opType: "play",
					opNode: "baohu",
					timeLen: 10,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: true
							}
						},
						{
							t: 1,
							keyFrame: {
								visible: false,
								canTap: false
							}
						}
					]
				}
				gameFuncs.op(opInfo);
			} else if (gameid == "pintu2-hf" || gameid == "pintu3-hf") {
				roomFunction.playSound(false, "pintuhuidao");
				let opInfo = {
					opId: "baohuPlay",
					opType: "play",
					opNode: "baohu",
					timeLen: 5,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: true
							}
						},
						{
							t: 1,
							keyFrame: {
								visible: false,
								canTap: false
							}
						}
					]
				}
				gameFuncs.op(opInfo);
			}
			//获取固定坐标进行难度划分
			pintuFuncs.setStartVariable()
			for (let i = 0; i < pintuInfos.targetPointArray.length; i++) {
				let opInfo = {
					opId: "mubiao" + i,
					opType: "addNode",
					opNode: "",
					nodes: [{
						nodeId: "mubiao" + i,
						surface: "b",
						pt: {
							x: pintuInfos.targetPointArray[i][0],
							y: pintuInfos.targetPointArray[i][1],
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
									y: 0,
								},
								rb: {
									x: 0,
									y: 0,
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}
					}]
				}
				gameFuncs.op(opInfo)
			}
			pintuInfos.targetPointArray.map((item) => {
				pintuInfos.hhhhh.push(item.toString())
			})
		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (onOff == true) {
			usersInfos.ValidTrigger++
		}
		let hhh = gameFuncs.surfacePointInfo("b", x, y);
		let hefeng = JSON.parse(hhh)
		if (hefeng.rgb.G == 0 && hefeng.rgb.B == 0 && hefeng.rgb.R == 0 && onOff == true) {
			pintuFuncs.colorChangeTap(face, x, y, onOff, nodeId, event);
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(pintuFuncs.CountPlay.innerCount)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)

	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")

		clearInterval(pintuFuncs.CountPlay.innerCount)
		roomFunction.stopSound("pintuBgm")
		roomFunction.stopSound("daoshu10")
		roomFunction.goToGameLevel("leave_hold", "none")
		pintuFuncs.rmAllListener()
		wanFaCtl_pintuCtl.gameEndCtl()
		levelInfos.gameIdList = []
	}

}




const pintuFuncs = {
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
		pintuInfos.uesrTapArry = [];
		pintuInfos.tapProject = 0;
		pintuInfos.hhhhh = [];
		pintuInfos.gameNums = 0;
		// pintuInfos.clearCtl = 0;
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_pintu.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_pintu.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_pintu.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_pintu.gameTaped)
	},
	//设置每局开始变量
	setStartVariable() {
		let objectPlace = {}
		objectPlace.leave11 = [[2, 32], [2, 33], [2, 34], [2, 35], [2, 36], [2, 37], [2, 38], [2, 39], [2, 40], [2, 41], [3, 32], [3, 33], [3, 34], [3, 35], [3, 36], [3, 37], [3, 38], [3, 39], [3, 40], [3, 41], [12, 32], [12, 33], [12, 34], [12, 35], [12, 36], [12, 37], [12, 38], [12, 39], [12, 40], [12, 41], [13, 32], [13, 33], [13, 34], [13, 35], [13, 36], [13, 37], [13, 38], [13, 39], [13, 40], [13, 41]]
		objectPlace.leave12 = [[2, 32], [2, 33], [2, 34], [2, 35], [2, 36], [2, 37], [2, 38], [2, 39], [2, 40], [2, 41], [3, 32], [3, 33], [3, 34], [3, 35], [3, 36], [3, 37], [3, 38], [3, 39], [3, 40], [3, 41], [7, 32], [7, 33], [7, 34], [7, 35], [7, 36], [7, 37], [7, 38], [7, 39], [7, 40], [7, 41], [8, 32], [8, 33], [8, 34], [8, 35], [8, 36], [8, 37], [8, 38], [8, 39], [8, 40], [8, 41], [12, 32], [12, 33], [12, 34], [12, 35], [12, 36], [12, 37], [12, 38], [12, 39], [12, 40], [12, 41], [13, 32], [13, 33], [13, 34], [13, 35], [13, 36], [13, 37], [13, 38], [13, 39], [13, 40], [13, 41]]
		objectPlace.leave13 = [[0, 32], [0, 33], [0, 34], [0, 35], [0, 36], [0, 37], [0, 38], [0, 39], [0, 40], [0, 41], [2, 32], [2, 33], [2, 34], [2, 35], [2, 36], [2, 37], [2, 38], [2, 39], [2, 40], [2, 41], [4, 32], [4, 33], [4, 34], [4, 35], [4, 36], [4, 37], [4, 38], [4, 39], [4, 40], [4, 41], [7, 32], [7, 33], [7, 34], [7, 35], [7, 36], [7, 37], [7, 38], [7, 39], [7, 40], [7, 41], [10, 32], [10, 33], [10, 34], [10, 35], [10, 36], [10, 37], [10, 38], [10, 39], [10, 40], [10, 41], [13, 32], [13, 33], [13, 34], [13, 35], [13, 36], [13, 37], [13, 38], [13, 39], [13, 40], [13, 41], [15, 32], [15, 33], [15, 34], [15, 35], [15, 36], [15, 37], [15, 38], [15, 39], [15, 40], [15, 41]]
		objectPlace.leave21 = [[0, 41], [1, 40], [1, 41], [2, 39], [2, 40], [3, 38], [3, 39], [4, 37], [4, 38], [5, 36], [5, 37], [5, 41], [6, 35], [6, 36], [6, 40], [6, 41], [7, 34], [7, 35], [7, 39], [7, 40], [8, 33], [8, 34], [8, 38], [8, 39], [9, 32], [9, 33], [9, 37], [9, 38], [10, 32], [10, 36], [10, 37], [11, 35], [11, 36], [12, 34], [12, 35], [13, 33], [13, 34], [14, 32], [14, 33], [15, 32]]
		objectPlace.leave22 = [[0, 36], [0, 37], [0, 41], [1, 35], [1, 36], [1, 40], [1, 41], [2, 34], [2, 35], [2, 39], [2, 40], [3, 33], [3, 34], [3, 38], [3, 39], [4, 32], [4, 33], [4, 37], [4, 38], [5, 32], [5, 36], [5, 37], [5, 41], [6, 35], [6, 36], [6, 40], [6, 41], [7, 34], [7, 35], [7, 39], [7, 40], [8, 33], [8, 34], [8, 38], [8, 39], [9, 32], [9, 33], [9, 37], [9, 38], [10, 32], [10, 36], [10, 37], [11, 35], [11, 36], [11, 41], [12, 34], [12, 35], [12, 40], [12, 41], [13, 33], [13, 34], [13, 39], [13, 40], [14, 32], [14, 33], [14, 38], [14, 39], [15, 32], [15, 37], [15, 38]]
		objectPlace.leave23 = [[0, 32], [1, 32], [1, 33], [2, 32], [2, 33], [2, 34], [3, 32], [3, 34], [3, 35], [4, 35], [4, 36], [5, 32], [5, 36], [5, 37], [6, 32], [6, 33], [6, 37], [6, 38], [7, 32], [7, 33], [7, 34], [7, 38], [7, 39], [7, 41], [8, 32], [8, 34], [8, 35], [8, 39], [8, 40], [8, 41], [9, 35], [9, 36], [9, 40], [9, 41], [10, 36], [10, 37], [10, 41], [11, 37], [11, 38], [12, 38], [12, 39], [12, 41], [13, 39], [13, 40], [13, 41], [14, 40], [14, 41], [15, 41]]
		objectPlace.leave31 = [[0, 32], [0, 34], [0, 39], [0, 41], [1, 33], [1, 40], [2, 32], [2, 34], [2, 39], [2, 41], [4, 32], [4, 41], [5, 33], [5, 40], [6, 34], [6, 39], [7, 35], [7, 38], [8, 36], [8, 37], [9, 36], [9, 37], [10, 35], [10, 38], [11, 34], [11, 39], [12, 33], [12, 40], [13, 32], [13, 41]]
		objectPlace.leave32 = [[1, 32], [1, 38], [2, 32], [2, 33], [2, 37], [2, 38], [3, 32], [3, 34], [3, 36], [3, 38], [4, 35], [5, 32], [5, 34], [5, 36], [5, 38], [6, 32], [6, 33], [6, 37], [6, 38], [7, 32], [7, 38], [9, 32], [9, 38], [10, 32], [10, 33], [10, 37], [10, 38], [11, 32], [11, 34], [11, 36], [11, 38], [12, 35], [13, 32], [13, 34], [13, 36], [13, 38], [14, 32], [14, 33], [14, 37], [14, 38], [15, 32], [15, 38]]
		objectPlace.leave33 = [[0, 32], [0, 36], [0, 37], [0, 41], [1, 33], [1, 35], [1, 38], [1, 40], [2, 34], [2, 39], [3, 33], [3, 35], [3, 38], [3, 40], [4, 32], [4, 36], [4, 37], [4, 41], [6, 32], [6, 35], [6, 37], [6, 40], [7, 33], [7, 34], [7, 38], [7, 39], [8, 33], [8, 34], [8, 38], [8, 39], [9, 32], [9, 35], [9, 37], [9, 40], [11, 32], [11, 36], [11, 37], [11, 41], [12, 33], [12, 35], [12, 38], [12, 40], [13, 34], [13, 39], [14, 33], [14, 35], [14, 38], [14, 40], [15, 32], [15, 36], [15, 37], [15, 41]]
		objectPlace.leave41 = [[1, 32], [1, 34], [1, 36], [1, 38], [1, 40], [2, 32], [2, 34], [2, 36], [2, 38], [2, 40], [5, 32], [5, 34], [5, 36], [5, 38], [5, 40], [6, 32], [6, 34], [6, 36], [6, 38], [6, 40], [9, 32], [9, 34], [9, 36], [9, 38], [9, 40], [10, 32], [10, 34], [10, 36], [10, 38], [10, 40], [13, 32], [13, 34], [13, 36], [13, 38], [13, 40], [14, 32], [14, 34], [14, 36], [14, 38], [14, 40]]
		objectPlace.leave42 = [[1, 32], [1, 36], [1, 40], [2, 32], [2, 34], [2, 36], [2, 38], [2, 40], [5, 32], [5, 36], [5, 40], [6, 32], [6, 34], [6, 36], [6, 38], [6, 40], [9, 32], [9, 36], [9, 40], [10, 32], [10, 34], [10, 36], [10, 38], [10, 40], [13, 32], [13, 36], [13, 40], [14, 32], [14, 34], [14, 36], [14, 38], [14, 40]]
		objectPlace.leave43 = [[1, 32], [1, 36], [1, 38], [2, 33], [2, 35], [2, 39], [2, 41], [5, 32], [5, 36], [5, 38], [6, 33], [6, 35], [6, 39], [6, 41], [9, 32], [9, 34], [9, 38], [9, 40], [10, 35], [10, 37], [10, 41], [13, 32], [13, 34], [13, 38], [13, 40], [14, 35], [14, 37], [14, 41]]
		objectPlace.leave51 = [[2, 32], [3, 32], [4, 34], [5, 34], [6, 36], [7, 36], [8, 38], [9, 38], [10, 33], [10, 40], [11, 33], [11, 35], [11, 40], [12, 35], [12, 37], [13, 37], [13, 39], [14, 39], [15, 41]]
		objectPlace.leave52 = [[0, 32], [0, 41], [1, 32], [1, 34], [1, 41], [2, 34], [2, 36], [2, 39], [3, 36], [3, 39], [7, 32], [7, 34], [7, 36], [7, 38], [7, 40], [8, 34], [8, 38], [12, 36], [12, 39], [13, 34], [13, 36], [13, 39], [14, 32], [14, 34], [14, 41], [15, 32], [15, 41]]
		objectPlace.leave53 = [[0, 32], [1, 34], [2, 36], [3, 32], [3, 38], [4, 34], [5, 36], [5, 40], [6, 32], [6, 38], [7, 34], [7, 40], [8, 36], [9, 32], [9, 38], [10, 34], [10, 40], [11, 36], [12, 38], [13, 40]]
		objectPlace.leave61 = pintuFuncs.generateRandomArray([], 60)
		objectPlace.leave62 = pintuFuncs.generateRandomArray([], 60)
		objectPlace.leave63 = pintuFuncs.generateRandomArray([], 60)
		objectPlace.leave71 = pintuFuncs.generateRandomArray([], 50)
		objectPlace.leave72 = pintuFuncs.generateRandomArray([], 50)
		objectPlace.leave73 = pintuFuncs.generateRandomArray([], 50)
		objectPlace.leave81 = pintuFuncs.generateRandomArray([], 40)
		objectPlace.leave82 = pintuFuncs.generateRandomArray([], 40)
		objectPlace.leave83 = pintuFuncs.generateRandomArray([], 40)
		objectPlace.leave91 = pintuFuncs.generateRandomArray([], 30)
		objectPlace.leave92 = pintuFuncs.generateRandomArray([], 30)
		objectPlace.leave93 = pintuFuncs.generateRandomArray([], 30)
		objectPlace.leave101 = pintuFuncs.generateRandomArray([], 20)
		objectPlace.leave102 = pintuFuncs.generateRandomArray([], 20)
		objectPlace.leave103 = pintuFuncs.generateRandomArray([], 20)

		let result = nowInfos.nowGameid.replace(/[^0-9]/g, '');
		let placeName = "leave" + levelInfos.level + result
		pintuInfos.targetPointArray = objectPlace[(placeName).toString()]
	},





	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (pintuInfos.hhhhh.some(item => item == ([x, (y > 15 ? y + 14 : y + 28)])) && nowInfos.lifePoint != 0) {
			fastop.removeNode("caita" + x + "-" + y, "caita" + x + "-" + (y > 15 ? y - 14 : y + 14))
		}
		if (nowInfos.lifeProtect == 0) {
			nowInfos.lifeProtect = 1;
			setTimeout(function () {
				nowInfos.lifeProtect = 0
				fastop.removeNode("wrongRedRemove", "wrongRed")
			}, 2000);
			pintuFuncs.addBlink(x, y)
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
				wanFa_pintu.gameLevelEnd()
			}
		}
	},

	colorChangeTap(face, x, y, onOff, nodeId, event) {
		let isMeetOne = pintuInfos.hhhhh.some(item => item == ([x, y + 28]));
		if ((y > 3 && y < 14) && onOff == true && isMeetOne) {
			roomFunction.playSoundTivite(false, "blue-competMode", "positive")
			let opInfo = {
				opId: "caita" + x + "-" + y,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "caita" + x + "-" + y,
					surface: "b",
					pt: {
						x: x,
						y: y,
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
								y: 0,
							},
							rb: {
								x: 0,
								y: 0,
							}
						},
						rgba: {
							r: 254,
							g: 254,
							b: 254,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo)
			let gameId = nowInfos.nowGameid
			if (!(pintuInfos.hhhhh.some(item => item == ([x, y + 28]))) || gameId != nowInfos.nowGameid) {
				return
			}
			let strTwo = gameFuncs.surfacePointInfo("b", x, y + 14);
			let infoTwo = JSON.parse(strTwo)
			if (infoTwo.rgb.G == 254 && infoTwo.rgb.B == 254 && infoTwo.rgb.R == 254) {
				roomFunction.playSoundTivite(false, "right", "positive")
				this.addSuccessBlack(x, y)
				usersInfos.ValidTarget++
				for (let i = 0; i < pintuInfos.hhhhh.length; i++) {
					if (pintuInfos.hhhhh[i] == ([x, y + 28])) {

						pintuInfos.hhhhh.splice(i, 1)
						break
					}
				}
				if (pintuInfos.hhhhh.length == 0) {
					pintuInfos.gameNums++
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						setTimeout(() => {
							roomFunction.goToNextGame()
						}, 1000);
						roomFunction.playSound(false, "levelup")
					} else {
						wanFa_pintu.gameLevelEnd()
					}
				}
			}
			pintuFuncs.colorChangeTap.kouxue = setTimeout(() => {
				if (!(pintuInfos.hhhhh.some(item => item == ([x, y + 28]))) || gameId != nowInfos.nowGameid) {
					return
				}
				this.tapWrong(face, x, (y + 14), onOff, nodeId, event)
			}, 1000);
		}


		let isMeetTwo = pintuInfos.hhhhh.some(item => item == ([x, y + 14]));
		if ((y > 17 && y < 28) && onOff == true && isMeetTwo) {
			roomFunction.playSoundTivite(false, "cyan-competMode", "positive")
			let opInfo = {
				opId: "caita" + x + "-" + y,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "caita" + x + "-" + y,
					surface: "b",
					pt: {
						x: x,
						y: y,
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
								y: 0,
							},
							rb: {
								x: 0,
								y: 0,
							}
						},
						rgba: {
							r: 254,
							g: 254,
							b: 254,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo)
			let gameId = nowInfos.nowGameid
			if (!(pintuInfos.hhhhh.some(item => item == ([x, y + 14]))) || gameId != nowInfos.nowGameid) {
				return
			}
			let strOne = gameFuncs.surfacePointInfo("b", x, y - 14);
			let infoOne = JSON.parse(strOne)
			if (infoOne.rgb.G == 254 && infoOne.rgb.B == 254 && infoOne.rgb.R == 254) {
				roomFunction.playSoundTivite(false, "right", "positive")
				this.addSuccessBlack(x, y)
				usersInfos.ValidTarget++
				for (let i = 0; i < pintuInfos.hhhhh.length; i++) {
					if (pintuInfos.hhhhh[i] == ([x, y + 14])) {
						pintuInfos.hhhhh.splice(i, 1)
						break
					}

				}
				if (pintuInfos.hhhhh.length == 0) {
					pintuInfos.gameNums++
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						setTimeout(() => {
							roomFunction.goToNextGame()
						}, 1000);
						roomFunction.playSound(false, "levelup")
					} else {
						wanFa_pintu.gameLevelEnd()
					}
				}

			}
			pintuFuncs.colorChangeTap.kouxue = setTimeout(() => {
				if (!(pintuInfos.hhhhh.some(item => item == ([x, y + 14]))) || gameId != nowInfos.nowGameid) {
					return
				}
				this.tapWrong(face, x, (y - 14), onOff, nodeId, event)
			}, 1000);
		}
		if (((y > 3 && y < 14) && onOff == true && !isMeetOne) || ((y > 16 && y < 28) && onOff == true && !isMeetTwo)) {
			this.tapWrong(face, x, y, onOff, nodeId, event)
		}
	},
	addSuccessBlack(x, y) {
		let arr = []
		arr[0] = y < 14 ? y : y - 14
		arr[1] = arr[0] + 14
		arr[2] = arr[0] + 28
		for (let i = 0; i < 3; i++) {
			let opInfo = {
				opId: "addSuccessBlack" + x + "_" + arr[i],
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "successBlack" + x + "_" + arr[i],
					surface: "b",
					pt: {
						x: x,
						y: arr[i],
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
								y: 0,
							},
							rb: {
								x: 0,
								y: 0,
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
			gameFuncs.op(opInfo)
		}
	},

	// 生成一个长度为length的与已知的二维数组不重复的二维数组
	generateRandomArray(knownArr, length) {
		let yRange = 32
		const result = [];
		const set = new Set();
		while (result.length < length) {
			let x = Math.floor(Math.random() * 15); // 生成随机的x坐标
			let y = Math.floor(Math.random() * 10) + yRange; // 生成随机的y坐标
			const isD = knownArr.some((item) => item[0] === x && item[1] === y); // 判断是否与已知数组重复
			const str = [x, y].join(); // 将生成的二维坐标转为字符串
			if (!isD && !set.has(str)) {
				set.add(str); // 将该字符串添加到set中
				result.push([x, y]); // 添加到数组中
			}
		}
		return result;
	},

	addBlink(x, y) {
		let opInfo = {
			opId: "addWrongRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "wrongRed",
				surface: "b",
				pt: {
					x: x,
					y: y >= 18 ? y + 14 : y + 28,
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
							y: 0,
						},
						rb: {
							x: 0,
							y: 0,
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
	//踩踏错误或没有同时踩下后口血将地面清空

	CountPlay() {
		pintuFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						value1: "#FFFFFF",
						label2: "white",
						value2: (pintuInfos.hhhhh.length)
					},
					block3: {
						model: "dis_b_scoreGame",
						label2: "关卡总分",
						value2: (pintuInfos.gameNums * 40)
					}
				}
			}
			gameFuncs.op(opInfo);
			nowInfos.gameCountTime--;
			if (nowInfos.gameCountTime == 0) {
				wanFa_pintu.gameLevelEnd()
			}
			if (nowInfos.gameCountTime == 10) {
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
					value1: "#FFFFFF",
					label2: "white",
					value2: (pintuInfos.hhhhh.length)
				},
				block3: {
					model: "dis_b_scoreGame",
					label2: "关卡总分",
					value2: (pintuInfos.gameNums * 40)
				}
			}
		}
		gameFuncs.op(opInfo)
	},


}
