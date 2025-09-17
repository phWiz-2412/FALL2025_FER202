const person = {
  name: "Alice",
  address: {
    street: "123 Main St"
    // city không có
  }
};

const {
  address: {
    street,
    city = "Unknown City"
  }
} = person;

console.log(street); // 123 Main St
console.log(city);   // Unknown City
