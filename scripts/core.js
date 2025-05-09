/**
 * This is rnarian's JQuery plugin Anchor link generator *lightly* refactored
 * by myself to instead be a vanilla Javascript function to avoid the JQuery
 * dependency.
 *
 * See rnarian's original plugin here:
 *   https://www.jqueryscript.net/other/jQuery-Plugin-To-Add-Unique-Anchor-Links-To-Headlines-anchor-js.html
 * And browse his other jqueryscript contributions here:
 *   https://www.jqueryscript.net/plus/search.php?keyword=rnarian
 */
function insertAnchors(options) {
    var defaults = {
        headingClass: "anchored",
        anchorClass:  "anchor",
        symbol:       "¶",
        maxLength:    100
    };
    var opt = Object.assign({}, defaults, options),
        usedNames = [];

    var cleanName = function (name) {
        var cleaned = name.replace(/[^a-z0-9\s]/gi, "")
                          .replace(/[_\s]/g, "-")
                          .replace(/ /g, "-").toLowerCase();
        return cleaned;
    };

    document.querySelectorAll(opt.query).forEach(function(header) {
        var name = header.textContent,
            count = 1,
            id;

        // Sanitize unwanted characters so the ID is clean
        if (name.length > opt.maxLength) {
            name = name.substring(0, opt.maxLength);
        }
        name = cleanName(name);

        // Make sure the anchor isn't already in use
        if (usedNames[name] >= 1) {
            count = usedNames[name] + 1;
            id = name + "-" + count;
        } else {
            id = name;
        }

        header.classList.add(opt.headingClass);
        header.id = id;

        var a = document.createElement("a");
        a.classList.add(opt.anchorClass);
        a.href = "#" + id;
        a.textContent = opt.symbol;
        header.appendChild(a);

        usedNames[name] = count;
    });
};

/**
 * Shoutout to Timo Huovinen for his working alternative to
 * JQuery's $(document).ready method.
 * https://stackoverflow.com/a/7053197
 */
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
        return;
    }
    document.addEventListener('DOMContentLoaded', fn);
}
ready(function() {
    // Generate hoverable anchor links (when applicable)
    insertAnchors({
        symbol: "¶",
        query: "h2"
    });

    // Other processing to apply AFTER initial DOM load goes here.
});