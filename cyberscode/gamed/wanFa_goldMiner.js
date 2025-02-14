const wanFa_goldMiner = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_goldMiner.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_goldMiner.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_goldMiner.gameDestroy);
		//重置全局变量
		goldFuncs.resetAll(usersInfos.usersResult.length)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}


		//内屏显示每个用户名称对应的颜色
		goldInfos.neiUser = []
		for (var i = 0; i < usersInfos.usersResult.length; i++) {
			goldInfos.neiUser[i] = usersInfos.allUsers[i].Nick
		}
		goldInfos.levelScoreAll = goldInfos.neiUser.toString()
		let wodiu = 0
		let qbq = 0
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			for (let j = 0; j < 10; j++) {
				if (wodiu == i) {
					if (goldInfos.neiUser[i].charCodeAt(j) > 255) {
						qbq++
						duoshao += 1.666666666
					} else {
						qbq++
						duoshao += 1
					}
					if (duoshao >= 7) {
						engine.log("第" + i + "个人显示前" + qbq + "个字")
						pkNameList[i] = goldInfos.neiUser[i].substring(0, qbq) + "..."
						duoshao = 0
						wodiu++
						qbq = 0
					}
				}
			}
			if (goldInfos.neiUser[i].length < 6) {
				pkNameList[i] = goldInfos.neiUser[i]
			}
		}
		goldFuncs.rgbScorePlay()//跳转内屏显示
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		let countTime = 0
		wanFa_goldMiner.gameStart.startLoop = setInterval(() => {
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
					//roomFunction.playSound(false, "pkmutouBgm");
					if (levelInfos.wanFa.startsWith("goldMiner")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						goldFuncs.CountPlay();
						roomFunction.playSound(false, "startGoing")
					}
					break;
				case 17:
					clearInterval(wanFa_goldMiner.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},




	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_goldMiner.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("goldMiner")) {
			gameRules.lifeMove();
			nowInfos.nowGameid = gameid;
			goldFuncs.startLocal()
			//分配内屏显示的数量
			for (var i = 0; i < usersInfos.usersResult.length; i++) {
				goldInfos.block2Infos[i] = 0
			}
			//竞技模式中内屏倒计时
			wanFa_goldMiner.gamePlay.innerCount = setInterval(() => {
				nowInfos.gameCountTime--
				if (nowInfos.gameCountTime == 11) {
					roomFunction.playSound(false, "daoshu10")
					//roomFunction.stopSound("jingjiBgm01");
				}
				if (nowInfos.gameCountTime == 0) {
					wanFa_goldMiner.gameLevelEnd()
				}
			}, 1000)
			setIntervalCount(function (index, count) {
				goldInfos.levelScoreAll = ""
			}, 5000, 26)

			setTimeout(() => {
				roomFunction.playSound(false, "beginGoing")
				setTimeout(() => {
					roomFunction.playSound(true, "goldBgm2", "background")
				}, 6000);
				goldFuncs.randomRedBlock(1, "b")
				goldFuncs.randomBlueBlock(1, "b")
				if (usersInfos.usersResult.length == 2) {
					return
				}
				goldFuncs.randomGreenBlock(1, "b")
				if (usersInfos.usersResult.length == 3) {
					return
				}

				goldFuncs.randomYellowBlock(1, "b")
				if (usersInfos.usersResult.length == 4) {
					return
				}
				goldFuncs.randomCyanBlock(1, "b")
				if (usersInfos.usersResult.length == 5) {
					return
				}
				goldFuncs.randomBrownBlock(1, "b")
				if (usersInfos.usersResult.length == 6) {
					return
				}
			}, 4000);
		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("goldMiner")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			goldFuncs.goldTap(face, x, y, onOff, nodeId, event)
			goldFuncs.localTap(face, x, y, onOff, nodeId, event)
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		// if (gameid != "__system_wait") {
		// 	wanFa_goldMiner.gameLevelEnd()
		// }
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(wanFa_goldMiner.gamePlay.innerCount)
		roomFunction.stopSound("goldBgm2")
		roomFunction.stopSound("daoshu10")
		roomFunction.goToGameLevel("leave_hold", "none")
		goldFuncs.rmAllListener()
		wanFaCtl_goldMinerCtl.gameEndCtl()
		levelInfos.gameIdList = []
		goldInfos.screenCirCtl = 1



	}
}

const goldFuncs = {
	//重置所有变量
	resetAll(difficulty) {
		// nowInfos.gameCountTime = 30;
		nowInfos.gameCountTime = 90
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		//nowInfos.target = 40
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		goldInfos.block2Infos = []
		pkNameList = []
		cleanOp = 0;
		goldInfos.redArrFaceA = [];
		goldInfos.redArrFaceB = [];
		goldInfos.yellowArrFaceA = [];
		goldInfos.yellowArrFaceB = [];
		goldInfos.cyanArrFaceA = []
		goldInfos.cyanArrFaceB = []
		goldInfos.greenArrFaceA = []
		goldInfos.greenArrFaceB = []
		goldInfos.blueArrFaceA = []
		goldInfos.blueArrFaceB = []
		goldInfos.brownArrFaceA = []
		goldInfos.brownArrFaceB = []
		goldInfos.screenCirCtl = 0;
		switch (levelInfos.level) {
			case 1:
				goldInfos.targetBlocks = 5
				break;
			case 2:
				goldInfos.targetBlocks = 7
				break;
			case 3:
				goldInfos.targetBlocks = 12
				break;

		}
		goldInfos.localNumOne = 0
		goldInfos.localNumTwo = 0
		goldInfos.localNumThree = 0
		goldInfos.localNumFour = 0
		goldInfos.localNumFive = 0
		goldInfos.localNumSix = 0
		goldInfos.suodingOne = 1
		goldInfos.suodingTwo = 1
		goldInfos.suodingThree = 1
		goldInfos.suodingFour = 1
		goldInfos.suodingFive = 1
		goldInfos.suodingSix = 1
		goldInfos.lineListRed = []
		goldInfos.lineListBlue = []
		goldInfos.lineListGreen = []
		goldInfos.lineListYellow = []
		goldInfos.lineListCyan = []
		goldInfos.lineListBrown = []

	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_goldMiner.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_goldMiner.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_goldMiner.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_goldMiner.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_goldMiner.gameTaped)

	},
	//随机生成颜色目标点
	randomRedBlock(numRed, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...goldInfos.cyanArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.brownArrFaceB]
			goldInfos.localNumOne = 0
			if (usersInfos.usersResult.length <= 5) {
				goldInfos.redArrFaceB = goldFuncs.generateRandomArray(allArr, numRed, 20, 31);//b面红色位置

			} else if (usersInfos.usersResult.length == 6) {
				goldInfos.redArrFaceB = goldFuncs.generateRandomArray(allArr, numRed, 15, 20);//b面红色位置

			}
		}
		for (let j = 0; j < (face == "a" ? goldInfos.redArrFaceA.length : goldInfos.redArrFaceB.length); j++) {
			let opInfo1 = {
				opId: "addRed" + j,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "redA" : "redB") + j,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? goldInfos.redArrFaceA : goldInfos.redArrFaceB)[j][0],
						y: (face == "a" ? goldInfos.redArrFaceA : goldInfos.redArrFaceB)[j][1],
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
			goldFuncs.createLineRed(7, 3, goldInfos.redArrFaceB[j][0], goldInfos.redArrFaceB[j][1], 254, 0, 0, "red")

		}
	},
	randomBlueBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...goldInfos.cyanArrFaceB, ...goldInfos.redArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.brownArrFaceB]
			goldInfos.localNumTwo = 0
			if (usersInfos.usersResult.length <= 5) {
				goldInfos.blueArrFaceB = goldFuncs.generateRandomArray(allArr, num, 20, 31);//b面黄色位置

			} else if (usersInfos.usersResult.length == 6) {
				goldInfos.blueArrFaceB = goldFuncs.generateRandomArray(allArr, num, 15, 20);//b面黄色位置

			}

		}
		for (let i = 0; i < (face == "a" ? goldInfos.blueArrFaceA.length : goldInfos.blueArrFaceB.length); i++) {
			let opInfo = {
				opId: "addblue" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "blueA" : "blueB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? goldInfos.blueArrFaceA : goldInfos.blueArrFaceB)[i][0],
						y: (face == "a" ? goldInfos.blueArrFaceA : goldInfos.blueArrFaceB)[i][1],
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
			goldFuncs.createLineBlue(10, 3, goldInfos.blueArrFaceB[i][0], goldInfos.blueArrFaceB[i][1], 0, 0, 254, "blue")

		}
	},
	randomGreenBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...goldInfos.cyanArrFaceB, ...goldInfos.redArrFaceB, ...goldInfos.blueArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.brownArrFaceB]
			goldInfos.localNumThree = 0
			if (usersInfos.usersResult.length <= 5) {
				goldInfos.greenArrFaceB = goldFuncs.generateRandomArray(allArr, num, 20, 31);//b面黄色位置

			} else if (usersInfos.usersResult.length == 6) {
				goldInfos.greenArrFaceB = goldFuncs.generateRandomArray(allArr, num, 15, 20);//b面黄色位置

			}

		}
		for (let i = 0; i < (face == "a" ? goldInfos.greenArrFaceA.length : goldInfos.greenArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "greenA" : "greenB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? goldInfos.greenArrFaceA : goldInfos.greenArrFaceB)[i][0],
						y: (face == "a" ? goldInfos.greenArrFaceA : goldInfos.greenArrFaceB)[i][1],
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
			goldFuncs.createLineGreen(4, 3, goldInfos.greenArrFaceB[i][0], goldInfos.greenArrFaceB[i][1], 0, 254, 0, "green")


		}
	},
	randomYellowBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...goldInfos.cyanArrFaceB, ...goldInfos.redArrFaceB, ...goldInfos.blueArrFaceB, ...goldInfos.greenArrFaceB, ...goldInfos.brownArrFaceB]
			goldInfos.localNumFour = 0
			//goldInfos.yellowArrFaceB = goldFuncs.generateRandomArray(allArr, num, 13);//b面黄色位置
			if (usersInfos.usersResult.length == 4 || usersInfos.usersResult.length == 5) {
				goldInfos.yellowArrFaceB = goldFuncs.generateRandomArray(allArr, num, 20, 31);//b面黄色位置
			} else if (usersInfos.usersResult.length == 6) {
				goldInfos.yellowArrFaceB = goldFuncs.generateRandomArray(allArr, num, 15, 20);//b面黄色位置

			}
		}
		for (let i = 0; i < (face == "a" ? goldInfos.yellowArrFaceA.length : goldInfos.yellowArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "yellowA" : "yellowB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? goldInfos.yellowArrFaceA : goldInfos.yellowArrFaceB)[i][0],
						y: (face == "a" ? goldInfos.yellowArrFaceA : goldInfos.yellowArrFaceB)[i][1],
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
			if (usersInfos.usersResult.length == 4 || usersInfos.usersResult.length == 5) {
				goldFuncs.createLineYellow(1, 3, goldInfos.yellowArrFaceB[i][0], goldInfos.yellowArrFaceB[i][1], 254, 254, 0, "yellow")

			} else if (usersInfos.usersResult.length == 6) {
				goldFuncs.createLineYellow(goldInfos.yellowArrFaceB[i][0], goldInfos.yellowArrFaceB[i][1], 5, 30, 254, 254, 0, "yellow")
			}


		}
	},
	randomCyanBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...goldInfos.redArrFaceB, ...goldInfos.blueArrFaceB, ...goldInfos.greenArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.brownArrFaceB]
			goldInfos.localNumFive = 0
			if (usersInfos.usersResult.length == 5) {
				goldInfos.cyanArrFaceB = goldFuncs.generateRandomArray(allArr, num, 20, 31);//b面黄色位置

			} else if (usersInfos.usersResult.length == 6) {
				goldInfos.cyanArrFaceB = goldFuncs.generateRandomArray(allArr, num, 15, 20);//b面黄色位置

			}
		}
		for (let i = 0; i < (face == "a" ? goldInfos.cyanArrFaceA.length : goldInfos.cyanArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "cyanA" : "cyanB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? goldInfos.cyanArrFaceA : goldInfos.cyanArrFaceB)[i][0],
						y: (face == "a" ? goldInfos.cyanArrFaceA : goldInfos.cyanArrFaceB)[i][1],
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
			if (usersInfos.usersResult.length == 5) {
				goldFuncs.createLineCyan(13, 3, goldInfos.cyanArrFaceB[i][0], goldInfos.cyanArrFaceB[i][1], 0, 254, 254, "cyan")

			} else if (usersInfos.usersResult.length == 6) {
				goldFuncs.createLineCyan(goldInfos.cyanArrFaceB[i][0], goldInfos.cyanArrFaceB[i][1], 8, 30, 0, 254, 254, "cyan")

			}


		}
	},
	randomBrownBlock(num, face) {
		let allArr = []
		if (face == "b") {
			allArr = [...goldInfos.redArrFaceB, ...goldInfos.blueArrFaceB, ...goldInfos.greenArrFaceB, ...goldInfos.yellowArrFaceB, ...goldInfos.cyanArrFaceB]
			goldInfos.localNumSix = 0
			goldInfos.brownArrFaceB = goldFuncs.generateRandomArray(allArr, num, 15, 20);//b面黄色位置
		}
		for (let i = 0; i < (face == "a" ? goldInfos.brownArrFaceA.length : goldInfos.brownArrFaceB.length); i++) {
			let opInfo = {
				opId: "addjingJiInfos" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: (face == "a" ? "brownA" : "brownB") + i,
					surface: face == "a" ? "a" : "b",
					pt: {
						x: (face == "a" ? goldInfos.brownArrFaceA : goldInfos.brownArrFaceB)[i][0],
						y: (face == "a" ? goldInfos.brownArrFaceA : goldInfos.brownArrFaceB)[i][1],
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
			goldFuncs.createLineBrown(goldInfos.brownArrFaceB[i][0], goldInfos.brownArrFaceB[i][1], 11, 30, 139, 69, 19, "brown")


		}
	},

	// 生成一个长度为length的与已知的二维数组不重复的二维数组
	generateRandomArray(knownArr, length, minY, maxY) {
		const result = [];
		const set = new Set();
		while (result.length < length) {
			let x = Math.floor(Math.random() * 13) + 2; // 生成随机的x坐标
			let y = Math.floor(Math.random() * (maxY - minY - 1)) + minY; // 生成随机的y坐标
			const isD = knownArr.some((item) => item[0] === x && item[1] === y); // 判断是否与已知数组重复
			const str = [x, y].join(); // 将生成的二维坐标转为字符串
			if (!isD && !set.has(str)) {
				set.add(str); // 将该字符串添加到set中
				result.push([x, y]); // 添加到数组中
			}
		}
		return result;
	},
	// generateRandomArraySix(knownArr, length, rangeX) {
	// 	let yRange = 4
	// 	const result = [];
	// 	const set = new Set();
	// 	while (result.length < length) {
	// 		let x = Math.floor(Math.random() * rangeX) + 2; // 生成随机的x坐标
	// 		let y = Math.floor(Math.random() * 20) + yRange; // 生成随机的y坐标
	// 		engine.log(x + "-----" + y)
	// 		const isD = knownArr.some((item) => item[0] === x && item[1] === y); // 判断是否与已知数组重复
	// 		const str = [x, y].join(); // 将生成的二维坐标转为字符串
	// 		if (!isD && !set.has(str)) {
	// 			set.add(str); // 将该字符串添加到set中
	// 			result.push([x, y]); // 添加到数组中
	// 		}
	// 	}
	// 	return result;
	// },

	createLineRed(x1, y1, x2, y2, r, g, b, nodeName) {//1为玩家位置 2为目标位置
		setTimeout(() => {
			goldInfos.lineListRed = []
			let heng = Math.abs(x2 - x1)
			let zong = Math.abs(y2 - y1)
			let downnum = 0
			let movenum = 0
			let awa = parseInt(zong / heng)
			for (let i = 0; i < zong; i++) {
				if (downnum % awa == 0) { //往下多少格左右诺一格
					if (x1 + movenum != x2) {
						if (x2 - x1 > 0) {
							movenum++
						} else {
							movenum--
						}
					}
					goldInfos.lineListRed.push([x1 + movenum, y1 + downnum])
				}
				downnum++
				goldInfos.lineListRed.push([x1 + movenum, y1 + downnum])
			}
			for (let j = 0; j < goldInfos.lineListRed.length; j++) {
				let opInfo = {
					opId: "addLine" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: nodeName + j,
							surface: "b",
							pt: {
								x: goldInfos.lineListRed[j][0],
								y: goldInfos.lineListRed[j][1]
							},
							rotation: 0,
							visible: false,
							canTap: false,
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
									r: r,
									g: g,
									b: b,
									a: 1
								}
							},

						}
					]
				}
				gameFuncs.op(opInfo);
			}



		}, 500);
	},
	createLineBlue(x1, y1, x2, y2, r, g, b, nodeName) {//1为玩家位置 2为目标位置
		setTimeout(() => {
			goldInfos.lineListBlue = []
			let heng = Math.abs(x2 - x1)
			let zong = Math.abs(y2 - y1)
			let downnum = 0
			let movenum = 0
			let awa = parseInt(zong / heng)
			for (let i = 0; i < zong; i++) {
				if (downnum % awa == 0) { //往下多少格左右诺一格
					if (x1 + movenum != x2) {
						if (x2 - x1 > 0) {
							movenum++
						} else {
							movenum--
						}
					}
					goldInfos.lineListBlue.push([x1 + movenum, y1 + downnum])
				}
				downnum++
				goldInfos.lineListBlue.push([x1 + movenum, y1 + downnum])
			}
			for (let j = 0; j < goldInfos.lineListBlue.length; j++) {
				let opInfo = {
					opId: "addLine" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: nodeName + j,
							surface: "b",
							pt: {
								x: goldInfos.lineListBlue[j][0],
								y: goldInfos.lineListBlue[j][1]
							},
							rotation: 0,
							visible: false,
							canTap: false,
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
									r: r,
									g: g,
									b: b,
									a: 1
								}
							},

						}
					]
				}
				gameFuncs.op(opInfo);
			}
		}, 500);
	},
	createLineGreen(x1, y1, x2, y2, r, g, b, nodeName) {//1为玩家位置 2为目标位置
		setTimeout(() => {
			goldInfos.lineListGreen = []
			let heng = Math.abs(x2 - x1)
			let zong = Math.abs(y2 - y1)
			let downnum = 0
			let movenum = 0
			let awa = parseInt(zong / heng)
			for (let i = 0; i < zong; i++) {
				if (downnum % awa == 0) { //往下多少格左右诺一格
					if (x1 + movenum != x2) {
						if (x2 - x1 > 0) {
							movenum++
						} else {
							movenum--
						}
					}
					goldInfos.lineListGreen.push([x1 + movenum, y1 + downnum])
				}
				downnum++
				goldInfos.lineListGreen.push([x1 + movenum, y1 + downnum])
			}
			for (let j = 0; j < goldInfos.lineListGreen.length; j++) {
				let opInfo = {
					opId: "addLine" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: nodeName + j,
							surface: "b",
							pt: {
								x: goldInfos.lineListGreen[j][0],
								y: goldInfos.lineListGreen[j][1]
							},
							rotation: 0,
							visible: false,
							canTap: false,
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
									r: r,
									g: g,
									b: b,
									a: 1
								}
							},

						}
					]
				}
				gameFuncs.op(opInfo);
			}
		}, 500);
	},
	createLineYellow(x1, y1, x2, y2, r, g, b, nodeName) {//1为玩家位置 2为目标位置
		setTimeout(() => {
			goldInfos.lineListYellow = []
			let heng = Math.abs(x2 - x1)
			let zong = Math.abs(y2 - y1)
			let downnum = 0
			let movenum = 0
			//如果纵小于横则导致awa的值为0则过不去横向
			let awa = parseInt(zong / heng) //0
			for (let i = 0; i < zong; i++) {
				if (downnum % awa == 0) { //往下多少格左右诺一格
					if (x1 + movenum != x2) {
						if (x2 - x1 > 0) {
							movenum++
						} else {
							movenum--
						}
					}
					goldInfos.lineListYellow.push([x1 + movenum, y1 + downnum])
				}
				downnum++
				goldInfos.lineListYellow.push([x1 + movenum, y1 + downnum])
			}
			for (let j = 0; j < goldInfos.lineListYellow.length; j++) {
				let opInfo = {
					opId: "addLine" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: nodeName + j,
							surface: "b",
							pt: {
								x: goldInfos.lineListYellow[j][0],
								y: goldInfos.lineListYellow[j][1]
							},
							rotation: 0,
							visible: false,
							canTap: false,
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
									r: r,
									g: g,
									b: b,
									a: 1
								}
							},

						}
					]
				}
				gameFuncs.op(opInfo);
			}
		}, 500);
	},
	createLineCyan(x1, y1, x2, y2, r, g, b, nodeName) {//1为玩家位置 2为目标位置
		setTimeout(() => {
			goldInfos.lineListCyan = []
			let heng = Math.abs(x2 - x1)
			let zong = Math.abs(y2 - y1)
			let downnum = 0
			let movenum = 0
			let awa = parseInt(zong / heng)
			for (let i = 0; i < zong; i++) {
				if (downnum % awa == 0) { //往下多少格左右诺一格
					if (x1 + movenum != x2) {
						if (x2 - x1 > 0) {
							movenum++
						} else {
							movenum--
						}
					}
					goldInfos.lineListCyan.push([x1 + movenum, y1 + downnum])
				}
				downnum++
				goldInfos.lineListCyan.push([x1 + movenum, y1 + downnum])
			}
			for (let j = 0; j < goldInfos.lineListCyan.length; j++) {
				let opInfo = {
					opId: "addLine" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: nodeName + j,
							surface: "b",
							pt: {
								x: goldInfos.lineListCyan[j][0],
								y: goldInfos.lineListCyan[j][1]
							},
							rotation: 0,
							visible: false,
							canTap: false,
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
									r: r,
									g: g,
									b: b,
									a: 1
								}
							},

						}
					]
				}
				gameFuncs.op(opInfo);
			}
		}, 500);
	},
	createLineBrown(x1, y1, x2, y2, r, g, b, nodeName) {//1为玩家位置 2为目标位置
		setTimeout(() => {
			goldInfos.lineListBrown = []
			let heng = Math.abs(x2 - x1)
			let zong = Math.abs(y2 - y1)
			let downnum = 0
			let movenum = 0
			let awa = parseInt(zong / heng)
			for (let i = 0; i < zong; i++) {
				if (downnum % awa == 0) { //往下多少格左右诺一格
					if (x1 + movenum != x2) {
						if (x2 - x1 > 0) {
							movenum++
						} else {
							movenum--
						}
					}
					goldInfos.lineListBrown.push([x1 + movenum, y1 + downnum])
				}
				downnum++
				goldInfos.lineListBrown.push([x1 + movenum, y1 + downnum])
			}
			for (let j = 0; j < goldInfos.lineListBrown.length; j++) {
				let opInfo = {
					opId: "addLine" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: nodeName + j,
							surface: "b",
							pt: {
								x: goldInfos.lineListBrown[j][0],
								y: goldInfos.lineListBrown[j][1]
							},
							rotation: 0,
							visible: false,
							canTap: false,
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
									r: r,
									g: g,
									b: b,
									a: 1
								}
							},

						}
					]
				}
				gameFuncs.op(opInfo);
			}
		}, 500);
	},
	//每个颜色玩家起始位置
	startLocal() {
		switch (usersInfos.usersResult.length) {
			case 2:
				fastop.addStartUserColor("addUserRed", "addUserRed", 7, 2, 8, 3, 254, 0, 0)
				fastop.addStartUserColor("addUserBlue", "addUserBlue", 10, 2, 11, 3, 0, 0, 254)
				break;
			case 3:
				fastop.addStartUserColor("addUserRed", "addUserRed", 7, 2, 8, 3, 254, 0, 0)
				fastop.addStartUserColor("addUserBlue", "addUserBlue", 10, 2, 11, 3, 0, 0, 254)
				fastop.addStartUserColor("addUserGreen", "addUserGreen", 4, 2, 5, 3, 0, 254, 0)
				break;
			case 4:
				fastop.addStartUserColor("addUserRed", "addUserRed", 7, 2, 8, 3, 254, 0, 0)
				fastop.addStartUserColor("addUserBlue", "addUserBlue", 10, 2, 11, 3, 0, 0, 254)
				fastop.addStartUserColor("addUserGreen", "addUserGreen", 4, 2, 5, 3, 0, 254, 0)
				fastop.addStartUserColor("addUserYellow", "addUserYellow", 1, 2, 2, 3, 254, 254, 0)
				break;
			case 5:
				fastop.addStartUserColor("addUserRed", "addUserRed", 7, 2, 8, 3, 254, 0, 0)
				fastop.addStartUserColor("addUserBlue", "addUserBlue", 10, 2, 11, 3, 0, 0, 254)
				fastop.addStartUserColor("addUserGreen", "addUserGreen", 4, 2, 5, 3, 0, 254, 0)
				fastop.addStartUserColor("addUserYellow", "addUserYellow", 1, 2, 2, 3, 254, 254, 0)
				fastop.addStartUserColor("addUserCyan", "addUserCyan", 13, 2, 14, 3, 0, 254, 254)
				break;
			case 6:
				fastop.addStartUserColor("addUserRed", "addUserRed", 7, 2, 8, 3, 254, 0, 0)
				fastop.addStartUserColor("addUserBlue", "addUserBlue", 10, 2, 11, 3, 0, 0, 254)
				fastop.addStartUserColor("addUserGreen", "addUserGreen", 4, 2, 5, 3, 0, 254, 0)
				fastop.addStartUserColor("addUserYellow", "addUserYellow", 4, 30, 5, 31, 254, 254, 0)
				fastop.addStartUserColor("addUserCyan", "addUserCyan", 7, 30, 8, 31, 0, 254, 254)
				fastop.addStartUserColor("addUserBrown", "addUserBrown", 10, 30, 11, 31, 139, 69, 19)
				break;
		}

	},
	//判定玩家是否回到自己对应的位置。删除上一个目标点并生成一个新的
	localTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "addUserRed" && goldInfos.localNumOne == 1) {
			// fastop.removeNode("rmRed", nodeId.startsWith("red"))
			roomFunction.playSoundTivite(false, "goldRight", "positive")
			goldInfos.block2Infos[0] += 1
			goldFuncs.randomRedBlock(1, "b")
			goldInfos.suodingOne = 1
			for (let i = 0; i < goldInfos.lineListRed.length; i++) {
				fastop.setLineVisible("linePlayred" + i, "red" + i, false)
			}
		} else if (nodeId == "addUserBlue" && goldInfos.localNumTwo == 1) {
			// fastop.removeNode("rmBlue", nodeId.startsWith("blue"))
			roomFunction.playSoundTivite(false, "goldRight", "positive")
			goldInfos.block2Infos[1] += 1
			goldFuncs.randomBlueBlock(1, "b")
			goldInfos.suodingTwo = 1
			for (let j = 0; j < goldInfos.lineListBlue.length; j++) {
				fastop.setLineVisible("linePlayblue" + j, "blue" + j, false)
			}
		} else if (nodeId == "addUserGreen" && goldInfos.localNumThree == 1) {
			// fastop.removeNode("rmGreen", nodeId.startsWith("green"))
			roomFunction.playSoundTivite(false, "goldRight", "positive")
			goldInfos.block2Infos[2] += 1
			goldFuncs.randomGreenBlock(1, "b")
			goldInfos.suodingThree = 1
			for (let k = 0; k < goldInfos.lineListGreen.length; k++) {
				fastop.setLineVisible("linePlaygreen" + k, "green" + k, false)
			}
		} else if (nodeId == "addUserYellow" && goldInfos.localNumFour == 1) {
			// fastop.removeNode("rmYellow", nodeId.startsWith("yellow"))
			roomFunction.playSoundTivite(false, "goldRight", "positive")
			goldInfos.block2Infos[3] += 1
			goldFuncs.randomYellowBlock(1, "b")
			goldInfos.suodingFour = 1
			for (let m = 0; m < goldInfos.lineListYellow.length; m++) {
				fastop.setLineVisible("linePlayyellow" + m, "yellow" + m, false)
			}
		} else if (nodeId == "addUserCyan" && goldInfos.localNumFive == 1) {
			// fastop.removeNode("rmCyan", nodeId.startsWith("cyan"))
			roomFunction.playSoundTivite(false, "goldRight", "positive")
			goldInfos.block2Infos[4] += 1
			goldFuncs.randomCyanBlock(1, "b")
			goldInfos.suodingFive = 1
			for (let q = 0; q < goldInfos.lineListCyan.length; q++) {
				fastop.setLineVisible("linePlaycyan" + q, "cyan" + q, false)
			}
		} else if (nodeId == "addUserBrown" && goldInfos.localNumSix == 1) {
			// fastop.removeNode("rmBrown", nodeId.startsWith("brown"))
			roomFunction.playSoundTivite(false, "goldRight", "positive")
			goldInfos.block2Infos[5] += 1
			goldFuncs.randomBrownBlock(1, "b")
			goldInfos.suodingSix = 1
			for (let e = 0; e < goldInfos.lineListBrown.length; e++) {
				fastop.setLineVisible("linePlaybrown" + e, "brown" + e, false)
			}
		}

	},

	//判断玩家是否踩踏到了自己对应的目标点位
	goldTap(face, x, y, onOff, nodeId, event) {
		usersInfos.ValidTarget++
		if (nodeId.startsWith("red") && onOff == true && goldInfos.suodingOne == 1) {
			goldInfos.localNumOne = 1
			goldInfos.suodingOne = 0
			fastop.nodeMoveColor(nodeId, nodeId, 254, 0, 0)//将目标点颜色变淡不消除
			roomFunction.playSoundTivite(false, "goldRightTwo", "positive")
			for (let i = 0; i < goldInfos.lineListRed.length; i++) {
				fastop.setLineVisible("LinePlayRed" + i, "red" + i, true)
			}
		}
		if (nodeId.startsWith("blue") && onOff == true && goldInfos.suodingTwo == 1) {
			goldInfos.localNumTwo = 1
			goldInfos.suodingTwo = 0
			fastop.nodeMoveColor(nodeId, nodeId, 0, 0, 254)
			roomFunction.playSoundTivite(false, "goldRightTwo", "positive")
			for (let j = 0; j < goldInfos.lineListBlue.length; j++) {
				fastop.setLineVisible("LinePlayBlue" + j, "blue" + j, true)
			}
		}
		if (nodeId.startsWith("green") && onOff == true && goldInfos.suodingThree == 1) {
			goldInfos.localNumThree = 1
			goldInfos.suodingThree = 0
			fastop.nodeMoveColor(nodeId, nodeId, 0, 254, 0)
			roomFunction.playSoundTivite(false, "goldRightTwo", "positive")
			for (let k = 0; k < goldInfos.lineListGreen.length; k++) {
				fastop.setLineVisible("LinePlayGreen" + k, "green" + k, true)
			}
		}
		if (nodeId.startsWith("yellow") && onOff == true && goldInfos.suodingFour == 1) {
			goldInfos.localNumFour = 1
			goldInfos.suodingFour = 0
			fastop.nodeMoveColor(nodeId, nodeId, 254, 254, 0)
			roomFunction.playSoundTivite(false, "goldRightTwo", "positive")
			for (let m = 0; m < goldInfos.lineListYellow.length; m++) {
				fastop.setLineVisible("LinePlayYellow" + m, "yellow" + m, true)
			}
		}
		if (nodeId.startsWith("cyan") && onOff == true && goldInfos.suodingFive == 1) {
			goldInfos.localNumFive = 1
			goldInfos.suodingFive = 0
			fastop.nodeMoveColor(nodeId, nodeId, 0, 254, 254)
			roomFunction.playSoundTivite(false, "goldRightTwo", "positive")
			for (let q = 0; q < goldInfos.lineListCyan.length; q++) {
				fastop.setLineVisible("LinePlayCyan" + q, "cyan" + q, true)
			}
		}
		if (nodeId.startsWith("brown") && onOff == true && goldInfos.suodingSix == 1) {
			goldInfos.localNumSix = 1
			goldInfos.suodingSix = 0
			fastop.nodeMoveColor(nodeId, nodeId, 139, 69, 19)
			roomFunction.playSoundTivite(false, "goldRightTwo", "positive")
			for (let e = 0; e < goldInfos.lineListBrown.length; e++) {
				fastop.setLineVisible("LinePlayBrown" + e, "brown" + e, true)
			}
		}
		goldInfos.block2Infos.map((item) => {
			if (item == goldInfos.targetBlocks) {
				// if (item == 10) {
				wanFa_goldMiner.gameLevelEnd()
				return
			}
		})



	},
	CountPlay() {
		let screenCir = setInterval(() => {
			if (goldInfos.screenCirCtl == 1) {
				clearInterval(screenCir)
				return
			}
			let usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"]
			let ganmeEndScreenShow = []
			for (let i = 0; i < usersInfos.allUsers.length; i++) {
				ganmeEndScreenShow.push({
					userColor: usercolors[i],
					userName: pkNameList[i],
					userScore: goldInfos.block2Infos[i]
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
						value1: nowInfos.gameCountTime
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "目标块数",
						value1: goldInfos.targetBlocks
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
					value1: nowInfos.gameCountTime
				},
				block3: {
					model: "dis_b_numUnit",
					label1: "目 标 块 数",
					value1: goldInfos.targetBlocks
				},
			}
		}
		gameFuncs.op(opInfo)
	},


}
