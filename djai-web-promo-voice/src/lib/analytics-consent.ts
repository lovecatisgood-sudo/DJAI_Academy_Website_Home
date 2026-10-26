// Reuse the main site's persisted consent on the promotion landing pages.
// Visitors without a valid analytics choice generate no Analytics request.
export function analyticsConsentScript(gaId: string): string {
  if (!/^G-[A-Z0-9]+$/.test(gaId)) throw new Error("Invalid Analytics measurement ID");
  return `(function(){
    window.dataLayer=window.dataLayer||[];
    window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
    window.gtag('consent','default',{
      analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',
      ad_personalization:'denied',personalization_storage:'denied',functionality_storage:'granted',security_storage:'granted'
    });
    window.gtag('set','ads_data_redaction',true);
    try{
      var choice=JSON.parse(window.localStorage.getItem('djai_consent_v1')||'null');
      var age=choice&&Date.now()-choice.savedAt;
      if(!choice||choice.version!==1||choice.analytics!==true||typeof choice.advertising!=='boolean'||typeof choice.savedAt!=='number'||!Number.isFinite(choice.savedAt)||age<0||age>15552000000)return;
      window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
      if(document.getElementById('djai-google-analytics'))return;
      var script=document.createElement('script');
      script.id='djai-google-analytics';script.async=true;
      script.src='https://www.googletagmanager.com/gtag/js?id='+${JSON.stringify(gaId)};
      document.head.appendChild(script);
      window.gtag('js',new Date());
      window.gtag('config',${JSON.stringify(gaId)},{cookie_domain:'auto'});
    }catch(error){}
  })();`;
}
