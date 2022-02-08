var addRectMenu = document.getElementById("addMenu");
var delRectMenu = document.getElementById("delMenu");
var addBtn = document.getElementById("addBtn");
var delBtn = document.getElementById("delBtn");

 // When the user clicks the button, open the modal 
 openAddRect = () => addRectMenu.style.display = "block";
 openDelRect = () => delRectMenu.style.display = "block";

 // When the user clicks on <span> (x), close the modal
 closeAddRect = () => addRectMenu.style.display = "none";
 closeDelRect = () => delRectMenu.style.display = "none";

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
   if (event.target == addMenu) closeAddRect();
   if (event.target == delMenu) closeDelRect();
 }
