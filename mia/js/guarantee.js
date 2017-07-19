! function(i) {
	function t(t, n) {
		this.opts = i.extend({}, s, n), this.wrap = i(t), this.imgId = "mysgimg", this.desId = "mysgtab", this._index = 0, this._left = 0, this._count = this.opts.imgarr.length, this.lock = !1, this.half_count = Math.floor(this.opts.showDesCount / 2), this.limit_min = this._count - this.half_count, this._init()
	}
	var s = {
		imgarr: [],
		desarr: [],
		imgdomain: "",
		desLen: 172,
		showDesCount: 5
	};
	t.prototype = {
		_createHtml: function() {
			var t = this.opts,
				s = '<div class="mysgroll">            <a href="javascript:;" class="sl_left"></a><a href="javascript:;" class="sl_right"></a>            <div class="mysgcon" id="' + this.imgId + '"></div><div class="mysgdeswrap"><table class="mysgdes" id="' + this.desId + '">            <tr></tr></table></div></div>';
			this.wrap.html(s), s = "", s += '<div class="mysgitem"><img src="' + t.imgdomain + t.imgarr[0] + '"></div>', i("#" + this.imgId).html(s), s = "", i.each(t.desarr, function(i, t) {
				s += 0 == i ? '<td class="sel">' + t + "</td>" : "<td>" + t + "</td>"
			}), i("#" + this.desId).find("tr").html(s), s = null
		},
		_changeImg: function() {
			i("#" + this.imgId).find("img").attr("src", this.opts.imgdomain + this.opts.imgarr[this._index])
		},
		_toPre: function() {
			var t = this,
				s = 100,
				n = i("#" + t.desId);
			return !(t.lock || t._index <= 0) && (t.lock = !0, t._index--, t._index >= t.limit_min - 1 || t._index < t.half_count ? t._left += 0 : (t._left += t.opts.desLen, s = 150), void n.animate({
				left: t._left
			}, s, "", function() {
				n.find("td:eq(" + t._index + ")").addClass("sel").siblings().removeClass("sel"), t._changeImg(), t.lock = !1
			}))
		},
		_toNext: function() {
			var t = this,
				s = 100,
				n = i("#" + t.desId);
			return !(t.lock || t._index >= t._count - 1) && (t.lock = !0, t._index++, t._index >= t.limit_min || t._index <= t.half_count ? t._left -= 0 : (t._left -= t.opts.desLen, s = 150), void n.animate({
				left: t._left
			}, s, "", function() {
				n.find("td:eq(" + t._index + ")").addClass("sel").siblings().removeClass("sel"), t._changeImg(), t.lock = !1
			}))
		},
		_init: function() {
			console.log(this.limit_min), this._createHtml(), this.wrap.find(".sl_left").on("click", i.proxy(this._toPre, this)), this.wrap.find(".sl_right").on("click", i.proxy(this._toNext, this))
		}
	}, i.fn.mysgroll = function(i) {
		return new t(this, i)
	}
}(jQuery), $(function() {
	function i() {
		var i = $(document).scrollTop() + 120;
		$(".datacon").each(function(s, n) {
			var e = $(n).offset().top;
			i >= e && t(s)
		})
	}

	function t(i) {
		var t = $(".moFixed li");
		t.each(function(s) {
			i != s && $(this).hasClass("current") ? t.removeClass("current") : $(this).hasClass("current") || i != s || $(this).addClass("current")
		})
	}
	$(".moduleFixed").moduleFixed({
		Zindex: 5
	});
	var s = window.location.href.indexOf("#");
	if(s > 0) {
		var n = window.location.href.split("#");
		setTimeout(function() {
			$(window).scrollTop($("#" + n[1]).position().top - 120)
		}, 0)
	}
	$(".moFixed li").click(function() {
		var t = $(this),
			s = t.index(),
			n = $(".datacon").eq(s).offset().top - 120;
		$("html,body").stop().animate({
			scrollTop: n
		}, 1e3), i()
	}), $(window).scroll(function() {
		i()
	}), $(window).resize(function() {
		i()
	})
}), $(function() {
	function i(i) {
		0 == i ? e.hide() : i == h - 1 ? o.hide() : (o.show(), e.show())
	}

	function t(t) {
		if(!n.is(":animated")) {
			if("left" == t) {
				if(f--, f <= -1) return f = 0, !1;
				n.animate({
					left: "+=" + d
				}), i(f)
			}
			if("right" == t) {
				if(f++, f >= h) return f = h - 1, !1;
				n.animate({
					left: "-=" + d
				}), i(f)
			}
		}
	}
	if($(".scroller").length) {
		var s = $(".scroller"),
			n = s.find(".scrollwidth"),
			e = s.find(".prev"),
			o = s.find(".next"),
			l = n.find(".scrollitem"),
			d = l.width(),
			a = 0;
		l.each(function() {
			a += $(this).width()
		}), n.css("width", a);
		var c = l.length,
			r = 1,
			h = Math.ceil(c / r),
			f = 0;
		c > r && (e.show(), o.show()), i(0), e.click(function(i) {
			i.preventDefault(), t("left")
		}), o.click(function(i) {
			i.preventDefault(), t("right")
		})
	}
});