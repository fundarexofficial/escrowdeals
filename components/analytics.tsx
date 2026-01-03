"use client";

import { useEffect } from "react";

export function Analytics() {
  useEffect(() => {
    // Google Tag Manager
    if (process.env.NEXT_PUBLIC_GTM_ID) {
      const gtmScript = document.createElement("script");
      gtmScript.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
      `;
      document.head.appendChild(gtmScript);

      // GTM noscript
      const gtmNoscript = document.createElement("noscript");
      const gtmIframe = document.createElement("iframe");
      gtmIframe.src = `https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`;
      gtmIframe.height = "0";
      gtmIframe.width = "0";
      gtmIframe.style.display = "none";
      gtmIframe.style.visibility = "hidden";
      gtmNoscript.appendChild(gtmIframe);
      document.body.insertBefore(gtmNoscript, document.body.firstChild);
    }

    // Google Analytics 4
    if (process.env.NEXT_PUBLIC_GA_TRACKING_ID) {
      const gaScript = document.createElement("script");
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`;
      gaScript.async = true;
      document.head.appendChild(gaScript);

      const gaConfigScript = document.createElement("script");
      gaConfigScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
      `;
      document.head.appendChild(gaConfigScript);
    }
  }, []);

  return null;
}
