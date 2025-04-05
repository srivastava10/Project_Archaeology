export interface Excavation {
  id: string;
  name: string;
  location: [number, number]; //Latitude and Longitude
  dateStarted: string;
  description: string;
  archaeologistName: string;
}

export const excavations: Excavation[] = [
  {
    id: "1",
    name: "Harappa Excavation",
    location: [72.8679, 30.6280],
    dateStarted: "1921-01-15",
    description: "One of the major sites of the Indus Valley Civilization, revealing advanced urban planning and drainage systems.",
    archaeologistName: "Sir John Marshall"
  },
  {
    id: "2",
    name: "Mohenjo-daro",
    location: [68.1389, 27.3290],
    dateStarted: "1922-03-01",
    description: "The largest settlement of the ancient Indus Valley Civilization, known for its sophisticated architecture.",
    archaeologistName: "R. D. Banerji"
  },
  {
    id: "3",
    name: "Dholavira",
    location: [70.2122, 23.8866],
    dateStarted: "1967-10-15",
    description: "A Harappan city showcasing unique water conservation systems and large reservoirs.",
    archaeologistName: "J. P. Joshi"
  },
  {
    id: "4",
    name: "Kalibangan",
    location: [74.1319, 29.4709],
    dateStarted: "1960-02-20",
    description: "Revealed evidence of the earliest ploughed agricultural field and fire altars.",
    archaeologistName: "A. Ghosh"
  },
  {
    id: "5",
    name: "Lothal",
    location: [72.2514, 22.5214],
    dateStarted: "1954-11-05",
    description: "Ancient port city with the world's earliest known dockyard.",
    archaeologistName: "S. R. Rao"
  },
  {
    id: "6",
    name: "Rakhigarhi",
    location: [76.1119, 29.2915],
    dateStarted: "1963-08-12",
    description: "Largest site of the Indus Valley Civilization in India, showing evidence of craft production.",
    archaeologistName: "V. S. Shinde"
  },
  {
    id: "7",
    name: "Sanauli",
    location: [77.1025, 28.7041],
    dateStarted: "2005-06-20",
    description: "Discovered royal burials with chariots and weapons from the late Harappan period.",
    archaeologistName: "S. K. Manjul"
  },
  {
    id: "8",
    name: "Daimabad",
    location: [74.7000, 19.5000],
    dateStarted: "1958-09-10",
    description: "Late Harappan site with evidence of early farming communities.",
    archaeologistName: "H. D. Sankalia"
  },
  {
    id: "9",
    name: "Surkotada",
    location: [70.8333, 23.6167],
    dateStarted: "1964-04-15",
    description: "Important Harappan site with evidence of horse remains.",
    archaeologistName: "J. P. Joshi"
  },
  {
    id: "10",
    name: "Banawali",
    location: [75.2333, 29.5833],
    dateStarted: "1973-07-01",
    description: "Harappan site showing evidence of early town planning and craft specialization.",
    archaeologistName: "R. S. Bisht"
  }
]; 