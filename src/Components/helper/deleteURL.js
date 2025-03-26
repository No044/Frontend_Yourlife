function DeletedURL() {
    const currentUrl = new URL(window.location);

    // Xóa tất cả query parameters
    currentUrl.search = ''; // Set lại search parameters về chuỗi rỗng

    // Cập nhật lại URL trong thanh địa chỉ mà không làm reload trang
    window.history.pushState({}, '', currentUrl);
}

export default DeletedURL;
