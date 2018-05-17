(function () {
	"use strict";

	window.addEventListener('popstate', function (e) {
		// 뒤로가기 시 재계산
		if ((!vueObject) || (!e) || (!e.state) || (!e.state.q)) {
			return;
		}
		getQueries = LoanCalc.parseQuery(e.state.q);
		vueObject.calcByQuery();
	});

	// https://spot.wooribank.com/pot/Dream?withyou=CMBBS0086&cc=c006244:c006294
	var LoanCalc = {
		// 이자 계산
		getInterest: function (loanType, i, loan, rate, payBalance) {
			var interest = 0;
			if (loanType === 3) {					//원금만기일시상환
				interest = loan * rate / 12;
			} else if (loanType === 2) {				//원금균등상환
				if (i === 0) {
					interest = loan * rate / 12;
				} else {
					interest = payBalance * rate / 12;
				}
			} else if (loanType === 1) {				//원리금균등상환
				if (i === 0) {
					interest = loan * rate / 12;
				} else {
					interest = payBalance * rate / 12;
				}
			}
			return interest;
		},
		// 납입원금 계산
		getPrincipal: function (loanType, i, period, loan, term, repayment, interest) {
			var principal = 0;
			if (loanType === 3) {	//원금만기일시상환
				if (i === (period - 1)) {	//마지막라인인경우
					principal = loan;
				}
			} else if (loanType === 2) {	//원금균등상환
				principal = loan / (period - term);
			} else if (loanType === 1) {	//원리금균등상환
				principal = repayment - interest;
			}
			return principal;
		},
		// 상환금 계산
		getRepayment: function (loanType, principal, interest, rate, period, term, loan, i) {
			var repayment = 0;
			if (loanType === 3) {	//원금만기일시상환
				repayment = principal + interest;
			} else if (loanType === 2) {	//원금균등상환
				repayment = principal + interest;
			} else if (loanType === 1) {	//원리금균등상환
				if (i >= term) {	//거치기간 후부터 계산
					repayment = (loan * rate / 12) * (Math.pow((1 + rate / 12), (period - term)));
					repayment = repayment / (Math.pow((1 + rate / 12), (period - term)) - 1);
				} else {
					repayment = principal + interest;
				}
			}
			return repayment;
		},

		moneyKorean: function (num) {
			//var arrayNum = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
			var arrayNum = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			var arrayUnit = ['', '십', '백', '천', '만 ', '십만 ', '백만 ', '천만 ', '억 ', '십억 ', '백억 ', '천억 ', '조 ', '십조 ', '백조'];
			var arrayStr = [];
			var str = String(num);
			var len = str.length;
			var hanStr = '';
			for (var i = 0; i < len; i++) {
				arrayStr[i] = str.substr(i, 1)
			}
			var code = len;
			for (i = 0; i < len; i++) {
				code--;
				var tmpUnit = '';
				if (arrayNum[arrayStr[i]] !== '') {
					tmpUnit = arrayUnit[code];
					if (code > 4) {
						if (( Math.floor(code / 4) === Math.floor((code - 1) / 4) && arrayNum[arrayStr[i + 1]] !== '') ||
							( Math.floor(code / 4) === Math.floor((code - 2) / 4) && arrayNum[arrayStr[i + 2]] !== '')) {
							tmpUnit = arrayUnit[code].substr(0, 1);
						}
					}
				}
				hanStr += arrayNum[arrayStr[i]] + tmpUnit;
			}
			return $.trim(hanStr);
		},
		printNumber: function (val) {
			if ((typeof(val) === 'undefined') || (val === 0)) {
				return "-";
			}
			return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},
		getXlsxCell: function (t, v) {
			return {
				t: t,
				v: v
			}
		},
		historyHash: function (type, money, rate, period, term) {
			return type + '-' + money + '-' + rate + '-' + period + '-' + term;
		},
		parseQuery: function (query) {
			var queries = {};
			query = query.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				queries[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
			}
			return queries;
		}
	};

	var getQueries = LoanCalc.parseQuery(window.location.search);
	var vueObject = null;
	$(function () {
		// 모바일에서는 Excel 다운로드가 정상적으로 되지 않아 숨김
		(function (a) {
			if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
				$('.cExcelDownload').hide();
			}
		})(navigator.userAgent || navigator.vendor || window.opera);

		var isEn = $('body').hasClass('cEn');
		var storeId = 'loan-history-' + (isEn ? 'en' : 'ko');
		var oldType;
		vueObject = new Vue({
			el: '.dMainBody',
			data: {
				calcHistory: [],
				money: 0,
				rate: 0,
				period: 0,
				term: 0,
				type: 1,
				rows: [],
				loanMonth: 0,	// 월평균이자(원)
				loanRateAmt: 0,	// 총 이자액(원)
				loanTotalAmt: 0	// 원금 및 총이자액 합계(원)
			},
			computed: {
				moneyText: function () {
					return LoanCalc.moneyKorean(this.money);
				},
				moneyNumber: function () {
					return LoanCalc.printNumber(this.money);
				},
				typeText: function () {
					return this.getTypeText(this.type);
				},
				summaryText: function () {
					switch (this.type) {
						case 1 :
							return (isEn) ? 'Monthly Payments' : '월상환금';
						case 2 :
							return (isEn) ? 'Monthly Principal Payment' : '월납입원금';
						case 3 :
							return (isEn) ? 'Monthly Average Interest' : '월평균이자';
					}
					return '';
				}
			},
			watch: {
				type: function () {
					this.calc();
				}
			},
			mounted: function () {
				this.calcHistory = store.get(storeId) || [];
				this.calcByQuery();
			},
			methods: {
				calcByQuery: function () {	// history(get)에 따른 재계산
					this.money = getQueries['money'] || 0;
					this.rate = getQueries['rate'] || 0;
					this.period = getQueries['period'] || 0;
					this.term = getQueries['term'] || 0;
					if ((getQueries['type'] || 0) > 0) {
						if ((this.money > 0) && (this.rate > 0) && (this.period > 0)) {
							this.type = 0;
							this.$nextTick(function () {
								this.type = parseInt(getQueries['type'] || 1);
							});
						}
					}
				},
				calcByArgs: function (type, money, rate, period, term) {
					this.money = money;
					this.rate = rate;
					this.period = period;
					this.term = term;
					if (this.type === type) {
						this.calc();
					} else {
						this.type = type;
					}
				},
				calc: function () {
					var loanType = parseFloat(this.type) || 0;
					if (loanType === 0) {
						return;
					}
					oldType = loanType;
					var loan = parseFloat(this.money) || 0;	// 대출원금
					var loanPeriod = parseFloat(this.period) || 0; // 대출기간
					var loanTerm = parseFloat(this.term) || 0;	// 거치기간
					var loanRate = (parseFloat(this.rate) || 0) / 100;	//금리 계산위해 소수점값으로 변경;	// 대출금리

					if (loan <= 0) {
						alertify.error((isEn) ? 'Required Value!' : '대출금을 입력해 주세요.');
						return;
					} else if (loan > 1000000000) {
						alertify.error((isEn) ? 'Max 1000000000' : '대출금을 10억 이하로 입력해 주세요.');
						return;
					}
					if (loanRate <= 0) {
						alertify.error((isEn) ? 'Required Value!' : '대출금리를 입력해 주세요.');
						return;
					} else if (loanRate > 100) {
						alertify.error((isEn) ? 'Max 100%' : '대출금리를 100%이하로 입력해 주세요.');
						return;
					}
					if (loanPeriod <= 0) {
						alertify.error((isEn) ? 'Required Value!' : '대출기간을 입력해 주세요.');
						return;
					} else if (loanPeriod > 420) {
						alertify.error((isEn) ? 'Max 420' : '대출기간을 420개월 이하로 입력해 주세요.');
						return;
					}
					if (loanPeriod <= loanTerm) {
						alertify.error((isEn) ? 'Wrong Value!' : '거치기간이 대출기간보다 크거나 같을 수 없습니다.');
						return;
					}

					//계산결과
					var monthlyLoan = 0;	//월상환금
					var totalInterest = 0;		//총이자
					var principalNinterest;		//원금및이자
					var interest;	//이자
					var principal = 0;	//납입원금
					var repayment = 0;	//상환금
					var principalTotal = 0;	//납입원금 누계
					var payBalance = loan;	//잔금
					var rows = [];
					for (var i = 0; i < loanPeriod; i++) {
						interest = LoanCalc.getInterest(loanType, i, loan, loanRate, payBalance);
						totalInterest = totalInterest + interest;
						if (loanType === 1) {
							repayment = LoanCalc.getRepayment(loanType, principal, interest, loanRate, loanPeriod, loanTerm, loan, i);
							if (i >= loanTerm) {	//거치기간 후부터 계산
								principal = LoanCalc.getPrincipal(loanType, i, loanPeriod, loan, loanTerm, repayment, interest);
							}
						} else {
							if (i >= loanTerm) {	//거치기간 후부터 계산
								principal = LoanCalc.getPrincipal(loanType, i, loanPeriod, loan, loanTerm, repayment, interest);
							}
							repayment = LoanCalc.getRepayment(loanType, principal, interest, loanRate, loanPeriod, loanTerm, loan, i);
						}
						principalTotal = principalTotal + principal;
						payBalance = loan - principalTotal;

						rows.push({
							'num': (i + 1),
							'payments': LoanCalc.printNumber(Math.round(repayment)),
							'principal': LoanCalc.printNumber(Math.round(principal)),
							'interest': LoanCalc.printNumber(Math.round(interest)),
							'total': LoanCalc.printNumber(Math.round(principalTotal)),
							'balance': LoanCalc.printNumber(Math.round(payBalance))
						});
					}
					this.rows = rows;

					if (loanType === 3) {
						monthlyLoan = totalInterest / loanPeriod;
					} else if (loanType === 2) {
						monthlyLoan = loan / (loanPeriod - loanTerm);
					} else if (loanType === 1) {
						monthlyLoan = loan * loanRate / 12;
						monthlyLoan = monthlyLoan * (Math.pow((1 + loanRate / 12), (loanPeriod - loanTerm)));
						monthlyLoan = monthlyLoan / (Math.pow((1 + loanRate / 12), (loanPeriod - loanTerm)) - 1);
					}
					principalNinterest = loan + totalInterest;
					this.loanMonth = LoanCalc.printNumber(Math.round(monthlyLoan));
					this.loanRateAmt = LoanCalc.printNumber(Math.round(totalInterest));
					this.loanTotalAmt = LoanCalc.printNumber(Math.round(principalNinterest));

					if ($('.dFormBox').css('float') !== 'left') {
						this.$nextTick(function () {
							$('body').scrollTo('.dResult', 250, {offset: {top: -80}});
						});
					}

					this.save();
				},
				setHistory: function (ttl, q) {
					$(document).prop('title', (isEn ? 'Loan Calculator' : '대출 이자 계산기') + (ttl ? ' :: ' + ttl : ''));
					try {	// ie 11 이상부터 지원
						var query = '?';
						if (q) {
							for (var k in q) {
								if (q.hasOwnProperty(k)) {
									query += k + '=' + q[k] + '&';
								}
							}
						}
						query = query.substring(0, query.length - 1);
						if ((!history.state) || ((history.state['q'] || '') !== query)) {	// 중복된 히스토리를 남기지 않도록 처리
							history.pushState({'q': query}, ttl, ((query === '') ? '/' : query));
						}
					} catch (e) {
						console.log(e);
					}
				},
				reset: function () {
					this.money = 0;
					this.rate = 0;
					this.period = 0;
					this.term = 0;
					this.rows = [];
					this.loanMonth = 0;
					this.loanRateAmt = 0;
					this.loanTotalAmt = 0;
					this.setHistory('', null);
					$('body').scrollTo(0, 250);
				},
				save: function () {
					var d = {
						type: this.type,
						money: parseFloat(this.money) || 0,	// 대출원금
						period: parseFloat(this.period) || 0, // 대출기간
						term: parseFloat(this.term) || 0,	// 거치기간
						rate: parseFloat(this.rate) || 0,	// 대출금리
						at: (new Date()).getTime()
					};
					var hh = LoanCalc.historyHash(d.type, d.money, d.rate, d.period, d.term);
					var hht;
					var ch = JSON.parse(JSON.stringify(this.calcHistory));
					for (var i = ch.length - 1; i >= 0; i--) {
						hht = LoanCalc.historyHash(ch[i].type, ch[i].money, ch[i].rate, ch[i].period, ch[i].term);
						if (hh === hht) {
							ch.splice(i, 1);
							break;
						}
					}
					ch.unshift(d);
					if (ch.length > 10) {
						ch = ch.slice(0, 10);
					}
					this.calcHistory = ch;
					store.set(storeId, ch.concat([]));

					var q = {
						type: parseInt(d.type),
						money: d.money,
						rate: d.rate,
						period: d.period,
						term: parseInt(d.term)
					};
					this.setHistory(this.printHistory(0, q), q);
				},
				exportExcel: function () {
					// Excel 다운로드
					// this.money = 1000000;
					// this.rate = 2.97;
					// this.period = 24;
					// this.calc();
					var filename = 'loan';
					var data = [];
					data.push([
						LoanCalc.getXlsxCell('s', '대출금'),
						LoanCalc.getXlsxCell('s', '대출기간'),
						LoanCalc.getXlsxCell('s', '대출금리'),
						LoanCalc.getXlsxCell('s', '거치기간'),
						LoanCalc.getXlsxCell('s', this.summaryText),
						LoanCalc.getXlsxCell('s', '총 이자액'),
						LoanCalc.getXlsxCell('s', '원금 및 총이자액')
					]);
					data.push([
						LoanCalc.getXlsxCell('n', this.money),
						LoanCalc.getXlsxCell('n', this.period),
						LoanCalc.getXlsxCell('n', this.rate),
						LoanCalc.getXlsxCell('n', this.term),
						LoanCalc.getXlsxCell('n', this.loanMonth),
						LoanCalc.getXlsxCell('n', this.loanRateAmt),
						LoanCalc.getXlsxCell('n', this.loanTotalAmt)
					]);
					data.push([]);

					data.push([
						LoanCalc.getXlsxCell('s', '회차'),
						LoanCalc.getXlsxCell('s', '상환금'),
						LoanCalc.getXlsxCell('s', '납입원금'),
						LoanCalc.getXlsxCell('s', '이자'),
						LoanCalc.getXlsxCell('s', '납입원금계'),
						LoanCalc.getXlsxCell('s', '잔금')
					]);

					for (var i = 0, iCnt = this.rows.length; i < iCnt; i++) {
						data.push([
							LoanCalc.getXlsxCell('n', String(this.rows[i].num).replace(/,/g, '')),
							LoanCalc.getXlsxCell('n', String(this.rows[i].payments).replace(/,/g, '')),
							LoanCalc.getXlsxCell('n', String(this.rows[i].principal).replace(/,/g, '')),
							LoanCalc.getXlsxCell('n', String(this.rows[i].interest).replace(/,/g, '')),
							LoanCalc.getXlsxCell('n', String(this.rows[i].total).replace(/,/g, '')),
							LoanCalc.getXlsxCell('n', String(this.rows[i].balance).replace(/,/g, ''))
						]);
					}

					var exportExt = 'xlsx';//, exportExts = ['xlsx'/*, 'xls'*/, 'csv'];
					var instance = new TableExport($('#cRows').get(0), {
						headers: true,
						formats: [exportExt],
						exportButtons: false
					});

					var cRows = instance.getExportData()['cRows'];
					if (cRows[exportExt]) {
						var exportData = cRows[exportExt];
						instance.export2file(data, exportData.mimeType, filename, exportData.fileExtension);
					}
				},
				// action
				plusMoney: function (money) {
					this.money = (parseFloat(this.money) || 0) + money;
				},
				printHistory: function (index, row) {
					var txt = '';//(index + 1) + '. ';
					if (isEn) {
						txt += this.getTypeText(row.type, true);
						txt += "\n / " + ((row.money >= 1000) ? LoanCalc.printNumber(row.money / 1000) + 'k' : LoanCalc.printNumber(row.money));
						txt += ' / ' + row.rate + '%';
						txt += ' / ' + row.period + 'm';
						if (row.term > 0) {
							txt += ' / ' + row.term + 'm';
						}
					} else {
						txt += this.getTypeText(row.type, true);
						txt += "\n" + LoanCalc.moneyKorean(row.money);
						txt += ' / ' + row.rate + '%';
						txt += ' / ' + row.period + '개월';
						if (row.term > 0) {
							txt += ' / ' + row.term + '개월 거치';
						}
					}
					// txt += new Date(row.at);
					return txt;
				},
				getTypeText: function (type, short) {
					if (short) {
						switch (type) {
							case 1 :
								return (isEn) ? 'P&I equal' : '원리금균등';
							case 2 :
								return (isEn) ? 'P with equal' : '원금균등';
							case 3 :
								return (isEn) ? 'Bullet' : '만기일시';
						}
					} else {
						switch (type) {
							case 1 :
								return (isEn) ? 'P&I with equal payments' : '원리금균등상환';
							case 2 :
								return (isEn) ? 'P with equal payments' : '원금균등상환';
							case 3 :
								return (isEn) ? 'Bullet repayment' : '원금만기일시상환';
						}
					}
					return '';
				}
			}
		});

		// 계산 이력 클릭시 슬라이드 메뉴 닫기
		$('#cCalcHistory').on('click', 'a', function () {
			if (window._sidebar) {
				window._sidebar.close();
			}
		});
	});
})();
