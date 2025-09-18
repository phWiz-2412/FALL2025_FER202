// ssum(...nums) trả về tổng các số hợp lệ (bỏ NaN, string không số).
function sum(...nums) {
  const validNums = nums.filter(n => typeof n === 'number' && !isNaN(n));
  return validNums.reduce((acc, cur) => acc + cur, 0);
}
console.log(sum(1, 2, 3)); // Should print 6
console.log(sum(1,'x',4)); // Should print 5


//avg(...nums) trả về trung bình (2 chữ số thập phân), nếu rỗng trả 0.
function avg(...nums) {
  const validNums = nums.filter(n => typeof n === 'number' && !isNaN(n));
  if (validNums.length === 0) return 0;

  const total = validNums.reduce((acc, cur) => acc + cur, 0);
  return parseFloat((total / validNums.length).toFixed(2));
}
console.log(avg(1, 2, 3, 4));   // Should print 2.5
console.log(avg()); // Should print false
