export function Execrise2() {
  const numbers = [1, -20, 13, 4, -5, 6, 87, 68, 39, 10];
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const names = ["Dung", "Ngoc", "Bao", "Hong", "Cuong"];

  const people = [
    { id: 1, name: "Dung", age: 20 },
    { id: 2, name: "Ngoc", age: 12 },
    { id: 3, name: "Bao", age: 9 },
    { id: 4, name: "Hong", age: 1 },
    { id: 5, name: "Cuong", age: 23 },
    { id: 6, name: "An", age: 16 },
    { id: 7, name: "Binh", age: 92 },
    { id: 8, name: "Chi", age: 13 },
    { id: 9, name: "Duc", age: 11 },
    { id: 10, name: "Em", age: 15 },
    // thêm người tuổi teen để test
    { id: 11, name: "Khanh", age: 15 },
    { id: 12, name: "Linh", age: 18 },
  ];

  const Teenlist = people.filter((person) => person.age >= 13 && person.age <= 19);
  const teenCount = Teenlist.length;
  const avgAge = teenCount > 0 
    ? (Teenlist.reduce((sum, person) => sum + person.age, 0) / teenCount).toFixed(1)
    : 0;

  return (
    <div>
      <h2>Chi tiết bài tập 2</h2>

      <p>Các phần tử của mảng là:</p>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>

      <p>
        Tổng các phần tử của mảng là: <strong>{sum}</strong>
      </p>
      <p>
        Số lượng các phần tử trong mảng là: <strong>{numbers.length}</strong>
      </p>

      <p>Hiển thị danh sách tên tăng dần:</p>
      <ul>
        {[...names].sort().map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>

      <p>Hiển thị danh sách người tuổi teen (13-19):</p>
      <ul>
        {Teenlist.length > 0 ? (
          Teenlist.map((person) => (
            <li key={person.id}>
              {person.name} - {person.age} tuổi
            </li>
          ))
        ) : (
          <li>Không có người nào trong độ tuổi teen</li>
        )}
      </ul>

      {Teenlist.length > 0 && (
        <>
          <p>Số lượng người tuổi teen: <strong>{teenCount}</strong></p>
          <p>Tuổi trung bình của nhóm tuổi teen: <strong>{avgAge}</strong></p>
        </>
      )}
    </div>
  );
}
