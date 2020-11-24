(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{368:function(t,r,e){"use strict";e.r(r);var o=e(42),v=Object(o.a)({},(function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h2",{attrs:{id:"写在前面"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#写在前面"}},[t._v("#")]),t._v(" 写在前面")]),t._v(" "),e("p",[t._v("关于App架构、组件化，本文的内容不会涉及到具体代码层面，也不会介绍怎样使用Cocoapods去做组件化；而是站在软件工程的角度上，结合自己多年一线开发经验，去分析如何做App架构，如何通盘考虑什么样的架构才是合理的，契合自身业务的，以及架构落地过程中应该规避哪些问题。")]),t._v(" "),e("blockquote",[e("p",[t._v("名词解释：本文中所提到的架构不是实际工程中代码架构（MVC、MVVM、MVP），确切的说是一种"),e("strong",[t._v("应用分层架构")]),t._v("。而MVC、MVVM、MVP本质是一种软件架构模式，是App实现过程中的一种"),e("strong",[t._v("编码模式或者编码规范")]),t._v("。")])]),t._v(" "),e("h2",{attrs:{id:"ios系统架构回顾"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#ios系统架构回顾"}},[t._v("#")]),t._v(" iOS系统架构回顾")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/Lobster-King/AppArticles/master/Architecture/ios-architecture.png",alt:""}})]),t._v(" "),e("p",[t._v("如上图所示，经典的iOS系统架构分为四层，自下而上分为核心操作系统层、核心服务层、媒体层、用户交互层。")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("Cocoa Touch")]),t._v("：提供与用户交互的相关能力，包括触摸等，最常用的UIKit库就在该层；除此之外还有MapKit、Address BookUI、PhotosUI等。")]),t._v(" "),e("li",[e("strong",[t._v("Media Layer")]),t._v("：提供图形与音视频相关功能的接口，例如Core Animation、OpenGL ES等。")]),t._v(" "),e("li",[e("strong",[t._v("Core Services")]),t._v("：最常用的有Core Foundation、Foundation、CFNetwork、CoreData等。提供最基础的能力，比如数组、字典、HashMap、套接字等基础数据结构。")]),t._v(" "),e("li",[e("strong",[t._v("Core OS")]),t._v("：包含Mach、Kernel、BSD、Socket以及Sandbox等，它主要提供了底层操作的接口，对于应用开发来讲直接用到的不是很多。")])]),t._v(" "),e("p",[t._v("都说iOS系统牛逼，牛逼在哪？牛逼就牛逼在它有合理的架构分层，还有合理的Api设计，让你能够躺着就能做iOS开发，畅享丝滑！它牛逼的文件管理和文件隔离机制让你不需要过多考虑iOS系统安全性问题，逆向开发除外，因为它总是Bug般的存在😄。")]),t._v(" "),e("blockquote",[e("p",[t._v("Q：iOS系统架构这四层之间是如何进行通信和交互的，是否合理？")]),t._v(" "),e("p",[t._v("A：直接引用头文件，调用下层提供的Api进行交互。关于是否合理，我想说的是只要Api设计的足够合理，足够能应对未来一段时间内SDK内部可能的变动，或者说SDK本身是一个很基础的库，比如Foundation库等，我觉得直接引入头文件无伤大雅，具体的我们稍后再讨论。")])]),t._v(" "),e("h2",{attrs:{id:"设计一个合理的应用分层架构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#设计一个合理的应用分层架构"}},[t._v("#")]),t._v(" 设计一个合理的应用分层架构")]),t._v(" "),e("p",[t._v("麻雀虽小五脏俱全，要想展翅高飞，每个环节缺一不可。"),e("br"),t._v("\n关于如何设计一个合理的应用分层架构，这里我们拿盖楼这件事做比喻，笔者干过建筑搬过砖，所以对于盖楼流程相对来说比较熟悉。")]),t._v(" "),e("ul",[e("li",[e("p",[t._v("第一步：打地基、支模板、浇灌水泥搭架子、搬砖垒墙，这是一切的基础，高楼要屹立不倒，需要这些模块的长久有力的支撑才行。抽象到应用架构里面，我们称之为"),e("strong",[t._v("基础模块")]),t._v("，其主要提供应用最基础的能力。")])]),t._v(" "),e("li",[e("p",[t._v("第二步：铺地面、造门，其中门在卧室、餐厅都可能会用到。抽象到应用架构里面，我们称之为"),e("strong",[t._v("公共业务模块")]),t._v("，它主要提供了一些通用的业务模块或者通用的组件。")])]),t._v(" "),e("li",[e("p",[t._v("第三步：给大楼赋能，卧室、餐厅、洗漱间等一应俱全，有了这些才能真正体现盖大楼的意义。卧室等功能都要用到砖、墙、门等基础模块。在应用架构中，我们把卧室、厨房、洗漱等独立功能抽象为"),e("strong",[t._v("普通业务模块")]),t._v("，每个业务模块都代表一个具体的功能，业务模块间没有强关联关系。")])])]),t._v(" "),e("blockquote",[e("p",[t._v("Q：除了以上的部分，是否还缺点什么东西？")]),t._v(" "),e("p",[t._v("A：楼层跟楼层之间需要电梯连接通信，卧室和厨房之间也需要通道进行连接。同样对于应用来讲，模块间的通信也需要一个媒介连接起来，我们称之为总线（Bus）。后续会详细介绍如何实现一个总线，让你的模块各自分工，且模块间的通信畅通无阻。")])]),t._v(" "),e("p",[t._v("经过分析梳理，我们很容易能够画出如下的应用架构图，图中每层都标出了该层大致包含哪些内容。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/Lobster-King/AppArticles/master/Architecture/app-architecture.png",alt:""}})]),t._v(" "),e("p",[t._v("图中，我们按照“盖大楼”的思路，进一步抽象罗列出了一个App应该包含哪些结构。")]),t._v(" "),e("h2",{attrs:{id:"应用架构实施落地"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#应用架构实施落地"}},[t._v("#")]),t._v(" 应用架构实施落地")]),t._v(" "),e("p",[t._v("在iOS平台中，我们一般会通过Cocoapods去管理、集成自己的组件。按照工厂化生产App的理念，结合Cocoapods我画出了如下的App集成图。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/Lobster-King/AppArticles/master/Architecture/apps-pod-spec.png",alt:""}})]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("基础模块")]),t._v("：因模块高度独立，且高频使用，若公司内部有多个App同时需要依赖，建议单独创建私有库Specs。")]),t._v(" "),e("li",[e("strong",[t._v("公共业务模块")]),t._v("：功能相对独立，根据业务需求来决定是否单独创建私有库Specs。")]),t._v(" "),e("li",[e("strong",[t._v("Cocoapods公有库")]),t._v("：所有公司内部App，强烈建议不要直接引入公有Specs。这样做有两点好处："),e("br"),t._v("\n1.跟外部环境有效隔离，第三方库发生问题，公司内部可控。"),e("br"),t._v("\n2.公有库太大，每次repo update耗时太长，国内的环境你懂的，没有科学上网，至少一个小时过去repo也未必更新完毕。所以通用的方案是，若公司内部引用了第三方库，按照依赖倒置的原则，建议封装一层之后放到"),e("strong",[t._v("Basic Specs")]),t._v("供业务方使用。")])]),t._v(" "),e("p",[t._v("又来到了一年一度的QA环节。")]),t._v(" "),e("blockquote",[e("p",[t._v("Q：如何把握组件拆分粒度？")]),t._v(" "),e("p",[t._v("A：没有一个可衡量的标准，需要结合具体业务场景，那些复用性高、功能相对独立就可以考虑做拆分。还有需要注意的是，组件拆分不一定要抽离成pod库，可以将有一定特性的"),e("strong",[t._v("一组通用组件")]),t._v("打成一个pod库（姑且定义成CommonUIKit）。我们知道pod库最终都是生成静态库引用到主工程的，也就是最终都会经过链接的过程，pod库过多会带来一定的App启动性能开销，其次pod库过多也会导致pod管理混乱的问题。")])]),t._v(" "),e("blockquote",[e("p",[t._v("Q：比如一个很小的功能，就一个弹框我需要去做解耦么，我抽成pod库别人直接引用不就得了？")]),t._v(" "),e("p",[t._v("A：在回答之前，我们先思考两个问题。弹框组件未来变动可能性有多大？你设计的Api是否合理，是否能够满足未来产品的需求？第二个问题，解耦带来的益处能够cover住这些可能的变动带来的弊端？想清楚这两个问题，我们就知道设计一个组件是否需要做解耦，是否需要用中间服务去除依赖了。")])]),t._v(" "),e("h2",{attrs:{id:"解决横向依赖"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#解决横向依赖"}},[t._v("#")]),t._v(" 解决横向依赖")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("通用组件层的横向依赖")]),t._v("。")])]),t._v(" "),e("p",[e("img",{attrs:{src:"https://raw.githubusercontent.com/Lobster-King/AppArticles/master/Architecture/app-service.png",alt:""}})]),t._v(" "),e("p",[t._v("通过上图可以发现，首页组件实际只是获取了登录态，但登录模块没有提供对应服务，则只能通过引用头文件的方式把该组件import进来，两者耦合在一起。")]),t._v(" "),e("p",[t._v("利用中间件的概念，我们可以在两个模块之间建立一个"),e("strong",[t._v("服务层")]),t._v("，专门用来进行模块间的数据通信，或者非界面跳转的小粒度组件的数据通信。这样就很好的解决了两个组件的横向依赖问题。")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("业务模块间的横向依赖。")])])]),t._v(" "),e("p",[t._v("这里主要说的是那些业务功能独立、业务线之间的横向依赖。举例说明，首页模块可能带有业务A、业务B、业务C的入口，如果没有做组件化，则首页模块连同A、B、C业务都耦合在一起。这里推荐几个比较比较常用的路由解决方案。")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/joeldev/JLRoutes",target:"_blank",rel:"noopener noreferrer"}},[t._v("JLRoutes-URL routing library for iOS with a simple block-based API。"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/alibaba/BeeHive",target:"_blank",rel:"noopener noreferrer"}},[t._v("BeeHive-iOS的App模块化编程的框架实现方案，吸收了Spring框架Service的理念来实现模块间的API耦合。"),e("OutboundLink")],1)]),t._v(" "),e("p",[e("a",{attrs:{href:"https://github.com/casatwy/CTMediator",target:"_blank",rel:"noopener noreferrer"}},[t._v("CTMediator-基于Mediator模式和Target－Action模式。"),e("OutboundLink")],1)]),t._v(" "),e("blockquote",[e("p",[t._v("Q：我该如何设计一个路由，用于模块间的跳转？")])]),t._v(" "),e("blockquote",[e("p",[t._v("A：设计路由需要遵循几个原则。")])]),t._v(" "),e("blockquote",[e("p",[t._v("第一，便于集成，最小的改动即可实现一个路由。"),e("br"),t._v("\n第二，最大限度把参数正确性校验提前，能在编译时校验就不要在运行时校验。"),e("br"),t._v("\n第三，尽可能的支持多种注册方式，静态注册、动态注册、服务配置等。")])]),t._v(" "),e("p",[e("strong",[t._v("下一篇我们将进行实操，跟大家一起一步步编写一个模块间通信的服务组件")]),e("br"),t._v(" "),e("strong",[t._v("文章首发GitHub:"),e("a",{attrs:{href:"https://github.com/Lobster-King/AppArticles",target:"_blank",rel:"noopener noreferrer"}},[e("OutboundLink")],1)])]),t._v(" "),e("p",[t._v("架构和组件化系列文章预告："),e("strong",[t._v("从0到1实现一个模块间通信的服务组件")]),t._v("，会一步步跟大家一起编写一个模块间通信的服务组件。")]),t._v(" "),e("p",[e("strong",[t._v("文章首发GitHub "),e("a",{attrs:{href:"https://github.com/Lobster-King/AppArticles",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/Lobster-King/AppArticles"),e("OutboundLink")],1)])]),t._v(" "),e("p",[e("a",{attrs:{href:"https://www.vultr.com/?ref=7766366"}},[e("img",{attrs:{src:"https://www.vultr.com/media/banner_2.png",width:"468",height:"60"}})])])])}),[],!1,null,null,null);r.default=v.exports}}]);