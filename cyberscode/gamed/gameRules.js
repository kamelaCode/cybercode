const gameRules = {
		tapBlink(face, x, y, onOff, nodeId, event) {
			if (onOff == true) {
				let opInfo = {
					opId: "add" + x + y,
					opType: "addNode",
					nodes: [{
						nodeId: "tap" + x + y,
						surface: face,
						pt: {
							x: 0,
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
						visible: true,
						canTap:false,
						shape: {
							type: "rect",
							rect: {
								lt: {
									x: x,
									y: y
								},
								rb: {
									x: x,
									y: y
								}
							},
							rgba: {
								r: 254,
								g: 254,
								b: 0,
								a: 1
							}
						}
				    }]

				}
				gameFuncs.op(opInfo)
				setTimeout(() => {
					fastop.removeNode("rmNode"+x+"_"+y,"tap" + x + y)
				}, 200);

			}

		},
      
		//生命值灯控制，判定错误时引用该函数控制生命值灯。默认为6格生命值。
		lifeMove() {
			if (nowInfos.lifePoint > 0) {
				let opInfo = {
					opId: "lifeMove",
					opType: "play",
					opNode: "life",
					timeLen: 0.01,
					loop: "false",
					keyFrames: [{
						t: 0,
						keyFrame: {
							surface: "life",
							pt: {
								x: nowInfos.lifePoint - 6,
								y: 0
							}
						}
					}]
				}
				gameFuncs.op(opInfo);
			} else if (nowInfos.lifePoint == 0) {
				let opInfo2 = {
					opId: "lifeMove",
					opType: "play",
					opNode: "life",
					timeLen: 0.01,
					loop: "false",
					keyFrames: [{
						t: 0,
						keyFrame: {
							surface: "life",
							pt: {
								x: nowInfos.lifePoint - 6,
								y: 0
							}
						}
					}]
				}
				gameFuncs.op(opInfo2);
			}
		},

		
	}

