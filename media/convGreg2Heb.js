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
            let reply = Http.responseText;
            let obj = JSON.parse(reply);
            let hd = obj.hd;
            let hm = obj.hm;
            let hy = obj.hy;
            let hebrew = obj.hebrew;
            finalOutput = [hd + ' ' + hm + ' ' + hy, hebrew];
            console.log(finalOutput); // This instruction acts as a timer !
        }
    };

    return finalOutput;
}