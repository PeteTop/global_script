# global_script
> 安装
```
npm install PeteTop/global_script -g
```
> 功能介绍


1. hfs admin 
   - 默认:自动打开我的控制台输入用户名密码登陆
2. hfs git 
   - 默认:不选commit默认内容是当前操作系统的主机名加当前时间例如:MyMacBook-Py 2019-8-26 10:23:25 AM
   - 可选参数(-m)
   - -m:使用hfs git -m='第一次提交'，
3. hfs npm 
   - 默认:查看当前地址
   - 可选参数(-t,-n)
   - -t:设置为淘宝镜像
   - -n:设置为npm镜像
4. hfs op baidu
   - 默认:打开百度,可在console.json自行添加网址格式:"zhihu":"https://www.zhihu.com/",配置后使用hfs op zhihu
   - 可选参数(--json,--code)
   - --json:打开console.json文件
   - --code:需要安装vscode才能使用
5. hfs rs
   - 可选参数(r,s)
   - -s:关机
   - -r:重启电脑
6. hfs update
   - 默认:更新
