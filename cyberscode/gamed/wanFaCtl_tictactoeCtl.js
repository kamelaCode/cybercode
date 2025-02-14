const wanFaCtl_tictactoeCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "competMode") {
			wanFa_tictactoe.gameStart(level, 1)
		}


	},

	gameEndCtl(gameComplete, lifePoint) {
		// roomFunction.playSound(false, "victory")
		if (levelInfos.mode == "competMode") {
			usersInfos.SaveTime = teamPkInfos.allTime * 1000;
			usersInfos.SentryNum = 1;
			let usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"]
			let ganmeEndScreenShow = []
			for (let i = 0; i < usersInfos.usersResult.length; i++) {
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
					}
				}
			}
			gameFuncs.op(opInfo)
			//内屏积分显示
			let sum = 0
			for (let i = 0; i < usersInfos.usersResult.length; i++) {
				usersInfos.usersResult[i].disVal = parseInt(goldInfos.block2Infos[i] * 0);
				usersInfos.usersScore[i] = parseInt(goldInfos.block2Infos[i] * 0)
				sum += usersInfos.usersScore[i]
			};
			setTimeout(function () {
				screenInner.innerScore(sum)
			}, 2000);

			//积分结算模块
			usersInfos.Stars = 2
			usersInfos.endTime = new Date().getTime()//获取离开时间
			gameRoom002.gameUserScroeREC()//调用积分结算

			//算完分立马开门和清除用户
			setTimeout(() => {
				//门禁开门
				surfaceCtr.ctlDoor(1, 19000)
				//清除用户
				gameFuncs.clearPlayUser();
			}, 1000);

		}
	}


}