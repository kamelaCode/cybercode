const wanFa_haiWar = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_haiWar.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_haiWar.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_haiWar.gameDestroy);
		//重置全局变量
		haiWarFuncs.resetAll()
		clearInterval(haiWarFuncs.CountPlay.innerCount)
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
		wanFa_haiWar.gameStart.startLoop = setInterval(() => {
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
						haiWarFuncs.CountPlay();
					}
					break;
				case 18:
					roomFunction.playSound(true, "WarBgm", "background")
					break;
				case 19:
					clearInterval(wanFa_haiWar.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(1, 7000);
		// }, 500);

		// setTimeout(function () {
		// 	setTimeout(function () {
		// 		roomFunction.playSound(true, "WarBgm", "background")
		// 	}, 2000);
		// 	if (levelInfos.wanFa.startsWith("hai")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 		haiWarFuncs.CountPlay();
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
		engine.addEventListener("gameTaped", wanFa_haiWar.gameTaped)
		clearInterval(wanFa_haiWar.gamePlay.lyc)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("hai")) {
			gameRules.lifeMove();
			haiWarFuncs.CountPlay()
			haiWarFuncs.ScorePlay()
		}

		if (gameid == "hai011-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai017-war") {
			nowInfos.target = 30
		}
		if (gameid == "haizhibo002-war") {
			clearTimeout(wanFa_haiWar.gamePlay.ooo)
			clearTimeout(wanFa_haiWar.gamePlay.ooo1)
			clearTimeout(wanFa_haiWar.gamePlay.ooo2)
			nowInfos.target = 78//78
		}
		if (gameid == "hai006-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0280-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0220-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai014-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0330-war") {
			nowInfos.target = 30
		}
		//
		if (gameid == "hai007-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai013-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai01300-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0230-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0370-war") {
			nowInfos.target = 30
		}
		//
		if (gameid == "hai0380-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0500-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0750-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0690-war") {
			nowInfos.target = 30
		}
		if (gameid == "hai0340-war") {
			nowInfos.target = 30
		}
		///
		if (gameid == "haizhibo003-war") {
			nowInfos.target = 27
		}
		if (gameid == "haizhibo001-war") {
			haiWarFuncs.addRed8()
			nowInfos.target = 84//84
			wanFa_haiWar.gamePlay.lyc = setInterval(() => {
				let arr = []
				let weizhiArr = [3, 5, 7, 9, 11, 13]
				while (arr.length != 3) {
					let randomRed = Math.floor(Math.random() * 6)
					if (arr.toString().indexOf(randomRed.toString()) < 0) {
						arr.push(randomRed)
					}

				}
				fastop.nodeMove("redplay001", "red000", "0.9", false, "b", weizhiArr[arr[0]], 28, weizhiArr[arr[0]], 1)
				fastop.nodeMove("redplay002", "red001", "0.9", false, "b", weizhiArr[arr[1]], 28, weizhiArr[arr[1]], 1)
				fastop.nodeMove("redplay003", "red002", "0.9", false, "b", weizhiArr[arr[2]], 28, weizhiArr[arr[2]], 1)
				wanFa_haiWar.gamePlay.ooo = setTimeout(() => {
					let arr = []
					let weizhiArr = [3, 5, 7, 9, 11, 13]
					while (arr.length != 3) {
						let randomRed = Math.floor(Math.random() * 6)
						if (arr.toString().indexOf(randomRed.toString()) < 0) {
							arr.push(randomRed)
						}

					}
					fastop.nodeMove("redplay001", "red003", "0.6", false, "b", weizhiArr[arr[0]], 28, weizhiArr[arr[0]], 1)
					fastop.nodeMove("redplay002", "red004", "0.6", false, "b", weizhiArr[arr[1]], 28, weizhiArr[arr[1]], 1)
					fastop.nodeMove("redplay003", "red005", "0.6", false, "b", weizhiArr[arr[2]], 28, weizhiArr[arr[2]], 1)
					wanFa_haiWar.gamePlay.ooo1 = setTimeout(() => {
						let arr = []
						let weizhiArr = [3, 5, 7, 9, 11, 13]
						while (arr.length != 3) {
							let randomRed = Math.floor(Math.random() * 6)
							if (arr.toString().indexOf(randomRed.toString()) < 0) {
								arr.push(randomRed)
							}

						}
						fastop.nodeMove("redplay001", "red006", "0.6", false, "b", weizhiArr[arr[0]], 28, weizhiArr[arr[0]], 1)
						fastop.nodeMove("redplay002", "red007", "0.6", false, "b", weizhiArr[arr[1]], 28, weizhiArr[arr[1]], 1)
						fastop.nodeMove("redplay003", "red008", "0.6", false, "b", weizhiArr[arr[2]], 28, weizhiArr[arr[2]], 1)
						wanFa_haiWar.gamePlay.ooo2 = setTimeout(() => {
							let arr = []
							let weizhiArr = [3, 5, 7, 9, 11, 13]
							while (arr.length != 3) {
								let randomRed = Math.floor(Math.random() * 6)
								if (arr.toString().indexOf(randomRed.toString()) < 0) {
									arr.push(randomRed)
								}
							}
							fastop.nodeMove("redplay001", "red009", "1", false, "b", weizhiArr[arr[0]], 28, weizhiArr[arr[0]], 1)
							fastop.nodeMove("redplay002", "red0010", "1", false, "b", weizhiArr[arr[1]], 28, weizhiArr[arr[1]], 1)
							fastop.nodeMove("redplay003", "red0011", "1", false, "b", weizhiArr[arr[2]], 28, weizhiArr[arr[2]], 1)
						}, 200);
					}, 200);
				}, 300);
			}, 1000);
		}
		if (gameid != "haiColor-cxx") {
			nowInfos.nowGameid = gameid
			wanFa_haiWar.gamePlay.jishi = setTimeout(() => {
				if (cwy == 1) {
					clearTimeout(wanFa_haiWar.gamePlay.jishi)
					return
				}
				//engine.log(guole + "caonimade")
				switch (guole) {
					case 0:
						usersInfos.levelScore = 0;
						haiWarFuncs.addRed8()
						roomFunction.playSound(false, "levelOne")
						break;
					case 1:
						haiWarFuncs.num2()
						usersInfos.levelScore = 10;
						roomFunction.playSound(false, "levelTwo")
						break;
					case 2:
						haiWarFuncs.num3()
						usersInfos.levelScore = 20;
						roomFunction.playSound(false, "levelThree")
						break;
					case 3:
						haiWarFuncs.addRed9()
						usersInfos.levelScore = 30;
						roomFunction.playSound(false, "levelFour")
						break;
					case 4:
						haiWarFuncs.addRed10()
						usersInfos.levelScore = 40;
						roomFunction.playSound(false, "levelFive")
						break;
					case 5:
						haiWarFuncs.addRed11()
						usersInfos.levelScore = 60;
						roomFunction.playSound(false, "levelSix")
						break;
					case 6:
						haiWarFuncs.addRed12()
						usersInfos.levelScore = 80;
						roomFunction.playSound(false, "levelSeven")
						break;
					case 7:
						haiWarFuncs.addRed13()
						usersInfos.levelScore = 100;
						roomFunction.playSound(false, "levelEight")
						break;
					case 8:
						haiWarFuncs.addRed14()
						usersInfos.levelScore = 120;
						roomFunction.playSound(false, "levelNine")
						break;
					case 9:
						haiWarFuncs.addRed15()
						usersInfos.levelScore = 150;
						roomFunction.playSound(false, "levelTen")
						break;
					case 10:
						haiWarFuncs.addRed16()
						usersInfos.levelScore = 170;
						roomFunction.playSound(false, "level-eleven")
						break;
					case 11:
						haiWarFuncs.addRed17()
						usersInfos.levelScore = 190;
						roomFunction.playSound(false, "level-twelve")
						break;
					case 12:
						haiWarFuncs.addRed18()
						usersInfos.levelScore = 200;
						roomFunction.playSound(false, "level-thirten")
						break;
					case 13:
						haiWarFuncs.addRed19()
						usersInfos.levelScore = 220;
						roomFunction.playSound(false, "level-forteen")
						break;
					case 14:
						haiWarFuncs.addRed20()
						usersInfos.levelScore = 240;
						roomFunction.playSound(false, "level-fifteen")
						break;
					case 15:
						haiWarFuncs.addRed21()
						usersInfos.levelScore = 260;
						roomFunction.playSound(false, "level-sixteen")
						break;
					case 16:
						haiWarFuncs.addRed22()
						usersInfos.levelScore = 280;
						roomFunction.playSound(false, "level-seventeen")
						break;
					case 17:
						haiWarFuncs.addRed23()
						usersInfos.levelScore = 300;
						roomFunction.playSound(false, "level-eighteen")
						break;
					case 18:
						haiWarFuncs.addRed24()
						usersInfos.levelScore = 320;
						roomFunction.playSound(false, "level-nineteen")
						break;
					case 19:
						haiWarFuncs.addRed25()
						usersInfos.levelScore = 350;
						roomFunction.playSound(false, "level-twenty")
						break;
				}
			}, 3000);
			setTimeout(() => {
				engine.log("????????????")
				change = 0
			}, 5000);

		}
		if (gameid == "hai017-war") {
			nowInfos.target = 24
			setTimeout(() => {
				haiWarFuncs.blueFor()
			}, 3000);
		}
		if (gameid == "hai17-cxx") {
			setTimeout(() => {
				haiWarFuncs.randomBlue2(15)
				wanFa_haiWar.gamePlay.haipro = setInterval(() => {
					haiWarFuncs.randomBlue2(15)
				}, 10000);
			}, 6000);
			nowInfos.target = 30

		}
		//nowInfos.target = 2

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (nowInfos.nowGameid.startsWith("hai")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			haiWarFuncs.blueTap(face, x, y, onOff, nodeId, event);
			haiWarFuncs.tapWrong(face, x, y, onOff, nodeId, event);
			//gameRules.tapBlink(face, x, y, onOff, nodeId, event)
			if (onOff == false && deferredInfos.xHistoricalData == x && deferredInfos.yHistoricalData == y) {
				engine.log("延迟扣血取消用户已离开")
				clearTimeout(haiWarFuncs.tapWrong.determine)
			}
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(haiWarFuncs.CountPlay.innerCount)
		clearInterval(wanFa_haiWar.gamePlay.haipro)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
			wanFa_haiWar.gameLevelEnd()
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearTimeout(wanFa_haiWar.gamePlay.jishi)
		clearInterval(haiWarFuncs.CountPlay.innerCount)
		clearInterval(haiWarFuncs.tapWrong.awa)
		clearInterval(wanFa_haiWar.gamePlay.haipro)
		clearInterval(wanFa_haiWar.gamePlay.lyc)
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
		haiWarFuncs.rmAllListener()
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
		cwy = 0
		if (guole == 19) {
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
				roomFunction.playSound(false, "pass-ten")
				break;
			case 11:
				roomFunction.playSound(false, "pass-eleven")
				break;
			case 12:
				roomFunction.playSound(false, "pass-twelve")
				break;
			case 13:
				roomFunction.playSound(false, "pass-thirteen")
				break;
			case 14:
				roomFunction.playSound(false, "pass-fourteen")
				break;
			case 15:
				roomFunction.playSound(false, "pass-fiveteen")
				break;
			case 16:
				roomFunction.playSound(false, "pass-sixteen")
				break;
			case 17:
				roomFunction.playSound(false, "pass-seventeen")
				break;
			case 18:
				roomFunction.playSound(false, "pass-eighteen")
				break;
			case 19:
				roomFunction.playSound(false, "pass-nineteen")
				break;
			case 20:
				roomFunction.playSound(false, "bigwin")
				break;

		}
	}

}




const haiWarFuncs = {
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
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_haiWar.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_haiWar.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_haiWar.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_haiWar.gameTaped)
	},
	//判定错误并播放错误音效，减生命值。
	tapWrong(face, x, y, onOff, nodeId, event) {
		if (nowInfos.lifeProtect == 0) {
			if (nodeId.startsWith("red") && onOff == true && cuowu == 0) {
				deferredInfos.xHistoricalData = x
				deferredInfos.yHistoricalData = y
				// setTimeout(() => {
				// 	haiWarFuncs.addBlink(x, y)
				// }, 200);
				nowInfos.lifeProtect = 1;
				setTimeout(function () {
					nowInfos.lifeProtect = 0
				}, 1000);
				haiWarFuncs.tapWrong.determine = setTimeout(() => {
					haiWarFuncs.addBlink(x, y)
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
						wanFa_haiWar.gameLevelEnd()
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
	//消除踩踏到的蓝色节点,要求蓝色节点命名以“blue”为起始
	blueTap(face, x, y, onOff, nodeId, event) {
		//engine.log(nodeId)
		if (nodeId.startsWith("blue") || nodeId.startsWith("mubiao001.blue") || nodeId.startsWith("mubiao002.blue") || nodeId.startsWith("mubiao003.blue")) {
			if (onOff == true) {
				usersInfos.ValidTarget++
				if (nowInfos.target > 1) {
					fastop.removeNode("rmblue", nodeId)
					roomFunction.playSoundTivite(false, "bling2", "positive")
					nowInfos.target--;
					nowInfos.allTarget++;
					usersInfos.gameScore += nowInfos.scoreCoefficient;
					// usersInfos.levelScore += nowInfos.scoreCoefficient;
					haiWarFuncs.ScorePlay()

				} else if (nowInfos.target == 1) {
					if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) != levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						// usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiWarFuncs.ScorePlay();
						nowInfos.gameCountTime += 30
						change = 1//过长动画时间暂停
						engine.log("32go--------next")
						winLose = 0
						// roomFunction.goToGameLevel("haiColor-cxx", "none")//32go
						// setTimeout(() => {
						guole++
						roomFunction.goToNextGame();
						//获取跳关后的时间作为判断积分规则
						challengeTime = nowInfos.gameCountTime
						//获取跳关后的生命值作为判断积分规则
						challengeLife = nowInfos.lifePoint
						roomFunction.stopSound("fenwei")
						roomFunction.playSoundTivite(false, "dididi", "positive")
						// }, 2000);
					} else if (levelInfos.gameIdList.indexOf(nowInfos.nowGameid) == levelInfos.gameIdList.length - 1) {
						fastop.removeNode("rmblue", nodeId)
						nowInfos.target--;
						nowInfos.allTarget++;
						usersInfos.gameScore += nowInfos.scoreCoefficient;
						// usersInfos.levelScore += nowInfos.scoreCoefficient;
						haiWarFuncs.ScorePlay()
						guole++
						wanFa_haiWar.gameLevelEnd();
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
				// 					y: 33
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 33
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
				// 					y: 34
				// 				},
				// 				rb: {
				// 					x: 4,
				// 					y: 42
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
				// 					y: 34
				// 				},
				// 				rb: {
				// 					x: 11,
				// 					y: 42
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
		haiWarFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
				wanFa_haiWar.gameTimeOver()
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
