const wanFa_loot = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_loot.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_loot.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_loot.gameDestroy);
		//重置全局变量
		lootFuncs.resetAll()
		clearInterval(lootFuncs.CountPlay.innerCount)
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
		lootFuncs.ScorePlay()
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		let countTime = 0
		wanFa_loot.gameStart.startLoop = setInterval(() => {
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
					roomFunction.playSound(false, "lootRules")
					if (levelInfos.wanFa.startsWith("loot")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
						lootFuncs.CountPlay();
					}
					break;
				case 25:
					roomFunction.playSound(true, "lootBgm", "background")
					break;
				case 26:
					clearInterval(wanFa_loot.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.log("添加tap监听")
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("loot")) {
			engine.addEventListener("gameTaped", wanFa_loot.gameTaped)
			nowInfos.gameCountTime = 70
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			lootFuncs.geiwoSheng()
			wanFa_loot.gamePlay.inCount = setInterval(() => {
				nowInfos.gameCountTime--
				if (nowInfos.gameCountTime == 0) {
					wanFa_loot.gameLevelEnd()
				}
				if (nowInfos.gameCountTime == 5) {
					roomFunction.playSound(false, "fenwei")
				}
				if (nowInfos.gameCountTime == 10) {
					roomFunction.playSound(false, "daoshu10")
				}
			}, 1000);
		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event + "被触碰了")
		if (onOff == true) {
			usersInfos.ValidTrigger++
		}
		if (neiProtect[y][x] == 0 && onOff == true) {
			lootFuncs.metabolicNode(x, y, onOff, nodeId)
			neiProtect[y][x] = 1
			setTimeout(() => {
				neiProtect[y][x] = 0
			}, 200);
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
		engine.removeEventListener("gameTaped", wanFa_loot.gameTaped)
		clearInterval(lootFuncs.CountPlay.innerCount)
		clearInterval(wanFa_loot.gamePlay.inCount)

		roomFunction.stopSound("lootBgm")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("fenwei")
		roomFunction.stopSound("zheng")

		hefeng1 = 1
		roomFunction.goToGameLevel("gameEndjs", "none");


		//roomFunction.goToGameLevel("leave_hold", "none")
		setTimeout(() => {
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
						lootFuncs.oneWin(colorList[0][0], colorList[0][1], colorList[0][2]);
						roomFunction.playSound(false, "red2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("blue") != -1) {
						lootFuncs.oneWin(colorList[1][0], colorList[1][1], colorList[1][2]);
						roomFunction.playSound(false, "blue2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("green") != -1) {
						lootFuncs.oneWin(colorList[2][0], colorList[2][1], colorList[2][2]);
						roomFunction.playSound(false, "green2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}

					if (winPlayersName.indexOf("yellow") != -1) {
						lootFuncs.oneWin(colorList[3][0], colorList[3][1], colorList[3][2]);
						roomFunction.playSound(false, "yellow2")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("cyan") != -1) {
						lootFuncs.oneWin(colorList[4][0], colorList[4][1], colorList[4][2]);
						roomFunction.playSound(false, "cyan")
						setTimeout(() => {
							roomFunction.playSound(false, "win")
						}, 700);
					}
					if (winPlayersName.indexOf("brown") != -1) {
						lootFuncs.oneWin(colorList[5][0], colorList[5][1], colorList[5][2]);
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
							lootFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2]);
							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "blue2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("green") != -1) {
							lootFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[2][0], colorList[2][1], colorList[2][2]);

							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "green2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("yellow") != -1) {
							lootFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[3][0], colorList[3][1], colorList[3][2]);

							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "yellow2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("cyan") != -1) {
							lootFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[4][0], colorList[4][1], colorList[4][2]);

							roomFunction.playSound(false, "red2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							lootFuncs.twoWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[5][0], colorList[5][1], colorList[5][2]);

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
							lootFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2]);

							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "green2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("yellow") != -1) {
							lootFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);

							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "yellow2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("cyan") != -1) {
							lootFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[4][0], colorList[4][1], colorList[4][2]);

							roomFunction.playSound(false, "blue2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							lootFuncs.twoWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[5][0], colorList[5][1], colorList[5][2]);

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
							lootFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2]);

							roomFunction.playSound(false, "green2")
							setTimeout(() => {
								roomFunction.playSound(false, "yellow2")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("cyan") != -1) {
							lootFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[4][0], colorList[4][1], colorList[4][2]);

							roomFunction.playSound(false, "green2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							lootFuncs.twoWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[5][0], colorList[5][1], colorList[5][2]);

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
							lootFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
							roomFunction.playSound(false, "yellow2")
							setTimeout(() => {
								roomFunction.playSound(false, "cyan")
							}, 700);
							setTimeout(() => {
								roomFunction.playSound(false, "allwin")
							}, 1400);
						}
						if (winPlayersName.indexOf("brown") != -1) {
							lootFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
							lootFuncs.twoWin(colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
								lootFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2]);
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
								lootFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);
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
								lootFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
								lootFuncs.thrWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
					if (winPlayersName.indexOf("blue") != -1) {
						if (winPlayersName.indexOf("green") != -1) {
							if (winPlayersName.indexOf("yellow") != -1) {
								lootFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2]);
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
								lootFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
								lootFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
								lootFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
								lootFuncs.thrWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
									lootFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2]);
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
									lootFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
									lootFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
									lootFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
									lootFuncs.fouWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
									lootFuncs.fouWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[2][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
									lootFuncs.fouWin(colorList[2][0], colorList[2][1], colorList[2][2], colorList[2][0], colorList[1][1], colorList[1][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
										lootFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
										lootFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
										lootFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2]);
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
										lootFuncs.fivWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
										lootFuncs.fivWin(colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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
					lootFuncs.sixWin(colorList[0][0], colorList[0][1], colorList[0][2], colorList[1][0], colorList[1][1], colorList[1][2], colorList[2][0], colorList[2][1], colorList[2][2], colorList[3][0], colorList[3][1], colorList[3][2], colorList[4][0], colorList[4][1], colorList[4][2], colorList[5][0], colorList[5][1], colorList[5][2]);
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


			wanFaCtl_lootCtl.gameEndCtl()
			levelInfos.gameIdList = [];
			lootFuncs.rmAllListener()

		}, 7000 + winPlayers * 2500);
	}

}


const lootFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 70;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		neiProtect = [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		]
		neiUser = []
		playersScList = [0, 0, 0, 0, 0, 0]//新六人
		winPlayers = 0
		winPlayersName = []
		dipanNum = 0
		winPlayersList = [0, 0, 0, 0, 0, 0]//新六人
		maxNum = 0;
		usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"];//新六人
		ganmeEndScreenShow = [];
		userColorShowString = [];
		userNameShowString = [];
		userScoreShowString = [];
		pkNameList = []
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_loot.gamePlay)
		engine.removeEventListener("gameTaped", wanFa_loot.gameTaped)
		engine.removeEventListener("gameDestroy", wanFa_loot.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_loot.gameTimeOver)
	},
	geiwoSheng() {//新六人
		if (playerNum == 2) {
			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, i, j)
				}

			}
			for (let i = 8; i < 16; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addBlue("addBlue" + dipanNum, "blue" + dipanNum, i, j)

				}

			}
			playersScList[0] = 256
			playersScList[1] = 256

		}
		if (playerNum == 3) {
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, i, j)
				}

			}
			for (let i = 6; i < 10; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addBlue("addBlue" + dipanNum, "blue" + dipanNum, i, j)

				}

			}
			for (let i = 12; i < 16; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addGreen("addGreen" + dipanNum, "green" + dipanNum, i, j)

				}

			}
			playersScList[0] = 128
			playersScList[1] = 128
			playersScList[2] = 128

		}
		if (playerNum == 4) {
			for (let i = 0; i < 4; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, i, j)
				}

			}
			for (let i = 4; i < 8; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addBlue("addBlue" + dipanNum, "blue" + dipanNum, i, j)

				}

			}
			for (let i = 8; i < 13; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addGreen("addGreen" + dipanNum, "green" + dipanNum, i, j)

				}

			}
			for (let i = 12; i < 16; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addYellow("addYellow" + dipanNum, "yellow" + dipanNum, i, j)
				}

			}
			playersScList[0] = 128
			playersScList[1] = 128
			playersScList[2] = 128
			playersScList[3] = 128
		}
		if (playerNum == 5) {
			for (let i = 1; i < 3; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, i, j)
				}

			}
			for (let i = 4; i < 6; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addBlue("addBlue" + dipanNum, "blue" + dipanNum, i, j)

				}

			}
			for (let i = 7; i < 9; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addGreen("addGreen" + dipanNum, "green" + dipanNum, i, j)

				}

			}
			for (let i = 10; i < 12; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addYellow("addYellow" + dipanNum, "yellow" + dipanNum, i, j)
				}

			}

			for (let i = 13; i < 15; i++) {
				for (let j = 0; j < 32; j++) {
					dipanNum++
					fastop.addCyan("addCyan" + dipanNum, "cyan" + dipanNum, i, j)
				}

			}
			playersScList[0] = 64
			playersScList[1] = 64
			playersScList[2] = 64
			playersScList[3] = 64
			playersScList[4] = 64
		}
		if (playerNum == 6) {

			for (let i = 0; i < 8; i++) {
				for (let j = 0; j < 10; j++) {
					dipanNum++
					fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, i, j)
				}

			}
			for (let i = 8; i < 16; i++) {
				for (let j = 0; j < 10; j++) {
					dipanNum++
					fastop.addBlue("addBlue" + dipanNum, "blue" + dipanNum, i, j)

				}

			}
			for (let i = 0; i < 8; i++) {
				for (let j = 11; j < 21; j++) {
					dipanNum++
					fastop.addGreen("addGreen" + dipanNum, "green" + dipanNum, i, j)

				}

			}
			for (let i = 8; i < 16; i++) {
				for (let j = 11; j < 21; j++) {
					dipanNum++
					fastop.addYellow("addYellow" + dipanNum, "yellow" + dipanNum, i, j)
				}

			}

			for (let i = 0; i < 8; i++) {
				for (let j = 22; j < 32; j++) {
					dipanNum++
					fastop.addCyan("addCyan" + dipanNum, "cyan" + dipanNum, i, j)
				}
			}
			for (let i = 8; i < 16; i++) {
				for (let j = 22; j < 32; j++) {
					dipanNum++
					fastop.addBrown("addBrown" + dipanNum, "brown" + dipanNum, i, j)
				}
			}
			playersScList[0] = 80
			playersScList[1] = 80
			playersScList[2] = 80
			playersScList[3] = 80
			playersScList[4] = 80
			playersScList[5] = 80
		}
	},
	//改变踩踏节点颜色
	metabolicNode(x, y, onOff, nodeId) {//新六人
		dipanNum++
		usersInfos.ValidTarget++
		if (nodeId == "") {
			let suiji = Math.floor(Math.random() * playerNum)
			switch (suiji) {
				case 0:
					fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, x, y)
					playersScList[0]++  //hong+
					break;
				case 1:
					fastop.addBlue("addBlue" + dipanNum, "blue" + dipanNum, x, y)
					playersScList[1]++
					break;
				case 2:
					fastop.addGreen("addGreen" + dipanNum, "green" + dipanNum, x, y)
					playersScList[2]++
					break;
				case 3:
					fastop.addYellow("addYellow" + dipanNum, "yellow" + dipanNum, x, y)
					playersScList[3]++
					break;
				case 4:
					fastop.addCyan("addCyan" + dipanNum, "cyan" + dipanNum, x, y)
					playersScList[4]++
					break;
				case 5:
					fastop.addBrown("addBrown" + dipanNum, "brown" + dipanNum, x, y)
					playersScList[5]++
					break;

			}

		}
		if (nodeId.startsWith("red")) {
			roomFunction.playSoundTivite(false, "red-competMode", "positive")
			fastop.removeNode("remored", nodeId)
			playersScList[0]--
			fastop.addBlue("addBlue" + dipanNum, "blue" + dipanNum, x, y)
			playersScList[1]++//cheng+
		}
		if (nodeId.startsWith("blue")) {
			roomFunction.playSoundTivite(false, "blue-competMode", "positive")
			fastop.removeNode("remoblue", nodeId)
			playersScList[1]--
			if (playerNum == 2) {//两人竞技
				fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, x, y)
				playersScList[0]++
			} else if (playerNum > 2) {//两人以上
				fastop.addGreen("addGreen" + dipanNum, "green" + dipanNum, x, y)
				playersScList[2]++
			}
		}
		if (nodeId.startsWith("green")) {
			roomFunction.playSoundTivite(false, "green-competMode", "positive")
			fastop.removeNode("remogreen", nodeId)
			playersScList[2]--
			if (playerNum == 3) {//三人竞技
				fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, x, y)
				playersScList[0]++
			} else if (playerNum > 3) {//三人以上
				fastop.addYellow("addYellow" + dipanNum, "yellow" + dipanNum, x, y)
				playersScList[3]++
			}
		}
		if (nodeId.startsWith("yellow")) {
			roomFunction.playSoundTivite(false, "yellow-competMode", "positive")
			fastop.removeNode("remoyellow", nodeId)
			playersScList[3]--
			if (playerNum == 4) {//四人竞技
				fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, x, y)
				playersScList[0]++
			} else if (playerNum > 4) {//四人以上
				fastop.addCyan("addCyan" + dipanNum, "cyan" + dipanNum, x, y)
				playersScList[4]++
			}
		}

		if (nodeId.startsWith("cyan")) {
			roomFunction.playSoundTivite(false, "cyan-competMode", "positive")
			fastop.removeNode("remocyan", nodeId)
			playersScList[4]--
			if (playerNum == 5) {//四人竞技
				fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, x, y)
				playersScList[0]++
			} else if (playerNum > 5) {//五人以上
				fastop.addBrown("addBrown" + dipanNum, "brown" + dipanNum, x, y)
				playersScList[5]++
			}
		}

		if (nodeId.startsWith("brown")) {
			roomFunction.playSoundTivite(false, "brown-competMode", "positive")
			fastop.removeNode("remobrown", nodeId)
			playersScList[5]--
			// if (playerNum == 6) {//四人竞技
			fastop.addRed("addRedd" + dipanNum, "red" + dipanNum, x, y)
			playersScList[0]++
			// }
		}
		// roomFunction.playSoundTivite(false, "zheng", "positive")
		// engine.log("玩家红色有" + playersScList[0])
		// engine.log("玩家绿色有" + playersScList[1])
		// engine.log("玩家蓝色有" + playersScList[2])
		// engine.log("玩家黄色有" + playersScList[3])
		// engine.log("玩家粉色有" + playersScList[4])
		// engine.log("玩家棕色有" + playersScList[5])



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

			switch (playerNum) {
				case 2:
					if (playersScList[0] > playersScList[1]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[0].r,
												g: pkarrColor[0].g,
												b: pkarrColor[0].b,
												a: pkarrColor[0].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[0] < playersScList[1]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[1].r,
												g: pkarrColor[1].g,
												b: pkarrColor[1].b,
												a: pkarrColor[1].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[0] == playersScList[1]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
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
								}
							],

						}
						gameFuncs.op(opInfo1);
					}
					break;
				case 3:
					if (playersScList[0] > playersScList[1] && playersScList[0] > playersScList[2]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[0].r,
												g: pkarrColor[0].g,
												b: pkarrColor[0].b,
												a: pkarrColor[0].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[1] > playersScList[0] && playersScList[1] > playersScList[2]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[1].r,
												g: pkarrColor[1].g,
												b: pkarrColor[1].b,
												a: pkarrColor[1].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[2] > playersScList[0] && playersScList[2] > playersScList[1]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[2].r,
												g: pkarrColor[2].g,
												b: pkarrColor[2].b,
												a: pkarrColor[2].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					}
					break;
				case 4:
					if (playersScList[0] > playersScList[1] && playersScList[0] > playersScList[2] && playersScList[0] > playersScList[3]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[0].r,
												g: pkarrColor[0].g,
												b: pkarrColor[0].b,
												a: pkarrColor[0].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[1] > playersScList[0] && playersScList[1] > playersScList[2] && playersScList[1] > playersScList[3]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[1].r,
												g: pkarrColor[1].g,
												b: pkarrColor[1].b,
												a: pkarrColor[1].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[2] > playersScList[0] && playersScList[2] > playersScList[1] && playersScList[2] > playersScList[3]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[2].r,
												g: pkarrColor[2].g,
												b: pkarrColor[2].b,
												a: pkarrColor[2].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[3] > playersScList[0] && playersScList[3] > playersScList[1] && playersScList[3] > playersScList[2]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[3].r,
												g: pkarrColor[3].g,
												b: pkarrColor[3].b,
												a: pkarrColor[3].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					}
					break;
				case 5:
					if (playersScList[0] > playersScList[1] && playersScList[0] > playersScList[2] && playersScList[0] > playersScList[3] && playersScList[0] > playersScList[4]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[0].r,
												g: pkarrColor[0].g,
												b: pkarrColor[0].b,
												a: pkarrColor[0].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[1] > playersScList[0] && playersScList[1] > playersScList[2] && playersScList[1] > playersScList[3] && playersScList[1] > playersScList[4]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[1].r,
												g: pkarrColor[1].g,
												b: pkarrColor[1].b,
												a: pkarrColor[1].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[2] > playersScList[0] && playersScList[2] > playersScList[1] && playersScList[2] > playersScList[3] && playersScList[2] > playersScList[4]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[2].r,
												g: pkarrColor[2].g,
												b: pkarrColor[2].b,
												a: pkarrColor[2].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[3] > playersScList[0] && playersScList[3] > playersScList[1] && playersScList[3] > playersScList[2] && playersScList[3] > playersScList[4]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[3].r,
												g: pkarrColor[3].g,
												b: pkarrColor[3].b,
												a: pkarrColor[3].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[4] > playersScList[0] && playersScList[4] > playersScList[1] && playersScList[4] > playersScList[2] && playersScList[4] > playersScList[3]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[4].r,
												g: pkarrColor[4].g,
												b: pkarrColor[4].b,
												a: pkarrColor[4].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					}
					break;
				case 6:
					if (playersScList[0] > playersScList[1] && playersScList[0] > playersScList[2] && playersScList[0] > playersScList[3] && playersScList[0] > playersScList[4] && playersScList[0] > playersScList[5]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[0].r,
												g: pkarrColor[0].g,
												b: pkarrColor[0].b,
												a: pkarrColor[0].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[1] > playersScList[0] && playersScList[1] > playersScList[2] && playersScList[1] > playersScList[3] && playersScList[1] > playersScList[4] && playersScList[1] > playersScList[5]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[1].r,
												g: pkarrColor[1].g,
												b: pkarrColor[1].b,
												a: pkarrColor[1].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[2] > playersScList[0] && playersScList[2] > playersScList[1] && playersScList[2] > playersScList[3] && playersScList[2] > playersScList[4] && playersScList[2] > playersScList[5]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[2].r,
												g: pkarrColor[2].g,
												b: pkarrColor[2].b,
												a: pkarrColor[2].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[3] > playersScList[0] && playersScList[3] > playersScList[1] && playersScList[3] > playersScList[2] && playersScList[3] > playersScList[4] && playersScList[3] > playersScList[5]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[3].r,
												g: pkarrColor[3].g,
												b: pkarrColor[3].b,
												a: pkarrColor[3].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[4] > playersScList[0] && playersScList[4] > playersScList[1] && playersScList[4] > playersScList[2] && playersScList[4] > playersScList[3] && playersScList[4] > playersScList[5]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[4].r,
												g: pkarrColor[4].g,
												b: pkarrColor[4].b,
												a: pkarrColor[4].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					} else if (playersScList[5] > playersScList[0] && playersScList[5] > playersScList[1] && playersScList[5] > playersScList[2] && playersScList[5] > playersScList[3] && playersScList[5] > playersScList[4]) {
						let opInfo1 = {
							opId: "colorPlay001",
							opType: "play",
							opNode: "color001",
							timeLen: 0.1,
							canTap: false,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										shape: {
											rgba: {
												r: pkarrColor[5].r,
												g: pkarrColor[5].g,
												b: pkarrColor[5].b,
												a: pkarrColor[5].a,
											}
										}

									}
								}
							],

						}
						gameFuncs.op(opInfo1);
					}
					break;

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
						label1: "争抢地盘"
					}
				}
			}
			gameFuncs.op(opInfo)
			engine.log(opInfo.screenDisplay.block1.value1)
			engine.log(opInfo.screenDisplay.block1.label2)
			engine.log(opInfo.screenDisplay.block1.value2)
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
					label1: "争抢地盘"
				}
			}
		}
		gameFuncs.op(opInfo)
	},




}
