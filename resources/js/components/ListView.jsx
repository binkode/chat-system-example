import { forwardRef, useCallback } from "react";
import Loader from "./Loader.jsx";
import { fastMemo } from "../func";

const ListView = fastMemo(
  forwardRef(({ data, RenderFooter, RenderItem, inverted, loading }, ref) => {
    const Items = useCallback(
      ({ RenderItem }) =>
        data.map((item, key) => (
          <RenderItem
            item={item}
            key={typeof item === "number" ? item : item?.id || key}
          />
        )),
      [data]
    );

    return (
      <div
        style={{
          transform: inverted && "scaleY(-1)",
        }}
        className="flex flex-col p-1"
      >
        {loading && <Loader />}
        <Items RenderItem={RenderItem} />
        {RenderFooter && <RenderFooter />}
      </div>
    );
  })
);

export default ListView;
