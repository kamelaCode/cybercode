const wanFaCtl_haiPaiCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "competMode") {
			wanFa_haiPai.gameStart(level, 1, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl(guole) {
		if (levelInfos.mode == "competMode") {
			let finalScore = usersInfos.levelScore
			let resultChoose = "";
			if (guole == 10) {
				finalScore == 130
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
			}
			else if (guole < 10 && guole > 4) {
				resultChoose = "dis_r_youWin";
				finalScore == 100
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (guole == 0) {
				finalScore == 0
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (guole <= 4) {
				finalScore == 60
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 4000);
		}
	}



}