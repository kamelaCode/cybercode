const wanFa_wujinPlus = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_wujinPlus.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_wujinPlus.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_wujinPlus.gameDestroy);
		//重置全局变量
		wujinPlusFuncs.resetAll()
		clearInterval(wujinPlusFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}


		engine.log("!!!gameIdList!!!=" + levelInfos.gameIdList)
		playerNum = usersInfos.allUsers.length

		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_wujinPlus.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("wujin")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						roomFunction.playSound(true, "haiPlusBgm02", "background")
						//wujinPlusFuncs.CountPlay();
					}
					break;
				case 17:
					clearInterval(wanFa_wujinPlus.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_wujinPlus.gameTaped)
		clearInterval(wanFa_wujinPlus.gamePlay.lyc)
		engine.log("-------------------" + gameid)
		if (levelInfos.wanFa == "wujin") {
			clearInterval(wujinPlusFuncs.tiaoWin.Athree)
			clearNum = 0
			nowInfos.nowGameid = gameid
			switch (gameid) {
				case "hai011-cxx":
					nowInfos.lifePoint = 6;
					gameRules.lifeMove();
					wujinPlusFuncs.CountPlay()
					wujinPlusFuncs.ScorePlay()
					nowInfos.gameCountTime = 40
					nowInfos.target = 30;
					roomFunction.playSound(false, "togreen")
					break;
				case "color2-4-2-rah":
					// gameRules.lifeMove();
					// nowInfos.lifePoint = 6;
					roomFunction.stopSound("haiPlusBgm02")
					roomFunction.playSound(true, "colorBgm", "background")
					rightnum = playerNum
					fakernum = 3
					let cxxCode = setInterval(() => { //主线程 生成+判定
						if (remove == 1) {
							clearInterval(cxxCode)
							engine.log("移除了")
							return
						}
						gameMove++
						engine.log(gameMove + "------++++")
						switch (gameMove) {
							case 1:
								tapPanding = 0
								if (levelInfos.level == 1) {
									wujinPlusFuncs.colorPlay(false)

								}
								for (let i = 1; i < target + 1; i++) {
									fastop.removeNode("qaq" + i, "target" + i)
								}
								wujinPlusFuncs.addTargetList()//添加目标点
								wujinPlusFuncs.addColor()//杂乱色
								wujinPlusFuncs.addFaker()//假点
								wujinPlusFuncs.ScorePlayColor()
								break;
							case 9:
								engine.log("panding")
								for (let i = 0; i < luanList.length; i++) {
									fastop.removeNode("qwq" + i, luanList[i])
								}
								tapPanding = 1
								wrongNum = 0
								if (colorInfos.noBody == 0) {
									wrongNum = 1
									wujinPlusFuncs.tapWrongColor(0, 0)
								}
								let code = setTimeout(() => {
									if (wrongNum == 0) {
										if (wrongNum == 1) {
											clearTimeout(code)
											engine.log("ok了")
											return
										}
										usersInfos.levelScore += 10
										roomFunction.playSoundTivite(false, "right", "positive")
										wujinPlusFuncs.rightAnimation()
										tapPanding = 0
									}
								}, 500);
								lunNum++
								engine.log(lunNum + "-----")
								break;
							case 10:
								if (lunNum == 10) {
									remove = 1
									wujinPlusFuncs.tiaoWin()
								}
								gameMove = 0
								tapPanding = 0
								colorInfos.noBody = 0
								break;
						}
					}, 1000);
					break;
				case "duobi002-rah":
					// gameRules.lifeMove();
					// nowInfos.lifePoint = 6
					roomFunction.stopSound("colorBgm")
					roomFunction.playSound(true, "Duobi", "background")
					nowInfos.gameCountTime = 40
					nowInfos.target = 6
					wujinPlusFuncs.addTargetPoint(6)
					wujinPlusFuncs.RandomRedPoint(12, 4000, 15)
					wujinPlusFuncs.MoveLine(14, 10000, 0, 1)
					wujinPlusFuncs.CountPlay()
					wujinPlusFuncs.ScorePlay()
					break;
				case "mutouren001-lbw":
					nowInfos.lifePoint = 6;
					gameRules.lifeMove();
					mutourenInfos.greenNums = 2
					mutourenInfos.greenArea = 1
					nowInfos.gameCountTime = 73
					nowInfos.target = usersInfos.usersResult.length * 50
					mutourenInfos.gameLoopsNum = 0
					wujinPlusFuncs.allRed()
					wujinPlusFuncs.CountPlay();
					wujinPlusFuncs.randomBluePoint(30)
					wujinPlusFuncs.ScorePlay();
					break;
				case "trans02-cxx":
					nowInfos.gameCountTime = 70
					nowInfos.target = 20;
					nowInfos.lifePoint = 6;
					gameRules.lifeMove();
					wujinPlusFuncs.CountPlay()
					wujinPlusFuncs.ScorePlay()
					wujinPlusFuncs.blueFor()

					roomFunction.playSound(false, "gotoGreen")
					wujinPlusFuncs.blueShow(usersInfos.usersResult.length)
					wujinPlusFuncs.blueNoTap()
					setTimeout(() => {
						roomFunction.playSound(true, "tranBgm", "background")
						wujinPlusFuncs.addRedTran()
						wujinPlusFuncs.addRedTran1()
						wujinPlusFuncs.redPlayTran()
						wujinPlusFuncs.redPlayTran1()
						wujinPlusFuncs.blueYesTap()
					}, 6000);
					break;
				case "chest006-lyc":
					nowInfos.gameCountTime = 80
					roomFunction.playSound(true, "chestbgm", "background")
					fang = 0
					fangmei = 0
					yinList = []
					byinList = []
					bucai = 1
					doubleJump = 0
					setTimeout(() => {
						bucai = 0
					}, 2000);
					targetList = [[4, 15], [4, 18], [4, 21], [7, 12], [10, 12], [10, 3]] //填入目标点位置
					woquni = [[7, 3], [7, 6], [7, 9], [7, 15], [7, 18], [7, 21]]
					neiProtect = [//0空地 9墙 1箱子角 x.1234哪个箱子的前后左右
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//0
						[0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0],//1
						[0, 0, 9, 0, 0, 0, 1, 1.1, 1, 0, 0, 0, 9, 0, 0, 0],//2
						[0, 0, 9, 0, 0, 0, 1.3, 1.9, 1.4, 0, 0, 0, 9, 0, 0, 0],//3
						[0, 0, 9, 0, 0, 0, 1, 1.2, 1, 0, 0, 0, 9, 0, 0, 0],//4
						[0, 0, 9, 0, 0, 0, 2, 2.1, 2, 0, 0, 0, 9, 0, 0, 0],//5
						[0, 0, 9, 0, 0, 0, 2.3, 2.9, 2.4, 0, 0, 0, 9, 0, 0, 0],//6
						[0, 0, 9, 0, 0, 0, 2, 2.2, 2, 0, 0, 0, 9, 0, 0, 0],//7
						[0, 0, 9, 0, 0, 0, 3, 3.1, 3, 0, 0, 0, 9, 0, 0, 0],//8
						[0, 0, 9, 0, 0, 0, 3.3, 3.9, 3.4, 0, 0, 0, 9, 0, 0, 0],//9
						[0, 0, 9, 0, 0, 0, 3, 3.2, 3, 0, 0, 0, 9, 0, 0, 0],//10
						[0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0],//11
						[0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0],//12
						[0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0],//13
						[0, 0, 9, 0, 0, 0, 4, 4.1, 4, 0, 0, 0, 9, 0, 0, 0],//14
						[0, 0, 9, 0, 0, 0, 4.3, 4.9, 4.4, 0, 0, 0, 9, 0, 0, 0],//15
						[0, 0, 9, 0, 0, 0, 4, 4.2, 4, 0, 0, 0, 9, 0, 0, 0],//16
						[0, 0, 9, 0, 0, 0, 5, 5.1, 5, 0, 0, 0, 9, 0, 0, 0],//17
						[0, 0, 9, 0, 0, 0, 5.3, 5.9, 5.4, 0, 0, 0, 9, 0, 0, 0],//18
						[0, 0, 9, 0, 0, 0, 5, 5.2, 5, 0, 0, 0, 9, 0, 0, 0],//19
						[0, 0, 9, 0, 0, 0, 6, 6.1, 6, 0, 0, 0, 9, 0, 0, 0],//20
						[0, 0, 9, 0, 0, 0, 6.3, 6.9, 6.4, 0, 0, 0, 9, 0, 0, 0],//21
						[0, 0, 9, 0, 0, 0, 6, 6.2, 6, 0, 0, 0, 9, 0, 0, 0],//22
						[0, 0, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0],//23
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//24
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//25
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//26
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//27
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//28
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//29
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//30
						[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//31
					]
					yesNum = 0
					targetNum = targetList.length//有多少目标点
					howyin = [0, 0, 0, 0, 0, 0, 0, 0]
					yinxiang = []
					wujinPlusFuncs.CountPlay()
					wujinPlusFuncs.ScorePlay();
					break;
				case "trans04-cxx":
					wujinPlusFuncs.tranThree()
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
					if (usersInfos.usersResult.length <= 3) {
						for (let i = 0; i < 30; i++) {
							cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
							qishi.push(cxxxx)
							qishi.sort(() => Math.random() - 0.5)
							arrNew[0] = qishi[0]
							for (let j = 1; j < qishi.length;) {
								if (arrNew[arrNew.length - 1] == qishi[j]) {
									while (arrNew[arrNew.length - 1] == qishi[j]) {
										j++;
									}
									// arrNew.shift();
									arrNew.slice(1, usersInfos.usersResult.length)
									//arrNew.pop()
								} else {
									arrNew.push(qishi[j])
									j++
								}

							}
						}
						engine.log("存入---" + arrNew)
					} else if (usersInfos.usersResult.length > 3) {
						for (let i = 0; i < 30; i++) {
							cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
							qishi.push(cxxxx)
						}
						qishi.sort(() => Math.random() - 0.5)
						engine.log("存入---" + qishi)
					}
					nowInfos.gameCountTime = 90;
					nowInfos.lifePoint = 6;
					gameRules.lifeMove();
					nowInfos.target = 20
					wujinPlusFuncs.CountPlayThree()
					wujinPlusFuncs.ScorePlayThree()
					wujinPlusFuncs.blueForThree()
					wanFa_wujinPlus.gamePlay.innerCountThree = setInterval(() => {
						nowInfos.gameCountTime--
						if (nowInfos.gameCountTime == 5) {
							roomFunction.playSound(false, "fenwei")
							//roomFunction.stopSound("jingjiBgm01");
						}
						if (nowInfos.gameCountTime == 1) {
							pickInfos.screenCirCtl = 1
							wujinPlusFuncs.tiaoWin()
							clearInterval(wanFa_wujinPlus.gamePlay.innerCountThree)
						}
					}, 1000)
					setIntervalCount(function (index, count) {
						pickInfos.levelScoreAll = ""
					}, 5000, 26)
					roomFunction.playSound(false, "gotoGreen")
					wujinPlusFuncs.blueShowOneThree()
					wujinPlusFuncs.blueNoTapThree(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
					wujinPlusFuncs.wallMoveTwoThree(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
					setTimeout(() => {
						tranInfos.blueProject = 1
						dontMove = 1
						roomFunction.playSound(true, "tranActBgm", "background")
						wujinPlusFuncs.redPlay13()
					}, 6000);
					break;
				case "pintu2-hf":
					nowInfos.gameCountTime = 90;
					wujinPlusFuncs.CountPlay()
					setTimeout(() => {
						nowInfos.lifePoint = 6
						gameRules.lifeMove();
						engine.addEventListener("gameTaped", wanFa_wujinPlus.gameTaped)
					}, 200);
					roomFunction.playSound(false, "pintuhuidao");
					roomFunction.playSound(true, "pintuBgm", "background");
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

					//获取固定坐标进行难度划分
					wujinPlusFuncs.setStartVariable()
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

					break;
			}
			// wanFa_wujinPlus.gamePlay.clearTime = setTimeout(() => {
			// 	switch (guole) {
			// 		case 0:
			// 			wujinPlusFuncs.addRed8()
			// 			roomFunction.playSound(false, "levelOne")
			// 			break;
			// 		case 1:
			// 			wujinPlusFuncs.num2()
			// 			roomFunction.playSound(false, "levelTwo")
			// 			break;
			// 		case 2:
			// 			wujinPlusFuncs.num3()
			// 			roomFunction.playSound(false, "levelThree")
			// 			break;
			// 		case 3:
			// 			wujinPlusFuncs.addRed9()
			// 			roomFunction.playSound(false, "levelFour")
			// 			break;
			// 		case 4:
			// 			wujinPlusFuncs.addRed10()
			// 			roomFunction.playSound(false, "levelFive")
			// 			break;
			// 		case 5:
			// 			wujinPlusFuncs.addRed11()
			// 			roomFunction.playSound(false, "levelSix")
			// 			break;
			// 		case 6:
			// 			wujinPlusFuncs.addRed12()
			// 			roomFunction.playSound(false, "levelSeven")
			// 			break;
			// 		case 7:
			// 			wujinPlusFuncs.addRed13()
			// 			roomFunction.playSound(false, "levelEight")
			// 			break;
			// 		case 8:
			// 			wujinPlusFuncs.addRed14()
			// 			roomFunction.playSound(false, "levelNine")
			// 			break;
			// 		case 9:
			// 			wujinPlusFuncs.addRed15()
			// 			roomFunction.playSound(false, "levelTen")
			// 			break;
			// 	}
			// }, 6700);
			setTimeout(() => {
				engine.log("????????????")
				change = 0
			}, 5000);



			//nowInfos.target = 2
		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (levelInfos.wanFa == "wujin") {
			//engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			switch (nowInfos.nowGameid) {
				case "hai011-cxx":
					wujinPlusFuncs.blueTap(face, x, y, onOff, nodeId, event);
					wujinPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event);
					break;
				case "color2-4-2-rah":
					colorInfos.noBody = 1
					if (tapPanding == 1) {
						if (onOff == true) {
							usersInfos.ValidTrigger++
						}
						if (nodeId == "low") {//如果踩错的直接扣血走动画
							wrongNum = 1
							wujinPlusFuncs.tapWrongColor(x, y)
						}
					}
					if (nodeId.startsWith("faker") && onOff == true && (arrColorSss[nodeId.toString()] == 0 || arrColorSss[nodeId.toString()] == undefined)) {
						wujinPlusFuncs.fakerTap(nodeId)
					}
					break;
				case "duobi002-rah":
					wujinPlusFuncs.TargetTap(face, x, y, onOff, nodeId, event)
					wujinPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event)
					break;
				case "mutouren001-lbw":
					wujinPlusFuncs.rightTap(face, x, y, onOff, nodeId, event);
					wujinPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event);
					break;
				case "trans02-cxx":
					wujinPlusFuncs.blueTapTran(face, x, y, onOff, nodeId, event);
					wujinPlusFuncs.greenTap(face, x, y, onOff, nodeId, event);
					wujinPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event);
					break;
				case "chest006-lyc":
					if (nodeId.indexOf(".") != -1 && nodeId.indexOf("chest") != -1 && onOff == true && luantui == 0) {
						luantui = 1
						setTimeout(() => {
							luantui = 0
						}, 1000);
						let where = nodeId.slice(9)
						let who = nodeId.slice(0, 8)
						if (bucai == 0) {
							wujinPlusFuncs.tuitui(x, y, onOff, nodeId, where, who)
						}
					}
					break;
				case "trans04-cxx":
					wujinPlusFuncs.blueTapThree(face, x, y, onOff, nodeId, event);
					wujinPlusFuncs.greenTapThree(face, x, y, onOff, nodeId, event);
					wujinPlusFuncs.greenTapTwo(face, x, y, onOff, nodeId, event);
					break;
				case "pintu2-hf":
					let hhh = gameFuncs.surfacePointInfo("b", x, y);
					let hefeng = JSON.parse(hhh)
					if (hefeng.rgb.G == 0 && hefeng.rgb.B == 0 && hefeng.rgb.R == 0 && onOff == true) {
						wujinPlusFuncs.colorChangeTap(face, x, y, onOff, nodeId, event);
					}
					break;
			}

			//wujinPlusFuncs.gameEndControl(face, x, y, onOff, nodeId, event)
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(wujinPlusFuncs.tapWrong.determine)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(wujinPlusFuncs.CountPlay.innerCount)
		clearInterval(wanFa_wujinPlus.gamePlay.haipro)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		// if (gameid != "__system_wait") {
		// 	wanFa_wujinPlus.gameLevelEnd()
		// }
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(wujinPlusFuncs.CountPlay.innerCount)
		clearInterval(wujinPlusFuncs.tapWrong.awa)
		clearInterval(wujinPlusFuncs.tiaoWin.Athree)
		clearInterval(wanFa_wujinPlus.gamePlay.haipro)
		clearInterval(wanFa_wujinPlus.gamePlay.lyc)
		clearTimeout(wanFa_wujinPlus.gamePlay.clearTime)
		clearInterval(wanFa_wujinPlus.gamePlay.innerCount)
		clearInterval(wanFa_wujinPlus.gamePlay.innerCountThree)
		roomFunction.stopSound("haiPlusBgm02")
		roomFunction.stopSound("tranActBgm")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("chestbgm")
		roomFunction.stopSound("pintuBgm")
		roomFunction.stopSound("haiPlusBgm02")
		roomFunction.stopSound("colorBgm")
		roomFunction.stopSound("tranBgm")
		roomFunction.stopSound("Duobi")
		roomFunction.stopSound("mutouren")
		roomFunction.stopSound("mutourenBgm1.2x")
		roomFunction.stopSound("mutourenBgm1.4x")
		roomFunction.stopSound("mutourenBgm1.5x")
		roomFunction.stopSound("mutourenBgm2x")
		roomFunction.stopSound("chestnb")
		roomFunction.stopSound("chestbgm")
		//roomFunction.stopSound("shizhong")
		roomFunction.goToGameLevel("leave_hold", "none")
		wujinPlusFuncs.rmAllListener()

		switch (nowInfos.nowGameid) {
			case "hai011-cxx":
				usersInfos.levelScore = 10
				break;
			case "color2-4-2-rah":
				usersInfos.levelScore = 20
				break;
			case "duobi002-rah":
				usersInfos.levelScore = 40
				break;
			case "mutouren001-lbw":
				usersInfos.levelScore = 60
				break;
			case "trans02-cxx":
				usersInfos.levelScore = 80
				break;
			case "chest006-lyc":
				usersInfos.levelScore = 100
				break;
			case "trans04-cxx":
				usersInfos.levelScore = 110
				break;
			case "pintu2-hf":
				usersInfos.levelScore = 120
				break;
		}
		wanFaCtl_wujinPlusCtl.gameEndCtl(usersInfos.levelScore)
		levelInfos.gameIdList = []
		let str = gameFuncs.playingAudioIds()
		let arr = JSON.parse(str)
		let soundName = arr?.map(item => item.slice(item.indexOf('d') + 1))
		engine.log(arr)

		engine.log(soundName)
		soundName?.map(item => {
			roomFunction.stopSound(item)
		})
		countNum = 1
		clearNum = 999
		remove = 1//色盲派对
		duobiVar.look = 1//极限躲避
		fff = 1
		mutourenInfos.gameEndCtl = 1//123木头人

		fang = 0//推箱子

		tranInfos.removeWall = 1//颜色传递
		pickInfos.screenCirCtl = 1
	}

}




const wujinPlusFuncs = {
	//重置所有变量
	resetAll() {
		//nowInfos.gameCountTime = 240;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		aaa = 0
		guole = 0
		cuowu = 0
		clearNum = 0
		countNum = 0
		//色盲派对变量
		lunNum = 0
		moveColor = 1
		colorInfos.noBody = 0
		arrColorSss = {}
		//sjColor = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]//坐标地图
		sjColor = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]//坐标地图
		colornum = 0
		targetnumm = 0
		gameMove = 0
		control = 0
		remove = 0
		wrongNum = 1
		tapPanding = 0
		//极限躲避变量
		duobiVar.look = 0
		fff = 0
		//木头人变量
		mutourenInfos.redCheck = 0;
		mutourenInfos.addGreen = false;
		mutourenInfos.gameLoopsNum = 0;
		mutourenInfos.gameEndCtl = 0;
		mutourenInfos.bgmSpeed = 0
		//传递位置变量
		canTapNum = [];
		tranInfos.blueProject = 0
		secondNum = 0
		Firstchart = [6, 7, 8, 14, 15, 16]
		//推箱子
		yesNum = 0
		chenggong = 0
		shao = 0
		luantui = 0
		teachmovenum = 0
		jiaoxueshiyong = 0
		woquni = []
		fang = 0
		neiProtect = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]
		//颜色传递
		arrNew = []
		weights = []
		qishi = []
		canTapNum = [];
		pkNameList = []
		tranInfos.blueProject = 0
		tranInfos.oldId = ""
		tranInfos.wallNum = 0
		tranInfos.removeWall = 0
		dontMove = 0
		tranInfos.remonber = []
		tranInfos.whoClos = 0
		firstNum = 0
		Firstchart = [6, 7, 8, 14, 15, 16]
		pickInfos.screenCirCtl = 0
		//默契挑战
		pintuInfos.uesrTapArry = [];
		pintuInfos.tapProject = 0;
		pintuInfos.hhhhh = [];
		pintuInfos.gameNums = 0;

	},
	tranThree() {
		//颜色传递
		arrNew = []
		weights = []
		qishi = []
		canTapNum = [];
		pkNameList = []
		tranInfos.blueProject = 0
		tranInfos.oldId = ""
		tranInfos.wallNum = 0
		tranInfos.removeWall = 0
		dontMove = 0
		tranInfos.remonber = []
		tranInfos.whoClos = 0
		firstNum = 0
		Firstchart = [6, 7, 8, 14, 15, 16]
		pickInfos.screenCirCtl = 0
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_wujinPlus.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_wujinPlus.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_wujinPlus.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_wujinPlus.gameTaped)
	},
	gameEndControl(face, x, y, onOff, nodeId, event) {
		if (nodeId == "StopRed" && onOff == true) {
			engine.log("开始定时器")
			wujinPlusFuncs.gameEndControl.haha = setTimeout(() => {
				wanFa_wujinPlus.gameLevelEnd()
				roomFunction.stopSound("haiPlusBgm02")
			}, 10000);
		}
		if (nodeId == "StopRed" && onOff == false) {
			engine.log("清除定时器")
			clearTimeout(wujinPlusFuncs.gameEndControl.haha)
		}
	},

	colorPlay(onoff) {
		let opInfo = {
			opId: "keepPlay", //操作id 再控制用
			opType: "play", // 操作类型，修改节点属性
			opNode: "keep", // 仅能操作node类型
			timeLen: 8, //秒 支持小数
			loop: false,
			keyFrames: [ // 过程数组
				{
					t: 0, //0-1的时间点位
					keyFrame: {

						canTap: false, //控制
						visible: onoff, //显示，如果为false，逻辑数据会跳过

					}
				},
				{
					t: 1,
					keyFrame: {

						canTap: false, //控制
						visible: onoff, //显示，如果为false，逻辑数据会跳过

					}
				}
			],
		}
		gameFuncs.op(opInfo);
	},
	addTargetList() {
		noSame = [0, 1, 2, 3, 4, 5, 6, 7]//售后李禹辰
		target = Math.floor(Math.random() * 8)//用哪个sai当目标点
		engine.log(target + "当前目标点")
		let qwq = noSame.indexOf(target)
		engine.log(qwq + "此目标点在nosame下标")
		noSame.splice(qwq, 1)
		engine.log(noSame + "当前杂乱色块选择数组")
		switch (target) {
			case 0:
				roomFunction.playSound(false, "blue");
				break;
			case 1:
				roomFunction.playSound(false, "green");
				break;
			case 2:
				roomFunction.playSound(false, "Black");
				break;
			case 3:
				roomFunction.playSound(false, "yellow");
				break;
			case 4:
				roomFunction.playSound(false, "purple");
				break;
			case 5:
				roomFunction.playSound(false, "brown");
				break;
			case 6:
				roomFunction.playSound(false, "pink");
				break;
			case 7:
				roomFunction.playSound(false, "orange");
				break;
		}

		sjColor = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]//坐标地图
		targetnumm = 0
		for (let i = 0; i < rightnum; i++) {
			targetnumm++
			let x = Math.floor(Math.random() * 8)
			let y = Math.floor(Math.random() * 16)
			while (sjColor[x][y] != 0) {
				x = Math.floor(Math.random() * 8)
				y = Math.floor(Math.random() * 16)
			}
			sjColor[x][y] = 2

			fastop.addColor(x + "add" + y, "target" + targetnumm, x * 2, y * 2, colorInfos.arrColor[target].r, colorInfos.arrColor[target].g, colorInfos.arrColor[target].b)
			let opInfo1 = {
				opId: "colorPlay001",
				opType: "play",
				opNode: "color001",
				timeLen: 8,
				canTap: false,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							shape: {
								rgba: {
									r: colorInfos.arrColor[target].r,
									g: colorInfos.arrColor[target].g,
									b: colorInfos.arrColor[target].b,
									a: colorInfos.arrColor[target].a,
								}
							}

						}
					},
					{
						t: 0.15,
						keyFrame: {
							visible: true,
							shape: {
								rgba: {
									r: colorInfos.arrColor[target].r,
									g: colorInfos.arrColor[target].g,
									b: colorInfos.arrColor[target].b,
									a: colorInfos.arrColor[target].a,
								}
							}

						}
					},
					{
						t: 0.2,
						keyFrame: {
							visible: false,
							shape: {
								rgba: {
									r: colorInfos.arrColor[target].r,
									g: colorInfos.arrColor[target].g,
									b: colorInfos.arrColor[target].b,
									a: colorInfos.arrColor[target].a,
								}
							}

						}
					},
					{
						t: 0.25,
						keyFrame: {
							visible: true,
							shape: {
								rgba: {
									r: colorInfos.arrColor[target].r,
									g: colorInfos.arrColor[target].g,
									b: colorInfos.arrColor[target].b,
									a: colorInfos.arrColor[target].a,
								}
							}

						}
					},
					{
						t: 0.97,
						keyFrame: {
							visible: true,
							shape: {
								rgba: {
									r: colorInfos.arrColor[target].r,
									g: colorInfos.arrColor[target].g,
									b: colorInfos.arrColor[target].b,
									a: colorInfos.arrColor[target].a,
								}
							}

						}
					},
					{
						t: 1,
						keyFrame: {
							visible: false,
							shape: {
								rgba: {
									r: colorInfos.arrColor[target].r,
									g: colorInfos.arrColor[target].g,
									b: colorInfos.arrColor[target].b,
									a: colorInfos.arrColor[target].a,
								}
							}

						}
					}
				],

			}
			gameFuncs.op(opInfo1);
		}



	},
	//创建杂乱色块
	addColor() {
		luanList = []
		let awa = 0
		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 32; y++) {
				if (sjColor[x][y] == 0) {
					colornum++
					sjColor[x][y] = 1
					awa = noSame[Math.floor(Math.random() * 7)]
					fastop.addColor(x + "add" + y, "qwq" + colornum, x * 2, y * 2, colorInfos.arrColor[awa].r, colorInfos.arrColor[awa].g, colorInfos.arrColor[awa].b)
					luanList.push("qwq" + colornum)
				}
			}
		}
	},

	//添加假点
	addFaker() {
		if (fakernum != 0) {
			for (let i = 0; i < fakernum; i++) {
				targetnumm++
				let x = Math.floor(Math.random() * 8)
				let y = Math.floor(Math.random() * 16)
				while (sjColor[x][y] != 1) {
					x = Math.floor(Math.random() * 8)
					y = Math.floor(Math.random() * 16)
				}
				sjColor[x][y] = 3
				fastop.addColor(x + "add" + y, "faker" + targetnumm, x * 2, y * 2, colorInfos.arrColor[target].r, colorInfos.arrColor[target].g, colorInfos.arrColor[target].b)
				luanList.push("faker" + targetnumm)
			}
		}

	},


	fakerTap(nodeId) {
		//moveColor = 0
		arrColorSss[nodeId.toString()] = 1
		roomFunction.playSoundTivite(false, "wrong3", "negative")
		fastop.fakerChange("awa" + nodeId, nodeId)
		luanList = luanList.filter(item => item !== nodeId)
		setTimeout(() => {
			//moveColor = 1
			arrColorSss[nodeId.toString()] = 0
			fastop.removeNode("qwq" + nodeId, nodeId)
		}, 1000);
	},

	//判定错误并播放错误音效，减生命值。
	tapWrongColor(x, y) {
		wrongNum++
		tapPanding = 0
		for (let i = 1; i < target + 1; i++) {
			fastop.targetOff("qaq" + i, "target" + i)
		}
		if (nowInfos.lifeProtect == 0) {
			wujinPlusFuncs.wrongAnimation(x, y)
			nowInfos.lifeProtect = 1;
			setTimeout(function () {
				nowInfos.lifeProtect = 0
			}, 1000);
			wujinPlusFuncs.addBlinkColor(x, y)
			usersInfos.UseLife++
			if (nowInfos.lifePoint > 1) {
				nowInfos.lifePoint--;
				gameRules.lifeMove();
				roomFunction.playSoundTivite(false, "wrong", "negative");
			} else if (nowInfos.lifePoint == 1) {
				nowInfos.lifePoint--;
				gameRules.lifeMove();
				roomFunction.playSoundTivite(false, "wrong", "negative");
				wanFa_wujinPlus.gameLevelEnd()
			}
		}
	},
	//成功动画
	rightAnimation() {
		engine.log("============正确动画")
		usersInfos.ValidTarget++
		let opInfo2 = {
			opId: "rightPlay",
			opType: "play",
			opNode: "right",
			timeLen: 1.5,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						shape: {
							rect: {
								lt: { x: 0, y: 0 },
								rb: { x: 1, y: 1 }
							},
							rgba: {
								r: colorInfos.arrColor[target].r,
								g: colorInfos.arrColor[target].g,
								b: colorInfos.arrColor[target].b,
								a: 1,
							}
						}
					}
				},
				{
					t: 0.5,
					keyFrame: {

						shape: {
							rect: {
								lt: { x: -16, y: -42 },
								rb: { x: 16, y: 42 }
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false

					}
				}
			]
		}
		gameFuncs.op(opInfo2);
	},
	//失败动画
	wrongAnimation(x, y) {

		engine.log("============错误动画")

		let opInfo2 = {
			opId: "wrongPlay",
			opType: "play",
			opNode: "wrong",
			timeLen: 2,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: x,
							y: y,
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
								lt: { x: -16, y: -42 },
								rb: { x: 16, y: 42 }
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false
					}
				}
			]
		}
		gameFuncs.op(opInfo2);
	},
	addBlinkColor(x, y) {
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


	//极限躲避
	//添加奖励按钮点
	addTargetPoint(targetNum) {
		let tempArr = []
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
				nowInfos.target--;
				roomFunction.playSoundTivite(false, "right", "positive");
				if (levelInfos.level != 1) {
					usersInfos.levelScore += 4;
				}
				if (levelInfos.level == 1) {
					usersInfos.levelScore += 4
				}
				wujinPlusFuncs.ScorePlay()
			}
		}
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
	RandomRedPoint(speed, time, rednum) {
		wujinPlusFuncs.RandomRedPoint.useCount = setInterval(function () {
			if (duobiVar.look == 1) {
				clearInterval(wujinPlusFuncs.RandomRedPoint.useCount)
				return
			}
			wujinPlusFuncs.addRandomRedPoint(speed, duobiVar.redlength, rednum)
		}, time);
	},
	//添加全屏扫过的横线。speed表示线走完全程的时间。temp有三个值：0为从下到上，1为从左到右，2为从右到左。
	addMoveLine(speed, temp) {
		if (duobiVar.lineProtect == 0) {
			duobiVar.lineNum++

			let tempX = 0
			let tempY = 42
			let x1 = 0
			let y1 = 15
			let tox = 0
			let toy = -1
			//let temp = Math.floor(Math.random()*3)
			if (temp == 0) {
				tempX = 0
				tempY = 42
				x1 = 15
				y1 = 0
				tox = 0
				toy = -1

			}
			if (temp == 1) {
				tempX = -1
				tempY = 0
				x1 = 0
				y1 = 41
				tox = 16
				toy = 0
			}

			if (temp == 2) {
				tempX = 16
				tempY = 0
				x1 = 0
				y1 = 41

				tox = -1
				toy = 0
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
	MoveLine(speed, time, min, max) {
		wujinPlusFuncs.MoveLine.useCount = setInterval(() => {
			if (duobiVar.look == 1) {
				clearInterval(wujinPlusFuncs.MoveLine.useCount)
				return
			}
			// duobiFuncs.addMoveLine(speed,Math.floor(Math.random()*2))
			wujinPlusFuncs.addMoveLine(speed, Math.floor(Math.random() * (max - min + 1)) + min)
			// duobiFuncs.addMoveLine(speed,temp)
		}, time);
	},


	//123木头人
	rightTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("right")) {
			if (onOff == true) {
				usersInfos.ValidTarget++
				fastop.removeNode("rmBlue", nodeId);
				nowInfos.target--;
				nowInfos.allTarget++;
				roomFunction.playSoundTivite(false, "right", "positive");
				wujinPlusFuncs.ScorePlay();
				if (usersInfos.usersResult.length != 5 && usersInfos.usersResult.length != 6 && nowInfos.allTarget >= (usersInfos.usersResult.length * 50)) {
					mutourenInfos.gameEndCtl = 1
					wujinPlusFuncs.tiaoWin()
				} else if (usersInfos.usersResult.length >= 5 && nowInfos.allTarget >= 200) {
					mutourenInfos.gameEndCtl = 1
					wujinPlusFuncs.tiaoWin()
				}
			}
		}
	},
	tapWrongMutou(face, x, y, onOff, nodeId, event) {
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
					wanFa_wujinPlus.gameLevelEnd()
				}
			}
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
					wujinPlusFuncs.createGreen()
					break;
				case 20:
					roomFunction.playSound(false, "mutouren", "background")
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
					wujinPlusFuncs.addStop()
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
						wujinPlusFuncs.allRed12X()
					} else {
						wujinPlusFuncs.allRed()
					}
					wujinPlusFuncs.randomBluePoint(30)
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
					wujinPlusFuncs.createGreen()
					break;
				case 17:
					roomFunction.playSound(false, "mutourenBgm1.2x", "background")
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
					wujinPlusFuncs.addStop()
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
						// wujinPlusFuncs.allRed15x()
						wujinPlusFuncs.allRed14X()
					} else {
						wujinPlusFuncs.allRed12X()

					}
					wujinPlusFuncs.randomBluePoint(30)
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
					wujinPlusFuncs.createGreen()
					break;
				case 17:
					roomFunction.playSound(false, "mutourenBgm1.4x", "background")
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
					wujinPlusFuncs.addStop()
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
						// wujinPlusFuncs.allRed15x()
						wujinPlusFuncs.allRed16x()
					} else {
						// wujinPlusFuncs.allRed()
						wujinPlusFuncs.allRed14X()

					}
					wujinPlusFuncs.randomBluePoint(30)
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
					wujinPlusFuncs.createGreen()
					break;
				case 10:
					roomFunction.playSound(false, "mutourenBgm1.5x", "background")
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
					wujinPlusFuncs.addStop()
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
						wujinPlusFuncs.allRed20X()
					} else {
						wujinPlusFuncs.allRed16x()
					}
					wujinPlusFuncs.randomBluePoint(30)
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
					wujinPlusFuncs.createGreen()
					break;
				case 10:
					roomFunction.playSound(false, "mutourenBgm2x", "background")
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
					wujinPlusFuncs.addStop()
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
					// wujinPlusFuncs.allRed20X()
					wujinPlusFuncs.randomBluePoint(30)
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
								x: 1,
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



	//传递位置

	addRedTran() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red301",
			nodes: [{
				nodeId: "red301",
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
							y: 0
						},
						rb: {
							x: 15,
							y: 1
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

	},
	addRedTran1() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red302",
			nodes: [{
				nodeId: "red302",
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
							y: 0
						},
						rb: {
							x: 1,
							y: 31
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

	},
	redPlayTran() {
		let opInfo1 = {
			opId: "red301",
			opType: "play",
			opNode: "red301",
			timeLen: 5,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 31
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	redPlayTran1() {
		let opInfo1 = {
			opId: "red302",
			opType: "play",
			opNode: "red302",
			timeLen: 5,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 15,
							y: 0
						},
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	//最开始隐藏掉起始所有蓝色与绿色点位
	blueFor() {
		for (let i = 0; i < 24; i++) {
			let opInfo1 = {
				opId: "blue" + i,
				opType: "play",
				opNode: "blue00" + i,
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo1);

			let opInfo2 = {
				opId: "green" + i,
				opType: "play",
				opNode: "green00" + i,
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo2);

		}
	},
	//操控蓝色点位在红色出现前不可触碰
	blueNoTap() {
		let opInfo3 = {
			opId: "blue" + canTapNum[0],
			opType: "play",
			opNode: "blue00" + canTapNum[0],
			timeLen: 1,
			loop: "true",
			keyFrames: [
				{
					t: 0.25,
					keyFrame: {
						visible: true,
						canTap: false
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: false,
						canTap: false
					}
				},
				{
					t: 0.75,
					keyFrame: {
						visible: true,
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
		gameFuncs.op(opInfo3);
	},
	//可触碰
	blueYesTap() {
		let opInfo3 = {
			opId: "blue" + canTapNum[0],
			opType: "play",
			opNode: "blue00" + canTapNum[0],
			timeLen: 1,
			loop: "true",
			keyFrames: [
				{
					t: 0.25,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: false,
						canTap: true
					}
				},
				{
					t: 0.75,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false,
						canTap: true
					}
				}
			]
		}
		gameFuncs.op(opInfo3);
	},
	blueShow(num) {
		// for (let i = 1; i <= num; i++) {
		while (canTapNum.length < num) {
			if (secondNum == 1) {
				let chart = Math.floor(Math.random() * 23)
				while (canTapNum.indexOf(chart) >= 0 || chart == judge) {
					chart = Math.floor(Math.random() * 23)
				}
				canTapNum.push(chart)
				let opInfo2 = {
					opId: "green" + chart,
					opType: "play",
					opNode: "green00" + chart,
					timeLen: 0.1,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: true
							}
						}
					]
				}
				gameFuncs.op(opInfo2);
			} else if (secondNum == 0) {
				secondNum = 1
				switch (usersInfos.usersResult.length) {
					case 2:
						canTapNum.push(Firstchart[0], Firstchart[1])
						let opInfo1 = {
							opId: "blue" + Firstchart,
							opType: "play",
							opNode: "blue00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo1);

						let opInfo2 = {
							opId: "green" + Firstchart,
							opType: "play",
							opNode: "green00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo2);
						break;
					case 3:
						canTapNum.push(Firstchart[0], Firstchart[1], Firstchart[2])
						let opInfo3 = {
							opId: "blue" + Firstchart,
							opType: "play",
							opNode: "blue00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo3);

						let opInfo4 = {
							opId: "green" + Firstchart,
							opType: "play",
							opNode: "green00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo4);
						break;
					case 4:
						canTapNum.push(Firstchart[0], Firstchart[1], Firstchart[2], Firstchart[3])
						let opInfo5 = {
							opId: "blue" + Firstchart,
							opType: "play",
							opNode: "blue00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo5);

						let opInfo6 = {
							opId: "green" + Firstchart,
							opType: "play",
							opNode: "green00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo6);
						break;
					case 5:
						canTapNum.push(Firstchart[0], Firstchart[1], Firstchart[2], Firstchart[3], Firstchart[4])
						let opInfo7 = {
							opId: "blue" + Firstchart,
							opType: "play",
							opNode: "blue00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo7);

						let opInfo8 = {
							opId: "green" + Firstchart,
							opType: "play",
							opNode: "green00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo8);
						break;
					case 6:
						canTapNum.push(Firstchart[0], Firstchart[1], Firstchart[2], Firstchart[3], Firstchart[4], Firstchart[5])
						let opInfo9 = {
							opId: "blue" + Firstchart,
							opType: "play",
							opNode: "blue00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo9);

						let opInfo10 = {
							opId: "green" + Firstchart,
							opType: "play",
							opNode: "green00" + Firstchart,
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true
									}
								}
							]
						}
						gameFuncs.op(opInfo10);
						break;

				}
			}

		}
		for (let i = 0; i < canTapNum.length; i++) {
			let opInfo2 = {
				opId: "green" + canTapNum[i],
				opType: "play",
				opNode: "green00" + canTapNum[i],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
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
					}
				]
			}
			gameFuncs.op(opInfo2);
		}


		wujinPlusFuncs.blueReveal()
		// }
	},
	//控制目标点位闪烁
	blueReveal() {
		let opInfo3 = {
			opId: "blue" + canTapNum[0],
			opType: "play",
			opNode: "blue00" + canTapNum[0],
			timeLen: 1,
			loop: "true",
			keyFrames: [
				{
					t: 0.25,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: false,
						canTap: true
					}
				},
				{
					t: 0.75,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false,
						canTap: true
					}
				}
			]
		}
		gameFuncs.op(opInfo3);
		//脚底绿色目标是否闪烁
		let opInfo4 = {
			opId: "green" + canTapNum[0],
			opType: "play",
			opNode: "green00" + canTapNum[0],
			timeLen: 2,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						shape: {
							rgba: {
								r: 0,
								g: 153,
								b: 51,
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
				}
			]
		}
		gameFuncs.op(opInfo4);
	},
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTapTran(face, x, y, onOff, nodeId, event) {
		// engine.log("blue--------" + tranInfos.blueProject)

		if (nodeId == ("blue00" + canTapNum[0]) && onOff == true && tranInfos.blueProject == 1) {
			usersInfos.ValidTarget++
			let opInfo1 = {
				opId: "blue" + canTapNum[0],
				opType: "play",
				opNode: "blue00" + canTapNum[0],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo1);
			tranInfos.blueProject = 0
			let opInfo2 = {
				opId: "green" + canTapNum[0],
				opType: "play",
				opNode: "green00" + canTapNum[0],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo2);
			judge = canTapNum[0]
			canTapNum.shift()
			wujinPlusFuncs.blueShow(usersInfos.usersResult.length)

			// tranFuncs.blueShow(1)



			// 	fastop.removeNode("rmblue","blue2023")
			// 	fastop.removeNode("rmgreen","green2024")
			// 	//let x = Math.floor(Math.random() * 3)
			// 	let x = 7
			// fastop.addtran("blue2024","blue2024",x,0,0,0,0,0,254)
			// if (x==7) {
			// 	fastop.addDuobi("green2025","green2025",0,7,1,1,0,254,0,0)
			// }
			if (nowInfos.target > 1) {
				roomFunction.playSoundTivite(false, "pick", "positive")
				nowInfos.target--
				nowInfos.allTarget++
				usersInfos.gameScore += 5
				usersInfos.levelScore += 5
				wujinPlusFuncs.ScorePlay()
			} else if (nowInfos.target == 1) {
				roomFunction.playSoundTivite(false, "pick", "positive")
				nowInfos.target--
				nowInfos.allTarget++
				usersInfos.gameScore += 5
				usersInfos.levelScore += 5
				wujinPlusFuncs.ScorePlay()
				wujinPlusFuncs.tiaoWin()
			}
		}



	},

	greenTap(face, x, y, onOff, nodeId, event) {
		if (face == "b" && (nodeId == ("green00" + canTapNum[canTapNum.length - 1])) && onOff == true) {
			tranInfos.blueProject = 1
		}
	},


	//推箱子
	reset() {//未改
		if (kekou == 0 && nowInfos.lifeProtect == 0) {
			nowInfos.lifeProtect = 1
			setTimeout(() => {
				nowInfos.lifeProtect = 0
			}, 2000);
			nowInfos.lifePoint--

			usersInfos.UseLife++
			roomFunction.playSound(false, "wrong", "negative");
			usersInfos.RetryCount++
			engine.log("游戏已重启")
			if (nowInfos.nowGameid != "chest001-lyc") {
				roomFunction.goToGameLevel(nowInfos.nowGameid, "none")
			}
			if (levelInfos.level == 1 && nowInfos.nowGameid == "chest001-lyc" && shao == 0) {//但如果是在教学关呢

				// roomFunction.goToGameLevel(nowInfos.nowGameid, "none")
				// shao = 1
				// chenggong = 1
				// roomFunction.stopSound("chestt003")
				// fang = 0
				// roomFunction.playSound(false, "chestt004");
				// setTimeout(() => {
				// 	nowInfos.lifePoint = 6
				// 	roomFunction.goToGameLevel("chest002-lyc", "none")
				// 	nowInfos.gameCountTime = 120
				// 	engine.log("开始新手关yy")
				// }, 5000);
			}
		}

	},

	tuitui(x, y, onOff, nodeId, where, who) { //贴墙或贴箱子后不可向其移动移动
		switch (where) {
			case "left":
				let str1 = gameFuncs.surfacePointInfo("b", x + 3, y);
				let info1 = JSON.parse(str1) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				let str2 = gameFuncs.surfacePointInfo("b", x - 1, y);
				let info2 = JSON.parse(str2) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				if ((info1.rgb.R == 0 && info1.rgb.G == 254 && info1.rgb.B == 0) || (info1.rgb.R == 102 && info1.rgb.G == 102 && info1.rgb.B == 102) || (info1.rgb.R == 152 && info1.rgb.G == 101 && info1.rgb.B == 0)) {//目前只判断绿色墙壁或箱子
					engine.log("推不动")
				} else if ((info2.rgb.R == 0 && info2.rgb.G == 254 && info2.rgb.B == 0) || (info2.rgb.R == 102 && info2.rgb.G == 102 && info2.rgb.B == 102) || (info2.rgb.R == 152 && info2.rgb.G == 101 && info2.rgb.B == 0)) {
					engine.log("不能推")
				}
				else {
					roomFunction.playSoundTivite(false, "tuitui", "positive")
					fastop.nodeMove("wangyou", who, 0.1, false, "b", x + 1, y, x + 4, y)
					wujinPlusFuncs.changemap(x, y, where)
				}



				break;//chest001.qian
			case "right":
				let str3 = gameFuncs.surfacePointInfo("b", x - 3, y);
				let info3 = JSON.parse(str3) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				let str4 = gameFuncs.surfacePointInfo("b", x + 1, y);
				let info4 = JSON.parse(str4) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				if ((info3.rgb.R == 0 && info3.rgb.G == 254 && info3.rgb.B == 0) || (info3.rgb.R == 102 && info3.rgb.G == 102 && info3.rgb.B == 102) || (info3.rgb.R == 152 && info3.rgb.G == 101 && info3.rgb.B == 0)) {//目前只判断绿色墙壁或箱子
					engine.log("推不动")
				} else if ((info4.rgb.R == 0 && info4.rgb.G == 254 && info4.rgb.B == 0) || (info4.rgb.R == 102 && info4.rgb.G == 102 && info4.rgb.B == 102) || (info4.rgb.R == 152 && info4.rgb.G == 101 && info4.rgb.B == 0)) {
					engine.log("不能推")
				}
				else {
					roomFunction.playSoundTivite(false, "tuitui", "positive")
					fastop.nodeMove("wangyou", who, 0.1, false, "b", x - 1, y, x - 4, y)
					wujinPlusFuncs.changemap(x, y, where)
				}



				break;
			case "qian":
				let str5 = gameFuncs.surfacePointInfo("b", x, y + 3);
				let info5 = JSON.parse(str5) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				let str6 = gameFuncs.surfacePointInfo("b", x, y - 1);
				let info6 = JSON.parse(str6) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				if ((info5.rgb.R == 0 && info5.rgb.G == 254 && info5.rgb.B == 0) || (info5.rgb.R == 102 && info5.rgb.G == 102 && info5.rgb.B == 102) || (info5.rgb.R == 152 && info5.rgb.G == 101 && info5.rgb.B == 0)) {//目前只判断绿色墙壁或箱子
					engine.log("推不动")
				} else if ((info6.rgb.R == 0 && info6.rgb.G == 254 && info6.rgb.B == 0) || (info6.rgb.R == 102 && info6.rgb.G == 102 && info6.rgb.B == 102) || (info6.rgb.R == 152 && info6.rgb.G == 101 && info6.rgb.B == 0)) {
					engine.log("不能推")
				}
				else {
					roomFunction.playSound(false, "tuitui", "positive")
					fastop.nodeMove("wangyou", who, 0.1, false, "b", x, y + 1, x, y + 4)
					wujinPlusFuncs.changemap(x, y, where)
				}



				break;
			case "hou":
				let str7 = gameFuncs.surfacePointInfo("b", x, y - 3);
				let info7 = JSON.parse(str7) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				let str8 = gameFuncs.surfacePointInfo("b", x, y + 1);
				let info8 = JSON.parse(str8) //首先检测箱子是否贴墙或贴箱子 如贴墙不可移动
				if ((info7.rgb.R == 0 && info7.rgb.G == 254 && info7.rgb.B == 0) || (info7.rgb.R == 102 && info7.rgb.G == 102 && info7.rgb.B == 102) || (info7.rgb.R == 152 && info7.rgb.G == 101 && info7.rgb.B == 0)) {//目前只判断绿色墙壁或箱子
					engine.log("推不动")
				} else if ((info8.rgb.R == 0 && info8.rgb.G == 254 && info8.rgb.B == 0) || (info8.rgb.R == 102 && info8.rgb.G == 102 && info8.rgb.B == 102) || (info8.rgb.R == 152 && info8.rgb.G == 101 && info8.rgb.B == 0)) {
					engine.log("不能推")
				}
				else {
					roomFunction.playSound(false, "tuitui", "positive")
					fastop.nodeMove("wangyou", who, 0.1, false, "b", x, y - 1, x, y - 4)
					wujinPlusFuncs.changemap(x, y, where)
				}
				break;
		}

	},

	changemap(x, y, where) {
		if (where == "left") {
			neiProtect[y][x + 3] = neiProtect[y][x]
			neiProtect[y][x] = 0

			neiProtect[y][x + 4] = neiProtect[y][x + 1]
			neiProtect[y][x + 1] = 0

			neiProtect[y][x + 5] = neiProtect[y][x + 2]
			neiProtect[y][x + 2] = 0

			neiProtect[y + 1][x + 3] = neiProtect[y + 1][x]
			neiProtect[y + 1][x] = 0

			neiProtect[y + 1][x + 4] = neiProtect[y + 1][x + 1]
			neiProtect[y + 1][x + 1] = 0

			neiProtect[y + 1][x + 5] = neiProtect[y + 1][x + 2]
			neiProtect[y + 1][x + 2] = 0

			neiProtect[y - 1][x + 3] = neiProtect[y - 1][x]
			neiProtect[y - 1][x] = 0

			neiProtect[y - 1][x + 4] = neiProtect[y - 1][x + 1]
			neiProtect[y - 1][x + 1] = 0

			neiProtect[y - 1][x + 5] = neiProtect[y - 1][x + 2]
			neiProtect[y - 1][x + 2] = 0
		}
		if (where == "right") {
			neiProtect[y][x - 3] = neiProtect[y][x]
			neiProtect[y][x] = 0

			neiProtect[y][x - 4] = neiProtect[y][x - 1]
			neiProtect[y][x - 1] = 0

			neiProtect[y][x - 5] = neiProtect[y][x - 2]
			neiProtect[y][x - 2] = 0

			neiProtect[y + 1][x - 3] = neiProtect[y + 1][x]
			neiProtect[y + 1][x] = 0

			neiProtect[y + 1][x - 4] = neiProtect[y + 1][x - 1]
			neiProtect[y + 1][x - 1] = 0

			neiProtect[y + 1][x - 5] = neiProtect[y + 1][x - 2]
			neiProtect[y + 1][x - 2] = 0

			neiProtect[y - 1][x - 3] = neiProtect[y - 1][x]
			neiProtect[y - 1][x] = 0

			neiProtect[y - 1][x - 4] = neiProtect[y - 1][x - 1]
			neiProtect[y - 1][x - 1] = 0

			neiProtect[y - 1][x - 5] = neiProtect[y - 1][x - 2]
			neiProtect[y - 1][x - 2] = 0
		}
		if (where == "qian") {
			neiProtect[y + 3][x] = neiProtect[y][x]
			neiProtect[y][x] = 0

			neiProtect[y + 4][x] = neiProtect[y + 1][x]
			neiProtect[y + 1][x] = 0

			neiProtect[y + 5][x] = neiProtect[y + 2][x]
			neiProtect[y + 2][x] = 0

			neiProtect[y + 3][x + 1] = neiProtect[y][x + 1]
			neiProtect[y][x + 1] = 0

			neiProtect[y + 4][x + 1] = neiProtect[y + 1][x + 1]
			neiProtect[y + 1][x + 1] = 0

			neiProtect[y + 5][x + 1] = neiProtect[y + 2][x + 1]
			neiProtect[y + 2][x + 1] = 0

			neiProtect[y + 3][x - 1] = neiProtect[y][x - 1]
			neiProtect[y][x - 1] = 0

			neiProtect[y + 4][x - 1] = neiProtect[y + 1][x - 1]
			neiProtect[y + 1][x - 1] = 0

			neiProtect[y + 5][x - 1] = neiProtect[y + 2][x - 1]
			neiProtect[y + 2][x - 1] = 0
		}
		if (where == "hou") {
			neiProtect[y - 3][x] = neiProtect[y][x]
			neiProtect[y][x] = 0

			neiProtect[y - 4][x] = neiProtect[y - 1][x]
			neiProtect[y - 1][x] = 0

			neiProtect[y - 5][x] = neiProtect[y - 2][x]
			neiProtect[y - 2][x] = 0

			neiProtect[y - 3][x + 1] = neiProtect[y][x + 1]
			neiProtect[y][x + 1] = 0

			neiProtect[y - 4][x + 1] = neiProtect[y - 1][x + 1]
			neiProtect[y - 1][x + 1] = 0

			neiProtect[y - 5][x + 1] = neiProtect[y - 2][x + 1]
			neiProtect[y - 2][x + 1] = 0

			neiProtect[y - 3][x - 1] = neiProtect[y][x - 1]
			neiProtect[y][x - 1] = 0

			neiProtect[y - 4][x - 1] = neiProtect[y - 1][x - 1]
			neiProtect[y - 1][x - 1] = 0

			neiProtect[y - 5][x - 1] = neiProtect[y - 2][x - 1]
			neiProtect[y - 2][x - 1] = 0
		}
	},


	//颜色传递
	//墙面倒计时动画
	wallMoveThree() {
		//tranInfos.removeWall = 0
		wujinPlusFuncs.wallMoveThree.wallCode = setInterval(() => {
			if (tranInfos.removeWall == 1) {
				clearInterval(wujinPlusFuncs.wallMoveThree.wallCode)
				engine.log("移除了")
				return
			}
			tranInfos.wallNum++
			switch (tranInfos.wallNum) {
				case 1:
					let opInfo1 = {
						opId: "wall",
						opType: "play",
						opNode: "wall",
						timeLen: 0.1,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: false,
									canTap: false
								}
							}
						]
					}
					gameFuncs.op(opInfo1);
					break;
				case 2:
					let opInfo6 = {
						opId: "wall01",
						opType: "play",
						opNode: "wall01",
						timeLen: 0.1,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: false,
									canTap: false
								}
							}
						]
					}
					gameFuncs.op(opInfo6);
					break;
				case 3:
					let opInfo7 = {
						opId: "wall02",
						opType: "play",
						opNode: "wall02",
						timeLen: 0.1,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: false,
									canTap: false
								}
							}
						]
					}
					gameFuncs.op(opInfo7);
					break;
				case 4:
					let opInfo8 = {
						opId: "wall03",
						opType: "play",
						opNode: "wall03",
						timeLen: 0.1,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: false,
									canTap: false
								}
							}
						]
					}
					gameFuncs.op(opInfo8);
					break;
				case 5:
					usersInfos.UseLife++
					if (nowInfos.lifePoint > 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.stopSound("tranActRules")
						roomFunction.stopSound("tranActRules02")
						roomFunction.playSoundTivite(false, "wrong", "negative");
						wujinPlusFuncs.wallMoveTwoThree(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
						usersInfos.RetryCount++
						engine.log("chongqiqqqqqqqqqq")
					} else if (nowInfos.lifePoint == 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.playSoundTivite(false, "wrong", "negative");

						wanFa_wujinPlus.gameLevelEnd()

					}
					break;
			}

		}, 1000);



	},
	wallMoveTwoThree(randm) {
		//tranInfos.removeWall = 0
		let opInfo = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 40
							},
							"rb": {
								"x": 15,
								"y": 41
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo);
		let opInfo2 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall01", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 38
							},
							"rb": {
								"x": 15,
								"y": 39
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall02", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 35
							},
							"rb": {
								"x": 15,
								"y": 37
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo3);
		let opInfo4 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall03", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 32
							},
							"rb": {
								"x": 15,
								"y": 34
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo4);



	},
	blueShowOneThree() {
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			canTapNum.push(Firstchart[i])
		}
		engine.log(canTapNum)
		for (let i = 0; i < canTapNum.length; i++) {
			let opInfo2 = {
				opId: "green" + canTapNum[i],
				opType: "play",
				opNode: "green00" + canTapNum[i],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
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
					}
				]
			}
			gameFuncs.op(opInfo2);
			let opInfo1 = {
				opId: "blue" + canTapNum[i],
				opType: "play",
				opNode: "blue00" + canTapNum[i],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: colorList[i][0],
									g: colorList[i][1],
									b: colorList[i][2],
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo1);
		}
	},
	//控制地面和按钮随机亮起
	blueShowThree() {
		let chart = 0
		while (true) {
			chart = Math.floor(Math.random() * 23)
			if (canTapNum.indexOf(chart) === -1) {
				break
			}
		}
		canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]] = chart
		engine.log("canTapNum[]" + canTapNum)
		tranInfos.wallNum = 0
		wujinPlusFuncs.wallMoveThree()
		let opInfo2 = {
			opId: "green" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
			opType: "play",
			opNode: "green00" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
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
				}
			]
		}
		gameFuncs.op(opInfo2);
	},
	blueNoTapThree(randm) {
		engine.log("radm" + randm)
		engine.log("colorList[randm][0]" + colorList[randm][0])
		engine.log("colorList[randm][0]" + colorList[randm][1])
		engine.log("colorList[randm][0]" + colorList[randm][2])

		let opInfo99 = {
			opId: "blue" + canTapNum[randm],
			opType: "play",
			opNode: "blue00" + canTapNum[randm],
			timeLen: 1,
			loop: "true",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						shape: {
							rgba: {
								r: colorList[randm][0],
								g: colorList[randm][1],
								b: colorList[randm][2],
								a: 1
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false,
						canTap: true,
						shape: {
							rgba: {
								r: colorList[randm][0],
								g: colorList[randm][1],
								b: colorList[randm][2],
								a: 1
							}
						}
					}
				},
			]
		}
		gameFuncs.op(opInfo99);
		let opInfo = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 40
							},
							"rb": {
								"x": 15,
								"y": 41
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo);
		let opInfo2 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall01", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 38
							},
							"rb": {
								"x": 15,
								"y": 39
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall02", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 35
							},
							"rb": {
								"x": 15,
								"y": 37
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo3);
		let opInfo4 = {
			opId: "addWall", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "wall03", // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					//rotation: 180, // 角度
					//anchorPt: { x: 0.5, y: 0.5 }, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": 0,
								"y": 32
							},
							"rb": {
								"x": 15,
								"y": 34
							}
						},
						//"ringWidth": 1,
						rgba: {
							r: colorList[randm][0],
							g: colorList[randm][1],
							b: colorList[randm][2],
							a: 1
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo4);
	},
	blueForThree() {
		for (let i = 0; i < 24; i++) {
			let opInfo1 = {
				opId: "blue" + i,
				opType: "play",
				opNode: "blue00" + i,
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo1);

			let opInfo2 = {
				opId: "green" + i,
				opType: "play",
				opNode: "green00" + i,
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo2);

		}
	},
	redPlay13() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTapThree(face, x, y, onOff, nodeId, event) {
		// engine.log("blue--------" + tranInfos.blueProject)

		if (nodeId == ("blue00" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]]) && onOff == true && dontMove == 1 && tranInfos.blueProject == 1) {
			usersInfos.ValidTarget++
			wujinPlusFuncs.wallMoveTwoThree(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
			clearInterval(wujinPlusFuncs.wallMoveThree.wallCode)
			let opInfo1 = {
				opId: "blue" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
				opType: "play",
				opNode: "blue00" + canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]],
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo1);
			tranInfos.blueProject = 0
			let opInfo2 = {
				opId: "greenFlase" + canTapNum[0],
				opType: "play",
				opNode: "green00" + canTapNum[0],
				timeLen: 6,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}

			// gameFuncs.op(opInfo2);

			engine.log("tranInfos.whoClos--=" + tranInfos.whoClos)
			engine.log("tranInfos.remonber999=" + tranInfos.remonber)
			//cxxxx = Math.floor(Math.random() * (usersInfos.usersResult.length))
			if (usersInfos.usersResult.length <= 3) {
				arrNew.shift()

			} else if (usersInfos.usersResult.length >= 3) {
				qishi.shift()
			}
			engine.log("qishi---" + arrNew)
			tranInfos.remonber = canTapNum
			tranInfos.whoClos = canTapNum[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]]
			wujinPlusFuncs.blueShowThree()
			wujinPlusFuncs.blueNoTapThree(usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0])
			if (nowInfos.target > 1) {
				roomFunction.playSoundTivite(false, "pick", "positive")
				nowInfos.target--
				nowInfos.allTarget++
				usersInfos.gameScore += 5
				usersInfos.levelScore += 5
				wujinPlusFuncs.ScorePlay()
			} else if (nowInfos.target == 1) {
				roomFunction.playSoundTivite(false, "pick", "positive")
				nowInfos.target--
				nowInfos.allTarget++
				usersInfos.gameScore += 5
				usersInfos.levelScore += 5
				wujinPlusFuncs.ScorePlay()
				pickInfos.screenCirCtl = 1
				wujinPlusFuncs.tiaoWin()
			}
		}



	},
	greenTapTwo(face, x, y, onOff, nodeId, event) {
		if (face == "b" && (nodeId == ("green00" + canTapNum[canTapNum.length - 1])) && onOff == true && dontMove == 0) {
			tranInfos.blueProject = 1
		}
	},

	greenTapThree(face, x, y, onOff, nodeId, event) {
		if (face == "b" && (nodeId == ("green00" + tranInfos.remonber[usersInfos.usersResult.length <= 3 ? arrNew[0] : qishi[0]])) && onOff == true) {
			tranInfos.blueProject = 1
			engine.log("tranInfos.whoClos2=====" + tranInfos.whoClos)
			let opInfo6 = {
				opId: "greenmei" + tranInfos.whoClos,
				opType: "play",
				opNode: "green00" + tranInfos.whoClos,
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}

			gameFuncs.op(opInfo6);
			let opInfo7 = {
				opId: "bluemei" + tranInfos.whoClos,
				opType: "play",
				opNode: "blue00" + tranInfos.whoClos,
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
				]
			}

			gameFuncs.op(opInfo7);
		}
	},

	//默契挑战

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
		objectPlace.leave61 = wujinPlusFuncs.generateRandomArray([], 60)
		objectPlace.leave62 = wujinPlusFuncs.generateRandomArray([], 60)
		objectPlace.leave63 = wujinPlusFuncs.generateRandomArray([], 60)
		objectPlace.leave71 = wujinPlusFuncs.generateRandomArray([], 50)
		objectPlace.leave72 = wujinPlusFuncs.generateRandomArray([], 50)
		objectPlace.leave73 = wujinPlusFuncs.generateRandomArray([], 50)
		objectPlace.leave81 = wujinPlusFuncs.generateRandomArray([], 40)
		objectPlace.leave82 = wujinPlusFuncs.generateRandomArray([], 40)
		objectPlace.leave83 = wujinPlusFuncs.generateRandomArray([], 40)
		objectPlace.leave91 = wujinPlusFuncs.generateRandomArray([], 30)
		objectPlace.leave92 = wujinPlusFuncs.generateRandomArray([], 30)
		objectPlace.leave93 = wujinPlusFuncs.generateRandomArray([], 30)
		objectPlace.leave101 = wujinPlusFuncs.generateRandomArray([], 20)
		objectPlace.leave102 = wujinPlusFuncs.generateRandomArray([], 20)
		objectPlace.leave103 = wujinPlusFuncs.generateRandomArray([], 20)

		let result = nowInfos.nowGameid.replace(/[^0-9]/g, '');
		let placeName = "leave" + levelInfos.level + result
		pintuInfos.targetPointArray = objectPlace[(placeName).toString()]
	},





	//判定错误并播放错误音效，减生命值。
	tapWrongMoQi(face, x, y, onOff, nodeId, event) {
		if (pintuInfos.hhhhh.some(item => item == ([x, (y > 15 ? y + 14 : y + 28)])) && nowInfos.lifePoint != 0) {
			fastop.removeNode("caita" + x + "-" + y, "caita" + x + "-" + (y > 15 ? y - 14 : y + 14))
		}
		if (nowInfos.lifeProtect == 0) {
			nowInfos.lifeProtect = 1;
			setTimeout(function () {
				nowInfos.lifeProtect = 0
				fastop.removeNode("wrongRedRemove", "wrongRed")
			}, 2000);
			wujinPlusFuncs.addBlinkMoQi(x, y)
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
				wanFa_wujinPlus.gameLevelEnd()
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
						wanFa_wujinPlus.gameLevelEnd()
					}
				}
			}
			wujinPlusFuncs.colorChangeTap.kouxue = setTimeout(() => {
				if (!(pintuInfos.hhhhh.some(item => item == ([x, y + 28]))) || gameId != nowInfos.nowGameid) {
					return
				}
				this.tapWrongMoQi(face, x, (y + 14), onOff, nodeId, event)
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
						wanFa_wujinPlus.gameLevelEnd()
					}
				}

			}
			wujinPlusFuncs.colorChangeTap.kouxue = setTimeout(() => {
				if (!(pintuInfos.hhhhh.some(item => item == ([x, y + 14]))) || gameId != nowInfos.nowGameid) {
					return
				}
				this.tapWrongMoQi(face, x, (y - 14), onOff, nodeId, event)
			}, 1000);
		}
		if (((y > 3 && y < 14) && onOff == true && !isMeetOne) || ((y > 16 && y < 28) && onOff == true && !isMeetTwo)) {
			this.tapWrongMoQi(face, x, y, onOff, nodeId, event)
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

	addBlinkMoQi(x, y) {
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




	CountPlayThree() {
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
					//userScore: pickInfos.block2Infos[i]
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
						value1: nowInfos.gameCountTime - 1
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "目标块数",
						value1: nowInfos.target
					}
				}
			}
			gameFuncs.op(opInfo)
		}, 100)
	},
	//基础红绿蓝游戏内屏倒计时、目标数量、得分显示。该函数用于刷新得分。
	ScorePlayThree() {
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
					value1: nowInfos.gameCountTime - 1
				},
				block3: {
					model: "dis_b_numUnit",
					label1: "目 标 块 数",
					value1: nowInfos.target
				},
			}
		}
		gameFuncs.op(opInfo)
	},
	//生日惊喜定制
	// happyBegin() {
	// 	clearTimeout(wanFa_wujinPlus.gamePlay.clearTime)
	// 	fastop.addNode("addStop", "StopRed", "a", 0, 0, 254, 254, 0)
	// 	engine.removeEventListener("gamePlay", wanFa_wujinPlus.gamePlay)
	// 	wujinPlusFuncs.happyBegin.happy = setTimeout(() => {
	// 		roomFunction.stopSound("haiPlusBgm02")
	// 		roomFunction.playSound(true, "happil", "background")
	// 		roomFunction.goToGameLevel("haisrkl-JA-cxx", "none")
	// 		nowInfos.gameCountTime = 999;
	// 	}, 1000);
	// 	if (nodeId == "StopRed" && onOff == false) {
	// 		engine.log("清除定时器")
	// 		clearTimeout(wujinPlusFuncs.happyBegin.happy)
	// 	}

	// },
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true && cuowu == 0) {
				nowInfos.lifeProtect = 1;
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				wujinPlusFuncs.tapWrong.determine = setTimeout(() => {
					wujinPlusFuncs.addBlink(x, y)
					usersInfos.UseLife++
					if (nowInfos.lifePoint > 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.playSound(false, "wrong", "negative");
						if (nowInfos.lifePoint == 3) {
							roomFunction.playSound(false, "life")
						}
					} else if (nowInfos.lifePoint == 1) {
						nowInfos.lifePoint--;
						gameRules.lifeMove();
						roomFunction.playSound(false, "wrong", "negative");
						usersInfos.RetryCount++
						wanFa_wujinPlus.gameLevelEnd()
						//lose动画
						cuowu = 1
						//roomFunction.goToGameLevel("haiColor-cxx", "none")
						// wujinPlusFuncs.tapWrong.awa = setTimeout(() => {
						// 	if (nowInfos.gameCountTime <= 0) {
						// 		clearTimeout(wujinPlusFuncs.tapWrong.awa)
						// 		return
						// 	}
						// 	roomFunction.goToGameLevel(nowInfos.nowGameid, "none")
						// 	nowInfos.lifePoint = 6
						// 	gameRules.lifeMove();
						// 	cuowu = 0
						// 	// roomFunction.goToGameLevel("haiColor-cxx", "none")//32go
						// 	engine.log(nowInfos.nowGameid)
						// 	if (nowInfos.nowGameid != "haizhibo001-hf") {
						// 		setTimeout(() => {
						// 			wujinPlusFuncs.tiaoWin()
						// 		}, 1000);
						// 	}

						// }, 2000);
					}
				}, 75);

			}

		}
	},
	// blueFor() {
	// 	for (let i = 1; i < 25; i++) {
	// 		let opInfo1 = {
	// 			opId: "blue" + i,
	// 			opType: "play",
	// 			opNode: "blue" + i,
	// 			timeLen: 0.1,
	// 			loop: "false",
	// 			keyFrames: [
	// 				{
	// 					t: 0,
	// 					keyFrame: {
	// 						visible: true,
	// 						canTap: true
	// 					}
	// 				}
	// 			]
	// 		}
	// 		gameFuncs.op(opInfo1)
	// 	}
	// },
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
	tiaoWin() {
		if (clearNum == 999) {
			clearInterval(wujinPlusFuncs.tiaoWin.Athree)
			return
		}
		fastop.addWujin("addBlack000", "black000", "a", 0, 0, 23, 0, 0, 0, 0)
		fastop.addWujin("addBlack001", "black001", "b", 0, 0, 15, 31, 0, 0, 0)
		fastop.addWujin("addBlack002", "black002", "b", 0, 32, 15, 41, 0, 0, 0)
		countNum = 1//时间控制
		tranInfos.removeWall = 1//颜色传递
		nowInfos.allTarget = 0;
		clearInterval(wanFa_wujinPlus.gamePlay.innerCountThree)
		roomFunction.stopSound("haiPlusBgm02")
		roomFunction.stopSound("colorBgm")
		roomFunction.stopSound("chestbgm")
		roomFunction.stopSound("Duobi")
		roomFunction.stopSound("pintuBgm")
		roomFunction.stopSound("tranActBgm")
		roomFunction.stopSound("tranBgm")
		roomFunction.stopSound("tranActBgm")
		roomFunction.stopSound("mutouren")
		roomFunction.stopSound("mutourenBgm1.2x")
		roomFunction.stopSound("mutourenBgm1.4x")
		roomFunction.stopSound("mutourenBgm1.5x")
		roomFunction.stopSound("mutourenBgm2x")
		roomFunction.stopSound("chestnb")
		roomFunction.stopSound("chestbgm")
		nowInfos.lifePoint = 6;
		gameRules.lifeMove();
		roomFunction.playSoundTivite(false, "321Go", "positive")
		wujinPlusFuncs.addRed5()
		wujinPlusFuncs.tiaoWin.Athree = setInterval(() => {
			clearNum++
			switch (clearNum) {
				case 1:
					wujinPlusFuncs.oneFor()
					wujinPlusFuncs.addRed6()
					break;
				case 2:
					wujinPlusFuncs.oneFor1()
					wujinPlusFuncs.addRed90()
					break;
				case 3:
					wujinPlusFuncs.oneFor90()
					wujinPlusFuncs.addRed3()
					wujinPlusFuncs.addRed4()
					break;
				case 4:
					// fastop.removeNode("rmBlack000", "black000")
					// fastop.removeNode("rmBlack001", "black001")
					// fastop.removeNode("rmBlack002", "black002")
					clearInterval(wujinPlusFuncs.tiaoWin.Athree)
					roomFunction.goToNextGame()
					countNum = 0
					break;
			}
		}, 1000);
	},
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		//engine.log(nodeId)
		if (nodeId.startsWith("blue") || nodeId.startsWith("mubiao001.blue") || nodeId.startsWith("mubiao002.blue") || nodeId.startsWith("mubiao003.blue")) {
			if (onOff == true) {
				usersInfos.ValidTarget++


				if (nowInfos.target > 1) {
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSoundTivite(false, "ok", "positive")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					// usersInfos.levelScore += nowInfos.scoreCoefficient;
					wujinPlusFuncs.ScorePlay()

				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						// usersInfos.levelScore += nowInfos.scoreCoefficient;
						wujinPlusFuncs.ScorePlay();
						//nowInfos.gameCountTime += 30
						change = 1//过长动画时间暂停
						engine.log("32go--------next")
						winLose = 0
						// roomFunction.goToGameLevel("haiColor-cxx", "none")//32go
						// setTimeout(() => {
						guole++
						engine.log(guole + "[][][[[][][][][][][]")
						//roomFunction.goToNextGame();
						//clearInterval(wujinPlusFuncs.tiaoWin.Athree)
						wujinPlusFuncs.tiaoWin()
						roomFunction.stopSound("fenwei")
						roomFunction.playSound(false, "levelup", "positive")
						// }, 2000);
					}
				}
			}
		}
	},
	oneFor() {
		let opInfo1 = {
			opId: "one222",
			opType: "play",
			opNode: "one222",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: false,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo1)
	},
	oneFor1() {
		let opInfo2 = {
			opId: "one223",
			opType: "play",
			opNode: "one223",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: false,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo2)
	},
	oneFor90() {
		let opInfo2 = {
			opId: "one01",
			opType: "play",
			opNode: "one01",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: false,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo2)
	},
	addRed3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "go001",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 11,
							y: 33
						},
						rb: {
							x: 13,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "go002",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 10,
									y: 34
								},
								rb: {
									x: 10,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go003",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 11,
									y: 40
								},
								rb: {
									x: 13,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go004",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 14,
									y: 37
								},
								rb: {
									x: 14,
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

					},
					{
						nodeId: "go005",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 12,
									y: 36
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

					},
					{
						nodeId: "go006",
						surface: "b",
						pt: {
							x: 11,
							y: 37
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},

				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed4() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "go007",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 5,
							y: 34
						},
						rb: {
							x: 6,
							y: 34
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "go008",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 3,
									y: 36
								},
								rb: {
									x: 3,
									y: 38
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go009",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 8,
									y: 36
								},
								rb: {
									x: 8,
									y: 38
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "go010",
						surface: "b",
						pt: {
							x: 4,
							y: 35
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go011",
						surface: "b",
						pt: {
							x: 7,
							y: 35
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go012",
						surface: "b",
						pt: {
							x: 4,
							y: 39
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go013",
						surface: "b",
						pt: {
							x: 7,
							y: 39
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go014",
						surface: "b",
						pt: {
							x: 1,
							y: 33
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go015",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 1,
									y: 36
								},
								rb: {
									x: 1,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "go016",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 40
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},


				]
			}]
		}
		gameFuncs.op(opInfo1)

		setTimeout(() => {
			fastop.removeNode("nmd", "go001")
			fastop.removeNode("cnmd", "go007")
		}, 2000);

	},
	//数字3
	addRed5() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one222",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 7,
							y: 33
						},
						rb: {
							x: 8,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "one002",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 34
								},
								rb: {
									x: 6,
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
					},
					{
						nodeId: "one003",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 37
								},
								rb: {
									x: 8,
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
					},
					{
						nodeId: "one004",
						surface: "b",
						pt: {
							x: 9,
							y: 34
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one005",
						surface: "b",
						pt: {
							x: 9,
							y: 40
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one006",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 38
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one007",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 41
								},
								rb: {
									x: 8,
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

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字2
	addRed6() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one223",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 6,
							y: 33
						},
						rb: {
							x: 8,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "one009",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 9,
									y: 33
								},
								rb: {
									x: 9,
									y: 35
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "one010",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 38
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "one011",
						surface: "b",
						pt: {
							x: 8,
							y: 36
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one012",
						surface: "b",
						pt: {
							x: 7,
							y: 37
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "one013",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 41
								},
								rb: {
									x: 8,
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

					},
					{
						nodeId: "one014",
						surface: "b",
						pt: {
							x: 9,
							y: 40
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed7() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "lose001",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 0,
							y: 34
						},
						rb: {
							x: 2,
							y: 34
						}
					},
					rgba: {
						r: 254,
						g: 0,
						b: 0,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "lose0099999999",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}
					},
					{
						nodeId: "lose002",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 2,
									y: 35
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
					},
					{
						nodeId: "lose003",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 37
								},
								rb: {
									x: 1,
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
					},
					{
						nodeId: "lose004",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 40
								},
								rb: {
									x: 2,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose005",
						surface: "b",
						pt: {
							x: 7,
							y: 35
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose006",
						surface: "b",
						pt: {
							x: 4,
							y: 39
						},
						visible: true,
						canTap: true,
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
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose007",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 34
								},
								rb: {
									x: 6,
									y: 34
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose008",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 4,
									y: 35
								},
								rb: {
									x: 4,
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

					},
					{
						nodeId: "lose009",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 37
								},
								rb: {
									x: 6,
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

					},
					{
						nodeId: "lose010",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 38
								},
								rb: {
									x: 7,
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

					},
					{
						nodeId: "lose011",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 5,
									y: 40
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose012",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 10,
									y: 34
								},
								rb: {
									x: 11,
									y: 34
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose013",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 9,
									y: 35
								},
								rb: {
									x: 9,
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

					},
					{
						nodeId: "lose014",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 12,
									y: 35
								},
								rb: {
									x: 12,
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

					},
					{
						nodeId: "lose015",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 10,
									y: 40
								},
								rb: {
									x: 11,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose016",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 13,
									y: 34
								},
								rb: {
									x: 15,
									y: 34
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
					{
						nodeId: "lose017",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 15,
									y: 35
								},
								rb: {
									x: 15,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字3
	num3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [
				{
					nodeId: "one001",
					surface: "b",
					pt: {
						x: 0,
						y: 0
					},
					visible: true,
					canTap: true,
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 7,
								y: 33
							},
							rb: {
								x: 8,
								y: 33
							}
						},
						rgba: {
							r: 254,
							g: 69,
							b: 0,
							a: 1
						}
					},
					nodes: [
						{
							nodeId: "one002",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},

							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 6,
										y: 34
									},
									rb: {
										x: 6,
										y: 36
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}
						},
						{
							nodeId: "one003",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},
							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 7,
										y: 37
									},
									rb: {
										x: 8,
										y: 37
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}
						},
						{
							nodeId: "one004",
							surface: "b",
							pt: {
								x: 9,
								y: 34
							},
							visible: true,
							canTap: true,
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

						},
						{
							nodeId: "one005",
							surface: "b",
							pt: {
								x: 9,
								y: 40
							},
							visible: true,
							canTap: true,
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

						},
						{
							nodeId: "one006",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},
							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 6,
										y: 38
									},
									rb: {
										x: 6,
										y: 40
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}

						},
						{
							nodeId: "one007",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},
							visible: true,
							canTap: true,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 7,
										y: 41
									},
									rb: {
										x: 8,
										y: 41
									}
								},
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}

						}
					]
				}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字2
	num2() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one008",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				visible: true,
				canTap: true,
				shape: {
					type: "rect",
					rect: {
						lt: {
							x: 6,
							y: 33
						},
						rb: {
							x: 8,
							y: 33
						}
					},
					rgba: {
						r: 254,
						g: 20,
						b: 147,
						a: 1
					}
				},
				nodes: [
					{
						nodeId: "one009",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},

						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 9,
									y: 33
								},
								rb: {
									x: 9,
									y: 35
								}
							},
							rgba: {
								r: 254,
								g: 20,
								b: 147,
								a: 1
							}
						}
					},
					{
						nodeId: "one010",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 6,
									y: 38
								},
								rb: {
									x: 6,
									y: 40
								}
							},
							rgba: {
								r: 254,
								g: 20,
								b: 147,
								a: 1
							}
						}
					},
					{
						nodeId: "one011",
						surface: "b",
						pt: {
							x: 8,
							y: 36
						},
						visible: true,
						canTap: true,
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
								g: 20,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one012",
						surface: "b",
						pt: {
							x: 7,
							y: 37
						},
						visible: true,
						canTap: true,
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
								g: 20,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one013",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						visible: true,
						canTap: true,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 7,
									y: 41
								},
								rb: {
									x: 8,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 20,
								b: 147,
								a: 1
							}
						}

					},
					{
						nodeId: "one014",
						surface: "b",
						pt: {
							x: 9,
							y: 40
						},
						visible: true,
						canTap: true,
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
								g: 20,
								b: 147,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字1
	addRed8() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one015",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 35
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 8,
							y: 36
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 8,
							y: 39
						},
						{
							x: 8,
							y: 40
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
					],
					rgba: {
						r: 139,
						g: 69,
						b: 19,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRedTwo8() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one015",
			nodes: [{
				nodeId: "one015",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 35
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 8,
							y: 36
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 8,
							y: 39
						},
						{
							x: 8,
							y: 40
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
					],
					rgba: {
						r: 139,
						g: 69,
						b: 19,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed90() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one01",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 35
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 8,
							y: 36
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 8,
							y: 39
						},
						{
							x: 8,
							y: 40
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
					],
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
	},
	//数字4
	addRed9() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one016",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 41
						},
					],
					rgba: {
						r: 148,
						g: 0,
						b: 211,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字5
	addRed10() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one017",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 8,
							y: 38
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 41
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
					],
					rgba: {
						r: 50,
						g: 205,
						b: 50,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字6
	addRed11() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one018",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 9,
							y: 36
						},
						{
							x: 9,
							y: 37
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
					],
					rgba: {
						r: 30,
						g: 104,
						b: 254,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字7
	addRed12() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one019",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 8,
							y: 33
						},
						{
							x: 8,
							y: 34
						},
						{
							x: 8,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 41
						},
					],
					rgba: {
						r: 254,
						g: 215,
						b: 0,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字8
	addRed13() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one020",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 9,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
					],
					rgba: {
						r: 0,
						g: 254,
						b: 204,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字9
	addRed14() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one021",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 7,
							y: 33
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 6,
							y: 34
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 6,
							y: 38
						},
						{
							x: 6,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 8,
							y: 37
						},
						{
							x: 7,
							y: 41
						},
						{
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 38
						},
					],
					rgba: {
						r: 254,
						g: 204,
						b: 102,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字10
	addRed15() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one022",
				surface: "b",
				pt: {
					x: 0,
					y: 0
				},
				rotation: 0,
				visible: true,
				canTap: false,
				size: {
					w: 0,
					h: 0
				},
				anchorPt: {
					x: 0,
					y: 0
				},
				shape: {
					type: "point",
					points: [
						{
							x: 5,
							y: 33
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 4,
							y: 34
						},
						{
							x: 4,
							y: 35
						},
						{
							x: 4,
							y: 36
						},
						{
							x: 4,
							y: 37
						},
						{
							x: 4,
							y: 38
						},
						{
							x: 4,
							y: 39
						},
						{
							x: 4,
							y: 40
						},
						{
							x: 5,
							y: 41
						},
						{
							x: 6,
							y: 41
						},
						{
							x: 7,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 7,
							y: 36
						},
						{
							x: 7,
							y: 37
						},
						{
							x: 7,
							y: 38
						},
						{
							x: 7,
							y: 39
						},
						{
							x: 7,
							y: 40
						},
						{
							x: 8,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 34
						},
						{
							x: 9,
							y: 35
						},
						{
							x: 9,
							y: 36
						},
						{
							x: 9,
							y: 37
						},
						{
							x: 9,
							y: 38
						},
						{
							x: 9,
							y: 39
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 9,
							y: 41
						},
						{
							x: 10,
							y: 39
						},
					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
			}]
		}
		gameFuncs.op(opInfo1)
	},
	redPlay4() {
		let opInfo1 = {
			opId: "redMove",
			opType: "play",
			opNode: "red999",
			timeLen: 20,
			loop: "true",
			keyFrames: [

				{
					t: 0.5,
					keyFrame: {
						visible: "true",
						canTap: "true",
						// surface: "a",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 41
								},
								rb: {
									x: 15,
									y: 41
								}
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						// surface: "a",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 15,
									y: 0
								}
							}
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo1);
	},
	addRed() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red998",
			nodes: [{
				nodeId: "red998",
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
							y: 5
						},
						rb: {
							x: 15,
							y: 6
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
			opNode: "red997",
			nodes: [{
				nodeId: "red997",
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
							y: 10
						},
						rb: {
							x: 15,
							y: 11
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
			opNode: "red996",
			nodes: [{
				nodeId: "red996",
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
							y: 15
						},
						rb: {
							x: 15,
							y: 16
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
			opNode: "red995",
			nodes: [{
				nodeId: "red995",
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
							y: 20
						},
						rb: {
							x: 15,
							y: 21
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

	},
	addRed1() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red999",
			nodes: [{
				nodeId: "red999",
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
							y: 3
						},
						rb: {
							x: 0,
							y: 31
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
			opNode: "red998",
			nodes: [{
				nodeId: "red998",
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
							y: 3
						},
						rb: {
							x: 3,
							y: 31
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
			opNode: "red997",
			nodes: [{
				nodeId: "red997",
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
							x: 6,
							y: 3
						},
						rb: {
							x: 6,
							y: 31
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
			opNode: "red996",
			nodes: [{
				nodeId: "red996",
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
							y: 3
						},
						rb: {
							x: 9,
							y: 31
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
			opNode: "red995",
			nodes: [{
				nodeId: "red995",
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
							x: 12,
							y: 3
						},
						rb: {
							x: 12,
							y: 31
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
			opNode: "red994",
			nodes: [{
				nodeId: "red994",
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
							y: 3
						},
						rb: {
							x: 15,
							y: 31
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
	},
	addBlue() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2026", "a", 17, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "b", 9, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2041", "b", 5, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2043", "b", 4, 4, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "b", 5, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "b", 6, 8, 0, 0, 254)
		fastop.addNode("addBlue", "blue2046", "b", 1, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2047", "b", 4, 12, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "b", 6, 13, 0, 0, 254)
		fastop.addNode("addBlue", "blue2049", "b", 8, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue2050", "b", 7, 17, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "b", 11, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2052", "b", 6, 25, 0, 0, 254)
		fastop.addNode("addBlue", "blue2053", "b", 9, 24, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "b", 11, 28, 0, 0, 254)
	},
	addBlue1() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2026", "a", 17, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "b", 9, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2041", "b", 5, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2043", "b", 1, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "b", 2, 13, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "b", 2, 20, 0, 0, 254)
		fastop.addNode("addBlue", "blue2046", "b", 4, 8, 0, 0, 254)
		fastop.addNode("addBlue", "blue2047", "b", 4, 21, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "b", 5, 17, 0, 0, 254)
		fastop.addNode("addBlue", "blue2049", "b", 8, 5, 0, 0, 254)
		fastop.addNode("addBlue", "blue2050", "b", 8, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "b", 7, 26, 0, 0, 254)
		fastop.addNode("addBlue", "blue2052", "b", 11, 12, 0, 0, 254)
		fastop.addNode("addBlue", "blue2053", "b", 10, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "b", 14, 13, 0, 0, 254)
	},
	addBlue2() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "a", 3, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2043", "a", 8, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "a", 9, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "a", 10, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2047", "a", 12, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "a", 13, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2050", "a", 15, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "a", 19, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2053", "a", 21, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "a", 22, 0, 0, 0, 254)
	},
	addBlue3() {
		fastop.addNode("addBlue", "blue201", "a", 1, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2011", "a", 2, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2013", "a", 4, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2015", "a", 6, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2016", "a", 7, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2026", "a", 17, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2032", "a", 0, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		fastop.addNode("addBlue", "blue2042", "b", 8, 8, 0, 0, 254)
		fastop.addNode("addBlue", "blue2041", "b", 11, 5, 0, 0, 254)
		fastop.addNode("addBlue", "blue2043", "b", 5, 11, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "b", 7, 17, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "b", 8, 18, 0, 0, 254)
		fastop.addNode("addBlue", "blue2066", "b", 4, 24, 0, 0, 254)
		fastop.addNode("addBlue", "blue2047", "b", 6, 28, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "b", 13, 3, 0, 0, 254)
		fastop.addNode("addBlue", "blue2088", "b", 13, 31, 0, 0, 254)
		fastop.addNode("addBlue", "blue2050", "b", 12, 24, 0, 0, 254)
		fastop.addNode("addBlue", "blue2049", "a", 14, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2054", "a", 22, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2052", "a", 20, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2046", "a", 11, 0, 0, 0, 254)
	},

	randomBlue(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 15)
			let y = Math.floor(Math.random() * 31)
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
				opNode: "blue200",
				nodes: [{
					nodeId: "blue" + i,
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
	randomBlue2(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 23)
			let y = Math.floor(Math.random() * 0)
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
					surface: "a",
					pt: {
						x: x,
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
								y: 0
							},
							rb: {
								x: 0,
								y: 0
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
	randomBlue1(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 15)
			let y = Math.floor(Math.random() * 28)
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
				opNode: "blue200",
				nodes: [{
					nodeId: "blue" + i,
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
		wujinPlusFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
			if (countNum == 1) {
				clearInterval(wujinPlusFuncs.CountPlay.innerCount)
				return
			}
			if (nowInfos.nowGameid != "chest006-lyc" && nowInfos.nowGameid != "pintu2-hf") {
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
			} else if (nowInfos.nowGameid == "chest006-lyc") {
				let opInfo1 = {
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
							label2: "剩余个数",
							value2: targetNum - yesNum
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
				gameFuncs.op(opInfo1);
			} else if (nowInfos.nowGameid == "pintu2-hf") {
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
			}
			if (change == 0) {
				nowInfos.gameCountTime--;
			}
			if (nowInfos.gameCountTime == 5) {
				roomFunction.playSound(false, "fenwei")
			}
			if (nowInfos.gameCountTime == 0 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
				if (nowInfos.nowGameid == "duobi002-rah") {
					duobiVar.look = 1//极限躲避
					fff = 1
					clearInterval(wujinPlusFuncs.RandomRedPoint.useCount)
					clearInterval(wujinPlusFuncs.MoveLine.useCount)
				}
				if (nowInfos.nowGameid == "mutouren001-lbw") {
					mutourenInfos.gameEndCtl = 1//123木头人
				}
				fastop.addWujin("addBlack002", "black002", "b", 0, 32, 15, 41, 0, 0, 0)
				wujinPlusFuncs.tiaoWin()
			}
			if (nowInfos.gameCountTime == 0 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				wanFa_wujinPlus.gameLevelEnd()
			}
			if (nowInfos.gameCountTime == 10 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				roomFunction.playSound(false, "daoshu10")
			}
			if (nowInfos.nowGameid == "chest006-lyc") {
				yesNum = 0
				for (let i = 0; i < targetList.length; i++) {
					let str = gameFuncs.surfacePointInfo("b", targetList[i][0], targetList[i][1]);
					let info = JSON.parse(str)
					if (info.rgb.R == 152 && info.rgb.G == 101 && info.rgb.B == 0) {
						yesNum++
					}
				}

				if (targetNum - yesNum == 0) {
					if (doubleJump == 0) {
						doubleJump = 1
						wujinPlusFuncs.tiaoWin()
					}
					return
				}
				// if (nowInfos.nowGameid != "chest001-lyc") {
				for (let i = 0; i < 32; i++) {
					for (let j = 0; j < 16; j++) {
						if (neiProtect[i][j].toString().indexOf(".1") != -1) {//qian
							if ((neiProtect[i + 3][j] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian") == -1) || (neiProtect[i - 1][j] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian") == -1)) {
								fastop.setNodeVisible(i + "qian" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian", 0.1, true, true, false, false)
								yinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian隐藏")
								if (byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian") != -1) {
									byinList.splice(byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian"), 1)
								}
							}
							if (neiProtect[i + 3][j] == 0 && neiProtect[i - 1][j] == 0 && byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian") == -1) {
								fastop.setNodeVisible(i + "qian" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian", 0.1, false, false, true, true)
								byinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian显现")
								if (yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian") != -1) {
									yinList.splice(yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".qian"), 1)
								}
							}
						}
						if (neiProtect[i][j].toString().indexOf(".2") != -1) {//hou
							if ((neiProtect[i - 3][j] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou") == -1) || (neiProtect[i + 1][j] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou") == -1)) {
								fastop.setNodeVisible(i + "hou" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou", 0.1, true, true, false, false)
								yinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou隐藏")
								if (byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou") != -1) {
									byinList.splice(byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou"), 1)
								}
							}
							if (neiProtect[i - 3][j] == 0 && neiProtect[i + 1][j] == 0 && byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou") == -1) {
								fastop.setNodeVisible(i + "hou" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou", 0.1, false, false, true, true)
								byinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou显现")
								if (yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou") != -1) {
									yinList.splice(yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".hou"), 1)
								}
							}
						}
						if (neiProtect[i][j].toString().indexOf(".3") != -1) {//left
							if ((neiProtect[i][j + 3] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left") == -1) || (neiProtect[i][j - 1] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left") == -1)) {
								fastop.setNodeVisible(i + "left" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left", 0.1, true, true, false, false)
								yinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left隐藏")
								if (byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left") != -1) {
									byinList.splice(byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left"), 1)
								}
							}
							if (neiProtect[i][j + 3] == 0 && neiProtect[i][j - 1] == 0 && byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left") == -1) {
								fastop.setNodeVisible(i + "left" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left", 0.1, false, false, true, true)
								byinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left显现")
								if (yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left") != -1) {
									yinList.splice(yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".left"), 1)
								}
							}
						}
						if (neiProtect[i][j].toString().indexOf(".4") != -1) {//right
							if ((neiProtect[i][j - 3] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right") == -1) || (neiProtect[i][j + 1] != 0 && yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right") == -1)) {
								fastop.setNodeVisible(i + "right" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right", 0.1, true, true, false, false)
								yinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right隐藏")
								if (byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right") != -1) {
									byinList.splice(byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right"), 1)
								}
							}
							if (neiProtect[i][j - 3] == 0 && neiProtect[i][j + 1] == 0 && byinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right") == -1) {
								fastop.setNodeVisible(i + "right" + j, "chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right", 0.1, false, false, true, true)
								byinList.push("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right")
								engine.log("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right显现")
								if (yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right") != -1) {
									yinList.splice(yinList.indexOf("chest00" + neiProtect[i][j].toString().substring(0, 1) + ".right"), 1)
								}
							}
						}
					}
				}
				// }
				howyin = [0, 0, 0, 0, 0, 0, 0, 0]
				yinxiang = []
				for (let i = 0; i < yinList.length; i++) {
					for (let j = 0; j < targetList.length; j++) {
						if (yinList[i].substring(0, 8) == "chest00" + (j + 1)) {
							howyin[j]++
						}
					}
				}
				for (let i = 0; i < howyin.length; i++) {
					if (howyin[i] == 4) {
						yinxiang.push((i + 1) + ".9")
					}
				}
				// engine.log(yinxiang)
				for (let o = 0; o < yinxiang.length; o++) {
					for (let i = 0; i < 32; i++) {
						for (let j = 0; j < 16; j++) {
							if (neiProtect[i][j] == yinxiang[o]) {
								let jian = []
								for (let x = 0; x < targetList.length; x++) {
									jian[x] = targetList[x][0] + "x" + targetList[x][1]
								}
								let yuan = []
								for (let x = 0; x < woquni.length; x++) {
									yuan[x] = woquni[x][0] + "x" + woquni[x][1]
								}
								if ((jian.indexOf(j + "x" + i) == -1 && yuan.indexOf(j + "x" + i) == -1 && (neiProtect[i + 2][j] == 9 || neiProtect[i - 2][j] == 9 || neiProtect[i][j + 2] == 9 || neiProtect[i][j - 2] == 9)) || (byinList.length < 2 && yesNum !== targetList.length)) {//死角且不在目标点 且不在原本位置 且周围是墙
									if (jian.indexOf(j + "x" + i) == -1 && yuan.indexOf(j + "x" + i) == -1 && (neiProtect[i + 2][j] == 9 || neiProtect[i - 2][j] == 9 || neiProtect[i][j + 2] == 9 || neiProtect[i][j - 2] == 9)) {
										fastop.chestChange(yinxiang[o], "chest00" + neiProtect[i][j].toString().substring(0, 1))
									}
									fang = 1
								}
							}

						}
					}
				}

				for (let i = 0; i < byinList.length; i++) {
					fastop.chest(i, byinList[i])
				}


				if (fang == 1) {
					if (fangmei == 0 && doubleJump == 0) {
						doubleJump = 1
						fangmei = 1
						if (nowInfos.lifePoint != 1) {
							roomFunction.playSound(false, "chestreset");
						} else if (nowInfos.lifePoint == 1) {
							wanFa_wujinPlus.gameLevelEnd()
							return
						}
						nowInfos.gameCountTime += 7
						setTimeout(() => {
							wujinPlusFuncs.reset()
						}, 7000);
						//有箱子推到死角 游戏无法继续 即将重启 321 然后重启
						engine.log("角红砖闪")
					}
				}
				// if (fang == 0) {
				// 	fangmei = 0
				// 	// roomFunction.stopSound("chestnb")
				// }
			}
		}, 1000, (nowInfos.gameCountTime + 6))

	},
	//基础红绿蓝游戏内屏倒计时、目标数量、得分显示。该函数用于刷新得分。
	ScorePlay() {
		if (nowInfos.nowGameid != "pintu2-hf") {
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
		} else if (nowInfos.nowGameid == "pintu2-hf") {
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
		}

	},

	ScorePlayColor() {
		let opInfo1 = {
			opId: "screenScorePlay",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_3b01",
				block1: {
					model: "dis_b_targetColor",
					label1: "目标",
					value1: colorInfos.arrColor[target].value,
					label2: colorInfos.arrColor[target].color,
				},
				block2: {
					model: "dis_b_scoreGame",
					label2: "关卡总分",
					value2: usersInfos.levelScore
				},
				block3: {
					model: "dis_b_scoreGame",
					value1: colorInfos.arrColor[target].value2,
				}
			}
		}
		gameFuncs.op(opInfo1);
	},
}
