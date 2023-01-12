const btnMain = {
    text: { FR: "Retour au menu principal", AR: "العودة إلى القائمة الرئيسية", EN: "Back to the main menu" }
};
const btnGoBack = {
    text: { FR: 'Retour', AR: 'السابق', EN: "Go Back" }
};
const btnMass = {
    rootID: 'Mass',
    text: { FR: "Messes", AR: "القداسات" }
};
const btnIncenseOffice = {
    text: {
        FR: "Office des Encens Aube et Soir",
        AR: " رفع بخور باكر أو عشية"
    }
};
const btnIncenseDawn = {
    text: {
        FR: "Encens Aube",
        AR: "بخور باكر"
    },
    prayers: ['ActionDeGraceDate=0000', "PrayerCommonOurFatherWhoArtInHeavenDate=0000",
        "PrayerCommonThanksGivingPart1Date=0000",
        "PrayerCommonEprosEvEksastiDate=0000",
        "PrayerCommonThanksGivingPart3Date=0000",
        "PrayerCommonShlilAndResponseDate=0000",
        "PrayerCommonEriniPassiAndResponseDate=0000",
        "PrayerCommonLitanyForTheSickDate=0000",
        "PrayerCommonLitanyOfTravellersDate=0000",
        "PrayerCommonLitanyOfOfferingDate=0000",
        "PrayerLitanyOfTheDepartedDate=0000",
        "PrayerCommonFalNosabe7Date=0000",
        "PrayerCommonAguiosOsEosDate=0000",
        "CommonOurFatherWhoArtInHeavenDate=0000",
        "PrayerCommonWeExaltYouDate=0000",
        "PrayerDoxologiesStMaryDate=0000",
        "PrayerDoxologiesArchangeMichelDate=0000",
        "PrayerDoxologiesCelestialBeingsDate=0000",
        "EncensAubeDoxologieApostlesDate=0000",
        "EncensAubeDoxologieSaintMarcDate=0000",
        "EncensAubeDoxologieSaintGeorgeDate=0000",
        "EncensAubeDoxologieSaintMinaDate=0000",
        "EncensAubeDoxologiesEndDate=0000",
        "CommonNousExaltonsMarieDate=0000",
        "EncensAubeEfnotiNaynanDate=0000",
        "CommonEvangilePrayerDate=0000",
        "CommonEvangileIntroductionLevonsNousDate=0000",
        "CommonEvangileIntroductionBeniSoitCeluiQuiVientDate=0000",
        "CommonEvangileResponseDate=0000",
        "CommonBlockKhinBiEkhrestosIsosBinShoysDate=0000",
        "EncensBakerTa7lilDate=0000",
        "CommonAminAllelouyaDate=0000",
        "MesseCommonGloireEtHonneurDate=0000",
        "MesseCommonRoshoumatEl7amalDate=0000",
        "MesseCommonTa7lilDate=0000"]
};
const btnIncenseVespers = {
    text: {
        FR: "Encens Soir",
        AR: "بخور عشية"
    },
    //prayers: addElementsToStringArray(Prayers.EncensVepersPrayers, [Readings.BibleEvening + Readings.Psalm, Readings.BibleEvening])
};
const btnMassStCyril = {
    rootID: 'StCyril',
    parentBtn: btnMass,
    text: { FR: "Saint Cyril",
        AR: "كيرلسي" },
    prayers: BaptizedMassPrayers
};
const btnMassStGregory = {
    rootID: 'StGregory',
    text: { FR: "Saint Gregory",
        AR: "غريغوري" },
    prayers: BaptizedMassPrayers
};
const btnMassStBasil = {
    rootID: 'StBasil',
    text: { FR: "Saint Basil",
        AR: "باسيلي"
    },
    prayers: BaptizedMassPrayers
};
const btnMassStJean = {
    rootID: 'StJean',
    text: { FR: "Saint Jean",
        AR: "القديس يوحنا"
    },
    prayers: BaptizedMassPrayers
};
const btnMassOfferingOfTheLamb = {
    text: { FR: "Présentation de l'Agneau",
        AR: "تقديم الحمل" }
};
const btnMassRoshoumat = {
    rootID: 'Roshoumat',
    text: { FR: "Roshoumat El Hamal", AR: "رشومات الحمل" }
};
const btnMassUnBaptised = {
    rootID: 'UnBaptised',
    text: { FR: "Messe des non baptisés",
        AR: "قداس الموعوظين",
        EN: "Unbaptised Mass"
    },
};
const btnMassBaptised = {
    rootID: 'Baptised',
    children: [btnMassStBasil, btnMassStCyril, btnMassStGregory, btnMassStJean],
    text: { FR: "Messe des Croyans",
        AR: "قداس المؤمنين" },
    parentBtn: btnMass
};
const btnFractionPrayers = {
    text: { FR: "Fraction",
        AR: "صلوات القسمة" },
};
const btnMassReadings = {
    rootID: '',
    text: { FR: "Lectures",
        AR: "القراءات" },
    prayers: [Readings.StPaul, Readings.Katholikon, Readings.Praxis, Readings.Synaxarium, Readings.GospelMass]
};
const btnDayReadings = {
    text: { FR: "Lectures du jour",
        AR: "قراءات اليوم",
        EN: 'Day\'s Readings'
    },
    //prayers: [Readings.StPaul],
    //prayersArray:ReadingsArray,
    //languages: readingsLanguages,
};
const btnReadingsStPaul = {
    text: { FR: "Epître de Saint Paul",
        AR: "البولس",
        EN: 'Pauline Epistle'
    },
    prayers: [Readings.StPaul],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
};
const btnReadingsKatholikon = {
    text: { FR: "katholikon",
        AR: "الكاثوليكون"
    },
    prayers: [Readings.Katholikon],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnMassReadings,
};
const btnReadingsSynaxarium = {
    text: { FR: "Synaxarium",
        AR: "السنكسار"
    },
    prayers: [Readings.Synaxarium],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnMassReadings,
};
const btnReadingsPraxis = {
    text: { FR: "Praxis",
        AR: "الإبركسيس"
    },
    prayers: [Readings.Praxis],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnMassReadings,
};
const btnReadingsGospelMass = {
    text: { FR: "l'Evangile",
        AR: "إنجيل القداس"
    },
    prayers: [Readings.GospelMass + Readings.Psalm, Readings.GospelMass],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnMassReadings,
};
const btnReadingsGospelIncenseVespers = {
    text: { FR: "Evangile  Vêpres",
        AR: "إنجيل عشية"
    },
    prayers: [Readings.GospelVespers + Readings.Psalm, Readings.GospelVespers],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnIncenseVespers
};
const btnReadingsGospelIncenseDawn = {
    text: { FR: "Evangile Aube",
        AR: "إنجيل باكر"
    },
    prayers: [Readings.GospelDawn + Readings.Psalm, Readings.GospelDawn],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnIncenseDawn
};
const btnReadingsGospelNight = {
    text: { FR: "Evangile Soir",
        AR: "إنجيل المساء"
    },
    prayers: [Readings.GospelNight + Readings.Psalm, Readings.GospelNight],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnIncenseVespers
};
const btnReadingsPropheciesDawn = {
    text: { FR: "Prophecies Matin",
        AR: "نبوات باكر"
    },
    prayers: [Readings.PropheciesDawn],
    prayersArray: ReadingsArray,
    languages: readingsLanguages,
    parentBtn: btnIncenseDawn
};
const btnHeteneyat = {
    text: { FR: "Heteneyat",
        AR: "الهيتنيات" },
    parentBtn: btnMassUnBaptised
};
const btnPraxisResponse = {
    text: { FR: "Réponse Praxis",
        AR: "مرد الإبركسيس" },
    parentBtn: btnMassReadings
};
const btnMassGospelResponse = {
    text: { FR: "Réponse Evangile",
        AR: "مرد الإنجيل" },
    parentBtn: btnMassReadings
};
const btnMassReconciliation = {
    text: { FR: "Reconcilation",
        AR: "صلاة الصلح" },
    parentBtn: btnMassReadings
};
const btnMassAnaphora = {
    text: { FR: "Anaphora",
        AR: "الأنافورة" },
    parentBtn: btnMassReadings
};
const btnMassCommunion = {
    text: { FR: "Communion",
        AR: "التوزيع" },
    parentBtn: btnMassReadings
};
btnMain.children = [btnMass, btnIncenseOffice, btnDayReadings];
btnMass.children = [btnIncenseDawn, btnMassOfferingOfTheLamb, btnMassRoshoumat, btnMassUnBaptised, btnMassBaptised];
btnMassUnBaptised.children = [btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsSynaxarium, btnReadingsGospelMass];
btnIncenseVespers.children = [btnReadingsGospelIncenseVespers];
btnIncenseDawn.children = [btnReadingsGospelIncenseDawn];
const commonMassChildBtns = [btnMassReconciliation, btnMassAnaphora, btnFractionPrayers, btnMassCommunion];
btnDayReadings.children = [btnReadingsGospelIncenseVespers, btnReadingsGospelIncenseDawn, btnReadingsStPaul, btnReadingsKatholikon, btnReadingsPraxis, btnReadingsGospelMass];
//we may need to change the properties of a given button for each mass: eg. changing the paryers property of btnMassReconciliation in order to adapt it
btnMassStJean.children = commonMassChildBtns;
btnMassStBasil.children = commonMassChildBtns;
btnMassStCyril.children = commonMassChildBtns;
btnMassStGregory.children = commonMassChildBtns;
btnIncenseOffice.children = [btnIncenseDawn, btnIncenseVespers];
