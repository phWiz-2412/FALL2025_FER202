import { useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import UserFilter from "../components/UserFilter";
import UserTable from "../components/UserTable";

export default function UserList() {
  const { fetchUsers } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-4">
        <UserFilter />
        <UserTable />
      </Container>
    </>
  );
}
