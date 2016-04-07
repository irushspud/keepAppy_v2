/**
 * Created by themucyo on 4/7/16.
 */
/**
 * notification for form public feed post submission
 */
$('.actions').click(function() {
    /* Need permission */
    Notification.requestPermission(function(permission){
        /* Notification */
        var notification= new Notification('Keep Appy',{
            body:'Feed post successfully submitted'
        });
        /* Timeout */
        setTimeout(function(){
            notification.close();
        },400);
    });
});