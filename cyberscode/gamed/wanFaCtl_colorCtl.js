const wanFaCtl_colorCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_color.gameStart(level, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl(levelScore, lifePoint) {
		usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
		usersInfos.CompleteDegree = parseInt((lunNum / 10) * 100);
		usersInfos.SentryNum = 1;
		usersInfos.LeftLife = nowInfos.lifePoint
		let resultChoose = "";
		let finalScore = lifePoint * 1 + usersInfos.levelScore
		if (nowInfos.lifePoint == 6 && usersInfos.levelScore == 100) {
			finalScore += 10;
			resultChoose = "dis_r_bigWin";
			roomFunction.playSound(false, "bigwin")
			usersInfos.Stars = 3
		}
		else if (nowInfos.lifePoint <= 6 && nowInfos.lifePoint > 0 && usersInfos.levelScore <= 100 && usersInfos.levelScore >= 70) {
			finalScore += 5;
			resultChoose = "dis_r_youWin";
			roomFunction.playSound(false, "youwin")
			usersInfos.Stars = 2
		} else if (nowInfos.lifePoint == 0) {
			resultChoose = "dis_r_lose";
			roomFunction.playSound(false, "lose")
			usersInfos.Stars = 0
		} else if (nowInfos.lifePoint <= 6 && nowInfos.lifePoint > 0 && usersInfos.levelScore < 70) {
			resultChoose = "dis_r_pass";
			roomFunction.playSound(false, "pass")
			usersInfos.Stars = 1
		};
		screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
		setTimeout(function () { screenInner.innerScore(finalScore) }, 5000);
	}


}