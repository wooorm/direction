(()=>{var t="\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC",e="A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C\uFE00-\uFE6F\uFEFD-\uFFFF",a=new RegExp("^[^"+e+"]*["+t+"]"),i=new RegExp("^[^"+t+"]*["+e+"]");function r(o){var u=String(o||"");return a.test(u)?"rtl":i.test(u)?"ltr":"neutral"}var n=document.querySelector("textarea"),c=document.querySelector("output");n.addEventListener("input",F);F();function F(){c.textContent=r(n.value)}})();
