// Hàm lấy cookie
export function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)===' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
          return c.substring(name.length,c.length);
      }
  }
  return "";
}

export function setCookie(cname, cvalue, exdays, path = '/', secure = false, sameSite = 'Strict') {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000); // Tính thời gian hết hạn
  var expires = "expires=" + d.toUTCString(); // Chuyển thời gian hết hạn thành chuỗi UTC

  // Cấu hình cookie
  var cookieString = `${cname}=${cvalue}; ${expires}; path=${path}; SameSite=${sameSite}`;
  
  // Thêm "Secure" nếu cần (chỉ gửi cookie qua HTTPS)
  if (secure) {
    cookieString += "; Secure";
  }

  // Lưu cookie vào trình duyệt
  document.cookie = cookieString;
}

// Hết Hàm tạo cookie

// Hàm xóa cookie
export function deleteCookie(cname, path = "/", domain = "") {
  let cookieString = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

  // Nếu cookie có domain và path, cần phải chỉ định các thuộc tính này
  if (domain) {
    cookieString += ` domain=${domain};`;
  }
  cookieString += ` path=${path};`;

  // Thiết lập cookie với ngày hết hạn đã qua để xóa cookie
  document.cookie = cookieString;
}
// Hết Hàm xóa cookie

// Xóa hết cookie
export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
// Hết phần Xóa hết cookie