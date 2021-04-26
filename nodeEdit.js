/* Converting date from Gregorian to Hebrew
https://www.hebcal.com/converter?cfg=json&gy=2011&gm=6&gd=2&g2h=1
    gy=2011 – Gregorian year
    gm=6 – Gregorian month (1=January, 12=December)
    gd=2 – Gregorian day of month
    g2h=1 – Convert from Gregorian to Hebrew date
    gs=on – After sunset on Gregorian date
    cfg=json – output format is JSON (cfg=json) or XML (cfg=xml)

*/
function convertGreg2Heb(ymdG) {
    const Http = new XMLHttpRequest();
    let gy = ymdG.slice(0, 4);
    let gm = ymdG.slice(4, 6);
    let gd = ymdG.slice(6);
    const url = 'https://www.hebcal.com/converter?cfg=json&gy=' + gy + '&gm=' + gm + '&gd=' + gd + '&g2h=1';
    let finalOutput = [];

    Http.open('GET', url);
    Http.send();

    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for (i = 0; i < 3000; i++) {
                // Do nothing
            }
            let reply = Http.responseText;
            let obj = JSON.parse(reply);
            let hd = obj.hd;
            let hm = obj.hm;
            let hy = obj.hy;
            let hebrew = obj.hebrew;
            console.log(finalOutput); // This instruction acts as a timer !
            finalOutput = [hd + ' ' + hm + ' ' + hy, hebrew];
            console.log(finalOutput); // This instruction acts as a timer !
        }
    };

    return finalOutput;
}
/* **************************************************************************** */
// Node Edit mode : we arrive to the page with an existing node as an argument
// Form fields are pre-filled with data from familyTrees.js

function editNode(tree, currentNode) {
    // Modify page title and button
    document.getElementsByTagName('h2')[0].firstChild.nodeValue = "Edit a person's details";
    document.getElementsByTagName('button')[0].firstChild.nodeValue = 'Update';
    // Pre-fill fields from database
    inputsArray = document.getElementsByClassName('input');
    radiosArray = document.getElementsByClassName('radio');
    inputsArray[0].setAttribute('value', tree[currentNode - 1].familyName);
    inputsArray[1].setAttribute('value', tree[currentNode - 1].firstName);
    birthDate_ymd = tree[currentNode - 1].birthDate;
    birthDate_d = birthDate_ymd.slice(6);
    birthDate_m = birthDate_ymd.slice(4, 6);
    birthDate_y = birthDate_ymd.slice(0, 4);
    inputsArray[2].setAttribute('value', birthDate_y + '-' + birthDate_m + '-' + birthDate_d);
    console.log(convertGreg2Heb(birthDate_ymd));
    birthDate_heb = convertGreg2Heb(birthDate_ymd);
    inputsArray[3].setAttribute('value', birthDate_heb);
    inputsArray[4].setAttribute('value', tree[currentNode - 1].birthCity);
    inputsArray[5].setAttribute('value', tree[currentNode - 1].birthCountry);
    inputsArray[6].setAttribute('value', tree[currentNode - 1].birthContinent);
    if (tree[currentNode - 1].gender == "M") {
        radiosArray[0].checked = true;
        radiosArray[1].checked = false;
    } else {
        radiosArray[0].checked = false;
        radiosArray[1].checked = true;
    }
    inputsArray[7].value = tree[currentNode - 1].freeText;
    let dad = tree[currentNode - 1].dadIndex;
    let mom = tree[currentNode - 1].momIndex;
    let dadFullName = tree[dad - 1].firstName + ' ' + tree[dad - 1].familyName;
    let momFullName = tree[mom - 1].firstName + ' ' + tree[mom - 1].familyName;
    inputsArray[8].setAttribute('value', dadFullName);
    inputsArray[9].setAttribute('value', momFullName);
    inputsArray[8].disabled = true;
    inputsArray[9].disabled = true;
    inputsArray[8].style.backgroundColor = "lightgrey";
    inputsArray[9].style.backgroundColor = "lightgrey";
}

function createNode(tree) {
    // Modify page title and buttons
    document.getElementsByTagName('h2')[0].firstChild.nodeValue = "Create a person's profile";
    document.getElementsByTagName('button')[0].firstChild.nodeValue = 'Create';
    document.getElementsByTagName('button')[1].style.visibility = 'hidden';

    nodeIndex = tree.length;
    newNode = {
        "nodeIndex": nodeIndex,
        "status": "active",
        "familyName": "",
        "firstName": "",
        "gender": "M",
        "birthDate": "",
        "birthDate_heb": "",
        "birthCity": "",
        "birthCountry": "",
        "birthContinent": "",
        "profileImage": "default.png",
        "freeText": "",
        "dadIndex": 0,
        "momIndex": 0,
        "spouseIndex": [],
    };
    // Create parent fields data list
    var nodesList = document.createElement('datalist');
    nodesList.setAttribute('id', 'nodesList');
    for (i in tree) {
        if (tree[i].status === 'active') {
            let fullName = tree[i].firstName + ' ' + tree[i].familyName;
            var option = document.createElement('option');
            option.setAttribute('value', fullName);
            nodesList.appendChild(option);
        }
    };
    document.getElementById('father').setAttribute('list', 'nodesList');
    document.getElementById('mother').setAttribute('list', 'nodesList');
    document.getElementById('father').parentNode.appendChild(nodesList);
}

action = +prompt('Select activity. 0: Create or a number: Edit(number)');
if (action === 0) { createNode(familyTree_TESTDATA) } else { editNode(familyTree_TESTDATA, action) };