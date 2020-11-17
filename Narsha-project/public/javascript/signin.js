$(function () {
    let token = "";
    $("#signin").on("click", function () {
        $.ajax({
            url: "/signin",
            data: { userId: $('#signIn_userId').val(), password: $('#signIn_pw').val() },
            type: "POST",
            dataType: "json"
        })
            .done((data) => {
                let obj = data;
                token = obj.token;
                alert(token);
                window.location.href = '/main'
            })
    })
})