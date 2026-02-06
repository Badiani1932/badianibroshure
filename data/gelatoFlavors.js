export const gelatoFlavors = [
  {
    id: "buontalenti",
    nameKey: "flavor.buontalenti",
    label: "Buontalenti",
    seasons: ["tutti"],
    image: "../foto_vasche/Buontalenti/buontalenti.png",
    detailImage: "../foto_vasche/Buontalenti/buontalenti-2.png",
    ingredients: [],
    allergens: [],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false },
    isTub: true
  },
  {
    id: "buontalenti-pistacchio",
    nameKey: "flavor.buontalentiPistacchio",
    label: "Buontalenti al Pistacchio",
    seasons: ["tutti"],
    image: "../foto_vasche/Buontalenti al Pistacchio/buontalenti_pistachio.png",
    detailImage: "../foto_vasche/Buontalenti al Pistacchio/buontalenti_pistachio-2.png",
    ingredients: [],
    allergens: [],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false },
    isTub: true
  },
  {
    id: "buontalenti-caramello",
    nameKey: "flavor.buontalentiCaramello",
    label: "Buontalenti Caramello",
    seasons: ["tutti"],
    image: "../foto_vasche/Buontalenti Caramello/buontalenti_caramello.png",
    detailImage: "../foto_vasche/Buontalenti Caramello/buontalenti_caramello-2.png",
    ingredients: [],
    allergens: [],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false },
    isTub: true
  },
  {
    id: "buontalenti-amarena",
    nameKey: "flavor.buontalentiAmarena",
    label: "Buontalenti all’Amarena",
    seasons: ["tutti"],
    image: "../foto_vasche/Buontalenti all_Amarena/buontalenti_amarena.png",
    detailImage: "../foto_vasche/Buontalenti all_Amarena/buontalenti_amarena-2.png",
    ingredients: [],
    allergens: [],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false },
    isTub: true
  },
  {
    id: "fior-di-latte",
    nameKey: "flavor.fiorDiLatte",
    seasons: ["tutti"],
    image: "../images/gusti/fior-di-latte.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.panna", "gelato.ingredients.zucchero"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "stracciatella",
    nameKey: "flavor.stracciatella",
    seasons: ["tutti"],
    image: "../images/gusti/stracciatella.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.panna", "gelato.ingredients.zucchero", "gelato.ingredients.cioccolato"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "cioccolato-fondente",
    nameKey: "flavor.cioccolatoFondente",
    seasons: ["tutti"],
    image: "../pdf_extracted/chocolate.png",
    ingredients: ["gelato.ingredients.base-latte-acqua", "gelato.ingredients.zucchero", "gelato.ingredients.cacao"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "nocciola",
    nameKey: "flavor.nocciola",
    seasons: ["tutti"],
    image: "../pdf_extracted/hezelnut.png",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.panna", "gelato.ingredients.zucchero", "gelato.ingredients.nocciole"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.frutta-guscio"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: true, containsAlcohol: false }
  },
  {
    id: "pistacchio",
    nameKey: "flavor.pistacchio",
    seasons: ["tutti"],
    image: "../images/gusti/pistacchio.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.panna", "gelato.ingredients.zucchero", "gelato.ingredients.pistacchio"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.frutta-guscio"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: true, containsAlcohol: false }
  },
  {
    id: "mandorla",
    nameKey: "flavor.mandorla",
    seasons: ["primavera", "estate"],
    image: "../images/gusti/mandorla.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.mandorle"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.frutta-guscio"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: true, containsAlcohol: false }
  },
  {
    id: "crema",
    nameKey: "flavor.crema",
    seasons: ["tutti"],
    image: "../images/gusti/crema.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.panna", "gelato.ingredients.zucchero", "gelato.ingredients.tuorlo"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.uova"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: true, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "vaniglia",
    nameKey: "flavor.vaniglia",
    seasons: ["tutti"],
    image: "../images/gusti/vaniglia.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.panna", "gelato.ingredients.zucchero", "gelato.ingredients.vaniglia"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "caffe",
    nameKey: "flavor.caffe",
    seasons: ["tutti"],
    image: "../images/gusti/caffe.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.caffe"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "tiramisu",
    nameKey: "flavor.tiramisu",
    seasons: ["autunno", "inverno"],
    image: "../images/gusti/tiramisu.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.caffe", "gelato.ingredients.mascarpone"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.uova"],
    flags: { vegan: false, glutenFree: false, lactoseFree: false, containsEggs: true, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "caramello-salato",
    nameKey: "flavor.caramelloSalato",
    seasons: ["tutti"],
    image: "../images/gusti/caramello-salato.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.panna", "gelato.ingredients.zucchero", "gelato.ingredients.caramello", "gelato.ingredients.sale"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "gianduia",
    nameKey: "flavor.gianduia",
    seasons: ["tutti"],
    image: "../images/gusti/gianduia.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.cacao", "gelato.ingredients.nocciole"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.frutta-guscio"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: true, containsAlcohol: false }
  },
  {
    id: "bacio",
    nameKey: "flavor.bacio",
    seasons: ["tutti"],
    image: "../images/gusti/bacio.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.cacao", "gelato.ingredients.nocciole"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.frutta-guscio"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: true, containsAlcohol: false }
  },
  {
    id: "menta",
    nameKey: "flavor.menta",
    seasons: ["estate"],
    image: "../images/gusti/menta.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.menta"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "menta-cioccolato",
    nameKey: "flavor.mentaCioccolato",
    seasons: ["estate"],
    image: "../images/gusti/menta-cioccolato.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.menta", "gelato.ingredients.cioccolato"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "amarena",
    nameKey: "flavor.amarena",
    seasons: ["primavera", "estate"],
    image: "../images/gusti/amarena.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.amarena"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "yogurt",
    nameKey: "flavor.yogurt",
    seasons: ["primavera", "estate"],
    image: "../images/gusti/yogurt.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.yogurt"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "limone",
    nameKey: "flavor.limoneSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/limone.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.limone"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "fragola",
    nameKey: "flavor.fragolaSorbetto",
    seasons: ["primavera", "estate"],
    image: "../images/gusti/fragola.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.fragola"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "lampone",
    nameKey: "flavor.lamponeSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/lampone.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.lampone"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "frutti-di-bosco",
    nameKey: "flavor.fruttiDiBoscoSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/frutti-di-bosco.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.frutti-di-bosco"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "mango",
    nameKey: "flavor.mangoSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/mango.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.mango"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "passion-fruit",
    nameKey: "flavor.passionFruitSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/passion-fruit.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.frutto-passione"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "cocco",
    nameKey: "flavor.cocco",
    seasons: ["estate"],
    image: "../images/gusti/cocco.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.cocco"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "banana",
    nameKey: "flavor.banana",
    seasons: ["estate"],
    image: "../images/gusti/banana.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.banana"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "rum-uvetta",
    nameKey: "flavor.rumUvetta",
    seasons: ["autunno", "inverno"],
    image: "../images/gusti/rum-uvetta.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.uvetta", "gelato.ingredients.rum"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: true }
  },
  {
    id: "zabaione",
    nameKey: "flavor.zabaione",
    seasons: ["autunno", "inverno"],
    image: "../images/gusti/zabaione.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.tuorlo", "gelato.ingredients.vino"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.uova"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: true, containsNuts: false, containsAlcohol: true }
  },
  {
    id: "liquirizia",
    nameKey: "flavor.liquirizia",
    seasons: ["autunno", "inverno"],
    image: "../images/gusti/liquirizia.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.liquirizia"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "cannella",
    nameKey: "flavor.cannella",
    seasons: ["autunno", "inverno"],
    image: "../images/gusti/cannella.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.cannella"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "arancia",
    nameKey: "flavor.aranciaSorbetto",
    seasons: ["inverno"],
    image: "../images/gusti/arancia.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.arancia"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "mandarino",
    nameKey: "flavor.mandarinoSorbetto",
    seasons: ["inverno"],
    image: "../images/gusti/mandarino.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.mandarino"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "pistacchio-salato",
    nameKey: "flavor.pistacchioSalato",
    seasons: ["tutti"],
    image: "../images/gusti/pistacchio-salato.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.pistacchio", "gelato.ingredients.sale"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.frutta-guscio"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: true, containsAlcohol: false }
  },
  {
    id: "ricotta-pera",
    nameKey: "flavor.ricottaPera",
    seasons: ["autunno", "inverno"],
    image: "../images/gusti/ricotta-pera.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.ricotta", "gelato.ingredients.pera"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "panna",
    nameKey: "flavor.panna",
    seasons: ["tutti"],
    image: "../images/gusti/panna.jpg",
    ingredients: ["gelato.ingredients.panna", "gelato.ingredients.latte", "gelato.ingredients.zucchero"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "biscotto",
    nameKey: "flavor.biscotto",
    seasons: ["tutti"],
    image: "../images/gusti/biscotto.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.biscotto"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.glutine"],
    flags: { vegan: false, glutenFree: false, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "cheesecake-frutti-rossi",
    nameKey: "flavor.cheesecakeFruttiRossi",
    seasons: ["primavera", "estate"],
    image: "../images/gusti/cheesecake-frutti-rossi.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.base-cheesecake"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.glutine"],
    flags: { vegan: false, glutenFree: false, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "pesca",
    nameKey: "flavor.pescaSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/pesca.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.pesca"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "albicocca",
    nameKey: "flavor.albicoccaSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/albicocca.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.albicocca"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "fico",
    nameKey: "flavor.fico",
    seasons: ["estate", "autunno"],
    image: "../images/gusti/fico.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.fico"],
    allergens: ["gelato.allergens.latte"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "ananas",
    nameKey: "flavor.ananasSorbetto",
    seasons: ["estate"],
    image: "../images/gusti/ananas.jpg",
    ingredients: ["gelato.ingredients.acqua", "gelato.ingredients.zucchero", "gelato.ingredients.ananas"],
    allergens: [],
    flags: { vegan: true, glutenFree: true, lactoseFree: true, containsEggs: false, containsNuts: false, containsAlcohol: false }
  },
  {
    id: "sesamo",
    nameKey: "flavor.sesamo",
    seasons: ["tutti"],
    image: "../images/gusti/sesamo.jpg",
    ingredients: ["gelato.ingredients.latte", "gelato.ingredients.zucchero", "gelato.ingredients.sesamo"],
    allergens: ["gelato.allergens.latte", "gelato.allergens.sesamo"],
    flags: { vegan: false, glutenFree: true, lactoseFree: false, containsEggs: false, containsNuts: false, containsAlcohol: false }
  }
];
