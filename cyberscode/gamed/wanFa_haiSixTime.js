const wanFa_haiSixTime = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_haiSixTime.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_haiSixTime.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_haiSixTime.gameDestroy);
		//重置全局变量
		haiSixTimeFuncs.resetAll()
		clearInterval(haiSixTimeFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}
		engine.log("!!!gameIdList!!!=" + levelInfos.gameIdList)


		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_haiSixTime.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("hai")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						haiSixTimeFuncs.CountPlay();
					}
					break;
				case 18:
					roomFunction.playSound(true, "WarBgm", "background")
					break;
				case 19:
					clearInterval(wanFa_haiSixTime.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_haiSixTime.gameTaped)
		clearInterval(wanFa_haiSixTime.gamePlay.lyc)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("hai")) {
			nowInfos.nowGameid = gameid
			gameRules.lifeMove();
			haiSixTimeFuncs.CountPlay()
			haiSixTimeFuncs.ScorePlay()
			clearInterval(haiSixTimeFuncs.tiaoWin.Athree)
			clearSix = 0

			if (gameid == "haishu-cxx") {
				nowInfos.target = 30
			}
			if (gameid == "haiheng-cxx") {
				nowInfos.target = 30
			}
			if (gameid == "haibolang-cxx") {
				nowInfos.target = 30
			}
			if (gameid == "haishizi-cxx") {
				nowInfos.target = 30
			}
			if (gameid == "haikaihe-cxx") {
				nowInfos.target = 30
			}
			if (gameid == "haigundong-cxx") {
				nowInfos.target = 50
			}
			if (gameid == "haibianhuan-cxx") {
				nowInfos.target = 56
			}
			if (gameid == "haiduoge-cxx") {
				usersInfos.ValidTarget = 0
				nowInfos.target = 25
			}
			if (gameid == "haibaidong-cxx") {
				nowInfos.target = 27
			}
			if (gameid == "haixuanzhuan-cxx") {
				nowInfos.target = 24
				setTimeout(() => {
					haiSixTimeFuncs.blueFor()
				}, 3000);
			}
			wanFa_haiSixTime.gamePlay.jishi = setTimeout(() => {
				if (cwy == 999) {
					clearTimeout(wanFa_haiSixTime.gamePlay.jishi)
					return
				}
				cwy = 1
				//engine.log(guole + "caonimade")
				if (cwy == 1) {
					switch (guole) {
						case 0:
							engine.log("执行了")
							usersInfos.levelScore = 0;
							haiSixTimeFuncs.addRed8()
							roomFunction.playSound(false, "levelOne")
							break;
						case 1:
							haiSixTimeFuncs.num2()
							usersInfos.levelScore = 10;
							roomFunction.playSound(false, "levelTwo")
							break;
						case 2:
							haiSixTimeFuncs.num3()
							usersInfos.levelScore = 20;
							roomFunction.playSound(false, "levelThree")
							break;
						case 3:
							haiSixTimeFuncs.addRed9()
							usersInfos.levelScore = 30;
							roomFunction.playSound(false, "levelFour")
							break;
						case 4:
							haiSixTimeFuncs.addRed10()
							usersInfos.levelScore = 40;
							roomFunction.playSound(false, "levelFive")
							break;
						case 5:
							haiSixTimeFuncs.addRed11()
							usersInfos.levelScore = 60;
							roomFunction.playSound(false, "levelSix")
							break;
						case 6:
							haiSixTimeFuncs.addRed12()
							usersInfos.levelScore = 80;
							roomFunction.playSound(false, "levelSeven")
							break;
						case 7:
							haiSixTimeFuncs.addRed13()
							usersInfos.levelScore = 100;
							roomFunction.playSound(false, "levelEight")
							break;
						case 8:
							haiSixTimeFuncs.addRed14()
							usersInfos.levelScore = 120;
							roomFunction.playSound(false, "levelNine")
							break;
						case 9:
							haiSixTimeFuncs.addRed15()
							usersInfos.levelScore = 150;
							roomFunction.playSound(false, "levelTen")
							break;
					}
				}

			}, 5000);
			setTimeout(() => {
				engine.log("????????????")
				change = 0
			}, 5000);
		}
		//nowInfos.target = 2

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (nowInfos.nowGameid.startsWith("hai")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			haiSixTimeFuncs.blueTap(face, x, y, onOff, nodeId, event);
			haiSixTimeFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(haiSixTimeFuncs.tapWrong.determine)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(haiSixTimeFuncs.CountPlay.innerCount)
		clearInterval(wanFa_haiSixTime.gamePlay.haipro)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			wanFa_haiSixTime.gameLevelEnd()
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearTimeout(wanFa_haiSixTime.gamePlay.jishi)
		clearInterval(haiSixTimeFuncs.tiaoWin.Athree)
		clearInterval(haiSixTimeFuncs.CountPlay.innerCount)
		clearInterval(haiSixTimeFuncs.tapWrong.awa)
		clearInterval(wanFa_haiSixTime.gamePlay.haipro)
		clearInterval(wanFa_haiSixTime.gamePlay.lyc)
		roomFunction.stopSound("WarBgm")
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
		haiSixTimeFuncs.rmAllListener()
		let targetScore = 0
		if (nowInfos.target <= 5) {
			targetScore = 10
		}
		if (nowInfos.target <= 10 && nowInfos.target > 5) {
			targetScore = 8
		}
		if (nowInfos.target <= 15 && nowInfos.target > 10) {
			targetScore = 4
		}
		usersInfos.levelScore = usersInfos.levelScore + parseInt(challengeTime / 10) + targetScore + (challengeLife * 2)
		wanFaCtl_haiWarCtl.gameEndCtl(usersInfos.levelScore)
		levelInfos.gameIdList = []
		cwy = 999
		clearSix = 999
		if (guole == 9) {
			guole++
		}
		switch (guole) {
			case 0:
				roomFunction.playSound(false, "pass-zero")
				break;
			case 1:
				roomFunction.playSound(false, "pass-one")
				break;
			case 2:
				roomFunction.playSound(false, "pass-two")
				break;
			case 3:
				roomFunction.playSound(false, "pass-three")
				break;
			case 4:
				roomFunction.playSound(false, "pass-four")
				break;
			case 5:
				roomFunction.playSound(false, "pass-five")
				break;
			case 6:
				roomFunction.playSound(false, "pass-six")
				break;
			case 7:
				roomFunction.playSound(false, "pass-seven")
				break;
			case 8:
				roomFunction.playSound(false, "pass-eight")
				break;
			case 9:
				roomFunction.playSound(false, "pass-nine")
				break;
			case 10:
				roomFunction.playSound(false, "bigwin")
				break;
		}
	}

}




const haiSixTimeFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 60;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		challengeTime = 0
		challengeLife = 0
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		aaa = 0
		guole = 0
		cuowu = 0
		cwy = 0
		clearSix = 0
		usersInfos.ValidTarget = 0
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_haiSixTime.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_haiSixTime.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_haiSixTime.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_haiSixTime.gameTaped)
	},
	tiaoWin() {
		if (clearSix == 999) {
			clearInterval(haiSixTimeFuncs.tiaoWin.Athree)
			return
		}
		roomFunction.playSoundTivite(false, "321Go", "positive")
		haiSixTimeFuncs.addRed5()
		haiSixTimeFuncs.tiaoWin.Athree = setInterval(() => {
			clearSix++
			switch (clearSix) {
				case 1:
					haiSixTimeFuncs.oneFor()
					haiSixTimeFuncs.addRed6()
					break;
				case 2:
					haiSixTimeFuncs.oneFor1()
					haiSixTimeFuncs.addRed90()
					break;
				case 3:
					haiSixTimeFuncs.oneFor90()
					haiSixTimeFuncs.addRed3()
					haiSixTimeFuncs.addRed4()
					break;
			}
		}, 1000);
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
		}, 1000);

	},
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
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true && cuowu == 0) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				// setTimeout(() => {
				// 	haiSixTimeFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				haiSixTimeFuncs.tapWrong.determine = setTimeout(() => {
					haiSixTimeFuncs.addBlink(x, y)
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
						wanFa_haiSixTime.gameLevelEnd()
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
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		//engine.log(nodeId)
		if (nodeId.startsWith("blue") || nodeId.startsWith("mubiao001.blue") || nodeId.startsWith("mubiao002.blue") || nodeId.startsWith("mubiao003.blue")) {
			if (onOff == true) {
				usersInfos.ValidTarget++
				if (nowInfos.nowGameid == "haiduoge-cxx" && usersInfos.ValidTarget == 6) {
					haiSixTimeFuncs.randomBlueEleven(19)
				}
				if (nowInfos.target > 1) {
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSoundTivite(false, "bling2", "positive")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					// usersInfos.levelScore += nowInfos.scoreCoefficient;
					haiSixTimeFuncs.ScorePlay()

				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						// usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiSixTimeFuncs.ScorePlay();
						nowInfos.gameCountTime = 60
						change = 1//过长动画时间暂停
						engine.log("32go--------next")
						winLose = 0
						guole++
						roomFunction.goToNextGame();
						clearInterval(haiSixTimeFuncs.tiaoWin.Athree)
						clearSix = 0
						setTimeout(() => {
							haiSixTimeFuncs.tiaoWin()
						}, 1500);
						//获取跳关后的时间作为判断积分规则
						challengeTime = nowInfos.gameCountTime
						//获取跳关后的生命值作为判断积分规则
						challengeLife = nowInfos.lifePoint
						roomFunction.stopSound("fenwei")
						roomFunction.playSound(false, "levelup", "positive")
						//roomFunction.playSoundTivite(false, "dididi", "positive")
						// }, 2000);
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						// usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiSixTimeFuncs.ScorePlay()
						guole++
						wanFa_haiSixTime.gameLevelEnd();
					}
				}
			}
		}
	},
	//数字3
	num3() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one001",
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
					// {
					// 	nodeId: "one099",
					// 	surface: "b",
					// 	pt: {
					// 		x: 0,
					// 		y: 0
					// 	},
					// 	visible: true,
					// 	canTap: true,
					// 	shape: {
					// 		type: "rect",
					// 		rect: {
					// 			lt: {
					// 				x: 4,
					// 				y: 32
					// 			},
					// 			rb: {
					// 				x: 11,
					// 				y: 32
					// 			}
					// 		},
					// 		rgba: {
					// 			r: 254,
					// 			g: 254,
					// 			b: 254,
					// 			a: 1
					// 		}
					// 	}

					// },
					// {
					// 	nodeId: "one098",
					// 	surface: "b",
					// 	pt: {
					// 		x: 0,
					// 		y: 0
					// 	},
					// 	visible: true,
					// 	canTap: true,
					// 	shape: {
					// 		type: "rect",
					// 		rect: {
					// 			lt: {
					// 				x: 4,
					// 				y: 33
					// 			},
					// 			rb: {
					// 				x: 4,
					// 				y: 41
					// 			}
					// 		},
					// 		rgba: {
					// 			r: 254,
					// 			g: 254,
					// 			b: 254,
					// 			a: 1
					// 		}
					// 	}

					// },
					// {
					// 	nodeId: "one097",
					// 	surface: "b",
					// 	pt: {
					// 		x: 0,
					// 		y: 0
					// 	},
					// 	visible: true,
					// 	canTap: true,
					// 	shape: {
					// 		type: "rect",
					// 		rect: {
					// 			lt: {
					// 				x: 11,
					// 				y: 33
					// 			},
					// 			rb: {
					// 				x: 11,
					// 				y: 41
					// 			}
					// 		},
					// 		rgba: {
					// 			r: 254,
					// 			g: 254,
					// 			b: 254,
					// 			a: 1
					// 		}
					// 	}

					// },
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
			//opNode: "one008",
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
	//数字4
	addRed9() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one016",
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
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 4,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 11,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字5
	addRed10() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one017",
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
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 4,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 11,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字6
	addRed11() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one018",
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
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 4,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 11,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字7
	addRed12() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one019",
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
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 4,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 11,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字8
	addRed13() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one020",
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
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 4,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 11,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字9
	addRed14() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one021",
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
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 4,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 4,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 11,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字10
	addRed15() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			//opNode: "one022",
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
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字11
	addRed16() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0220",
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
							x: 4,
							y: 33
						},
						{
							x: 5,
							y: 33
						},
						{
							x: 6,
							y: 33
						},
						{
							x: 5,
							y: 34
						},
						{
							x: 5,
							y: 35
						},
						{
							x: 5,
							y: 36
						},
						{
							x: 5,
							y: 37
						},
						{
							x: 5,
							y: 38
						},
						{
							x: 5,
							y: 39
						},
						{
							x: 5,
							y: 40
						},
						{
							x: 5,
							y: 41
						},
						{
							x: 6,
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
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字12
	addRed17() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0221",
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
							x: 4,
							y: 33
						},
						{
							x: 5,
							y: 33
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
							x: 7,
							y: 34
						},
						{
							x: 7,
							y: 35
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 5,
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
							y: 40
						},


						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},
						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字13
	addRed18() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0222",
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
							x: 5,
							y: 37
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 7,
							y: 34
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
							y: 40
						},

						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},


						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字14
	addRed19() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0223",
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
							x: 4,
							y: 36
						},
						{
							x: 5,
							y: 33
						},
						{
							x: 6,
							y: 36
						},
						{
							x: 5,
							y: 34
						},
						{
							x: 5,
							y: 35
						},
						{
							x: 5,
							y: 36
						},
						{
							x: 5,
							y: 37
						},
						{
							x: 5,
							y: 38
						},
						{
							x: 5,
							y: 39
						},
						{
							x: 5,
							y: 40
						},
						{
							x: 5,
							y: 41
						},
						{
							x: 7,
							y: 36
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
							x: 7,
							y: 39
						},
						{
							x: 6,
							y: 40
						},
						//
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},


						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字15
	addRed20() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0224",
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
							x: 5,
							y: 38
						},
						{
							x: 6,
							y: 38
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
							x: 6,
							y: 41
						},
						{
							x: 5,
							y: 41
						},
						{
							x: 4,
							y: 41
						},

						//
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},


						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字16
	addRed21() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0225",
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
							x: 5,
							y: 37
						},
						{
							x: 6,
							y: 37
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
						//
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},


						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字17
	addRed22() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0226",
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
							x: 5,
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
							x: 4,
							y: 41
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
							y: 41
						},
						//
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},


						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字18
	addRed23() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0227",
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
							x: 5,
							y: 37
						},
						{
							x: 6,
							y: 37
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
							x: 5,
							y: 41
						},
						{
							x: 6,
							y: 41
						},

						//
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},


						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字19
	addRed24() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0228",
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
							x: 5,
							y: 37
						},
						{
							x: 6,
							y: 37
						},
						{
							x: 7,
							y: 34
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

						//
						{
							x: 10,
							y: 33
						},
						{
							x: 9,
							y: 33
						},
						{
							x: 11,
							y: 33
						},
						{
							x: 10,
							y: 34
						},
						{
							x: 10,
							y: 35
						},
						{
							x: 10,
							y: 36
						},
						{
							x: 10,
							y: 37
						},
						{
							x: 10,
							y: 38
						},
						{
							x: 10,
							y: 39
						},
						{
							x: 10,
							y: 40
						},


						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 12,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
			}]
		}
		gameFuncs.op(opInfo1)
	},
	//数字20
	addRed25() {
		let opInfo1 = {
			opId: "addRed",
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "one0229",
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
							x: 5,
							y: 41
						},
						{
							x: 6,
							y: 41
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
							x: 11,
							y: 33
						},
						{
							x: 12,
							y: 33
						},
						{
							x: 12,
							y: 34
						},
						{
							x: 12,
							y: 35
						},
						{
							x: 11,
							y: 36
						},
						{
							x: 10,
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
						//
						{
							x: 10,
							y: 41
						},
						{
							x: 11,
							y: 41
						},
						{
							x: 12,
							y: 40
						}

					],
					rgba: {
						r: 254,
						g: 80,
						b: 80,
						a: 1
					}
				},
				// nodes: [
				// 	{
				// 		nodeId: "one099",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 12,
				// 					y: 32
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one098",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 2,
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 2,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// 	{
				// 		nodeId: "one097",
				// 		surface: "b",
				// 		pt: {
				// 			x: 0,
				// 			y: 0
				// 		},
				// 		visible: true,
				// 		canTap: true,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 13,
				// 					y: 32
				// 				},
				// 				rb: {
				// 					x: 13,
				// 					y: 41
				// 				}
				// 			},
				// 			rgba: {
				// 				r: 254,
				// 				g: 254,
				// 				b: 254,
				// 				a: 1
				// 			}
				// 		}

				// 	},
				// ]
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
		haiSixTimeFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
			if (change == 0) {
				nowInfos.gameCountTime--;
			}
			if (nowInfos.gameCountTime == 5) {
				roomFunction.playSound(false, "fenwei")
			}
			if (nowInfos.gameCountTime == 0) {
				wanFa_haiSixTime.gameTimeOver()
			}
			if (nowInfos.gameCountTime == 10 && levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
				roomFunction.playSound(false, "daoshu10")
			}
		}, 1000, (nowInfos.gameCountTime + 6))

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
