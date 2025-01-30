const modifyCookieTime = (nomeCookie: string, dias: number) =>
  window.STOREFRONT.USER.subscribe((_) => {
    const cookies = document.cookie.split("; ");

    for (let cookie of cookies) {
        let [nome, valor] = cookie.split("=", 2);

        if (nome === nomeCookie) {
            let expiracao = new Date();
            expiracao.setTime(expiracao.getTime() + (dias * 24 * 60 * 60 * 1000));

            const domain = window.location.hostname.replace(/^www\./, "");

            document.cookie = `${nome}=${valor}; expires=${expiracao.toUTCString()}; path=/; domain=${domain}; Secure; SameSite=Strict`;
            return;
        }
    }
  });

  export default  modifyCookieTime