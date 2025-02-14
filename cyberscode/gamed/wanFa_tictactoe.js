const wanFa_tictactoe = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_tictactoe.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_tictactoe.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_tictactoe.gameDestroy);
		//重置全局变量
		tictaFuncs.resetAll(2)
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
		tictaFuncs.rgbScorePlay()//跳转内屏显示
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		let countTime = 0
		wanFa_tictactoe.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					break;
				case 16:
					roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					break;
				case 17:
					clearInterval(wanFa_tictactoe.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},




	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		if (gameid == "tictactoe-cxx") {
			roomFunction.playSound(false, "jingziRules")
			setTimeout(() => {
				engine.addEventListener("gameTaped", wanFa_tictactoe.gameTaped)
				roomFunction.playSound(true, "jingziBgm", "background");
			}, 5000);
			engine.log("-------------------" + gameid)
			for (var i = 0; i < usersInfos.usersResult.length; i++) {
				goldInfos.block2Infos[i] = ""
			}
			//竞技模式中内屏倒计时
			wanFa_tictactoe.gamePlay.innerCount = setInterval(() => {
				teamPkInfos.allTime--
				if (teamPkInfos.allTime == 11) {
					roomFunction.playSound(false, "daoshu10")
					roomFunction.stopSound("teamPkBgm");
				}
				if (teamPkInfos.allTime == 0) {
					wanFa_tictactoe.gameLevelEnd()
				}

			}, 1000)
			setIntervalCount(function (index, count) {
				teamPkInfos.levelScoreAll = ""
			}, 5000, 20)
			tictaFuncs.CountPlay()
		}


	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		//engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
		if (onOff == true) {
			usersInfos.ValidTrigger++
		}
		if (blueNums < 3) {
			tictaFuncs.tapBlueColor(face, x, y, onOff, nodeId, event)

		} else if (blueNums >= 3) {
			tictaFuncs.tapBlueMove(face, x, y, onOff, nodeId, event)
		}

		if (redNums < 3) {
			tictaFuncs.tapRedColor(face, x, y, onOff, nodeId, event)
		} else if (redNums >= 3) {
			tictaFuncs.tapRedMove(face, x, y, onOff, nodeId, event)
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
		// 	wanFa_tictactoe.gameLevelEnd()
		// }
	},



	//游戏关卡结束
	gameLevelEnd() {
		if (teamPkInfos.screenCirCtl == 0) {
			engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
			// clearInterval(wanFa_tictactoe.gamePlay.innerCount)
			clearInterval(wanFa_tictactoe.gamePlay.innerCount)
			engine.removeEventListener("gameTaped", wanFa_tictactoe.gameTaped)
			roomFunction.stopSound("jingziBgm")
			// roomFunction.goToGameLevel("leave_hold", "none")
			levelInfos.gameIdList = []
			teamPkInfos.screenCirCtl = 1
			//roomFunction.goToGameLevel("gameEndjs", "none");
			fastop.addJing003("addBlack", "black001", 0, 0, 15, 31, 0, 0, 0)
			let coun = 0
			let counJing = setInterval(() => {
				coun++
				switch (coun) {
					case 1:
						roomFunction.playSoundTivite(false, "jiazaishengli", "positive")
						if (redWinnn == 1) {
							tictaFuncs.oneWin(colorList[0][0], colorList[0][1], colorList[0][2]);
						}
						if (blueWinnn == 1) {
							tictaFuncs.oneWin(colorList[1][0], colorList[1][1], colorList[1][2]);
						}
						break;
					case 4:
						if (redWinnn == 1) {
							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "win")
							}, 700);
						}
						if (blueWinnn == 1) {
							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "win")
							}, 700);
						}
						break;
					case 6:
						fastop.removeNode("rmBlack", "black001")
						roomFunction.goToGameLevel("leave_hold", "none");
						wanFaCtl_tictactoeCtl.gameEndCtl()
						levelInfos.gameIdList = [];
						tictaFuncs.rmAllListener()
						break;
					case 7:
						clearInterval(counJing)
						break;

				}
			}, 1000)
		}

	}
}

const tictaFuncs = {
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
		teamPkInfos.allTime = 999;
		goldInfos.block2Infos = []
		pkNameList = [];
		blueWinnn = 0
		redWinnn = 0
		blueTap = 0
		redTap = 0
		blue1 = 0
		blue2 = 0
		blue3 = 0
		blue4 = 0
		blue5 = 0
		blue6 = 0
		blue7 = 0
		blue8 = 0
		blue9 = 0

		red1 = 0
		red2 = 0
		red3 = 0
		red4 = 0
		red5 = 0
		red6 = 0
		red7 = 0
		red8 = 0
		red9 = 0
		redNums = 0
		blueNums = 0
		blueKong = 0
		redKong = 0
	},
	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_tictactoe.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_tictactoe.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_tictactoe.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_tictactoe.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_tictactoe.gameTaped)

	},
	tapBlueColor(face, x, y, onOff, nodeId, event) {
		if (onOff == true) {
			if (x == 1 && y == 22 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue1 = 1 //记录当前游戏情况
					red1 = 0
					fastop.addTapJing("addblue01", "blue01", 1, 22, 0, 0, 254, "addblue011", "blue011", 10, 22, 0, 0, 254, "addblue0111", "blue0111", 4, 33, 5, 34, 0, 0, 254)

				}
			} else if (x == 3 && y == 22 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue2 = 1 //记录当前游戏情况
					red2 = 0
					fastop.addTapJing("addblue02", "blue02", 3, 22, 0, 0, 254, "addblue022", "blue022", 12, 22, 0, 0, 254, "addblue0222", "blue0222", 7, 33, 8, 34, 0, 0, 254)
				}
			} else if (x == 5 && y == 22 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue3 = 1 //记录当前游戏情况
					red3 = 0
					fastop.addTapJing("addblue03", "blue03", 5, 22, 0, 0, 254, "addblue033", "blue033", 14, 22, 0, 0, 254, "addblue0333", "blue0333", 10, 33, 11, 34, 0, 0, 254)
				}
			} else if (x == 1 && y == 24 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue4 = 1 //记录当前游戏情况
					red4 = 0
					fastop.addTapJing("addblue04", "blue04", 1, 24, 0, 0, 254, "addblue044", "blue044", 10, 24, 0, 0, 254, "addblue0444", "blue0444", 4, 36, 5, 37, 0, 0, 254)
				}
			} else if (x == 3 && y == 24 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue5 = 1 //记录当前游戏情况
					red5 = 0
					fastop.addTapJing("addblue05", "blue05", 3, 24, 0, 0, 254, "addblue055", "blue055", 12, 24, 0, 0, 254, "addblue0555", "blue0555", 7, 36, 8, 37, 0, 0, 254)
				}
			} else if (x == 5 && y == 24 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue6 = 1 //记录当前游戏情况
					red6 = 0
					fastop.addTapJing("addblue06", "blue06", 5, 24, 0, 0, 254, "addblue066", "blue066", 14, 24, 0, 0, 254, "addblue0666", "blue0666", 10, 36, 11, 37, 0, 0, 254)
				}
			} else if (x == 1 && y == 26 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue7 = 1 //记录当前游戏情况
					red7 = 0
					fastop.addTapJing("addblue07", "blue07", 1, 26, 0, 0, 254, "addblue077", "blue077", 10, 26, 0, 0, 254, "addblue0777", "blue0777", 4, 39, 5, 40, 0, 0, 254)
				}
			} else if (x == 3 && y == 26 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue8 = 1 //记录当前游戏情况
					red8 = 0
					fastop.addTapJing("addblue08", "blue08", 3, 26, 0, 0, 254, "addblue088", "blue088", 12, 26, 0, 0, 254, "addblue0888", "blue0888", 7, 39, 8, 40, 0, 0, 254)
				}
			} else if (x == 5 && y == 26 && blueTap == 0) {
				if (nodeId == "") {
					blueNums++
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue9 = 1 //记录当前游戏情况
					red9 = 0
					fastop.addTapJing("addblue09", "blue09", 5, 26, 0, 0, 254, "addblue099", "blue099", 14, 26, 0, 0, 254, "addblue0999", "blue0999", 10, 39, 11, 40, 0, 0, 254)
				}
			}

		}
	},
	tapRedColor(face, x, y, onOff, nodeId, event) {
		if (onOff == true) {
			if (x == 10 && y == 22 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue1 = 0 //记录当前游戏情况
					red1 = 1
					fastop.addTapJing("addred01", "red01", 10, 22, 254, 0, 0, "addred011", "red011", 1, 22, 254, 0, 0, "addred0111", "red0111", 4, 33, 5, 34, 254, 0, 0)
				}
			} else if (x == 12 && y == 22 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue2 = 0 //记录当前游戏情况
					red2 = 1
					fastop.addTapJing("addred02", "red02", 12, 22, 254, 0, 0, "addred022", "red022", 3, 22, 254, 0, 0, "addred0222", "red0222", 7, 33, 8, 34, 254, 0, 0)
				}
			} else if (x == 14 && y == 22 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue3 = 0 //记录当前游戏情况
					red3 = 1
					fastop.addTapJing("addred03", "red03", 14, 22, 254, 0, 0, "addred033", "red033", 5, 22, 254, 0, 0, "addred0333", "red0333", 10, 33, 11, 34, 254, 0, 0)
				}
			} else if (x == 10 && y == 24 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue4 = 0 //记录当前游戏情况
					red4 = 1
					fastop.addTapJing("addred04", "red04", 10, 24, 254, 0, 0, "addred044", "red044", 1, 24, 254, 0, 0, "addred0444", "red0444", 4, 36, 5, 37, 254, 0, 0)
				}
			} else if (x == 12 && y == 24 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue5 = 0 //记录当前游戏情况
					red5 = 1
					fastop.addTapJing("addred05", "red05", 12, 24, 254, 0, 0, "addred055", "red055", 3, 24, 254, 0, 0, "addred0555", "red0555", 7, 36, 8, 37, 254, 0, 0)
				}
			} else if (x == 14 && y == 24 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue6 = 0 //记录当前游戏情况
					red6 = 1
					fastop.addTapJing("addred06", "red06", 14, 24, 254, 0, 0, "addred066", "red066", 5, 24, 254, 0, 0, "addred0666", "red0666", 10, 36, 11, 37, 254, 0, 0)
				}
			} else if (x == 10 && y == 26 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue7 = 0 //记录当前游戏情况
					red7 = 1
					fastop.addTapJing("addred07", "red07", 10, 26, 254, 0, 0, "addred077", "red077", 1, 26, 254, 0, 0, "addred0777", "red0777", 4, 39, 5, 40, 254, 0, 0)
				}
			} else if (x == 12 && y == 26 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue8 = 0 //记录当前游戏情况
					red8 = 1
					fastop.addTapJing("addred08", "red08", 12, 26, 254, 0, 0, "addred088", "red088", 3, 26, 254, 0, 0, "addred0888", "red0888", 7, 39, 8, 40, 254, 0, 0)
				}
			} else if (x == 14 && y == 26 && redTap == 0) {
				if (nodeId == "") {
					redNums++
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue9 = 0 //记录当前游戏情况
					red9 = 1
					fastop.addTapJing("addred09", "red09", 14, 26, 254, 0, 0, "addred099", "red099", 5, 26, 254, 0, 0, "addred0999", "red0999", 10, 39, 11, 40, 254, 0, 0)
				}
			}

		}
	},
	tapBlueMove(face, x, y, onOff, nodeId, event) {
		if (onOff == true) {
			if (x == 1 && y == 22 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue1 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue01")
					fastop.removeNode("rmBlue", "blue011")
					fastop.removeNode("rmBlue", "blue0111")
				}
			} else if (x == 3 && y == 22 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500)
					blue2 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue02")
					fastop.removeNode("rmBlue", "blue022")
					fastop.removeNode("rmBlue", "blue0222")
				}
			} else if (x == 5 && y == 22 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue3 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue03")
					fastop.removeNode("rmBlue", "blue033")
					fastop.removeNode("rmBlue", "blue0333")
				}
			} else if (x == 1 && y == 24 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue4 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue04")
					fastop.removeNode("rmBlue", "blue044")
					fastop.removeNode("rmBlue", "blue0444")
				}
			} else if (x == 3 && y == 24 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue5 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue05")
					fastop.removeNode("rmBlue", "blue055")
					fastop.removeNode("rmBlue", "blue0555")
				}
			} else if (x == 5 && y == 24 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue6 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue06")
					fastop.removeNode("rmBlue", "blue066")
					fastop.removeNode("rmBlue", "blue0666")
				}
			} else if (x == 1 && y == 26 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue7 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue07")
					fastop.removeNode("rmBlue", "blue077")
					fastop.removeNode("rmBlue", "blue0777")
				}
			} else if (x == 3 && y == 26 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue8 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue08")
					fastop.removeNode("rmBlue", "blue088")
					fastop.removeNode("rmBlue", "blue0888")
				}
			} else if (x == 5 && y == 26 && blueTap == 0) {
				if (nodeId != "" && blueKong == 0 && nodeId.startsWith("blue")) {
					setTimeout(() => {
						blueKong = 1
					}, 500);
					blue9 = 0 //记录当前游戏情况
					fastop.removeNode("rmBlue", "blue09")
					fastop.removeNode("rmBlue", "blue099")
					fastop.removeNode("rmBlue", "blue0999")
				}
			}


			if (x == 1 && y == 22 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue1 = 1 //记录当前游戏情况
					red1 = 0
					fastop.addTapJing("addblue01", "blue01", 1, 22, 0, 0, 254, "addblue011", "blue011", 10, 22, 0, 0, 254, "addblue0111", "blue0111", 4, 33, 5, 34, 0, 0, 254)

				}
			} else if (x == 3 && y == 22 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue2 = 1 //记录当前游戏情况
					red2 = 0
					fastop.addTapJing("addblue02", "blue02", 3, 22, 0, 0, 254, "addblue022", "blue022", 12, 22, 0, 0, 254, "addblue0222", "blue0222", 7, 33, 8, 34, 0, 0, 254)
				}
			} else if (x == 5 && y == 22 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue3 = 1 //记录当前游戏情况
					red3 = 0
					fastop.addTapJing("addblue03", "blue03", 5, 22, 0, 0, 254, "addblue033", "blue033", 14, 22, 0, 0, 254, "addblue0333", "blue0333", 10, 33, 11, 34, 0, 0, 254)
				}
			} else if (x == 1 && y == 24 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue4 = 1 //记录当前游戏情况
					red4 = 0
					fastop.addTapJing("addblue04", "blue04", 1, 24, 0, 0, 254, "addblue044", "blue044", 10, 24, 0, 0, 254, "addblue0444", "blue0444", 4, 36, 5, 37, 0, 0, 254)
				}
			} else if (x == 3 && y == 24 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue5 = 1 //记录当前游戏情况
					red5 = 0
					fastop.addTapJing("addblue05", "blue05", 3, 24, 0, 0, 254, "addblue055", "blue055", 12, 24, 0, 0, 254, "addblue0555", "blue0555", 7, 36, 8, 37, 0, 0, 254)
				}
			} else if (x == 5 && y == 24 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue6 = 1 //记录当前游戏情况
					red6 = 0
					fastop.addTapJing("addblue06", "blue06", 5, 24, 0, 0, 254, "addblue066", "blue066", 14, 24, 0, 0, 254, "addblue0666", "blue0666", 10, 36, 11, 37, 0, 0, 254)
				}
			} else if (x == 1 && y == 26 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue7 = 1 //记录当前游戏情况
					red7 = 0
					fastop.addTapJing("addblue07", "blue07", 1, 26, 0, 0, 254, "addblue077", "blue077", 10, 26, 0, 0, 254, "addblue0777", "blue0777", 4, 39, 5, 40, 0, 0, 254)
				}
			} else if (x == 3 && y == 26 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue8 = 1 //记录当前游戏情况
					red8 = 0
					fastop.addTapJing("addblue08", "blue08", 3, 26, 0, 0, 254, "addblue088", "blue088", 12, 26, 0, 0, 254, "addblue0888", "blue0888", 7, 39, 8, 40, 0, 0, 254)
				}
			} else if (x == 5 && y == 26 && blueTap == 0) {
				if (nodeId == "" && blueKong == 1) {
					blueKong = 0
					blueTap = 1
					setTimeout(() => {
						blueTap = 0
					}, 1000);
					blue9 = 1 //记录当前游戏情况
					red9 = 0
					fastop.addTapJing("addblue09", "blue09", 5, 26, 0, 0, 254, "addblue099", "blue099", 14, 26, 0, 0, 254, "addblue0999", "blue0999", 10, 39, 11, 40, 0, 0, 254)
				}
			}
		}
		tictaFuncs.blueWinPan()
		tictaFuncs.redWinPan()
	},
	tapRedMove(face, x, y, onOff, nodeId, event) {
		if (onOff == true) {
			if (x == 10 && y == 22 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red1 = 0
					fastop.removeNode("rmRed", "red01")
					fastop.removeNode("rmRed", "red011")
					fastop.removeNode("rmRed", "red0111")
				}
			} else if (x == 12 && y == 22 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red2 = 0
					fastop.removeNode("rmRed", "red02")
					fastop.removeNode("rmRed", "red022")
					fastop.removeNode("rmRed", "red0222")
				}
			} else if (x == 14 && y == 22 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red3 = 0
					fastop.removeNode("rmRed", "red03")
					fastop.removeNode("rmRed", "red033")
					fastop.removeNode("rmRed", "red0333")
				}
			} else if (x == 10 && y == 24 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red4 = 0
					fastop.removeNode("rmRed", "red04")
					fastop.removeNode("rmRed", "red044")
					fastop.removeNode("rmRed", "red0444")
				}
			} else if (x == 12 && y == 24 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red5 = 0
					fastop.removeNode("rmRed", "red05")
					fastop.removeNode("rmRed", "red055")
					fastop.removeNode("rmRed", "red0555")
				}
			} else if (x == 14 && y == 24 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red6 = 0
					fastop.removeNode("rmRed", "red06")
					fastop.removeNode("rmRed", "red066")
					fastop.removeNode("rmRed", "red0666")
				}
			} else if (x == 10 && y == 26 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red7 = 0
					fastop.removeNode("rmRed", "red07")
					fastop.removeNode("rmRed", "red077")
					fastop.removeNode("rmRed", "red0777")
				}
			} else if (x == 12 && y == 26 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red8 = 0
					fastop.removeNode("rmRed", "red08")
					fastop.removeNode("rmRed", "red088")
					fastop.removeNode("rmRed", "red0888")
				}
			} else if (x == 14 && y == 26 && redTap == 0) {
				if (nodeId != "" && redKong == 0 && nodeId.startsWith("red")) {
					setTimeout(() => {
						redKong = 1
					}, 500);
					red9 = 0
					fastop.removeNode("rmRed", "red09")
					fastop.removeNode("rmRed", "red099")
					fastop.removeNode("rmRed", "red0999")
				}
			}
			if (x == 10 && y == 22 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue1 = 0 //记录当前游戏情况
					red1 = 1
					fastop.addTapJing("addred01", "red01", 10, 22, 254, 0, 0, "addred011", "red011", 1, 22, 254, 0, 0, "addred0111", "red0111", 4, 33, 5, 34, 254, 0, 0)
				}
			} else if (x == 12 && y == 22 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue2 = 0 //记录当前游戏情况
					red2 = 1
					fastop.addTapJing("addred02", "red02", 12, 22, 254, 0, 0, "addred022", "red022", 3, 22, 254, 0, 0, "addred0222", "red0222", 7, 33, 8, 34, 254, 0, 0)
				}
			} else if (x == 14 && y == 22 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue3 = 0 //记录当前游戏情况
					red3 = 1
					fastop.addTapJing("addred03", "red03", 14, 22, 254, 0, 0, "addred033", "red033", 5, 22, 254, 0, 0, "addred0333", "red0333", 10, 33, 11, 34, 254, 0, 0)
				}
			} else if (x == 10 && y == 24 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue4 = 0 //记录当前游戏情况
					red4 = 1
					fastop.addTapJing("addred04", "red04", 10, 24, 254, 0, 0, "addred044", "red044", 1, 24, 254, 0, 0, "addred0444", "red0444", 4, 36, 5, 37, 254, 0, 0)
				}
			} else if (x == 12 && y == 24 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue5 = 0 //记录当前游戏情况
					red5 = 1
					fastop.addTapJing("addred05", "red05", 12, 24, 254, 0, 0, "addred055", "red055", 3, 24, 254, 0, 0, "addred0555", "red0555", 7, 36, 8, 37, 254, 0, 0)
				}
			} else if (x == 14 && y == 24 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue6 = 0 //记录当前游戏情况
					red6 = 1
					fastop.addTapJing("addred06", "red06", 14, 24, 254, 0, 0, "addred066", "red066", 5, 24, 254, 0, 0, "addred0666", "red0666", 10, 36, 11, 37, 254, 0, 0)
				}
			} else if (x == 10 && y == 26 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue7 = 0 //记录当前游戏情况
					red7 = 1
					fastop.addTapJing("addred07", "red07", 10, 26, 254, 0, 0, "addred077", "red077", 1, 26, 254, 0, 0, "addred0777", "red0777", 4, 39, 5, 40, 254, 0, 0)
				}
			} else if (x == 12 && y == 26 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue8 = 0 //记录当前游戏情况
					red8 = 1
					fastop.addTapJing("addred08", "red08", 12, 26, 254, 0, 0, "addred088", "red088", 3, 26, 254, 0, 0, "addred0888", "red0888", 7, 39, 8, 40, 254, 0, 0)
				}
			} else if (x == 14 && y == 26 && redTap == 0) {
				if (nodeId == "" && redKong == 1) {
					redKong = 0
					redTap = 1
					setTimeout(() => {
						redTap = 0
					}, 1000);
					blue9 = 0 //记录当前游戏情况
					red9 = 1
					fastop.addTapJing("addred09", "red09", 14, 26, 254, 0, 0, "addred099", "red099", 5, 26, 254, 0, 0, "addred0999", "red0999", 10, 39, 11, 40, 254, 0, 0)
				}
			}

		}
		tictaFuncs.blueWinPan()
		tictaFuncs.redWinPan()
	},
	//判断各种情况各颜色胜利方式
	blueWinPan() {
		if (blue1 == 1 && blue2 == 1 && blue3 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue4 == 1 && blue5 == 1 && blue6 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue7 == 1 && blue8 == 1 && blue9 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue7 == 1 && blue8 == 1 && blue9 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue1 == 1 && blue4 == 1 && blue7 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue2 == 1 && blue5 == 1 && blue8 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue3 == 1 && blue6 == 1 && blue9 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue1 == 1 && blue5 == 1 && blue9 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (blue3 == 1 && blue5 == 1 && blue7 == 1) {
			blueWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		}
	},
	redWinPan() {
		if (red1 == 1 && red2 == 1 && red3 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red4 == 1 && red5 == 1 && red6 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red7 == 1 && red8 == 1 && red9 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red7 == 1 && red8 == 1 && red9 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red1 == 1 && red4 == 1 && red7 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red2 == 1 && red5 == 1 && red8 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red3 == 1 && red6 == 1 && red9 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red1 == 1 && red5 == 1 && red9 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		} else if (red3 == 1 && red5 == 1 && red7 == 1) {
			redWinnn = 1
			wanFa_tictactoe.gameLevelEnd()
		}
	},
	CountPlay() {
		let screenCir = setInterval(() => {
			if (teamPkInfos.screenCirCtl == 1) {
				clearInterval(screenCir)
				return
			}
			usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"]
			ganmeEndScreenShow = []
			for (let i = 0; i < 2; i++) {
				ganmeEndScreenShow.push({
					userColor: usercolors[i],
					userName: pkNameList[i],
					userScore: goldInfos.block2Infos[i]

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
}
