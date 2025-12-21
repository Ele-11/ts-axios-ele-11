# ts-axios-ele
使用typescript实现 axios，最终命名为 ts-axios-ele-11。

假如你想跑这个，可以装个Nodejs, 然后在项目根目录下 运行  

npm install  安装 所需要的包和依赖

然后 npm run dev 查看例子  比如看 控制台输出的结果 和 Network的各个路由接口返回的 Response 数据，反正可以看一堆东西。

npm test  运行 单测 查看我们的单测结果

下面是单测最后的执行结果，有几个测试用例通过，几个测试用例失败。
主要是学到了如何利用单元测试来 检查 代码的质量，并且纠正代码中的错误。

找到刚开始没有关注到的  边界条件 或是  初始化问题。

没有把他发布到npm上去，但是看了一下步骤感觉还不错，这个项目还是学到了一些东西。

------------------------|----------|----------|----------|----------|-------------------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |                                                                              
------------------------|----------|----------|----------|----------|-------------------|                                                                              
All files               |    86.32 |    80.12 |    73.47 |    86.06 |                   |                                                                              
 src                    |       90 |      100 |       60 |       90 |                   |                                                                              
  axios.ts              |    82.61 |      100 |       20 |    82.61 |       44,48,52,53 |                                                                              
  defaults.ts           |      100 |      100 |      100 |      100 |                   |
  index.ts              |      100 |      100 |      100 |      100 |                   |
 src/cancel             |    34.78 |        0 |       20 |    34.78 |                   |
  Cancel.ts             |       60 |      100 |    33.33 |       60 |              9,14 |
  CancelToken.ts        |    27.78 |        0 |    14.29 |    27.78 |... 29,30,36,37,39 |
 src/core               |    82.07 |    69.66 |    71.43 |    81.87 |                   |
  Axios.ts              |    77.08 |       75 |    33.33 |    76.09 |... 14,122,126,134 |
  dispatchRequest.ts    |    91.67 |       70 |      100 |    91.67 |             36,60 |
  interceptorManager.ts |    53.85 |        0 |       50 |    53.85 | 16,20,25,26,32,33 |
  mergeConfig.ts        |       90 |    81.25 |      100 |       90 |          47,51,80 |
  transform.ts          |       75 |       50 |      100 |       75 |              9,12 |
  xhr.ts                |    85.25 |    72.34 |    91.67 |    85.25 |... 39,143,149,155 |
 src/helpers            |      100 |    98.48 |      100 |      100 |                   |
  cookies.ts            |      100 |      100 |      100 |      100 |                   |
  data.ts               |      100 |      100 |      100 |      100 |                   |
  error.ts              |      100 |       50 |      100 |      100 |                17 |
  headers.ts            |      100 |      100 |      100 |      100 |                   |
  url.ts                |      100 |      100 |      100 |      100 |                   |
  util.ts               |      100 |      100 |      100 |      100 |                   |
------------------------|----------|----------|----------|----------|-------------------|
Jest: "global" coverage threshold for statements (95%) not met: 86.32%
Jest: "global" coverage threshold for branches (90%) not met: 80.12%
Jest: "global" coverage threshold for lines (95%) not met: 86.06%
Jest: "global" coverage threshold for functions (95%) not met: 73.47%
Test Suites: 1 failed, 6 passed, 7 total
Tests:       3 failed, 58 passed, 61 total
Snapshots:   0 total
Time:        14.963s
Ran all test suites.