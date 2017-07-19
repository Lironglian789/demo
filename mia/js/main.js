$(function() {
	$.fn.extend({
		moduleFixed: function(e) {
			var t = {
					Zindex: 2
				},
				n = $.extend(t, e),
				i = $(this),
				a = i.offset().top,
				f = i.offset().left,
				s = i.find(".moFixed"),
				o = $(".moFixed").height() + 15;
			$(window).on("resize", function() {
				f = i.offset().left, s.css({
					left: f,
					zIndex: n.Zindex
				})
			}), $(window).on("scroll", function() {
				var e;
				a = i.offset().top, e = $(".gotoppp").length > 0 ? $(".gotoppp").offset().top : $(".Nfooter").offset().top;
				i.height();
				$(this).scrollTop() > a ? (s.addClass("navFix"), s.css({
					left: f,
					zIndex: n.Zindex
				}), $(this).scrollTop() + o > e ? (s.removeClass("navFix"), s.removeAttr("style"), s.css({
					position: "absolute",
					top: e - o,
					left: f,
					zIndex: n.Zindex
				})) : (s.removeAttr("style"), s.addClass("navFix"), s.css({
					left: f,
					zIndex: n.Zindex
				}))) : (s.removeClass("navFix"), s.removeAttr("style"))
			})
		},
		timer: function(e) {
			function t() {
				if(Diffms = o.getTime() - (l.getTime() + u), u += 1e3, Diffms > 0) {
					a = Math.floor(Diffms / r), Diffms -= a * r, f = Math.floor(Diffms / m), Diffms -= f * m, s = Math.floor(Diffms / d), Diffms -= s * d;
					var e = Math.floor(Diffms / c);
					a < 10 && (a = "0" + a), f < 10 && (f = "0" + f), s < 10 && (s = "0" + s), e < 10 && (e = "0" + e);
					var t = $(i.element).find(".t0"),
						n = $(i.element).find(".t1"),
						p = $(i.element).find(".t2"),
						v = $(i.element).find(".t3");
					t.html(a), n.html(f), p.html(s), v.html(e), "none" == $(i.element).css("display") && $(i.element).show()
				} else {
					clearInterval(g);
					var h = "<p>活动已结束</p>";
					$(i.element).html(h), i.timerEnd()
				}
			}
			var n = {},
				i = $.extend(n, e);
			i.element = $(this);
			for(var a, f, s, o = new Date(i.endTime), l = new Date(i.starTime), r = 864e5, m = 36e5, d = 6e4, c = 1e3, p = new Array(":", ":", ":", ".", ""), v = "", h = -1, x = 5; ++h < x;) v += 4 == h ? '<span class="appw t' + h + '">?</span><span class="cntSeparator">' + p[h] + "</span>" : '<span class="appw t' + h + '">??</span><span class="cntSeparator">' + p[h] + "</span>";
			$(i.element).append(v);
			var u = 0,
				g = "InterValObj" + i.id;
			g = setInterval(function() {
				t()
			}, 1e3);
			var w = ($(i.element).find(".t4"), 9);
			setInterval(function() {
				w <= 0 ? w = 9 : w -= 1, $(i.element).find(".t4").text(w)
			}, 100)
		},
		foucs: function(e) {
			var t = $("#index_b_hero"),
				n = t.find("li.hero"),
				i = t.find("a.prev"),
				a = t.find("a.next"),
				f = {
					interval: e && e.interval || 3500,
					animateTime: e && e.animateTime || 500,
					direction: e && "right" === e.direction,
					_imgLen: n.length
				},
				s = 0,
				o = function(e) {
					return s + e >= f._imgLen ? s + e - f._imgLen : s + e
				},
				l = function(e) {
					return s - e < 0 ? f._imgLen + s - e : s - e
				},
				r = function(e) {
					n.eq(e ? l(2) : o(2)).css("left", e ? "-1920px" : "1920px"), n.animate({
						left: (e ? "+" : "-") + "=960px"
					}, f.animateTime), s = e ? l(1) : o(1)
				},
				m = setInterval(function() {
					r(f.direction)
				}, f.interval);
			n.eq(s).css("left", 0).end().eq(s + 1).css("left", "960px").end().eq(s - 1).css("left", "-960px"), t.find(".hero-wrap").add(i).add(a).hover(function() {
				clearInterval(m)
			}, function() {
				m = setInterval(function() {
					r(f.direction)
				}, f.interval)
			}), i.click(function() {
				0 === $(":animated").length && r(!1)
			}), a.click(function() {
				0 === $(":animated").length && r(!0)
			})
		}
	})
});