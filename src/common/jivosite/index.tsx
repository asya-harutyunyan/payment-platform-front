import { useEffect } from "react";

const JivoChat = () => {
  useEffect(() => {
    const widgetId = import.meta.env.VITE_JIVO_SITE;

    if (!widgetId) {
      console.error("Jivo widget ID is missing");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://code.jivosite.com/widget/${import.meta.env.VITE_JIVO_SITE}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default JivoChat;
