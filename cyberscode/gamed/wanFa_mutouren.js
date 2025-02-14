const wanFa_mutouren = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_mutouren.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_mutouren.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_mutouren.gameDestroy);
		//重置全局变量
		mutourenFuncs.resetAll()
		// nowInfos.scoreCoefficient = scoreC;





		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_mutouren.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("mutouren")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 17:
					clearInterval(wanFa_mutouren.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);
		// setTimeout(() => {
		// 	roomFunction.playSound(false, "mutourenRules");
		// }, 2500);

		// setTimeout(function () {
		// 	if (levelInfos.wanFa.startsWith("mutouren")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 	}
		// }, sec * 1000);
		// setTimeout(function () {
		// 	surfaceCtr.ctlDoor(0, 5000);
		// }, 3500);
	},




	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {

		engine.addEventListener("gameTaped", wanFa_mutouren.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("mutouren")) {
			mutourenInfos.allTime = 73;

			if (usersInfos.usersResult.length == 5 || usersInfos.usersResult.length == 6) {
				nowInfos.target = 200;
			} else {
				nowInfos.target = usersInfos.usersResult.length * 50
			}
			nowInfos.nowGameid = gameid;
			mutourenInfos.gameLoopsNum = 0
			// mutourenFuncs.randomBluePoint(30);
			mutourenFuncs.allRed()
			// mutourenFuncs.allRed12X()
			// mutourenFuncs.allRed14X()

			// mutourenFuncs.allRed20X()
			// mutourenFuncs.allRed16x()

			gameRules.lifeMove();
			mutourenFuncs.CountPlay();
			mutourenFuncs.randomBluePoint(30)
			mutourenFuncs.ScorePlay();
			if (levelInfos.level == 1) {
				mutourenFuncs.createGreen()
			}
		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("mutouren")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			mutourenFuncs.rightTap(face, x, y, onOff, nodeId, event);
			mutourenFuncs.tapWrong(face, x, y, onOff, nodeId, event);


			if (nodeId.startsWith("fake") && levelInfos.level == 8 && moveColor == 1) {
				mutourenFuncs.fakerTap(nodeId)
			}
			if (levelInfos.level == 9) {
				mutourenFuncs.ueserTap(face, x, y, onOff, nodeId, event)
			}
			if (levelInfos.level == 10) {
				mutourenFuncs.ueserTapTen(face, x, y, onOff, nodeId, event)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(mutourenFuncs.CountPlay.innerCount)
		//roomFunction.stopSound("mutouren")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			wanFa_mutouren.gameLevelEnd()
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(mutourenFuncs.CountPlay.innerCount)
		roomFunction.stopSound("mutouren")
		roomFunction.stopSound("mutourenBgm1.2x")
		roomFunction.stopSound("mutourenBgm1.4x")
		roomFunction.stopSound("mutourenBgm1.5x")
		roomFunction.stopSound("mutourenBgm2x")
		roomFunction.stopSound("daoshu10")
		roomFunction.goToGameLevel("leave_hold", "none")
		mutourenFuncs.rmAllListener()
		wanFaCtl_mutourenCtl.gameEndCtl(nowInfos.allTarget, nowInfos.lifePoint, mutourenInfos.allTime)
		levelInfos.gameIdList = []
		mutourenInfos.gameEndCtl = 1

	}
}

const mutourenFuncs = {
	//重置所有变量
	resetAll(difficulty) {
		// nowInfos.gameCountTime = 30;
		nowInfos.lifePoint = 6;
		// usersInfos.gameScore = 0;
		// usersInfos.levelScore = 0;
		//nowInfos.target = 30
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		mutourenInfos.redCheck = 0;
		mutourenInfos.addGreen = false;
		mutourenInfos.allTime = 0;
		mutourenInfos.gameLoopsNum = 0;
		mutourenInfos.gameEndCtl = 0;
		mutourenInfos.bgmSpeed = 0
		moveColor = 1
		muX = 0
		muY = 0
		mutX = 0
		mutY = 0
		mutouKong = 0
		switch (levelInfos.level) {
			case 1:
				mutourenInfos.greenNums = 2
				mutourenInfos.greenArea = 4
				break;
			case 2:
				mutourenInfos.greenNums = 1
				mutourenInfos.greenArea = 3
				break;
			case 3:
				// mutourenInfos.greenNums = 2
				// mutourenInfos.greenArea = 1
				mutourenInfos.greenNums = 1
				mutourenInfos.greenArea = 2
				break;
			case 4:
				mutourenInfos.greenNums = 1
				mutourenInfos.greenArea = 2
				break;
			case 5:
				mutourenInfos.greenNums = 2
				mutourenInfos.greenArea = 1
				break;
			case 6:
				if (usersInfos.usersResult.length >= 5) {
					mutourenInfos.greenNums = 3
					mutourenInfos.greenArea = 0
				} else {
					mutourenInfos.greenNums = 2
					mutourenInfos.greenArea = 0
				}

				// mutourenInfos.greenNums = 1
				// mutourenInfos.greenArea = 4
				break;
			case 7:
				mutourenInfos.greenNums = usersInfos.usersResult.length
				mutourenInfos.greenArea = 0
				break;
			case 8:
				mutourenInfos.greenNums = 2
				mutourenInfos.greenArea = 0
				break;
			case 9:
				mutourenInfos.greenNums = 1
				mutourenInfos.greenArea = 1
				break;
			case 10:
				mutourenInfos.greenNums = 1
				mutourenInfos.greenArea = 1
				break;
			default:
				break;
		}
	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_mutouren.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_mutouren.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_mutouren.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_mutouren.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_mutouren.gameTaped)

	},
	//判断正确后进行加分
	rightTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("right")) {
			if (onOff == true) {
				usersInfos.ValidTarget++
				fastop.removeNode("rmBlue", nodeId);
				nowInfos.target--;
				nowInfos.allTarget++;
				roomFunction.playSoundTivite(false, "right", "positive");
				// usersInfos.gameScore += nowInfos.scoreCoefficient;
				// usersInfos.levelScore += nowInfos.scoreCoefficient;
				mutourenFuncs.ScorePlay();
				if (usersInfos.usersResult.length != 5 && usersInfos.usersResult.length != 6 && nowInfos.allTarget >= (usersInfos.usersResult.length * 50)) {
					wanFa_mutouren.gameLevelEnd()

				} else if (usersInfos.usersResult.length >= 5 && nowInfos.allTarget >= 200) {
					wanFa_mutouren.gameLevelEnd()
				}


			}
		}
	},
	fakerTap(nodeId) {
		moveColor = 0
		roomFunction.playSoundTivite(false, "wrong3", "negative")
		fastop.fakerChange("fake" + nodeId, nodeId)
		setTimeout(() => {
			moveColor = 1
			fastop.removeNode("fake" + nodeId, nodeId)
		}, 700);
	},

	ueserTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "greenHuan0" && onOff == true) {
			fastop.setNodeVisible("greenHuan0", "greenHuan0", 0.1, false, false, false, false)
			let opInfo1 = {
				opId: "addGreen",
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenkuo",
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
								x: muX - 1,
								y: muY - 1
							},
							rb: {
								x: muX + 2,
								y: muY + 2
							}
						},
						ringWidth: "1",
						ringRgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo1)
		}
		else if (nodeId == "greenTwooo0" && onOff == true) {
			fastop.setNodeVisible("greenTwooo0", "greenTwooo0", 0.1, false, false, false, false)
			let opInfo1 = {
				opId: "addGreen",
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenkuoTwo",
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
								x: mutX - 1,
								y: mutY - 1
							},
							rb: {
								x: mutX + 2,
								y: mutY + 2
							}
						},
						ringWidth: "1",
						ringRgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo1)
		}
	},
	ueserTapTen(face, x, y, onOff, nodeId, event) {
		if (nodeId == "greenHuan0" && onOff == true) {
			fastop.setNodeVisible("greenHuan0", "greenHuan0", 0.1, false, false, false, false)
			let opInfo1 = {
				opId: "addGreen",
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenkuo",
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
								x: muX + 1,
								y: muY + 1
							},
							rb: {
								x: muX + 2,
								y: muY + 2
							}
						},
						ringWidth: "1",
						ringRgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo1)
		} else if (nodeId == "greenTwooo0" && onOff == true) {
			fastop.setNodeVisible("greenTwooo0", "greenTwooo0", 0.1, false, false, false, false)
			let opInfo1 = {
				opId: "addGreen",
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenkuoTwo",
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
								x: mutX - 1,
								y: mutY - 1
							},
							rb: {
								x: mutX + 2,
								y: mutY + 2
							}
						},
						ringWidth: "1",
						ringRgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo1)
		}
	},



	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true && mutourenInfos.redCheck == 1 && lycnb == 0) {
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				// mutourenFuncs.addBlink(x, y)
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
					wanFa_mutouren.gameLevelEnd()
				}
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
	createGreen() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 27);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x;
			let y = res.y;
			// reX = res.x
			// reY = res.y
			temp += "," + res.key
			let opInfo = {
				opId: "addGreen" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "green" + i,
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
								x: levelInfos.level == 7 || levelInfos.level == 3 || levelInfos.level == 4 ? 0 : 1,
								y: mutourenInfos.greenArea
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}
			let opInfo1 = {
				opId: "addGreenTwo",
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenTwo",
					surface: "b",
					pt: {
						x: x,
						y: y + 3
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
								x: 2,
								y: 0
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}
			let opInfo2 = {
				opId: "addFake",
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "fake",
					surface: "b",
					pt: {
						x: x,
						y: y + 4
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
								x: levelInfos.level == 7 || levelInfos.level == 3 || levelInfos.level == 4 ? 0 : 1,
								y: mutourenInfos.greenArea
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}

			i++;
			if (levelInfos.level == 8) {
				gameFuncs.op(opInfo2)
			}
			if (levelInfos.level == 4) {
				gameFuncs.op(opInfo1)

			}
			gameFuncs.op(opInfo)
		}
	},
	createGreenTwo() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 28);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x;
			let y = res.y;
			temp += "," + res.key
			let opInfo = {
				opId: "addGreenTwo" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenTwo" + i,
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
								x: levelInfos.level == 3 ? 2 : 1,
								y: levelInfos.level == 2 ? mutourenInfos.greenArea - 2 : 0
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}

			i++;
			gameFuncs.op(opInfo)


		}

	},
	createGreenThree() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 27);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			muX = res.x;
			muY = res.y;
			// reX = res.x
			// reY = res.y
			temp += "," + res.key
			let opInfo = {
				opId: "addGreen" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenHuan" + i,
					surface: "b",
					pt: {
						x: muX,
						y: muY
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
								x: levelInfos.level == 7 || levelInfos.level == 3 || levelInfos.level == 4 ? 0 : 1,
								y: mutourenInfos.greenArea
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},
	createGreenFour() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 27);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			mutX = res.x;
			mutY = res.y;
			// reX = res.x
			// reY = res.y
			temp += "," + res.key
			let opInfo = {
				opId: "addGreen" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenTwooo" + i,
					surface: "b",
					pt: {
						x: mutX,
						y: mutY
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
								x: levelInfos.level == 7 || levelInfos.level == 3 || levelInfos.level == 4 ? 0 : 1,
								y: mutourenInfos.greenArea
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},
	createGreenFive() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 27);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			muX = res.x;
			muY = res.y;
			// reX = res.x
			// reY = res.y
			temp += "," + res.key
			let opInfo = {
				opId: "addGreen" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenHuan" + i,
					surface: "b",
					pt: {
						x: muX,
						y: muY
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
								x: levelInfos.level == 7 || levelInfos.level == 3 || levelInfos.level == 4 ? 0 : 3,
								y: mutourenInfos.greenArea + 2
							}
						},
						ringWidth: "1",
						ringRgba: {
							r: 0,
							g: 254,
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
	createGreenSix() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 27);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			mutX = res.x;
			mutY = res.y;
			// reX = res.x
			// reY = res.y
			temp += "," + res.key
			let opInfo = {
				opId: "addGreen" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenTwooo" + i,
					surface: "b",
					pt: {
						x: mutX,
						y: mutY
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
								x: levelInfos.level == 7 || levelInfos.level == 3 || levelInfos.level == 4 ? 0 : 1,
								y: mutourenInfos.greenArea
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},

	createGreenSeven() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 27);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x;
			let y = res.y;
			// reX = res.x
			// reY = res.y
			temp += "," + res.key
			let opInfo1 = {
				opId: "addGreen" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "green" + i,
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
								x: x + 3,
								y: y + 3
							}
						},
						ringWidth: "1",
						ringRgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo1)
			i++;
		}
	},
	createGreenEight() {
		function randXY() {
			let x = Math.floor(Math.random() * 14);
			let y = Math.floor(Math.random() * 28);
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = "";
		let i = 0;
		while (i < mutourenInfos.greenNums) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x;
			let y = res.y;
			temp += "," + res.key
			let opInfo = {
				opId: "addGreenTwo" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "greenTwo" + i,
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
								x: 1,
								y: 1
							}
						},
						rgba: {
							r: 0,
							g: 254,
							b: 0,
							a: 0.9
						}
					}
				}]
			}

			i++;
			gameFuncs.op(opInfo)


		}

	},
	removeGreen(opId, opNode) {
		setTimeout(() => {
			// engine.log("opId" + opId)
			if (mutourenInfos.gameEndCtl == 1) {
				return
			}
			let opInfo = {
				opId: opId,
				opType: "rmNode",
				opNode: opNode,
			}
			gameFuncs.op(opInfo);
		}, 3000);

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
		let gameCirCtl = setIntervalCount(() => {
			if (mutourenInfos.gameEndCtl == 1) {
				clearInterval(gameCirCtl)
				return
			}
			switch (mutourenInfos.gameLoopsNum) {
				case 22:
					if (levelInfos.level != 1 && levelInfos.level != 2 && levelInfos.level != 3 && levelInfos.level != 4 && levelInfos.level != 9 && levelInfos.level != 10) {
						mutourenFuncs.createGreen()
					} else if (levelInfos.level == 3 || levelInfos.level == 4) {
						mutourenFuncs.createGreen()
						mutourenFuncs.createGreenTwo()
					} else if (levelInfos.level == 9) {
						mutourenFuncs.createGreenThree()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenFour()
						}
					} else if (levelInfos.level == 10) {
						mutouKong = 1
						mutourenFuncs.createGreenFive()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenSix()
						}
					} else if (levelInfos.level == 2) {
						mutourenFuncs.createGreenSeven()
						mutourenFuncs.createGreenEight()
					}
					break;
				case 20:
					roomFunction.playSound(false, "mutouren", "background")
					if (levelInfos.level == 9 || (levelInfos.level == 10 && mutouKong == 1)) {
						mutouKong = 0
						// setTimeout(() => {

						// }, 500);
						fastop.setNodeVisible("greenkuoPlay", "greenkuo", 0.1, false, false, false, false)
						if (usersInfos.usersResult.length > 4) {
							fastop.setNodeVisible("greenkuoPlay", "greenkuoTwo", 0.1, false, false, false, false)
						}
					}
					lycnb = 1
					break;
				case 70:
					let opInfo = {
						opId: "red2",
						opType: "play",
						opNode: "red002",
						timeLen: 1,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					break
				case 80:
					let opInfo2 = {
						opId: "red2",
						opType: "play",
						opNode: "red003",
						timeLen: 1,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					gameFuncs.op(opInfo2);
					break;
				case 90:
					mutourenInfos.redCheck = 1;
					mutourenFuncs.addStop()
					setTimeout(() => {
						lycnb = 0
					}, 100);
					let opInfo100 = {
						opId: "stopBottomClorPlay",
						opType: "play",
						opNode: "stopBottomClor",
						timeLen: 3,
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
					gameFuncs.op(opInfo100);

					let opInfo4 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red001",
						timeLen: 3,
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
					gameFuncs.op(opInfo4);
					let opInfo5 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red857",
						timeLen: 3,
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
					gameFuncs.op(opInfo5);
					let opInfo6 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red858",
						timeLen: 3,
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
					gameFuncs.op(opInfo6);
					let opInfo7 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red859",
						timeLen: 3,
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
					gameFuncs.op(opInfo7);
					let opInfo8 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red860",
						timeLen: 3,
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
					gameFuncs.op(opInfo8);
					let opInfo9 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red861",
						timeLen: 3,
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
					gameFuncs.op(opInfo9);
					let opInfo10 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red862",
						timeLen: 3,
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
					gameFuncs.op(opInfo10);
					let opInfo11 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red863",
						timeLen: 3,
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
					gameFuncs.op(opInfo11);
					let opInfo12 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red864",
						timeLen: 3,
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
					gameFuncs.op(opInfo12);
					let opInfo13 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red865",
						timeLen: 3,
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
					gameFuncs.op(opInfo13);
					let opInfo14 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red866",
						timeLen: 3,
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
					gameFuncs.op(opInfo14);
					let opInfo15 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red867",
						timeLen: 3,
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
					gameFuncs.op(opInfo15);
					let opInfo16 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red868",
						timeLen: 3,
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
					gameFuncs.op(opInfo16);
					let opInfo17 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red869",
						timeLen: 3,
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
					gameFuncs.op(opInfo17);
					let opInfo18 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red870",
						timeLen: 3,
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
					gameFuncs.op(opInfo18);
					let opInfo19 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red871",
						timeLen: 3,
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
					gameFuncs.op(opInfo19);
					let opInfo20 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red888",
						timeLen: 3,
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
					gameFuncs.op(opInfo20);
					break;
				case 99: {
					clearInterval(gameCirCtl)
					mutourenInfos.redCheck = 1;
					mutourenInfos.gameLoopsNum = 0;
					//nowInfos.target = 30;
					mutourenInfos.bgmSpeed++
					if (mutourenInfos.bgmSpeed == 2) {
						mutourenInfos.bgmSpeed = 0
						mutourenFuncs.allRed12X()
					} else {
						mutourenFuncs.allRed()
					}
					mutourenFuncs.randomBluePoint(30)
					return
				}
			}
			mutourenInfos.gameLoopsNum++
		}, 100, 100)
	},
	allRed12X() {
		engine.log("allRed12X")

		let gameCirCtl = setIntervalCount(() => {
			if (mutourenInfos.gameEndCtl == 1) {
				clearInterval(gameCirCtl)
				return
			}
			switch (mutourenInfos.gameLoopsNum) {
				case 23:
					mutourenFuncs.createGreen()
					if (levelInfos.level != 2 && levelInfos.level != 3 && levelInfos.level != 4 && levelInfos.level != 9 && levelInfos.level != 10) {
						if (levelInfos.level == 8 || levelInfos.level == 6) {
							mutourenInfos.greenNums = 2
							mutourenInfos.greenArea = 1
						}
						mutourenFuncs.createGreen()
					} else if (levelInfos.level == 3 || levelInfos.level == 4) {
						mutourenFuncs.createGreen()
						mutourenFuncs.createGreenTwo()
					} else if (levelInfos.level == 9) {
						mutourenFuncs.createGreenThree()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenFour()
						}
					} else if (levelInfos.level == 10) {
						mutourenFuncs.createGreenFive()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenSix()
						}
					} else if (levelInfos.level == 2) {
						mutourenFuncs.createGreenSeven()
						mutourenFuncs.createGreenEight()
					}
					break;
				case 17:
					roomFunction.playSound(false, "mutourenBgm1.2x", "background")
					if (levelInfos.level == 9 || levelInfos.level == 10) {
						// setTimeout(() => {

						// }, 500);
						fastop.setNodeVisible("greenkuoPlay", "greenkuo", 0.1, false, false, false, false)
						if (usersInfos.usersResult.length > 4) {
							fastop.setNodeVisible("greenkuoPlay", "greenkuoTwo", 0.1, false, false, false, false)
						}
					}
					lycnb = 1
					break;
				case 55:
					let opInfo = {
						opId: "red2",
						opType: "play",
						opNode: "red002",
						timeLen: 0.7,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					break
				case 65:
					let opInfo2 = {
						opId: "red2",
						opType: "play",
						opNode: "red003",
						timeLen: 0.7,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					gameFuncs.op(opInfo2);
					break;
				case 72:
					mutourenInfos.redCheck = 1;
					mutourenFuncs.addStop()
					setTimeout(() => {
						lycnb = 0
					}, 100);
					let opInfo100 = {
						opId: "stopBottomClorPlay",
						opType: "play",
						opNode: "stopBottomClor",
						timeLen: 3,
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
					gameFuncs.op(opInfo100);

					let opInfo4 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red001",
						timeLen: 3,
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
					gameFuncs.op(opInfo4);
					let opInfo5 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red857",
						timeLen: 3,
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
					gameFuncs.op(opInfo5);
					let opInfo6 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red858",
						timeLen: 3,
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
					gameFuncs.op(opInfo6);
					let opInfo7 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red859",
						timeLen: 3,
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
					gameFuncs.op(opInfo7);
					let opInfo8 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red860",
						timeLen: 3,
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
					gameFuncs.op(opInfo8);
					let opInfo9 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red861",
						timeLen: 3,
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
					gameFuncs.op(opInfo9);
					let opInfo10 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red862",
						timeLen: 3,
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
					gameFuncs.op(opInfo10);
					let opInfo11 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red863",
						timeLen: 3,
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
					gameFuncs.op(opInfo11);
					let opInfo12 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red864",
						timeLen: 3,
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
					gameFuncs.op(opInfo12);
					let opInfo13 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red865",
						timeLen: 3,
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
					gameFuncs.op(opInfo13);
					let opInfo14 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red866",
						timeLen: 3,
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
					gameFuncs.op(opInfo14);
					let opInfo15 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red867",
						timeLen: 3,
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
					gameFuncs.op(opInfo15);
					let opInfo16 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red868",
						timeLen: 3,
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
					gameFuncs.op(opInfo16);
					let opInfo17 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red869",
						timeLen: 3,
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
					gameFuncs.op(opInfo17);
					let opInfo18 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red870",
						timeLen: 3,
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
					gameFuncs.op(opInfo18);
					let opInfo19 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red871",
						timeLen: 3,
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
					gameFuncs.op(opInfo19);
					let opInfo20 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red888",
						timeLen: 3,
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
					gameFuncs.op(opInfo20);
					break;
				case 79: {
					clearInterval(gameCirCtl)
					mutourenInfos.redCheck = 1;
					mutourenInfos.gameLoopsNum = 0;
					//nowInfos.target = 30;
					mutourenInfos.bgmSpeed++
					if (mutourenInfos.bgmSpeed == 2) {
						mutourenInfos.bgmSpeed = 0
						// mutourenFuncs.allRed15x()
						mutourenFuncs.allRed14X()
					} else {
						mutourenFuncs.allRed12X()

					}
					mutourenFuncs.randomBluePoint(30)
					return
				}
			}
			mutourenInfos.gameLoopsNum++
		}, 100, 80)
	},
	allRed14X() {
		engine.log("allRed14X")

		let gameCirCtl = setIntervalCount(() => {
			if (mutourenInfos.gameEndCtl == 1) {
				clearInterval(gameCirCtl)
				return
			}
			switch (mutourenInfos.gameLoopsNum) {
				case 23:
					// mutourenFuncs.createGreen()
					if (levelInfos.level != 1 && levelInfos.level != 2 && levelInfos.level != 3 && levelInfos.level != 4 && levelInfos.level != 9 && levelInfos.level != 10) {
						if (levelInfos.level == 8 || levelInfos.level == 6) {
							mutourenInfos.greenNums = 2
							mutourenInfos.greenArea = 0
						}
						mutourenFuncs.createGreen()
					} else if (levelInfos.level == 3 || levelInfos.level == 4) {
						mutourenFuncs.createGreen()
						mutourenFuncs.createGreenTwo()
					} else if (levelInfos.level == 9) {
						mutourenFuncs.createGreenThree()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenFour()
						}
					} else if (levelInfos.level == 10) {
						mutourenFuncs.createGreenFive()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenSix()
						}
					} else if (levelInfos.level == 2) {
						mutourenFuncs.createGreenSeven()
						mutourenFuncs.createGreenEight()
					}
					break;
				case 17:
					roomFunction.playSound(false, "mutourenBgm1.4x", "background")
					if (levelInfos.level == 9 || levelInfos.level == 10) {
						// setTimeout(() => {

						// }, 500);
						fastop.setNodeVisible("greenkuoPlay", "greenkuo", 0.1, false, false, false, false)
						if (usersInfos.usersResult.length > 4) {
							fastop.setNodeVisible("greenkuoPlay", "greenkuoTwo", 0.1, false, false, false, false)
						}
					}
					lycnb = 1
					break;
				case 55:
					let opInfo = {
						opId: "red2",
						opType: "play",
						opNode: "red002",
						timeLen: 0.7,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					break
				case 63:
					let opInfo2 = {
						opId: "red2",
						opType: "play",
						opNode: "red003",
						timeLen: 0.7,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					gameFuncs.op(opInfo2);
					break;
				case 72:
					mutourenInfos.redCheck = 1;
					mutourenFuncs.addStop()
					setTimeout(() => {
						lycnb = 0
					}, 100);
					let opInfo100 = {
						opId: "stopBottomClorPlay",
						opType: "play",
						opNode: "stopBottomClor",
						timeLen: 3,
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
					gameFuncs.op(opInfo100);

					let opInfo4 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red001",
						timeLen: 3,
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
					gameFuncs.op(opInfo4);
					let opInfo5 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red857",
						timeLen: 3,
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
					gameFuncs.op(opInfo5);
					let opInfo6 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red858",
						timeLen: 3,
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
					gameFuncs.op(opInfo6);
					let opInfo7 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red859",
						timeLen: 3,
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
					gameFuncs.op(opInfo7);
					let opInfo8 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red860",
						timeLen: 3,
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
					gameFuncs.op(opInfo8);
					let opInfo9 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red861",
						timeLen: 3,
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
					gameFuncs.op(opInfo9);
					let opInfo10 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red862",
						timeLen: 3,
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
					gameFuncs.op(opInfo10);
					let opInfo11 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red863",
						timeLen: 3,
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
					gameFuncs.op(opInfo11);
					let opInfo12 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red864",
						timeLen: 3,
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
					gameFuncs.op(opInfo12);
					let opInfo13 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red865",
						timeLen: 3,
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
					gameFuncs.op(opInfo13);
					let opInfo14 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red866",
						timeLen: 3,
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
					gameFuncs.op(opInfo14);
					let opInfo15 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red867",
						timeLen: 3,
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
					gameFuncs.op(opInfo15);
					let opInfo16 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red868",
						timeLen: 3,
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
					gameFuncs.op(opInfo16);
					let opInfo17 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red869",
						timeLen: 3,
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
					gameFuncs.op(opInfo17);
					let opInfo18 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red870",
						timeLen: 3,
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
					gameFuncs.op(opInfo18);
					let opInfo19 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red871",
						timeLen: 3,
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
					gameFuncs.op(opInfo19);
					let opInfo20 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red888",
						timeLen: 3,
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
					gameFuncs.op(opInfo20);
					break;
				case 79: {
					clearInterval(gameCirCtl)
					mutourenInfos.redCheck = 1;
					mutourenInfos.gameLoopsNum = 0;
					//nowInfos.target = 30;
					mutourenInfos.bgmSpeed++
					if (mutourenInfos.bgmSpeed == 2) {
						mutourenInfos.bgmSpeed = 0
						// mutourenFuncs.allRed15x()
						mutourenFuncs.allRed16x()
					} else {
						// mutourenFuncs.allRed()
						mutourenFuncs.allRed14X()

					}
					mutourenFuncs.randomBluePoint(30)
					return
				}
			}
			mutourenInfos.gameLoopsNum++
		}, 100, 80)
	},
	allRed16x() {
		engine.log("allRed16")

		let gameCirCtl = setIntervalCount(() => {
			if (mutourenInfos.gameEndCtl == 1) {
				clearInterval(gameCirCtl)
				return
			}
			switch (mutourenInfos.gameLoopsNum) {
				case 21:
					// mutourenFuncs.createGreen()
					if (levelInfos.level != 2 && levelInfos.level != 3 && levelInfos.level != 4 && levelInfos.level != 9 && levelInfos.level != 10) {
						if (levelInfos.level == 8 || levelInfos.level == 6) {
							mutourenInfos.greenNums = 2
							mutourenInfos.greenArea = 1
						}
						mutourenFuncs.createGreen()
					} else if (levelInfos.level == 3 || levelInfos.level == 4) {
						mutourenFuncs.createGreen()
						mutourenFuncs.createGreenTwo()
					} else if (levelInfos.level == 9) {
						mutourenFuncs.createGreenThree()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenFour()
						}
					} else if (levelInfos.level == 10) {
						mutourenFuncs.createGreenFive()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenSix()
						}
					} else if (levelInfos.level == 2) {
						mutourenFuncs.createGreenSeven()
						mutourenFuncs.createGreenEight()
					}
					break;
				case 10:
					roomFunction.playSound(false, "mutourenBgm1.5x", "background")
					if (levelInfos.level == 9 || levelInfos.level == 10) {
						// setTimeout(() => {

						// }, 500);
						fastop.setNodeVisible("greenkuoPlay", "greenkuo", 0.1, false, false, false, false)
						if (usersInfos.usersResult.length > 4) {
							fastop.setNodeVisible("greenkuoPlay", "greenkuoTwo", 0.1, false, false, false, false)
						}
					}
					lycnb = 1
					break;
				case 42:
					let opInfo = {
						opId: "red2",
						opType: "play",
						opNode: "red002",
						timeLen: 0.5,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					break
				case 48:
					let opInfo2 = {
						opId: "red2",
						opType: "play",
						opNode: "red003",
						timeLen: 0.7,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					gameFuncs.op(opInfo2);
					break;
				case 54:
					mutourenInfos.redCheck = 1;
					mutourenFuncs.addStop()
					setTimeout(() => {
						lycnb = 0
					}, 100);
					let opInfo100 = {
						opId: "stopBottomClorPlay",
						opType: "play",
						opNode: "stopBottomClor",
						timeLen: 3,
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
					gameFuncs.op(opInfo100);
					let opInfo4 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red001",
						timeLen: 3,
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
					gameFuncs.op(opInfo4);
					let opInfo5 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red857",
						timeLen: 3,
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
					gameFuncs.op(opInfo5);
					let opInfo6 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red858",
						timeLen: 3,
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
					gameFuncs.op(opInfo6);
					let opInfo7 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red859",
						timeLen: 3,
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
					gameFuncs.op(opInfo7);
					let opInfo8 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red860",
						timeLen: 3,
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
					gameFuncs.op(opInfo8);
					let opInfo9 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red861",
						timeLen: 3,
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
					gameFuncs.op(opInfo9);
					let opInfo10 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red862",
						timeLen: 3,
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
					gameFuncs.op(opInfo10);
					let opInfo11 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red863",
						timeLen: 3,
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
					gameFuncs.op(opInfo11);
					let opInfo12 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red864",
						timeLen: 3,
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
					gameFuncs.op(opInfo12);
					let opInfo13 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red865",
						timeLen: 3,
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
					gameFuncs.op(opInfo13);
					let opInfo14 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red866",
						timeLen: 3,
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
					gameFuncs.op(opInfo14);
					let opInfo15 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red867",
						timeLen: 3,
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
					gameFuncs.op(opInfo15);
					let opInfo16 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red868",
						timeLen: 3,
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
					gameFuncs.op(opInfo16);
					let opInfo17 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red869",
						timeLen: 3,
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
					gameFuncs.op(opInfo17);
					let opInfo18 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red870",
						timeLen: 3,
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
					gameFuncs.op(opInfo18);
					let opInfo19 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red871",
						timeLen: 3,
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
					gameFuncs.op(opInfo19);
					let opInfo20 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red888",
						timeLen: 3,
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
					gameFuncs.op(opInfo20);
					break;
				case 69: {
					clearInterval(gameCirCtl)
					mutourenInfos.redCheck = 1;
					mutourenInfos.gameLoopsNum = 0;
					//nowInfos.target = 30;
					mutourenInfos.bgmSpeed++
					if (mutourenInfos.bgmSpeed == 2) {
						mutourenInfos.bgmSpeed = 0
						mutourenFuncs.allRed20X()
					} else {
						mutourenFuncs.allRed16x()
					}
					mutourenFuncs.randomBluePoint(30)
					return
				}
			}
			mutourenInfos.gameLoopsNum++
		}, 100, 70)
	},
	allRed20X() {
		engine.log("allRed20")
		let gameCirCtl = setIntervalCount(() => {
			if (mutourenInfos.gameEndCtl == 1) {
				clearInterval(gameCirCtl)
				return
			}
			switch (mutourenInfos.gameLoopsNum) {
				case 14:
					// mutourenFuncs.createGreen()
					if (levelInfos.level != 2 && levelInfos.level != 3 && levelInfos.level != 4 && levelInfos.level != 9 && levelInfos.level != 10) {
						if (levelInfos.level == 8 || levelInfos.level == 6) {
							mutourenInfos.greenNums = 2
							mutourenInfos.greenArea = 0
						}
						mutourenFuncs.createGreen()
					} else if (levelInfos.level == 3 || levelInfos.level == 4) {
						mutourenFuncs.createGreen()
						mutourenFuncs.createGreenTwo()
					} else if (levelInfos.level == 9) {
						mutourenFuncs.createGreenThree()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenFour()
						}
					} else if (levelInfos.level == 10) {
						mutourenFuncs.createGreenFive()
						if (usersInfos.usersResult.length > 4) {
							mutourenFuncs.createGreenSix()
						}
					} else if (levelInfos.level == 2) {
						mutourenFuncs.createGreenSeven()
						mutourenFuncs.createGreenEight()
					}
					break;
				case 10:
					roomFunction.playSound(false, "mutourenBgm2x", "background")
					if (levelInfos.level == 9 || levelInfos.level == 10) {
						// setTimeout(() => {

						// }, 500);
						fastop.setNodeVisible("greenkuoPlay", "greenkuo", 0.1, false, false, false, false)
						if (usersInfos.usersResult.length > 4) {
							fastop.setNodeVisible("greenkuoPlay", "greenkuoTwo", 0.1, false, false, false, false)
						}
					}
					lycnb = 1
					break;
				case 35:
					let opInfo = {
						opId: "red2",
						opType: "play",
						opNode: "red002",
						timeLen: 0.4,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					break
				case 40:
					let opInfo2 = {
						opId: "red2",
						opType: "play",
						opNode: "red003",
						timeLen: 0.5,
						loop: "false",
						keyFrames: [{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: false
							}
						},
						{
							t: 0.9,
							keyFrame: {
								visible: false,
								canTap: false
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
					gameFuncs.op(opInfo2);
					break;
				case 45:
					mutourenInfos.redCheck = 1;
					mutourenFuncs.addStop()
					setTimeout(() => {
						lycnb = 0
					}, 100);
					let opInfo100 = {
						opId: "stopBottomClorPlay",
						opType: "play",
						opNode: "stopBottomClor",
						timeLen: 3,
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
					gameFuncs.op(opInfo100);
					let opInfo4 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red001",
						timeLen: 3,
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
					gameFuncs.op(opInfo4);
					let opInfo5 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red857",
						timeLen: 3,
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
					gameFuncs.op(opInfo5);
					let opInfo6 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red858",
						timeLen: 3,
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
					gameFuncs.op(opInfo6);
					let opInfo7 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red859",
						timeLen: 3,
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
					gameFuncs.op(opInfo7);
					let opInfo8 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red860",
						timeLen: 3,
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
					gameFuncs.op(opInfo8);
					let opInfo9 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red861",
						timeLen: 3,
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
					gameFuncs.op(opInfo9);
					let opInfo10 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red862",
						timeLen: 3,
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
					gameFuncs.op(opInfo10);
					let opInfo11 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red863",
						timeLen: 3,
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
					gameFuncs.op(opInfo11);
					let opInfo12 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red864",
						timeLen: 3,
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
					gameFuncs.op(opInfo12);
					let opInfo13 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red865",
						timeLen: 3,
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
					gameFuncs.op(opInfo13);
					let opInfo14 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red866",
						timeLen: 3,
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
					gameFuncs.op(opInfo14);
					let opInfo15 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red867",
						timeLen: 3,
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
					gameFuncs.op(opInfo15);
					let opInfo16 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red868",
						timeLen: 3,
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
					gameFuncs.op(opInfo16);
					let opInfo17 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red869",
						timeLen: 3,
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
					gameFuncs.op(opInfo17);
					let opInfo18 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red870",
						timeLen: 3,
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
					gameFuncs.op(opInfo18);
					let opInfo19 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red871",
						timeLen: 3,
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
					gameFuncs.op(opInfo19);
					let opInfo20 = {
						opId: "twinkleRed",
						opType: "play",
						opNode: "red888",
						timeLen: 3,
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
					gameFuncs.op(opInfo20);
					break;
				case 59: {
					clearInterval(gameCirCtl)
					mutourenInfos.redCheck = 1;
					mutourenInfos.gameLoopsNum = 0;
					//nowInfos.target = 30;
					// mutourenFuncs.allRed20X()
					mutourenFuncs.randomBluePoint(30)
					return
				}
			}
			mutourenInfos.gameLoopsNum++
		}, 100, 60)
	},
	addStop() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red857",
			nodes: [{
				nodeId: "red857",
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
							y: 33
						},
						rb: {
							x: 3,
							y: 42
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
			opNode: "red858",
			nodes: [{
				nodeId: "red858",
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
							y: 39
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
			}]
		}
		gameFuncs.op(opInfo1)
		let opInfo2 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red859",
			nodes: [{
				nodeId: "red859",
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
							y: 42
						},
						rb: {
							x: 2,
							y: 42
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
			opNode: "red888",
			nodes: [{
				nodeId: "red888",
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
							y: 39
						},
						rb: {
							x: 0,
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
			}]
		}
		gameFuncs.op(opInfo3)
		let opInfo4 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red860",
			nodes: [{
				nodeId: "red860",
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
							x: 5,
							y: 33
						},
						rb: {
							x: 7,
							y: 33
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
			opNode: "red861",
			nodes: [{
				nodeId: "red861",
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
							x: 5,
							y: 42
						},
						rb: {
							x: 7,
							y: 42
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
		let opInfo6 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red862",
			nodes: [{
				nodeId: "red862",
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
							x: 5,
							y: 34
						},
						rb: {
							x: 5,
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
			}]
		}
		gameFuncs.op(opInfo6)
		let opInfo7 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red863",
			nodes: [{
				nodeId: "red863",
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
							x: 7,
							y: 34
						},
						rb: {
							x: 7,
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
			}]
		}
		gameFuncs.op(opInfo7)
		let opInfo8 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red864",
			nodes: [{
				nodeId: "red864",
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
							x: 10,
							y: 33
						},
						rb: {
							x: 10,
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
			}]
		}
		gameFuncs.op(opInfo8)
		let opInfo9 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red865",
			nodes: [{
				nodeId: "red865",
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
							y: 42
						},
						rb: {
							x: 11,
							y: 42
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
		gameFuncs.op(opInfo9)
		let opInfo10 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red866",
			nodes: [{
				nodeId: "red866",
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
							y: 33
						},
						rb: {
							x: 3,
							y: 42
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
			opId: "addRed",
			opType: "addNode",
			opNode: "red867",
			nodes: [{
				nodeId: "red867",
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
							x: 13,
							y: 33
						},
						rb: {
							x: 15,
							y: 33
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
		gameFuncs.op(opInfo11)
		let opInfo12 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red868",
			nodes: [{
				nodeId: "red868",
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
							x: 13,
							y: 34
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
			}]
		}
		gameFuncs.op(opInfo12)
		let opInfo13 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red869",
			nodes: [{
				nodeId: "red869",
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
							x: 13,
							y: 37
						},
						rb: {
							x: 15,
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
			}]
		}
		gameFuncs.op(opInfo13)
		let opInfo14 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red870",
			nodes: [{
				nodeId: "red870",
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
							y: 38
						},
						rb: {
							x: 15,
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
			}]
		}
		gameFuncs.op(opInfo14)
		let opInfo15 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red871",
			nodes: [{
				nodeId: "red871",
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
							x: 13,
							y: 42
						},
						rb: {
							x: 15,
							y: 42
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
		gameFuncs.op(opInfo15)
	},

	CountPlay() {
		mutourenFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
			let opInfo = {
				opId: "screenCountPlay",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_3b01",
					block1: {
						model: "dis_b_numUnit",
						label1: "SECONDS",
						value1: mutourenInfos.allTime - 1
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
						label2: "当前块数",
						value2: nowInfos.allTarget
					}
				}
			}
			gameFuncs.op(opInfo);
			mutourenInfos.allTime--;
			// if (mutourenInfos.allTime == 0) {
			// 	wanFa_mutouren.gameLevelEnd()
			// }
		}, 1000, mutourenInfos.allTime - 1)
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
					value1: mutourenInfos.allTime - 1
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
					label2: "当前块数",
					value2: nowInfos.allTarget
				}
			}
		}
		gameFuncs.op(opInfo)
	},


}
