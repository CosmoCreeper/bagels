
function type(text, el, intvl) {
    if (!triggeredtype) {
        text = text.split("");
        setInterval(()=>{
            if (!text.length) {
                return clearInterval(interval);
            }
            el.innerHTML += text.shift();
        }, intvl);
    }
}

function isElementVisible(el) {
    var rect     = el.getBoundingClientRect(),
        vWidth   = window.innerWidth || document.documentElement.clientWidth,
        vHeight  = window.innerHeight || document.documentElement.clientHeight,
        efp      = function (x, y) { return document.elementFromPoint(x, y) };     

    // Return false if it's not in the viewport
    if (rect.right < 0 || rect.bottom < 0 
            || rect.left > vWidth || rect.top > vHeight)
        return false;

    // Return true if any of its four corners are visible
    return (
          el.contains(efp(rect.left,  rect.top))
      ||  el.contains(efp(rect.right, rect.top))
      ||  el.contains(efp(rect.right, rect.bottom))
      ||  el.contains(efp(rect.left,  rect.bottom))
    );
}

let triggeredtype = false;

setInterval(function(){
    let visible = isElementVisible(document.getElementsByTagName("header")[1]);
    if (visible) {
        type(" DAYS LEFT", document.getElementById("countdown"), 500);
        triggeredtype = true;
    }
}, 100);
