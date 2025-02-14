const wanFaCtl_haiCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_hai.gameStart(level, 1, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl(gameComplete, lifePoint, remainder) {
		if (levelInfos.mode == "levelMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.CompleteDegree = parseInt((nowInfos.nowGame / 5) * 100);
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (lifePoint == 6 && usersInfos.levelScore >= 90) {
				finalScore += 10;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
				// fastop.allBlink4()
				// setTimeout(() => {
				// 	fastop.removeAllBlink()
				// }, 17000);
			}
			else if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore <= 250 && usersInfos.levelScore >= 60) {
				resultChoose = "dis_r_youWin";
				finalScore += 5;
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
				// fastop.allBlink3()
				// setTimeout(() => {
				// 	fastop.removeAllBlink()
				// }, 17000);
			} else if (lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
				// fastop.allBlink5()
				// setTimeout(() => {
				// 	fastop.removeAllBlink()
				// }, 17000);
			} else if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore < 50) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
				// fastop.allBlink2()
				// setTimeout(() => {
				// 	fastop.removeAllBlink()
				// }, 17000);
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}