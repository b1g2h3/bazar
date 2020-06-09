$(document).ready(function() {
    var table = $('#example').DataTable();

    $('#example tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        $('.edit_user').unbind('click');
        $('#updateUser').modal('show');
        $('.edit #name').val(data[1]);
        $('.edit #email').val(data[2]);
        $(`.edit #role option[value=${data[3]}]`).attr('selected','selected');
        $(".edit_user").click(function() {
            updateUser(data[0])
        });
    } );
} );

function updateUser(id) {
    let prepData = {
        id: id,
        name: $('.edit #name').val(),
        email:$('.edit #email').val(),
        role:$('.edit #email').val(),
    }
    $.ajax({
        type: 'POST', // Use POST with X-HTTP-Method-Override or a straight PUT if appropriate.
        dataType: 'json', // Set datatype - affects Accept header
        url: "/admin.php", // A valid URL
        data: {
            ukol: 'dwadwadwa',
            data: JSON.stringify(prepData)
        } , // Some data e.g. Valid JSON as a string
        success: function(returnData){
            var res = JSON.parse(returnData);
            console.log(res);
        },
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            console.log(errorMessage);
        }
    });
}