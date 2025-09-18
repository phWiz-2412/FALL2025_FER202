const companies = [
  { name: "A", category: "Tech", start: 2000, end: 2020 },
  { name: "B", category: "Finance", start: 1999, end: 2005 },
  { name: "C", category: "Retail", start: 2010, end: 2015 },
];

const company0New = { ...companies[0], start: companies[0].start + 1 };

console.log(companies[0]);   // không đổi
console.log(company0New);    // start đã +1

// Gộp mảng với rest
function concatAll(...arrays) {
  return arrays.flat();
}

console.log(concatAll([1,2],[3],[4,5]));  // [1,2,3,4,5]
