/**
 *
 */
$('.actions').click(function() {
    /* Need permission */
    Notification.requestPermission(function(permission){
        /* Notification */
        var notification= new Notification('Keep Appy',{
            body: 'Quote successfully created'
        });
        /* Timeout */
        setTimeout(function(){
            notification.close();
        },400);
    });
});