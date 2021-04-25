/* Converting date from Gregorian to Hebrew
https://www.hebcal.com/converter?cfg=json&gy=2011&gm=6&gd=2&g2h=1

    gy=2011 – Gregorian year
    gm=6 – Gregorian month (1=January, 12=December)
    gd=2 – Gregorian day of month
    g2h=1 – Convert from Gregorian to Hebrew date
    gs=on – After sunset on Gregorian date
    cfg=json – output format is JSON (cfg=json) or XML (cfg=xml)

*/

// Call URL
function state_Change(xmlhttp) {
    if (xmlhttp.readyState == 4) { // 4 = "loaded"
        if (xmlhttp.status == 200) { // 200 = OK
            //xmlhttp.data and shtuff
            // ...our code here...
        } else {
            alert("Problem retrieving data");
        }
    }
}

// function loadXMLDoc(url) {
//     let xmlhttp = null;
//     if (window.XMLHttpRequest) { // code for all new browsers
//         xmlhttp = new XMLHttpRequest();
//     } else if (window.ActiveXObject) { // code for IE5 and IE6
//         xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     if (xmlhttp != null) {
//         xmlhttp.onreadystatechange = state_Change(xmlhttp);
//         xmlhttp.open("GET", url, true);
//         xmlhttp.send(null);
//         console.log(information);
//         // obj = JSON.parse(xmlhttp.response);
//         return (obj);
//     } else {
//         alert("Your browser does not support XMLHTTP.");
//     }
//     return xmlhttp;
// }
async function loadXMLDoc(url) {
    let myPromise = new Promise(function(myResolve, myReject) {
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', url, true);
        xmlhttp.onload = function() {
            if (xmlhttp.status == 200) { myResolve(xmlhttp.response); } else { myResolve("File not Found"); }
        };
        xmlhttp.send('null');
    });
    output = await myPromise;
    return output;
}

function convertGreg2Heb(gDate) {
    let gy = gDate.slice(0, 4);
    let gm = gDate.slice(4, 6);
    let gd = gDate.slice(6);
    let url = 'https://www.hebcal.com/converter?cfg=json&gy=' + gy + '&gm=' + gm + '&gd=' + gd + '&g2h=1';
    replyXML = loadXMLDoc(url);
    console.log(replyXML);
    // let replyObj = undefined;
    // console.log(typeof replyObj);
    // while (typeof replyObj === undefined) {
    //     replyObj = replyXML.response;
    // }
    // return replyObj;
}
// reply = convertGreg2Heb("19701210")
// **************************************************************************************
// Node Edit mode : we arrive to the page with an existing node as an argument
// Form fields are pre-filled with data from familyTrees.js
currentNode = 2; // hard coded here but will come from calling page
function editNode(currentNode) {
    inputsArray = document.getElementsByClassName('input');
    radiosArray = document.getElementsByClassName('radio');
    inputsArray[0].setAttribute('value', familyTree_TESTDATA[currentNode - 1].familyName);
    inputsArray[1].setAttribute('value', familyTree_TESTDATA[currentNode - 1].firstName);
    birthDate_ymd = familyTree_TESTDATA[currentNode - 1].birthDate;
    birthDate_d = birthDate_ymd.slice(6);
    birthDate_m = birthDate_ymd.slice(4, 6);
    birthDate_y = birthDate_ymd.slice(0, 4);
    inputsArray[2].setAttribute('value', birthDate_y + '-' + birthDate_m + '-' + birthDate_d);
    inputsArray[4].setAttribute('value', familyTree_TESTDATA[currentNode - 1].birthCity);
    inputsArray[5].setAttribute('value', familyTree_TESTDATA[currentNode - 1].birthCountry);
    inputsArray[6].setAttribute('value', familyTree_TESTDATA[currentNode - 1].birthContinent);
    if (familyTree_TESTDATA[currentNode - 1].gender == "M") {
        radiosArray[0].checked = true;
        radiosArray[1].checked = false;
    } else {
        radiosArray[0].checked = false;
        radiosArray[1].checked = true;
    }
    inputsArray[7].value = familyTree_TESTDATA[currentNode - 1].freeText;
    document.getElementsByTagName('h2')[0].firstChild.nodeValue = "Edit a person's details";
    document.getElementsByTagName('button')[0].firstChild.nodeValue = 'Update &nbsp &#10095';
}

function createNode() {
    nodeIndex = familyTree_TESTDATA.length;
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
    }
    document.getElementsByTagName('h2')[0].firstChild.nodeValue = "Create a person's profile";
    var txt = 'Create';
    document.getElementsByTagName('button')[0].firstChild.nodeValue = txt;
}

action = +prompt('Select activity. 0: create or number: edit(number)');
if (action === 0) { createNode() } else { editNode(action) };