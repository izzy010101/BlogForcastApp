
function showCurrentTime() {   
    setTimeout(function() {   
      let d = new Date();
      let n = d.toLocaleTimeString();
      document.getElementById("clock").innerHTML = n; 
      showCurrentTime();             
    }, 1000)
}
     
showCurrentTime();

