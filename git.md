### 使用git

   首先安装git客户端

```js
//Linux 常用指令
  pwd 查看当前目录地址
  cd  打开某个目录
  mkdir 创建一个文件夹的
  ls 查看目录文件的
  echo 内 > 新增 >> 追加 文件名称
  echo "hello" > readme.txt
	echo "ickt >> readme.txt


// 常用git 指令
  git init : 初始化一个git项目的 ,一旦执行,会看到一个.git文件		夹,本地的存储库
	我们可以在里面新建项目和文件
  git status 查看当前状态(那些把文件可以提交,那些不能提交)
	git add 添加提交文件
  git rm 删除可以提交的文件
  git commit -m 提交说明(说明这次提交的内容)
      1.git config user.name "username"
      2.git config user.email "username@XXX.com"
  ssh-keygen -t rsa -C "邮箱地址"

// 本地库有两种状态
	已存入缓存: 下一步可以提交的 (git status 绿色的) ,在objects能看到
	提交版本: 已提交的:通过commit指令提交过的.此时我们可以在		  	refs\heads目录下看到
  	这里提交值得是本地库
      [master (root-commit) e0f9673] add readme.txt提交
       1 file changed, 2 insertions(+)
       create mode 100644 readme.txt

  
  还有一种文件是没有纳入管理的,此时这类文件一旦删除就找不回来了	  	(git status 红色色的)

提交在本地的,一旦电脑坏了,文件就再也找不到了, 更安全的方式是提交在云服务器上
	 我们首先要创建一个人rsa密钥
	 ssh-keygen -t rsa -C "邮箱地址"
		 邮箱: 注册账户的邮箱
     打开c:user\Administrator\.ssh
			里面有三个文件
      打开 id_rsa.pud,复制内容,打开官网,用户设置 -- >点击SSHand GPG keys -->点击new SSHkey 绿色按钮
      表单中,title 随意起,但是key必须是id_rsa.pud中的内容
		  点击提交,自己的电脑与git服务器的信任关系就建立
		我们就可以在git 上创建项目了
    创建版本库 点击+号  -->选择 New reoistitoy
    	New repository -- 只要添加名称(不要与已有的重名)
      点击小绿色的 new respositor 按钮完成创建
      点击复制按钮,复制git地址
执行 git remote add origin git@github.com:yanhuayou234/note.git

执行 git push -u origin master 提交代码

	git add * //提交全部


```

