class Button {
    constructor(label, rootID, parentBtn, children, prayers, prayersArray, languages, onClick, value, cssClass, inlineBtns) {
        this._label = { FR: '', AR: '', EN: '' };
        this._label = label;
        this._rootID = rootID;
        this._parentBtn = parentBtn;
        this._children = children;
        this._prayers = prayers;
        this._prayersArray = prayersArray;
        this._languages = languages;
        this._onClick = onClick;
        this._value = value;
        this._cssClass = cssClass;
        this._inlineBtns = inlineBtns;
        if (!this._cssClass) {
            this._cssClass = 'sideBarBtn';
        }
    }
    ;
    get children() { return this._children; }
    ;
    get prayers() { return this._prayers; }
    ;
    get prayersArray() { return this._prayersArray; }
    ;
    get languages() { return this._languages; }
    ;
    get label() { return this._label; }
    ;
    get parentBtn() { return this._parentBtn; }
    ;
    get rootID() { return this._rootID; }
    ;
    get onClick() { return this._onClick; }
    ;
    get value() { return this._value; }
    ;
    get cssClass() { return this._cssClass; }
    ;
    get inlineBtns() { return this._inlineBtns; }
    ;
    set label(lbl) { this._label = lbl; }
    ;
    set parentBtn(parentBtn) { this._parentBtn = parentBtn; }
    ;
    set prayers(btnPrayers) { this._prayers = btnPrayers; }
    ;
    set onClick(fun) { this._onClick = fun; }
    ;
    set children(children) { this._children = children; }
    ;
    set cssClass(cssClass) { this._cssClass = cssClass; }
    ;
    set inlineBtns(btns) { this._inlineBtns = btns; }
}
;
class inlineButton extends Button {
    constructor(label, rootID, parentBtn, children, prayers, prayersArray, languages, onClick, value, cssClass, inlineBtns) {
        super(label, rootID, parentBtn, children, prayers, prayersArray, languages, onClick, value, cssClass, inlineBtns);
        if (!this.cssClass) {
            this.cssClass = 'inlineButton';
        }
        ;
    }
    ;
}
;
const btnMain = new Button({ AR: "العودة إلى القائمة الرئيسية", FR: "Retour au menu principal", EN: "Back to the main menu" });
const btnGoBack = new Button({ AR: "السابق", FR: "Retour", EN: "Go Back" });
const btnMass = new Button({ AR: "القداسات", FR: "Messes" });
const btnIncenseOffice = new Button({
    AR: "رفع بخور باكر أو عشية",
    FR: "Office des Encens Aube et Soir"
});
const btnIncenseDawn = new Button({
    AR: 'بخور باكر',
    FR: 'Encens Aube'
}, undefined, undefined, undefined, IncenseDawnPrayers, PrayersArray, prayersLanguages);
const btnIncenseVespers = new Button({
    AR: "بخور عشية",
    FR: 'Incense Vespers'
}, undefined, undefined, undefined, IncenseVespersPrayers, PrayersArray, prayersLanguages);
const btnMassStCyril = new Button({ AR: "كيرلسي", FR: "Encens Soir" }, 'StCyril', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StCyril'));
const btnMassStGregory = new Button({ AR: "غريغوري", FR: "Saint Gregory" }, 'StGregory', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StGregory'));
const btnMassStBasil = new Button({ AR: 'باسيلي', FR: 'Saint Basil' }, 'StBasil', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StBasil'));
const btnMassStJean = new Button({ AR: 'القديس يوحنا', FR: 'Saint Jean' }, 'StJean', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StJean'));
const btnGoToStGregoryReconciliation = new inlineButton({ AR: 'صلاة الصلح الغريغوري', FR: 'Reconciliation Saint Gregory' }, 'StGregory', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StGregory'));
const btnGoToStBasilReconciliation = new inlineButton({ AR: 'صلاة الصلح الباسيلي', FR: 'Reconciliation Saint Basil' }, 'StBasil', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StBasil'));
const btnGoToStCyrilReconciliation = new inlineButton({ AR: 'صلاة الصلح الكيرلسي', FR: 'Reconciliation Saint Cyril' }, 'StCyril', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StCyril'));
const btnGoToStJeanReconciliation = new inlineButton({ AR: 'صلاة الصلح للقديس يوحنا', FR: 'Reconciliation Saint Jean' }, 'StJohn', btnMass, undefined, buildButtonPrayers([ReconciliationPrayers], 'MassName', 'StJohn'));
const btnMassOfferingOfTheLamb = new Button({ AR: 'تقديم الحمل', FR: "Présentation de l'Agneau" });
const btnMassRoshoumat = new Button({ AR: 'رشومات الحمل', FR: "Roshoumat El Hamal" });
const btnMassUnBaptised = new Button({ AR: 'قداس الموعوظين', FR: 'Messe des non baptisés', EN: 'Unbaptised Mass' });
const btnMassBaptised = new Button({
    AR: 'قداس المؤمنين',
    FR: 'Messe des Croyants',
    EN: 'Baptized Mass'
}, undefined, btnMass, [btnMassStBasil, btnMassStCyril, btnMassStGregory, btnMassStJean]);
const btnFractionPrayers = new Button({ AR: 'صلوات القسمة', FR: 'Fraction' });
const btnMassReadings = new Button({
    AR: 'القراءات',
    FR: 'Lectures'
}, undefined, undefined, undefined, [Readings.StPaul, Readings.Katholikon, Readings.Praxis, Readings.Synaxarium, Readings.GospelMass]);
const btnDayReadings = new Button({ AR: "قراءات اليوم", FR: "Lectures du jour", EN: 'Day\'s Readings' });
const btnReadingsStPaul = new Button({
    AR: 'البولس',
    FR: 'Epître de Saint Paul',
    EN: 'Pauline Epistle'
}, undefined, undefined, undefined, [Readings.StPaul], StPaulArray, readingsLanguages);
const btnReadingsKatholikon = new Button({
    AR: 'الكاثوليكون',
    FR: 'Katholikon'
}, undefined, undefined, undefined, [Readings.Katholikon], KatholikonArray, readingsLanguages);
const btnReadingsPraxis = new Button({
    AR: 'الإبركسيس',
    FR: 'Praxis'
}, undefined, undefined, undefined, [Readings.Praxis], PraxisArray, readingsLanguages);
const btnReadingsSynaxarium = new Button({
    AR: 'السنكسار',
    FR: 'Synaxarium'
}, undefined, undefined, undefined, [Readings.Synaxarium], SynaxariumArray, readingsLanguages);
const btnReadingsGospelMass = new Button({
    AR: 'إنجيل القداس',
    FR: 'l\'Evangile',
    EN: 'Gospel'
}, undefined, undefined, undefined, ['PrayerPsalmResponse' + PsalmResponse, Readings.GospelMass + Readings.Psalm, Readings.GospelMass, 'PrayerGospelResponse' + GospelResponse], GospelMassArray, readingsLanguages);
const btnReadingsGospelIncenseVespers = new Button({
    AR: 'إنجيل عشية',
    FR: 'Evangile  Vêpres',
    EN: 'Vespers Gospel'
}, undefined, undefined, undefined, ['PrayerPsalmResponse' + PsalmResponse, Readings.GospelVespers + Readings.Psalm, Readings.GospelVespers, 'PrayerGospelResponse' + GospelResponse], GospelVespersArray, readingsLanguages);
const btnReadingsGospelIncenseDawn = new Button({
    AR: 'إنجيل باكر',
    FR: 'Evangile Aube',
    EN: 'Gospel Dawn'
}, undefined, undefined, undefined, [Readings.GospelDawn + Readings.Psalm, Readings.GospelDawn], GospelDawnArray, readingsLanguages);
const btnReadingsGospelNight = new Button({
    AR: 'إنجيل المساء',
    FR: 'Evangile Soir',
    EN: 'Vespers Gospel'
}, undefined, btnIncenseVespers, undefined, [Readings.GospelNight + Readings.Psalm, Readings.GospelNight], GospelNightArray, readingsLanguages);
const btnReadingsPropheciesDawn = new Button({
    AR: "نبوات باكر",
    FR: 'Propheties Matin'
}, undefined, btnIncenseDawn, undefined, [Readings.PropheciesDawn], PropheciesDawnArray, readingsLanguages);
const btnHeteneyat = new Button({ AR: 'الهيتنيات', FR: 'Heteneyat' });
const btnPraxisResponse = new Button({ AR: 'مرد الإبركسيس', FR: 'Réponse Praxis' });
const btnMassGospelResponse = new Button({ AR: 'مرد الإنجيل', FR: 'Réponse Evangile' });
const btnMassReconciliation = new Button({
    AR: 'صلاة الصلح',
    FR: 'Reconcilation'
});
const btnMassAnaphora = new Button({ AR: 'الأنافورة', FR: 'Anaphora' });
const btnMassCommunion = new Button({ AR: 'التوزيع', FR: 'Communion' });
btnMain.children = [btnMass, btnIncenseOffice, btnDayReadings];
btnMass.children = [btnIncenseDawn, btnMassOfferingOfTheLamb, btnMassRoshoumat, btnMassUnBaptised, btnMassBaptised];
btnMassUnBaptised.children = [btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsSynaxarium, btnReadingsGospelMass];
btnIncenseVespers.children = [btnReadingsGospelIncenseVespers];
btnIncenseDawn.children = [btnReadingsGospelIncenseDawn];
const commonMassChildBtns = [btnMassReconciliation, btnMassAnaphora, btnFractionPrayers, btnMassCommunion];
//btnMassReconciliation.children = [btnMassStCyrilReconciliation, btnMassStGregoryReconciliation, btnMassStCyrilReconciliation, btnMassStJeanReconciliation]
btnDayReadings.children = [btnReadingsGospelIncenseVespers, btnReadingsGospelIncenseDawn, btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsGospelMass];
//we may need to change the properties of a given button for each mass: eg. changing the paryers property of btnMassReconciliation in order to adapt it
btnMassStJean.children = commonMassChildBtns;
btnMassStBasil.children = commonMassChildBtns;
btnMassStBasil.inlineBtns = [btnGoToStGregoryReconciliation, btnGoToStCyrilReconciliation, btnGoToStJeanReconciliation];
btnMassStCyril.children = commonMassChildBtns;
btnMassStCyril.inlineBtns = [btnGoToStGregoryReconciliation, btnGoToStBasilReconciliation, btnGoToStJeanReconciliation];
btnMassStGregory.children = commonMassChildBtns;
btnIncenseOffice.children = [btnIncenseDawn, btnIncenseVespers];
function buildButtonPrayers(prayersArrays, replaceWhat, replaceWith) {
    let newArray = [];
    prayersArrays.map((prayersArray) => newArray = [...replacePrayerIDVariable(prayersArray, replaceWhat, replaceWith)]);
    return newArray;
    function replacePrayerIDVariable(prayersArray, replaceWhat, replaceWith) {
        let newArray = [...prayersArray];
        newArray.map(p => p.replace(replaceWhat, replaceWith));
        return newArray;
    }
}
;
