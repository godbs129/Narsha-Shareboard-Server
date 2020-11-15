$(function() {
    let token = "";
    $("#send").on("click", function() {
        $.ajax({
                url: "/signin",
                data: { userId: $('#userId').val(), password: $('#password').val() },
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