'use strict';

var isFileDragDropEvent = require('./isFileDragDropEvent'),
    isUrlDragDropEvent = require('./isUrlDragDropEvent');

function extractNativeItem(e) {
    if (isFileDragDropEvent(e)) {
        var entries = [];
        var ex = '';
        try {
            Array.prototype.slice.call(e.dataTransfer.items).forEach(it=> {
                entries.push(it.webkitGetAsEntry());
            });
        }
        catch (err) {
            console.log(err);
            ex = err;
        }

        return {
            files: Array.prototype.slice.call(e.dataTransfer.files),
            items: Array.prototype.slice.call(e.dataTransfer.items),
            entries: entries,
            ex: ex
        };
    }
    else if (isUrlDragDropEvent(e)) {
        return {
            urls: (
            e.dataTransfer.getData('Url') ||
            e.dataTransfer.getData('text/uri-list') || ''
            ).split('\n')
        };
    }
}

module.exports = extractNativeItem;
