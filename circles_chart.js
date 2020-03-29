function buton1()
{
  var text="parcauto2018.txt";
  loadDoc3(text);
}
function buton2()
{
  var text="parcauto2019.csv";
  loadDoc3(text);
}
function buton3()
{
  var text="https://data.gov.ro/dataset/b93e0946-2592-4ed7-a520-e07cba6acd07/resource/c66e2f22-7c16-4dd4-919d-f592b3e09af6/download/parcauto2018.csv";
  loadDoc(text);
}
function verificare(cerc_x,cerc_y,raze,x,y,r)
{
  for(var i=0;i<raze.length;i++)
  {

     var d=Math.sqrt((x-cerc_x[i])*(x-cerc_x[i])+(y-cerc_y[i])*(y-cerc_y[i]));
     if(r+raze[i]>d)
      return false;
  }
  return true;
}



function loadDoc3(nume_fisier) {
  var xhttp = new XMLHttpRequest();
  var cerc_x=[];
  var cerc_y=[];
  var raze=[];
  xhttp.onreadystatechange = function() {
    if(xhttp.readyState === 4)
    {
      if(xhttp.status === 200 || xhttp.status == 0)
      {
        var lines=xhttp.responseText;
        lines=lines.split("\n");
        var resul = [];
        var count = [];
        for (var i = 1; i < lines.length; i++) {                 
        var currentline = lines[i].split("\";\"");
        var j=resul.indexOf(currentline[1]);
        if(j==-1)
        {
          resul.push( currentline[1]);
          count.push(parseInt(currentline[5]));
        }
        else
          count[j]=count[j]+parseInt(currentline[5]);
        }
        var type =count.slice();
        type.sort(function(a, b){return a - b});
        var max=type[type.length-2];
        
        var ci=255/(type.length-2);
        var cr=90/(type.length-2);
        var creare=document.getElementById("main");
        var s="<svg width=\"1200\" height=\"3000\" aria-labelledby=\"title\">";
        var s2="<svg width=\"1200\" height=\"3000\" aria-labelledby=\"title\"><title id=\"title\">A bart chart showing information</title>";
        

        for (var i =0; i <resul.length-2; i++) {
                       // type.push([resul[i],count[i]]);
        var poz=i*60+10;
        
        var r=Math.floor(Math.random() * 255);
        var g =255-ci*type.indexOf(count[i]);
        var g2=255-g;
        var b = 255;var w;var max;
        var ra=15+cr*type.indexOf(count[i]);
        w=count[i]*100/max;
        var x;
        var y;
        do
        {
          x=Math.floor(Math.random()*1000)+100;
          y=Math.floor(Math.random()*800)+100;
        }while(!verificare(cerc_x,cerc_y,raze,x,y,ra));
        raze.push(ra);
        cerc_x.push(x);
        cerc_y.push(y);
        s=s+"<g ><circle cx=\""+x+"\" cy=\""+y+"\" r=\""+ra+"\" fill=\"rgb("+r+","+g+","+b+")\" \\><title id=\"title\">"+resul[i]+"("+count[i]+")"+"</title></g>";
        }
        s=s+"</svg>";
        creare.innerHTML =s;
        }
      }

          
  };
  xhttp.open("GET", nume_fisier, true);
  xhttp.send(null);
  
  
                
                
             
            
}
