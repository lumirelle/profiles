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
git add .
git commit -m "init: init project with constraint files"
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

当远程有来自他人的更新，应立即从远程拉取，避免基于过时的代码开发。拉取操作默认行为是拉取并合并远程代码，如果存在冲突，则会产生合并记录。这样的合并记录是冗余的，因此推荐使用 `--rebase` 参数改变为变基操作。

```shell
# 假设已经添加名为 "origin" 的远程
git pull origin main:main
# 或简写为
git pull origin main
# 等价于
git fetch origin main:main && git merge origin/main

# 假设已经添加名为 "origin" 的远程
git pull origin main:main --rebase
# 或简写为
git pull origin main --rebase
# 等价于
git fetch origin main:main && git rebase origin/main
```

### 4. 创建并切换到开发分支（dev）

完成初始化提交和远程仓库的添加之后就应该分出项目的开发分支，基于开发分支做开发。遵循[规范的多人协作开发流程](https://github.com/wibetter/akfun/blob/master/%E5%A6%82%E4%BD%95%E8%A7%84%E8%8C%83%E5%A4%9A%E4%BA%BA%E5%8D%8F%E4%BD%9C%E5%BC%80%E5%8F%91.md)有助于更好地维护项目。

```shell
# 从 main 分支分出 dev 分支
git switch -c dev main
# 省略时默认从当前分支分出 dev 分支
git switch -c dev
```

### 5. 创建并切换到功能分支（feature/\*\*）

每当你想要开发一个新功能时，就要基于开发分支，分出具体的功能分支（feature/\*\*）。开发分支只应该用来合并/整合功能分支。

```shell
git switch -c feature/001 dev # 分支命名规则：feature/<feature-code>

code git-manual.md

git add .
git commit -m "feat: complete feature/001"
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
# 你也可以将 .gitconfig 中的 merge.ff 配置项设置为 false
git config --global merge.ff false
```

### 10. 分支变基

变基用于将基于提交 A 的分支 1 变为基于分支 2 最新提交。请只对尚未推送到远程的分支做变基操作！

```shell
# branch1 必须是尚未推送到远程的分支
git switch branch1
git rebase branch2
```

### 11. 删除冗余临时分支

当功能分支的使命达成时，就要将其删除，避免分支过多而难以维护。其他临时分支，如预发布、紧急修复分支也是如此。

```shell
# 查看本地的分支
git branch

git switch dev

# 务必保证分支内容已经合并到主分支
git branch -d features
# 对于从未合并到主分支的分支，需要使用 -D 选项强制删除
git branch -D features
```

### 12. 储藏更改

当你的更改与其他分支冲突时，例如你修改的文件在目标分支里根本不存在，此时在切换分支前，需要将更改储藏起来，完成另一个分支的工作回到原分支后再取出。

```shell
git stash push
# 或简写为
git stash

git switch dev

# 完成另一个分支上的工作...

git switch feature/001
git stash pop
```

### 13. cherry pick

当开发分支并入了很多新提交，而你只想往功能分支中引入其中一个（比如其他功能分支对通用组件做了修改，又添加了自己的功能组件），你可以使用 cherry pick 挑出你想要的那条提交并入自己的分支。尽量将对通用组件的修改作为一个单独的提交。

```shell
git cherry-pick e730e57c66ad91beeaf02886f75caf04d4b615d9 # commit hash
```

### 14. 创建并切换到预发布分支（release）

当一个阶段的功能完成开发后，对应的功能分支均已合并到开发分支，即准备发布下一个版本时，应该基于开发分支，分出一个预发布分支，用于 QA 测试和问题修复。

```shell
# 准备 1.0.0 发布
git branch -c release-1.0.0 dev

# 测试和修复问题...
```

### 15. 发布新版本

当测试和修复完成后，发布新版本，应该将预发布分支合并到主分支，随后给这个最新提交打上版本标签。预发布分支上的修改同样要合并如开发分支，否则会导致主分支和开发分支出现冲突。

```shell
# 确认无误后，合并入主分支并打上版本标签
git switch main
git merge release-1.0.0 --no-ff -m "merge: v1.0.0 release"
git tag -a v1.0.0

# 修改同样要合并入开发分支
git switch dev
git merge release-1.0.0 --no-ff -m "merge: v1.0.0 release"
```

### 16. 紧急修复（hotfix）

当主分支上存在致命缺陷时，应当从主分支分出一个紧急修复分支。修复完成后，应当将紧急修复分支合并到主分支和开发分支上。

```shell
git branch -c hotfix/route-missing main # 分支命名规则：hotfix/<place-problem>

code src/router/index.js

git add .
git commit -m "hotfix: fix route missing problem"

git switch main
git merge --no-ff -m "merge: merge hotfix"

git switch dev
git merge --no-ff -m "merge: merge hotfix"
```

## 17. .gitconfig

你可以使用 `.gitconfig` 来配置 Git 的默认选项，见 [Git Configuration](../preferences/git/.gitconfig)。

## 其他

### 常驻/临时分支

常驻分支：main、dev

临时分支：feature、release、hotfix

### 工作流程

1. 开发工作流程：

   main

   -< dev

   -< feature/001, feature/002, ... \<coding\>

   -> dev

   -< release-x.x.x \<coding\>

   -> dev, main

2. 紧急修复工作流程：

   main

   -< hotfix \<coding\>

   -> main, dev
