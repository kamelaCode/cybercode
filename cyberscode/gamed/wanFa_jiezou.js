const wanFa_jiezou = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_jiezou.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_jiezou.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_jiezou.gameDestroy);
		// engine.addEventListener("soundPlayStatus", wanFa_jiezou.soundPlayStatus);
		//重置全局变量
		jiezouFuncs.resetAll()
		clearInterval(jiezouFuncs.CountPlay.innerCount)
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
		// jingjiFuncs.rgbScorePlay()//跳转内屏显示

		//开门入场流程
		const sec = 8;
		surfaceCtr.ctlDoor(0, sec * 1000);
		setTimeout(() => {
			surfaceCtr.ctlDoor(1, 7000);
		}, 500);

		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		setTimeout(function () {
			// setTimeout(function () {
			// roomFunction.playSound(true, "damifengbgm")
			// }, 2000);
			if (levelInfos.wanFa.startsWith("jiezou")) {
				roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
			}
		}, sec * 1000);
		setTimeout(() => {
			surfaceCtr.ctlDoor(0, 5000);
			roomFunction.playSound(false, "gamestart");
		}, 4000);




	},




	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		engine.log("-------------------" + gameid)
		if (gameid.startsWith("jiezou")) {
			nowInfos.gameCountTime = jiezouInfos.soundTime
			fastop.setNodeVisible("showPlay", "show" + (usersInfos.usersResult.length > 3 ? 2 : 1), 0.1, true, false, true, false)
			for (var i = 0; i < usersInfos.usersResult.length; i++) {
				jingJiInfos.block2Infos[i] = 1
			}
			gameCtl = 0
			nowInfos.nowGameid = gameid;
			gameRules.lifeMove();
			engine.addEventListener("gameTaped", wanFa_jiezou.gameTaped)
			// 生成一个包含从0到4数字的原始数组
			const originalArray = Array.from({ length: jiezouInfos.musicArr.length }, (_, i) => i % 5);
			// 打乱原始数组的顺序
			jiezouInfos.randmArr = originalArray.sort(() => Math.random() - 0.5);
			jiezouFuncs.addUserBlock(usersInfos.usersResult.length, jiezouInfos.musicArr)
			jiezouFuncs.CountPlay()
			let color = [[254, 0, 0], [0, 0, 254], [0, 254, 0], [254, 195, 0], [0, 254, 254], [139, 69, 19]]//新六人
			//竞技模式中内屏倒计时
			wanFa_jiezou.gamePlay.innerCount = setInterval(() => {
				nowInfos.gameCountTime--
				const totalUsersResultLength = (usersInfos.usersResult.length > 3 ? (usersInfos.usersResult.length == 4 ? 7 : 5) : (usersInfos.usersResult.length == 2 ? 8 : 5) * usersInfos.usersResult.length) - 1
				const userBlock = [];
				let allScore = jingJiInfos.block2Infos.reduce((acc, val) => acc + val, 0);
				jingJiInfos.block2Infos.map((item, index) => {
					userBlock[index] = Math.ceil((item / allScore) * totalUsersResultLength);
				});
				for (let i = 0; i < usersInfos.usersResult.length; i++) {
					let y = 0
					userBlock.map((item, index) => {
						if (index < i) {
							y += item
						}
					})
					let opInfo = {
						opId: "addArea" + i, //操作id 再控制用
						opType: "addNode", // 操作类型，添加一个节点或精灵
						opNode: "area", // 父节点，如果没有配置，默认到棋盘根节点0,0
						nodes: [
							{
								nodeId: "Area" + i, // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: {
									x: usersInfos.usersResult.length > 3 ? 3 : y, y: usersInfos.usersResult.length > 3 ? y : 3
								},
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
											x: usersInfos.usersResult.length > 3 ? 15 : userBlock[i] == 1 ? 0 : userBlock[i],
											y: usersInfos.usersResult.length > 3 ? userBlock[i] == 1 ? 0 : userBlock[i] : 41
										}
									},
									rgba: { r: color[i][0], g: color[i][1], b: color[i][2], a: 0.1 }
								},
							}
						]
					}
					gameFuncs.op(opInfo);
				}

				if (nowInfos.gameCountTime == -3) {
					wanFa_jiezou.gameLevelEnd()
				}
			}, 1000)

		}
	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		if (nowInfos.nowGameid.startsWith("jiezou")) {
			if (onOff == true) {
				usersInfos.ValidTrigger++
			}
			engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" + event + "被触碰了")
			jiezouFuncs.blueTap(face, x, y, onOff, nodeId, event)
		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(jiezouFuncs.CountPlay.innerCount)
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
		clearInterval(jiezouFuncs.CountPlay.innerCount)
		clearInterval(wanFa_jiezou.gamePlay.innerCount)
		opClear = 1
		roomFunction.stopSound("fenwei")
		roomFunction.goToGameLevel("leave_hold", "none")
		jiezouFuncs.rmAllListener()
		wanFaCtl_dafeijiCtl.gameEndCtl(nowInfos.nowGameid, nowInfos.lifePoint)
		levelInfos.gameIdList = [];
		opClear = 1
	}

}



const jiezouFuncs = {
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
		opClear = 0;
		jiezouInfos.randmArr = [];
		jiezouInfos.musicArr = []
		switch (levelInfos.level) {
			case 1:
				jiezouInfos.musicArr = [2.3, 2.4, 2.7, 2.9, 4.3, 4.4, 5.9, 7.6, 7.7, 9.6, 10, 11.2, 11.3, 11.6, 12, 12.4, 14.8, 15, 15.7, 15.8, 17.3, 18.9, 19, 19.4, 19.5, 20.5, 20.6, 22.6, 22.9, 23, 24.2, 24.3, 24.5, 24.6, 24.9, 25, 25.1, 25.4, 25.5, 29.4, 29.5, 29.8, 30.2, 30.3, 30.8, 31.4, 31.5, 31.8, 33.9, 34, 34.2, 34.8, 34.9, 37.1, 37.2, 37.5, 37.6, 38, 38.1, 39.9, 40, 40.1, 42.4, 42.5, 43.2, 43.9, 44, 44.4, 44.5, 44.8, 44.9, 46.9, 47, 47.3, 47.4, 47.9, 48, 50.1, 50.2, 50.5, 50.6, 51, 51.1, 54.6, 54.7, 55.4, 55.5, 56.1, 56.2, 56.9, 57, 57.1, 57.8, 57.9, 59.4, 59.5, 61.8, 61.9, 62.5, 62.6, 62.7, 63.4, 63.5, 64.3, 64.4, 65.9, 68.3, 68.4, 69, 69.2, 69.7, 70.3, 70.4, 70.7, 72.3, 72.4, 73.2, 73.8, 73.9, 75.6, 75.7, 76.3, 76.4, 77.1, 77.2, 78.8, 78.9, 81.3, 81.4, 82, 82.6, 82.7, 83.2, 83.6, 83.7, 85.4, 85.9, 86.7, 88.6, 88.7, 89.1, 89.2, 89.7, 90.1, 90.2]
				jiezouInfos.soundTime = 91
				jiezouInfos.musicName = "guanghuisuiyue"
				break
			case 2:
				jiezouInfos.musicArr = [1.4, 1.5, 1.7, 1.8, 2, 2.1, 2.3, 2.4, 2.7, 3.4, 3.5, 4.5, 5.3, 5.4, 5.9, 6.4, 6.6, 7, 7.2, 8.3, 8.7, 8.8, 9.2, 9.3, 9.5, 9.7, 10.1, 10.6, 11, 11.4, 11.6, 11.9, 12.3, 12.5, 12.9, 13.3, 13.8, 14, 14.3, 14.8, 15.2, 15.3, 15.6, 15.8, 16.2, 16.5, 16.6, 17.3, 17.7, 17.8, 18.1, 18.5, 18.6, 19, 19.1, 19.4, 19.5, 19.8, 20, 20.4, 20.5, 20.8, 21, 21.3, 21.7, 21.8, 22.2, 22.3, 22.7, 22.8, 23.2, 23.3, 23.6, 24, 24.1, 24.4, 24.5, 24.6, 25.1, 25.5, 25.6, 26, 26.1, 26.5, 26.6, 26.9, 27, 27.4, 27.5, 27.9, 28, 28.3, 28.5, 28.8, 29, 29.5, 29.6, 30.7, 30.8, 31.2, 31.3, 31.7, 31.8, 32.1, 32.2, 32.6, 32.7, 34.4, 34.5, 34.6, 36.3, 36.4, 38.2, 38.6, 38.7, 39.2, 39.6, 39.7, 40.1, 40.2, 41.8, 41.9, 42, 43.7, 43.9, 45.6, 45.7, 46.6, 46.7, 47, 47.1, 47.2, 47.6, 48, 48.1, 48.4, 48.5, 48.8, 48.9, 49.4, 49.5, 49.9, 50, 50.3, 50.4, 50.5, 51.2, 51.4, 51.7, 52.2, 52.4, 53.2, 54.1, 54.2, 54.6, 54.7, 55.1, 55.2, 55.5, 55.6, 55.7, 56, 56.1, 56.5, 56.6, 57.2, 58, 58.1, 58.2, 59, 59.1, 59.2, 59.5, 59.6, 59.8, 59.9, 60.2, 60.9, 61, 61.4, 61.5, 61.8, 61.9, 62.2, 62.6, 62.7, 63, 63.1, 63.5, 63.6, 63.9, 64, 64.4, 64.8, 64.9, 65.4, 65.9, 66.3, 66.4, 66.8, 66.9, 67.3, 67.4, 67.8, 67.9, 68.2, 68.6, 68.7, 69, 69.5, 69.7, 70.1, 70.2, 70.5, 70.9, 71.1, 71.4, 71.6, 71.9, 72.3, 72.4, 72.8, 72.9, 73.3, 73.4, 73.8, 73.9, 74.5, 74.7, 75.7, 76.2, 76.7, 77.1, 77.2, 77.6, 77.7, 79.4, 81.3, 81.4, 83.2, 83.4, 83.7, 84.2, 84.6, 84.7, 85, 86.9, 88.8, 88.9, 90.7, 90.9, 91.6, 91.7, 92.1, 92.2, 92.5, 93, 93.4, 93.9, 94.4, 94.8, 94.9, 95.3, 95.4, 96.2, 96.4, 96.7, 97.2, 98.2, 99, 99.2, 99.6, 99.7, 100, 100.5, 101, 101.5, 102.1, 102.2, 103.1, 103.2, 104, 104.4, 104.8, 104.9, 105.2, 105.7, 105.9, 106.3, 106.4, 106.7, 107.1, 107.2, 107.5, 108, 108.4, 108.9, 109.4, 109.8, 109.9, 110.3, 110.4, 110.8, 110.9, 111.3, 111.4, 111.7, 112.2, 112.4, 112.7, 113.1, 113.2, 113.5, 114, 114.2, 114.6, 114.7, 115.1, 115.2, 115.5, 116, 116.5, 116.9, 117.4, 117.9, 118.3, 118.4, 118.8, 118.9, 119.5, 119.7, 120.4]
				jiezouInfos.soundTime = 123
				jiezouInfos.musicName = "BrownEyed"
				break
			case 3:
				jiezouInfos.musicArr = [0.7, 0.8, 1.6, 2.1, 2.2, 2.7, 3.2, 3.9, 4, 4.5, 4.7, 5.1, 5.2, 5.8, 5.9, 6.4, 6.9, 7.5, 7.7, 9.9, 10.1, 11.1, 11.7, 11.8, 12.3, 12.9, 13.5, 14.1, 14.7, 14.8, 15.3, 15.9, 16.4, 16.5, 16.6, 17.1, 17.7, 17.8, 18.3, 18.5, 18.9, 19, 19.5, 19.6, 20.1, 20.7, 20.8, 21, 21.1, 21.4, 21.5, 21.9, 22, 22.5, 22.6, 23.1, 23.4, 23.5, 23.6, 23.8, 24.4, 24.5, 24.9, 25, 25.5, 25.6, 26.1, 26.7, 26.8, 27.3, 27.9, 28, 28.3, 28.6, 29.1, 29.7, 29.8, 30.3, 30.5, 30.7, 30.8, 31, 31.1, 31.5, 31.6, 32.1, 32.2, 32.7, 33, 33.1, 33.4, 33.5, 34, 34.1, 34.5, 34.6, 35.1, 35.2, 35.7, 36.3, 36.4, 36.9, 37, 37.5, 37.6, 38.6, 38.7, 39.8, 39.9, 40.5, 40.6, 41.1, 41.2, 41.7, 42.3, 42.4, 42.8, 42.9, 43, 43.5, 43.6, 44.1, 44.2, 44.7, 45.2, 45.9, 46, 48.1, 48.4, 48.5, 49.5, 49.6, 50.1, 50.2, 50.7, 51.3, 51.4, 51.9, 52, 52.5, 52.6, 53.1, 53.2, 53.7, 54.3, 54.4, 54.9, 55, 55.5, 55.6, 56.1, 56.2, 56.7, 57.3, 57.4, 57.9, 58, 59.1, 59.2, 59.8, 59.9, 60.3, 60.4, 60.9, 61, 61.5, 61.6, 62.1, 62.2, 62.7, 62.9, 63.3, 63.4, 63.5, 63.9, 64, 64.5, 65.2, 67.5, 68.7, 69.3, 69.4, 69.9, 70.5, 71.1, 71.2, 71.7, 72.2, 72.4, 72.9, 73.5, 74, 74.6, 74.7, 75.2, 75.9, 76.5, 77.1, 77.2, 77.7, 78.3, 78.4, 78.6, 78.7, 79, 79.5, 80.1, 80.2, 80.7, 81, 81.4, 81.9, 82.6, 82.7, 83.1, 83.2, 83.7, 84.3, 84.4, 84.9, 85.5, 85.9, 86.2, 86.7, 87.3, 87.4, 87.9, 88.3, 88.4, 88.6, 88.7, 89.1, 89.2, 89.7, 90.3, 90.4, 90.6, 90.7, 90.9, 91.1, 91.5, 92.1, 92.2, 92.7, 93.3, 93.4, 93.9, 94.5, 95.1, 95.2, 96.2, 96.8, 96.9, 97.5, 98.1, 98.2, 98.7, 99.3, 99.4, 100, 100.5, 101.1, 101.2, 101.7, 102.3, 102.4, 102.9, 103.1, 103.5, 103.7, 104.1, 104.2, 104.7, 105.2, 105.4, 105.9, 106.6, 106.7, 107.1, 107.2, 107.7, 108.3, 108.4, 108.9, 109.5, 110.1, 110.2, 110.7, 111.2, 111.4, 111.9, 112.5, 113.1, 113.2, 115.5, 116.1, 116.2, 116.7, 117.3, 117.4, 117.9, 118.5, 119.1, 119.2, 119.7, 120.3, 120.4, 120.9, 121.5, 122.1, 122.2, 122.7, 123.3, 123.4, 123.9, 124.7, 125.2, 125.7, 126.3, 126.4, 126.9, 127.5, 128.1, 128.7, 128.8, 129.3, 129.8, 130, 130.4, 131.1, 131.6, 131.8, 132.3, 133.5, 133.9, 134.2, 134.3, 134.6]
				jiezouInfos.soundTime = 137
				jiezouInfos.musicName = "huazhiwu"
				break
			case 4:
				jiezouInfos.musicArr = [5.1, 5.2, 5.7, 5.9, 7.1, 7.2, 7.7, 7.9, 8.4, 9.1, 9.7, 10.4, 11, 11.7, 11.8, 12.3, 12.5, 13, 13.2, 13.7, 13.8, 14.4, 14.8, 15.1, 15.7, 15.8, 16.3, 17.1, 17.6, 18.3, 18.5, 19, 19.1, 19.7, 19.8, 20.3, 21, 21.1, 21.6, 21.8, 22.4, 22.5, 22.9, 23, 23.7, 23.8, 24.3, 25, 25.1, 25.5, 25.6, 26.4, 26.5, 27.1, 27.7, 27.8, 28.3, 29.1, 29.3, 29.8, 30.4, 30.9, 31, 31.7, 31.8, 32.4, 32.5, 33.1, 33.2, 33.6, 33.7, 34.3, 34.4, 34.5, 35, 35.1, 35.7, 36.2, 37, 37.1, 37.8, 37.9, 38.5, 38.6, 38.8, 38.9, 39.1, 39.2, 39.7, 40.4, 40.5, 41, 41.1, 41.3, 41.4, 41.7, 42.1, 42.2, 42.4, 42.5, 43, 43.1, 43.8, 43.9, 44, 44.1, 44.2, 44.5, 44.6, 44.9, 45, 45.6, 45.7, 46.4, 46.5, 46.8, 46.9, 47.1, 47.2, 47.4, 47.5, 47.7, 48.4, 48.5, 49.1, 49.2, 49.5, 49.6, 49.8, 49.9, 50.2, 51, 51.1, 51.7, 52.1, 52.4, 52.5, 52.7, 53.1, 53.6, 53.7, 54.4, 54.5, 54.6, 54.8, 54.9, 55.2, 55.7, 56.4, 56.5, 57.1, 57.2, 57.4, 57.5, 57.7, 58.1, 58.2, 58.4, 58.5, 59.1, 59.2, 59.7, 60.4, 60.5, 61, 61.1, 61.7, 62.4, 62.5, 62.9, 63, 63.7, 64.3, 64.4, 65, 65.7, 66.3, 66.4, 67, 67.7, 68.2, 69, 69.6, 69.7, 70.3, 70.4, 71, 71.7, 72.3, 72.4, 73, 73.6, 73.7, 74.3, 74.4, 75, 75.6, 75.7, 76.3, 76.4, 77, 77.7, 78.3, 78.4, 78.9, 79.5, 79.9, 80.2, 81.1, 81.2, 81.6, 81.7, 82.3, 82.4, 83, 83.6, 83.7, 84.2, 84.9, 85.7, 86.4, 86.9, 87.6, 87.7, 88.3, 88.4, 89, 89.6, 89.7, 90.4, 91, 91.2, 91.7, 91.9, 92.2, 92.4, 93, 93.7, 94.3, 94.4, 94.9, 95.7, 96.3, 96.4, 97, 97.5, 98.3, 98.4, 99, 99.7, 100.1, 100.2]
				jiezouInfos.soundTime = 102
				jiezouInfos.musicName = "fanzhuandiqiu"
				break

		}

	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_jiezou.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_jiezou.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_jiezou.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_jiezou.gameTaped)
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
	// 			jiezouFuncs.addBlink(x, y)
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
	// 				wanFa_jiezou.gameLevelEnd()
	// 			}

	// 		}
	// 	}
	// },
	addUserBlock(userNums, hh) {
		let colorrName = ["red", "blue", "green", "yellow", "qing", "brown"]
		let color = [[254, 0, 0], [0, 0, 254], [0, 254, 0], [254, 195, 0], [0, 254, 254], [139, 69, 19]]//新六人
		for (let i = 0; i < userNums; i++) {
			for (let j = 0; j < hh.length; j++) {
				let opInfo = {
					opId: "add" + colorrName[i] + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: colorrName[i] + j, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: 17, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
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
								rgba: { r: color[i][0], g: color[i][1], b: color[i][2], a: 1 }
							},
						}
					]
				}
				gameFuncs.op(opInfo);
			}

		}
		setTimeout(() => {
			roomFunction.playSound(false, jiezouInfos.musicName, "background")
			for (let i = 0; i < userNums; i++) {
				for (let j = 16; j < hh.length; j++) {
					let opInfo = {
						opId: colorrName[i] + j + "Play",
						opType: "play",
						opNode: colorrName[i] + j,
						timeLen: jiezouInfos.soundTime,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: usersInfos.usersResult.length > 3 ? 16 : jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 2 ? 11 : 5),
										y: usersInfos.usersResult.length > 3 ? jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 4 ? 8 : 5) : 42
									}
								}
							},
							{
								t: (hh[(j - 16)] / jiezouInfos.soundTime).toFixed(3),
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: usersInfos.usersResult.length > 3 ? 16 : jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 2 ? 11 : 5),
										y: usersInfos.usersResult.length > 3 ? jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 4 ? 8 : 5) : 42
									}
								}
							},
							{
								t: (hh[j] / jiezouInfos.soundTime).toFixed(3),
								keyFrame: {
									surface: "b",
									pt: {
										x: usersInfos.usersResult.length > 3 ? 4 : jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 2 ? 11 : 5),
										y: usersInfos.usersResult.length > 3 ? jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 4 ? 8 : 5) : 4
									}
								}
							}
							,
							{
								t: hh[j] / jiezouInfos.soundTime + 0.1,
								keyFrame: {
									surface: "b",
									pt: {
										x: usersInfos.usersResult.length > 3 ? 0 : jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 2 ? 11 : 5),
										y: usersInfos.usersResult.length > 3 ? jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 4 ? 8 : 5) : 0
									}
								}
							}
							,
							{
								t: hh[j] / jiezouInfos.soundTime + 0.15,
								keyFrame: {
									surface: "b",
									pt: {
										x: usersInfos.usersResult.length > 3 ? -1 : jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 2 ? 11 : 5),
										y: usersInfos.usersResult.length > 3 ? jiezouInfos.randmArr[j] + i * (usersInfos.usersResult.length == 4 ? 8 : 5) : -1
									}
								}
							}

						]
					}
					gameFuncs.op(opInfo);
				}
			}
		}, 2000);

	},
	blueTap(face, x, y, onOff, nodeId, event) {
		if (x <= 4 && x > 1 && onOff == true && usersInfos.usersResult.length > 3) {
			if (nodeId.startsWith("red")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 0)
				return
			}
			if (nodeId.startsWith("blue")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 1)
				return
			}
			if (nodeId.startsWith("green")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 2)
				return
			}
			if (nodeId.startsWith("yellow")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 3)
				return
			}
			if (nodeId.startsWith("qing")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 4)
				return
			}
			if (nodeId.startsWith("brown")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 5)
				return
			}
		} else if (y <= 4 && y > 1 && onOff == true && usersInfos.usersResult.length <= 3) {
			if (nodeId.startsWith("red")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 0)
				return
			}
			if (nodeId.startsWith("blue")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 1)
				return
			}
			if (nodeId.startsWith("green")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 2)
				return

			}
			if (nodeId.startsWith("yellow")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 3)
				return
			}
			if (nodeId.startsWith("qing")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 4)
				return
			}
			if (nodeId.startsWith("brown")) {
				roomFunction.playSoundTivite(false, "jiezoudashiyinxiao", "negative");
				jiezouFuncs.nodeMove(x, y, nodeId, 5)
				return
			}
		}

	},
	nodeMove(x, y, nodeId, user) {
		jingJiInfos.block2Infos[user]++
		let opInfo = {
			opId: nodeId + "Play",
			opType: "play",
			opNode: nodeId,
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
									x: usersInfos.usersResult.length <= 3 ? 0 : 20,
									y: usersInfos.usersResult.length <= 3 ? (31 - y) : 0
								}
							},
							rgba: { r: 254, g: 254, b: 254, a: 0.3 }
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
							y: 0
						}
					}
				}

			]
		}
		gameFuncs.op(opInfo);
	},
	CountPlay() {
		let screenCir = setInterval(() => {
			if (opClear == 1) {
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
			// for (let x = 1; x < 2; x++) {
			// 	for (let y = 0; y < 32; y++) {
			// 		let str = gameFuncs.surfacePointInfo("b", x, y);
			// 		let info = JSON.parse(str)
			// 		if (info.rgb.R == 254 && info.rgb.G == 0 && info.rgb.B == 0) {
			// 			jiezouInfos.userAddScore[0].score = 1
			// 		}
			// 		if (info.rgb.R == 0 && info.rgb.G == 0 && info.rgb.B == 254) {
			// 			jiezouInfos.userAddScore[1].score = 1
			// 		}
			// 		if (info.rgb.R == 0 && info.rgb.G == 254 && info.rgb.B == 0) {
			// 			jiezouInfos.userAddScore[2].score = 1
			// 		}
			// 		if (info.rgb.R == 254 && info.rgb.G == 195 && info.rgb.B == 0) {
			// 			jiezouInfos.userAddScore[3].score = 1
			// 		}
			// 		if (info.rgb.R == 0 && info.rgb.G == 254 && info.rgb.B == 254) {
			// 			jiezouInfos.userAddScore[4].score = 1
			// 		}
			// 		if (info.rgb.R == 139 && info.rgb.G == 69 && info.rgb.B == 19) {
			// 			jiezouInfos.userAddScore[5].score = 1
			// 		}
			// 	}
			// }
		}, 500)
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


}
