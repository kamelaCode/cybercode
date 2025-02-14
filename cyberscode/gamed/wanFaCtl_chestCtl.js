const wanFaCtl_chestCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_chest.gameStart(level, 2, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl(gameComplete, lifePoint, remainder) {
		if (levelInfos.mode == "levelMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (lifePoint == 6 && usersInfos.levelScore == 120) {
				finalScore += 10;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
			}
			else if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore <= 120 && usersInfos.levelScore >= 80) {
				resultChoose = "dis_r_youWin";
				finalScore += 5;
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore < 80) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 5000);
		}
	}



}