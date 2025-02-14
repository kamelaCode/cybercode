const wanFa_mutourenPlus = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_mutourenPlus.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_mutourenPlus.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_mutourenPlus.gameDestroy);
		//重置全局变量
		mutourenPlusFuncs.resetAll()
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}


		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_mutourenPlus.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					break;
				case 5:
					roomFunction.playSound(false, "mutourenRules");
					break;
				case 16:
					if (levelInfos.wanFa.startsWith("mutourenPlus")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						mutourenPlusFuncs.CountPlay();
					}
					break;
				case 17:
					clearInterval(wanFa_mutourenPlus.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// 	roomFunction.playSound(false, "mutourenRules");
		// }, 500);

		// setTimeout(function () {
		// 	if (levelInfos.wanFa.startsWith("mutourenPlus")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 		mutourenPlusFuncs.CountPlay();
		// 	}
		// }, sec * 1000);
		// setTimeout(function () {
		// 	surfaceCtr.ctlDoor(0, 5000);
		// }, 3500);
	},




	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_mutourenPlus.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("mutouren")) {
			nowInfos.nowGameid = gameid;
			mutourenPlusInfos.gameLoopsNum = 0
			nowInfos.lifePoint = 6;
			gameRules.lifeMove();
			mutourenPlusFuncs.CountPlay();
			mutourenPlusFuncs.ScorePlay();
			if (gameid == "mutouren001-hhhh") {
				nowInfos.target = 66
				mutourenPlusFuncs.allRed()
				roomFunction.stopSound("mutourenPlus12")
				roomFunction.stopSound("mutourenPlus15")

			}
			if (gameid == "mutouren002-hhhh") {
				nowInfos.target = 46
				mutourenPlusFuncs.allRedX12()
				roomFunction.stopSound("mutourenPlus")
				roomFunction.stopSound("mutourenPlus15")

			}
			if (gameid == "mutouren003-hhhh") {
				nowInfos.target = 52
				mutourenPlusFuncs.allRedX15()
				roomFunction.stopSound("mutourenPlus12")
				roomFunction.stopSound("mutourenPlus")
			}
		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("mutouren")) {
			mutourenPlusFuncs.rightTap(face, x, y, onOff, nodeId, event);
			mutourenPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (nodeId.startsWith("blackArea") && event == "NodeChanged") {
				mutourenPlusFuncs.createGreen(x, y)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(mutourenPlusFuncs.CountPlay.innerCount)
		//roomFunction.stopSound("mutourenPlus")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			wanFa_mutourenPlus.gameLevelEnd()
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(mutourenPlusFuncs.CountPlay.innerCount)
		roomFunction.stopSound("daoshu10")
		roomFunction.goToGameLevel("leave_hold", "none")
		roomFunction.stopSound("mutourenPlus")
		roomFunction.stopSound("mutourenPlus12")
		roomFunction.stopSound("mutourenPlus15")

		mutourenPlusFuncs.rmAllListener()
		wanFaCtl_mutourenPlusCtl.gameEndCtl(nowInfos.lifePoint)
		levelInfos.gameIdList = []
		mutourenPlusInfos.gameEndCtl = 1
	}
}

const mutourenPlusFuncs = {
	//重置所有变量
	resetAll(difficulty) {
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		mutourenPlusInfos.addGreen = false;
		mutourenPlusInfos.allTime = 0;
		mutourenPlusInfos.gameLoopsNum = 0;
		mutourenPlusInfos.gameEndCtl = 0;
		mutourenPlusInfos.allTime = 180;
		mutourenPlusInfos.bgmSpeed = 0
		// if (nowInfos.nowGameid == "mutouren001-hhhh") {
		// 	nowInfos.target = 66
		// }
		// if (nowInfos.nowGameid == "mutouren002-hhhh") {
		// 	nowInfos.target = 46
		// }
		// if (nowInfos.nowGameid == "mutouren003-hhhh") {
		// 	nowInfos.target = 52
		// }

	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_mutourenPlus.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_mutourenPlus.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_mutourenPlus.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_mutourenPlus.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_mutourenPlus.gameTaped)

	},
	// //显示墙面动态眼睛
	//判断正确后进行加分
	rightTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("mubiao001.blue") || nodeId.startsWith("mubiao002.blue") || nodeId.startsWith("mubiao003.blue") || nodeId.startsWith("mubiao004.blue")) {
			if (onOff == true) {
				if (nowInfos.target > 1) {

					fastop.removeNode("rmBlue", nodeId);
					nowInfos.target--;
					nowInfos.allTarget++;
					roomFunction.playSoundTivite(false, "right", "positive");
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					// usersInfos.levelScore += 40;
					mutourenPlusFuncs.ScorePlay();
				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += 40;
						mutourenPlusFuncs.ScorePlay();
						let nowGame = levelInfos.gameIdList.indexOf(nowInfos.nowGameid);
						nowGame++;
						roomFunction.goToNextGame();
						// roomFunction.stopSound("mutourenPlus")
						clearInterval(mutourenPlusFuncs.allRed.gameCirCtl)
						roomFunction.stopSound("fenwei")
						roomFunction.playSoundTivite(false, "levelup", "positive")
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += 40;
						mutourenPlusFuncs.ScorePlay()
						wanFa_mutourenPlus.gameLevelEnd();
					}
				}
			}
		}
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		// if (nowInfos.lifeProtect == 0) {
		if (nodeId.startsWith("blackArea") && onOff == true && mutourenPlusInfos.redCheck == 1) {
			// nowInfos.lifeProtect = 1;
			// setTimeout(function () {
			// 	nowInfos.lifeProtect = 0
			// }, 1000);
			if (nowInfos.lifePoint > 1) {
				mutourenPlusFuncs.addBlink(x, y)
				nowInfos.lifePoint--;
				gameRules.lifeMove();
				roomFunction.playSoundTivite(false, "mutourenPlusWrong", "negative");
				if (nowInfos.lifePoint == 3) {
					roomFunction.playSound(false, "life")
				}
			} else if (nowInfos.lifePoint == 1) {
				nowInfos.lifePoint--;
				gameRules.lifeMove();
				roomFunction.playSoundTivite(false, "mutourenPlusWrong", "negative");
				wanFa_mutourenPlus.gameLevelEnd()
			}
			// }
		}
	},
	addBlink(x, y) {
		// fastop.addNode("addBlink" + x + "_" + y, "wrongBlink" + x + "_" + y, "b", x, y, 254, 254, 0)
		fastop.addWin("addBlink" + x + "_" + y, "wrongBlink" + x + "_" + y, x - 1, y - 1, x + 1, y + 1, 254, 0, 0)
		setTimeout(() => {
			fastop.removeNode("rmBlink" + x + "_" + y, "wrongBlink" + x + "_" + y)
		}, 1500);
	},
	createGreen(x, y) {
		let opInfo = {
			opId: "addGreen" + x + "_" + y,
			opType: "addNode",
			nodes: [{
				nodeId: "green" + x + "_" + y,
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
							x: (levelInfos.level == 1) ? (x - 1) : x,
							y: (levelInfos.level == 1) ? (y - 1) : y,

						},
						rb: {
							x: (levelInfos.level != 3) ? (x + 1) : x,
							y: (levelInfos.level != 3) ? (y + 1) : y,
						}
					},
					rgba: {
						r: 0,
						g: 254,
						b: 0,
						a: 1
					}
				}
			}]
		}
		gameFuncs.op(opInfo)


		// setTimeout(() => {
		mutourenPlusFuncs.removeGreen("removeGreen" + x + "_" + y, "green" + x + "_" + y)
		// }, 3500);

	},
	removeGreen(opId, opNode) {
		setTimeout(() => {
			// engine.log("opId" + opId)
			if (mutourenPlusInfos.gameEndCtl == 1) {
				return
			}
			let opInfo = {
				opId: opId,
				opType: "rmNode",
				opNode: opNode,
			}
			gameFuncs.op(opInfo);
		}, 2000);

	},

	randomBluePoint(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 15);
			let y = Math.floor(Math.random() * 31);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < blueNum) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x;
			let y = res.y;
			temp += "," + res.key
			let opInfo = {
				opId: "addBlue" + i,
				opType: "addNode",
				opNode: "right",
				nodes: [{
					nodeId: "right" + i,
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
							a: 0.9
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},

	allRed() {
		engine.log("allRed")
		mutourenPlusFuncs.allRed.gameCirCtl = setIntervalCount(() => {
			if (mutourenPlusInfos.gameEndCtl == 1) {
				clearInterval(mutourenPlusFuncs.allRed.gameCirCtl)
				return
			}
			switch (mutourenPlusInfos.gameLoopsNum) {
				case 0:
					roomFunction.playSound(false, "mutourenPlus")
					fastop.setNodeVisible("smile001", "smile001", 0.1, "true", "true", "true", "true")
					fastop.setNodeVisible("cover", "cover", 0.1, "true", "true", "true", "true")
					break;
				case 50: {
					fastop.addWin("blackArea", "blackArea", 0, 0, 15, 31, 0, 0, 0)
					fastop.setNodeVisible("smile001", "smile001", 0.1, "false", "false", "false", "false")
					fastop.setNodeVisible("cover", "cover", 0.1, "false", "false", "false", "false")
					break
				}
				case 51: {
					mutourenPlusInfos.redCheck = 1
					break
				}
				case 70: {
					fastop.removeNode("blackArea", "blackArea")
					clearInterval(mutourenPlusFuncs.allRed.gameCirCtl)
					mutourenPlusInfos.gameLoopsNum = 0;
					mutourenPlusInfos.redCheck = 0
					mutourenPlusFuncs.allRed()
					return
				}
			}
			mutourenPlusInfos.gameLoopsNum++
		}, 100, 80)
	},
	allRedX12() {
		engine.log("allRedX2")
		mutourenPlusFuncs.allRed.gameCirCtl = setIntervalCount(() => {
			if (mutourenPlusInfos.gameEndCtl == 1) {
				clearInterval(mutourenPlusFuncs.allRed.gameCirCtl)
				return
			}
			switch (mutourenPlusInfos.gameLoopsNum) {
				case 0:
					roomFunction.playSound(false, "mutourenPlus12")
					fastop.setNodeVisible("smile001", "smile001", 0.1, "true", "true", "true", "true")
					fastop.setNodeVisible("cover", "cover", 0.1, "true", "true", "true", "true")
					break;
				case 40: {
					fastop.addWin("blackArea", "blackArea", 0, 0, 15, 31, 0, 0, 0)
					fastop.setNodeVisible("smile001", "smile001", 0.1, "false", "false", "false", "false")
					fastop.setNodeVisible("cover", "cover", 0.1, "false", "false", "false", "false")
					break
				}
				case 41: {
					mutourenPlusInfos.redCheck = 1
					break
				}
				case 60: {
					fastop.removeNode("blackArea", "blackArea")
					clearInterval(mutourenPlusFuncs.allRed.gameCirCtl)
					mutourenPlusInfos.gameLoopsNum = 0;
					mutourenPlusInfos.redCheck = 0
					mutourenPlusFuncs.allRedX12()
					return
				}
			}
			mutourenPlusInfos.gameLoopsNum++
		}, 100, 80)
	},
	allRedX15() {
		engine.log("allRedX3")
		mutourenPlusFuncs.allRed.gameCirCtl = setIntervalCount(() => {
			if (mutourenPlusInfos.gameEndCtl == 1) {
				clearInterval(mutourenPlusFuncs.allRed.gameCirCtl)
				return
			}
			switch (mutourenPlusInfos.gameLoopsNum) {
				case 0:
					roomFunction.playSound(false, "mutourenPlus15")
					fastop.setNodeVisible("smile001", "smile001", 0.1, "true", "true", "true", "true")
					fastop.setNodeVisible("cover", "cover", 0.1, "true", "true", "true", "true")
					break;
				case 32: {
					fastop.addWin("blackArea", "blackArea", 0, 0, 15, 31, 0, 0, 0)
					fastop.setNodeVisible("smile001", "smile001", 0.1, "false", "false", "false", "false")
					fastop.setNodeVisible("cover", "cover", 0.1, "false", "false", "false", "false")
					break
				}
				case 33: {
					mutourenPlusInfos.redCheck = 1
					break
				}
				case 52: {
					fastop.removeNode("blackArea", "blackArea")
					clearInterval(mutourenPlusFuncs.allRed.gameCirCtl)
					mutourenPlusInfos.gameLoopsNum = 0;
					mutourenPlusInfos.redCheck = 0
					mutourenPlusFuncs.allRedX15()
					return
				}
			}
			mutourenPlusInfos.gameLoopsNum++
		}, 100, 80)
	},
	CountPlay() {
		mutourenPlusFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
			let opInfo = {
				opId: "screenCountPlay",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_3b01",
					block1: {
						model: "dis_b_numUnit",
						label1: "SECONDS",
						value1: mutourenPlusInfos.allTime - 1
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
			mutourenPlusInfos.allTime--;
			// if (mutourenPlusInfos.allTime == 0 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
			// 	roomFunction.goToNextGame()
			// }
			if (mutourenPlusInfos.allTime == 1) {
				wanFa_mutourenPlus.gameTimeOver()

			}
		}, 1000, mutourenPlusInfos.allTime - 1)
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
					value1: mutourenPlusInfos.allTime - 1
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
