(function () {
    const signing = document.getElementById("signing");
    let canvas = document.getElementById("canvas");

    function signingFunction() {
        console.log("connected");
        console.log("canvas", canvas);

        // var canvas = $("#canvas"); // doesn't seem to like the jquery !!! :(
        var ctx = canvas.getContext("2d");
        ctx.strokeStyle = "rgb(255,100,100)";
        ctx.lineWidth = 5;
        var click;

        canvas.addEventListener("mousedown", (e) => {
            click = 1;
            ctx.beginPath();

            canvas.addEventListener("mousemove", (e) => {
                if (click) {
                    // need to finish the draw function here
                    console.log("event (e):", e);
                    console.log("event (e).pageX:", e.pageX);
                    console.log("event (e)target:", e.target.offsetLeft);
                    var x = e.pageX - e.target.offsetLeft;
                    var y = e.pageY - e.target.offsetTop;
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    // document.addEventListener("mousemove", function (arg) {
                    //     here.style.left = arg.clientX + "px";
                    //     here.style.top = arg.clientY + "px";
                    // });
                }
            });
        });

        canvas.addEventListener("mouseup", (e) => {
            click = 0;
            signing.value = canvas.toDataURL();
        });
    }
    signingFunction();
})();
