const wanFaCtl_damifengCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "challengeMode") {
			wanFa_damifeng.gameStart(level, 1, mode, wanFa, level, gameIds)
		}
	},



	gameEndCtl(gameNowId, lifePoint) {
		if (levelInfos.mode == "challengeMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let resultChoose = "";
			if (gameNowId == "damifeng001-hf") {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
				usersInfos.levelScore = 0;
			} else if (gameNowId == "damifeng002-hf" && feiji003Life == 0 && nowInfos.gameCountTime >= 0) {
				if (lifePoint == 6) {
					usersInfos.levelScore = 110;
					resultChoose = "dis_r_bigWin";
					roomFunction.playSound(false, "bigwin")
					usersInfos.Stars = 3
				} else if (lifePoint <= 6 && lifePoint > 3) {
					resultChoose = "dis_r_youWin";
					usersInfos.levelScore = 90;
					roomFunction.playSound(false, "youwin")
					usersInfos.Stars = 2
				} else if (lifePoint == 0) {
					usersInfos.levelScore = 0;
					resultChoose = "dis_r_lose";
					roomFunction.playSound(false, "lose")
					usersInfos.Stars = 0
				}
				else if (lifePoint <= 3 && lifePoint > 0) {
					usersInfos.levelScore = 70;
					resultChoose = "dis_r_pass";
					roomFunction.playSound(false, "pass")
					usersInfos.Stars = 1
				}
			} else {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
				usersInfos.levelScore = 0;
			}
			let finalScore = usersInfos.levelScore


			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}