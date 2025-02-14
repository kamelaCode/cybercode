const screenInner = {
	//基础红绿蓝游戏内屏倒计时、目标数量、得分显示。该函数用于刷新倒计时。
	rgbGameCountPlay() {
		screenInner.rgbGameCountPlay.innerCount = setIntervalCount(function (index, count) {
			let opInfo = {
				opId: "screenCountPlay",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_3b01",
					block1: {
						model: "dis_b_numUnit",
						label1: "SECONDS",
						value1: allTime
					},
					block2: {
						model: "dis_b_scoreGame",
						label1: "游戏得分",
						value1: usersInfos.gameScore,
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "关卡总分",
						value1: usersInfos.levelScore
					}
				}
			}
			gameFuncs.op(opInfo);
			nowInfos.gameCountTime--;
			allTime = nowInfos.gameCountTime;
			if (nowInfos.gameCountTime == 0) {
				roomFunction.goToGameLevel("leave_hold", "none");
				screenInner.innerGameEnd();
				nowInfos.gameCountTime = 120;
			}
		}, 1000, nowInfos.gameCountTime)
	},

	//内屏全屏倒计时。title为标题，字符串格式。countnum为倒计时长。
	innerStartCount(title, countnum) {
		setIntervalCount(function (index, count) {
			let opInfo = {
				opId: "screenCountIn",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_countdown",
					countInfo: {
						text: title,
						num: count - index
					}
				}
			}
			gameFuncs.op(opInfo);
			if ("游戏结束\n请从出口门有序离场" == title && index == countnum) {
				let opInfo = {
					opId: "screenCountIn",
					opType: "screenDisplay",
					screenDisplay: {

					}
				}
				gameFuncs.op(opInfo);
			}
		}, 1000, countnum)
	},
	//英文积分显示方法
	englishPoints(num) {
		let str = String(num);
		let parts = str.split('.');
		let intPart = parts[0];
		let decimalPart = '';
		if (parts.length > 1) {
			decimalPart = '.' + parts[1];
		}
		let intPartWithCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
		return intPartWithCommas + decimalPart;
	},

	//内屏跳转到游戏结果展示
	innerGameEnd(resultChoose, finalScore) {
		for (let i = 0; i < usersInfos.usersResult.length; i++) {
			//积分结算
			usersInfos.usersScore[i] = finalScore
			//内屏显示用户总积分
			usersInfos.usersResult[i].disVal = screenInner.englishPoints(usersInfos.allUsers[i].UScore + finalScore)
		};
		let opInfo = {
			opId: "gameEnd000",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_result",
				result: {
					model: resultChoose,
					users: usersInfos.usersResult
				}
			}
		}
		gameFuncs.op(opInfo);
		//积分结算模块
		usersInfos.endTime = new Date().getTime()//获取离开时间
		gameRoom002.gameUserScroeREC()//调用积分结算
		setTimeout(function () {
			surfaceCtr.ctlDoor(1, 22000);
			surfaceCtr.ctlDoor(0, 22000);
			gameFuncs.clearPlayUser();
		}, 1000);
	},

	//内屏跳转到游戏得分结算
	innerScore(finalScore) {
		let opInfo = {
			opId: "gameEnd001",
			opType: "screenDisplay",
			screenDisplay: {
				model: "dis_result",
				result: {
					model: "dis_r_score",
					label: "得分结算",
					disVal: screenInner.englishPoints(parseInt(finalScore)),
					users: usersInfos.usersResult
				}
			}
		}
		gameFuncs.op(opInfo);
		//入口出口离场新规范
		//userCardNums = 0
		setTimeout(() => {
			setTimeout(() => {
				if (leaveVariableCtl == 1) {
					roomFunction.goToGameLevel("__system_wait", "none");
					roomFunction.addCardLight()
					setTimeout(function () {
						roomFunction.userCardLight()
						//roomFunction.backLightRGB("123")
						roomFunction.addCoverLight()
						roomFunction.addCardCenterLight()
						setTimeout(function () { roomFunction.cardLightVisible(userCardNums) }, 200)
						gameJumpWaitCtl = "不跳"
					}, 100);
				}
			}, 13000);
			roomFunction.playSound(false, "gameend")
			screenInner.innerStartCount("游戏结束\n请从出口门有序离场", 5);
			leaveVariableCtl = 1
			gameJumpWaitCtl = "跳"
		}, 4000);

		setTimeout(function () {
			screenOutside.toInterface()
			kongzhi = 0
			gameFuncs.clearPlayUser()
			engine.log("再次清除用户")
			roomFunction.stopSound("colorBgm")
			roomFunction.stopSound("damifengbgm")
			roomFunction.stopSound("damifengbossbgm")
			roomFunction.stopSound("bgm01")
			roomFunction.stopSound("haiPlusBgm02")
			roomFunction.stopSound("haiPlusBgm03")
			roomFunction.stopSound("haiPlusBgm")
			roomFunction.stopSound("haihaibgm")
			roomFunction.stopSound("lootBgm")
			roomFunction.stopSound("mutouren")
			roomFunction.stopSound("bgm02")
			roomFunction.stopSound("tranBgm")
			roomFunction.stopSound("loveBgm")
			roomFunction.stopSound("wansheng")
			roomFunction.stopSound("happil")
		}, 5000);
	}

}


