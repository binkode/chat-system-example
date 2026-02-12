import { memo, useState, useEffect, useMemo } from "react";
import Head from "../components/Head.jsx";
import { useForm, usePage, Link } from "@inertiajs/react";
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

  const [selected, setSelected] = useState(null);

  const onSuccess = ({ data }) => {
    const first = data?.[0];

    if (!first) {
      return;
    }

    const initial = {
      value: first.email,
      label: first.name,
    };

    setSelected(initial);
    setData("email", initial.value);
  };

  const {
    loading,
    data: { data } = {},
  } = useUsers({ onSuccess }, []);

  useEffect(() => {
    setData("password", "password");
  }, []);

  function onChangeList(option) {
    setSelected(option);
    setData("email", option?.value || "");
  }

  function submit(e) {
    e.preventDefault();
    post("/api" + url);
  }

  const options = data?.map(({ name, email }) => ({
    value: email,
    label: name,
  }));

  const selectStyles = useMemo(
    () => ({
      control: (base, state) => ({
        ...base,
        minHeight: 48,
        borderRadius: 14,
        borderColor: state.isFocused
          ? "rgba(56, 189, 248, 0.55)"
          : "rgba(148, 163, 184, 0.25)",
        boxShadow: "none",
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        ":hover": {
          borderColor: "rgba(148, 163, 184, 0.4)",
        },
      }),
      valueContainer: (base) => ({
        ...base,
        padding: "0 12px",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#e2e8f0",
      }),
      input: (base) => ({
        ...base,
        color: "#e2e8f0",
      }),
      placeholder: (base) => ({
        ...base,
        color: "#94a3b8",
      }),
      menu: (base) => ({
        ...base,
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid rgba(148, 163, 184, 0.2)",
        backgroundColor: "rgba(2, 6, 23, 0.95)",
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused
          ? "rgba(56, 189, 248, 0.2)"
          : "transparent",
        color: "#e2e8f0",
        cursor: "pointer",
      }),
      indicatorSeparator: (base) => ({
        ...base,
        backgroundColor: "rgba(148, 163, 184, 0.3)",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#94a3b8",
      }),
    }),
    [],
  );

  return (
    <form onSubmit={submit}>
      <Head title="Login" />

      <div className="landing-bg relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="landing-orb landing-orb-left" />
        <div className="landing-orb landing-orb-right" />

        <div className="relative z-10 mx-auto grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/65 shadow-[0_50px_130px_rgba(2,6,23,0.55)] backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden h-full min-h-[620px] lg:block">
            <img
              aria-hidden="true"
              className="h-full w-full object-cover"
              src={ImageLight}
              alt="Office"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/55 to-cyan-900/45" />

            <div className="absolute inset-x-8 bottom-8">
              <div className="landing-card border-white/10 bg-slate-950/55 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">
                  ChatSystem Demo
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">
                  Test realtime chat in minutes.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-200/80">
                  Pick a seeded account to explore channels, presence updates,
                  and message delivery with no setup friction.
                </p>
              </div>
            </div>
          </section>

          <section className="flex items-center p-6 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 space-y-3">
                <Link
                  href={route("home")}
                  className="inline-block bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 bg-clip-text text-sm font-semibold uppercase tracking-[0.2em] text-transparent"
                >
                  ChatSystem
                </Link>
                <h1 className="text-3xl font-semibold text-white">Sign in</h1>
                <p className="text-sm text-slate-300/85">
                  Choose any demo account to continue.
                </p>
              </div>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Account
                </span>
                <Select
                  placeholder="Choose account"
                  isLoading={loading}
                  isSearchable
                  options={options}
                  value={selected}
                  onChange={onChangeList}
                  styles={selectStyles}
                />
              </label>

              <Button
                type="submit"
                className="mt-6 w-full justify-center rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 py-3 text-sm font-semibold text-slate-950"
              >
                Continue to chat
              </Button>

              <p className="mt-5 text-xs text-slate-400">
                Demo password is prefilled as <span className="text-slate-300">password</span>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
});

export default Login;
