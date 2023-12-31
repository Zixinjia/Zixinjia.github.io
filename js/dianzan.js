function GetUrlRelativePath() {
    var url = document.location.toString();
    var arrUrl = url.split("//");

    var start = arrUrl[1].indexOf("/");
    var relUrl = arrUrl[1].substring(start);

    if (relUrl.indexOf("?") != -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}
$(document).ready(function () {
    const {
        Query,
        User
    } = AV;
    AV.init({
        appId: "MXUeFvB5oRPBlL1rnn1ZQZ97-gzGzoHsz",
        appKey: "bP2LpuRZQPTKsE2yhN4CcN4w",
        serverURL: "jiazixin.xyz"
    });
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "0";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index];
        }
    });
})

function setCount() {
    var dianzans = [];
    var hrefs = [];
    var ids = [];
    const query2 = new AV.Query('dianzan');
    query2.find().then((dzs) => {
        for (i = dzs.length - 1; i >= 0; i--) {
            dianzans.push(dzs[i]["attributes"]["count"]);
            hrefs.push(dzs[i]["attributes"]["href"]);
            ids.push(dzs[i]["id"])
        }
        index = hrefs.indexOf(GetUrlRelativePath());
        console.log(dianzans[index])
        if (dianzans[index] === undefined) {
            document.getElementsByClassName("dianzan-count")[0].innerText = "0";
        } else {
            document.getElementsByClassName("dianzan-count")[0].innerText = dianzans[index] + 1;
        }
    });
}

function dianzan() {
    try {
        var dianzans = [];
        var hrefs = [];
        var ids = [];
        const query = new AV.Query('dianzan');
        query.find().then((dzs) => {
            for (i = dzs.length - 1; i >= 0; i--) {
                dianzans.push(dzs[i]["attributes"]["count"]);
                hrefs.push(dzs[i]["attributes"]["href"]);
                ids.push(dzs[i]["id"])
            }
            if (hrefs.indexOf(GetUrlRelativePath()) == -1) {
                console.log(1)
                const TestObject = AV.Object.extend('dianzan');
                const testObject = new TestObject();
                testObject.set('href', GetUrlRelativePath());
                testObject.set('count', 1);
                testObject.save();
            } else {
                index = hrefs.indexOf(GetUrlRelativePath());
                console.log(ids[index])
                query.get(ids[index]).then((todo) => {
                    todo.set('count', dianzans[index] + 1);
                    todo.save();
                });
            }
            setCount();
        });
    } catch (err) {
        const TestObject = AV.Object.extend('dianzan');
        const testObject = new TestObject();
        testObject.set('href', GetUrlRelativePath());
        testObject.set('count', 1);
        testObject.save();
    }

}