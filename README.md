### 本草录小程序

#### 介绍
将地图、诗词、故事、药膳、入药分类加入到中医药科普的工作中，结合多种中华传统文化，增加科普的趣味性，实现中医药科普方式的创新。

#### 主要技术实现
通过Echarts异步实现省份特色地图和具体草药地图，医药学家地图使用腾讯地图api实现。

#### 部分功能展示：
图1：省份特色地图：将各省份特色草药用地图的形式展示，用户点击时即可看到该省份对应的草药  
图2：具体草药地图：搜索/点击时显示具体草药信息的同时将该草药分布地区的图片显示出来  
图3：医药学家地图：进入页面时使用IIEFs实现缩放动画，点击图表弹出医生姓名标签，点击标签跳转至对应的医生详情页  
![picture1](https://github.com/Duota-Ni/herbs/blob/dev/IntroductionPicture/1.png?raw=true)
图4：小程序收录于草药相关的诗词，在首页用轮播图作推荐，点击图片跳转到相应的草药详情页  
图5：草药诗词板块集合草药相关诗词，点击展开收起可显示隐藏诗词内容，点击图片或草药名跳转至相应的草药详情页  
![picture2](https://github.com/Duota-Ni/herbs/blob/dev/IntroductionPicture/2.png?raw=true)

#### 产品结构  
产品定位：科普类小程序  
目标用户：对中医药感兴趣但不了解的人群  
核心诉求：以有趣的方式从身边出发，学到中医药相关知识，对自身有所裨益，同时可涉猎多元文化（如地理、诗词、中药故事等）  
产品结构图：  
![productStructure](https://github.com/Duota-Ni/herbs/blob/dev/IntroductionPicture/productStructure.png?raw=true)

#### 软件架构
总体的实现思路是：用户操作（搜索/点击）触发关键词key →小程序端通过后端接口获取数据→后端查询数据库并以json形式返回→小程序逻辑层解析数据并在视图层渲染显示。  
总体逻辑框架图：  
![technicalFramework](https://github.com/Duota-Ni/herbs/blob/dev/IntroductionPicture/technicalFramework.png?raw=true)

####  小程序端技术实现  
小程序前端实现了获取服务器数据并渲染，实时获取搜索提示词，动态绘制canvas地图，利用腾讯地图渲染医生地理数据等。  
##### 重点部分技术实现  
*1、Echarts异步渲染地图*  
作品的省份地图/单个草药地图采用apache echarts地图模块渲染。  
实现步骤：引入echarts插件和中国地图的GeoJson文件→配置图形参数→页面加载时初始化图表→小程序根据指定的key从服务器获取数据存入地图dataList→视图层用canvas渲染显示。  
*2、搜索*  
搜索框的实现：UI根据主题色配置；搜索模块经过封装需要时导入，主要包括实现里实时显示提示词、热点词、历史记录。  
提示词实现思路：实时获取用户输入的内容并与后台实时匹配返回  
热点词实现思路：目前后端固定热点词  
历史记录实现思路：将之前搜索过的关键词放入缓存区并在搜索页面加载  
##### 界面部署渲染
界面部署主要是以下几个方面  
1)	内容显示：用户操作触发key后逻辑层根据从后台接口获取数据，主要使用data-=””，setData  
2)	按钮：bindtap和button实现事件转换  
3)	医生地图：采用腾讯地图api，map.markers.callout内容在服务器获取点击标签并按id值索引至详细医生数据，页面初始化时使用IIEFs实现缩放动画  
4)	轮播图：swiper、swiper-item、background-image、bindtap  
5)	省份地图/单个草药地图：echarts可视化+canvas渲染，省份地图配置了缩放、平移参数
6)	分页列表：按页码加载数据并衔接存储已加载的数据，onReachBottom上拉分页，onPullDownRefresh下拉刷新加载上一页数据，  
7)	展开/收起：按点击条件设置CSS display实现隐藏显示  
8)	分类板块：scroll-view和action-sheet结合实现页面滚动和菜单导航按键列表，实现自定义页面定位  
##### 逻辑应用接口
1)	wx.request：同服务器后端进行通信的接口函数，通过访问后端url地址和后端进行交互传递数据
2)	wx.getSystemInfo：主要用来获取窗口高度调整页面大小
3)	wx.getStorageSync、wx.setStorage、wx.removeStorage：主要用来存储和使用搜索历史
4)	wx.setNavigationBarTitle：部分页面动态设置标题
5)	wx.navigateTo、wx.redirectTo：页面跳转
6)	wx.previewImage：医生详情页、草药详情页可预览图片
7)	wx.showToast：加载提示
8)	wx.stopPullDownRefresh：暂停下拉刷新



