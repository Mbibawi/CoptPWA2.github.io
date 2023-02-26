const calendarDay = 24 * 60 * 60 * 1000; //this is a day in milliseconds
const containerDiv = document.getElementById('TargetDiv');
const leftSideBar = document.getElementById('leftSideBar');
const rightSideBar = document.getElementById('rightSideBar');
const contentDiv = document.getElementById('content');
const sideBarBtn = document.getElementById('opensidebar');
const toggleDevBtn = document.getElementById('toggleDev');
const ResurrectionDates = ["2023-04-16", "2024-05-05", "2025-04-29", "2026-04-12", "2027-05-02", "2028-04-23", "2029-04-8", "2030-04-28"]; // these are  the dates of the Ressurection feast caclulated from the end of the Jewish Pessah Feast as got from Google
var PrayersArray = [];
var prayersLanguages = ['COP', 'FR', 'CA', 'AR'];
var ReadingsArray = [];
var PraxisArray = [];
var KatholikonArray = [];
var StPaulArray = [];
var SynaxariumArray = [];
var GospelMassArray = [];
var GospelVespersArray = [];
var GospelDawnArray = [];
var GospelNightArray = [];
var PropheciesDawnArray = [];
var ReadingsArray = [];
var readingsLanguages = ['AR', 'FR', 'EN'];
var GospelResponse;
var PsalmResponse;
const Readings = {
    BibleIntroFR: '',
    BibleIntroAR: 'قفوا بخوف أمام الله لنسمع الإنجيل المقدس، فصل من بشارة الإنجيل لمعلمنا مار ــــــــــ البشير، والتلميذ الطاهر، بركاته على جميعنا',
    GospelEndFR: '',
    GospelEndAR: '',
    GospelVespers: "ReadingsGospelIncenseVespers",
    GospelDawn: "ReadingsGospelIncenseDawn",
    GospelMass: "ReadingsGospelMass",
    GospelNight: "ReadingsGospelNight",
    Psalm: "Psalm",
    StPaul: "ReadingsStPaul",
    StPaulIntroFR: '',
    StPaulIntroAR: '',
    StPaulEndFR: '',
    StPaulEndAR: 'نعمة الله الآب فلتكن مع جميعكم يا آبائي وإخوتي آمين',
    Katholikon: "ReadingsKatholikon",
    KatholikonIntroFR: '',
    KatholikonIntroAR: '',
    KatholikonEndFR: '',
    KatholikonEndAR: 'لا تحبو العالم ولا الأشياء التي في العالم لأن العالم يمضي وشهوته معه أما من يصنع مشيئة الله فيثبت إلى الأبد',
    Praxis: "ReadingsPraxis",
    PraxisIntroFR: '',
    PraxisIntroAR: 'الإبركسيس فصل من أعمال آبائنا الرسل الأطهار، الحوارين، المشمولين بنعمة الروح القدس، بركتهم المقدسة فلتكن معكم يا آبائي واخوتي آمين',
    PraxisEndFR: '',
    PraxisEndAR: 'لم تزل كلمة الرب تنمو وتعتز وتكثر في هذا البيعة وكل بيعة يا آبائي وإخوتي آمين',
    Synaxarium: "ReadingsSynaxarium",
    SynaxariumIntroFR: '',
    SynaxariumIntroAR: '',
    SynaxariumEndFR: '',
    SynaxariumEndAR: '',
    PropheciesDawn: "ReadingsPropheciesDawn",
};
const CommonPrayers = {
    OurFather: "OurFatherWhoArtInHeaven",
    ThanksGivingPrayer: "LetUsGiveThanks",
    WeExaltYou: "WeExaltYouMother",
    HailToYou: "HailToYou",
    Creed: "Creed",
    Kireyelison: "Kireyelison",
    PieceBeWithAll: "PieceBeWithAll",
    HolyLordOfSabaoth: "HolyLordOfSabaoth",
    HolyGod: "HolyGod",
    LitanyOfPeace: 'LitanyOfPeace',
    LitanytoTheFathers: 'LitanyToTheFathers',
    LitanyOfTheAssemblies: 'LitanyOfTheAssemblies',
    BowYourHeads: "BowYourHeadsToTheLord"
};
const ReconciliationPrayers = ['MassNameReconciliationPart1', 'MassNameReconciliationPart2', 'MassNameReconciliatonPart3'];
const BaptizedMassPrayers = [CommonPrayers.LitanyOfPeace, CommonPrayers.LitanytoTheFathers, CommonPrayers.LitanyOfTheAssemblies, CommonPrayers.Creed, 'PrayerOfReconciliation', 'Anaphora', 'Agios', 'InstitutionNarrative', CommonPrayers.LitanyOfPeace, CommonPrayers.LitanytoTheFathers, 'LitanyOfEkliros', 'LitanyOfThePlace', 'LitanyOfTheSeedsAndHerbs', 'LitanyOfTheOblations', 'CommemorationOfTheSaints', 'IntroductionToTheFraction', 'FractionPrayer', CommonPrayers.OurFather, 'PriestConfession', 'DeaconConfession', 'Communinon'];
const Seasons = {
    StMaryFast: 'SaintMaryFast',
    GreatLent: 'GreatLent',
    FiftyHolyDays: 'Pentecostal',
    JonahFast: 'JonahFast',
    ApostlesFast: 'ApostlesFast',
    Resurrection: 'Resurrection',
    Nayrouz: 'Nayrouz',
    CrossFeast: 'CrossFeast',
};
//this was meant to provide a kind of intellisense for building the prayers array of a button, but it is not used
const PrayersTree = {
    //liturgies
    Liturgies: {
        Pessah: "Pessah",
        Common: "Common",
        Funeral: "Funerails",
        Wedding: "Wedding",
        Mass: "Mass",
        Tasbeha: "Tasbeha",
        IncenseOffice: 'IncenseOffice'
    },
    //sections
    Sections: {
        Common: "Common",
        Readings: "Readings",
        Prayer: "Litany",
        MassStBasil: "StBasil",
        MassStCyril: "StCyril",
        MassStGregory: "StGregory",
        MassStJean: "StJean",
        Unbaptised: 'Unbaptised',
        Baptised: 'Baptised',
    },
    //Text
    Parts: {
        Acts: "Acts",
        AgiosOsios: "AgiosOsios",
        Katholikon: "Katholikon",
        Deceased: "DeceasedPrayer",
        EpiEprosAfki: "EpiEprosAfki",
        StPaul: "StPaul",
        IriniPassi: "EriniPassi",
        ReadingsBible: "Bible",
        EvangileReponse: "ReadingsBibleResponse",
        Intorduction: "Intorduction",
        Keryalayson1: "Keryalayson1",
        keryalayson3: "keryalayson3",
        KetoEpnevmatiSo: "KetoEpnevmati",
        HolyGodofSabaoth: "HolySabaoth",
        Malades: "SickPrayer",
        NousTeLouons: "WePraiseYou",
        OurFatherInHeavens: "OurFather",
        Reconciliation: "Reconciliation",
        RendonsGrace: "RendonsGrace",
        Synaxarium: "Synaxarium",
        Introduction: "Introduction",
        Shlil: "Shlil",
        TravlersPrayer: "TravlersPrayer"
    },
    //periods
    Dates: {
        PalmSunday: 'PalmSunday',
        GreatLent: 'GreatLent',
        PessahMonday: 'PessahMonday',
        PessahTuesday: 'PessahTuesday',
        PessahWednesday: 'PessahWednesday',
        HolyThursday: 'HolyThursday',
        HolyFriday: 'HolyFriday',
        HolySaturday: 'HolySaturday',
        Asumption: 'Assumption',
        Pentecoste: 'Pentecoste',
        Nayrouz: 'Nayrouz',
        FirstWeek: '1stWeek',
        SecondWeek: '2ndWeek',
        ThirdWeek: '3rdWeek',
        FourthWeek: '4thWeek',
        FifthWeek: '5thWeek',
        PentecostalDays: 'PentecostalDays',
        Any: 'Any',
    }
};
//VARS
var todayDate;
var todayString;
var allLanguages = ['AR', 'FR', 'COP'];
var allDivs;
var copticDate, copticMonth, copticDay, copticReadingsDate, season;
