// Nhập vào một mảng các số nguyên, tìm cặp hai số liền kề có tích lớn nhất và trả về kết quả của phép nhân 2 số đó.
function bai1() {
  let arrNum = prompt("Nhập lần lượt các số trong mảng, cách nhau bỏi phím cách 'space'\n ví dụ như 2 3 -5 -2 4: ").trim();
  let arr = arrNum.split(" ");
  document.getElementById("num1").innerHTML = `${arr}`;
  document.getElementById("result1").innerHTML = adjacentElementsProduct(arr);
}
function adjacentElementsProduct(inputArray) {
  let max = -Infinity;
  for (let i = 1; i < inputArray.length; i++) {
    max = Math.max(inputArray[i] * inputArray[i - 1], max);
  }
  console.log(max);
  return max;
}
