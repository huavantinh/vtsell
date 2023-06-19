// const cookie = async (req, res) => {};
const cookieOptions = {
  maxAge: 1000 * 60 * 60, // Thời gian sống của cookie (1 giờ)
  httpOnly: true, // Chỉ cho phép cookie được truy cập qua HTTP và không qua JavaScript
  signed: true, // Ký hiệu cookie để bảo mật
};
module.exports = { cookieOptions };
