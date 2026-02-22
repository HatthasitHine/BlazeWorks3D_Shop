import React, { useEffect } from 'react';

export default function FacebookChat({ pageId = "123456789012345" }) {
  useEffect(() => {
    // Inject FB SDK script
    const scriptId = 'facebook-jssdk';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.src = 'https://connect.facebook.net/th_TH/sdk/xfbml.customerchat.js';
      document.body.appendChild(script);
    }

    // Initialize FB SDK
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml            : true,
        version          : 'v18.0'
      });
    };
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div 
        className="fb-customerchat"
        attribution="biz_inbox"
        page_id={pageId}
      ></div>
    </>
  );
}
