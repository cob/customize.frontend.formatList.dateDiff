cob.custom.customize.push(function (core, utils, ui) {
    core.customizeAllColumns("*", (node, esDoc, colDef) => {
        // Test $style[currency], by it self or with other styles
        if(/\$date.*\$style\[([^,]+,)*dateDiff(,[^,]+)*\]/.exec(colDef.fieldDefDescription) != null) {
            node.insertAdjacentHTML('beforeend', diffDaysToNow(esDoc[colDef.field]));
        }
    });

    function diffDaysToNow(cellMillis) {
        if(!cellMillis || cellMillis.length == 0) { return ("") }

        var now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const cellTime = new Date(+cellMillis[0]);
        const cellDate = new Date(cellTime.getFullYear(), cellTime.getMonth(), cellTime.getDate());

        var numDaysDiff = Math.floor((today-cellDate) / (1000*60*60*24));
        var cellDaysDiffColor = (numDaysDiff > 0 ? "red" : "green");
        return '<span style="display: inline-block; width: 55px; text-align: right; font-size: 0.85em; margin-right: 4px; font-style: italic; color:' + cellDaysDiffColor + '">' + numDaysDiff + ' dias</span>'
    }
})
