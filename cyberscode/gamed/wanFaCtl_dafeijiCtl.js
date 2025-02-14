const wanFaCtl_dafeijiCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "challengeMode") {
			wanFa_dafeiji.gameStart(level, 1, mode, wanFa, level, gameIds)
		}
	},



	gameEndCtl(lifePoint, gameNowId) {
		if (levelInfos.mode == "challengeMode") {
			usersInfos.SaveTime = nowInfos.gameCountTime * 1000;
			usersInfos.SentryNum = 1;
			usersInfos.LeftLife = lifePoint
			let resultChoose = "";
			let finalScore = 0
			engine.log(gameNowId + "=gameNowId")
			switch (gameNowId) {
				case "dafeiji007-hf":
				case "dafeiji008-hf":
					finalScore = 20;
					resultChoose = "dis_r_lose";
					roomFunction.playSound(false, "lose")
					usersInfos.Stars = 0
					break;
				case "dafeiji001-hf":
				case "dafeiji002-hf":
					finalScore = 40;
					resultChoose = "dis_r_pass";
					roomFunction.playSound(false, "pass")
					usersInfos.Stars = 1
					break;
				case "dafeiji003-hf":
				case "dafeiji004-hf":
					finalScore = 70;
					resultChoose = "dis_r_youWin";
					roomFunction.playSound(false, "youwin")
					usersInfos.Stars = 2
					break;
				case "dafeiji005-hf":
				case "dafeiji006-hf":
					finalScore = 100;
					resultChoose = "dis_r_bigWin";
					roomFunction.playSound(false, "bigwin")
					usersInfos.Stars = 3
					break;
			}

			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}