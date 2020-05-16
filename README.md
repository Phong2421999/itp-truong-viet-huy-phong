## Ứng dụng phát triển phục vụ việc thi anh văn trong gồm 4 đợt thi trong 4 tuần của Hội sinh viên Thành phố Hồ Chí Minh

> Tác giả: [Trương Viết Huy Phong](https://facebook.com/phong.mast)

### Môi trường cần thiết để chạy ứng dụng:

- NodeJS:
  - Windows x64 Installer: https://nodejs.org/dist/v0.10.16/x64/node-v0.10.16-x64.msi
  - Linux 64-bit Binary: https://nodejs.org/dist/v0.10.16/node-v0.10.16-linux-x64.tar.gz
- MongoDB:
  - Windows: https://www.mongodb.com/download-center/community?tck=docs_server
  - Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

### Hướng dẫn config và chạy ứng dụng:

1. Mở terminal tại thư mục gốc của ứng dụng
2. Dùng lệnh: `npm instal` để cài đặt các package cần thiết
3. Dùng lệnh: `npm run setup` để chạy setup ban đầu của ứng dụng
4. Dùng lệnh: `npm start` để chạy ứng dụng

### Cấu trúc của ứng dụng:

- Ứng dụng dùng các công nghệ: NodeJS, Framework ExpressJS, Mongodb
- Ứng dụng cố gắng tiếp cận theo mô hình MVC
  1. Folder classes chứa lớp DAO là lớp để giao tiếp với các Model
  2. Folder controllers chứa các hàm là các hàm xử lý các logic nghiệp vụ
  3. Folder validates chứa các hàm là các hàm dùng để kiểm tra dữ liệu đầu vào, các quyền truy cập ứng dụng.
  4. Folder model chứa các model thiết kế database của ứng dụng
  5. Folder services chứa các hàm phục vụ trong quá trình xử lý logic của controllers

### Lời bày tỏ của tác giả:

1. Vì em chỉ thiết kế ứng dụng phần backend nên chỉ gửi anh chị source code phần backend mong anh chị thông cảm. Để trải nghiệm ứng dụng với giao diện hoàn chỉnh anh chị có thể truy cập trang web [Tại đây](http://englishcamp.hoisinhvientphcm.com/)
2. Vì yêu cầu ứng dụng bắt buộc phải login bằng tài khoản google anh chị có thể sử dụng route: [localhost:2609/auth/google]([localhost:2609/auth/google) để nhận token login
3. Link tổng hợp api được lưu [tại đây](https://docs.google.com/spreadsheets/d/1a_lyXDO4egAo3jAtlqJYwoM5OYly3MR7D6crV97v0-c/edit#gid=0)
4. Vì trang web từng bị ddos bởi một số bạn nên em có thêm phần chặn ddos bằng timestamp tại header nhưng đã có gỡ bỏ
5. Tài khoản admin để đăng nhập admin:
   - Tài khoản: itp
   - Mật khẩu: itp
6. Mong anh chị thông cảm vì những bất tiện của source code

> Cảm ơn anh chị đã quan tâm và đọc qua source code của em. Chúc anh chị có 1 ngày vui vẻ!
