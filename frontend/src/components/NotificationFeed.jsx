import { useState, useRef } from "react";
import {
  KnockProvider,
  KnockFeedProvider,
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/store";

// Required CSS import, unless you're overriding the styling
import "@knocklabs/react/dist/index.css";

const NotificationFeed = () => {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const [user] = useAtom(userAtom);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <KnockProvider
      apiKey={process.env.REACT_APP_KNOCK_PUBLIC_API_KEY}
      userId={user._id}
    >
      <KnockFeedProvider feedId={process.env.REACT_APP_KNOCK_FEED_CHANNEL_ID}>
        <>
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={toggleVisibility}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
        </>
      </KnockFeedProvider>
    </KnockProvider>
  );
};

export default  NotificationFeed;