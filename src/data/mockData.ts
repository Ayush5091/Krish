export const farmer = {
  name: "Ravi Kumar",
  location: "Bantwal, D.K. District",
  region: "Mangaluru, Karnataka",
  trustScore: 92,
  avgFairPriceCapture: 94,
  districtAvgCapture: 71,
};

export const crops = [
  "Areca Nut",
  "Coconut",
  "Paddy",
  "Mango",
  "Tomato",
  "Cashew",
  "Pepper",
  "Rubber",
];

export const todayPrice = {
  crop: "Areca Nut",
  price: 412,
  unit: "kg",
  change: "+8%",
  period: "12 days",
  direction: "up" as const,
};

export const oracleData = {
  fairPriceToday: 412,
  predictedIn14Days: 445,
  recommendedFloor: 390,
  crop: "Areca Nut",
};

export const farmerListings = [
  {
    id: "1",
    crop: "Areca Nut",
    quantity: 120,
    quality: "A",
    askingPrice: 410,
    status: "Matched" as const,
    buyer: {
      name: "Ganesh Traders, Mangaluru",
      offeredPrice: 405,
      trustScore: 87,
    },
    oraclePrice: 412,
    date: "2024-12-18",
  },
  {
    id: "2",
    crop: "Coconut",
    quantity: 500,
    quality: "B",
    askingPrice: 32,
    status: "Open" as const,
    buyer: null,
    oraclePrice: 30,
    date: "2024-12-20",
  },
  {
    id: "3",
    crop: "Areca Nut",
    quantity: 80,
    quality: "A",
    askingPrice: 415,
    status: "In Escrow" as const,
    buyer: {
      name: "Sri Lakshmi Trading Co.",
      offeredPrice: 412,
      trustScore: 91,
    },
    oraclePrice: 412,
    date: "2024-12-15",
  },
  {
    id: "4",
    crop: "Pepper",
    quantity: 25,
    quality: "A",
    askingPrice: 580,
    status: "Completed" as const,
    buyer: {
      name: "KS Spice Exports",
      offeredPrice: 575,
      trustScore: 94,
    },
    oraclePrice: 570,
    date: "2024-12-10",
  },
];

export const transactionHistory = [
  { crop: "Areca Nut", priceReceived: 405, oraclePrice: 412, fairPercent: 98, date: "Dec 18" },
  { crop: "Pepper", priceReceived: 575, oraclePrice: 570, fairPercent: 101, date: "Dec 10" },
  { crop: "Areca Nut", priceReceived: 395, oraclePrice: 408, fairPercent: 97, date: "Nov 28" },
  { crop: "Coconut", priceReceived: 28, oraclePrice: 30, fairPercent: 93, date: "Nov 15" },
  { crop: "Areca Nut", priceReceived: 380, oraclePrice: 400, fairPercent: 95, date: "Nov 02" },
];

export const recommendedBuyers = [
  { name: "KS Spice Exports", trustScore: 94, location: "Mangaluru", recentDeals: 45 },
  { name: "Sri Lakshmi Trading Co.", trustScore: 91, location: "Puttur", recentDeals: 38 },
  { name: "Ganesh Traders", trustScore: 87, location: "Mangaluru", recentDeals: 62 },
];

export const priceAlerts = [
  { id: "1", crop: "Areca Nut", threshold: 430, direction: "above" as const, method: "SMS", active: true },
];

// Regulator data
export const districtExploitation = [
  { name: "Dakshina Kannada", score: 72, color: "#e74c3c" },
  { name: "Udupi", score: 45, color: "#e67e22" },
  { name: "Uttara Kannada", score: 58, color: "#e67e22" },
  { name: "Hassan", score: 82, color: "#c0392b" },
  { name: "Chikmagalur", score: 35, color: "#f39c12" },
  { name: "Shimoga", score: 61, color: "#e74c3c" },
  { name: "Kodagu", score: 28, color: "#27ae60" },
  { name: "Mysuru", score: 55, color: "#e67e22" },
  { name: "Mandya", score: 68, color: "#e74c3c" },
  { name: "Tumkur", score: 48, color: "#e67e22" },
  { name: "Belgaum", score: 75, color: "#e74c3c" },
  { name: "Dharwad", score: 42, color: "#f39c12" },
];

export const flaggedTraders = [
  {
    id: "1",
    name: "Shivappa Traders",
    district: "Puttur, D.K.",
    priceGapScore: 2.8,
    farmersAffected: 23,
    exploitationScore: 91,
  },
  {
    id: "2",
    name: "Mahesh Agri Corp",
    district: "Hassan",
    priceGapScore: 2.4,
    farmersAffected: 18,
    exploitationScore: 84,
  },
  {
    id: "3",
    name: "Naveen Commodities",
    district: "Shimoga",
    priceGapScore: 2.1,
    farmersAffected: 15,
    exploitationScore: 78,
  },
  {
    id: "4",
    name: "Prakash Trading Hub",
    district: "Belgaum",
    priceGapScore: 1.9,
    farmersAffected: 12,
    exploitationScore: 71,
  },
];

export const traderDetail = {
  name: "Shivappa Traders",
  district: "Puttur, D.K.",
  exploitationScore: 91,
  avgPriceGap: 2.8,
  farmersThisMonth: 23,
  totalTransactions: 156,
  connectedFarmers: [
    { name: "Ravi Kumar", priceGap: 1.8, trustScore: 92 },
    { name: "Suresh Poojary", priceGap: 3.2, trustScore: 78 },
    { name: "Ganesha Shetty", priceGap: 2.5, trustScore: 85 },
    { name: "Manjunath B.", priceGap: 3.1, trustScore: 71 },
    { name: "Krishnappa", priceGap: 2.9, trustScore: 68 },
    { name: "Ramesh Gowda", priceGap: 3.5, trustScore: 62 },
  ],
};

// Buyer data
export const availableListings = [
  { id: "1", crop: "Areca Nut", farmer: "Ravi Kumar", location: "Bantwal", quantity: 120, askingPrice: 410, oraclePrice: 412, quality: "A" },
  { id: "2", crop: "Coconut", farmer: "Suresh P.", location: "Sullia", quantity: 500, askingPrice: 32, oraclePrice: 30, quality: "B" },
  { id: "3", crop: "Pepper", farmer: "Ganesha S.", location: "Puttur", quantity: 40, askingPrice: 585, oraclePrice: 570, quality: "A" },
  { id: "4", crop: "Paddy", farmer: "Manjunath B.", location: "Hassan", quantity: 1000, askingPrice: 22, oraclePrice: 21, quality: "B" },
  { id: "5", crop: "Mango", farmer: "Krishnappa", location: "Ramanagara", quantity: 200, askingPrice: 45, oraclePrice: 42, quality: "A" },
];

// FPO data
export const fpoMembers = [
  { name: "Ravi Kumar", vulnerabilityScore: 12, trustScore: 92, crops: "Areca Nut" },
  { name: "Suresh Poojary", vulnerabilityScore: 45, trustScore: 78, crops: "Coconut, Areca Nut" },
  { name: "Ganesha Shetty", vulnerabilityScore: 28, trustScore: 85, crops: "Pepper" },
  { name: "Manjunath B.", vulnerabilityScore: 62, trustScore: 71, crops: "Paddy" },
  { name: "Krishnappa", vulnerabilityScore: 55, trustScore: 68, crops: "Areca Nut" },
  { name: "Ramesh Gowda", vulnerabilityScore: 71, trustScore: 62, crops: "Coconut" },
];

export const pooledListings = [
  { crop: "Areca Nut", totalQuantity: 450, farmers: 6, askingPrice: 410, status: "Active" },
  { crop: "Coconut", totalQuantity: 1200, farmers: 4, askingPrice: 31, status: "Matched" },
];
