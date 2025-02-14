const wanFaCtl_duobiCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_duobi.gameStart(level, 100, mode, wanFa, level, gameIds)
		}
	},
	gameEndCtl(gameComplete, lifePoint) {
		if (levelInfos.mode == "levelMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (nowInfos.lifePoint < 6 && nowInfos.lifePoint >= 4) {
				if (levelInfos.wanFa == "duobi--paishe") {
					finalScore += 90
				} else {
					finalScore += 80
				}
				resultChoose = "dis_r_youWin";
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (nowInfos.lifePoint == 6) {
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				if (levelInfos.wanFa == "duobi--paishe") {
					finalScore += 100
				} else {
					finalScore += 100
				}
				usersInfos.Stars = 3
			} else if (nowInfos.lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (nowInfos.lifePoint <= 3 && nowInfos.lifePoint > 0) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				if (levelInfos.wanFa == "duobi--paishe") {
					finalScore += 50
				} else {
					finalScore += 60
				}
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}