# gamee.cyber 数据结构设计

文件名英文全称: game equipment 

## 一、根结构

```json

{
  "device":{ 			// 设备连接方式  
  },
  "surface": {		// 工作面  
  }
}

```

## 二、设备连接方式

> plc256 固定点位数为：256
>
> CX_5102S 固定点位数为：2   【不支持高频率刷新】1秒最多5帧
>
> YB6K1 固定点位数为：1

```json

{
  "device":{ 										// 设备连接方式
    "dev1":{     								// 连接名称
      	channelType:"udp",			// 通道类型
      	channelInfo:{						// 通道类型决定Info的结构
          ip:"192.168.32.187",
          port:"32001",					// 盒子的收发端口
          portListen:"42001",   // 没有配置就采用port
          ptNumber:4,						// 工作点位数量
        },
      	driveType:"XlampRGB",		// 驱动类型 eg: XlampRGB, plc256，YRrfid，CX_5102S，YB6K1
      	reverse:"true"					// 串联设备排序是否倒序映射
    },
    "dev2":{
      
    }
  },
}

```

## 三、工作面

```json
{
  "surface": {				// 工作面
    "a":{ //面的名称，key的作用
      "name":"地面",	// 名称，自己看用的，机器不解析
      "matrix":[
        [{dev:"",index:0},{dev:"",index:0},{dev:"",index:0}], //未配置驱动连接
      	[{dev:"",index:0},{dev:"dev1",index:0},{dev:"dev1",index:1},], // dev 设备连接名称
  			[{dev:"",index:0},{dev:"dev1",index:2},{dev:"dev1",index:3}],  // index 驱动点位
      ]
    },
    "b":{
      
    }
  },
}

```
