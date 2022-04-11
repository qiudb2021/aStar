# aStar
A* 寻路算法

```
|-- lib
|   |-- node
|   |   |-- treeNode.ts 树节点类
|   |   |-- mapNode.ts 地图节点类
|   |-- map.ts 地图类
|   |-- point 地图坐标类
|   |-- util.ts 工具函数
|   |-- marco.ts 宏定义
|   |-- view
|   |   |-- view.ts 可视化图形
|-- config
|   |-- map_data.json 地图原始数据
|-- app.ts
```

# A*路径平滑算法-Floyd（弗洛伊德路径平滑算法）
参考链接：[https://blog.csdn.net/m0_37290785/article/details/79655666]

弗洛伊德路径平滑算法应在通过A*寻路算法得出路径后进行，它的步骤分为两步
1. 合并路径数组中共线的节点
2. 尽可能去掉多余的拐点
   