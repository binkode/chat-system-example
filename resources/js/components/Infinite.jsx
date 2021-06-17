import { memo, forwardRef, useCallback } from "react";
import { animateScroll, Events } from "react-scroll";
import { usePagination } from "../func/async";
import ListView from "./ListView.jsx";
import Loader from "./Loader.jsx";
import { Button } from "@windmill/react-ui";

const Inifinite = memo(
  forwardRef(
    (
      {
        request,
        onSuccess,
        setData,
        params,
        name,
        RenderItem,
        inverted,
        reducer,
        style,
        ...rest
      },
      ref
    ) => {
      const {
        data = [],
        loaded,
        loading,
        isLoading,
        next,
        refresh,
        setState,
        getState,
        cleanup,
        pagination,
      } = usePagination(
        {
          request,
          setData,
          params,
          name,
          reducer,
          onSuccess,
          ...rest,
        },
        [params]
      );

      const _RenderItem = useCallback(
        (p) => (
          <RenderItem
            {...p}
            refresh={refresh}
            style={{ transform: inverted && "scaleY(-1)" }}
          />
        ),
        [inverted, RenderItem]
      );

      const RenderFooter = useCallback(
        () => (
          <>
            {loading && !isLoading ? (
              <Loader />
            ) : (
              pagination?.last_page > pagination?.current_page && (
                <Button
                  style={{
                    transform: inverted && "scaleY(-1)",
                  }}
                  onClick={() => next()}
                >
                  load more
                </Button>
              )
            )}
          </>
        ),
        [
          loading,
          inverted,
          isLoading,
          pagination?.last_page,
          pagination?.current_page,
        ]
      );

      if (ref) {
        if(!ref.current) ref.current = {};
        Object.assign(ref.current, { setState, getState });
      }

      return (
        <ListView
          data={data}
          inverted={inverted}
          RenderFooter={RenderFooter}
          RenderItem={_RenderItem}
          // style={_style}
          {...{
            // inverted,
            ref,
          }}
        />
      );
    }
  )
);

export default Inifinite;
