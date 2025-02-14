const wanFa_tian = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_tian.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_tian.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_tian.gameDestroy);
		//重置全局变量
		tianFuncs.resetAll()
		clearInterval(tianFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}

		hefeng1 = 0
		playerNum = usersInfos.allUsers.length
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			neiUser[i] = usersInfos.allUsers[i].Nick
		}

		let wodiu = 0
		let qbq = 0
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			for (let j = 0; j < 10; j++) {
				if (wodiu == i) {
					if (neiUser[i].charCodeAt(j) > 255) {
						qbq++
						duoshao += 1.666666666
					} else {
						qbq++
						duoshao += 1
					}
					if (duoshao >= 7) {
						engine.log("第" + i + "个人显示前" + qbq + "个字")
						pkNameList[i] = neiUser[i].substring(0, qbq) + "..."
						duoshao = 0
						wodiu++
						qbq = 0
					}
				}
			}
			if (neiUser[i].length < 6) {
				pkNameList[i] = neiUser[i]
			}
		}
		tianFuncs.ScorePlay()
		//开门入场流程
		const sec = 1;//8
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		let countTime = 0
		heavenInfos.cantap = [1, 1, 1, 1, 1, 1]
		wanFa_tian.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					break;
				case 17:
					if (levelInfos.level == 3) {
						roomFunction.playSound(false, "tianteach")
					} else {
						roomFunction.playSound(false, "tianteach2")
					}
					if (levelInfos.wanFa.startsWith("tian")) {
						heavenInfos.gamemod = 0
						roomFunction.goToGameLevel("tian-lyc" + playerNum, "none")
						tianFuncs.CountPlay();
					}
					break;
				case 61:
					clearInterval(wanFa_tian.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);



		if (levelInfos.level == 3) {
			heavenInfos.time = 1.0
			heavenInfos.sudu = 1100
			heavenInfos.diff = 5
		}
		if (levelInfos.level == 2) {
			heavenInfos.time = 1.0
			heavenInfos.sudu = 1100
			heavenInfos.diff = 10
		}
		if (levelInfos.level == 1) {
			heavenInfos.time = 1.3
			heavenInfos.sudu = 1300
			heavenInfos.diff = 7
		}
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_tian.gameTaped)
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)

		if (gameid.startsWith("tian")) {
			nowInfos.gameCountTime = 125
			nowInfos.nowGameid = gameid;
			tianFuncs.suiji()
			gameRules.lifeMove();
			if (levelInfos.level == 3) {
				setTimeout(() => {
					if (heavenInfos.noteach == 0) {
						heavenInfos.noteach = 1
						roomFunction.playSound(true, "tianBgm", "background")
						wanFa_tian.gamePlay.inCount = setInterval(() => {
							tianFuncs.xian(heavenInfos.lun)//》为一时显示第0位样式箭头     为1 显示第一个
							heavenInfos.lun++//++										2
							if (heavenInfos.gamemod == 0) {//即显即踩模式
								if (heavenInfos.lun > 1) {//
									heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
									heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
									heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
									heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
									heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
									heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								}
								switch (heavenInfos.lun) {
									case 0:
										heavenInfos.cantap = [1, 1, 1, 1, 1, 1]
									case 1:
										//playsound 跟跳模式
										roomFunction.playSound(false, "tianji")
										engine.log("跟跳模式")
										heavenInfos.cantap2 = 1
										fastop.heavenbeijing("awawq", "white")
									case 4:
										heavenInfos.kaishi = 0
										heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
										heavenInfos.paiming = 0
										for (let i = 0; i < playerNum; i++) {//重置玩家颜色
											// if (i < 4) {
											for (let j = 0; j < 4; j++) {
												fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
											}
											// } else {
											for (let o = 4; o < 8; o++) {
												fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
											}
											// }
										}
										heavenInfos.cantap2 = 0
										heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
										break;
									case heavenInfos.diff + 2:
										fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
										heavenInfos.cantap2 = 1
										break;
									case 3 + heavenInfos.diff:
										heavenInfos.gamemod = 1
										tianFuncs.suiji()
										heavenInfos.lun = 0
										break;
								}
							} else {
								switch (heavenInfos.lun) { //记忆踩踏
									case 1:
										//playsound 记忆模式
										roomFunction.playSound(false, "tianre")
										engine.log("记忆模式")
										fastop.heavenbeijing("awawq", "white")
									case 4:
										heavenInfos.kaishi = 0
										heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
										heavenInfos.paiming = 0
										heavenInfos.cantap2 = 1
										for (let i = 0; i < playerNum; i++) {//重置玩家颜色
											// if (i < 4) {
											for (let j = 0; j < 4; j++) {
												fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
											}
											// } else {
											for (let o = 4; o < 8; o++) {
												fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
											}
											// }
										}
										heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
										heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
										heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
										heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
										heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
										heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
										break;
									case heavenInfos.diff + 2:
										heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
										heavenInfos.cantap2 = 0
										fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
										break;
									case 12 + heavenInfos.diff:
										heavenInfos.gamemod = 0
										tianFuncs.suiji()
										heavenInfos.lun = 0
										break;
								}
							}


							nowInfos.gameCountTime--
							switch (nowInfos.gameCountTime) {
								case 80:
									heavenInfos.diff = 5
									break;
								case 30:
									heavenInfos.diff = 6
									break;
							}
							if (nowInfos.gameCountTime == 0) {
								clearInterval(wanFa_tian.gamePlay.inCount)
								wanFa_tian.gameLevelEnd()
							}
							if (nowInfos.gameCountTime == 5) {
								roomFunction.playSound(false, "fenwei")
							}
							if (nowInfos.gameCountTime == 10) {
								roomFunction.playSound(false, "daoshu10")
							}
						}, 1000);
					}
				}, 30000);
			}
			if (levelInfos.level == 1) {
				nowInfos.gameCountTime = 110
				setTimeout(() => {
					if (heavenInfos.noteach == 0) {
						heavenInfos.noteach = 1
						roomFunction.playSound(true, "tianBgm", "background")
						heavenInfos.diff = 7
						wanFa_tian.gamePlay.inCount = setInterval(() => {
							nowInfos.gameCountTime--
							if (nowInfos.gameCountTime == 0) {
								clearInterval(wanFa_tian.gamePlay.inCount)
								clearInterval(wanFa_tian.gamePlay.fasttap)
								wanFa_tian.gameLevelEnd()
							}
							if (nowInfos.gameCountTime == 5) {
								roomFunction.playSound(false, "fenwei")
							}
							if (nowInfos.gameCountTime == 10) {
								roomFunction.playSound(false, "daoshu10")
							}
						}, 1000);
						wanFa_tian.gamePlay.fasttap = setInterval(() => {
							heavenInfos.noteach = 1
							tianFuncs.xian(heavenInfos.lun)//》为一时显示第0位样式箭头     为1 显示第一个
							heavenInfos.lun++//++										2
							if (heavenInfos.lun > 1) {//
								heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
							}
							switch (heavenInfos.lun) {
								case 1:
									heavenInfos.cantap2 = 1
									fastop.heavenbeijing("awawq", "white")
								case 4:
									heavenInfos.kaishi = 0
									heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
									heavenInfos.paiming = 0
									for (let i = 0; i < playerNum; i++) {//重置玩家颜色
										// if (i < 4) {
										for (let j = 0; j < 4; j++) {
											fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
										}
										// } else {
										for (let o = 4; o < 8; o++) {
											fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
										}
										// }
									}
									heavenInfos.cantap2 = 0
									heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
									break;
								case heavenInfos.diff + 2:
									fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
									heavenInfos.cantap2 = 1
									break;
								case 3 + heavenInfos.diff:
									if (nowInfos.gameCountTime > 5) {
										engine.log("难度升级")
										roomFunction.playSound(false, "tiansheng")
										tianFuncs.suiji()
										heavenInfos.lun = 0

									}
									break;
								case 12 + heavenInfos.diff:
									heavenInfos.shengji++
									heavenInfos.diff = heavenInfos.shengji + 10
									heavenInfos.sudu = 1100 - heavenInfos.shengji * 60
									heavenInfos.time = 1 - heavenInfos.shengji * 0.06
									break;
							}
						}, heavenInfos.sudu);
					}

				}, 14000);
			}
			if (levelInfos.level == 2) {
				nowInfos.gameCountTime = 120
				setTimeout(() => {
					if (heavenInfos.noteach == 0) {
						heavenInfos.noteach = 1
						roomFunction.playSound(true, "tianBgm", "background")
						heavenInfos.diff = 10
						wanFa_tian.gamePlay.inCount = setInterval(() => {
							nowInfos.gameCountTime--
							if (nowInfos.gameCountTime == 0) {
								clearInterval(wanFa_tian.gamePlay.inCount)
								clearInterval(wanFa_tian.gamePlay.fasttap)
								wanFa_tian.gameLevelEnd()
							}
							if (nowInfos.gameCountTime == 5) {
								roomFunction.playSound(false, "fenwei")
							}
							if (nowInfos.gameCountTime == 10) {
								roomFunction.playSound(false, "daoshu10")
							}
						}, 1000);
						wanFa_tian.gamePlay.fasttap = setInterval(() => {
							heavenInfos.noteach = 1
							tianFuncs.xian(heavenInfos.lun)//》为一时显示第0位样式箭头     为1 显示第一个
							heavenInfos.lun++//++										2
							if (heavenInfos.lun > 1) {//
								heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
								heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
							}
							switch (heavenInfos.lun) {
								case 1:
									heavenInfos.cantap2 = 1
									fastop.heavenbeijing("awawq", "white")
								case 4:
									heavenInfos.kaishi = 0
									heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
									heavenInfos.paiming = 0
									for (let i = 0; i < playerNum; i++) {//重置玩家颜色
										// if (i < 4) {
										for (let j = 0; j < 4; j++) {
											fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
										}
										// } else {
										for (let o = 4; o < 8; o++) {
											fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
										}
										// }
									}
									heavenInfos.cantap2 = 0
									heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
									break;
								case heavenInfos.diff + 2:
									fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
									heavenInfos.cantap2 = 1
									break;
								case 3 + heavenInfos.diff:
									if (nowInfos.gameCountTime > 5) {
										engine.log("难度升级")
										roomFunction.playSound(false, "tiansheng")
										tianFuncs.suiji()
										heavenInfos.lun = 0
									}
									break;
								case 6 + heavenInfos.diff:
									heavenInfos.shengji++
									heavenInfos.diff = heavenInfos.shengji * 2 + 10
									heavenInfos.sudu = 1100 - heavenInfos.shengji * 120
									heavenInfos.time = 1 - heavenInfos.shengji * 0.12
									break;
							}
						}, heavenInfos.sudu);
					}

				}, 14000);
			}
		}
	},
	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")
		if (onOff == true && heavenInfos.cantap2 == 0 && nodeId.indexOf(".") != -1) {
			let wei = nodeId.indexOf(".")
			let who = nodeId.substring(0, wei)//踩的哪个色
			let where = nodeId.substring(wei, nodeId.length)
			tianFuncs.taptap(who, where, nodeId)
		}
		if (face == "a" && heavenInfos.noteach == 0) {
			heavenInfos.noteach = 1
			roomFunction.stopSound("tianteach")
			roomFunction.stopSound("tianteach2")
			roomFunction.playSound(true, "tianBgm", "background")
			if (levelInfos.level == 3) {
				heavenInfos.noteach = 1
				wanFa_tian.gamePlay.inCount = setInterval(() => {
					tianFuncs.xian(heavenInfos.lun)//》为一时显示第0位样式箭头     为1 显示第一个
					heavenInfos.lun++//++										2
					if (heavenInfos.gamemod == 0) {//即显即踩模式
						if (heavenInfos.lun > 1) {//
							heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
							heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
							heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
							heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
							heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
							heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						}
						switch (heavenInfos.lun) {
							case 0:
								heavenInfos.cantap = [1, 1, 1, 1, 1, 1]
							case 1:
								//playsound 跟跳模式
								roomFunction.playSound(false, "tianji")
								engine.log("跟跳模式")
								heavenInfos.cantap2 = 1
								fastop.heavenbeijing("awawq", "white")
							case 4:
								heavenInfos.kaishi = 0
								heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
								heavenInfos.paiming = 0
								for (let i = 0; i < playerNum; i++) {//重置玩家颜色
									// if (i < 4) {
									for (let j = 0; j < 4; j++) {
										fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
									}
									// } else {
									for (let o = 4; o < 8; o++) {
										fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
									}
									// }
								}
								heavenInfos.cantap2 = 0
								heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
								break;
							case heavenInfos.diff + 2:
								fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
								heavenInfos.cantap2 = 1
								break;
							case 3 + heavenInfos.diff:
								heavenInfos.gamemod = 1
								tianFuncs.suiji()
								heavenInfos.lun = 0
								break;
						}
					} else {
						switch (heavenInfos.lun) { //记忆踩踏
							case 1:
								//playsound 记忆模式
								roomFunction.playSound(false, "tianre")
								engine.log("记忆模式")
								fastop.heavenbeijing("awawq", "white")
							case 4:
								heavenInfos.kaishi = 0
								heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
								heavenInfos.paiming = 0
								heavenInfos.cantap2 = 1
								for (let i = 0; i < playerNum; i++) {//重置玩家颜色
									// if (i < 4) {
									for (let j = 0; j < 4; j++) {
										fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
									}
									// } else {
									for (let o = 4; o < 8; o++) {
										fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
									}
									// }
								}
								heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
								heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
								heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
								heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
								heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
								heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[0]]
								break;
							case heavenInfos.diff + 2:
								heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
								heavenInfos.cantap2 = 0
								fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
								break;
							case 12 + heavenInfos.diff:
								heavenInfos.gamemod = 0
								tianFuncs.suiji()
								heavenInfos.lun = 0
								break;
						}
					}


					nowInfos.gameCountTime--
					switch (nowInfos.gameCountTime) {
						case 80:
							heavenInfos.diff = 6
							break;
						case 30:
							heavenInfos.diff = 7
							break;
					}
					if (nowInfos.gameCountTime == 0) {
						clearInterval(wanFa_tian.gamePlay.inCount)
						wanFa_tian.gameLevelEnd()
					}
					if (nowInfos.gameCountTime == 5) {
						roomFunction.playSound(false, "fenwei")
					}
					if (nowInfos.gameCountTime == 10) {
						roomFunction.playSound(false, "daoshu10")
					}
				}, 1000);
			}
			if (levelInfos.level == 1) {
				nowInfos.gameCountTime = 110
				heavenInfos.noteach = 1
				heavenInfos.diff = 7
				wanFa_tian.gamePlay.inCount = setInterval(() => {
					nowInfos.gameCountTime--
					if (nowInfos.gameCountTime == 0) {
						clearInterval(wanFa_tian.gamePlay.inCount)
						clearInterval(wanFa_tian.gamePlay.fasttap)
						wanFa_tian.gameLevelEnd()
					}
					if (nowInfos.gameCountTime == 5) {
						roomFunction.playSound(false, "fenwei")
					}
					if (nowInfos.gameCountTime == 10) {
						roomFunction.playSound(false, "daoshu10")
					}
				}, 1000);
				wanFa_tian.gamePlay.fasttap = setInterval(() => {
					heavenInfos.noteach = 1
					tianFuncs.xian(heavenInfos.lun)//》为一时显示第0位样式箭头     为1 显示第一个
					heavenInfos.lun++//++										2
					if (heavenInfos.lun > 1) {//
						heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
					}
					switch (heavenInfos.lun) {
						case 1:
							heavenInfos.cantap2 = 1
							fastop.heavenbeijing("awawq", "white")
						case 4:
							heavenInfos.kaishi = 0
							heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
							heavenInfos.paiming = 0
							for (let i = 0; i < playerNum; i++) {//重置玩家颜色
								// if (i < 4) {
								for (let j = 0; j < 4; j++) {
									fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
								}
								// } else {
								for (let o = 4; o < 8; o++) {
									fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
								}
								// }
							}
							heavenInfos.cantap2 = 0
							heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
							break;
						case heavenInfos.diff + 2:
							fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
							heavenInfos.cantap2 = 1
							break;
						case 3 + heavenInfos.diff:
							if (nowInfos.gameCountTime > 5) {
								engine.log("难度升级")
								roomFunction.playSound(false, "tiansheng")
								tianFuncs.suiji()
								heavenInfos.lun = 0
							}
							break;
						case 12 + heavenInfos.diff:
							heavenInfos.shengji++
							heavenInfos.diff = heavenInfos.shengji + 10
							heavenInfos.sudu = 1100 - heavenInfos.shengji * 60
							heavenInfos.time = 1 - heavenInfos.shengji * 0.06
							break;
					}
				}, heavenInfos.sudu);


			}
			if (levelInfos.level == 2) {
				nowInfos.gameCountTime = 120
				heavenInfos.noteach = 1
				heavenInfos.diff = 10
				wanFa_tian.gamePlay.inCount = setInterval(() => {
					nowInfos.gameCountTime--
					if (nowInfos.gameCountTime == 0) {
						clearInterval(wanFa_tian.gamePlay.inCount)
						clearInterval(wanFa_tian.gamePlay.fasttap)
						wanFa_tian.gameLevelEnd()
					}
					if (nowInfos.gameCountTime == 5) {
						roomFunction.playSound(false, "fenwei")
					}
					if (nowInfos.gameCountTime == 10) {
						roomFunction.playSound(false, "daoshu10")
					}
				}, 1000);
				wanFa_tian.gamePlay.fasttap = setInterval(() => {
					heavenInfos.noteach = 1
					tianFuncs.xian(heavenInfos.lun)//》为一时显示第0位样式箭头     为1 显示第一个
					heavenInfos.lun++//++										2
					if (heavenInfos.lun > 1) {//
						heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
						heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.lun - 2]]
					}
					switch (heavenInfos.lun) {
						case 1:
							heavenInfos.cantap2 = 1
							fastop.heavenbeijing("awawq", "white")
						case 4:
							heavenInfos.kaishi = 0
							heavenInfos.nowtap = [0, 0, 0, 0, 0, 0]
							heavenInfos.paiming = 0
							for (let i = 0; i < playerNum; i++) {//重置玩家颜色
								// if (i < 4) {
								for (let j = 0; j < 4; j++) {
									fastop.heavenChange(heavenInfos.allplayerName[i] + j, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[j], colorList[i][0], colorList[i][1], colorList[i][2])
								}
								// } else {
								for (let o = 4; o < 8; o++) {
									fastop.heavenChange(heavenInfos.allplayerName[i] + o, heavenInfos.allplayerName[i] + heavenInfos.allnodeList[o], heavenColorList[i][0], heavenColorList[i][1], heavenColorList[i][2])
								}
								// }
							}
							heavenInfos.cantap2 = 0
							heavenInfos.cantap = [0, 0, 0, 0, 0, 0]
							break;
						case heavenInfos.diff + 2:
							fastop.setNodeVisible("mie", "white", 0.1, false, false, false, false)
							heavenInfos.cantap2 = 1
							break;
						case 3 + heavenInfos.diff:
							if (nowInfos.gameCountTime > 5) {
								engine.log("难度升级")
								roomFunction.playSound(false, "tiansheng")
								tianFuncs.suiji()
								heavenInfos.lun = 0
							}
							break;
						case 6 + heavenInfos.diff:
							heavenInfos.shengji++
							heavenInfos.diff = heavenInfos.shengji * 2 + 10
							heavenInfos.sudu = 1100 - heavenInfos.shengji * 120
							heavenInfos.time = 1 - heavenInfos.shengji * 0.12
							break;
					}
				}, heavenInfos.sudu);
			}




		}
	},
	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
	},
	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
	},
	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(tianFuncs.CountPlay.innerCount)
		clearInterval(wanFa_tian.gamePlay.fasttap)

		roomFunction.stopSound("tianBgm")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("fenwei")
		roomFunction.stopSound("zheng")

		hefeng1 = 1
		roomFunction.goToGameLevel("gameEndjs", "none");
		setTimeout(() => {
			engine.removeEventListener("gameTaped", wanFa_tian.gameTaped)
			roomFunction.playSoundTivite(false, "victory", "positive")


			//从这里到

			maxNum = Math.max(...playersScList)
			engine.log(maxNum + "最高分")
			for (let i = 0; i < playerNum; i++) {
				if (playersScList[i] == maxNum) {
					winPlayers++
					if (i == 0) {
						winPlayersList[0] = 1
						engine.log("红色胜利")
						winPlayersName.push("red")
					}
					if (i == 1) {
						winPlayersList[1] = 1
						engine.log("蓝色胜利")
						winPlayersName.push("blue")
					}
					if (i == 2) {
						winPlayersList[2] = 1
						engine.log("绿色胜利")
						winPlayersName.push("green")
					}
					if (i == 3) {
						winPlayersList[3] = 1
						engine.log("黄色胜利")
						winPlayersName.push("yellow")
					}
					if (i == 4) {
						winPlayersList[4] = 1
						engine.log("青色胜利")
						winPlayersName.push("cyan")
					}
					if (i == 5) {
						winPlayersList[5] = 1
						engine.log("棕色胜利")
						winPlayersName.push("brown")
					}
				}
			}

			if (winPlayers == 1) {
				setTimeout(() => {
					if (winPlayersName.indexOf("red") != -1) {
						tianFuncs.oneWin(colorList[0][0], colorList[0][1], colorList[0][2]);
						roomFunction.playSound(false, "red2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("blue") != -1) {
						tianFuncs.oneWin(colorList[1][0], colorList[1][1], colorList[1][2]);
						roomFunction.playSound(false, "blue2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("green") != -1) {
						tianFuncs.oneWin(colorList[2][0], colorList[2][1], colorList[2][2]);
						roomFunction.playSound(false, "green2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}

					if (winPlayersName.indexOf("yellow") != -1) {
						tianFuncs.oneWin(colorList[3][0], colorList[3][1], colorList[3][2]);
						roomFunction.playSound(false, "yellow2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("cyan") != -1) {
						tianFuncs.oneWin(colorList[4][0], colorList[4][1], colorList[4][2]);
						roomFunction.playSound(false, "cyan")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("brown") != -1) {
						tianFuncs.oneWin(colorList[5][0], colorList[5][1], colorList[5][2]);
						roomFunction.playSound(false, "brownChun")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
				}, 1000);

			}
			if (winPlayers == 2) {
				setTimeout(() => {
					if (winPlayersName.indexOf("red") != -1) {
						if (winPlayersName.indexOf("blue") != -1) {
							tianFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2]);
							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "blue2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("green") != -1) {
							tianFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[2][0], colorList[2][1], colorList[2][2]);

							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "green2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("yellow") != -1) {
							tianFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[3][0], colorList[3][1], colorList[3][2]);

							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "yellow2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("cyan") != -1) {
							tianFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[4][0], colorList[4][1], colorList[4][2]);

							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							tianFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[5][0], colorList[5][1], colorList[5][2]);

							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "brownChun")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
					}
					if (winPlayersName.indexOf("blue") != -1) {
						if (winPlayersName.indexOf("green") != -1) {
							tianFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2]);

							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "green2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("yellow") != -1) {
							tianFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);

							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "yellow2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("cyan") != -1) {
							tianFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[4][0], colorList[4][1], colorList[4][2]);

							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							tianFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[5][0], colorList[5][1], colorList[5][2]);

							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "brownChun")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
					}
					if (winPlayersName.indexOf("green") != -1) {
						if (winPlayersName.indexOf("yellow") != -1) {
							tianFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2]);

							roomFunction.playSound(false, "green2")
							setTimeout(() => {
								roomFunction.playSound(false, "yellow2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("cyan") != -1) {
							tianFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[4][0], colorList[4][1], colorList[4][2]);

							roomFunction.playSound(false, "green2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							tianFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[5][0], colorList[5][1], colorList[5][2]);

							roomFunction.playSound(false, "green2")
							setTimeout(() => {
								roomFunction.playSound(false, "brownChun")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
					}
					if (winPlayersName.indexOf("yellow") != -1) {
						if (winPlayersName.indexOf("cyan") != -1) {
							tianFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
							roomFunction.playSound(false, "yellow2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							tianFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
							roomFunction.playSound(false, "yellow2")
							setTimeout(() => {
								roomFunction.playSound(false, "brownChun")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
					}
					if (winPlayersName.indexOf("cyan") != -1) {
						if (winPlayersName.indexOf("brown") != -1) {
							tianFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
							roomFunction.playSound(false, "cyan")
							setTimeout(() => {
								roomFunction.playSound(false, "brownChun")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
					}
				}, 1000);
			}
			if (winPlayers == 3) {
				setTimeout(() => {
					if (winPlayersName.indexOf("red") != -1) {
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("green") != -1) {
								tianFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2]);
								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "blue2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "green2")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}//
							if (winPlayersName.indexOf("yellow") != -1) {
								tianFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);
								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "blue2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "yellow2")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
							if (winPlayersName.indexOf("cyan") != -1) {
								tianFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[4][0], colorList[4][1], colorList[4][2]);
								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "blue2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "cyan")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
							if (winPlayersName.indexOf("brown") != -1) {
								tianFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[5][0], colorList[5][1], colorList[5][2]);
								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "blue2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "brownChun")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
						}
					}
					if (winPlayersName.indexOf("green") != -1) {
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								tianFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);
								roomFunction.playSound(false, "blue2")
								setTimeout(() => {
									roomFunction.playSound(false, "green2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "yellow2")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
							if (winPlayersName.indexOf("cyan") != -1) {
								tianFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[4][0], colorList[4][1], colorList[4][2]);
								roomFunction.playSound(false, "blue2")
								setTimeout(() => {
									roomFunction.playSound(false, "green2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "cyan")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
							if (winPlayersName.indexOf("brown") != -1) {
								tianFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[5][0], colorList[5][1], colorList[5][2]);
								roomFunction.playSound(false, "blue2")
								setTimeout(() => {
									roomFunction.playSound(false, "green2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "brownChun")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
						}
					}
					if (winPlayersName.indexOf("green") != -1) {
						if (winPlayersName.indexOf("yellow") != -1) {
							if (winPlayersName.indexOf("cyan") != -1) {
								tianFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
								roomFunction.playSound(false, "green2")
								setTimeout(() => {
									roomFunction.playSound(false, "yellow2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "cyan")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
							if (winPlayersName.indexOf("brown") != -1) {
								tianFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
								roomFunction.playSound(false, "green2")
								setTimeout(() => {
									roomFunction.playSound(false, "yellow2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "brownChun")
								}, 1400);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 2100);
							}
						}
					}
				}, 1000);
			}
			if (winPlayers == 4) {
				setTimeout(() => {
					if (winPlayersName.indexOf("red") != -1) {
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("green") != -1) {
								if (winPlayersName.indexOf("yellow") != -1) {
									tianFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2]);
									roomFunction.playSound(false, "red2")
									setTimeout(() => {
										roomFunction.playSound(false, "blue2")
									}, 700);
									setTimeout(() => {
										roomFunction.playSound(false, "green2")
									}, 1400);
									setTimeout(() => {
										roomFunction.playSound(false, "yellow2")
									}, 2100);
									setTimeout(() => {
										roomFunction.playSound(false, "allwin")
									}, 2800);

								}

								if (winPlayersName.indexOf("cyan") != -1) {
									tianFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[4][0], colorList[4][1], colorList[4][2]);
									roomFunction.playSound(false, "red2")
									setTimeout(() => {
										roomFunction.playSound(false, "blue2")
									}, 700);
									setTimeout(() => {
										roomFunction.playSound(false, "green2")
									}, 1400);
									setTimeout(() => {
										roomFunction.playSound(false, "cyan")
									}, 2100);
									setTimeout(() => {
										roomFunction.playSound(false, "allwin")
									}, 2800);
								}

								if (winPlayersName.indexOf("brown") != -1) {
									tianFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[5][0], colorList[5][1], colorList[5][2]);
									roomFunction.playSound(false, "red2")
									setTimeout(() => {
										roomFunction.playSound(false, "blue2")
									}, 700);
									setTimeout(() => {
										roomFunction.playSound(false, "green2")
									}, 1400);
									setTimeout(() => {
										roomFunction.playSound(false, "brownChun")
									}, 2100);
									setTimeout(() => {
										roomFunction.playSound(false, "allwin")
									}, 2800);
								}
							}

						}
					}
					if (winPlayersName.indexOf("red") != -1) {
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								if (winPlayersName.indexOf("cyan") != -1) {
									tianFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
									roomFunction.playSound(false, "red2")
									setTimeout(() => {
										roomFunction.playSound(false, "blue2")
									}, 700);
									setTimeout(() => {
										roomFunction.playSound(false, "yellow2")
									}, 1400);
									setTimeout(() => {
										roomFunction.playSound(false, "cyan")
									}, 2100);
									setTimeout(() => {
										roomFunction.playSound(false, "allwin")
									}, 2800);
								}
								if (winPlayersName.indexOf("brown") != -1) {
									tianFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
									roomFunction.playSound(false, "red2")
									setTimeout(() => {
										roomFunction.playSound(false, "blue2")
									}, 700);
									setTimeout(() => {
										roomFunction.playSound(false, "yellow2")
									}, 1400);
									setTimeout(() => {
										roomFunction.playSound(false, "brownChun")
									}, 2100);
									setTimeout(() => {
										roomFunction.playSound(false, "allwin")
									}, 2800);
								}
							}
						}
					}
					if (winPlayersName.indexOf("green") != -1) {
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								if (winPlayersName.indexOf("cyan") != -1) {
									tianFuncs.fouWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[2][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
									roomFunction.playSound(false, "green2")
									setTimeout(() => {
										roomFunction.playSound(false, "blue2")
									}, 700);
									setTimeout(() => {
										roomFunction.playSound(false, "yellow2")
									}, 1400);
									setTimeout(() => {
										roomFunction.playSound(false, "cyan")
									}, 2100);
									setTimeout(() => {
										roomFunction.playSound(false, "allwin")
									}, 2800);
								}
								if (winPlayersName.indexOf("brown") != -1) {
									tianFuncs.fouWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[2][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
									roomFunction.playSound(false, "green2")
									setTimeout(() => {
										roomFunction.playSound(false, "blue2")
									}, 700);
									setTimeout(() => {
										roomFunction.playSound(false, "yellow2")
									}, 1400);
									setTimeout(() => {
										roomFunction.playSound(false, "brownChun")
									}, 2100);
									setTimeout(() => {
										roomFunction.playSound(false, "allwin")
									}, 2800);
								}
							}
						}
					}
				}, 1000);
			}
			if (winPlayers == 5) {//红粉黄绿蓝
				setTimeout(() => {
					if (winPlayersName.indexOf("red") != -1) {
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("green") != -1) {
								if (winPlayersName.indexOf("yellow") != -1) {
									if (winPlayersName.indexOf("cyan") != -1) {
										tianFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
										roomFunction.playSound(false, "red2")
										setTimeout(() => {
											roomFunction.playSound(false, "blue2")
										}, 700);
										setTimeout(() => {
											roomFunction.playSound(false, "green2")
										}, 1400);
										setTimeout(() => {
											roomFunction.playSound(false, "yellow2")
										}, 2100);
										setTimeout(() => {
											roomFunction.playSound(false, "cyan")
										}, 2800);
										setTimeout(() => {
											roomFunction.playSound(false, "allwin")
										}, 3500);
									}
								}

							}

						}
					}//红绿蓝黄粉棕
					if (winPlayersName.indexOf("red") != -1) {//红粉棕绿蓝 红绿蓝黄粉
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("green") != -1) {
								if (winPlayersName.indexOf("yellow") != -1) {
									if (winPlayersName.indexOf("brown") != -1) {
										tianFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
										roomFunction.playSound(false, "red2")
										setTimeout(() => {
											roomFunction.playSound(false, "blue2")
										}, 700);
										setTimeout(() => {
											roomFunction.playSound(false, "green2")
										}, 1400);
										setTimeout(() => {
											roomFunction.playSound(false, "yellow2")
										}, 2100);
										setTimeout(() => {
											roomFunction.playSound(false, "brownChun")
										}, 2800);
										setTimeout(() => {
											roomFunction.playSound(false, "allwin")
										}, 3500);
									}
								}

							}

						}
					}
					if (winPlayersName.indexOf("red") != -1) {
						if (winPlayersName.indexOf("brown") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								if (winPlayersName.indexOf("green") != -1) {
									if (winPlayersName.indexOf("blue") != -1) {
										tianFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
										roomFunction.playSound(false, "red2")
										setTimeout(() => {
											roomFunction.playSound(false, "brownChun")
										}, 700);
										setTimeout(() => {
											roomFunction.playSound(false, "yellow2")
										}, 1400);
										setTimeout(() => {
											roomFunction.playSound(false, "green2")
										}, 2100);
										setTimeout(() => {
											roomFunction.playSound(false, "blue2")
										}, 2800);
										setTimeout(() => {
											roomFunction.playSound(false, "allwin")
										}, 3500);
									}
								}

							}

						}
					}
					if (winPlayersName.indexOf("brown") != -1) {
						if (winPlayersName.indexOf("cyan") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								if (winPlayersName.indexOf("red") != -1) {
									if (winPlayersName.indexOf("blue") != -1) {
										tianFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
										roomFunction.playSound(false, "brownChun")
										setTimeout(() => {
											roomFunction.playSound(false, "cyan")
										}, 700);
										setTimeout(() => {
											roomFunction.playSound(false, "yellow2")
										}, 1400);
										setTimeout(() => {
											roomFunction.playSound(false, "red2")
										}, 2100);
										setTimeout(() => {
											roomFunction.playSound(false, "blue2")
										}, 2800);
										setTimeout(() => {
											roomFunction.playSound(false, "allwin")
										}, 3500);
									}
								}

							}

						}
					}
					if (winPlayersName.indexOf("brown") != -1) {
						if (winPlayersName.indexOf("cyan") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								if (winPlayersName.indexOf("green") != -1) {
									if (winPlayersName.indexOf("blue") != -1) {
										tianFuncs.fivWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2], colorList[5][0], colorList[5][1], colorList[5][2]);
										roomFunction.playSound(false, "brownChun")
										setTimeout(() => {
											roomFunction.playSound(false, "cyan")
										}, 700);
										setTimeout(() => {
											roomFunction.playSound(false, "yellow2")
										}, 1400);
										setTimeout(() => {
											roomFunction.playSound(false, "green2")
										}, 2100);
										setTimeout(() => {
											roomFunction.playSound(false, "blue2")
										}, 2800);
										setTimeout(() => {
											roomFunction.playSound(false, "allwin")
										}, 3500);
									}
								}

							}

						}
					}
				}, 1000);
			}
			if (winPlayers == 6) {
				setTimeout(() => {
					tianFuncs.sixWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2], colorList[5][0], colorList[5][1], colorList[5][2]);
					roomFunction.playSound(false, "red2")
					setTimeout(() => {
						roomFunction.playSound(false, "blue2")
					}, 700);
					setTimeout(() => {
						roomFunction.playSound(false, "green2")
					}, 1400);
					setTimeout(() => {
						roomFunction.playSound(false, "yellow2")
					}, 2100);
					setTimeout(() => {
						roomFunction.playSound(false, "cyan")
					}, 2800);
					setTimeout(() => {
						roomFunction.playSound(false, "brownChun")
					}, 3500);
					setTimeout(() => {
						roomFunction.playSound(false, "allwin")
					}, 4200);
				}, 1000);
			}

			//这里均为 新六人
		}, 200);

		setTimeout(() => {
			roomFunction.goToGameLevel("leave_hold", "none");


			wanFaCtl_tianCtl.gameEndCtl()
			levelInfos.gameIdList = [];
			tianFuncs.rmAllListener()

		}, 7000 + winPlayers * 2500);
	}
}


const tianFuncs = {
	//重置所有变量
	resetAll() {
		//nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		neiUser = []
		playersScList = [0, 0, 0, 0, 0, 0]//新六人
		winPlayers = 0
		winPlayersName = []
		dipanNum = 0
		heavenInfos.lun = 0
		winPlayersList = [0, 0, 0, 0, 0, 0]//新六人
		maxNum = 0;
		usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"];//新六人
		ganmeEndScreenShow = [];
		userColorShowString = [];
		userNameShowString = [];
		heavenInfos.cantap2 = 0
		userScoreShowString = [];
		heavenInfos.diff = 5
		pkNameList = []
		heavenInfos.noteach = 0
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_tian.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_tian.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_tian.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_tian.gameTimeOver)
	},

	//胜利加给playersScList
	taptap(who, where, nodeId) {
		if (heavenInfos.gamemod == 0) {
			switch (who) {
				case "red":
					if (heavenInfos.cantap[0] == 0) {
						if (nodeId == heavenInfos.redNow) {
							tianFuncs.white(who + "q", who + "q", colorList[0][0], colorList[0][1], colorList[0][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							heavenInfos.cantap[0] = 1
							playersScList[0] += 1
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[0][0], colorList[0][1], colorList[0][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							if (heavenInfos.allnodeList.indexOf(where) < 4) {
								fastop.heavenwrong(who, nodeId, colorList[0][0], colorList[0][1], colorList[0][2])
							} else {
								fastop.heavenwrong(who, nodeId, heavenColorList[0][0], heavenColorList[0][1], heavenColorList[0][2])
							}
						}
					}
					break;
				case "blue":
					if (heavenInfos.cantap[1] == 0) {
						if (nodeId == heavenInfos.blueNow) {
							tianFuncs.white(who + "q", who + "q", colorList[1][0], colorList[1][1], colorList[1][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							heavenInfos.cantap[1] = 1
							playersScList[1] += 1
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[1][0], colorList[1][1], colorList[1][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							if (heavenInfos.allnodeList.indexOf(where) < 4) {
								fastop.heavenwrong(who, nodeId, colorList[1][0], colorList[1][1], colorList[1][2])
							} else {
								fastop.heavenwrong(who, nodeId, heavenColorList[1][0], heavenColorList[1][1], heavenColorList[1][2])
							}
						}
					}
					break;
				case "green":
					if (heavenInfos.cantap[2] == 0) {
						if (nodeId == heavenInfos.greenNow) {
							tianFuncs.white(who + "q", who + "q", colorList[2][0], colorList[2][1], colorList[2][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							heavenInfos.cantap[2] = 1
							playersScList[2] += 1
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[2][0], colorList[2][1], colorList[2][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							if (heavenInfos.allnodeList.indexOf(where) < 4) {
								fastop.heavenwrong(who, nodeId, colorList[2][0], colorList[2][1], colorList[2][2])
							} else {
								fastop.heavenwrong(who, nodeId, heavenColorList[2][0], heavenColorList[2][1], heavenColorList[2][2])
							}
						}
					}
					break;
				case "yellow":
					if (heavenInfos.cantap[3] == 0) {
						if (nodeId == heavenInfos.yellowNow) {
							tianFuncs.white(who + "q", who + "q", colorList[3][0], colorList[3][1], colorList[3][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							heavenInfos.cantap[3] = 1
							playersScList[3] += 1
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[3][0], colorList[3][1], colorList[3][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							if (heavenInfos.allnodeList.indexOf(where) < 4) {
								fastop.heavenwrong(who, nodeId, colorList[3][0], colorList[3][1], colorList[3][2])
							} else {
								fastop.heavenwrong(who, nodeId, heavenColorList[3][0], heavenColorList[3][1], heavenColorList[3][2])
							}
						}
					}
					break;
				case "qing":
					if (heavenInfos.cantap[4] == 0) {
						if (nodeId == heavenInfos.qingNow) {
							tianFuncs.white(who + "q", who + "q", colorList[4][0], colorList[4][1], colorList[4][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							heavenInfos.cantap[4] = 1
							playersScList[4] += 1
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[4][0], colorList[4][1], colorList[4][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							if (heavenInfos.allnodeList.indexOf(where) < 4) {
								fastop.heavenwrong(who, nodeId, colorList[4][0], colorList[4][1], colorList[4][2])
							} else {
								fastop.heavenwrong(who, nodeId, heavenColorList[4][0], heavenColorList[4][1], heavenColorList[4][2])
							}
						}
					}
					break;

				case "brown":
					if (heavenInfos.cantap[5] == 0) {
						if (nodeId == heavenInfos.brownNow) {
							tianFuncs.white(who + "q", who + "q", colorList[5][0], colorList[5][1], colorList[5][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							heavenInfos.cantap[5] = 1
							playersScList[5] += 1
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[5][0], colorList[5][1], colorList[5][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							if (heavenInfos.allnodeList.indexOf(where) < 4) {
								fastop.heavenwrong(who, nodeId, colorList[5][0], colorList[5][1], colorList[5][2])
							} else {
								fastop.heavenwrong(who, nodeId, heavenColorList[5][0], heavenColorList[5][1], heavenColorList[5][2])
							}
						}
					}
					break;
			}
		} else {
			switch (who) {
				case "red":
					if (heavenInfos.cantap[0] == 0) {
						if (nodeId == heavenInfos.redNow) {
							tianFuncs.white(who + "q", who + "q", colorList[0][0], colorList[0][1], colorList[0][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							if (heavenInfos.nowtap[0] == heavenInfos.diff - 1) {
								roomFunction.playSoundTivite(false, "right", "positive")
								playersScList[0] += 10 - heavenInfos.paiming
								heavenInfos.paiming++
								for (let i = 0; i < 8; i++) {
									fastop.grey(i, who + heavenInfos.allnodeList[i])
								}
								heavenInfos.cantap[0] = 1
							} else {
								// heavenInfos.cantap[0] = 1
								// setTimeout(() => {
								// 	heavenInfos.cantap[0] = 0
								// }, 100);
								heavenInfos.nowtap[0]++
								heavenInfos.redNow = "red" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.nowtap[0]]]
							}
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[0][0], colorList[0][1], colorList[0][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							for (let i = 0; i < 8; i++) {
								fastop.white(i, who + heavenInfos.allnodeList[i])
							}
							heavenInfos.cantap[0] = 1
						}
					}
					break;
				case "blue":
					if (heavenInfos.cantap[1] == 0) {
						tianFuncs.white(who + "q", who + "q", colorList[1][0], colorList[1][1], colorList[1][2])
						if (nodeId == heavenInfos.blueNow) {
							roomFunction.playSoundTivite(false, "defen", "positive")
							if (heavenInfos.nowtap[1] == heavenInfos.diff - 1) {
								// engine.log("nb全对 变白等待下一轮 playersScList+10分")
								roomFunction.playSoundTivite(false, "right", "positive")
								playersScList[1] += 10 - heavenInfos.paiming
								heavenInfos.paiming++
								for (let i = 0; i < 8; i++) {
									fastop.grey(i, who + heavenInfos.allnodeList[i])
								}
								heavenInfos.cantap[1] = 1
							} else {
								heavenInfos.nowtap[1]++
								heavenInfos.blueNow = "blue" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.nowtap[1]]]
							}
						} else {
							tianFuncs.black(who + "q", who + "q", colorList[1][0], colorList[1][1], colorList[1][2])
							// engine.log("错了没机会了 变灰等下一轮")
							roomFunction.playSoundTivite(false, "wrong", "negative")
							for (let i = 0; i < 8; i++) {
								fastop.white(i, who + heavenInfos.allnodeList[i])
							}
							heavenInfos.cantap[1] = 1
						}
					}
					break;
				case "green":
					if (heavenInfos.cantap[2] == 0) {
						if (nodeId == heavenInfos.greenNow) {
							tianFuncs.white(who + "q", who + "q", colorList[2][0], colorList[2][1], colorList[2][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							if (heavenInfos.nowtap[2] == heavenInfos.diff - 1) {
								// engine.log("nb全对 变白等待下一轮 playersScList+10分")
								roomFunction.playSoundTivite(false, "right", "positive")
								playersScList[2] += 10 - heavenInfos.paiming
								heavenInfos.paiming++
								for (let i = 0; i < 8; i++) {
									fastop.grey(i, who + heavenInfos.allnodeList[i])
								}
								heavenInfos.cantap[2] = 1
							} else {
								heavenInfos.nowtap[2]++
								heavenInfos.greenNow = "green" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.nowtap[2]]]
							}
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[2][0], colorList[2][1], colorList[2][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							for (let i = 0; i < 8; i++) {
								fastop.white(i, who + heavenInfos.allnodeList[i])
							}
							heavenInfos.cantap[2] = 1
						}
					}
					break;
				case "yellow":
					if (heavenInfos.cantap[3] == 0) {
						if (nodeId == heavenInfos.yellowNow) {
							tianFuncs.white(who + "q", who + "q", colorList[3][0], colorList[3][1], colorList[3][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							if (heavenInfos.nowtap[3] == heavenInfos.diff - 1) {
								// engine.log("nb全对 变白等待下一轮 playersScList+10分")
								roomFunction.playSoundTivite(false, "right", "positive")
								playersScList[3] += 10 - heavenInfos.paiming
								heavenInfos.paiming++
								for (let i = 0; i < 8; i++) {
									fastop.grey(i, who + heavenInfos.allnodeList[i])
								}
								heavenInfos.cantap[3] = 1
							} else {
								heavenInfos.nowtap[3]++
								heavenInfos.yellowNow = "yellow" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.nowtap[3]]]
							}
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[3][0], colorList[3][1], colorList[3][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							for (let i = 0; i < 8; i++) {
								fastop.white(i, who + heavenInfos.allnodeList[i])
							}
							heavenInfos.cantap[3] = 1
						}
					}
					break;
				case "qing":
					if (heavenInfos.cantap[4] == 0) {
						if (nodeId == heavenInfos.qingNow) {
							tianFuncs.white(who + "q", who + "q", colorList[4][0], colorList[4][1], colorList[4][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							if (heavenInfos.nowtap[4] == heavenInfos.diff - 1) {
								// engine.log("nb全对 变白等待下一轮 playersScList+10分")
								roomFunction.playSoundTivite(false, "right", "positive")
								playersScList[4] += 10 - heavenInfos.paiming
								heavenInfos.paiming++
								for (let i = 0; i < 8; i++) {
									fastop.grey(i, who + heavenInfos.allnodeList[i])
								}
								heavenInfos.cantap[4] = 1
							} else {
								heavenInfos.nowtap[4]++
								heavenInfos.qingNow = "qing" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.nowtap[4]]]
							}
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[4][0], colorList[4][1], colorList[4][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							for (let i = 0; i < 8; i++) {
								fastop.white(i, who + heavenInfos.allnodeList[i])
							}
							heavenInfos.cantap[4] = 1
						}
					}
					break;

				case "brown":
					if (heavenInfos.cantap[5] == 0) {
						if (nodeId == heavenInfos.brownNow) {
							tianFuncs.white(who + "q", who + "q", colorList[5][0], colorList[5][1], colorList[5][2])
							roomFunction.playSoundTivite(false, "defen", "positive")
							if (heavenInfos.nowtap[5] == heavenInfos.diff - 1) {
								// engine.log("nb全对 变白等待下一轮 playersScList+10分")
								roomFunction.playSoundTivite(false, "right", "positive")
								playersScList[5] += 10 - heavenInfos.paiming
								heavenInfos.paiming++
								for (let i = 0; i < 8; i++) {
									fastop.grey(i, who + heavenInfos.allnodeList[i])
								}
								heavenInfos.cantap[5] = 1
							} else {
								heavenInfos.nowtap[5]++
								heavenInfos.brownNow = "brown" + heavenInfos.allnodeList[heavenInfos.nowlist[heavenInfos.nowtap[5]]]
							}
						} else {
							// engine.log("错了没机会了 变灰等下一轮")
							tianFuncs.black(who + "q", who + "q", colorList[5][0], colorList[5][1], colorList[5][2])
							roomFunction.playSoundTivite(false, "wrong", "negative")
							for (let i = 0; i < 8; i++) {
								fastop.white(i, who + heavenInfos.allnodeList[i])
							}
							heavenInfos.cantap[5] = 1
						}
					}
					break;
			}
		}

	},


	//展示目标
	xian(time) {//time012345    初始diff5  time为1 显示heavenInfos.nowlist第1个。。。
		if (heavenInfos.kaishi == 0) {
			if (levelInfos.level == 2) {
				if (heavenInfos.gamemod == 0) {
					heavenInfos.time = 0.9
				} else {
					heavenInfos.time = 0.5
				}
			}
			if (time == 0) {
				// fastop.heavenbeijing("awawq", "white"
			} else {
				for (let i = 0; i < 6; i++) {
					heavenInfos.cantap[i] = 0
				}
				switch (heavenInfos.nowlist[time - 1]) {
					case 0:
						fastop.heaven("shang" + time, "shang", heavenInfos.time)
						roomFunction.playSoundTivite(false, "do", "positive")
						break;
					case 1:
						fastop.heaven("xia" + time, "xia", heavenInfos.time)
						roomFunction.playSoundTivite(false, "re", "positive")
						break;
					case 2:
						fastop.heaven("zuo" + time, "zuo", heavenInfos.time)
						roomFunction.playSoundTivite(false, "me", "positive")
						break;
					case 3:
						fastop.heaven("you" + time, "you", heavenInfos.time)
						roomFunction.playSoundTivite(false, "fa", "positive")
						break;
					case 4:
						fastop.heaven("zuoshang" + time, "zuoshang", heavenInfos.time)
						roomFunction.playSoundTivite(false, "so", "positive")
						break;
					case 5:
						fastop.heaven("zuoxia" + time, "youshang", heavenInfos.time)
						roomFunction.playSoundTivite(false, "la", "positive")
						break;
					case 6:
						fastop.heaven("zuoxia" + time, "zuoxia", heavenInfos.time)
						roomFunction.playSoundTivite(false, "xi", "positive")
						break;
					case 7:
						fastop.heaven("youxia" + time, "youxia", heavenInfos.time)
						roomFunction.playSoundTivite(false, "do", "positive")
						break;
				}
				if (time == heavenInfos.diff) {
					heavenInfos.kaishi = 1
				}
			}
		}
	},
	//随机目标
	suiji() {
		heavenInfos.nowlist = []
		for (let i = 0; i < heavenInfos.diff; i++) {
			let awa = Math.floor(Math.random() * 8)
			heavenInfos.nowlist.push(awa)
		}
		engine.log(heavenInfos.nowlist)
	},

	oneWin(r, g, b) {
		fastop.addWin("win1", "win1", 0, 0, 15, 31, r, g, b)

	},

	twoWin(r1, g1, b1, r2, g2, b2) {
		fastop.addWin("win1", "win1", 0, 0, 7, 31, r1, g1, b1)
		fastop.addWin("win4", "win4", 8, 0, 15, 31, r2, g2, b2)
	},

	thrWin(r1, g1, b1, r2, g2, b2, r3, g3, b3) {
		fastop.addWin("win1", "win1", 0, 0, 3, 31, r1, g1, b1)
		fastop.addWin("win2", "win2", 6, 0, 9, 31, r3, g3, b3)
		fastop.addWin("win3", "win3", 12, 0, 15, 31, r2, g2, b2)
	},

	fouWin(r1, g1, b1, r2, g2, b2, r3, g3, b3, r4, g4, b4) {
		fastop.addWin("win1", "win1", 0, 0, 3, 31, r1, g1, b1)
		fastop.addWin("win3", "win3", 4, 0, 7, 31, r2, g2, b2)
		fastop.addWin("win2", "win2", 8, 0, 11, 31, r3, g3, b3)
		fastop.addWin("win4", "win4", 12, 0, 15, 31, r4, g4, b4)
	},

	fivWin(r1, g1, b1, r2, g2, b2, r3, g3, b3, r4, g4, b4, r5, g5, b5) {
		fastop.addWin("win1", "win1", 1, 0, 2, 31, r1, g1, b1)
		fastop.addWin("win3", "win3", 4, 0, 5, 31, r2, g2, b2)
		fastop.addWin("win2", "win2", 7, 0, 8, 31, r3, g3, b3)
		fastop.addWin("win4", "win4", 10, 0, 11, 31, r4, g4, b4)
		fastop.addWin("win5", "win5", 13, 0, 14, 31, r5, g5, b5)
	},
	sixWin(r1, g1, b1, r2, g2, b2, r3, g3, b3, r4, g4, b4, r5, g5, b5, r6, g6, b6) {//新六人
		fastop.addWin("win1", "win1", 0, 0, 7, 9, r1, g1, b1)
		fastop.addWin("win3", "win3", 8, 0, 15, 9, r2, g2, b2)
		fastop.addWin("win2", "win2", 0, 11, 7, 20, r3, g3, b3)
		fastop.addWin("win4", "win4", 8, 11, 15, 20, r4, g4, b4)
		fastop.addWin("win5", "win5", 0, 22, 7, 31, r5, g5, b5)
		fastop.addWin("win6", "win6", 8, 22, 15, 31, r6, g6, b6)

	},

	white(opId, opNode, r, g, b) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.5,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 254,
								g: 254,
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
								r: r,
								g: g,
								b: b,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	black(opId, opNode, r, g, b) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.5,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 0,
								g: 0,
								b: 0,
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
								r: r,
								g: g,
								b: b,
								a: 1,
							}
						}

					}
				}
			],
		}
		gameFuncs.op(opInfo);
	},

	CountPlay() {
		let hefeng = setInterval(function (index, count) {
			if (hefeng1 == 1) {
				clearInterval(hefeng)
			}
			ganmeEndScreenShow = []
			for (let i = 0; i < playerNum; i++) {
				ganmeEndScreenShow.push({
					userColor: usercolors[i],
					userName: pkNameList[i],
					userScore: playersScList[i]
				})
			}
			//将数组排序
			ganmeEndScreenShow.sort((a, b) => b.userScore - a.userScore)
			//将排序后数据遍历出来在屏幕显示那里转成字符串
			userColorShowString = ganmeEndScreenShow.map(item => item.userColor);
			userNameShowString = ganmeEndScreenShow.map(item => item.userName);
			userScoreShowString = ganmeEndScreenShow.map(item => item.userScore);
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
						label1: "蹦蹦蹦！"
					}
				}
			}
			gameFuncs.op(opInfo)
			// engine.log(opInfo.screenDisplay.block1.value1)
			// engine.log(opInfo.screenDisplay.block1.label2)
			// engine.log(opInfo.screenDisplay.block1.value2)
		}, 1000)
	},

	ScorePlay() {
		let opInfo = {
			opId: "screenScorePlay",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_3b01",
				block1: {
					model: "dis_b_choice",
					label1: "各组分数",
					value1: pkNameList.toString(),
					lavel2: "",
					value2: "#FF0000,#0000fe,#00fe00,#fec300,#00FFFF,#8b4513"//新六人
				},
				block2: {
					model: "dis_b_numUnit",
					label1: "SECONDS",
					value1: nowInfos.gameCountTime
				},
				block3: {
					model: "dis_b_scoreGame",
					label1: "蹦蹦蹦！"
				}
			}
		}
		gameFuncs.op(opInfo)
	},




}
