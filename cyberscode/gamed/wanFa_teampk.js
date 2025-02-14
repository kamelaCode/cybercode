const wanFa_teampk = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_teampk.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_teampk.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_teampk.gameDestroy);
		//重置全局变量
		teampkFuncs.resetAll(2)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}
		//内屏显示每个用户名称对应的颜色
		teamPkInfos.neiUser = []
		for (var i = 0; i < usersInfos.usersResult.length; i++) {
			teamPkInfos.neiUser[i] = usersInfos.allUsers[i].Nick
		}

		let wodiu = 0
		let qbq = 0
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			for (let j = 0; j < 10; j++) {
				if (wodiu == i) {
					if (teamPkInfos.neiUser[i].charCodeAt(j) > 255) {
						qbq++
						duoshao += 1.666666666
					} else {
						qbq++
						duoshao += 1
					}
					if (duoshao >= 4) {
						engine.log("第" + i + "个人显示前" + qbq + "个字")
						pkNameList[i] = teamPkInfos.neiUser[i].substring(0, qbq) + "..."
						duoshao = 0
						wodiu++
						qbq = 0
					}
				}
			}
			if (teamPkInfos.neiUser[i].length < 6) {
				pkNameList[i] = teamPkInfos.neiUser[i]
			}
		}
		teamPkInfos.levelScoreAll = teamPkInfos.neiUser.toString()
		teampkFuncs.rgbScorePlay()//跳转内屏显示
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		let countTime = 0
		wanFa_teampk.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					roomFunction.playSound(false, "teamPkRules")
					break;
				case 16:
					roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					break;
				case 17:
					clearInterval(wanFa_teampk.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// 	roomFunction.playSound(false, "teamPkRules")
		// }, 500);

		// setTimeout(function () {
		// 	roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")

		// }, sec * 1000);
		// setTimeout(function () {
		// 	surfaceCtr.ctlDoor(0, 5000);
		// }, 3500);
	},




	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		if (gameid == "teampk-hf") {
			engine.addEventListener("gameTaped", wanFa_teampk.gameTaped)
			engine.log("-------------------" + gameid)
			for (var i = 0; i < usersInfos.usersResult.length; i++) {
				teamPkInfos.block2Infos[i] = 0
			}
			roomFunction.playSound(false, "teamPkBgm", "background");
			//竞技模式中内屏倒计时
			wanFa_teampk.gamePlay.innerCount = setInterval(() => {
				teamPkInfos.allTime--
				if (teamPkInfos.allTime == 45) {
					if (teamPkInfos.block2Infos[1] != teamPkInfos.block2Infos[0]) {
						roomFunction.playSound(false, "teamPklingxian")
					} else[
						roomFunction.playSound(false, "fenshuxiangtong")
					]
				}
				if (teamPkInfos.allTime == 42) {
					let str = gameFuncs.playingAudioIds()
					let arr = JSON.parse(str)
					let soundName = arr?.map(item => item.slice(item.indexOf('d') + 1))
					if (soundName.includes("fenshuxiangtong")) {
						return
					}
					if (teamPkInfos.block2Infos[0] > teamPkInfos.block2Infos[1]) {
						let name = ""
						switch (usersInfos.usersResult.length) {
							case 2:
								name = "teamred"
								break;
							case 3:
							case 4:
								name = "redgreen"
								break;
							case 5:
							case 6:
								name = "redGreenCyan"
								break;
						}
						roomFunction.playSound(false, name)
					} else
						if (teamPkInfos.block2Infos[0] < teamPkInfos.block2Infos[1]) {
							let name = ""
							switch (usersInfos.usersResult.length) {
								case 2:
								case 3:
									name = "teamblue"
									break;
								case 4:
								case 5:
									name = "blueYellow"
									break;
								case 6:
									name = "blueYellowBrown"
									break;
							}
							roomFunction.playSound(false, name)
						}
				}
				if (teamPkInfos.allTime == 11) {
					roomFunction.playSound(false, "daoshu10")
					roomFunction.stopSound("teamPkBgm");
				}
				if (teamPkInfos.allTime == 0) {
					wanFa_teampk.gameLevelEnd()
				}

			}, 1000)
			setIntervalCount(function (index, count) {
				teamPkInfos.levelScoreAll = ""
			}, 5000, 20)
			teampkFuncs.CountPlay()
			teampkFuncs.createBullet()
			let redArrCtl = 0
			let blueArrCtl = 0
			let redArr = [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 9, 0, 10, 0, 11, 0, 12, 0, 13, 0, 14, 0, 15, 0, 16, 0, 17, 0, 18, 0, 19, 0, 20, 0, 21, 0, 22, 0, 23, 0, 24, 0, 25, 0, 26, 0, 27, 0, 28, 0, 29, 0, 30, 0, 31, 1, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14, 1, 15, 1, 16, 1, 17, 1, 18, 1, 19, 1, 20, 1, 21, 1, 22, 1, 23, 1, 24, 1, 25, 1, 26, 1, 27, 1, 28, 1, 29, 1, 30, 1, 31, 2, 0, 2, 1, 2, 2, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7, 2, 8, 2, 9, 2, 10, 2, 11, 2, 12, 2, 13, 2, 14, 2, 15, 2, 16, 2, 17, 2, 18, 2, 19, 2, 20, 2, 21, 2, 22, 2, 23, 2, 24, 2, 25, 2, 26, 2, 27, 2, 28, 2, 29, 2, 30, 2, 31]
			// [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 9, 0, 10, 0, 11, 0, 12, 0, 13, 0, 14, 0, 15, 0, 16, 0, 17, 0, 18, 0, 19, 0, 20, 0, 21, 0, 22, 0, 23, 0, 24, 0, 25, 0, 26, 0, 27, 0, 28, 0, 29, 0, 30, 0, 31, 1, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14, 1, 15, 1, 16, 1, 17, 1, 18, 1, 19, 1, 20, 1, 21, 1, 22, 1, 23, 1, 24, 1, 25, 1, 26, 1, 27, 1, 28, 1, 29, 1, 30, 1, 31, 2, 0, 2, 1, 2, 2, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7, 2, 8, 2, 9, 2, 10, 2, 11, 2, 12, 2, 13, 2, 14, 2, 15, 2, 16, 2, 17, 2, 18, 2, 19, 2, 20, 2, 21, 2, 22, 2, 23, 2, 24, 2, 25, 2, 26, 2, 27, 2, 28, 2, 29, 2, 30, 2, 31]
			// [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9], [0, 10], [0, 11], [0, 12], [0, 13], [0, 14], [0, 15], [0, 16], [0, 17], [0, 18], [0, 19], [0, 20], [0, 21], [0, 22], [0, 23], [0, 24], [0, 25], [0, 26], [0, 27], [0, 28], [0, 29], [0, 30], [0, 31], [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1, 13], [1, 14], [1, 15], [1, 16], [1, 17], [1, 18], [1, 19], [1, 20], [1, 21], [1, 22], [1, 23], [1, 24], [1, 25], [1, 26], [1, 27], [1, 28], [1, 29], [1, 30], [1, 31]]
			// [0, 0, 0, 1, 0, 2, 0, 3, 0, 4, 0, 5, 0, 6, 0, 7, 0, 8, 0, 9, 0, 10, 0, 11, 0, 12, 0, 13, 0, 14, 0, 15, 1, 0, 1, 1, 1, 2, 1, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1, 8, 1, 9, 1, 10, 1, 11, 1, 12, 1, 13, 1, 14, 1, 15, 2, 0, 2, 1, 2, 2, 2, 3, 2, 4, 2, 5, 2, 6, 2, 7, 2, 8, 2, 9, 2, 10, 2, 11, 2, 12, 2, 13, 2, 14, 2, 15]
			let blueArr = [13, 0, 13, 1, 13, 2, 13, 3, 13, 4, 13, 5, 13, 6, 13, 7, 13, 8, 13, 9, 13, 10, 13, 11, 13, 12, 13, 13, 13, 14, 13, 15, 13, 16, 13, 17, 13, 18, 13, 19, 13, 20, 13, 21, 13, 22, 13, 23, 13, 24, 13, 25, 13, 26, 13, 27, 13, 28, 13, 29, 13, 30, 13, 31, 14, 0, 14, 1, 14, 2, 14, 3, 14, 4, 14, 5, 14, 6, 14, 7, 14, 8, 14, 9, 14, 10, 14, 11, 14, 12, 14, 13, 14, 14, 14, 15, 14, 16, 14, 17, 14, 18, 14, 19, 14, 20, 14, 21, 14, 22, 14, 23, 14, 24, 14, 25, 14, 26, 14, 27, 14, 28, 14, 29, 14, 30, 14, 31, 15, 0, 15, 1, 15, 2, 15, 3, 15, 4, 15, 5, 15, 6, 15, 7, 15, 8, 15, 9, 15, 10, 15, 11, 15, 12, 15, 13, 15, 14, 15, 15, 15, 16, 15, 17, 15, 18, 15, 19, 15, 20, 15, 21, 15, 22, 15, 23, 15, 24, 15, 25, 15, 26, 15, 27, 15, 28, 15, 29, 15, 30, 15, 31]
			// [[14, 0], [14, 1], [14, 2], [14, 3], [14, 4], [14, 5], [14, 6], [14, 7], [14, 8], [14, 9], [14, 10], [14, 11], [14, 12], [14, 13], [14, 14], [14, 15], [14, 16], [14, 17], [14, 18], [14, 19], [14, 20], [14, 21], [14, 22], [14, 23], [14, 24], [14, 25], [14, 26], [14, 27], [14, 28], [14, 29], [14, 30], [14, 31], [15, 0], [15, 1], [15, 2], [15, 3], [15, 4], [15, 5], [15, 6], [15, 7], [15, 8], [15, 9], [15, 10], [15, 11], [15, 12], [15, 13], [15, 14], [15, 15], [15, 16], [15, 17], [15, 18], [15, 19], [15, 20], [15, 21], [15, 22], [15, 23], [15, 24], [15, 25], [15, 26], [15, 27], [15, 28], [15, 29], [15, 30], [15, 31]]
			// [13, 0, 13, 1, 13, 2, 13, 3, 13, 4, 13, 5, 13, 6, 13, 7, 13, 8, 13, 9, 13, 10, 13, 11, 13, 12, 13, 13, 13, 14, 13, 15, 14, 0, 14, 1, 14, 2, 14, 3, 14, 4, 14, 5, 14, 6, 14, 7, 14, 8, 14, 9, 14, 10, 14, 11, 14, 12, 14, 13, 14, 14, 14, 15, 15, 0, 15, 1, 15, 2, 15, 3, 15, 4, 15, 5, 15, 6, 15, 7, 15, 8, 15, 9, 15, 10, 15, 11, 15, 12, 15, 13, 15, 14, 15, 15]
			for (let i = 0; i < redArr.length; i += 2) {
				fastop.addNode("mubiaoRed" + redArr[i] + redArr[i + 1], "mubiao" + redArr[i] + "-" + redArr[i + 1], "b", redArr[i], redArr[i + 1], teamPkInfos.userColorRed[(redArrCtl % (usersInfos.usersResult.length >= 5 ? 3 : 2))][0], teamPkInfos.userColorRed[(redArrCtl % (usersInfos.usersResult.length >= 5 ? 3 : 2))][1], teamPkInfos.userColorRed[(redArrCtl % (usersInfos.usersResult.length >= 5 ? 3 : 2))][2])
				redArrCtl += (usersInfos.usersResult.length == 2 ? 2 : 1)
			}
			for (let i = 0; i < blueArr.length; i += 2) {
				fastop.addNode("mubiaoBlue" + blueArr[i] + blueArr[i + 1], "mubiao" + blueArr[i] + "-" + blueArr[i + 1], "b", blueArr[i], blueArr[i + 1], teamPkInfos.userColorBlue[(blueArrCtl % (usersInfos.usersResult.length == 6 ? 3 : 2))][0], teamPkInfos.userColorBlue[(blueArrCtl % (usersInfos.usersResult.length == 6 ? 3 : 2))][1], teamPkInfos.userColorBlue[(blueArrCtl % (usersInfos.usersResult.length == 6 ? 3 : 2))][2])
				blueArrCtl += (usersInfos.usersResult.length <= 3 ? 2 : 1)
			}
			let person = [0, 34, 0, 38, 0, 39, 1, 32, 1, 33, 1, 35, 1, 37, 1, 40, 2, 34, 2, 35, 2, 36, 2, 40, 2, 41, 3, 32, 3, 33, 3, 35, 3, 37, 3, 40, 4, 34, 4, 38, 4, 39, 11, 34, 11, 38, 11, 39, 12, 32, 12, 33, 12, 35, 12, 37, 12, 40, 13, 34, 13, 35, 13, 36, 13, 40, 13, 41, 14, 32, 14, 33, 14, 35, 14, 37, 14, 40, 15, 34, 15, 38, 15, 39]
			for (let i = 0; i < person.length; i += 2) {
				fastop.addNode("person" + i, "person" + i, "b", person[i], person[i + 1], person[i] > 8 ? 0 : 254, 0, person[i] > 8 ? 254 : 0)
			}
		}


	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
		if (onOff == true) {
			usersInfos.ValidTrigger++
		}
		teampkFuncs.fireBullet(face, x, y, onOff, nodeId, event)
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		// if (gameid != "__system_wait") {
		// 	wanFa_teampk.gameLevelEnd()
		// }
	},



	//游戏关卡结束
	gameLevelEnd() {
		if (teamPkInfos.screenCirCtl == 0) {
			engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
			// clearInterval(wanFa_teampk.gamePlay.innerCount)
			clearInterval(wanFa_teampk.gamePlay.innerCount)
			roomFunction.stopSound("teamPkBgm")
			// roomFunction.goToGameLevel("leave_hold", "none")
			levelInfos.gameIdList = []
			teamPkInfos.screenCirCtl = 1


			roomFunction.goToGameLevel("gameEndjs", "none");


			setTimeout(() => {
				engine.removeEventListener("gameTaped", wanFa_loot.gameTaped)
				roomFunction.playSoundTivite(false, "victory", "positive")


				//从这里到
				let maxNum = Math.max(...teamPkInfos.block2Infos)
				engine.log(maxNum + "最高分")
				// let winPerson = [5, 34, 5, 38, 5, 39, 6, 33, 6, 35, 6, 37, 6, 40, 7, 34, 7, 35, 7, 36, 7, 40, 7, 41, 8, 33, 8, 35, 8, 37, 8, 40, 9, 34, 9, 38, 9, 39]

				for (let i = 0; i < usersInfos.allUsers.length; i++) {
					if (teamPkInfos.block2Infos[i] == maxNum) {
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
				engine.log(winPlayers)
				if (winPlayers == 1) {
					setTimeout(() => {
						if (winPlayersName.indexOf("red") != -1) {
							teampkFuncs.oneWin(colorList[0][0], colorList[0][1], colorList[0][2]);
							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "win")
							}, 700);
						}
						if (winPlayersName.indexOf("blue") != -1) {
							teampkFuncs.oneWin(colorList[1][0], colorList[1][1], colorList[1][2]);
							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "win")
							}, 700);
						}
						if (winPlayersName.indexOf("green") != -1) {
							teampkFuncs.oneWin(colorList[2][0], colorList[2][1], colorList[2][2]);
							roomFunction.playSound(false, "green2")
							setTimeout(() => {
								roomFunction.playSound(false, "win")
							}, 700);
						}

						if (winPlayersName.indexOf("yellow") != -1) {
							teampkFuncs.oneWin(colorList[3][0], colorList[3][1], colorList[3][2]);
							roomFunction.playSound(false, "yellow2")
							setTimeout(() => {
								roomFunction.playSound(false, "win")
							}, 700);
						}
						if (winPlayersName.indexOf("cyan") != -1) {
							teampkFuncs.oneWin(colorList[4][0], colorList[4][1], colorList[4][2]);
							roomFunction.playSound(false, "cyan")
							setTimeout(() => {
								roomFunction.playSound(false, "win")
							}, 700);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							teampkFuncs.oneWin(colorList[5][0], colorList[5][1], colorList[5][2]);
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
								teampkFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2]);
								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "blue2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("green") != -1) {
								teampkFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[2][0], colorList[2][1], colorList[2][2]);

								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "green2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("yellow") != -1) {
								teampkFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[3][0], colorList[3][1], colorList[3][2]);

								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "yellow2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("cyan") != -1) {
								teampkFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[4][0], colorList[4][1], colorList[4][2]);

								roomFunction.playSound(false, "red2")
								setTimeout(() => {
									roomFunction.playSound(false, "cyan")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("brown") != -1) {
								teampkFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[5][0], colorList[5][1], colorList[5][2]);

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
								teampkFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2]);

								roomFunction.playSound(false, "blue2")
								setTimeout(() => {
									roomFunction.playSound(false, "green2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("yellow") != -1) {
								teampkFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);

								roomFunction.playSound(false, "blue2")
								setTimeout(() => {
									roomFunction.playSound(false, "yellow2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("cyan") != -1) {
								teampkFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[4][0], colorList[4][1], colorList[4][2]);

								roomFunction.playSound(false, "blue2")
								setTimeout(() => {
									roomFunction.playSound(false, "cyan")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("brown") != -1) {
								teampkFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[5][0], colorList[5][1], colorList[5][2]);

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
								teampkFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2]);

								roomFunction.playSound(false, "green2")
								setTimeout(() => {
									roomFunction.playSound(false, "yellow2")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("cyan") != -1) {
								teampkFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[4][0], colorList[4][1], colorList[4][2]);

								roomFunction.playSound(false, "green2")
								setTimeout(() => {
									roomFunction.playSound(false, "cyan")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("brown") != -1) {
								teampkFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[5][0], colorList[5][1], colorList[5][2]);

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
								teampkFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
								roomFunction.playSound(false, "yellow2")
								setTimeout(() => {
									roomFunction.playSound(false, "cyan")
								}, 700);
								setTimeout(() => {
									roomFunction.playSound(false, "allwin")
								}, 1400);
							}
							if (winPlayersName.indexOf("brown") != -1) {
								teampkFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
								teampkFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
							if (winPlayersName.indexOf("green") != -1) {
								if (winPlayersName.indexOf("cyan") != -1) {
									teampkFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[4][0], colorList[4][1], colorList[4][2]);
									roomFunction.playSound(false, "red2")
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
							}
						}
						if (winPlayersName.indexOf("blue") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								if (winPlayersName.indexOf("brown") != -1) {
									teampkFuncs.thrWin(colorList[5][0], colorList[5][1], colorList[5][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);
									roomFunction.playSound(false, "blue2")
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
										teampkFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2]);
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
										teampkFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
										teampkFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
										teampkFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
										teampkFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
										teampkFuncs.fouWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[2][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
										teampkFuncs.fouWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[2][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
											teampkFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
											teampkFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
											teampkFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
											teampkFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
											teampkFuncs.fivWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
						teampkFuncs.sixWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
				setTimeout(() => {
					roomFunction.goToGameLevel("leave_hold", "none");


					wanFaCtl_teampkCtl.gameEndCtl()
					levelInfos.gameIdList = [];
					teampkFuncs.rmAllListener()
				}, 2000 + winPlayers * 1000);
			}, 200);


		}

	}
}

const teampkFuncs = {
	//重置所有变量
	resetAll(difficulty) {
		nowInfos.gameCountTime = 30;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		// nowInfos.target = 40
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		teamPkInfos.screenCirCtl = 0;
		teamPkInfos.block2Infos = [0, 0, 0, 0, 0, 0, 0];
		teamPkInfos.allTime = 90;
		winPlayers = 0;
		pkNameList = [];
		winPlayersName = [];
		for (let i = 0; i < 32; i++) {
			teamPkInfos.fenProtect[i] = 0

		}
	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_teampk.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_teampk.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_teampk.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_teampk.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_teampk.gameTaped)

	},

	// 生成一个长度为length的与已知的二维数组不重复的二维数组
	generateRandomArray(knownArr, length) {
		const result = [];
		const set = new Set();
		while (result.length < length) {
			let y = Math.floor(Math.random() * 32); // 生成随机的y坐标
			const isD = knownArr.some((item) => item === y); // 判断是否与已知数组重复
			const str = y.toString(); // 将生成的二维坐标转为字符串
			if (!isD && !set.has(str)) {
				set.add(str); // 将该字符串添加到set中
				result.push(y); // 添加到数组中
			}
		}
		return result;
	},

	//每一面随机生成16块发射子弹
	createBullet() {
		let redSurface = this.generateRandomArray([], 16)
		// engine.log("--------" + redSurface.length + '------' + JSON.stringify(redSurface))
		let blueSurface = this.generateRandomArray(redSurface, 16)
		for (let i = 0; i < redSurface.length; i++) {
			let opInfo1 = {
				opId: "yellow" + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "yellow" + i,
					surface: "b",
					pt: {
						x: 3,
						y: redSurface[i],
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
							b: 254,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo1)
		}
		for (let j = 100; j < 100 + blueSurface.length; j++) {
			let opInfo = {
				opId: "yellow" + j,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "yellow" + j,
					surface: "b",
					pt: {
						x: 12,
						y: blueSurface[j - 100],
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
							b: 254,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo)
		}
	},

	//触碰发射子弹
	fireBullet(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("yellow") && onOff == true && (x == 3 || x == 12)) {
			let timeLen = (Math.random() * 3 + 2).toFixed(2);
			roomFunction.playSoundTivite(false, "biuPK", "positive")
			let opInfo = {
				opId: nodeId + y,
				opType: "play",
				opNode: nodeId,
				timeLen: timeLen,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: false,
							pt: {
								x: x,
								y: y
							}
						}
					},
					{
						t: 0.1,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: true,
							pt: {
								x: x > 6 ? x - 1 : x + 1,
								y: y
							}
						}
					},
					{
						t: 0.85,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: true,
							pt: {
								x: x == 3 ? 16 : -1,
								y: y
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: true,
							pt: {
								x: x == 3 ? 12 : 3,
								y: y
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo);
			this.hefeng(x, y, onOff, event, nodeId)
		}
	},
	hefeng(x, y, onOff, event, nodeId) {
		let hhh = "changdudu" + y
		let fff = "fireArrArr" + y
		teamPkInfos[hhh] = 0
		teamPkInfos[fff] = []
		if (teamPkInfos.fenProtect[y] == 0) {
			this.detectingBullets(y, onOff, event, nodeId)
		}
	},


	//获取两列节点数量进行加分
	detectingBullets(y, onOff, event, nodeId) {
		let hhh = "fireArrArr" + y
		let ffff = "changdudu" + y
		for (let x = 0; x < 16; x++) {
			let strRed = gameFuncs.surfacePointInfo("b", x, y);
			let infoRed = JSON.parse(strRed)
			if (infoRed.rgb.R == 254 && infoRed.rgb.B == 254) {
				teamPkInfos[hhh].push([x, y])
				setTimeout(() => {
					teamPkInfos[hhh].map((item) => {
						if (item[0] == 5 || item[0] == 10) {
							teamPkInfos.fenProtect[y] = 1
						}
					})
					this.detectingBullets(y)
				}, 100);
			}
		}
		teamPkInfos[ffff]++
		if (teamPkInfos[hhh].length < teamPkInfos[ffff] && teamPkInfos[hhh].length != 0) {
			if (!(teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] == 0 || teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] == 15)) {
				fastop.removeNode("mubiaoPlay" + (teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] <= 3 ? teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] - 1 : teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] + 1) + y, ("mubiao" + (teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] <= 3 ? teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] - 1 : teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] + 1) + "-" + y))
				if (teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] <= 3 && (teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] >= 0 || teamPkInfos[hhh][teamPkInfos[hhh].length - 1][0] <= 15)) {
					teamPkInfos.block2Infos[1] += usersInfos.usersResult.length % 2 == 0 ? 1 : usersInfos.usersResult.length / 2 == 1.5 ? 2 : 1.5
					teamPkInfos.block2Infos[3] += usersInfos.usersResult.length % 2 == 0 ? 1 : usersInfos.usersResult.length / 2 == 1.5 ? 2 : 1.5
					teamPkInfos.block2Infos[5] += usersInfos.usersResult.length % 2 == 0 ? 1 : usersInfos.usersResult.length / 2 == 1.5 ? 2 : 1.5
					teamPkInfos.block2Infos[6]++
				} else {
					teamPkInfos.block2Infos[0]++
					teamPkInfos.block2Infos[2]++
					teamPkInfos.block2Infos[4]++
				}
				if (teamPkInfos.block2Infos[6] == 96 || teamPkInfos.block2Infos[0] == 96) {
					wanFa_teampk.gameLevelEnd()
				}
				if ((teamPkInfos.block2Infos[0] > teamPkInfos.block2Infos[6]) && teamPkInfos.block2Infos[0] == 48) {
					let name = ""
					switch (usersInfos.usersResult.length) {
						case 2:
							name = "teamred"
							break;
						case 3:
						case 4:
							name = "redgreen"
							break;
						case 5:
						case 6:
							name = "redGreenCyan"
							break;
					}
					roomFunction.playSound(false, name)
					setTimeout(() => {
						roomFunction.playSound(false, "yishuaixianxiaomie")
					}, 1500);
				} else
					if ((teamPkInfos.block2Infos[0] < teamPkInfos.block2Infos[6]) && teamPkInfos.block2Infos[6] == 24) {
						let name = ""
						switch (usersInfos.usersResult.length) {
							case 2:
							case 3:
								name = "teamblue"
								break;
							case 4:
							case 5:
								name = "blueYellow"
								break;
							case 6:
								name = "blueYellowBrown"
								break;
						}
						setTimeout(() => {
							roomFunction.playSound(false, "yishuaixianxiaomie")
						}, 1000);
						roomFunction.playSound(false, name)
					}
			}
			teamPkInfos.fenProtect[y] = 0
			teamPkInfos[hhh] = []
			teamPkInfos[ffff] = 0
		}
	},
	//获取两列节点数量进行加分
	// tapSiteArr() {
	// 	let arrRed = []
	// 	let arrBlue = []
	// 	for (let y = 0; y < 16; y++) {
	// 		let strRed = gameFuncs.surfacePointInfo("b", 0, y);
	// 		let strBlue = gameFuncs.surfacePointInfo("b", 15, y);
	// 		let infoRed = JSON.parse(strRed)
	// 		if (infoRed.rgb.G == 254 && infoRed.rgb.B == 254 && teamPkInfos.fenProtect[y] == 0) {
	// 			arrRed.push(y)
	// 			teamPkInfos.fenProtect[y] = 1
	// 		}
	// 		let infoBlue = JSON.parse(strBlue)
	// 		if (infoBlue.rgb.G == 254 && infoBlue.rgb.B == 254 && teamPkInfos.fenProtect[y] == 0) {
	// 			arrBlue.push(y)
	// 			teamPkInfos.fenProtect[y] = 1
	// 		}
	// 	}
	// 	teamPkInfos.block2Infos[1] += arrRed.length
	// 	teamPkInfos.block2Infos[0] += arrBlue.length
	// },
	CountPlay() {
		let screenCir = setInterval(() => {
			if (teamPkInfos.screenCirCtl == 1) {
				clearInterval(screenCir)
				return
			}
			usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"]
			ganmeEndScreenShow = []
			for (let i = 0; i < usersInfos.usersResult.length; i++) {
				ganmeEndScreenShow.push({
					userColor: usercolors[i],
					userName: pkNameList[i],
					userScore: teamPkInfos.block2Infos[i]
				})
			}


			//将数组排序
			ganmeEndScreenShow.sort((a, b) => b.userScore - a.userScore)
			// engine.log("xxxxxxxx-hefenghefeng-xxxxxxxx" + JSON.stringify(ganmeEndScreenShow)) 
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
						value1: teamPkInfos.allTime
					},
					block3: {
						model: "dis_b_numUnit",
						label1: "加油加油！",
						value1: ''
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
					label1: "各组所得分数",
					value1: pkNameList.toString(),
					lavel2: "",
					value2: "#FF0000,#0000fe,#00fe00,#fec300,#00FFFF,#8b4513"
				},
				block2: {
					model: "dis_b_numUnit",
					label1: "SECONDS",
					value1: teamPkInfos.allTime
				},
				block3: {
					model: "dis_b_numUnit",
					label1: "加油加油！",
					value1: ''
				},
			}
		}
		gameFuncs.op(opInfo)
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

	}

}
