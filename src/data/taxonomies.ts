export interface TaxonomyLevel {
  level: number;
  title: string;
  description: string;
}

export const librarianLevels: TaxonomyLevel[] = [
  { level: 1, title: "Ingen inblandning", description: "Skolbiblioteket ignoreras helt i undervisningen." },
  { level: 2, title: "Självbetjäningslager", description: "Skolbiblioteket tillhandahåller material, men användarna får klara sig själva." },
  { level: 3, title: "Enklare referenssamtal", description: "Skolbibliotekarien hjälper elever och lärare att hitta specifikt material vid förfrågan." },
  { level: 4, title: "Spontan samverkan", description: "Skolbibliotekarien hjälper klasser eller grupper som dyker upp utan förvarning." },
  { level: 5, title: "Informell planering", description: "Korta möten i korridorer eller personalrum där skolbibliotekarien ger tips på material eller tillgängliggör en lånetid i skolbiblioteket." },
  { level: 6, title: "Referenssamtal", description: "Läraren ber i förväg skolbibliotekarien att plocka fram material till ett specifikt projekt." },
  { level: 7, title: "Läsfrämjande", description: "Skolbibliotekarien arbetar aktivt med t ex bokprat, bokattacker och utställningar" },
  { level: 8, title: "Formell planering i stödroll", description: "Skolbibliotekarien deltar i planering men endast som serviceperson; läraren styr helt innehållet." },
  { level: 9, title: "Pedagogisk design I", description: "Skolbibliotekarien planerar, genomför och utvärderar delar av undervisningen tillsammans med läraren." },
  { level: 10, title: "Pedagogisk design II", description: "Skolbiblioteket är kärnan i undervisningen; informationssökning är helt integrerad i ämnet." },
  { level: 11, title: "Läroplansutveckling", description: "Skolbibliotekarien deltar i att forma skolans övergripande pedagogiska innehåll och kursplaner." },
];

export const teacherLevels: TaxonomyLevel[] = [
  { level: 1, title: "Helt självständig", description: "Läraren använder endast läroböcker och eget material." },
  { level: 2, title: "Privat samling", description: "Läraren förlitar sig på egna böcker i klassrummet." },
  { level: 3, title: "Lånad samling", description: "Läraren lånar material från skolbiblioteket men sköter allt i klassrummet." },
  { level: 4, title: "Skolbibliotekarien som idégivare", description: "Läraren söker inspiration eller tips från skolbibliotekarien vid enstaka tillfällen." },
  { level: 5, title: "Skolbiblioteket som berikning", description: "Skolbiblioteket används för att ge 'det lilla extra' till ett temaområde." },
  { level: 6, title: "Skolbiblioteket som innehåll", description: "Läraren planerar tillsammans med skolbibliotekarien för att integrera medier i kursmomentet." },
  { level: 7, title: "Partnerskap", description: "Lärare och skolbibliotekarie samarbetar som jämlika partners genom hela lärprocessen." },
  { level: 8, title: "Läroplansutveckling", description: "Läraren samråder med skolbibliotekarien vid långsiktig utveckling av ämnen och kursplaner." },
];

export const principalLevels: TaxonomyLevel[] = [
  { level: 1, title: "Kunskap saknas", description: "Skolbiblioteket får inget aktivt stöd." },
  { level: 2, title: "Börjar tillägna sig kunskap", description: "Rektorn börjar förstå skolbibliotekets roll." },
  { level: 3, title: "Rekrytering", description: "Rektorn anställer en bibliotekarie." },
  { level: 4, title: "Planering och organisation", description: "Bibliotekarien inkluderas i arbetslag." },
  { level: 5, title: "Bygga struktur", description: "Organisation för tillgängligt bibliotek." },
  { level: 6, title: "Ekonomiskt ledarskap", description: "Långsiktig budget finns." },
  { level: 7, title: "Pedagogiskt ledarskap", description: "Bibliotekets arbete kopplas till resultat." },
  { level: 8, title: "SKA‑arbete", description: "Rektor följer upp och utvärderar." },
  { level: 9, title: "Fortsatt kompetensutveckling", description: "Rektor utvecklar sin kunskap kontinuerligt." },
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
    question: "Stödjer skolbiblioteket elevernas språkliga och litterära utveckling?",
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
    question: "Erbjuder skolbiblioteket ett brett utbud av kultur och litteratur?",
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
    question: "Fungerar skolbiblioteket som en demokratisk arena för alla elever?",
    criteria: [
      "Elevinflytande i bibblan", "Samtal om svåra frågor", "Yttrandefrihet & censur", "Inkludering & mångfald",
      "Delaktighet i inköp", "Skolbiblioteket som mötesplats", "Kritiskt granskande av makt", "Mänskliga rättigheter",
      "Demokratiska processer", "Trygg miljö för alla", "Representation i hyllan", "Medborgarfostran",
      "Etiska diskussioner", "Tillgång till fri info", "Globala målen i bibblan", "Elevrådssamarbete"
    ]
  },
];
