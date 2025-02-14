const wanFa_hallween = {
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {

		//添加监听
		engine.addEventListener("gamePlay", wanFa_hallween.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_hallween.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_hallween.gameDestroy);
		//重置全局变量
		hallweenFuncs.resetAll()
		clearInterval(hallweenFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_hallween.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid == "hallween001-cxx") {
			nowInfos.gameCountTime = 30
			nowInfos.target = 20;
			setTimeout(() => {
				roomFunction.playSound(false, "hallween04")
			}, 9000);
			setTimeout(() => {
				roomFunction.playSound(true, "juzhenHallween", "background")
				hallweenFuncs.randomBlue(20)
				fastop.addRedHallween("addRed", "red001", 0, 30, 15, 1)
				let opInfo = {
					opId: "red001Play",
					opType: "play",
					opNode: "red001",
					timeLen: 7,
					loop: true,
					keyFrames: [
						{
							t: 0.5,
							keyFrame: {
								surface: "b",
								pt: {
									x: 0,
									y: 2
								}
							}
						},
						{
							t: 1,
							keyFrame: {
								surface: "b",
								pt: {
									x: 0,
									y: 30
								}
							}
						}
					]
				}
				gameFuncs.op(opInfo);
				hallweenFuncs.CountPlay();
			}, 12000);

		}


	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		hallweenFuncs.tapWrong(face, x, y, onOff, nodeId, event)
		if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
			engine.log("延迟扣血取消用户已离开")
			clearTimeout(haiFuncs.tapWrong.determine)
		}
		hallweenFuncs.blueTap(face, x, y, onOff, nodeId, event)
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(hallweenFuncs.CountPlay.innerCount)
		//clearInterval(hallweenFuncs.CountPlay.innerCount)

	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)

	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(hallweenFuncs.CountPlay.innerCount)
		clearTimeout(wanFa_hallween.gamePlay.teca)
		clearTimeout(wanFa_hallween.gamePlay.teca1)
		clearTimeout(wanFa_hallween.gamePlay.teca2)
		roomFunction.stopSound("bgm01")
		roomFunction.stopSound("juzhenHallween")
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
		hallweenFuncs.rmAllListener()
		wanFaCtl_hallweenCtl.gameEndCtl(nowInfos.allTarget / 90, nowInfos.lifePoint, nowInfos.gameCountTime)
		levelInfos.gameIdList = []
		fff = 1

	}

}




const hallweenFuncs = {
	//重置所有变量
	resetAll() {
		//nowInfos.gameCountTime = 40;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		levelInfos.gameIdList = []
		aaa = 0;
		fff = 0
		nowInfos.nowGame = 0
		usersInfos.ValidTarget = 0
		elevenNum = 0;
		haiJinBiMoveCtl = 0
	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_hallween.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_hallween.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_hallween.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_hallween.gameTaped)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				// setTimeout(() => {
				// 	hallweenFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				hallweenFuncs.tapWrong.determine = setTimeout(() => {
					hallweenFuncs.addBlink(x, y)
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


						if (nowInfos.gameCountTime > 10 && cbjh == 0 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == 0) {
							usersInfos.RetryCount++
							cbjh = 1
							hallweenFuncs.resetAll()
							roomFunction.goToGameLevel(levelInfos.gameIdList[0], "none")
							engine.log("chongqiqqqqqqqqqq")
						} else {
							wanFa_hallween.gameLevelEnd()
						}

						// roomFunction.goToGameLevel("leave_hold", "none")
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
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("blue")) {
			if (onOff == true) {
				usersInfos.ValidTarget++
				if (nowInfos.target > 1) {
					//hallweenFuncs.jinBiMove()
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSoundTivite(false, "right", "positive")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					usersInfos.levelScore += nowInfos.scoreCoefficient;
					hallweenFuncs.ScorePlay()
				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						hallweenFuncs.ScorePlay();
						nowInfos.nowGame = levelInfos.gameIdList.indexOf(nowInfos.nowGameid);
						nowInfos.nowGame++;
						roomFunction.goToNextGame();
						fff = 1
						engine.removeEventListener("gameTaped", wanFa_hallween.gameTaped)
						roomFunction.stopSound("fenwei")
						roomFunction.playSoundTivite(false, "levelup", "positive")
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						hallweenFuncs.ScorePlay()
						wanFa_hallween.gameLevelEnd();
					}
				}
			}
		}
	},
	randomBlue(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 16)
			let y = Math.floor(Math.random() * 28) + 2
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
							g: 69,
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
	CountPlay() {
		hallweenFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
			nowInfos.gameCountTime--;
			if (nowInfos.gameCountTime == 5) {
				roomFunction.playSound(false, "fenwei")
			}
			if (nowInfos.gameCountTime == 0) {
				if (nowInfos.nowGameid != "__system_wait") {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						roomFunction.goToNextGame()
						fff = 1
						engine.removeEventListener("gameTaped", wanFa_hallween.gameTaped)
						roomFunction.stopSound("fenwei")
						roomFunction.playSoundTivite(false, "levelup", "positive")
					} else {
						wanFa_hallween.gameLevelEnd()
					}
				}
			}
			// if (nowInfos.gameCountTime== 30&&levelInfos.gameIdList.indexOf(nowInfos.nowGameid)==levelInfos.gameIdList.length - 1) {
			// 	roomFunction.playSound(false,"shizhong")
			// }
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
