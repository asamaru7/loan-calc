!function(){"use strict";window.addEventListener("popstate",function(i){r&&i&&i.state&&i.state.q&&(e=t.parseQuery(i.state.q),r.calcByQuery())});var t={getInterest:function(t,e,r,i,o){var n=0;return 3===t?n=r*i/12:2===t?n=0===e?r*i/12:o*i/12:1===t&&(n=0===e?r*i/12:o*i/12),n},getPrincipal:function(t,e,r,i,o,n,s){var a=0;return 3===t?e===r-1&&(a=i):2===t?a=i/(r-o):1===t&&(a=n-s),a},getRepayment:function(t,e,r,i,o,n,s,a){var l=0;return 3===t?l=e+r:2===t?l=e+r:1===t&&(a>=n?(l=s*i/12*Math.pow(1+i/12,o-n),l/=Math.pow(1+i/12,o-n)-1):l=e+r),l},moneyKorean:function(t){for(var e=["","1","2","3","4","5","6","7","8","9"],r=["","십","백","천","만 ","십만 ","백만 ","천만 ","억 ","십억 ","백억 ","천억 ","조 ","십조 ","백조"],i=[],o=String(t),n=o.length,s="",a=0;a<n;a++)i[a]=o.substr(a,1);var l=n;for(a=0;a<n;a++){l--;var p="";""!==e[i[a]]&&(p=r[l],l>4&&(Math.floor(l/4)===Math.floor((l-1)/4)&&""!==e[i[a+1]]||Math.floor(l/4)===Math.floor((l-2)/4)&&""!==e[i[a+2]])&&(p=r[l].substr(0,1))),s+=e[i[a]]+p}return $.trim(s)},printNumber:function(t){return void 0===t||0===t?"-":t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},getXlsxCell:function(t,e){return{t:t,v:e}},historyHash:function(t,e,r,i,o){return t+"-"+e+"-"+r+"-"+i+"-"+o},parseQuery:function(t){var e={};t=t.substring(1);for(var r=t.split("&"),i=0;i<r.length;i++){var o=r[i].split("=");e[decodeURIComponent(o[0])]=decodeURIComponent(o[1])}return e}},e=t.parseQuery(window.location.search),r=null;$(function(){!function(t){(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&$(".cExcelDownload").hide()}(navigator.userAgent||navigator.vendor||window.opera);var i,o=$("body").hasClass("cEn"),n="loan-history-"+(o?"en":"ko");r=new Vue({el:".dMainBody",data:{calcHistory:[],money:0,rate:0,period:0,term:0,type:1,rows:[],loanMonth:0,loanRateAmt:0,loanTotalAmt:0},computed:{moneyText:function(){return t.moneyKorean(this.money)},moneyNumber:function(){return t.printNumber(this.money)},typeText:function(){return this.getTypeText(this.type)},summaryText:function(){switch(this.type){case 1:return o?"Monthly Payments":"월상환금";case 2:return o?"Monthly Principal Payment":"월납입원금";case 3:return o?"Monthly Average Interest":"월평균이자"}return""}},watch:{type:function(){this.calc()}},mounted:function(){this.calcHistory=store.get(n)||[],this.calcByQuery()},methods:{calcByQuery:function(){this.money=e.money||0,this.rate=e.rate||0,this.period=e.period||0,this.term=e.term||0,(e.type||0)>0&&this.money>0&&this.rate>0&&this.period>0&&(this.type=0,this.$nextTick(function(){this.type=parseInt(e.type||1)}))},calcByArgs:function(t,e,r,i,o){this.money=e,this.rate=r,this.period=i,this.term=o,this.type===t?this.calc():this.type=t},calc:function(){var e=parseFloat(this.type)||0;if(0!==e){i=e;var r=parseFloat(this.money)||0,n=parseFloat(this.period)||0,s=parseFloat(this.term)||0,a=(parseFloat(this.rate)||0)/100;if(r<=0)return void alertify.error(o?"Required Value!":"대출금을 입력해 주세요.");if(r>1e9)return void alertify.error(o?"Max 1000000000":"대출금을 10억 이하로 입력해 주세요.");if(a<=0)return void alertify.error(o?"Required Value!":"대출금리를 입력해 주세요.");if(a>100)return void alertify.error(o?"Max 100%":"대출금리를 100%이하로 입력해 주세요.");if(n<=0)return void alertify.error(o?"Required Value!":"대출기간을 입력해 주세요.");if(n>420)return void alertify.error(o?"Max 420":"대출기간을 420개월 이하로 입력해 주세요.");if(n<=s)return void alertify.error(o?"Wrong Value!":"거치기간이 대출기간보다 크거나 같을 수 없습니다.");for(var l,p,c=0,h=0,m=0,u=0,y=0,d=r,g=[],f=0;f<n;f++)p=t.getInterest(e,f,r,a,d),h+=p,1===e?(u=t.getRepayment(e,m,p,a,n,s,r,f),f>=s&&(m=t.getPrincipal(e,f,n,r,s,u,p))):(f>=s&&(m=t.getPrincipal(e,f,n,r,s,u,p)),u=t.getRepayment(e,m,p,a,n,s,r,f)),y+=m,d=r-y,g.push({num:f+1,payments:t.printNumber(Math.round(u)),principal:t.printNumber(Math.round(m)),interest:t.printNumber(Math.round(p)),total:t.printNumber(Math.round(y)),balance:t.printNumber(Math.round(d))});this.rows=g,3===e?c=h/n:2===e?c=r/(n-s):1===e&&(c=r*a/12,c*=Math.pow(1+a/12,n-s),c/=Math.pow(1+a/12,n-s)-1),l=r+h,this.loanMonth=t.printNumber(Math.round(c)),this.loanRateAmt=t.printNumber(Math.round(h)),this.loanTotalAmt=t.printNumber(Math.round(l)),"left"!==$(".dFormBox").css("float")&&this.$nextTick(function(){$("body").scrollTo(".dResult",250,{offset:{top:-80}})}),this.save()}},setHistory:function(t,e){$(document).prop("title",(o?"Loan Calculator":"대출 이자 계산기")+(t?" :: "+t:""));try{var r="?";if(e)for(var i in e)e.hasOwnProperty(i)&&(r+=i+"="+e[i]+"&");r=r.substring(0,r.length-1),history.state&&(history.state.q||"")===r||history.pushState({q:r},t,""===r?"/":r)}catch(t){}},reset:function(){this.money=0,this.rate=0,this.period=0,this.term=0,this.rows=[],this.loanMonth=0,this.loanRateAmt=0,this.loanTotalAmt=0,this.setHistory("",null),$("body").scrollTo(0,250)},save:function(){for(var e,r={type:this.type,money:parseFloat(this.money)||0,period:parseFloat(this.period)||0,term:parseFloat(this.term)||0,rate:parseFloat(this.rate)||0,at:(new Date).getTime()},i=t.historyHash(r.type,r.money,r.rate,r.period,r.term),o=JSON.parse(JSON.stringify(this.calcHistory)),s=o.length-1;s>=0;s--)if(e=t.historyHash(o[s].type,o[s].money,o[s].rate,o[s].period,o[s].term),i===e){o.splice(s,1);break}o.unshift(r),o.length>10&&(o=o.slice(0,10)),this.calcHistory=o,store.set(n,o.concat([]));var a={type:parseInt(r.type),money:r.money,rate:r.rate,period:r.period,term:parseInt(r.term)};this.setHistory(this.printHistory(0,a),a)},exportExcel:function(){var e=[];e.push([t.getXlsxCell("s","대출금"),t.getXlsxCell("s","대출기간"),t.getXlsxCell("s","대출금리"),t.getXlsxCell("s","거치기간"),t.getXlsxCell("s",this.summaryText),t.getXlsxCell("s","총 이자액"),t.getXlsxCell("s","원금 및 총이자액")]),e.push([t.getXlsxCell("n",this.money),t.getXlsxCell("n",this.period),t.getXlsxCell("n",this.rate),t.getXlsxCell("n",this.term),t.getXlsxCell("n",this.loanMonth),t.getXlsxCell("n",this.loanRateAmt),t.getXlsxCell("n",this.loanTotalAmt)]),e.push([]),e.push([t.getXlsxCell("s","회차"),t.getXlsxCell("s","상환금"),t.getXlsxCell("s","납입원금"),t.getXlsxCell("s","이자"),t.getXlsxCell("s","납입원금계"),t.getXlsxCell("s","잔금")]);for(var r=0,i=this.rows.length;r<i;r++)e.push([t.getXlsxCell("n",String(this.rows[r].num).replace(/,/g,"")),t.getXlsxCell("n",String(this.rows[r].payments).replace(/,/g,"")),t.getXlsxCell("n",String(this.rows[r].principal).replace(/,/g,"")),t.getXlsxCell("n",String(this.rows[r].interest).replace(/,/g,"")),t.getXlsxCell("n",String(this.rows[r].total).replace(/,/g,"")),t.getXlsxCell("n",String(this.rows[r].balance).replace(/,/g,""))]);var o=new TableExport($("#cRows").get(0),{headers:!0,formats:["xlsx"],exportButtons:!1}),n=o.getExportData().cRows;if(n.xlsx){var s=n.xlsx;o.export2file(e,s.mimeType,"loan",s.fileExtension)}},plusMoney:function(t){this.money=(parseFloat(this.money)||0)+t},printHistory:function(e,r){var i="";return o?(i+=this.getTypeText(r.type,!0),i+="\n / "+(r.money>=1e3?t.printNumber(r.money/1e3)+"k":t.printNumber(r.money)),i+=" / "+r.rate+"%",i+=" / "+r.period+"m",r.term>0&&(i+=" / "+r.term+"m")):(i+=this.getTypeText(r.type,!0),i+="\n"+t.moneyKorean(r.money),i+=" / "+r.rate+"%",i+=" / "+r.period+"개월",r.term>0&&(i+=" / "+r.term+"개월 거치")),i},getTypeText:function(t,e){if(e)switch(t){case 1:return o?"P&I equal":"원리금균등";case 2:return o?"P with equal":"원금균등";case 3:return o?"Bullet":"만기일시"}else switch(t){case 1:return o?"P&I with equal payments":"원리금균등상환";case 2:return o?"P with equal payments":"원금균등상환";case 3:return o?"Bullet repayment":"원금만기일시상환"}return""}}}),$("#cCalcHistory").on("click","a",function(){window._sidebar&&window._sidebar.close()})})}();