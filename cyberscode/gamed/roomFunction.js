const roomFunction = {
	//播放音乐、音效。loopCtl值为true/false，用于开启/关闭循环。music值为音乐文件名称，字符串格式（不需要.mp3后缀）
	playSound(loopCtl, music, sClass) {
		//let time = new Date().getTime()
		let opInfo = {
			opId: "PlaySound" + music,
			opType: "audioPlay",
			src: "sound/" + music + ".mp3",
			sClass: sClass == "" ? "speak" : sClass,
			loop: loopCtl
		}
		gameFuncs.op(opInfo);
	},
	//播放反馈带时间戳让音乐叠加
	playSoundTivite(loopCtl, music, sClass) {
		let time = new Date().getTime()
		// engine.log(time + "time")
		let opInfo = {
			opId: "playSoundTivite" + music + time,
			opType: "audioPlay",
			src: "sound/" + music + ".mp3",
			sClass: sClass == "positive" ? "positive" : "negative",
			loop: loopCtl
		}
		gameFuncs.op(opInfo);
	},

	//停止播放音乐，仅用于长时间音乐（背景音乐）。music值为音乐文件名称，字符串格式（不需要.mp3后缀）
	stopSound(music) {
		let opInfo = {
			opId: "PlaySound" + music,
			opType: "audioStop"
		}
		gameFuncs.op(opInfo);
	},

	//跳转到小游戏
	goToGameLevel(gameid, trans) {
		let opInfo = {
			opId: "gameTrans01",
			opType: "goToGameId",
			gameId: gameid,
			tran: trans
		};
		gameFuncs.op(opInfo);

	},

	goToNextGame() {
		if (levelInfos.wanFa != "haiPlusQiu" && levelInfos.wanFa != "chest" && levelInfos.wanFa != "haipro" && levelInfos.wanFa != "haiPlus" && levelInfos.wanFa != "haiWar" && levelInfos.wanFa != "haiSix" && levelInfos.wanFa != "tranPlus" && levelInfos.wanFa != "mutouren" && levelInfos.wanFa != "tranProMax" && levelInfos.wanFa != "tranProMaxAct" && levelInfos.wanFa != "haiPlusChild" && levelInfos.wanFa != "tranProMaxThree" && levelInfos.wanFa != "wujin") {
			nowInfos.target = 30;
			nowInfos.gameCountTime = 40;
		}
		usersInfos.gameScore = 0;
		engine.log("gameIdList======" + levelInfos.gameIdList)
		let tempGame = levelInfos.gameIdList.indexOf(nowInfos.nowGameid)
		engine.log("tempGame======" + tempGame)
		if (tempGame != levelInfos.gameIds.length) {
			let opInfo00 = {
				opId: "perGame000",
				opType: "perLoadGame",
				gameId: levelInfos.gameIdList[tempGame + 2]
			};
			gameFuncs.op(opInfo00);
		}

		let opInfo2 = {
			opId: "gameTrans01",
			opType: "goToGameId",
			gameId: levelInfos.gameIdList[tempGame + 1],
			tran: "none"
		};
		gameFuncs.op(opInfo2);
	},

	addCardLight() {
		for (let i = 0; i < 6; i++) {
			let opInfo = {
				opId: "addCardLight" + i,
				opType: "addNode",
				nodes: [{
					nodeId: "card" + i,
					surface: "card",
					pt: {
						x: i,
						y: 0
					},
					size: {
						w: 0,
						h: 0
					},
					anchorPt: {
						x: 0,
						y: 0
					},
					visible: "true",
					canTap: "true",
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 0,
								y: 0
							},
							rb: {
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 0,
							g: 0,
							b: 0,
							a: 1
						}
					}
				}]
			}

			gameFuncs.op(opInfo)
		}

	},
	addCoverLight() {
		for (let i = 1; i < 6; i++) {
			let opInfo = {
				opId: "addCoverLight" + i,
				opType: "addNode",
				nodes: [{
					nodeId: "cardCover" + i,
					surface: "card",
					pt: {
						x: i,
						y: 0
					},
					size: {
						w: 0,
						h: 0
					},
					anchorPt: {
						x: 0,
						y: 0
					},
					visible: "true",
					canTap: "true",
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 0,
								y: 0
							},
							rb: {
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 0,
							g: 0,
							b: 0,
							a: 1
						}
					}
				}]
			}

			gameFuncs.op(opInfo)
		}

	},
	backLightRGB(gameid) {
		if (gameid == "__system_wait") {
			var opInfo = {
				opId: "cardRGB",
				opType: "play",
				opNode: "card0",
				timeLen: 1,
				loop: "true",
				keyFrames: [{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 254,
								g: 20,
								b: 147,
								a: 1
							}
						}
					}
				},
				{
					t: 0.5,
					keyFrame: {
						shape: {
							rgba: {
								r: 0,
								g: 0,
								b: 0,
								a: 1
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: 254,
								g: 20,
								b: 147,
								a: 1
							}
						}
					}
				}
				]
			}
			gameFuncs.op(opInfo);
		} else {
			var opInfo = {
				opId: "cardRGB",
				opType: "play",
				opNode: "card0",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1
							}
						}
					}
				}]
			}

			gameFuncs.op(opInfo);
		}

	},
	addCardCenterLight() {
		let shua = [[71, 242, 198], [15, 113, 127], [0, 209, 168], [63, 139, 159], [47, 79, 121]]
		engine.log("刷卡灯动画")
		for (let i = 1; i < 6; i++) {
			let opInfo = {
				opId: "addCardCenterLight" + i,
				opType: "addNode",
				nodes: [{
					nodeId: "cardCenter" + i,
					surface: "card",
					pt: {
						x: i,
						y: 0
					},
					size: {
						w: 0,
						h: 0
					},
					anchorPt: {
						x: 0,
						y: 0
					},
					visible: "true",
					canTap: "true",
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 0,
								y: 0
							},
							rb: {
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 0,
							g: 0,
							b: 0,
							a: 1
						}
					}
				}]
			}
			gameFuncs.op(opInfo)
			setTimeout(() => {
				var opInfo222 = {
					opId: "changeCardLight" + i,
					opType: "play",
					opNode: "cardCenter" + i,
					timeLen: 2,
					loop: "true",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								shape: {
									rgba: {
										r: shua[i - 1][0],
										g: shua[i - 1][1],
										b: shua[i - 1][2],
										a: 0.4
									}
								}
							}
						},
						{
							t: 0.25,
							keyFrame: {
								shape: {
									rgba: {
										r: shua[i - 1][0],
										g: shua[i - 1][1],
										b: shua[i - 1][2],
										a: 0
									}
								}
							}
						},
						{
							t: 0.5,
							keyFrame: {
								shape: {
									rgba: {
										r: shua[i - 1][0],
										g: shua[i - 1][1],
										b: shua[i - 1][2],
										a: 0.2
									}
								}
							}
						},
						{
							t: 1,
							keyFrame: {
								shape: {
									rgba: {
										r: shua[i - 1][0],
										g: shua[i - 1][1],
										b: shua[i - 1][2],
										a: 0.4
									}
								}
							}
						}
					]
				}
				gameFuncs.op(opInfo222);
			}, 200 * i);

		}

	},

	userCardLight(count) {
		let arrRgb = [{}, { r: 216, g: 77, b: 130 }, { r: 216, g: 77, b: 130 }, { r: 216, g: 77, b: 130 }, { r: 70, g: 191, b: 229 }, { r: 64, g: 74, b: 156 }]
		let toRgb = [{}, { r: 147, g: 7, b: 60 }, { r: 147, g: 7, b: 60 }, { r: 147, g: 7, b: 60 }, { r: 0, g: 121, b: 159 }, { r: 0, g: 4, b: 86 }]
		for (let i = 1; i < 6; i++) {
			var opInfo = {
				opId: "changeCardLight" + i,
				opType: "play",
				opNode: "card" + i,
				timeLen: 3,
				loop: "true",
				keyFrames: [{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: arrRgb[i].r,
								g: arrRgb[i].g,
								b: arrRgb[i].b,
								a: 1
							}
						}
					}
				},
				{
					t: 0.5,
					keyFrame: {
						shape: {
							rgba: {
								r: toRgb[i].r,
								g: toRgb[i].g,
								b: toRgb[i].b,
								a: 1
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: arrRgb[i].r,
								g: arrRgb[i].g,
								b: arrRgb[i].b,
								a: 1
							}
						}
					}
				}
				]
			}
			gameFuncs.op(opInfo);
		}
	},

	cardLightVisible(count) {
		for (let i = 1; i < 6; i++) {

			if (count != 0) {
				var opInfo222 = {
					opId: "changeCardLightghh" + i,
					opType: "play",
					opNode: "cardCenter" + i,
					timeLen: 0.1,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								visible: false,
								canTap: false
							}
						}

					]
				}
				gameFuncs.op(opInfo222);
			}
			if (count == 0) {
				var opInfo222 = {
					opId: "changeCardLightghh" + i,
					opType: "play",
					opNode: "cardCenter" + i,
					timeLen: 0.1,
					loop: "false",
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								visible: true,
								canTap: true
							}
						}

					]
				}
				gameFuncs.op(opInfo222);
			}
			if (i <= count) {
				var opInfo = {
					opId: "changeCardLight" + i,
					opType: "play",
					opNode: "cardCover" + i,
					timeLen: 0.1,
					loop: "false",
					keyFrames: [{
						t: 0,
						keyFrame: {
							visible: false,
							canTap: false
						}
					}
					]
				}
				gameFuncs.op(opInfo);
			} else {
				var opInfo = {
					opId: "changeCardCover" + i,
					opType: "play",
					opNode: "cardCover" + i,
					timeLen: 0.1,
					loop: "false",
					keyFrames: [{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: true
						}
					}
					]
				}
				gameFuncs.op(opInfo);

			}
		}

	},
}


