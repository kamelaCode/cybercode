const wanFaCtl_tankeCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_tanke.gameStart(level, 1, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl(gameComplete, lifePoint, remainder) {
		if (levelInfos.mode == "levelMode") {
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (lifePoint == 6 && usersInfos.levelScore == 150) {
				finalScore += 10;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
			}
			 else if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore <=150 && usersInfos.levelScore>=70 ) {
				resultChoose = "dis_r_youWin";
				finalScore += 5;
				roomFunction.playSound(false, "youwin")
			}  else if (lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
			} else if (lifePoint <= 6 && lifePoint > 0 && usersInfos.levelScore < 70) {
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
			};
			screenInner.innerGameEnd(resultChoose,parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 5000);
		}
	}



}