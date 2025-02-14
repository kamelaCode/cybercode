//用户及得分信息
const usersInfos = {
	startTime: "",
	endTime: "",
	allUsers: [],//用户完整信息
	usersResult: [],//结算页面用户卡所需用户信息
	gameScore: 0,//游戏得分
	levelScore: 0,//关卡得分
	usersScore: [],//用户分数。严格按用户顺序排列
	startTime: 0,//关卡开始时间戳
	endTime: 0,//关卡结束时间戳
	Stars: 0,
	UseLife: 0, //消耗几条生命
	LeftLife: 0, //剩余几条生命
	SaveTime: 0, //节省时间（提前结束游戏节省的时间，毫秒值）
	ValidTrigger: 0, //有效触发次数（有效踩踏、有效发射等）
	ValidTarget: 0, //有效目标数量（消除数、射击击中目标数等）
	CompleteDegree: 0, //0-100，整关游戏的完成进度，完全通关为100
	SentryNum: 0, //哨兵编号，关卡内，进入第几轮用岗哨代替，也就是挑战第几个岗哨了，关卡模式岗哨就1个
	RetryCount: 0, //重复挑战岗哨的次数，关卡模式为0

}
let xianshi = 0
let Firstchart = [6, 7, 8, 14, 15, 16]
let lookBG = 0
let firstNum = 0
let secondNum = 0
let onlyOne = 0

let one11 = 0
let two11 = 0
let three11 = 0
let four11 = 0
let five11 = 0
let six11 = 0
let seven11 = 0
let eight11 = 0
let nine11 = 0
let ten11 = 0
let nowGameCout = 0


//抓小鬼
let countNum = 0
//关卡定位全局变量
const levelInfos = {
	mode: "",//模式
	wanFa: "",//玩法
	level: 0,//关卡
	gameIds: [],//游戏列表，包含本关所有小游戏的gameid和trans方式。结构[{gameid:"norm001-jz",trans:"none"}]
	gameIdList: [],//游戏id列表，只包含gameid
	difficulty: 0,//难度系数
	scoreCoefficient: 0,//积分系数

}

//当前游戏信息
const nowInfos = {
	nowGameid: "",//当前小游戏id
	nowGame: 0,
	lifePoint: 6,//生命值
	target: 30,//本游戏内目标剩余数量
	allTarget: 0,//本关游戏完成的全部目标数量
	gameCountTime: 90,//剩余时间计数，内屏倒计时用。
	lifeProtect: 0//生命值保护状态切换
}

//其他全局变量（非通用）
const mutourenInfos = {
	redCheck: 0,
	addGreen: false,
	allTime: 120,
	gameEndCtl: 0,
	gameLoopsNum: 0,
	bgmSpeed: 0,
	greenNums: 0,
	greenArea: 0
}
const mutourenPlusInfos = {
	redCheck: 0,
	addGreen: false,
	allTime: 120,
	gameEndCtl: 0,
	gameLoopsNum: 0,
	bgmSpeed: 0,

}
const pickInfos = {
	block2Infos: [],//用户颜色和分数数组
	jingjiColor: [],//根据刷卡人数那些颜色位置转变
	levelScoreAll: "",//内屏展示内容
	neiUser: [],
	orangeArrFaceA: [],
	orangeArrFaceB: [],
	cyanArrFaceA: [],
	cyanArrFaceB: [],
	redArrFaceA: [],
	redArrFaceB: [],
	yellowArrFaceA: [],
	yellowArrFaceB: [],
	greenArrFaceA: [],
	greenArrFaceB: [],
	blueArrFaceA: [],
	blueArrFaceB: [],
	brownArrFaceA: [],
	brownArrFaceB: [],
	redNum: 0,
	orangeNum: 0,
	yellowNum: 0,
	targetBlocks: 0,
	screenCirCtl: 0,
}
let aaa = 0;
let hhh = 0
let lycnb = 0
let pkarrColor = [
	{
		r: 254,
		g: 0,
		b: 0,
		a: 1,
	},
	{
		r: 0,
		g: 0,
		b: 254,
		a: 1,
	},
	{
		r: 0,
		g: 254,
		b: 0,
		a: 1,
	},
	{
		r: 254,
		g: 195,
		b: 0,
		a: 1,
	},
	{
		r: 0,
		g: 254,
		b: 254,
		a: 1,
	},
	{
		r: 139,
		g: 69,
		b: 19,
		a: 1,
	},
]
//色盲派对
const colorInfos = {
	ColorLoopNum: 0, //颜色循环计数
	selectColor: 0,//接收遍历后数组中的下标值，根据下标值决定rgb值
	colorProtect: 0,//颜色扣血生命值保护
	arrHighColor: [],//接收arrColor目标数组中随机抽取的颜色赋于地面
	noBody: 0,//提供给扣血函数中，当地面没有人时也会执行扣血
	//所有颜色数组（包括：目标点颜色，底层，中层，高层颜色，显示到地面上）负责提供整体游戏所需的所有颜色，通过抽取遍历的方式提供
	loopCtl: 0,
	hefeng: 0,
	tempProtect: 0,
	arrColor: [

		//DodgerBlue
		{
			r: 30,
			g: 144,
			b: 254,
			a: 1,
			color: "Blue",
			value: "#1E90FF",
			value2: "蓝色"
		},
		//LimeGreen
		{
			r: 50,
			g: 205,
			b: 50,
			a: 1,
			color: "Green",
			value: "#32CD32",
			value2: "绿色"
		},
		{
			r: 0,
			g: 0,
			b: 0,
			a: 1,
			color: "Black",
			value: "#000000",
			value2: "黑色"//黑色
		},
		{
			r: 254,
			g: 215,
			b: 0,
			a: 1,
			color: "Yellow",
			value: "#FFD700",
			value2: "黄色"
		},


		//DarkViolet
		{
			r: 148,
			g: 0,
			b: 211,
			a: 1,
			color: "Purple",
			value: "#9400D3",
			value2: "紫色"
		},
		//SaddleBrown
		{
			r: 139,
			g: 69,
			b: 19,
			a: 1,
			color: "Brown",
			value: "#8B4513",
			value2: "棕色"
		},
		//DeepPink
		{
			r: 254,
			g: 20,
			b: 147,
			a: 1,
			color: "Pink",
			value: "#FF1493",
			value2: "粉色"
		},
		//	OrangeRed
		{
			r: 254,
			g: 69,
			b: 0,
			a: 1,
			color: "Orange",
			value: "#FF4500",
			value2: "橙色"
		},
	],
	arrColor2: [
		//DodgerBlue
		{
			r: 30,
			g: 144,
			b: 254,
			a: 1,
			color: "Blue-l",
			value: "#1E90FF",
			value2: "天空是什么颜色"// 蓝色
		},
		//LimeGreen
		{
			r: 50,
			g: 205,
			b: 50,
			a: 1,
			color: "Green-l",
			value: "#32CD32",
			value2: "草地是什么颜色"//绿色
		},
		//	Black	0 0 0	#000000
		{
			r: 0,
			g: 0,
			b: 0,
			a: 1,
			color: "Black-l",
			value: "#000000",
			value2: "夜晚的代表颜色"//黑色
		},
		//Gold1
		{
			r: 254,
			g: 215,
			b: 0,
			a: 1,
			color: "Yellow-l",
			value: "#FFD700",
			value2: "七彩色的第三个"//黄色
		},
		//DarkViolet
		{
			r: 148,
			g: 0,
			b: 211,
			a: 1,
			color: "Purple-l",
			value: "#9400D3",
			value2: "红加蓝是什么色"//紫色
		},
		//SaddleBrown
		{
			r: 139,
			g: 69,
			b: 19,
			a: 1,
			color: "Brown-l",
			value: "#8B4513",
			value2: "咖啡是什么颜色"//棕色
		},
		//DeepPink
		{
			r: 254,
			g: 20,
			b: 147,
			a: 1,
			color: "Pink-l",
			value: "#FF1493",
			value2: "最少女心的颜色"//粉色
		},
		//	OrangeRed
		{
			r: 255,
			g: 69,
			b: 0,
			a: 1,
			color: "Orange-l",
			value: "#FF4500",
			value2: "橘子是什么颜色"//橙色
		},
	]

}
//离场外屏等控制变量
let userCardNums = 0
let leaveVariableCtl = 1;
let gameJumpWaitCtl = "跳"
let elevenNum = 0
let arrColorSss = {}
//井字棋记数
let blue1 = 0
let blue2 = 0
let blue3 = 0
let blue4 = 0
let blue5 = 0
let blue6 = 0
let blue7 = 0
let blue8 = 0
let blue9 = 0

let red1 = 0
let red2 = 0
let red3 = 0
let red4 = 0
let red5 = 0
let red6 = 0
let red7 = 0
let red8 = 0
let red9 = 0

let blueWinnn = 0
let redWinnn = 0
let blueTap = 0
let redTap = 0

let redNums = 0
let blueNums = 0
let blueKong = 0
let redKong = 0

//极限躲避
const duobiVar = {
	pointNum: 0,
	rmNum: 0,
	lineProtect: 0,
	lineNum: 0,
	rmLine: 0,
	areaNum: 0,
	rmArea: 0,
	circleNum: 0,
	rmCircle: 0,
	targetNum: 0,
	redlength: 2,
	look: 0,
	counter: 0
}
//竞技抢地盘
let playerNum = 0//玩家数
let dipanNum = 0//使用面板数
let winPlayersList = [0, 0, 0, 0, 0, 0]//新六人
let maxNum = 0
let neipList = "" //内屏显示分数
let neiUser = [] //玩家id
let playersScList = [0, 0, 0, 0, 0, 0]//红橙黄绿蓝记录玩家分数 //新六人
let winPlayers = 0//几个玩家得到最高分
let winPlayersName = []//记录所有第一玩家名
let colorList = [[254, 0, 0], [0, 0, 254], [0, 254, 0], [254, 195, 0], [0, 254, 254], [139, 69, 19]]//新六人
//红绿蓝黄粉棕
let neiProtect = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
let giveScoreList = [];

let usercolors = ["#FF0000", "#0000fe", "#00fe00", "#fec300", "#00FFFF", "#8b4513"];//新六人
let ganmeEndScreenShow = [];
let userColorShowString = [];
let userNameShowString = [];
let userScoreShowString = [];

let testtt = 0
let hefeng1 = 0
let fff = 0
let ggg = 0
let ccc = 0

let canTapNum = []
let judge = 0

//打蜜蜂玩法所需变量
let feijiMoveStart = 0
let feijiMoveEnd = 0
let feijiMoveTimes = 0
let feiji001Life = 6
let feiji002Life = 6
let feiji003Life = 12
let gameCtl = 0
let opClear = 0


//贪吃蛇
let snakeList = [[7, 11], [7, 12], [7, 13], [7, 14], [7, 15], [7, 16], [7, 17]]
let snakeTargetNum = 0//蛇得分数
let playerTargetNum = 0//玩家得分数
let roalX = 0//蛇头横向位移
let roalY = -1//蛇头纵向位移
let nx = 7//当前蛇头x
let ny = 11//当前蛇头y

let distanceList = []//目标点坐标总数数组
let nowTarget = []//当前目标点坐标
let nowTarName = 0//当前目标点下标数
let movenum = 0//用于控制蛇走斜角
let doubleUp = 0//重复结束
let noZuoBi = 0//蛇不动玩家也不能踩

let awa = 1
let qwq = 1

//冲刺Pro
let change = 0//为1时时间暂停
let winLose = 0//0-32Go 1lose
let guole = 0
let cuowu = 0

let cleanOp = 0

let shua = [[71, 242, 198], [15, 113, 127], [0, 209, 168], [63, 139, 159], [47, 79, 121]]
let ding = 0

//传递位置延时扣血逻辑
const deferredInfos = {
	xHistoricalData: 0,
	yHistoricalData: 0
}
let cbjh = 0
let zwy = 0
let cwy = 0
let lunci = 0
let mlb = 0
let kongzhi = 0
//我是电锯名称
let hahaha
//新lyc色盲
let moveColor = 0
// let sjColor = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]//坐标地图
let sjColor = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]//坐标地图
let colornum = 0//假点命名
let luanList = []//存储胡乱背景色名称
let target = 0//本轮target
let targetnumm = 0//真点命名
let rightnum = 0//真点数量
let fakernum = 2//假点数量
let gameMove = 0//游戏进程
let tapPanding = 0
let wrongNum = 0//判断扣血
let lunNum = 0
let control = 0
let remove = 0
let noSame = [0, 1, 2, 3, 4, 5, 6, 7]

//挑战模式积分规则变量
let challengeTime = 0
let challengeLife = 0

let pkNameList = []
let duoshao = 0//显示几个字符
const goldInfos = {
	block2Infos: [],//用户颜色和分数数组
	jingjiColor: [],//根据刷卡人数那些颜色位置转变
	levelScoreAll: "",//内屏展示内容
	neiUser: [],
	cyanArrFaceA: [],
	cyanArrFaceB: [],
	redArrFaceA: [],
	redArrFaceB: [],
	yellowArrFaceA: [],
	yellowArrFaceB: [],
	greenArrFaceA: [],
	greenArrFaceB: [],
	blueArrFaceA: [],
	blueArrFaceB: [],
	brownArrFaceA: [],
	brownArrFaceB: [],
	redNum: 0,
	orangeNum: 0,
	yellowNum: 0,
	targetBlocks: 0,
	screenCirCtl: 0,
	localNumOne: 0,
	localNumTwo: 0,
	localNumThree: 0,
	localNumFour: 0,
	localNumFive: 0,
	localNumSix: 0,
	suodingOne: 0,
	suodingTwo: 0,
	suodingThree: 0,
	suodingFour: 0,
	suodingFive: 0,
	suodingSix: 0,
	lineListRed: [],
	lineListBlue: [],
	lineListGreen: [],
	lineListYellow: [],
	lineListCyan: [],
	lineListBrown: [],
	ArrColor: [
		{
			r: 148,
			g: 0,
			b: 211,
			a: 1,
			color: "Purple",
			value: "#9400D3",
			value2: "紫色"
		},
		//SaddleBrown
		{
			r: 254,
			g: 20,
			b: 147,
			a: 1,
			color: "Pink",
			value: "#66ffff",
			value2: "粉色"
		},
		//DeepPink
		{
			r: 204,
			g: 102,
			b: 153,
			a: 1,
			color: "Light",
			value: "#cc6699",
			value2: "浅紫色"
		},
	],
	playerScort: []
}

const teamPkInfos = {
	block2Infos: [],//用户颜色和分数数组
	levelScoreAll: "",//内屏展示内容 
	screenCirCtl: 0,
	allTime: 0,
	fenProtect: [],
	fireArr: [],
	changdu: 0,
	neiUser: [],
	userColorRed: [[254, 0, 0], [0, 254, 0], [0, 254, 253]],
	userColorBlue: [[0, 0, 254], [254, 195, 0], [139, 69, 19]]

}
const pintuInfos = {
	targetPointArray: [],
	tapProject: [],
	uesrTapArry: [],
	caitaNames: [],
	hhhhh: [],
	clearCtl: 0,
	gameNums: 0
}
let muX = 0
let muY = 0
let mutX = 0
let mutY = 0
let hudong = 0
//反应大战
const jingJiInfos = {
	block2Infos: [],//用户颜色和分数数组
	jingjiColor: [],//根据刷卡人数那些颜色位置转变
	levelScoreAll: "",//内屏展示内容
	neiUser: [],
	screenCirCtl: 0,
	userBlockArr: [],
	userTargetRecord: [],
	remainTimes: 0
}
//传递位置新增判断玩家踩踏变量
const tranInfos = {
	blueProject: 0,
	biepeng: 0,
	oldId: "",
	wallNum: 0,
	removeWall: 0,
	remonber: [],
	randmColor: 0,
	whoClos: 0
}
let dontMove = 0
let clearNum = 0
let clearSix = 0
let cxxxx = 0
let qishi = []
let weights = []
let arrNew = []



//推箱子
let yinList = []//移动节点与箱子重复时 隐藏的移动节点数组
let byinList = []//移动节点与目标点重复时 变色的移动节点数组
let targetList = []//目标点位置
let fugaiList = []//如果两个箱子即将重叠 重叠后因层级关系 将会有一个移动节点覆盖在另一个箱子节点上 此时需要新生成一个颜色节点进行覆盖阻止游戏bug出现 
let yesNum = 0
let targetNum = 0
let teachmovenum = 0
let teach002 = 0//教学第一次复原播放语音
let butiaoteach = 0//教学使用不跳关播语音
let jiaoxueshiyong = 0
let kekou = 0
let luantui = 0
let shao = 0
let woquni = []
let fang = 0//为1播放
let fangmei = 0//为1 已播放 防止重复音频
let howyin = [0, 0, 0, 0, 0, 0, 0, 0]
let yinxiang = []
let chenggong = 0
let doubleJump = 0
// let lastpd = []
const turnblack = {
	r: 0,
	g: 0,
	b: 0,
	a: 0
}
const turnyellow = {
	r: 254,
	g: 254,
	b: 0,
	a: 1
}

const colorone = {
	r: 254,
	g: 204,
	b: 0,
	a: 1
}
const colortwo = {
	r: 254,
	g: 127,
	b: 221,
	a: 1
}
const colorthr = {
	r: 127,
	g: 254,
	b: 254,
	a: 1
}
const colorFour = {
	r: 0,
	g: 0,
	b: 0,
	a: 1
}
const colorFive = {
	r: 0,
	g: 102,
	b: 0,
	a: 1
}
const colorSix = {
	r: 0,
	g: 0,
	b: 254,
	a: 1
}
let nowcolor = 0
let buyao = 0
let bucai = 0

let noTap = 0
let nowAdress = 0
//外屏颜色数组
let conf = {}
const jingjibenpaoInfos = {
	userTartgetArr: {},
	userTartgetrangeX: [],
	userTartgetrangeY: [],
	userTimes: [],
	userTartgetrange: 0,
	runningNumber: 0
}
const tiaogeziInfos = {
	blinkArr: [],
	userCarNums: [0, 0, 0, 0, 0, 0],
	tapColorProject: [0, 0, 0, 0, 0, 0],
	showSpeed: 0,
	blockRange: 0,
	blockShow1: [],
	blockShow2: [],
	blockShow3: [],
	blockShow4: [],
	blockShow5: [],
	blockShow6: [],
}

const heavenInfos = {
	nowlist: [0, 1, 2, 1, 0],
	nowtap: [0, 0, 0, 0, 0, 0],
	cantap: [0, 0, 0, 0, 0, 0],
	allplayerName: ["red", "blue", "green", "yellow", "qing", "brown"],
	allnodeList: [".shang", ".xia", ".zuo", ".you", ".zuoshang", ".youshang", ".zuoxia", ".youxia"],
	diff: 5,
	lun: 0,
	xianList: [],
	redNow: "",
	blueNow: "",
	greenNow: "",
	yellowNow: "",
	qingNow: "",
	brownNow: "",
	cantap2: 0,
	paiming: 0,
	gamemod: 0,  //0及时踩 1记忆
	time: 0,
	when: 0,
	noteach: 0,
	sudu: 1200,
	shengji: 0
}
let heavenColorList = [[178, 0, 0], [0, 0, 178], [0, 178, 0], [178, 136, 0], [0, 178, 178], [111, 55, 14]]//新六人

//歌曲预加载控制变量
let soundCtl = true
let transs = 0
let mutouKong = 0

let kugou = 0
let wangyiyun = 0
let changpian = 0
//打飞机玩法所需变量
const dafeijiInfos = {
	bulletId: [],
	redId: [],
	bulletCtl: 0,
	bulletProject: {},
	feijiZidanNums: 0,
	feijiPoint: 0,
	feijiOldPoint: 0,
	interCount: 0,
	feijizidanArr: []
}
//节奏大师玩法所需变量
const jiezouInfos = {
	userAddScore: [{
		num: 0,
		score: 1
	},
	{
		num: 0,
		score: 1
	}, {
		num: 0,
		score: 1
	}, {
		num: 0,
		score: 1
	}, {
		num: 0,
		score: 1
	}, {
		num: 0,
		score: 1
	}
	],
	soundTime: 0,
	randmArr: [],
	musicArr: [],
	musicName: "",
	userArr: [0, 0, 4, 2, 0, 0, 0],
	tiaoNum: 0
}
//矩阵冲刺玩法墙面金币控制
let haiJinBiMoveCtl = 0

const gameRoom002 = {
	//系统等待状态，外屏进入可交互状态
	gameWait(gameid) {
		engine.log("当前小游戏id:" + gameid)
		roomFunction.addCardLight()
		setTimeout(function () {
			roomFunction.userCardLight()
			roomFunction.backLightRGB(gameid)
			roomFunction.addCoverLight()
			roomFunction.addCardCenterLight()
			if (gameid == "leave_hold") {
				setTimeout(function () { roomFunction.cardLightVisible(5) }, 100)
				setTimeout(() => {
					if (userCardNums == 0) {
						roomFunction.backLightRGB("__system_wait")
						roomFunction.cardLightVisible(0)
					}
				}, 10000);
			} else if (leaveVariableCtl != 1) {
				roomFunction.backLightRGB("gameid")
				setTimeout(function () { roomFunction.cardLightVisible(5) }, 100)
			}
		}, 100);
		if (gameid == "__system_wait" && userCardNums == 0) {
			// roomFunction.goToGameLevel("tian-lyc6", "none")
			screenOutside.toInterface()
			if (soundCtl) {
				soundCtl = false
				let opInfo = {
					opType: "audioClearPreload", // 操作类型，清除所有预载音频
				}
				gameFuncs.op(opInfo);
				//预加载三秒后
				setTimeout(() => {
					let soundNames = ["guanghuisuiyue", "huazhiwu", "fanzhuandiqiu", "dafeijijiaoxue", "dafeijirules", "teamred", "teamPklingxian", "teamPkRules", "teamPkBgm", "teamblue", "321Go", "action", "allwin", "award", "backGreen", "backGreen2", "bgm01", "bgm02", "bgm2024", "bigwin", "bing", "biu", "biuPK", "Black-l", "Black", "bling", "bling2", "Blue-l", "blue", "blue2", "blueWin", "Brown-l", "brown", "brownChun", "brownWin", "chestbgm", "chestt001", "chestt002", "chestt003", "chestt004", "chestteachall", "chongzhi", "clearLife", "colorBgm", "colorRules-2", "colorRules", "Cyan", "cyanWin", "damifengbgm", "damifengbossbgm", "damifengrule", "daoshu10", "defen", "dididi", "ding", "do", "dongtai", "drillBaby", "Duobi", "duobi2", "duobi66", "DuobiBlue", "duobiGreen", "duobiguize", "duobiPaiRules", "duobiRules", "fa", "fenwei", "fenwei2", "fenwei3", "gameend", "gamestart", "gotoGreen", "Green-l", "green", "green2", "greenaddxue", "greenWin", "haihaibgm", "haiPlusBgm", "haiPlusBgm02", "haiPlusBgm03", "happil", "Interfere", "jiao", "jijiang", "jingjibenpaobgm", "jingjibenpaorules", "jingjibgm", "jingjinandushengji", "jingjirule", "jingjitap", "level-eighteen", "level-eleven", "level-fifteen", "level-forteen", "level-nineteen", "level-seventeen", "level-sixteen", "level-thirten", "level-twelve", "level-twenty", "levelEight", "levelFive", "levelFour", "levelNine", "levelOne", "levelSeven", "levelSix", "levelTen", "levelThree", "levelTwo", "levelup", "life", "life2", "linshi", "lootBgm", "lootRules", "lose", "loveBgm", "me", "mutouren", "mutourenBgm1.2x", "mutourenBgm1.4x", "mutourenBgm1.5x", "mutourenBgm2x", "mutourenPlus", "mutourenPlus12", "mutourenPlus15", "mutourenPlusWrong", "mutourenRules", "ok", "Orange-l", "orange", "orange2", "orangeWin", "pass-eight", "pass-eighteen", "pass-eleven", "pass-five", "pass-fiveteen", "pass-four", "pass-fourteen", "pass-nine", "pass-nineteen", "pass-one", "pass-seven", "pass-seventeen", "pass-six", "pass-sixteen", "pass-ten", "pass-thirteen", "pass-three", "pass-twleve", "pass-two", "pass-zero", "pass", "pick", "Pink-l", "pink", "pinkChun", "pinkWin", "pintuBgm", "pintuRules", "pkmutouBgm", "Purple-l", "purple", "qian", "qwqawa", "re", "red", "red2", "redPlay", "redWin", "rgbrule", "right", "shizhong", "shuaxin", "snakebgm", "snaketeach", "suiji", "tank", "tankBgm", "tankRules", "teach6", "teachBlue", "teachBlue2", "teachRed", "teamPkBgm", "tianBgm", "tianteach", "tiaofangziBgm", "tiaofangzirules", "tishi3", "tishi4", "tishi6", "tishi8", "tishi9", "tishi10", "tishi11", "togreen", "tranBgm", "tranGuoGuan", "tranPlusBgm", "tranRules", "tuitui", "victory", "victory1", "wansheng", "WarBgm", "White", "win", "wrong", "Wrong001 ", "wrong3", "wrongMu", "xiaochu", "Xiaoshi", "Yellow-l", "yellow", "yellow2", "yellowWin", "youwin", "youxijijiangkaishi", "zheng", "zuo"]
					soundNames.map((item) => {
						let opInfo = {
							opType: "audioPreload", // 操作类型，移除预载音频
							src: "/sound/" + item + ".mp3", // mp3文件名称及相对路径，必须是英文会字母构成
						}
						gameFuncs.op(opInfo);
					})

				}, 3000);
			}
		}
	},

	//用户刷卡数量改变，用于控制刷卡灯
	gameUserLight(count) {
		userCardNums = count
		engine.log("userCardNums:" + userCardNums)
		roomFunction.cardLightVisible(count)
	},
	//用户信息处理
	gameUser(users) {
		usersInfos.allUsers = users;
		usersInfos.usersResult = [];
		let i = 0;
		for (i = 0; i < usersInfos.allUsers.length; i++) {
			var usertemp = {};
			usertemp.avatar = usersInfos.allUsers[i].Avatar;
			usertemp.nick = usersInfos.allUsers[i].Nick;
			usertemp.label = "游戏总分";
			usertemp.disVal = usersInfos.allUsers[i].UScore;
			usersInfos.usersResult.push(usertemp);
		}
	},

	//游戏跳转，跳转到对应玩法的控制脚本
	gameJump(mode, wanFa, level, gameIds) {
		usersInfos.startTime = Date.now()
		levelInfos.mode = mode
		levelInfos.wanFa = wanFa
		levelInfos.level = level
		levelInfos.gameIds = gameIds
		//用户刷卡后开始时间
		usersInfos.startTime = new Date().getTime()



		roomFunction.addCardLight()
		if (kongzhi == 0) {
			kongzhi = 1

			leaveVariableCtl = 2
			setTimeout(() => {
				if (wanFa == "hai") {
					wanFaCtl_haiCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "mutouren") {
					wanFaCtl_mutourenCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "color") {
					wanFaCtl_colorCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "color--paishe") {
					wanFaCtl_colorCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "duobi") {
					wanFaCtl_duobiCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "goldMiner") {
					wanFaCtl_goldMinerCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "duobiPlus") {
					wanFaCtl_duobiPlusCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "chest") {
					wanFaCtl_chestCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "duobi--paishe") {
					wanFaCtl_duobiCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "loot") {
					wanFaCtl_lootCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tanke") {
					wanFaCtl_tankeCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tran") {
					wanFaCtl_tranCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tranAct") {
					wanFaCtl_tranActCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tranThree") {
					wanFaCtl_tranThreeCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tranPai") {
					wanFaCtl_tranPaiCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tranPlus") {
					wanFaCtl_tranPlusCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tranProMax") {
					wanFaCtl_tranProMaxCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tranProMaxAct") {
					wanFaCtl_tranProMaxActCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tranProMaxThree") {
					wanFaCtl_tranProMaxThreeCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "damifeng") {
					wanFaCtl_damifengCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "snake") {
					wanFaCtl_snakeCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "haipro") {
					wanFaCtl_haiproCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "haiWar") {
					wanFaCtl_haiWarCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "haiSix") {
					wanFaCtl_haiSixTimeCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "haiPlus") {
					wanFaCtl_haiPlusCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "wujin") {
					wanFaCtl_wujinPlusCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "haiPlusChild") {
					wanFaCtl_haiPlusChildCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "haiPai") {
					wanFaCtl_haiPaiCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "haiPlusQiu") {
					wanFaCtl_haiPlusQiuCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "arena") {
					wanFaCtl_pkmutourenCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "mutourenPlus") {
					wanFaCtl_mutourenPlusCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "teampk") {
					wanFaCtl_teampkCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "ticta") {
					wanFaCtl_tictactoeCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "pintu") {
					wanFaCtl_pintuCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tian") {
					wanFaCtl_tianCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "jingji") {
					wanFaCtl_jingjiCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "jingjibenpao") {
					wanFaCtl_jingjibenpaoCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "tiaofangzi") {
					wanFaCtl_tiaofangziCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "dafeiji") {
					wanFaCtl_dafeijiCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "jiezou") {
					wanFaCtl_jiezouCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}
				if (wanFa == "jiezouTeam") {
					wanFaCtl_jiezouTeamCtl.gameLevelCtl(mode, wanFa, level, gameIds)
				}

				roomFunction.goToGameLevel("rainbowColor-cxx", "none");
				// clearInterval(roomFunction.shanshan.cao)
				// fastop.addhuan("addhuan", "huan", "b", 7, 7, 8, 24, 204, 102, 254)
				// fastop.huanmove("awa", "huan", 5)
			}, 100);
		}

	},
	gameUserScroeREC() {
		let records = []
		for (let i = 0; i < usersInfos.allUsers.length; i++) {
			records.push({
				RFID: usersInfos.allUsers[i].RFID,
				GameMode: levelInfos.mode,
				GameWanFa: levelInfos.wanFa,
				GameLevel: levelInfos.level,
				PlayBegin: usersInfos.startTime,
				PlayEnd: usersInfos.endTime,
				GotScore: usersInfos.usersScore[i],
				Stars: usersInfos.Stars,
				UseLife: usersInfos.UseLife, //消耗几条生命
				LeftLife: nowInfos.lifePoint, //剩余几条生命
				SaveTime: usersInfos.SaveTime, //节省时间（提前结束游戏节省的时间，毫秒值）
				ValidTrigger: usersInfos.ValidTrigger, //有效触发次数（有效踩踏、有效发射等）
				ValidTarget: usersInfos.ValidTarget, //有效目标数量（消除数、射击击中目标数等）
				CompleteDegree: usersInfos.CompleteDegree, //0-100，整关游戏的完成进度，完全通关为100
				SentryNum: usersInfos.SentryNum, //哨兵编号，关卡内，进入第几轮用岗哨代替，也就是挑战第几个岗哨了，关卡模式岗哨就1个
				RetryCount: usersInfos.RetryCount, //重复挑战岗哨的次数，关卡模式为0
			})
		}
		engine.log("xxxxxxxx-积分结算-xxxxxxxx" + JSON.stringify(records))
		gameFuncs.addGameREC(records)
	}
}

engine.addEventListener("gamePlay", gameRoom002.gameWait)
engine.addEventListener("userChoosePlayGameLevel", gameRoom002.gameJump)
engine.addEventListener("userLoginToGame", gameRoom002.gameUser)
engine.addEventListener("userLoginNumChanged", gameRoom002.gameUserLight)

