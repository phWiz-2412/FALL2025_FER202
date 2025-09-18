const companies = [
  { name: "A", category: "Tech", start: 2000, end: 2020 },
  { name: "B", category: "Finance", start: 1999, end: 2005 },
  { name: "C", category: "Retail", start: 2010, end: 2015 },
  { name: "D", category: "Auto", start: 2012, end: 2018 }
];

const sorted = [...companies].sort((a, b) => a.end - b.end);

sorted.slice(0, 3).forEach(c => {
  console.log(`${c.name} - ${c.end}`);
});
