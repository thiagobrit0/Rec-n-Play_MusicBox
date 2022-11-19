let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let track_text = document.querySelector(".track-text");
let track_album = document.querySelector(".track-album");


let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let randomIcon = document.querySelector(".fa-random");
let curr_track = document.createElement("audio");

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const musics = [{
    id: 0,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Monólogo ao Pé do Ouvido",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/01. Monólogo ao Pé do Ouvido.mp3",
    description: "Dando pontapé ao álbum, “Monólogo ao pé do ouvido” traz todo o conceito por trás do manguebeat, oferecendo uma nova roupagem ao som tradicional de Pernambuco e desprezando os padrões formais de música da época na letra.",
  },
  {
    id: 1,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Banditismo por uma Questão de Classe",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/02. Banditismo por Uma Questão de Classe.mp3",
    description: "Com um teor crítico social, “Banditismo por uma questão de classe” traz a energia da guitarra para contrapor a ideia da mídia do que é um marginal, não seria uma escolha: “quem era inocente virou bandido/pra poder comer um pedaço de pão todo fudido”.",
  },
  {
    id: 2,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Rios, Pontes e Overdrives",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/03. Rios, Pontes & Overdrives.mp3",
    description: "O título da faixa mistura características de Recife, ao mesmo tempo que insere guitarras para referenciar os jovens rockeiros. A letra insere vocábulos que evidenciam a desigualdade social que “molambos” (pano esfarrapado ou pessoa fraca) sofrem.",
  },
  {
    id: 3,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "A Cidade",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/04. A Cidade - Boa Noite do Velho Faceta (Amor de Criança).mp3",
    description: "Novamente pautado em críticas sociais, “A cidade” destaca a diferença de classes através do ritmo maracatu, onde “o de cima sobe e o debaixo desce”, a cidade que é vendida como esperança, na verdade é o palco que expõe o lugar do rico e do pobre.",
  },
  {
    id: 4,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "A Praieira",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/05. A Praieira.mp3",
    description: '"A praieira" dá ênfase aos cenários naturais que compõem Pernambuco. É característica do manguebeat exaltar o dia-a-dia dos cidadãos como um ato cultural, portanto ir à praia é um costume de cidades litorâneas, onde há sua própria típica citada: a ciranda.',
  },
  {
    id: 5,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Samba Makossa",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/06. Samba Makossa.mp3",
    description: "Celebrando danças e ritmos tradicionais, como o samba e o ritmo africano Makossa, “Samba makossa” celebra o retorno do samba e o põe como destaque “samba maioral!! Onde é que você se meteu antes de chegar na roda, meu irmão?”.",
  },
  {
    id: 6,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Da Lama ao Caos",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/07. Da Lama Ao Caos.mp3",
    description: '“Da lama ao caos” traz a ideia do manguebeat: desconstruir o estilo musical padrão para criar uma nova roupagem, ao mesmo tempo em que evidencie nas letras as desigualdades pelas quais passam o Brasil, especialmente o nordeste, como a fome.',
  },
  {
    id: 7,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Maracatu de Tiro Certeiro",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/08. Maracatu de Tiro Certeiro.mp3",
    description: "Com uma mistura de ritmos, mas dando destaque ao maracatu, “Maracatu de tiro certeiro” é uma música que toca na violência estrutural que se faz presente ao longo do álbum, fruto de relações exploratórias na sociedade, mas com destaque ao mangue.",
  },
  {
    id: 8,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Salustiano Song",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/09. Salustiano Song.mp3",
    description: "Faixa de transição, “Salustiano song” é carregada por instrumentais que fazem homenagem a Manoel Salustiano Soares, fundador do maracatu rural Plaba de Ouro. Seu nome também se faz presente no título da música. ",
  },
  {
    id: 9,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Antene-se",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/10. Antene-Se.mp3",
    description: '“Antene-se” faz referência a toda cultura envolvendo o manguezal do Recife, exaltando a rotina dos “mangueboys” que encontram diversão em sua profissão apesar das adversidades que fazem parte de seu cotidiano.',
  },
  {
    id: 10,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Risoflora",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/11. Risoflora.mp3",
    description: '“Risoflora” é a única canção de amor presente no disco, ao longo da música há referências ao caranguejo, que vive em uma vegetação do mangue chamada risoflora, seu habitat. Sendo assim, um depende do outro para sobreviver.',
  },
  {
    id: 11,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Lixo do Mangue",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/12. Lixo do Mangue.mp3",
    description: "Música voltada exclusivamente para o instrumental, “Lixo do mangue” marca a transição para “Computadores fazem arte” através de batuques ritmos similares ao frevo.",
  },
  {
    id: 12,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Computadores Fazem Arte",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/13. Computadores Fazem Arte.mp3",
    description: '“Computadores fazem arte” critica a inversão de valores, onde “computadores fazem arte/artistas fazem dinheiro”, uma clara evidência ao fato de que existem artistas totalmente fabricados.',
  },
  {
    id: 13,
    idalbum: 4,
    img: "/assets/img/albums/caos_lama.png",
    name: "Coco Dub (Afrociberdelia) (Bônus)",
    artist: "Chico Science & Nação Zumbi",
    album: "Da Lama ao Caos",
    music: "/assets/music/DaLamaaoCaos/14. Côco Dub (Afrociberdelia).mp3",
    description: "Finalizando o álbum, a faixa traz consigo uma mistura fervorosa de diversos instrumentos, aliados a referências a caranguejos e a dualidade entre pobreza econômica e riqueza cultural",
  },

  {
    id: 14,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Malungo",
    artist: "Chico Science, Nação Zumbi, Jorge Ben Jor, Fred 04, Marcelo D2, Falcão",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/01 Malungo.mp3",
    description: "Malungo é uma palavra que remete ao companheirismo, luta e homenagem a um dos seus, uma vez que o álbum foi lançado após a morte de Chico Science e mantém o teor eclético do movimento manguebeat.",
  },

  {
    id: 15,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Nos Quintais do Mundo",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/02 Nos Quintais Do Mundo.mp3",
    description: "",
  },
  {
    id: 16,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Protótipo Sambadélico de Mensagem Digital",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/03 Protótipo Sambadélico de Mensagem Digital.mp3",
    description: "",
  },
  {
    id: 17,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Dubismo",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/04 Dubismo.mp3",
    description: "",
  },
  {
    id: 18,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Interlude Cien-Zia",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/05 Interlude Cien-Zia.mp3",
    description: "",
  },
  {
    id: 19,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Quilombo Groove",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/06 Quilombo Groove (Ao Vivo).mp3",
    description: "",
  },
  {
    id: 20,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Um Satélite Na Cabeça",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/07 Um Satélite Na Cabeça [Ao Vivo].mp3",
    description: "",
  },
  {
    id: 21,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Lixo do Mangue",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/08 Pout-Pourri-Lixo Do Mangue-Enquanto O Mundo Explode [Ao Vivo].mp3",
    description: "Música voltada exclusivamente para o instrumental, “Lixo do mangue” marca a transição para “Computadores fazem arte” através de batuques ritmos similares ao frevo.",
  },
  {
    id: 22,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Sobremesa",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/09 Sobremesa [Ao Vivo].mp3",
    description: "",
  },
  {
    id: 23,
    idalbum: 0,
    img: "/assets/img/albums/csnzChico.jpg",
    name: "Salustiano Song",
    artist: "Chico Science & Nação Zumbi",
    album: "C.S.N.Z",
    music: "/assets/music/CSNZ/10 Salustiano Song [Ao Vivo].mp3",
    description: "Originalmente faixa de transição, “Salustiano song” é carregada por instrumentais que fazem homenagem a Manoel Salustiano Soares, fundador do maracatu rural Plaba de Ouro. Seu nome também se faz presente no título da música.",
  },

  {
    id: 24,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Cabidela",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/01 Cabidela.mp3",
    description: "Em “Cabidela”, a banda abre com a mistura de sentimentos vindas de um fim de relacionamento, desde frustrações, sensação de solidão e tristeza, até a raiva e o desejo que “ele” se vá.",
  },
  {
    id: 25,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Deixe-se Acreditar",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/02 Deixe-se Acreditar.mp3",
    description: '“Deixe-se acreditar” traz um lado descontraído da banda, onde eles mostram que se só quiserem cantar sobre “um samba para se aquecer” está tudo bem, pois nem tudo precisa ter um significado muito profundo.',
  },
  {
    id: 26,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Nem Parece",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/03 Nem Parece.mp3",
    description: '“Nem parece” destaca a incerteza do protagonista em relacionamentos, onde ele não sabe se ele será um desperdício de tempo ou marcará a vida deles de alguma forma, para que todos os encontros não sejam em vão.',
  },
  {
    id: 27,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Discurso Burocrático",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/04 Discurso Burocrático.mp3",
    description: '“Discurso burocrático” traz um pouco de política ao repertório do álbum, ao destacar o jeito que conduzem a nossa política. É como se vivêssemos um dejavu, onde não andamos para frente e somos guiados sob os interesses de poucos.',
  },
  {
    id: 28,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "A Missa",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/05 A Missa.mp3",
    description: '“A missa” fala sobre aproveitar a vida enquanto há tempo, não se impor tantos limites, pois “um dia você vai morrer”, enquanto todo mundo dança.',
  },
  {
    id: 29,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Absorva",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/06 Absorva.mp3",
    description: "Com um instrumental psicodélico, “Absorva” se trata da intensidade de um relacionamento, onde a letra se mistura com a produção de um jeito antropofágico para simbolizar um retrato da atração.",
  },
  {
    id: 30,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "O Céu, o Sol e o Mar",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/07 O Céu, O Sol E O Mar.mp3",
    description: '“O céu, o sol e o mar” retrata um andarilho que, apesar de todas as dificuldades, ergue a cabeça e exalta a beleza da paisagem em que vive, onde há “areia branca, o céu e o mar”.',
  },
  {
    id: 31,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Adelaide",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/08 Adelaide.mp3",
    description: '“Adelaide” conta uma declaração de amor após um conflito, onde o rapaz tenta mostrar que mudou e jamais a fará chorar. É uma canção melancólica capaz de resgatar memórias afetivas de reconciliação.',
  },
  {
    id: 32,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Duas Cores",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/09 Duas Cores.mp3",
    description: '“Duas cores” possui uma das letras mais fortes do álbum, ela faz alusão a alguém afogado em emoções que está em conflito para fazer a pessoa amada ser fielmente recíproca aos seus sentimentos, apesar de ter “duas cores”.',
  },
  {
    id: 33,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Estático",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/10 Estático.mp3",
    description: '“Estático” traz o sentimento amargo de quando se perde a pessoa amada e não há mais perspectivas para o futuro pensado, “se você ainda quer estar nos dias que já passaram, não sei, mas sobrou pra mim… permaneço aqui estático”.',
  },
  {
    id: 34,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Merda",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/11 Merda.mp3",
    description: "Ao som crescente de guitarras e flautas, “Merda” é uma música que avança freneticamente para extravasar a raiva, seguindo a temática de relacionamento do álbum.",
  },
  {
    id: 35,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Splash Shine",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/12 Splash Shine.mp3",
    description: "Com uma melodia estonteante, “Splash shine” trabalha com a mistura de sentimentos após um término, onde ora há o arrependimento pelo tempo perdido, ora se deseja voltar no tempo onde sorrir o sentimento ao ver a pessoa amada.",
  },
  {
    id: 36,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Faaca",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/13 Faaca.mp3",
    description: '“Faaca” em meio à presença constante de bateria, traz devaneios através de metáforas envolvendo punhaladas para simbolizar a dor de não ser correspondido mais pela pessoa a qual se ama.',
  },
  {
    id: 37,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "Baú",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/14 Baú.mp3",
    description: "o “Baú” em questão se trata do confinamento onde o protagonista se encontra, já não há mais esperanças de reconciliação, o sentimento de melancolia se propaga por toda a faixa, desde os acordes até os efeitos nos vocais.",
  },
  {
    id: 38,
    idalbum: 1,
    img: "/assets/img/albums/nadadenovo.jpg",
    name: "container",
    artist: "Mombojó",
    album: "Nadadenovo",
    music: "/assets/music/Nadadenovo/15 Container.mp3",
    description: '“Container” fala sobre se prender na sua própria bolha, onde só a sua verdade ecoa, e silenciar aqueles que vão contra a sua verdade, mas há também a expectativa de reviravolta “e se esse for o sentimento, pode esperar que a ira vai voltar”.',
  },

  {
    id: 39,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Refazenda",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/01. Refazenda.mp3",
    description: "Dando início ao álbum de releituras, “Refazenda” traz os acordes únicos de Gilberto Gil, a partir da sugestão de Pupillo, baterista da banda. Nação Zumbi já havia trabalhado com o próprio antes, então nada mais esperado do que uma homenagem à lenda.",
  },

  {
    id: 40,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Balanço",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/02. Balanço.mp3",
    description: '“Balanço” há muito tempo fazia parte do repertório da banda, Tim Maia e seu álbum self-titled era uma febre para eles desde a época do lançamento do Afrociberdelia, especialmente durante o período no Rio de Janeiro, portanto a presença no álbum também era indispensável.',
  },
  {
    id: 41,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Amor",
    artist: "Nação Zumbi & Ney Matogrosso",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/03. Amor.mp3",
    description: '“Amor” foi decidida unanimemente após a banda ter contato com Ney Matogrosso em uma apresentação no Rock in Rio, o próprio Ney opinou para a construção da música que foi incluída no show e posteriormente ao disco.',
  },
  {
    id: 42,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Não Há Dinheiro que Pague",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/04. Não Há Dinheiro Que Pague.mp3",
    description: "Canção homônima de Roberto Carlos, “Não há dinheiro que pague” foi um desafio para a banda, pois eles falaram que não há percussão na música, algo muito presente no repertório do NZ. Seu objetivo foi montar um funk abrasileirado.",
  },
  {
    id: 43,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Do Nothing",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/05. Do Nothing.mp3",
    description: "Uma balada com influência punk do final da década de 70 do Specials, “Do nothing” critica a inércia de uma população alienada inglesa. NZ mantém o corpo forte da música, ao mesmo tempo em que implementam guitarras ao percurso.",
  },
  {
    id: 44,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Dois Animais na Selva Suja da Rua",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/06. Dois Animais Na Selva Suja Da Rua.mp3",
    description: "Também sugestão de Pupillo, a canção de Erasmos Carlos ganhou uma nova roupagem, provavelmente a que mais sofreu mudanças no disco em comparação com a original, soa como algo lançado diretamente do início dos anos 80.",
  },
  {
    id: 45,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Tomorrow Never Knows",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/07. Tomorrow Never Knows.mp3",
    description: "Canção dos Beatles, “Tomorrow never knows” também sempre esteve no repertório do NZ, ela foi adotada devido à psicodelia que já é característica da banda, algo mais abrasileirado e com toques de maracatu.",
  },
  {
    id: 46,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Sexual Healing",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/08. Sexual Healing.mp3",
    description: "Dita pela banda como a mais difícil de reimaginar, “Sexual healing” de Marvin Gaye é um clássico. O grupo não incluiu bateria, mas pesou em guitarras, violões e percussões, mantendo a vibe praiana.",
  },
  {
    id: 47,
    idalbum: 2,
    img: "/assets/img/albums/radiolanz.png",
    name: "Ashes To Ashes",
    artist: "Nação Zumbi",
    album: "Radiola NZ, Vol. 1",
    music: "/assets/music/RadiolaNZ/09. Ashes To Ashes.mp3",
    description: "David Bowie já era uma presença certa no álbum, porém a escolha de “Ashes to ashes” veio após sugestão de Jorge, vocalista da banda, que se identificou com a letra, apesar da dificuldade de cantá-la.",
  },
  {
    id: 48,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Hoje, Amanhã E Depois",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/01 - Hoje, Amanhã E Depois.mp3",
    description: "",
  },

  {
    id: 49,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Na Hora De Ir",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/02 - Na Hora De Ir.mp3",
    description: "",
  },
  {
    id: 50,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Memorando",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/03 - Memorando.mp3",
    description: "",
  },
  {
    id: 51,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "A Ilha",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/04 - A Ilha.mp3",
    description: "",
  },
  {
    id: 52,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "05 - Respirando",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/05 - Respirando.mp3",
    description: "",
  },
  {
    id: 53,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "06 - Voyager",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/06 - Voyager.mp3",
    description: "",
  },
  {
    id: 53,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "O Expresso Da Elétrica Avenida",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/07 - O Expresso Da Elétrica Avenida.mp3",
    description: "",
  },
  {
    id: 54,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Nebulosa",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/08 - Nebulosa.mp3",
    description: "",
  },
  {
    id: 55,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Sem Preço",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/09 - Sem Preço.mp3",
    description: "",
  },

  {
    id: 56,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Vai Buscar",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/10 - Vai Buscar.mp3",
    description: "",
  },

  {
    id: 57,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Pode Acreditar",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/11 - Pode Acreditar.mp3",
    description: "",
  },
  {
    id: 58,
    idalbum: 3,
    img: "/assets/img/albums/futuranz.jpg",
    name: "Futura",
    artist: "Nação Zumbi",
    album: "Futura",
    music: "/assets/music/Futura/12 - Futura.mp3",
    description: "",
  },

  {
    id: 59,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Manguebit",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/01. Manguebit.mp3",
    description: "",
  },

  {
    id: 60,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "A Bola do Jogo",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/02. A Bola do Jogo.mp3",
    description: "",
  },
  {
    id: 61,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Livre Iniciativa",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/03. Livre Iniciativa.mp3",
    description: "",
  },
  {
    id: 62,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Terra Escura",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/04. Terra Escura.mp3",
    description: "",
  },
  {
    id: 63,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Saldo de Aratú",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/05. Saldo de Aratú.mp3",
    description: "",
  },
  {
    id: 64,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Uma Mulher com W... Maiúsculo",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/06. Uma Mulher com W... Maiúsculo.mp3",
    description: "",
  },
  {
    id: 65,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Homero, o Junkie",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/07. Homero, o Junkie.mp3",
    description: "",
  },
  {
    id: 66,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Rios (Smart Dugs), Pontes & Overdrives",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/08. Rios (Smart Dugs), Pontes & Overdrives.mp3",
    description: "",
  },
  {
    id: 67,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Musa da Ilha Grande",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/09. Musa da Ilha Grande.mp3",
    description: "",
  },
  {
    id: 68,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Cidade Estuário",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/10. Cidade Estuário.mp3",
    description: "",
  },
  {
    id: 69,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "O Rapaz do B... Preto",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/11. O Rapaz do B... Preto.mp3",
    description: "",
  },
  {
    id: 70,
    idalbum: 5,
    img: "/assets/img/albums/sambaesquema.png",
    name: "Sob o Calçamento (se Espumar é Gente)",
    artist: "Mundo Livre S/A",
    album: "Samba esquema noise",
    music: "/assets/music/SambaEsquema/12. Sob o Calçamento (se Espumar é Gente).mp3",
    description: "",
  },
  {
    id: 71,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Mateus Enter",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/01 - Mateus Enter.mp3",
    description: "",
  },
  {
    id: 72,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "O Cidadão do Mundo",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/02 - O Cidadão do Mundo.mp3",
    description: "",
  },
  {
    id: 73,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Etnia",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/03 - Etnia.mp3",
    description: "",
  },
  {
    id: 74,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Quilombo Groove",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/04 - Quilombo Groove.mp3",
    description: "",
  },
  {
    id: 75,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Macô",
    artist: "Chico Science, Nação Zumbi, Gilberto Gil e Marcelo D2",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/05 - Macô.mp3",
    description: "",
  },
  {
    id: 76,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Um Passeio no Mundo Livre",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/06 - Um Passeio no Mundo Livre.mp3",
    description: "",
  },
  {
    id: 77,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Samba do Lado",
    artist: "Chico Science, Nação Zumbi, Fred 04",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/07 - Samba do Lado.mp3",
    description: "",
  },
  {
    id: 78,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Maracatu Atômico",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/08 - Maracatu Atômico.mp3",
    description: "",
  },
  {
    id: 79,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "O Encontro De Isaac Asimov Com Santos Dumont No Céu",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/09 - O Encontro De Isaac Asimov Com Santos Dumont No Céu.mp3",
    description: "",
  },
  {
    id: 80,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Corpo de Lama",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/10 - Corpo de Lama.mp3",
    description: "",
  },
  {
    id: 81,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Sobremesa",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/11 - Sobremesa.mp3",
    description: "",
  },
  {
    id: 82,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Manguetown",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/12 - Manguetown.mp3",
    description: "",
  },
  {
    id: 83,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Um Satélite na Cabeca",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/13 - Um Satélite na Cabeca.mp3",
    description: "",
  },
  {
    id: 84,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Baião Ambiental",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/14 - Baião Ambiental.mp3",
    description: "",
  },
  {
    id: 85,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Sangue de Bairro",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/15 - Sangue de Bairro.mp3",
    description: "",
  },
  {
    id: 86,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Enquanto o Mundo Explode",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/16 - Enquanto o Mundo Explode.mp3",
    description: "",
  },
  {
    id: 87,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Interlude Zumbi",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/17 - Interlude Zumbi.mp3",
    description: "",
  },
  {
    id: 88,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Criança de Domingo",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/18 - Criança de Domingo.mp3",
    description: "",
  },
  {
    id: 89,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "Amor de Muito",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/19 - Amor de Muito.mp3",
    description: "",
  },
  {
    id: 90,
    idalbum: 6,
    img: "/assets/img/albums/afrociberdelia.jpg",
    name: "20 - Samidarish",
    artist: "Chico Science & Nação Zumbi",
    album: "Afrociberdelia",
    music: "/assets/music/Afrociberdelia/20 - Samidarish.mp3",
    description: "",
  },

];

const music_list = [];

pegaTrackAlbuns();

loadTrack(track_index);

function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();

  curr_track.src = music_list[track_index].music;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  track_text.textContent = music_list[track_index].description;


  track_album.textContent = music_list[track_index].album;

  updateTimer = setInterval(setUpdate, 1000);

  curr_track.addEventListener("ended", nextTrack);
}

function reset() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
  isRandom = true;
  randomIcon.classList.add("randomActive");
}

function pauseRandom() {
  isRandom = false;
  randomIcon.classList.remove("randomActive");
}

function repeatTrack() {
  let current_index = track_index;
  loadTrack(current_index);
  playTrack();
}

function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  track_art.classList.add("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  track_art.classList.remove("rotate");
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
  if (track_index < music_list.length - 1 && isRandom === false) {
    track_index += 1;
  } else if (track_index < music_list.length - 1 && isRandom === true) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = music_list.length - 1;
  }
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
  let seekPosition = 0;
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

listarMusicas();

function listarMusicas() {
  const listaOrdenada = document.getElementById("lista_musica");

  music_list.forEach((music_list) => {
    if (music_list.idalbum == id) {
      const li = document.createElement("li");

      li.addEventListener("click", function handleClick() {
        track_index = music_list.id;
        loadTrack(track_index);
        playTrack();
      });

      const nome = document.createElement("h3");
      nome.innerHTML = music_list.name;
      li.appendChild(nome);

      const album = document.createElement("h5");
      album.innerHTML = music_list.artist;
      li.appendChild(album);

      listaOrdenada.appendChild(li);
    }
  });
}

function pegaTrackAlbuns() {
  if (id != null) {
    let atualiza_id = 0;
    musics.forEach((musics_list) => {
      if (musics_list.idalbum == id) {
        musics_list.id = atualiza_id;
        music_list.push(musics_list);
        atualiza_id++;
      }
    });
  }
}