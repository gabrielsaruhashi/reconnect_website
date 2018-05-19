var snhb = snhb || {};
snhb.globalSettings = {  
    currencyConversionEURTo: {
        USD: { year: 2018, month: 4, rate: 1.2276 }
    },
    bidderAdjustments: {
        "default": { c: "USD", s: 0.00 },
        "adform": { c: "USD", s: 0.15 },        
        "connectad": { c: "EUR", s: 0.00 },
        "connectadrealtime": { c: "EUR", s: 0.00 },        
        "criteo": { c: "EUR", s: 0.00 },
        "districtmDMX": { c: "USD", s: 0.15 },        
        "openx": { c: "EUR", s: 0.00 },        
        "pixfuture": { c: "USD", s: 0.40 },        
        "rubicon": { c: "USD", s: 0.15 },        
        "smartadserver": { c: "USD", s: 0.15 }
    }    
};
snhb.console.debug("Global settings loaded.");

