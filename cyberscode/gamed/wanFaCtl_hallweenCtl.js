const wanFaCtl_hallweenCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_hallween.gameStart(level, 1, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl(gameComplete, lifePoint, remainder) {
		let finalScore = 0
		let resultChoose = "";
		resultChoose = "dis_r_youWin";
		roomFunction.playSound(false, "youwin")
		usersInfos.Stars = 2
		screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
		setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);

	}



}