const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 22 },
  { name: "Kim", age: 15 }
];

people
  .filter(p => p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`)
  .forEach(str => console.log(str));


