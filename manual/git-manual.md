# Git

## What is Git?

分布式版本控制系统。

### 概念解释

提交：Git 只追踪和存储文件的更改，几个文件的更改可以组成一次提交，产生一次提交记录。

工作区：你编辑文件/产生更改的地方。

暂存区/索引：用来暂存工作区中产生的更改，等待你来提交。暂存区可以避免提交的碎片化。

版本库/存储库：记录着每一次提交，即每一次更改的地方。

HEAD：指向当前分支的最新提交，你可以认为是一个软件版本的 latest 标签。

分支：基于一个提交，做了不同的更改，产生了不同的提交，于是产生了分支。最原始的一条分支称为主分支。

## How to use?

### 1. 创建版本库并完成初始化提交（init commit）

在初始化提交时，应当完成规范文件、依赖文件的设置。提交后，Git 会自动为你创建一个主分支（通常叫做 main/master，取决于你的 `.gitconfig`
配置）。

```shell
# 创建版本库时，Git 将为你自动创建一个没有提交记录的主分支
git init

code .editorconfig
code .prettierrc.json

# 初始化提交
git add . && git commit -m "init: init project with constraint files"
```

### 2. 添加远程并推送

作为分布式版本管理系统，你可以将版本库推送到远程。只有将版本库推送到远程后，才能实现多人协作开发。

```shell
# 添加名为 "origin" 的远程
git remote add origin https://github.com/user/repo.git

# 将本地版本库的 main 分支推送到 "origin" 远程的 main 分支
git push origin main:main
# 或简写为
git push origin main
```

### 3. 从远程拉取

当远程有来自他人的更新，应立即从远程拉取，避免基于过时的代码开发。

```shell
# 假设已经添加名为 "origin" 的远程
git pull origin main:main
# 或简写为
git pull origin main
```

### 4. 创建并切换到开发分支（dev）

完成初始化提交和远程仓库的添加之后就应该分出项目的开发分支，基于开发分支做开发。遵循[规范的多人协作开发流程](https://github.com/wibetter/akfun/blob/master/%E5%A6%82%E4%BD%95%E8%A7%84%E8%8C%83%E5%A4%9A%E4%BA%BA%E5%8D%8F%E4%BD%9C%E5%BC%80%E5%8F%91.md)有助于更好地维护项目。

```shell
git switch -c dev
```

### 5. 创建并切换到功能分支（feature/\*\*）

每当你想要开发一个新功能时，就要基于开发分支，分出具体的功能分支（feature/\*\*）。开发分支只应该用来合并/整合功能分支。

```shell
# 保证执行命令时正在 dev 分支的最新提交上
git switch dev

git switch -c feature/001 # 分支命名规则：feature/<feature-code>

code git-manual.md

git add . && git commit -m "feat: complete feature/001"
```

### 6. 将文件用暂存区的版本覆盖（丢弃工作区的更改）

当你错误地更改了一个文件，更改会临时存储在工作区中，直到你使用 `git add` 将它暂存。你可以将文件用暂存区的版本覆盖，来丢弃工作区的更改。

```shell
# git checkout 在不指定提交时，会读取该文件在暂存区中的版本
# "--"" 是指不要将后面的内容解释为命令参数，以此避免文件中的 "-" 符号被解析为参数
# 将 index.html 用暂存区中的版本覆盖
git checkout -- index.html
```

### 7. 将 HEAD 回退到上个提交（丢弃提交）

当你错误地提交了一个文件，可以将 HEAD 回退到上一个提交，来丢弃提交。丢弃有 `--soft`、`--mixed` 和 `--hard` 三种模式，默认为
`--mixed` 模式。`--soft` 模式仅回退 HEAD 到目标提交，`--mixed` 模式回退 HEAD 和暂存区到目标提交， `--hard`
模式回退 HEAD、暂存区和工作区到目标提交。

```shell
# 回退 HEAD 和暂存区到 HEAD，表现为将暂存区的更改恢复到工作区
git reset HEAD

# 回退 HEAD 和暂存区到 HEAD^，表现为将 HEAD 所指提交所作的更改恢复到工作区
git reset HEAD^
```

### 8. 为最后一次提交补充内容

通常来说，你使用 `git reset HEAD^` 是为了撤销最后一次提交，修改内容再重新提交。如果你的提交没有推送到远程，你可以有更方便的方式直接修改他们。

```shell
git commit --amend
```

### 9. 合并功能分支

每当你完成一个功能分支上的开发时，就要将其合并到开发分支上。

```shell
git switch dev

# 不要使用 fast-forward 模式，会丢失分支记录
git merge features --no-ff -m "merge: merge branch 'features' into 'dev'"
```

### 10. 删除冗余功能分支

当功能分支的使命达成时，就要将其删除，避免分支过多而难以维护。

```shell
# 查看本地的分支
git branch

git switch dev

git branch -d features
```

### 11. 储藏更改

当你的更改与其他分支冲突时，想要切换分支前，应将更改储藏起来，完成另一个分支的工作回到原分支后再取出。

```shell
git stash

git switch dev

# ...

git switch feature/001
git stash pop
```

### 12. cherry pick

当开发分支并入了很多新提交，而你只想往功能分支中引入其中一个（比如其他功能分支对通用组件做了修改，又添加了自己的功能组件），你可以使用 cherry pick 挑出你想要的那条提交并入自己的分支。

```shell
git cherry-pick e730e57c66ad91beeaf02886f75caf04d4b615d9 # commit hash
```

### 13. 创建并切换到发布分支（release）

当一个阶段的功能完成开发后，对应的功能分支均已合并到开发分支，即准备发布下一个主要版本（major version）时，应该基于开发分支，分出一个发布/预发布分支，用于测试功能和修复问题。

```shell
# 1.0 发布（此时发布分支还不存在，需要从开发分支新建）
git switch dev
git branch -c release

# 2.0 发布（合并开发分支即可）
git switch release
git merge dev --no-ff -m "merge: prepare for v2.0.0 release"
```

每当发布分支上做了修复时，应该将修复合并回开发分支。

```shell
git switch dev
git merge release --no-ff -m "merge: merge bugfixes"
```

### 14. 发布新版本

当测试和修复完成后，应该将发布分支合并到主分支，随后给这个最新提交打上版本标签。

```shell
git switch main
git merge release --no-ff -m "merge: v2.0.0 release"
git tag v2.0.0
```

### 15. 紧急修复（hotfix）

当主分支上存在致命缺陷时，应当从主分支分出一个紧急修复分支。修复完成后，应当将紧急修复分支合并到主分支和开发分支上。

```shell
git switch main
git branch -c hotfix/route-missing # 分支命名规则：hotfix/<place-problem>

code src/router/index.js

git add . && git commit -m "hotfix: fix route missing problem"

git switch main
git merge --no-ff -m "merge: merge hotfix"

git switch dev
git merge --no-ff -m "merge: merge hotfix"
```

## Addition

### 小贴士

1. 你可以用提交的 Hash 值、HEAD 和相对 HEAD 等方式指定一个提交；

### 常驻/临时分支

常驻分支：main、dev、release

临时分支：feature、hotfix

### 工作流程

1. 开发工作流程：

   main

   -> dev

   -> (feature -> dev) \* n

   -> release

   -> dev \* n, main

2. 紧急修复工作流程：

   main

   -> hotfix

   -> main, dev
