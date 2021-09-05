function bai1(){
   let size = Number(prompt("Enter n: "));
   while( (size < 4) || (size >20) || (size % 2 != 0)){
     size =  Number(prompt("Your number is not confirmed, Try again "));
   }
    let num = Number(prompt("Enter your input number: "));
    let arrNum = [];
    for (let i = 0; i < size; i++) {
        arrNum.push(i);
    }
    document.getElementById("arrNum").innerHTML = arrNum;
    document.getElementById("result1").innerHTML = findOppositeNumber(size,num);
}

function findOppositeNumber(n, inputNumber){
if(inputNumber < n/2){
  return n/2 + inputNumber;
}else{
    return inputNumber - n/2;
}

}