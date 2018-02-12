(function(window, document, jQuery) {
    window.SLI = window.SLI || {};
    SLI.jQuery = SLI.jQuery || jQuery;
    SLI.rac = { base: location.protocol + "//parkcameras.resultspage.com", version: "3.13", path: "/autocomplete/custom/sli-rac.stub", align: "right", selector: ".sli_ac_suggestion, .sli_ac_product", localisation: { viewMore: "View More", searchLabel: "Search Suggestions", productLabel: "Product Suggestions", currencySymbol: "Â£", language: "en", noKeyword: "%label%", keywordNoScope: '%label% for "%keyword%"', keywordWithScope: '%label% for "%keyword%" in %scope%', noResultsText: "No Products Found", closeButtonText: "close", scopeSeparatorText: "in", "": "" }, behaviourOptions: { strategy: "swiftphrase", suggestionCount: "5", searchIn: "cat1", searchInCount: "3", showEmpty: "false", showProducts: true, dynamic: "true", suggestionAlign: "right", productDisplay: "grid", productCount: "8", showOrigPrice: "true", showPrice: "true", showDescription: "true", highlightDescription: "false", showLogo: "false", minHeight: "400px", sticky: "false", enableTouch: "true", mobileSuggestionCount: "2", mobileSearchInCount: "2", mobileProductCount: "2", thumbSize: "80", thumbQuality: "100", thumbAspect: true, thumbnailer: "thumb-aspect", inputContainer: "form", titleLength: "110", showGreyText: "false" } };
    if (window.sliSpark && window.sliSpark.t) { window.sliSpark("sli:onBeaconUserId", function(beaconUserId, pageId) { SLI.rac.behaviourOptions.SLIBeacon = beaconUserId;
            SLI.rac.behaviourOptions.SLIPid = pageId }) }
    var IE_VERSION = IEVersion();
    if (IE_VERSION && IE_VERSION < 9) { return false } else { loadRAC() }

    function loadRAC() {
        var location = document.location;
        if (location.host.match(/\.(?:local|cfe\.nz|resultsdemo|resultsstage)/)) { SLI.rac.base = location.protocol + "//" + document.domain }
        if (location.host.match(/test.parkcameras.com/)) {
            SLI.rac.base = location.protocol + "//parkcameras.resultsdemo.com"
        }
        loadResource(SLI.rac.base + "/autocomplete/custom/sli-rac.css");
        loadResource(SLI.rac.base + "/tb/ts/rac-data/css/styles.css?r=482268");
        SLI.jQuery(document).ready(function() { SLI.jQuery("#sli_search_1, #sli_search_2").attr("data-provide", "rac");
            loadAndInitRac() })
    }

    function loadAndInitRac() { loadResource(SLI.rac.base + SLI.rac.path + ".js", function(result) { SLI.jQuery(function() { window.sliAutocomplete = {};
                window.sliAutocomplete.select = new SLI.Autocomplete(SLI.rac) }) }) }

    function loadResource(path, callback) {
        var tag;
        if (path.match(/\.css(\?.+)?$/)) {
            tag = document.createElement("link");
            tag.href = path;
            tag.rel = "stylesheet";
            tag.type = "text/css";
            tag.media = "all"
        } else { tag = document.createElement("script");
            tag.src = path } tag.onload = tag.onreadystatechange = function() { if (!tag.readyState || /loaded|complete/.test(tag.readyState)) { tag = tag.onload = tag.onreadystatechange = null; if (typeof callback === "function") { callback(true) } } };
        tag.onerror = function() { tag = tag.onerror = null; if (typeof callback === "function") { callback(false) } };
        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        head.appendChild(tag)
    }

    function IEVersion() { var myNav = navigator.userAgent.toLowerCase(); return (myNav.indexOf("msie") != -1) ? parseInt(myNav.split("msie")[1]) : false } SLI.jQuery(document).on("sli-rac-event", function(e) {
        switch (e.message) {
            case "select":
                var racType;
                if (e.racData.url.match(/rt=racscope/)) { racType = "scope" } else { if (e.racData.url.match(/rt=racclick/)) { racType = "product" } else { racType = e.racData.type || "suggestion" } }
                var track = "/search?w=" + encodeURIComponent(e.racData.query) + "&ts=rac&ractype=" + racType;
                try {
                    if (typeof _gaq !== "undefined") {
                        _gaq.push(["_trackPageview", track])
                    }
                    if (typeof(pageTracker) !== "undefined") { pageTracker._trackPageview(track) }
                    if (typeof(ga) !== "undefined") { if (window.sliSpark && window.sliSpark.t) { window.sliSpark("sli:pageType", "") } ga("send", "pageview", { page: track }) }
                    if (typeof(dataLayer) !== "undefined") { if (window.sliSpark && window.sliSpark.t) { window.sliSpark("sli:pageType", "") } dataLayer.push({ event: "virtualpageview", url: track }) }
                } catch (err) { console.log(err) }
                return e.racData;
                break
        }
    }).on("sli-ajax-complete", function(e) {
        if (typeof(sliAutocomplete) !== "undefined") {
            if (sliAutocomplete.select.input) {
                sliAutocomplete.select.input._onClear()
            }
        }
    })
})(window, document, jQuery);
