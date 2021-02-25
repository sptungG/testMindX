let randomNumber;
let clicked = 0;

function createRandomNumber(){
    randomNumber = Math.floor((Math.random() * 10) + 1);
}

function checkNumber(){
    clicked++;
    document.getElementById('btn').innerHTML = 'Check(' + clicked + ')';
    
    let inputValue = Number(document.getElementById('inputValue').value);
    
    document.getElementById('inputValue').focus();
    document.getElementById('inputValue').placeholder = "You previously entered "+inputValue;
    document.getElementById('inputValue').value = '';
    console.log(inputValue)
    if(typeof(inputValue) != String){
        if((inputValue > -1) && (inputValue < 11) ){
            document.getElementById('btn').style.color = "white";
            if(randomNumber == inputValue){
                document.getElementById('status').innerHTML = 'Hurrahh!! You found me.';
                document.getElementById('btn').style.backgroundColor = "green";
                // after 3s -> Reset
                setTimeout(function(){
                    location.reload()
                },3000);
            } else if(Math.abs(randomNumber - inputValue) >= 5) {
                document.getElementById('status').innerHTML = 'You are far away.';
                document.getElementById('btn').style.backgroundColor = "tomato";
            }else if(Math.abs(randomNumber - inputValue) >= 3) {
                document.getElementById('status').innerHTML = 'You are close.';
                document.getElementById('btn').style.backgroundColor = "orange";
            }else if(Math.abs(randomNumber - inputValue) >= 1) {
                document.getElementById('status').innerHTML = 'You are too close, come on crack this.';
                document.getElementById('btn').style.backgroundColor = "rgb(126, 160, 57)";
            }
        }
        else{
            document.getElementById('status').innerHTML = 'Please type in between (1-10)';
        } 
    }else {
        document.getElementById('status').innerHTML = 'Please Enter a Number.';
    }
   
    
}

function key(e){
    if(e.keyCode === 13){
        // Enter key on keyboard.
        checkNumber();
    }
}
document.addEventListener('keyup', key);