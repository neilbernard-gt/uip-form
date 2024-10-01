function show(x) {
    if (x==0) {
        document.getElementById('scanned').style.display = "block";
        document.getElementById('hardcopy').style.display = "none";}
        
    if (x==1) {
        document.getElementById('scanned').style.display = "none";
        document.getElementById('hardcopy').style.display = "block";}
}