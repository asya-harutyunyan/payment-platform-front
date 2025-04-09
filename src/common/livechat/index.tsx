import { useEffect } from "react";

const loadLiveChat = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  if (window.LiveChatWidget) return; // Prevent multiple loads
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  window.__lc = window.__lc || {};
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  window.__lc.license = import.meta.env.VITE_LIVE_CHAT;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  window.__lc.integration_name = "manual_onboarding";
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  window.__lc.product_name = "livechat";

  const script = document.createElement("script");
  script.src = "https://cdn.livechatinc.com/tracking.js";
  script.async = true;
  script.type = "text/javascript";
  document.head.appendChild(script);
};

const LiveChatLoader = () => {
  useEffect(() => {
    loadLiveChat();
  }, []);

  return null; // It's just for loading the script
};

export default LiveChatLoader;
