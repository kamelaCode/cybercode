const wanFa_jingji = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_jingji.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_jingji.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_jingji.gameDestroy);
		//重置全局变量
		jingjiFuncs.resetAll()
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}
		engine.log(levelInfos.gameIdList)


		jingJiInfos.neiUser = []
		for (var i = 0; i < usersInfos.usersResult.length; i++) {
			jingJiInfos.neiUser[i] = usersInfos.allUsers[i].Nick
		}
		jingJiInfos.levelScoreAll = jingJiInfos.neiUser.toString()
		let wodiu = 0
		let qbq = 0
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			for (let j = 0; j < 10; j++) {
				if (wodiu == i) {
					if (jingJiInfos.neiUser[i].charCodeAt(j) > 255) {
						qbq++
						duoshao += 1.666666666
					} else {
						qbq++
						duoshao += 1
					}
					if (duoshao >= 7) {
						engine.log("第" + i + "个人显示前" + qbq + "个字")
						pkNameList[i] = jingJiInfos.neiUser[i].substring(0, qbq) + "..."
						duoshao = 0
						wodiu++
						qbq = 0
					}
				}
			}
			if (jingJiInfos.neiUser[i].length < 6) {
				pkNameList[i] = jingJiInfos.neiUser[i]
			}
		}
		jingjiFuncs.rgbScorePlay()//跳转内屏显示
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		// screenInner.innerStartCount("游戏即将开始", 8)
		roomFunction.playSound(false, "ding")
		let countTime = 0
		wanFa_jingji.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					break;
				case 5:
					roomFunction.playSound(false, "youxijijiangkaishi");
					break;
				case 16:
					if (levelInfos.wanFa.startsWith("jingji")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 17:
					clearInterval(wanFa_jingji.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);

		// // setTimeout(() => {
		// surfaceCtr.ctlDoor(1, 7000);
		// // }, 500);

		// setTimeout(() => {
		// 	surfaceCtr.ctlDoor(0, 5000);
		// }, 1000);
		// setTimeout(() => {
		// 	roomFunction.playSound(false, "youxijijiangkaishi");
		// }, 3000);



		// setTimeout(function () {
		// 	if (levelInfos.wanFa.startsWith("jingji")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 	}
		// }, sec * 1000);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_jingji.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("jingji")) {
			setTimeout(function () {
				roomFunction.playSound(true, "jingjibgm", "background")
			}, 5000);
			roomFunction.playSound(false, "jingjirule")
			nowInfos.gameCountTime = 60
			nowInfos.target = 20;
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			jingjiFuncs.CountPlay()
			for (var i = 0; i < usersInfos.usersResult.length; i++) {
				jingJiInfos.block2Infos[i] = 0
			}
			//竞技模式中内屏倒计时

			wanFa_jingji.gamePlay.innerCount = setInterval(() => {
				nowInfos.gameCountTime--
				if (nowInfos.gameCountTime == 11) {
					roomFunction.playSound(false, "daoshu10")
				}
				if (nowInfos.gameCountTime == 0) {

					wanFa_jingji.gameLevelEnd()
				}
				if (nowInfos.gameCountTime % 4 == 0 && nowInfos.gameCountTime > 40) {
					// engine.log("4444444")
					jingJiInfos.remainTimes--
					for (let i = 0; i < 6; i++) {
						let outerShape = ["red", "blue", "green", "yellow", "cyan", "brown"]
						let opInfo = {
							opId: outerShape[i] + "Play",
							opType: "play",
							opNode: outerShape[i],
							timeLen: 1,
							loop: false,
							keyFrames: [
								{
									t: 0,

									keyFrame: {
										surface: "b",
										pt: {
											x: -10,
											y: -10
										},

									},
									visible: true,
									canTap: true
								}
							]
						}
						gameFuncs.op(opInfo);
					}

					jingJiInfos.userTargetRecord = []
					jingJiInfos.userBlockArr = []
					jingjiFuncs.addUserTarget()
				} else if (nowInfos.gameCountTime % 3 == 0 && nowInfos.gameCountTime > 25 && nowInfos.gameCountTime <= 40) {
					// engine.log("333333333")
					jingJiInfos.remainTimes--

					for (let i = 0; i < 6; i++) {
						let outerShape = ["red", "blue", "green", "yellow", "cyan", "brown"]
						let opInfo = {
							opId: outerShape[i] + "Play",
							opType: "play",
							opNode: outerShape[i],
							timeLen: 1,
							loop: false,
							keyFrames: [
								{
									t: 0,

									keyFrame: {
										surface: "b",
										pt: {
											x: -10,
											y: -10
										},

									},
									visible: true,
									canTap: true
								}
							]
						}
						gameFuncs.op(opInfo);
					}

					jingJiInfos.userTargetRecord = []
					jingJiInfos.userBlockArr = []
					jingjiFuncs.addUserTarget()
				}
				else
					if (nowInfos.gameCountTime % 2 == 0 && nowInfos.gameCountTime > 0 && nowInfos.gameCountTime <= 25) {
						// engine.log("2222222")
						jingJiInfos.remainTimes--

						for (let i = 0; i < 6; i++) {
							let outerShape = ["red", "blue", "green", "yellow", "cyan", "brown"]
							let opInfo = {
								opId: outerShape[i] + "Play",
								opType: "play",
								opNode: outerShape[i],
								timeLen: 1,
								loop: false,
								keyFrames: [
									{
										t: 0,

										keyFrame: {
											surface: "b",
											pt: {
												x: -10,
												y: -10
											},

										},
										visible: true,
										canTap: true
									}
								]
							}
							gameFuncs.op(opInfo);
						}

						jingJiInfos.userTargetRecord = []
						jingJiInfos.userBlockArr = []
						jingjiFuncs.addUserTarget()
					}
				if (nowInfos.gameCountTime == 40) {
					roomFunction.playSound(false, "jingjinandushengji")
				}
				if (nowInfos.gameCountTime == 25) {
					roomFunction.playSound(false, "jingjinandushengji")
				}
				// if (nowInfos.gameCountTime == 35) {
				// 	const randomGai = Math.random()
				// 	if (randomGai <= 0.25) {
				// 		clearInterval(wanFa_jingji.gamePlay.innerCount)
				// 		jingJiInfos.screenCirCtl = 1
				// 		engine.removeEventListener("gameTaped", wanFa_jingji.gameTaped)
				// 		engine.removeEventListener("gamePlay", wanFa_jingji.gamePlay)
				// 		engine.removeEventListener("gameDestroy", wanFa_jingji.gameDestroy)
				// 		engine.removeEventListener("gameTimeOver", wanFa_jingji.gameTimeOver)
				// 		jingjiFuncs.rmAllListener()
				// 		let str = gameFuncs.playingAudioIds()
				// 		let arr = JSON.parse(str)
				// 		let soundName = arr?.map(item => item.slice(item.indexOf('d') + 1))
				// 		engine.log(arr)

				// 		engine.log(soundName)
				// 		soundName?.map(item => {
				// 			roomFunction.stopSound(item)
				// 		})
				// 		roomFunction.playSound(false, "hallweenRules")
				// 		roomFunction.goToGameLevel("hallween001-cxx", "none")
				// 		setTimeout(() => {
				// 			roomFunction.playSound(false, "hallween05")
				// 		}, 3000);
				// 		wanFa_hallween.gameStart(2, 2)
				// 		return
				// 	}

				// }
			}, 1000)
			// jingjiFuncs.addUserTarget()




		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		// engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
		// 	event)
		if (onOff == true) {
			usersInfos.ValidTrigger++
		}
		jingjiFuncs.ueserTap(face, x, y, onOff, nodeId, event)
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-xxx-" + gameid)
		clearInterval(jingjiFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_jingji.gameTaped)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-xxx-" + gameid)

	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		roomFunction.stopSound("daoshu10")
		roomFunction.stopSound("dong10")
		roomFunction.stopSound("jingjibgm")
		jingJiInfos.screenCirCtl = 1
		roomFunction.goToGameLevel("jing_ji_game_end", "none")//结束那方胜利动画
		clearInterval(wanFa_jingji.gamePlay.innerCount)
		jingjiFuncs.rmAllListener()
		// wanFaCtl_jingjiCtl.gameEndCtl(nowInfos.allTarget / 100, nowInfos.lifePoint, nowInfos.gameCountTime)
		wanFaCtl_jingjiCtl.gameEndCtl()
		levelInfos.gameIdList = []
	}

}




const jingjiFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 60;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		usersInfos.Stars = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		jingJiInfos.screenCirCtl = 0
		jingJiInfos.block2Infos = [];
		jingJiInfos.remainTimes = 21
		pkNameList = []
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_jingji.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_jingji.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_jingji.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_jingji.gameTimeOver)
	},

	addUserTarget() {
		if (usersInfos.usersResult.length == 2) {
			jingjiFuncs.randomBlock(1, { r: 254, g: 0, b: 0, a: 1, }, "red")
			jingjiFuncs.randomBlock(1, { r: 0, g: 0, b: 254, a: 1, }, "blue")
		}
		if (usersInfos.usersResult.length == 3) {
			jingjiFuncs.randomBlock(1, { r: 254, g: 0, b: 0, a: 1, }, "red")
			jingjiFuncs.randomBlock(1, { r: 0, g: 0, b: 254, a: 1, }, "blue")
			jingjiFuncs.randomBlock(1, { r: 0, g: 254, b: 0, a: 1, }, "green")

		}
		if (usersInfos.usersResult.length == 4) {
			jingjiFuncs.randomBlock(1, { r: 254, g: 0, b: 0, a: 1, }, "red")
			jingjiFuncs.randomBlock(1, { r: 0, g: 0, b: 254, a: 1, }, "blue")
			jingjiFuncs.randomBlock(1, { r: 0, g: 254, b: 0, a: 1, }, "green")
			jingjiFuncs.randomBlock(1, { r: 254, g: 254, b: 0, a: 1, }, "yellow")
		}
		if (usersInfos.usersResult.length == 5) {
			jingjiFuncs.randomBlock(1, { r: 254, g: 0, b: 0, a: 1, }, "red")
			jingjiFuncs.randomBlock(1, { r: 0, g: 0, b: 254, a: 1, }, "blue")
			jingjiFuncs.randomBlock(1, { r: 0, g: 254, b: 0, a: 1, }, "green")
			jingjiFuncs.randomBlock(1, { r: 254, g: 254, b: 0, a: 1, }, "yellow")
			jingjiFuncs.randomBlock(1, { r: 0, g: 254, b: 254, a: 1, }, "cyan")
		}
		if (usersInfos.usersResult.length == 6) {
			jingjiFuncs.randomBlock(1, { r: 254, g: 0, b: 0, a: 1, }, "red")
			jingjiFuncs.randomBlock(1, { r: 0, g: 0, b: 254, a: 1, }, "blue")
			jingjiFuncs.randomBlock(1, { r: 0, g: 254, b: 0, a: 1, }, "green")
			jingjiFuncs.randomBlock(1, { r: 254, g: 254, b: 0, a: 1, }, "yellow")
			jingjiFuncs.randomBlock(1, { r: 0, g: 254, b: 254, a: 1, }, "cyan")
			jingjiFuncs.randomBlock(1, { r: 139, g: 69, b: 19, a: 1, }, "brown")
		}

	},

	ueserTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "addjingJiBlockred" && onOff == true) {
			usersInfos.ValidTarget++
			roomFunction.playSoundTivite(false, "jingjitap", "positive")
			jingJiInfos.block2Infos[0] += 5
			let opInfo = {
				opId: "redPlay",
				opType: "play",
				opNode: "red",
				timeLen: 1,
				loop: false,
				keyFrames: [
					{
						t: 0,

						keyFrame: {
							surface: "b",
							pt: {
								x: jingJiInfos.userTargetRecord[0][0] - 1,
								y: jingJiInfos.userTargetRecord[0][1] - 1
							},

						},
						visible: true,
						canTap: true
					}
				]
			}
			gameFuncs.op(opInfo);
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
		}
		if (nodeId == "addjingJiBlockblue" && onOff == true) {
			roomFunction.playSoundTivite(false, "jingjitap", "positive")

			jingJiInfos.block2Infos[1] += 5

			let opInfo = {
				opId: "bluePlay",
				opType: "play",
				opNode: "blue",
				timeLen: 1,
				loop: false,
				keyFrames: [
					{
						t: 0,

						keyFrame: {
							surface: "b",
							pt: {
								x: jingJiInfos.userTargetRecord[1][0] - 1,
								y: jingJiInfos.userTargetRecord[1][1] - 1
							},

						},
						visible: true,
						canTap: true
					}
				]
			}
			gameFuncs.op(opInfo);
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
		}
		if (nodeId == "addjingJiBlockgreen" && onOff == true) {
			roomFunction.playSoundTivite(false, "jingjitap", "positive")

			jingJiInfos.block2Infos[2] += 5

			let opInfo = {
				opId: "greenPlay",
				opType: "play",
				opNode: "green",
				timeLen: 1,
				loop: false,
				keyFrames: [
					{
						t: 0,

						keyFrame: {
							surface: "b",
							pt: {
								x: jingJiInfos.userTargetRecord[2][0] - 1,
								y: jingJiInfos.userTargetRecord[2][1] - 1
							},

						},
						visible: true,
						canTap: true
					}
				]
			}
			gameFuncs.op(opInfo);
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
		}
		if (nodeId == "addjingJiBlockyellow" && onOff == true) {
			roomFunction.playSoundTivite(false, "jingjitap", "positive")

			jingJiInfos.block2Infos[3] += 5

			let opInfo = {
				opId: "yellowPlay",
				opType: "play",
				opNode: "yellow",
				timeLen: 1,
				loop: false,
				keyFrames: [
					{
						t: 0,

						keyFrame: {
							surface: "b",
							pt: {
								x: jingJiInfos.userTargetRecord[3][0] - 1,
								y: jingJiInfos.userTargetRecord[3][1] - 1
							},

						},
						visible: true,
						canTap: true
					}
				]
			}
			gameFuncs.op(opInfo);
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
		}
		if (nodeId == "addjingJiBlockcyan" && onOff == true) {
			roomFunction.playSoundTivite(false, "jingjitap", "positive")

			jingJiInfos.block2Infos[4] += 5

			let opInfo = {
				opId: "cyanPlay",
				opType: "play",
				opNode: "cyan",
				timeLen: 1,
				loop: false,
				keyFrames: [
					{
						t: 0,

						keyFrame: {
							surface: "b",
							pt: {
								x: jingJiInfos.userTargetRecord[4][0] - 1,
								y: jingJiInfos.userTargetRecord[4][1] - 1
							},

						},
						visible: true,
						canTap: true
					}
				]
			}
			gameFuncs.op(opInfo);
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
		}
		if (nodeId == "addjingJiBlockbrown" && onOff == true) {
			roomFunction.playSoundTivite(false, "jingjitap", "positive")

			jingJiInfos.block2Infos[5] += 5

			let opInfo = {
				opId: "brownPlay",
				opType: "play",
				opNode: "brown",
				timeLen: 1,
				loop: false,
				keyFrames: [
					{
						t: 0,

						keyFrame: {
							surface: "b",
							pt: {
								x: jingJiInfos.userTargetRecord[5][0] - 1,
								y: jingJiInfos.userTargetRecord[5][1] - 1
							},

						},
						visible: true,
						canTap: true
					}
				]
			}
			gameFuncs.op(opInfo);
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
		}
	},



	randomBlock(num, rgba, title) {
		let arr = jingjiFuncs.generateRandomArray(jingJiInfos.userBlockArr, 1)
		// engine.log("arr" + arr[0][0])
		jingJiInfos.userTargetRecord.push([arr[0][0], arr[0][1]])
		// [[0, 1], [1, 1]]
		for (let i = arr[0][0] - 3; i < arr[0][0] + 4; i++) {
			for (let j = arr[0][1] - 3; j < arr[0][1] + 4; j++) {
				jingJiInfos.userBlockArr.push([i, j])
			}
		}
		// engine.log("arr" + arr)
		// engine.log("jingJiInfos.userBlockArr" + jingJiInfos.userBlockArr)
		let opInfo = {
			opId: "addjingJiBlock" + title,
			opType: "addNode",
			opNode: "",
			nodes: [{
				nodeId: "addjingJiBlock" + title,
				surface: "b",
				pt: {
					x: arr[0][0],
					y: arr[0][1],
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
							x: 1,
							y: 1,
						}
					},
					rgba: rgba
				}
			}]
		}
		gameFuncs.op(opInfo)

	},

	// 生成一个长度为length的与已知的二维数组不重复的二维数组
	generateRandomArray(knownArr, length) {
		const result = [];
		const set = new Set();
		while (result.length < length) {
			let x = Math.floor(Math.random() * 12) + 1; // 生成随机的x坐标
			let y = Math.floor(Math.random() * 28) + 2; // 生成随机的y坐标
			const isD = knownArr.some((item) => item[0] === x && item[1] === y); // 判断是否与已知数组重复
			const str = [x, y].join(); // 将生成的二维坐标转为字符串
			if (!isD && !set.has(str)) {
				set.add(str); // 将该字符串添加到set中
				result.push([x, y]); // 添加到数组中
			}
		}
		return result;
	},






	CountPlay() {
		let screenCir = setInterval(() => {
			if (jingJiInfos.screenCirCtl == 1) {
				clearInterval(screenCir)
				return
			}
			let usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"]
			let ganmeEndScreenShow = []
			for (let i = 0; i < usersInfos.allUsers.length; i++) {
				ganmeEndScreenShow.push({
					userColor: usercolors[i],
					userName: pkNameList[i],
					userScore: jingJiInfos.block2Infos[i]
				})
			}
			//将数组排序
			ganmeEndScreenShow.sort((a, b) => b.userScore - a.userScore)
			//engine.log("xxxxxxxx-hefenghefeng-xxxxxxxx" + JSON.stringify(ganmeEndScreenShow))
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
						value1: nowInfos.gameCountTime
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "剩余游戏次数",
						value1: jingJiInfos.remainTimes
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
					value1: nowInfos.gameCountTime
				},
				block3: {
					model: "dis_b_scoreGame",
					label1: "剩余游戏次数",
					value1: jingJiInfos.remainTimes
				},
			}
		}
		gameFuncs.op(opInfo)
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




}
