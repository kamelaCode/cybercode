const fastop = {
	setNodeVisible(opId, opNode, timeLen, svisible, scanTap, evisible, ecanTap) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: timeLen,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: svisible,
						canTap: scanTap
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: evisible,
						canTap: ecanTap
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	heaven(opId, opNode, time) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: time,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	xingzuoLook(opId, opNode, visible, canTap) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						visible: visible,
						canTap: canTap
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	heavenbeijing(opId, opNode) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.8,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: false,
						canTap: false
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
			]
		}
		gameFuncs.op(opInfo);
	},
	chest(opId, opNode) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: false,
						canTap: true
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: true,
						canTap: true
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	nodeMove(opId, opNode, timeLen, loop, face, zptx, zpty, optx, opty) {//节点移动zzptx,zzpty,
		//操作id 要移动的节点id 执行时间 是否循环 工作面 起始x坐标 起始y坐标 横向位移数 纵向位移数
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: timeLen,
			loop: loop,
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						surface: face,
						pt: {
							x: zptx,
							y: zpty
						}
					}
				},
				// {
				// 	t: 0.5,
				// 	keyFrame: {
				// 		surface: face,
				// 			pt: {
				// 				x: zzptx,
				// 				y: zzpty
				// 			}
				// 		}
				// },
				{
					t: 1,
					keyFrame: {
						surface: face,
						pt: {
							x: optx,
							y: opty
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	changeNodeColor(opId, opNode, timeLen, srgba, ergba) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: timeLen,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: srgba.r,
								g: srgba.g,
								b: srgba.b,
								a: srgba.a,
							}
						}

					}
				},
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: ergba.r,
								g: ergba.g,
								b: ergba.b,
								a: ergba.a,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	heavenwrong(opId, opNode, a, b, c) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.8,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 195,
								g: 195,
								b: 195,
								a: 1,
							}
						}

					}
				},
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: a,
								g: b,
								b: c,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	jingZiColor(opId, opNode, r, g, b, opId1, opNode1, r1, g1, b1, opId2, opNode2, r2, g2, b2) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: r,
								g: g,
								b: b,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
		let opInfo1 = {
			opId: opId1,
			opType: "play",
			opNode: opNode1,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: r1,
								g: g1,
								b: b1,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo1);
		let opInfo2 = {
			opId: opId2,
			opType: "play",
			opNode: opNode2,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: r2,
								g: g2,
								b: b2,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo2);
	},
	chestChange(opId, opNode) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: 152,
								g: 101,
								b: 0,
								a: 1,
							}
						}

					}
				},
				{
					t: 0.25,
					keyFrame: {
						shape: {
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1,
							}
						}

					}
				},
				{
					t: 0.5,
					keyFrame: {
						shape: {
							rgba: {
								r: 152,
								g: 101,
								b: 0,
								a: 1,
							}
						}

					}
				},
				{
					t: 0.75,
					keyFrame: {
						shape: {
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1,
							}
						}

					}
				},
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: 152,
								g: 101,
								b: 0,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	heavenChange(opId, opNode, r, g, b) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: r,
								g: g,
								b: b,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	grey(opId, opNode) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: 254,
								g: 254,
								b: 254,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	white(opId, opNode) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						shape: {
							rgba: {
								r: 0,
								g: 0,
								b: 0,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	removeNode(opId, opNode) {//删除节点
		//操作id 操作节点
		let opInfo = {
			opId: opId,
			opType: "rmNode",
			opNode: opNode,
		}
		gameFuncs.op(opInfo);
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
	clearAllNode() {//清除所有节点
		let opInfo = {
			opType: "clearAllNode"
		}
		gameFuncs.op(opInfo);
	},
	audioPlay(opId, src, loop) {//放歌
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "audioPlay", // 操作类型，播放音频
			src: src, // mp3文件名称及相对路径，必须是英文会字母构成
			loop: loop, //是否循环播放
		}
		gameFuncs.op(opInfo);
	},
	audioStop(opId) {//停止并销毁播放控制
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "audioStop", // 操作类型，停止并销毁播放控制
		}
		gameFuncs.op(opInfo);
	},
	audioPause(opId) {//暂停播放
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "audioPause", // 操作类型，暂停播放
		}
		gameFuncs.op(opInfo);
	},
	audioResume(opId) {//恢复播放
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "audioResume", // 操作类型，恢复播放
		}
		gameFuncs.op(opInfo);
	},
	perLoadGameId(opId, gameId) {//预装游戏
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "perLoadGameId", // 操作类型，切换到新的小游戏
			gameId: gameId, //下一个游戏
		}
		gameFuncs.op(opInfo);
	},
	goToGameId(opId, gameId, trans) {//跳转游戏

		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "goToGameId", // 操作类型，切换到新的小游戏
			gameId: gameId, //下一个游戏
			trans: trans, // 过渡效果模板，默认没有，后续支持添加其他效果leftRightCover/rightLeftCover/topBottomCover/botoomTopCover/centerRectWave
		}
		gameFuncs.op(opInfo);


	},
	addNode(opId, nodeId, face, x, y, r, g, b) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId, // 节点id，定位用
					surface: face,  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "point",
						"points": [
							{
								"x": x,
								"y": y
							}
						],
						"rgba": {
							"r": r,
							"g": g,
							"b": b,
							"a": 1
						},
						"onOff": true
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},

	addRed(opId, nodeId, x, y) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 254,
							g: 0,
							b: 0,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);


		// let opInfo1 = {
		// 	opId: opId + "x", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "x",
		// 			surface: "zhong",
		// 			pt: {
		// 				x: x,
		// 				y: y
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: 0,
		// 						y: 0
		// 					},
		// 					rb: {
		// 						x: 0,
		// 						y: 0
		// 					}
		// 				},
		// 				rgba: {
		// 					r: 254,
		// 					g: 0,
		// 					b: 0,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo1);


		// let opInfo2 = {
		// 	opId: opId + "xx", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "xx",
		// 			surface: "nei",
		// 			pt: {
		// 				x: x,
		// 				y: y
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: 0,
		// 						y: 0
		// 					},
		// 					rb: {
		// 						x: 0,
		// 						y: 0
		// 					}
		// 				},
		// 				rgba: {
		// 					r: 254,
		// 					g: 0,
		// 					b: 0,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo2);
	},
	addRedHallween(opId, nodeId, x, y, ex, ey) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: ex,
								y: ey
							}
						},
						rgba: {
							r: 254,
							g: 0,
							b: 0,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addColor002(opId, nodeId, x1, y1, r, g, b) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
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
								x: x1,
								y: y1
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addHappy001(opId, nodeId, x, y, r, g, b) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "a",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addWujin(opId, nodeId, surface, x, y, x1, y1, r, g, b) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: surface,
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
								x: x,
								y: y
							},
							rb: {
								x: x1,
								y: y1
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addJing001(opId, nodeId, x, y, r, g, b) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addJing002(opId, nodeId, x, y, r, g, b) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addJing003(opId, nodeId, x1, y1, x2, y2, r, g, b) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
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
								x: x1,
								y: y1
							},
							rb: {
								x: x2,
								y: y2
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},

	addTapJing(opId, nodeId, x, y, r, g, b, opId1, nodeId1, x1, y1, r1, g1, b1, opId2, nodeId2, x3, y3, x4, y4, r2, g2, b2) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
		let opInfo1 = {
			opId: opId1, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId1,
					surface: "b",
					pt: {
						x: x1,
						y: y1
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: r1,
							g: g1,
							b: b1,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo1);
		let opInfo2 = {
			opId: opId2, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId2,
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
								x: x3,
								y: y3
							},
							rb: {
								x: x4,
								y: y4
							}
						},
						rgba: {
							r: r2,
							g: g2,
							b: b2,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo2);
	},

	addOrange(opId, nodeId, x, y) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 254,
							g: 102,
							b: 0,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);


		// let opInfo1 = {
		// 	opId: opId + "x", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "x",
		// 			surface: "zhong",
		// 			pt: {
		// 				x: x,
		// 				y: y
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: 0,
		// 						y: 0
		// 					},
		// 					rb: {
		// 						x: 0,
		// 						y: 0
		// 					}
		// 				},
		// 				rgba: {
		// 					r: 254,
		// 					g: 102,
		// 					b: 0,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo1);


		// let opInfo2 = {
		// 	opId: opId + "xx", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "xx",
		// 			surface: "nei",
		// 			pt: {
		// 				x: x,
		// 				y: y
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: 0,
		// 						y: 0
		// 					},
		// 					rb: {
		// 						x: 0,
		// 						y: 0
		// 					}
		// 				},
		// 				rgba: {
		// 					r: 254,
		// 					g: 102,
		// 					b: 0,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo2);
	},

	addYellow(opId, nodeId, x, y) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 254,
							g: 254,
							b: 0,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);


		// let opInfo1 = {
		// 	opId: opId + "x", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "x",
		// 			surface: "zhong",
		// 			pt: {
		// 				x: x,
		// 				y: y
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: 0,
		// 						y: 0
		// 					},
		// 					rb: {
		// 						x: 0,
		// 						y: 0
		// 					}
		// 				},
		// 				rgba: {
		// 					r: 254,
		// 					g: 254,
		// 					b: 0,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo1);


		// let opInfo2 = {
		// 	opId: opId + "xx", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "xx",
		// 			surface: "nei",
		// 			pt: {
		// 				x: x,
		// 				y: y
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: 0,
		// 						y: 0
		// 					},
		// 					rb: {
		// 						x: 0,
		// 						y: 0
		// 					}
		// 				},
		// 				rgba: {
		// 					r: 254,
		// 					g: 254,
		// 					b: 0,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo2);
	},

	addGreen(opId, nodeId, x, y) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 0,
							g: 128,
							b: 0,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);


	},

	addBlue(opId, nodeId, x, y) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 0,
							g: 0,
							b: 254,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},

	//单颜色胜利动画
	addWin(opId, nodeId, x, y, ex, ey, r, g, b) {//4，0 - 6，3   2，0 - 8，3   0，0 - 10，3
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
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
								x: x,
								y: y
							},
							rb: {
								x: ex,
								y: ey
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);


		// let opInfo1 = {
		// 	opId: opId + "x", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "x",
		// 			surface: "zhong",
		// 			pt: {
		// 				x: 0,
		// 				y: 0
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: x,
		// 						y: y
		// 					},
		// 					rb: {
		// 						x: ex,
		// 						y: ey
		// 					}
		// 				},
		// 				rgba: {
		// 					r: r,
		// 					g: g,
		// 					b: b,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo1);


		// let opInfo2 = {
		// 	opId: opId + "xx", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "xx",
		// 			surface: "nei",
		// 			pt: {
		// 				x: 0,
		// 				y: 0
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: x,
		// 						y: y
		// 					},
		// 					rb: {
		// 						x: ex,
		// 						y: ey
		// 					}
		// 				},
		// 				rgba: {
		// 					r: r,
		// 					g: g,
		// 					b: b,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo2);
	},
	addWin2(opId, nodeId, timeLen, x, y, ex, ey, r, g, b) {//4，0 - 6，3   2，0 - 8，3   0，0 - 10，3
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			timeLen: timeLen,
			nodes: [
				{
					nodeId: nodeId,
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
								x: x,
								y: y
							},
							rb: {
								x: ex,
								y: ey
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);


		// let opInfo1 = {
		// 	opId: opId + "x", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "x",
		// 			surface: "zhong",
		// 			pt: {
		// 				x: 0,
		// 				y: 0
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: x,
		// 						y: y
		// 					},
		// 					rb: {
		// 						x: ex,
		// 						y: ey
		// 					}
		// 				},
		// 				rgba: {
		// 					r: r,
		// 					g: g,
		// 					b: b,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo1);


		// let opInfo2 = {
		// 	opId: opId + "xx", //操作id 再控制用
		// 	opType: "addNode", // 操作类型，添加一个节点或精灵
		// 	opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
		// 	nodes: [
		// 		{
		// 			nodeId: nodeId + "xx",
		// 			surface: "nei",
		// 			pt: {
		// 				x: 0,
		// 				y: 0
		// 			},
		// 			rotation: 0,
		// 			visible: true,
		// 			canTap: true,
		// 			shape: {
		// 				type: "rect",
		// 				rect: {
		// 					lt: {
		// 						x: x,
		// 						y: y
		// 					},
		// 					rb: {
		// 						x: ex,
		// 						y: ey
		// 					}
		// 				},
		// 				rgba: {
		// 					r: r,
		// 					g: g,
		// 					b: b,
		// 					a: 1
		// 				}
		// 			},

		// 		}
		// 	]
		// }
		// gameFuncs.op(opInfo2);
	},
	addDuobi(opId, nodeId, x, y, ex, ey, visible, canTap, r, g, b) {//4，0 - 6，3   2，0 - 8，3   0，0 - 10，3
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
					},
					rotation: 0,
					visible: visible,
					canTap: canTap,
					shape: {
						type: "rect",
						rect: {
							lt: {
								x: 0,
								y: 0
							},
							rb: {
								x: ex,
								y: ey
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addtran(opId, nodeId, x, y, ex, ey, r, g, b) {//4，0 - 6，3   2，0 - 8，3   0，0 - 10，3
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "a",
					pt: {
						x: x,
						y: y
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
								x: ex,
								y: ey
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addtanke(opId, opNode, nodeId, x, y, ex, ey, nodeId1, px1, py1, px2, py2, px3, py3, px4, py4, px5, py5, px6, py6, px7, py7, px8, py8, px9, py9, px10, py10, px11, py11, px12, py12, r, g, b, nodeId2, px13, py13, r1, g1, b1) {//4，0 - 6，3   2，0 - 8，3   0，0 - 10，3
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: opNode, // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
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
								x: x,
								y: y
							},
							rb: {
								x: ex,
								y: ey
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},
					nodes: [
						{
							nodeId: nodeId1,
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},

							visible: true,
							canTap: true,

							shape: {
								type: "point",
								points: [
									{
										x: px1,
										y: py1
									},
									{
										x: px2,
										y: py2
									},
									{
										x: px3,
										y: py3
									},
									{
										x: px4,
										y: py4
									},
									{
										x: px5,
										y: py5
									},
									{
										x: px6,
										y: py6
									},
									{
										x: px7,
										y: py7
									},
									{
										x: px8,
										y: py8
									},
									{
										x: px9,
										y: py9
									},
									{
										x: px10,
										y: py10
									},
									{
										x: px11,
										y: py11
									},
									{
										x: px12,
										y: py12
									},
									{
										x: px12,
										y: py12
									},
									{
										x: px12,
										y: py12
									},
									{
										x: px12,
										y: py12
									}
								],
								rgba: {
									r: r,
									g: g,
									b: b,
									a: 1
								}
							}
						},
						{
							nodeId: nodeId2,
							surface: "b",
							pt: {
								x: 0,
								y: 0
							},

							visible: true,
							canTap: true,
							shape: {
								type: "point",
								points: [
									{
										x: px13,
										y: py13
									}
								],
								rgba: {
									r: r1,
									g: g1,
									b: b1,
									a: 1
								}
							}
						}
					]

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	//pass过关
	allBlink2() {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 32; j++) {
				let opInfo = {
					opId: "addblink" + i + "_" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "blink" + i + "_" + j, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: i, y: j }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								"type": "point",
								"points": [
									{
										"x": 0,
										"y": 0
									}
								],
								"rgba": {
									"r": 254,
									"g": 20,
									"b": 147,
									"a": 1
								},
								"onOff": true
							}
						}
					]
				}
				gameFuncs.op(opInfo);

				setTimeout(() => {
					let opInfo = {
						opId: "blinkblink" + i + "_" + j,
						opType: "play",
						opNode: "blink" + i + "_" + j,
						timeLen: Math.random() * 2 + 2,
						loop: "true",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 20,
											"b": 147,
											"a": 1
										},

									}
								}
							}, {
								t: 0.5,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 20,
											"b": 147,
											"a": 0
										},

									}
								}
							}, {
								t: 1,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 20,
											"b": 147,
											"a": 1
										},

									}
								}
							},

						]
					}
					gameFuncs.op(opInfo);
				}, 100);
			}
		}
	},
	//youwin过关
	allBlink3() {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 32; j++) {
				let opInfo = {
					opId: "addblink" + i + "_" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "blink" + i + "_" + j, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: i, y: j }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								"type": "point",
								"points": [
									{
										"x": 0,
										"y": 0
									}
								],
								"rgba": {
									"r": 254,
									"g": 254,
									"b": 0,
									"a": 1
								},
								"onOff": true
							}
						}
					]
				}
				gameFuncs.op(opInfo);

				setTimeout(() => {
					let opInfo = {
						opId: "blinkblink" + i + "_" + j,
						opType: "play",
						opNode: "blink" + i + "_" + j,
						timeLen: Math.random() * 2 + 2,
						loop: "true",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 254,
											"b": 0,
											"a": 1
										},

									}
								}
							}, {
								t: 0.5,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 254,
											"b": 0,
											"a": 0
										},

									}
								}
							}, {
								t: 1,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 254,
											"b": 0,
											"a": 1
										},

									}
								}
							},

						]
					}
					gameFuncs.op(opInfo);
				}, 100);
			}
		}
	},
	//bigWin
	allBlink4() {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 32; j++) {
				let opInfo = {
					opId: "addblink" + i + "_" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "blink" + i + "_" + j, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: i, y: j }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								"type": "point",
								"points": [
									{
										"x": 0,
										"y": 0
									}
								],
								"rgba": {
									"r": 0,
									"g": 254,
									"b": 0,
									"a": 1
								},
								"onOff": true
							}
						}
					]
				}
				gameFuncs.op(opInfo);

				setTimeout(() => {
					let opInfo = {
						opId: "blinkblink" + i + "_" + j,
						opType: "play",
						opNode: "blink" + i + "_" + j,
						timeLen: Math.random() * 2 + 2,
						loop: "true",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 0,
											"g": 254,
											"b": 0,
											"a": 1
										},

									}
								}
							}, {
								t: 0.5,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 0,
											"g": 254,
											"b": 0,
											"a": 0
										},

									}
								}
							}, {
								t: 1,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 0,
											"g": 254,
											"b": 0,
											"a": 1
										},

									}
								}
							},

						]
					}
					gameFuncs.op(opInfo);
				}, 100);
			}
		}
	},
	//lose
	allBlink5() {

		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 32; j++) {
				let opInfo = {
					opId: "addblink" + i + "_" + j, //操作id 再控制用
					opType: "addNode", // 操作类型，添加一个节点或精灵
					//opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
					nodes: [
						{
							nodeId: "blink" + i + "_" + j, // 节点id，定位用
							surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
							// node参数
							pt: { x: i, y: j }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
							rotation: 0, // 角度
							nodes: [], // 子节点
							canTap: true,
							visible: true, //显示，如果为false，逻辑数据会跳过
							shape: {
								"type": "point",
								"points": [
									{
										"x": 0,
										"y": 0
									}
								],
								"rgba": {
									"r": 254,
									"g": 0,
									"b": 0,
									"a": 1
								},
								"onOff": true
							}
						}
					]
				}
				gameFuncs.op(opInfo);

				setTimeout(() => {
					let opInfo = {
						opId: "blinkblink" + i + "_" + j,
						opType: "play",
						opNode: "blink" + i + "_" + j,
						timeLen: Math.random() * 2 + 2,
						loop: "true",
						keyFrames: [
							{
								t: 0,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 0,
											"b": 0,
											"a": 1
										},

									}
								}
							}, {
								t: 0.5,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 0,
											"b": 0,
											"a": 0
										},

									}
								}
							}, {
								t: 1,
								keyFrame: {
									shape: {

										"rgba": {
											"r": 254,
											"g": 0,
											"b": 0,
											"a": 1
										},

									}
								}
							},

						]
					}
					gameFuncs.op(opInfo);
				}, 100);
			}
		}
	},
	//删除节点
	removeAllBlink() {
		for (let i = 0; i < 16; i++) {
			for (let j = 0; j < 32; j++) {
				let opInfo = {
					opId: "rmblink" + i + "_" + j,
					opType: "rmNode",
					opNode: "blink" + i + "_" + j,
				}
				gameFuncs.op(opInfo);
			}
		}
	},
	addPickWin(speed, face, color) {
		let x1 = 0;
		let y1 = 0
		let x2 = (face == "a" ? 60 : 29);
		let y2 = 31
		let opInfo = {
			opId: "addArea" + face, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "redAreStartblue" + face, // 节点id，定位用
					surface: face == "a" ? "a" : "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: false, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: x1, y: y1 },
							rb: { x: x2, y: y2 }
						}
						,
						"rgba": {
							"r": color.r,
							"g": color.g,
							"b": color.b,
							"a": 1
						},

					}
				}
			]
		}
		gameFuncs.op(opInfo);

		setTimeout(() => {
			let opInfo = {
				opId: "PlayArea" + face,
				opType: "play",
				opNode: "redAreStartblue" + face,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							shape: {
								"rgba": {
									"r": color.r,
									"g": color.g,
									"b": color.b,
									"a": 1
								},
							}
						}
					},
					{
						t: 0.25,
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
						t: 0.5,
						keyFrame: {

							shape: {
								"rgba": {
									"r": color.r,
									"g": color.g,
									"b": color.b,
									"a": 1
								},
							}
						}
					},
					{
						t: 0.75,
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
								"rgba": {
									"r": color.r,
									"g": color.g,
									"b": color.b,
									"a": 1
								},
							}
						}
					},
					// {
					// 	t: 1,
					// 	keyFrame: {

					// 		shape: {
					// 			rgba: {
					// 				r: 0,
					// 				g: 0,
					// 				b: 0,
					// 				a: 1
					// 			}
					// 		}
					// 	}
					// }
					// ,
					// {
					// 	t: 0.6,
					// 	keyFrame: {
					// 		shape: {
					// 			"rgba": {
					// 				"r": color.r,
					// 				"g": color.g,
					// 				"b": color.b,
					// 				"a": 1
					// 			},
					// 		}
					// 	}
					// },
					// {
					// 	t: 0.7,
					// 	keyFrame: {
					// 		shape: {
					// 			rgba: {
					// 				r: 0,
					// 				g: 0,
					// 				b: 0,
					// 				a: 1
					// 			}
					// 		}
					// 	}
					// },
					// {
					// 	t: 0.8,
					// 	keyFrame: {
					// 		shape: {
					// 			"rgba": {
					// 				"r": color.r,
					// 				"g": color.g,
					// 				"b": color.b,
					// 				"a": 1
					// 			},
					// 		}
					// 	}
					// },
					// {
					// 	t: 0.9,
					// 	keyFrame: {
					// 		shape: {
					// 			rgba: {
					// 				r: 0,
					// 				g: 0,
					// 				b: 0,
					// 				a: 1
					// 			}
					// 		}
					// 	}
					// }, {
					// 	t: 1,
					// 	keyFrame: {
					// 		shape: {
					// 			"rgba": {
					// 				"r": color.r,
					// 				"g": color.g,
					// 				"b": color.b,
					// 				"a": 1
					// 			},
					// 		}
					// 	}
					// },
				]
			}
			gameFuncs.op(opInfo)//左上角红点



		}, 50);
	},
	setNodeVisiblee(opId, opNode, timeLen) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: timeLen,
			loop: "true",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						visible: false,
						canTap: false,
					}
				},
				{
					t: 0.5,
					keyFrame: {
						visible: true,
						canTap: true
					}
				},
				{
					t: 1,
					keyFrame: {
						visible: false,
						canTap: false
					}
				},
			]
		}
		gameFuncs.op(opInfo);
	},
	mie(opId, opNode, timeLen, r, g, b) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: timeLen,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: r,
								g: g,
								b: b,
								a: 0.4
							}
						}
					}
				},
				{
					t: 0.5,
					keyFrame: {
						shape: {
							rgba: {
								r: r,
								g: g,
								b: b,
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
								r: r,
								g: g,
								b: b,
								a: 0
							}
						}
					}
				}
				// {
				//  t: 0.75,
				//  keyFrame: {
				//      shape: {
				//          rgba: {
				//              r: r,
				//              g: g,
				//              b: b,
				//              a: 0.2
				//          }
				//      }
				//  }
				// },
				// {
				//  t: 1,
				//  keyFrame: {
				//      shape: {
				//          rgba: {
				//              r: r,
				//              g: g,
				//              b: b,
				//              a: 0.5
				//          }
				//      }
				//  }
				// },
			]
		}
		gameFuncs.op(opInfo);
	},
	liang(opId, opNode, timeLen, r, g, b) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: timeLen,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: r,
								g: g,
								b: b,
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
								r: r,
								g: g,
								b: b,
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
								r: r,
								g: g,
								b: b,
								a: 0.4
							}
						}
					}
				}
				// {
				//  t: 0.75,
				//  keyFrame: {
				//      shape: {
				//          rgba: {
				//              r: r,
				//              g: g,
				//              b: b,
				//              a: 0.2
				//          }
				//      }
				//  }
				// },
				// {
				//  t: 1,
				//  keyFrame: {
				//      shape: {
				//          rgba: {
				//              r: r,
				//              g: g,
				//              b: b,
				//              a: 0.5
				//          }
				//      }
				//  }
				// },
			]
		}
		gameFuncs.op(opInfo);
	},
	addNodee(opId, nodeId, face, x, y, r, g, b) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId, // 节点id，定位用
					surface: face,  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "point",
						"points": [
							{
								"x": x,
								"y": y
							}
						],
						"rgba": {
							"r": r,
							"g": g,
							"b": b,
							"a": 0.5
						},
						"onOff": true
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addhuan(opId, nodeId, face, lx, ly, rx, ry, r, g, b) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId, // 节点id，定位用
					surface: face,  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							"lt": {
								"x": lx,
								"y": ly
							},
							"rb": {
								"x": rx,
								"y": ry
							}
						},
						"ringWidth": 3,
						"ringRgba": {
							"r": r,
							"g": g,
							"b": b,
							"a": 1
						},
						"onOff": true
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},

	huanmove(opId, opNode, timeLen) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: timeLen,
			loop: "true",
			keyFrames: [
				{
					t: 0.25,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						rotation: 0,
						shape: {
							type: "rect",
							// ringWidth: 2,
							rect: {
								lt: {
									x: 7,
									y: 7
								},
								rb: {
									x: 8,
									y: 24
								}
							}
						}
					}
				},
				{
					t: 0.5,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						rotation: 0,
						shape: {
							type: "rect",
							// ringWidth: 2,
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 15,
									y: 30
								}
							}
						}
					}
				},
				{
					t: 0.75,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						rotation: 0,
						shape: {
							type: "rect",
							// ringWidth: 2,
							rect: {
								lt: {
									x: 7,
									y: 7
								},
								rb: {
									x: 8,
									y: 24
								}
							}
						}
					}
				},
				{
					t: 1,
					keyFrame: {
						surface: "b",
						pt: {
							x: 0,
							y: 0
						},
						size: {
							w: 0,
							h: 0
						},
						rotation: 0,
						shape: {
							type: "rect",
							// ringWidth: 2,
							rect: {
								lt: {
									x: 0,
									y: 0
								},
								rb: {
									x: 15,
									y: 30
								}
							}
						}
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},

	addDafeiji(opId, fatherId, nodeId, face, x, y, rgba) {
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: fatherId, // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId, // 节点id，定位用
					surface: face,  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
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
						rgba: rgba
					},
				}
			]
		}
		gameFuncs.op(opInfo);
	},

	addCyan(opId, nodeId, x, y) {//新六人
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 0,
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
	addBrown(opId, nodeId, x, y) {//新六人
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
					surface: "b",
					pt: {
						x: x,
						y: y
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
								x: 0,
								y: 0
							}
						},
						rgba: {
							r: 139,
							g: 69,
							b: 19,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);

	},
	addColorPlay(opId, nodeId, x, y, x1, y1) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
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
								x: x,
								y: y
							},
							rb: {
								x: x1,
								y: y1
							}
						},
						rgba: {
							r: 254,
							g: 20,
							b: 147,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	addColor(opId, nodeId, x, y, r, g, b) {
		//添加单独一个节点 操作id 节点id 工作面 x y坐标 红绿蓝参数
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId, // 节点id，定位用
					surface: "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: true,
					visible: true, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "point",
						"points": [
							{
								"x": x,
								"y": y
							},
							{
								"x": x + 1,
								"y": y
							},
							{
								"x": x,
								"y": y + 1
							},
							{
								"x": x + 1,
								"y": y + 1
							}
						],
						"rgba": {
							"r": r,
							"g": g,
							"b": b,
							"a": 1
						},
						"onOff": true
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	fakerChange(opId, opNode) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 1,
			loop: "false",
			keyFrames: [
				{
					t: 0.5,
					keyFrame: {
						canTap: false,
						visible: true,
						shape: {
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1,
							}
						}

					}
				},
				{
					t: 0.75,
					keyFrame: {
						canTap: false,
						visible: true,
						shape: {
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1,
							}
						}

					}
				},
				{
					t: 1,
					keyFrame: {
						canTap: false,
						visible: false,
						shape: {
							rgba: {
								r: 254,
								g: 0,
								b: 0,
								a: 1,
							}
						}

					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	targetOff(opId, opNode) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						visible: false,
					}
				}
			],

		}
		gameFuncs.op(opInfo);
	},
	//竞技结束后屏幕胜利方闪烁
	addJingJiWin(speed, face, color) {
		let x1 = 0;
		let y1 = 0
		let x2 = 16;
		let y2 = 31
		let opInfo = {
			opId: "addArea" + face, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: "redAreStartblue" + face, // 节点id，定位用
					surface: face == "a" ? "a" : "b",  //根节点必须指定工作面，子节点工作面自动忽略
					// node参数
					pt: { x: 0, y: 0 }, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
					rotation: 0, // 角度
					nodes: [], // 子节点
					canTap: false,
					visible: false, //显示，如果为false，逻辑数据会跳过
					shape: {
						"type": "rect",
						"rect": {
							lt: { x: x1, y: y1 },
							rb: { x: x2, y: y2 }
						}
						,
						"rgba": {
							"r": color.r,
							"g": color.g,
							"b": color.b,
							"a": 1
						},

					}
				}
			]
		}
		gameFuncs.op(opInfo);

		setTimeout(() => {
			let opInfo = {
				opId: "PlayArea" + face,
				opType: "play",
				opNode: "redAreStartblue" + face,
				timeLen: speed,
				loop: false,
				keyFrames: [
					{
						t: 0,
						keyFrame: {
							visible: true,
							shape: {
								"rgba": {
									"r": color.r,
									"g": color.g,
									"b": color.b,
									"a": 1
								},
							}
						}
					},
					{
						t: 0.25,
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
						t: 0.5,
						keyFrame: {

							shape: {
								"rgba": {
									"r": color.r,
									"g": color.g,
									"b": color.b,
									"a": 1
								},
							}
						}
					},
					{
						t: 0.75,
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
								"rgba": {
									"r": color.r,
									"g": color.g,
									"b": color.b,
									"a": 1
								},
							}
						}
					},
					// {
					// 	t: 1,
					// 	keyFrame: {

					// 		shape: {
					// 			rgba: {
					// 				r: 0,
					// 				g: 0,
					// 				b: 0,
					// 				a: 1
					// 			}
					// 		}
					// 	}
					// }
					// ,
					// {
					// 	t: 0.6,
					// 	keyFrame: {
					// 		shape: {
					// 			"rgba": {
					// 				"r": color.r,
					// 				"g": color.g,
					// 				"b": color.b,
					// 				"a": 1
					// 			},
					// 		}
					// 	}
					// },
					// {
					// 	t: 0.7,
					// 	keyFrame: {
					// 		shape: {
					// 			rgba: {
					// 				r: 0,
					// 				g: 0,
					// 				b: 0,
					// 				a: 1
					// 			}
					// 		}
					// 	}
					// },
					// {
					// 	t: 0.8,
					// 	keyFrame: {
					// 		shape: {
					// 			"rgba": {
					// 				"r": color.r,
					// 				"g": color.g,
					// 				"b": color.b,
					// 				"a": 1
					// 			},
					// 		}
					// 	}
					// },
					// {
					// 	t: 0.9,
					// 	keyFrame: {
					// 		shape: {
					// 			rgba: {
					// 				r: 0,
					// 				g: 0,
					// 				b: 0,
					// 				a: 1
					// 			}
					// 		}
					// 	}
					// }, {
					// 	t: 1,
					// 	keyFrame: {
					// 		shape: {
					// 			"rgba": {
					// 				"r": color.r,
					// 				"g": color.g,
					// 				"b": color.b,
					// 				"a": 1
					// 			},
					// 		}
					// 	}
					// },
				]
			}
			gameFuncs.op(opInfo)//左上角红点



		}, 50);
	},
	addStartUserColor(opId, nodeId, x, y, ex, ey, r, g, b) {//竞技第一位玩家
		let opInfo = {
			opId: opId, //操作id 再控制用
			opType: "addNode", // 操作类型，添加一个节点或精灵
			opNode: "", // 父节点，如果没有配置，默认到棋盘根节点0,0
			nodes: [
				{
					nodeId: nodeId,
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
								x: x,
								y: y
							},
							rb: {
								x: ex,
								y: ey
							}
						},
						rgba: {
							r: r,
							g: g,
							b: b,
							a: 1
						}
					},

				}
			]
		}
		gameFuncs.op(opInfo);
	},
	setLineVisible(opId, opNode, svisible) {//节点可见及交互
		//操作id 节点名 执行时间 是否可见 是否可交互起始&最终
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 1,
					keyFrame: {
						visible: svisible,
						canTap: false
					}
				}
			]
		}
		gameFuncs.op(opInfo);
	},
	nodeMoveColor(opId, opNode, r, g, b) {//节点变色
		//操作id 操作节点 执行时间 起始颜色对象 最终颜色对象（包含rgba）
		let opInfo = {
			opId: opId,
			opType: "play",
			opNode: opNode,
			timeLen: 0.1,
			loop: "false",
			keyFrames: [
				{
					t: 0,
					keyFrame: {
						shape: {
							rgba: {
								r: r,
								g: g,
								b: b,
								a: 0.3,
							}
						}

					}
				},
				// {
				// 	t: 1,
				// 	keyFrame: {
				// 		shape: {
				// 			rgba: {
				// 				r: ergba.r,
				// 				g: ergba.g,
				// 				b: ergba.b,
				// 				a: ergba.a,
				// 			}
				// 		}

				// 	}
				// }
			],

		}
		gameFuncs.op(opInfo);
	},

}