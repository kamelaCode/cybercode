const wanFa_norm = {
	tmid: null,

	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_norm.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_norm.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_norm.gameDestroy);
		//重置全局变量
		normFuncs.resetAll()
		clearInterval(normFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}





		//开门入场流程
		const sec = 10;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		setTimeout(function () {
			setTimeout(function () {
				roomFunction.playSound(true, "bgm02")
			}, 2000);

			if (levelInfos.wanFa.startsWith("norm")) {
				roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
				normFuncs.CountPlay();
			}
		}, sec * 1000);
		roomFunction.playSound(false, "gamestart");
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_norm.gameTaped)
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("norm") && gameid != "normteach001-cxx") {
			nowInfos.gameCountTime = 40
			nowInfos.target = 30;
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			if (gameid != "normteach001-cxx" && aaa == 0) {
				setTimeout(() => {
					roomFunction.playSound(false, "rgbrule")
				}, 3500);
				aaa = 1
			}
			// setTimeout(function() {
			roomFunction.playSound(false, "togreen")
			// }, 6000);
			normFuncs.CountPlay()
			normFuncs.ScorePlay()
		}

		if (gameid.startsWith("normteach001-cxx")) {
			nowInfos.gameCountTime = 100
			nowInfos.target = 10
			normFuncs.CountPlay()
			normFuncs.ScorePlay()
			gameRules.lifeMove()
			nowInfos.nowGameid = gameid
			roomFunction.playSound(false, "teachRed2")
			setTimeout(() => {
				normFuncs.redPlay()
			}, 3000);
		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		if (nowInfos.nowGameid.startsWith("norm")) {

			normFuncs.blueTap(face, x, y, onOff, nodeId, event);
			normFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			gameRules.tapBlink(face, x, y, onOff, nodeId, event)
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(normFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_norm.gameTaped)
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
				wanFa_norm.gameLevelEnd()
			}
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(normFuncs.CountPlay.innerCount)
		roomFunction.stopSound("bgm02")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("teachBlue2")
		roomFunction.stopSound("teachRed")
		roomFunction.goToGameLevel("leave_hold", "none")
		normFuncs.rmAllListener()
		wanFaCtl_normCtl.gameEndCtl(nowInfos.allTarget / 150, nowInfos.lifePoint, nowInfos.gameCountTime)
		levelInfos.gameIdList = []
	}

}




const normFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 40;
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
		engine.removeEventListener("gamePlay", wanFa_norm.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_norm.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_norm.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_norm.gameTimeOver)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true) {
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				if (nowInfos.nowGameid == "normteach001-cxx") {
					if (nowInfos.lifePoint == 6) {
						roomFunction.playSound(false, "teachRed")
						fastop.removeNode("rmred203", nodeId)
						setTimeout(() => {
							roomFunction.playSound(false, "teachBlue2")
							normFuncs.addGreen()
							normFuncs.addBlue()
							normFuncs.randomBlue(10)
							setTimeout(() => {
								normFuncs.redPlay2()
							}, 11000);
						}, 4500);

					}
				}
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
					wanFa_norm.gameLevelEnd()
				}
			}
		}
	},
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("blue")) {
			engine.log("蓝点触碰")

			if (onOff == true) {
				if (nowInfos.target > 1) {
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSound(false, "right")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					usersInfos.levelScore += nowInfos.scoreCoefficient;
					normFuncs.ScorePlay()
				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						normFuncs.ScorePlay();
						let nowGame = levelInfos.gameIdList.indexOf(nowInfos.nowGameid);
						nowGame++;
						roomFunction.goToNextGame();
						roomFunction.playSound(false, "levelup")
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						usersInfos.levelScore += nowInfos.scoreCoefficient;
						normFuncs.ScorePlay()
						wanFa_norm.gameLevelEnd();
					}
				}
			}
		}
		// if (nodeId.startsWith("blue201")&& onOff == true && nowInfos.target == 9) {
		// 	setTimeout(() => {
		// 		roomFunction.playSound(false,"teachBlue")
		// 	}, 1000);

		// }

		// 	if (nodeId.startsWith("green201") && onOff == true && aaa==0) {
		// 		setTimeout(() => {
		// 			roomFunction.playSound(false,"teachGreen")
		// 		}, 2000);

		// 	aaa=1
		// }

	},
	redPlay() {
		let opInfo = {
			opId: "addRed",
			opType: "addNode",
			opNode: "red203",
			nodes: [{
				nodeId: "red203",
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
							y: 14
						},
						rb: {
							x: 9,
							y: 17
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
	redPlay2() {
		let opInfo1 = {
			opId: "redMove",
			opType: "play",
			opNode: "red202",
			timeLen: 20,
			loop: "true",
			keyFrames: [{
				t: 0,
				keyFrame: {
					visible: "true",
					canTap: "true",
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 15,
								y: 0
							},
							rb: {
								x: 15,
								y: 31
							}
						}
					}
				}
			},
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
								y: 0
							},
							rb: {
								x: 15,
								y: 31
							}
						}
					}
				}
			},
			{
				t: 1,
				keyFrame: {
					// surface: "a",
					visible: "true",
					canTap: "true",
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 15,
								y: 0
							},
							rb: {
								x: 15,
								y: 31
							}
						}
					}
				}
			}]
		}
		gameFuncs.op(opInfo1);
	},
	addGreen() {
		let opInfo = {
			opId: "addGreen",
			opType: "addNode",
			opNode: "green201",
			nodes: [{
				nodeId: "green201",
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
							y: 0
						},
						rb: {
							x: 9,
							y: 3
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
		let opInfo1 = {
			opId: "addGreen",
			opType: "addNode",
			opNode: "green2011",
			nodes: [{
				nodeId: "green2011",
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
							y: 7
						},
						rb: {
							x: 9,
							y: 10
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
		gameFuncs.op(opInfo1)
		let opInfo2 = {
			opId: "addGreen",
			opType: "addNode",
			opNode: "green2012",
			nodes: [{
				nodeId: "green2012",
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
							y: 14
						},
						rb: {
							x: 9,
							y: 17
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
		gameFuncs.op(opInfo2)
		let opInfo3 = {
			opId: "addGreen",
			opType: "addNode",
			opNode: "green2013",
			nodes: [{
				nodeId: "green2013",
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
							y: 21
						},
						rb: {
							x: 9,
							y: 24
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
		gameFuncs.op(opInfo3)
		let opInfo4 = {
			opId: "addGreen",
			opType: "addNode",
			opNode: "green2014",
			nodes: [{
				nodeId: "green2014",
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
							y: 28
						},
						rb: {
							x: 9,
							y: 31
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
		gameFuncs.op(opInfo4)
	},
	addBlue() {
		let opInfo = {
			opId: "addBlue",
			opType: "addNode",
			opNode: "blue2011",
			nodes: [{
				nodeId: "blue2011",
				surface: "a",
				pt: {
					x: 9,
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
		gameFuncs.op(opInfo)
		let opInfo1 = {
			opId: "addBlue",
			opType: "addNode",
			opNode: "blue2012",
			nodes: [{
				nodeId: "blue2012",
				surface: "a",
				pt: {
					x: 13,
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
		gameFuncs.op(opInfo1)

		let opInfo2 = {
			opId: "addBlue",
			opType: "addNode",
			opNode: "blue2013",
			nodes: [{
				nodeId: "blue2013",
				surface: "a",
				pt: {
					x: 15,
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
		gameFuncs.op(opInfo2)

		let opInfo3 = {
			opId: "addBlue",
			opType: "addNode",
			opNode: "blue2014",
			nodes: [{
				nodeId: "blue2014",
				surface: "b",
				pt: {
					x: 15,
					y: 36
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
		gameFuncs.op(opInfo3)

		let opInfo4 = {
			opId: "addBlue",
			opType: "addNode",
			opNode: "blue2015",
			nodes: [{
				nodeId: "blue2015",
				surface: "b",
				pt: {
					x: 8,
					y: 35
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
		gameFuncs.op(opInfo4)
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
				opNode: "blue201",
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
							a: 0.9
						}
					}
				}]
			}
			i++;
			gameFuncs.op(opInfo)
		}
	},
	CountPlay() {
		normFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
