const wanFaCtl_jingjibenpaoCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "competMode") {
			wanFa_jingjibenpao.gameStart(level, 1, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl() {
		roomFunction.stopSound("fenwei")
		roomFunction.playSound(false, "victory1")
		if (levelInfos.mode == "competMode") {
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
			engine.log("xxxxxxxx-hefenghefeng-xxxxxxxx" + JSON.stringify(ganmeEndScreenShow))
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
			// fastop.addNode("jingjiwinA", "jingjiwin1321", "a", "51", "5", "254", "0", "0")
			let color = {}
			let colorName = ""
			switch (userColorShowString[0]) {//"#FF0000", "#00fe00", "#0000fe", "#fec300", "#fe1493", "#8b4513"
				case "#FF0000":
					color = {
						"r": 254,
						"g": 0,
						"b": 0,
						"a": 1
					}
					colorName = "redWin"
					break;
				case "#0000fe":
					color = {
						"r": 0,
						"g": 0,
						"b": 254,
						"a": 1
					}
					colorName = "blueWin"

					break;
				case "#00fe00":
					color = {
						"r": 0,
						"g": 254,
						"b": 0,
						"a": 1
					}
					colorName = "greenWin"
					break;

				case "#fec300":
					color = {
						"r": 254,
						"g": 254,
						"b": 0,
						"a": 1
					}
					colorName = "yellowWin"

					break;
				case "#00FFFF":
					color = {
						"r": 0,
						"g": 254,
						"b": 254,
						"a": 1
					}
					colorName = "cyanWin"
					break;
				case "#8b4513":
					color = {
						"r": 139,
						"g": 69,
						"b": 19,
						"a": 1
					}
					colorName = "brownWin"
					break;
			}



			//内屏积分显示
			let sum = 0
			for (let i = 0; i < usersInfos.usersResult.length; i++) {
				usersInfos.usersResult[i].disVal = jingJiInfos.block2Infos[i];
				usersInfos.usersScore[i] = jingJiInfos.block2Infos[i]
				sum += usersInfos.usersScore[i]
			};
			setTimeout(function () {
				screenInner.innerScore(sum)
				roomFunction.goToGameLevel("leave_hold", "none")//结束动画
				setTimeout(() => {
					surfaceCtr.ctlDoor(1, 10000)
				}, 500);
			}, 5000);

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
				//那种颜色胜利屏幕显示
				// fastop.addJingJiWin(4, "a", color)
				fastop.addJingJiWin(4, "b", color)
				roomFunction.playSound(false, colorName)
			}, 1000);


		}
	}



}