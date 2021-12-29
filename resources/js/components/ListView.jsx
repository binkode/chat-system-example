import { forwardRef, useCallback, useMemo } from "react";
import Loader from "./Loader.jsx";
import { fastMemo } from "../func";
import { memoize } from "lodash";

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
      const map = useMemo(
        () =>
          memoize((item, key) => (
            <RenderItem
              item={item}
              key={typeof item === "number" ? item : item?.id || key}
            />
          )),
        [RenderItem]
      );

      const Items = useCallback(
        () => (reversed ? data.slice().reverse() : data).map(map),
        [data, reversed, map]
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
          <Items />
          {RenderFooter && <RenderFooter />}
        </div>
      );
    }
  )
);

export default ListView;
