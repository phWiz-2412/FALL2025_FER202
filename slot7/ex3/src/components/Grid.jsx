// components/Grid.js
export default function Grid() {
  return (
    <div className="container my-4">
      {/* Hàng 1: 2 cột */}
      <div className="row g-0">
        <div className="col-md-6 border p-3">First col</div>
        <div className="col-md-6 border p-3">Second col</div>
      </div>
      
      {/* Hàng 2: 3 cột */}
      <div className="row g-0">
        <div className="col-md-4 border p-3">col</div>
        <div className="col-md-4 border p-3">col</div>
        <div className="col-md-4 border p-3">col</div>
      </div>

      {/* Hàng 3: 4 cột */}
      <div className="row g-0">
        <div className="col-md-3 border p-3">col</div>
        <div className="col-md-3 border p-3">col</div>
        <div className="col-md-3 border p-3">col</div>
        <div className="col-md-3 border p-3">col</div>
      </div>
    </div>
  );
}