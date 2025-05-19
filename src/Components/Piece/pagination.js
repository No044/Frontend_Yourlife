import { Pagination  } from 'antd';
import Seturl from "../helper/SetURL";
import GetUrl from '../helper/GetURL';
function PaginationCustom({FetchAPI,total = 5}){
    const page = GetUrl("page") || 1;
    const change_pagination = (e) => {
        Seturl({ title: "page", value: e })
        FetchAPI()
    }
  return (
    <Pagination onChange={change_pagination} style={{ margin: "30px auto", textAlign: "center" }}
    align="center" defaultCurrent={page} total={total * 10} />

  )
}


export default PaginationCustom