const wanFa_tranPlus = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_tranPlus.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_tranPlus.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_tranPlus.gameDestroy);
		//重置全局变量
		tranPlusFuncs.resetAll()
		clearInterval(tranPlusFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}

		cbjh = 0
		zwy = 0


		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		roomFunction.playSound(false, "ding")
		let countTime = 0
		wanFa_tranPlus.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("tranPlus")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						roomFunction.playSound(true, "tranPlusBgm", "background")
						tranPlusFuncs.CountPlay();

					}
					break;
				case 17:
					clearInterval(wanFa_tranPlus.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);

		// setTimeout(function () {

		// 	if (levelInfos.wanFa.startsWith("tranPlus")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 		roomFunction.playSound(true, "tranPlusBgm", "background")
		// 		tranPlusFuncs.CountPlay();

		// 	}
		// }, sec * 1000);
		// setTimeout(() => {
		// 	roomFunction.playSound(false, "gamestart");
		// 	surfaceCtr.ctlDoor(0, 7000);
		// }, 3500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_tranPlus.gameTaped)
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)
		engine.log(canTapNum + "???")

		if (gameid.startsWith("transPlus")) {
			tranPlusFuncs.blueNoTap()
			nowInfos.target = (usersInfos.usersResult.length) * 2;
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			//roomFunction.playSound(false, "togreen")
			tranPlusFuncs.CountPlay()
			tranPlusFuncs.ScorePlay()

			//这里
			tranPlusFuncs.blueFor()
			tranPlusFuncs.blueShow(usersInfos.usersResult.length)
			tranInfos.biepeng = 0
			if (guole == 0) {
				setTimeout(() => {
					if (gameid == "transPlus-cxx") {
						tranPlusFuncs.addRedJiaoxue1()
						tranPlusFuncs.addRedJiaoxue2()
						tranPlusFuncs.redPlayJiaoxue1()
						tranPlusFuncs.redPlayJiaoxue2()


					} else if (gameid == "transPlus03-cxx") {
						//fastop.nodeMove("redMove", "red301", 3, true, "b", 0, 0, 0, 0, 0, 30)
						tranPlusFuncs.addRed()
						tranPlusFuncs.addRed1()
						tranPlusFuncs.redPlay()
						tranPlusFuncs.redPlay1()
					} else if (gameid == "transPlus02-cxx") {

						tranPlusFuncs.addRed()
						tranPlusFuncs.redPlay()
					} else if (gameid == "transPlus04-cxx") {
						tranPlusFuncs.addRed12()
						tranPlusFuncs.redPlay13()
					} else if (gameid == "transPlus05-cxx") {
						tranPlusFuncs.addRed2()
						tranPlusFuncs.addRed3()
						setTimeout(() => {
							tranPlusFuncs.redPlay2()
						}, 1200);
						tranPlusFuncs.addRed4()
						setTimeout(() => {
							tranPlusFuncs.redPlay3()
						}, 900);
						tranPlusFuncs.addRed5()
						setTimeout(() => {
							tranPlusFuncs.redPlay4()
						}, 600);
						tranPlusFuncs.addRed7()
						setTimeout(() => {
							tranPlusFuncs.redPlay9()
						}, 250);
					} else if (gameid == "transPlus06-cxx") {
						tranPlusFuncs.addRed6()
						tranPlusFuncs.redPlay5()
					} else if (gameid == "transPlus07-cxx") {
						tranPlusFuncs.redPlay6()
					} else if (gameid == "transPlus08-cxx") {
						tranPlusFuncs.redPlay7()
					} else if (gameid == "transPlus09-cxx") {
						tranPlusFuncs.redPlay8()
					}
					else if (gameid == "transPlus10-cxx") {
						//tranFuncs.redPlay8()
						tranPlusFuncs.addRed()
						tranPlusFuncs.addRed1()
						tranPlusFuncs.redPlay10()
						tranPlusFuncs.redPlay11()
					}

					tranPlusFuncs.blueYesTap()
					switch (guole) {
						case 0:
							usersInfos.levelScore = 0;
							tranPlusFuncs.addRed8()
							roomFunction.playSound(false, "levelOne")
							break;
						case 1:
							tranPlusFuncs.num2()
							usersInfos.levelScore = 10;
							roomFunction.playSound(false, "levelTwo")
							break;
						case 2:
							tranPlusFuncs.num3()
							usersInfos.levelScore = 20;
							roomFunction.playSound(false, "levelThree")
							break;
						case 3:
							tranPlusFuncs.addRed9()
							usersInfos.levelScore = 30;
							roomFunction.playSound(false, "levelFour")
							break;
						case 4:
							tranPlusFuncs.addRed10()
							usersInfos.levelScore = 40;
							roomFunction.playSound(false, "levelFive")
							break;
						case 5:
							tranPlusFuncs.addRed11()
							usersInfos.levelScore = 60;
							roomFunction.playSound(false, "levelSix")
							break;
						case 6:
							tranPlusFuncs.addRed120()
							usersInfos.levelScore = 80;
							roomFunction.playSound(false, "levelSeven")
							break;
						case 7:
							tranPlusFuncs.addRed13()
							usersInfos.levelScore = 100;
							roomFunction.playSound(false, "levelEight")
							break;
						case 8:
							tranPlusFuncs.addRed14()
							usersInfos.levelScore = 120;
							roomFunction.playSound(false, "levelNine")
							break;
						case 9:
							tranPlusFuncs.addRed15()
							usersInfos.levelScore = 150;
							roomFunction.playSound(false, "levelTen")
							break;
					}


				}, 3000);
			} else if (guole != 0) {
				setTimeout(() => {
					if (gameid == "transPlus-cxx") {
						tranPlusFuncs.addRedJiaoxue1()
						tranPlusFuncs.addRedJiaoxue2()
						tranPlusFuncs.redPlayJiaoxue1()
						tranPlusFuncs.redPlayJiaoxue2()


					} else if (gameid == "transPlus03-cxx") {
						//fastop.nodeMove("redMove", "red301", 3, true, "b", 0, 0, 0, 0, 0, 30)
						tranPlusFuncs.addRed()
						tranPlusFuncs.addRed1()
						tranPlusFuncs.redPlay()
						tranPlusFuncs.redPlay1()
					} else if (gameid == "transPlus02-cxx") {

						tranPlusFuncs.addRed()
						tranPlusFuncs.redPlay()
					} else if (gameid == "transPlus04-cxx") {
						tranPlusFuncs.addRed12()
						tranPlusFuncs.redPlay13()
					} else if (gameid == "transPlus05-cxx") {
						tranPlusFuncs.addRed2()
						tranPlusFuncs.addRed3()
						setTimeout(() => {
							tranPlusFuncs.redPlay2()
						}, 1200);
						tranPlusFuncs.addRed4()
						setTimeout(() => {
							tranPlusFuncs.redPlay3()
						}, 900);
						tranPlusFuncs.addRed5()
						setTimeout(() => {
							tranPlusFuncs.redPlay4()
						}, 600);
						tranPlusFuncs.addRed7()
						setTimeout(() => {
							tranPlusFuncs.redPlay9()
						}, 250);
					} else if (gameid == "transPlus06-cxx") {
						tranPlusFuncs.addRed6()
						tranPlusFuncs.redPlay5()
					} else if (gameid == "transPlus07-cxx") {
						tranPlusFuncs.redPlay6()
					} else if (gameid == "transPlus08-cxx") {
						tranPlusFuncs.redPlay7()
					} else if (gameid == "transPlus09-cxx") {
						tranPlusFuncs.redPlay8()
					}
					else if (gameid == "transPlus10-cxx") {
						//tranFuncs.redPlay8()
						tranPlusFuncs.addRed()
						tranPlusFuncs.addRed1()
						tranPlusFuncs.redPlay10()
						tranPlusFuncs.redPlay11()
					}
					tranPlusFuncs.blueYesTap()
					switch (guole) {
						case 0:
							usersInfos.levelScore = 0;
							tranPlusFuncs.addRed8()
							roomFunction.playSound(false, "levelOne")
							break;
						case 1:
							tranPlusFuncs.num2()
							usersInfos.levelScore = 10;
							roomFunction.playSound(false, "levelTwo")
							break;
						case 2:
							tranPlusFuncs.num3()
							usersInfos.levelScore = 20;
							roomFunction.playSound(false, "levelThree")
							break;
						case 3:
							tranPlusFuncs.addRed9()
							usersInfos.levelScore = 30;
							roomFunction.playSound(false, "levelFour")
							break;
						case 4:
							tranPlusFuncs.addRed10()
							usersInfos.levelScore = 40;
							roomFunction.playSound(false, "levelFive")
							break;
						case 5:
							tranPlusFuncs.addRed11()
							usersInfos.levelScore = 60;
							roomFunction.playSound(false, "levelSix")
							break;
						case 6:
							tranPlusFuncs.addRed120()
							usersInfos.levelScore = 80;
							roomFunction.playSound(false, "levelSeven")
							break;
						case 7:
							tranPlusFuncs.addRed13()
							usersInfos.levelScore = 100;
							roomFunction.playSound(false, "levelEight")
							break;
						case 8:
							tranPlusFuncs.addRed14()
							usersInfos.levelScore = 120;
							roomFunction.playSound(false, "levelNine")
							break;
						case 9:
							tranPlusFuncs.addRed15()
							usersInfos.levelScore = 150;
							roomFunction.playSound(false, "levelTen")
							break;
					}


				}, 1000);
			}


		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("transPlus") && tranInfos.biepeng == 0) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			tranPlusFuncs.blueTap(face, x, y, onOff, nodeId, event);
			tranPlusFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(tranPlusFuncs.tapWrong.determine)
			}

		}

	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(tranPlusFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_tranPlus.gameTaped)
		engine.log("移除tap监听")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait" && gameid != "leave_hold") {
			// wanFa_tranPlus.gameLevelEnd()
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(tranPlusFuncs.CountPlay.innerCount)
		clearInterval(wanFa_tranPlus.gamePlay.count)
		roomFunction.stopSound("tranPlusBgm")
		roomFunction.stopSound("tranRules")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teachBlue2")
		roomFunction.stopSound("teachRed")
		roomFunction.goToGameLevel("leave_hold", "none")
		tranPlusFuncs.rmAllListener()
		usersInfos.levelScore = usersInfos.levelScore + parseInt(challengeTime / 10) + (challengeLife * 2)
		wanFaCtl_tranPlusCtl.gameEndCtl(usersInfos.levelScore)
		levelInfos.gameIdList = []
	}

}




const tranPlusFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 60;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 3
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		canTapNum = []
		guole = 0
		fff = 0
		challengeTime = 0
		challengeLife = 0
		tranInfos.biepeng = 0
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
					y: -1
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
							y: 36
						},
						{
							x: 6,
							y: 35
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 8,
							y: 35
						},
						{
							x: 9,
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
							x: 7,
							y: 42
						},
						{
							x: 8,
							y: 42
						},
						{
							x: 9,
							y: 41
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
							x: 8,
							y: 41
						},
						{
							x: 9,
							y: 40
						},
						{
							x: 10,
							y: 40
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
					],
					rgba: {
						r: 139,
						g: 69,
						b: 19,
						a: 1
					}
				}
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字2
	num2() {
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

					}
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

					}
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
				}
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
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字7
	addRed120() {
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
			}]
		}
		gameFuncs.op(opInfo1)
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
	addRed2() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "red666",
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
							y: 9
						},
						rb: {
							x: 9,
							y: 22
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
	addRed3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red001",
			nodes: [{
				nodeId: "red001",
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
							x: 5,
							y: 2
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
						nodeId: "red002",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red003",
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
									y: 5
								},
								rb: {
									x: 5,
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
					},
					{
						nodeId: "red004",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
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
			opNode: "red005",
			nodes: [{
				nodeId: "red005",
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
							x: 5,
							y: 2
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
						nodeId: "red006",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red007",
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
									y: 5
								},
								rb: {
									x: 5,
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
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},
					{
						nodeId: "red008",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},

				]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	addRed5() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red009",
			nodes: [{
				nodeId: "red009",
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
							x: 5,
							y: 2
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
						nodeId: "red010",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red011",
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
									y: 5
								},
								rb: {
									x: 5,
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
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},
					{
						nodeId: "red012",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
								}
							},
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
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
			opNode: "red013",
			nodes: [{
				nodeId: "red013",
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
							x: 5,
							y: 2
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
						nodeId: "red014",
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
									y: 3
								},
								rb: {
									x: 4,
									y: 4
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
						nodeId: "red015",
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
									y: 5
								},
								rb: {
									x: 5,
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
						// shape: {
						// 	type: "point",
						// 	points: [
						// 		{
						// 			x: 2,
						// 			y: 2
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 0
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 1
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 3
						// 		},
						// 		{
						// 			x: 1,
						// 			y: 4
						// 		},
						// 		{
						// 			x: 4,
						// 			y: 7
						// 		},
						// 		{
						// 			x: 2,
						// 			y: 5
						// 		},
						// 		{
						// 			x: 3,
						// 			y: 6
						// 		},
						// 	],
						// 	rgba: {
						// 		r: 254,
						// 		g: 0,
						// 		b: 0,
						// 		a: 1
						// 	}
						// }
					},
					{
						nodeId: "red016",
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
									y: 7
								},
								rb: {
									x: 4,
									y: 8
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
	addRed6() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red001",
			nodes: [{
				nodeId: "red001",
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
							x: 7,
							y: 9
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

	addRed() {
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
	addRed1() {
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
	addRed12() {
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

	},
	addRedJiaoxue1() {
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

	},
	addRedJiaoxue2() {
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
							x: 16,
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
			}]
		}
		gameFuncs.op(opInfo)

	},
	redPlay() {
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
	redPlay10() {
		let opInfo1 = {
			opId: "red301",
			opType: "play",
			opNode: "red301",
			timeLen: 3,
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
	redPlay2() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
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
	redPlay3() {
		let opInfo1 = {
			opId: "red005",
			opType: "play",
			opNode: "red005",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
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
	redPlay4() {
		let opInfo1 = {
			opId: "red009",
			opType: "play",
			opNode: "red009",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
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
	redPlay9() {
		let opInfo1 = {
			opId: "red013",
			opType: "play",
			opNode: "red013",
			timeLen: 3,
			loop: "true",
			keyFrames: [
				{
					t: 0.35,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 23
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
							y: 23
						},
					}
				},
				{
					t: 0.85,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 10,
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
	redPlay5() {
		let opInfo1 = {
			opId: "red001",
			opType: "play",
			opNode: "red001",
			timeLen: 2,
			loop: "true",
			keyFrames: [
				{
					t: 0.2,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 0,
							y: 22
						},
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 8,
							y: 22
						},
					}
				},
				{
					t: 0.8,
					keyFrame: {
						visible: true,
						canTap: true,
						surface: "b",
						pt: {
							x: 8,
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
	redPlay6() {
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
		let opInfo2 = {
			opId: "red002",
			opType: "play",
			opNode: "red002",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo2);

	},
	redPlay7() {
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
		let opInfo2 = {
			opId: "red004",
			opType: "play",
			opNode: "red004",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "red005",
			opType: "play",
			opNode: "red005",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo3);

	},
	redPlay8() {
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
		let opInfo2 = {
			opId: "red002",
			opType: "play",
			opNode: "red002",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo2);
		let opInfo3 = {
			opId: "red003",
			opType: "play",
			opNode: "red003",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo3);
		let opInfo4 = {
			opId: "red004",
			opType: "play",
			opNode: "red004",
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true,
					}
				},
			]
		}
		gameFuncs.op(opInfo4);

	},
	redPlay1() {
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
	redPlay13() {
		let opInfo1 = {
			opId: "red302",
			opType: "play",
			opNode: "red302",
			timeLen: 2,
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
	redPlay11() {
		let opInfo1 = {
			opId: "red302",
			opType: "play",
			opNode: "red302",
			timeLen: 3,
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
	redPlayJiaoxue1() {
		let opInfo1 = {
			opId: "red302",
			opType: "play",
			opNode: "red302",
			timeLen: 15,
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
	redPlayJiaoxue2() {
		let opInfo1 = {
			opId: "red301",
			opType: "play",
			opNode: "red301",
			timeLen: 15,
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
	blueShow(num) {
		// for (let i = 1; i <= num; i++) {
		while (canTapNum.length < num) {
			let chart = Math.floor(Math.random() * 23)
			while (canTapNum.indexOf(chart) >= 0 || chart == judge) {
				chart = Math.floor(Math.random() * 23)
			}
			if (nowInfos.target !== 1) {
				canTapNum.push(chart)
			}

			// engine.log(canTapNum.slice(-1))
			// judge = canTapNum.slice(-1)
			// i = chart

			let opInfo1 = {
				opId: "blue" + chart,
				opType: "play",
				opNode: "blue00" + chart,
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
		}

		tranPlusFuncs.blueReveal()
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

		for (let i = 0; i < canTapNum.length; i++) {
			let opInfo1 = {
				opId: "blueee" + canTapNum[i],
				opType: "play",
				opNode: "blue00" + canTapNum[i],
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
							canTap: true
						}
					}
				]
			}
			gameFuncs.op(opInfo2);

		}
	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_tranPlus.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_tranPlus.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_tranPlus.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_tranPlus.gameTimeOver)
	},


	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				// setTimeout(() => {
				// 	tranPlusFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				tranPlusFuncs.tapWrong.determine = setTimeout(() => {
					tranPlusFuncs.addBlink(x, y)
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
						wanFa_tranPlus.gameLevelEnd()

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
	randomRed(redNum) {
		function randXY() {
			let x = Math.floor(Math.random() * 12) + 2
			let y = Math.floor(Math.random() * 31) + 2
			return {
				x: x,
				y: y,
				key: x + "_" + y
			}
		}
		let temp = ""
		let i = 0;
		while (i < redNum) {
			let res = randXY()
			while (temp.indexOf(res.key) >= 0) {
				res = randXY()
			}
			let x = res.x
			let y = res.y
			temp += "," + res.key

			let opInfo = {
				opId: "addRed" + i,
				opType: "addNode",
				opNode: "red300",
				nodes: [{
					nodeId: "red" + i,
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
							g: 0,
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
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == ("blue00" + canTapNum[0]) && onOff == true) {
			usersInfos.ValidTarget++
			if (nowInfos.target !== 1) {
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
			}

			judge = canTapNum[0]
			if (nowInfos.target != 1) {
				canTapNum.shift()
			}
			// //engine.log(canTapNum)
			if (nowInfos.target > 1) {
				tranPlusFuncs.blueShow(usersInfos.usersResult.length)
				roomFunction.playSoundTivite(false, "pick", "positive")
				nowInfos.target--
				nowInfos.allTarget++
				usersInfos.gameScore += 5

				// usersInfos.levelScore += 5
				tranPlusFuncs.ScorePlay()
			} else if (nowInfos.target == 1) {
				if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
					roomFunction.playSoundTivite(false, "pick", "positive")
					nowInfos.target--
					nowInfos.allTarget++
					usersInfos.gameScore += 5
					// usersInfos.levelScore += 5
					// let nowGame = levelInfos.gameIdList.indexOf(nowInfos.nowGameid);
					// nowGame++;
					tranPlusFuncs.ScorePlay()
					guole++
					//增加黑色覆盖
					// let opInfo = {
					// 	opId: "addBlack", //操作id 再控制用
					// 	opType: "addNode", // 操作类型，添加一个节点或精灵
					// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					// 	nodes: [
					// 		{
					// 			nodeId: "addBlack", // 节点id，定位用
					// 			surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// 			// node参数
					// 			pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					// 			rotation: 0, // 角度
					// 			nodes: [], // 子节点
					// 			canTap: true,
					// 			visible: true, //显示，如果为false，逻辑数据会跳过
					// 			shape: {
					// 				type: "rect",
					// 				rect: {
					// 					lt: {
					// 						x: 0,
					// 						y: 0
					// 					},
					// 					rb: {
					// 						x: 16,
					// 						y: 45
					// 					}
					// 				},
					// 				rgba: {
					// 					r: 0,
					// 					g: 0,
					// 					b: 0,
					// 					a: 1
					// 				}
					// 			},
					// 		}
					// 	]
					// }
					// gameFuncs.op(opInfo);
					// let opInfoA = {
					// 	opId: "addBlackA", //操作id 再控制用
					// 	opType: "addNode", // 操作类型，添加一个节点或精灵
					// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					// 	nodes: [
					// 		{
					// 			nodeId: "addBlackA", // 节点id，定位用
					// 			surface: "a",  //根节点必须指定工作面，子节点工作面自动忽略
					// 			// node参数
					// 			pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					// 			rotation: 0, // 角度
					// 			nodes: [], // 子节点
					// 			canTap: true,
					// 			visible: true, //显示，如果为false，逻辑数据会跳过
					// 			shape: {
					// 				type: "rect",
					// 				rect: {
					// 					lt: {
					// 						x: 0,
					// 						y: 0
					// 					},
					// 					rb: {
					// 						x: 20,
					// 						y: 0
					// 					}
					// 				},
					// 				rgba: {
					// 					r: 0,
					// 					g: 0,
					// 					b: 0,
					// 					a: 1
					// 				}
					// 			},
					// 		}
					// 	]
					// }
					// gameFuncs.op(opInfoA);
					//获取跳关后的时间作为判断积分规则
					challengeTime = nowInfos.gameCountTime
					//获取跳关后的生命值作为判断积分规则
					challengeLife = nowInfos.lifePoint

					tranInfos.biepeng = 1
					setTimeout(() => {
						roomFunction.goToNextGame()
						tranPlusFuncs.blueShow(usersInfos.usersResult.length)
						//重新生成
					}, 3000);
					roomFunction.playSound(false, "tranGuoGuan")
					tranPlusFuncs.blueNoTap()
					engine.log("本轮已过关请站在绿色区域等待下一关开始")

					// canTapNum = []


					//tranPlusFuncs.blueShow(usersInfos.usersResult.length)
					nowInfos.gameCountTime = 60
				}
				else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
					roomFunction.playSoundTivite(false, "pick", "positive")
					nowInfos.target--
					nowInfos.allTarget++
					usersInfos.gameScore += 5
					// usersInfos.levelScore += 5
					tranPlusFuncs.ScorePlay()
					guole++
					wanFa_tranPlus.gameLevelEnd()
				}
			}
		}

		// }

	},


	CountPlay() {
		tranPlusFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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

			if (nowInfos.gameCountTime == 0) {
				wanFa_tranPlus.gameLevelEnd()
			}
			if (nowInfos.gameCountTime == 10 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				roomFunction.playSound(false, "daoshu10")
			}
		}, 1000, nowInfos.gameCountTime + 5)
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
