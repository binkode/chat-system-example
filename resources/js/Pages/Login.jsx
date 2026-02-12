import { memo, useState, useEffect } from "react";
import Head from "../components/Head.jsx";
import { useForm, usePage } from "@inertiajs/react";
import ImageLight from "../assets/img/login-office.jpeg";

import { useUsers } from "../func/async/user";
import Button from "../components/UI/Button.jsx";
import Select from "react-select";

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

  const [, setSelected] = useState(data?.[0]);

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

  const options = data?.map(({ name, email }) => ({
    value: email,
    label: name,
  }));

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
                <label>
                  <span>Email</span>
                  <Select
                    className="mt-1"
                    type="email"
                    placeholder="Choose account"
                    isLoading={loading}
                    isSearchable
                    options={options}
                    onChange={onChangeList}
                  />
                </label>
                <Button type="submit" className="mt-4">
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
