var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const copticReadingsDates = getCopticReadingsDates();
toggleDevBtn.addEventListener('click', () => openDev(toggleDevBtn));
function removeLanguage(lang) {
    //we need to start by emptying the  div ending with the language that wille be removed (eg.: if we are removing English, we empty 'TargetDivEN') because it will not be emptied by the showPrayers method
    let l = document.getElementById(containerDiv.id + lang);
    if (l) {
        l.innerHTML = "";
    }
    ;
    //then we remove the language from the array
    allLanguages.splice(allLanguages.indexOf(lang), 1);
    return allLanguages;
}
;
function removeOrAddLanguageWithButton(r) {
    let listDiv = document.getElementById('showList');
    let list, el;
    if (!r) {
        list = listDiv.appendChild(document.createElement('ul'));
        allLanguages.map(l => {
            el = document.createElement('li');
            el.innerText = 'Click to remove ' + l;
            el.addEventListener('click', () => {
                removeLanguage(l);
                listDiv.innerHTML = '';
            });
            list.appendChild(el);
        });
        el = document.createElement('li');
        el.innerText = "Don't remove any language";
        el.addEventListener('click', () => list.innerHTML = '');
        list.appendChild(el);
    }
    else if (r) {
        el = listDiv.appendChild(document.createElement('input'));
        el.addEventListener('keypress', (ev) => {
            if (ev.key === 'Enter') {
                ev.preventDefault();
                addLanguage(el.value);
                listDiv.innerHTML = '';
            }
        });
    }
    ;
}
function addLanguage(lang) {
    allLanguages.push(lang);
    return;
    //the following will not work. I will to think it out again
    for (let i = 0; i < containerDiv.children.length; i++) {
        if (containerDiv.children[i].children.length > 0) {
            //it means that there is a text shown in the the TragetDiv
            //we will retrieve the id of the first html element
            let id = containerDiv.children[i].children[0].getAttribute('id');
            id.includes('Date=0000') ? id = id.split('Date=000')[0] + 'Date=0000' : id = id.split('Date=')[0];
            showPrayerInAllLanguagesForAGivenID(id, allLanguages);
            break;
        }
    }
    ;
    return allLanguages;
}
;
setCopticDates();
function setCopticDates(today) {
    today ? todayDate = today : todayDate = new Date();
    copticDate = convertGregorianDateToCopticDate(todayDate);
    copticMonth = copticDate.slice(2, 4);
    copticDay = copticDate.slice(0, 2);
    copticReadingsDate = setCopticReadingsDate(copticDate);
    showDates();
}
;
function changeDay(next, days = 1) {
    let currentDate = todayDate.getTime();
    let input = document.getElementById('elID');
    if (input && input.value.startsWith('Date=')) {
        currentDate = new Date(input.value.slice(5)).getTime();
        todayDate.setTime(currentDate);
        input.value = "";
        console.log(todayDate);
    }
    else {
        if (next) {
            todayDate.setTime(currentDate + days * calendarDay);
        }
        else if (!next) {
            todayDate.setTime(currentDate - days * calendarDay);
        }
    }
    setCopticDates(todayDate);
    return todayDate;
}
;
function showDates() {
    let showDates = document.getElementById('showCurrentDate');
    showDates.innerText = "Current gregorian date is " + todayDate.toString() + " and the coptic date is " + copticDay + "/" + copticMonth + ". And the copticReadingsDate =" + copticReadingsDate;
}
;
function addElementsToStringArray(strArray, elements) {
    let newArray = strArray;
    for (let i = 0; i < elements.length; i++) {
        newArray.push(elements[i]);
    }
    return newArray;
}
;
let appendExractedHtml = () => {
    parseHtmlFile('htmlPrayers.html', 'hiddenPrayers');
    parseHtmlFile('htmlReadings.html', 'hiddenReadings');
};
function parseHtmlFile(htmlFileName, elID) {
    return __awaiter(this, void 0, void 0, function* () {
        let resp = yield fetch(htmlFileName);
        let el = document.getElementById(elID);
        let text = yield resp.text();
        let parser = new DOMParser;
        let doc = parser.parseFromString(text, 'text/html');
        let divs = doc.querySelectorAll('div');
        for (let i = 1; i < divs.length; i++) {
            el.appendChild(divs[i]);
        }
        ;
        console.log('divs ' + htmlFileName + ' = ', divs);
        return divs;
    });
}
;
//document.addEventListener('DOMContentLoaded', appendExractedHtml)
autoRunOnLoad();
function autoRunOnLoad() {
    showChildButtonsOrPrayers(btnMain, true);
    //appendRepeatable('Test');
    setCopticDates();
    allDivs = document.querySelectorAll('div');
    console.log('all nodes count = ', document.querySelectorAll('*').length);
    //copticReadingsDate = '0101';
    //registerServiceWorker()
    //PWA();
}
;
function appendRepeatable(elID) {
    //this is a temporary function in order to test the performance with a big number of loaded elements
    let repeat = document.getElementById(elID);
    let hidden = document.getElementById('sourcesDiv');
    let input = document.getElementById('elID');
    input.value = repeat.getAttribute('id') + "#";
    let newDiv;
    for (let i = 1; i < 1000; i++) {
        newDiv = document.createElement('DIV');
        newDiv.innerHTML = repeat.innerHTML;
        newDiv.setAttribute("id", repeat.getAttribute('id') + String(i) + "Date=" + copticReadingsDate);
        //let ids: string[] = ["AR", "TitleAR", "FR","TitleFR", "COP", "TitleCOP", "CA", "TitleCA"]
        for (let x = 0; x < newDiv.children.length; x++) {
            let child = newDiv.children[x];
            if (child.getAttribute('id').includes('Title')) {
                child.innerText = child.innerText + newDiv.getAttribute('id') + ": " + "This is the Title of the Prayer which has been selected either through the input box or the dropdown list or the clickable buttons";
            }
            else {
                let newP = document.createElement('p');
                newP.innerText = newDiv.getAttribute('id') + ": this is a test of the core text in the relevant language";
                child.insertBefore(newP, child.children[0]);
            }
            ;
            child.setAttribute('id', newDiv.getAttribute('id') + child.getAttribute('id').slice(13, child.getAttribute('id').length));
            child.classList.add('Repeatable');
        }
        hidden.appendChild(newDiv);
    }
}
;
// getting a prayer from an ID directly provided in the text input
function getPrayerFromInputBox() {
    let input = document.getElementById("elID");
    showPrayers([input.value], ReadingsArray, readingsLanguages);
}
;
function showPrayers(prayers, prayersArray, languages) {
    //we should get the date from a function that takes the date of today and matches is with the coptic date
    //let prayer = setLiturgieProps(list.selectedOptions[0].value);
    if (prayers[0] == "") {
        //getting the selected option in the list if there is no id passed to the function
        let list = document.getElementById("Menu");
        prayers.push(list.selectedOptions[0].value);
    }
    else if (prayers[0] == "getfromtextbox") {
        let input = document.getElementById('elID');
        prayers[0] = input.value;
    }
    //we empty the subdivs of the mainDiv before populating them with the new text
    //allLanguages.map(l => document.getElementById(mainDiv.id + l).innerHTML = "");
    containerDiv.innerHTML = "";
    //loop in through each id root and showing the prayer text and title:
    //prayers.map(prayer => showPrayerInAllLanguagesForAGivenID(prayer, languages));
    prayers.map(prayer => retrievePrayersFromAnArray(prayersArray, prayer, languages));
    closeSideBar();
}
;
function retrievePrayersFromAnArray(prayersArray, prayerID, languages) {
    let date;
    prayerID.includes('Date=0000') ? date = 'Date=0000' : date = "Date=" + copticReadingsDate;
    let idsArray = [], text, el, lang;
    idsArray.push(prayerID + date + 'Title', prayerID + date);
    //idsArray.map(id => retrieve(id))
    retrieve(idsArray);
    function retrieve(idsArray) {
        let firstElement, container, row;
        // container = document.createElement('div');
        //container.innerHTML = document.getElementById('TemplateTargetDiv').innerHTML;
        //container.classList.add('TargetDiv');
        for (let prayer of prayersArray) {
            //for each array in the prayersArray, we set firstElement as the text of the first element of each array
            firstElement = prayer[0];
            if (firstElement == idsArray[0] || firstElement == idsArray[1]) {
                // if we find an array wich first element equals firstElement (i.e., we find an Array = ['prayerID', 'text in Arabic', 'text in French', 'text in English']), we create a newDiv to represent the text in this subArray
                //newDiv = document.createElement('div');
                //newDiv.id = firstElement;
                //newDiv.classList.add('TargetDiv');
                //newDiv.innerHTML = template.innerHTML;
                row = document.createElement('div');
                row.classList.add('TargetRow');
                for (let x = 1; x < prayer.length; x++) {
                    lang = languages[x - 1];
                    //we check that the language is included in allLanguages, i.e. if it has not been removed by the user which means that he does not want it to be displayed. If the language is not removed, we retrieve the text in this language. otherwise we will not retrieve its text.
                    if (allLanguages.indexOf(lang) != -1) {
                        el = document.createElement('p');
                        if (firstElement.includes('Title')) {
                            el.classList.add('Title');
                        }
                        else {
                            el.classList.add('PrayerText');
                        }
                        ;
                        text = prayer[x];
                        el.classList.add(lang);
                        el.innerText = text;
                        row.appendChild(el);
                        //container.getElementsByClassName('TargetDiv' + lang)[0].appendChild(el);
                    }
                    else {
                        //el = container.getElementsByClassName('TargetDiv' + lang)[0] as HTMLElement;
                        //el.style.display = 'none';
                        console.log('The lanugage is not one of the languages set by the user: ', lang);
                    }
                    ;
                    //mainDiv.appendChild(container)
                    containerDiv.appendChild(row);
                }
                ;
            }
        }
    }
    ;
}
;
//Depricated - it was used when we were retrieving the text from hidden html elements
function showPrayerInAllLanguagesForAGivenID(prayerID, langArray) {
    let date = "Date=" + copticReadingsDate;
    if (prayerID.includes('Date=0000')) {
        //this is the case where the prayer is not linked to a specific period or event
        date = '';
    }
    ;
    //takes the ID of an htmelement, adds the word "Title" to it and one of the languages key letters (eg.: AR, FR, etc) to the ID (which gives an ID like "MesseStCyrilReconciliationTitleAR"), and retrievs the text of the html elment. Then repeats the same thing without adding the word "Title" (wich means that the ID is like "MesseStCyrilReconciliationAR") 
    let idsArray = new Array;
    if (!langArray) {
        langArray = allLanguages;
    }
    ;
    langArray.map(l => {
        idsArray.push(prayerID + date + "Title" + 'lang=' + l); // we add the id with the word "Title" and the language letters at the end of the IdsArray
        idsArray.push(prayerID + date + 'lang=' + l); // we add the id without the word but with the language letters at the end of the idsArray
    });
    console.log("idsArray=", idsArray);
    idsArray.map(id => getTextAndAppendElementToMainDiv(id));
    // getTextAndAppendElementToMainDiv(prayerID) // we think this is useless, to be checked
}
;
//Depricated - it was used when we were retrieving the text from hidden html elements
function getTextAndAppendElementToMainDiv(elID) {
    let prayer;
    //we get the last 2 or 3 letters of the element ID, those characters represent  the language letters (eg.: AR, FR, COP etc)
    let lang = elID.split('lang=')[1];
    if (elID.startsWith('creatHtml')) {
        //this is a prayer which text is retrieved not from a hidden html element but from a constant delcared in the Readings array
        prayer = document.createElement('div');
        prayer.innerText = Readings[elID.split('Date=')[0]];
    }
    else {
        prayer = getPrayerText(elID); // getting a new div having the the html innerHTML of the hidden div identified by its id = elID. If no such hidden div is found by the elID, we get 'undefined'
        if (typeof prayer === 'undefined') {
            console.log('no html element with the provided ID:  ' + elID + ' returned undefined');
            return;
        }
        else if (elID.includes('Title')) {
            //we add a class to the title part of the prayer in order to CSS it
            prayer.classList.add('Title');
        }
        else {
            //we do the same for the core text of the prayer
            prayer.classList.add('PrayerText');
        }
        ;
        //we add the language as a class to the class list
        prayer.classList.add(lang);
        //we also use the language letters (AR, FR, COP, etc.) to identifiy the element to which the "prayer" child will be appended
        if (document.getElementById(containerDiv.id + lang)) {
            prayer.setAttribute('id', elID);
            document.getElementById(containerDiv.id + lang).appendChild(prayer);
        }
        ;
    }
    ;
}
;
//Depricated - it was used when we were retrieving the text from hidden html elements
function getPrayerText(elID) {
    let id = elID.split('lang=')[0] + elID.split('lang=')[1];
    //gets the text of a given prayer by retrieving the html innerHTML of the specified html element
    if (document.getElementById(id)) {
        //creating a new div that we will append to the DOM
        let newDiv = document.createElement('div');
        //populating the newDiv innerHTML with the innerHTML of a hidden div which id = elID
        newDiv.innerHTML = document.getElementById(id).innerHTML;
        return newDiv;
    }
    else {
        console.log("No html element with the provided ID: " + id);
        return undefined;
    }
    ;
}
;
function createButtonsForEachSubPrayers(prayerRootID, parentBtn) {
    let allTitles = [];
    let title;
    let uniqueTitles = [];
    for (let i = 1; i < allDivs.length; i++) {
        if (allDivs[i].getAttribute('id') && allDivs[i].getAttribute('id').startsWith(prayerRootID) && allDivs[i].getAttribute('id').includes('Title')) {
            allTitles.push(allDivs[i].getAttribute('id'));
        }
    }
    ;
    for (let i = 1; i < allTitles.length; i++) {
        if (allTitles[i].endsWith('AR')) {
            title = allTitles[i].replace('AR', '');
        }
        else if (allTitles[i].endsWith('FR')) {
            title = allTitles[i].replace('FR', '');
        }
        ;
        if (uniqueTitles.indexOf(title) == -1) {
            uniqueTitles.push(title);
        }
    }
    document.getElementById('subBtns').innerHTML = "";
    uniqueTitles.map(t => createBtn(t));
    //creating a Button for each unique title after giving its inner text the text in arabic and French
    function createBtn(uTitle) {
        let btn = {};
        //btn.parentBtn = btnMassUnBaptised;
        btn.text = { AR: "", FR: "" };
        btn.prayers = [uTitle.replace('Title', '')];
        btn.onClick = () => { showPrayers(btn.prayers, btn.prayersArray, btn.languages); };
        //setting the text.AR value of btn from the first 'p' element of the div having and id = uTitle + "AR"
        btn.text.AR = document.getElementById(uTitle + 'AR').querySelectorAll('p')[0].innerText;
        //setting the text.FR value of btn from the first 'p' element of the div having and id = uTitle + "FR"
        btn.text.FR = document.getElementById(uTitle + 'FR').querySelectorAll('p')[0].innerText;
        showChildButtonsOrPrayers(btn, false);
    }
    //adding a goBack button at the end
    //addGoBackBtn(parentBtn)
}
;
function setCopticReadingsDate(coptDate) {
    let greatLentOrPentecostal = checkIfGreatLentOrPentecostalDays(todayDate);
    //console.log("greateLentOrPentcostal = ", greatLentOrPentecostal)
    if (greatLentOrPentecostal != '') {
        // it means we are either during the Great Lent period, or the Penstecostal 50 days, or any day/feast within these periods
        //console.log('we are within the Great  Lent period or the Pentecostal 50 days and the date returned by the function = ', greatLentOrPentecostal)
        if (greatLentOrPentecostal.includes('GreatLent')) {
            if (btnDayReadings.children.indexOf(btnReadingsPropheciesDawn) == -1 && todayDate.getDay() != 0 && todayDate.getDay() != 6) {
                //it means btnReadingsPropheciesDawn does not appear in the Day Readings buttons list (i.e., =-1), and we are neither a Saturday or a Sunday, which means that there are prophocies lectures for these days and we need to add the button in all the Day Readings Menu, and the Incense Dawn
                btnIncenseDawn.children.unshift(btnReadingsPropheciesDawn);
                btnDayReadings.children.splice(1, 0, btnReadingsPropheciesDawn);
                //btnIncenseDawn.children.unshift(btnReadingsPropheciesDawn);
                //btnDayReadings.children.unshift(btnReadingsPropheciesDawn);
            }
            else if (btnDayReadings.children.indexOf(btnReadingsPropheciesDawn) != -1 && (todayDate.getDay() == 0 || todayDate.getDay() == 6)) {
                //it means btnReadingsPropheciesDawn appears in the Day Readings buttons list, and we are either a Saturday or a Sunday, which means that there is no prophocies for these days and we need to remove the button from all the menues to which it had been added before
                btnIncenseDawn.children.splice(btnIncenseDawn.children.indexOf(btnReadingsPropheciesDawn), 1);
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnReadingsPropheciesDawn), 1);
            }
            if (btnDayReadings.children.indexOf(btnReadingsGospelNight) == -1 && todayDate.getDay() == 0) {
                // it means that we are a Sunday. We add the Gospel Night button to the Day Readings menu (we do not add it to the Unbaptized mass menu because it is not read during the mass)
                btnDayReadings.children.push(btnReadingsGospelNight);
            }
            else if (btnDayReadings.children.indexOf(btnReadingsGospelNight) != -1 && todayDate.getDay() != 0) {
                //it means we are not a Sunday, which means that if the Night Gospel button appears in the Day Readings menu, we need to remove it
                btnDayReadings.children.splice(btnDayReadings.children.indexOf(btnReadingsGospelNight), 1);
            }
        }
        ;
        return greatLentOrPentecostal;
    }
    else if (todayDate.getDay() == 0) {
        // it means we are on an ordinary  Sunday (any sunday other than Great lent and Pentecostal period Sundays)
        // console.log('We are on a sunday')
        let sunday = checkWichSundayWeAre(Number(coptDate.slice(0, 2)));
        //the readings for the 5th sunday of any coptic month (other than the 5th sunday of the Great Lent or the Pentecostal Days) are the same. We will then retrieve the readings of the 5th sunday of the first coptic month (Tout)
        sunday == "5thSunday" ? sunday = "01" + sunday : sunday = copticMonth + sunday;
        return sunday;
    }
    else {
        // it means we are in an ordinary day and we follow the ordinary readings calender, this should return a coptic date in a string of "DDMM"
        for (let i = 0; i < copticReadingsDates.length; i++) {
            if (coptDate == copticReadingsDates[i][0]) {
                return copticReadingsDates[i][1];
            }
        }
        return coptDate;
    }
}
;
function checkWichSundayWeAre(day) {
    let n = Math.ceil(day / 7);
    let sunday = n.toString();
    if (n == 1 || (n > 20 && n % 10 == 1)) {
        sunday = sunday + "stSunday";
    }
    else if (n == 2 || (n > 20 && n % 10 == 2)) {
        sunday = sunday + "ndSunday";
    }
    else if (n == 3 || (n > 20 && n % 10 == 3)) {
        sunday = sunday + "rdSunday";
    }
    else {
        sunday = sunday + 'thSunday';
    }
    return sunday;
}
;
function convertGregorianDateToCopticDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1; //we add one because the months count starts at 0
    let coptMonth, coptDay, coptDate, dm;
    if (month == 1) {
        day < 9 ? dm = [22, 4] : dm = [-8, 5];
    }
    else if (month == 2) {
        day < 7 ? dm = [23, 5] : dm = [-7, 6];
    }
    else if (month == 3) {
        day < 10 ? dm = [21, 6] : dm = [-9, 7];
        console.log("march ", day + dm[0]);
    }
    else if (month == 4) {
        day < 9 ? dm = [23, 7] : dm = [-8, 8];
    }
    else if (month == 5) {
        day < 9 ? dm = [23, 8] : dm = [-8, 9];
    }
    else if (month == 6) {
        day < 8 ? dm = [23, 9] : dm = [-7, 10];
    }
    else if (month == 7) {
        day < 8 ? dm = [23, 10] : dm = [-7, 11];
    }
    else if (month == 8) {
        day < 7 ? dm = [5, 11] : dm = [-6, 12];
    }
    else if (month == 9) {
        if (day < 6) {
            dm = [25, 12];
        }
        else if ((day > 5 && day < 11) || (day == 11 && date.getFullYear() % 4 == 3)) {
            //the 13th coptic month gets an additional 6th day every 4 years. It falls 1 year before the leap year of the Gregorian calendar. When we divide by 4, the remainder is 3
            dm = [-5, 13];
        }
        else {
            dm = [-10, 1];
        }
    }
    else if (month == 10) {
        day < 11 ? dm = [20, 1] : dm = [-10, 2];
    }
    else if (month == 11) {
        day < 11 ? dm = [21, 2] : dm = [-9, 3];
    }
    else if (month == 12) {
        day < 10 ? dm = [21, 3] : dm = [-9, 4];
    }
    ;
    setCopticDayAndMonth(dm);
    function setCopticDayAndMonth(daysMonth) {
        coptDay = day + daysMonth[0];
        coptMonth = daysMonth[1];
    }
    ;
    if (coptDay > 30) {
        console.log('copt day > 30', coptDay, coptMonth);
        coptDay = 1;
        coptMonth = coptMonth + 1;
    }
    if (date.getFullYear() % 4 == 0) {
        console.log('we are in a leap year');
        // we first check that we are in a leap year. Then we check that the day is after Feb 28th. If this is the case, we add 1 to the coptDay
        console.log('original coptic day and mont are ', coptDay, coptMonth);
        date > new Date(date.getFullYear().toString() + '-02-28') && month == 2 ?
            coptDay = coptDay - 1 : coptDay;
        if (coptDay == 0) {
            coptDay = 30;
            coptMonth = coptMonth - 1;
        }
    }
    ;
    function getTwoDigitsStringFromNumber(n) {
        if (n < 10) {
            return "0" + n.toString();
        }
        else {
            return n.toString();
        }
    }
    ;
    return getTwoDigitsStringFromNumber(coptDay) + getTwoDigitsStringFromNumber(coptMonth);
}
;
function showChildButtonsOrPrayers(btn, clear) {
    let newDiv = document.createElement('div');
    if (clear) {
        document.getElementById("subBtns").innerHTML = "";
    }
    ;
    if (btn.children) {
        //it means the button has child buttons. It does not show prayer text when clicked but shows other buttons
        btn.children.map(c => {
            if (btn != btnGoBack) {
                // for each child button that will be created, we set btn as its parent in case we need to use this property on the button  
                c.parentBtn = btn;
            }
            ;
            createBtn(c); //creating and showing a new html button element for each child  
        });
    }
    ;
    if (btn.prayers && btn.prayersArray && btn.languages) {
        showPrayers(btn.prayers, btn.prayersArray, btn.languages);
    }
    ;
    if (btn.parentBtn) {
        addGoBackButton(btn).addEventListener('click', () => showChildButtonsOrPrayers(btn.parentBtn, true));
    }
    ;
    if (btn !== btnMain) {
        createBtn(btnMain);
    }
    ;
    function createBtn(btn) {
        let newBtn = document.createElement('button');
        newBtn.classList.add('btnIcon');
        for (let lang in btn.text) {
            //for each language in btn.text, we create a new "p" element
            let btnLable = document.createElement('p');
            //we edit the p element by adding its innerText (=btn.text[lang], and its class)
            editBtnInnerText(btnLable, btn.text[lang], "btnLable" + lang);
            //we append the "p" element  to the newBtn button
            newBtn.appendChild(btnLable);
        }
        ;
        newDiv.appendChild(newBtn);
        document.getElementById("subBtns").appendChild(newDiv);
        if (btn.children || btn.prayers) {
            // if the btn object that we used to create the html button element, has childs, we add an "onclick" event that passes the btn itself to the showChildButtonsOrPrayers. This will create html button elements for each child and show them
            newBtn.addEventListener('click', () => showChildButtonsOrPrayers(btn, true));
        }
        ;
        return newBtn;
    }
    ;
    function addGoBackButton(btn) {
        btnGoBack.children = []; //we are emptying any childs of the btnGoBack button
        btnGoBack.children[0] = btn; // we are adding btn as a child to the btnGoBack;
        return createBtn(btnGoBack); // we are creating a new html button element from btnGoBack. Since btnGoBack has as a sole child btn, when clicking on it, it will trigger the showButtons function (see the if(btn.childs) above. When triggered, the showButtons will show btn as a button);
    }
    ;
    function editBtnInnerText(el, text, btnClass) {
        el.innerText = text;
        el.classList.add('btnText');
        if (btnClass) {
            el.classList.add(btnClass);
        }
    }
}
;
function checkIfGreatLentOrPentecostalDays(today) {
    let readingsDate = '';
    ResurrectionDates.map(d => {
        //we convert each string in the ResurrectionDates array into a date
        let resurrection = new Date(d);
        //console.log("resurrection date = ", resurrection, " and TodayDate gives = ", todayDate )
        if (today.getFullYear() == resurrection.getFullYear()) {
            //if the year of any  resurrection date in the array = current calendar year, then we take this resurrection date and process it to get the floating/changing events dates
            let todayUTC = new Date(today).setUTCHours(0, 0, 0, 0);
            resurrection.setUTCHours(0, 0, 0, 0);
            readingsDate = checkForUnfixedEvent(todayUTC, resurrection.getTime(), today.getDay());
        }
        return readingsDate;
    });
    return readingsDate;
}
;
function checkForUnfixedEvent(today, resDate, weekDay) {
    let diffrence = (resDate - today) / calendarDay;
    // console.log("The diffrence = ", diffrence, " and the dates are: Ressurection = ", new Date(resDate), " and Today = ", new Date(today), 'and today weekday =', new Date(today).getDay())
    //console.log('weekday = ', weekDay)
    if (diffrence == 0 || (diffrence == 1 && todayDate.getHours() > 15)) {
        //If we are Saturday (which means that diffrence = 1) and we are after 3 PM, we will retrieve the readings of the Resurrection because we use to celebrate the Resurrection Mass on Saturday evening not on Sunday itself
        return "Resurrection"; //we get the reading of Resurrection although we are still Saturday
    }
    else if (diffrence >= 1 && diffrence < 58) {
        //We are during the Great Lent period which counts 56 days from the Saturday preceding the 1st Sunday (which is the begining of the so called "preparation week") until the Resurrection day
        return isItSundayOrWeekDay('GreatLent', (58 - diffrence), weekDay);
    }
    else if (diffrence > 57 && diffrence < 63) {
        //We should be during the Jonah Feast 
        //We need to check the accuracy of the numbers (58 and 63)
        //The Jonay feast starts 15 days before the beginig of the Great Lent
        //I didn't find the readings for this period
        return ''; //we will set it later
    }
    else if (diffrence < 0 && Math.abs(diffrence) < 50) {
        // we are during the 50 Pentecostal days
        console.log("We are in the Pentecostal period and the diffrence = ", diffrence);
        return isItSundayOrWeekDay('Pentecostal', Math.abs(diffrence), weekDay);
    }
    else if (diffrence < 0 && Math.abs(diffrence) > 50) {
        if (Number(copticMonth) < 11 || (Number(copticMonth) == 11 && Number(copticDay) < 5)) {
            console.log('diffrece = apostles');
            // We are during the Apostles lent.
            //I didn't find specific readings for this period. I assume there are no specific reading and we follow the ordinary readings. This needs however to be checked that's why I kept this "else if" case 
            return "";
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
}
;
function isItSundayOrWeekDay(period, days, weekDay) {
    // let weekday: string = todayDate.toLocaleDateString('en-GB', { weekday: 'long' });
    //this returns the day of the week in English, eg.: Monday, Tuesday, etc.
    if (weekDay == 0) {
        //we are a Sunday
        return period + checkWichSundayWeAre(days);
    }
    else {
        // we are not a sunday
        return period + days.toString();
    }
}
;
function PWA() {
    // Initialize deferredPrompt for use later to show browser install prompt.
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI notify the user they can install the PWA
        showInstallPromotion();
        // Optionally, send analytics event that PWA install promo was shown.
        console.log(`'beforeinstallprompt' event was fired.`);
    });
    function showInstallPromotion() {
        let buttonInstall = document.getElementById('InstallPWA');
        buttonInstall.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            // Hide the app provided install promotion
            //hideInstallPromotion();
            // Show the install prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            const { outcome } = yield deferredPrompt.userChoice;
            // Optionally, send analytics event with outcome of user choice
            console.log(`User response to the install prompt: ${outcome}`);
            // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        }));
        window.addEventListener('appinstalled', () => {
            // Hide the app-provided install promotion
            //hideInstallPromotion();
            // Clear the deferredPrompt so it can be garbage collected
            deferredPrompt = null;
            // Optionally, send analytics event to indicate successful install
            console.log('PWA was installed');
        });
    }
    function getPWADisplayMode() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (document.referrer.startsWith('android-app://')) {
            return 'twa';
            //@ts-ignore
        }
        else if (navigator.standalone || isStandalone) {
            return 'standalone';
        }
        return 'browser';
    }
}
;
function registerServiceWorker() {
    const registerServiceWorker = () => __awaiter(this, void 0, void 0, function* () {
        if ("serviceWorker" in navigator) {
            try {
                const registration = yield navigator.serviceWorker.register("/sw.js", {
                    scope: "/",
                });
                if (registration.installing) {
                    console.log("Service worker installing");
                }
                else if (registration.waiting) {
                    console.log("Service worker installed");
                }
                else if (registration.active) {
                    console.log("Service worker active");
                }
            }
            catch (error) {
                console.error(`Registration failed with ${error}`);
            }
        }
    });
}
;
function getCopticReadingsDates() {
    return [["1903", "1307"], ["1301", "1703"], ["1101", "2708"], ["0901", "2803"], ["0501", "3005"], ["1001", "3005"], ["1508", "0105"], ["1907", "0105"], ["2005", "0105"], ["2209", "0105"], ["2510", "0105"], ["2908", "0105"], ["0110", "0105"], ["0309", "0105"], ["0611", "0105"], ["1501", "0105"], ["2401", "0105"], ["2602", "0105"], ["1612", "0109"], ["2105", "0109"], ["2110", "0109"], ["0304", "0109"], ["2504", "0206"], ["0704", "0206"], ["0711", "0206"], ["2002", "0206"], ["3006", "0210"], ["1208", "0311"], ["1303", "0311"], ["1812", "0311"], ["2207", "0311"], ["2810", "0311"], ["3003", "0311"], ["3009", "0311"], ["0103", "0311"], ["0202", "0311"], ["0205", "0311"], ["0308", "0311"], ["0701", "0311"], ["0706", "0311"], ["0709", "0311"], ["0805", "0311"], ["1102", "0311"], ["1702", "0311"], ["1409", "0312"], ["1511", "0312"], ["1704", "0312"], ["2109", "0312"], ["2410", "0312"], ["2909", "0312"], ["0209", "0312"], ["0906", "0312"], ["1401", "0312"], ["1310", "0313"], ["1608", "0405"], ["1609", "0405"], ["1611", "0405"], ["2404", "0405"], ["2906", "0405"], ["1708", "0511"], ["1803", "0511"], ["1811", "0511"], ["2104", "0511"], ["2106", "0511"], ["2911", "0511"], ["0404", "0511"], ["0807", "0511"], ["1006", "0511"], ["0604", "0605"], ["0806", "0605"], ["1505", "0801"], ["2004", "0801"], ["2010", "0801"], ["2212", "0801"], ["2307", "0801"], ["2606", "0801"], ["2610", "0801"], ["2611", "0801"], ["0401", "0801"], ["0412", "0801"], ["0504", "0801"], ["0508", "0801"], ["0509", "0801"], ["0601", "0801"], ["0708", "0801"], ["0910", "0801"], ["2102", "0801"], ["2501", "0801"], ["0106", "0903"], ["0303", "0903"], ["0407", "0903"], ["1201", "0903"], ["0812", "1009"], ["1509", "1202"], ["1210", "1203"], ["2111", "1307"], ["0402", "1307"], ["0403", "1307"], ["0804", "1307"], ["1002", "1307"], ["2107", "1312"], ["2507", "1402"], ["1211", "1503"], ["1510", "1503"], ["2411", "1503"], ["2805", "1503"], ["0112", "1503"], ["0410", "1503"], ["0411", "1503"], ["0606", "1503"], ["0912", "1503"], ["2807", "1601"], ["0909", "1608"], ["1104", "1610"], ["1506", "1610"], ["1603", "1610"], ["1705", "1610"], ["0204", "1610"], ["1007", "1701"], ["1212", "1701"], ["1209", "1703"], ["1406", "1703"], ["1412", "1703"], ["1504", "1703"], ["1806", "1703"], ["2103", "1703"], ["2706", "1703"], ["2809", "1703"], ["0104", "1703"], ["0302", "1703"], ["0502", "1703"], ["0603", "1703"], ["0705", "1703"], ["0902", "1703"], ["3001", "1705"], ["1008", "2009"], ["1206", "2009"], ["1405", "2009"], ["1906", "2009"], ["2505", "2009"], ["2910", "2009"], ["0108", "2009"], ["0306", "2009"], ["0702", "2009"], ["0703", "2009"], ["0907", "2009"], ["1204", "2009"], ["1302", "2009"], ["2502", "2009"], ["1807", "2011"], ["2008", "2011"], ["2408", "2011"], ["2506", "2011"], ["2608", "2011"], ["2806", "2011"], ["0208", "2011"], ["0610", "2011"], ["1502", "2011"], ["1902", "2011"], ["1107", "2101"], ["1407", "2101"], ["2301", "2101"], ["1804", "2202"], ["0406", "2202"], ["1010", "2203"], ["1308", "2203"], ["1905", "2203"], ["1911", "2203"], ["2012", "2203"], ["2210", "2203"], ["2603", "2203"], ["3011", "2203"], ["0107", "2203"], ["0408", "2203"], ["0707", "2203"], ["2701", "2203"], ["2801", "2203"], ["3007", "2204"], ["1309", "2205"], ["1710", "2205"], ["1909", "2205"], ["2310", "2205"], ["0510", "2205"], ["0904", "2205"], ["0908", "2205"], ["2402", "2205"], ["1910", "2308"], ["2312", "2308"], ["2711", "2308"], ["2712", "2308"], ["0609", "2308"], ["0710", "2308"], ["0809", "2308"], ["0703", "2308"], ["0810", "2409"], ["2509", "2503"], ["2511", "2503"], ["2808", "2503"], ["0505", "2503"], ["0802", "2503"], ["2802", "2503"], ["1103", "2601"], ["1304", "2601"], ["1606", "2601"], ["0712", "2601"], ["0512", "2605"], ["1411", "2702"], ["1809", "2702"], ["1912", "2702"], ["2707", "2702"], ["0506", "2702"], ["0811", "2702"], ["0905", "2702"], ["1604", "2703"], ["2311", "2703"], ["0503", "2703"], ["0607", "2703"], ["1012", "2703"], ["2902", "2703"], ["1110", "2708"], ["1306", "2708"], ["1404", "2708"], ["1605", "2708"], ["1706", "2708"], ["1808", "2708"], ["2211", "2708"], ["2306", "2708"], ["2705", "2708"], ["1111", "2708"], ["2201", "2708"], ["1101", "2708"], ["2201", "2708"], ["1004", "2803"], ["1109", "2803"], ["1311", "2803"], ["1403", "2803"], ["1410", "2803"], ["1707", "2803"], ["1709", "2803"], ["1805", "2803"], ["1904", "2803"], ["1908", "2803"], ["2206", "2803"], ["2303", "2803"], ["2305", "2803"], ["2406", "2803"], ["2412", "2803"], ["2704", "2803"], ["2709", "2803"], ["0207", "2803"], ["0310", "2803"], ["0507", "2803"], ["0513", "2803"], ["1011", "2803"], ["1112", "2803"], ["2302", "2803"], ["1106", "2903"], ["1207", "2903"], ["1408", "2903"], ["1607", "2903"], ["2006", "2903"], ["2007", "2903"], ["2208", "2903"], ["2407", "2903"], ["0203", "2903"], ["0307", "2903"], ["0409", "2903"], ["1602", "2903"], ["1802", "2903"], ["1810", "2905"], ["1003", "3005"], ["1108", "3005"], ["1507", "3005"], ["1512", "3005"], ["1711", "3005"], ["2121", "3005"], ["2405", "3005"], ["2508", "3005"], ["2604", "3005"], ["2607", "3005"], ["2811", "3005"], ["2905", "3005"], ["0102", "3005"], ["0212", "3005"], ["0602", "3005"], ["0608", "3005"], ["0612", "3005"], ["0808", "3005"], ["2001", "3005"], ["2901", "3005"], ["0211", "3008"], ["2003", "3008"], ["2309", "3008"], ["2710", "3008"], ["0111", "3008"], ["0911", "3008"], ["3002", "3008"], ["0301", "0311"]];
}
;
function toggleSideBar(btn) {
    let sideBar = document.getElementById('sideBar');
    if (sideBar.style.width == '0px') {
        openSideBar();
    }
    else {
        closeSideBar();
    }
}
function openDev(btn) {
    let dev = document.getElementById('Dev');
    dev.style.display = "block";
    btn.removeEventListener('click', () => openDev(btn));
    btn.addEventListener('click', () => closeDev(btn));
}
;
function closeDev(btn) {
    let dev = document.getElementById('Dev');
    dev.style.display = "none";
    btn.removeEventListener('click', () => closeDev(btn));
    btn.addEventListener('click', () => openDev(btn));
}
function openSideBar() {
    let btnText = String.fromCharCode(9776) + 'Close Sidebar';
    let width = "190px";
    sideBar.style.width = width;
    contentDiv.style.marginLeft = width;
    sideBarBtn.innerText = btnText;
    sideBarBtn.removeEventListener('click', openSideBar);
    sideBarBtn.addEventListener('click', closeSideBar);
    //setCopticDates()
}
;
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeSideBar() {
    let btnText = String.fromCharCode(9776) + 'Open Sidebar';
    let width = "0px";
    sideBar.style.width = width;
    contentDiv.style.marginLeft = width;
    sideBarBtn.innerText = btnText;
    sideBarBtn.removeEventListener('click', closeSideBar);
    sideBarBtn.addEventListener('click', openSideBar);
}
