import { Head } from "@inertiajs/react";

const Site = ({ title: title_, children }) => {
  return (
    <Head>
      <title>{title_ ? `${title_} - ChatSystem` : "ChatSystem"}</title>
      {children}
    </Head>
  );
};

export default Site;
