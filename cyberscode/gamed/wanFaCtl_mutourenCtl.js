const wanFaCtl_mutourenCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_mutouren.gameStart(level, 1)
		}
	},
	gameEndCtl(allTarget, lifePoint, time) {
		if (levelInfos.mode == "levelMode") {
			usersInfos.SaveTime = mutourenInfos.allTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = nowInfos.lifePoint
			let finalScore = allTarget + parseInt(time / 10)
			let resultChoose = "";
			if (lifePoint < 6 && lifePoint > 0 && allTarget <= (usersInfos.usersResult.length * 50) && allTarget >= (usersInfos.usersResult.length * 25)) {
				resultChoose = "dis_r_youWin";
				finalScore += 5;
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (lifePoint == 6 && allTarget >= (usersInfos.usersResult.length * 50)) {
				finalScore += 10;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
			} else if (lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (lifePoint < 6 && lifePoint > 0 && allTarget < (usersInfos.usersResult.length * 25)) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(parseInt(finalScore)) }, 5000);
		}
	}


}