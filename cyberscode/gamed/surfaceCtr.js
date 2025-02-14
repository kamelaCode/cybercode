const surfaceCtr = {
	//开关门控制。door值为0或1，0代表入口们，1代表出口门。doorTime为门开启时间,毫秒。
	ctlDoor(door,doorTime){
		let opInfo = {
			opId: "op001"+Math.random()*10,
			opType: "set",
			surface:"x",
			shape:{
				type:"point",
				points:[{x:door,y:0}],
				onOff:true,
			}
		}
		gameFuncs.op(opInfo);
		let opInfo2 = {
			opId: "op002"+Math.random()*10,
			opType: "set",
			surface:"x",
			shape:{
				type:"point",
				points:[{x:door,y:0}],
				onOff:false,
			}
		}
		setTimeout(function(){
		gameFuncs.op(opInfo2);},doorTime);
	},
	
	//设置面背景颜色
	setFaceRGBA(face,r,g,b,a){
		let opInfo = {
			opId: "op001",
			opType: "set",
			surface:face,
			shape:{
				rgba:{r:r,g:g,b:b,a:a}
			}
		}
		gameFuncs.op(opInfo);
	},
	
	//操作节点旋转 RArr=[{t,rot}]
	playNodeRotation(opId,nodeid,RArr,lenTM,loop){
		let opInfo = {
			opId:opId,
			opType:"play",
			opNode:nodeid,
			keyFrames:[],
			timeLen:lenTM,
			loop:loop
		}
		let arr = [];
		for (let obj of RArr) {
			arr.push({t:obj.t,keyFrame:{rotation:obj.rot}})
		}
		opInfo.keyFrames = arr;
		engine.log(JSON.stringify(opInfo))
		gameFuncs.op(opInfo);
	},
	
	//暂定播放
	playPause(opId,nodeid){
		let opInfo = {
			opId:opId,
			opType:"pause",
			opNode:nodeid
		}
		gameFuncs.op(opInfo);
	},
	
	//恢复播放
	playResume(opId,nodeid){
		let opInfo = {
			opId:opId,
			opType:"resume",
			opNode:nodeid
		}
		gameFuncs.op(opInfo);
	},
}
