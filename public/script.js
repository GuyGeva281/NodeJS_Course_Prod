console.log("hello js");
onload= function(){
   this.fetch("file.json").then((data)=>{
        data.json().then((json)=>{
            console.log(json);
            var elem = this.document.getElementById("hi");
            elem.innerHTML = `Hello ${json.name} Your Job Is ${json.title}`;
           
        });
   }); 
   this.setInterval(()=>{
   coloring();
   },2000);
}
var cl1=getRandRGB();
var cl2;
function coloring(){
    cl2= cl1;
    cl1= getRandRGB();
    var bd = document.getElementsByTagName("body")[0];
    bd.style.background = "linear-gradient("+cl1+", "+cl2+")";

}
function getRandRGB(){
    let r = Math.floor(Math.random()*100 +150);
    let g = Math.floor(Math.random()*100 +150);
    let b = Math.floor(Math.random()*100 +150);
    return `rgb(${r},${g}, ${b})`;
}