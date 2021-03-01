
function merge2String( a, b){
    let res = "";
    for(let i=0; i < Math.min(a.length, b.length); i++){
        res += a[i];
        res += b[i];
    }
    if (a.length < b.length)
        for(let i=a.length; i<b.length; i++) res += b[i];
    if (a.length > b.length)
        for(let i=b.length; i<a.length; i++) res += a[i];
    return res;
}
function bai2() {
    let str1 = String(prompt("Enter your 1st String: "));
    let str2 = String(prompt("Enter your 2nd String: "));
    let arr1 = str1.split('');
    let arr2 = str2.split('');  

    document.getElementById("result2").innerHTML = merge2String(arr1,arr2);       
}