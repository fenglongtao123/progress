# spm

## 阿里实现调研

SPM(超级位置模块)，SCM（超级内容模块），黄金令箭（交互采集模块)

数据采集的支持平台有埋点申请，埋点配置，埋点验证，数据监控，数据管理。（这个就是埋码的流程。）数据采集技术包括 Apus/Etag（WEB产品采集），Beacon（WEB嗅探），UserTrack（APP产品采集）等。
### spm
阿里的SPM位置编码由A.B.C.D四段构成， 各分段分别代表 A:站点/业务， B:页面， C:页面区块， D:区块内点位

通过nginx插入script和meta标签方式埋入ab，其他手动埋

```html
<meta name="data-spm" content="a230r">
<div spm-data="detail"></div>

```
### scm
SCM编码也采用a.b.c.d的格式，其中，一般来说，

- a标识投放系统ID，用来标识不同的内容投放方，比如商城的阿拉丁系统，对应的投放系统ID为1003。
- b标识投放算法ID，用来标识投放系统产生不同内容的投放算法。
- c标识投放算法版本ID，用来标识投放算法的不同版本。
- d标识投放人群ID，用来标识不同的投放人群，或者对接profile

### 黄金令箭

用户在页面上某个行为触发一个异步请求，按照约定的格式向日志服务器发送请求，展现、点击、等待、报错等等都可以作为交互行为

### Aplus - WEB 采集

采集内容包括：

- 当前页URL， 标题和来源页的URL(如果有)
- 用户身份识别信息: cookieID， 淘宝会员数字id(不一定需要登录)和nickname(若已登录)
- 客户端/浏览器信息和屏幕分辨率
- 当前页SPM， 来源页点击位置SPM编码， 来源页的来源页点击位置SPM编码 (前提均为若已部署了SPM)
- aplus版本信息及反作弊验证码

交互行为使用「黄金令箭」统计
