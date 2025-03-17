const modifyCookieTime = (nameCookie: string, days: number) =>
  window.STOREFRONT.USER.subscribe((_) => {
    const cookies = document.cookie.split("; ");
    const shouldModifyCookie = !cookies.some(cookie => cookie.startsWith("modifyCookie="));

    if(shouldModifyCookie) {
        for (let cookie of cookies) {
          const [name] = cookie.split("=");
          const value = cookie.replace(`${name}=`,'');

          if (name === nameCookie) {
              let expiration = new Date();
              expiration.setTime(expiration.getTime() + (days * 24 * 60 * 60 * 1000));

              const domain = window.location.hostname.replace(/^www\./, "");

              document.cookie = `modifyCookie=true; expires=${expiration.toUTCString()}; path=/; domain=${domain}; Secure; SameSite=Strict`;
              document.cookie = `${name}=${value}; expires=${expiration.toUTCString()}; path=/; domain=${domain}; Secure; SameSite=Strict`;
              return;
          }
      }
    }
  });

export default modifyCookieTime;
