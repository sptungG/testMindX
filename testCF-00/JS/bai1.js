// Viết hàm chuyển đổi các số nguyên về số La mã. Ví dụ nhập vào 6 => output là VI
function bai1() {
  let num = Number(prompt("Nhập số của bạn: ").trim());
  while (isNaN(num)) {
    num = Number(prompt("Bạn nhập sai rồi. Hãy nhập lại số: ").trim());
  }
  document.getElementById("num").innerHTML = `${("0" + num).slice(-2)}`;
  document.getElementById("result1").innerHTML = romanize(num);
}
function romanize(num) {
  let lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
  let roman = "";
  for (let i in lookup) {
    while (num >= lookup[i]) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
