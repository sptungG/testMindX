// (Không sử dụng cầu điều kiện) Viết hàm kiểm tra danh sách các hộ gia đình có số điện tiêu thụ vượt quá 100 số mỗi tháng.
// Danh sách chứa các object có key và value tương ứng ví dụ {soNha : "10", soDien: 101}

let data = [
  { soNha: "10", soDien: 101 },
  { soNha: "11", soDien: 100 },
  { soNha: "12", soDien: 99 },
  { soNha: "13", soDien: 98 },
  { soNha: "14", soDien: 95 },
];
function bai2() {
  let result = data.filter((e) => {
    return e.soDien > 100;
  });
  console.table(result);
}
