const wanFa_duobiPlus = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_duobiPlus.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_duobiPlus.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_duobiPlus.gameDestroy);
		//重置全局变量
		duobiPlusFuncs.resetAll()
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
		wanFa_duobiPlus.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("duobi")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 18:
					roomFunction.playSound(true, "Duobi", "background")
					break;
				case 19:
					clearInterval(wanFa_duobiPlus.gameStart.startLoop)
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
		// 	if (levelInfos.wanFa.startsWith("duobi")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
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
		engine.addEventListener("gameTaped", wanFa_duobiPlus.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("duobi") == false) {

			clearInterval(duobiPlusFuncs.CountPlay.innerCount)
			clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
			clearInterval(duobiPlusFuncs.RandomCircle.useCount)
			clearInterval(duobiPlusFuncs.MoveLine.useCount)
			clearInterval(duobiPlusFuncs.RedArea.useCount)
			clearInterval(wanFa_duobiPlus.gamePlay.targetCount)
			clearTimeout(wanFa_duobiPlus.gamePlay.duobiConut)
			clearInterval(duobiPlusFuncs.CountPlay.innerCount)
			clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
			clearInterval(duobiPlusFuncs.RandomCircle.useCount)
			clearInterval(wanFa_duobiPlus.gamePlay.targetCount)
			clearInterval(duobiPlusFuncs.MoveLine.useCount)
			clearInterval(duobiPlusFuncs.RedArea.useCount)
			clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
			clearInterval(duobiPlusFuncs.RandomCircle.useCount)
			clearInterval(duobiPlusFuncs.RedArea.useCount)
			clearTimeout(wanFa_duobiPlus.gamePlay.duobiConut)
		}
		if (levelInfos.wanFa == "duobi--paishe") {
			let paisheVar = setInterval(() => {
				engine.log("paishedingshiqi")
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
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								"type": "rect",
								"rect": {
									lt: { x: 0, y: 0 },
									rb: { x: 18, y: 3 }
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
			}, 1000);
		}
		if (gameid.startsWith("duobiPlus")) {
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();

			switch (lunci) {
				case 0:
					usersInfos.levelScore = 0
					nowInfos.gameCountTime = 35;
					roomFunction.playSound(false, "levelOne")
					duobiPlusFuncs.RandomRedPoint(13, 4000, 50)
					break;
				case 1:
					usersInfos.levelScore = 10
					nowInfos.gameCountTime = 35;
					roomFunction.playSound(false, "levelTwo")
					duobiPlusFuncs.RandomRedPoint(14, 5000, 6)
					duobiPlusFuncs.MoveLine(14, 4500, 0, 1)
					break;
				case 2:
					usersInfos.levelScore = 20
					nowInfos.gameCountTime = 35;
					roomFunction.playSound(false, "levelThree")
					duobiPlusFuncs.RandomRedPoint(14, 5000, 15)
					duobiPlusFuncs.MoveLine(14, 4500, 0, 1)
					duobiPlusFuncs.RandomCircle(5700)
					break;
				case 3:
					usersInfos.levelScore = 30
					nowInfos.gameCountTime = 35;
					roomFunction.playSound(false, "levelFour")
					duobiPlusFuncs.RandomRedPoint(10, 2000, 12)
					duobiPlusFuncs.MoveLine(10, 5000, 0, 0)
					break;
				case 4:
					usersInfos.levelScore = 40
					nowInfos.gameCountTime = 35;
					roomFunction.playSound(false, "levelFive")
					duobiPlusFuncs.RandomRedPoint(11, 1800, 4)
					duobiPlusFuncs.RandomCircle(5000)
					duobiPlusFuncs.MoveLine(12, 7000, 0, 1)
					break;
				case 5:
					usersInfos.levelScore = 60
					nowInfos.gameCountTime = 25;
					roomFunction.playSound(false, "levelSix")
					duobiPlusFuncs.RandomRedPoint(9, 1200, 4)
					duobiPlusFuncs.MoveLine(12, 4000, 0, 1)
					break;
				case 6:
					usersInfos.levelScore = 80
					nowInfos.gameCountTime = 25;
					roomFunction.playSound(false, "levelSeven")
					duobiPlusFuncs.MoveLine(12, 4000, 0, 1)
					duobiPlusFuncs.RandomRedPoint(8, 1100, 3)
					break;
				case 7:
					usersInfos.levelScore = 100
					nowInfos.gameCountTime = 25;
					roomFunction.playSound(false, "levelEight")
					duobiPlusFuncs.RandomRedPoint(9, 1500, 3)
					duobiPlusFuncs.MoveLine(12, 3200, 0, 1)
					duobiPlusFuncs.RandomCircle(4000)
					break;
				case 8:
					usersInfos.levelScore = 120
					nowInfos.gameCountTime = 25;
					roomFunction.playSound(false, "levelNine")
					duobiPlusFuncs.RandomRedPoint(14, 2800, 3)
					duobiPlusFuncs.RandomCircle(6000)
					duobiPlusFuncs.RedArea(9, 9000)
					duobiPlusFuncs.MoveLine(12, 4000, 0, 1)
					break;
				case 9:
					usersInfos.levelScore = 150
					nowInfos.gameCountTime = 15;
					roomFunction.playSound(false, "levelTen")
					duobiPlusFuncs.RandomCircle(3000)
					duobiPlusFuncs.MoveLine(9, 1500, 0, 1)
					break;
			}
		}
		duobiPlusFuncs.CountPlay();
		duobiPlusFuncs.ScorePlay()
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("duobi")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			//duobiPlusFuncs.TargetTap(face, x, y, onOff, nodeId, event);
			duobiPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(duobiPlusFuncs.tapWrong.determine)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearTimeout(wanFa_duobiPlus.gameTaped.zwy)
		clearInterval(duobiPlusFuncs.CountPlay.innerCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(duobiPlusFuncs.MoveLine.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		clearInterval(wanFa_duobiPlus.gamePlay.targetCount)
		clearTimeout(wanFa_duobiPlus.gamePlay.duobiConut)
		clearInterval(duobiPlusFuncs.CountPlay.innerCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(wanFa_duobiPlus.gamePlay.targetCount)
		clearInterval(duobiPlusFuncs.MoveLine.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		clearTimeout(wanFa_duobiPlus.gamePlay.duobiConut)

	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
				roomFunction.goToNextGame()
				challengeLife = nowInfos.lifePoint
				lunci++
				roomFunction.stopSound("fenwei")
				clearInterval(wanFa_duobiPlus.gamePlay.targetCount)
				roomFunction.stopSound("shuaxin")
				roomFunction.playSoundTivite(false, "levelup", "positive")
			} else {
				wanFa_duobiPlus.gameLevelEnd()
			}
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(duobiPlusFuncs.CountPlay.innerCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(wanFa_duobiPlus.gamePlay.targetCount)
		clearInterval(duobiPlusFuncs.MoveLine.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		clearTimeout(wanFa_duobiPlus.gamePlay.duobiConut)
		clearInterval(duobiPlusFuncs.CountPlay.innerCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(wanFa_duobiPlus.gamePlay.targetCount)
		clearInterval(duobiPlusFuncs.MoveLine.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		clearTimeout(wanFa_duobiPlus.gamePlay.duobiConut)
		roomFunction.stopSound("Duobi")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teach6")
		roomFunction.stopSound("tishi3")
		roomFunction.stopSound("shuaxin")
		roomFunction.stopSound("teachBlue2")
		roomFunction.goToGameLevel("leave_hold", "none")
		duobiPlusFuncs.rmAllListener()

		usersInfos.levelScore = usersInfos.levelScore + (challengeLife * 4)
		wanFaCtl_duobiPlusCtl.gameEndCtl(usersInfos.levelScore)
		levelInfos.gameIdList = []
		fff = 1
		duobiVar.look = 1
	}

}




const duobiPlusFuncs = {
	//重置所有变量
	resetAll() {
		//duobiVar.targetNum = 6;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 500;
		aaa = 0
		fff = 0
		duobiVar.look = 0
		lunci = 0
		challengeLife = 0

	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		clearInterval(duobiPlusFuncs.CountPlay.innerCount)
		clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
		clearInterval(duobiPlusFuncs.RandomCircle.useCount)
		clearInterval(duobiPlusFuncs.MoveLine.useCount)
		clearInterval(duobiPlusFuncs.RedArea.useCount)
		engine.removeEventListener("gamePlay", wanFa_duobiPlus.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_duobiPlus.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_duobiPlus.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_duobiPlus.gameTaped)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff != false) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				// setTimeout(() => {
				// 	duobiPlusFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);

				duobiPlusFuncs.tapWrong.determine = setTimeout(() => {
					duobiPlusFuncs.addBlink(x, y)
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
						usersInfos.RetryCount++
						wanFa_duobiPlus.gameLevelEnd()
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

	CountPlay() {
		duobiPlusFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						value2: ""
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
			// if (nowInfos.gameCountTime==0) {
			// 	wanFa_duobi.gameLevelEnd()
			// }
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
					value2: ""

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
		// duobiPlusFuncs.addRandomRedPoint.useCount=setInterval(function(){
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

	RandomCircle(time) {
		let tempi = 0
		duobiPlusFuncs.RandomCircle.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiPlusFuncs.RandomCircle.useCount)
				return
			}

			duobiPlusFuncs.addRandomCircle(Math.floor(Math.random() * 3) + 2, Math.floor(Math.random() * 1) + 1, Math.floor(Math.random() * 3) + 3)
			tempi++

		}, time);
	},

	MoveLine(speed, time, min, max) {

		duobiPlusFuncs.MoveLine.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiPlusFuncs.MoveLine.useCount)
				return
			}
			// duobiPlusFuncs.addMoveLine(speed,Math.floor(Math.random()*2))
			duobiPlusFuncs.addMoveLine(speed, Math.floor(Math.random() * (max - min + 1)) + min)
			// duobiPlusFuncs.addMoveLine(speed,temp)
		}, time);
	},
	RedArea(speed, time) {

		duobiPlusFuncs.RedArea.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(duobiPlusFuncs.RedArea.useCount)
				return
			}
			duobiPlusFuncs.addRedArea(speed, Math.floor(Math.random() * 6))
		}, time);
	},
	RandomRedPoint(speed, time, rednum) {
		duobiPlusFuncs.RandomRedPoint.useCount = setInterval(function () {
			if (duobiVar.look == 1) {
				clearInterval(duobiPlusFuncs.RandomRedPoint.useCount)
				return
			}
			duobiPlusFuncs.addRandomRedPoint(speed, duobiVar.redlength, rednum)
		}, time);
	},
}
