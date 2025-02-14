const wanFa_damifeng = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_damifeng.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_damifeng.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_damifeng.gameDestroy);
		//重置全局变量
		damifengFuncs.resetAll()
		clearInterval(damifengFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}



		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		setTimeout(() => {
			surfaceCtr.ctlDoor(1, 7000);
		}, 500);

		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		setTimeout(function () {
			// setTimeout(function () {
			// roomFunction.playSound(true, "damifengbgm")
			// }, 2000);
			if (levelInfos.wanFa.startsWith("damifeng")) {
				roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
				damifengFuncs.CountPlay();
			}
		}, sec * 1000);
		setTimeout(() => {
			surfaceCtr.ctlDoor(0, 5000);
			roomFunction.playSound(false, "gamestart");
		}, 4000);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_damifeng.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("damifeng")) {
			opClear = 0
			nowInfos.gameCountTime = 90
			nowInfos.target = 5;
			// setTimeout(function () {
			// 	roomFunction.playSound(false, "rgbrule")
			// }, 3500);
			if (gameid == "damifeng001-hf") {
				roomFunction.playSound(false, "damifengrule")
				setTimeout(() => {
					roomFunction.playSound(true, "damifengbgm", "background")
				}, 5000);
			} else {
				roomFunction.playSound(true, "damifengbossbgm", "background")
			}
			gameCtl = 0
			nowInfos.nowGameid = gameid;
			feiji003Life = 15
			gameRules.lifeMove();
			damifengFuncs.CountPlay()
			damifengFuncs.ScorePlay()
		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (nowInfos.nowGameid.startsWith("damifeng")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
			if (nowInfos.nowGameid == "damifeng001-hf") {
				damifengFuncs.blueTap(face, x, y, onOff, nodeId, event);
			} else if (nowInfos.nowGameid == "damifeng002-hf") {
				damifengFuncs.blueBossTap(face, x, y, onOff, nodeId, event)
			}
			damifengFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			damifengFuncs.greenTap(face, x, y, onOff, nodeId, event);
			// gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(damifengFuncs.tapWrong.determine)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(damifengFuncs.CountPlay.innerCount)
		clearInterval(damifengFuncs.CountPlay.innerCount)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			// if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
			// 	roomFunction.goToNextGame()
			// 	roomFunction.playSound(false, "levelup")
			// } else {
			wanFa_damifeng.gameLevelEnd()
			// }
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(damifengFuncs.CountPlay.innerCount)
		opClear = 1
		roomFunction.stopSound("damifengbgm")
		roomFunction.stopSound("damifengbossbgm")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("fenwei")
		roomFunction.goToGameLevel("leave_hold", "none")
		damifengFuncs.rmAllListener()
		wanFaCtl_damifengCtl.gameEndCtl(nowInfos.nowGameid, nowInfos.lifePoint)
		levelInfos.gameIdList = []
	}

}




const damifengFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		opClear = 0
		feijiMoveStart = 0
		feijiMoveEnd = 0
		feijiMoveTimes = 0
		feiji001Life = 10
		feiji002Life = feiji001Life
		feiji003Life = 15
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_damifeng.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_damifeng.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_damifeng.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_damifeng.gameTaped)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if ((nodeId.startsWith("zidan") || nodeId.startsWith("feiji.feiji002.zidanleishe") || nodeId.startsWith("feiji.feiji001.zidanleishe")) && onOff == true) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				damifengFuncs.tapWrong.determine = setTimeout(() => {
					damifengFuncs.addBlink(x, y)
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
						wanFa_damifeng.gameLevelEnd()
					}
				}, 75);

			}
		}
	},

	greenTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("green") && onOff == false) {
			roomFunction.playSoundTivite(false, "right", "positive")
			fastop.nodeMove(nodeId, nodeId, 1, false, "a", -1, 0, -1, 0)//节点移动zzptx,zzpty,
			nowInfos.lifePoint++;
			gameRules.lifeMove();
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
	blueTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("fire") && onOff == true && (feiji001Life != 0 || feiji002Life != 0)) {
			usersInfos.ValidTarget++
			roomFunction.playSoundTivite(false, "biu", "positive");
			let feijiPlaceCtl = feijiMoveTimes + 2
			let zidanYDistance = 0
			let feiji001Xleft
			let feiji001XRight
			let feiji002Xleft
			let feiji002Right
			switch (feijiPlaceCtl % 4) {
				case 0:
					feiji001Xleft = 0
					feiji001XRight = 6
					feiji002Xleft = 7
					feiji002Right = 16
					break;
				case 1:
					feiji001Xleft = 1
					feiji001XRight = 7
					feiji002Xleft = 8
					feiji002Right = 13
					break;
				case 2:
					feiji001Xleft = 2
					feiji001XRight = 8
					feiji002Xleft = 9
					feiji002Right = 15
					break;
				case 3:
					feiji001Xleft = 3
					feiji001XRight = 9
					feiji002Xleft = 10
					feiji002Right = 16
					break;
			}
			engine.log("feiji001Xleft" + feiji001Xleft)
			engine.log("feiji001XRight" + feiji001XRight)
			engine.log("feiji002Xleft" + feiji002Xleft)
			engine.log("feiji002Right" + feiji002Right)

			if (x >= feiji001Xleft - 1 && x <= feiji001XRight - 1 && feiji001Life != 0) {
				feiji001Life--
				setTimeout(() => {
					if (opClear == 1) {
						return
					}
					let feijiShan001 = {
						opId: "feiji.feiji001Shan",
						opType: "play",
						opNode: "feiji.feiji001",
						timeLen: 1,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: "false",
									canTap: "fasle"
								}
							},
							{
								t: 0.2,
								keyFrame: {
									visible: "true",
									canTap: "fasle"
								}
							},
							{
								t: 0.4,
								keyFrame: {
									visible: "false",
									canTap: "fasle"
								}
							},
							{
								t: 0.6,
								keyFrame: {
									visible: "true",
									canTap: "fasle"
								}
							},
							{
								t: 0.8,
								keyFrame: {
									visible: "false",
									canTap: "fasle"
								}
							},
							{
								t: 1,
								keyFrame: {
									visible: "true",
									canTap: "false"
								}
							}

						]
					}
					gameFuncs.op(feijiShan001);
					if (feiji001Life == 0) {
						fastop.setNodeVisible("feijiDis001", "feiji.feiji001", 2, "true", "true", "false", "false")
					}

				}, 2000);
				zidanYDistance = 38
			} else if ((x >= feiji002Xleft - 1 && x <= feiji002Right) && feiji002Life != 0) {
				feiji002Life--
				setTimeout(() => {
					if (opClear == 1) {
						return
					}
					let feijiShan002 = {
						opId: "feiji.feiji002Shan",
						opType: "play",
						opNode: "feiji.feiji002",
						timeLen: 1,
						loop: "false",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									visible: "false",
									canTap: "fasle"
								}
							},
							{
								t: 0.2,
								keyFrame: {
									visible: "true",
									canTap: "fasle"
								}
							},
							{
								t: 0.4,
								keyFrame: {
									visible: "false",
									canTap: "fasle"
								}
							},
							{
								t: 0.6,
								keyFrame: {
									visible: "true",
									canTap: "fasle"
								}
							},
							{
								t: 0.8,
								keyFrame: {
									visible: "false",
									canTap: "fasle"
								}
							},
							{
								t: 1,
								keyFrame: {
									visible: "true",
									canTap: "false"
								}
							}

						]
					}
					gameFuncs.op(feijiShan002);
					if (feiji002Life == 0) {
						fastop.setNodeVisible("feijiDis002", "feiji.feiji002", 2, "true", "true", "false", "false")
					}
				}, 2000);
				zidanYDistance = 38
				engine.log("truetruetruetruetrue")

			} else {
				zidanYDistance = 42

			}
			let randomYNum = Math.floor(Math.random() * 25);
			let opInfo = {
				opId: nodeId + "play",
				opType: "play",
				opNode: nodeId,
				timeLen: 2,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: y
							},

						},
						visible: true,
						canTap: false
					},
					{
						t: 0.8,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: zidanYDistance
							},
							visible: true,
							canTap: false
						}
					},
					{
						t: 0.99,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: zidanYDistance
							},
							visible: true,
							canTap: true
						}
					},
					{
						t: 1,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: randomYNum
							}
							,
							visible: true,
							canTap: true
						}
					}
				]
			}
			gameFuncs.op(opInfo);



			//如果在规定时间内消灭敌人则跳关不然就游戏结束
			if (feiji001Life == 0 && feiji002Life == 0) {
				setTimeout(() => {
					roomFunction.goToNextGame()
				}, 3000);
				gameCtl = 1
				nowInfos.lifePoint = 6
				roomFunction.playSoundTivite(false, "levelup", "positive")
				engine.log("levelup111")
				roomFunction.stopSound("damifengbgm")
				roomFunction.stopSound("daoshu10")



			}

		}
	},
	blueBossTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("fire") && onOff == true && feiji003Life != 0) {
			usersInfos.ValidTarget++
			roomFunction.playSoundTivite(false, "biu", "positive");

			feiji003Life--

			setTimeout(() => {
				if (opClear == 1) {
					return
				}

				let feijiShan001 = {
					opId: "feiji.feiji003Shan",
					opType: "play",
					opNode: "feiji.feiji003",
					timeLen: 1,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								visible: "false",
								canTap: "fasle"
							}
						},
						{
							t: 0.2,
							keyFrame: {
								visible: "true",
								canTap: "fasle"
							}
						},
						{
							t: 0.4,
							keyFrame: {
								visible: "false",
								canTap: "fasle"
							}
						},
						{
							t: 0.6,
							keyFrame: {
								visible: "true",
								canTap: "fasle"
							}
						},
						{
							t: 0.8,
							keyFrame: {
								visible: "false",
								canTap: "fasle"
							}
						},
						{
							t: 1,
							keyFrame: {
								visible: "true",
								canTap: "false"
							}
						}

					]
				}
				gameFuncs.op(feijiShan001);

			}, 2000);
			if (feiji003Life == 0) {
				wanFa_damifeng.gameLevelEnd()
				fastop.setNodeVisible("feijiDis003", "feiji.feiji003", 2, "false", "false", "false", "false")

				gameCtl = 1

			}

			let randomYNum = Math.floor(Math.random() * 25);

			let opInfo = {
				opId: nodeId + "play",
				opType: "play",
				opNode: nodeId,
				timeLen: 2,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: y
							},

						},
						visible: true,
						canTap: false
					},
					{
						t: 0.8,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: 35
							},
							visible: true,
							canTap: false
						}
					},
					{
						t: 0.99,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: 35
							},
							visible: false,
							canTap: false
						}
					},
					{
						t: 1,
						keyFrame: {
							surface: face,
							pt: {
								x: x,
								y: randomYNum
							}
							, visible: true,
							canTap: true
						}
					}
				]
			}
			gameFuncs.op(opInfo);
		}
	},
	CountPlay() {

		damifengFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						label1: "敌人",
						value1: "#FFFFFF",
						label2: "血量",
						value2: nowInfos.nowGameid == "damifeng001-hf" ? (feiji001Life > feiji002Life ? feiji001Life : feiji002Life) : feiji003Life
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

			if (nowInfos.gameCountTime == 10) {
				roomFunction.playSound(false, "daoshu10")
			}

			if (nowInfos.nowGameid == "damifeng001-hf") {
				//墙面闪烁绿色按钮加血
				if ((nowInfos.gameCountTime == 80 || nowInfos.gameCountTime == 50 || nowInfos.gameCountTime == 20 || nowInfos.gameCountTime == 20) && nowInfos.lifePoint < 6) {
					let randomXNum = Math.floor(Math.random() * 23);
					engine.log("randomXNum" + randomXNum)
					roomFunction.playSound(false, "greenaddxue")
					let opInfo = {
						opId: "green001play",
						opType: "play",
						opNode: "green001",
						timeLen: 1,
						loop: true,
						keyFrames: [
							{
								t: 0,

								keyFrame: {
									surface: "a",
									pt: {
										x: randomXNum,
										y: 0
									},

								},
								visible: true,
								canTap: true
							},
							{
								t: 0.25,

								keyFrame: {
									// surface: "a",

									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// },
									visible: false,
									canTap: true
								}
							},
							{
								t: 0.5,

								keyFrame: {
									// surface: "a",

									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// },
									visible: true,
									canTap: true
								}
							},
							{
								t: 0.75,

								keyFrame: {
									// surface: "a",

									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// },
									visible: false,
									canTap: true
								}
							},
							{
								t: 1,

								keyFrame: {
									// surface: "a",
									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// }
									// ,
									visible: true,
									canTap: true
								}
							}
						]
					}
					gameFuncs.op(opInfo);
				}
				switch (feijiMoveTimes % 4) {
					case 0:
						feijiMoveStart = 0
						feijiMoveEnd = 1
						break;
					case 1:
						feijiMoveStart = 1
						feijiMoveEnd = 2
						break;
					case 2:
						feijiMoveStart = 2
						feijiMoveEnd = 1
						break;
					case 3:
						feijiMoveStart = 1
						feijiMoveEnd = 0
						break;

				}

				fastop.nodeMove("feijiplayA001", "feiji.feiji001", "1", false, "b", feijiMoveStart, 0, feijiMoveEnd, 0)
				fastop.nodeMove("feijiplayB001", "feiji.feiji002", "1", false, "b", 7 + feijiMoveStart, 0, 7 + feijiMoveEnd, 0)
				switch (nowInfos.gameCountTime % 10) {
					case 1:
						//飞机A发射子弹
						if (feiji001Life > 0) {

							fastop.nodeMove("zidanplayA001", "zidanA001", "4", false, "b", feijiMoveStart, 37, feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA002", "zidanA002", "4", false, "b", 3 + feijiMoveStart, 35, 3 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA003", "zidanA003", "4", false, "b", 6 + feijiMoveStart, 37, 6 + feijiMoveStart, -36)
						}
						//飞机B发射子弹
						if (feiji002Life > 0) {
							fastop.nodeMove("zidanplayB001", "zidanB001", "4", false, "b", 7 + feijiMoveStart, 37, 7 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB002", "zidanB002", "4", false, "b", 10 + feijiMoveStart, 35, 10 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB003", "zidanB003", "4", false, "b", 13 + feijiMoveStart, 37, 13 + feijiMoveStart, -36)
						}

						break
					case 3:
						//飞机A发射子弹
						if (feiji001Life > 0) {
							fastop.nodeMove("zidanplayA004", "zidanA004", "4", false, "b", feijiMoveStart, 37, feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA005", "zidanA005", "4", false, "b", 3 + feijiMoveStart, 35, 3 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA006", "zidanA006", "4", false, "b", 6 + feijiMoveStart, 37, 6 + feijiMoveStart, -36)
						}

						//飞机B发射子弹
						if (feiji002Life > 0) {
							fastop.nodeMove("zidanplayB004", "zidanB004", "4", false, "b", 7 + feijiMoveStart, 37, 7 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB005", "zidanB005", "4", false, "b", 10 + feijiMoveStart, 35, 10 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB006", "zidanB006", "4", false, "b", 13 + feijiMoveStart, 37, 13 + feijiMoveStart, -36)
						}

						break
					case 5:
						//飞机A发射子弹
						if (feiji001Life > 0) {
							fastop.nodeMove("zidanplayA001", "zidanA001", "4", false, "b", feijiMoveStart, 37, feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA002", "zidanA002", "4", false, "b", 3 + feijiMoveStart, 35, 3 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA003", "zidanA003", "4", false, "b", 6 + feijiMoveStart, 37, 6 + feijiMoveStart, -36)

						}

						//飞机B发射子弹
						if (feiji002Life > 0) {
							fastop.nodeMove("zidanplayB001", "zidanB001", "4", false, "b", 7 + feijiMoveStart, 37, 7 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB002", "zidanB002", "4", false, "b", 10 + feijiMoveStart, 35, 10 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB003", "zidanB003", "4", false, "b", 13 + feijiMoveStart, 37, 13 + feijiMoveStart, -36)
						}

						break;
					case 7:


						//飞机A发射子弹
						if (feiji001Life > 0) {
							fastop.nodeMove("zidanplayA004", "zidanA004", "4", false, "b", feijiMoveStart, 37, feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA005", "zidanA005", "4", false, "b", 3 + feijiMoveStart, 35, 3 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA006", "zidanA006", "4", false, "b", 6 + feijiMoveStart, 37, 6 + feijiMoveStart, -36)
							// roomFunction.playSound(false, "fashejiguangjiguang")
							let opInfoFuGaiA = {
								opId: "leisheFuGaiAPlay",
								opType: "play",
								opNode: "feiji.feiji001.leishefugai001",
								timeLen: 2,
								loop: "false",
								keyFrames: [
									{
										t: 0,
										keyFrame: {
											visible: "true",
											canTap: "true",
											surface: "b",
											pt: {
												x: 3,
												y: -36
											}
										}
									},
									{
										t: 0.5,
										keyFrame: {
											visible: "true",
											canTap: "true",
											surface: "b",
											pt: {
												x: 3,
												y: -36
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
												x: 3,
												y: -70
											}
										}
									}

								]
							}
							gameFuncs.op(opInfoFuGaiA);



							let opInfoShanA = {
								opId: "leisheShanAPlay",
								opType: "play",
								opNode: "feiji.feiji001.zidanleisheA001",
								timeLen: 1,
								loop: "false",
								keyFrames: [
									{
										t: 0,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									},
									{
										t: 0.2,
										keyFrame: {
											visible: "true",
											canTap: "fasle"
										}
									},
									{
										t: 0.4,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									},
									{
										t: 0.6,
										keyFrame: {
											visible: "true",
											canTap: "fasle"
										}
									},
									{
										t: 0.8,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									},
									{
										t: 1,
										keyFrame: {
											visible: "true",
											canTap: "true"
										}
									}

								]
							}
							gameFuncs.op(opInfoShanA);
						}

						//飞机B发射子弹
						if (feiji002Life > 0) {
							fastop.nodeMove("zidanplayB004", "zidanB004", "4", false, "b", 7 + feijiMoveStart, 37, 7 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB005", "zidanB005", "4", false, "b", 10 + feijiMoveStart, 35, 10 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB006", "zidanB006", "4", false, "b", 13 + feijiMoveStart, 37, 13 + feijiMoveStart, -36)

							let opInfoFuGaiB = {
								opId: "leisheFuGaiAPlay",
								opType: "play",
								opNode: "feiji.feiji002.leishefugai002",
								timeLen: 2,
								loop: "false",
								keyFrames: [
									{
										t: 0,
										keyFrame: {
											visible: "true",
											canTap: "true",
											surface: "b",
											pt: {
												x: 3,
												y: -36
											}
										}
									},
									{
										t: 0.5,
										keyFrame: {
											visible: "true",
											canTap: "true",
											surface: "b",
											pt: {
												x: 3,
												y: -36
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
												x: 3,
												y: -70
											}
										}
									}

								]
							}
							gameFuncs.op(opInfoFuGaiB);

							let opInfoShanB = {
								opId: "leisheShanBPlay",
								opType: "play",
								opNode: "feiji.feiji002.zidanleisheB001",
								timeLen: 1,
								loop: "false",
								keyFrames: [
									{
										t: 0,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									},
									{
										t: 0.2,
										keyFrame: {
											visible: "true",
											canTap: "fasle"
										}
									},
									{
										t: 0.4,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									},
									{
										t: 0.6,
										keyFrame: {
											visible: "true",
											canTap: "fasle"
										}
									},
									{
										t: 0.8,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									},
									{
										t: 1,
										keyFrame: {
											visible: "true",
											canTap: "true"
										}
									}

								]
							}
							gameFuncs.op(opInfoShanB);
						}

						break
					case 9:


						//飞机A发射子弹
						if (feiji001Life > 0) {
							fastop.nodeMove("zidanplayA001", "zidanA001", "4", false, "b", feijiMoveStart, 37, feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA002", "zidanA002", "4", false, "b", 3 + feijiMoveStart, 35, 3 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayA003", "zidanA003", "4", false, "b", 6 + feijiMoveStart, 37, 6 + feijiMoveStart, -36)
							let opInfoShiA = {
								opId: "leisheShiAPlay",
								opType: "play",
								opNode: "feiji.feiji001.zidanleisheA001",
								timeLen: 5,
								loop: "false",
								keyFrames: [
									{
										t: 1,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									}

								]
							}
							gameFuncs.op(opInfoShiA);



						}

						//飞机B发射子弹
						if (feiji002Life > 0) {
							fastop.nodeMove("zidanplayB001", "zidanB001", "4", false, "b", 7 + feijiMoveStart, 37, 7 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB002", "zidanB002", "4", false, "b", 10 + feijiMoveStart, 35, 10 + feijiMoveStart, -36)
							fastop.nodeMove("zidanplayB003", "zidanB003", "4", false, "b", 13 + feijiMoveStart, 37, 13 + feijiMoveStart, -36)
							let opInfoShiB = {
								opId: "leisheShiBPlay",
								opType: "play",
								opNode: "feiji.feiji002.zidanleisheB001",
								timeLen: 5,
								loop: "false",
								keyFrames: [
									{
										t: 1,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									}

								]
							}
							gameFuncs.op(opInfoShiB);
						}




						break
				}
			} else if (nowInfos.nowGameid == "damifeng002-hf") {
				if ((nowInfos.gameCountTime == 80 || nowInfos.gameCountTime == 60 || nowInfos.gameCountTime == 40 || nowInfos.gameCountTime == 20) && nowInfos.lifePoint < 6) {
					let randomXNum = Math.floor(Math.random() * 23);
					engine.log("randomXNum" + randomXNum)
					roomFunction.playSound(false, "greenaddxue")
					let opInfo = {
						opId: "green001play",
						opType: "play",
						opNode: "green001",
						timeLen: 1,
						loop: true,
						keyFrames: [
							{
								t: 0,

								keyFrame: {
									surface: "a",
									pt: {
										x: randomXNum,
										y: 0
									},

								},
								visible: true,
								canTap: true
							},
							{
								t: 0.25,

								keyFrame: {
									// surface: "a",

									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// },
									visible: false,
									canTap: true
								}
							},
							{
								t: 0.5,

								keyFrame: {
									// surface: "a",

									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// },
									visible: true,
									canTap: true
								}
							},
							{
								t: 0.75,

								keyFrame: {
									// surface: "a",

									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// },
									visible: false,
									canTap: true
								}
							},
							{
								t: 1,

								keyFrame: {
									// surface: "a",
									// pt: {
									// 	x: randomXNum,
									// 	y: 0
									// }
									// ,
									visible: true,
									canTap: true
								}
							}
						]
					}
					gameFuncs.op(opInfo);
				}
				switch (nowInfos.gameCountTime % 10) {
					case 9:
						//飞机C发射子弹
						if (feiji003Life > 0) {
							let i = 0
							let j = 31
							let fireFunLeft = setInterval(() => {
								fastop.nodeMove("zidanplayC00" + i, "zidanC00" + i, "4", false, "b", i, 33, i, -1,)
								fastop.nodeMove("zidanplayC00" + j, "zidanC00" + j, "4", false, "b", j - 16, 33, j - 16, -1,)
								while (i == 15 || opClear == 1) {
									clearInterval(fireFunLeft)
									return
								}
								i++
								j--
							}, 200);

						}
						break
					case 8:
						//飞机C发射zhadan
						if (feiji003Life > 0 && (nowInfos.gameCountTime == 88 || nowInfos.gameCountTime == 68 || nowInfos.gameCountTime == 58 || nowInfos.gameCountTime == 48 || nowInfos.gameCountTime == 28 || nowInfos.gameCountTime == 8)) {
							var randomNum = Math.floor(Math.random() * 10) + 8;
							engine.log("randomNum" + randomNum)
							// fastop.nodeMove("zidanplayC007", "zidanC007", "2", false, "b", 7, 33, 7, randomNum,)

							let opInfo2 = {
								opId: "zidanzhandanPlay",
								opType: "play",
								opNode: "zidanC0032",
								timeLen: 5,
								loop: "false",
								keyFrames: [
									{
										t: 0,
										keyFrame: {
											surface: "b",
											pt: {
												x: 7,
												y: 31,
											},
											visible: true,
											canTap: "true",

											shape: {
												rect: {
													lt: { x: 0, y: 0 },
													rb: { x: 1, y: 1 }
												}
											}
										}
									},
									{
										t: 0.25,
										keyFrame: {
											surface: "b",
											pt: {
												x: 7,
												y: randomNum,
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
													lt: { x: -7, y: -7 },
													rb: { x: 8, y: 8 }
												}
											}
										}
									},
									{
										t: 1,
										keyFrame: {
											visible: "false",
											canTap: "fasle"
										}
									}
								]
							}
							gameFuncs.op(opInfo2);
						} else {
							if (feiji003Life > 0) {
								let opInfoFuGaiC = {
									opId: "leisheFuGaiCPlay",
									opType: "play",
									opNode: "leishefugai003",
									timeLen: 2,
									loop: "false",
									keyFrames: [
										{
											t: 0,
											keyFrame: {
												visible: "true",
												canTap: "true",
												surface: "b",
												pt: {
													x: 0,
													y: 0
												}
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
													y: -40
												}
											}
										}

									]
								}
								gameFuncs.op(opInfoFuGaiC);
								for (let i = 1; i <= 7; i++) {
									let opInfoShanA = {
										opId: "zidanleisheplayC00" + i,
										opType: "play",
										opNode: "zidanleisheC00" + i,
										timeLen: 1,
										loop: "false",
										keyFrames: [
											{
												t: 0,
												keyFrame: {
													visible: "false",
													canTap: "fasle"
												}
											},
											{
												t: 0.2,
												keyFrame: {
													visible: "true",
													canTap: "fasle"
												}
											},
											{
												t: 0.4,
												keyFrame: {
													visible: "false",
													canTap: "fasle"
												}
											},
											{
												t: 0.6,
												keyFrame: {
													visible: "true",
													canTap: "fasle"
												}
											},
											{
												t: 0.8,
												keyFrame: {
													visible: "false",
													canTap: "fasle"
												}
											},
											{
												t: 1,
												keyFrame: {
													visible: "true",
													canTap: "true"
												}
											}

										]
									}
									gameFuncs.op(opInfoShanA);
								}
							}
						}

						break
					case 5:
						//飞机C发射子弹
						if (feiji003Life > 0) {
							//删除镭射
							for (let i = 1; i <= 7; i++) {
								let opInfoShanC = {
									opId: "zidanleisheplayC00" + i,
									opType: "play",
									opNode: "zidanleisheC00" + i,
									timeLen: 1,
									loop: "false",
									keyFrames: [
										{
											t: 0,
											keyFrame: {
												visible: "false",
												canTap: "fasle"
											}
										}
									]
								}
								gameFuncs.op(opInfoShanC);
							}
							let i = 0
							let fireFunLeft = setInterval(() => {
								fastop.nodeMove("zidanplayC00" + i, "zidanC00" + i, "4", false, "b", i, 33, i, -1,)
								while (i == 15 || opClear == 1) {
									clearInterval(fireFunLeft)
									return
								}
								i++
							}, 200);

						}
						break
					case 1:
						//飞机C发射子弹
						if (feiji003Life > 0) {
							let j = 31
							let fireFunLeft = setInterval(() => {
								fastop.nodeMove("zidanplayC00" + j, "zidanC00" + j, "2", false, "b", j - 16, 33, j - 16, -1,)
								while (j == 16 || opClear == 1) {
									clearInterval(fireFunLeft)
									return
								}
								j--
							}, 200);

						}


				}
			}
			feijiMoveTimes++
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
					label1: "敌人",
					value1: "#FFFFFF",
					label2: "血量",
					value2: nowInfos.nowGameid == "damifeng001-hf" ? (feiji001Life > feiji002Life ? feiji001Life : feiji002Life) : feiji003Life
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
