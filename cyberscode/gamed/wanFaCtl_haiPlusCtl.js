const wanFaCtl_haiPlusCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "challengeMode") {
			wanFa_haiPlus.gameStart(level, 1, mode, wanFa, level, gameIds)
		}

	},




	gameEndCtl(levelScore) {
		if (levelInfos.mode == "challengeMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.CompleteDegree = parseInt((guole / 10) * 100);
			usersInfos.SentryNum = (guole + 1);
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (levelScore >= 150) {
				finalScore == usersInfos.levelScore
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
			}
			else if (levelScore < 150 && levelScore > 50) {
				resultChoose = "dis_r_youWin";
				finalScore == usersInfos.levelScore
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (levelScore == 0) {
				finalScore == usersInfos.levelScore
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (levelScore < 50) {
				finalScore == usersInfos.levelScore
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}