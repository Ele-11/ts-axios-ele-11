
import { AxiosRequestConfig } from './types';

import xhr from './xhr';

function axios(config: AxiosRequestConfig):void {
   xhr(config);
   console.log(config);
}


export default axios;
