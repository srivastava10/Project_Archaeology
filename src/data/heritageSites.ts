
export interface HeritageSite {
  id: string;
  name: string;
  location: [number, number];
  description: string;
  yearInscribed: number;
  type: "Cultural" | "Natural" | "Mixed";
  imageUrl?: string;
}

export const heritageSites: HeritageSite[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    location: [78.0422, 27.1751],
    description: "An ivory-white marble mausoleum on the right bank of the river Yamuna, built by Mughal emperor Shah Jahan in memory of his favorite wife.",
    yearInscribed: 1983,
    type: "Cultural",
    imageUrl: "images/taj_mahal.jpeg"
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    location: [75.7036, 20.5523],
    description: "Buddhist cave monuments dating from the 2nd century BCE to about 480 CE, featuring paintings and rock-cut sculptures.",
    yearInscribed: 1983,
    type: "Cultural",
    imageUrl: "images/ajanta.jpeg"
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    location: [75.1717, 20.0269],
    description: "A UNESCO World Heritage Site featuring Buddhist, Hindu and Jain cave temples and monuments built between the 6th and 10th century CE.",
    yearInscribed: 1983,
    type: "Cultural",
    imageUrl: "images/ellora.jpeg"
  },
  {
    id: "kaziranga",
    name: "Kaziranga National Park",
    location: [93.3502, 26.5769],
    description: "Home to the world's largest population of Indian one-horned rhinoceroses, as well as tigers, elephants, panthers and bears.",
    yearInscribed: 1985,
    type: "Natural",
    imageUrl: "images/kaziranga.jpeg"
  },
  {
    id: "great-living-chola",
    name: "Great Living Chola Temples",
    location: [79.1320, 10.7825],
    description: "Built by kings of the Chola Empire, these temples showcase the architecture and artistry of the Chola civilization.",
    yearInscribed: 1987,
    type: "Cultural",
    imageUrl: "images/chola.jpeg"
  },
  {
    id: "keoladeo",
    name: "Keoladeo National Park",
    location: [77.5049, 27.1599],
    description: "A famous avifauna sanctuary hosting thousands of birds, especially during winter when migratory birds visit.",
    yearInscribed: 1985,
    type: "Natural",
    imageUrl: "images/keoladeo.jpeg"
  },
  {
    id: "agra-fort",
    name: "Agra Fort",
    location: [78.0210, 27.1797],
    description: "The main residence of the emperors of the Mughal Dynasty until 1638, when the capital was shifted from Agra to Delhi.",
    yearInscribed: 1983,
    type: "Cultural",
    imageUrl: "images/agra_fort.jpeg"
  },
  {
    id: "qutb-minar",
    name: "Qutb Minar",
    location: [77.1855, 28.5244],
    description: "The tallest minaret in India, made of red sandstone and marble, built in 1193.",
    yearInscribed: 1993,
    type: "Cultural",
    imageUrl: "images/qutub.jpeg"
  },
  {
    id: "sun-temple",
    name: "Sun Temple, Konark",
    location: [86.0944, 19.8876],
    description: "A 13th-century Sun Temple built in the form of a giant chariot with elaborately carved stone wheels, pillars and walls.",
    yearInscribed: 1984,
    type: "Cultural",
    imageUrl: "images/konark.jpeg"
  },
  {
    id: "hampi",
    name: "Group of Monuments at Hampi",
    location: [76.4813, 15.3350],
    description: "The ruins of Hampi represent the last remnants of the Vijayanagara Empire from the 14th century.",
    yearInscribed: 1986,
    type: "Cultural",
    imageUrl: "images/hampi.jpeg"
  }
];

export interface MapLayer {
  id: string;
  name: string;
  description: string;
  url: string;
  type: "raster" | "vector";
}

export const mapLayers: MapLayer[] = [
  {
    id: "satellite",
    name: "Satellite Imagery",
    description: "High-resolution satellite imagery of the Indian subcontinent",
    url: "mapbox://styles/mapbox/satellite-v9",
    type: "raster"
  },
  {
    id: "rainfall",
    name: "Erosion Data",
    description: "Erosion data across India",
    url: "mapbox://styles/mapbox/light-v11",
    type: "vector"
  },
  {
    id: "geomorphology",
    name: "Topographical Data",
    description: "Topographical features of India",
    url: "mapbox://styles/mapbox/outdoors-v12",
    type: "vector"
  }
];
