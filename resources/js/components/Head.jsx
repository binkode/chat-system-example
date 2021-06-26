import { InertiaHead } from "@inertiajs/inertia-react";

const Site = ({ title: title_, children }) => {
  return (
    <InertiaHead>
      <title>{title_ ? `${title_} - ChatSystem` : "ChatSystem"}</title>
      {children}
    </InertiaHead>
  );
};

export default Site;
