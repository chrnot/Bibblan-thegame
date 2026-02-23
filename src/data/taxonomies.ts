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
  { level: 9, title: "Pedagogisk innovation", description: "Läraren driver pedagogisk utveckling där skolbiblioteket är en central motor." },
  { level: 10, title: "Systemiskt partnerskap", description: "Samarbetet är helt integrerat i skolans alla processer och strukturer." },
  { level: 11, title: "Skolutvecklingsledare", description: "Läraren och skolbibliotekarien leder tillsammans skolans digitala och språkliga utveckling." },
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
  { level: 10, title: "Strategisk visionsledare", description: "Rektorn sätter skolbiblioteket i centrum för skolans vision och framtid." },
  { level: 11, title: "Systemisk transformator", description: "Rektorn har skapat en skolkultur där skolbiblioteket är en självklar del av allas framgång." },
];

export const fourPillars = [
  { 
    id: "mik", 
    title: "MIK & digital kompetens", 
    question: "Undervisas eleverna systematiskt i medie- och informationskunnighet?",
    criteria: [
      "Bibliotekskunskap: söka i katalog, ämnesord & hyllsystem",
      "Källkritik & källtillit i olika medieformat",
      "Nätetik & integritet (självbetjäning, säker delning)",
      "Informationssökning i stadens databaser",
      "Referenshantering & källhänvisning (t.ex. inför gymnasiearbete)",
      "Upphovsrätt & Creative Commons",
      "Faktagranskning av nyheter & källor",
      "AI‑verktyg: möjligheter, begränsningar & källkontroll",
      "Tolka och kritiskt granska diagram & statistik",
      "Digital tillgänglighet: talsyntes, e‑böcker & anpassningar",
      "Säkra lösenord och datasäkerhet i skolarbeten",
      "Planera & genomföra MIK‑pass tillsammans med lärare",
      "Jämföra olika sökstrategier (fria webben vs. databaser)",
      "Bedöma lärresurser och verktyg mot kriterier",
      "Etik vid publicering av elevarbeten",
      "Kritisk bild- och videogranskning"
    ]
  },
  { 
    id: "reading", 
    title: "Läsning & språkutveckling", 
    question: "Stödjer skolbiblioteket elevernas språkliga och litterära utveckling?",
    criteria: [
      "Bokpresentationer & individuell litteraturvägledning",
      "Högläsning & boksamtal i undervisningen",
      "Läsprojekt & läsfrämjande aktiviteter (även lov/sommar)",
      "Läslogg, reflektion & måluppföljning",
      "Genrekunskap: berättande & faktatexter",
      "Ordförråd & begreppsarbete i ämnesstudier",
      "Strategier för fackläsning i NO/SO",
      "SVA‑stöd & flerspråkiga resurser",
      "Läsning på modersmål (Mångspråksbiblioteket)",
      "Tillgänglig läsning: talböcker, lättläst & punktskrift",
      "Samarbeta med Cirkulationsbiblioteket (klassuppsättningar)",
      "Skriva recension/essä med citatstöd",
      "Kamratrespons & samtalsmodeller (t.ex. två stjärnor och en önskan)",
      "Läsutmaningar & biblioteksaktiviteter efter skoltid",
      "Läsning på originalspråk/översättning",
      "Uppföljning i SKA av läsfrämjande insatser"
    ]
  },
  { 
    id: "culture", 
    title: "Litteratur & kultur", 
    question: "Erbjuder skolbiblioteket ett brett utbud av kultur och litteratur?",
    criteria: [
      "Samtida ungdomslitteratur & klassiker",
      "Författarporträtt & litterära epoker",
      "Poesi, novell & dramatik – läsa & skapa",
      "Jämföra bok och filmatisering",
      "Litteratur & kulturarv (inkl. nationella minoriteter)",
      "Temaarbete: ett tema i flera verk/medier",
      "Kreativt skrivande i en författares stil",
      "Tolkning med citat och textbevis",
      "Elevutställning/skyltning som synliggör mångfald",
      "Litteratur på flera språk & översättning",
      "Samarbete med folkbibliotek/kulturaktörer",
      "Recensionscirkel eller podd",
      "Affisch/utställning om bibliotekets medieplan (inköp & gallring)",
      "Lyfta fram tillgängliga format & läsfrämjande miljö",
      "Elevkurator för kultur: planera en läs/skriv‑händelse",
      "Biblioteksvandring med fokus på trygg & ändamålsenlig miljö"
    ]
  },
  { 
    id: "democracy", 
    title: "Demokrati & värdegrund", 
    question: "Fungerar skolbiblioteket som en demokratisk arena för alla elever?",
    criteria: [
      "Fri åsiktsbildning & saklig debatt med källstöd",
      "Publicistiska principer & pressetik",
      "Yttrandefrihet & ansvar på nätet",
      "Källkritik i samhällsfrågor/val",
      "Biblioteksråd & elevinflytande i verksamheten",
      "Representation & likvärdig tillgång (mångfald i hyllorna)",
      "Förebygga och hantera nähat",
      "Propaganda & retoriska grepp i media",
      "Medborgarpåverkan: insändare/förslag",
      "Granska bild och rörlig bild",
      "Barnkonventionen i skolan – koppling till bibliotek",
      "Etiska dilemman och värderingsövningar",
      "Tillgänglig miljö: fysisk & kognitiv tillgänglighet",
      "Fokusinsatser för prioriterade grupper",
      "Kritiskt granska diagram i debatt",
      "SKA‑uppföljning av elevers delaktighet"
    ]
  },
];
