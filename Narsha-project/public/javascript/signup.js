$(function () {
    $('#signup').on("click", function () {
        $.ajax({
            url: "/signup",
            data: { userId: $('#signUp_userId').val(), password: $('#signUp_pw').val() },
            type: "POST",
            dataType: "json"
        })
            .done((data) => {
                let obj = data;
                let result = obj.result;
                alert(result);
            })
    })
})