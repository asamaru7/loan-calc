/*global nhn*/

(function (host) {
    "use strict";
    if (!host.SNS) {
        host.SNS = {};
    }

    var S = host.SNS,
        w = Math.min(860, screen.width),
        h = Math.min(600, screen.height);

    S.popupUrl = "/sns/view.nhn";
    S.popupName = "SNS";
    S.popupOptions = "toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=" + w + ",height=" + h;
    S.open = function (service) {
        var openedPopup = !!this.popup;
        this.popup = window.open(this.popupUrl + "#" + service, this.popupName, this.popupOptions);
        if (openedPopup) {
            this.popup.location.reload();
        }
        this.popup.focus();
    };
    S.close = function () {
        if (this.popup) {
            this.popup.close();
            this.popup = null;
        }
    };
    S.addImageUrls = function (imageUrls) {
    	var arrImageUrls = imageUrls.split(",");
    	 
        var npe = typeof(PhotoEditorApp) !== 'undefined' && PhotoEditorApp.instance;
        if(npe && npe.opened){
            npe.addPhotosByUrlsEncoded(arrImageUrls);
            this.close();
            return;
        }
     
        var photoObject = nhn && nhn.FlashObject && nhn.FlashObject.find && nhn.FlashObject.find("photo");
        if (!!photoObject) {
            photoObject.addSNSPhotoAlbumItems(arrImageUrls);
            this.close();
        }
    };
}(window));