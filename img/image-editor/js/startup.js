var isBaseUploaderLoaded = false;
var isFirst = true;
var isDebug = false;

function log(message) {
	if (isDebug) {
		alert(message);
	}
}

$(window).on('load', function () {
	init();
})/*.on('unload', function() {
	closeSubPopup();
})*/;
// jindo.$Fn(function () {
// 	init();
// }).attach(window, 'load');
//
// jindo.$Fn(function () {
// 	closeSubPopup();
// }).attach(window, 'unload', true);

var windowHeight;
var windowWidth;

function getWindowWidth() {
	return undefined == windowWidth ? 860 : windowWidth;
}

function getWindowHeight() {
	return undefined == windowHeight ? 640 : windowHeight;
}

function ceilWindowSize(size) {
	return size + 100;
}

function init() {
	// if (checkMultiDomainMode() === true) {
	// 	parent.postMessage("{\"func\":\"openUploader\"}", "*");
	// 	document.body.style.overflow = "hidden";
	// }

	if (nhn && nhn.sPopupUploaderType === 'new') {
		// do nothing
	} else {
		setTimeout('checkBaseUploaderLoaded()', 60000);
		var windowWidth = getWindowWidth();
		var windowHeight = getWindowHeight();

		if ($Agent().navigator().ie) {
			setWindowSize(windowWidth, windowHeight);
		}

		if (navigator && navigator.userAgent
			&& navigator.userAgent.search("Edge") >= 0) {
			for (var i = 0; i < 20; i++) {
				setTimeout(function () {
					resizeTo(windowWidth, windowHeight + 47);
				}, 300);

				if (window.innerWidth == windowWidth
					&& window.outerHeight == windowHeight + 87) {
					break;
				}
			}
		} else if (window.screen.width <= windowWidth
			&& window.screen.height <= windowHeight) {
			var w = window.screen.width;
			var h = window.screen.height;
			resizeTo(w, h);

		} else if (!$Agent().navigator().ie) {
			resizeTo(ceilWindowSize(windowWidth), ceilWindowSize(windowHeight));
			setTimeout(function () {
				setWindowSize(windowWidth, windowHeight);
			}, 300);
		}
	}
}

function setWindowSize(nWidth, nHeight) {
	var oDocument = document.getElementsByTagName('HTML')[0];
	var nTargetWidth = nWidth || oDocument.scrollWidth;
	var nTargetHeight = nHeight || oDocument.scrollHeight;
	var oRuler = document.body.appendChild(document.createElement('DIV'));
	var oInstall = $Document().query('.install');
	var nInstallHeight = 0;
	if (oInstall && oInstall.offsetHeight) {
		nInstallHeight = oInstall.offsetHeight;
	}

	var oGuide = $Document().query('.guide');
	var nGuideHeight = 0;
	if (oGuide && oGuide.offsetHeight) {
		nGuideHeight = oGuide.offsetHeight;
	}

	oRuler.style.position = 'absolute';
	oRuler.style.left = 0;
	oRuler.style.top = 0;
	oRuler.style.width = '100%';
	oRuler.style.height = '100%';

	var nDifferentWidth = nTargetWidth - oDocument.offsetWidth;
	var nDifferentHeight = nTargetHeight
		- Math.max(oDocument.offsetHeight - nInstallHeight - nGuideHeight,
			oRuler.offsetHeight);
	if (nDifferentWidth || nDifferentHeight) {
		resizeWindow(nWidth, nHeight, nDifferentWidth, nDifferentHeight);
	} else if ($Agent().navigator().safari) {
		resizeWindow(nWidth, nHeight, -99, -75);
	}

	if ($Agent().navigator().ie) {
		nDifferentWidth = nTargetWidth - oRuler.offsetWidth;
		nDifferentHeight = nTargetHeight - oRuler.offsetHeight;
		if (nDifferentWidth || nDifferentHeight) {
			resizeWindow(nWidth, nHeight, nDifferentWidth, nDifferentHeight);
		}
	}
	document.body.removeChild(oRuler);
}

function resizeWindow(nWidth, nHeight, nDifferentWidth, nDifferentHeight) {
	try {
		if (((nWidth + top.window.screenLeft) > window.screen.availWidth)
			|| ((nHeight + top.window.screenTop) > window.screen.availHeight)) {
			top.window.moveBy(-nDifferentWidth, -nDifferentHeight);
		}
		top.window.resizeBy(nDifferentWidth, nDifferentHeight);
		if ($Agent().navigator().safari) {
			if (!$Agent().os().mac) {
				resizeBy(-83, 18);
				document.body.style.overflow = "hidden";
			}
		} else if ($Agent().navigator().chrome) {
			resizeBy(1, 1);
			if (nHeight > window.screen.height) {
				resizeTo(getWindowWidth(), window.screen.height);
			} else {
				document.body.style.overflow = "hidden";
			}
		}
	} catch (e) {
		if (typeof oTimer === "undefined" || oTimer === null) {
			oTimer = setTimeout('resizeWindow(' + nWidth + ', ' + nHeight
				+ ', ' + nDifferentWidth + ', ' + nDifferentHeight + ')',
				500);
		}
	}
}

function checkBaseUploaderLoaded() {
	if (!isBaseUploaderLoaded) {
		alert("포토업로더가 정상적으로 로드되지 않았습니다. \n 잠시 후에 다시 시도해 주세요.");
		closeUploader();
	} else {
		log("정상적으로 로딩이 되었습니다.");
	}
}

function flashUnSupportedForward() {
	isBaseUploaderLoaded = true;
	new $Element($Document().query('.flashView')).hide();
	var oGuide = $Document().query('.guide');

	if (oGuide) {
		new $Element($Document().query('.guide')).hide();
	}

	new $Element($Document().query('.install')).show();
}

function html5GuideForward() {
	isBaseUploaderLoaded = true;
	new $Element($Document().query('.flashView')).hide();
	new $Element($Document().query('.install')).hide();
	new $Element($Document().query('.guide')).show();
}

// //////////////////////////// Flash에서 사용될 External Call용 function -
// Start///////////////////////////
//
// // 공지사항 이미지 노출 여부에 대한 선택 (used by flash)
// function setShowTip(bFlag) {
// 	setCookie('show_flash_tip', bFlag);
// }
//
// // flash에 로딩이 완료되면 call하는 fn
// function baseUploaderLoaded() {
// 	if (!!opener || (!!parent && parent != window)) {
// 		isBaseUploaderLoaded = true;
// 	} else {
// 		isBaseUploaderLoaded = false;
// 	}
// }
//
// function checkMultiDomainMode() {
// 	try {
// 		parent && parent.attachArea;
// 		return false;
// 	} catch (err) {
// 		return true;
// 	}
// }
//
// /**
//  * 버전을 체크하는 함수.
//  */
// function checkPhotoStepVersion() {
// 	if (opener && !opener.attachArea && opener.nhn && opener.nhn.husky) {
// 		return '2'; // SE2
// 	} else if (opener.attachArea) {
// 		return '1'; // SE1
// 	} else {
// 		return '0';
// 	}
// }
//
// /**
//  * 저장 시작을 알리는 MSG
//  */
// function beginImgInsert() {
// 	var sVersion = checkPhotoStepVersion();
// 	if (checkMultiDomainMode() === true) {
// 		parent.postMessage("{\"func\":\"beginImgInsert\"}", "*");
// 	} else if (sVersion === '2') {
// 		opener.nhn.husky.PopUpManager.setCallback(window, 'HIDE_EDITINGAREA');
// 	} else if (sVersion === '1') {
// 		opener.attachArea.beginImgInsert();
// 	} else {
// 		log("Version Type ERROR.");
// 		return false;
// 	}
// }
//
// /**
//  * 모든 저장이 완료된 시점에서 모든 파일 정보 MSG를 서비스에 전달
//  */
// function setAllPhoto(htPhotoInfos, flags) {
// 	var sVersion = checkPhotoStepVersion();
// 	if (checkMultiDomainMode() === true) {
// 		// 멀티도메인의 경우 지원하지 않는다.
// 	} else if (sVersion === '2') {
// 		// do nothing!!
// 		// versoin 2는 지원하지 못하며, 2일 경우 아무것도 하지 않도록 한다.
// 	} else if (sVersion === '1') {
// 		if (opener.attachArea.allPhotoFile) {
// 			var photoImageList = [];
// 			var length = htPhotoInfos.length;
//
// 			for (var i = 0; i < length; i++) {
// 				var photoImage = {};
// 				photoImage['sFileURL'] = (htPhotoInfos[i]).sFileURL;
// 				photoImage['sFilePath'] = (htPhotoInfos[i]).sFilePath;
// 				photoImage['sFileName'] = (htPhotoInfos[i]).sFileName;
// 				photoImage['nFileSize'] = (htPhotoInfos[i]).nFileSize;
// 				photoImage['sAlign'] = (htPhotoInfos[i]).sAlign;
// 				photoImage['nWidth'] = (htPhotoInfos[i]).nWidth;
// 				photoImage['nHeight'] = (htPhotoInfos[i]).nHeight;
// 				photoImage['bFormPhotoLog'] = false;
//
// 				photoImageList.push(photoImage);
// 			}
//
// 			opener.attachArea.allPhotoFile(photoImageList, flags);
// 		}
// 	} else {
// 		log("Version Type ERROR.");
// 		return false;
// 	}
//
// 	return true;
// }
//
// /**
//  *
//  * htPhotoInfo의 내용은 아래의 링크 참고.
//  * http://wikin.nhncorp.com/pages/viewpage.action?pageId=72542253
//  *
//  * @param {Object}
//  *            serviceType 서비스 타입
//  * @param {Object}
//  *            htPhotoInfo 저장시 호출되는 정보
//  */
// function setPhotoStep1(serviceType, htPhotoInfo) {
// 	if (serviceType === 'photo') {
// 		opener.attachArea.newPhotoFile(htPhotoInfo.sFileURL,
// 			htPhotoInfo.sFilePath, htPhotoInfo.sFileName,
// 			htPhotoInfo.nFileSize, htPhotoInfo.nWidth, htPhotoInfo.nHeight,
// 			htPhotoInfo.sAlign, false, isFirst, htPhotoInfo.bNewLine);
// 		isFirst = false;
// 	} else if (serviceType === 'storyphoto') {
// 		opener.attachArea.newStoryPhotoFile(0, htPhotoInfo.sXmlURL,
// 			htPhotoInfo.sFilePath, htPhotoInfo.sFileName,
// 			htPhotoInfo.nFileSize, htPhotoInfo.sStoryType,
// 			htPhotoInfo.nWidth, htPhotoInfo.nHeight, htPhotoInfo.aImage);
// 	} else {
// 		log("serviceType Type ERROR.");
// 		return false;
// 	}
// 	return true;
// }
//
// function setPhotoStep2(serviceType, htPhotoInfo) {
// 	if (serviceType === 'photo') {
// 		opener.nhn.husky.PopUpManager.setCallback(window, 'SET_PHOTO',
// 			[htPhotoInfo]);
// 		opener.nhn.husky.PopUpManager.setCallback(window, 'DELETE_PHOTO');
// 	} else if (serviceType === 'storyphoto') {
// 		opener.nhn.husky.PopUpManager.setCallback(window, 'SET_STORYPHOTO',
// 			[htPhotoInfo]);
// 	} else {
// 		log("serviceType Type ERROR.");
// 		return false;
// 	}
// 	return true;
// }
//
// function setPhotoMultiDomain(serviceType, htPhotoInfo) {
// 	var obj;
// 	if (serviceType === 'photo') {
// 		obj = {
// 			func: "newPhotoFile",
// 			args: [htPhotoInfo.sFileURL, htPhotoInfo.sFilePath,
// 				htPhotoInfo.sFileName, htPhotoInfo.nFileSize,
// 				htPhotoInfo.nWidth, htPhotoInfo.nHeight,
// 				htPhotoInfo.sAlign, false, isFirst, htPhotoInfo.bNewLine]
// 		};
// 		parent.postMessage(JSON.stringify(obj), "*");
// 		isFirst = false;
// 	} else if (serviceType === 'storyphoto') {
// 		obj = {
// 			func: "newStoryPhotoFile",
// 			args: [htPhotoInfo.sXmlURL, htPhotoInfo.sFilePath,
// 				htPhotoInfo.sFileName, htPhotoInfo.nFileSize,
// 				htPhotoInfo.sStoryType, htPhotoInfo.nWidth,
// 				htPhotoInfo.nHeight, htPhotoInfo.aImage]
// 		};
//
// 		parent.postMessage(JSON.stringify(obj), "*");
// 	} else {
// 		log("serviceType Type ERROR.");
// 		return false;
// 	}
// 	return true;
// }
//
// /**
//  * photo 저장을 위한 function serviceType : 'photo', 'storyphoto' htPhotoInfo : 기존에
//  * 파라미터를 넣어주셨던 인자들을 hashTable로 key & value로 넣음.
//  */
// function setPhoto(serviceType, htPhotoInfo) {
// 	if (!serviceType || !htPhotoInfo) {
// 		log("Service Type or PhotoInfo ERROR");
// 		return false;
// 	}
//
// 	htPhotoInfo.sFileName = unescape(htPhotoInfo.sFileName);
//
// 	if (serviceType === 'storyphoto') {
// 		for (var i = htPhotoInfo.aImage.length; i > 0; i--) {
// 			htPhotoInfo.aImage[i - 1].sFileName = unescape(htPhotoInfo.aImage[i - 1].sFileName);
// 		}
// 	}
//
// 	var sVersion = checkPhotoStepVersion();
// 	if (checkMultiDomainMode() === true) { // multidomain
// 		return setPhotoMultiDomain(serviceType, htPhotoInfo);
// 	} else if (sVersion === '2') { // se2.0
// 		return setPhotoStep2(serviceType, htPhotoInfo);
// 	} else if (sVersion === '1') { // step1, se1.0
// 		return setPhotoStep1(serviceType, htPhotoInfo);
// 	} else {
// 		log("Version Type ERROR.");
// 		return false;
// 	}
// }
//
// function finishImgInsert() {
// 	var sVersion = checkPhotoStepVersion();
//
// 	if (checkMultiDomainMode() === true) {
// 		parent.postMessage("{\"func\":\"finishImgInsert\"}", "*");
// 	} else if (sVersion === '2') { // se2.0
// 		opener.nhn.husky.PopUpManager.setCallback(window, 'SHOW_EDITINGAREA');
// 	} else if (sVersion === '1') { // step1, se1.0
// 		opener.attachArea.finishImgInsert();
// 	}
//
// 	closeUploader();
// }
//
// function addNphotoAlbumItems(itemsUrls) {
// 	var photoObject = nhn.FlashObject.find("photo");
// 	if (!!photoObject) {
// 		photoObject.addNphotoAlbumItems(itemsUrls);
// 	}
// }
//
// function addSNSPhotoAlbumItems(itemsUrls) {
// 	var photoObject = nhn.FlashObject.find("photo");
// 	if (!!photoObject) {
// 		photoObject.addSNSPhotoAlbumItems(itemsUrls);
// 	}
// }
//
// function closeSubPopup() {
// 	if (openNphotoAlbumPopup.popup) {
// 		openNphotoAlbumPopup.popup.close();
// 	}
// 	if (openNdriveSavePopup.popup) {
// 		openNdriveSavePopup.popup.close();
// 	}
// 	if (window.SNS && window.SNS.popup) {
// 		window.SNS.popup.close();
// 	}
// }
//
// function openNphotoAlbumPopup() {
// 	NPHOTO_MINI.open();
// 	return;
// }
//
// function getUpphotoHost() {
// 	return "http://" + baseDomain;
// }
//
// function buildNdriveSaveParams(serviceName, fileUrl, fileName, fileSize) {
// 	var sParameter = "";
//
// 	if (nhn && nhn.sPopupUploaderType === 'new') {
// 		sParameter += "service=" + serviceName;
// 		sParameter += "&resource=" + escape(JSON.stringify({
// 			name: fileName,
// 			size: fileSize,
// 			downloadUrl: getUpphotoHost() + fileUrl
// 		}));
// 	} else {
// 		sParameter += "serviceType=" + serviceName;
// 		sParameter += "&attachtype=normal";
// 		sParameter += "&downloadurl=" + getUpphotoHost() + fileUrl;
// 		sParameter += "&filename=" + fileName;
// 		sParameter += "&filesize=" + fileSize;
// 	}
//
// 	return sParameter;
// }
//
// function openNdriveSavePopup(serviceName, htPhotoInfo) {
// 	htPhotoInfo.sFileName = unescape(htPhotoInfo.sFileName);
//
// 	var $this = arguments.callee;
//
// 	if (window.sNdriveSavePopUpURL && window.baseDomain) {
// 		var sPopupURL = sNdriveSavePopUpURL
// 			+ "?"
// 			+ buildNdriveSaveParams(serviceName, htPhotoInfo.sFileURL,
// 				htPhotoInfo.sFileName, htPhotoInfo.nFileSize),
// 			sPopOption = "width=476,height=360,scrollbars=no,location=no,status=no,resizable=no,toolbar=no,menubar=no";
//
// 		$this.popup = window.open(sPopupURL, "oNdriveSavePopup", sPopOption);
//
// 		if (!$this.popup) {
// 			setTimeout(function () {
// 				alert("팝업이 차단되어 있습니다.\n브라우저 설정에서 팝업 차단을 해제해 주세요. ");
// 			}, 200);
// 		} else {
// 			$this.popup.focus();
// 		}
// 	}
// }
//
// function addNphotoAlbumItemsInString(itemsUrlsString) {
// 	addNphotoAlbumItems(itemsUrlsString.split(","));
// }
//
// function getCookie() {
// 	var photoObject = nhn.FlashObject.find("SimpleUploader");
// 	var sCookie = document.cookie;
// 	// 플래시에 사용할 쿠키정보 전달
// 	photoObject.setCookie(sCookie);
// }
//
// function onNaverPhotoViewerPopupDoNotShowAgainCheck(isChecked) {
// 	if (isChecked == "true") {
// 		var oCookie = $Cookie();
// 		oCookie.set("upphoto_adv", "off", 365, "", "/");
// 	}
// }
//
// function getNeoIdAuth() {
// 	var consumerKeyMatch = document.location.search
// 		.match(/consumerKey=([^&]*)/), AuthorizationMatch = document.location.search
// 		.match(/Authorization=([^&]*)/), neoIdAuth = {
// 		consumerKey: (consumerKeyMatch) ? decodeURIComponent(consumerKeyMatch[1])
// 			: null,
// 		Authorization: (AuthorizationMatch) ? decodeURIComponent(AuthorizationMatch[1])
// 			: null,
// 		toString: function () {
// 			return (neoIdAuth.consumerKey && neoIdAuth.Authorization) ? ("consumerKey="
// 				+ encodeURIComponent(neoIdAuth.consumerKey)
// 				+ "&Authorization=" + encodeURIComponent(neoIdAuth.Authorization))
// 				: "";
// 		}
// 	};
// 	return neoIdAuth;
// }
//
// function eraseGuide() {
// 	var isWin98 = $Agent().os().win
// 		&& ($Agent().os().getName().indexOf("98") > -1);
// 	var requireVersion = isWin98 ? "9.0.0.0" : "10.0.0.0";
//
// 	if (!nhn.FlashObject.isFlashSupportable(requireVersion)
// 		&& !$Agent().navigator().chrome && !$Agent().navigator().safari) {
// 		flashUnSupportedForward();
// 	} else {
// 		isBaseUploaderLoaded = false;
// 		new $Element($Document().query('.guide')).hide();
// 		new $Element($Document().query('.install')).hide();
// 		new $Element($Document().query('.flashView')).show();
// 	}
// }
//
// function checkHTML5Support() {
// 	var version = $Agent().navigator().version;
//
// 	// IE 10일 경우 호환성 보기를 사용하면 더 아래 버전으로 체크되는 경우가 있음 따라서 아래와 같이 예외 처리
// 	if (version < 11) {
// 		var agent = navigator.userAgent.toLowerCase();
//
// 		if (agent.indexOf('msie 7') > -1 && agent.indexOf('trident/6.0') > -1) {
// 			version = 10;
// 		}
// 	}
//
// 	var html5Unsupport = $Agent().navigator().ie && (version < 10);
//
// 	return !html5Unsupport;
// }
//
// function closeUploader() {
// 	if (checkMultiDomainMode() === true) {
// 		parent.postMessage("{\"func\":\"closeUploader\"}", "*");
// 	} else {
// 		close();
// 	}
// }
//
// function changeParam(url, paramName, newValue) {
// 	var q = url.indexOf("?");
// 	var s = url.indexOf("#");
//
// 	if (s < q && s > 0) {
// 		q = -1;
// 	}
//
// 	var newUrl = "";
//
// 	if (q < 0 && s < 0) {
// 		newUrl = url + "?" + paramName + "=" + newValue;
// 	} else if (q < 0 && s > 0) {
// 		newUrl = url.substring(0, s) + "?" + paramName + "=" + newValue
// 			+ url.substring(s);
// 	} else if (q > 0 && s < 0) {
// 		var params = url.substring(q + 1).split("&");
//
// 		var paramLength = params.length;
// 		var has = false;
// 		for (i = 0; i < paramLength; i++) {
// 			if (params[i].indexOf(paramName + "=") == 0) {
// 				params[i] = paramName + "=" + newValue;
// 				has = true;
// 			}
// 		}
//
// 		if (!has) {
// 			params.push(paramName + "=" + newValue);
// 			paramLength = params.length;
// 		}
//
// 		var query = "";
//
// 		for (i = 0; i < paramLength; i++) {
// 			if (params[i] !== "") {
// 				query = query + params[i];
//
// 				if (i != paramLength - 1) {
// 					query = query + "&"
// 				}
// 			}
// 		}
//
// 		newUrl = url.substring(0, q) + "?" + query;
// 	} else if (q > 0 && s > 0) {
// 		var params = url.substring(q + 1, s).split("&");
//
// 		var paramLength = params.length;
// 		var has = false;
// 		for (i = 0; i < paramLength; i++) {
// 			if (params[i].indexOf(paramName + "=") == 0) {
// 				params[i] = paramName + "=" + newValue;
// 				has = true;
// 			}
// 		}
//
// 		if (!has) {
// 			params.push(paramName + "=" + newValue);
// 			paramLength = params.length;
// 		}
//
// 		var query = "";
//
// 		for (i = 0; i < paramLength; i++) {
// 			if (params[i] !== "") {
// 				query = query + params[i];
//
// 				if (i != paramLength - 1) {
// 					query = query + "&"
// 				}
// 			}
// 		}
//
// 		newUrl = url.substring(0, q) + "?" + query + url.substring(s);
// 	}
//
// 	return newUrl;
// }

// //////////////////////////// Flash에서 사용될 External Call용 function -
// End///////////////////////////
