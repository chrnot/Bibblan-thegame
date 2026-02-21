export interface TaxonomyLevel {
  level: number;
  title: string;
  description: string;
}

export const librarianLevels: TaxonomyLevel[] = [
  { level: 1, title: "Ingen inblandning", description: "Biblioteket ignoreras helt i undervisningen." },
  { level: 2, title: "Självbetjäningslager", description: "Biblioteket tillhandahåller material, men användarna får klara sig själva." },
  { level: 3, title: "Enklare referenssamtal", description: "Bibliotekarien hjälper elever och lärare att hitta specifikt material vid förfrågan." },
  { level: 4, title: "Spontan samverkan", description: "Bibliotekarien hjälper klasser eller grupper som dyker upp utan förvarning." },
  { level: 5, title: "Informell planering", description: "Korta möten i korridorer eller personalrum där bibliotekarien ger tips på material eller tillgängliggör en lånetid i biblioteket." },
  { level: 6, title: "Referenssamtal", description: "Läraren ber i förväg bibliotekarien att plocka fram material till ett specifikt projekt." },
  { level: 7, title: "Läsfrämjande", description: "Bibliotekarien arbetar aktivt med t ex bokprat, bokattacker och utställningar" },
  { level: 8, title: "Formell planering i stödroll", description: "Bibliotekarien deltar i planering men endast som serviceperson; läraren styr helt innehållet." },
  { level: 9, title: "Pedagogisk design I", description: "Bibliotekarien planerar, genomför och utvärderar delar av undervisningen tillsammans med läraren." },
  { level: 10, title: "Pedagogisk design II", description: "Biblioteket är kärnan i undervisningen; informationssökning är helt integrerad i ämnet." },
  { level: 11, title: "Läroplansutveckling", description: "Bibliotekarien deltar i att forma skolans övergripande pedagogiska innehåll och kursplaner." },
];

export const teacherLevels: TaxonomyLevel[] = [
  { level: 1, title: "Helt självständig", description: "Läraren använder endast läroböcker och eget material." },
  { level: 2, title: "Privat samling", description: "Läraren förlitar sig på egna böcker i klassrummet." },
  { level: 3, title: "Lånad samling", description: "Läraren lånar material från biblioteket men sköter allt i klassrummet." },
  { level: 4, title: "Bibliotekarien som idégivare", description: "Läraren söker inspiration eller tips från bibliotekarien vid enstaka tillfällen." },
  { level: 5, title: "Biblioteket som berikning", description: "Biblioteket används för att ge 'det lilla extra' till ett temaområde." },
  { level: 6, title: "Biblioteket som innehåll", description: "Läraren planerar tillsammans med bibliotekarien för att integrera medier i kursmomentet." },
  { level: 7, title: "Partnerskap", description: "Lärare och bibliotekarie samarbetar som jämlika partners genom hela lärprocessen." },
  { level: 8, title: "Läroplansutveckling", description: "Läraren samråder med bibliotekarien vid långsiktig utveckling av ämnen och kursplaner." },
];

export const principalLevels: TaxonomyLevel[] = [
  { level: 1, title: "Ambivalent inställning", description: "Biblioteket får inget aktivt stöd p.g.a. bristande intresse eller prioriteringar." },
  { level: 2, title: "Införskaffa kunskap (Nivå 2)", description: "Rektorn börjar förstå bibliotekets roll i skolan." },
  { level: 3, title: "Införskaffa kunskap (Nivå 3)", description: "Rektorn anställer en visionär bibliotekarie." },
  { level: 4, title: "Införskaffa kunskap (Nivå 4)", description: "Rektorn inkluderar bibliotekarien i ledningsteamet." },
  { level: 5, title: "Bygga struktur", description: "Rektorn skapar en organisation där biblioteket är tillgängligt och ställer krav på användning." },
  { level: 6, title: "Utöva ledarskap (Nivå 6)", description: "Rektorn har en långsiktig ekonomisk plan för biblioteket." },
  { level: 7, title: "Utöva ledarskap (Nivå 7)", description: "Ser till att bibliotekets arbete bidrar till elevernas resultat." },
  { level: 8, title: "Utvärdera resultat", description: "Rektorn utvärderar systematiskt hur biblioteksverksamheten påverkar elevernas måluppfyllelse." },
];

export const fourPillars = [
  { 
    id: "mik", 
    title: "MIK & digital kompetens", 
    question: "Undervisas eleverna systematiskt i medie- och informationskunnighet?",
    criteria: [
      "Källkritik/källtillit i digitala miljöer", "Förståelse för algoritmer", "AI-läskunnighet", "Upphovsrätt & CC",
      "Digitalt skapande", "Värdera olika källor", "Integritet på nätet", "Reklam- & medieanalys",
      "Informationssökning", "Källkritik/källtillit av bild/video", "Förstå filterbubblor", "Hantera desinformation",
      "Digital säkerhet", "Källhänvisning", "Medieproduktion", "Kritiskt tänkande"
    ]
  },
  { 
    id: "reading", 
    title: "Läsning & språkutveckling", 
    question: "Stödjer biblioteket elevernas språkliga och litterära utveckling?",
    criteria: [
      "Läsfrämjande insatser", "Ordförrådsutveckling", "Boksamtal i grupp", "Skrivande i genrer",
      "Berättande (storytelling)", "Modersmålsstöd", "Litteratur på olika språk", "Högläsning",
      "Lässtrategier", "Multimodalitet (bild/text)", "Genremedvetenhet", "Språklig medvetenhet",
      "Lustfyllt läsande", "Skönlitteratur i ämnen", "Poesi och dramatik", "Digitalt berättande"
    ]
  },
  { 
    id: "culture", 
    title: "Litteratur & kultur", 
    question: "Erbjuder biblioteket ett brett utbud av kultur och litteratur?",
    criteria: [
      "Bokprat & bokattacker", "Aktuellt bokbestånd", "Författarbesök", "Kulturella events",
      "Skyltning & exponering", "Samarbete med kulturskola", "Film & media", "Konstutställningar",
      "Elevinflytande vid inköp", "Mångfald i utbudet", "Litteraturkanon-diskussion", "Kulturarv & samtid",
      "Skapande verksamhet", "Teater & drama", "Musik & ljud", "Globala perspektiv"
    ]
  },
  { 
    id: "democracy", 
    title: "Demokrati & värdegrund", 
    question: "Fungerar biblioteket som en demokratisk arena för alla elever?",
    criteria: [
      "Elevinflytande i bibblan", "Samtal om svåra frågor", "Yttrandefrihet & censur", "Inkludering & mångfald",
      "Delaktighet i inköp", "Biblioteket som mötesplats", "Kritiskt granskande av makt", "Mänskliga rättigheter",
      "Demokratiska processer", "Trygg miljö för alla", "Representation i hyllan", "Medborgarfostran",
      "Etiska diskussioner", "Tillgång till fri info", "Globala målen i bibblan", "Elevrådssamarbete"
    ]
  },
];
