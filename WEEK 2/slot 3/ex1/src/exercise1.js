// double(n): Trả về gấp đôi giá trị n
// Cách 1
const double1 = (x) => x * 2;
console.log(double1(5)); // Should print 10

// Cách 2
function double2(x) {
    return x * 2;
}
console.log(double2(5)); // Should print 10

// Cách 3
const double3 = function(x) {
    return x * 2;
}  
console.log(double3(5)); // Should print 10

// isEven(n): Trả về true nếu n là số chẵn, ngược lại trả về false
const isEven1 = (n) => n % 2 === 0;
console.log(isEven1(4));
console.log(isEven1(5));
