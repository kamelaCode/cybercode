const wanFaCtl_snakeCtl = {
	gameLevelCtl(mode, wanFa, level, gameIds) {
		if (mode == "levelMode") {
			wanFa_snake.gameStart(level, 1, mode, wanFa, level, gameIds)
		}

	},



	gameEndCtl(playerTargetNum, snakeTargetNum, lifePoint) {
		if (levelInfos.mode == "levelMode") {
			let finalScore = 0
			let resultChoose = "";
			if (lifePoint == 6 && playerTargetNum >= snakeTargetNum) {
				finalScore = 120;
				resultChoose = "dis_r_bigWin";
				roomFunction.playSound(false, "bigwin")
				usersInfos.Stars = 3
			}
			else if (lifePoint >= 3 && lifePoint < 6 && playerTargetNum >= snakeTargetNum) {
				resultChoose = "dis_r_youWin";
				finalScore = 100;
				roomFunction.playSound(false, "youwin")
				usersInfos.Stars = 2
			} else if (playerTargetNum < snakeTargetNum || lifePoint == 0) {
				resultChoose = "dis_r_lose";
				roomFunction.playSound(false, "lose")
				usersInfos.Stars = 0
			} else if (lifePoint < 3 && playerTargetNum >= snakeTargetNum) {
				finalScore = 60;
				resultChoose = "dis_r_pass";
				roomFunction.playSound(false, "pass")
				usersInfos.Stars = 1
			};
			screenInner.innerGameEnd(resultChoose, parseInt(finalScore))
			setTimeout(function () { screenInner.innerScore(finalScore) }, 5000);
		}
	}



}