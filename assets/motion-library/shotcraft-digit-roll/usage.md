# 机械数字滚轮

数值的每个数字列滚过一整轮，再错峰停在目标字符，适合版本号、计数和已核实指标的强调落定。接收字符串以保留小数、符号和前导零，非数字字符固定显示；不推导数据来源。

接口：value, startFrame=0, staggerFrames=4, durationFrames=22, fontSize=76, color?, theme。

从当前镜头的 ./motion-library.jsx 导入 Material_shotcraft_digit_roll。
所有时间参数都是镜头局部帧，使用当前 Composition 的 fps；theme 传完整项目 style。
素材只引用已暂存本地资源；示例数据是表达演示，不是项目运行结果。

```jsx
import {Material_shotcraft_digit_roll} from './motion-library.jsx';
<Material_shotcraft_digit_roll value="1,280" theme={style} fontSize={96}/>
```
