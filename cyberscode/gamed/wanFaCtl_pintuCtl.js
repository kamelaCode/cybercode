const wanFaCtl_pintuCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_pintu.gameStart(level, 1, mode, wanFa, level, gameIds)
		}
	},




	gameEndCtl() {
		if (levelInfos.mode == "levelMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let finalScore = pintuInfos.gameNums * 30
			let resultChoose = "";
			if (nowInfos.lifePoint == 6 && pintuInfos.gameNums >= 4) {
				finalScore += 10;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
			}
			else if (nowInfos.lifePoint <= 6 && nowInfos.lifePoint > 0 && usersInfos.levelScore >= 2) {
				resultChoose = "dis_r_youWin";
				finalScore += 5;
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (nowInfos.lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (nowInfos.lifePoint <= 6 && nowInfos.lifePoint > 0 && usersInfos.levelScore < 2) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}