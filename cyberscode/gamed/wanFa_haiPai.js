const wanFa_haiPai = {
	tmid: null,
	//游戏启动控制部分
	gameStart(difficulty, scoreC) {
		//添加监听
		engine.addEventListener("gamePlay", wanFa_haiPai.gamePlay);
		engine.addEventListener("gameTimeOver", wanFa_haiPai.gameTimeOver);
		engine.addEventListener("gameDestroy", wanFa_haiPai.gameDestroy);
		//重置全局变量
		haiPaiFuncs.resetAll()
		clearInterval(haiPaiFuncs.CountPlay.innerCount)
		nowInfos.scoreCoefficient = scoreC;
		for (let i = 0; i < levelInfos.gameIds.length; i++) {
			levelInfos.gameIdList.push(levelInfos.gameIds[i].GameId)
		}


		engine.log("!!!gameIdList!!!=" + levelInfos.gameIdList)


		//开门入场流程
		const sec = 8;
		roomFunction.playSound(false, "ding")
		screenOutside.outsideStartCount("请尽快进入房间\n游戏即将开始", sec)
		screenInner.innerStartCount("游戏即将开始", sec)
		let countTime = 0
		wanFa_haiPai.gameStart.startLoop = setInterval(() => {
			switch (countTime) {
				case 1:
					surfaceCtr.ctlDoor(1, 7000);
					break;
				case 2:
					surfaceCtr.ctlDoor(0, 7000);
					break;
				case 5:
					roomFunction.playSound(false, "gamestart");
					break;
				case 16:
					if (levelInfos.wanFa.startsWith("hai")) {
						roomFunction.goToGameLevel(levelInfos.gameIds[0].GameId, "none")
					}
					break;
				case 17:
					clearInterval(wanFa_haiPlus.gameStart.startLoop)
					break;

			}
			countTime++
		}, 500);

	},



	//游戏核心运行部分
	//游戏开始
	gamePlay(gameid) {
		if (gameid != "rainbowColor-cxx") {
			haiPaiFuncs.CountPlay();
			engine.addEventListener("gameTaped", wanFa_haiPai.gameTaped)
			engine.log("-------------------" + gameid)
			fastop.addNode("addStop", "StopRed", "a", 0, 0, 254, 254, 0)
			fastop.addNode("addStop", "StopMusic", "a", 2, 0, 254, 20, 147)

			if (levelInfos.level == 999 || levelInfos.level == 888) {
				roomFunction.playSound(true, "bgm02", "background")
				let opInfo = {
					opId: "white", //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "white",
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},
							rotation: 0,
							visible: true,
							canTap: false,
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 0,
										y: 0
									},
									rb: {
										x: 16,
										y: 50
									}
								},
								rgba: {
									r: 254,
									g: 254,
									b: 254,
									a: 0.7
								}
							},

						}
					]
				}
				gameFuncs.op(opInfo);
			}
			if (levelInfos.level == 15) {
				roomFunction.playSound(false, "hudongRelus")

			}
			if (levelInfos.level == 19) {
				roomFunction.playSound(false, "yinyueRules")
			}
			if (levelInfos.level == 16) {
				roomFunction.playSound(true, "hudongShatan", "background")
			}
			if (levelInfos.level == 25) {
				roomFunction.playSound(true, "wanshengPart2", "background")
			}
			if (levelInfos.level == 22) {
				roomFunction.playSound(true, "jiantouBgm", "background")
			}
			if (levelInfos.level == 24) {
				roomFunction.playSound(false, "facaiRules2")
				fastop.addNode("addfacai10", "facai10", "a", 11, 0, 254, 0, 0)
				fastop.addNode("addfacai20", "facai20", "a", 12, 0, 0, 0, 254)
			}
			if (levelInfos.level == 17) {
				roomFunction.playSound(false, "zhiwuRules")
				setTimeout(() => {
					roomFunction.playSound(true, "zhiwuBgm", "background")
				}, 5000);
				fastop.addNode("addFashe", "fashe", "a", 12, 0, 0, 254, 0)

			}
			if (levelInfos.level == 18) {
				roomFunction.playSound(false, "hudongDanzaiRules")
				setTimeout(() => {
					roomFunction.playSound(true, "hudongDanzai", "background")
				}, 7000);
				fastop.addNode("addqiehuan", "qiehuan", "a", 10, 0, 30, 144, 254)
				fastop.addNode("addqiehuan1", "qiehuan1", "a", 11, 0, 50, 205, 50)
				fastop.addNode("addqiehuan2", "qiehuan2", "a", 12, 0, 148, 0, 211)
				fastop.addNode("addqiehuan3", "qiehuan3", "a", 13, 0, 254, 69, 0)

			}

			if (levelInfos.level == 21) {
				roomFunction.playSound(false, "xingzuoRules")
				setTimeout(() => {
					roomFunction.playSound(true, "xingzuoBgm", "background")
				}, 5000);
				fastop.addNode("addshuiping33", "shuiping33", "a", 8, 0, 0, 0, 254)
				fastop.addNode("addshuangyu33", "shuangyu33", "a", 9, 0, 0, 254, 204)
				fastop.addNode("addbaiyang33", "baiyang33", "a", 10, 0, 254, 0, 0)
				fastop.addNode("addjuxie33", "juxie33", "a", 11, 0, 92, 138, 138)
				fastop.addNode("addshuangzi33", "shuangzi33", "a", 12, 0, 254, 215, 0)
				fastop.addNode("addtiancheng33", "tiancheng33", "a", 13, 0, 0, 254, 254)
				fastop.addNode("addsheshou33", "sheshou33", "a", 14, 0, 148, 0, 211)
				fastop.addNode("addmojie33", "mojie33", "a", 15, 0, 139, 69, 19)

			}

			if (levelInfos.level == 12) {
				roomFunction.playSound(true, "CORSAK", "background")
				haiPaiFuncs.vacancyOne()
			} else if (levelInfos.level == 13) {
				roomFunction.playSound(true, "CORSAK", "background")
				haiPaiFuncs.vacancyTwo()
			} else if (levelInfos.level == 14) {
				roomFunction.playSound(true, "CORSAK", "background")
				haiPaiFuncs.vacancyThree()
			}
			if (gameid == "hailove-lyc") {
				roomFunction.playSound(true, "loveBgm", "background")
			}
			if (gameid == "haiColor66666-cxx") {
				roomFunction.playSound(true, "CORSAK", "background")
			}
			if (levelInfos.level == 9) {
				let arrsf = [2, 34, 2, 35, 2, 36, 2, 37, 2, 40, 3, 34, 3, 37, 3, 40, 4, 34, 4, 37, 4, 40, 5, 34, 5, 37, 5, 40, 6, 38, 6, 39, 10, 37, 10, 40, 11, 37, 11, 40, 12, 37, 12, 40, 13, 34, 13, 35, 13, 36, 13, 37, 13, 38, 13, 39, 13, 40]
				let arr2024 = [2, 13, 2, 21, 2, 22, 2, 23, 2, 24, 2, 25, 2, 26, 2, 27, 2, 28, 3, 13, 3, 21, 3, 28, 4, 9, 4, 10, 4, 11, 4, 12, 4, 13, 4, 14, 4, 15, 4, 16, 4, 21, 4, 28, 5, 13, 5, 21, 5, 28, 6, 13, 6, 14, 6, 15, 6, 16, 6, 21, 6, 22, 6, 23, 6, 24, 6, 25, 6, 26, 6, 27, 6, 28, 10, 9, 10, 13, 10, 14, 10, 15, 10, 16, 10, 21, 10, 25, 10, 26, 10, 27, 10, 28, 11, 9, 11, 13, 11, 16, 11, 21, 11, 25, 11, 28, 12, 9, 12, 13, 12, 16, 12, 21, 12, 25, 12, 28, 13, 9, 13, 10, 13, 11, 13, 12, 13, 13, 13, 16, 13, 21, 13, 22, 13, 23, 13, 24, 13, 25, 13, 28]
				for (let i = 0; i < arrsf.length; i += 2) {
					fastop.addNode("arrsf" + i, "arrsf" + i, "b", arrsf[i], arrsf[i + 1], 30, 144, 254)
				}
				for (let i = 0; i < arr2024.length; i += 2) {
					fastop.addNode("arr2024" + i, "arr2024" + i, "b", arr2024[i], arr2024[i + 1], arr2024[i + 1] > 18 ? 254 : 50, arr2024[i + 1] > 18 ? 215 : 205, arr2024[i + 1] > 18 ? 0 : 50)
				}
			}
			if (levelInfos.level == 10) {
				let opInfo = {
					opId: "adddimian",
					opType: "addNode",
					opNode: "",
					nodes: [{
						nodeId: "dimian",
						surface: "b",
						pt: {
							x: 0,
							y: 0,
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0,
								},
								rb: {
									x: 16,
									y: 42,
								}
							},
							rgba: {
								r: 127,
								g: 254,
								b: 254,
								a: 1
							}
						}
					}]
				}
				gameFuncs.op(opInfo)
				let arrSJTU = [0, 36, 0, 37, 0, 38, 0, 39, 0, 40, 1, 36, 2, 36, 2, 37, 2, 38, 2, 39, 2, 40, 4, 40, 5, 36, 5, 37, 5, 38, 5, 39, 5, 40, 6, 40, 9, 36, 9, 37, 9, 38, 9, 39, 9, 40, 10, 36, 11, 36, 11, 37, 13, 36, 13, 37, 13, 38, 13, 40, 14, 36, 14, 38, 14, 40, 15, 36, 15, 38, 15, 39, 15, 40]
				for (let i = 0; i < arrSJTU.length; i += 2) {
					fastop.addNode("arrSJTU" + i, "arrSJTU" + i, "b", arrSJTU[i], arrSJTU[i + 1], 254, 153, 153)
				}


			}
			if (levelInfos.level == 6 || levelInfos.level == 7) {
				roomFunction.playSound(true, "loveBgm", "background")
			}
			if (gameid == "haiwansheng-cxx") {
				roomFunction.playSound(true, "wansheng", "background")
			}
			if (gameid == "hainewyear-hf") {
				roomFunction.playSound(true, "bgm2024", "background")
				let arrAH22 = [5, 3, 5, 4, 5, 5, 5, 6, 5, 33, 5, 35, 5, 36, 5, 37, 6, 5, 6, 7, 6, 33, 6, 35, 6, 37, 7, 3, 7, 4, 7, 5, 7, 6, 7, 33, 7, 34, 7, 35, 7, 37, 11, 33, 11, 35, 11, 36, 11, 37, 12, 17, 12, 18, 12, 19, 12, 20, 12, 21, 12, 33, 12, 35, 12, 37, 13, 19, 13, 33, 13, 34, 13, 35, 13, 37, 14, 19, 15, 17, 15, 18, 15, 19, 15, 20, 15, 21]
				for (let i = 0; i < arrAH22.length; i += 2) {
					fastop.addNode("arrAH22" + i, "arrAH22" + i, "b", arrAH22[i], (arrAH22[i + 1] + (arrAH22[i + 1] > 31 ? 2 : 6)), 254, 0, 0)
				}
				let arrAPY0 = [3, 19, 3, 20, 3, 21, 4, 19, 4, 21, 5, 17, 5, 18, 5, 19, 5, 20, 5, 21, 8, 33, 8, 34, 8, 35, 8, 36, 8, 37, 9, 17, 9, 18, 9, 19, 9, 20, 9, 33, 9, 37, 10, 19, 10, 21, 10, 33, 10, 34, 10, 35, 10, 36, 10, 37, 11, 17, 11, 18, 11, 19, 11, 20, 13, 6, 13, 7, 14, 3, 14, 4, 14, 5, 15, 6, 15, 7]
				for (let i = 0; i < arrAPY0.length; i += 2) {
					fastop.addNode("arrAPY0" + i, "arrAPY0" + i, "b", arrAPY0[i], (arrAPY0[i + 1] + (arrAPY0[i + 1] > 31 ? 2 : 6)), 254, 215, 0)
				}
				let arrNR4 = [1, 3, 1, 5, 1, 6, 1, 7, 2, 4, 2, 5, 2, 7, 2, 33, 2, 34, 2, 35, 2, 36, 2, 37, 3, 3, 3, 4, 3, 5, 3, 6, 3, 7, 3, 35, 4, 35, 4, 36, 4, 37, 11, 10, 11, 11, 11, 12, 11, 13, 11, 14, 12, 12, 13, 13, 14, 10, 14, 11, 14, 12, 14, 13, 14, 14]
				for (let i = 0; i < arrNR4.length; i += 2) {
					fastop.addNode("arrNR4" + i, "arrNR4" + i, "b", arrNR4[i], (arrNR4[i + 1] + (arrNR4[i + 1] > 31 ? 2 : 6)), 254, 69, 0)
				}
				let arrPYW = [0, 20, 0, 21, 1, 11, 1, 12, 1, 13, 1, 14, 1, 17, 1, 18, 1, 19, 2, 10, 2, 11, 2, 20, 2, 21, 3, 11, 3, 12, 3, 13, 4, 10, 4, 11, 5, 11, 5, 12, 5, 13, 5, 14, 6, 19, 6, 20, 6, 21, 7, 19, 7, 21, 8, 17, 8, 18, 8, 19, 8, 20, 8, 21]
				for (let i = 0; i < arrPYW.length; i += 2) {
					fastop.addNode("arrPYW" + i, "arrPYW" + i, "b", arrPYW[i], (arrPYW[i + 1] + (arrPYW[i + 1] > 31 ? 2 : 6)), 148, 0, 211)
				}
				let arrEW = [7, 10, 7, 12, 7, 14, 8, 10, 8, 12, 8, 14, 9, 3, 9, 5, 9, 7, 9, 10, 9, 11, 9, 12, 9, 13, 9, 14, 10, 3, 10, 5, 10, 7, 11, 3, 11, 4, 11, 5, 11, 6, 11, 7]
				for (let i = 0; i < arrEW.length; i += 2) {
					fastop.addNode("arrEW" + i, "arrEW" + i, "b", arrEW[i], (arrEW[i + 1] + (arrEW[i + 1] > 31 ? 2 : 6)), 0, 0, 254)
				}



			}
			if (gameid == "haisrkl-hf") {
				roomFunction.playSound(true, "happil", "background")
			}
			if (gameid == "haisrkl-JA-cxx") {
				roomFunction.playSound(true, "happil", "background")
			}
			if (gameid == "haisrkl002-hf") {
				roomFunction.playSound(true, "happil", "background")
				let FAiry = [0, 24, 0, 25, 0, 26, 0, 27, 0, 28, 0, 29, 1, 24, 1, 27, 2, 25, 2, 27, 2, 28, 2, 29, 4, 27, 5, 24, 5, 25, 5, 26, 5, 27, 7, 24, 7, 25, 7, 26, 7, 28, 9, 24, 9, 25, 9, 26, 9, 27, 10, 26, 10, 28, 11, 24, 11, 25, 11, 26, 11, 27, 13, 28, 13, 30, 14, 28, 14, 30, 15, 24, 15, 25, 15, 26, 15, 27, 15, 28, 15, 29, 15, 30]
				for (let i = 0; i < FAiry.length; i += 2) {
					fastop.addNode("FAiry" + i, "FAiry" + i, "b", FAiry[i], FAiry[i + 1], 0, 180, 244)
				}
			}
			if (gameid == "haisrkl004-hf") {
				roomFunction.playSound(true, "teethBgm", "background")
			}
			if (gameid == "haiwanshengdingzhi-cxx") {
				roomFunction.playSound(true, "wansheng", "background")
				let ic = [6, 23, 6, 24, 6, 25, 6, 26, 6, 27, 5, 22, 5, 28, 4, 22, 4, 28, 10, 22, 10, 28, 11, 22, 11, 23, 11, 24, 11, 25, 11, 26, 11, 27, 11, 28, 12, 22, 12, 28]
				let ic2023 = [0, 13, 0, 14, 0, 16, 0, 17, 1, 12, 1, 15, 1, 18, 2, 12, 2, 18, 4, 12, 4, 15, 4, 16, 4, 17, 5, 12, 5, 14, 5, 18, 6, 12, 6, 13, 6, 18, 8, 13, 8, 14, 8, 15, 8, 16, 8, 17, 9, 12, 9, 18, 10, 12, 10, 18, 11, 13, 11, 14, 11, 15, 11, 16, 11, 17, 13, 12, 13, 15, 13, 16, 13, 17, 14, 12, 14, 14, 14, 18, 15, 12, 15, 13, 15, 18]
				for (let i = 0; i < ic.length; i += 2) {
					fastop.addNode("ic" + i, "ic" + i, "b", ic[i], ic[i + 1], 254, 0, 139)
				}
				for (let j = 200; j < (200 + ic2023.length); j += 2) {
					fastop.addNode("ic" + j, "ic" + j, "b", ic2023[j - 200], ic2023[j + 1 - 200], 254, 0, 20)
				}
			}
			//互动烟花
			if (levelInfos.level == 20) {
				fastop.addNode("fang", "fang", "a", 9, 0, 0, 254, 254)
				let xArr = [-2, -1, 0, 1]
				for (let i = 0; i < 4; i++) {
					let opInfo = {
						opId: "addfather" + xArr[i], //操作id 再控制用
						opType: "addNode", // 操作类型，添加一个节点或精灵
						opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
						nodes: [
							{
								nodeId: "father" + xArr[i], // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: true,
								visible: true, //显示，如果为false，逻辑数据会跳过
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
									rgba: { r: 254, g: 254, b: 254, a: 0 }
								},
							}
						]
					}
					gameFuncs.op(opInfo);
				}
				let yinxian = [1, 9, 2, 9, 3, 9, 4, 9]
				for (let j = 0; j < yinxian.length; j += 2) {
					fastop.addNode("yinxian" + j, "yinxian" + j, "b", yinxian[j], yinxian[j + 1] - 5, 139, 69, 19)
				}
				let opInfo = {
					opId: "addFire", //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "fire", // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: -1, y: -1 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [{
								nodeId: "FireTwo", // 节点id，定位用
								surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
								// node参数
								pt: { x: 4, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
								rotation: 0, // 角度
								nodes: [], // 子节点
								canTap: false,
								visible: true, //显示，如果为false，逻辑数据会跳过
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
									rgba: { r: 254, g: 0, b: 0, a: 1 }
								},
							}], // 子节点
							canTap: false,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								type: "rect",
								rect: {
									lt: {
										x: 0,
										y: 0
									},
									rb: {
										x: 3,
										y: 0
									}
								},
								rgba: { r: 0, g: 0, b: 0, a: 1 }
							},
						}
					]
				}
				gameFuncs.op(opInfo);
				let hezi = [4, 14, 4, 15, 5, 7, 5, 8, 5, 9, 5, 10, 5, 11, 5, 12, 5, 13, 5, 14, 5, 15, 6, 7, 6, 8, 6, 9, 6, 10, 6, 11, 6, 12, 6, 13, 6, 14, 6, 15, 7, 7, 7, 8, 7, 9, 7, 10, 7, 11, 7, 12, 7, 13, 7, 14, 7, 15, 8, 7, 8, 8, 8, 9, 8, 10, 8, 11, 8, 12, 8, 13, 8, 14, 8, 15, 9, 7, 9, 8, 9, 9, 9, 10, 9, 11, 9, 12, 9, 13, 9, 14, 9, 15, 10, 7, 10, 8, 10, 9, 10, 10, 10, 11, 10, 12, 10, 13, 10, 14, 10, 15, 11, 14, 11, 15]
				for (let j = 0; j < hezi.length; j += 2) {
					fastop.addNode("hezi" + j, "hezi" + j, "b", hezi[j], hezi[j + 1] - 5, 254, 0, 0)
				}
				let lanhezi = [6, 14, 6, 15, 9, 14, 9, 15, 7, 15, 8, 15, 7, 7, 7, 8, 7, 9, 7, 10, 7, 11, 7, 12, 7, 13, 7, 14, 8, 7, 8, 8, 8, 9, 8, 10, 8, 11, 8, 12, 8, 13, 8, 14]
				for (let j = 0; j < lanhezi.length; j += 2) {
					fastop.addNode("lanhezi" + j, "lanhezi" + j, "b", lanhezi[j], lanhezi[j + 1] - 5, 30, 144, 254)
				}
				// let yanhua1 = [8, 1, 8, 2, 8, 3]
				// let yanhua2 = [8, 3, 0, 0, 0, 0]
				// let yanhua3 = [7, 3, 8, 2, 8, 4, 9, 3]
				// let yanhua4 = [5, 3, 6, 2, 6, 4, 7, 1, 7, 5, 8, 2, 8, 4, 9, 3]
				// let yanhua5 = [5, 3, 6, 1, 6, 2, 6, 4, 6, 5, 7, 1, 7, 5, 8, 0, 8, 6, 9, 1, 9, 5, 10, 1, 10, 2, 10, 4, 10, 5, 11, 3]
				// let yanhua6 = [0, 5, 1, 2, 1, 4, 1, 6, 1, 8, 3, 1, 3, 9, 4, 0, 4, 10, 5, 1, 5, 9, 7, 2, 7, 4, 7, 6, 7, 8, 8, 5, 0, 0, 0, 0]
				// let yanhua7 = [0, 4, 1, 0, 1, 5, 1, 8, 6, 0, 6, 10, 11, 1, 11, 5, 11, 8, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
				// let yanhua8 = [0, 4, 1, 0, 1, 8, 6, 0, 6, 10, 11, 1, 11, 8, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}

		}

	},



	//玩家触摸
	gameTaped(face, x, y, onOff, nodeId, event) {
		haiPaiFuncs.gameEndControl(face, x, y, onOff, nodeId, event)
		engine.log("JS face=" + face + ",x=" + x + ",y=" + y + ",onOff=" + onOff + " nodeId=" + nodeId + "event=" +
			event + "被触碰了")

		if (levelInfos.level == 18) {
			haiPaiFuncs.hudongDanzaiTap(face, x, y, onOff, nodeId, event)
		}
		if (levelInfos.level == 19) {
			haiPaiFuncs.hudongYinyueTap(face, x, y, onOff, nodeId, event)
		}
		if (levelInfos.level == 21) {
			haiPaiFuncs.hudongXingzuoTap(face, x, y, onOff, nodeId, event)
		}

		if (nodeId == "p1" || nodeId == "p1.p2" && onOff == true) {
			haiPaiFuncs.hudongTap(face, x, y, onOff, nodeId, event)
		}
		if (nodeId == "facai10" || nodeId == "facai20" && onOff == true) {
			haiPaiFuncs.hudongFacaiTap(face, x, y, onOff, nodeId, event)
		}
		if (nodeId == "fashe" && onOff == true) {
			haiPaiFuncs.hudongZhiwuTap(face, x, y, onOff, nodeId, event)
		}

		if (face == "a" && onOff == true && nodeId == "StopMusic") {
			let str = gameFuncs.playingAudioIds()
			let arr = JSON.parse(str)
			let soundName = arr?.map(item => item.slice(item.indexOf('d') + 1))
			engine.log(arr)
			engine.log(soundName)
			soundName?.map(item => {
				roomFunction.stopSound(item)
			})
		}

		if (levelInfos.level == 11 && nodeId == "huan" && onOff == false) {
			switch (huan) {
				case 0:
					huan++
					fastop.setNodeVisible("awa", "loong", 0.1, true, true, false, false)
					break;
				case 1:
					huan++
					fastop.setNodeVisible("awa", "loong", 0.1, false, false, true, true)
					fastop.setNodeVisible("awa", "loong2", 0.1, true, true, false, false)
					break;
				case 2:
					huan = 0
					fastop.setNodeVisible("awa", "loong2", 0.1, false, false, true, true)
					break;


			}
		}
		// if (levelInfos.level == 10 && nodeId == "huan") {
		// 	fastop.removeNode("color001")
		// 	haiPaiFuncs.addColor003()
		// }
		// if (levelInfos.level == 10 && nodeId == "huan002") {
		// 	fastop.removeNode("color002")
		// 	haiPaiFuncs.addColor002()
		// }
		if ((levelInfos.level == 999 || levelInfos.level == 888) && face == "b") {
			haiPaiFuncs.tapSite(face, x, y, onOff, nodeId, event)
		}
		if (x == 23 && y == 0 && onOff == true && levelInfos.level == 999 && face == "a") {
			haiPaiFuncs.tapSiteArr()
		}
		if (x == 22 && y == 0 && onOff == true && levelInfos.level == 999 && face == "a") {
			let opInfo = {
				opId: "white", //操作id 再控制用
				opType: "addNode", // 操作类型，添加一个节点或精灵
				opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
				nodes: [
					{
						nodeId: "white",
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						rotation: 0,
						visible: true,
						canTap: false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 16,
									y: 50
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 0.7
							}
						},

					}
				]
			}
			gameFuncs.op(opInfo);
		}
		if (levelInfos.level == 7 && nodeId == "change" && onOff == false && buyao == 0) {
			buyao = 1
			setTimeout(() => {
				buyao = 0
			}, 2000);
			switch (nowcolor) {
				case 0:
					nowcolor = 1
					fastop.changeNodeColor("awa4", "dise", 0.1, colorone, colortwo)
					fastop.changeNodeColor("awa3", "dise2", 0.1, colorone, colortwo)
					break;
				case 1:
					nowcolor = 2
					fastop.changeNodeColor("awa2", "dise", 0.1, colortwo, colorthr)
					fastop.changeNodeColor("awa1", "dise2", 0.1, colortwo, colorthr)
					break;
				case 2:
					nowcolor = 0
					fastop.changeNodeColor("awa5", "dise", 0.1, colorthr, colorone)
					fastop.changeNodeColor("awa6", "dise2", 0.1, colorthr, colorone)
					break;
			}
		}
		if (levelInfos.level == 6 && nodeId == "change" && onOff == false && buyao == 0) {
			buyao = 1
			setTimeout(() => {
				buyao = 0
			}, 2000);
			switch (nowcolor) {
				case 0:
					nowcolor = 1
					fastop.changeNodeColor("psh", "psh.psh1", 0.1, colorFour, colorFive)
					fastop.changeNodeColor("psh", "psh2.psh3", 0.1, colorFour, colorFive)
					fastop.changeNodeColor("awa4", "dise", 0.1, colorone, colortwo)
					fastop.changeNodeColor("awa3", "dise2", 0.1, colorone, colortwo)
					break;
				case 1:
					nowcolor = 2
					fastop.changeNodeColor("psh", "psh.psh1", 0.1, colorFive, colorSix)
					fastop.changeNodeColor("psh", "psh2.psh3", 0.1, colorFive, colorSix)
					fastop.changeNodeColor("awa2", "dise", 0.1, colortwo, colorthr)
					fastop.changeNodeColor("awa1", "dise2", 0.1, colortwo, colorthr)
					break;
				case 2:
					nowcolor = 0
					fastop.changeNodeColor("psh", "psh.psh1", 0.1, colorSix, colorFour)
					fastop.changeNodeColor("psh", "psh2.psh3", 0.1, colorSix, colorFour)
					fastop.changeNodeColor("awa5", "dise", 0.1, colorthr, colorone)
					fastop.changeNodeColor("awa6", "dise2", 0.1, colorthr, colorone)
					break;
			}
		}
		if (levelInfos.level == 6 && nodeId == "pshTap" && onOff == false && noTap == 0) {
			noTap = 1
			setTimeout(() => {
				noTap = 0
			}, 2000);
			switch (nowAdress) {
				case 0:
					nowAdress = 1
					fastop.xingzuoLook("pshPlay", "psh.psh1", false, false)
					fastop.xingzuoLook("pshPlay2", "psh2.psh3", true, true)
					break;
				case 1:
					nowAdress = 0
					fastop.xingzuoLook("pshPlay", "psh.psh1", true, true)
					fastop.xingzuoLook("pshPlay2", "psh2.psh3", false, false)
					break;
			}
		}
		if (levelInfos.level == 20 && face == "a" && x == 9 && onOff == true && hudong == 0) {
			hudong = 1
			engine.log("开始烟花变化")
			let opInfo = {
				opId: "firePlay",
				opType: "play",
				opNode: "fire",
				timeLen: 4,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: false,
							pt: {
								x: -3,
								y: 4
							}
						},
					},
					{
						t: 1,
						keyFrame: {
							surface: "b",
							visible: true,
							canTap: false,
							pt: {
								x: 1,
								y: 4
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo);
			roomFunction.playSound(false, "yinxian", "background")
			setTimeout(() => {
				let yanhuaAllArr = {
					yanhua0: [8, 1, 8, 2, 8, 3],
					yanhua2: [8, 3, 0, 0, 0, 0],
					yanhua4: [7, 3, 8, 2, 8, 4, 9, 3],
					yanhua6: [6, 3, 7, 2, 7, 4, 8, 1, 8, 5, 9, 2, 9, 4, 10, 3],
					yanhua8: [5, 3, 6, 1, 6, 2, 6, 4, 6, 5, 7, 1, 7, 5, 8, 0, 8, 6, 9, 1, 9, 5, 10, 1, 10, 2, 10, 4, 10, 5, 11, 3],
					yanhua10: [4, 4, 5, 1, 5, 3, 5, 5, 5, 7, 7, 1, 7, 7, 8, 0, 8, 8, 9, 1, 9, 7, 11, 1, 11, 3, 11, 5, 11, 7, 12, 4, 0, 0, 0, 0],
					yanhua12: [0, 4, 1, 0, 1, 5, 1, 8, 6, 0, 6, 10, 11, 1, 11, 5, 11, 8, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
					yanhua14: [0, 4, 1, 0, 1, 8, 6, 0, 6, 10, 11, 1, 11, 8, 12, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				}
				let count = 0
				let shenQianArr = [1, 1, 1, 1, 1, 1, 1, 1, 0.6, 1, 0.3, 1, 0.1, 1]
				let xArr = [0, -2, 1, -1]
				let rgb = [{ r: 254, g: 20, b: 147 }, { r: 254, g: 69, b: 0 }, { r: 148, g: 0, b: 211 }, { r: 254, g: 215, b: 0 }]
				let i = 0
				let hh = setInterval(() => {
					if (i <= 18) {
						roomFunction.playSoundTivite(false, "yanhuayinxiao", "positive");
					}
					haiPaiFuncs.yanhuaTap(face, xArr[i % 4], y, onOff, nodeId, event, count, yanhuaAllArr, shenQianArr, rgb[i % 4])
					i++
					if (i == 20 || levelInfos.gameIdList.length == 0) {
						let opInfo = {
							opId: "firePlay",
							opType: "play",
							opNode: "fire",
							timeLen: 0.1,
							loop: false,
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										surface: "b",
										visible: true,
										canTap: false,
										pt: {
											x: -10,
											y: 4
										}
									},
								},
								{
									t: 1,
									keyFrame: {
										surface: "b",
										visible: true,
										canTap: false,
										pt: {
											x: -10,
											y: 4
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo);
						hudong = 0
						clearInterval(hh)
						return
					}
				}, 1000);
				// setTimeout(() => {
				// 	let hh = setInterval(() => {
				// 		haiPaiFuncs.yanhuaTap(face, xArr[i % 4], y, onOff, nodeId, event, count, yanhuaAllArr, shenQianArr, rgb[i % 4])
				// 		i++
				// 		if (i == 10 || levelInfos.gameIdList.length == 0) {
				// 			clearInterval(hh)
				// 			return
				// 		}
				// 	}, 2000);
				// }, 1000);
			}, 3500);

		}
	},



	//游戏销毁
	gameDestroy(gameid) {
		engine.log("xxxxxxxx-gameDestroy-leaveVariableCtl-" + gameid)
		clearInterval(haiPaiFuncs.CountPlay.innerCount)
		clearInterval(wanFa_haiPai.gamePlay.haipro)
	},



	//游戏时间结束
	gameTimeOver(gameid) {
		engine.log("xxxxxxxx-gameTimeOver-leaveVariableCtl-" + gameid)

	},



	//游戏关卡结束
	gameLevelEnd() {
		engine.log("xxxxxxxx-gameLevelEnd-xxxxxxxx")
		clearInterval(haiPaiFuncs.CountPlay.innerCount)
		clearTimeout(haiPaiFuncs.hudongFacaiTap.facaiSet)
		roomFunction.stopSound("loveBgm")
		roomFunction.stopSound("wanshengPart2")
		roomFunction.stopSound("zhiwuBgm")
		roomFunction.stopSound("jiantouBgm")
		roomFunction.stopSound("facaiBgm")
		roomFunction.stopSound("facaiRules")
		roomFunction.stopSound("yuanyuchou")
		roomFunction.stopSound("yinweini")
		roomFunction.stopSound("ruguowo")
		roomFunction.stopSound("luoshengmen")
		roomFunction.stopSound("FRIDAY9 II")
		roomFunction.stopSound("aini")
		roomFunction.stopSound("xingzuoBgm")
		roomFunction.stopSound("hudongDanzai")
		roomFunction.stopSound("hudongAixinBgm")
		roomFunction.stopSound("hudongShatan")
		roomFunction.stopSound("teethBgm")
		roomFunction.stopSound("CORSAK")
		roomFunction.stopSound("wansheng")
		roomFunction.stopSound("bgm02")
		roomFunction.stopSound("bgm2024")
		roomFunction.stopSound("happil")
		roomFunction.goToGameLevel("leave_hold", "none")
		haiPaiFuncs.rmAllListener()
		wanFaCtl_haiPaiCtl.gameEndCtl(guole)
		levelInfos.gameIdList = []
		nowcolor = 0
	}

}




const haiPaiFuncs = {
	//重置所有变量
	resetAll() {
		nowInfos.gameCountTime = 240;
		if (levelInfos.level == 999 || levelInfos.level == 888) {
			nowInfos.gameCountTime = 99999;
		}


		nowInfos.lifePoint = 6;
		usersInfos.gameScore = 0;
		usersInfos.levelScore = 0;
		nowInfos.target = 0;
		nowInfos.allTarget = 0;
		nowInfos.lifeProtect = 0;
		hudong = 0
		kugou = 0
		wangyiyun = 0
		changpian = 0
		noTap = 0
		nowAdress = 0
	},

	//移除所有监听
	rmAllListener() {
		engine.log("------rmAllListener--------已移除全部监听------")
		engine.removeEventListener("gamePlay", wanFa_haiPai.gamePlay)
		engine.removeEventListener("gameDestroy", wanFa_haiPai.gameDestroy)
		engine.removeEventListener("gameTimeOver", wanFa_haiPai.gameTimeOver)
		engine.removeEventListener("gameTaped", wanFa_haiPai.gameTaped)
	},
	yanhuaTap(face, x, y, onOff, nodeId, event, count, yanhuaAllArr, shenQianArr, rgb) {
		let yanhuaInterval = setInterval(() => {
			let yanhuaName = "yanhua" + count
			let yanhuaNumArr = yanhuaAllArr[yanhuaName.toString()]
			// engine.log("烟花数组为" + yanhuaAllArr[yanhuaName.toString()])
			for (let i = 0; i < yanhuaNumArr.length; i += 2) {
				// engine.log("x+y" + yanhuaNumArr[i] + yanhuaNumArr[i + 1])
				let opInfo = {
					opId: "addyanhua" + x + i, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					opNode: "father" + x, // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "yanhua" + i, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: yanhuaNumArr[i] + (count >= 12 ? 2 : 0), y: yanhuaNumArr[i + 1] }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
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
									r: rgb.r,
									g: rgb.g,
									b: rgb.b,
									a: yanhuaNumArr[i] == 0 ? (yanhuaNumArr[i + 1] == 0 ? 0 : shenQianArr[count]) : shenQianArr[count]
								}
							},
						}
					]
				}
				gameFuncs.op(opInfo);
			}
			if (count == 0) {
				let opInfoOne = {
					opId: "fatherPlay" + x,
					opType: "play",
					opNode: "father" + x,
					timeLen: 0.4,
					loop: false,
					keyFrames: [
						{
							t: 0,
							keyFrame: {
								surface: "b",
								visible: true,
								canTap: true,
								pt: {
									x: x,
									y: 7
								}
							}
						},
						{
							t: 1,
							keyFrame: {
								surface: "b",
								pt: {
									x: x,
									y: 33
								}
							}
						}
					]
				}
				gameFuncs.op(opInfoOne);
			}
			switch (count) {
				case 12:
					let opInfoTwo = {
						opId: "fatherPlay",
						opType: "play",
						opNode: "father" + x,
						timeLen: 0.1,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: x,
										y: 30
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: x,
										y: 30
									}
								}
							}
						]
					}
					gameFuncs.op(opInfoTwo);
					break;
				case 14:
					let opInfoThree = {
						opId: "fatherPlay",
						opType: "play",
						opNode: "father" + x,
						timeLen: 0.1,
						loop: false,
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									surface: "b",
									visible: true,
									canTap: true,
									pt: {
										x: x,
										y: 29
									}
								}
							},
							{
								t: 1,
								keyFrame: {
									surface: "b",
									pt: {
										x: x,
										y: 29
									}
								}
							}
						]
					}
					gameFuncs.op(opInfoThree);
					break;
			}
			count += 2
			if (count == 16 || levelInfos.gameIdList.length == 0) {
				clearInterval(yanhuaInterval)
				return
			}

		}, 200);
	},
	hudongTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "p1" || nodeId == "p1.p2" && onOff == true) {
			roomFunction.playSoundTivite(false, "hudongTexiao", "positive")
			let opInfo = {
				opId: "p1",
				opType: "play",
				opNode: "p1",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo)
			let opInfo999 = {
				opId: "p1.p2",
				opType: "play",
				opNode: "p1.p2",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo999)

			let hudongXin = setInterval(() => {
				hudong++
				switch (hudong) {
					case 1:
						let opInfo = {
							opId: "xian",
							opType: "play",
							opNode: "xian",
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
						gameFuncs.op(opInfo)
						break;
					case 2:
						let opInfo1 = {
							opId: "xian1",
							opType: "play",
							opNode: "xian1",
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
						gameFuncs.op(opInfo1)
						break;
					case 3:
						let opInfo2 = {
							opId: "xian2",
							opType: "play",
							opNode: "xian2",
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
						gameFuncs.op(opInfo2)
						break;
					case 4:
						let opInfo3 = {
							opId: "xian3",
							opType: "play",
							opNode: "xian3",
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
						gameFuncs.op(opInfo3)
						break;
					case 5:
						let opInfo4 = {
							opId: "xian4",
							opType: "play",
							opNode: "xian4",
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
						gameFuncs.op(opInfo4)
						break;
					case 6:
						let opInfo5 = {
							opId: "xian5",
							opType: "play",
							opNode: "xian5",
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
						gameFuncs.op(opInfo5)
						break;
					case 7:
						let opInfo6 = {
							opId: "xian6",
							opType: "play",
							opNode: "xian6",
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
						gameFuncs.op(opInfo6)
						break;
					case 8:
						let opInfo7 = {
							opId: "xian7",
							opType: "play",
							opNode: "xian7",
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
						gameFuncs.op(opInfo7)
						break;
					case 9:
						let opInfo8 = {
							opId: "xian8",
							opType: "play",
							opNode: "xian8",
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
						gameFuncs.op(opInfo8)
						break;
					case 10:
						let opInfo9 = {
							opId: "xian9",
							opType: "play",
							opNode: "xian9",
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
						gameFuncs.op(opInfo9)
						break;
					case 11:
						let opInfo10 = {
							opId: "xian10",
							opType: "play",
							opNode: "xian10",
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
						gameFuncs.op(opInfo10)
						break;
					case 12:
						let opInfo11 = {
							opId: "xian11",
							opType: "play",
							opNode: "xian11",
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
						gameFuncs.op(opInfo11)
						break;
					case 13:
						let opInfo12 = {
							opId: "xian12",
							opType: "play",
							opNode: "xian12",
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
						gameFuncs.op(opInfo12)
						break;
					case 14:
						let opInfo13 = {
							opId: "xian13",
							opType: "play",
							opNode: "xian13",
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
						gameFuncs.op(opInfo13)
						break;
					case 15:
						let opInfo14 = {
							opId: "xian14",
							opType: "play",
							opNode: "xian14",
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
						gameFuncs.op(opInfo14)
						break;
					case 16:
						let opInfo17 = {
							opId: "xian15",
							opType: "play",
							opNode: "xian15",
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
						gameFuncs.op(opInfo17)
						break;
					case 17:
						let opInfo18 = {
							opId: "xian16",
							opType: "play",
							opNode: "xian16",
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
						gameFuncs.op(opInfo18)
						break;
					case 18:
						let opInfo19 = {
							opId: "xian17",
							opType: "play",
							opNode: "xian17",
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
						gameFuncs.op(opInfo19)
						break;
					case 19:
						let opInfo20 = {
							opId: "xian18",
							opType: "play",
							opNode: "xian18",
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
						gameFuncs.op(opInfo20)
						break;
					case 20:
						let opInfo21 = {
							opId: "xian19",
							opType: "play",
							opNode: "xian19",
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
						gameFuncs.op(opInfo21)
						break;
					case 21:
						let opInfo22 = {
							opId: "xian20",
							opType: "play",
							opNode: "xian20",
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
						gameFuncs.op(opInfo22)
						break;
					case 22:
						let opInfo23 = {
							opId: "xian21",
							opType: "play",
							opNode: "xian21",
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
						gameFuncs.op(opInfo23)
						break;
					case 23:
						let opInfo24 = {
							opId: "xian22",
							opType: "play",
							opNode: "xian22",
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
						gameFuncs.op(opInfo24)
						break;
					case 24:
						let opInfo25 = {
							opId: "xian23",
							opType: "play",
							opNode: "xian23",
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
						gameFuncs.op(opInfo25)
						break;
					case 25:
						let opInfo26 = {
							opId: "xian24",
							opType: "play",
							opNode: "xian24",
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
						gameFuncs.op(opInfo26)
						break;
					case 26:
						let opInfo27 = {
							opId: "xian25",
							opType: "play",
							opNode: "xian25",
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
						gameFuncs.op(opInfo27)
						break;
					case 27:
						let opInfo28 = {
							opId: "xian26",
							opType: "play",
							opNode: "xian26",
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
						gameFuncs.op(opInfo28)
						break;
					case 28:
						let opInfo29 = {
							opId: "xian27",
							opType: "play",
							opNode: "xian27",
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
						gameFuncs.op(opInfo29)
						break;
					case 29:
						let opInfo30 = {
							opId: "xian28",
							opType: "play",
							opNode: "xian28",
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
						gameFuncs.op(opInfo30)
						break;
					case 30:
						let opInfo31 = {
							opId: "xian29",
							opType: "play",
							opNode: "xian29",
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
						gameFuncs.op(opInfo31)
						break;
					case 31:
						let opInfo15 = {
							opId: "xinMove",
							opType: "play",
							opNode: "aixin",
							timeLen: 1,
							loop: "false",
							keyFrames: [

								{
									t: 0.5,
									keyFrame: {
										visible: "true",
										canTap: "true",
										surface: "b",
										pt: {
											x: 4,
											y: 33
										},

									}
								},
								{
									t: 1,
									keyFrame: {
										visible: "true",
										canTap: "true",
										surface: "b",
										pt: {
											x: 7,
											y: 33
										},

									}
								}
							]
						}
						gameFuncs.op(opInfo15);
						let opInfo16 = {
							opId: "xinMove",
							opType: "play",
							opNode: "aixin2",
							timeLen: 1,
							loop: "false",
							keyFrames: [

								{
									t: 0.5,
									keyFrame: {
										visible: "true",
										canTap: "true",
										surface: "b",
										pt: {
											x: 11,
											y: 33
										},

									}
								},
								{
									t: 1,
									keyFrame: {
										visible: "true",
										canTap: "true",
										surface: "b",
										pt: {
											x: 8,
											y: 33
										},

									}
								}
							]
						}
						gameFuncs.op(opInfo16);
						break;
					case 33:
						let opInfo3001 = {
							opId: "xian008",
							opType: "play",
							opNode: "xian008",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo3001)
						let opInfo3000 = {
							opId: "xian009",
							opType: "play",
							opNode: "xian009",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo3000)
						break;
					case 34:
						let opInfo300 = {
							opId: "xian00",
							opType: "play",
							opNode: "xian00",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo300)
						let opInfo301 = {
							opId: "xian1200",
							opType: "play",
							opNode: "xian1200",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo301)
						break;
					case 35:
						let opInfo302 = {
							opId: "xian100",
							opType: "play",
							opNode: "xian100",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo302)
						let opInfo303 = {
							opId: "xian1300",
							opType: "play",
							opNode: "xian1300",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo303)
						break;
					case 36:
						let opInfo304 = {
							opId: "xian200",
							opType: "play",
							opNode: "xian200",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo304)
						let opInfo305 = {
							opId: "xian1400",
							opType: "play",
							opNode: "xian1400",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo305)
						break;
					case 37:
						let opInfo306 = {
							opId: "xian300",
							opType: "play",
							opNode: "xian300",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo306)
						let opInfo307 = {
							opId: "xian1500",
							opType: "play",
							opNode: "xian1500",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo307)
						break;
					case 38:
						let opInfo308 = {
							opId: "xian400",
							opType: "play",
							opNode: "xian400",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo308)
						let opInfo309 = {
							opId: "xian1600",
							opType: "play",
							opNode: "xian1600",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo309)
						break;
					case 39:
						let opInfo310 = {
							opId: "xian500",
							opType: "play",
							opNode: "xian500",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo310)
						let opInfo311 = {
							opId: "xian1700",
							opType: "play",
							opNode: "xian1700",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo311)
						break;
					case 40:
						let opInfo312 = {
							opId: "xian600",
							opType: "play",
							opNode: "xian600",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo312)
						let opInfo313 = {
							opId: "xian1800",
							opType: "play",
							opNode: "xian1800",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo313)
						break;
					case 41:
						let opInfo314 = {
							opId: "xian700",
							opType: "play",
							opNode: "xian700",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo314)
						let opInfo315 = {
							opId: "xian1900",
							opType: "play",
							opNode: "xian1900",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo315)
						break;
					case 42:
						let opInfo316 = {
							opId: "xian800",
							opType: "play",
							opNode: "xian800",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo316)
						let opInfo317 = {
							opId: "xian2000",
							opType: "play",
							opNode: "xian2000",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo317)
						break;
					case 43:
						let opInfo318 = {
							opId: "xian900",
							opType: "play",
							opNode: "xian900",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo318)
						let opInfo319 = {
							opId: "xian2100",
							opType: "play",
							opNode: "xian2100",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo319)
						break;
					case 44:
						let opInfo320 = {
							opId: "xian1000",
							opType: "play",
							opNode: "xian1000",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo320)
						let opInfo321 = {
							opId: "xian2200",
							opType: "play",
							opNode: "xian2200",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo321)
						break;
					case 45:
						let opInfo322 = {
							opId: "xian1100",
							opType: "play",
							opNode: "xian1100",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo322)
						let opInfo323 = {
							opId: "xian2300",
							opType: "play",
							opNode: "xian2300",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo323)
						break;
					case 46:
						let opInfo900 = {
							opId: "xian",
							opType: "play",
							opNode: "xian",
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
						gameFuncs.op(opInfo900)

						let opInfo901 = {
							opId: "xian1",
							opType: "play",
							opNode: "xian1",
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
						gameFuncs.op(opInfo901)

						let opInfo902 = {
							opId: "xian2",
							opType: "play",
							opNode: "xian2",
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
						gameFuncs.op(opInfo902)

						let opInfo903 = {
							opId: "xian3",
							opType: "play",
							opNode: "xian3",
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
						gameFuncs.op(opInfo903)

						let opInfo904 = {
							opId: "xian4",
							opType: "play",
							opNode: "xian4",
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
						gameFuncs.op(opInfo904)

						let opInfo905 = {
							opId: "xian5",
							opType: "play",
							opNode: "xian5",
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
						gameFuncs.op(opInfo905)

						let opInfo906 = {
							opId: "xian6",
							opType: "play",
							opNode: "xian6",
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
						gameFuncs.op(opInfo906)

						let opInfo907 = {
							opId: "xian7",
							opType: "play",
							opNode: "xian7",
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
						gameFuncs.op(opInfo907)

						let opInfo908 = {
							opId: "xian8",
							opType: "play",
							opNode: "xian8",
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
						gameFuncs.op(opInfo908)

						let opInfo909 = {
							opId: "xian9",
							opType: "play",
							opNode: "xian9",
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
						gameFuncs.op(opInfo909)

						let opInfo910 = {
							opId: "xian10",
							opType: "play",
							opNode: "xian10",
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
						gameFuncs.op(opInfo910)

						let opInfo911 = {
							opId: "xian11",
							opType: "play",
							opNode: "xian11",
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
						gameFuncs.op(opInfo911)

						let opInfo912 = {
							opId: "xian12",
							opType: "play",
							opNode: "xian12",
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
						gameFuncs.op(opInfo912)

						let opInfo913 = {
							opId: "xian13",
							opType: "play",
							opNode: "xian13",
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
						gameFuncs.op(opInfo913)

						let opInfo914 = {
							opId: "xian14",
							opType: "play",
							opNode: "xian14",
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
						gameFuncs.op(opInfo914)

						let opInfo917 = {
							opId: "xian15",
							opType: "play",
							opNode: "xian15",
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
						gameFuncs.op(opInfo917)

						let opInfo918 = {
							opId: "xian16",
							opType: "play",
							opNode: "xian16",
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
						gameFuncs.op(opInfo918)

						let opInfo919 = {
							opId: "xian17",
							opType: "play",
							opNode: "xian17",
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
						gameFuncs.op(opInfo919)

						let opInfo920 = {
							opId: "xian18",
							opType: "play",
							opNode: "xian18",
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
						gameFuncs.op(opInfo920)

						let opInfo921 = {
							opId: "xian19",
							opType: "play",
							opNode: "xian19",
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
						gameFuncs.op(opInfo921)

						let opInfo922 = {
							opId: "xian20",
							opType: "play",
							opNode: "xian20",
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
						gameFuncs.op(opInfo922)

						let opInfo923 = {
							opId: "xian21",
							opType: "play",
							opNode: "xian21",
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
						gameFuncs.op(opInfo923)

						let opInfo924 = {
							opId: "xian22",
							opType: "play",
							opNode: "xian22",
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
						gameFuncs.op(opInfo924)

						let opInfo925 = {
							opId: "xian23",
							opType: "play",
							opNode: "xian23",
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
						gameFuncs.op(opInfo925)

						let opInfo926 = {
							opId: "xian24",
							opType: "play",
							opNode: "xian24",
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
						gameFuncs.op(opInfo926)

						let opInfo927 = {
							opId: "xian25",
							opType: "play",
							opNode: "xian25",
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
						gameFuncs.op(opInfo927)

						let opInfo928 = {
							opId: "xian26",
							opType: "play",
							opNode: "xian26",
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
						gameFuncs.op(opInfo928)

						let opInfo929 = {
							opId: "xian27",
							opType: "play",
							opNode: "xian27",
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
						gameFuncs.op(opInfo929)
						let opInfo1000 = {
							opId: "p1",
							opType: "play",
							opNode: "p1",
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
						gameFuncs.op(opInfo1000)
						let opInfo999 = {
							opId: "p1.p2",
							opType: "play",
							opNode: "p1.p2",
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
						gameFuncs.op(opInfo999)
						break;
					case 48:
						let opInfo930 = {
							opId: "aixinWu",
							opType: "play",
							opNode: "aixinWu",
							timeLen: 1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: false
									}
								}
							]
						}
						gameFuncs.op(opInfo930)
						break;
					case 49:
						let opInfo931 = {
							opId: "aixinEr",
							opType: "play",
							opNode: "aixinEr",
							timeLen: 1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: false
									}
								}
							]
						}
						gameFuncs.op(opInfo931)
						break;
					case 50:
						let opInfo932 = {
							opId: "aixinLing",
							opType: "play",
							opNode: "aixinLing",
							timeLen: 1,
							loop: "false",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: false
									}
								}
							]
						}
						gameFuncs.op(opInfo932)
						roomFunction.playSound(true, "hudongAixinBgm", "background")
						break;
					case 52:
						clearInterval(hudongXin)
						break;
				}
			}, 100);
		}
	},
	hudongFacaiTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "facai10" || nodeId == "facai20" && onOff == true) {
			roomFunction.playSoundTivite(false, "hudongTexiao", "positive")
			let opInfo = {
				opId: "facai10",
				opType: "play",
				opNode: "facai10",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo)
			let opInfo999 = {
				opId: "facai20",
				opType: "play",
				opNode: "facai20",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							canTap: false
						}
					}
				]
			}
			gameFuncs.op(opInfo999)
			let facai = 0
			let hudongfacai = setInterval(() => {
				facai++
				switch (facai) {
					case 1:
						let opInfo00 = {
							opId: "jiantou.jiantou1",
							opType: "play",
							opNode: "jiantou.jiantou1",
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
						gameFuncs.op(opInfo00)
						break;
					case 2:
						let opInfo10000 = {
							opId: "jiantou.jiantou2",
							opType: "play",
							opNode: "jiantou.jiantou2",
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
						gameFuncs.op(opInfo10000)
						break;
					case 3:
						let opInfo = {
							opId: "xian",
							opType: "play",
							opNode: "xian",
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
						gameFuncs.op(opInfo)
						break;
					case 4:
						let opInfo1 = {
							opId: "xian1",
							opType: "play",
							opNode: "xian1",
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
						gameFuncs.op(opInfo1)
						break;
					case 5:
						let opInfo2 = {
							opId: "xian2",
							opType: "play",
							opNode: "xian2",
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
						gameFuncs.op(opInfo2)
						break;
					case 6:
						let opInfo3 = {
							opId: "xian3",
							opType: "play",
							opNode: "xian3",
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
						gameFuncs.op(opInfo3)
						break;
					case 7:
						let opInfo4 = {
							opId: "xian4",
							opType: "play",
							opNode: "xian4",
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
						gameFuncs.op(opInfo4)
						break;
					case 8:
						let opInfo5 = {
							opId: "xian5",
							opType: "play",
							opNode: "xian5",
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
						gameFuncs.op(opInfo5)
						break;
					case 9:
						let opInfo6 = {
							opId: "xian6",
							opType: "play",
							opNode: "xian6",
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
						gameFuncs.op(opInfo6)
						break;
					case 10:
						let opInfo7 = {
							opId: "xian7",
							opType: "play",
							opNode: "xian7",
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
						gameFuncs.op(opInfo7)
						break;
					case 11:
						let opInfo8 = {
							opId: "xian8",
							opType: "play",
							opNode: "xian8",
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
						gameFuncs.op(opInfo8)
						break;
					case 12:
						let opInfo9 = {
							opId: "xian9",
							opType: "play",
							opNode: "xian9",
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
						gameFuncs.op(opInfo9)
						break;
					case 13:
						let opInfo10 = {
							opId: "xian10",
							opType: "play",
							opNode: "xian10",
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
						gameFuncs.op(opInfo10)
						break;
					case 14:
						let opInfo11 = {
							opId: "xian11",
							opType: "play",
							opNode: "xian11",
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
						gameFuncs.op(opInfo11)
						break;
					case 15:
						let opInfo12 = {
							opId: "xian12",
							opType: "play",
							opNode: "xian12",
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
						gameFuncs.op(opInfo12)
						break;
					case 16:
						let opInfo13 = {
							opId: "xian13",
							opType: "play",
							opNode: "xian13",
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
						gameFuncs.op(opInfo13)
						break;
					case 17:
						let opInfo14 = {
							opId: "xian14",
							opType: "play",
							opNode: "xian14",
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
						gameFuncs.op(opInfo14)
						break;
					case 18:
						let opInfo17 = {
							opId: "xian15",
							opType: "play",
							opNode: "xian15",
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
						gameFuncs.op(opInfo17)
						break;
					case 19:
						let opInfo18 = {
							opId: "xian16",
							opType: "play",
							opNode: "xian16",
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
						gameFuncs.op(opInfo18)
						break;
					case 20:
						let opInfo19 = {
							opId: "xian17",
							opType: "play",
							opNode: "xian17",
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
						gameFuncs.op(opInfo19)
						break;
					case 21:
						let opInfo20 = {
							opId: "xian18",
							opType: "play",
							opNode: "xian18",
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
						gameFuncs.op(opInfo20)
						break;
					case 22:
						let opInfo21 = {
							opId: "xian19",
							opType: "play",
							opNode: "xian19",
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
						gameFuncs.op(opInfo21)
						break;
					case 23:
						let opInfo22 = {
							opId: "xian20",
							opType: "play",
							opNode: "xian20",
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
						gameFuncs.op(opInfo22)
						break;
					case 24:
						let opInfo23 = {
							opId: "xian21",
							opType: "play",
							opNode: "xian21",
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
						gameFuncs.op(opInfo23)
						break;
					case 25:
						let opInfo24 = {
							opId: "xian22",
							opType: "play",
							opNode: "xian22",
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
						gameFuncs.op(opInfo24)
						break;
					case 26:
						let opInfo25 = {
							opId: "xian23",
							opType: "play",
							opNode: "xian23",
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
						gameFuncs.op(opInfo25)
						break;
					case 27:
						let opInfo26 = {
							opId: "xian24",
							opType: "play",
							opNode: "xian24",
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
						gameFuncs.op(opInfo26)
						break;
					case 28:
						let opInfo27 = {
							opId: "xian25",
							opType: "play",
							opNode: "xian25",
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
						gameFuncs.op(opInfo27)
						break;
					case 29:
						let opInfo3001 = {
							opId: "xian",
							opType: "play",
							opNode: "xian",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo3001)
						break;
					case 30:
						let opInfo300 = {
							opId: "xian1",
							opType: "play",
							opNode: "xian1",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo300)
						break;
					case 31:
						let opInfo301 = {
							opId: "xian2",
							opType: "play",
							opNode: "xian2",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo301)
						break;
					case 32:
						let opInfo302 = {
							opId: "xian3",
							opType: "play",
							opNode: "xian3",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo302)
						break;
					case 33:
						let opInfo303 = {
							opId: "xian4",
							opType: "play",
							opNode: "xian4",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo303)
						break;
					case 34:
						let opInfo304 = {
							opId: "xian5",
							opType: "play",
							opNode: "xian5",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo304)
						break;
					case 35:
						let opInfo305 = {
							opId: "xian6",
							opType: "play",
							opNode: "xian6",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo305)
						break;
					case 36:
						let opInfo306 = {
							opId: "xian7",
							opType: "play",
							opNode: "xian7",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo306)
						break;
					case 37:
						let opInfo307 = {
							opId: "xian8",
							opType: "play",
							opNode: "xian8",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo307)
						break;
					case 38:
						let opInfo308 = {
							opId: "xian9",
							opType: "play",
							opNode: "xian9",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo308)
						break;
					case 39:
						let opInfo309 = {
							opId: "xian10",
							opType: "play",
							opNode: "xian10",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo309)
						break;
					case 40:
						let opInfo310 = {
							opId: "xian11",
							opType: "play",
							opNode: "xian11",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo310)
						break;
					case 41:
						let opInfo311 = {
							opId: "xian12",
							opType: "play",
							opNode: "xian12",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo311)
						break;
					case 42:
						let opInfo312 = {
							opId: "xian13",
							opType: "play",
							opNode: "xian13",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo312)
						break;
					case 43:
						let opInfo313 = {
							opId: "xian14",
							opType: "play",
							opNode: "xian14",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo313)
						break;
					case 44:
						let opInfo314 = {
							opId: "xian15",
							opType: "play",
							opNode: "xian15",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo314)
						break;
					case 45:
						let opInfo315 = {
							opId: "xian16",
							opType: "play",
							opNode: "xian16",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo315)
						break;
					case 46:
						let opInfo316 = {
							opId: "xian17",
							opType: "play",
							opNode: "xian17",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo316)
						break;
					case 47:
						let opInfo317 = {
							opId: "xian18",
							opType: "play",
							opNode: "xian18",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo317)
						break;
					case 48:
						let opInfo318 = {
							opId: "xian19",
							opType: "play",
							opNode: "xian19",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo318)
						break;
					case 49:
						let opInfo319 = {
							opId: "xian20",
							opType: "play",
							opNode: "xian20",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo319)
						break;
					case 50:
						let opInfo320 = {
							opId: "xian21",
							opType: "play",
							opNode: "xian21",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo320)
						break;
					case 51:
						let opInfo321 = {
							opId: "xian22",
							opType: "play",
							opNode: "xian22",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo321)
						break;
					case 52:
						let opInfo3210 = {
							opId: "xian23",
							opType: "play",
							opNode: "xian23",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo3210)
						break;
					case 53:
						let opInfo3211 = {
							opId: "xian24",
							opType: "play",
							opNode: "xian24",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo3211)
						break;
					case 54:
						let opInfo3212 = {
							opId: "xian25",
							opType: "play",
							opNode: "xian25",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 1
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 0,
												g: 254,
												b: 254,
												a: 0.3
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo3212)
						break;
					case 55:
						// roomFunction.playSound(true, "hudongAixinBgm", "background")
						roomFunction.playSound(false, "facaiRules")
						haiPaiFuncs.hudongFacaiTap.facaiSet = setTimeout(() => {
							roomFunction.playSound(true, "facaiBgm", "background")
						}, 5000);
						break;
					case 510:
						clearInterval(hudongfacai)
						break;
				}
			}, 100);
		}
	},
	hudongZhiwuTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "fashe" && onOff == true) {
			fastop.addNode("addZidan", "zidan", "b", 8, 39, 0, 254, 0)
			roomFunction.playSoundTivite(false, "wandou", "positive")

			let opInfo322 = {
				opId: "zidanPlay",
				opType: "play",
				opNode: "zidan",
				timeLen: 0.5,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							surface: "b",
							pt: {
								x: -3,
								y: 0
							},
						}
					}
				]
			}
			gameFuncs.op(opInfo322)
			let opInfo4 = {
				opId: "jiangshi1Play",
				opType: "play",
				opNode: "jiangshi.jiangshi1",
				timeLen: 0.5,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 139,
									g: 69,
									b: 19,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 139,
									g: 69,
									b: 19,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo4)
			let opInfo5 = {
				opId: "jiangshi2Play",
				opType: "play",
				opNode: "jiangshi.jiangshi2",
				timeLen: 0.5,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 51,
									b: 0,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 51,
									b: 0,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo5)
			let opInfo6 = {
				opId: "jiangshi3Play",
				opType: "play",
				opNode: "jiangshi.jiangshi3",
				timeLen: 0.5,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 153,
									b: 0,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 153,
									b: 0,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo6)
			let opInfo7 = {
				opId: "jiangshi4Play",
				opType: "play",
				opNode: "jiangshi.jiangshi4",
				timeLen: 0.5,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 102,
									g: 153,
									b: 153,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 102,
									g: 153,
									b: 153,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo7)
			setTimeout(() => {
				fastop.removeNode("zidan", "zidan")
			}, 600);
		}
	},
	hudongDanzaiTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "qiehuan" && onOff == true) {
			roomFunction.playSoundTivite(false, "wandou", "positive")
			let opInfo4 = {
				opId: "danzai.danzai3Play001",
				opType: "play",
				opNode: "danzai.danzai3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 30,
									g: 144,
									b: 254,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo4)
			let opInfo5 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo5)
			let opInfo6 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing1",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo6)
			let opInfo7 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing2",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo7)


			let opInfo12 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo12)
			let opInfo13 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing8",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo13)
			let opInfo14 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing9",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo14)
			let opInfo15 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing10",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo15)

			let opInfo16 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo16)
			let opInfo17 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing12",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo17)
			let opInfo18 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing13",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo18)


			let opInfo8 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo8)
			let opInfo9 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing4",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo9)
			let opInfo10 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing5",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo10)
			let opInfo11 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing6",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo11)
		} else if (nodeId == "qiehuan1" && onOff == true) {
			roomFunction.playSoundTivite(false, "wandou", "positive")
			let opInfo4 = {
				opId: "danzai.danzai3Play002",
				opType: "play",
				opNode: "danzai.danzai3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 50,
									g: 205,
									b: 50,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo4)


			let opInfo8 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo8)
			let opInfo9 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing4",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo9)
			let opInfo10 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing5",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo10)
			let opInfo11 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing6",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo11)

			let opInfo16 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo16)
			let opInfo17 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing12",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo17)
			let opInfo18 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing13",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo18)
			let opInfo5 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo5)
			let opInfo6 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing1",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo6)
			let opInfo7 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing2",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo7)



			let opInfo12 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo12)
			let opInfo13 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing8",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo13)
			let opInfo14 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing9",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo14)
			let opInfo15 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing10",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo15)
		} else if (nodeId == "qiehuan2" && onOff == true) {
			roomFunction.playSoundTivite(false, "wandou", "positive")

			let opInfo4 = {
				opId: "danzai.danzai3Play003",
				opType: "play",
				opNode: "danzai.danzai3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 148,
									g: 0,
									b: 211,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo4)



			let opInfo12 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo12)
			let opInfo13 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing8",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo13)
			let opInfo14 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing9",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo14)
			let opInfo15 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing10",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo15)

			let opInfo8 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo8)
			let opInfo9 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing4",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo9)
			let opInfo10 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing5",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo10)
			let opInfo11 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing6",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo11)
			let opInfo5 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo5)
			let opInfo6 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing1",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo6)
			let opInfo7 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing2",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo7)


			let opInfo16 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo16)
			let opInfo17 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing12",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo17)
			let opInfo18 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing13",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo18)
		} else if (nodeId == "qiehuan3" && onOff == true) {
			roomFunction.playSoundTivite(false, "wandou", "positive")

			let opInfo4 = {
				opId: "danzai.danzai3Play004",
				opType: "play",
				opNode: "danzai.danzai3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 69,
									b: 0,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo4)

			let opInfo12 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo12)
			let opInfo13 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing8",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo13)
			let opInfo14 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing9",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo14)
			let opInfo15 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing7.biaoqing10",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo15)

			let opInfo8 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo8)
			let opInfo9 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing4",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo9)
			let opInfo10 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing5",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo10)
			let opInfo11 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing3.biaoqing6",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo11)
			let opInfo16 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo16)
			let opInfo17 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing12",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo17)
			let opInfo18 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing11.biaoqing13",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: false,
							canTap: false,
						}
					}
				]
			}
			gameFuncs.op(opInfo18)


			let opInfo5 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo5)
			let opInfo6 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing1",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo6)
			let opInfo7 = {
				opId: "danzaiPlay001",
				opType: "play",
				opNode: "biaoqing.biaoqing2",
				timeLen: 0.1,
				loop: "false",
				keyFrames: [
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
						}
					}
				]
			}
			gameFuncs.op(opInfo7)
		}
	},
	hudongYinyueTap(face, x, y, onOff, nodeId, event) {
		if (nodeId == "kugou44" || nodeId == "wangyiyun44" && onOff == true && changpian == 0) {
			let changpian22 = 0
			let changpianMove = setInterval(() => {
				changpian22++
				switch (changpian22) {
					case 1:
						let opInfo4 = {
							opId: "changpian.changpian21Play001",
							opType: "play",
							opNode: "changpian.changpian21",
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
									}
								}
							]
						}
						gameFuncs.op(opInfo4)
						let opInfo5 = {
							opId: "changpian.changpian19Play001",
							opType: "play",
							opNode: "changpian.changpian19",
							timeLen: 0.1,
							loop: "false",
							keyFrames: [
								{
									t: 1,
									keyFrame: {
										visible: false,
										canTap: false,
									}
								}
							]
						}
						gameFuncs.op(opInfo5)
						break;
					case 2:
						let opInfo6 = {
							opId: "changpian.changpian2Play001",
							opType: "play",
							opNode: "changpian.changpian2",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo6)
						break;
					case 3:
						let opInfo7 = {
							opId: "changpian.changpian3Play001",
							opType: "play",
							opNode: "changpian.changpian3",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo7)
						break;
					case 4:
						let opInfo8 = {
							opId: "changpian.changpian4Play001",
							opType: "play",
							opNode: "changpian.changpian4",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo8)
						break;
					case 5:
						let opInfo9 = {
							opId: "changpian.changpian5Play001",
							opType: "play",
							opNode: "changpian.changpian5",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo9)
						break;
					case 6:
						let opInfo10 = {
							opId: "changpian.changpian6Play001",
							opType: "play",
							opNode: "changpian.changpian6",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo10)
						break;
					case 7:
						let opInfo11 = {
							opId: "changpian.changpian7Play001",
							opType: "play",
							opNode: "changpian.changpian7",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo11)
						break;
					case 8:
						let opInfo12 = {
							opId: "changpian.changpian8Play001",
							opType: "play",
							opNode: "changpian.changpian8",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo12)
						break;
					case 9:
						let opInfo13 = {
							opId: "changpian.changpian9Play001",
							opType: "play",
							opNode: "changpian.changpian9",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo13)
						break;
					case 10:
						let opInfo14 = {
							opId: "changpian.changpian10Play001",
							opType: "play",
							opNode: "changpian.changpian10",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo14)
						break;
					case 11:
						let opInfo15 = {
							opId: "changpian.changpian11Play001",
							opType: "play",
							opNode: "changpian.changpian11",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo15)
						break;
					case 12:
						let opInfo16 = {
							opId: "changpian.changpian12Play001",
							opType: "play",
							opNode: "changpian.changpian12",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo16)
						break;
					case 13:
						let opInfo17 = {
							opId: "changpian.changpian13Play001",
							opType: "play",
							opNode: "changpian.changpian13",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo17)
						break;
					case 14:
						let opInfo18 = {
							opId: "changpian.changpian14Play001",
							opType: "play",
							opNode: "changpian.changpian14",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo18)
						break;
					case 15:
						let opInfo19 = {
							opId: "changpian.changpian15Play001",
							opType: "play",
							opNode: "changpian.changpian15",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo19)
						break;
					case 16:
						let opInfo20 = {
							opId: "changpian.changpian16Play001",
							opType: "play",
							opNode: "changpian.changpian16",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo20)
						break;
					case 17:
						let opInfo21 = {
							opId: "changpian.changpian17Play001",
							opType: "play",
							opNode: "changpian.changpian17",
							timeLen: 1,
							loop: "true",
							keyFrames: [
								{
									t: 0.5,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 0.3
											}
										}
									}
								},
								{
									t: 1,
									keyFrame: {
										visible: true,
										canTap: true,
										shape: {
											rgba: {
												r: 254,
												g: 51,
												b: 0,
												a: 1
											}
										}
									}
								}
							]
						}
						gameFuncs.op(opInfo21)
						break;
					case 19:
						clearInterval(changpianMove)
						break;

				}
			}, 100);
			changpian = 1
		}
		if (nodeId == "kugou44" && onOff == true) {
			let opInfo4 = {
				opId: "kugou.kugou1Play001",
				opType: "play",
				opNode: "kugou.kugou1",
				timeLen: 1,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 30,
									g: 144,
									b: 254,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 30,
									g: 144,
									b: 254,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo4)
			let opInfo5 = {
				opId: "kugou.kugou2Play002",
				opType: "play",
				opNode: "kugou.kugou2",
				timeLen: 1,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 254,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 254,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo5)
			switch (kugou) {
				case 0:
					kugou++
					roomFunction.playSound(true, "aini", "background")
					roomFunction.stopSound("yuanyuchou")
					roomFunction.stopSound("yinweini")
					roomFunction.stopSound("ruguowo")
					roomFunction.stopSound("luoshengmen")
					roomFunction.stopSound("FRIDAY9 II")
					break;
				case 1:
					kugou++
					roomFunction.playSound(true, "luoshengmen", "background")
					roomFunction.stopSound("yuanyuchou")
					roomFunction.stopSound("yinweini")
					roomFunction.stopSound("ruguowo")
					roomFunction.stopSound("aini")
					roomFunction.stopSound("FRIDAY9 II")
					break;
				case 2:
					kugou = 0
					roomFunction.playSound(true, "FRIDAY9 II", "background")
					roomFunction.stopSound("yuanyuchou")
					roomFunction.stopSound("yinweini")
					roomFunction.stopSound("ruguowo")
					roomFunction.stopSound("aini")
					roomFunction.stopSound("luoshengmen")
					break;
			}
		} else if (nodeId == "wangyiyun44" && onOff == true) {
			let opInfo4 = {
				opId: "wangyiyun.wangyiyun1Play001",
				opType: "play",
				opNode: "wangyiyun.wangyiyun1",
				timeLen: 1,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 0,
									b: 0,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 0,
									b: 0,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo4)
			let opInfo5 = {
				opId: "wangyiyun.wangyiyun2Play002",
				opType: "play",
				opNode: "wangyiyun.wangyiyun2",
				timeLen: 1,
				loop: "false",
				keyFrames: [
					{
						t: 0.5,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 254,
									a: 0.3
								}
							}
						}
					},
					{
						t: 1,
						keyFrame: {
							visible: true,
							canTap: true,
							shape: {
								rgba: {
									r: 254,
									g: 254,
									b: 254,
									a: 1
								}
							}
						}
					}
				]
			}
			gameFuncs.op(opInfo5)
			switch (wangyiyun) {
				case 0:
					wangyiyun++
					roomFunction.playSound(true, "yinweini", "background")
					roomFunction.stopSound("yuanyuchou")
					roomFunction.stopSound("FRIDAY9 II")
					roomFunction.stopSound("ruguowo")
					roomFunction.stopSound("aini")
					roomFunction.stopSound("luoshengmen")
					break;
				case 1:
					wangyiyun++
					roomFunction.playSound(true, "yuanyuchou", "background")
					roomFunction.stopSound("yinweini")
					roomFunction.stopSound("FRIDAY9 II")
					roomFunction.stopSound("ruguowo")
					roomFunction.stopSound("aini")
					roomFunction.stopSound("luoshengmen")
					break;
				case 2:
					wangyiyun = 0
					roomFunction.playSound(true, "ruguowo", "background")
					roomFunction.stopSound("yinweini")
					roomFunction.stopSound("FRIDAY9 II")
					roomFunction.stopSound("yuanyuchou")
					roomFunction.stopSound("aini")
					roomFunction.stopSound("luoshengmen")
					break;
			}
		}
	},
	hudongXingzuoTap(face, x, y, onOff, nodeId, event) {
		if (onOff == true) {
			switch (nodeId) {
				case "shuiping33":
					roomFunction.playSound(false, "shuiping")
					roomFunction.stopSound("shuangyu")
					roomFunction.stopSound("baiyang")
					roomFunction.stopSound("juxie")
					roomFunction.stopSound("shuangzi")
					roomFunction.stopSound("tiancheng")
					roomFunction.stopSound("sheshou")
					roomFunction.stopSound("mojie")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", true, true)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", false, false)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", false, false)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", false, false)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", false, false)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", false, false)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", false, false)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", false, false)
					break;
				case "shuangyu33":
					roomFunction.playSound(false, "shuangyu")
					roomFunction.stopSound("shuiping")
					roomFunction.stopSound("baiyang")
					roomFunction.stopSound("juxie")
					roomFunction.stopSound("shuangzi")
					roomFunction.stopSound("tiancheng")
					roomFunction.stopSound("sheshou")
					roomFunction.stopSound("mojie")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", false, false)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", true, true)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", false, false)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", false, false)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", false, false)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", false, false)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", false, false)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", false, false)
					break;
				case "baiyang33":
					roomFunction.playSound(false, "baiyang")
					roomFunction.stopSound("shuangyu")
					roomFunction.stopSound("shuiping")
					roomFunction.stopSound("juxie")
					roomFunction.stopSound("shuangzi")
					roomFunction.stopSound("tiancheng")
					roomFunction.stopSound("sheshou")
					roomFunction.stopSound("mojie")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", false, false)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", false, false)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", true, true)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", false, false)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", false, false)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", false, false)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", false, false)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", false, false)
					break;
				case "juxie33":
					roomFunction.playSound(false, "juxie")
					roomFunction.stopSound("shuangyu")
					roomFunction.stopSound("baiyang")
					roomFunction.stopSound("shuiping")
					roomFunction.stopSound("shuangzi")
					roomFunction.stopSound("tiancheng")
					roomFunction.stopSound("sheshou")
					roomFunction.stopSound("mojie")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", false, false)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", false, false)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", false, false)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", true, true)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", false, false)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", false, false)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", false, false)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", false, false)
					break;
				case "shuangzi33":
					roomFunction.playSound(false, "shuangzi")
					roomFunction.stopSound("shuangyu")
					roomFunction.stopSound("baiyang")
					roomFunction.stopSound("juxie")
					roomFunction.stopSound("shuiping")
					roomFunction.stopSound("tiancheng")
					roomFunction.stopSound("sheshou")
					roomFunction.stopSound("mojie")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", false, false)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", false, false)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", false, false)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", false, false)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", true, true)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", false, false)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", false, false)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", false, false)
					break;
				case "tiancheng33":
					roomFunction.playSound(false, "tiancheng")
					roomFunction.stopSound("shuangyu")
					roomFunction.stopSound("baiyang")
					roomFunction.stopSound("juxie")
					roomFunction.stopSound("shuangzi")
					roomFunction.stopSound("shuiping")
					roomFunction.stopSound("sheshou")
					roomFunction.stopSound("mojie")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", false, false)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", false, false)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", false, false)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", false, false)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", false, false)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", true, true)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", false, false)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", false, false)
					break;
				case "sheshou33":
					roomFunction.playSound(false, "sheshou")
					roomFunction.stopSound("shuangyu")
					roomFunction.stopSound("baiyang")
					roomFunction.stopSound("juxie")
					roomFunction.stopSound("shuangzi")
					roomFunction.stopSound("tiancheng")
					roomFunction.stopSound("shuiping")
					roomFunction.stopSound("mojie")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", false, false)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", false, false)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", false, false)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", false, false)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", false, false)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", false, false)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", true, true)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", false, false)
					break;
				case "mojie33":
					roomFunction.playSound(false, "mojie")
					roomFunction.stopSound("shuangyu")
					roomFunction.stopSound("baiyang")
					roomFunction.stopSound("juxie")
					roomFunction.stopSound("shuangzi")
					roomFunction.stopSound("tiancheng")
					roomFunction.stopSound("sheshou")
					roomFunction.stopSound("shuiping")
					fastop.xingzuoLook("shuiping33", "shuiping.shuiping2", false, false)
					fastop.xingzuoLook("shuangyu33", "shuangyu.shuangyu2", false, false)
					fastop.xingzuoLook("baiyang33", "baiyang.baiyang2", false, false)
					fastop.xingzuoLook("juxie33", "juxie.juxie2", false, false)
					fastop.xingzuoLook("shuangzi33", "shuangzi.shuangzi2", false, false)
					fastop.xingzuoLook("tiancheng33", "tiancheng.tiancheng2", false, false)
					fastop.xingzuoLook("sheshou33", "sheshou.sheshou2", false, false)
					fastop.xingzuoLook("mojie33", "mojie.mojie2", true, true)
					break;

			}
		}
	},
	gameEndControl(face, x, y, onOff, nodeId, event) {
		if (nodeId == "StopRed" && onOff == true) {
			engine.log("开始定时器")
			haiPaiFuncs.gameEndControl.haha = setTimeout(() => {
				wanFa_haiPai.gameLevelEnd()
			}, 10000);
		}
		if (nodeId == "StopRed" && onOff == false) {
			engine.log("清除定时器")
			clearTimeout(haiPaiFuncs.gameEndControl.haha)
		}
	},

	vacancyOne() {
		//杂乱色块生成
		let i = 0;
		let j = 0;
		for (i = 0; i < 16; i++) {
			for (j = 0; j < 42; j++) {
				let b = Math.floor(Math.random() * 254)
				let opInfo = {
					opId: "addBackColor" + i + "_" + j,
					opType: "addNode",
					//opNode: "",
					nodes: [{
						nodeId: "backColor" + i + "_" + j,
						surface: "b",
						pt: {
							x: i,
							y: j
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
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
				gameFuncs.op(opInfo);

			}
		}
		setTimeout(() => {
			for (i = 0; i < 16; i++) {
				for (j = 0; j < 42; j++) {
					//let b = Math.floor(Math.random() * 254)
					let t = Math.random()
					let opInfo1 = {
						opId: "PlayBackColor" + i + "_" + j,
						opType: "play",
						opNode: "backColor" + i + "_" + j,
						timeLen: 5,
						loop: "true",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									shape: {
										rgba: {
											r: 73,
											g: 176,
											b: 251,
											a: 1
										}
									}
								}
							},
							{
								t: t,
								keyFrame: {
									shape: {
										rgba: {
											r: 73,
											g: 176,
											b: 251,
											a: 0
										}
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo1)

				}
			}


		}, 1000);

	},
	vacancyTwo() {
		//杂乱色块生成
		let i = 0;
		let j = 0;
		for (i = 0; i < 16; i++) {
			for (j = 0; j < 42; j++) {
				let b = Math.floor(Math.random() * 254)
				let opInfo = {
					opId: "addBackColor" + i + "_" + j,
					opType: "addNode",
					//opNode: "",
					nodes: [{
						nodeId: "backColor" + i + "_" + j,
						surface: "b",
						pt: {
							x: i,
							y: j
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
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
				gameFuncs.op(opInfo);

			}
		}
		setTimeout(() => {
			for (i = 0; i < 16; i++) {
				for (j = 0; j < 42; j++) {
					//let b = Math.floor(Math.random() * 254)
					let t = Math.random()
					let opInfo1 = {
						opId: "PlayBackColor" + i + "_" + j,
						opType: "play",
						opNode: "backColor" + i + "_" + j,
						timeLen: 5,
						loop: "true",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									shape: {
										rgba: {
											r: 73,
											g: 176,
											b: 251,
											a: 1
										}
									}
								}
							},
							{
								t: t,
								keyFrame: {
									shape: {
										rgba: {
											r: 73,
											g: 176,
											b: 251,
											a: 0.3
										}
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo1)

				}
			}


		}, 1000);

	},
	vacancyThree() {
		//杂乱色块生成
		let i = 0;
		let j = 0;
		for (i = 0; i < 16; i++) {
			for (j = 0; j < 42; j++) {
				let b = Math.floor(Math.random() * 254)
				let opInfo = {
					opId: "addBackColor" + i + "_" + j,
					opType: "addNode",
					//opNode: "",
					nodes: [{
						nodeId: "backColor" + i + "_" + j,
						surface: "b",
						pt: {
							x: i,
							y: j
						},
						size: {
							w: 0,
							h: 0
						},
						anchorPt: {
							x: 0,
							y: 0
						},
						canTap: "true",
						visible: "true",
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
				gameFuncs.op(opInfo);

			}
		}
		setTimeout(() => {
			for (i = 0; i < 16; i++) {
				for (j = 0; j < 42; j++) {
					let b = Math.floor(Math.random() * 254)
					let t = Math.random()
					let opInfo1 = {
						opId: "PlayBackColor" + i + "_" + j,
						opType: "play",
						opNode: "backColor" + i + "_" + j,
						timeLen: 5,
						loop: "true",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									shape: {
										rgba: {
											r: 0,
											g: 0,
											b: b,
											a: 1
										}
									}
								}
							},
							{
								t: t,
								keyFrame: {
									shape: {
										rgba: {
											r: 0,
											g: 0,
											b: b,
											a: 0.5
										}
									}
								}
							}
						]
					}
					gameFuncs.op(opInfo1)

				}
			}


		}, 1000);

	},
	addColor002() {//竞技第一位玩家
		let opInfo = {
			opId: "color001", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "color001",
					surface: "b",
					pt: {
						x: 0,
						y: 0
					},
					rotation: 0,
					visible: true,
					canTap: true,
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 0,
								y: 0
							},
							rb: {
								x: 15,
								y: 31
							}
						},
						rgba: {
							r: 254,
							g: 254,
							b: 254,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addColor003() {//竞技第一位玩家
		let opInfo = {
			opId: "color002", //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "color002",
					surface: "b",
					pt: {
						x: 0,
						y: 0
					},
					rotation: 0,
					visible: true,
					canTap: true,
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 0,
								y: 0
							},
							rb: {
								x: 15,
								y: 31
							}
						},
						rgba: {
							r: 204,
							g: 153,
							b: 254,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	tapSite(face, x, y, onOff, nodeId, event) {

		if (nodeId == "" && onOff == true && nowInfos.lifeProtect == 0) {
			nowInfos.lifeProtect = 1;
			setTimeout(() => {
				nowInfos.lifeProtect = 0;
			}, 50);
			let opInfo = {
				opId: "blue" + x + "-" + y,
				opType: "addNode",
				opNode: "",
				nodes: [
					{
						nodeId: "blue" + x + "-" + y, // 节点id，定位用
						surface: face,
						pt: { x: x, y: y }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
						rotation: 0, // 角度
						nodes: [], // 子节点
						canTap: true,
						visible: true, //显示，如果为false，逻辑数据会跳过
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
								r: levelInfos.level == 999 ? 254 : 0,
								g: 0,
								b: 0,
								a: 1
							}
						},
					}
				]
			}
			gameFuncs.op(opInfo);
		}
		if (nodeId && onOff == true && nowInfos.lifeProtect == 0) {
			nowInfos.lifeProtect = 1;
			setTimeout(() => {
				nowInfos.lifeProtect = 0;
			}, 50);
			fastop.removeNode((nodeId + x + "-" + y), nodeId)
		}

	},
	tapSiteArr() {
		let arr = []
		for (let x = 0; x < 16; x++) {
			for (let y = 0; y < 42; y++) {
				let str = gameFuncs.surfacePointInfo("b", x, y);
				let info = JSON.parse(str)
				if (info.rgb.R == 254 && info.rgb.G == 0) {
					arr.push([x, y])
				}
			}
		}
		engine.log("arr====" + arr)
		engine.log("arr----" + JSON.stringify(arr))

	},



	CountPlay() {
		haiPaiFuncs.CountPlay.innerCount = setIntervalCount(function (index, count) {
			let opInfo = {
				opId: "screenCountPlay",
				opType: "screenDisplay",
				screenDisplay: {
					model: "dis_3b01",
					block1: {
						model: "dis_b_numUnit",
						label1: "SECONDS",
						value1: nowInfos.gameCountTime
					},
					block2: {
						model: "dis_b_targetColor",
						label1: "目标",
						value1: "#0000ff",
						label2: "BLUE",
						value2: nowInfos.target
					},
					block3: {
						model: "dis_b_scoreGame",
						label1: "游戏得分",
						value1: usersInfos.gameScore,
						label2: "关卡总分",
						value2: usersInfos.levelScore
					}
				}
			}
			gameFuncs.op(opInfo);
			nowInfos.gameCountTime--
			if (nowInfos.gameCountTime == 0) {
				wanFa_haiPai.gameLevelEnd()
			}
		}, 1000, (nowInfos.gameCountTime + 6))

	},
}