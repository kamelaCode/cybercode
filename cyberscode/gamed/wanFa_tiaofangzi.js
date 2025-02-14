const wanFa_tiaofangzi = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_tiaofangzi.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_tiaofangzi.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_tiaofangzi.gameDestroy);
		//重置全局变量
		tiaofangziFuncs.resetAll(difficulty)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}
		engine.log(levelInfos.gameIdList)
		jingJiInfos.neiUser = []
		tiaofangziFuncs.ScorePlay()//跳转内屏显示
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		roomFunction.playSound(false, "ding")
		let countTime = 0
		wanFa_tiaofangzi.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("tiaofangzi")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 17:
					clearInterval(wanFa_tiaofangzi.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);

		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(0, 5000);
		// }, 1000);
		// setTimeout(() => {
		// 	roomFunction.playSound(false, "youxijijiangkaishi");
		// }, 3000);



		// setTimeout(function () {
		// 	if (levelInfos.wanFa.startsWith("tiaofangzi")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 	}
		// }, sec * 1000);

		while (tiaogeziInfos.blinkArr.length < 12) {
			let random = Math.floor(Math.random() * tiaogeziInfos.blockRange)
			if (random != tiaogeziInfos.blinkArr[tiaogeziInfos.blinkArr.length - 1]) {
				tiaogeziInfos.blinkArr.push(random)
			}
		}
		engine.log("tiaogeziInfos.blinkArr", tiaogeziInfos.blinkArr)
	},


	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_tiaofangzi.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("tiaofangzi-hf")) {
			let playSound = setTimeout(function () {
				if (levelInfos.gameIdList.length == 0) {
					clearTimeout(playSound)
					return
				}
				roomFunction.playSound(true, "tiaofangziBgm", "background")
			}, 10000);
			roomFunction.playSound(false, "tiaofangzirules")
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			tiaofangziFuncs.CountPlay()


			tiaofangziFuncs.addArea("red", 9, { r: 254, g: 0, b: 0, a: 1 })
			tiaofangziFuncs.addTarget("red")
			tiaofangziFuncs.addArea("blue", 23, { r: 0, g: 0, b: 254, a: 1 })
			tiaofangziFuncs.addTarget("blue")
			if (usersInfos.usersResult.length == 2) {
				return
			}
			tiaofangziFuncs.addArea("green", 5, { r: 0, g: 254, b: 0, a: 1 })
			tiaofangziFuncs.addTarget("green")
			if (usersInfos.usersResult.length == 3) {
				return
			}
			tiaofangziFuncs.addArea("yellow", 19, { r: 254, g: 254, b: 0, a: 1 })
			tiaofangziFuncs.addTarget("yellow")
			if (usersInfos.usersResult.length == 4) {
				return
			}
			tiaofangziFuncs.addArea("cyan", 16, { r: 0, g: 254, b: 254, a: 1 })
			tiaofangziFuncs.addTarget("cyan")
			if (usersInfos.usersResult.length == 5) {
				return
			}
			tiaofangziFuncs.addArea("brown", 2, { r: 139, g: 69, b: 19, a: 1, })
			tiaofangziFuncs.addTarget("brown")





		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event)
		if (onOff == true) {
			usersInfos.ValidTrigger++
		}
		tiaofangziFuncs.ueserTap(face, x, y, onOff, nodeId, event)
		tiaofangziFuncs.wrongTap(face, x, y, onOff, nodeId, event)
		if (face == "a", onOff == true) {
			tiaofangziFuncs.userCartoon(nodeId)
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-xxx-" + gameid)
		engine.removeEventListener("gameTaped", wanFa_tiaofangzi.gameTaped)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-xxx-" + gameid)
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("tiaofangziBgm")
		roomFunction.stopSound("tiaofangzirules")
		clearInterval(tiaofangziFuncs.CountPlay.innerCount)
		// clearTimeout(wanFa_tiaofangzi.gamePlay.plsySound)
		tiaofangziFuncs.rmAllListener()
		roomFunction.goToGameLevel("leave_hold", "none")
		wanFaCtl_tiaofangziCtl.gameEndCtl()
		levelInfos.gameIdList = []
	}

}




const tiaofangziFuncs = {
	//重置所有变量
	resetAll(difficulty) {
		nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		usersInfos.Stars = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		tiaogeziInfos.blinkArr = [];
		tiaogeziInfos.userCarNums = [0, 0, 0, 0, 0, 0];
		tiaogeziInfos.tapColorProject = [0, 0, 0, 0, 0, 0];
		tiaogeziInfos.blockShow1 = [];
		tiaogeziInfos.blockShow2 = [];
		tiaogeziInfos.blockShow3 = [];
		tiaogeziInfos.blockShow4 = [];
		tiaogeziInfos.blockShow5 = [];
		tiaogeziInfos.blockShow6 = [];
		switch (difficulty) {
			case 1:
				tiaogeziInfos.showSpeed = 1;
				tiaogeziInfos.blockRange = 3
				break;
			case 2:
				tiaogeziInfos.showSpeed = 0.5;
				tiaogeziInfos.blockRange = 3

				break;
			case 3:
				tiaogeziInfos.showSpeed = 0.25;
				tiaogeziInfos.blockRange = 3

				break;
			case 4:
				tiaogeziInfos.showSpeed = 0.25;
				tiaogeziInfos.blockRange = 4
				break;
			case 5:
				tiaogeziInfos.showSpeed = 0.15;
				tiaogeziInfos.blockRange = 4
				break;
		}
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_tiaofangzi.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_tiaofangzi.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_tiaofangzi.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_tiaofangzi.gameTimeOver)
	},


	userCartoon(nodeId) {
		if (nodeId == "redCartoon" && tiaogeziInfos.tapColorProject[0] == 0) {
			tiaogeziInfos.tapColorProject[0] = 1
			tiaofangziFuncs.colorChange("red.targetred", 0)
			tiaogeziInfos.userCarNums[0] = 0
			tiaogeziInfos.blockShow1 = []
			return
		}
		if (nodeId == "blueCartoon" && tiaogeziInfos.tapColorProject[1] == 0) {
			tiaogeziInfos.tapColorProject[1] = 1
			tiaofangziFuncs.colorChange("blue.targetblue", 1)
			tiaogeziInfos.userCarNums[1] = 0
			tiaogeziInfos.blockShow2 = []
			return
		}
		if (nodeId == "greenCartoon" && tiaogeziInfos.tapColorProject[2] == 0) {
			tiaogeziInfos.tapColorProject[2] = 1
			tiaofangziFuncs.colorChange("green.targetgreen", 2)
			tiaogeziInfos.userCarNums[2] = 0
			tiaogeziInfos.blockShow3 = []


			return
		}
		if (nodeId == "yellowCartoon" && tiaogeziInfos.tapColorProject[3] == 0) {
			tiaogeziInfos.tapColorProject[3] = 1
			tiaofangziFuncs.colorChange("yellow.targetyellow", 3)
			tiaogeziInfos.userCarNums[3] = 0
			tiaogeziInfos.blockShow4 = []

			return
		}
		if (nodeId == "cyanCartoon" && tiaogeziInfos.tapColorProject[4] == 0) {
			tiaogeziInfos.tapColorProject[4] = 1
			tiaofangziFuncs.colorChange("cyan.targetcyan", 4)
			tiaogeziInfos.userCarNums[4] = 0
			tiaogeziInfos.blockShow5 = []

			return
		}
		if (nodeId == "brownCartoon" && tiaogeziInfos.tapColorProject[5] == 0) {
			tiaogeziInfos.tapColorProject[5] = 1
			tiaofangziFuncs.colorChange("brown.targetbrown", 5)
			tiaogeziInfos.userCarNums[5] = 0
			tiaogeziInfos.blockShow6 = []

			return
		}
	},

	colorChange(name, userPro) {
		let i = 0
		tiaofangziFuncs.colorRevert(name, 1)
		let car = setInterval(() => {

			switch (i) {
				case 0:
					this.colorChangeOp(name, 0)
					this.colorChangeOp(name, 1)
					break
				case 2:
					this.colorChangeOp(name, 2)
					break
				case 3:
					this.colorChangeOp(name, 3)
					this.colorChangeOp(name, 4)
					break
				case 5:
					this.colorChangeOp(name, 5)
					break
				case 6:
					this.colorChangeOp(name, 6)
					this.colorChangeOp(name, 7)
					break
				case 8:
					this.colorChangeOp(name, 8)
					break
				case 9:
					this.colorChangeOp(name, 9)
					this.colorChangeOp(name, 10)
					break
				case 11:
					this.colorChangeOp(name, 11)
					break
				case 12:
					clearInterval(car)
					tiaogeziInfos.tapColorProject[userPro] = 0
					break
			}
			i++

		}, tiaogeziInfos.showSpeed * 1000);
	},
	colorChangeOp(name, i) {
		let opInfo = {
			opId: "play" + name + i,
			opType: "play",
			opNode: name + i,
			timeLen: tiaogeziInfos.showSpeed,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 0,
								g: 0,
								b: 254,
								a: 1,
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
								g: 254,
								b: 254,
								a: 1
							}
						}

					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	colorRevert(name, determine) {
		for (let i = 0; i < 12; i++) {
			let opInfo = {
				opId: "play" + name + i,
				opType: "play",
				opNode: name + i,
				timeLen: 5,
				loop: "false",
				keyFrames: [
					// {
					// 	t: 0,
					// 	keyFrame: {
					// 		shape: {
					// 			rgba: {
					// 				r: 148,
					// 				g: 0,
					// 				b: 211,
					// 				a: 1,
					// 			}
					// 		}

					// 	}
					// }
					// ,
					{
						t: 0,
						keyFrame: {
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 254,
									a: 1
								}
							}

						}
					}
				]
			}

			gameFuncs.op(opInfo);
		}
		if (!determine) {
			if (nowInfos.lifeProtect == 0) {
				nowInfos.lifeProtect = 1
				setTimeout(() => {
					nowInfos.lifeProtect = 0
				}, 1000);
				if (nowInfos.lifePoint > 1) {
					nowInfos.lifePoint--
					gameRules.lifeMove();
					roomFunction.playSoundTivite(false, "wrong", "negative");
					if (nowInfos.lifePoint == 3) {
						roomFunction.playSound(false, "life")
					}
				} else if (nowInfos.lifePoint == 1) {
					nowInfos.lifePoint--
					gameRules.lifeMove();
					roomFunction.playSoundTivite(false, "wrong", "negative");
					wanFa_tiaofangzi.gameLevelEnd()
				}
			}
		}

	},
	colorShow(name, user) {
		let opInfo = {
			opId: "play" + name,
			opType: "play",
			opNode: name,
			timeLen: 1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 0,
								g: 0,
								b: 254,
								a: 1,
							}
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo);
		tiaogeziInfos.userCarNums[user]++
		if (tiaogeziInfos.userCarNums[user] == 12) {
			usersInfos.levelScore += 20
			tiaofangziFuncs.addSuccess({ r: 0, g: 254, b: 0, a: 1 }, user)
			let all = 0
			for (let i = 0; i < tiaogeziInfos.userCarNums.length; i++) {
				all += tiaogeziInfos.userCarNums[i]
				if (all == 12 * usersInfos.usersResult.length) {
					wanFa_tiaofangzi.gameLevelEnd()
				}
			}
		}
	},

	ueserTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("red.targetred") && onOff == true) {
			if (tiaogeziInfos.blockShow1.includes(nodeId)) {
				return
			}
			tiaogeziInfos.blockShow1.push(nodeId)
			tiaofangziFuncs.colorShow(nodeId, 0)
			return
		}
		if (nodeId.startsWith("blue.targetblue") && onOff == true) {
			if (tiaogeziInfos.blockShow2.includes(nodeId)) {
				return
			}
			tiaogeziInfos.blockShow2.push(nodeId)
			tiaofangziFuncs.colorShow(nodeId, 1)
			return
		}
		if (nodeId.startsWith("green.targetgreen") && onOff == true) {
			if (tiaogeziInfos.blockShow3.includes(nodeId)) {
				return
			}
			tiaogeziInfos.blockShow3.push(nodeId)
			tiaofangziFuncs.colorShow(nodeId, 2)
			return
		}
		if (nodeId.startsWith("yellow.targetyellow") && onOff == true) {
			if (tiaogeziInfos.blockShow4.includes(nodeId)) {
				return
			}
			tiaogeziInfos.blockShow4.push(nodeId)
			tiaofangziFuncs.colorShow(nodeId, 3)
			return
		}
		if (nodeId.startsWith("cyan.targetcyan") && onOff == true) {
			if (tiaogeziInfos.blockShow5.includes(nodeId)) {
				return
			}
			tiaogeziInfos.blockShow5.push(nodeId)
			tiaofangziFuncs.colorShow(nodeId, 4)
			return
		}
		if (nodeId.startsWith("brown.targetbrown") && onOff == true) {
			if (tiaogeziInfos.blockShow6.includes(nodeId)) {
				return
			}
			tiaogeziInfos.blockShow6.push(nodeId)
			tiaofangziFuncs.colorShow(nodeId, 5)
			return
		}

	},




	addSuccess(rgba, user) {
		roomFunction.playSoundTivite(false, "bling", "positive")
		let names = ["red", "blue", "green", "yellow", "cyan", "brown"]
		let namess = ["red", "green", "brown"]
		let opInfo = {
			opId: "addRedArea",
			opType: "addNode",
			opNode: names[user],
			nodes: [{
				nodeId: "success",
				surface: "b",
				pt: {
					x: namess.includes(names[user]) ? 0 : -7,
					y: 0,
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
							x: 7,
							y: levelInfos.level >= 4 ? 3 : 2,
						}
					},
					rgba: rgba
				}
			}]
		}
		gameFuncs.op(opInfo)
	},
	wrongTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("red.red") && onOff == true) {
			tiaofangziFuncs.colorRevert("red.targetred")
			tiaofangziFuncs.addBlink(x, y)
			tiaogeziInfos.userCarNums[0] = 0
			tiaogeziInfos.blockShow1 = []
			return
		}
		if (nodeId.startsWith("blue.blue") && onOff == true) {
			tiaofangziFuncs.colorRevert("blue.targetblue")
			tiaofangziFuncs.addBlink(x, y)
			tiaogeziInfos.userCarNums[1] = 0
			tiaogeziInfos.blockShow2 = []

			return
		}
		if (nodeId.startsWith("green.green") && onOff == true) {
			tiaofangziFuncs.colorRevert("green.targetgreen")
			tiaofangziFuncs.addBlink(x, y)
			tiaogeziInfos.userCarNums[2] = 0
			tiaogeziInfos.blockShow3 = []

			return
		}
		if (nodeId.startsWith("yellow.yellow") && onOff == true) {
			tiaofangziFuncs.colorRevert("yellow.targetyellow")
			tiaofangziFuncs.addBlink(x, y)
			tiaogeziInfos.userCarNums[3] = 0
			tiaogeziInfos.blockShow4 = []

			return
		}
		if (nodeId.startsWith("cyan.cyan") && onOff == true) {
			tiaofangziFuncs.colorRevert("cyan.targetcyan")
			tiaofangziFuncs.addBlink(x, y)
			tiaogeziInfos.userCarNums[4] = 0
			tiaogeziInfos.blockShow5 = []

			return
		}
		if (nodeId.startsWith("brown.brown") && onOff == true) {
			tiaofangziFuncs.colorRevert("brown.targetbrown")
			tiaofangziFuncs.addBlink(x, y)
			tiaogeziInfos.userCarNums[5] = 0
			tiaogeziInfos.blockShow6 = []
			return
		}
	},
	addArea(name, xx, rgba) {
		let names = ["red", "green", "brown"]
		for (let i = 1; i < 9; i++) {
			for (let j = 1; j < (tiaogeziInfos.blockRange + 1); j++) {
				let opInfo = {
					opId: name + "addPlay" + i + j,
					opType: "addNode",
					opNode: name,
					nodes: [{
						nodeId: name + i + j,
						surface: "b",
						pt: {
							x: names.includes(name) ? (i - 1) : -(i - 1),
							y: j - 1,
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
		}
		let opInfo = {
			opId: "add" + name + "Cartoon",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: name + "Cartoon",
				surface: "a",
				pt: {
					x: xx,
					y: 0,
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
					rgba: rgba
				}
			}]
		}
		gameFuncs.op(opInfo)
	},
	addTarget(name) {
		let yy = [0, 0, 1, 2, 2, 3, 4, 4, 5, 6, 6, 7]
		let yyy = [0, 0, -1, -2, -2, -3, -4, -4, -5, -6, -6, -7]
		let names = ["red", "green", "brown"]
		for (let i = 0; i < tiaogeziInfos.blinkArr.length; i++) {
			let opInfo = {
				opId: "addTarget" + name + i,
				opType: "addNode",
				opNode: name,
				nodes: [{
					nodeId: "target" + name + i,
					surface: "b",
					pt: {
						x: names.includes(name) ? yy[i] : yyy[i],
						y: tiaogeziInfos.blinkArr[i]
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
	},







	CountPlay() {
		tiaofangziFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
			let opInfo = {
				opId: "screenCountPlay",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_3b01",
					block1: {
						model: "dis_b_numUnit",
						label1: "SECONDS",
						value1: nowInfos.gameCountTime - 1
					},
					block2: {
						model: "dis_b_scoreGame",
						label2: "加油加油！",
						// value2: usersInfos.levelScore
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
				wanFa_tiaofangzi.gameLevelEnd()
			}
			if (nowInfos.gameCountTime == 11) {
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




}
