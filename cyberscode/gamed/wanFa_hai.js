const wanFa_hai = {
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {

		//添加监听
		engine.addEventListener("gamePlay", wanFa_hai.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_hai.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_hai.gameDestroy);
		//重置全局变量
		haiFuncs.resetAll()
		clearInterval(haiFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}


		engine.log("!!!gameIdList!!!=" + levelInfos.gameIdList)
		cbjh = 0

		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_hai.gameStart.startLoop = setInterval(() => {
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
				case 18:
					if (levelInfos.wanFa.startsWith("hai")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						roomFunction.playSound(true, "bgm01", "background")

					}
					break;
				case 19:
					clearInterval(wanFa_hai.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);


		// setTimeout(function () {
		// 	setTimeout(function () {
		// 		if (nowInfos.nowGameid == "haisrkl-hf") {
		// 			roomFunction.playSound(true, "happil", "background")
		// 		}
		// 		if (nowInfos.nowGameid != "haisrkl-hf") {
		// 			roomFunction.playSound(true, "bgm01", "background")
		// 		}
		// 	}, 2000);
		// 	if (levelInfos.wanFa.startsWith("hai")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 		haiFuncs.CountPlay();
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
		engine.addEventListener("gameTaped", wanFa_hai.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("hai")) {
			let opInfo = {
				opId: "jinbi", //操作id 再控制用
				opType: "addNode", // 操作类型，添加一个节点或精灵
				opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
				nodes: [
					{
						nodeId: "jinbi",
						surface: "b",
						pt: {
							x: 0,
							y: 32
						},
						rotation: 0,
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
								r: 0,
								g: 0,
								b: 0,
								a: 0
							}
						},

					}
				]
			}
			gameFuncs.op(opInfo);
			setTimeout(() => {
				let jinbiArr = [4, 35, 4, 36, 4, 37, 4, 38, 5, 33, 5, 34, 5, 39, 5, 40, 6, 32, 6, 41, 7, 32, 7, 34, 7, 35, 7, 36, 7, 37, 7, 38, 7, 39, 7, 41, 8, 32, 8, 41, 9, 33, 9, 34, 9, 39, 9, 40, 10, 35, 10, 36, 10, 37, 10, 38]
				for (let i = 0; i < jinbiArr.length; i += 2) {
					let opInfo = {
						opId: "jinbi" + i, //操作id 再控制用
						opType: "addNode", // 操作类型，添加一个节点或精灵
						opNode: "jinbi", // 父节点，如果没有配置，默认到棋盘根节点0,0
						nodes: [
							{
								nodeId: "jinbi" + i,
								surface: "b",
								pt: {
									x: jinbiArr[i],
									y: (jinbiArr[i + 1] - 32)
								},
								rotation: 0,
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
										g: 150,
										b: 0,
										a: 1
									}
								},

							}
						]
					}
					gameFuncs.op(opInfo);
				}
			}, 100);



			if (levelInfos.level != 1) {
				nowInfos.gameCountTime = 40
				nowInfos.target = 30;
				if (levelInfos.level != 1 && aaa == 0) {
					setTimeout(function () {
						roomFunction.playSoundTivite(false, "rgbrule", "positive")
					}, 3500);
					aaa = 1
				}
				roomFunction.playSound(false, "togreen")
				roomFunction.playSoundTivite(false, "fenwei3", "positive")
				nowInfos.nowGameid = gameid;
				gameRules.lifeMove();


			}

			if (gameid == "hai9916-cxx") {
				nowInfos.target = 50
			}
			if (gameid == "hai017-ljc") {
				nowInfos.target = 24
				setTimeout(() => {
					haiFuncs.blueFor()
				}, 6000);
			}
			if (gameid == "hai17-cxx") {
				setTimeout(() => {
					haiFuncs.randomBlue2(15)
					let hefeng99 = setInterval(() => {
						if (fff == 1) {
							clearInterval(hefeng99)
							engine.log("131231----")
							return
						}
						haiFuncs.randomBlue2(15)
					}, 10000);
				}, 6000);
				nowInfos.target = 30

			}
			if (gameid == "haiGo-cxx") {
				nowInfos.gameCountTime = 100
				haiFuncs.addRed8()//数字1
				setTimeout(() => {
					haiFuncs.oneFor2()//隐藏数字1
					haiFuncs.addRed6()//数字2
				}, 1000);
				setTimeout(() => {
					haiFuncs.oneFor1()//隐藏数字2
					haiFuncs.addRed5()//数字3
					//haiFuncs.addRed3()//go字母
					//haiFuncs.addRed4()//go字母
				}, 2000);
				setTimeout(() => {
					haiFuncs.oneFor()//隐藏数字3
					haiFuncs.addRed9()//数字4
				}, 3000);
				setTimeout(() => {
					haiFuncs.oneFor3()//隐藏数字4
					haiFuncs.addRed10()//数字5
				}, 4000);
				setTimeout(() => {
					haiFuncs.oneFor4()//隐藏数字5
					haiFuncs.addRed11()//数字6
				}, 5000);
				setTimeout(() => {
					haiFuncs.oneFor5()//隐藏数字6
					haiFuncs.addRed12()//数字7
				}, 6000);
				setTimeout(() => {
					haiFuncs.oneFor6()//隐藏数字7
					haiFuncs.addRed13()//数字8
				}, 7000);
				setTimeout(() => {
					haiFuncs.oneFor7()//隐藏数字8
					haiFuncs.addRed14()//数字9
				}, 8000);
				setTimeout(() => {
					haiFuncs.oneFor8()//隐藏数字8
					haiFuncs.addRed15()//数字10
				}, 9000);
				//haiFuncs.addRed7()//lose字样

			}
			if (gameid == "haierzi-cxx") {
				nowInfos.gameCountTime = 20

				haiFuncs.allBlink2()
				//haiFuncs.removeAllBlink()
			}
			if (levelInfos.level == 1) {
				nowInfos.gameCountTime = 50
				gameRules.lifeMove()
				nowInfos.nowGameid = gameid
				if (gameid.startsWith("haiteach001-cxx")) {
					nowInfos.target = 6
					roomFunction.playSound(false, "tishi8")
					// haiFuncs.addGreen3()
					// haiFuncs.greenPlay()
					setTimeout(() => {
						haiFuncs.addBlue2()
						roomFunction.playSound(false, "tishi9")
					}, 5000);
				}
				if (gameid.startsWith("haiteach002-cxx")) {
					nowInfos.target = 42
					//roomFunction.playSound(false,"tishi8")
					roomFunction.playSound(false, "togreen")
					setTimeout(() => {
						haiFuncs.addBlue10()
						roomFunction.playSound(false, "tishi11")
					}, 5000);
				}
				if (gameid.startsWith("haiteach003-cxx")) {
					roomFunction.playSound(false, "award")
					haiFuncs.redPlay4()
					wanFa_hai.gamePlay.teca = setTimeout(() => {
						roomFunction.playSound(false, "tishi6")
					}, 2000);
					nowInfos.gameCountTime = 50
					nowInfos.target = 40

					wanFa_hai.gamePlay.teca1 = setTimeout(() => {
						roomFunction.playSound(false, "tishi10")
					}, 6500);
					wanFa_hai.gamePlay.teca2 = setTimeout(() => {
						haiFuncs.randomBlue(40)
						haiFuncs.addBlue2()
						setTimeout(() => {
							roomFunction.playSound(false, "teachBlue2")
						}, 2000);
						roomFunction.playSound(false, "fenwei2")
					}, 13000);

				}
				if (gameid.startsWith("haiteach004-cxx")) {
					nowInfos.target = 22
					roomFunction.playSound(false, "togreen")
					roomFunction.playSound(false, "fenwei3")
					setTimeout(() => {
						roomFunction.playSound(false, "teachRed")
					}, 5000);
					setTimeout(() => {
						haiFuncs.addBlue44()
						haiFuncs.addRed()
					}, 5000);
					// haiFuncs.greenPlay2()
					// haiFuncs.addGreen()
				}
				if (gameid.startsWith("haiteach005-cxx")) {
					nowInfos.target = 22
					roomFunction.playSound(false, "togreen")
					roomFunction.playSound(false, "fenwei3")
					setTimeout(() => {
						haiFuncs.addBlue1()
						haiFuncs.addRed1()
						roomFunction.playSound(false, "teachBlue2")
					}, 5000);
					// haiFuncs.addGreen1()
					// haiFuncs.greenPlay3()
				}
				if (gameid.startsWith("haiteach006-cxx")) {
					nowInfos.target = 22
					roomFunction.playSound(false, "togreen")
					roomFunction.playSound(false, "fenwei3")
					setTimeout(() => {
						roomFunction.playSound(false, "tishi6")
					}, 4000);
					setTimeout(() => {
						// haiFuncs.redPlay3()
						fastop.nodeMove("redMove", "red999", 20, true, "b", 0, 41, 0, 0, 0, 41)
					}, 5000);
					setTimeout(() => {
						roomFunction.playSound(false, "teachBlue2")
						haiFuncs.addBlue()
					}, 7500);

				}
			}
			switch (gameid) {
				case "haievelen-cxx":
					nowInfos.target = 50
					break;
				case "haievelenTwo-cxx":
					usersInfos.ValidTarget = 0
					elevenNum = 1
					nowInfos.target = 84
					break;
				case "haievelenThree-cxx":
					elevenNum = 0
					nowInfos.target = 27
					break;
				case "haielevenFour-cxx":
					usersInfos.ValidTarget = 0
					nowInfos.target = 20
					break;
			}
			if (gameid == "haielevenFive-cxx") {
				nowInfos.target = 30
				let cxxCount = 0
				haiFuncs.randomBlueEleven(15)
				setTimeout(() => {
					//haiFuncs.redCha()
					let cxxxx = setInterval(() => {
						switch (cxxCount) {
							case 0:
								let opInfo1 = {
									opId: "redMove",
									opType: "play",
									opNode: "red001",
									timeLen: 4,
									loop: "false",
									keyFrames: [
										{
											t: 1,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 16,
													y: 2
												},

											}
										}
									]
								}
								gameFuncs.op(opInfo1);
								haiFuncs.randomBlueEleven(15)
								break;
							case 4:
								let opInfo2 = {
									opId: "redMove",
									opType: "play",
									opNode: "red002",
									timeLen: 7,
									loop: "false",
									keyFrames: [
										{
											t: 0.25,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 31
												},

											}
										},
										{
											t: 0.5,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 2
												},

											}
										},
										{
											t: 0.75,
											keyFrame: {
												visible: "true",
												canTap: "true",
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
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 1
												},

											}
										}
									]
								}
								gameFuncs.op(opInfo2);
								haiFuncs.randomBlueEleven(15)
								break;
							case 11:
								let opInfo3 = {
									opId: "redMove",
									opType: "play",
									opNode: "red001",
									timeLen: 4,
									loop: "false",
									keyFrames: [
										{
											t: 1,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: -1,
													y: 2
												},

											}
										}
									]
								}
								gameFuncs.op(opInfo3);
								haiFuncs.randomBlueEleven(15)
								break;
							case 15:
								let opInfo4 = {
									opId: "redMove",
									opType: "play",
									opNode: "red002",
									timeLen: 4,
									loop: "false",
									keyFrames: [
										{
											t: 1,
											keyFrame: {
												visible: "false",
												canTap: "false",
												surface: "b",
												pt: {
													x: 0,
													y: 31
												},

											}
										}
									]
								}
								gameFuncs.op(opInfo4);
								haiFuncs.randomBlueEleven(15)
								break;
							case 19:
								let opInfo5 = {
									opId: "redMove",
									opType: "play",
									opNode: "red003",
									timeLen: 7,
									loop: "false",
									keyFrames: [
										{
											t: 0.25,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 2
												},

											}
										},
										{
											t: 0.5,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 15,
													y: 2
												},

											}
										},
										{
											t: 0.75,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 2
												},

											}
										},
										{
											t: 1,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 16,
													y: 2
												},

											}
										}
									]
								}
								gameFuncs.op(opInfo5);
								haiFuncs.randomBlueEleven(7)
								break;
							case 24:
								let opInfo6 = {
									opId: "redMove",
									opType: "play",
									opNode: "red002",
									timeLen: 7,
									loop: "true",
									keyFrames: [
										{
											t: 0.25,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 31
												},

											}
										},
										{
											t: 0.5,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 2
												},

											}
										},
										{
											t: 0.75,
											keyFrame: {
												visible: "true",
												canTap: "true",
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
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 1
												},

											}
										}
									]
								}
								gameFuncs.op(opInfo6);
								haiFuncs.randomBlueEleven(5)
								break;
							case 39:
								clearInterval(cxxxx)
								break;
						}
						cxxCount++
					}, 1000);
				}, 5000);

			}

			haiFuncs.CountPlay();

		}


	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("hai")) {
			// if (onOff == true) {
			// 	usersInfos.ValidTrigger++
			// }
			if (levelInfos.level == 11) {
				haiFuncs.blueTapEvelen(face, x, y, onOff, nodeId, event)
				if (elevenNum == 1) {
					haiFuncs.removeBlueOrPink(face, x, y, onOff, nodeId, event)
				}
				//haiFuncs.addPink(x, y)

			} else {
				haiFuncs.blueTap(face, x, y, onOff, nodeId, event);

			}
			haiFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			//haiFuncs.allBlink2()

			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(haiFuncs.tapWrong.determine)
			}
			if (nodeId.startsWith("wrongBlink" + x + "_" + y)) {
				fastop.removeNode("rmBlink" + x + "_" + y, "wrongBlink" + x + "_" + y)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(haiFuncs.CountPlay.innerCount)
		//clearInterval(haiFuncs.CountPlay.innerCount)

	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)

	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(haiFuncs.CountPlay.innerCount)
		clearTimeout(wanFa_hai.gamePlay.teca)
		clearTimeout(wanFa_hai.gamePlay.teca1)
		clearTimeout(wanFa_hai.gamePlay.teca2)
		clearTimeout(haiFuncs.CountPlay.setBgm)
		roomFunction.stopSound("bgm01")
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
		haiFuncs.rmAllListener()
		wanFaCtl_haiCtl.gameEndCtl(nowInfos.allTarget / 90, nowInfos.lifePoint, nowInfos.gameCountTime)
		levelInfos.gameIdList = []
		fff = 1

	}

}




const haiFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 40;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		aaa = 0;
		fff = 0
		nowInfos.nowGame = 0
		usersInfos.ValidTarget = 0
		elevenNum = 0;
		haiJinBiMoveCtl = 0
		//countNum = 0
	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_hai.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_hai.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_hai.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_hai.gameTaped)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				// setTimeout(() => {
				// 	haiFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				haiFuncs.tapWrong.determine = setTimeout(() => {
					haiFuncs.addBlink(x, y)
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
							haiFuncs.resetAll()
							roomFunction.goToGameLevel(levelInfos.gameIdList[0], "none")
							engine.log("chongqiqqqqqqqqqq")
						} else {
							wanFa_hai.gameLevelEnd()
						}

						// roomFunction.goToGameLevel("leave_hold", "none")
					}
				}, 75);

			}
		}
	},
	blueFor() {
		for (let i = 1; i < 25; i++) {
			let opInfo1 = {
				opId: "blue" + i,
				opType: "play",
				opNode: "blue" + i,
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
			gameFuncs.op(opInfo1)
		}
	},
	//隐藏3
	oneFor() {
		let opInfo1 = {
			opId: "one001",
			opType: "play",
			opNode: "one001",
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
	//隐藏2
	oneFor1() {
		let opInfo2 = {
			opId: "one008",
			opType: "play",
			opNode: "one008",
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
	//隐藏1
	oneFor2() {
		let opInfo2 = {
			opId: "one015",
			opType: "play",
			opNode: "one015",
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
	//隐藏4
	oneFor3() {
		let opInfo2 = {
			opId: "one016",
			opType: "play",
			opNode: "one016",
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
	//隐藏5
	oneFor4() {
		let opInfo2 = {
			opId: "one017",
			opType: "play",
			opNode: "one017",
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
	//隐藏6
	oneFor5() {
		let opInfo2 = {
			opId: "one018",
			opType: "play",
			opNode: "one018",
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
	//隐藏7
	oneFor6() {
		let opInfo2 = {
			opId: "one019",
			opType: "play",
			opNode: "one019",
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
	//隐藏8
	oneFor7() {
		let opInfo2 = {
			opId: "one020",
			opType: "play",
			opNode: "one020",
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
	//隐藏9
	oneFor8() {
		let opInfo2 = {
			opId: "one021",
			opType: "play",
			opNode: "one021",
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
	//隐藏10
	oneFor9() {
		let opInfo2 = {
			opId: "one022",
			opType: "play",
			opNode: "one022",
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
	addPink(x, y) {
		fastop.addNode("addPink" + x + "_" + y, "PinkBlink" + x + "_" + y, "b", x, y, 0, 254, 0)
		setTimeout(() => {
			let opInfo = {
				opId: "doPinkBlink" + x + "_" + y,
				opType: "play",
				opNode: "PinkBlink" + x + "_" + y,
				timeLen: 1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							shape: {
								rgba: {
									r: 148,
									g: 0,
									b: 211,
									a: 0.2
								}
							}

						}
					},
					{
						t: 0.2,
						keyFrame: {
							shape: {
								rgba: {
									r: 148,
									g: 0,
									b: 211,
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
									r: 148,
									g: 0,
									b: 211,
									a: 0.2
								}
							}

						}
					},
					{
						t: 0.6,
						keyFrame: {
							shape: {
								rgba: {
									r: 148,
									g: 0,
									b: 211,
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
									r: 148,
									g: 0,
									b: 211,
									a: 0.2
								}
							}

						}
					},
					{
						t: 1,
						keyFrame: {
							shape: {
								rgba: {
									r: 148,
									g: 0,
									b: 211,
									a: 1
								}
							}

						}
					},

				]
			}
			gameFuncs.op(opInfo);
			setTimeout(() => {
				fastop.removeNode("rmBlinkPink" + x + "_" + y, "PinkBlink" + x + "_" + y)
			}, 1500);
		}, 100);
	},
	allBlink2() {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 31; j++) {
				let opInfo = {
					opId: "addblink" + i + "_" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "blink" + i + "_" + j, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: i, y: j }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								"type": "point",
								"points": [
									{
										"x": 0,
										"y": 0
									}
								],
								"rgba": {
									"r": 254,
									"g": 0,
									"b": 0,
									"a": 1
								},
								"onOff": true
							}
						}
					]
				}
				gameFuncs.op(opInfo);

				// setTimeout(() => {
				// 	let opInfo = {
				// 		opId: "blinkblink" + i + "_" + j,
				// 		opType: "play",
				// 		opNode: "blink" + i + "_" + j,
				// 		timeLen: Math.random() * 2 + 2,
				// 		loop: "true",
				// 		keyFrames: [
				// 			{
				// 				t: 0,
				// 				keyFrame: {
				// 					shape: {

				// 						"rgba": {
				// 							"r": 254,
				// 							"g": 20,
				// 							"b": 147,
				// 							"a": 1
				// 						},

				// 					}
				// 				}
				// 			}, {
				// 				t: 0.5,
				// 				keyFrame: {
				// 					shape: {

				// 						"rgba": {
				// 							"r": 254,
				// 							"g": 20,
				// 							"b": 147,
				// 							"a": 0
				// 						},

				// 					}
				// 				}
				// 			}, {
				// 				t: 1,
				// 				keyFrame: {
				// 					shape: {

				// 						"rgba": {
				// 							"r": 254,
				// 							"g": 20,
				// 							"b": 147,
				// 							"a": 1
				// 						},

				// 					}
				// 				}
				// 			},

				// 		]
				// 	}
				// 	gameFuncs.op(opInfo);
				// }, 100);
			}
		}
	},

	removeAllBlink() {
		let i = 0
		for (i = 0; i < 32; i++) {
			let j = 0
			for (j = 0; j < 16; j++) {
				let opInfo = {
					opId: "rmblink" + j + "_" + i,
					opType: "rmNode",
					opNode: "blink" + j + "_" + i,
				}
				gameFuncs.op(opInfo);
			}
		}
	},
	jinBiMove() {
		if (haiJinBiMoveCtl == 0) {
			haiJinBiMoveCtl = 1
			setTimeout(() => {
				haiJinBiMoveCtl = 0
			}, 1000);
			let opInfo = {
				opId: "jinbiPlay",
				opType: "play",
				opNode: "jinbi",
				timeLen: 1,
				loop: false,
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							surface: "b",
							pt: {
								x: 0,
								y: 35
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							surface: "b",
							pt: {
								x: 0,
								y: 32
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo);
		}
	},
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("blue") || nodeId.startsWith("mubiao001.blue") || nodeId.startsWith("mubiao002.blue")) {
			if (onOff == true) {
				usersInfos.ValidTarget++
				if (nowInfos.target > 1) {
					haiFuncs.jinBiMove()
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSoundTivite(false, "right", "positive")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					usersInfos.levelScore += nowInfos.scoreCoefficient;
					haiFuncs.ScorePlay()
				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiFuncs.ScorePlay();
						nowInfos.nowGame = levelInfos.gameIdList.indexOf(nowInfos.nowGameid);
						nowInfos.nowGame++;
						roomFunction.goToNextGame();
						fff = 1
						engine.removeEventListener("gameTaped", wanFa_hai.gameTaped)
						roomFunction.stopSound("fenwei")
						roomFunction.playSoundTivite(false, "levelup", "positive")
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiFuncs.ScorePlay()
						wanFa_hai.gameLevelEnd();
					}
				}
			}
		}
	},
	blueTapEvelen(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("blue") || nodeId.startsWith("mubiao001.blue") || nodeId.startsWith("mubiao002.blue")) {
			if (nowInfos.nowGameid == "haievelenTwo-cxx") {
				haiFuncs.addPink(x, y)
			}
			if (onOff == true) {
				usersInfos.ValidTarget++
				if (nowInfos.nowGameid == "haielevenFour-cxx" && usersInfos.ValidTarget == 6) {
					haiFuncs.randomBlueEleven(14)
				}
				let i = usersInfos.ValidTarget
				// if (nowInfos.nowGameid == "haievelenTwo-cxx") {
				// 	setTimeout(() => {
				// 		fastop.removeNode("rmPink" + i, "pink0" + i)
				// 	}, 200);
				// }

				if (nowInfos.target > 1) {
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSoundTivite(false, "elevenRight", "positive")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					usersInfos.levelScore += nowInfos.scoreCoefficient;
					haiFuncs.ScorePlay()
				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiFuncs.ScorePlay();
						nowInfos.nowGame = levelInfos.gameIdList.indexOf(nowInfos.nowGameid);
						nowInfos.nowGame++;
						engine.log("nowInfos.nowGame---" + nowInfos.nowGame)
						roomFunction.goToNextGame();
						fff = 1
						engine.removeEventListener("gameTaped", wanFa_hai.gameTaped)
						roomFunction.stopSound("fenwei")
						roomFunction.playSoundTivite(false, "levelup", "positive")
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiFuncs.ScorePlay()
						wanFa_hai.gameLevelEnd();
					}
				}
			}
		}
	},
	removeBlueOrPink(face, x, y, onOff, nodeId, event) {
		if (onOff == true) {
			if (nodeId == "blue001") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink01")
				}, 200);
			} else if (nodeId == "blue002") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink02")

				}, 200);

			} else if (nodeId == "blue003") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink03")

				}, 200);
			} else if (nodeId == "blue004") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink04")

				}, 200);
			} else if (nodeId == "blue005") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink05")

				}, 200);
			} else if (nodeId == "blue006") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink06")

				}, 200);
			} else if (nodeId == "blue007") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink07")

				}, 200);
			} else if (nodeId == "blue008") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink08")

				}, 200);
			} else if (nodeId == "blue009") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink09")

				}, 200);
			} else if (nodeId == "blue010") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink010")

				}, 200);
			} else if (nodeId == "blue011") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink011")

				}, 200);
			} else if (nodeId == "blue012") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink012")

				}, 200);
			} else if (nodeId == "blue013") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink013")

				}, 200);
			} else if (nodeId == "blue014") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink014")

				}, 200);
			} else if (nodeId == "blue015") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink015")

				}, 200);
			} else if (nodeId == "blue016") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink016")

				}, 200);
			} else if (nodeId == "blue017") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink017")

				}, 200);
			} else if (nodeId == "blue018") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink018")

				}, 200);
			} else if (nodeId == "blue019") {
				setTimeout(() => {

					fastop.removeNode("rmPink", "pink019")
				}, 200);
			} else if (nodeId == "blue020") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink020")

				}, 200);
			} else if (nodeId == "blue021") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink021")

				}, 200);
			} else if (nodeId == "blue022") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink022")

				}, 200);
			} else if (nodeId == "blue023") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink023")

				}, 200);
			} else if (nodeId == "blue024") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink024")

				}, 200);
			} else if (nodeId == "blue025") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink025")

				}, 200);
			} else if (nodeId == "blue026") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink026")

				}, 200);
			} else if (nodeId == "blue027") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink027")

				}, 200);
			} else if (nodeId == "blue028") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink028")

				}, 200);
			} else if (nodeId == "blue029") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink029")

				}, 200);
			} else if (nodeId == "blue030") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink030")

				}, 200);
			} else if (nodeId == "blue031") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink031")

				}, 200);
			} else if (nodeId == "blue032") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink032")

				}, 200);
			} else if (nodeId == "blue033") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink033")

				}, 200);
			} else if (nodeId == "blue034") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink034")

				}, 200);
			} else if (nodeId == "blue035") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink035")

				}, 200);
			} else if (nodeId == "blue036") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink036")

				}, 200);
			} else if (nodeId == "blue037") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink037")

				}, 200);
			} else if (nodeId == "blue038") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink038")

				}, 200);
			} else if (nodeId == "blue039") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink039")

				}, 200);
			} else if (nodeId == "blue040") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink040")

				}, 200);
			} else if (nodeId == "blue041") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink041")

				}, 200);
			} else if (nodeId == "blue042") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink042")

				}, 200);
			} else if (nodeId == "blue043") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink043")

				}, 200);
			} else if (nodeId == "blue044") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink044")

				}, 200);
			} else if (nodeId == "blue045") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink045")

				}, 200);
			} else if (nodeId == "blue046") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink046")

				}, 200);
			} else if (nodeId == "blue047") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink47")

				}, 200);
			} else if (nodeId == "blue048") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink048")

				}, 200);
			} else if (nodeId == "blue049") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink049")

				}, 200);
			} else if (nodeId == "blue050") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink050")

				}, 200);
			} else if (nodeId == "blue051") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink051")

				}, 200);
			} else if (nodeId == "blue052") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink052")

				}, 200);
			} else if (nodeId == "blue053") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink053")

				}, 200);
			} else if (nodeId == "blue054") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink054")

				}, 200);
			} else if (nodeId == "blue055") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink055")

				}, 200);
			} else if (nodeId == "blue056") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink056")

				}, 200);
			} else if (nodeId == "blue057") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink057")

				}, 200);
			} else if (nodeId == "blue058") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink058")

				}, 200);
			} else if (nodeId == "blue059") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink059")

				}, 200);
			} else if (nodeId == "blue060") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink060")

				}, 200);
			} else if (nodeId == "blue061") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink061")

				}, 200);
			} else if (nodeId == "blue062") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink062")

				}, 200);
			} else if (nodeId == "blue063") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink063")

				}, 200);
			} else if (nodeId == "blue064") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink064")

				}, 200);
			} else if (nodeId == "blue065") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink065")

				}, 200);
			} else if (nodeId == "blue066") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink066")

				}, 200);
			} else if (nodeId == "blue067") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink67")

				}, 200);
			} else if (nodeId == "blue068") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink068")

				}, 200);
			} else if (nodeId == "blue069") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink069")

				}, 200);
			} else if (nodeId == "blue070") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink070")

				}, 200);
			} else if (nodeId == "blue071") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink071")

				}, 200);
			} else if (nodeId == "blue072") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink072")

				}, 200);
			} else if (nodeId == "blue073") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink073")

				}, 200);
			} else if (nodeId == "blue074") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink074")

				}, 200);
			} else if (nodeId == "blue075") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink075")

				}, 200);
			} else if (nodeId == "blue076") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink076")

				}, 200);
			} else if (nodeId == "blue077") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink077")

				}, 200);
			} else if (nodeId == "blue078") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink078")

				}, 200);
			} else if (nodeId == "blue079") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink079")

				}, 200);
			} else if (nodeId == "blue080") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink080")

				}, 200);
			} else if (nodeId == "blue081") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink081")

				}, 200);
			} else if (nodeId == "blue082") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink082")

				}, 200);
			} else if (nodeId == "blue083") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink083")

				}, 200);
			} else if (nodeId == "blue084") {
				setTimeout(() => {
					fastop.removeNode("rmPink", "pink084")

				}, 200);
			}
		}
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
		// fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		// fastop.addNode("addBlue", "blue2042", "b", 9, 35, 0, 0, 254)
		// fastop.addNode("addBlue", "blue2041", "b", 5, 35, 0, 0, 254)
	},
	addBlue44() {
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
		// fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		// fastop.addNode("addBlue", "blue2042", "b", 9, 35, 0, 0, 254)
		// fastop.addNode("addBlue", "blue2041", "b", 5, 35, 0, 0, 254)
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
		// fastop.addNode("addBlue", "blue2040", "b", 7, 35, 0, 0, 254)
		// fastop.addNode("addBlue", "blue2042", "b", 9, 35, 0, 0, 254)
		// fastop.addNode("addBlue", "blue2041", "b", 5, 35, 0, 0, 254)
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
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2050", "a", 15, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "a", 19, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2053", "a", 21, 0, 0, 0, 254)
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
	addBlue10() {
		fastop.addNode("addBlue", "blue2025", "a", 16, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2027", "a", 18, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2033", "a", 23, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2050", "a", 15, 0, 0, 0, 254)
		fastop.addNode("addBlue", "blue2051", "a", 19, 0, 0, 0, 254)

		fastop.addNode("addBlue", "blue2053", "a", 21, 0, 0, 0, 254)


		fastop.addNode("addBlue", "blue2042", "b", 5, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2041", "b", 6, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2043", "b", 7, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2044", "b", 8, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2045", "b", 9, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2046", "b", 10, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2047", "b", 11, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2048", "b", 12, 7, 0, 0, 254)
		fastop.addNode("addBlue", "blue2088", "b", 13, 7, 0, 0, 254)

		fastop.addNode("addBlue", "blue2060", "b", 5, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2061", "b", 6, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2062", "b", 7, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2063", "b", 8, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2064", "b", 9, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2065", "b", 10, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2066", "b", 11, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2067", "b", 12, 9, 0, 0, 254)
		fastop.addNode("addBlue", "blue2068", "b", 13, 9, 0, 0, 254)

		fastop.addNode("addBlue", "blue3060", "b", 5, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3061", "b", 6, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3062", "b", 7, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3063", "b", 8, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3064", "b", 9, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3065", "b", 10, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3066", "b", 11, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3067", "b", 12, 14, 0, 0, 254)
		fastop.addNode("addBlue", "blue3068", "b", 13, 14, 0, 0, 254)

		fastop.addNode("addBlue", "blue4060", "b", 5, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4061", "b", 6, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4062", "b", 7, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4063", "b", 8, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4064", "b", 9, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4065", "b", 10, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4066", "b", 11, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4067", "b", 12, 16, 0, 0, 254)
		fastop.addNode("addBlue", "blue4068", "b", 13, 16, 0, 0, 254)
	},
	//go中g字母样式
	addRed3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "go001",
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
	//go中o字母样式
	addRed4() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "go007",
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
	},
	//数字3
	addRed5() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one001",
			nodes: [{
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

					},
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRedhhh() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one001",
			nodes: [{
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
							x: 0,
							y: 26
						},
						rb: {
							x: 0,
							y: 29
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
									x: 2,
									y: 26
								},
								rb: {
									x: 2,
									y: 29
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
									x: 4,
									y: 26
								},
								rb: {
									x: 4,
									y: 29
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
							x: 1,
							y: 30
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
							x: 3,
							y: 30
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
									y: 26
								},
								rb: {
									x: 8,
									y: 26
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
									x: 6,
									y: 28
								},
								rb: {
									x: 6,
									y: 29
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
						nodeId: "one099",
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
									y: 30
								},
								rb: {
									x: 8,
									y: 30
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
						nodeId: "one098",
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
									y: 27
								},
								rb: {
									x: 9,
									y: 29
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
						nodeId: "one097",
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
									y: 26
								},
								rb: {
									x: 13,
									y: 26
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
						nodeId: "one096",
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
									y: 27
								},
								rb: {
									x: 14,
									y: 29
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
						nodeId: "one095",
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
									y: 30
								},
								rb: {
									x: 13,
									y: 30
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
						nodeId: "one094",
						surface: "b",
						pt: {
							x: 7,
							y: 27
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
			opNode: "one008",
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
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
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
			opNode: "one015",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字4
	addRed9() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one016",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字5
	addRed10() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one017",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字6
	addRed11() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one018",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字7
	addRed12() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one019",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字8
	addRed13() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one020",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字9
	addRed14() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one021",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 11,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 4,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									x: 11,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字10
	addRed15() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "one022",
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
				nodes: [
					{
						nodeId: "one099",
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
									y: 32
								},
								rb: {
									x: 12,
									y: 32
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one098",
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
									y: 33
								},
								rb: {
									x: 2,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
					{
						nodeId: "one097",
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
									y: 33
								},
								rb: {
									x: 12,
									y: 41
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1
							}
						}

					},
				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//lose字母样式
	addRed7() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "lose001",
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
	randomBlue(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 16)
			let y = Math.floor(Math.random() * 32)
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
				opNode: "blue",
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
		let i = 0;
		let xxx = []
		while (xxx.length < blueNum) {
			let x = Math.floor(Math.random() * 24)
			if (xxx.indexOf(x) < 0) {
				xxx[i] = x
				let opInfo = {
					opId: "addBlue" + i,
					opType: "addNode",
					opNode: "",
					nodes: [{
						nodeId: "blue" + i,
						surface: "a",
						pt: {
							x: xxx[i],
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
	randomBlueEleven(blueNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 16)
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
				opId: "addBlue" + i,
				opType: "addNode",
				opNode: "blue",
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
		haiFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
			// if (countNum == 1) {
			// 	clearInterval(haiFuncs.CountPlay.innerCount)
			// 	return
			// }
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
						nowInfos.nowGame++
						fff = 1
						engine.removeEventListener("gameTaped", wanFa_hai.gameTaped)
						roomFunction.stopSound("fenwei")
						roomFunction.playSoundTivite(false, "levelup", "positive")
					} else {
						wanFa_hai.gameLevelEnd()
					}
				}
			}
			// if (nowInfos.gameCountTime== 30&&levelInfos.gameIdList.indexOf(nowInfos.nowGameid)==levelInfos.gameIdList.length - 1) {
			// 	roomFunction.playSound(false,"shizhong")
			// }
			if (nowInfos.gameCountTime == 10 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				roomFunction.playSound(false, "daoshu10")
			}
			// if (nowInfos.gameCountTime == 20) {
			// 	const randomGai = Math.random()
			// 	if (randomGai <= 0.25 && nowInfos.nowGame == 2) {
			// 		clearInterval(haiFuncs.CountPlay.innerCount)
			// 		countNum = 1
			// 		engine.removeEventListener("gamePlay", wanFa_hai.gamePlay)
			// 		engine.removeEventListener("gameDestroy", wanFa_hai.gameDestroy)
			// 		engine.removeEventListener("gameTimeOver", wanFa_hai.gameTimeOver)
			// 		engine.removeEventListener("gameTaped", wanFa_hai.gameTaped)
			// 		haiFuncs.rmAllListener()
			// 		let str = gameFuncs.playingAudioIds()
			// 		let arr = JSON.parse(str)
			// 		let soundName = arr?.map(item => item.slice(item.indexOf('d') + 1))
			// 		engine.log(arr)

			// 		engine.log(soundName)
			// 		soundName?.map(item => {
			// 			roomFunction.stopSound(item)
			// 		})
			// 		roomFunction.playSound(false, "hallweenRules")
			// 		roomFunction.goToGameLevel("hallween001-cxx", "none")
			// 		haiFuncs.CountPlay.setBgm = setTimeout(() => {
			// 			roomFunction.playSound(false, "hallween02")
			// 		}, 3000);
			// 		wanFa_hallween.gameStart(2, 2)
			// 		return
			// 	}

			// }
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
