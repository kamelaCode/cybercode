const wanFa_pkmutouren = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_pkmutouren.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_pkmutouren.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_pkmutouren.gameDestroy);
		//重置全局变量
		pkmutourenFuncs.resetAll(usersInfos.usersResult.length)
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
		pkmutourenFuncs.rgbScorePlay()//跳转内屏显示
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		let countTime = 0
		wanFa_pkmutouren.gameStart.startLoop = setInterval(() => {
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
					roomFunction.playSound(false, "pkmutouBgm");
					if (levelInfos.wanFa.startsWith("arena")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 17:
					clearInterval(wanFa_pkmutouren.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);
		// setTimeout(() => {
		// 	roomFunction.playSound(false, "pkmutouBgm");
		// }, 2500);

		// //screenInner.innerStartCount("游戏即将开始", sec)
		// setTimeout(function () {
		// 	if (levelInfos.wanFa.startsWith("arena")) {
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
		if (levelInfos.level < 3) {
			awa = 1
			qwq = 1
		}
		if (levelInfos.level == 3) {
			awa = 0
			qwq = 0
		}
		engine.addEventListener("gameTaped", wanFa_pkmutouren.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("arena")) {
			gameRules.lifeMove();
			mutourenInfos.allTime = 90;
			//nowInfos.target = 40;
			nowInfos.nowGameid = gameid;
			mutourenInfos.gameLoopsNum = 0
			//pkmutourenFuncs.randomBluePoint(40);
			pkmutourenFuncs.allRed()
			//分配内屏显示的数量
			for (var i = 0; i < usersInfos.usersResult.length; i++) {
				pickInfos.block2Infos[i] = 0
			}
			//竞技模式中内屏倒计时
			wanFa_pkmutouren.gamePlay.innerCount = setInterval(() => {
				mutourenInfos.allTime--
				if (mutourenInfos.allTime == 11) {
					roomFunction.playSound(false, "daoshu10")
					//roomFunction.stopSound("jingjiBgm01");
				}
				if (mutourenInfos.allTime == 0) {
					wanFa_pkmutouren.gameLevelEnd()
				}
			}, 1000)
			setIntervalCount(function (index, count) {
				pickInfos.levelScoreAll = ""
			}, 5000, 26)



			if (usersInfos.usersResult.length == 2) {
				pkmutourenFuncs.randomRedBlueBlock(150, 150, "b")
				// jingJiFuncs.randomRedOrangeBlock(72, 73, "b")
			}

			if (usersInfos.usersResult.length == 3) {
				pkmutourenFuncs.randomRedBlueBlock(150, 150, "b")
				pkmutourenFuncs.randomGreenBlock(150, "b")

			}


			if (usersInfos.usersResult.length == 4) {
				pkmutourenFuncs.randomRedBlueBlock(120, 120, "b")
				pkmutourenFuncs.randomGreenBlock(120, "b")
				pkmutourenFuncs.randomYellowBlock(120, "b")

			}
			if (usersInfos.usersResult.length == 5) {
				pkmutourenFuncs.randomRedBlueBlock(100, 100, "b")
				pkmutourenFuncs.randomGreenBlock(100, "b")
				pkmutourenFuncs.randomYellowBlock(100, "b")
				pkmutourenFuncs.randomCyanBlock(100, "b")

			}
			if (usersInfos.usersResult.length == 6) {
				pkmutourenFuncs.randomRedBlueBlock(80, 80, "b")
				pkmutourenFuncs.randomGreenBlock(80, "b")
				pkmutourenFuncs.randomYellowBlock(80, "b")
				pkmutourenFuncs.randomCyanBlock(80, "b")
				pkmutourenFuncs.randomBrownBlock(80, "b")
			}
			pkmutourenFuncs.CountPlay();
		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("arena")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			pkmutourenFuncs.pickTap(face, x, y, onOff, nodeId, event)
			//pkmutourenFuncs.rightTap(face, x, y, onOff, nodeId, event);
			pkmutourenFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (mutourenInfos.gameLoopsNum == 91 && nodeId.startsWith("blackArea") && onOff == true) {
				pkmutourenFuncs.createGreen(x, y)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(pkmutourenFuncs.CountPlay.innerCount)
		//roomFunction.stopSound("mutouren")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			wanFa_pkmutouren.gameLevelEnd()
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(pkmutourenFuncs.CountPlay.innerCount)
		clearInterval(wanFa_pkmutouren.gamePlay.innerCount)
		clearInterval(pkmutourenFuncs.allRed.gameOver)
		//clearInterval(gameCirCtl)
		roomFunction.stopSound("mutouren")
		roomFunction.stopSound("daoshu10")
		roomFunction.goToGameLevel("leave_hold", "none")
		pkmutourenFuncs.rmAllListener()
		wanFaCtl_pkmutourenCtl.gameEndCtl()
		levelInfos.gameIdList = []
		mutourenInfos.gameEndCtl = 1
		pickInfos.screenCirCtl = 1



	}
}

const pkmutourenFuncs = {
	//重置所有变量
	resetAll(difficulty) {
		// nowInfos.gameCountTime = 30;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		//nowInfos.target = 40
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		mutourenInfos.redCheck = 0;
		mutourenInfos.addGreen = false;
		mutourenInfos.allTime = 0;
		mutourenInfos.gameLoopsNum = 0;
		mutourenInfos.gameEndCtl = 0;
		pickInfos.block2Infos = []
		pkNameList = []
		cleanOp = 0;
		pickInfos.redArrFaceA = [];
		pickInfos.redArrFaceB = [];
		pickInfos.yellowArrFaceA = [];
		pickInfos.yellowArrFaceB = [];
		pickInfos.screenCirCtl = 0;
		switch (difficulty) {
			case 2:
				pickInfos.targetBlocks = 150
				break;
			case 3:
				pickInfos.targetBlocks = 150
				break;
			case 4:
				pickInfos.targetBlocks = 120
				break;
			case 5:
				pickInfos.targetBlocks = 100
				break;
			case 6:
				pickInfos.targetBlocks = 80
				break;

		}

	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_pkmutouren.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_pkmutouren.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_pkmutouren.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_pkmutouren.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_pkmutouren.gameTaped)

	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("blackArea") && onOff == true && mutourenInfos.redCheck == 1 && lycnb == 0) {
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				pkmutourenFuncs.addBlink(x, y)
				if (nowInfos.lifePoint > 1) {
					//nowInfos.lifePoint--;
					if (nowInfos.lifePoint == 4) {
						gameRules.lifeMove();

					}
					roomFunction.playSoundTivite(false, "wrong", "negative");
					if (nowInfos.lifePoint == 3) {
						roomFunction.playSound(false, "life")
					}
				} else if (nowInfos.lifePoint == 1) {
					//nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSoundTivite(false, "wrong", "negative");
					wanFa_pkmutouren.gameLevelEnd()
				}
			}
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
			opId: "addAok" + x + "_" + y,
			opType: "addNode",
			nodes: [{
				nodeId: "aok" + x + "_" + y,
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
							x: x + qwq,
							y: y + awa
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
		pkmutourenFuncs.removeGreen("removeAok" + x + "_" + y, "aok" + x + "_" + y)
		// }, 3500);

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
	//首次随机生成蓝色目标点
	randomRedBlueBlock(numRed, numBlue, face) {
		if (face == "b") {
			pickInfos.redArrFaceB = pkmutourenFuncs.generateRandomArray([], numRed, 16);//b面红色位置
			pickInfos.blueArrFaceB = pkmutourenFuncs.generateRandomArray(pickInfos.redArrFaceB, numBlue, 16);//b面橙色位置
		}
		for (let i = 0; i < (face == "a" ? pickInfos.blueArrFaceA.length : pickInfos.blueArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "blueA" : "blueB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? pickInfos.blueArrFaceA : pickInfos.blueArrFaceB)[i][0],
						y: (face == "a" ? pickInfos.blueArrFaceA : pickInfos.blueArrFaceB)[i][1],
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
							a: 1,
						}
					}
				}]
			}
			gameFuncs.op(opInfo)

		}
		for (let j = 0; j < (face == "a" ? pickInfos.redArrFaceA.length : pickInfos.redArrFaceB.length); j++) {
			let opInfo1 = {
				opId: "addRed" + j,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "redA" : "redB") + j,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? pickInfos.redArrFaceA : pickInfos.redArrFaceB)[j][0] + 1,
						y: (face == "a" ? pickInfos.redArrFaceA : pickInfos.redArrFaceB)[j][1],
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
			gameFuncs.op(opInfo1)
		}
	},
	randomGreenBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...pickInfos.redArrFaceB, ...pickInfos.blueArrFaceB]
			pickInfos.greenArrFaceB = pkmutourenFuncs.generateRandomArray(allArr, num, 16);//b面黄色位置

		}
		for (let i = 0; i < (face == "a" ? pickInfos.greenArrFaceA.length : pickInfos.greenArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "greenA" : "greenB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? pickInfos.greenArrFaceA : pickInfos.greenArrFaceB)[i][0],
						y: (face == "a" ? pickInfos.greenArrFaceA : pickInfos.greenArrFaceB)[i][1],
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
							g: 254,
							b: 0,
							a: 1,
						}
					}
				}]
			}
			gameFuncs.op(opInfo)

		}
	},
	randomYellowBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...pickInfos.redArrFaceB, ...pickInfos.blueArrFaceB, ...pickInfos.greenArrFaceB]
			pickInfos.yellowArrFaceB = pkmutourenFuncs.generateRandomArray(allArr, num, 16);//b面黄色位置
		}
		for (let i = 0; i < (face == "a" ? pickInfos.yellowArrFaceA.length : pickInfos.yellowArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "yellowA" : "yellowB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? pickInfos.yellowArrFaceA : pickInfos.yellowArrFaceB)[i][0],
						y: (face == "a" ? pickInfos.yellowArrFaceA : pickInfos.yellowArrFaceB)[i][1],
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
							b: 0,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo)

		}
	},
	randomCyanBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...pickInfos.redArrFaceB, ...pickInfos.blueArrFaceB, ...pickInfos.greenArrFaceB, ...pickInfos.yellowArrFaceB]
			pickInfos.cyanArrFaceB = pkmutourenFuncs.generateRandomArray(allArr, num, 16);//b面黄色位置
		}
		for (let i = 0; i < (face == "a" ? pickInfos.cyanArrFaceA.length : pickInfos.cyanArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "cyanA" : "cyanB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? pickInfos.cyanArrFaceA : pickInfos.cyanArrFaceB)[i][0],
						y: (face == "a" ? pickInfos.cyanArrFaceA : pickInfos.cyanArrFaceB)[i][1],
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
	randomBrownBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...pickInfos.redArrFaceB, ...pickInfos.blueArrFaceB, ...pickInfos.greenArrFaceB, ...pickInfos.yellowArrFaceB, ...pickInfos.cyanArrFaceB]
			pickInfos.brownArrFaceB = pkmutourenFuncs.generateRandomArray(allArr, num, 16);//b面黄色位置
		}
		for (let i = 0; i < (face == "a" ? pickInfos.brownArrFaceA.length : pickInfos.brownArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "brownA" : "brownB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? pickInfos.brownArrFaceA : pickInfos.brownArrFaceB)[i][0],
						y: (face == "a" ? pickInfos.brownArrFaceA : pickInfos.brownArrFaceB)[i][1],
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
							r: 139,
							g: 69,
							b: 19,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo)

		}
	},

	// 生成一个长度为length的与已知的二维数组不重复的二维数组
	generateRandomArray(knownArr, length, rangeX) {
		let yRange = 0
		// if (levelInfos.level >= 6) {
		// 	yRange = 0
		// }
		const result = [];
		const set = new Set();
		while (result.length < length) {
			let x = Math.floor(Math.random() * rangeX); // 生成随机的x坐标
			let y = Math.floor(Math.random() * 32) + yRange; // 生成随机的y坐标
			const isD = knownArr.some((item) => item[0] === x && item[1] === y); // 判断是否与已知数组重复
			const str = [x, y].join(); // 将生成的二维坐标转为字符串
			if (!isD && !set.has(str)) {
				set.add(str); // 将该字符串添加到set中
				result.push([x, y]); // 添加到数组中
			}
		}
		return result;
	},
	pickTap(face, x, y, onOff, nodeId, event) {
		usersInfos.ValidTarget++
		if (nodeId.startsWith("red") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")
			pickInfos.block2Infos[0] += 1
			fastop.removeNode("rmRed", nodeId)
		}
		if (nodeId.startsWith("blue") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")

			pickInfos.block2Infos[1] += 1
			fastop.removeNode("rmGreen", nodeId)
		}
		if (nodeId.startsWith("green") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")

			pickInfos.block2Infos[2] += 1
			fastop.removeNode("rmBlue", nodeId)
		}
		if (nodeId.startsWith("yellow") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")

			pickInfos.block2Infos[3] += 1
			fastop.removeNode("rmYellow", nodeId)
		}
		if (nodeId.startsWith("cyan") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")

			pickInfos.block2Infos[4] += 1
			fastop.removeNode("rmPink", nodeId)
		}
		if (nodeId.startsWith("brown") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")

			pickInfos.block2Infos[5] += 1
			fastop.removeNode("rmBrown", nodeId)
		}
		pickInfos.block2Infos.map((item) => {
			if (item == pickInfos.targetBlocks) {
				// if (item == 10) {
				wanFa_pkmutouren.gameLevelEnd()
				return
			}
		})



	},
	allRed() {
		let gameCirCtl = setIntervalCount(() => {
			if (mutourenInfos.gameEndCtl == 1) {
				clearInterval(gameCirCtl)
				return
			}
			switch (mutourenInfos.gameLoopsNum) {
				case 20:
					roomFunction.playSound(false, "mutouren", "background")
					lycnb = 1
					break;
				case 70:
					let opInfo = {
						opId: "ack2",
						opType: "play",
						opNode: "ack002",
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
						opId: "ack2",
						opType: "play",
						opNode: "ack003",
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
					pkmutourenFuncs.addStop()
					fastop.addWin("blackArea", "blackArea", 0, 0, 15, 31, 0, 0, 0)
					setTimeout(() => {
						lycnb = 0
					}, 100);
					let opInfo4 = {
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack001",
						timeLen: 3,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: false,
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack857",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack858",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack859",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack860",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack861",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack862",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack863",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack864",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack865",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack866",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack867",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack868",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack869",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack870",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack871",
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
						opId: "twinkleAck",
						opType: "play",
						opNode: "ack888",
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

					//检测砖块被站人则生成绿色安全区


					break;
				case 99: {
					clearInterval(gameCirCtl)
					mutourenInfos.redCheck = 1;
					mutourenInfos.gameLoopsNum = 0;
					//nowInfos.target = 40;
					pkmutourenFuncs.allRed()
					setTimeout(() => {
						fastop.removeNode("blackArea", "blackArea")
					}, 2000);
					pkmutourenFuncs.allRed.gameOver = setTimeout(() => {
						if (usersInfos.usersResult.length == 2) {
							pkmutourenFuncs.randomRedBlueBlock(150, 150, "b")
							// jingJiFuncs.randomRedOrangeBlock(72, 73, "b")
						}
						if (usersInfos.usersResult.length == 3) {
							pkmutourenFuncs.randomRedBlueBlock(150, 150, "b")
							pkmutourenFuncs.randomGreenBlock(150, "b")
						}
						if (usersInfos.usersResult.length == 4) {
							pkmutourenFuncs.randomRedBlueBlock(120, 120, "b")
							pkmutourenFuncs.randomGreenBlock(120, "b")
							pkmutourenFuncs.randomYellowBlock(120, "b")
						}
						if (usersInfos.usersResult.length == 5) {
							pkmutourenFuncs.randomRedBlueBlock(100, 100, "b")
							pkmutourenFuncs.randomGreenBlock(100, "b")
							pkmutourenFuncs.randomYellowBlock(100, "b")
							pkmutourenFuncs.randomCyanBlock(100, "b")
						}
						if (usersInfos.usersResult.length == 6) {
							pkmutourenFuncs.randomRedBlueBlock(80, 80, "b")
							pkmutourenFuncs.randomGreenBlock(80, "b")
							pkmutourenFuncs.randomYellowBlock(80, "b")
							pkmutourenFuncs.randomCyanBlock(80, "b")
							pkmutourenFuncs.randomBrownBlock(80, "b")
						}
					}, 2000);

					//pkmutourenFuncs.randomBluePoint(40)
					return
				}
			}
			mutourenInfos.gameLoopsNum++
			//engine.log(mutourenInfos.gameLoopsNum+"====")
		}, 100, 100)
	},
	addStop() {
		let opInfo = {
			opId: "addAck",
			opType: "addNode",
			opNode: "ack857",
			nodes: [{
				nodeId: "ack857",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack858",
			nodes: [{
				nodeId: "ack858",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack859",
			nodes: [{
				nodeId: "ack859",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack888",
			nodes: [{
				nodeId: "ack888",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack860",
			nodes: [{
				nodeId: "ack860",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack861",
			nodes: [{
				nodeId: "ack861",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack862",
			nodes: [{
				nodeId: "ack862",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack863",
			nodes: [{
				nodeId: "ack863",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack864",
			nodes: [{
				nodeId: "ack864",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack865",
			nodes: [{
				nodeId: "ack865",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack866",
			nodes: [{
				nodeId: "ack866",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack867",
			nodes: [{
				nodeId: "ack867",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack868",
			nodes: [{
				nodeId: "ack868",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack869",
			nodes: [{
				nodeId: "ack869",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack870",
			nodes: [{
				nodeId: "ack870",
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
			opId: "addAck",
			opType: "addNode",
			opNode: "ack871",
			nodes: [{
				nodeId: "ack871",
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
					userScore: pickInfos.block2Infos[i]
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
						value1: mutourenInfos.allTime
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "目标块数",
						value1: pickInfos.targetBlocks
					}
				}
			}
			gameFuncs.op(opInfo)
		}, 100)
	},
	rgbScorePlay() {
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
					value1: mutourenInfos.allTime
				},
				block3: {
					model: "dis_b_numUnit",
					label1: "目 标 块 数",
					value1: pickInfos.targetBlocks
				},
			}
		}
		gameFuncs.op(opInfo)
	},


}
