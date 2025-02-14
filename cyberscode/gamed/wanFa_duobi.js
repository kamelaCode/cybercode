const wanFa_duobi = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_duobi.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_duobi.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_duobi.gameDestroy);
		//重置全局变量
		duobiFuncs.resetAll()
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}

		cbjh = 0



		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_duobi.gameStart.startLoop = setInterval(() => {
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

					if (levelInfos.level != 1 && levelInfos.wanFa != "duobi--paishe") {
						roomFunction.playSound(false, "duobiguize")
					} else if (levelInfos.wanFa == "duobi--paishe") {
						roomFunction.playSound(false, "duobiPaiRules")
					}
					if (levelInfos.wanFa.startsWith("duobi")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						if (levelInfos.level == 1) {
							roomFunction.playSound(false, "togreen")
						}
					}
					break;
				case 21:
					roomFunction.playSound(true, "Duobi", "background")
					if (levelInfos.level == 1 && levelInfos.wanFa != "duobi--paishe") {
						roomFunction.playSound(false, "duobiRules")
					}
					break;
				case 34:
					if (levelInfos.level == 1 && levelInfos.wanFa != "duobi--paishe") {
						roomFunction.playSound(false, "duobi66")
					}
					break;
				case 35:
					clearInterval(wanFa_duobi.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);
		// // leaveVariableCtl =2

		// setTimeout(function () {
		// 	setTimeout(function () {
		// 		roomFunction.playSound(true, "Duobi", "background")
		// 	}, 2000);
		// 	if (levelInfos.level != 1 && levelInfos.wanFa != "duobi--paishe") {
		// 		roomFunction.playSound(false, "duobiguize")
		// 	} else if (levelInfos.level == 1 && levelInfos.wanFa != "duobi--paishe") {
		// 		setTimeout(() => {
		// 			roomFunction.playSound(false, "duobiRules")
		// 		}, 3000);
		// 		setTimeout(() => {
		// 			roomFunction.playSound(false, "duobi66")
		// 		}, 11000);
		// 	} else if (levelInfos.wanFa == "duobi--paishe") {
		// 		roomFunction.playSound(false, "duobiPaiRules")
		// 	}
		// 	if (levelInfos.wanFa.startsWith("duobi")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 		if (levelInfos.level == 1) {
		// 			roomFunction.playSound(false, "togreen")
		// 		}
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
		engine.addEventListener("gameTaped", wanFa_duobi.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("duobi") == false) {

			clearInterval(duobiFuncs.CountPlay.innerCount)
			clearInterval(duobiFuncs.RandomRedPoint.useCount)
			clearInterval(duobiFuncs.RandomCircle.useCount)
			clearInterval(duobiFuncs.MoveLine.useCount)
			clearInterval(duobiFuncs.RedArea.useCount)
			clearInterval(wanFa_duobi.gamePlay.targetCount)
			clearInterval(duobiFuncs.RandomRedPoint1.useCount)
			clearInterval(duobiFuncs.RandomCircle1.useCount)
			clearInterval(duobiFuncs.MoveLine1.useCount)
			clearInterval(duobiFuncs.RedArea1.useCount)
			clearTimeout(wanFa_duobi.gamePlay.duobiConut)
			clearInterval(duobiFuncs.CountPlay.innerCount)
			clearInterval(duobiFuncs.RandomRedPoint.useCount)
			clearInterval(duobiFuncs.RandomCircle.useCount)
			clearInterval(duobiFuncs.RandomRedPoint1.useCount)
			clearInterval(duobiFuncs.RandomCircle1.useCount)
			clearInterval(wanFa_duobi.gamePlay.targetCount)
			clearInterval(duobiFuncs.MoveLine.useCount)
			clearInterval(duobiFuncs.MoveLine1.useCount)
			clearInterval(duobiFuncs.RedArea.useCount)
			clearInterval(duobiFuncs.RedArea1.useCount)
			clearInterval(duobiFuncs.RandomRedPoint1.useCount)
			clearInterval(duobiFuncs.RandomCircle1.useCount)
			clearInterval(duobiFuncs.MoveLine1.useCount)
			clearInterval(duobiFuncs.RedArea1.useCount)
			clearInterval(duobiFuncs.RandomRedPoint.useCount)
			clearInterval(duobiFuncs.RandomCircle.useCount)
			clearInterval(duobiFuncs.RedArea.useCount)
			clearTimeout(wanFa_duobi.gamePlay.duobiConut)
		}
		if (levelInfos.wanFa == "duobi--paishe") {
			let paisheVar = setInterval(() => {
				// engine.log("qingle")
				if (fff == 1) {
					clearInterval(paisheVar)
					return
				}
				let opInfo = {
					opId: "paishe", //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode:"", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "paishe", // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							// nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								"type": "rect",
								"rect": {
									lt: { x: 0, y: 0 },
									rb: { x: 15, y: 1 }
								}
								,
								"rgba": {
									"r": 1,
									"g": 1,
									"b": 1,
									"a": 1
								},

							}

						}
					]
				}
				gameFuncs.op(opInfo);
			}, 100);
		}

		setTimeout(() => {
			if (gameid.startsWith("duobi")) {
				if (levelInfos.wanFa != "duobi--paishe") {
					nowInfos.gameCountTime = 90
				} else {
					nowInfos.gameCountTime = 30

				}
				if (levelInfos.level != 1) {
					duobiVar.targetNum = 30
				}
				nowInfos.nowGameid = gameid;
				gameRules.lifeMove();
				duobiFuncs.CountPlay();
				duobiFuncs.ScorePlay()
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid.startsWith("duobi001-jz") || nowInfos.nowGameid.startsWith("duobi001-look")) {
						nowInfos.gameCountTime = 30
						duobiVar.targetNum = 12
						duobiFuncs.addTargetPoint(6)
						wanFa_duobi.gamePlay.targetCount = setInterval(() => {
							duobiFuncs.addTargetPoint(6)
						}, 15000);
						duobiFuncs.RandomRedPoint(13, 4000, 50)
					}
					if (nowInfos.nowGameid.startsWith("duobi011-cxx") || nowInfos.nowGameid.startsWith("duobi011-look")) {
						duobiFuncs.addTargetPoint(6)
						nowInfos.gameCountTime = 30
						duobiVar.targetNum = 12
						wanFa_duobi.gamePlay.targetCount = setInterval(() => {
							//roomFunction.playSound(false,"shuaxin")
							duobiFuncs.addTargetPoint(6)
						}, 15000);
						roomFunction.playSound(false, "zuo")
						setTimeout(() => {
							roomFunction.playSound(false, "action")
						}, 4000);
						setTimeout(() => {
							roomFunction.playSound(false, "xiaochu")
						}, 5000);
						duobiFuncs.MoveLine(15, 5000, 1, 1)

					}
					// if (nowInfos.nowGameid.startsWith("duobi012-cxx") || nowInfos.nowGameid.startsWith("duobi012-look")) {
					// 	duobiFuncs.addTargetPoint(6)
					// 	nowInfos.gameCountTime = 30
					// 	duobiVar.targetNum = 12
					// 	wanFa_duobi.gamePlay.targetCount = setInterval(() => {
					// 		//roomFunction.playSound(false,"shuaxin")
					// 		duobiFuncs.addTargetPoint(6)
					// 	}, 15000);
					// 	roomFunction.playSound(false, "suiji")
					// 	setTimeout(() => {
					// 		roomFunction.playSound(false, "xiaochu")
					// 	}, 5000);
					// 	duobiFuncs.RandomCircle(5000)

					// }
					if (nowInfos.nowGameid.startsWith("duobi013-cxx") || nowInfos.nowGameid.startsWith("duobi013-look")) {
						duobiFuncs.addTargetPoint(6)
						nowInfos.gameCountTime = 40
						duobiVar.targetNum = 12
						wanFa_duobi.gamePlay.targetCount = setInterval(() => {
							//roomFunction.playSound(false,"shuaxin")
							duobiFuncs.addTargetPoint(6)
						}, 20000);
						roomFunction.playSound(false, "jiao")
						setTimeout(() => {
							roomFunction.playSound(false, "xiaochu")
						}, 7000);
						duobiFuncs.RandomRedPoint(16, 8500, 15)
						//duobiFuncs.MoveLine(16,7000,0,0)
						duobiFuncs.MoveLine(16, 6500, 0, 1)
						//duobiFuncs.RandomCircle(5500)
					}


				}
				if (nowInfos.nowGameid.startsWith("duobi002-rah") || nowInfos.nowGameid.startsWith("duobi002-look")) {
					// roomFunction.playSound(false,"jijiang")
					duobiFuncs.addTargetPoint(6)
					//duobiFuncs.randomBlue1(24)
					duobiFuncs.RandomRedPoint(12, 4000, 15)
					duobiFuncs.MoveLine(14, 10000, 0, 1)
				}
				if (nowInfos.nowGameid.startsWith("duobi003-rah") || nowInfos.nowGameid.startsWith("duobi003-look")) {

					duobiFuncs.addTargetPoint(6)
					//duobiFuncs.randomBlue1(24)
					duobiFuncs.RandomRedPoint(13, 4000, 12)
					duobiFuncs.MoveLine(12, 5000, 1, 1)
					// duobiFuncs.addRed3()
					// duobiFuncs.redPlay3()

				}

				if (nowInfos.nowGameid.startsWith("duobi004-rah") || nowInfos.nowGameid.startsWith("duobi004-look")) {
					//roomFunction.playSound(false,"jijiang")
					duobiFuncs.addTargetPoint(6)
					//duobiFuncs.randomBlue1(24)
					duobiFuncs.RandomRedPoint(14, 5000, 6)
					duobiFuncs.MoveLine(14, 4500, 0, 1)
				}
				if (nowInfos.nowGameid.startsWith("duobi005-rah") || nowInfos.nowGameid.startsWith("duobi005-look")) {
					duobiFuncs.addTargetPoint(6)
					duobiFuncs.RandomRedPoint(13, 3000, 4)
					duobiFuncs.MoveLine(14, 4500, 0, 1)
				}
				if (nowInfos.nowGameid.startsWith("duobi006-rah") || nowInfos.nowGameid.startsWith("duobi006-look")) {
					duobiFuncs.addTargetPoint(6)
					duobiFuncs.MoveLine(12, 5000, 1, 1)
					duobiFuncs.addRed3()
					duobiFuncs.redPlay3()
				}
				if (nowInfos.nowGameid.startsWith("duobi007-rah") || nowInfos.nowGameid.startsWith("duobi007-look")) {
					//roomFunction.playSound(false,"jijiang")
					duobiFuncs.addTargetPoint(6)
					//duobiFuncs.randomBlue1(24)
					duobiFuncs.MoveLine(12, 3000, 0, 1)
					duobiFuncs.RandomRedPoint(11, 2000, 3)
				}
				if (nowInfos.nowGameid.startsWith("duobi008-rah") || nowInfos.nowGameid.startsWith("duobi008-look")) {
					//roomFunction.playSound(false,"jijiang")
					duobiFuncs.addTargetPoint(6)
					//duobiFuncs.randomBlue1(24)
					duobiFuncs.RandomRedPoint(9, 1500, 3)
					duobiFuncs.MoveLine(12, 3200, 0, 1)
					duobiFuncs.RandomCircle(6000)
					// duobiFuncs.RedArea(5,2000)
				}
				if (nowInfos.nowGameid.startsWith("duobi009-rah") || nowInfos.nowGameid.startsWith("duobi009-look")) {
					//roomFunction.playSound(false,"jijiang")
					duobiFuncs.addTargetPoint(6)
					//duobiFuncs.randomBlue1(24)
					duobiFuncs.RandomRedPoint(14, 2800, 3)
					duobiFuncs.RandomCircle(8000)
					duobiFuncs.RedArea(9, 9000)
					duobiFuncs.MoveLine(12, 4000, 0, 1)
				}
				if (nowInfos.nowGameid.startsWith("duobi010-rah") || nowInfos.nowGameid.startsWith("duobi010-look")) {
					//roomFunction.playSound(false,"jijiang")
					duobiFuncs.addTargetPoint(6)
					//duobiFuncs.randomBlue1(24)
					duobiFuncs.RandomCircle(3000)
					duobiFuncs.MoveLine(11, 2000, 0, 1)

					// duobiFuncs.MoveLine(12,1500,0,0)
					// duobiFuncs.RedArea(10,4000)
					// duobiFuncs.RandomCircle(7000)
				}
			}
		}, 3000);


	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("duobi")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			duobiFuncs.TargetTap(face, x, y, onOff, nodeId, event);
			if (x != 0 && y != 0) {
				duobiFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			}
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(duobiFuncs.tapWrong.determine)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearTimeout(wanFa_duobi.gameTaped.zwy)
		clearInterval(duobiFuncs.CountPlay.innerCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.MoveLine.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		clearInterval(wanFa_duobi.gamePlay.targetCount)
		clearInterval(duobiFuncs.RandomRedPoint1.useCount)
		clearInterval(duobiFuncs.RandomCircle1.useCount)
		clearInterval(duobiFuncs.MoveLine1.useCount)
		clearInterval(duobiFuncs.RedArea1.useCount)
		clearTimeout(wanFa_duobi.gamePlay.duobiConut)
		clearInterval(duobiFuncs.CountPlay.innerCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.RandomRedPoint1.useCount)
		clearInterval(duobiFuncs.RandomCircle1.useCount)
		clearInterval(wanFa_duobi.gamePlay.targetCount)
		clearInterval(duobiFuncs.MoveLine.useCount)
		clearInterval(duobiFuncs.MoveLine1.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		clearInterval(duobiFuncs.RedArea1.useCount)
		clearInterval(duobiFuncs.RandomRedPoint1.useCount)
		clearInterval(duobiFuncs.RandomCircle1.useCount)
		clearInterval(duobiFuncs.MoveLine1.useCount)
		clearInterval(duobiFuncs.RedArea1.useCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		clearTimeout(wanFa_duobi.gamePlay.duobiConut)

	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
				roomFunction.goToNextGame()
				roomFunction.stopSound("fenwei")
				clearInterval(wanFa_duobi.gamePlay.targetCount)
				roomFunction.stopSound("shuaxin")
				roomFunction.playSoundTivite(false, "levelup", "positive")
			} else {
				wanFa_duobi.gameLevelEnd()
			}
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(duobiFuncs.CountPlay.innerCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.RandomRedPoint1.useCount)
		clearInterval(duobiFuncs.RandomCircle1.useCount)
		clearInterval(wanFa_duobi.gamePlay.targetCount)
		clearInterval(duobiFuncs.MoveLine.useCount)
		clearInterval(duobiFuncs.MoveLine1.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		clearInterval(duobiFuncs.RedArea1.useCount)
		clearInterval(duobiFuncs.RandomRedPoint1.useCount)
		clearInterval(duobiFuncs.RandomCircle1.useCount)
		clearInterval(duobiFuncs.MoveLine1.useCount)
		clearInterval(duobiFuncs.RedArea1.useCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		clearTimeout(wanFa_duobi.gamePlay.duobiConut)
		clearInterval(duobiFuncs.CountPlay.innerCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.RandomRedPoint1.useCount)
		clearInterval(duobiFuncs.RandomCircle1.useCount)
		clearInterval(wanFa_duobi.gamePlay.targetCount)
		clearInterval(duobiFuncs.MoveLine.useCount)
		clearInterval(duobiFuncs.MoveLine1.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		clearInterval(duobiFuncs.RedArea1.useCount)
		clearInterval(duobiFuncs.RandomRedPoint1.useCount)
		clearInterval(duobiFuncs.RandomCircle1.useCount)
		clearInterval(duobiFuncs.MoveLine1.useCount)
		clearInterval(duobiFuncs.RedArea1.useCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		clearTimeout(wanFa_duobi.gamePlay.duobiConut)
		roomFunction.stopSound("Duobi")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teach6")
		roomFunction.stopSound("tishi3")
		roomFunction.stopSound("shuaxin")
		roomFunction.stopSound("teachBlue2")
		roomFunction.goToGameLevel("leave_hold", "none")
		duobiFuncs.rmAllListener()
		wanFaCtl_duobiCtl.gameEndCtl(usersInfos.levelScore, nowInfos.lifePoint)
		levelInfos.gameIdList = []
		fff = 1
		duobiVar.look = 1
	}

}




const duobiFuncs = {
	//重置所有变量
	resetAll() {
		duobiVar.targetNum = 6;
		//nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 6;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 500;
		aaa = 0
		fff = 0
		duobiVar.look = 0

	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		clearInterval(duobiFuncs.CountPlay.innerCount)
		clearInterval(duobiFuncs.RandomRedPoint.useCount)
		clearInterval(duobiFuncs.RandomCircle.useCount)
		clearInterval(duobiFuncs.MoveLine.useCount)
		clearInterval(duobiFuncs.RedArea.useCount)
		engine.removeEventListener("gamePlay", wanFa_duobi.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_duobi.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_duobi.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_duobi.gameTaped)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		levelInfos.wanFa == "duobi--paishe"
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff != false && y != (levelInfos.wanFa == "duobi--paishe" ? 0 : -1) && y != (levelInfos.wanFa == "duobi--paishe" ? 1 : -1) && y != (levelInfos.wanFa == "duobi--paishe" ? 30 : -1) && y != (levelInfos.wanFa == "duobi--paishe" ? 31 : -1)) {
				// setTimeout(() => {
				// 	duobiFuncs.addBlink(x, y)
				// }, 200);
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				duobiFuncs.tapWrong.determine = setTimeout(() => {
					duobiFuncs.addBlink(x, y)
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
						if (nowInfos.gameCountTime > 60 && cbjh == 0 && levelInfos.wanFa != "duobi--paishe") {
							usersInfos.RetryCount++
							cbjh = 1
							duobiFuncs.resetAll()
							roomFunction.goToGameLevel(levelInfos.gameIdList[0], "none")
							roomFunction.playSound(false, "chongzhi")
							engine.log("chongqiqqqqqqqqqq")
						} else {
							wanFa_duobi.gameLevelEnd()
						}
					}
				}, 75);

			}
		}
	},
	addRed3() {
		fastop.addDuobi("red308", "red308", 0, 0, 0, 5, false, false, 254, 0, 0)
		fastop.addDuobi("red309", "red309", 3, 0, 2, 0, false, false, 254, 0, 0)
		fastop.addDuobi("red310", "red310", 1, 0, 1, 1, false, false, 254, 0, 0)
		fastop.addDuobi("red311", "red311", 6, 0, 1, 1, false, false, 254, 0, 0)
		fastop.addDuobi("red312", "red312", 8, 0, 0, 4, false, false, 254, 0, 0)
		fastop.addDuobi("red313", "red313", 9, 0, 1, 1, false, false, 254, 0, 0)
		fastop.addDuobi("red314", "red314", 12, 0, 2, 0, false, false, 254, 0, 0)
		fastop.addDuobi("red315", "red315", 15, 0, 0, 3, false, false, 254, 0, 0)
		fastop.addDuobi("red316", "red316", 1, 3, 1, 1, false, false, 254, 0, 0)
		fastop.addDuobi("red317", "red317", 4, 3, 2, 0, false, false, 254, 0, 0)
		fastop.addDuobi("red318", "red318", 6, 4, 1, 1, false, false, 254, 0, 0)
		fastop.addDuobi("red319", "red319", 10, 3, 0, 4, false, false, 254, 0, 0)
		fastop.addDuobi("red320", "red320", 8, 4, 1, 0, false, false, 254, 0, 0)
		fastop.addDuobi("red321", "red321", 9, 5, 1, 0, false, false, 254, 0, 0)
		fastop.addDuobi("red322", "red322", 2, 6, 1, 0, false, false, 254, 0, 0)
		fastop.addDuobi("red323", "red323", 3, 7, 1, 0, false, false, 254, 0, 0)
	},
	redPlay3() {
		let opInfo1 = {
			opId: "redMove",
			opType: "play",
			opNode: "red308",
			timeLen: 5,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 0,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
					}
				},
			]
		}
		gameFuncs.op(opInfo1);

		let opInfo3 = {
			opId: "redMove",
			opType: "play",
			opNode: "red309",
			timeLen: 6,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 3,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 3,
							y: 0
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo3);
		}, 250);

		let opInfo5 = {
			opId: "redMove",
			opType: "play",
			opNode: "red310",
			timeLen: 7,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 1,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 1,
							y: 0
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo5);

		}, 500);

		let opInfo7 = {
			opId: "redMove",
			opType: "play",
			opNode: "red311",
			timeLen: 4,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 6,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 6,
							y: 0
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo7);

		}, 750);

		let opInfo9 = {
			opId: "redMove",
			opType: "play",
			opNode: "red312",
			timeLen: 4,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 8,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 8,
							y: 0
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo9);

		}, 1000);

		let opInfo11 = {
			opId: "redMove",
			opType: "play",
			opNode: "red313",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 9,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 9,
							y: 0
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo11);

		}, 1250);

		let opInfo13 = {
			opId: "redMove",
			opType: "play",
			opNode: "red314",
			timeLen: 3,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 12,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 12,
							y: 0
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo13);

		}, 1500);

		let opInfo15 = {
			opId: "redMove",
			opType: "play",
			opNode: "red315",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 15,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 15,
							y: 0
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo15);

		}, 1750);

		let opInfo16 = {
			opId: "redMove",
			opType: "play",
			opNode: "red316",
			timeLen: 8,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 1,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 1,
							y: 3
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo16);

		}, 2000);

		let opInfo17 = {
			opId: "redMove",
			opType: "play",
			opNode: "red317",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 4,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 4,
							y: 3
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo17);

		}, 2250);

		let opInfo18 = {
			opId: "redMove",
			opType: "play",
			opNode: "red318",
			timeLen: 4,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 6,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 6,
							y: 4
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo18);

		}, 2500);

		let opInfo19 = {
			opId: "redMove",
			opType: "play",
			opNode: "red319",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 10,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 10,
							y: 3
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo19);

		}, 2750);

		let opInfo20 = {
			opId: "redMove",
			opType: "play",
			opNode: "red320",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 8,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 8,
							y: 4
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo20);

		}, 3000);

		let opInfo21 = {
			opId: "redMove",
			opType: "play",
			opNode: "red321",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 9,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 9,
							y: 5
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo21);

		}, 3250);

		let opInfo22 = {
			opId: "redMove",
			opType: "play",
			opNode: "red322",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 2,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 2,
							y: 6
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo22);

		}, 3500);

		let opInfo23 = {
			opId: "redMove",
			opType: "play",
			opNode: "red323",
			timeLen: 5,
			loop: "true",
			keyFrames: [

				{
					t: 0,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 3,
							y: 41
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 3,
							y: 7
						}
					}
				},
			]
		}
		setTimeout(() => {
			gameFuncs.op(opInfo23);

		}, 3750);

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
	randomBlue1(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 15)
			let y = Math.floor(Math.random() * 28) + 4
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
				opId: "addtargett" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "targett" + i,
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
		duobiFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						label1: "躲避",
						value1: "#fc000d",
						label2: "目标",
						value2: duobiVar.targetNum

					},
					block3: {
						model: "dis_b_scoreGame",
						label2: "关卡总分",
						value2: usersInfos.levelScore
					}
				}
			}
			gameFuncs.op(opInfo);

			if (nowInfos.gameCountTime == 11 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				roomFunction.playSound(false, "daoshu10")
			}
			if (nowInfos.gameCountTime == 5) {
				roomFunction.playSound(false, "fenwei")
			}
			if (nowInfos.gameCountTime == 1 && levelInfos.wanFa == "duobi--paishe") {
				wanFa_duobi.gameLevelEnd()
			}
			nowInfos.gameCountTime--;
		}, 1000, nowInfos.gameCountTime)
	},
	//基础红绿蓝游戏内屏倒计时、目标数量、得分显示。该函数用于刷新得分。
	ScorePlay() {
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
					label1: "躲避",
					value1: "#fc000d",
					label2: "目标",
					value2: duobiVar.targetNum

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
	//随机落下红色点。speed为走完全程秒数，默认为5。legth为点宽度，实际点宽度为legth*2+1。rednum是控制宽度的，具体看下面变量awa
	addRandomRedPoint(speed, legth, rednum) {
		let tempXarr = [];
		// duobiFuncs.addRandomRedPoint.useCount=setInterval(function(){
		let tempX = Math.floor(Math.random() * 16)
		while (tempXarr.indexOf(tempX) >= 0) {
			tempX = Math.floor(Math.random() * 16)
		}
		tempXarr.push(tempX)
		if (tempXarr.length >= 12) {
			tempXarr = []
		}
		duobiVar.pointNum++;

		let opInfo = {
			opId: "addRed" + duobiVar.pointNum, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "redPoint" + duobiVar.pointNum, // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: tempX, y: 41 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: 0 - legth, y: 0 },
							rb: { x: legth, y: 0 }
						}
						,
						"rgba": {
							"r": 254,
							"g": 0,
							"b": 0,
							"a": 1
						},

					}
				}
			]
		}
		gameFuncs.op(opInfo);
		setTimeout(function () {
			if (fff == 1) {
				return;
			}
			fastop.nodeMove("moveRed" + duobiVar.pointNum, "redPoint" + duobiVar.pointNum, speed, false, "b", tempX, 41, tempX, 4)
			setTimeout(() => {
				if (fff == 1) {
					return;
				}
				duobiVar.rmNum++
				fastop.removeNode("rmRed" + duobiVar.rmNum, "redPoint" + duobiVar.rmNum)
			}, speed * 1000 + 50);
		}, 50)
		let awa = Math.floor(Math.random() * rednum) + 1
		duobiVar.redlength = awa;

		// },time)
	},
	//添加全屏扫过的横线。speed表示线走完全程的时间。temp有三个值：0为从下到上，1为从左到右，2为从右到左。
	addMoveLine(speed, temp) {
		if (duobiVar.lineProtect == 0) {
			/*duobiVar.lineProtect=1;
			setTimeout(function(){
				duobiVar.lineProtect=0
			},speed*1000+50)*/
			duobiVar.lineNum++

			let tempX = 0
			let tempY = 42
			let x1 = 0
			let y1 = 15
			let tox = 0
			let toy = -1
			if (levelInfos.level == 1) {
				if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
					let toy = 4
				}
			}
			//let temp = Math.floor(Math.random()*3)
			if (temp == 0) {
				tempX = 0
				tempY = 42
				x1 = 15
				y1 = 0
				tox = 0
				toy = -1
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						toy = 4
					}
				}

			}
			if (temp == 1) {
				tempX = -1
				tempY = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						tempY = 4
					}
				}
				x1 = 0
				y1 = 41
				tox = 16
				toy = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						toy = 4
					}
				}

			}

			if (temp == 2) {
				tempX = 16
				tempY = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						tempY = 4
					}
				}
				x1 = 0
				y1 = 41

				tox = -1
				toy = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						toy = 4
					}
				}
			}


			let opInfo = {
				opId: "addLine" + duobiVar.lineNum, //操作id 再控制用
				opType: "addNode", // 操作类型，添加一个节点或精灵
				//opNode:"", // 父节点，如果没有配置，默认到棋盘根节点0,0
				nodes: [
					{
						nodeId: "redLine" + duobiVar.lineNum, // 节点id，定位用
						surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
						// node参数
						pt: { x: tempX, y: tempY }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
						rotation: 0, // 角度
						nodes: [], // 子节点
						canTap: true,
						visible: true, //显示，如果为false，逻辑数据会跳过
						shape: {
							"type": "rect",
							"rect": {
								lt: { x: 0, y: 0 },
								rb: { x: x1, y: y1 }
							}
							,
							"rgba": {
								"r": 254,
								"g": 0,
								"b": 0,
								"a": 1
							},

						}
					}
				]
			}
			gameFuncs.op(opInfo);

			setTimeout(function () {
				if (fff == 1) {
					return;
				}
				fastop.nodeMove("lineMove" + duobiVar.lineNum, "redLine" + duobiVar.lineNum, speed, false, "b", tempX, tempY, tox, toy)
				setTimeout(() => {
					if (fff == 1) {
						return;
					}
					duobiVar.rmLine++
					fastop.removeNode("rmLine" + duobiVar.rmLine, "redLine" + duobiVar.rmLine)
				}, speed * 1000 + 50);
			}, 50)
		}
	},
	//添加红色区域。speed表示显示时间，前60%为提示时间，后40%有判定。例：speed为5，则前三秒为提示，踩踏不扣血，后两秒踩踏扣血。
	//area对应不同区域(以模拟器视角为准):0为上半区，1为下半区，2-5分别对应从左到右4等分区域
	addRedArea(speed, area) {
		let x1 = 0;
		let y1 = 0;
		let x2 = 0;
		let y2 = 0;
		if (area == 0) {
			x1 = 0
			y1 = 0
			x2 = 15
			y2 = 15
		} else if (area == 1) {
			x1 = 0
			y1 = 16
			x2 = 15
			y2 = 31
		} else if (area == 2) {
			x1 = 0
			y1 = 0
			x2 = 3
			y2 = 31
		} else if (area == 3) {
			x1 = 4
			y1 = 0
			x2 = 7
			y2 = 31
		} else if (area == 4) {
			x1 = 8
			y1 = 0
			x2 = 11
			y2 = 31
		} else if (area == 5) {
			x1 = 12
			y1 = 0
			x2 = 15
			y2 = 31
		}
		duobiVar.areaNum++

		let opInfo = {
			opId: "addArea" + duobiVar.areaNum, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode:"", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "redArea" + duobiVar.areaNum, // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: false, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: x1, y: y1 },
							rb: { x: x2, y: y2 }
						}
						,
						"rgba": {
							"r": 254,
							"g": 0,
							"b": 0,
							"a": 1
						},

					}
				}
			]
		}
		gameFuncs.op(opInfo);

		setTimeout(() => {
			let opInfo = {
				opId: "PlayArea" + duobiVar.areaNum,
				opType: "play",
				opNode: "redArea" + duobiVar.areaNum,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
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
						t: 0.1,
						keyFrame: {

							shape: {
								rgba: {
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
						t: 0.3,
						keyFrame: {

							shape: {
								rgba: {
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
						t: 0.5,
						keyFrame: {

							shape: {
								rgba: {
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
							canTap: true,
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
						t: 0.6,
						keyFrame: {
							canTap: false,
							shape: {
								rgba: {
									r: 254,
									g: 0,
									b: 0,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo)//左上角红点

			setTimeout(() => {
				if (fff == 1) {
					return;
				}
				duobiVar.rmArea++
				fastop.removeNode("rmArea" + duobiVar.rmArea, "redArea" + duobiVar.rmArea)
			}, speed * 1000);

		}, 50);
	},

	//添加随机位置圆形。speed为动画整体时间，其中前0.6无判定，后0.4有判定。startSize为圆起始半径，endSize为圆结束半径。
	addRandomCircle(speed, startSize, endSize) {
		if (fff == 1) {
			return;
		}
		let x1 = Math.floor(Math.random() * 16)
		let y1 = Math.floor(Math.random() * 32)
		if (levelInfos.level == 1) {
			if (nowInfos.nowGameid == "duobi011-cxx") {
				y1 = Math.floor(Math.random() * 22) + 10
			}
		}
		duobiVar.circleNum++

		let opInfo = {
			opId: "addCircle" + duobiVar.circleNum, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "redCircle" + duobiVar.circleNum, // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: x1, y: y1 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: 0 - startSize, y: 0 - startSize },
							rb: { x: startSize, y: startSize }
						}
						,
						"rgba": {
							"r": 254,
							"g": 0,
							"b": 0,
							"a": 1
						},

					}
				}
			]
		}
		gameFuncs.op(opInfo);

		setTimeout(() => {
			let opInfo3 = {
				opId: "PlayCircle" + duobiVar.circleNum,
				opType: "play",
				opNode: "redCircle" + duobiVar.circleNum,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
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
						t: 0.1,
						keyFrame: {
							shape: {
								rgba: {
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
						t: 0.3,
						keyFrame: {
							shape: {
								rgba: {
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
						t: 0.5,
						keyFrame: {
							shape: {
								rgba: {
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
							canTap: true,
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
			gameFuncs.op(opInfo3)
			let opInfo2 = {
				opId: "PlayCircleB" + duobiVar.circleNum,
				opType: "play",
				opNode: "redCircle" + duobiVar.circleNum,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							shape: {
								rect: {
									lt: { x: 0 - startSize, y: 0 - startSize },
									rb: { x: startSize, y: startSize }
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							shape: {
								rect: {
									lt: { x: 0 - endSize, y: 0 - endSize },
									rb: { x: endSize, y: endSize }
								}
							}
						}
					},

				]
			}
			gameFuncs.op(opInfo2)

			setTimeout(() => {
				if (fff == 1) {
					return;
				}
				duobiVar.rmCircle++
				fastop.removeNode("rmCircle" + duobiVar.rmCircle, "redCircle" + duobiVar.rmCircle)
			}, speed * 1000);
		}, 50);

	},
	addRandomRedPoint1(speed, legth, rednum) {
		let tempXarr = [];
		// duobiFuncs.addRandomRedPoint.useCount=setInterval(function(){
		let tempX = Math.floor(Math.random() * 16)
		while (tempXarr.indexOf(tempX) >= 0) {
			tempX = Math.floor(Math.random() * 16)
		}
		tempXarr.push(tempX)
		if (tempXarr.length >= 12) {
			tempXarr = []
		}
		duobiVar.pointNum++;

		let opInfo = {
			opId: "addGreen" + duobiVar.pointNum, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "greenPoint" + duobiVar.pointNum, // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: tempX, y: 41 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: 0 - legth, y: 0 },
							rb: { x: legth, y: 0 }
						}
						,
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
		setTimeout(function () {
			if (fff == 1) {
				return;
			}
			fastop.nodeMove("moveGreen" + duobiVar.pointNum, "greenPoint" + duobiVar.pointNum, speed, false, "b", tempX, 41, tempX, 4)
			setTimeout(() => {
				if (fff == 1) {
					return;
				}
				duobiVar.rmNum++
				fastop.removeNode("rmGreen" + duobiVar.rmNum, "greenPoint" + duobiVar.rmNum)
			}, speed * 1000 + 50);
		}, 50)
		let awa = Math.floor(Math.random() * rednum) + 1
		duobiVar.redlength = awa;

		// },time)
	},
	//添加全屏扫过的横线。speed表示线走完全程的时间。temp有三个值：0为从下到上，1为从左到右，2为从右到左。
	addMoveLine1(speed, temp) {
		if (duobiVar.lineProtect == 0) {
			/*duobiVar.lineProtect=1;
			setTimeout(function(){
				duobiVar.lineProtect=0
			},speed*1000+50)*/
			duobiVar.lineNum++

			let tempX = 0
			let tempY = 42
			let x1 = 0
			let y1 = 15
			let tox = 0
			let toy = -1
			if (levelInfos.level == 1) {
				if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
					let toy = 4
				}
			}
			//let temp = Math.floor(Math.random()*3)
			if (temp == 0) {
				tempX = 0
				tempY = 42
				x1 = 15
				y1 = 0
				tox = 0
				toy = -1
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						toy = 4
					}
				}

			}
			if (temp == 1) {
				tempX = -1
				tempY = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						tempY = 4
					}
				}
				x1 = 0
				y1 = 41
				tox = 16
				toy = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						toy = 4
					}
				}

			}

			if (temp == 2) {
				tempX = 16
				tempY = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						tempY = 4
					}
				}
				x1 = 0
				y1 = 41

				tox = -1
				toy = 0
				if (levelInfos.level == 1) {
					if (nowInfos.nowGameid == "duobi001-jz" || nowInfos.nowGameid == "duobi011-cxx" || nowInfos.nowGameid == "duobi012-cxx") {
						toy = 4
					}
				}
			}


			let opInfo = {
				opId: "addLine" + duobiVar.lineNum, //操作id 再控制用
				opType: "addNode", // 操作类型，添加一个节点或精灵
				//opNode:"", // 父节点，如果没有配置，默认到棋盘根节点0,0
				nodes: [
					{
						nodeId: "greenLine" + duobiVar.lineNum, // 节点id，定位用
						surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
						// node参数
						pt: { x: tempX, y: tempY }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
						rotation: 0, // 角度
						nodes: [], // 子节点
						canTap: true,
						visible: true, //显示，如果为false，逻辑数据会跳过
						shape: {
							"type": "rect",
							"rect": {
								lt: { x: 0, y: 0 },
								rb: { x: x1, y: y1 }
							}
							,
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

			setTimeout(function () {
				if (fff == 1) {
					return;
				}
				fastop.nodeMove("lineMove" + duobiVar.lineNum, "greenLine" + duobiVar.lineNum, speed, false, "b", tempX, tempY, tox, toy)
				setTimeout(() => {
					if (fff == 1) {
						return;
					}
					duobiVar.rmLine++
					fastop.removeNode("rmLine" + duobiVar.rmLine, "greenLine" + duobiVar.rmLine)
				}, speed * 1000 + 50);
			}, 50)
		}
	},
	//添加红色区域。speed表示显示时间，前60%为提示时间，后40%有判定。例：speed为5，则前三秒为提示，踩踏不扣血，后两秒踩踏扣血。
	//area对应不同区域(以模拟器视角为准):0为上半区，1为下半区，2-5分别对应从左到右4等分区域
	addRedArea1(speed, area) {
		let x1 = 0;
		let y1 = 0;
		let x2 = 0;
		let y2 = 0;
		if (area == 0) {
			x1 = 0
			y1 = 0
			x2 = 15
			y2 = 15
		} else if (area == 1) {
			x1 = 0
			y1 = 16
			x2 = 15
			y2 = 31
		} else if (area == 2) {
			x1 = 0
			y1 = 0
			x2 = 3
			y2 = 31
		} else if (area == 3) {
			x1 = 4
			y1 = 0
			x2 = 7
			y2 = 31
		} else if (area == 4) {
			x1 = 8
			y1 = 0
			x2 = 11
			y2 = 31
		} else if (area == 5) {
			x1 = 12
			y1 = 0
			x2 = 15
			y2 = 31
		}
		duobiVar.areaNum++

		let opInfo = {
			opId: "addArea" + duobiVar.areaNum, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode:"", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "greenArea" + duobiVar.areaNum, // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: false, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: x1, y: y1 },
							rb: { x: x2, y: y2 }
						}
						,
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

		setTimeout(() => {
			let opInfo = {
				opId: "PlayArea" + duobiVar.areaNum,
				opType: "play",
				opNode: "greenArea" + duobiVar.areaNum,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					},
					{
						t: 0.1,
						keyFrame: {

							shape: {
								rgba: {
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

							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					},
					{
						t: 0.3,
						keyFrame: {

							shape: {
								rgba: {
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

							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					},
					{
						t: 0.5,
						keyFrame: {

							shape: {
								rgba: {
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
							canTap: true,
							shape: {
								rgba: {
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
							canTap: false,
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
			gameFuncs.op(opInfo)//左上角红点

			setTimeout(() => {
				if (fff == 1) {
					return;
				}
				duobiVar.rmArea++
				fastop.removeNode("rmArea" + duobiVar.rmArea, "greenArea" + duobiVar.rmArea)
			}, speed * 1000);

		}, 50);
	},

	//添加随机位置圆形。speed为动画整体时间，其中前0.6无判定，后0.4有判定。startSize为圆起始半径，endSize为圆结束半径。
	addRandomCircle1(speed, startSize, endSize) {
		if (fff == 1) {
			return;
		}
		let x1 = Math.floor(Math.random() * 16)
		let y1 = Math.floor(Math.random() * 32)
		if (levelInfos.level == 1) {
			if (nowInfos.nowGameid == "duobi011-cxx") {
				y1 = Math.floor(Math.random() * 22) + 10
			}
		}
		duobiVar.circleNum++

		let opInfo = {
			opId: "addCircle" + duobiVar.circleNum, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "greenCircle" + duobiVar.circleNum, // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: x1, y: y1 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: 0 - startSize, y: 0 - startSize },
							rb: { x: startSize, y: startSize }
						}
						,
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

		setTimeout(() => {
			let opInfo3 = {
				opId: "PlayCircle" + duobiVar.circleNum,
				opType: "play",
				opNode: "greenCircle" + duobiVar.circleNum,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					},
					{
						t: 0.1,
						keyFrame: {
							shape: {
								rgba: {
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
							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					},
					{
						t: 0.3,
						keyFrame: {
							shape: {
								rgba: {
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
							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					},
					{
						t: 0.5,
						keyFrame: {
							shape: {
								rgba: {
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
					},
					{
						t: 1,
						keyFrame: {
							shape: {
								rgba: {
									r: 0,
									g: 254,
									b: 0,
									a: 1
								}
							}
						}
					},

				]
			}
			gameFuncs.op(opInfo3)
			let opInfo2 = {
				opId: "PlayCircleB" + duobiVar.circleNum,
				opType: "play",
				opNode: "greenCircle" + duobiVar.circleNum,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							shape: {
								rect: {
									lt: { x: 0 - startSize, y: 0 - startSize },
									rb: { x: startSize, y: startSize }
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							shape: {
								rect: {
									lt: { x: 0 - endSize, y: 0 - endSize },
									rb: { x: endSize, y: endSize }
								}
							}
						}
					},

				]
			}
			gameFuncs.op(opInfo2)

			setTimeout(() => {
				if (fff == 1) {
					return;
				}
				duobiVar.rmCircle++
				fastop.removeNode("rmCircle" + duobiVar.rmCircle, "greenCircle" + duobiVar.rmCircle)
			}, speed * 1000);
		}, 50);

	},

	//添加奖励按钮点
	addTargetPoint(targetNum) {
		let tempArr = []
		if (levelInfos.wanFa != "duobi") {
			clearInterval(wanFa_duobi.gamePlay.targetCount)
			return
		}
		for (let i = 0; i < targetNum; i++) {
			let temp = Math.floor(Math.random() * 24)
			while (tempArr.indexOf(temp) >= 0) {
				temp = Math.floor(Math.random() * 24)
			}
			tempArr.push(temp)
			let opInfo = {
				opId: "addTarget" + i, //操作id 再控制用
				opType: "addNode", // 操作类型，添加一个节点或精灵
				//opNode:"", // 父节点，如果没有配置，默认到棋盘根节点0,0
				nodes: [
					{
						nodeId: "target" + i, // 节点id，定位用
						surface: "a",  //根节点必须指定工作面，子节点工作面自动忽略
						// node参数
						pt: { x: temp, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
						rotation: 0, // 角度
						nodes: [], // 子节点
						canTap: true,
						visible: true, //显示，如果为false，逻辑数据会跳过
						shape: {
							"type": "rect",
							"rect": {
								lt: { x: 0, y: 0 },
								rb: { x: 0, y: 0 }
							}
							,
							"rgba": {
								"r": 0,
								"g": 0,
								"b": 254,
								"a": 1
							},

						}
					}
				]
			}
			gameFuncs.op(opInfo);
		}
	},

	//消除踩踏到的奖励按钮点
	TargetTap(face, x, y, onOff, nodeId, event) {

		if (nodeId.startsWith("target")) {
			if (onOff == true) {
				usersInfos.ValidTarget++
				fastop.removeNode("target", nodeId)
				duobiVar.targetNum--;
				roomFunction.playSoundTivite(false, "right", "positive");
				if (levelInfos.level != 1) {
					usersInfos.levelScore += 4;
				}
				if (levelInfos.level == 1) {
					usersInfos.levelScore += 4
				}
				duobiFuncs.ScorePlay()
			}
		}
	},

	RandomCircle(time) {
		let tempi = 0
		duobiFuncs.RandomCircle.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.RandomCircle.useCount)
				return
			}

			duobiFuncs.addRandomCircle(Math.floor(Math.random() * 3) + 2, Math.floor(Math.random() * 1) + 1, Math.floor(Math.random() * 3) + 3)
			tempi++

		}, time);
	},

	MoveLine(speed, time, min, max) {

		duobiFuncs.MoveLine.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.MoveLine.useCount)
				return
			}
			// duobiFuncs.addMoveLine(speed,Math.floor(Math.random()*2))
			duobiFuncs.addMoveLine(speed, Math.floor(Math.random() * (max - min + 1)) + min)
			// duobiFuncs.addMoveLine(speed,temp)
		}, time);
	},
	RedArea(speed, time) {

		duobiFuncs.RedArea.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.RedArea.useCount)
				return
			}
			duobiFuncs.addRedArea(speed, Math.floor(Math.random() * 6))
		}, time);
	},
	RandomRedPoint(speed, time, rednum) {
		duobiFuncs.RandomRedPoint.useCount = setInterval(function () {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.RandomRedPoint.useCount)
				return
			}
			duobiFuncs.addRandomRedPoint(speed, duobiVar.redlength, rednum)
		}, time);
	},
	RandomCircle1(time) {
		let tempi = 0
		duobiFuncs.RandomCircle1.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.RandomCircle1.useCount)
				return
			}
			duobiFuncs.addRandomCircle1(Math.floor(Math.random() * 3) + 2, Math.floor(Math.random() * 2) + 2, Math.floor(Math.random() * 5) + 5)
			tempi++

		}, time);
	},

	MoveLine1(speed, time, min, max) {

		duobiFuncs.MoveLine1.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.MoveLine1.useCount)
				return
			}
			// duobiFuncs.addMoveLine(speed,Math.floor(Math.random()*2))
			duobiFuncs.addMoveLine1(speed, Math.floor(Math.random() * (max - min + 1)) + min)
			// duobiFuncs.addMoveLine(speed,temp)
		}, time);
	},
	RedArea1(speed, time) {

		duobiFuncs.RedArea1.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.RedArea1.useCount)
				return
			}
			duobiFuncs.addRedArea1(speed, Math.floor(Math.random() * 6))
		}, time);
	},
	RandomRedPoint1(speed, time, rednum) {

		duobiFuncs.RandomRedPoint1.useCount = setInterval(function () {
			if (duobiVar.look == 1) {
				clearInterval(duobiFuncs.RandomRedPoint1.useCount)
				return
			}
			duobiFuncs.addRandomRedPoint1(speed, duobiVar.redlength, rednum)
		}, time);
	}


}
