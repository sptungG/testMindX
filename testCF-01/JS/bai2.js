// Có một nhóm người đang đứng thành một hàng, để chia ra làm 2 đội từ hàng người thì quản trò chia như sao. Người đứng thứ nhất vào Team 1, người đúng thứ hai vào Team 2, người đứng thứ ba vào lại Team 1, cứ tiếp tục như thế cho đến người cuối cùng.
// Viết chương trình có đầu vào là một mảng chưa cân nặng của tất cả mọi người theo thứ tự hàng ban đầu và yêu cầu trả về mảng chưa tổng cân nặng của 2 team

function bai2() {
  let arrNum = prompt("Nhập lần lượt cân nặng của những người tham gia, cách nhau bỏi phím cách 'space'\n ví dụ như 60 40 55 75 64: ").trim();
  let arr = arrNum.split(" ");
  document.getElementById("num2").innerHTML = `${arrNum}`;
  document.getElementById("result2").innerHTML = alternatingSums(arr).join(",");
}
function alternatingSums(a) {
  let team1 = 0;
  let team2 = 0;
  for (let i in a) {
      if (i % 2 == 0) team1 += parseInt(a[i]);
      else team2 += parseInt(a[i]);
  }
  return [team1, team2];
}
