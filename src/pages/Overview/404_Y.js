import logo from "../../Styles/Admin/404/image/img-error-404.png";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
function Page404_Y() {
    return (
        <>
            <div className="auth-main v1">
                <div className="auth-wrapper">
                    <div className="auth-form">
                        <div className="error-card">
                            <div className="card-body">
                                <div className="error-image-block">
                                    <img className="img-fluid" src={logo} alt="img" />
                                </div>
                                <div className="text-center">
                                    <h1 className="mt-2" style={{ fontWeight: 600 }}>Không tìm thấy trang !!!</h1>
                                    <p className="mt-2 mb-4 text-muted f-20">
                                        Xin lỗi, trang bạn đang tìm kiếm hiện không tồn tại hoặc có thể đang được cập nhật.
                                        vui lòng quay về trang chủ !.
                                    </p>
                                    <Link to="/auth/login">
                                        <Button style={{ fontWeight: 600 , padding : "20px"}}>
                                        <FontAwesomeIcon icon={faHouseChimney} />
                                            Back to Home
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Page404_Y;
