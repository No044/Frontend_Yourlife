import React from 'react';
import Header_Y from '../../Components/Layout/Header_Y';
import authorize from '../../Components/helper/authorize_Y';
import dayjs from "dayjs";

import { Descriptions, Card, Button } from 'antd';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom"
import { GetDetail, updatefinger } from '../../service/CTM_Y.service';
import { useSelector } from "react-redux";
import { selectRole, selectPermission } from "../../Redux/UserRedux_Y";
import handle_error from '../../Components/Piece/handle_error';
import { AlertSuccess } from '../../Components/Piece/Alert';
function Detail_CTM() {
  const [DataCTM, SetDataCTM] = useState(null)
  const permission = useSelector(selectPermission)
  const role = useSelector(selectRole)
  const { id } = useParams()

  const navigate = useNavigate()
  authorize(permission, "detail_customer", navigate, role)
  

    const FetchAPI = async () => {
    const respond = await GetDetail(id)
    if (respond.status == true) {
      const today = dayjs()
      const futureDate = today.add(Math.ceil(respond.data.totalDay), "day");
      const newobject = [
        {
          key: '1',
          label: 'Họ Và Tên',
          children: respond.data.FullName,
        },
        {
          key: '2',
          label: 'Email',
          children: respond.data.Email,
        },
        {
          key: '3',
          label: 'Số điện thoại',
          children: respond.data.Phone_number,
        },
        {
          key: '4',
          label: 'Trạng thái',
          children: respond.data.Status == '1' ? "Hoạt Động" : respond.data.Status == 2 ? "Không Hoạt Động" : "Bảo Lưu",
        },
        {
          key: '5',
          label: 'Dịch Vụ',
          children: <Link to={`/list_service/detailsvctm/${id}/ctmsv`}> Chi tiết</Link>
        },
        {
          key: '6',
          label: 'Gói Tập',
          children: <Link to={`/list_package/detail_pkctm/${id}/ctmpk`}> Chi tiết</Link>
        },
        {
          key: '7',
          label: 'Ngày Tạo',
          children: respond.data.createAt
        },
        {
          key: '8',
          label: 'Người Tạo',
          children: respond.data.CreateBy
        },
        {
          key: '9',
          label: 'Ngày bảo lưu gần nhất',
          children: respond.data.date_reserve != null ? respond.data.date_reserve : <> Không có </>
        },
        {
          key: '10',
          label: 'Số ngày còn lại',
          children: Math.ceil(respond.data.totalDay)
        }, {
          key: '11',
          label: 'Ghi Chú',
          children: <div dangerouslySetInnerHTML={{ __html: respond.data.Description }} />

        }, {

          key: '12',
          label: 'Ngày Hết Hạn Tạm Tính',
          children: futureDate.format("DD/MM/YYYY")

        },
        {

          key: '13',
          label: 'Vân Tay',
          children: respond.data.id_fingerprint == null || respond.data.id_fingerprint == "null" ?  <Button onClick={() => handle_update_idfinger(respond.data._id)}>Cập Nhật</Button> : "Đã Có"

        },
      ]
      SetDataCTM(newobject)
    }
    handle_error(respond, navigate)
  }

  const handle_update_idfinger = async (e) => {
    const respond = await updatefinger({id : e})
    if(respond.status == true){
      AlertSuccess("Thao Tác Thành Công")
      FetchAPI()
    }else{
      handle_error(respond, navigate,respond.type)
    }
 }
 
  useEffect(() => {
    FetchAPI()
  }, [])
  return (
    <div >
      <Header_Y content={"Xem Chi Tiết Khách Hàng"} />
      <Card 
        bordered={true}
        style={{
          width: '100%',
          textAlign: "left",
          marginBottom: "50px",
          marginTop: "30px"
        }}>
        {DataCTM != null && <Descriptions labelStyle={{ fontWeight: 600, width: 200 }}
          bordered
          column={1}
          items={DataCTM} />}
      </Card>
      <div style={{ textAlign: 'right', paddingBottom : "20px" }}>
        <Button type="primary" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
      </div>

  )
}

export default Detail_CTM