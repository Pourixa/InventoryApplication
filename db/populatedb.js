const {Client} = require("pg")
const dotenv =require("dotenv")
dotenv.config({path:"../.env"});
const categories = [
  { name: "Electric Guitars", description: "Solid-body and hollow-body electric guitars." },
  { name: "Amplifiers", description: "Combo and head amps for guitar and bass." },
  { name: "Effects Pedals", description: "Distortion, overdrive, modulation and time-based pedals." },
  { name: "Cables", description: "Instrument, speaker, and patch cables." },
  { name: "Accessories", description: "Straps, picks, capos, tuners, and other essentials." },
];

const items = [
  // Electric Guitars
  { name: "Fender Stratocaster", description: "Classic double-cutaway, three single-coil pickups.", price: 899.99, stock_count: 6, image_url: "https://commons.wikimedia.org/wiki/Special:FilePath/Fender_Stratocaster_004.JPG", category: "Electric Guitars" },
  { name: "Gibson Les Paul Standard", description: "Mahogany body, humbucker pickups, classic rock tone.", price: 2499.00, stock_count: 3, image_url: "https://commons.wikimedia.org/wiki/Special:FilePath/Fender_Highway_1_Stratocaster.jpg", category: "Electric Guitars" },
  { name: "Ibanez RG550", description: "Superstrat with Floyd Rose tremolo, fast neck for shredding.", price: 1099.99, stock_count: 5, image_url: "https://loremflickr.com/400/300/ibanez,guitar", category: "Electric Guitars" },
  { name: "Fender Telecaster", description: "Twangy bridge pickup, bolt-on maple neck.", price: 849.99, stock_count: 4, image_url: "https://loremflickr.com/400/300/telecaster,guitar", category: "Electric Guitars" },
  { name: "Gibson SG Standard", description: "Lightweight mahogany body, dual humbuckers.", price: 1799.00, stock_count: 2, image_url: "https://loremflickr.com/400/300/gibson,guitar", category: "Electric Guitars" },
  { name: "Squier Bullet Stratocaster", description: "Budget-friendly beginner electric guitar.", price: 199.99, stock_count: 12, image_url: "https://loremflickr.com/400/300/electric,guitar", category: "Electric Guitars" },

  // Amplifiers
  { name: "Marshall JCM800", description: "Legendary tube amp head, classic British crunch.", price: 1899.00, stock_count: 2, image_url: "https://loremflickr.com/400/300/marshall,amplifier", category: "Amplifiers" },
  { name: "Fender Twin Reverb", description: "Clean-headroom combo amp with built-in reverb.", price: 1599.99, stock_count: 3, image_url: "https://loremflickr.com/400/300/fender,amplifier", category: "Amplifiers" },
  { name: "Vox AC30", description: "Chimey British combo amp, jangle and breakup tones.", price: 1699.00, stock_count: 2, image_url: "https://loremflickr.com/400/300/vox,amplifier", category: "Amplifiers" },
  { name: "Boss Katana 100", description: "Versatile solid-state combo with built-in effects.", price: 429.99, stock_count: 8, image_url: "https://loremflickr.com/400/300/guitar,amplifier", category: "Amplifiers" },
  { name: "Orange Crush 20", description: "Compact practice amp with Orange's signature tone.", price: 129.99, stock_count: 15, image_url: "https://loremflickr.com/400/300/orange,amplifier", category: "Amplifiers" },

  // Effects Pedals
  { name: "Boss DS-1 Distortion", description: "Classic orange distortion pedal.", price: 59.99, stock_count: 20, image_url: "https://loremflickr.com/400/300/distortion,pedal", category: "Effects Pedals" },
  { name: "Ibanez Tube Screamer TS9", description: "Legendary mid-boosted overdrive.", price: 99.99, stock_count: 14, image_url: "https://loremflickr.com/400/300/overdrive,pedal", category: "Effects Pedals" },
  { name: "Electro-Harmonix Big Muff Pi", description: "Thick, fuzzy sustain pedal.", price: 89.99, stock_count: 10, image_url: "https://loremflickr.com/400/300/fuzz,pedal", category: "Effects Pedals" },
  { name: "MXR Phase 90", description: "Iconic orange phaser, one knob simplicity.", price: 109.99, stock_count: 9, image_url: "https://loremflickr.com/400/300/phaser,pedal", category: "Effects Pedals" },
  { name: "Boss DD-8 Digital Delay", description: "Versatile delay pedal with tap tempo.", price: 179.99, stock_count: 7, image_url: "https://loremflickr.com/400/300/delay,pedal", category: "Effects Pedals" },
  { name: "Dunlop Cry Baby Wah", description: "Classic wah-wah pedal.", price: 99.99, stock_count: 11, image_url: "https://loremflickr.com/400/300/wah,pedal", category: "Effects Pedals" },

  // Cables
  { name: "Instrument Cable 10ft", description: "Straight-to-straight 1/4 inch guitar cable.", price: 14.99, stock_count: 40, image_url: "https://loremflickr.com/400/300/guitar,cable", category: "Cables" },
  { name: "Instrument Cable 20ft", description: "Straight-to-angled 1/4 inch guitar cable.", price: 19.99, stock_count: 30, image_url: "https://loremflickr.com/400/300/audio,cable", category: "Cables" },
  { name: "Speaker Cable 15ft", description: "Heavy-gauge cable for amp head to cabinet.", price: 24.99, stock_count: 18, image_url: "https://loremflickr.com/400/300/speaker,cable", category: "Cables" },
  { name: "XLR Microphone Cable", description: "Balanced XLR cable for mics and DI boxes.", price: 17.99, stock_count: 25, image_url: "https://loremflickr.com/400/300/xlr,cable", category: "Cables" },
  { name: "Patch Cable Pack (6-pack)", description: "Short cables for connecting pedals.", price: 22.99, stock_count: 20, image_url: "https://loremflickr.com/400/300/patch,cable", category: "Cables" },

  // Accessories
  { name: "Leather Guitar Strap", description: "Adjustable padded leather strap.", price: 34.99, stock_count: 22, image_url: "https://loremflickr.com/400/300/guitar,strap", category: "Accessories" },
  { name: "Kyser Quick-Change Capo", description: "Spring-loaded capo for quick key changes.", price: 21.99, stock_count: 30, image_url: "https://loremflickr.com/400/300/guitar,capo", category: "Accessories" },
  { name: "Dunlop Tortex Picks (12-pack)", description: "Assorted gauge guitar picks.", price: 6.99, stock_count: 60, image_url: "https://loremflickr.com/400/300/guitar,pick", category: "Accessories" },
  { name: "Snark Clip-On Tuner", description: "Chromatic clip-on tuner for guitar and bass.", price: 14.99, stock_count: 28, image_url: "https://loremflickr.com/400/300/guitar,tuner", category: "Accessories" },
  { name: "Guitar Stand", description: "Folding A-frame stand for electric or acoustic.", price: 24.99, stock_count: 16, image_url: "https://loremflickr.com/400/300/guitar,stand", category: "Accessories" },
  { name: "String Set - Electric 10-46", description: "Nickel-wound electric guitar strings, regular gauge.", price: 8.99, stock_count: 45, image_url: "https://loremflickr.com/400/300/guitar,strings", category: "Accessories" },
];

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    description TEXT
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) UNIQUE,
    description TEXT,
    price DECIMAL(10,2),
    quantity INTEGER,
    imageURL TEXT,
    password VARCHAR(255),
    categoryID INTEGER,

    CONSTRAINT fk_category
        FOREIGN KEY (categoryID)
        REFERENCES categories(id)
        ON DELETE RESTRICT
);
`

async function populate() {
    console.log("connecting...");
    const CLIENT = new Client(`postgresql://${process.env.ROLE_NAME}:${process.env.ROLE_PASSWORD}@${process.env.HOST}`);
    await CLIENT.connect();
    console.log("creating tables...")
    await CLIENT.query(SQL)
    const CAT_ID = {}
    let i = 1;
    console.log("inserting into categories...")
    for(const cat of categories)
    {
        await CLIENT.query("INSERT INTO categories(name,description) VALUES ($1 , $2);" , [cat.name,cat.description])
        CAT_ID[cat.name] = i;
        i++;
    }
    console.log("inserting into items...");
    for (const item of items)
    {
        await CLIENT.query("INSERT INTO items (name , description , price , quantity , imageURL , password , categoryID ) VALUES ($1,$2,$3,$4,$5,$6,$7);",[item.name,item.description,item.price,item.stock_count,item.image_url,process.env.ITEM_PASSWORD , CAT_ID[item.category]])
    }
    console.log("closing connection...")
    CLIENT.end();
    console.log("done")
}

populate();

