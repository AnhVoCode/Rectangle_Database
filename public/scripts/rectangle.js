// Drawing Rectangle
var canvas = document.getElementById("rectangle");
var rectangle = document.getElementById("uname").innerHTML;
var context = canvas.getContext("2d");

var table = document.getElementById("rectData");
var rows = table.rows;

canvas.width = window.innerWidth / 1.2;
canvas.height = window.innerHeight / 2;
var width = canvas.width;
var height = canvas.height;

var x = 10
var y = 10

for(var i=0; i < rows.length; i++){
    var rect_name = rows[i].getElementsByTagName("td")[1].innerHTML
    var rect_width = parseInt(rows[i].getElementsByTagName("td")[2].innerHTML)
    var rect_height = parseInt(rows[i].getElementsByTagName("td")[3].innerHTML)

    context.beginPath()
    if(rect_name == rectangle){
        console.log(rect_name)
        context.fillRect(x, y, rect_width, rect_height)
        context.fillStyle = rows[i].getElementsByTagName("td")[6].innerHTML
        context.rect(x,y,rect_width, rect_height)
        context.font = "20px Times New Roman"
        context.textAlign = "center"
        context.textBaseLine = "middle"
    }
}