import { Card, Button, Col ,Input} from 'antd';
import Seturl from "../helper/SetURL";
const { Search } = Input;

function Search_Component({FetchAPI,type = '1',name = {Active : "Hoạt Động", inActive : "Dừng Hoạt Động"}}){
     
      const handle_status_mycourse = (key) => {
        Seturl({ title: "status", value: key })
        FetchAPI()
      }
      const handle_search_mycourse = (key) => {
        Seturl({ title: 'key', value: key })
        FetchAPI()
      }
    return (
        <Col span={24}>
        <Card style={{
          width: '100%',
          textAlign: "left",
          marginBottom: "50px"
        }}
          title="Tìm Kiếm" >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "60%" }}>
              <Button onClick={() => handle_status_mycourse(0)}>Tất Cả</Button>
              <Button onClick={() => handle_status_mycourse(1)}>{name.Active}</Button>
              {
                type == "1" &&  <Button onClick={() => handle_status_mycourse(4)}>Sắp Hết Hạn</Button>
              }
              <Button onClick={() => handle_status_mycourse(2)}>{name.inActive}</Button>
            
              {
                type == "1" &&  <Button onClick={() => handle_status_mycourse(3)}>Bảo Lưu</Button>
              }
              
            </div>
            <div style={{ width: "40%", textAlign: "right" }}>
              <Search style={{
                width: '80%',
              }} placeholder="Nhập Dữ Liệu Cần Tìm Kiếm" onSearch={handle_search_mycourse} enterButton />
            </div>
    
          </div>
        </Card>
      </Col>
    )
}

export default Search_Component