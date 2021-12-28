import { forwardRef, useCallback } from "react";
import Loader from "./Loader.jsx";
import { fastMemo } from "../func";

const ListView = fastMemo(
  forwardRef(
    (
      {
        data,
        RenderFooter,
        RenderItem,
        inverted,
        loading,
        style = {},
        className = "",
        id,
        reversed,
      },
      ref
    ) => {
      const Items = useCallback(
        ({ RenderItem }) =>
          (reversed ? data.slice().reverse() : data).map((item, key) => (
            <RenderItem
              item={item}
              key={typeof item === "number" ? item : item?.id || key}
            />
          )),
        [data, reversed]
      );

      return (
        <div
          ref={ref}
          id={id}
          style={{
            transform: inverted && "scaleY(-1)",
            ...style,
          }}
          className={"flex flex-col p-1 " + className}
        >
          {loading && <Loader />}
          <Items RenderItem={RenderItem} />
          {RenderFooter && <RenderFooter />}
        </div>
      );
    }
  )
);

export default ListView;
