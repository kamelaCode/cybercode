const wanFa_jiezouTeam = {
	tmid: null,
	//游戏启动控制部分

	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_jiezouTeam.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_jiezouTeam.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_jiezouTeam.gameDestroy);
		// engine.addEventListener("soundPlayStatus", wanFa_jiezouTeam.soundPlayStatus);
		//重置全局变量
		jiezouTeamFuncs.resetAll()
		clearInterval(jiezouTeamFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}
		engine.log(levelInfos.gameIdList)
		//开门入场流程
		const sec = 8;
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		let gameTime = setInterval(() => {
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
				case 18:
					if (levelInfos.wanFa.startsWith("jiezou")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 19:
					clearInterval(gameTime)
					break;
			}
			countTime++
		}, 500);





	},




	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("jiezou")) {
			engine.log("这里是节奏团队")
			nowInfos.gameCountTime = jiezouInfos.soundTime + 7
			//生成踩踏区域
			let opInfoShow = {
				opId: "addShow", //操作id 再控制用
				opType: "addNode", // 操作类型，添加一个节点或精灵
				opNode: "area", // 父节点，如果没有配置，默认到棋盘根节点0,0
				nodes: [
					{
						nodeId: "show", // 节点id，定位用
						surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
						// node参数
						pt: {
							x: jiezouInfos.userArr[usersInfos.usersResult.length],
							y: 6
						},
						rotation: 0, // 角度
						canTap: false,
						visible: true, //显示，如果为false，逻辑数据会跳过
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0,
								},
								rb: {
									x: (usersInfos.usersResult.length * 4) + 1,
									y: 0
								}
							},
							rgba: { r: 254, g: 20, b: 147, a: 1 }
						},
						nodes: [
							{
								nodeId: "showbottom", // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: {
									x: 0,
									y: -5
								},
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: false,
								visible: true, //显示，如果为false，逻辑数据会跳过
								shape: {
									type: "rect",
									rect: {
										lt: {
											x: 0,
											y: 0,
										},
										rb: {
											x: (usersInfos.usersResult.length * 4),
											y: 0
										}
									},
									rgba: { r: 254, g: 20, b: 147, a: 1 }
								}
							},
							{
								nodeId: "showleft", // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: {
									x: 0,
									y: -4
								},
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: false,
								visible: true, //显示，如果为false，逻辑数据会跳过
								shape: {
									type: "rect",
									rect: {
										lt: {
											x: 0,
											y: 0,
										},
										rb: {
											x: 0,
											y: 4
										}
									},
									rgba: { r: 254, g: 20, b: 147, a: 1 }
								}
							},
							{
								nodeId: "showright", // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: {
									x: (usersInfos.usersResult.length * 4) + 1,
									y: -5
								},
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: false,
								visible: true, //显示，如果为false，逻辑数据会跳过
								shape: {
									type: "rect",
									rect: {
										lt: {
											x: 0,
											y: 0,
										},
										rb: {
											x: 0,
											y: 4
										}
									},
									rgba: { r: 254, g: 20, b: 147, a: 1 }
								}
							}
						]
					}
				]
			}
			gameFuncs.op(opInfoShow);
			//生成20个踩踏反馈长条
			for (let i = 0; i < 20; i++) {
				let opInfoTiao = {
					opId: "addTiao" + i, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					opNode: "area", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "tiao" + i, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: {
								x: -1,
								y: 0
							},
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: false,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 0,
										y: 0,
									},
									rb: {
										x: 0,
										y: 28
									}
								},
								rgba: { r: 30, g: 144, b: 254, a: 0.3 }
							},
						}
					]
				}
				gameFuncs.op(opInfoTiao);
			}
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			engine.addEventListener("gameTaped", wanFa_jiezouTeam.gameTaped)
			// 生成一个包含从0到4数字的原始数组
			const originalArray = Array.from({ length: jiezouInfos.musicArr.length }, (_, i) => i % ((usersInfos.usersResult.length >= 4 ? 4 : usersInfos.usersResult.length) * 4));
			// 打乱原始数组的顺序
			jiezouInfos.randmArr = originalArray.sort(() => Math.random() - 0.5);
			jiezouTeamFuncs.addUserBlock(jiezouInfos.musicArr)
			jiezouTeamFuncs.CountPlay()

		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (nowInfos.nowGameid.startsWith("jiezou")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
			jiezouTeamFuncs.blueTap(face, x, y, onOff, nodeId, event)

		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(jiezouTeamFuncs.CountPlay.innerCount)
	},


	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)
		if (gameid != "__system_wait") {
		}
	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(jiezouTeamFuncs.CountPlay.innerCount)
		clearInterval(wanFa_jiezouTeam.gamePlay.innerCount)
		roomFunction.stopSound("fenwei")
		roomFunction.goToGameLevel("leave_hold", "none")
		jiezouTeamFuncs.rmAllListener()
		wanFaCtl_jiezouTeamCtl.gameEndCtl()
		levelInfos.gameIdList = [];
	}

}



const jiezouTeamFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 999;
		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		nowInfos.scoreCoefficient = 1;
		jiezouInfos.randmArr = [];
		jiezouInfos.musicArr = [];
		jiezouInfos.tiaoNum = 0;
		jiezouInfos.userArr = [0, 0, 3, 1, -1, -1, -1];
		switch (levelInfos.level) {
			case 1:
				jiezouInfos.musicArr = [1.6, 2.2, 4.4, 6, 7.6, 9.7, 11.3, 12, 12.6, 14.9, 15.7, 17.3, 18.9, 19.6, 20.4, 22.6, 24.2, 24.9, 29.4, 30, 30.9, 31.5, 33.9, 35, 37.2, 38.1, 39.9, 42.5, 43.1, 43.8, 44.4, 46.9, 47.9, 50.2, 51, 54.6, 55.4, 56.2, 56.9, 57.8, 59.5, 61.9, 62.6, 63.5, 64.2, 65.9, 68.4, 69.1, 69.8, 70.4, 72.4, 73.2, 73.8, 75.7, 76.3, 77.2, 78.9, 81.3, 82.1, 82.8, 83.7, 85.4, 86, 86.7, 88.6, 89.2, 89.8]
				// [1.4, 2.6, 4.3, 5.9, 7.5, 9.5, 11.2, 12.4, 14.8, 17.2, 18.8, 20.4, 22.5, 24.1, 25.3, 29.4, 30.8, 33.8, 35, 37, 39.9, 42.3, 43.7, 44.8, 46.8, 47.9, 50, 51.1, 54.5, 56, 57.7, 59.4, 61.8, 63.4, 65.8, 68.3, 69.6, 70.7, 72.3, 73.7, 75.6, 77.1, 78.8, 81.3, 82.7, 85.4, 86.7, 88.5, 89.7]
				jiezouInfos.soundTime = 91
				jiezouInfos.musicName = "guanghuisuiyue"
				break
			case 2:
				jiezouInfos.musicArr = [0.6, 1.9, 3.1, 4.3, 5.5, 6.7, 7.9, 10.5, 12.7, 13.8, 15, 16.3, 17.5, 18.7, 19.9, 21.1, 22.3, 23.6, 24.7, 25.9, 27.1, 28.3, 29.5, 30.7, 31.9, 33.1, 34.3, 35.5, 36.7, 37.9, 39.1, 40.3, 41.5, 42.7, 43.8, 45.1, 46.3, 48.5, 49.9, 51.1, 52.3, 53.5, 54.7, 55.8, 57.1, 58.3, 59.5, 60.7, 61.9, 63.1, 64.3, 65.5, 67.9, 69.1, 70.3, 71.5, 72.7, 73.9, 75, 76.3, 77.5, 78.7, 79.9, 81.1, 82.4, 83.5, 84.7, 85.9, 87.1, 88.3, 89.5, 90.7, 92, 93.1, 94.3, 95.5, 96.6, 97.9, 99.1, 100.3, 101.4, 102.7, 103.9, 105.1, 106.4, 107.5, 108.7, 109.9, 111.1, 112.2, 113.5, 115.9, 117.1, 118.2, 119.5, 120.7, 121.9, 123.1, 124.3, 125.5, 126.6, 127.9, 129.1, 130.3, 131.5, 132.7, 133.9, 135]
				// [0.7, 0.8, 1.6, 2.1, 2.2, 2.7, 3.2, 3.9, 4, 4.5, 4.7, 5.1, 5.2, 5.8, 5.9, 6.4, 6.9, 7.5, 7.7, 9.9, 10.1, 11.1, 11.7, 11.8, 12.3, 12.9, 13.5, 14.1, 14.7, 14.8, 15.3, 15.9, 16.4, 16.5, 16.6, 17.1, 17.7, 17.8, 18.3, 18.5, 18.9, 19, 19.5, 19.6, 20.1, 20.7, 20.8, 21, 21.1, 21.4, 21.5, 21.9, 22, 22.5, 22.6, 23.1, 23.4, 23.5, 23.6, 23.8, 24.4, 24.5, 24.9, 25, 25.5, 25.6, 26.1, 26.7, 26.8, 27.3, 27.9, 28, 28.3, 28.6, 29.1, 29.7, 29.8, 30.3, 30.5, 30.7, 30.8, 31, 31.1, 31.5, 31.6, 32.1, 32.2, 32.7, 33, 33.1, 33.4, 33.5, 34, 34.1, 34.5, 34.6, 35.1, 35.2, 35.7, 36.3, 36.4, 36.9, 37, 37.5, 37.6, 38.6, 38.7, 39.8, 39.9, 40.5, 40.6, 41.1, 41.2, 41.7, 42.3, 42.4, 42.8, 42.9, 43, 43.5, 43.6, 44.1, 44.2, 44.7, 45.2, 45.9, 46, 48.1, 48.4, 48.5, 49.5, 49.6, 50.1, 50.2, 50.7, 51.3, 51.4, 51.9, 52, 52.5, 52.6, 53.1, 53.2, 53.7, 54.3, 54.4, 54.9, 55, 55.5, 55.6, 56.1, 56.2, 56.7, 57.3, 57.4, 57.9, 58, 59.1, 59.2, 59.8, 59.9, 60.3, 60.4, 60.9, 61, 61.5, 61.6, 62.1, 62.2, 62.7, 62.9, 63.3, 63.4, 63.5, 63.9, 64, 64.5, 65.2, 67.5, 68.7, 69.3, 69.4, 69.9, 70.5, 71.1, 71.2, 71.7, 72.2, 72.4, 72.9, 73.5, 74, 74.6, 74.7, 75.2, 75.9, 76.5, 77.1, 77.2, 77.7, 78.3, 78.4, 78.6, 78.7, 79, 79.5, 80.1, 80.2, 80.7, 81, 81.4, 81.9, 82.6, 82.7, 83.1, 83.2, 83.7, 84.3, 84.4, 84.9, 85.5, 85.9, 86.2, 86.7, 87.3, 87.4, 87.9, 88.3, 88.4, 88.6, 88.7, 89.1, 89.2, 89.7, 90.3, 90.4, 90.6, 90.7, 90.9, 91.1, 91.5, 92.1, 92.2, 92.7, 93.3, 93.4, 93.9, 94.5, 95.1, 95.2, 96.2, 96.8, 96.9, 97.5, 98.1, 98.2, 98.7, 99.3, 99.4, 100, 100.5, 101.1, 101.2, 101.7, 102.3, 102.4, 102.9, 103.1, 103.5, 103.7, 104.1, 104.2, 104.7, 105.2, 105.4, 105.9, 106.6, 106.7, 107.1, 107.2, 107.7, 108.3, 108.4, 108.9, 109.5, 110.1, 110.2, 110.7, 111.2, 111.4, 111.9, 112.5, 113.1, 113.2, 115.5, 116.1, 116.2, 116.7, 117.3, 117.4, 117.9, 118.5, 119.1, 119.2, 119.7, 120.3, 120.4, 120.9, 121.5, 122.1, 122.2, 122.7, 123.3, 123.4, 123.9, 124.7, 125.2, 125.7, 126.3, 126.4, 126.9, 127.5, 128.1, 128.7, 128.8, 129.3, 129.8, 130, 130.4, 131.1, 131.6, 131.8, 132.3, 133.5, 133.9, 134.2, 134.3, 134.6]
				jiezouInfos.soundTime = 137
				jiezouInfos.musicName = "huazhiwu"
				break
			case 3:
				jiezouInfos.musicArr = [5.5, 7.4, 8.6, 9.9, 11.3, 12.7, 14, 15.1, 16.1, 17.3, 18.6, 20, 21.3, 22.7, 23.9, 25.3, 26.6, 28, 29.3, 30.6, 32, 33.4, 34.6, 35.9, 37.3, 38.8, 40, 41.3, 42.4, 44.1, 45.4, 46.7, 47.8, 49.4, 50.8, 51.9, 53.1, 54.7, 56, 57.2, 58.3, 59.4, 60.7, 62, 63.2, 64.6, 66, 67.3, 68.5, 70, 71.3, 72.7, 73.8, 75.3, 76.6, 78, 79.2, 80.6, 81.9, 83.3, 84.5, 85.9, 87.2, 88.6, 89.9, 91.3, 92.5, 94, 95.1, 96.6, 97.8, 99.2, 100.5]
				// [5.3, 6, 7.3, 8, 8.7, 9.3, 9.9, 10.7, 11.4, 12, 12.6, 13.3, 14, 14.6, 15.2, 16, 16.6, 17.3, 17.9, 18.7, 19.3, 20, 20.6, 21.3, 22, 22.7, 24, 24.6, 25.2, 25.8, 26.6, 27.3, 27.9, 28.5, 29.3, 29.9, 30.6, 31.3, 32, 32.7, 33.4, 34.1, 34.7, 35.3, 35.9, 36.5, 37.3, 38, 38.8, 39.6, 40.6, 41.3, 42, 42.7, 43.3, 44.2, 44.8, 45.5, 46.1, 46.7, 47.4, 48.1, 48.7, 49.6, 50.5, 51.3, 51.9, 52.7, 53.4, 54, 54.8, 55.4, 56.3, 56.9, 57.7, 58.3, 59.3, 60, 60.6, 61.3, 62, 62.7, 63.3, 64, 64.6, 65.3, 65.9, 66.6, 67.3, 67.9, 68.5, 69.3, 70, 70.6, 71.3, 71.9, 72.6, 73.3, 73.9, 74.7, 75.3, 76, 76.6, 77.3, 77.9, 78.6, 79.2, 79.8, 80.6, 81.3, 81.9, 82.6, 83.3, 83.9, 84.5, 85.3, 86, 86.7, 87.3, 88, 88.6, 89.3, 89.9, 90.6, 91.3, 92, 92.6, 93.3, 94, 94.6, 95.2, 95.9, 96.6, 97.3, 97.9, 98.5, 99.3, 99.9, 100.5]
				// [5.1, 5.2, 5.7, 5.9, 7.1, 7.2, 7.7, 7.9, 8.4, 9.1, 9.7, 10.4, 11, 11.7, 11.8, 12.3, 12.5, 13, 13.2, 13.7, 13.8, 14.4, 14.8, 15.1, 15.7, 15.8, 16.3, 17.1, 17.6, 18.3, 18.5, 19, 19.1, 19.7, 19.8, 20.3, 21, 21.1, 21.6, 21.8, 22.4, 22.5, 22.9, 23, 23.7, 23.8, 24.3, 25, 25.1, 25.5, 25.6, 26.4, 26.5, 27.1, 27.7, 27.8, 28.3, 29.1, 29.3, 29.8, 30.4, 30.9, 31, 31.7, 31.8, 32.4, 32.5, 33.1, 33.2, 33.6, 33.7, 34.3, 34.4, 34.5, 35, 35.1, 35.7, 36.2, 37, 37.1, 37.8, 37.9, 38.5, 38.6, 38.8, 38.9, 39.1, 39.2, 39.7, 40.4, 40.5, 41, 41.1, 41.3, 41.4, 41.7, 42.1, 42.2, 42.4, 42.5, 43, 43.1, 43.8, 43.9, 44, 44.1, 44.2, 44.5, 44.6, 44.9, 45, 45.6, 45.7, 46.4, 46.5, 46.8, 46.9, 47.1, 47.2, 47.4, 47.5, 47.7, 48.4, 48.5, 49.1, 49.2, 49.5, 49.6, 49.8, 49.9, 50.2, 51, 51.1, 51.7, 52.1, 52.4, 52.5, 52.7, 53.1, 53.6, 53.7, 54.4, 54.5, 54.6, 54.8, 54.9, 55.2, 55.7, 56.4, 56.5, 57.1, 57.2, 57.4, 57.5, 57.7, 58.1, 58.2, 58.4, 58.5, 59.1, 59.2, 59.7, 60.4, 60.5, 61, 61.1, 61.7, 62.4, 62.5, 62.9, 63, 63.7, 64.3, 64.4, 65, 65.7, 66.3, 66.4, 67, 67.7, 68.2, 69, 69.6, 69.7, 70.3, 70.4, 71, 71.7, 72.3, 72.4, 73, 73.6, 73.7, 74.3, 74.4, 75, 75.6, 75.7, 76.3, 76.4, 77, 77.7, 78.3, 78.4, 78.9, 79.5, 79.9, 80.2, 81.1, 81.2, 81.6, 81.7, 82.3, 82.4, 83, 83.6, 83.7, 84.2, 84.9, 85.7, 86.4, 86.9, 87.6, 87.7, 88.3, 88.4, 89, 89.6, 89.7, 90.4, 91, 91.2, 91.7, 91.9, 92.2, 92.4, 93, 93.7, 94.3, 94.4, 94.9, 95.7, 96.3, 96.4, 97, 97.5, 98.3, 98.4, 99, 99.7, 100.1, 100.2]
				jiezouInfos.soundTime = 102
				jiezouInfos.musicName = "fanzhuandiqiu"
				break

		}

	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_jiezouTeam.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_jiezouTeam.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_jiezouTeam.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_jiezouTeam.gameTaped)
	},

	/**
	 * 速度知道 v = 2 格/秒
	 * 时间知道 t = 1.4秒
	 * 路程  s = v*t
	 * 
	 
	 */
	//判定错误并播放错误音效，减生命值。
	// tapWrong(face, x, y, onOff, nodeId, event) {
	// 	if (nowInfos.lifeProtect == 0) {
	// 		if ((nodeId.startsWith("redFather") || nodeId.startsWith("red")) && onOff == true) {
	// 			deferredInfos.xHistoricalData = x
	// 			deferredInfos.yHistoricalData = y
	// 			nowInfos.lifeProtect = 1;
	// 			setTimeout(function () {
	// 				nowInfos.lifeProtect = 0
	// 			}, 1000);
	// 			jiezouTeamFuncs.addBlink(x, y)
	// 			usersInfos.UseLife++
	// 			if (nowInfos.lifePoint > 1) {
	// 				nowInfos.lifePoint--;
	// 				gameRules.lifeMove();
	// 				roomFunction.playSoundTivite(false, "wrong", "negative");
	// 				if (nowInfos.lifePoint == 3) {
	// 					roomFunction.playSound(false, "life")
	// 				}
	// 			} else if (nowInfos.lifePoint == 1) {
	// 				nowInfos.lifePoint--;
	// 				gameRules.lifeMove();
	// 				roomFunction.playSoundTivite(false, "wrong", "negative");
	// 				wanFa_jiezouTeam.gameLevelEnd()
	// 			}

	// 		}
	// 	}
	// },
	addUserBlock(hh) {

		let count = 0
		let gameInter = setInterval(() => {
			switch (count) {
				case 0:
					for (let j = 0; j < hh.length; j++) {
						let opInfo = {
							opId: "add" + j, //操作id 再控制用
							opType: "addNode", // 操作类型，添加一个节点或精灵
							opNode: "father", // 父节点，如果没有配置，默认到棋盘根节点0,0
							nodes: [
								{
									nodeId: "block" + j, // 节点id，定位用
									surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
									// node参数
									pt: { x: jiezouInfos.userArr[usersInfos.usersResult.length] + 2 + jiezouInfos.randmArr[j], y: Math.floor(2 * hh[j]) }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
									rotation: 0, // 角度
									nodes: [], // 子节点
									canTap: true,
									visible: true, //显示，如果为false，逻辑数据会跳过
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
										rgba: { r: 30, g: 144, b: 254, a: 1 }
									},
								}
							]
						}
						gameFuncs.op(opInfo);
					}
					break
				case 1:
					roomFunction.playSound(false, "jiezouTeamRules")
					let opInfoOne = {
						opId: "fatherPlayOne",
						opType: "play",
						opNode: "father",
						timeLen: 6,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: - 1,
										y: 41
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: - 1,
										y: 5
									}
								}
							}

						]
					}
					gameFuncs.op(opInfoOne);
					break;
				case 14:
					roomFunction.playSound(false, jiezouInfos.musicName, "background")
					let opInfo = {
						opId: "fatherPlay",
						opType: "play",
						opNode: "father",
						timeLen: 333,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: - 1,
										y: 5
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: - 1,
										y: -663
									}
								}
							}

						]
					}
					gameFuncs.op(opInfo);
					break
				case 14:
					clearInterval(gameInter)
					break
			}
			count++
		}, 500);

		// setTimeout(() => {
		// 	roomFunction.playSound(false, jiezouInfos.musicName, "background")
		// 	let opInfo = {
		// 		opId: "fatherPlay",
		// 		opType: "play",
		// 		opNode: "father",
		// 		timeLen: 333,
		// 		loop: false,
		// 		keyFrames: [
		// 			{
		// 				t: 0,
		// 				keyFrame: {
		// 					surface: "b",
		// 					visible: true,
		// 					canTap: true,
		// 					pt: {
		// 						x: - 1,
		// 						y: 3
		// 					}
		// 				}
		// 			},
		// 			{
		// 				t: 1,
		// 				keyFrame: {
		// 					surface: "b",
		// 					pt: {
		// 						x: - 1,
		// 						y: -663
		// 					}
		// 				}
		// 			}

		// 		]
		// 	}
		// 	gameFuncs.op(opInfo);
		// }, 2000);
	},
	//现场看看蓝色如何不行就改为青色
	blueTap(face, x, y, onOff, nodeId, event) {
		if (face == "b" && y <= 5 && y >= 2 && onOff == true && nodeId.startsWith("father.block")) {
			roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
			usersInfos.gameScore++
			jiezouTeamFuncs.nodeMove(x, y, nodeId)
		}
		// jiezouTeamFuncs.tiaoMove(x, {
		// 	r: 30, g: 144, b: 254, a: 0.3
		// })
	},
	nodeMove(x, y, nodeId) {
		let opInfo = {
			opId: nodeId + "Play",
			opType: "play",
			opNode: nodeId,
			timeLen: 0.1,
			loop: false,
			keyFrames: [
				// {
				// 	t: 0,
				// 	keyFrame: {
				// 		surface: "b",
				// 		pt: {
				// 			x: x,
				// 			y: y
				// 		},
				// 		visible: true,
				// 		canTap: false,
				// 		shape: {
				// 			type: "rect",
				// 			rect: {
				// 				lt: {
				// 					x: 0,
				// 					y: 0
				// 				},
				// 				rb: {
				// 					x: 0,
				// 					y: 31 - y
				// 				}
				// 			},
				// 			rgba: { r: 254, g: 254, b: 254, a: 0.3 }
				// 		}
				// 	}
				// },
				{
					t: 0,
					keyFrame: {
						surface: "b",
						visible: false,
						canTap: false,
						pt: {
							x: -1,
							y: -1
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						surface: "b",
						visible: false,
						canTap: false,
						pt: {
							x: -1,
							y: -1
						}
					}
				}

			]
		}
		gameFuncs.op(opInfo);
		jiezouTeamFuncs.tiaoMove(x, y, {
			// r: 30, g: 144, b: 254, a: 0.3 和砖块一样颜色
			//色盲排队绿色
			r: 50,
			g: 205,
			b: 50,
			a: 0.3
		})
	},
	tiaoMove(x, y, rgb) {
		let opInfoTiaoMove = {
			opId: "tiao" + jiezouInfos.tiaoNum + "Play",
			opType: "play",
			opNode: "area.tiao" + jiezouInfos.tiaoNum % 19,
			timeLen: 0.2,
			loop: false,
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: "b",
						pt: {
							x: x,
							y: y
						},
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 0,
									y: 31 - y
								}
							},
							rgba: rgb
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						surface: "b",
						visible: false,
						canTap: false,
						pt: {
							x: x,
							y: y
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						surface: "b",
						visible: false,
						canTap: false,
						pt: {
							x: -1,
							y: -1
						}
					}
				}

			]
		}
		gameFuncs.op(opInfoTiaoMove);
		jiezouInfos.tiaoNum++
	},
	CountPlay() {
		jiezouTeamFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
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
						value1: "#1E90FF",
						label2: "BLUE"
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "游戏得分",
						value1: usersInfos.gameScore,
					}
				}
			}
			gameFuncs.op(opInfo);
			nowInfos.gameCountTime--;

			if (nowInfos.gameCountTime == 0) {
				wanFa_jiezouTeam.gameLevelEnd()
			}
		}, 1000, nowInfos.gameCountTime)

	},


}
