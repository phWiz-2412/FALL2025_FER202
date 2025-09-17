const ages = [33, 12, 20, 16, 19, 25, 13];

const stats = ages.reduce((acc, age) => {
  acc.total += age;
  acc.min = Math.min(acc.min, age);
  acc.max = Math.max(acc.max, age);
  if (age >= 13 && age <= 19) acc.buckets.teen++;
  if (age >= 20) acc.buckets.adult++;
  return acc;
}, { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } });

console.log(`Total: ${stats.total}, Min: ${stats.min}, Max: ${stats.max}`);
console.log('Buckets:', stats.buckets);
