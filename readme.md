### 针对内部工具ife在个人电脑使用的时候做的一些优化

#### 关掉全局代理端口，启用浏览器端口代理，使用SwitchyOmega进行浏览器代理
+ ife代理和内部聊天工具一起使用有bug
+ ife对QQ音乐支持的不好
+ 本工具暂时不支持https，已经预留端口8889等ife https上线后会接入 
+ SwitchyOmega设置代理的时候请单独设置http代理，https暂时不要设置，否则会造成https页面访问不了

#### 加了个简单的mock功能，处理一些复杂的接口
测试用例我也没写，不多说了，总共就几行代码，加了个注释，看一下就明白了，主要本地用

#### tips
请确保本地已经装了forever，npm run start 的时候调用的forever启动的  
请确保本地8888和8889端口未被占用  
可以关掉全局http代理6666端口，但是一定要启用ife的6666端口，相关逻辑可以自己在本地ife源码中修改一下就好了

#### 插件开发
请按照 /plugins/middleware/mock.js的形式开发插件，插件为koa2的插件，需要暴露出middleware方法供给koa注册插件，开发的koa2的插件一律放在/plugins/middleware/目录下面。

#### changeLog
+ 1.0.1 增加http对scoket的支持
+ 1.0.3 修正了net的bug
+ 1.0.5 代码重构，文件夹重写，增加插件机制，可随意添加插件