const wanFaCtl_tiaofangziCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_tiaofangzi.gameStart(level, 1, mode, wanFa, level, gameIds)
		}
	},



	gameEndCtl() {
		if (levelInfos.mode == "levelMode") {
			usersInfos.SaveTime = mutourenInfos.allTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (nowInfos.lifePoint < 6 && nowInfos.lifePoint > 0 && usersInfos.levelScore <= (usersInfos.usersResult.length * 20) && usersInfos.levelScore >= (usersInfos.usersResult.length * 10)) {
				resultChoose = "dis_r_youWin";
				finalScore += 5;
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (nowInfos.lifePoint == 6 && usersInfos.levelScore >= (usersInfos.usersResult.length * 20)) {
				finalScore += 10;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
			} else if (nowInfos.lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (nowInfos.lifePoint <= 6 && nowInfos.lifePoint > 0 && usersInfos.levelScore < (usersInfos.usersResult.length * 10)) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(parseInt(finalScore)) }, 5000);
		}
	}



}