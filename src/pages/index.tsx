import Card from "components/Card";
import { useCurrentUser, useLogout } from "features/authentication";
import { Button, Dropdown } from "components";

const options = [
  { value: "settings", label: "Account settings" },
  { value: "info", label: "Account info" },
];

const Home = () => {
  const { user } = useCurrentUser();
  const logout = useLogout();

  return (
    <Card>
      <Dropdown label="Options">
        {options.map((option) => (
          <Dropdown.Item key={option.value}>{option.label}</Dropdown.Item>
        ))}
      </Dropdown>
      <h1 className="text-3xl font-bold underline text-blue">Hello world!</h1>
      <h1 className="text-3xl font-bold underline text-blue-light">
        Hello world!
      </h1>
      <h1 className="text-3xl font-bold underline text-blue-dark">
        Hello world!
      </h1>
      <Button onClick={logout}>Logout</Button>
      <h1 className="text-3xl font-bold text-blue-900 underline">
        Hello world!
      </h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Card>
  );
};

Home.mainLayoutProps = {
  title: "Talents Valley Home",
  pageDescription: "Home page description",
};

export default Home;
