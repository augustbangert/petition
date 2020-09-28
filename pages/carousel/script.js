(function () {
    var kitties = document.querySelectorAll("#kitties img");
    var dots = document.getElementsByClassName("dots");
    var cur = 0;
    var timer;

    var i; //after clearTimeout, this i here needs to be set to the i inside the for loop
    //and then setTimeout needs to be reinacted

    // for (var i = 0; i < dots.length; i++) {
    //     dots[i].addEventListener("click", function (e) {
    //         for (var i = 0; i < dots.length; i++) {
    //             if (dots[i] == e.target) {
    //                 clearTimeout(timer);
    //                 break;
    //             }
    //         }
    //         console.log(i);
    //     });
    // }

    for (var i = 0; i < dots.length; i++) {
        //this is a test for loop to test part 2, step 2
        dots[i].addEventListener("click", function (e) {
            for (var i = 0; i < dots.length; i++) {
                if (dots[i] == e.target) {
                    clearTimeout(timer);
                    kitties[cur].classList.remove("onscreen");
                    kitties[cur].classList.add("offscreen-left");
                    //the problem here is I need a way to find the current index and
                    //then set that offscreen using classList
                    cur = i;
                    console.log(cur);
                    kitties[cur].classList.remove("offscreen-left");
                    kitties[cur].classList.remove("onscreen");
                    kitties[cur].classList.add("onscreen");

                    timer;
                    break;
                }
            }
            //console.log(i);
        });
    }

    //console.log("i is now " + i);

    document.addEventListener("transitionend", function (e) {
        if (e.target.classList.contains("offscreen-left")) {
            e.target.classList.remove("offscreen-left");
            timer = setTimeout(moveKitties, 2000);
        }
    });

    timer = setTimeout(moveKitties, 2000);
    //setTimeout(moveKitties, 2000);

    function moveKitties() {
        kitties[cur].classList.remove("onscreen");
        // dots[cur].classList.remove("on");
        kitties[cur].classList.add("offscreen-left");

        if (++cur == kitties.length) {
            cur = 0;
        }

        kitties[cur].classList.add("onscreen");
        // dots[cur].classList.add("on");
    }
})();
