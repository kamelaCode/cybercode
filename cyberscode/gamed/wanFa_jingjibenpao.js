const wanFa_jingjibenpao = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_jingjibenpao.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_jingjibenpao.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_jingjibenpao.gameDestroy);
		//重置全局变量
		jingjibenpaoFuncs.resetAll()
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
		jingjibenpaoFuncs.rgbScorePlay()//跳转内屏显示
		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		roomFunction.playSound(false, "ding")
		let countTime = 0
		wanFa_jingjibenpao.gameStart.startLoop = setInterval(() => {
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
					if (levelInfos.wanFa.startsWith("jingjibenpao")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 17:
					clearInterval(wanFa_jingjibenpao.gameStart.startLoop)
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
		// 	if (levelInfos.wanFa.startsWith("jingjibenpao")) {
		// 		roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
		// 	}
		// }, sec * 1000);
	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.addEventListener("gameTaped", wanFa_jingjibenpao.gameTaped)
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("jingjibenpao")) {
			engine.log("这里是竞技奔跑")
			// setTimeout(function () {
			// 	// roomFunction.playSound(true, "jingjibgm")
			// }, 5000);
			roomFunction.playSound(false, "jingjibenpaorules")
			nowInfos.gameCountTime = 101
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			for (var i = 0; i < usersInfos.usersResult.length; i++) {
				jingJiInfos.block2Infos[i] = 0
			}
			//竞技模式中内屏倒计时
			wanFa_jingjibenpao.gamePlay.innerCount = setInterval(() => {
				nowInfos.gameCountTime--
				if (nowInfos.gameCountTime == 11) {
					roomFunction.playSound(false, "daoshu10")
				}
				if (nowInfos.gameCountTime == 0) {

					wanFa_jingjibenpao.gameLevelEnd()
				}
			}, 1000)
			let previousNums = 0
			let randoms = [0];
			while (randoms.length < jingjibenpaoInfos.runningNumber) {
				let random = Math.floor(Math.random() * 3);
				while (random === previousNums) {
					random = Math.floor(Math.random() * 3);
				}
				previousNums = random;
				randoms.push(random);
			}

			engine.log(randoms)
			setTimeout(() => {
				for (let i = 0; i < jingjibenpaoInfos.runningNumber; i++) {
					// engine.log(randoms[i])
					// let xx = randoms[i]
					jingjibenpaoInfos.userTartgetArr["times" + i] = jingjibenpaoFuncs.generateRandomArray([], 10, jingjibenpaoInfos.userTartgetrangeY[levelInfos.level >= 4 ? randoms[i] : i % 2][0], jingjibenpaoInfos.userTartgetrangeY[levelInfos.level >= 4 ? randoms[i] : i % 2][1])
					// engine.log(jingjibenpaoInfos.userTartgetArr["times" + i])
				}
				if (levelInfos.level == 5) {
					jingjibenpaoInfos.userTartgetArr["times0"] = jingjibenpaoFuncs.generateRandomArray([], 40, 3, 31)
				}
			}, 5000);

			setTimeout(() => {
				jingjibenpaoFuncs.addUserTarget()
				jingjibenpaoFuncs.CountPlay()
				roomFunction.playSound(true, "jingjibenpaobgm", "background")
			}, 11000);


		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event)
		jingjibenpaoFuncs.ueserTap(face, x, y, onOff, nodeId, event)
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-xxx-" + gameid)
		clearInterval(jingjibenpaoFuncs.CountPlay.innerCount)
		engine.removeEventListener("gameTaped", wanFa_jingjibenpao.gameTaped)
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
		roomFunction.stopSound("jingjibenpaobgm")
		jingJiInfos.screenCirCtl = 1
		roomFunction.goToGameLevel("jing_ji_game_end", "none")//结束那方胜利动画
		clearInterval(wanFa_jingjibenpao.gamePlay.innerCount)
		jingjibenpaoFuncs.rmAllListener()
		// wanFaCtl_jingjibenpaoCtl.gameEndCtl(nowInfos.allTarget / 100, nowInfos.lifePoint, nowInfos.gameCountTime)
		wanFaCtl_jingjibenpaoCtl.gameEndCtl()
		levelInfos.gameIdList = []
	}

}




const jingjibenpaoFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 90;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		usersInfos.Stars = 0
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		jingJiInfos.screenCirCtl = 0
		jingJiInfos.block2Infos = [];
		pkNameList = [];
		jingjibenpaoInfos.userTimes = [0, 0, 0, 0, 0, 0]
		switch (usersInfos.usersResult.length) {
			case 2:
				jingjibenpaoInfos.userTartgetrange = 5;
				jingjibenpaoInfos.userTartgetrangeX = [2, 9];
				jingjibenpaoInfos.userTartgetrangeY[0] = [29, 31];
				jingjibenpaoInfos.userTartgetrangeY[1] = [0, 2];
				jingjibenpaoInfos.userTartgetrangeY[2] = [14, 16];
				break;
			case 3:
				jingjibenpaoInfos.userTartgetrange = 4;
				jingjibenpaoInfos.userTartgetrangeX = [1, 6, 11];
				jingjibenpaoInfos.userTartgetrangeY[0] = [28, 31];
				jingjibenpaoInfos.userTartgetrangeY[1] = [0, 3];
				jingjibenpaoInfos.userTartgetrangeY[2] = [13, 16];
				break;
			case 4:
				jingjibenpaoInfos.userTartgetrange = 4;
				jingjibenpaoInfos.userTartgetrangeX = [0, 4, 8, 12];
				jingjibenpaoInfos.userTartgetrangeY[0] = [28, 31];
				jingjibenpaoInfos.userTartgetrangeY[1] = [0, 3];
				jingjibenpaoInfos.userTartgetrangeY[2] = [13, 16];

				break;
			case 5:
				jingjibenpaoInfos.userTartgetrange = 3;
				jingjibenpaoInfos.userTartgetrangeX = [1, 4, 7, 10, 13];
				jingjibenpaoInfos.userTartgetrangeY[0] = [27, 31];
				jingjibenpaoInfos.userTartgetrangeY[1] = [0, 4];
				jingjibenpaoInfos.userTartgetrangeY[2] = [13, 17];
				break;
			case 6:
				jingjibenpaoInfos.userTartgetrange = 2;
				jingjibenpaoInfos.userTartgetrangeX = [1, 4, 6, 8, 10, 13];
				jingjibenpaoInfos.userTartgetrangeY[0] = [26, 31];
				jingjibenpaoInfos.userTartgetrangeY[1] = [0, 5];
				jingjibenpaoInfos.userTartgetrangeY[2] = [12, 17];
				break;

		}
		switch (levelInfos.level) {
			case 1:
				jingjibenpaoInfos.runningNumber = 5
				break;
			case 2:
				jingjibenpaoInfos.runningNumber = 7
				break;
			case 3:
				jingjibenpaoInfos.runningNumber = 10
				break;
			case 4:
				jingjibenpaoInfos.runningNumber = 7
				break;
			case 5:
				jingjibenpaoInfos.runningNumber = 7
				break;
		}
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gameTaped", wanFa_jingjibenpao.gameTaped)
		engine.removeEventListener("gamePlay", wanFa_jingjibenpao.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_jingjibenpao.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_jingjibenpao.gameTimeOver)
	},

	addUserTarget() {
		jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[0]], { r: 254, g: 0, b: 0, a: 1, }, "red", jingjibenpaoInfos.userTartgetrangeX[0])
		jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[1]], { r: 0, g: 0, b: 254, a: 1, }, "blue", jingjibenpaoInfos.userTartgetrangeX[1])
		if (usersInfos.usersResult.length == 2) {
			return
		}
		jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[2]], { r: 0, g: 254, b: 0, a: 1, }, "green", jingjibenpaoInfos.userTartgetrangeX[2])
		if (usersInfos.usersResult.length == 3) {
			return
		}
		jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[3]], { r: 254, g: 254, b: 0, a: 1, }, "yellow", jingjibenpaoInfos.userTartgetrangeX[3])
		if (usersInfos.usersResult.length == 4) {
			return
		}
		jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[4]], { r: 0, g: 254, b: 254, a: 1, }, "cyan", jingjibenpaoInfos.userTartgetrangeX[4])
		if (usersInfos.usersResult.length == 5) {
			return
		}
		jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[5]], { r: 139, g: 69, b: 19, a: 1, }, "brown", jingjibenpaoInfos.userTartgetrangeX[5])
	},

	ueserTap(face, x, y, onOff, nodeId, event) {
		if (nodeId.startsWith("addjingJiBlockred") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")
			jingJiInfos.block2Infos[0] += 1
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
			if (jingJiInfos.block2Infos[0] % (levelInfos.level == 5 ? jingjibenpaoInfos.userTimes[0] == 0 ? 40 : 10 : 10) == 0 && jingJiInfos.block2Infos[0] != ((10 * jingjibenpaoInfos.runningNumber) + (levelInfos.level == 5 ? 40 : 0))) {
				jingjibenpaoInfos.userTimes[0]++
				jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[0]], { r: 254, g: 0, b: 0, a: 1, }, "red", jingjibenpaoInfos.userTartgetrangeX[0])
			}
		}
		if (nodeId.startsWith("addjingJiBlockblue") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")
			jingJiInfos.block2Infos[1] += 1
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
			if (jingJiInfos.block2Infos[1] % (levelInfos.level == 5 ? jingjibenpaoInfos.userTimes[1] == 0 ? 40 : 10 : 10) == 0 && jingJiInfos.block2Infos[1] != ((10 * jingjibenpaoInfos.runningNumber) + (levelInfos.level == 5 ? 30 : 0))) {
				jingjibenpaoInfos.userTimes[1]++
				jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[1]], { r: 0, g: 0, b: 254, a: 1, }, "blue", jingjibenpaoInfos.userTartgetrangeX[1])
			}
		}
		if (nodeId.startsWith("addjingJiBlockgreen") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")
			jingJiInfos.block2Infos[2] += 1
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
			if (jingJiInfos.block2Infos[2] % (levelInfos.level == 5 ? jingjibenpaoInfos.userTimes[2] == 0 ? 40 : 10 : 10) == 0 && jingJiInfos.block2Infos[2] != ((10 * jingjibenpaoInfos.runningNumber) + (levelInfos.level == 5 ? 30 : 0))) {
				jingjibenpaoInfos.userTimes[2]++
				jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[2]], { r: 0, g: 254, b: 0, a: 1, }, "green", jingjibenpaoInfos.userTartgetrangeX[2])
			}
		}
		if (nodeId.startsWith("addjingJiBlockyellow") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")
			jingJiInfos.block2Infos[3] += 1
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
			if (jingJiInfos.block2Infos[3] % (levelInfos.level == 5 ? jingjibenpaoInfos.userTimes[3] == 0 ? 40 : 10 : 10) == 0 && jingJiInfos.block2Infos[3] != ((10 * jingjibenpaoInfos.runningNumber) + (levelInfos.level == 5 ? 30 : 0))) {
				jingjibenpaoInfos.userTimes[3]++
				jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[3]], { r: 254, g: 254, b: 0, a: 1, }, "yellow", jingjibenpaoInfos.userTartgetrangeX[3])
			}
		}
		if (nodeId.startsWith("addjingJiBlockcyan") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")
			jingJiInfos.block2Infos[4] += 1
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
			if (jingJiInfos.block2Infos[4] % (levelInfos.level == 5 ? jingjibenpaoInfos.userTimes[4] == 0 ? 40 : 10 : 10) == 0 && jingJiInfos.block2Infos[4] != ((10 * jingjibenpaoInfos.runningNumber) + (levelInfos.level == 5 ? 30 : 0))) {
				jingjibenpaoInfos.userTimes[4]++
				jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[4]], { r: 0, g: 254, b: 254, a: 1, }, "cyan", jingjibenpaoInfos.userTartgetrangeX[4])
			}
		}
		if (nodeId.startsWith("addjingJiBlockbrown") && onOff == true) {
			roomFunction.playSoundTivite(false, "right", "positive")
			jingJiInfos.block2Infos[5] += 1
			fastop.setNodeVisible(nodeId, nodeId, 0.1, false, false, false, false)
			if (jingJiInfos.block2Infos[5] % (levelInfos.level == 5 ? jingjibenpaoInfos.userTimes[5] == 0 ? 40 : 10 : 10) == 0 && jingJiInfos.block2Infos[5] != ((10 * jingjibenpaoInfos.runningNumber) + (levelInfos.level == 5 ? 30 : 0))) {
				jingjibenpaoInfos.userTimes[5]++
				jingjibenpaoFuncs.randomBlock(jingjibenpaoInfos.userTartgetArr["times" + jingjibenpaoInfos.userTimes[5]], { r: 139, g: 69, b: 19, a: 1, }, "brown", jingjibenpaoInfos.userTartgetrangeX[5])
			}
		}
		jingJiInfos.block2Infos.map((item) => {
			if (item == ((10 * jingjibenpaoInfos.runningNumber) + (levelInfos.level == 5 ? 30 : 0))) wanFa_jingjibenpao.gameLevelEnd()
		})
	},



	randomBlock(arr, rgba, title, distance) {
		for (let i = 0; i < arr?.length; i++) {
			let opInfo = {
				opId: "addjingJiBlock" + title + i,
				opType: "addNode",
				opNode: "",
				nodes: [{
					nodeId: "addjingJiBlock" + title + i,
					surface: "b",
					pt: {
						x: arr[i][0] + distance,
						y: arr[i][1],
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
						rgba: rgba
					}
				}]
			}
			gameFuncs.op(opInfo)
		}


	},

	// 生成一个长度为length的与已知的二维数组不重复的二维数组
	generateRandomArray(knownArr, length, minY, maxY) {
		const result = [];
		const set = new Set();
		while (result.length < length) {
			let x = Math.floor(Math.random() * jingjibenpaoInfos.userTartgetrange); // 生成随机的x坐标
			let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY; // 生成随机的y坐标
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
						label1: "总共轮数",
						value1: jingjibenpaoInfos.runningNumber
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
					label1: "总共轮数",
					value1: jingjibenpaoInfos.runningNumber
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
