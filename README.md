基于vue的pc/移动通用的长按事件指令

支持修饰符自定义长按触发时长      
```
<el-button type="primary" size="mini" v-longpress:longpresshandle.2000="params">长按传参</el-button>
```
支持函数传参
```
<el-button type="primary" size="mini" v-longpress.3000="longpresshandle">长按</el-button>
```

函数：longpresshandle    修饰符：3000
