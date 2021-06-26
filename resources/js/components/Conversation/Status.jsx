import { fastMemo } from "../../func";
import { DoubleCheck, Sent } from "../../icons";

import { useConversationEventType } from "../../func/hooks";

export const MessageStatus = fastMemo(
  ({ sending, notSent, conversationId, created_at, className = "" }) => {
    const eventType = useConversationEventType(conversationId, created_at);

    return (
      <div className={`ml-2 ${className}`}>
        {eventType ? (
          eventType === "read" ? (
            <DoubleCheck
              className={`w-4 h-4 text-blue-600 fill-current mr-1 ${className}`}
            />
          ) : (
            <DoubleCheck className={`w-4 h-4 mr-1 fill-current ${className}`} />
          )
        ) : sending || notSent === true ? (
          <Sent fill={`grey ${className}`} />
        ) : (
          <Sent className={`w-4 h-4 mr-1 fill-current ${className}`} />
        )}
      </div>
    );
  }
);
