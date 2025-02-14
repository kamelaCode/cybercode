# gamel.cyber 数据结构设计

文件名英文全称: game level 

## 一、根结构

```json

{
  "levels":{ 			// 关卡数据
  },
}

```

## 二、游戏模式

```json

{
  "levels":{ 			         
    levelMode:{						  //关卡模式（key就是code，游戏动态脚本编码中可能获得）	
      state:"unlock",          //lock表示锁定未开放，unlock表示开放
      sort: 99,								 //sort值显示越大靠前（排序规则，unlock优先，sort其次）
      list:[]
    },
    competMode:{						//竞技模式	
      state:"lock",   
      sort: 98,		
      list:[]
    },
    challengeMode:{         //挑战模式	
      state:"lock",
      sort: 19,		
      list:[]
    },
    endlessMode:{           //无尽模式	
      state:"lock",
      sort: 39,		
      list:[]
    },
  },
}

```

## 三、关卡模式

> wanFaId: 
>
> `lostChar`  迷失字符
>
> `dataRepair`  数据修复
>
> `timeRush`  争分夺秒
>
> `recovery`  序列还原

```json
{
	 	levelMode:{					
      state:"unlock",         //lock表示锁定未开放，unlock表示开放
      sort: 99,								//sort值显示越大靠前（排序规则，unlock优先，sort其次）
      list:[									//列表
        {
          wanFaID:"lostChar", //游戏编码，游戏动态脚本编码中可能获得
          wanFa:"迷失字符",
          wanFaSub:"Lost Characters",
          videoList:["http://..."], //视频可以是相对地址，相对地址将读取门店内网服务器 配置的房间目录下的视频
          desc:"   每轮游戏会在屏幕上显示文字内容，需要通过墙面显示的宇符技钮来拼写文字内容。\n   游戏过程中每隔一段时间会开启随机一面墙壁的监测器，请在监测器开启时躲避其监测范围。", //支持换行符与空格
          tags:"反应 速度 技巧",
          level:[
            {
              lv:1,            //关卡编号,正整数,不可重复，游戏动态脚本编码中可能获得
              tips:"该关卡推荐2-3人游玩",
              zuoZhe:"",    //大部分情况为空，只有获得批准的优秀作品才允许留下作者名称
              gameIds:[
                {
                  gameId:"game001", //小游戏id
                  trans:"none", //两个小游戏直接的过渡效果，默认没有，后续支持添加见games.cyber中【goToGameId】的方法的更新
                },
                {
                  gameId:"game002", //小游戏id
                  trans:"none", //两个小游戏直接的过渡效果，默认没有，后续支持添加见games.cyber中【goToGameId】的方法的更新
                },
              ],
              
            },
            
          ]
        }
      ]
    },
}

```

## 四、竞技模式

> wanFaID: 
>
>  `competive`   经济模式
>
> `roomVSroom`   跨房间竞技

```json
{
	 	competMode:{					
      state:"unlock",         //lock表示锁定未开放，unlock表示开放
      sort: 99,								//sort值显示越大靠前（排序规则，unlock优先，sort其次）
      list:[									//列表
        {
          wanFaID:"competive", //游戏编码，游戏动态脚本编码中可能获得
          wanFa:"竞技模式",
          wanFaSub:"Competive Mode",
          videoList:["http://..."],  //视频可以是相对地址，相对地址将读取门店内网服务器 配置的房间目录下的视频
          desc:"每名玩家对应一种颜色，游戏过程中，按下自己所代表颜色的目标为自己加分。\n   游戏过程中每间隔一段时间会开启随机一面墙壁的检测器，请在检测器开启时躲避其监测范围。", //支持换行符与空格
          level:[
            {
              lv:1,            //关卡编号,正整数,不可重复，，游戏动态脚本编码中可能获得
              tips:"该关卡推荐2-3人游玩",
              zuoZhe:"姜政、找康磊",    //大部分情况为空，只有获得批准的优秀作品才允许留下作者名称
              gameIds:[
                {
                  gameId:"game001", //小游戏id
                  trans:"none", //两个小游戏直接的过渡效果，默认没有，后续支持添加见games.cyber中【goToGameId】的方法的更新
                },
                {
                  gameId:"game002", //小游戏id
                  trans:"none", //两个小游戏直接的过渡效果，默认没有，后续支持添加见games.cyber中【goToGameId】的方法的更新
                },
              ],
              
            },
            
          ]
        }
      ]
    },
}

```
