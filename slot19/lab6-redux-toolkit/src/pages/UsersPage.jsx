import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/users/usersThunks";
import { toggleAdmin } from "../redux/users/usersSlice";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { list, isLoading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div>
      <h3>Users List</h3>
      <ul className="list-group">
        {list.map((user) => (
          <li key={user.id} className="list-group-item d-flex justify-content-between">
            <div>
              <b>{user.name}</b>  
              <span className="ms-2 badge bg-secondary">{user.isAdmin ? "Admin" : "User"}</span>
            </div>

            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => dispatch(toggleAdmin(user.id))}
            >
              Toggle Admin
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
