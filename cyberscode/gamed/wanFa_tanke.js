const wanFa_tanke = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_tanke.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_tanke.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_tanke.gameDestroy);
		//重置全局变量
		tankeFuncs.resetAll()
		clearInterval(tankeFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}





		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		setTimeout(function () {
			//tankeFuncs.lettargetList()
			setTimeout(function () {
				roomFunction.playSound(true, "tankBgm")
			}, 10000);
			setTimeout(() => {
				roomFunction.playSound(false, "tankRules")
			}, 3000);

			if (levelInfos.wanFa.startsWith("tanke")) {
				roomFunction.playSound(false, "togreen")
				roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
				tankeFuncs.CountPlay();
			}
		}, sec * 1000);
		setTimeout(() => {
			roomFunction.playSound(false, "gamestart");
		}, 3500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_tanke.gameTaped)
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)
		setTimeout(() => {
			if (gameid.startsWith("tanke")) {
				nowInfos.gameCountTime = 90
				nowInfos.target = 20;
				nowInfos.nowGameid = gameid;

				tankeFuncs.tankeMove()
				//tankeFuncs.createTarget()

				gameRules.lifeMove();
				tankeFuncs.CountPlay()
				tankeFuncs.ScorePlay()
				tankeFuncs.createTanke()
				wanFa_tanke.gamePlay.cxx = setInterval(() => {
					engine.log("执行到了")
					tankeFuncs.createTanke()
					//tankeFuncs.tankeMove()
					tankeFuncs.showTank()

				}, 20000);

			}
		}, 5000);

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("tanke")) {

			//tankeFuncs.blueTap(face, x, y, onOff, nodeId, event);
			tankeFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			tankeFuncs.tankeTap(face, x, y, onOff, nodeId, event)

		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(tankeFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_tanke.gameTaped)
		engine.log("移除tap监听")
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
				roomFunction.goToNextGame()
				roomFunction.playSound(false, "levelup")
			} else {
				wanFa_tanke.gameLevelEnd()
			}
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(wanFa_tanke.gamePlay.cxx)
		clearInterval(tankeFuncs.CountPlay.innerCount)
		roomFunction.stopSound("tankBgm")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teachBlue2")
		roomFunction.stopSound("teachRed")
		roomFunction.goToGameLevel("leave_hold", "none")
		tankeFuncs.rmAllListener()
		wanFaCtl_tankeCtl.gameEndCtl(nowInfos.allTarget / 150, nowInfos.lifePoint, nowInfos.gameCountTime)
		levelInfos.gameIdList = []
	}

}




const tankeFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;

	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_tanke.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_tanke.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_tanke.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_tanke.gameTimeOver)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("tank001.red001.red002") || nodeId.startsWith("tank002.red002.red003") || nodeId.startsWith("tank003.red003.red004") || nodeId.startsWith("tank004.red004.red005") || nodeId.startsWith("tank005.red005.red006") || nodeId.startsWith("tank006.red006.red007") || nodeId.startsWith("tank007.red007.red008") || nodeId.startsWith("tank008.red008.red009") || nodeId.startsWith("tank009.red009.red0010") || nodeId.startsWith("tank0010.red0010.red0011") && onOff == true) {
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				if (nowInfos.lifePoint > 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSound(false, "wrong");
					if (nowInfos.lifePoint == 3) {
						roomFunction.playSound(false, "life")
					}
				} else if (nowInfos.lifePoint == 1) {
					nowInfos.lifePoint--;
					gameRules.lifeMove();
					roomFunction.playSound(false, "wrong");
					wanFa_tanke.gameLevelEnd()
				}
			}

		}
	},
	tankeTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "tank001.red001.blue3001" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank001.red001.blue3001",
				opType: "play",
				opNode: "tank001",
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
			nowInfos.target--
			nowInfos.allTarget++
			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank002.red002.blue3002" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank002.red002.blue3002",
				opType: "play",
				opNode: "tank002",
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
			nowInfos.target--
			nowInfos.allTarget++
			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank003.red003.blue3003" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank003.red003.blue3003",
				opType: "play",
				opNode: "tank003",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank004.red004.blue3004" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank004.red004.blue3004",
				opType: "play",
				opNode: "tank004",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank005.red005.blue3005" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank005.red005.blue3005",
				opType: "play",
				opNode: "tank005",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank006.red006.blue3006" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank006.red006.blue3006",
				opType: "play",
				opNode: "tank006",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank007.red007.blue3007" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank007.red007.blue3007",
				opType: "play",
				opNode: "tank007",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank008.red008.blue3008" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank008.red008.blue3008",
				opType: "play",
				opNode: "tank008",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank009.red009.blue3009" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank009.red009.blue3009",
				opType: "play",
				opNode: "tank009",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		} else if (nodeId == "tank0010.red0010.blue30010" && onOff == true) {
			//fastop.removeNode("rmRed","tank001")
			//fastop.addtanke("addTanke","tank001","tank001",4,-6,4,-4,"red001",4,-9,4,-7,3,-10,3,-9,3,-8,3,-7,3,-6,5,-10,5,-9,5,-8,5,-7,5,-6,254,0,0,"blue3000",4,-8,0,0,254)
			let opInfo2 = {
				opId: "tank0010.red0010.blue3009",
				opType: "play",
				opNode: "tank0010",
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
			nowInfos.target--
			nowInfos.allTarget++

			usersInfos.levelScore += 5
			roomFunction.playSound(false, "tank")

		}




		// if (onOff == true) {
		// 	for (let i = 1; i < 11; i++) {
		// 		for (let j = 0; j < 10; j++) {
		// 			if (nodeId == "tank00"+i+"blue300"+j) {
		// 				nowInfos.target--
		// 				usersInfos.levelScore+=5
		// 				tankeFuncs.ScorePlay()

		// 				let opInfo2 = {
		// 					opId: "tank"+i,
		// 					opType: "play",
		// 					opNode: "tank00"+i,
		// 					timeLen: 0.1,
		// 					loop: "false",
		// 					keyFrames: [
		// 						{
		// 							t: 0,
		// 							keyFrame: {
		// 								visible: false,
		// 								canTap: false
		// 							}
		// 						}
		// 					]
		// 				}
		// 				gameFuncs.op(opInfo2);
		// 			}else if (nowInfos.target == 1) {
		// 				nowInfos.target--
		// 				usersInfos.levelScore+=5
		// 				tankeFuncs.ScorePlay()
		// 				wanFa_tanke.gameLevelEnd()
		// 			}

		// 		}
		// 	}

		// }
	},
	showTank() {
		let opInfo2 = {
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank001",
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
		let opInfo3 = {
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank002",
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
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank003",
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
		let opInfo5 = {
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank004",
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
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank005",
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
		let opInfo7 = {
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank006",
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
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank007",
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
		let opInfo9 = {
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank008",
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
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank009",
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
		let opInfo11 = {
			opId: "tank001.red001.blue3000",
			opType: "play",
			opNode: "tank0010",
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
		gameFuncs.op(opInfo11);
	},
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	tankeMove() {
		let opInfo = {
			opId: "redPlay001",
			opType: "play",
			opNode: "tank001",
			timeLen: 15,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
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
							y: 60
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo)
		let opInfo1 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank002",
			timeLen: 12,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 30,
							y: 0
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo1)
		let opInfo2 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank003",
			timeLen: 16,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
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
							y: -60
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo2)
		let opInfo3 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank004",
			timeLen: 13,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
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
							y: 60
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo3)
		let opInfo4 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank005",
			timeLen: 10,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: -30,
							y: 0
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo4)
		let opInfo5 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank006",
			timeLen: 8,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 30,
							y: 0
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo5)
		let opInfo6 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank007",
			timeLen: 9,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: 30,
							y: 0
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo6)
		let opInfo7 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank008",
			timeLen: 11,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: "true",
						canTap: "true",
						surface: "b",
						pt: {
							x: -30,
							y: 0
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo7)
		let opInfo8 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank009",
			timeLen: 13,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
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
							y: -60
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo8)
		let opInfo9 = {
			opId: "redPlay003",
			opType: "play",
			opNode: "tank0010",
			timeLen: 11,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						}
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
							y: -60
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo9)
	},

	createTanke() {
		fastop.addtanke("addTanke", "tank001", "red001", 4, -6, 4, -4, "red002", 4, -9, 4, -7, 3, -10, 3, -9, 3, -8, 3, -7, 3, -6, 5, -10, 5, -9, 5, -8, 5, -7, 5, -6, 254, 0, 0, "blue3001", 4, -8, 0, 0, 254)
		fastop.addtanke("addTanke", "tank002", "red002", -6, 12, -4, 12, "red003", -10, 11, -9, 11, -8, 11, -7, 11, -6, 11, -10, 13, -9, 13, -8, 13, -7, 13, -6, 13, -7, 12, -9, 12, 254, 0, 0, "blue3002", -8, 12, 0, 0, 254)
		fastop.addtanke("addTanke", "tank003", "red003", 12, 42, 12, 44, "red004", 11, 44, 11, 45, 11, 46, 11, 47, 11, 48, 13, 44, 13, 45, 13, 46, 13, 47, 13, 48, 12, 47, 12, 45, 254, 0, 0, "blue3003", 12, 46, 0, 0, 254)
		fastop.addtanke("addTanke", "tank004", "red004", 11, -6, 11, -4, "red005", 10, -10, 10, -9, 10, -8, 10, -7, 10, -6, 12, -10, 12, -9, 12, -8, 12, -7, 12, -6, 11, -9, 11, -7, 254, 0, 0, "blue3004", 11, -8, 0, 0, 254)
		fastop.addtanke("addTanke", "tank005", "red005", 19, 17, 21, 17, "red006", 25, 16, 24, 16, 23, 16, 22, 16, 21, 16, 25, 18, 24, 18, 23, 18, 22, 18, 21, 18, 24, 17, 22, 17, 254, 0, 0, "blue3005", 23, 17, 0, 0, 254)
		fastop.addtanke("addTanke", "tank006", "red006", -6, 20, -4, 20, "red007", -10, 19, -9, 19, -8, 19, -7, 19, -6, 19, -10, 21, -9, 21, -8, 21, -7, 21, -6, 21, -9, 20, -7, 20, 254, 0, 0, "blue3006", -8, 20, 0, 0, 254)
		fastop.addtanke("addTanke", "tank007", "red007", -6, 24, -4, 24, "red008", -10, 23, -9, 23, -8, 23, -7, 23, -6, 23, -10, 25, -9, 25, -8, 25, -7, 25, -6, 25, -9, 24, -7, 24, 254, 0, 0, "blue3007", -8, 24, 0, 0, 254)
		fastop.addtanke("addTanke", "tank008", "red008", 19, 27, 21, 27, "red009", 25, 26, 24, 26, 23, 26, 22, 26, 21, 26, 25, 28, 24, 28, 23, 28, 22, 28, 21, 28, 24, 27, 22, 27, 254, 0, 0, "blue3008", 23, 27, 0, 0, 254)
		fastop.addtanke("addTanke", "tank009", "red009", 1, 48, 1, 50, "red0010", 0, 54, 0, 53, 0, 52, 0, 51, 0, 50, 2, 54, 2, 53, 2, 52, 2, 51, 2, 50, 1, 53, 1, 51, 254, 0, 0, "blue3009", 1, 52, 0, 0, 254)
		fastop.addtanke("addTanke", "tank0010", "red0010", 8, 48, 8, 50, "red0011", 7, 54, 7, 53, 7, 52, 7, 51, 7, 50, 9, 54, 9, 53, 9, 52, 9, 51, 9, 50, 8, 53, 8, 51, 254, 0, 0, "blue30010", 8, 52, 0, 0, 254)

	},
	CountPlay() {
		tankeFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
