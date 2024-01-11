cob.custom.customize.push(function (core, utils, ui) {
    core.customizeAllColumns("*", (node, esDoc, colDef) => {
        if(getDateDiffRegex("dateDiff",colDef.fieldDefDescription) || getDateDiffRegex("dateDiffAfter",colDef.fieldDefDescription)) {
            node.insertAdjacentHTML('beforeend', diffDaysToNow(esDoc[colDef.field]));
        } else if(getDateDiffRegex("dateDiffBefore",colDef.fieldDefDescription)) {
            node.insertAdjacentHTML('afterbegin', diffDaysToNow(esDoc[colDef.field]));
        }
    });
    function getDateDiffRegex(input,fieldDefDescription) {
        const regexString = `\\$date.*\\$style\\[([^,]+,)*${input}(,[^,]+)*\\]`;
        let res = ((new RegExp(regexString)).exec(fieldDefDescription))!=null;
        if (res && "dateDiff"==input) {
            console.warn("dateDiff IS NOW DEPRECATED. USE *dateDiffBefore* OR *dateDiffAfter*")
        }
        return res;
    }
    function diffDaysToNow(cellMillis) {
        if(!cellMillis || cellMillis.length == 0) { return ("") }

        var now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const cellTime = new Date(+cellMillis[0]);
        const cellDate = new Date(cellTime.getFullYear(), cellTime.getMonth(), cellTime.getDate());

        var numDaysDiff = Math.floor((today-cellDate) / (1000*60*60*24));
        var cellDaysDiffColor = (numDaysDiff > 0 ? "red" : "green");
        let dayStr = ( Math.abs(numDaysDiff)  == 1 ? "dia":"dias")
        return `<span style="display: inline-block; width: 55px; text-align: right; font-size: 0.85em; margin-right: 4px; font-style: italic; color:${cellDaysDiffColor}">${numDaysDiff} ${dayStr}</span>`
    }
})