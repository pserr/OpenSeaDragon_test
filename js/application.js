var rect = new OpenSeadragon.Rect(0.5, 0.2, 0.1, 0.1);
var link = "https://github.com/openseadragon/openseadragon/issues/401";
var viewer = new OpenSeadragon.Viewer({
    id: "container",
    showNavigationControl: false,
    tileSources: [{
        "@context": "http://library.stanford.edu/iiif/image-api/1.1/context.json",
            "@id": "http://libimages.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000001.jp2",
            "formats": ["jpg", "png", "gif"],
            "height": 3600,
            "profile": "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2",
            "qualities": ["native", "bitonal", "grey", "color"],
            "scale_factors": [1, 2, 4, 8, 16],
            "tile_height": 256,
            "tile_width": 256,
            "width": 2617
    }]
});
viewer.addViewerInputHook({
    hooks: [{
        tracker: "viewer",
        handler: "clickHandler",
        hookHandler: onViewerClick
    }]
});
viewer.addHandler("open", function () {
    var buttonElement = document.createElement("a");
    buttonElement.target = "_blank";
    buttonElement.href = link;
    buttonElement.className = "highlight";

    viewer.addOverlay(buttonElement, rect, OpenSeadragon.OverlayPlacement.CENTER);
});

function isPointInsideRect(point, rect) {
    return point.x > rect.x && point.x < rect.x + rect.width && point.y > rect.y && point.y < rect.y + rect.height;
}

function onViewerClick(event) {
    var pos = viewer.viewport.viewerElementToViewportCoordinates(event.position);
    if (isPointInsideRect(pos, rect)) {
        event.preventDefaultAction = true;
        window.open(link, '_blank');
    }
}