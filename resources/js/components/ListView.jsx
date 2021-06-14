import { memo } from "react";
import Loader from "./Loader.jsx";

const ListView = memo(
  ({ data, RenderFooter, RenderItem, inverted, loading }) => {
    return (
      <div
        style={{
          transform: inverted && "scaleY(-1)",
        }}
        className="flex flex-col p-1"
      >
        {loading && <Loader />}
        {data.map((d, key) => (
          <RenderItem {...{ item: d, key }} />
        ))}
        {RenderFooter && <RenderFooter />}
      </div>
    );
  }
);

export default ListView;
