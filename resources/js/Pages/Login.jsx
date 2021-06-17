import { memo, useState, useEffect } from "react";
import Head from "../components/Head.jsx";
import { InertiaLink } from "@inertiajs/inertia-react";
import ImageLight from "../assets/img/login-office.jpeg";
import { Label, Input, Button, Select } from "@windmill/react-ui";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { useUsers } from "../func/async/user";

const Login = memo(() => {
  const { url } = usePage();

  const { setData, post } = useForm({
    password: "password",
    email: "",
  });

  const onSuccess = ({ data }) => {
    setData("email", data?.[0]?.email);
    setSelected(data?.[0]);
  };

  const { loading, data: { data } = {} } = useUsers({ onSuccess }, []);

  const [selected, setSelected] = useState(data?.[0]);

  function onChangeList(value) {
    setData("email", value);
    setSelected(value);
  }

  useEffect(() => {
    setData("password", "password");
  }, []);

  function submit(e) {
    e.preventDefault();
    post("/api" + url);
  }

  return (
    <form onSubmit={submit}>
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <Head title="Login" />
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <Label>
                  <span>Email</span>
                  <Select
                    className="mt-1"
                    type="email"
                    placeholder="john@doe.com"
                  >
                    {data &&
                      data.length &&
                      data.map(({ id, name, email }) => (
                        <option key={id + ""} value={email}>
                          {name}
                        </option>
                      ))}
                  </Select>
                </Label>

                {/*<Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                  />
                </Label>*/}

                <Button type="submit" className="mt-4" block>
                  Log in
                </Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </form>
  );
});

export default Login;
