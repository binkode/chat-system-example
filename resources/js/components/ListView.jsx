import { memo, forwardRef } from "react";
import Loader from "./Loader.jsx";

const ListView = memo(
  forwardRef(({ data, RenderFooter, RenderItem, inverted, loading }, ref) => {
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
  })
);

export default ListView;
