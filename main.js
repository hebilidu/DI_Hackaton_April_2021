localStorage["currenttree"] = "familyTree_TESTDATA";
localStorage["currentnode"] = 1;

var displaytree = document.getElementById("displaytree");
displaytree.addEventListener("click", function() {
    localStorage["action"] = "displaytree";
    window.open('displayTree.html', '_blank');
})
var displaymap = document.getElementById("displaymap");
displaymap.addEventListener("click", function() {
    localStorage["action"] = "displaymap";
    window.open('geoloc.html', '_blank');
})
var editnode = document.getElementById("editnode");
editnode.addEventListener("click", function() {
    localStorage["action"] = "editnode";
    window.open('nodeEdit.html', '_blank');
})
var createnode = document.getElementById("createnode");
addnode.addEventListener("click", function() {
    localStorage["action"] = "addnode";
    window.open('nodeEdit.html', '_blank');
})
var createtree = document.getElementById("createtree");
createtree.addEventListener("click", function() {
    localStorage["action"] = "createtree";
    alert('Sorry, this functionality is not available yet');
})