import { initRibbon } from './Shared/Components/Ribbon';

document.addEventListener("readystatechange", function () {
    if (document.readyState === 'complete') {        
        initRibbon();
    }
});