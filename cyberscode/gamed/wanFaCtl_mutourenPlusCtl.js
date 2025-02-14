const wanFaCtl_mutourenPlusCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_mutourenPlus.gameStart(level, 1)
		}


	},

	gameEndCtl(lifePoint) {
		if (levelInfos.mode == "levelMode") {
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore >= 80 && usersInfos.levelScore < 120) {
				resultChoose = "dis_r_youWin";
				finalScore += 5;
				roomFunction.playSound(false, "youwin")
			} else if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore == 120) {
				finalScore += 10;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
			} else if (lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
			} else if (lifePoint <= 6 && lifePoint >= 0 && usersInfos.levelScore <= 80) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(parseInt(finalScore)) }, 5000);
		}
	}


}