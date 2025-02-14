# gamed.cyber 数据结构设计

文件名英文全称: game dynamic

> 模块加载规则，位于gamed/addModules.json文件，以数组方式管理子模块名称【不含文件后缀】
>
> 按照顺序依次加载子模块，最后加载gamed.cyber

## 一、全局变量

> addModeles下提供了独立的gameInfos.cyber，无需重复声明

```js
// 全局变量
// 是游戏引擎提供的运行参数，每一帧都会刷新
let gameInfos = {
  gameId:"001",
  gameTime:1.5, //秒 游戏时间进度
  gameTotalTime: 20, //秒 游戏设定控制的总时长
  gameStatus:"ready", // ready/pause/playing/gameOver 
  rootNodeIds:"n1,n2" //根上的节点
}


// 全局方法类
// 提供与游戏引擎互通的方法
var gameFuncs = {}


// 全局自定义变量与方法
// 可以自定义任何方法与函数自己进行使用
let num = 0; 
function add(){}
```

## 二、游戏引擎触发函数

> 生命触发函数
>
> addModeles提供了engine.cyber模块，支持不限制动态注册与移除监听方法

```js
//游戏引擎初始化（载入所有脚本后，仅开机后执行一次）
function playInit(){
	...
}

//某个小游戏初始化（装载游戏脚本后，执行一次）
function gameInit(gameid){
	...
}
  
//某个小游戏进入播放（装载游戏脚本后，执行一次）
function gamePlay(gameid){
	...
}
  
//某个小游戏结束（销毁游戏脚本前，执行一次）
function gameDestroy(gameid){
	...
}
  
```

> 游戏事件函数

```js
//游戏中事件函数
//游戏倒计时结束（小游戏倒计时结束后，执行一次）
function gameTimeOver(gameid){
	...
}

//游戏中事件函数
//游戏触摸到了什么,nodeId可能是空串, 子节点会用点语法显示(event:TapedOn/TapedOff/NodeChanged)
function gameTaped(face,x,y,onOff,nodeId,event){
	...
}
```

> 进入游戏管理函数

```js
//用户刷卡登陆数量改变
function userLoginNumChanged(count){
  
}

//进入游戏的用户（为了方便展示和计算分数，请临时保存）
function userLoginToGame(users){
  //users 是一个对象数组
  //对象结构
  {
    RFID:"010ce2000019191500911550417992", //手环
    Nick:"张三",
    Avatar:"",
    USocre:"0",  //联网后，记录用户的用户总分
    Color:"c1",  //外屏选择时候匹配的颜色【c1-c5】依次表示：red、orange、yellow、green、blue
  }
}

//用户选定关卡（为了方便展示和计算分数，请临时保存）
function userChoosePlayGameLevel(mode,wanFa,level,gameIds){
  //mode,wanFa 为字符串
  //level 为数字
  //gameIds 为{GameId,Trans}数组
}
```



## 三、游戏引擎函数

> 操作

```js
let opInfo = {
	opId:"rm001",
	opType:"rmNode",
	opNode:"circle001"
};
gameFuncs.op(opInfo)  //opInfo 参考 games.cyber数据结构中的 opPlans.opInfo

```

> 读取节点数据

```js
//非必要不要读取 nodeInfo, 对性能有一定影响
//返回值： json字符串
//参数1：字符串，nodeId要查询的节点（支持点语法）
//参数2：布尔值，false，不追查子节点数据，非必要不要写true，对性能有一定影响
let nodeInfo = gameFuncs.nodeInfo(nodeId,false)

let obj = JSON.parse(nodeInfo)
if(obj != null){
		console.log(nodeInfo)
		console.log(obj.nodeId)
}

```

> 读取关卡的小游戏list

```js
//读取关卡配置的gameIds
//mode,wanFa 为字符串
//level 为数字
let gameIds = gameFuncs.gameIdsFormLevels(mode,wanFa,level)
//gameIds 为{GameId,Trans}数组
```

## 四、系统基本函数

系统未支持，是游戏引擎重新实现的

```json
//延时调用方法

let id = setTimeout(function(){
		logGameinfo()
	}, 2000)  //毫秒


//提前终止定时器
clearTimeout(id) 
```

```json
//间隔执行一定次数
let id = setIntervalCount(function(index,count){ // 第几次/共几次，从1开始计数
  	logGameinfo()
	},1000, 5) //每间隔1000毫秒，执行5次（禁止用在游戏逻辑中，执行中无法终止）


//提前终止定时器
clearInterval(id) 
```

```json
//定时调用方法
let id = setInterval(function(){
  
}, 1000)  //毫秒


//请务必在不用的时候clear，否则出现游戏路径
clearInterval(id)  
```

```json
//日志类方法
engine.log()   //输出到游戏引擎日志面板，调试后，请删除或注释代码
```



## 五、系统函数类

```json
ES5（javascrit）内置功能 
Math 可进行基本的数学公司运算
```

学习ES5的网站：https://www.w3school.com.cn/js/js_loop_for.asp

