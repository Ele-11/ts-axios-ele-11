
import { AxiosRequestConfig } from './types';

import xhr from './xhr';

function axios(config: AxiosRequestConfig):void {
   xhr(config);
   console.log(config);
   console.log("随便写点什么，上传到远程服务器，十一是个大帅逼！");
   console.log("2222222十一是个大帅逼！");
}


export default axios;
