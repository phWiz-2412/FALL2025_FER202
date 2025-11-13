import { useSelector, useDispatch } from "react-redux";
import { createPayment } from "../redux/payments/paymentsThunks";
import { useState } from "react";
import { selectSuccessfulPayments } from "../redux/selectors/paymentsSelectors";

export default function PaymentsPage() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.payments);
  const successPayments = useSelector(selectSuccessfulPayments);
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPayment({ amount: Number(amount), status: "SUCCESS" }));
    setAmount("");
  };

  return (
    <div>
      <h3>Payments</h3>

      <form className="mb-3" onSubmit={handleSubmit}>
        <input
          type="number"
          className="form-control w-25"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <button className="btn btn-success mt-2">Create Payment</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <h5 className="mt-3">All Payments</h5>
      <ul className="list-group">
        {list.map((p) => (
          <li key={p.id} className="list-group-item">
            #{p.id} — {p.amount}$ — {p.status}
          </li>
        ))}
      </ul>

      <h5 className="mt-4">Successful Payments</h5>
      <ul className="list-group">
        {successPayments.map((p) => (
          <li key={p.id} className="list-group-item text-success fw-bold">
            #{p.id} — {p.amount}$
          </li>
        ))}
      </ul>
    </div>
  );
}
