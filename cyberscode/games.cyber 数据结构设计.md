# games.cyber 数据结构设计

文件名英文全称: game static

> 小游戏扩展加载规则，位于games/addGames.json文件，以数组方式管理子扩展文件名称【不含文件后缀】
>
> 与addGames.json同级目录存放`gamId`.json文件，里面配置gameId需要与文件名相同

## 一、根结构

```json

{
  "games": {			// 小游戏列表
  },
}

```

## 二、小游戏列表

```json
{
  "games": {			// 小游戏列表
    "game01":{ //小游戏名称（gameId），key的作用
      name:"示例", // 名称，自己看用的，机器不解析
      timeLen:300, //秒 支持小数
      nodes:[ //所有的节点与精灵
        { 
          nodeId:"node1", // 节点id，定位用
          surface:"a",  //根节点必须指定工作面，子节点工作面自动忽略
          // node参数
          pt:{x:0,y:0}, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
          rotation: 0, // 角度
          nodes:[], // 子节点
          canTap:false, //是否接受触摸
          visible:true, //显示，如果为false，逻辑数据会跳过
      		// 精灵数据
          size:{w:2,h:2},//定义形状大小（size，作为父节点的棋盘大小，左上角顶点0,0）
          anchorPt:{x:0.5,y:0.5}, //锚点0-1，相对size计算比例，锚点与pt重合,默认0.5
          shape:{
            type:"point",// 形状 circle/rect
            
          }
        }
  		],
      "opPlans":[//操作计划
        {
          beginTM:0.1, //秒 支持小数，触发操作的时间，事件时就会进入playing状态
          opInfo:{
             opId:"op001", //操作id 再控制用
             opType:"play", // 操作类型 set/play/pause/stop/stopAll/addNode/rmNode
            
          }
        }
       ],
    },
    "game02":{
      
    }
  },
}
```

##  三、node.shape 形状

shape中的数据类型有两类（rgba 颜色类、onOff 开关类）数据遇到驱动自动匹配，默认都是0或false 

#### pionts 任意点状

```json
shape:{
  type:"point",
  points:[{x:0,y:0},{x:2,y:0}],  //相对 size的锚点分布
  //
  onOff:false, //开与关
  rgba:{r:0,g:0,b:0,a:0.1} //a是透明0-1小数，其他未0-254整数
}
```

#### circle 圆与椭圆

配置r-参数可展示为环

```json
shape:{
  type:"circle",
  rect:{lt:{x:0,y:0},rb:{x:1,y:1}}, //点到点，两点确定一个矩形内切椭圆
  //
  onOff:false, //开与关
  rgba:{r:0,g:0,b:0,a:0.1} //a是透明0-1小数，其他未0-254整数
  //
  ringWidth: 0, //环的厚度,向内衍生
  ringOnOff:false, //开与关
  ringRgba:{r:0,g:0,b:0,a:0.1} //a是透明0-1小数，其他未0-254整数
}
```

#### rect矩形

配置r-参数可展示为环

```json
shape:{
  type:"rect",  //与size重合
  rect:{lt:{x:0,y:0},rb:{x:1,y:1}}, //点到点，两点确定一个矩形
  //
  onOff:false, //开与关
  rgba:{r:0,g:0,b:0,a:0.1} //a是透明0-1小数，其他未0-254整数
  //
  ringWidth: 0, //环的厚度,向内衍生
  ringOnOff:false, //开与关
  ringRgba:{r:0,g:0,b:0,a:0.1} //a是透明0-1小数，其他未0-254整数
}
```

## 四、opPlans.opInfo操作

actPlans都进行操作

操作中，"过程数组"数值自动线性平滑处理

play"过程数组"实现连贯操作达到动画的效果

```text
节点定位方式
精准定位：点语法
如：node1.sp1，表示node1节点下的sp1节点或精灵
模糊定位：#遍历语法
如：node1.#.sp1，表示node1节点下，遍历第二层，第三层的sp1节点或精灵
```



#### set 静态设置

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"set", // 操作类型，修改静态设置（动态过后会还原为静态状态），门禁与刷卡灯通过此控制
  surface:"a", // 仅操作 工作面背景点位数据
  shape:{
    type:"point",
    points:[{x:0,y:0},{x:2,y:0}],  // 棋盘的点位，如果没有或者为空，则表示全部
    //
    onOff:false, //开与关
    rgba:{r:0,g:0,b:0,a:0.1} //a是透明0-1小数，其他未0-254整数
  }
}
```

#### play 控制 节点属性动态变化

play可以按照有无相关key，修改节点的全部数值，谨慎操作

数据包括了，位置数据、数值数据、控制数据

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"play", // 操作类型，修改节点属性
  opNode:"node1.sp1", // 仅能操作node类型
  //
  keyFrames:[ // 过程数组
    {
      t:0.9, //0-1的时间点位
      // 仅对存在的key有效
      keyFrame:{ 
        surface:"a",  //根节点必须指定工作面，子节点工作面自动忽略
        // node参数
        pt:{x:0,y:0}, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
        rotation: 0, // 角度
        canTap:false, //控制
        visible:true, //显示，如果为false，逻辑数据会跳过
        // 精灵数据
        size:{w:1,h:1},//定义形状大小
        anchorPt:{x:0.5,y:0.5}, //锚点0-1，相对size计算比例，锚点与pt重合
        shape:{
           type:"point",// 形状 circle/rect

        }
      }
    }
  ],
  timeLen:300, //秒 支持小数
 	loop:false, //是否循环，开启循环,会一直按照【timeLen】周期在【pts】中循环，非循环事件执行后销毁当前控制
}
```

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"play", // 操作类型，修改节点属性
  opNode:"node1", // 仅能操作node类型
  //
  keyFrames:[
    {keyFrame:{pt:{x:0,y:0}},t:0},
    {keyFrame:{},t:0.9}, //数值 最后一帧为停留位置
  ],
  timeLen:300, //秒 支持小数
 	loop:false, //是否循环，开启循环,会一直按照【timeLen】周期在【pts】中循环，非循环事件执行后销毁当前控制
}
```

#### pause 控制 暂停节点变化

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"pause", // 操作类型，暂停
  opNode:"node1.sp1", // 找到节点，（不包括子节点）
}
```

#### resume 控制 恢复节点变化

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"resume", // 操作类型，恢复动画，仅对暂停状态有效果
  opNode:"node1", // 找到节点，（不包括子节点）
}
```

#### stop 控制 停止节点变化并销毁

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"stop", // 操作类型，停止动画，数据暂停，事件销毁
  opNode:"node1", // 找到节点，（不包括子节点）
}
```

#### stopAll 控制 停止并销毁所有控制

```json
opInfo:{
  opType:"stopAll", // 操作类型，停止动画，数据暂停，事件销毁
  opNode:"node1", // 找到节点，（不包括子节点）
}
```

#### addNode 添加节点

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"addNode", // 操作类型，添加一个节点或精灵
  opNode:"node1", // 父节点，如果没有配置，默认到棋盘根节点0,0
  nodes:[
    {
      nodeId:"node1", // 节点id，定位用
      surface:"a",  //根节点必须指定工作面，子节点工作面自动忽略
      // node参数
      pt:{x:0,y:0}, // 位置（子节点的在父节点的位置，根节点的父节点为棋盘顶点0,0）
      rotation: 0, // 角度
      nodes:[], // 子节点
      canTap:false,
      visible:true, //显示，如果为false，逻辑数据会跳过
      // 精灵数据
      size:{w:1,h:1},//定义形状大小
      anchorPt:{x:0.5,y:0.5}, //锚点0-1，相对size计算比例，锚点与pt重合
      shape:{
        type:"point",// 形状 circle/rect

      }
    }
  ]
}
```

#### rmNode 移除节点

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"rmNode", // 操作类型，移除一个节点或精灵并销毁，节点销毁了控制事件也会一并销毁
  opNode:"node1", // 找到节点，
}
```

#### clearAllNode 移除所有节点

```json
opInfo:{
  opType:"clearAllNode", // 操作类型，清除所有节点，通常在游戏结束的时候，这时候完全显示静态值
}
```

#### audioPlay 控制 播放音频

> 支持播放mp3或wav，要求音频采样率一致，否则出现播放问题

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"audioPlay", // 操作类型，播放音频
  src:"./mp3/demo.mp3", // mp3文件名称及相对路径，必须是英文会字母构成
  loop:false, //是否循环播放
}
```

#### audioStop 控制 停止并销毁播放控制

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"audioStop", // 操作类型，停止并销毁播放控制
}
```

#### audioPause 控制 暂停音频

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"audioPause", // 操作类型，暂停音频
}
```

#### audioResume 控制 恢复播放

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"audioResume", // 操作类型，恢复播放
}
```

#### perLoadGameId 预装游戏

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"perLoadGameId", // 操作类型，切换到新的小游戏
  gameId:"game001", //下一个游戏
}
```

#### goToGameId 控制 跳转游戏

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"goToGameId", // 操作类型，切换到新的小游戏
  gameId:"game001", //下一个游戏
  trans:"none", // 过渡效果模板，默认没有，后续支持添加其他效果leftRightCover/rightLeftCover/topBottomCover/botoomTopCover/centerRectWave
}
```

#### screenDisplay 控制 内屏显示

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"screenDisplay", // 操作类型，恢复播放
  screenDisplay:{ //模型需要的数据
    model:"dis_countdown", //现实模型支持：dis_countdown（倒计时），dis_result（结果展示），dis_3b01（3个区域展示）
    //倒计时
    countInfo:{text:"游戏即将开始",num:10}
    //结果展示
    result:{
    	model:"dis_r_score",//支持：dis_r_score（得分显示），dis_r_bigWin，dis_r_youWin，dis_r_lose，dis_r_pass
    	label:"得分计算", //dis_r_score时候填写
      disVal:"3322",//dis_r_score时候填写
      users:[
         {
          avatar:"", //用户头像地址，来源用户登陆游戏引擎登陆后的数据
          nick:"张三", //来源小程序上用户编辑，默认: 用户编号，来源于用户登陆数据
          label:"游戏总分", //卡片标签
          disVal:"242552", //卡片内容
         }
      ]
    },
    //左侧大区
    block1:{
      model:"dis_b_numUnit"
      ...
    }
    //右上区域
    block2:{
      model:"dis_b_numUnit"
      ...
    }
    //右下区域
    block3:{
      model:"dis_b_numUnit"
      ...
    }
  }
}
```

```json
//dis_3b01（3个区域展示）
---
{
  model:"dis_b_numUnit", //数值与单位
  label1:"SECONDS", //单位
  value1:"56" //数值
}
---
{
  model:"dis_b_scoreGame", //游戏总分情况
  label1:"游戏得分", //描述
  value1:"751", //数值
  label2:"关卡总分", //描述
  value2:"2381" //数值
}
---
{
  model:"dis_b_targetColor", //目标颜色（1个格子）
  label1:"目标", //描述
  value1:"#0000FF", //数值
  label2:"BLUE", //描述
  value2:"20" //数值
}
---
{
  model:"dis_b_targetWords", //目标字符
  label1:"请按照以下顺序按下按钮", //描述
  value1:"HELLOWORD", //数值
  label2:"", //空串
  value2:"5" //数值表示点亮数量
}
---
{
  model:"dis_b_targetShape53", //目标颜色（宽高5x3格子,折行依次数字表示0,1,2,3...14）
  label1:"请找出以下图像", //描述
  value1:"1,3,6,7,8,11", //点位
  label2:"", //空串
  value2:"#FFFF00" //色值
}
---
{
  model:"dis_b_choice",      //选择题
  label1:"2022年冬奥会冰壶项目的比赛场馆是？", //题目
  value1:"冰立方,鸟巢,国家速滑馆,五棵松体育馆,首钢大跳台", //答案逗号分隔
  label2:"", //空串
  value2:"#DB1900,#FC8624,#EFC300,#3AB549,#2900FE", //色值逗号分隔
}
---
{
  model:"dis_b_shootInTurn",   //依次投篮
  label1:"请按以下顺序投篮", //描述
  value1:"#DB1900,#FC8624,#EFC300,#3AB549,#2900FE", //色值逗号分隔
}
---
{
  model:"dis_b_tileIMG",       //标题+图片
  label1:"竞技模式", //描述
  value1:"/static/res/vs.png" //图片地址应用内图片或者http开头远程图片
}
---
{
  model:"dis_b_userScore",     //用户分值展示
  users:[
  	 {
        avatar:"", //用户头像地址，来源用户登陆游戏引擎登陆后的数据
        nick:"张三", //来源小程序上用户编辑，默认: 用户编号，来源于用户登陆数据
        label:"score:", //卡片标签
        disVal:"22", //卡片内容
  			cardType:"c1", //卡片类型，c1-c5依次表示色值框图：red、orange、yellow、green、blue
     }
  ]
}
```

#### screenInterface 控制 外屏交互

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"screenInterface", // 操作类型
  screenInterface:{ //模型需要的数据
		model:"dis_countdown", //现实模型支持：dis_countdown（倒计时），dis_playing（游戏进行中），dis_maintain（检修状态），interface（可交互）
    //倒计时
    countInfo:{text:"游戏即将开始",num:10}
  }
}
```

####  setLedShowString 设置LED屏显示内容

```json
opInfo:{
  opId:"op001", //操作id 再控制用
  opType:"setLedShowString", // 操作类型
  ledScreenDis:{ //模型需要的数据
		deviceId: "dev1", //驱动id
    showStr: "" //空串，清空
  }
}


showStr支持语法样例（文字大小由字体决定，非特殊需要不需要指定字体）
"\C4A" // C1、C2、C3、C4、C5、C6、C7依次表示红、绿、黄、蓝、青、品红、白色；所以此处显示【蓝色的A字符】
"\n" //换行
"\FE001\C4A" //F表示字体 E或O表示字体类型英文或汉字，001是导入字库编号， 所以此处显示【使用英文编号为1的字体渲染蓝色的A字符】
```





