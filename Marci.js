function buton1()
{
  var text="parcauto2018.txt";
  loadDoc2(text);
}
function buton2()
{
  var text="parcauto2019.csv";
  loadDoc2(text);
}
function buton3()
{
  var text="https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/c66e2f22-7c16-4dd4-919d-f592b3e09af6/download/parcauto2018.csv";
  loadDoc2(text);
}
function test() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById("demo").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", "parcauto2018.txt", true);
  var lines =[];
  lines=xttp.response();
  lines=lines.split("\n");
  document.write(lines);
}
function loadDoc2(nume_fisier) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
        {
          var lines=xhttp.responseText;
          lines=lines.split("\n");
          var resul = [];
          var count = [];
          for (var i = 1; i < lines.length; i++) {                 
            var currentline = lines[i].split("\";\"");
            var j=resul.indexOf(currentline[3]);
            if(j==-1)
              {
                resul.push( currentline[3]);
                count.push(parseInt(currentline[5]));
              }
            else
                count[j]=count[j]+parseInt(currentline[5]);
          }
          var type =count.slice();
          type.sort(function(a, b){return a - b});
          var max=type[type.length-2];
          var ci=255/(type.length-1);
          var creare=document.getElementById("main");
          var s="";
          for (var i =0; i <resul.length-1; i++) {
                       // type.push([resul[i],count[i]]);
            var poz=i*60+10;
            var r = Math.ran;
            var g =255-ci*type.indexOf(count[i]);
            var g2=255-g;
            var b = 255;
            var sizeFont=100+count[i]*500/max;
            s=s+"<g class=\"Marca\" style=\"font-size:"+sizeFont+"%;color:rgb("+r+","+g+","+b+")\"> "+resul[i]+" </g>";
          }
          //s=s+"</svg>";
          creare.innerHTML =s;
          }        
  };
  xhttp.open("GET", nume_fisier, true);
  xhttp.send(null);           
}
