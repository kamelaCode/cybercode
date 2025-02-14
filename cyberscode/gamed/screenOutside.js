const screenOutside = {
	//外屏状态切换到可交互状态
	toInterface() {
		let opInfo = {
			opId: "start",
			opType: "screenInterface",
			screenInterface: {
				model: "interface"
			}
		};
		gameFuncs.op(opInfo)
	},
	//外屏全屏倒计时。title为标题，字符串格式。countnum为倒计时长。
	outsideStartCount(title, countnum) {
		usersInfos.UseLife = 0; //消耗几条生命
		usersInfos.LeftLife = 0; //剩余几条生命
		usersInfos.SaveTime = 0; //节省时间（提前结束游戏节省的时间，毫秒值）
		usersInfos.ValidTrigger = 0; //有效触发次数（有效踩踏、有效发射等）
		usersInfos.ValidTarget = 0; //有效目标数量（消除数、射击击中目标数等）
		usersInfos.CompleteDegree = 0; //0-100，整关游戏的完成进度，完全通关为100
		usersInfos.SentryNum = 0; //哨兵编号，关卡内，进入第几轮用岗哨代替，也就是挑战第几个岗哨了，关卡模式岗哨就1个
		usersInfos.RetryCount = 0; //重复挑战岗哨的次数，关卡模式为0
		setIntervalCount(function (index, countnum) {
			let opInfo2 = {
				opId: "screenCountOut",
				opType: "screenInterface",
				screenInterface: {
					model: "dis_countdown",
					countInfo: {
						text: title,
						num: countnum - index
					}
				}
			};
			gameFuncs.op(opInfo2);
			if (countnum - index == 0) {
				let opInfo2 = {
					opId: "screenCountOut",
					opType: "screenInterface",
					screenInterface: {
						model: "dis_playing"
					}
				};
				gameFuncs.op(opInfo2);
			}
		}, 1000, countnum)
	},

}
