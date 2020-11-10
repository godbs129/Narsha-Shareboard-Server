$(function() {
    const token = "";
    $("#send").on("click", function() {
        $.ajax({
                url: "/signin",
                data: { userId: $('#userId'), password: $('#password') },
                type: "POST",
                dataType: "json"
            })
            .done((data) => {
                let obj = data;
                token = obj.token;
                alert(token);
            })
    })
})