# Git 手册 Git Manual

## 什么是 Git？ What is Git?

分布式版本控制系统。

### 核心概念解释

提交：一次提交由一或多个文件的更改组成。Git 只追踪和记录提交。

工作区：你当下编辑文件的地方。

暂存区/索引：用来收集和暂存工作区中产生的更改，等待你把他们组织成一个新的提交。（暂存区可以避免提交太笼统或太碎片）

版本库/存储库：存储提交记录的地方。新的提交总是基于上一次的提交，因此版本库中的提交记录常常是树状的。树的每一枝就叫做分支。

HEAD：指向当前分支的最新提交。

## 怎么使用？ How to use?

NOTE：本文中的命令缩写基于 [`.gitconfig`](../../preferences/vcs/git/.gitconfig) 中设置的 aliases。

### 1. 创建版本库并完成初始化提交（init commit）

在初始化提交时，应当完成规范文件、依赖文件等项目基建设置。提交后，Git 会自动为你创建一个主分支，通常叫做 main 或 master（欧，主人！），取决于你的 `.gitconfig` 配置。

```shell
# 创建版本库时，Git 将为你自动创建一个没有提交记录的主分支
git i

# 完成项目基建设置
cursor .editorconfig
cursor .prettierrc.yml
...

# 初始化提交
git ac "init: init project"
```

### 2. 添加远程并推送

作为分布式版本管理系统，你可以将版本库推送到远程。只有将版本库推送到远程后，才能实现多人协作开发。

```shell
# 添加远程
# 格式：`git re <远程名> <远程库 URL>`
git re origin https://github.com/Lumirelle/profiles.git

# 首次推送分支，需要设置上游
# 格式：`git pu <远程名> <本地分支名>:<远程分支名>`
git pu origin main:main
# 如果本地和远程分支名相同，则可以将 `<本地分支名>:<远程分支名>` 简写为 `<分支名>`，git pull 等命令同理
# 格式：`git pu <远程名> <分支名>`
git pu origin main

# 后续推送分支，通常一个版本库只会设置一个默认的名为 origin 的远程，因此约定在这种情况下 `<远程名>` 可以省略
# 设置过上游后，后续所有涉及远程分支操作时就可以自动推断分支和上游 `<本地分支名>:<远程分支名>`
# 格式：`git p`
git p
```

### 3. 从远程拉取

当远程有来自他人的更新，应及时从远程拉取，避免基于过时的代码开发。拉取操作默认行为是拉取并合并，如果存在冲突，则会产生合并记录。这样的合并记录是冗余的，因此推荐使用 `--rebase` 参数改为变基操作。

NOTE：在刚完成本地与远程的冲突合并后，请不要拉取远程代码，应直接推送到远程。否则会再次执行冲突合并流程，导致文件混乱。

```shell
# 以下基于默认远程 origin

# 未使用 `--rebase` 参数
git l
# 等价于使用默认的远程，自动推断分支和上游
git l origin main
# 等价于
git f origin main && git m origin/main

# 使用 `--rebase` 参数
git l --rebase
# 等价于使用默认的远程，自动推断分支和上游
git l origin main --rebase
# 等价于
git f origin main && git r origin/main

# 你也可以将 .gitconfig 中的 pull.rebase 配置项设置为 true
# 这是推荐的设置
git cfg pull.rebase true
```

### 4. 创建并切换到开发分支（dev）

完成初始化提交和远程仓库的添加之后就应该分出项目的开发分支，基于开发分支做开发。遵循[规范的多人协作开发流程](https://github.com/wibetter/akfun/blob/master/%E5%A6%82%E4%BD%95%E8%A7%84%E8%8C%83%E5%A4%9A%E4%BA%BA%E5%8D%8F%E4%BD%9C%E5%BC%80%E5%8F%91.md)有助于更好地维护项目。

```shell
# 从 main 分支分出 dev 分支
# 格式：`git bw <新分支名> <基分支名>`
git bw dev main

# 省略 `<基分支名>` 时默认使用当前分支
git bw dev
```

### 5. 创建并切换到功能分支（feature/xx）

每当你想要开发一个新功能时，就要基于开发分支，分出具体的功能分支（feature/xx）。开发分支只应该用来合并/整合功能分支。

```shell
git bw feature/001 dev # 推荐的功能分支命名规则：`feature/<feature-code>`

cursor git-manual.md

git ac "feat: complete feature/001"
```

### 6. 丢弃工作区的更改

当你错误地更改了一个文件，更改会临时存储在工作区中，直到你使用 `git add` 将它暂存。你可以丢弃工作区的更改。

```shell
# 指定文件
git x index.html
# 所有文件，同时也会删除未跟踪的文件
git xa
```

### 7. 将 HEAD 回退到上个提交（丢弃提交）

当你错误地提交了一个文件，可以将 HEAD 回退到上一个提交，来丢弃提交。丢弃有 `--soft`、`--mixed` 和 `--hard` 三种模式，默认为
`--mixed` 模式。`--soft` 模式仅回退 HEAD 到目标提交，`--mixed` 模式回退 HEAD 和暂存区到目标提交， `--hard`
模式回退 HEAD、暂存区和工作区到目标提交。

```shell
# 回退 HEAD 和暂存区到 HEAD，表现为将暂存区的更改恢复到工作区
git rs HEAD

# 回退 HEAD 和暂存区到 HEAD^，表现为将 HEAD 所指提交所作的更改恢复到工作区
git rs HEAD^
```

### 8. 为最后一次提交补充内容

通常来说，如果你使用 `git rs HEAD^` 是为了撤销最后一次提交，修改内容再重新提交，你可以有更方便的方式直接修改他们。

需要注意的是，如果你修改的是已经推送到远程的提交，再次推送的时候就需要强制推送了。

```shell
# 如果你不需要修改提交信息
git amd
# 如果你想修改提交信息
git amde
```

### 9. 合并功能分支

每当你完成一个功能分支上的开发时，就要将其合并到开发分支上。

```shell
git w dev

# 不要使用 fast-forward 模式，会丢失分支记录
git m features "merge: merge branch 'features' into 'dev'"

# 你也可以将 .gitconfig 中的 merge.ff 配置项设置为 false
git cfg merge.ff false
```

### 10. 分支变基

变基用于将基于提交 A 的分支 1 变为基于分支 2 最新提交。请只对尚未推送到远程的分支做变基操作！

```shell
# branch1 必须是尚未推送到远程的分支
git w branch1
git r branch2
```

### 11. 删除冗余临时分支

当功能分支的使命达成时，就要将其删除，避免分支过多而难以维护。其他临时分支，如预发布、紧急修复分支也是如此。

```shell
# 本地删除
# 切换到其他分支
git w dev
# 务必保证分支可以安全删除（例如已经过时，并完全合并到了主分支）
git xb features
# 对于从未合并到主分支的分支，需要使用强制删除
git xxb features

# 远程删除
git xp origin features
# 远程删除后，需要使用 `--prune` 参数同步远程分支缓存
git f --prune

# 你也可以将 .gitconfig 中的 fetch.prune 配置项设置为 true
# 这是推荐的设置
git cfg fetch.prune true
```

### 12. 储藏更改

当你的更改与其他分支冲突时，例如你修改的文件在目标分支里根本不存在，此时在切换分支前，需要将更改储藏起来，完成另一个分支的工作回到原分支后再取出。

```shell
git s

# 完成另一个分支上的工作...
git w dev
...
git ac 'feat: just do sth'

git w feature/001
git us
```

### 13. Cherry Pick

当开发分支并入了很多新提交，而你只想往功能分支中引入其中一个（比如其他功能分支对通用组件做了修改，又添加了自己的功能组件），你可以使用 Cherry Pick 挑出你想要的那条提交并入自己的分支。尽量将对通用组件的修改作为一个单独的提交。

```shell
git cp xxxxxxxxxxxxxxxxxxxxxxxxxxxx # commit hash
```

### 14. 创建并切换到预发布分支（release）

当一个阶段的功能完成开发后，对应的功能分支均已合并到开发分支，即准备发布下一个版本时，应该基于开发分支，分出一个预发布分支，用于 QA 测试和问题修复。

```shell
# 准备 1.0.0 发布
git bw release-1.0.0 dev

# 测试和修复问题...
```

### 15. 发布新版本

当测试和修复完成后，发布新版本，应该将预发布分支合并到主分支，随后给这个最新提交打上版本标签。预发布分支上的修改同样要合并如开发分支，否则会导致主分支和开发分支出现冲突。

```shell
# 确认无误后，合并入主分支并打上版本标签
git w main
git m release-1.0.0 "merge: v1.0.0 release"
git t v1.0.0

# 修改同样要合并入开发分支
git w dev
git m release-1.0.0 "merge: v1.0.0 release"
```

### 16. 紧急修复（hotfix）

当主分支上存在致命缺陷时，应当从主分支分出一个紧急修复分支。修复完成后，应当将紧急修复分支合并到主分支和开发分支上。

```shell
git bw hotfix/route-missing main # 分支命名规则：hotfix/<place-problem>

cursor src/router/index.js

git ac "hotfix: fix route missing problem"

git w main
git m hotfix/route-missing "merge: merge hotfix"

git w dev
git m hotfix/route-missing "merge: merge hotfix"
```

### 17. .gitconfig

你可以使用 `.gitconfig` 来配置 Git 的默认选项，见 [Git Configuration](../../preferences/git/.gitconfig)。

### 18. 总结

分支时效性：

常驻分支：main、dev

临时分支：feature、release、hotfix

Git 工作流程：

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
