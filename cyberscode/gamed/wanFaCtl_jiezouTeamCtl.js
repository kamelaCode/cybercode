const wanFaCtl_jiezouTeamCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			// wanFa_jiezou.gameStart(level, 1, mode, wanFa, level, gameIds)
			wanFa_jiezouTeam.gameStart(level, 1, mode, wanFa, level, gameIds)
		}
	},



	gameEndCtl(gameNowId, lifePoint) {
		if (levelInfos.mode == "levelMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let resultChoose = "";
			resultChoose = "dis_r_lose";
			roomFunction.playSound(false, "lose")
			usersInfos.Stars = 0
			usersInfos.levelScore = 0;
			let finalScore = usersInfos.levelScore
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}