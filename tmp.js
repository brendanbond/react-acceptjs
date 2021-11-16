/*!
 *
 *     SDK v2
 *     git revision: a8ceb3214780923f4f85ce7ad2ab807b57d77c0e
 *     build num: undefined
 *     branch name: release-21.10.00
 *     built @ 10/12/2021, 4:00:02 PM CDT
 *
 */ !(function (e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function (e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function (t) {
              return e[t];
            }.bind(null, o)
          );
      return r;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = '/checkout-widget/resources/js/'),
    n((n.s = 48));
})([
  function (e, t, n) {
    'use strict';
    var r = n(1),
      o = n.n(r),
      i = n(42),
      a = n.n(i),
      c = n(43),
      s = n.n(c),
      u = function (e, t) {
        var n = '[LOG]';
        switch (t) {
          case 'start':
            (t = 'green'), (n = '[START]');
            break;
          case 'end':
            (t = 'orange'), (n = '[END]');
            break;
          case 'info':
            (t = 'cyan'), (n = '[INFO]');
            break;
          case 'warn':
            (t = 'yellow'), (n = '[WARN]');
            break;
          case 'error':
            (t = 'red'), (n = '[ERROR]');
            break;
          default:
            t = 'grey';
        }
        (e = 'string' == typeof e ? e : JSON.stringify(e, null, 2)),
          console.log('%c'.concat(n, ' : ').concat(e), 'color:'.concat(t));
      },
      d = function (e) {
        return e ? u : function () {};
      },
      l =
        window &&
        window.performance &&
        window.performance.timing &&
        window.performance.mark &&
        'function' == typeof window.performance.mark &&
        window.performance.measure &&
        'function' == typeof window.performance.measure &&
        window.performance.getEntries &&
        'function' == typeof window.performance.getEntries &&
        window.performance.getEntriesByName &&
        'function' == typeof window.performance.getEntriesByName &&
        window.performance.getEntriesByType &&
        'function' == typeof window.performance.getEntriesByType &&
        window.performance.clearMeasures &&
        'function' == typeof window.performance.clearMeasures,
      f = l ? window.performance : void 0,
      p = (function () {
        function e(t, n, r) {
          var i = this;
          a()(this, e),
            o()(this, 'isBookend', function (e) {
              if (i._measures.length > 0) {
                if (!i._measuresSerialized)
                  (i._measuresSerialized = {}),
                    i.measures.forEach(function (e) {
                      i._measuresSerialized[e.end] = e;
                    });
                return void 0 !== i._measuresSerialized[e];
              }
              return !1;
            }),
            o()(this, 'getPerformanceMeasures', function (e) {
              var t = [];
              return (
                f.getEntriesByType('measure').forEach(function (n) {
                  n.name.substr(0, i._namespace.length) === i._namespace &&
                    (t.push({
                      name: n.name.replace(
                        ''.concat(i._namespace).concat(i._ss),
                        ''
                      ),
                      duration: n.duration,
                      startTime: n.startTime,
                    }),
                    n.duration > 6e4 &&
                      i.clog(
                        ''.concat(n.name, ' has >1min duration!!'),
                        'error'
                      ),
                    e && f.clearMeasures(n.name));
                }),
                t
              );
            }),
            o()(this, 'sendPerfMeasure', function (e) {
              var t =
                  !(arguments.length > 1 && void 0 !== arguments[1]) ||
                  arguments[1],
                n = arguments.length > 2 ? arguments[2] : void 0,
                r = i.getPerformanceMeasures(t).pop();
              n &&
                n.budget &&
                r.duration > n.budget &&
                ((r.slow = !0),
                (r.budget = n.budget),
                (r.overbudget = r.duration - n.budget),
                i.clog(
                  ''
                    .concat(r.name, ' is over its performance budget by [ ')
                    .concat(r.overbudget, 'ms ]'),
                  'warn'
                ));
              var o = {
                event: 'PerfInstrumentation',
                event_action: 'Measurements Record',
                event_category: 'Performance Instrumentation',
                event_label: e,
                measurements: r.duration,
              };
              i.clog('@sendPerfMeasure for '.concat(e), 'info'),
                i.clog(o, 'info'),
                i.sendGtm(o);
            }),
            o()(this, 'sendGtm', function (e) {
              i._gtm
                ? i._gtm(e)
                : i.clog('No helper set - cannot send measurements', 'warn');
            }),
            o()(this, 'measure', function (e, t, n) {
              var r =
                  !(arguments.length > 3 && void 0 !== arguments[3]) ||
                  arguments[3],
                o = arguments.length > 4 ? arguments[4] : void 0;
              '' === t &&
                n.indexOf('END') > -1 &&
                (t = n.replace('END', 'START'));
              var a = [t, n];
              if (
                (f.getEntriesByType('mark').forEach(function (e) {
                  e.name === t ? a.shift() : e.name === n && a.pop();
                }),
                0 === a.length)
              )
                try {
                  f.measure(i.ns(e), t, n), i.sendPerfMeasure(e, r, o);
                } catch (r) {
                  f.clearMarks(t),
                    f.clearMarks(n),
                    i.clog(
                      '[PERF] start/end mark exist in entries for '
                        .concat(e, ', but cannot be measured: ')
                        .concat(t, '::')
                        .concat(n, ' -- ')
                        .concat(r),
                      'warn'
                    ),
                    i.sendGtm({
                      event: 'PerfInstrumentation',
                      event_action: 'Measurements ERROR',
                      event_category: 'Performance Instrumentation',
                      event_label: 'ERROR_'.concat(e),
                      event_message: 'Could not measure '
                        .concat(e, ' - ')
                        .concat(r),
                    });
                }
              else
                i.sendGtm({
                  event: 'PerfInstrumentation',
                  event_action: 'Measurements ERROR',
                  event_category: 'Performance Instrumentation',
                  event_label: 'ERROR_'.concat(e),
                  event_message: 'Could not measure '.concat(
                    e,
                    ' - missing a start or end mark.'
                  ),
                });
            }),
            o()(this, 'mark', function (e) {
              if (l) {
                var t = e.indexOf('START') > -1,
                  n = e.indexOf('END') > -1;
                if (
                  (f.clearMeasures(e),
                  i.clog(
                    'MARK [ '.concat(e, ' ]'),
                    t ? 'start' : n ? 'end' : 'info'
                  ),
                  f.mark(e),
                  i.isBookend(e))
                ) {
                  var r = i._measuresSerialized[e];
                  i.clog(
                    'bookending with [ '
                      .concat(i._measuresSerialized[e].start, ' ]->[ ')
                      .concat(e, ' ]')
                  ),
                    i.measure(r.name || e, r.start, r.end, !0, r);
                } else if (n) {
                  var o = e.replace('END', 'START');
                  void 0 === (o = i._seenMarks.indexOf(o) > -1 ? o : void 0) &&
                    i.clog(
                      'seeing an END mark with no START [ '.concat(e, ' ]'),
                      'warn'
                    ),
                    i.measure(e, o, e);
                }
                i._seenMarks.push(e);
              }
            }),
            o()(this, 'ns', function (e) {
              return e.substr(0, i._namespace.length) !== i._namespace
                ? [i._namespace, e].join(i._ss)
                : e;
            }),
            o()(this, 'nsmark', function (e) {
              return i.mark(i.ns(e));
            }),
            o()(this, 'nsmeasure', function (e, t, n) {
              e && n && i.measure(i.ns(e), t ? i.ns(t) : null, i.ns(n), !0);
            }),
            (this._debug = !1),
            (this._seenMarks = []),
            (this._ss = '::'),
            (this._namespace = t || 'visa'.concat(this._ss, 'perf')),
            (this._measures = n || []),
            (this._measuresSerialized = null),
            (this._gtm = r || null),
            (this.clog = d(this._debug));
        }
        return (
          s()(e, [
            {
              key: 'helper',
              get: function () {
                return this._gtm;
              },
              set: function (e) {
                if ('function' != typeof e) {
                  throw new Error('Data collection helper must be a method.');
                }
                this._gtm = e;
              },
            },
            {
              key: 'debug',
              set: function (e) {
                (this._debug = !!e), (this.clog = d(this._debug));
              },
            },
            {
              key: 'measures',
              get: function () {
                return this._measures;
              },
              set: function (e) {
                var t = this;
                if (!(Array.isArray(e) && e.length > 0)) {
                  throw new Error(
                    'Measures must be an array or similar with iterable measure configs.'
                  );
                }
                (this._measures = e.map(function (e) {
                  return (
                    (e.start && e.end) ||
                      (t.clog('No `start` or `end` found', 'error'),
                      t.clog(e, 'error')),
                    e.start.indexOf(t._namespace) < 0 &&
                      (e.start = [t._namespace, e.start].join(t._ss)),
                    e.end.indexOf(t._namespace) < 0 &&
                      (e.end = [t._namespace, e.end].join(t._ss)),
                    e
                  );
                })),
                  (this._measuresSerialized = null);
              },
            },
            {
              key: 'namespace',
              get: function () {
                return this._namespace;
              },
              set: function (e) {
                if (!('string' == typeof e && e.length > 0)) {
                  throw new Error('Namespace must be a string and non-empty');
                }
                this._namespace = e;
              },
            },
          ]),
          e
        );
      })(),
      h = n(11),
      v = n(17);
    function y(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    n.d(t, 'c', function () {
      return g;
    }),
      n.d(t, 'b', function () {
        return S;
      }),
      n.d(t, 'a', function () {
        return C;
      });
    var g = {
        buttonClickEnd: 'visa::perf::END::ButtonClick',
        buttonClickStart: 'visa::perf::START::ButtonClick',
        buttonLoadEnd: 'visa::perf::END::ButtonLoad::',
        buttonLoadStart: 'visa::perf::START::ButtonLoad::',
        createIframeEnd: 'visa::perf::END::CreateIframe',
        createIframeStart: 'visa::perf::START::CreateIframe',
        legacyButtonLoad: 'visa::perf::LegacyButtonLoad::',
        mobileButtonLoad: 'visa::perf::MobileButtonLoad::',
        onVisaReady: 'visa::perf::START::onVisaReadyCalled',
        orchScriptLoadEnd: 'visa::perf::END::orchLoad',
        orchScriptLoadStart: 'visa::perf::START::orchLoad',
        pmRecv: 'visa::perf::RECV::pm::',
        pmSend: 'visa::perf::SEND::pm::',
        popupLoad: 'visa::perf::END::popupLoad',
        sdkEnd: 'visa::perf::END::sdkLoad',
        sdkParse: 'visa::perf::PARSE::sdkLoad',
        sdkStart: 'visa::perf::START::sdkLoad',
        srcIframeLoaded: 'visa::perf::VDCPIframeLoad',
        srcIsRecognized: 'visa::perf::RECV::pm::visa.src.is-recognized',
        vinit: 'visa::perf::VINIT',
      },
      b = [
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'visa:config:config_data'),
          name: 'Init to SRC configs set',
          start: g.vinit,
        },
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'visa:config:merchant_config_response'),
          name: 'Init to merchant configs set',
          start: g.vinit,
        },
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'visa.src.init'),
          name: 'Init to SRC-init',
          start: g.vinit,
        },
        {
          budget: 1e3,
          end: g.srcIsRecognized,
          name: 'Init to SRC isRecognized return',
          start: g.vinit,
        },
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'visa.src.hide-launch-loader'),
          name: 'Button Click to SRC hide launch loader',
          start: g.buttonClickStart,
        },
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'src:app-shell:fetch-configs'),
          name: 'Button Click to appShell fetch configs',
          start: g.buttonClickStart,
        },
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'visa.orch.ino-decision'),
          name: 'Button Click to INO decision',
          start: g.buttonClickStart,
        },
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'visa.orch.init'),
          name: 'Button Click to Orchestration Layer Init',
          start: g.buttonClickStart,
        },
        {
          budget: 1e3,
          end: ''.concat(g.pmRecv, 'visa.orch.is-recognized'),
          name: 'Button Click to Orchestration isRecognized return',
          start: g.buttonClickStart,
        },
        {
          budget: 7e3,
          end: g.buttonClickEnd,
          name: 'Button Click to Button Click End',
          start: g.buttonClickStart,
        },
        {
          budget: 7e3,
          end: g.srcIframeLoaded,
          name: 'Button Click to SRC iframe loaded',
          start: g.buttonClickStart,
        },
      ],
      m = [],
      w = !1;
    function O(e) {
      var t = (function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? y(Object(n), !0).forEach(function (t) {
                o()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : y(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      })(
        { correlation_id: h.a('correlationId'), visit_id: h.a('visitId') },
        e,
        { event_action: 'SDK Performance - sdk2' }
      );
      v.b({ event: t, type: 'visa:gtm:event' }, 'gtm');
    }
    var E = new p('visa::perf', b, function (e) {
      w && h.a('correlationId') && h.a('visitId')
        ? (m.length && (m.forEach(O), (m = [])), O(e))
        : m.push(e);
    });
    E.debug = /^(.*;)?\s*_debug\s*=/.test(document.cookie);
    var S = E.mark;
    function C() {
      (w = !0),
        m.length &&
          h.a('correlationId') &&
          h.a('visitId') &&
          (m.forEach(O), (m = []));
    }
  },
  function (e, t) {
    e.exports = function (e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    };
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
        if (
          Array.isArray(e) ||
          (e = (function (e, t) {
            if (!e) return;
            if ('string' == typeof e) return o(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            'Object' === n && e.constructor && (n = e.constructor.name);
            if ('Map' === n || 'Set' === n) return Array.from(e);
            if (
              'Arguments' === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return o(e, t);
          })(e))
        ) {
          var t = 0,
            n = function () {};
          return {
            s: n,
            n: function () {
              return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
            },
            e: function (e) {
              throw e;
            },
            f: n,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      var r,
        i,
        a = !0,
        c = !1;
      return {
        s: function () {
          r = e[Symbol.iterator]();
        },
        n: function () {
          var e = r.next();
          return (a = e.done), e;
        },
        e: function (e) {
          (c = !0), (i = e);
        },
        f: function () {
          try {
            a || null == r.return || r.return();
          } finally {
            if (c) throw i;
          }
        },
      };
    }
    function o(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    var i =
        /^https:\/\/[\w-\.]+\.?\.visa\.com\/checkout\-widget\/resources\/js\/integration\/v1\/sdk\.js/,
      a =
        /^https:\/\/[\w-\.]+\.?\.visa\.com\/checkout\-widget\/resources\/js\/mobile\-button\.js/;
    var c = {
      '//assets.secure.checkout.visa.com': '//secure.checkout.visa.com',
      '//cert-assets.secure.checkout.visa.com':
        '//cert.secure.checkout.visa.com',
      '//sandbox-assets.secure.checkout.visa.com':
        '//sandbox.secure.checkout.visa.com',
    };
    var s =
      'https://sandbox.secure.checkout.visa.com' !==
      atob('aHR0cHM6Ly9kZXYud3d3LnYubWU');
    n.d(t, 'f', function () {
      return u;
    }),
      n.d(t, 'a', function () {
        return d;
      }),
      n.d(t, 'b', function () {
        return l;
      }),
      n.d(t, 'c', function () {
        return f;
      }),
      n.d(t, 'd', function () {
        return p;
      }),
      n.d(t, 'g', function () {
        return h;
      }),
      n.d(t, 'j', function () {
        return v;
      }),
      n.d(t, 'h', function () {
        return y;
      }),
      n.d(t, 'i', function () {
        return g;
      }),
      n.d(t, 'm', function () {
        return b;
      }),
      n.d(t, 'n', function () {
        return m;
      }),
      n.d(t, 'e', function () {
        return w;
      }),
      n.d(t, 'k', function () {
        return O;
      }),
      n.d(t, 'l', function () {
        return E;
      });
    var u = (function () {
        if (s) return 'https://sandbox.secure.checkout.visa.com';
        var e = (function () {
          var e,
            t = r(document.querySelectorAll('script'));
          try {
            for (t.s(); !(e = t.n()).done; ) {
              var n = e.value;
              if (n.src.match(i)) return n;
              if (n.src.match(a)) return n;
            }
          } catch (e) {
            t.e(e);
          } finally {
            t.f();
          }
          return null;
        })();
        return e
          ? (function (e) {
              for (var t = 0, n = Object.keys(c); t < n.length; t++) {
                var r = n[t];
                if (-1 !== e.indexOf(r)) return e.replace(r, c[r]);
              }
              return e;
            })(e.src.split('/', 3).join('/'))
          : 'https://secure.checkout.visa.com';
      })(),
      d = ''.concat(u).concat('/checkout-widget/sdk2/config'),
      l = ''.concat(u).concat('/checkout-widget/sdk2/gtm'),
      f = ''.concat(u).concat('/checkout-widget-rxo/learn'),
      p = ''.concat(u).concat('/checkout-widget/tmm'),
      h = ''.concat(u).concat('/checkout-widget-rxo/rxo'),
      v = ''.concat(u).concat('/checkout-widget/sdk-loader'),
      y = ''.concat(u).concat('/checkout-widget/sdk_lite_home'),
      g = ''.concat(u).concat('/checkout-widget/sdk-lite'),
      b = 'https://thm.visa.com/fp/tags',
      m = ''.concat(u).concat('/checkout-widget/vcop'),
      w = ''.concat(u).concat('/checkout-widget/resources/js/vsb/vsbSrcSdk.js'),
      O = 'https://thm.visa.com',
      E = 'https://thm.visa.com/fp/tags.js';
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return c;
    }),
      n.d(t, 'a', function () {
        return u;
      }),
      n.d(t, 'c', function () {
        return d;
      }),
      n.d(t, 'q', function () {
        return l;
      }),
      n.d(t, 'n', function () {
        return f;
      }),
      n.d(t, 'g', function () {
        return p;
      }),
      n.d(t, 'l', function () {
        return h;
      }),
      n.d(t, 'k', function () {
        return v;
      }),
      n.d(t, 'h', function () {
        return y;
      }),
      n.d(t, 'e', function () {
        return g;
      }),
      n.d(t, 'f', function () {
        return b;
      }),
      n.d(t, 'p', function () {
        return m;
      }),
      n.d(t, 'j', function () {
        return w;
      }),
      n.d(t, 's', function () {
        return O;
      }),
      n.d(t, 'd', function () {
        return E;
      }),
      n.d(t, 'm', function () {
        return S;
      }),
      n.d(t, 'r', function () {
        return C;
      }),
      n.d(t, 'o', function () {
        return _;
      }),
      n.d(t, 'i', function () {
        return k;
      });
    var r = n(5),
      o = n(8);
    function i(e) {
      if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
        if (
          Array.isArray(e) ||
          (e = (function (e, t) {
            if (!e) return;
            if ('string' == typeof e) return a(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            'Object' === n && e.constructor && (n = e.constructor.name);
            if ('Map' === n || 'Set' === n) return Array.from(e);
            if (
              'Arguments' === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return a(e, t);
          })(e))
        ) {
          var t = 0,
            n = function () {};
          return {
            s: n,
            n: function () {
              return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
            },
            e: function (e) {
              throw e;
            },
            f: n,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      var r,
        o,
        i = !0,
        c = !1;
      return {
        s: function () {
          r = e[Symbol.iterator]();
        },
        n: function () {
          var e = r.next();
          return (i = e.done), e;
        },
        e: function (e) {
          (c = !0), (o = e);
        },
        f: function () {
          try {
            i || null == r.return || r.return();
          } finally {
            if (c) throw o;
          }
        },
      };
    }
    function a(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function c() {
      var e = window.navigator.userAgent;
      return e ? e.toLowerCase() : '';
    }
    function s(e, t) {
      for (var n = e.split('.'), r = t.split('.'); n.length < r.length; )
        n.push('0');
      for (; r.length < n.length; ) r.push('0');
      (n = n.map(Number)), (r = r.map(Number));
      for (var o = 0; o < n.length; ++o) {
        if (r.length === o) return 1;
        if (n[o] !== r[o]) return n[o] > r[o] ? 1 : -1;
      }
      return n.length !== r.length ? -1 : 0;
    }
    function u() {
      return Object(o.a)().split(':')[0];
    }
    function d() {
      var e = c();
      return (
        e.indexOf('android') > -1 &&
        e.indexOf('mozilla/5.0') > -1 &&
        e.indexOf('applewebkit') > -1
      );
    }
    function l() {
      var e = c();
      return (
        e.indexOf('safari') > -1 &&
        -1 === e.indexOf('chrome') &&
        -1 === e.indexOf('crios') &&
        -1 === e.indexOf('fxios')
      );
    }
    function f() {
      var e = c(),
        t = /iphone|ipod|ipad/i.test(e),
        n = /WebKit/i.test(e),
        r = /Firefox|FxiOS/i.test(e);
      return t && n && !r && !/CriOS/i.test(e);
    }
    function p() {
      var e = c();
      return /iphone|ipod|ipad/i.test(e) && /CriOS/i.test(e);
    }
    function h() {
      var e = c();
      return /iPad|iPhone|iPod|Android/.test(e) && !window.MSStream;
    }
    function v() {
      return f() || p();
    }
    function y() {
      var e = c();
      return /\sedg\//i.test(e) || /edg([ea]|ios)/i.test(e);
    }
    function g() {
      var e,
        t,
        n =
          ((e = c()), (t = /(?:ipad|iphone) os ([0-9]+)/.exec(e)) ? t[1] : ''),
        r = (function () {
          var e = c(),
            t = /android ([0-9.]+)/.exec(e);
          return t ? t[1] : '';
        })();
      return (
        (function () {
          var e = c();
          return !/opera/i.test(e) && /msie|trident/i.test(e);
        })() ||
        (n && -1 === s(n, '11')) ||
        (r && -1 === s(r, '4.4.3')) ||
        !document.querySelectorAll ||
        !window.JSON ||
        !window.postMessage
      );
    }
    function b(e) {
      var t,
        n = c(),
        r = i(e);
      try {
        for (r.s(); !(t = r.n()).done; ) {
          var o = t.value;
          if (-1 !== n.indexOf(o.toLowerCase())) return !0;
        }
      } catch (e) {
        r.e(e);
      } finally {
        r.f();
      }
      return !1;
    }
    function m() {
      return (
        -1 !== c().indexOf('vco_sdk') ||
        (r.a.isHybridShimConfirmed() &&
          -1 !==
            window.location.href.indexOf('/checkout-widget/mobile-button?'))
      );
    }
    function w() {
      return -1 !== c().indexOf('vco_hsdk');
    }
    function O() {
      var e = c().match(
        /(opera|android|chrome|vivaldi|micromessenger|samsungbrowser|googlebot|safari|tizen|applewebkit|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      );
      return !((e && 0 !== e.length) || window.navigator.cookieEnabled);
    }
    function E() {
      var e = c();
      return /wv/i.test(e);
    }
    function S() {
      var e = c();
      return /iphone|ipod|ipad/i.test(e) && !/safari/i.test(e);
    }
    function C() {
      var e = c(),
        t =
          window.performance &&
          window.performance.timing &&
          window.performance.mark &&
          'function' == typeof window.performance.mark &&
          window.performance.measure &&
          'function' == typeof window.performance.measure &&
          window.performance.getEntries &&
          'function' == typeof window.performance.getEntries &&
          window.performance.getEntriesByName &&
          'function' == typeof window.performance.getEntriesByName &&
          window.performance.getEntriesByType &&
          'function' == typeof window.performance.getEntriesByType &&
          window.performance.clearMeasures &&
          'function' == typeof window.performance.clearMeasures;
      return (S() && !t) || /uiwebview/i.test(e);
    }
    function _() {
      return !(!E() && !S()) || O();
    }
    function k() {
      return -1 !== window.location.href.indexOf('manualCheckout');
    }
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return r;
    }),
      n.d(t, 'c', function () {
        return o;
      }),
      n.d(t, 'd', function () {
        return i;
      }),
      n.d(t, 'b', function () {
        return a;
      }),
      n.d(t, 'e', function () {
        return c;
      }),
      n.d(t, 'f', function () {
        return s;
      }),
      n.d(t, 'g', function () {
        return u;
      });
    var r =
        'allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups',
      o = 600,
      i = 480,
      a = '600px',
      c = '392px',
      s = {
        checkout: 'vcop-src-frame',
        config: 'CheckoutConfig',
        gtm: 'VmeGtm',
        learn: 'VLearnMore',
        'src-system': 'vcop-src-system-frame',
        thm: 'threatmetrix_iframe',
      },
      u = { checkout: 'VmeCheckoutPopUp' };
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return o;
    });
    var r = n(34).a.SDK(),
      o = function () {
        return Boolean(window.isSdkLiteCrossApp || r.IS_CHROME_CUSTOM_TAB);
      };
    t.a = r;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return r;
    }),
      n.d(t, 'b', function () {
        return o;
      }),
      n.d(t, 'd', function () {
        return i;
      }),
      n.d(t, 'c', function () {
        return a;
      }),
      n.d(t, 'e', function () {
        return c;
      }),
      n.d(t, 'f', function () {
        return h;
      }),
      n.d(t, 'g', function () {
        return s;
      }),
      n.d(t, 'h', function () {
        return u;
      }),
      n.d(t, 'i', function () {
        return d;
      }),
      n.d(t, 'j', function () {
        return l;
      }),
      n.d(t, 'k', function () {
        return v;
      }),
      n.d(t, 'l', function () {
        return f;
      }),
      n.d(t, 'm', function () {
        return y;
      }),
      n.d(t, 'n', function () {
        return p;
      });
    var r = '',
      o = '',
      i = '',
      a = '',
      c = '',
      s = '',
      u = '',
      d = '',
      l = '',
      f = '',
      p = '',
      h = function () {
        return '';
      },
      v = function () {
        return '';
      },
      y = function () {
        return '';
      };
  },
  function (e, t, n) {
    'use strict';
    t.a = {
      error: function (e, t) {
        0;
      },
      warn: function (e, t) {
        0;
      },
    };
  },
  function (e, t, n) {
    'use strict';
    function r() {
      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
        t = window.location,
        n = t.hostname,
        r = t.pathname,
        o = t.port,
        i = t.protocol,
        a = ''
          .concat(i, '//')
          .concat(n)
          .concat(o ? ':' : '')
          .concat(o)
          .concat(r);
      return e
        ? ''.concat(i, '//').concat(n)
        : -1 !== a.indexOf(';')
        ? a.slice(0, a.indexOf(';'))
        : a;
    }
    n.d(t, 'a', function () {
      return r;
    });
  },
  function (e, t) {
    function n(t) {
      return (
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? (e.exports = n =
              function (e) {
                return typeof e;
              })
          : (e.exports = n =
              function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              }),
        n(t)
      );
    }
    e.exports = n;
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return i;
    });
    var r = n(4),
      o = n(15);
    function i(e) {
      if ('self' === e) return window;
      var t = document.getElementById(r.f[e]);
      if (null == t ? void 0 : t.contentWindow) return t.contentWindow;
      if ('checkout' === e) {
        var n = document.getElementById('vcop-dcf');
        if (null == n ? void 0 : n.contentWindow) return n.contentWindow;
        var i = Object(o.a)();
        if (i) return i;
      }
      return null;
    }
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return u;
    }),
      n.d(t, 'b', function () {
        return d;
      });
    var r = n(23),
      o = n(21),
      i = n(14),
      a = null;
    if ('web' !== Object(o.a)()) {
      var c = i.a.getItem('correlationId');
      if (c)
        -1 !== c.search(/^[a-zA-Z0-9-_=\/\+]+$/i) && (a = c),
          i.a.removeItem('correlationId');
      a || (a = Object(r.a)());
    }
    var s = { correlationId: a, visitId: null };
    function u(e) {
      return s[e];
    }
    function d(e, t) {
      return (s[e] = t), t;
    }
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      return !0 === e || 'true' === e ? 'true' : 'false';
    }
    function o(e) {
      return !0 === e || 'true' === e;
    }
    n.d(t, 'b', function () {
      return r;
    }),
      n.d(t, 'a', function () {
        return o;
      });
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return s;
    }),
      n.d(t, 'b', function () {
        return u;
      }),
      n.d(t, 'c', function () {
        return d;
      });
    var r = n(1),
      o = n.n(r),
      i = n(24),
      a = n.n(i);
    function c(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function s(e) {
      return (
        -1 !== e.indexOf('?') && (e = e.split('?')[1]),
        e
          ? e.split('&').reduce(function (e, t) {
              var n = t.split('='),
                r = a()(n, 2),
                o = r[0],
                i = r[1];
              return (e[o] = i), e;
            }, {})
          : {}
      );
    }
    function u(e) {
      for (var t = [], n = 0, r = Object.keys(e); n < r.length; n++) {
        var o = r[n],
          i = e[o];
        null != i &&
          t.push(
            ''
              .concat(encodeURIComponent(o), '=')
              .concat(encodeURIComponent(i.toString()))
          );
      }
      return '?'.concat(t.join('&'));
    }
    function d(e, t) {
      var n = u(
        (function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? c(Object(n), !0).forEach(function (t) {
                  o()(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : c(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        })({}, s(e), {}, t)
      );
      return ''.concat(e.split('?')[0]).concat(n);
    }
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return i;
    }),
      n.d(t, 'a', function () {
        return a;
      });
    var r = (function () {
      try {
        return (
          localStorage.setItem('test', 'test'),
          localStorage.removeItem('test'),
          !0
        );
      } catch (e) {
        return !1;
      }
    })();
    function o(e) {
      return {
        getItem: function (t) {
          if (!r) return null;
          var n = window[e].getItem(t);
          return n &&
            (function (e) {
              return 'thmData' === e;
            })(t)
            ? JSON.parse(n)
            : n;
        },
        removeItem: function (t) {
          r && window[e].removeItem(t);
        },
        setItem: function (t, n) {
          if (r) {
            var o = 'string' == typeof n ? n : JSON.stringify(n);
            window[e].setItem(t, o);
          }
        },
      };
    }
    var i = o('sessionStorage'),
      a = o('localStorage');
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return o;
    }),
      n.d(t, 'a', function () {
        return i;
      });
    var r = null;
    function o(e) {
      r = e;
    }
    function i() {
      return r;
    }
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      t = t.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var n = new RegExp('[\\?&]'.concat(t, '=([^&#]*)')).exec(e);
      return null === n ? '' : decodeURIComponent(n[1].replace(/\+/g, ' '));
    }
    n.d(t, 'a', function () {
      return r;
    });
  },
  function (e, t, n) {
    'use strict';
    var r = n(24),
      o = n.n(r),
      i = n(9),
      a = n.n(i),
      c = n(6),
      s = n(2),
      u = n(3);
    var d = n(10),
      l = n(30),
      f = n(33),
      p = n(7),
      h = n(20);
    function v(e, t) {
      var n = Object(d.a)(t),
        r = (function (e) {
          switch (e) {
            case 'self':
              return window.location.origin;
            case 'checkout':
            case 'config':
            case 'gtm':
            case 'learn':
            case 'src-system':
              return s.f;
            case 'thm':
              return s.m.split('/', 3).join('/');
          }
          return null;
        })(t),
        o = e;
      ('checkout' !== t &&
        'learn' !== t &&
        'self' !== t &&
        'src-system' !== t) ||
        (o = (function (e) {
          return [
            e.type,
            JSON.stringify(e.data || {}),
            JSON.stringify(e.error),
            JSON.stringify(e.sdkOptions),
          ]
            .filter(Boolean)
            .join(h.a);
        })(e)),
        r && n ? n.postMessage(o, r) : p.a.error(c.m, { targetId: t });
    }
    function y(e) {
      function t() {
        window.removeEventListener('message', n);
      }
      function n(n) {
        if (
          n.origin === s.k &&
          n.data &&
          'string' == typeof n.data &&
          n.data.indexOf(':') > 0
        ) {
          var r = n.data.split(':'),
            i = o()(r, 2),
            c = i[0],
            d = i[1];
          e(
            n,
            {
              response: { profilingStatus: c, sessionId: d },
              type: 'visa:thm:response',
            },
            t
          );
        } else if (
          (function (e) {
            var t = Object(l.a)(e.source);
            return (
              !(
                !(Object(u.o)() || Object(u.p)() || Object(u.j)()) ||
                'self' !== t
              ) ||
              (e.origin === s.f &&
                ('string' == typeof e.data || 'object' === a()(e.data)) &&
                'self' !== t)
            );
          })(n)
        ) {
          var p = Object(h.b)(n);
          p &&
            (Object(f.a)(p)
              ? p.forEach(function (r) {
                  e(n, r, t);
                })
              : e(n, p, t));
        }
      }
      return window.addEventListener('message', n), t;
    }
    n.d(t, 'b', function () {
      return v;
    }),
      n.d(t, 'a', function () {
        return y;
      });
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return a;
    }),
      n.d(t, 'b', function () {
        return c;
      });
    var r = n(6),
      o = n(7),
      i = {
        ermEnabled: function (e) {
          return JSON.parse(decodeURIComponent(e));
        },
        hasConsented: function (e) {
          return JSON.parse(decodeURIComponent(e));
        },
        remember_me: function (e) {
          return JSON.parse(atob(e));
        },
        ssiEnabled: function (e) {
          return JSON.parse(decodeURIComponent(e));
        },
      };
    function a(e) {
      var t = RegExp(''.concat(e, '=.[^;]*')),
        n = document.cookie.match(t);
      if (n) {
        var a = n[0].split('=')[1];
        if (a) {
          var c = a;
          if (
            (function (e) {
              return Boolean(i[e]);
            })(e)
          )
            try {
              c = i[e](a);
            } catch (t) {
              o.a.error(r.f, { name: e });
            }
          return c;
        }
      }
      return null;
    }
    function c(e, t, n) {
      var r = new Date(),
        o = window.location && window.location.hostname,
        i =
          'localhost' === o || '10.0.2.2' === o
            ? ''
            : '.secure.checkout.visa.com';
      r.setTime(r.getTime() + 864e5 * n);
      var a = encodeURIComponent(e),
        c = encodeURIComponent(String(t));
      document.cookie = ''
        .concat(a, '=')
        .concat(c, ';domain=')
        .concat(i, ';path=/;expires=')
        .concat(r.toUTCString());
    }
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      if ('number' == typeof e) return parseFloat(e.toFixed(4));
      if ('string' == typeof e) {
        var t = parseFloat(e.replace(/[^\d.]/g, ''));
        return parseFloat(t.toFixed(4));
      }
      return NaN;
    }
    n.d(t, 'a', function () {
      return r;
    });
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return c;
    }),
      n.d(t, 'b', function () {
        return u;
      });
    var r = n(9),
      o = n.n(r),
      i = n(26),
      a = n.n(i),
      c = '--';
    function s(e) {
      var t = e.split(c),
        n = a()(t),
        r = n[0],
        o = n.slice(1),
        i = [],
        s = '';
      return (
        o.forEach(function (e) {
          s && (e = s + c + e);
          try {
            var t = JSON.parse(e);
            i.push(t), (s = '');
          } catch (t) {
            s = e;
          }
        }),
        i.length
          ? {
              data: i[0],
              error: i[1] || null,
              sdkOptions: i[2] || null,
              type: r,
            }
          : null
      );
    }
    function u(e) {
      return e && null !== e.data && void 0 !== e.data
        ? 'object' === o()(e.data)
          ? e.data
          : '{' === e.data.charAt(0) || '[' === e.data.charAt(0)
          ? JSON.parse(e.data)
          : (function (e) {
              return -1 !== e.data.indexOf('+-+-+')
                ? e.data.split('+-+-+').map(s).filter(Boolean)
                : -1 !== e.data.indexOf(c)
                ? s(e.data)
                : null;
            })(e)
        : null;
    }
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return i;
    });
    var r = n(5),
      o = n(3);
    function i() {
      return Object(r.b)()
        ? 'sdk-lite-cross-app'
        : r.a.API_LEVEL < 2
        ? 'web'
        : Object(o.j)()
        ? 'hybrid-plugin'
        : Object(o.p)()
        ? 'sdk-lite'
        : 'web';
    }
  },
  function (e, t, n) {
    'use strict';
    n.r(t),
      n.d(t, '__DO_NOT_USE__ActionTypes', function () {
        return i;
      }),
      n.d(t, 'applyMiddleware', function () {
        return y;
      }),
      n.d(t, 'bindActionCreators', function () {
        return l;
      }),
      n.d(t, 'combineReducers', function () {
        return u;
      }),
      n.d(t, 'compose', function () {
        return v;
      }),
      n.d(t, 'createStore', function () {
        return c;
      });
    var r = n(37),
      o = function () {
        return Math.random().toString(36).substring(7).split('').join('.');
      },
      i = {
        INIT: '@@redux/INIT' + o(),
        REPLACE: '@@redux/REPLACE' + o(),
        PROBE_UNKNOWN_ACTION: function () {
          return '@@redux/PROBE_UNKNOWN_ACTION' + o();
        },
      };
    function a(e) {
      if ('object' != typeof e || null === e) return !1;
      for (var t = e; null !== Object.getPrototypeOf(t); )
        t = Object.getPrototypeOf(t);
      return Object.getPrototypeOf(e) === t;
    }
    function c(e, t, n) {
      var o;
      if (
        ('function' == typeof t && 'function' == typeof n) ||
        ('function' == typeof n && 'function' == typeof arguments[3])
      )
        throw new Error(
          'It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function.'
        );
      if (
        ('function' == typeof t && void 0 === n && ((n = t), (t = void 0)),
        void 0 !== n)
      ) {
        if ('function' != typeof n)
          throw new Error('Expected the enhancer to be a function.');
        return n(c)(e, t);
      }
      if ('function' != typeof e)
        throw new Error('Expected the reducer to be a function.');
      var s = e,
        u = t,
        d = [],
        l = d,
        f = !1;
      function p() {
        l === d && (l = d.slice());
      }
      function h() {
        if (f)
          throw new Error(
            'You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.'
          );
        return u;
      }
      function v(e) {
        if ('function' != typeof e)
          throw new Error('Expected the listener to be a function.');
        if (f)
          throw new Error(
            'You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribelistener for more details.'
          );
        var t = !0;
        return (
          p(),
          l.push(e),
          function () {
            if (t) {
              if (f)
                throw new Error(
                  'You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribelistener for more details.'
                );
              (t = !1), p();
              var n = l.indexOf(e);
              l.splice(n, 1), (d = null);
            }
          }
        );
      }
      function y(e) {
        if (!a(e))
          throw new Error(
            'Actions must be plain objects. Use custom middleware for async actions.'
          );
        if (void 0 === e.type)
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (f) throw new Error('Reducers may not dispatch actions.');
        try {
          (f = !0), (u = s(u, e));
        } finally {
          f = !1;
        }
        for (var t = (d = l), n = 0; n < t.length; n++) {
          (0, t[n])();
        }
        return e;
      }
      function g(e) {
        if ('function' != typeof e)
          throw new Error('Expected the nextReducer to be a function.');
        (s = e), y({ type: i.REPLACE });
      }
      function b() {
        var e,
          t = v;
        return (
          ((e = {
            subscribe: function (e) {
              if ('object' != typeof e || null === e)
                throw new TypeError('Expected the observer to be an object.');
              function n() {
                e.next && e.next(h());
              }
              return n(), { unsubscribe: t(n) };
            },
          })[r.a] = function () {
            return this;
          }),
          e
        );
      }
      return (
        y({ type: i.INIT }),
        ((o = { dispatch: y, subscribe: v, getState: h, replaceReducer: g })[
          r.a
        ] = b),
        o
      );
    }
    function s(e, t) {
      var n = t && t.type;
      return (
        'Given ' +
        ((n && 'action "' + String(n) + '"') || 'an action') +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
      );
    }
    function u(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var o = t[r];
        0, 'function' == typeof e[o] && (n[o] = e[o]);
      }
      var a,
        c = Object.keys(n);
      try {
        !(function (e) {
          Object.keys(e).forEach(function (t) {
            var n = e[t];
            if (void 0 === n(void 0, { type: i.INIT }))
              throw new Error(
                'Reducer "' +
                  t +
                  '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don\'t want to set a value for this reducer, you can use null instead of undefined.'
              );
            if (void 0 === n(void 0, { type: i.PROBE_UNKNOWN_ACTION() }))
              throw new Error(
                'Reducer "' +
                  t +
                  '" returned undefined when probed with a random type. Don\'t try to handle ' +
                  i.INIT +
                  ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.'
              );
          });
        })(n);
      } catch (e) {
        a = e;
      }
      return function (e, t) {
        if ((void 0 === e && (e = {}), a)) throw a;
        for (var r = !1, o = {}, i = 0; i < c.length; i++) {
          var u = c[i],
            d = n[u],
            l = e[u],
            f = d(l, t);
          if (void 0 === f) {
            var p = s(u, t);
            throw new Error(p);
          }
          (o[u] = f), (r = r || f !== l);
        }
        return (r = r || c.length !== Object.keys(e).length) ? o : e;
      };
    }
    function d(e, t) {
      return function () {
        return t(e.apply(this, arguments));
      };
    }
    function l(e, t) {
      if ('function' == typeof e) return d(e, t);
      if ('object' != typeof e || null === e)
        throw new Error(
          'bindActionCreators expected an object or a function, instead received ' +
            (null === e ? 'null' : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      var n = {};
      for (var r in e) {
        var o = e[r];
        'function' == typeof o && (n[r] = d(o, t));
      }
      return n;
    }
    function f(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function p(e, t) {
      var n = Object.keys(e);
      return (
        Object.getOwnPropertySymbols &&
          n.push.apply(n, Object.getOwnPropertySymbols(e)),
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
        n
      );
    }
    function h(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? p(n, !0).forEach(function (t) {
              f(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : p(n).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function v() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return 0 === t.length
        ? function (e) {
            return e;
          }
        : 1 === t.length
        ? t[0]
        : t.reduce(function (e, t) {
            return function () {
              return e(t.apply(void 0, arguments));
            };
          });
    }
    function y() {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (e) {
        return function () {
          var n = e.apply(void 0, arguments),
            r = function () {
              throw new Error(
                'Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.'
              );
            },
            o = {
              getState: n.getState,
              dispatch: function () {
                return r.apply(void 0, arguments);
              },
            },
            i = t.map(function (e) {
              return e(o);
            });
          return h({}, n, { dispatch: (r = v.apply(void 0, i)(n.dispatch)) });
        };
      };
    }
  },
  function (e, t, n) {
    'use strict';
    var r = n(5),
      o = n(3);
    function i() {
      if (r.a.isHybridShimConfirmed()) {
        if (Object(o.d)()) return 'ANDROID_SDK_CHECKOUT-WIDGET';
        if (Object(o.m)()) return 'IOS_SDK_CHECKOUT-WIDGET';
      } else {
        if (Object(o.d)()) return 'ANDROID_WV_CHECKOUT-WIDGET';
        if (Object(o.m)()) return 'IOS_WV_CHECKOUT-WIDGET';
        if (Object(r.b)() && Object(o.c)())
          return 'ANDROID_TWA_CHECKOUT-WIDGET';
        if (Object(o.c)()) return 'ANDROID_CHECKOUT-WIDGET';
        if (Object(o.n)()) return 'IOS_CHECKOUT-WIDGET';
      }
      return 'CHECKOUT-WIDGET';
    }
    function a(e) {
      for (var t = '', n = e; n > 0; --n) t += Math.round(9 * Math.random());
      return t;
    }
    function c() {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i(),
        t = Date.now().toString(),
        n = a(2),
        r = btoa(location.hostname),
        o = t.substring(0, 10),
        c = t.substring(10, t.length);
      return ''
        .concat(o, '_')
        .concat(c, '_')
        .concat(n, '_')
        .concat(r, '_')
        .concat(e);
    }
    n.d(t, 'a', function () {
      return c;
    });
  },
  function (e, t, n) {
    var r = n(27),
      o = n(38),
      i = n(28);
    e.exports = function (e, t) {
      return r(e) || o(e, t) || i();
    };
  },
  function (e, t, n) {
    'use strict';
    var r = [
      'AT',
      'BE',
      'BG',
      'CH',
      'CY',
      'CZ',
      'DE',
      'DK',
      'EE',
      'EL',
      'ES',
      'FI',
      'FR',
      'GB',
      'GR',
      'HR',
      'HU',
      'IE',
      'IS',
      'IT',
      'LI',
      'LT',
      'LU',
      'LV',
      'MT',
      'NL',
      'NO',
      'PL',
      'PT',
      'RO',
      'SE',
      'SI',
      'SK',
      'UK',
    ];
    function o(e) {
      var t = e.isEuroIp,
        n = e.merchantCountryCode,
        o = e.userCountryCode;
      if (t) return !0;
      for (var i = 0; i < r.length; i++) {
        var a = r[i];
        if (o === a || n === a) return !0;
      }
      return !1;
    }
    n.d(t, 'a', function () {
      return o;
    });
  },
  function (e, t, n) {
    var r = n(27),
      o = n(35),
      i = n(28);
    e.exports = function (e) {
      return r(e) || o(e) || i();
    };
  },
  function (e, t) {
    e.exports = function (e) {
      if (Array.isArray(e)) return e;
    };
  },
  function (e, t) {
    e.exports = function () {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance'
      );
    };
  },
  function (e, t, n) {
    'use strict';
    function r(e, t) {
      var n,
        r,
        o,
        i = 'GET';
      'string' == typeof e
        ? (o = e)
        : ((n = e.body), (i = e.method || 'GET'), (r = e.headers), (o = e.url));
      var a = new XMLHttpRequest();
      if (
        (a.open(i, o, !0),
        a.setRequestHeader('Accept', 'application/json'),
        a.setRequestHeader('Content-type', 'application/json'),
        r)
      )
        for (var c in r) a.setRequestHeader(c, r[c]);
      t &&
        (a.onreadystatechange = function () {
          4 == a.readyState &&
            t({
              data: 200 === a.status ? JSON.parse(a.responseText) : null,
              getResponseHeader: a.getResponseHeader.bind(a),
              status: a.status,
            });
        }),
        void 0 === n ? a.send() : a.send(JSON.stringify(n));
    }
    n.d(t, 'a', function () {
      return r;
    });
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return i;
    });
    var r = n(4),
      o = n(15);
    function i(e) {
      if (e === window) return 'self';
      if (!e) return 'unknown';
      var t;
      for (t in r.f) {
        var n = document.getElementById(r.f[t]);
        if ((null == n ? void 0 : n.contentWindow) === e) return t;
      }
      var i = document.getElementById('vcop-dcf');
      return e === (null == i ? void 0 : i.contentWindow) || Object(o.a)() === e
        ? 'checkout'
        : 'unknown';
    }
  },
  function (e, t, n) {
    'use strict';
    function r() {
      return window.onVisaCheckoutReady || window.onVmeReady;
    }
    n.d(t, 'a', function () {
      return r;
    });
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'a', function () {
      return o;
    });
    var r = n(25);
    function o(e) {
      var t = e.cookiePolicyVersion,
        n = e.hasConsented,
        o = e.isCookieConsentEnabled,
        i = e.isEuroIp,
        a = e.merchantCountryCode,
        c = e.userCountryCode;
      return (
        !o ||
        (Object(r.a)({
          isEuroIp: i,
          merchantCountryCode: a,
          userCountryCode: c,
        })
          ? Boolean(n && n.optedIn && parseInt(n.policyVersion, 10) === t)
          : !n || n.optedIn)
      );
    }
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      return '[object Array]' === Object.prototype.toString.call(e);
    }
    n.d(t, 'a', function () {
      return r;
    });
  },
  function (e, t, n) {
    'use strict';
    var r,
      o,
      i,
      a,
      c = 'VisaCheckoutSDK.InboundHybridHandlers.receiveMessage',
      s = function (e) {
        return fetch(e, { credentials: 'same-origin' })
          .then(function (e) {
            return e.arrayBuffer();
          })
          .then(function (e) {
            var t = '';
            return (
              [].slice.call(new Uint8Array(e)).forEach(function (e) {
                return (t += String.fromCharCode(e));
              }),
              btoa(t)
            );
          });
      },
      u = n(41),
      d = function (e) {
        (this.callback = e), (this.id = Object(u.v1)());
      },
      l = (function () {
        var e,
          t,
          n,
          r,
          o,
          i,
          a,
          c,
          s,
          u,
          d,
          l,
          f,
          p =
            null !==
              (n =
                null ===
                  (t =
                    null === (e = window.webkit) || void 0 === e
                      ? void 0
                      : e.messageHandlers) || void 0 === t
                  ? void 0
                  : t.configureVisaCheckoutPlugin) && void 0 !== n
              ? n
              : null ===
                  (o =
                    null === (r = window.webkit) || void 0 === r
                      ? void 0
                      : r.messageHandlers) || void 0 === o
              ? void 0
              : o.getRefreshToken,
          h =
            null === (i = window.V) || void 0 === i
              ? void 0
              : i.uiWebViewPluginVersion,
          v = window.VisaHybridInterface;
        if (p || h || v) return '5.9.0';
        var y =
            null ===
              (c =
                null === (a = window.webkit) || void 0 === a
                  ? void 0
                  : a.messageHandlers) || void 0 === c
              ? void 0
              : c.visaMessage,
          g =
            null === (s = window.VisaAndroid) || void 0 === s
              ? void 0
              : s.visaMessage;
        if (y || g) {
          var b =
            null ===
              (u = /VCO_SDK\/(\d+\.\d+\.\d+)/g.exec(
                window.navigator.userAgent
              )) || void 0 === u
              ? void 0
              : u[1];
          if (b) return b;
          var m =
              null ===
                (l =
                  null === (d = window.webkit) || void 0 === d
                    ? void 0
                    : d.messageHandlers) || void 0 === l
                ? void 0
                : l.supportsSRC,
            w =
              null === (f = window.VisaAndroid) || void 0 === f
                ? void 0
                : f.supportsSRC;
          return m || w ? '7.0.0' : '6.0.0';
        }
        return null;
      })(),
      f = (function (e) {
        if (!e) return 0;
        var t = Number(e.split('.')[0]);
        return t < 6 ? 1 : t < 7 ? 2 : 3;
      })(l),
      p =
        'function' ==
        typeof (null === (r = window.VisaAndroid) || void 0 === r
          ? void 0
          : r.supportsCrossApp),
      h = {
        ANDROID_NAMESPACE: 'VisaAndroid',
        API: f,
        IS_CHROME_CUSTOM_TAB: p,
        STRING: l,
      },
      v = function (e, t, n) {
        var r = t.split('.');
        return (
          r.reduce(function (e, t, o) {
            return o == r.length - 1 ? (e[t] = n) : e[t] || (e[t] = {}), e[t];
          }, e),
          e
        );
      },
      y = function () {
        return (y =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
              for (var o in (t = arguments[n]))
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            return e;
          }).apply(this, arguments);
      },
      g =
        null !==
          (a =
            null ===
              (i =
                null === (o = window.VisaCheckoutSDK) || void 0 === o
                  ? void 0
                  : o.InboundHybridHandlers) || void 0 === i
              ? void 0
              : i.messageHandlers) && void 0 !== a
          ? a
          : [];
    v(window, 'VisaCheckoutSDK.InboundHybridHandlers.messageHandlers', g),
      v(window, c, function (e) {
        g.forEach(function (t) {
          t(e);
        });
      });
    var b,
      m,
      w,
      O,
      E = (function () {
        function e() {
          var e = this;
          (this.receiveMessage = function (t) {
            switch (t.name) {
              case 'result':
                return e._receiveMessageResponse(t);
              case 'forward':
                return 'result' === t.eventName
                  ? e._receiveMessageResponse(t.data)
                  : e._receiveForwardEvent(t);
            }
          }),
            (this._receiveMessageResponse = function (t) {
              var n = e.pendingMessages[t.id];
              n && (delete e.pendingMessages[n.id], n.callback(t));
            }),
            (this.forwardResult = function (t) {
              return e.sendMessage({
                data: t,
                eventName: 'result',
                name: 'forward',
              });
            }),
            (this._receiveForwardEvent = function (t) {
              var n,
                r = t.id,
                o = e._rejectForward,
                i = e._resolveForward,
                a = e.forwardListeners[t.eventName];
              if (a)
                try {
                  var c = a(t.data);
                  'function' == typeof (null == (n = c) ? void 0 : n.then)
                    ? c
                        .then(function (e) {
                          return i(r, e);
                        })
                        .catch(function (e) {
                          return o(r, e);
                        })
                    : c instanceof Error
                    ? o(r, c)
                    : i(r, c);
                } catch (e) {
                  o(r, e);
                }
            }),
            (this._resolveForward = function (t, n) {
              e.forwardResult({ data: n, id: t });
            }),
            (this._rejectForward = function (t, n) {
              var r = n instanceof Error ? n.message : '' + n;
              e.forwardResult({ error: r, id: t });
            }),
            (this.on = function (t, n) {
              return (e.forwardListeners[t] = n), e;
            }),
            (this.removeListener = function (t) {
              delete e.forwardListeners[t];
            }),
            (this.pendingMessages = {}),
            (this.forwardListeners = {}),
            g.push(this.receiveMessage);
        }
        return (
          (e.prototype.sendMessage = function (t) {
            var n = this;
            return new Promise(function (r, o) {
              var i = e._handler('visaMessage');
              if (!i)
                return o(new Error('There is no native message handler setup'));
              var a = new d(function (e) {
                var t;
                return e.error
                  ? o(e.error)
                  : r(null !== (t = e.data) && void 0 !== t ? t : null);
              });
              return (
                ('eventName' in t && 'result' === t.eventName) ||
                  (n.pendingMessages[a.id] = a),
                i(y(y({}, t), { id: a.id }))
              );
            });
          }),
          (e.prototype.forwardEvent = function (e, t) {
            return this.sendMessage({ data: t, eventName: e, name: 'forward' });
          }),
          (e._handler = function (e) {
            var t,
              n,
              r,
              o,
              i,
              a,
              c,
              s =
                null ===
                  (n =
                    null === (t = window.VisaAndroid) || void 0 === t
                      ? void 0
                      : t[e]) || void 0 === n
                  ? void 0
                  : n.bind(window.VisaAndroid);
            if (s)
              return function (e) {
                return s(JSON.stringify(e));
              };
            var u =
              null ===
                (i =
                  null ===
                    (o =
                      null === (r = window.webkit) || void 0 === r
                        ? void 0
                        : r.messageHandlers) || void 0 === o
                    ? void 0
                    : o[e]) || void 0 === i
                ? void 0
                : i.postMessage.bind(
                    null ===
                      (c =
                        null === (a = window.webkit) || void 0 === a
                          ? void 0
                          : a.messageHandlers) || void 0 === c
                      ? void 0
                      : c[e]
                  );
            return u
              ? function (e) {
                  return u(
                    (function (e) {
                      try {
                        return JSON.parse(JSON.stringify(e));
                      } catch (t) {
                        return e;
                      }
                    })(e)
                  );
                }
              : void 0;
          }),
          e
        );
      })(),
      S = function () {
        var e = this;
        (this.plugin = new E()),
          (this.sendVinitReady = function () {
            return e.plugin.sendMessage({
              messagePath: 'window.' + c,
              name: 'onVinitReady',
            });
          }),
          (this.sendResult = function (t) {
            return e.plugin.sendMessage({ data: t, name: 'result' });
          }),
          (this.sendPrefillRequest = function () {
            return e.plugin.sendMessage({ name: 'purchaseInfo.prefill' });
          }),
          (this.buttonClickEnabled = function (t) {
            return e.plugin.sendMessage({
              data: t,
              name: 'buttonClickEnabled',
            });
          });
      },
      C = function () {
        var e = this;
        (this.plugin = new E()),
          (this.clearRememberedUserData = function () {
            e.set('userInfo', null),
              e.set('refresh_token', null, { requireAuth: !0 });
          }),
          (this.get = function (t) {
            return e.plugin.sendMessage({ data: t, name: 'get' });
          }),
          (this.isHybridShimConfirmed = function () {
            return f > 0;
          }),
          (this.isLegacy = function () {
            return 1 === f;
          }),
          (this.isSDKLite = function () {
            return f > 1;
          }),
          (this.isSRCSupported = function () {
            return f > 2;
          }),
          (this.onBackPressed = function () {
            return e.plugin.sendMessage({ name: 'onBack' });
          }),
          (this.onRender = function (t) {
            return e.plugin.on('render', t);
          }),
          (this.postCardArt = function (t) {
            return s(t)
              .then(function (t) {
                e.plugin.sendMessage({ data: t, name: 'newCardArt' });
              })
              .catch(function () {});
          }),
          (this.profileDevice = function (t) {
            return e.plugin.forwardEvent('profileDevice', t);
          }),
          (this.requestPrefillData = function () {
            return e.plugin.forwardEvent('purchaseInfo.prefill');
          }),
          (this.set = function (t, n, r) {
            return e.plugin.sendMessage({
              data: { key: t, value: n },
              name: 'set',
              options: r,
            });
          }),
          (this.syncCookies = function (t) {
            return e.plugin.forwardEvent('cookie', t).then(function (t) {
              t &&
                e.postCardArt(
                  '/wallet-services-web/xo/button.png?cardArtOnly=true&legacy=true'
                );
            });
          });
      },
      _ = {
        accessibility: {
          button: 'Click to pay with payment icon',
          fingerprint_icon: 'Fingerprint icon',
          locked_button: 'Payment service by Visa. Unavailable.',
          spinner: 'Loading',
          spinner_close: 'Cancel and return to merchant',
        },
        logging: {
          already_launched: 'The checkout flow has already been launched.',
          api_check:
            'Devices running on API level __apilevel__ and above can use Visa Checkout functionality.',
          corr_id_session:
            'CorrelationID for this session is __correlationid__',
          internal_error:
            "Visa Checkout had an internal error and can't complete the request.",
          invalid_params: 'Parameters are invalid or nil.',
          lock_reason:
            'Disabling button because this environment is not supported, please try a newer OS.',
          no_network:
            'There is no network connection so payment info was not updated.',
          not_initialized: 'The SDK has not yet been initialized.',
          objc_bridge_warning:
            'Warning -- Objective-C cannot bridge the array values being set on __property__, please use the .rawValue property on the __enum__ enum.',
        },
        ui: {
          biometric_cancel: 'Cancel',
          biometric_signin: 'Sign in',
          fingerprint_confirm: 'Confirm your fingerprint now.',
          fingerprint_continue: 'Confirm fingerprint to continue',
          fingerprint_recognized: 'Fingerprint recognized',
          fingerprint_unrecognized: 'Fingerprint not recognized. Try again',
          touch_sensor: 'Touch sensor',
        },
      },
      k = function () {
        var e = this;
        (this.plugin = new E()),
          (this.API_LEVEL = f),
          (this.IS_CHROME_CUSTOM_TAB = p),
          (this.VERSION = l),
          (this.configureVisaCheckout = function (t, n, r, o) {
            if (!t) return Promise.reject(new Error('Launch URL not set'));
            var i = 'window.' + c;
            return e.plugin.sendMessage({
              data: {
                body: r,
                headers: o,
                messagePath: i,
                method: n,
                url: t + '&hybridNamespace=VisaCheckoutSDK',
              },
              messagePath: i,
              name: 'configure',
            });
          }),
          (this.dismiss = function () {
            return e.plugin.sendMessage({ name: 'dismiss' });
          }),
          (this.get = function (t) {
            return e.plugin.sendMessage({ data: t, name: 'get' });
          }),
          (this.isHybridShimConfirmed = function () {
            return f > 0;
          }),
          (this.isLegacy = function () {
            return 1 === f;
          }),
          (this.isSDKLite = function () {
            return f > 1;
          }),
          (this.isSRCSupported = function () {
            return f > 2;
          }),
          (this.launchVisaCheckout = function (t) {
            return e.plugin.sendMessage({ name: 'launch' }).then(function () {
              return e.plugin.forwardEvent('render', t);
            });
          }),
          (this.notifyReady = function () {
            return e.plugin.sendMessage({ name: 'ready' });
          }),
          (this.onBackPressed = function () {
            return e.plugin.sendMessage({ name: 'onBack' });
          }),
          (this.onButtonFinishedLoad = function (t, n, r) {
            return e.plugin.sendMessage({
              data: { altText: n, altTextKey: r, html: t },
              name: 'onButtonFinishedLoad',
            });
          }),
          (this.onManualCheckout = function () {
            return e.plugin.sendMessage({ name: 'onManualCheckout' });
          }),
          (this.onNativeButtonClick = function () {
            return e.plugin.sendMessage({ name: 'onNativeButtonClick' });
          }),
          (this.onPrefillRequest = function (t) {
            return e.plugin.on('purchaseInfo.prefill', t);
          }),
          (this.onProfileDevice = function (t) {
            return e.plugin.on('profileDevice', t);
          }),
          (this.onRender = function (t) {
            return e.plugin.on('render', t);
          }),
          (this.onSyncCookies = function (t) {
            return e.plugin.on('cookie', t);
          }),
          (this.registerDefaultStrings = function () {
            return e.plugin.sendMessage({
              data: _,
              name: 'registerDefaultStrings',
            });
          }),
          (this.registerMerchantData = function (t) {
            return e.plugin.sendMessage({
              data: t,
              name: 'registerMerchantData',
            });
          }),
          (this.registerMessagePaths = function (t) {
            var n = 'window.' + c;
            return e.plugin.sendMessage({
              checkoutMessagePath: n,
              data: t,
              merchantMessagePath: n,
              name: 'registerMessagePaths',
            });
          }),
          (this.sendOrchestrationHasLoaded = function () {
            return e.plugin.sendMessage({ name: 'orchestrationHasLoaded' });
          }),
          (this.set = function (t, n, r) {
            return e.plugin.sendMessage({
              data: { key: t, value: n },
              name: 'set',
              options: r,
            });
          }),
          (this.showLoading = function (t) {
            return e.plugin.sendMessage({ data: t, name: 'showLoading' });
          }),
          (this.srcLaunch = function () {
            return e.plugin.sendMessage({ name: 'launch' });
          }),
          (this.updatePaymentComplete = function (t) {
            return e.plugin.sendMessage({
              data: { wasSuccessful: t },
              name: 'updatePaymentComplete',
            });
          });
      },
      I = function () {
        var e = this;
        (this.plugin = new E()),
          (this.get = function (t) {
            return e.plugin.sendMessage({ data: t, name: 'get' });
          }),
          (this.isHybridShimConfirmed = function () {
            return f > 0;
          }),
          (this.isLegacy = function () {
            return 1 === f;
          }),
          (this.isSDKLite = function () {
            return f > 1;
          }),
          (this.isSRCSupported = function () {
            return f > 2;
          }),
          (this.onBackPressed = function () {
            return e.plugin.sendMessage({ name: 'onBack' });
          }),
          (this.onPrefill = function (t) {
            return e.plugin.on('purchaseInfo.prefill', t);
          }),
          (this.onRender = function (t) {
            return e.plugin.on('render', t);
          }),
          (this.onRequestConfig = function (t) {
            return e.plugin.on('fetch.config', t);
          }),
          (this.postCardArt = function (t) {
            return s(t)
              .then(function (t) {
                e.plugin.sendMessage({ data: t, name: 'newCardArt' });
              })
              .catch(function () {});
          }),
          (this.registerLocalizedStrings = function (t) {
            return e.plugin.sendMessage({
              data: t,
              name: 'registerLocalizedStrings',
            });
          }),
          (this.requestPrefillData = function () {
            return e.plugin.forwardEvent('purchaseInfo.prefill');
          }),
          (this.set = function (t, n, r) {
            return e.plugin.sendMessage({
              data: { key: t, value: n },
              name: 'set',
              options: r,
            });
          }),
          (this.syncCookies = function (t) {
            return e.plugin.forwardEvent('cookie', t).then(function (t) {
              t &&
                e.postCardArt(
                  '/wallet-services-web/xo/button.png?cardArtOnly=true&legacy=true'
                );
            });
          });
      };
    t.a = {
      Native: function () {
        return b || (b = new S()), b;
      },
      RXO: function () {
        return m || (m = new C()), m;
      },
      SDK: function () {
        return w || (w = new k()), w;
      },
      VDCP: function () {
        return O || (O = new I()), O;
      },
      Version: h,
    };
  },
  function (e, t) {
    e.exports = function (e) {
      if (
        Symbol.iterator in Object(e) ||
        '[object Arguments]' === Object.prototype.toString.call(e)
      )
        return Array.from(e);
    };
  },
  function (e, t, n) {
    'use strict';
    n.d(t, 'b', function () {
      return d;
    }),
      n.d(t, 'a', function () {
        return l;
      });
    var r = n(19);
    function o(e, t) {
      var n = { collectShipping: t.shippingRequired ? 'true' : 'false' };
      return (
        e.acceptedShippingCountries &&
          e.acceptedShippingCountries.length > 0 &&
          (n.acceptedRegions = e.acceptedShippingCountries),
        n
      );
    }
    function i(e) {
      return { buttonAction: e.reviewAction, message: e.reviewMessage };
    }
    function a(e) {
      var t = {};
      if (e.acceptedCardBrands) {
        var n = e.acceptedCardBrands;
        (t.cardBrands = n),
          n.indexOf('VISA') > -1 &&
            (t.acceptCanadianVisaDebit = e.acceptCanadianDebitCards
              ? 'true'
              : 'false');
      }
      return (
        e.acceptedBillingCountries &&
          e.acceptedBillingCountries.length > 0 &&
          (t.billingCountries = e.acceptedBillingCountries),
        t
      );
    }
    function c(e) {
      return {
        threeDSActive: e.threeDSActive ? 'true' : 'false',
        threeDSSuppressChallenge: e.threeDSSuppressChallenge ? 'true' : 'false',
      };
    }
    function s(e) {
      return {
        currencyCode: e.currency,
        customData: e.customData,
        description: e.customDescription,
        discount: e.discount,
        giftWrap: e.giftWrapCharges,
        merchantRequestId: e.requestId,
        misc: e.miscellaneousCharges,
        orderId: e.orderId,
        promoCode: e.promoCode,
        shippingHandling: e.shippingAndHandlingCharges,
        subtotal: Object(r.a)(e.subtotal) || void 0,
        tax: e.tax,
        total: Object(r.a)(e.total) || void 0,
      };
    }
    function u(e, t) {
      return {
        countryCode: e.countryCode,
        currencyFormat: t.currencyFormat,
        customerSupportUrl: e.customerSupportUrl,
        dataLevel: e.datalevel,
        displayName: e.displayName,
        enableUserDataPrefill: t.enableUserDataPrefill,
        encryptionKey: e.encryptionKey,
        locale: e.locale,
        newUserWelcomeMessage: e.welcomeMessage,
        newUserWelcomeMessageDescription: e.welcomeMessageDescription,
        payment: a(e),
        returningUserWelcomeMessage: e.returningUserWelcomeMessage,
        review: i(t),
        shipping: o(e, t),
        threeDSSetup: c(t),
        tokenizationSetup: { enableTokenization: e.enableTokenization },
        websiteUrl: e.websiteUrl,
      };
    }
    function d(e) {
      var t = e.profile,
        n = e.purchaseInfo;
      return {
        apikey: t.apiKey,
        clientId: t.clientId,
        encryptionKey: t.encryptionKey,
        externalClientId: t.externalClientId,
        externalProfileId: t.profileName,
        paymentRequest: s(n),
        referenceCallID: n.referenceCallId,
        settings: u(t, n),
      };
    }
    function l(e) {
      return {
        currencyCode: e.currency,
        subtotal: Object(r.a)(e.subtotal) || void 0,
        total: Object(r.a)(e.total) || void 0,
      };
    }
  },
  function (e, t, n) {
    'use strict';
    (function (e, r) {
      var o,
        i = n(45);
      o =
        'undefined' != typeof self
          ? self
          : 'undefined' != typeof window
          ? window
          : void 0 !== e
          ? e
          : r;
      var a = Object(i.a)(o);
      t.a = a;
    }.call(this, n(49), n(50)(e)));
  },
  function (e, t) {
    e.exports = function (e, t) {
      if (
        Symbol.iterator in Object(e) ||
        '[object Arguments]' === Object.prototype.toString.call(e)
      ) {
        var n = [],
          r = !0,
          o = !1,
          i = void 0;
        try {
          for (
            var a, c = e[Symbol.iterator]();
            !(r = (a = c.next()).done) &&
            (n.push(a.value), !t || n.length !== t);
            r = !0
          );
        } catch (e) {
          (o = !0), (i = e);
        } finally {
          try {
            r || null == c.return || c.return();
          } finally {
            if (o) throw i;
          }
        }
        return n;
      }
    };
  },
  function (e, t) {
    var n =
      ('undefined' != typeof crypto &&
        crypto.getRandomValues &&
        crypto.getRandomValues.bind(crypto)) ||
      ('undefined' != typeof msCrypto &&
        'function' == typeof window.msCrypto.getRandomValues &&
        msCrypto.getRandomValues.bind(msCrypto));
    if (n) {
      var r = new Uint8Array(16);
      e.exports = function () {
        return n(r), r;
      };
    } else {
      var o = new Array(16);
      e.exports = function () {
        for (var e, t = 0; t < 16; t++)
          0 == (3 & t) && (e = 4294967296 * Math.random()),
            (o[t] = (e >>> ((3 & t) << 3)) & 255);
        return o;
      };
    }
  },
  function (e, t) {
    for (var n = [], r = 0; r < 256; ++r)
      n[r] = (r + 256).toString(16).substr(1);
    e.exports = function (e, t) {
      var r = t || 0,
        o = n;
      return [
        o[e[r++]],
        o[e[r++]],
        o[e[r++]],
        o[e[r++]],
        '-',
        o[e[r++]],
        o[e[r++]],
        '-',
        o[e[r++]],
        o[e[r++]],
        '-',
        o[e[r++]],
        o[e[r++]],
        '-',
        o[e[r++]],
        o[e[r++]],
        o[e[r++]],
        o[e[r++]],
        o[e[r++]],
        o[e[r++]],
      ].join('');
    };
  },
  function (e, t, n) {
    var r = n(46),
      o = n(47),
      i = o;
    (i.v1 = r), (i.v4 = o), (e.exports = i);
  },
  function (e, t) {
    e.exports = function (e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function');
    };
  },
  function (e, t) {
    function n(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    e.exports = function (e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  },
  function (e, t, n) {
    'use strict';
    var r = n(22).compose;
    (t.__esModule = !0),
      (t.composeWithDevTools =
        'undefined' != typeof window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
          : function () {
              if (0 !== arguments.length)
                return 'object' == typeof arguments[0]
                  ? r
                  : r.apply(null, arguments);
            }),
      (t.devToolsEnhancer =
        'undefined' != typeof window && window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__
          : function () {
              return function (e) {
                return e;
              };
            });
  },
  function (e, t, n) {
    'use strict';
    function r(e) {
      var t,
        n = e.Symbol;
      return (
        'function' == typeof n
          ? n.observable
            ? (t = n.observable)
            : ((t = n('observable')), (n.observable = t))
          : (t = '@@observable'),
        t
      );
    }
    n.d(t, 'a', function () {
      return r;
    });
  },
  function (e, t, n) {
    var r,
      o,
      i = n(39),
      a = n(40),
      c = 0,
      s = 0;
    e.exports = function (e, t, n) {
      var u = (t && n) || 0,
        d = t || [],
        l = (e = e || {}).node || r,
        f = void 0 !== e.clockseq ? e.clockseq : o;
      if (null == l || null == f) {
        var p = i();
        null == l && (l = r = [1 | p[0], p[1], p[2], p[3], p[4], p[5]]),
          null == f && (f = o = 16383 & ((p[6] << 8) | p[7]));
      }
      var h = void 0 !== e.msecs ? e.msecs : new Date().getTime(),
        v = void 0 !== e.nsecs ? e.nsecs : s + 1,
        y = h - c + (v - s) / 1e4;
      if (
        (y < 0 && void 0 === e.clockseq && (f = (f + 1) & 16383),
        (y < 0 || h > c) && void 0 === e.nsecs && (v = 0),
        v >= 1e4)
      )
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
      (c = h), (s = v), (o = f);
      var g = (1e4 * (268435455 & (h += 122192928e5)) + v) % 4294967296;
      (d[u++] = (g >>> 24) & 255),
        (d[u++] = (g >>> 16) & 255),
        (d[u++] = (g >>> 8) & 255),
        (d[u++] = 255 & g);
      var b = ((h / 4294967296) * 1e4) & 268435455;
      (d[u++] = (b >>> 8) & 255),
        (d[u++] = 255 & b),
        (d[u++] = ((b >>> 24) & 15) | 16),
        (d[u++] = (b >>> 16) & 255),
        (d[u++] = (f >>> 8) | 128),
        (d[u++] = 255 & f);
      for (var m = 0; m < 6; ++m) d[u + m] = l[m];
      return t || a(d);
    };
  },
  function (e, t, n) {
    var r = n(39),
      o = n(40);
    e.exports = function (e, t, n) {
      var i = (t && n) || 0;
      'string' == typeof e &&
        ((t = 'binary' === e ? new Array(16) : null), (e = null));
      var a = (e = e || {}).random || (e.rng || r)();
      if (((a[6] = (15 & a[6]) | 64), (a[8] = (63 & a[8]) | 128), t))
        for (var c = 0; c < 16; ++c) t[i + c] = a[c];
      return t || o(a);
    };
  },
  function (e, t, n) {
    'use strict';
    n.r(t);
    var r = n(6),
      o = n(0),
      i = n(7),
      a = n(31);
    if ((Object(o.b)(o.c.sdkParse), window.V)) {
      i.a.error(r.a);
      var c = Object(a.a)();
      null == c || c();
    } else {
      Object(o.b)(o.c.sdkStart), (0, n(51).default)(), Object(o.b)(o.c.sdkEnd);
    }
  },
  function (e, t) {
    var n;
    n = (function () {
      return this;
    })();
    try {
      n = n || new Function('return this')();
    } catch (e) {
      'object' == typeof window && (n = window);
    }
    e.exports = n;
  },
  function (e, t) {
    e.exports = function (e) {
      if (!e.webpackPolyfill) {
        var t = Object.create(e);
        t.children || (t.children = []),
          Object.defineProperty(t, 'loaded', {
            enumerable: !0,
            get: function () {
              return t.l;
            },
          }),
          Object.defineProperty(t, 'id', {
            enumerable: !0,
            get: function () {
              return t.i;
            },
          }),
          Object.defineProperty(t, 'exports', { enumerable: !0 }),
          (t.webpackPolyfill = 1);
      }
      return t;
    };
  },
  function (e, t, n) {
    'use strict';
    n.r(t);
    var r = n(5),
      o = n(6),
      i = n(2),
      a = n(3),
      c = n(0),
      s = n(7),
      u = n(1),
      d = n.n(u),
      l = n(16),
      f = n(13),
      p = ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'];
    function h(e) {
      if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
        if (
          Array.isArray(e) ||
          (e = (function (e, t) {
            if (!e) return;
            if ('string' == typeof e) return v(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            'Object' === n && e.constructor && (n = e.constructor.name);
            if ('Map' === n || 'Set' === n) return Array.from(e);
            if (
              'Arguments' === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return v(e, t);
          })(e))
        ) {
          var t = 0,
            n = function () {};
          return {
            s: n,
            n: function () {
              return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
            },
            e: function (e) {
              throw e;
            },
            f: n,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      var r,
        o,
        i = !0,
        a = !1;
      return {
        s: function () {
          r = e[Symbol.iterator]();
        },
        n: function () {
          var e = r.next();
          return (i = e.done), e;
        },
        e: function (e) {
          (a = !0), (o = e);
        },
        f: function () {
          try {
            i || null == r.return || r.return();
          } finally {
            if (a) throw o;
          }
        },
      };
    }
    function v(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function y(e) {
      return (
        'VISA' === e || 'MASTERCARD' === e || 'AMEX' === e || 'DISCOVER' === e
      );
    }
    function g(e) {
      return (function (e) {
        var t,
          n = [],
          r = {},
          o = h(e);
        try {
          for (o.s(); !(t = o.n()).done; ) {
            var i = t.value;
            r[i] || ((r[i] = !0), n.push(i));
          }
        } catch (e) {
          o.e(e);
        } finally {
          o.f();
        }
        return n;
      })(
        e
          .split(',')
          .map(function (e) {
            var t = e.trim().toUpperCase();
            return 'MC' === t ? 'MASTERCARD' : t;
          })
          .filter(y)
      );
    }
    function b(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function m(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? b(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : b(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function w() {
      var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : { suppressError: !1 },
        t = document.querySelectorAll('.v-button');
      return (
        e.suppressError || t.length || r.a.isSDKLite() || s.a.error(o.b), t
      );
    }
    function O() {
      var e,
        t = document.querySelector('.v-button[data-active="true"]');
      t || (t = null !== (e = w()[0]) && void 0 !== e ? e : null);
      return t;
    }
    function E(e) {
      return Boolean(e && e.hasAttribute('src'));
    }
    function S(e, t) {
      var n = t.brightness,
        r = t.outline,
        o = void 0 === r ? '' : r,
        i = t.saturation,
        a = void 0 === i ? 1 : i;
      (e.style.transitionProperty = 'filter'),
        (e.style.transitionDuration = '0.25s'),
        (e.style.filter = 'brightness('
          .concat(n, ') saturate(')
          .concat(a, ')')),
        (e.style.outline = o);
    }
    function C(e, t) {
      var n = Object(f.a)(e.src),
        r = Object(f.b)(m({}, n, {}, t)),
        o = e.src.split('?')[0];
      return ''.concat(o).concat(r);
    }
    function _() {
      S(this, { brightness: 0.95 });
    }
    function k() {
      S(this, { brightness: 1 });
    }
    var I = {
      blur: k,
      click: function () {
        Object(c.b)(c.c.buttonClickStart),
          this.setAttribute('data-active', 'true');
      },
      focus: function () {
        this.style.outline = '1px auto rgb(0, 95, 204)';
      },
      keydown: function () {
        Object(c.b)(c.c.buttonClickStart),
          this.setAttribute('data-active', 'true');
      },
      mouseenter: _,
      mouseleave: k,
      mouseup: _,
    };
    function T(e) {
      var t = e.events,
        n = e.updateCardBrandOrder,
        r = !1;
      w().forEach(function (e) {
        if (e) {
          if (E(e) && !r) {
            var o = Object(l.a)(e.src, 'orderedCardBrands');
            if (o && n) {
              var i = g(o);
              n(i);
            }
            r = !0;
          }
          e.tabIndex = 0;
          for (var a = 0, c = Object.keys(I); a < c.length; a++) {
            var s = c[a],
              u = I[s];
            e.addEventListener(s, u);
          }
          for (var d = 0, f = Object.keys(t); d < f.length; d++) {
            var p = f[d],
              h = t[p];
            e.addEventListener(p, h);
          }
        }
      });
    }
    function D(e) {
      var t = O();
      t && E(t) && (t.src = C(t, e));
    }
    function P(e) {
      document.addEventListener('readystatechange', function t() {
        ('interactive' !== document.readyState &&
          'complete' !== document.readyState) ||
          (!(function (e) {
            w().forEach(function (t) {
              return t.addEventListener('click', e);
            });
          })(e),
          document.removeEventListener('readystatechange', t));
      });
    }
    var R = n(30),
      j = n(17),
      N = n(23),
      A = n(11);
    function L(e) {
      return ''.concat(e).concat(
        (function () {
          if (window.crypto) {
            var e = window.crypto.getRandomValues(new Uint8Array(7));
            return Array.from(e, function (e) {
              return e < 10 ? '0'.concat(e) : e.toString(16);
            })
              .join('')
              .substring(0, 7);
          }
          return Math.random().toString(36).substring(2, 9);
        })()
      );
    }
    function M(e, t) {
      return e === t;
    }
    function U(e, t, n) {
      if (null === t || null === n || t.length !== n.length) return !1;
      for (var r = t.length, o = 0; o < r; o++) if (!e(t[o], n[o])) return !1;
      return !0;
    }
    function x(e) {
      var t = Array.isArray(e[0]) ? e[0] : e;
      if (
        !t.every(function (e) {
          return 'function' == typeof e;
        })
      ) {
        var n = t
          .map(function (e) {
            return typeof e;
          })
          .join(', ');
        throw new Error(
          'Selector creators expect all input-selectors to be functions, instead received the following types: [' +
            n +
            ']'
        );
      }
      return t;
    }
    var V = (function (e) {
      for (
        var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1;
        r < t;
        r++
      )
        n[r - 1] = arguments[r];
      return function () {
        for (var t = arguments.length, r = Array(t), o = 0; o < t; o++)
          r[o] = arguments[o];
        var i = 0,
          a = r.pop(),
          c = x(r),
          s = e.apply(
            void 0,
            [
              function () {
                return i++, a.apply(null, arguments);
              },
            ].concat(n)
          ),
          u = e(function () {
            for (var e = [], t = c.length, n = 0; n < t; n++)
              e.push(c[n].apply(null, arguments));
            return s.apply(null, e);
          });
        return (
          (u.resultFunc = a),
          (u.dependencies = c),
          (u.recomputations = function () {
            return i;
          }),
          (u.resetRecomputations = function () {
            return (i = 0);
          }),
          u
        );
      };
    })(function (e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : M,
        n = null,
        r = null;
      return function () {
        return (
          U(t, n, arguments) || (r = e.apply(null, arguments)),
          (n = arguments),
          r
        );
      };
    });
    var B = n(12),
      H = n(32),
      W = n(8),
      G = n(25),
      K = n(9),
      F = n.n(K);
    function q(e) {
      var t = {};
      for (var n in e)
        null !== e[n] &&
          void 0 !== e[n] &&
          ('object' === F()(e[n]) &&
          '[object Array]' !== Object.prototype.toString.call(e[n])
            ? (t[n] = q(e[n]))
            : (t[n] = e[n]));
      return t;
    }
    function z(e) {
      if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
        if (
          Array.isArray(e) ||
          (e = (function (e, t) {
            if (!e) return;
            if ('string' == typeof e) return Y(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            'Object' === n && e.constructor && (n = e.constructor.name);
            if ('Map' === n || 'Set' === n) return Array.from(e);
            if (
              'Arguments' === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return Y(e, t);
          })(e))
        ) {
          var t = 0,
            n = function () {};
          return {
            s: n,
            n: function () {
              return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
            },
            e: function (e) {
              throw e;
            },
            f: n,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      var r,
        o,
        i = !0,
        a = !1;
      return {
        s: function () {
          r = e[Symbol.iterator]();
        },
        n: function () {
          var e = r.next();
          return (i = e.done), e;
        },
        e: function (e) {
          (a = !0), (o = e);
        },
        f: function () {
          try {
            i || null == r.return || r.return();
          } finally {
            if (a) throw o;
          }
        },
      };
    }
    function Y(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function X(e, t) {
      var n,
        r = [],
        o = z(e);
      try {
        for (o.s(); !(n = o.n()).done; ) {
          var i = n.value.trim().toUpperCase();
          -1 !== t.indexOf(i) && r.push(i);
        }
      } catch (e) {
        o.e(e);
      } finally {
        o.f();
      }
      return r;
    }
    var J = /^[a-z]{2}_[A-Z]{2}$/;
    function Q(e) {
      return J.test(e);
    }
    function $(e) {
      if (!e || e.length < 2) return null;
      if (Q(e)) return e;
      if (2 === e.length) return e;
      var t = e.split(/[-_]+/),
        n = t[0].toLowerCase(),
        r = t[t.length - 1].toUpperCase(),
        o = ''.concat(n, '_').concat(r);
      return Q(o) ? o : null;
    }
    var Z = function (e) {
        return e.hybrid.hybridAPIVersion;
      },
      ee = function (e) {
        return e.hybrid.isButtonClicked;
      },
      te = function (e) {
        return e.hybrid.webviewType;
      },
      ne = function (e) {
        return 'checkout' === te(e);
      },
      re = function (e) {
        return 'web' !== e.checkout.integrationType;
      },
      oe = function (e) {
        return e.hybrid.nativeSpinnerActive;
      },
      ie = function (e) {
        return e.hybrid.checkoutWebviewName;
      },
      ae = function (e) {
        return e.hybrid.mobileEnvironment;
      },
      ce = function (e) {
        return e.hybrid.isManualCheckout;
      },
      se = function (e) {
        return e.checkout.integrationType;
      },
      ue = function (e) {
        return e.checkout.isVSB;
      },
      de = function (e) {
        return e.checkout.isVSBButtonless;
      },
      le = function (e) {
        return e.checkout.prefill.status;
      },
      fe = function (e) {
        return e.checkout.startPath;
      },
      pe = function (e) {
        return e.checkout.correlationId;
      },
      he = function (e) {
        return e.checkout.sessionId;
      },
      ve = function (e) {
        return e.checkout.vInit;
      },
      ye = function (e) {
        return e.checkout.status;
      },
      ge = function (e) {
        return e.checkout.response;
      },
      be = function (e) {
        return e.checkout.initTimestamp;
      },
      me = V(se, ae, function (e, t) {
        switch (e) {
          case 'hybrid-plugin':
            return 'HYBRIDWEB';
          case 'sdk-lite':
          case 'sdk-lite-cross-app':
            return 'SDKLITE';
          default:
            return 'unknown' === t ? 'OTHER' : 'WEB';
        }
      }),
      we = function (e, t) {
        var n = ve(e);
        if (!n) return null;
        var r = n[t];
        return void 0 === r ? null : r;
      },
      Oe = function (e) {
        var t, n;
        return null !==
          (t =
            null === (n = e.checkout.vInit) || void 0 === n
              ? void 0
              : n.settings) && void 0 !== t
          ? t
          : null;
      },
      Ee = function (e, t) {
        var n = ve(e);
        if (!n || !n.settings) return null;
        var r = n.settings[t];
        return void 0 === r ? null : r;
      },
      Se = function (e) {
        var t, n;
        return null !==
          (t =
            null === (n = e.checkout.vInit) || void 0 === n
              ? void 0
              : n.apikey) && void 0 !== t
          ? t
          : null;
      },
      Ce = function (e) {
        var t, n;
        return null !==
          (t =
            null !== (n = we(e, 'encryptionKey')) && void 0 !== n
              ? n
              : Ee(e, 'encryptionKey')) && void 0 !== t
          ? t
          : null;
      },
      _e = function (e) {
        return (e.checkout.vInit && e.checkout.vInit.externalProfileId) || null;
      },
      ke = function (e) {
        return e.checkout.vInit
          ? e.checkout.vInit.backgroundImageId
            ? e.checkout.vInit.backgroundImageId
            : Ee(e, 'backgroundImageId')
          : null;
      },
      Ie = V(ve, function (e) {
        var t, n, r;
        return null !==
          (t =
            null == e ||
            null === (n = e.settings) ||
            void 0 === n ||
            null === (r = n.payment) ||
            void 0 === r
              ? void 0
              : r.cardBrands) && void 0 !== t
          ? t
          : null;
      }),
      Te = V(
        function (e) {
          return Ee(e, 'locale');
        },
        function (e) {
          return (function (e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : '-';
            return (e && e.split(t)[1]) || null;
          })(e, '_');
        }
      ),
      De = V(ve, function (e) {
        var t, n;
        return null !==
          (t =
            null == e || null === (n = e.paymentRequest) || void 0 === n
              ? void 0
              : n.currencyCode) && void 0 !== t
          ? t
          : null;
      }),
      Pe = V(ve, function (e) {
        var t, n;
        return null !==
          (t =
            null == e || null === (n = e.paymentRequest) || void 0 === n
              ? void 0
              : n.total) && void 0 !== t
          ? t
          : null;
      }),
      Re = V(ve, function (e) {
        if (!e || !e.settings || !e.settings.shipping) return !0;
        var t = e.settings.shipping.collectShipping;
        return void 0 === t || 'true' === t || !0 === t;
      }),
      je = function (e) {
        return 'active' === e.checkout.status;
      },
      Ne = function (e) {
        return 'queued' === e.checkout.status;
      },
      Ae = function (e) {
        return e.orchestration.status;
      },
      Le = function (e) {
        return e.orchestration.vsbInitResponse;
      },
      Me = function (e, t) {
        var n;
        return null !== (n = e.script[t].loaded) && void 0 !== n ? n : 0;
      },
      Ue = function (e, t) {
        return Boolean(e.script[t].loaded);
      };
    function xe(e) {
      if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
        if (
          Array.isArray(e) ||
          (e = (function (e, t) {
            if (!e) return;
            if ('string' == typeof e) return Ve(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            'Object' === n && e.constructor && (n = e.constructor.name);
            if ('Map' === n || 'Set' === n) return Array.from(e);
            if (
              'Arguments' === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return Ve(e, t);
          })(e))
        ) {
          var t = 0,
            n = function () {};
          return {
            s: n,
            n: function () {
              return t >= e.length ? { done: !0 } : { done: !1, value: e[t++] };
            },
            e: function (e) {
              throw e;
            },
            f: n,
          };
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      }
      var r,
        o,
        i = !0,
        a = !1;
      return {
        s: function () {
          r = e[Symbol.iterator]();
        },
        n: function () {
          var e = r.next();
          return (i = e.done), e;
        },
        e: function (e) {
          (a = !0), (o = e);
        },
        f: function () {
          try {
            i || null == r.return || r.return();
          } finally {
            if (a) throw o;
          }
        },
      };
    }
    function Ve(e, t) {
      (null == t || t > e.length) && (t = e.length);
      for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
      return r;
    }
    function Be(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function He(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Be(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Be(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var We,
      Ge = function (e, t) {
        var n = (function (e) {
          return e.config.configData;
        })(e);
        if (!n) return null;
        var r = n[t];
        return void 0 === r ? null : r;
      },
      Ke = function (e, t) {
        return Ge(e, 'srcEnvConfig')[t];
      },
      Fe = function (e) {
        return e.config.merchantConfigResponse;
      },
      qe = function (e) {
        var t,
          n,
          r,
          o,
          i = Fe(e);
        if (!i) return null;
        var a = i.merchantConfig;
        return He({}, a, {
          billingConstraints: He({}, a.billingConstraints, {
            acceptedRegions:
              null !==
                (t =
                  null === (n = a.billingConstraints) || void 0 === n
                    ? void 0
                    : n.acceptedRegions.region) && void 0 !== t
                ? t
                : [],
          }),
          shippingConstraints: He({}, a.shippingConstraints, {
            acceptedRegions:
              null !==
                (r =
                  null === (o = a.shippingConstraints) || void 0 === o
                    ? void 0
                    : o.acceptedRegions.region) && void 0 !== r
                ? r
                : [],
          }),
        });
      },
      ze = function (e, t) {
        var n = Fe(e);
        if (!n) return null;
        var r = n[t];
        return void 0 === r ? null : r;
      },
      Ye = function (e, t) {
        var n = qe(e);
        if (!n) return null;
        var r = n[t];
        return void 0 === r ? null : r;
      },
      Xe = V(Fe, ke, function (e, t) {
        if (!e) return null;
        var n = e.merchantConfig,
          r = n.backgroundImageId,
          o = n.backgroundImages;
        if (!o) return null;
        var i = o.find(function (e) {
            return e.imageId === r;
          }),
          a = i ? i.imageURL : null;
        if (!t) return a;
        if ('none' === t.toLowerCase()) return null;
        var c = o.find(function (e) {
          return e.imageId === t;
        });
        return (c ? c.imageURL : null) || a || null;
      }),
      Je = function (e) {
        return e.config.configData
          ? e.config.configData.rememberMeType
          : 'legacy';
      },
      Qe = function (e) {
        return (
          (e.config.configData &&
            e.config.configData.vdcpAbTestingWeightedProbabilityValue) ||
          0
        );
      },
      $e = function (e) {
        return !!e.config.configData && e.config.configData.isInternalIp;
      },
      Ze = function (e) {
        return (
          !e.config.configData || e.config.configData.isSplunkLoggingEnabled
        );
      },
      et = function (e) {
        return Object(B.a)(Ke(e, 'isSRCflowEnabled'));
      },
      tt = function (e) {
        return (
          !!e.config.merchantConfigResponse &&
          e.config.merchantConfigResponse.merchantConfig.allowCustomBranding
        );
      },
      nt = function (e) {
        return (
          !!e.config.merchantConfigResponse &&
          e.config.merchantConfigResponse.disableSVGbutton
        );
      },
      rt = function (e) {
        return (
          !!e.config.merchantConfigResponse &&
          e.config.merchantConfigResponse.disableSVGbuttonAnimation
        );
      },
      ot = function (e) {
        var t,
          n = Ee(e, 'displayName'),
          r = Ye(e, 'logo');
        return null !== (t = null == r ? void 0 : r.displayName) && void 0 !== t
          ? t
          : n;
      },
      it = function (e) {
        var t,
          n = Ee(e, 'logoUrl'),
          r = Ye(e, 'logo');
        return null !== (t = null == r ? void 0 : r.url) && void 0 !== t
          ? t
          : n;
      },
      at = function (e) {
        var t,
          n = Ee(e, 'widgetStyle'),
          r = Ye(e, 'widgetStyle');
        return null !== (t = null != n ? n : r) && void 0 !== t ? t : 'OVERLAY';
      },
      ct = function (e) {
        var t;
        return null !== (t = Ge(e, 'gtmUserType')) && void 0 !== t
          ? t
          : 'Unrecognized';
      },
      st = function (e) {
        return (
          !e.config.merchantConfigResponse ||
          e.config.merchantConfigResponse.allowSRC
        );
      },
      ut = function (e) {
        return (
          !e.config.merchantConfigResponse ||
          e.config.merchantConfigResponse.allowSRCInterop
        );
      },
      dt = V(
        function (e) {
          return ze(e, 'srcInfo');
        },
        function (e) {
          var t, n;
          return null !==
            (t =
              null == e || null === (n = e.sdks) || void 0 === n
                ? void 0
                : n.map(function (e) {
                    return e.cardBrand;
                  })) && void 0 !== t
            ? t
            : [];
        }
      ),
      lt = function (e) {
        return (
          !e.config.merchantConfigResponse ||
          e.config.merchantConfigResponse.allowEnrollment
        );
      },
      ft = V(
        se,
        ce,
        nt,
        function (e) {
          return Ge(e, 'isRemembered') || !1;
        },
        function (e, t, n, r) {
          if ('sdk-lite' === e) return t ? 'custom' : 'regular';
          var o = r ? 'CARD_ART' : 'NO_CARD_ART';
          return ''.concat(n ? 'PNG' : 'SVG', '_STATIC_').concat(o);
        }
      ),
      pt = function (e) {
        var t,
          n,
          r = Ee(e, 'guestCheckout');
        return null !== r
          ? Object(B.a)(r)
          : null !==
              (t =
                null === (n = e.config.merchantConfigResponse) || void 0 === n
                  ? void 0
                  : n.merchantConfig.guestCheckout) &&
              void 0 !== t &&
              t;
      },
      ht = function (e) {
        if (!Ye(e, 'enableUserDataPrefill')) return !1;
        var t = Ee(e, 'enableUserDataPrefill');
        return null === t ? null : t;
      },
      vt = function (e) {
        switch (se(e)) {
          case 'hybrid-plugin':
            return 'hybridplugin';
          case 'sdk-lite':
            return '7.x' === Z(e) ? 'sdklite-enhanced' : 'sdklite';
          case 'sdk-lite-cross-app':
            return 'sdklite-cross-app';
        }
        switch (ae(e)) {
          case 'uiwebview':
            return 'hybrid-uiwebview';
          case 'webview':
            return 'hybrid';
        }
        return 'web';
      },
      yt = function (e) {
        return (
          (e.config.merchantConfigResponse &&
            e.config.merchantConfigResponse.countryAllowsFingerprint) ||
          !1
        );
      },
      gt = function (e) {
        var t = we(e, 'externalClientId'),
          n = Ye(e, 'externalClientId');
        return t || n;
      },
      bt = function (e) {
        return e.config.merchantConfigResponse
          ? e.config.merchantConfigResponse.metadata.properties
          : [];
      },
      mt = function (e, t) {
        var n,
          r = xe(bt(e));
        try {
          for (r.s(); !(n = r.n()).done; ) {
            var o = n.value;
            if (o.name === t) return o.value;
          }
        } catch (e) {
          r.e(e);
        } finally {
          r.f();
        }
        return null;
      },
      wt = V(
        function (e) {
          return ze(e, 'metadata');
        },
        function (e) {
          var t;
          return null !== (t = null == e ? void 0 : e.srcNetworks) &&
            void 0 !== t
            ? t
            : { level: 'global', value: 'VISA' };
        }
      ),
      Ot = function (e) {
        var t,
          n = ze(e, 'metadata');
        return null !== (t = null == n ? void 0 : n.srcNetworksFut) &&
          void 0 !== t
          ? t
          : { enabled: !1, level: 'global' };
      },
      Et =
        (V(bt, function (e) {
          var t,
            n = xe(e);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              var r = t.value;
              if ('rxo.allowPasswordlessEnrollment' === r.name)
                return Object(B.a)(r.value);
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
          return !1;
        }),
        V(bt, function (e) {
          var t,
            n = xe(e);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              var r = t.value;
              if ('srcBrandingWOWO' === r.name) return r.value;
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
          return 'INTERNAL_ONLY';
        })),
      St = V(bt, function (e) {
        var t,
          n = xe(e);
        try {
          for (n.s(); !(t = n.n()).done; ) {
            var r = t.value;
            if ('srcInteropWOWO' === r.name) return r.value;
          }
        } catch (e) {
          n.e(e);
        } finally {
          n.f();
        }
        return 'INTERNAL_ONLY';
      }),
      Ct =
        (V(bt, function (e) {
          var t,
            n = xe(e);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              var r = t.value;
              if ('srcBrandingEnabledCountries' === r.name)
                return r.value.split(',');
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
          return [];
        }),
        V(bt, function (e) {
          var t,
            n = xe(e);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              var r = t.value;
              if ('srcInteropEnabledCountries' === r.name)
                return r.value.split(',');
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
          return [];
        }),
        V(bt, function (e) {
          var t,
            n = xe(e);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              var r = t.value;
              if ('srcInteropExperimentCountries' === r.name)
                return r.value.split(',');
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
          return [];
        }),
        V(bt, function (e) {
          var t,
            n = xe(e);
          try {
            for (n.s(); !(t = n.n()).done; ) {
              var r = t.value;
              if ('srcDisabledCountries' === r.name) return r.value.split(',');
            }
          } catch (e) {
            n.e(e);
          } finally {
            n.f();
          }
          return [];
        }),
        V(wt, dt, function (e, t) {
          if (!t.length || !e.value.length) return ['VISA'];
          var n = e.value.trim().toUpperCase();
          return 'ALL' === n
            ? t
            : n
                .split(',')
                .map(function (e) {
                  return e.trim();
                })
                .filter(function (e) {
                  return -1 !== t.indexOf(e);
                });
        })),
      _t = V(
        Ie,
        function (e) {
          return e.config.merchantConfigResponse
            ? e.config.merchantConfigResponse.merchantConfig.paymentConstraints
            : null;
        },
        Ct,
        function (e, t, n) {
          var r, o;
          if (!e && !(null == t ? void 0 : t.paymentTypes.paymentType))
            return n;
          var i = e ? X(e, n) : [];
          if (i.length) return i;
          var a = X(
            null !==
              (r =
                null == t ||
                null === (o = t.paymentTypes.paymentType) ||
                void 0 === o
                  ? void 0
                  : o.map(function (e) {
                      return e.cardBrand;
                    })) && void 0 !== r
              ? r
              : [],
            n
          );
          return a.length ? a : ['VISA'];
        }
      ),
      kt = V(
        function (e) {
          return e.checkout.buttonCardBrandOrder;
        },
        _t,
        function (e, t) {
          return e.filter(function (e) {
            return -1 !== t.indexOf(e);
          });
        }
      ),
      It = function (e) {
        return e.config.merchantConfigResponse
          ? e.config.merchantConfigResponse.srcBrandingOverride
          : 'disabled';
      },
      Tt = function (e) {
        var t;
        return null !== (t = Ee(e, 'currencyFormat')) && void 0 !== t
          ? t
          : Ye(e, 'currencyFormat');
      },
      Dt = V(
        function (e) {
          return Ee(e, 'countryCode');
        },
        Te,
        function (e) {
          return Ye(e, 'merchantCountryCode');
        },
        function (e) {
          return Ye(e, 'partnerCountryCode');
        },
        function (e, t, n, r) {
          return (e || t || n || r || 'US').toUpperCase();
        }
      ),
      Pt = V(
        function (e) {
          return Ge(e, 'cookieLocale');
        },
        function (e) {
          return Ge(e, 'browserLocale');
        },
        function (e) {
          return Ee(e, 'locale');
        },
        Dt,
        function (e, t, n) {
          return $(e || t || n || 'en_US');
        }
      ),
      Rt = V(
        function (e) {
          return e.checkout.finalOptimizelyFlow;
        },
        function (e) {
          return ze(e, 'uxByFormFactor');
        },
        se,
        ae,
        function (e, t, n, r) {
          if (e) return e;
          if (!t) return 'RXO';
          switch (n) {
            case 'hybrid-plugin':
            case 'sdk-lite':
            case 'sdk-lite-cross-app':
              return t.sdkLite;
            case 'web':
              return 'uiwebview' === r || 'webview' === r
                ? t.hybridWeb
                : 'unknown' === r
                ? t.other
                : t.web;
            default:
              return 'RXO';
          }
        }
      ),
      jt = V(
        Rt,
        et,
        function (e) {
          var t = Ke(e, 'supportedBrowsers');
          return t ? t.split(',') : [];
        },
        function (e) {
          var t = Ke(e, 'supportedCountries');
          return t ? t.split(',') : [];
        },
        Dt,
        function (e) {
          return Ge(e, 'isCAuthEnabled');
        },
        function (e, t, n, r, o, i) {
          return i
            ? 'RXO'
            : t
            ? 'RXO' === e ||
              (n.length && !Object(a.f)(n)) ||
              (r.length && -1 === r.indexOf(o))
              ? 'RXO'
              : 'SRC'
            : 'RXO';
        }
      ),
      Nt = V(
        et,
        function (e) {
          return !!e.config.configData && e.config.configData.isCAuthEnabled;
        },
        pt,
        function (e) {
          return Ge(e, 'ssiStatus');
        },
        re,
        function (e, t, n, r, o) {
          return e && !t
            ? 'SRC Eligible'
            : e
            ? n
              ? 'SRC Not Eligible - Guest Checkout Enabled'
              : o
              ? 'SRC Not Eligible - Hybrid User'
              : 'OPTED_IN' === r
              ? 'SRC Not Eligible - SSI Enabled User'
              : 'SRC Not Eligible - undefined'
            : 'SRC Not Eligible - Global SRC Flag Off';
        }
      ),
      At = V(
        function (e) {
          return Ge(e, 'isEuroIp') || !1;
        },
        function (e) {
          return Ye(e, 'merchantCountryCode');
        },
        function (e) {
          return Ge(e, 'cookieCountry');
        },
        function (e, t, n) {
          return Object(G.a)({
            isEuroIp: e,
            merchantCountryCode: t,
            userCountryCode: n,
          });
        }
      ),
      Lt = function (e) {
        var t,
          n,
          r = Ee(e, 'payment'),
          o = (function (e) {
            return e.config.merchantConfigResponse
              ? e.config.merchantConfigResponse.merchantConfig
                  .billingConstraints
              : null;
          })(e);
        if (!o && !r) return { acceptCanadianVisaDebit: 'false' };
        var i = null == r ? void 0 : r.billingCountries;
        return (
          !i &&
            (null == o ? void 0 : o.acceptedRegions.region) &&
            (i =
              null == o
                ? void 0
                : o.acceptedRegions.region.map(function (e) {
                    return e.countryCode;
                  })),
          q({
            acceptCanadianVisaDebit:
              void 0 === (null == r ? void 0 : r.acceptCanadianVisaDebit)
                ? null
                : Object(B.b)(r.acceptCanadianVisaDebit),
            billingCountries: (
              null === (t = i) || void 0 === t ? void 0 : t.length
            )
              ? i
              : null,
            cardBrands: (
              null == r || null === (n = r.cardBrands) || void 0 === n
                ? void 0
                : n.length
            )
              ? r.cardBrands
              : null,
          })
        );
      },
      Mt = function (e) {
        var t,
          n = Ee(e, 'shipping'),
          r = (function (e) {
            var t, n;
            return null !==
              (t =
                null === (n = e.config.merchantConfigResponse) || void 0 === n
                  ? void 0
                  : n.merchantConfig.shippingConstraints) && void 0 !== t
              ? t
              : null;
          })(e);
        if (!r && !n) return { collectShipping: 'false' };
        var o = null == n ? void 0 : n.acceptedRegions;
        !o &&
          (null == r ? void 0 : r.acceptedRegions.region) &&
          (o =
            null == r
              ? void 0
              : r.acceptedRegions.region.map(function (e) {
                  return e.countryCode;
                }));
        var i =
          void 0 === (null == n ? void 0 : n.collectShipping)
            ? null == r
              ? void 0
              : r.collectShipping
            : n.collectShipping;
        return q({
          acceptedRegions: (
            null === (t = o) || void 0 === t ? void 0 : t.length
          )
            ? o
            : null,
          collectShipping: Object(B.b)(null != i && i),
        });
      },
      Ut = function (e) {
        var t = e.config.configData;
        return (
          !!t &&
          !!t.hasConsented &&
          parseInt(t.hasConsented.policyVersion, 10) ===
            t.cookiePolicyVersion &&
          !0 === t.hasConsented.consent
        );
      },
      xt = V(
        function (e) {
          return Ge(e, 'cookiePolicyVersion');
        },
        function (e) {
          return Ge(e, 'hasConsented');
        },
        function (e) {
          return Ge(e, 'isCookieConsentEnabled');
        },
        function (e) {
          return Ge(e, 'isEuroIp');
        },
        function (e) {
          return Ge(e, 'cookieCountry');
        },
        function (e) {
          return Ye(e, 'merchantCountryCode');
        },
        function (e, t, n, r, o, i) {
          return Object(H.a)({
            cookiePolicyVersion: e,
            hasConsented: t,
            isCookieConsentEnabled: n || !1,
            isEuroIp: r || !1,
            merchantCountryCode: i,
            userCountryCode: o,
          });
        }
      ),
      Vt = function (e) {
        var t = e.config.configData;
        if (!t) return !1;
        if (!t.isCookieConsentEnabled) return !1;
        if (!At(e)) return !1;
        if (!t.hasConsented) return !1;
        var n =
          parseInt(t.hasConsented.policyVersion, 10) === t.cookiePolicyVersion;
        return (
          (!t.hasConsented.optedIn || !n) && (!n || !t.hasConsented.consent)
        );
      },
      Bt = function (e) {
        return {
          allowCustomBranding: tt(e),
          allowEnrollment: lt(e),
          collectShipping: Re(e),
          currencyCode: De(e),
          externalClientId: gt(e) || '',
          guestCheckout: pt(e),
          newUserWelcomeMessage: Ee(e, 'newUserWelcomeMessage')
            ? 'custom'
            : 'default',
          newUserWelcomeMessageDescription: Ee(
            e,
            'newUserWelcomeMessageDescription'
          )
            ? 'custom'
            : 'default',
          returningUserWelcomeMessage: Ee(e, 'returningUserWelcomeMessage')
            ? 'custom'
            : 'default',
          total: Pe(e) || '',
          widget_style: at(e),
        };
      },
      Ht = function (e) {
        return 'SRC' === Rt(e);
      },
      Wt = function (e) {
        return Ht(e) ? 'SRC' : 'VCO';
      },
      Gt = function (e) {
        var t;
        return (
          (null === (t = e.config.configData) || void 0 === t
            ? void 0
            : t.isVsbEnabled) && ue(e)
        );
      },
      Kt = function (e) {
        var t;
        return (
          (null === (t = e.config.configData) || void 0 === t
            ? void 0
            : t.isVsbEnabled) && de(e)
        );
      },
      Ft = function (e) {
        var t = ve(e);
        return t
          ? He({}, t, {}, t.settings, { parentUrl: Object(W.a)() })
          : null;
      },
      qt = function (e) {
        var t;
        return null !== (t = we(e, 'clientId')) && void 0 !== t
          ? t
          : Ye(e, 'clientId');
      },
      zt = function (e) {
        return Gt(e)
          ? Kt(e)
            ? 'Integrated-VSB'
            : 'Button-VSB'
          : 'Standard button';
      },
      Yt = function (e) {
        var t,
          n,
          r,
          o,
          i,
          a,
          c,
          s = Lt(e),
          u = Mt(e),
          d = Ee(e, 'threeDSSetup'),
          l = null;
        if (d) {
          var f = d.threeDSActive,
            p = d.threeDSSuppressChallenge;
          l = {
            threeDSActive: f ? Object(B.b)(f) : null,
            threeDSSuppressChallenge: p ? Object(B.b)(p) : null,
          };
        }
        var h = tt(e),
          v = h
            ? {
                newUserWelcomeMessage: Ee(e, 'newUserWelcomeMessage'),
                newUserWelcomeMessageDescription: Ee(
                  e,
                  'newUserWelcomeMessageDescription'
                ),
                returningUserWelcomeMessage: Ee(
                  e,
                  'returningUserWelcomeMessage'
                ),
              }
            : {};
        return He(
          {
            allowCustomBranding: h,
            allowEnrollment: lt(e),
            allowSRC: Object(B.b)(st(e)),
            allowSRCInterop: Object(B.b)(ut(e)),
            apikey: Se(e),
            backgroundImageId: ke(e),
            bannerURL: Ye(e, 'bannerURL'),
            browserLocale: Ge(e, 'browserLocale'),
            clientId: qt(e),
            countryCode: Ee(e, 'countryCode'),
            currencyFormat: Tt(e),
            customerSupportUrl: Ee(e, 'customerSupportUrl'),
            dataLevel: Ee(e, 'dataLevel'),
            displayName: ot(e),
            enableUserDataPrefill: ht(e),
            encryptionKey: Ce(e),
            externalClientId: gt(e),
            externalProfileId: _e(e),
            formFactorMerchantOverride:
              ze(e, 'formFactorMerchantOverride') || !1,
            guestCheckout: pt(e),
            intialVinit: Ft(e),
            locale: Ee(e, 'locale'),
            logoUrl: it(e),
          },
          v,
          {
            parentUrl: Object(W.a)(),
            payment: s,
            paymentRequest:
              null !== (t = we(e, 'paymentRequest')) && void 0 !== t ? t : {},
            referenceCallID: we(e, 'referenceCallID'),
            review: Ee(e, 'review'),
            settings: He({}, Oe(e), {
              logoUrl: null !== (n = it(e)) && void 0 !== n ? n : void 0,
              payment: Lt(e),
              shipping: u,
              widgetStyle: at(e),
            }),
            shipping: u,
            sourceId: we(e, 'sourceId'),
            srcBrandMerchantWhitelist:
              null !== (r = mt(e, 'srcBrandMerchantWhitelist')) && void 0 !== r
                ? r
                : '',
            srcBrandingEnabledCountries:
              null !== (o = mt(e, 'srcBrandingEnabledCountries')) &&
              void 0 !== o
                ? o
                : '',
            srcBrandingOverride: It(e),
            srcBrandingWOWO: Et(e),
            srcDisabledCountries:
              null !== (i = mt(e, 'srcDisabledCountries')) && void 0 !== i
                ? i
                : '',
            srcInfo: ze(e, 'srcInfo'),
            srcInteropEnabledCountries:
              null !== (a = mt(e, 'srcInteropEnabledCountries')) && void 0 !== a
                ? a
                : '',
            srcInteropExperimentCountries:
              null !== (c = mt(e, 'srcInteropExperimentCountries')) &&
              void 0 !== c
                ? c
                : '',
            srcInteropWOWO: St(e),
            srcNetworks: wt(e),
            srcNetworksFut: Ot(e),
            startPath: fe(e),
            threeDSSetup: l,
            tokenizationSetup: Ee(e, 'tokenizationSetup'),
            uxByFormFactor: ze(e, 'uxByFormFactor'),
            websiteUrl: Ee(e, 'websiteUrl'),
          }
        );
      },
      Xt = function (e) {
        return q(
          He({}, ve(e), {
            bannerURL: Ye(e, 'bannerURL'),
            browserLocale: Ge(e, 'browserLocale'),
            clientId: Ye(e, 'clientId'),
            currencyFormat: Tt(e),
            displayName: ot(e),
            enableUserDataPrefill: ht(e),
            externalClientId: gt(e),
            guestCheckout: pt(e),
            logoUrl: it(e),
            parentUrl: Object(W.a)(),
            settings: He({}, Oe(e), {
              logoUrl: it(e),
              payment: Lt(e),
              shipping: Mt(e),
              widgetStyle: at(e),
            }),
          })
        );
      },
      Jt = function (e) {
        var t = ge(e),
          n = He({}, null == t ? void 0 : t.data, { vInitRequest: Xt(e) });
        return Gt(e) && delete n.unbindAppInstance, n;
      },
      Qt = function (e) {
        return {
          allow_enrollment: lt(e),
          buttonCardBrands: kt(e),
          button_type: ft(e),
          card_art_source: 'VCO',
          channel: 'merchant',
          cookieAttributes: {
            can_drop_nonessential_cookies: xt(e),
            cookie_banner_displayed: Vt(e),
            cookie_policy_accepted: Ut(e),
            correlation_id: pe(e),
            event: 'cookie attributes',
            xo_visitid: Ge(e, 'visitId'),
          },
          disable_svg_button: nt(e),
          disable_svg_button_animation: rt(e),
          external_client_id: gt(e),
          flow: 'RXO',
          gtm: Bt(e),
          guest_checkout: pt(e),
          incoming_traffic_source: vt(e),
          merchant_profile_name: _e(e) || 'default',
          partner_name: 'undefined',
          rememberme_type: Je(e),
          src_eligibility: Nt(e),
          user_type: ct(e),
          username_remembered: Ge(e, 'alwaysRemember') || !1,
          vInitRequest: Yt(e),
          vcopParams: {
            browser_protocol: Object(a.a)(),
            buttonType: ft(e),
            button_state: 'enabled',
            cardArtSource: 'VCO',
            coBrandDisplayed: !1,
            coBrandSupport: !1,
            finger_print_auth_enabled: yt(e),
            known_user: Ge(e, 'isRemembered') || !1,
            partnerName: 'undefined',
            stay_signed_in: Ge(e, 'ssiStatus') || 'undefined',
            vcopEnabledDevice: !1,
          },
        };
      },
      $t = function (e) {
        return {
          buttonCardBrands: kt(e) || [],
          cert: Ke(e, 'cert'),
          cookieCountry: Ge(e, 'cookieCountry'),
          cookieLocale: Ge(e, 'cookieLocale'),
          correlationId: pe(e),
          countryCodeFromIp: Ge(e, 'countryCodeFromIp') || null,
          formFactorMerchantOverride: ze(e, 'formFactorMerchantOverride') || !1,
          isCookieConsentEnabled: Object(B.a)(Ke(e, 'isCookieConsentEnabled')),
          isInternalTraffic: $e(e),
          isInteropEligible: 'SRC' === Rt(e),
          isSRCflowEnabled: et(e),
          isSplunkLoggingEnabled: Ze(e),
          merchantConfig: qe(e),
          policyVersion: Ke(e, 'policyVersion'),
          rememberme_type: Je(e),
          sdkParams: Qt(e),
          sessionId: Ke(e, 'sessionId'),
          srcInfo: ze(e, 'srcInfo'),
          supportedBrowsers: Ke(e, 'supportedBrowsers'),
          supportedCountries: Ke(e, 'supportedCountries'),
          uxByFormFactor: ze(e, 'uxByFormFactor'),
          vInitRequest: Yt(e),
          visitId: Ge(e, 'visitId'),
          xoFlow: Rt(e),
        };
      },
      Zt = function (e) {
        var t, n;
        return He({}, q($t(e)), {
          initialBranding: Wt(e),
          initializeVsbStartTime: be(e),
          isTokenizationEnabled:
            null !== (t = Ge(e, 'isTokenizationEnabled')) && void 0 !== t && t,
          isVsb: e.checkout.isVSB,
          isVsbButtonless: e.checkout.isVSBButtonless,
          isVsbEnabled:
            null !== (n = Ge(e, 'isVsbEnabled')) && void 0 !== n && n,
          merchantIntegrationType: zt(e),
          vsbSDKLoadEnd: (Me(e, 'orchestration') - be(e)) / 1e3,
        });
      },
      en = V(
        at,
        function (e) {
          return !!e.config.configData && e.config.configData.rxoPopup;
        },
        function (e, t) {
          var n = Object(a.q)() || Object(a.g)();
          return t && 'POPUP' !== e && n ? 'POPUP' : 'IFRAME';
        }
      ),
      tn = function (e) {
        return (
          !Ne(e) &&
          !je(e) &&
          !re(e) &&
          'locked' !== ye(e) &&
          Fe(e) &&
          'IFRAME' === en(e) &&
          'RXO' === jt(e) &&
          Object(B.a)(mt(e, 'rxo.preload') || !1)
        );
      },
      nn = function (e) {
        if (!Fe(e)) return !1;
        if ('locked' === ye(e)) return !1;
        var t = Rt(e);
        return 'RXO' === t || 'DISABLED' === t || 'loaded' === Ae(e);
      },
      rn = function (e) {
        var t = Rt(e),
          n = Ht(e);
        return 'DISABLED' === t ? 'disabled' : n ? 'isSRC' : 'isLegacy';
      },
      on = V(Ht, _t, function (e, t) {
        if (!e) return null;
        var n = p.filter(function (e) {
          return -1 !== t.indexOf(e);
        });
        return n.length ? n : null;
      }),
      an = V(nt, rt, Ht, on, function (e, t, n, r) {
        var o = { animation: !t, legacy: !n, svg: !e };
        return r && (o.orderedCardBrands = r), o;
      }),
      cn = function (e) {
        return e.thm;
      },
      sn = function (e, t) {
        return e.window[t] || null;
      },
      un = function (e, t) {
        var n = sn(e, t);
        return n ? n.type : null;
      },
      dn = function (e, t, n) {
        var r = sn(e, t);
        return r ? r[n] : null;
      },
      ln = function (e) {
        var t = {
          apikey: Se(e),
          countryCode: Ee(e, 'countryCode'),
          externalClientId: gt(e),
          externalProfileId: _e(e),
          formFactor: me(e),
          locale: Ee(e, 'locale'),
          parentUrl: Object(W.a)(),
        };
        return 'web' !== se(e) && (t.correlationId = pe(e)), t;
      },
      fn = function () {
        return { parentUrl: Object(W.a)() };
      },
      pn = function (e) {
        return Ge(e, 'showSrcTmm') ? i.d : i.c;
      },
      hn = function (e, t) {
        var n = Rt(e),
          r = Ge(e, 'showSrcTmm');
        return {
          apikey: Se(e),
          isLegacy: !Ht(e) && ((r && 'DISABLED' !== n) || !r),
          locale: t ? t.replace('_', '-') : 'en',
          parentUrl: Object(W.a)(),
          xoFlow: n,
        };
      },
      vn = V(jt, Rt, pn, function (e, t, n) {
        return 'DISABLED' === t ? n : 'RXO' === e ? i.g : i.n;
      }),
      yn = function (e) {
        return {
          apikey: Se(e),
          backgroundURL: Xe(e),
          browserLocale: Ge(e, 'browserLocale'),
          cdc: xt(e),
          collectShipping: Re(e),
          country: Ee(e, 'countryCode'),
          countryCode: Ee(e, 'countryCode'),
          euIP: Ge(e, 'isEuroIp') || !1,
          externalClientId: gt(e),
          externalProfileId: _e(e),
          initialBranding: Wt(e),
          isCrossApp: 'sdk-lite-cross-app' === se(e),
          isHybrid: re(e),
          isRXOFrame: !0,
          locale: Ee(e, 'locale'),
          parentUrl: Object(W.a)(),
          postmessage: !0,
          showPopup: 'POPUP' === en(e),
          skipPreload: !tn(e),
        };
      },
      gn = function (e) {
        if ('DISABLED' === Rt(e)) {
          var t = Pt(e);
          return hn(e, t);
        }
        return 'SRC' === jt(e)
          ? (function (e) {
              var t;
              return {
                apikey: Se(e),
                backgroundURL: Xe(e),
                browserLocale: Ge(e, 'browserLocale'),
                cdc: xt(e),
                collectShipping: Re(e),
                correlationId: pe(e),
                country: Ee(e, 'countryCode'),
                countryCode: Ee(e, 'countryCode'),
                euIP: Ge(e, 'isEuroIp') || !1,
                externalClientId: gt(e),
                externalProfileId: _e(e),
                formFactorMerchantOverride: ze(e, 'formFactorMerchantOverride'),
                initialBranding: Wt(e),
                isCrossApp: 'sdk-lite-cross-app' === se(e),
                isHybrid: re(e),
                isSplunkLoggingEnabled: Ze(e),
                locale: null !== (t = Ee(e, 'locale')) && void 0 !== t ? t : '',
                parentUrl: Object(W.a)(),
                postmessage: !0,
                sessionId: he(e),
                showPopup: 'POPUP' === en(e),
                srcBrandingOverride: It(e),
                vabwp: Qe(e),
                visitId: Ge(e, 'visitId'),
                xoFlow: Rt(e),
              };
            })(e)
          : yn(e);
      };
    function bn(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function mn(e, t, n) {
      var r,
        o = e.getState(),
        c = re(o),
        s = se(o),
        u = te(o);
      clearTimeout(We),
        sn(o, 'learn') &&
          e.dispatch({ data: { id: 'learn' }, type: '@@window/CLOSE_WINDOW' }),
        'success' === t.type
          ? ((r = 'checkout_success'),
            'checkout' === u &&
              e.dispatch({
                data: { key: 'correlationId' },
                type: '@@window/REMOVE_LOCALSTORAGE',
              }))
          : (r = 'cancel' === t.type ? 'checkout_cancel' : 'checkout_failure');
      var l = t.data.dataLayer;
      if (l) {
        var f = (function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? bn(Object(n), !0).forEach(function (t) {
                  d()(e, t, n[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
              : bn(Object(n)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(n, t)
                  );
                });
          }
          return e;
        })({}, l);
        delete f.event,
          delete f.event_action,
          delete f.event_category,
          delete f.event_label,
          e.dispatch({ data: f, type: '@@window/SYNC_GTM_DATALAYER' });
      }
      if (
        (e.dispatch({
          data: {
            event: r,
            event_action: r,
            event_category: r,
            event_label: r,
          },
          type: '@@window/SEND_GTM_EVENT',
        }),
        'error' === t.type)
      )
        e.dispatch({ message: t, type: '@@sdk/CHECKOUT_COMPLETE' });
      else {
        var p = Object(N.a)(),
          h = L(Ke(e.getState(), 'sessionIdPrefix'));
        A.b('correlationId', p),
          e.dispatch({
            correlationId: p,
            message: t,
            sessionId: h,
            type: '@@sdk/CHECKOUT_COMPLETE',
          }),
          e.dispatch({
            message: {
              data: { reInitSessionId: h },
              type: 'src:thm:updateTHMIframe',
            },
            target: 'config',
            type: '@@window/SEND_POSTMESSAGE',
          });
      }
      c
        ? (e.dispatch({ type: '@@hybrid/RESET' }),
          'web' !== s &&
            'merchant' === u &&
            !Object(a.n)() &&
            e.dispatch({
              onDismiss: function () {
                e.dispatch({
                  events: { onPrefillRequest: n },
                  type: '@@hybrid/BUTTON_INIT',
                });
              },
              type: '@@hybrid/DISMISS',
            }),
          'error' !== t.type &&
            'sdk-lite-cross-app' === s &&
            e.dispatch({
              data:
                'success' === t.type
                  ? { result: t.data, type: 'payment.success' }
                  : { result: t.data, type: 'payment.cancel' },
              type: '@@hybrid/SEND_RESULT',
            }))
        : ((o = e.getState()),
          e.dispatch({
            data: { id: 'checkout' },
            type: '@@window/CLOSE_WINDOW',
          }),
          tn(o) &&
            e.dispatch({
              data: {
                attributes: { title: 'Visa Checkout' },
                id: 'checkout',
                onLoad: function () {
                  e.dispatch({
                    message: { data: Date.now(), type: 'rxo:render' },
                    target: 'checkout',
                    type: '@@window/SEND_POSTMESSAGE',
                  });
                },
                query: yn(o),
                src: i.g,
                type: 'preload',
              },
              type: '@@window/OPEN_WINDOW',
            }));
    }
    var wn = function () {
      return navigator.languages
        ? navigator.languages[0]
        : navigator.language || '';
    };
    function On(e) {
      var t = e.screen,
        n = t.height,
        r = t.width,
        o = e.innerHeight,
        i = e.innerWidth,
        a = e.outerHeight,
        c = e.outerWidth;
      return (n === a && r === c) || (n === o && r === i);
    }
    var En = function () {
        var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
        return '' === e.trim()
          ? 0
          : [].slice
              .call(document.querySelectorAll('script'))
              .filter(function (t) {
                return Boolean(t.src && -1 !== t.src.indexOf(e));
              }).length;
      },
      Sn = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = document.querySelector('.v-button'),
          n = 'legacy=false';
        return !(null === t || (e && (!t.src || -1 === t.src.indexOf(n))));
      };
    function Cn(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function _n(e, t) {
      var n = (function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? Cn(Object(n), !0).forEach(function (t) {
                d()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : Cn(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t)
                );
              });
        }
        return e;
      })({}, t.data);
      'Spinner Screen Load' === n.event &&
        (n.event_label = 'Spinner Screen Load - '.concat(n.event_label)),
        delete n.vInitRequest,
        e.dispatch({ data: n, type: '@@window/SEND_GTM_EVENT' });
    }
    var kn = n(21);
    function In(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Tn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? In(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : In(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var Dn = Object(kn.a)(),
      Pn = {
        buttonCardBrandOrder: p,
        correlationId: A.a('correlationId'),
        finalOptimizelyFlow: null,
        initTimestamp: 0,
        integrationType: Dn,
        isVSB: !1,
        isVSBButtonless: !1,
        prefill: { data: null, status: 'unconsented' },
        response: null,
        sessionId: null,
        startPath: null,
        status: 'pre-init',
        vInit: null,
      };
    var Rn = /^(.*;)?\s*_debug\s*=/.test(document.cookie),
      jn = Pn.integrationType;
    function Nn(e, t) {
      if ('web' !== jn || Rn) {
        var n = '';
        try {
          n = JSON.stringify(t);
        } catch (e) {}
        (e = n ? ''.concat(e, ' : ').concat(n) : e),
          console.log('@sdk:'.concat(e));
      }
    }
    var An = n(10),
      Ln = n(4);
    function Mn(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Un(e) {
      Nn('fetchDeviceInfo'),
        r.a
          .get('deviceInfo')
          .then(function (t) {
            Nn('@sdk:fetchDeviceInfo:promiseResolved');
            var n = (function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2
                  ? Mn(Object(n), !0).forEach(function (t) {
                      d()(e, t, n[t]);
                    })
                  : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(
                      e,
                      Object.getOwnPropertyDescriptors(n)
                    )
                  : Mn(Object(n)).forEach(function (t) {
                      Object.defineProperty(
                        e,
                        t,
                        Object.getOwnPropertyDescriptor(n, t)
                      );
                    });
              }
              return e;
            })({}, t, {
              nativeSpinnerShown: oe(e.getState()),
              networkInformation: null,
            });
            if (
              (e.dispatch({
                message: {
                  data: n || {},
                  type: 'src:sdklite:fetched-device-info',
                },
                target: 'checkout',
                type: '@@window/SEND_POSTMESSAGE',
              }),
              window.navigator)
            ) {
              var r =
                  (window.navigator.connection && navigator.connection.type) ||
                  'navigator.connection is not available',
                o = {
                  connectionSpeed:
                    (window.navigator.connection &&
                      navigator.connection.effectiveType) ||
                    'navigator.connection is not available',
                  connectionType: r,
                  isOnline: navigator.onLine,
                };
              n.networkInformation = o;
            }
            var i = e.getState(),
              a = Object(An.a)('checkout');
            e.dispatch({
              message: {
                event: 'src:sdklite:fetched-device-info',
                iframeId: Ln.f.checkout,
                payload: n,
                window_name: ie(i),
                window_url: a && a.location.href,
              },
              type: '@@hybrid/LOG_EVENT',
            });
          })
          .catch(function () {
            Nn('fetchDeviceInfo:promiseResolved:error'),
              e.dispatch({
                message: { data: {}, type: 'src:sdklite:fetched-device-info' },
                target: 'checkout',
                type: '@@window/SEND_POSTMESSAGE',
              });
            var t = e.getState(),
              n = Object(An.a)('checkout');
            e.dispatch({
              logLevel: 'ERROR',
              message: {
                event: 'src:sdklite:fetched-device-info',
                iframeId: Ln.f.checkout,
                window_name: ie(t),
                window_url: n && n.location.href,
              },
              status: 400,
              type: '@@hybrid/LOG_EVENT',
            });
          });
    }
    var xn = n(36);
    function Vn(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Bn(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Vn(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Vn(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function Hn(e, t) {
      e.dispatch({ data: t.data, type: '@@thm/LAUNCH' });
    }
    var Wn = function (e, t) {
      return (
        j.a(function (n, o) {
          switch (
            (Object(c.b)(''.concat(c.c.pmRecv).concat(o.type)),
            e.dispatch({
              message: o,
              source: Object(R.a)(n.source),
              type: '@@window/POSTMESSAGE_RECEIVED',
            }),
            o.type)
          ) {
            case 'visa:config:config_data':
              return (function (e, t) {
                A.b('correlationId', t.data.correlationId),
                  A.b('visitId', t.data.visitId);
                var n = e.getState();
                re(n) &&
                  e.dispatch({
                    data: {
                      apiKey: Se(n),
                      correlationId: t.data.correlationId,
                      envHost: i.f,
                      profile: _e(n),
                    },
                    type: '@@hybrid/REGISTER_MERCHANT_DATA',
                  }),
                  e.dispatch({
                    data: t.data,
                    type: '@@config/CONFIG_DATA_RECEIVED',
                  });
              })(e, o);
            case 'visa:config:gtm_metrics':
              return (function (e, t) {
                var n = t.data,
                  r = n.start,
                  o = n.end,
                  i = e.getState(),
                  a = Ne(i) ? 'After' : 'Before';
                e.dispatch({
                  data: { configTiming: a, end: o, start: r },
                  type: '@@config/CONFIG_TIMING_RECEIVED',
                });
              })(e, o);
            case 'visa:config:merchant_config_response':
              return (function (e, t) {
                var n, r;
                if (200 !== t.response.status)
                  return (
                    e.dispatch({
                      status: t.response.status,
                      type: '@@config/MERCHANT_CONFIG_FAILURE',
                    }),
                    Kt(e.getState()) &&
                      e.dispatch({
                        data: { error: { reason: 'Invalid_Request' } },
                        type: '@@orchestration/VSB_INIT_COMPLETE',
                      }),
                    void (
                      401 === t.response.status &&
                      (e.dispatch({ type: '@@button/BUTTON_HIDE' }),
                      e.dispatch({ type: '@@learn/HIDE' }),
                      e.dispatch({
                        message: {
                          data: {},
                          error: { code: 401, message: 'Invalid API Key' },
                          type: 'error',
                        },
                        type: '@@sdk/CHECKOUT_COMPLETE',
                      }))
                    )
                  );
                var o = e.getState(),
                  s = re(o);
                s &&
                  'checkout' === te(o) &&
                  e.dispatch({ type: '@@hybrid/SETUP_MESSAGE_FORWARDING' }),
                  e.dispatch({
                    data: t.response.data,
                    type: '@@config/MERCHANT_CONFIG_SUCCESS',
                  });
                var u = Rt(e.getState());
                if (s || 'DISABLED' !== u) {
                  o = e.getState();
                  var d = pe(o);
                  e.dispatch({
                    data: {
                      correlation_id: d,
                      event: 'flow',
                      flow: u,
                      xo_visitid: Ge(o, 'visitId'),
                    },
                    type: '@@window/SEND_GTM_EVENT',
                  });
                  var l = (function (e) {
                      var t, n;
                      return null !==
                        (t =
                          null === (n = e.config) || void 0 === n
                            ? void 0
                            : n.configTiming) && void 0 !== t
                        ? t
                        : { configTiming: '', end: 0, start: 0 };
                    })(o),
                    f = l.configTiming,
                    p = l.end,
                    h = l.start;
                  e.dispatch({
                    data: {
                      apikey: Se(e.getState()) || 'undefined',
                      elapsed_time: h && p ? p - h : 'undefined',
                      event: 'Visa Checkout Button State',
                      event_action: 'Merchant Config Loaded',
                      event_category: 'Merchant Site',
                      event_label: 'Merchant Config loaded '.concat(
                        f,
                        ' Button Click'
                      ),
                      flow: u,
                    },
                    type: '@@window/SEND_GTM_EVENT',
                  });
                  var v = se(o);
                  ne(o) ||
                    ('web' === v
                      ? e.dispatch({ type: '@@button/BUTTON_LOAD' })
                      : e.dispatch({ type: '@@hybrid/BUTTON_LOAD' }),
                    'RXO' !== u &&
                      'sdk-lite-cross-app' !== v &&
                      (Object(c.b)(c.c.orchScriptLoadStart),
                      e.dispatch({
                        data: {
                          id: 'orchestration',
                          onError: function (t) {
                            e.dispatch({
                              error: t.toString(),
                              type: '@@orchestration/ERROR',
                            });
                            var n = e.getState();
                            if (Gt(n)) {
                              var r = be(n);
                              e.dispatch({
                                data: {
                                  event: 'VSB_Merchant_SDK_Load',
                                  event_action: 'VSB Merchant SDK Load',
                                  event_category: 'VSB Merchant SDK Load',
                                  event_label:
                                    'VSB Merchant SDK Load – Unsuccessful',
                                  time_to_load_vsb_sdk: (Date.now() - r) / 1e3,
                                },
                                type: '@@window/SEND_GTM_EVENT',
                              }),
                                Kt(n) &&
                                  e.dispatch({
                                    data: { isInitCompleted: !1 },
                                    type: '@@orchestration/VSB_INIT_COMPLETE',
                                  });
                            }
                          },
                          onLoad: function () {
                            Object(c.b)(c.c.orchScriptLoadEnd);
                            var t = e.getState();
                            if (Gt(t)) {
                              var n = be(t);
                              e.dispatch({
                                data: {
                                  event: 'VSB_Merchant_SDK_Load',
                                  event_action: 'VSB Merchant SDK Load',
                                  event_category: 'VSB Merchant SDK Load',
                                  event_label:
                                    'VSB Merchant SDK Load – Successful',
                                  time_to_load_vsb_sdk: (Date.now() - n) / 1e3,
                                },
                                type: '@@window/SEND_GTM_EVENT',
                              });
                            }
                            e.dispatch({
                              data: Zt(t),
                              type: '@@orchestration/INIT',
                            });
                          },
                          src: i.e,
                        },
                        type: '@@window/INJECT_SCRIPT',
                      }))),
                    (o = e.getState());
                  var y = Xe(o);
                  y &&
                    e.dispatch({
                      data: { url: y },
                      type: '@@window/PRELOAD_IMAGE',
                    });
                  var g = Ge(o, 'isRemembered') || !1,
                    b = Ge(o, 'ssiStatus');
                  e.dispatch({
                    data: {
                      can_drop_nonessential_cookies: xt(o),
                      cookie_banner_displayed: Vt(o),
                      cookie_policy_accepted: Ut(o),
                      correlation_id: d,
                      event: 'cookie attributes',
                      xo_visitid: Ge(o, 'visitId'),
                    },
                    type: '@@window/SEND_GTM_EVENT',
                  }),
                    e.dispatch({
                      data: {
                        correlation_id: d,
                        event: 'Fullscreen',
                        event_action: 'Fullscreen - '.concat(On(window)),
                        event_category: 'Merchant Site',
                        event_label: 'Fullscreen - '.concat(On(window)),
                        xo_visitid: Ge(o, 'visitId'),
                      },
                      type: '@@window/SEND_GTM_EVENT',
                    });
                  var m = Ht(o);
                  e.dispatch({
                    data: {
                      allow_enrollment: lt(o),
                      api_key: Se(o),
                      auth_type: 'undefined',
                      browser_protocol: Object(a.a)(),
                      button_state: 'enabled',
                      button_type: ft(o),
                      card_art_source: 'VCO',
                      channel: 'merchant',
                      correlation_id: d,
                      disableSVGButton: nt(o),
                      disableSVGButtonAnimation: rt(o),
                      disable_svg_button: nt(o),
                      disable_svg_button_animation: rt(o),
                      event: 'Visa Checkout Button Impression',
                      event_action: 'Visa Checkout Impression',
                      event_category: 'Merchant Site',
                      event_label: 'Visa Checkout Button Impression',
                      external_client_id: gt(o),
                      finger_print_auth_enabled: yt(o),
                      flow: u,
                      guest_checkout: pt(o),
                      incoming_traffic_source: vt(o),
                      knownuser: g,
                      logo_order:
                        m &&
                        null !==
                          (n =
                            null === (r = kt(o)) || void 0 === r
                              ? void 0
                              : r.join(',')) &&
                        void 0 !== n
                          ? n
                          : '',
                      merchant_integration_type: zt(o),
                      merchant_profile_name: _e(o) || 'default',
                      merchant_site: Object(W.a)(!0),
                      partner_name: 'undefined',
                      rememberme_type: Je(o),
                      src_eligibility: Nt(o),
                      stay_signed_in: b || 'undefined',
                      user_type: ct(o),
                      username_remembered: Ge(o, 'alwaysRemember') || !1,
                      xo_visitid: Ge(o, 'visitId'),
                    },
                    type: '@@window/SEND_GTM_EVENT',
                  }),
                    e.dispatch({
                      data: {
                        correlation_id: d,
                        event: 'User type',
                        event_action: 'User type',
                        event_label: ''.concat(ct(o), ' VISA'),
                        xo_visitid: Ge(o, 'visitId'),
                      },
                      type: '@@window/SEND_GTM_EVENT',
                    }),
                    e.dispatch({
                      data: {
                        correlation_id: d,
                        event: 'Remember me',
                        event_action: 'Remember me '.concat(Je(o)),
                        event_label: ''.concat(g, ' VISA'),
                        xo_visitid: Ge(o, 'visitId'),
                      },
                      type: '@@window/SEND_GTM_EVENT',
                    }),
                    e.dispatch({
                      data: {
                        correlation_id: d,
                        event: 'SSI Status',
                        event_action: 'SSI Status',
                        event_label: ''.concat(b, ' VISA'),
                        xo_visitid: Ge(o, 'visitId'),
                      },
                      type: '@@window/SEND_GTM_EVENT',
                    }),
                    (o = e.getState()),
                    tn(o) &&
                      e.dispatch({
                        data: {
                          attributes: { title: 'Visa Checkout' },
                          id: 'checkout',
                          onLoad: function () {
                            e.dispatch({
                              message: { data: Date.now(), type: 'rxo:render' },
                              target: 'checkout',
                              type: '@@window/SEND_POSTMESSAGE',
                            });
                          },
                          query: yn(o),
                          src: i.g,
                          type: 'preload',
                        },
                        type: '@@window/OPEN_WINDOW',
                      }),
                    (o = e.getState());
                  var w = Ye(o, 'merchantCountryCode'),
                    O = Ye(o, 'partnerCountryCode'),
                    E = Ee(o, 'countryCode'),
                    S = Ee(o, 'locale');
                  (function (e) {
                    var t = e.gtmNsmi.vInitCallStack;
                    return (
                      -1 !== t.indexOf('onVisaCheckoutReady') ||
                      -1 !== t.indexOf('onVmeReady')
                    );
                  })(o) ||
                    e.dispatch({
                      data: {
                        event: 'NSMI',
                        event_action:
                          '[1] V.init() called outside of onVisaCheckoutReady/onVmeReady',
                        event_category: 'Non-standard Merchant Integration',
                        event_label:
                          'V.init() called outside of onVisaCheckoutReady/onVmeReady',
                      },
                      type: '@@window/SEND_GTM_EVENT',
                    }),
                    self !== top &&
                      e.dispatch({
                        data: {
                          event: 'NSMI',
                          event_action: '[2] Merchant SDK in iframe',
                          event_category: 'Non-standard Merchant Integration',
                          event_label: 'Merchant SDK in iframe',
                        },
                        type: '@@window/SEND_GTM_EVENT',
                      }),
                    (function (e) {
                      return e.gtmNsmi.vInitClickSpySelected;
                    })(o) &&
                      e.dispatch({
                        data: {
                          event: 'NSMI',
                          event_action: '[3] V.init invoked after button click',
                          event_category: 'Non-standard Merchant Integration',
                          event_label: 'V.init invoked after button click',
                        },
                        type: '@@window/SEND_GTM_EVENT',
                      }),
                    Sn() ||
                      e.dispatch({
                        data: {
                          event: 'NSMI',
                          event_action: '[9] Button missing v-button class',
                          event_category: 'Non-standard Merchant Integration',
                          event_label: 'Button missing v-button class',
                        },
                        type: '@@window/SEND_GTM_EVENT',
                      }),
                    Sn(!0) ||
                      e.dispatch({
                        data: {
                          event: 'NSMI',
                          event_action:
                            '[10] Button src does not match expected URL',
                          event_category: 'Non-standard Merchant Integration',
                          event_label: 'Button src does not match expected URL',
                        },
                        type: '@@window/SEND_GTM_EVENT',
                      }),
                    En('checkout-widget/resources/js/integration/v1/sdk.js') >
                      1 &&
                      e.dispatch({
                        data: {
                          event: 'NSMI',
                          event_action: '[11] Multiple loads of Merchant SDK',
                          event_category: 'Non-standard Merchant Integration',
                          event_label: 'Multiple loads of Merchant SDK',
                        },
                        type: '@@window/SEND_GTM_EVENT',
                      }),
                    En(
                      'checkout-widget/resources/js/src-i-adapter/visaSdk.js'
                    ) > 1 &&
                      e.dispatch({
                        data: {
                          event: 'NSMI',
                          event_action: '[12] Two VisaSDK initialized',
                          event_category: 'Non-standard Merchant Integration',
                          event_label: 'Two VisaSDK initialized',
                        },
                        type: '@@window/SEND_GTM_EVENT',
                      });
                  var C = [
                    'browser.locale: '.concat(wn()),
                    'browser.domain: '.concat(document.domain),
                    'Vinit.countryCode: '.concat(E),
                    'Vinit.locale: '.concat(S),
                    'merchantConfig.merchantCountryCode: '.concat(w),
                    'merchantConfig.partnerCountryCode: '.concat(O),
                  ].join('; ');
                  e.dispatch({
                    data: {
                      event: 'NSMI',
                      event_action: '[7] Country/locale SDK data',
                      event_category: 'Non-standard Merchant Integration',
                      event_label: 'Country/locale SDK data -- '.concat(C),
                    },
                    type: '@@window/SEND_GTM_EVENT',
                  });
                } else e.dispatch({ type: '@@sdk/CHECKOUT_DISABLED_BY_FORM_FACTOR' });
              })(e, o);
            case 'visa:config:thm_data':
              return Hn(e, o);
            case 'close':
              return (function (e) {
                e.dispatch({
                  data: { id: 'learn' },
                  type: '@@window/CLOSE_WINDOW',
                });
              })(e);
            case 'launchFromLearn':
              return (function (e, t) {
                e.dispatch({
                  data: { id: 'learn' },
                  type: '@@window/CLOSE_WINDOW',
                }),
                  e.dispatch({
                    data: { startPath: t.data.startPath },
                    type: '@@sdk/CHECKOUT_QUEUED',
                  });
              })(e, o);
            case 'fitContent':
              return (function (e, t) {
                e.dispatch({ data: t.data, type: '@@learn/FIT_CONTENT' });
              })(e, o);
            case 'launchThmIframe':
              return Hn(e, o);
            case 'ghostLayerText':
              return (function (e, t) {
                e.dispatch({
                  data: t.data,
                  events: {
                    onCancelClick: function () {
                      e.dispatch({
                        message: { type: 'ghostLayerCancelReturnClick' },
                        target: 'checkout',
                        type: '@@window/SEND_POSTMESSAGE',
                      });
                    },
                    onFindClick: function () {
                      e.dispatch({
                        message: { type: 'ghostLayerFindButtonClick' },
                        target: 'checkout',
                        type: '@@window/SEND_POSTMESSAGE',
                      });
                    },
                    onRestartClick: function () {
                      e.dispatch({
                        message: { type: 'mobileSafariPopupRestart' },
                        target: 'checkout',
                        type: '@@window/SEND_POSTMESSAGE',
                      }),
                        setTimeout(function () {
                          e.dispatch({
                            data: { id: 'checkout' },
                            type: '@@window/CLOSE_WINDOW',
                          }),
                            setTimeout(function () {
                              e.dispatch({ type: '@@sdk/CHECKOUT_QUEUED' });
                            }, 150);
                        }, 50);
                    },
                  },
                  type: '@@window/RECEIVED_POPUP_OVERLAY_TEXT',
                });
              })(e, o);
            case 'getMerchantConfig':
              return (function (e) {
                var t = e.getState();
                e.dispatch({
                  message: {
                    data: { merchantConfig: qe(t), vInitRequest: Yt(t) },
                    type: 'setMerchantConfig',
                  },
                  target: 'checkout',
                  type: '@@window/SEND_POSTMESSAGE',
                });
              })(e);
            case 'getSDKParams':
              return (function (e) {
                e.dispatch({
                  message: { data: Qt(e.getState()), type: 'setSDKParams' },
                  target: 'checkout',
                  type: '@@window/SEND_POSTMESSAGE',
                });
              })(e);
            case 'storeAdditionalXoParams':
              return (function (e, t) {
                e.dispatch({
                  data: t.data,
                  type: '@@config/UPDATE_SDK_PARAMS',
                });
              })(e, o);
            case 'applyRxoStyles':
              return (function (e) {
                Object(a.l)() &&
                  e.dispatch({
                    data: 'rxo-ios-android',
                    type: '@@window/ADD_BODY_CLASS',
                  });
              })(e);
            case 'getABData':
              return (function (e) {
                e.dispatch({
                  message: { data: {}, type: 'setABData' },
                  target: 'checkout',
                  type: '@@window/SEND_POSTMESSAGE',
                });
              })(e);
            case 'src:app-shell:fetch-configs':
              return (function (e) {
                e.dispatch({
                  message: {
                    data: $t(e.getState()),
                    type: 'src:app-shell:fetched-configs',
                  },
                  target: 'checkout',
                  type: '@@window/SEND_POSTMESSAGE',
                });
              })(e);
            case 'src:sdklite:fetch-device-info':
              return Un(e);
            case 'src:sdklite:fetch-user-info':
              return (function (e) {
                Nn('fetchUserInfo'),
                  r.a
                    .get('userInfo')
                    .then(function (t) {
                      Nn('fetchUserInfo:promiseResolved'),
                        e.dispatch({
                          message: {
                            data: t || {},
                            type: 'src:sdklite:fetched-user-info',
                          },
                          target: 'checkout',
                          type: '@@window/SEND_POSTMESSAGE',
                        });
                      var n = e.getState(),
                        r = Object(An.a)('checkout');
                      e.dispatch({
                        message: {
                          event: 'src:sdklite:fetched-user-info',
                          iframeId: Ln.f.checkout,
                          payload: t || {},
                          window_name: ie(n),
                          window_url: r && r.location.href,
                        },
                        type: '@@hybrid/LOG_EVENT',
                      });
                    })
                    .catch(function () {
                      Nn('fetchUserInfo:promiseResolved:error'),
                        e.dispatch({
                          message: {
                            data: {},
                            type: 'src:sdklite:fetched-user-info',
                          },
                          target: 'checkout',
                          type: '@@window/SEND_POSTMESSAGE',
                        });
                      var t = e.getState(),
                        n = Object(An.a)('checkout');
                      e.dispatch({
                        logLevel: 'ERROR',
                        message: {
                          event: 'src:sdklite:fetched-user-info',
                          iframeId: Ln.f.checkout,
                          window_name: ie(t),
                          window_url: n && n.location.href,
                        },
                        status: 400,
                        type: '@@hybrid/LOG_EVENT',
                      });
                    });
              })(e);
            case 'src:sdklite:sync-cookies':
              return (function (e, t) {
                Nn('src:sdklite:sync-cookies'),
                  e.dispatch({
                    data: t.data.cookies,
                    type: '@@hybrid/SYNC_COOKIES',
                  }),
                  e.dispatch({
                    message: {
                      data: { isLegacyButton: Ht(e.getState()) },
                      type: 'src:sdklite:synced-cookies',
                    },
                    target: 'checkout',
                    type: '@@window/SEND_POSTMESSAGE',
                  });
              })(e, o);
            case 'sdklite:appready':
              return (function (e) {
                e.dispatch({ type: '@@hybrid/APP_READY' });
                var t = e.getState();
                '6.x' === Z(t) &&
                  ee(t) &&
                  e.dispatch({
                    message: { type: 'sdklite:buttonclick' },
                    target: 'checkout',
                    type: '@@window/SEND_POSTMESSAGE',
                  });
              })(e);
            case 'consentAccepted':
              return (function (e) {
                e.dispatch({ type: '@@sdk/PREFILL_DATA_REQUESTED' });
              })(e);
            case 'visa.orch.ino-decision':
              return (function (e, t) {
                e.dispatch({
                  data: t.data.appFlow,
                  type: '@@sdk/OPTIMIZELY_FLOW',
                });
              })(e, o);
            case 'success':
            case 'cancel':
            case 'error':
              return mn(e, o, t);
            case 'visa.src.orch-ready':
              return (function (e) {
                Nn('visa.src.orch-ready'),
                  e.dispatch({ type: '@@orchestration/READY' });
              })(e);
            case 'sdklite:init:complete':
              return (function (e) {
                function t() {
                  Nn('registerWebViewEvents:logWindowEvents');
                  var t = e.getState(),
                    n = Object(An.a)('checkout');
                  e.dispatch({
                    message: {
                      event: 'visa.sdklite.close-checkout-webview',
                      window_name: ie(t),
                      window_url: n && n.location.href,
                    },
                    type: '@@hybrid/LOG_EVENT',
                  });
                }
                Nn('sdklite:init:complete');
                var n = Object(An.a)('checkout');
                n &&
                  ((n.onpagehide = t),
                  (n.onbeforeunload = t),
                  (n.onunload = t));
              })(e);
            case 'visa.sdklite.onbackpressed':
              return (function (e, t) {
                Nn('visa.sdklite.onbackpressed'),
                  mn(e, { data: { callid: null }, type: 'cancel' }, t);
              })(e, t);
            case 'visa.sdklite.result':
              return (function (e, t, n) {
                Nn("'visa.sdklite.result' : ".concat(JSON.stringify(t.data)));
                var r = Object(N.a)(),
                  o = L(Ke(e.getState(), 'sessionIdPrefix'));
                e.dispatch({
                  correlationId: r,
                  message:
                    'payment.success' === t.data.type
                      ? { data: t.data.result, type: 'success' }
                      : { data: t.data.result, type: 'cancel' },
                  sessionId: o,
                  type: '@@sdk/CHECKOUT_COMPLETE',
                }),
                  A.b('correlationId', r),
                  e.dispatch({
                    message: {
                      data: { reInitSessionId: o },
                      type: 'src:thm:updateTHMIframe',
                    },
                    target: 'config',
                    type: '@@window/SEND_POSTMESSAGE',
                  });
                var i = e.getState(),
                  c = se(i),
                  s = 'merchant' === te(i);
                'web' !== c &&
                  s &&
                  !Object(a.n)() &&
                  e.dispatch({
                    onDismiss: function () {
                      e.dispatch({
                        events: { onPrefillRequest: n },
                        type: '@@hybrid/BUTTON_INIT',
                      });
                    },
                    type: '@@hybrid/DISMISS',
                  });
              })(e, o, t);
            case 'visa.sdklite.update-payment-info':
              return (function (e, t) {
                if (
                  (Nn('visa.sdklite.updatePaymentInfo'),
                  'SRC' === jt(e.getState()))
                ) {
                  var n,
                    r,
                    o = Object(xn.a)(t.data),
                    i = ve(e.getState()),
                    a =
                      ((n = i.paymentRequest),
                      (null == (r = o) ? void 0 : r.currencyCode) !==
                        (null == n ? void 0 : n.currencyCode) ||
                        (null == r ? void 0 : r.subtotal) !==
                          (null == n ? void 0 : n.subtotal) ||
                        (null == r ? void 0 : r.total) !==
                          (null == n ? void 0 : n.total));
                  a &&
                    (e.dispatch({
                      data: Bn({}, i, {
                        paymentRequest: Bn({}, i.paymentRequest, {}, o),
                      }),
                      type: '@@sdk/CHECKOUT_SETUP',
                    }),
                    e.dispatch({
                      data: Zt(e.getState()),
                      type: '@@orchestration/INIT',
                    })),
                    e.dispatch({
                      data: { paymentRequestChanged: a },
                      type: '@@hybrid/UPDATE_PAYMENT_COMPLETE',
                    });
                }
              })(e, o);
            case 'visa:thm:response':
              return (function (e, t) {
                var n = cn(e.getState());
                if (n) {
                  var r = 'OPTED_IN' === n.ssiStatus ? 'SSI' : 'Non SSI';
                  e.dispatch({
                    data: {
                      api_response: t.response.profilingStatus,
                      elapsed_time: Date.now() - n.profilingStartTime,
                      error_code: t.response.sessionId,
                      error_message: 'undefined',
                      event: 'THM Profiling',
                      event_action: 'THM Profiling Response',
                      event_label: 'THM Response Received-'.concat(r),
                    },
                    type: '@@window/SEND_GTM_EVENT',
                  }),
                    e.dispatch({
                      message: { type: 'rxo:thm:complete' },
                      target: ['checkout', 'config'],
                      type: '@@window/SEND_POSTMESSAGE',
                    });
                }
              })(e, o);
            case 'pushGtmData':
              return _n(e, o);
            case 'src:country:locale:cookies:set':
              return (function (e, t) {
                e.dispatch({
                  data: t.data,
                  type: '@@config/UPDATE_LOCALE_COOKIE',
                });
              })(e, o);
          }
          return null;
        }),
        e
      );
    };
    function Gn(e, t, n) {
      n ||
        ((n = t),
        (t = function (e) {
          return e;
        }));
      var r = t(e.getState());
      return e.subscribe(function () {
        var o = t(e.getState());
        if (o !== r) {
          var i = r;
          n((r = o), i);
        }
      });
    }
    var Kn = 0,
      Fn = null,
      qn = function (e) {
        Gn(e, cn, function (t) {
          if (t) {
            var n = e.getState();
            sn(e.getState(), 'thm') &&
              e.dispatch({
                data: { id: 'thm' },
                type: '@@window/CLOSE_WINDOW',
              });
            var r = t.orgId,
              o = t.sessionId,
              a = t.ssiStatus || 'undefined';
            Fn && clearInterval(Fn),
              e.dispatch({
                data: { id: 'thm' },
                type: '@@window/REMOVE_SCRIPT',
              }),
              e.dispatch({
                data: {
                  id: 'thm',
                  src: ''
                    .concat(i.l, '?org_id=')
                    .concat(r, '&session_id=')
                    .concat(o),
                },
                type: '@@window/INJECT_SCRIPT',
              }),
              e.dispatch({
                data: {
                  attributes: {
                    'data-tmxsession': o,
                    title: 'For system use, please ignore',
                  },
                  id: 'thm',
                  noscript: !0,
                  query: { org_id: r, session_id: o },
                  src: i.m,
                  type: 'hidden',
                },
                type: '@@window/OPEN_WINDOW',
              }),
              e.dispatch({
                data: {
                  api_response: 'undefined',
                  correlation_id: pe(n),
                  event: 'THM Profiling',
                  event_action: 'THM Profiling Request',
                  event_label: 'THM Request–Attempt-'
                    .concat(++Kn, '-')
                    .concat(a),
                  xo_visitid: Ge(n, 'visitId'),
                },
                type: '@@window/SEND_GTM_EVENT',
              }),
              'OPTED_IN' === a &&
                (Fn = setInterval(function () {
                  e.dispatch({ data: { id: 'thm' }, type: '@@window/RELOAD' });
                }, 15e5));
          }
        });
      };
    function zn(e) {
      var t = e.store;
      t.dispatch({ type: '@@hybrid/CHECKOUT_STARTED' }), Nn('SRC:openSdkLite');
      var n = t.getState(),
        r = Z(n),
        o = se(n);
      if (
        ('merchant' === te(n) && '7.x' === r && 'sdk-lite' === o
          ? t.dispatch({
              data: { id: 'checkout', query: gn(n), src: vn(n) },
              type: '@@window/NAVIGATE',
            })
          : t.dispatch({
              data: {
                autofocus: !0,
                id: 'checkout',
                onLoad: function () {
                  return (function (e) {
                    Object(c.b)(c.c.srcIframeLoaded),
                      'RXO' === jt(e.getState()) &&
                        e.dispatch({
                          message: { data: Date.now(), type: 'rxo:render' },
                          target: 'checkout',
                          type: '@@window/SEND_POSTMESSAGE',
                        });
                  })(t);
                },
                query: gn(n),
                src: vn(n),
                type: 'modal',
              },
              type: '@@window/OPEN_WINDOW',
            }),
        (function (e, t) {
          return Boolean(e.script[t].injected);
        })(n, 'orchestration'))
      ) {
        var i = Object(An.a)('checkout'),
          a = i ? i.location.href : 'iFrame is not available',
          s = null == i ? void 0 : i.name,
          u = null == i ? void 0 : i.location.href;
        if ('error' === Ae(n)) {
          var d = 'orch-load-failure',
            l = (function (e) {
              return e.orchestration.error;
            })(n);
          l && (d += ' '.concat(l)),
            t.dispatch({
              logLevel: 'ERROR',
              message: { event: d, iframeId: a, window_name: s, window_url: u },
              status: 400,
              type: '@@hybrid/LOG_EVENT',
            });
        } else
          t.dispatch({
            logLevel: 'INFO',
            message: {
              event: 'orch-load-successful',
              iframeId: a,
              window_name: s,
              window_url: u,
            },
            status: 200,
            type: '@@hybrid/LOG_EVENT',
          });
      }
    }
    function Yn(e) {
      var t = e.onPrefillRequest,
        n = e.store,
        r = n.getState();
      n.dispatch({ type: '@@sdk/CHECKOUT_STARTED' }),
        sn(r, 'learn') &&
          n.dispatch({ data: { id: 'learn' }, type: '@@window/CLOSE_WINDOW' }),
        n.dispatch({
          data: {
            autofocus: !0,
            id: 'checkout',
            onCancelCheckout: function () {
              mn(n, { data: { callid: null }, type: 'cancel' }, t);
            },
            onLoad: function () {
              return (function (e) {
                Object(c.b)(c.c.srcIframeLoaded),
                  'RXO' === jt(e.getState()) &&
                    e.dispatch({
                      message: { data: Date.now(), type: 'rxo:render' },
                      target: 'checkout',
                      type: '@@window/SEND_POSTMESSAGE',
                    });
              })(n);
            },
            query: gn(r),
            replaceUrl: Boolean(sn(r, 'checkout')),
            src: vn(r),
            type: 'POPUP' === en(r) ? 'popup' : 'modal',
          },
          type: '@@window/OPEN_WINDOW',
        });
    }
    function Xn(e) {
      var t = e.onPrefillRequest,
        n = e.store;
      Object(c.b)(c.c.buttonClickEnd);
      var r = n.getState(),
        i = se(r);
      if (je(r)) return s.a.error(o.d), null;
      switch (i) {
        case 'hybrid-plugin':
        case 'sdk-lite':
        case 'sdk-lite-cross-app':
          return zn({ store: n });
        default:
          return Yn({ onPrefillRequest: t, store: n });
      }
    }
    var Jn = function () {};
    var Qn = function () {};
    function $n(e) {
      var t,
        n =
          arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
        r = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      return function () {
        for (var o = arguments.length, i = new Array(o), a = 0; a < o; a++)
          i[a] = arguments[a];
        var c = this;
        function s() {
          r || e.apply(c, i), (t = null);
        }
        t ? clearTimeout(t) : r && e.apply(c, i), (t = setTimeout(s, n));
      };
    }
    function Zn() {
      return Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
    }
    function er() {
      return Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
    }
    function tr(e, t) {
      if (!document.getElementById(e)) {
        var n = document.createElement('style');
        (n.id = e),
          n.appendChild(document.createTextNode(t)),
          document.head.insertBefore(n, document.head.firstChild);
      }
    }
    function nr(e) {
      var t = document.getElementById(e);
      t && t.parentNode && t.parentNode.removeChild(t);
    }
    function rr(e) {
      document.body.className = ''
        .concat(document.body.className, ' ')
        .concat(e);
    }
    function or(e) {
      document.body.className = document.body.className.replace(
        ' '.concat(e),
        ''
      );
    }
    var ir = [];
    function ar(e) {
      return 'checkout' === e ? 'vcop-src' : ''.concat(Ln.f[e], '-wrapper');
    }
    function cr(e) {
      return document.getElementById(Ln.f[e]);
    }
    function sr(e) {
      var t = e.iframe,
        n = e.target;
      if (n)
        if (Zn() <= 480)
          (t.style.left = '0'),
            (t.style.top = '0'),
            (t.style.width = '100%'),
            (t.style.minHeight = '100%'),
            (t.style.marginLeft = '0');
        else {
          var r = document.querySelector('html').getBoundingClientRect(),
            o = n.getBoundingClientRect(),
            i = t.getBoundingClientRect(),
            a = { left: o.left - r.left, top: o.top - r.top };
          if (
            ((t.style.width = '306px'),
            (t.style.minHeight = ''),
            o.top > i.height)
          ) {
            var c = a.top - i.height - 5;
            t.style.top = ''.concat(c, 'px');
          } else {
            var s = a.top + o.height + 5;
            t.style.top = ''.concat(s, 'px');
          }
          var u = a.left - i.width / 2 + o.width / 2;
          u + i.width > window.innerWidth || u < 0
            ? ((t.style.marginLeft = '-153px'), (t.style.left = '50%'))
            : ((t.style.marginLeft = ''), (t.style.left = ''.concat(u, 'px')));
        }
    }
    function ur(e) {
      (ir = (function (e) {
        for (var t = [], n = e.parentNode.firstChild; n; ) {
          var r = n.nodeName.toLowerCase();
          3 !== n.nodeType &&
            8 !== n.nodeType &&
            'script' !== r &&
            n !== e &&
            'true' !== n.getAttribute('aria-hidden') &&
            t.push(n),
            (n = n.nextSibling);
        }
        return t;
      })(e)).forEach(function (e) {
        e.setAttribute('aria-hidden', 'true');
      });
    }
    var dr = {};
    function lr(e) {
      var t = Ln.f[e.id];
      Object(c.b)(''.concat(c.c.createIframeStart).concat(t));
      var n = (function (e) {
          var t = document.createElement('iframe'),
            n = e.query ? Object(f.b)(e.query) : '';
          return (
            (t.id = Ln.f[e.id]),
            (t.src = ''.concat(e.src).concat(n)),
            (t.frameBorder = '0'),
            (t.tabIndex = -1),
            (e.sandbox || 'checkout' !== e.id) &&
              t.setAttribute('sandbox', Ln.a),
            t
          );
        })(e),
        r = e.onLoad;
      n.addEventListener('load', function () {
        'checkout' === e.id && (n.style.visibility = 'visible'),
          Object(c.b)(''.concat(c.c.createIframeEnd).concat(t)),
          r && r();
      });
      var o = -1 !== e.src.indexOf(i.g);
      if (
        ('checkout' === e.id &&
          (Object(a.h)() || Object(a.q)()) &&
          (n.style.visibility = 'hidden'),
        'hidden' === e.type || 'preload' === e.type)
      )
        (n.style.height = '0'),
          (n.style.width = '0'),
          (n.style.display = 'none'),
          (n.style.border = 'none'),
          (n.tabIndex = -1),
          n.setAttribute('role', 'presentation');
      else if ('modal' === e.type) {
        var s = er(),
          u = Zn();
        o
          ? ((n.style.position = 'fixed'),
            (n.style.top = '0'),
            (n.style.left = '0'),
            (n.style.height = '100%'),
            (n.style.width = '100%'),
            (n.style.zIndex = '1000000'))
          : ((n.style.height = s < Ln.c || u <= Ln.d ? '100%' : Ln.b),
            (n.style.width = u <= Ln.d ? '100%' : Ln.e),
            (n.style.display = 'block')),
          tr(
            'v-no-scroll',
            '\n        body.vxo-no-scroll {\n          overflow: hidden !important;\n          width: 100%;\n          height:100%;\n        }\n      '
          ),
          rr('vxo-no-scroll');
      }
      if (e.styles) for (var d in e.styles) n.style[d] = e.styles[d];
      if (e.attributes)
        for (var l in e.attributes) n.setAttribute(l, e.attributes[l]);
      if (e.noscript) {
        var p = document.createElement('noscript');
        (p.id = ar('thm')), p.appendChild(n), document.body.appendChild(p);
      } else if ('hidden' === e.type) document.body.appendChild(n);
      else {
        var h = document.createElement('div');
        (h.id = ar(e.id)),
          'modal' !== e.type ||
            o ||
            ((h.style.position = 'fixed'),
            (h.style.top = '0'),
            (h.style.left = '0'),
            (h.style.display = 'flex'),
            (h.style.flexDirection = 'row'),
            (h.style.alignItems = 'center'),
            (h.style.justifyContent = 'center'),
            (h.style.height = '100%'),
            (h.style.width = '100%'),
            (h.style.zIndex = '1000000')),
          h.appendChild(n),
          document.body.appendChild(h);
      }
      var v = e.getPopoverTarget;
      if ('popover' === e.type && v) {
        var y = v();
        if (y) {
          var g = $n(function () {
            sr({ iframe: n, target: y });
          }, 30);
          (dr[e.id] = g),
            window.addEventListener('resize', g),
            sr({ iframe: n, target: y });
        }
      }
      if ('modal' === e.type && !o) {
        var b = $n(function () {
          !(function (e) {
            var t = e.iframe;
            if (t) {
              var n = Zn(),
                r = er();
              n <= Ln.d
                ? '100%' !== t.style.width && (t.style.width = '100%')
                : t.style.width !== Ln.e && (t.style.width = Ln.e),
                r < Ln.c || n <= Ln.d
                  ? '100%' !== t.style.height && (t.style.height = '100%')
                  : t.style.height !== Ln.b && (t.style.height = Ln.b);
            }
          })({ iframe: n });
        }, 30);
        (dr[e.id] = b), window.addEventListener('resize', b);
      }
      if (e.autofocus && 'preload' !== e.type) {
        var m = 'hidden' === e.type ? n : n.parentNode;
        setTimeout(function () {
          return ur(m);
        }, 100);
      }
      return n;
    }
    function fr(e) {
      var t,
        n,
        r = document.getElementById(Ln.f[e.id]),
        i = dr[e.id];
      ('function' == typeof i && window.removeEventListener('resize', i),
      'modal' === e.type &&
        (nr('rxo-open'),
        or('rxo-open'),
        nr('v-no-scroll'),
        or('vxo-no-scroll')),
      r)
        ? (ir.forEach(function (e) {
            e.removeAttribute('aria-hidden');
          }),
          (ir = []),
          'hidden' !== e.type || e.noscript
            ? null === (t = r.parentNode) ||
              void 0 === t ||
              null === (n = t.parentNode) ||
              void 0 === n ||
              n.removeChild(r.parentNode)
            : document.body.removeChild(r))
        : s.a.error(o.h);
    }
    function pr(e) {
      var t = document.getElementById(Ln.f[e.id]);
      t ? (t.src = t.src) : s.a.error(o.n);
    }
    function hr() {
      return document.querySelectorAll('.v-learn');
    }
    function vr() {
      var e = document.querySelector('.v-learn[data-active="true"]');
      return (
        e || s.a.error(o.k, { selector: '.v-learn[data-active="true"]' }), e
      );
    }
    function yr(e, t) {
      var n = e.getState();
      if (!sn(n, 'learn')) {
        var r,
          o = (r = t.currentTarget) ? r.getAttribute('data-locale') : 'en-US';
        e.dispatch({
          data: {
            attributes: { title: 'Learn more about Visa Checkout' },
            autofocus: !0,
            getPopoverTarget: vr,
            id: 'learn',
            query: hn(n, o),
            src: pn(n),
            styles: {
              borderRadius: '2px',
              boxShadow: 'rgba(0, 0, 0, 0.40) 5px 5px 16px',
              height: '410px',
              position: 'absolute',
              width: '306px',
              zIndex: '999999',
            },
            type: 'popover',
          },
          type: '@@window/OPEN_WINDOW',
        }),
          e.dispatch({
            data: {
              event: 'learnMore Link Click',
              event_action: 'learnMore Click',
              event_label: 'learnMore Link Click',
            },
            type: '@@window/SEND_GTM_EVENT',
          });
      }
    }
    function gr(e) {
      var t = e.store,
        n = e.vOptions,
        r = e.onPrefillRequest,
        o = t.getState(),
        a = se(o),
        s = 'checkout' === te(o);
      if ('web' === a)
        return (function (e) {
          var t = e.store,
            n = e.vOptions,
            r = t.getState(),
            o = 'pre-init' !== ye(r);
          t.dispatch({ data: n, type: '@@sdk/CHECKOUT_SETUP' }),
            t.dispatch({ type: '@@button/BUTTON_INIT' }),
            (r = t.getState()),
            Fe(r) &&
              (t.dispatch({ type: '@@button/BUTTON_LOAD' }),
              Ue(r, 'orchestration') &&
                t.dispatch({
                  data: Zt(t.getState()),
                  type: '@@orchestration/INIT',
                })),
            o ||
              (t.dispatch({
                data: {
                  id: 'gtm',
                  onLoad: c.a,
                  query: fn(),
                  src: i.b,
                  type: 'hidden',
                },
                type: '@@window/OPEN_WINDOW',
              }),
              t.dispatch({
                data: {
                  id: 'config',
                  query: ln(t.getState()),
                  src: i.a,
                  type: 'hidden',
                },
                type: '@@window/OPEN_WINDOW',
              }),
              t.dispatch({
                events: {
                  click: function (e) {
                    return yr(t, e);
                  },
                  keydown: function (e) {
                    13 === e.keyCode && yr(t, e);
                  },
                },
                type: '@@learn/INIT',
              }));
        })({ store: t, vOptions: n });
      var u = Z(o);
      return !s || ('sdk-lite-cross-app' !== a && '6.x' !== u)
        ? (function (e) {
            var t = e.store,
              n = e.vOptions,
              r = e.onPrefillRequest;
            t.dispatch({ data: n, type: '@@sdk/CHECKOUT_SETUP' });
            var o = t.getState();
            t.dispatch({ type: '@@hybrid/REGISTER_DEFAULT_STRINGS' }),
              t.dispatch({
                events: { onPrefillRequest: r },
                type: '@@hybrid/BUTTON_INIT',
              }),
              Fe(o) && t.dispatch({ type: '@@button/BUTTON_LOAD' }),
              t.dispatch({
                data: {
                  id: 'gtm',
                  onLoad: c.a,
                  query: fn(),
                  src: i.b,
                  type: 'hidden',
                },
                type: '@@window/OPEN_WINDOW',
              }),
              t.dispatch({
                data: { id: 'config', query: ln(o), src: i.a, type: 'hidden' },
                type: '@@window/OPEN_WINDOW',
              }),
              '7.x' === Z(t.getState()) &&
                (Jn = Gn(t, nn, function (e) {
                  e &&
                    t.dispatch({
                      alreadyLaunched: ee(t.getState()),
                      events: {
                        launchCheckout: function () {
                          t.dispatch({
                            onProfile: function (e) {
                              t.dispatch({ data: e, type: '@@thm/LAUNCH' });
                            },
                            type: '@@hybrid/PROFILE_DEVICE',
                          }),
                            t.dispatch({
                              events: { onPrefillRequest: r },
                              type: '@@hybrid/CHECKOUT_LAUNCH',
                            }),
                            t.dispatch({ type: '@@hybrid/CHECKOUT_QUEUED' });
                        },
                      },
                      type: '@@hybrid/CHECKOUT_READY',
                    }),
                    Jn();
                }));
          })({ onPrefillRequest: r, store: t, vOptions: n })
        : (function (e) {
            var t = e.onPrefillRequest,
              n = e.store,
              r = e.vOptions;
            n.dispatch({ data: r, type: '@@sdk/CHECKOUT_SETUP' }),
              n.dispatch({ type: '@@hybrid/REGISTER_DEFAULT_STRINGS' });
            var o = n.getState();
            if ('sdk-lite-cross-app' === se(o)) {
              var a = Gn(
                n,
                function (e) {
                  return Boolean(Fe(e) && Ue(e, 'orchestration'));
                },
                function (e) {
                  e &&
                    (n.dispatch({
                      data: Zt(n.getState()),
                      type: '@@orchestration/INIT',
                    }),
                    a());
                }
              );
              Object(c.b)(c.c.orchScriptLoadStart),
                n.dispatch({
                  data: {
                    id: 'orchestration',
                    onError: function (e) {
                      n.dispatch({
                        error: e.toString(),
                        type: '@@orchestration/ERROR',
                      }),
                        a();
                    },
                    onLoad: function () {
                      Object(c.b)(c.c.orchScriptLoadEnd);
                    },
                    src: i.e,
                  },
                  type: '@@window/INJECT_SCRIPT',
                });
            }
            n.dispatch({
              data: {
                id: 'gtm',
                onLoad: c.a,
                query: fn(),
                src: i.b,
                type: 'hidden',
              },
              type: '@@window/OPEN_WINDOW',
            }),
              n.dispatch({
                data: { id: 'config', query: ln(o), src: i.a, type: 'hidden' },
                type: '@@window/OPEN_WINDOW',
              }),
              n.dispatch({
                onProfile: function (e) {
                  n.dispatch({ data: e, type: '@@thm/LAUNCH' });
                },
                type: '@@hybrid/PROFILE_DEVICE',
              });
            var s = Gn(n, nn, function (e) {
              e &&
                ('sdk-lite-cross-app' === se(n.getState())
                  ? n.dispatch({ type: '@@hybrid/CHECKOUT_QUEUED' })
                  : n.dispatch({
                      events: {
                        launchCheckout: function () {
                          n.dispatch({
                            onProfile: function (e) {
                              n.dispatch({ data: e, type: '@@thm/LAUNCH' });
                            },
                            type: '@@hybrid/PROFILE_DEVICE',
                          }),
                            n.dispatch({
                              events: { onPrefillRequest: t },
                              type: '@@hybrid/CHECKOUT_LAUNCH',
                            });
                        },
                      },
                      type: '@@hybrid/CHECKOUT_READY',
                    }),
                s());
            });
            Qn();
            var u = new Promise(function (e) {
              Qn = Gn(n, ge, function (t, n) {
                !n && t && e(t);
              });
            });
            n.dispatch({
              onRender: function () {
                return (
                  n.dispatch({ type: '@@hybrid/CHECKOUT_QUEUED' }),
                  (function (e) {
                    return e.hybrid.isAppReady;
                  })(n.getState()) &&
                    n.dispatch({
                      message: { type: 'sdklite:buttonclick' },
                      target: 'checkout',
                      type: '@@window/SEND_POSTMESSAGE',
                    }),
                  u
                );
              },
              type: '@@hybrid/RENDER',
            });
          })({ onPrefillRequest: r, store: t, vOptions: n });
    }
    function br() {
      return window.isCheckout ? 'checkout' : 'merchant';
    }
    function mr(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function wr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? mr(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : mr(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var Or = {
      checkoutWebviewName: null,
      checkoutWebviewUrl: null,
      hybridAPIVersion: (function () {
        switch (r.a.API_LEVEL) {
          case 0:
            return null;
          case 1:
            return '5.x';
          case 2:
            return '6.x';
          case 3:
          default:
            return '7.x';
        }
      })(),
      isAppReady: !1,
      isButtonClicked: !1,
      isManualCheckout: Object(a.i)(),
      mobileEnvironment:
        Object(a.j)() || Object(a.p)()
          ? 'hybrid'
          : Object(a.r)()
          ? 'uiwebview'
          : Object(a.d)() || Object(a.m)()
          ? 'webview'
          : Object(a.s)()
          ? 'unknown'
          : null,
      nativeSpinnerActive: !1,
      webviewType: br(),
    };
    var Er = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Or,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case '@@hybrid/APP_READY':
            return wr({}, e, { isAppReady: !0 });
          case '@@hybrid/NATIVE_BUTTON_CLICK':
          case '@@hybrid/LAUNCH_NATIVE_SPINNER':
            return wr({}, e, { isButtonClicked: !0, nativeSpinnerActive: !0 });
          case '@@hybrid/CHECKOUT_LAUNCH':
            return wr({}, e, { nativeSpinnerActive: !1 });
          case '@@window/OPEN_WINDOW':
            return 'checkout' === t.data.id
              ? wr({}, e, {
                  checkoutWebviewName: Ln.g.checkout,
                  checkoutWebviewUrl: t.data.src,
                })
              : e;
          case '@@hybrid/RESET':
            return wr({}, e, {
              checkoutWebviewName: null,
              checkoutWebviewUrl: null,
              isButtonClicked: !1,
              nativeSpinnerActive: !1,
            });
          default:
            return e;
        }
      },
      Sr = n(22),
      Cr = n(44);
    function _r(e) {
      'ready' === ye(e.getState()) &&
        e.dispatch({ type: '@@sdk/CHECKOUT_QUEUED' });
    }
    var kr = function (e) {
        var t = function () {
            return _r(e);
          },
          n = function (t) {
            ('Enter' !== t.key && ' ' !== t.key) || (t.preventDefault(), _r(e));
          };
        return function (r) {
          return function (o) {
            var a,
              s,
              u = e.getState();
            if (
              de(u) ||
              'sdk-lite' === se(u) ||
              'sdk-lite-cross-app' === se(u) ||
              ne(u)
            )
              return r(o);
            switch (o.type) {
              case '@@config/INVALID_INIT_OPTIONS':
              case '@@config/MERCHANT_CONFIG_FAILURE':
              case '@@sdk/UNSUPPORTED_BROWSER':
              case '@@sdk/UNSUPPORTED_HYBRID_VERSION':
              case '@@sdk/CHECKOUT_DISABLED_BY_FORM_FACTOR':
                w().forEach(function (e) {
                  if (E(e)) {
                    var t = Object(l.a)(e.src, 'size'),
                      n = t ? parseInt(t, 10) : 213;
                    e.src =
                      n < 213
                        ? ''
                            .concat(i.f, '/')
                            .concat(
                              'checkout-widget/resources/img/integration/v1/locked-button-s.png'
                            )
                        : n < 425
                        ? ''
                            .concat(i.f, '/')
                            .concat(
                              'checkout-widget/resources/img/integration/v1/locked-button-m.png'
                            )
                        : ''
                            .concat(i.f, '/')
                            .concat(
                              'checkout-widget/resources/img/integration/v1/locked-button-l.png'
                            );
                  }
                });
                break;
              case '@@button/BUTTON_HIDE':
                w().forEach(function (e) {
                  e.style.visibility = 'hidden';
                });
                break;
              case '@@button/BUTTON_INIT':
              case '@@hybrid/BUTTON_INIT':
                var d = se(u);
                'web' === d
                  ? T({
                      events: { click: t, keydown: n },
                      updateCardBrandOrder: function (t) {
                        e.dispatch({
                          data: t,
                          type: '@@button/CARD_BRAND_ORDER',
                        });
                      },
                    })
                  : 'hybrid-plugin' === d && T({ events: {} });
                break;
              case '@@button/BUTTON_LOAD':
              case '@@hybrid/BUTTON_LOAD':
                (s = an(e.getState())),
                  w().forEach(function (e) {
                    if (((e.style.cursor = 'pointer'), E(e))) {
                      var t = Object(l.a)(e.src, 'orderedCardBrands');
                      if (t) {
                        var n = g(t);
                        s.orderedCardBrands = n.filter(function (e) {
                          var t;
                          return (
                            -1 !==
                            (null === (t = s.orderedCardBrands) || void 0 === t
                              ? void 0
                              : t.indexOf(e))
                          );
                        });
                      }
                      if (((e.src = C(e, s)), !s.legacy))
                        return (
                          e.setAttribute(
                            'alt',
                            'Click to pay with payment icon'
                          ),
                          void e.setAttribute(
                            'title',
                            'Click to pay with payment icon'
                          )
                        );
                      var r = new Image();
                      (r.src = C(e, m({}, s, { loading: !0 }))),
                        (r.onload = function () {
                          Object(c.b)(c.c.buttonLoadEnd + r.src);
                        });
                      var o = new Image();
                      (o.src = C(e, m({}, s, { sliding: !0 }))),
                        (o.onload = function () {
                          Object(c.b)(c.c.buttonLoadEnd + o.src);
                        });
                    }
                  });
                break;
              case '@@hybrid/CHECKOUT_QUEUED':
              case '@@sdk/CHECKOUT_QUEUED':
                var f = se(u);
                if ('web' === f || 'hybrid-plugin' === f) {
                  var p = an(e.getState());
                  p.legacy && p.svg && (p.sliding = !0), D(p);
                }
                break;
              case '@@sdk/CHECKOUT_COMPLETE':
                var h = e.getState();
                if ('active' !== ye(h)) break;
                var v = an(h);
                v.legacy && v.svg && (v.sliding = !1),
                  D(v),
                  (a = O()) && a.removeAttribute('data-active');
            }
            return r(o);
          };
        };
      },
      Ir = n(18);
    function Tr(e) {
      return btoa(
        encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function (e, t) {
          return String.fromCharCode(Number('0x'.concat(t)));
        })
      );
    }
    var Dr,
      Pr = n(29);
    function Rr(e) {
      var t = Object(kn.a)(),
        n = br();
      if ('web' !== t && ('hybrid-plugin' !== t || 'merchant' !== n)) {
        var r = ''.concat(i.f, '/logging/logEvent');
        Object(Pr.a)({
          body: {
            CO: 'SDKLITE',
            E: 'sdk_lite_events',
            LL: e.logLevel || 'INFO',
            MSG:
              'object' === F()(e.message)
                ? JSON.stringify(e.message)
                : e.message,
            O: 'SDKLITE',
            RTY: 'OUT',
            S: e.status || 200,
            T: 'E',
            TS: Date.now(),
            U: e.url || i.f,
          },
          headers: { 'X-CORRELATION-ID': e.correlationId },
          method: 'POST',
          url: r,
        });
      }
    }
    function jr(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Nr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? jr(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : jr(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function Ar(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Lr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Ar(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Ar(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var Mr = function (e) {
        return function (t) {
          return function (n) {
            var a,
              c,
              u,
              d,
              l,
              f,
              p,
              h,
              v,
              y,
              g,
              b,
              m,
              O,
              E,
              S,
              C,
              _,
              k,
              I,
              T,
              D = e.getState(),
              P = Z(D),
              R = ve(D);
            switch (n.type) {
              case '@@hybrid/REGISTER_MERCHANT_DATA':
                (T = n.data), r.a.registerMerchantData(T);
                break;
              case '@@hybrid/LOG_EVENT':
                Rr(Lr({ correlationId: pe(D) }, n));
                break;
              case '@@hybrid/BUTTON_INIT':
                var j = (function (e, t) {
                  return function () {
                    var n = e.getState(),
                      r = se(n),
                      o = Z(n);
                    ('6.x' !== o && 'sdk-lite-cross-app' !== r) ||
                      e.dispatch({
                        data: { key: 'correlationId', value: pe(e.getState()) },
                        type: '@@window/SET_LOCALSTORAGE',
                      }),
                      e.dispatch({
                        onProfile: function (t) {
                          e.dispatch({ data: t, type: '@@thm/LAUNCH' });
                        },
                        type: '@@hybrid/PROFILE_DEVICE',
                      }),
                      nn(n) &&
                        (e.dispatch({
                          events: { onPrefillRequest: t },
                          type: '@@hybrid/CHECKOUT_LAUNCH',
                        }),
                        '7.x' === o &&
                          e.dispatch({ type: '@@hybrid/CHECKOUT_QUEUED' }));
                  };
                })(e, n.events.onPrefillRequest);
                !(function (e) {
                  var t = e.apiVersion,
                    n = e.correlationId,
                    o = e.events,
                    a = o.checkoutReady,
                    c = o.launchCheckout,
                    s = o.onNativeButtonClick,
                    u = o.openLoader,
                    d = o.showNativeSpinner,
                    l = e.integrationType,
                    f = e.isHybridManualCheckout,
                    p = e.onSyncCookies,
                    h = e.vOptions;
                  Nn('hybridInit');
                  var v = function () {
                    d(), '7.x' === t && c();
                  };
                  if (
                    (w().forEach(function (e) {
                      e &&
                        (e.removeEventListener('click', Dr),
                        e.addEventListener('click', v),
                        (Dr = v));
                    }),
                    'sdk-lite-cross-app' !== l)
                  ) {
                    r.a.onSyncCookies(p);
                    var y = { pi: h },
                      g = Tr(JSON.stringify(y));
                    if ('7.x' === t)
                      Nn('hybridInit:isSRCSupported ', { isSRCSupported: !0 }),
                        r.a.registerMessagePaths({
                          checkoutUrl: ''
                            .concat(
                              i.f,
                              '/checkout-widget/sdklite-crossapp?init='
                            )
                            .concat(g),
                          enableTransitionSpinner: !0,
                        }),
                        u(),
                        Nn('hybridInit:Webview Created', {
                          name: Ln.g.checkout,
                          url: i.h,
                        }),
                        'sdk-lite' === l &&
                          r.a.onNativeButtonClick().then(function (e) {
                            e && s();
                          }),
                        Rr({
                          correlationId: n,
                          message: {
                            event: 'hybrid-init',
                            payload: {},
                            window_name: 'SRC Webview',
                            window_url: i.h,
                          },
                          url: i.h,
                        });
                    else if ('6.x' === t) {
                      var b = ''.concat(i.i, '?init=').concat(g);
                      f && (b += '&manualCheckout'),
                        r.a
                          .configureVisaCheckout(b)
                          .then(function (e) {
                            a({ alreadyLaunched: e });
                          })
                          .catch(console.error),
                        Rr({
                          correlationId: n,
                          message: {
                            event: 'hybrid-init',
                            payload: y,
                            window_name: void 0,
                            window_url: b,
                          },
                          url: b,
                        });
                    }
                  }
                })({
                  apiVersion: P,
                  correlationId: pe(D),
                  events: {
                    checkoutReady: function (t) {
                      var n = t.alreadyLaunched;
                      e.dispatch({
                        alreadyLaunched: n,
                        events: { launchCheckout: j },
                        type: '@@hybrid/CHECKOUT_READY',
                      });
                    },
                    launchCheckout: j,
                    onNativeButtonClick: function () {
                      e.dispatch({ type: '@@hybrid/NATIVE_BUTTON_CLICK' }),
                        e.dispatch({
                          message: {
                            description: 'Hybrid Button Click',
                            event: 'visa.sdklite.button-click',
                          },
                          type: '@@hybrid/LOG_EVENT',
                        }),
                        j();
                    },
                    openLoader: function () {
                      e.dispatch({
                        data: {
                          id: 'checkout',
                          overlay: !1,
                          src: i.h,
                          type: 'popup',
                        },
                        type: '@@window/OPEN_WINDOW',
                      });
                    },
                    showNativeSpinner: function () {
                      e.dispatch({
                        events: n.events,
                        type: '@@hybrid/LAUNCH_NATIVE_SPINNER',
                      });
                    },
                  },
                  integrationType: se(D),
                  isHybridManualCheckout: ce(D),
                  onSyncCookies: function (t) {
                    return (
                      e.dispatch({ data: t, type: '@@hybrid/SYNC_COOKIES' }),
                      !Ht(e.getState())
                    );
                  },
                  vOptions: R,
                });
                break;
              case '@@hybrid/LAUNCH_NATIVE_SPINNER':
                (k = {
                  cancelCheckout: function () {
                    return mn(
                      e,
                      { data: { callid: null }, type: 'cancel' },
                      n.events.onPrefillRequest
                    );
                  },
                }.cancelCheckout),
                  (I = Object(W.a)()),
                  r.a
                    .showLoading(I)
                    .then(function (e) {
                      e && k();
                    })
                    .catch(console.error);
                break;
              case '@@hybrid/BUTTON_LOAD':
                (E = {
                  cardBrands: on(D),
                  integrationType: se(D),
                  mobileButtonType: rn(D),
                }),
                  (S = E.cardBrands),
                  (C = E.integrationType),
                  (_ = E.mobileButtonType),
                  'hybrid-plugin' !== C &&
                    window.loadMobileButton &&
                    window.loadMobileButton(_, S);
                break;
              case '@@hybrid/RENDER':
                (m = { onRender: n.onRender }),
                  (O = m.onRender),
                  r.a.onRender(function () {
                    var e = r.a.onBackPressed().then(function () {
                      return {
                        data: { callid: null, error: {} },
                        type: 'cancel',
                      };
                    });
                    return Promise.race([e, O()]);
                  });
                break;
              case '@@hybrid/CHECKOUT_READY':
                !(function (e) {
                  var t = e.alreadyLaunched,
                    n = void 0 !== t && t,
                    o = e.correlationId,
                    i = e.events.launchCheckout;
                  w().forEach(function (e) {
                    e.removeEventListener('click', Dr),
                      e.addEventListener('click', i),
                      (Dr = i);
                  }),
                    n
                      ? i()
                      : (r.a.onManualCheckout().then(function () {
                          Rr({
                            correlationId: o,
                            message: {
                              description:
                                'SDKLite Button Manual Checkout Click',
                              event: 'visa.sdklite.manual-checkout-click',
                            },
                          }),
                            w().forEach(function (e) {
                              e.removeEventListener('click', i);
                            }),
                            i();
                        }),
                        r.a.notifyReady());
                })({
                  alreadyLaunched: n.alreadyLaunched,
                  correlationId: pe(D),
                  events: n.events,
                });
                break;
              case '@@hybrid/CHECKOUT_LAUNCH':
                !(function (e) {
                  var t = e.apiVersion,
                    n = e.events,
                    o = n.onCheckoutComplete,
                    i = n.onPrefillRequest,
                    a = e.launchData,
                    c = a.merchantConfig,
                    s = a.sdkParams,
                    u = a.srcConfigs,
                    d = a.vInitRequest;
                  Nn('hybridLaunch');
                  var l = ''.concat(Object(W.a)(), '/checkout-widget/vcop'),
                    f = {
                      merchantConfig: c,
                      sdkParams: s,
                      srcConfigs: u,
                      vInitRequest: Nr({}, d, {
                        intialVinit: Nr({}, d.intialVinit, { parentUrl: l }),
                        parentUrl: l,
                      }),
                    };
                  '7.x' === t
                    ? r.a.srcLaunch()
                    : r.a
                        .launchVisaCheckout(f)
                        .then(o)
                        .catch(function (e) {
                          o({ data: {}, error: e, type: 'error' });
                        }),
                    r.a.onPrefillRequest(i);
                })({
                  apiVersion: P,
                  events: Lr({}, n.events, {
                    onCheckoutComplete: function (t) {
                      return mn(e, t, n.events.onPrefillRequest);
                    },
                  }),
                  launchData: {
                    merchantConfig: qe(D),
                    sdkParams: Qt(D),
                    srcConfigs: $t(D),
                    vInitRequest: Yt(D),
                  },
                });
                break;
              case '@@hybrid/SETUP_MESSAGE_FORWARDING':
                window.VisaCheckoutSDK &&
                  window.VisaCheckoutSDK.InboundHybridHandlers.messageHandlers.push(
                    function (e) {
                      var t,
                        n,
                        r = cr('checkout');
                      if (r) {
                        var i =
                          null === (t = r.contentWindow) ||
                          void 0 === t ||
                          null === (n = t.VisaCheckoutSDK) ||
                          void 0 === n
                            ? void 0
                            : n.InboundHybridHandlers.messageHandlers;
                        i
                          ? i.forEach(function (t) {
                              return t(e);
                            })
                          : s.a.error(o.i);
                      }
                    }
                  );
                break;
              case '@@hybrid/PROFILE_DEVICE':
                (g = { onProfile: n.onProfile }),
                  (b = g.onProfile),
                  r.a.onProfileDevice(b);
                break;
              case '@@hybrid/DISMISS':
                (v = { onDismiss: n.onDismiss }),
                  (y = v.onDismiss),
                  r.a.dismiss().then(function () {
                    Nn('HybridSDK.dismiss for Hybrid Plugin'), y();
                  });
                break;
              case '@@hybrid/SEND_RESULT':
                var N = we(D, 'sdkLiteMerchantAppInfo');
                (u = {
                  packageName: null == N ? void 0 : N.package,
                  payload: n.data,
                  scheme: null == N ? void 0 : N.scheme,
                }),
                  (d = u.packageName),
                  (l = u.payload),
                  (f = u.scheme),
                  (p = Tr(JSON.stringify(l))),
                  (h = 'intent://result?VisaCheckoutResult='
                    .concat(p, '#Intent;scheme=')
                    .concat(f, ';package=')
                    .concat(d, ';end')),
                  (window.location.href = h);
                break;
              case '@@hybrid/SYNC_COOKIES':
                !(function (e) {
                  for (
                    var t = e.cookies, n = 0, r = Object.keys(t);
                    n < r.length;
                    n++
                  ) {
                    var o = r[n];
                    Object(Ir.b)(o, t[o], 365);
                  }
                })({ cookies: n.data });
                break;
              case '@@hybrid/UPDATE_PAYMENT_COMPLETE':
                (a = n.data),
                  (c = a.paymentRequestChanged),
                  r.a.updatePaymentComplete(!c);
                break;
              case '@@hybrid/REGISTER_DEFAULT_STRINGS':
                r.a.registerDefaultStrings();
            }
            return t(n);
          };
        };
      },
      Ur = function () {
        return function (e) {
          return function (t) {
            switch (t.type) {
              case '@@learn/INIT':
                (r = t.events),
                  document.querySelectorAll('.v-learn-default').length &&
                    tr(
                      'v-learn-default',
                      '\n        .v-learn.v-learn-default {\n          float: right;\n          margin-right: 4px;\n          font-size: 12px;\n          text-transform: capitalize;\n          color: #003ea9;\n          cursor: pointer;\n          text-decoration: none;\n        }\n        .v-learn.v-learn-default:hover {\n          text-decoration: underline;\n        }\n        .v-learn.v-learn-default:visited {\n          color: #003ea9;\n        }\n      '
                    ),
                  hr().forEach(function (e) {
                    e.setAttribute(
                      'aria-label',
                      'Learn more about Visa Checkout'
                    );
                    var t = Object.keys(r);
                    e.addEventListener('click', function (t) {
                      t.preventDefault(), e.setAttribute('data-active', 'true');
                    });
                    for (var n = 0, o = t; n < o.length; n++) {
                      var i = o[n],
                        a = r[i];
                      a && e.addEventListener(i, a);
                    }
                  });
                break;
              case '@@learn/FIT_CONTENT':
                !(function (e) {
                  var t = e.height,
                    n = document.getElementById(Ln.f.learn);
                  if (n) {
                    n.style.height = ''.concat(t, 'px');
                    var r = vr();
                    r && sr({ iframe: n, target: r });
                  }
                })(t.data);
                break;
              case '@@window/CLOSE_WINDOW':
                'learn' === t.data.id &&
                  (n = vr()) &&
                  n.removeAttribute('data-active');
                break;
              case '@@learn/HIDE':
                hr().forEach(function (e) {
                  e.style.visibility = 'hidden';
                });
            }
            var n, r;
            return e(t);
          };
        };
      };
    function xr(e) {
      var t;
      null === (t = window.VsbOrchAdapterInstance) ||
        void 0 === t ||
        t.setSrcWindowReference(e);
    }
    window.VsbOrchAdapterInstance = null;
    var Vr = function (e) {
        return function (t) {
          return function (n) {
            var i,
              a,
              c,
              u,
              d,
              l,
              f,
              p,
              h,
              v,
              y = Rt(e.getState());
            if ('SRC' !== y && 'VDCP' !== y) return t(n);
            if ('@@orchestration/INIT' === n.type)
              (d = {
                isHybrid: re(e.getState()),
                onInit: function (t) {
                  Kt(e.getState()) &&
                    e.dispatch({
                      data: t,
                      type: '@@orchestration/VSB_INIT_COMPLETE',
                    }),
                    e.dispatch({
                      data: !1,
                      type: '@@sdk/CHECKOUT_VSB_INIT_BUTTONLESS',
                    });
                },
                orchConfigs: n.data,
              }),
                (f = d.isHybrid),
                (p = d.orchConfigs),
                (h = d.onInit),
                (v =
                  null === (l = window.vAdapters) || void 0 === l
                    ? void 0
                    : l.VSB)
                  ? (v.init(p).then(h),
                    (window.VsbOrchAdapterInstance = v),
                    f && r.a.sendOrchestrationHasLoaded())
                  : s.a.error(o.l);
            else if (
              '@@sdk/CHECKOUT_COMPLETE' === n.type &&
              n.correlationId &&
              n.sessionId
            )
              (i = { correlationId: n.correlationId, sessionId: n.sessionId }),
                (c = i.correlationId),
                (u = i.sessionId),
                null === (a = window.VsbOrchAdapterInstance) ||
                  void 0 === a ||
                  a.reinitializeOrchSdk(c, u);
            else if (
              '@@window/CLOSE_WINDOW' === n.type &&
              'checkout' === n.data.id
            )
              xr(null);
            else if (
              '@@window/OPEN_WINDOW' === n.type &&
              'checkout' === n.data.id
            ) {
              xr(
                'popup' === n.data.type
                  ? Object(An.a)('checkout')
                  : cr('checkout')
              );
            } else
              '@@window/NAVIGATE' === n.type && xr(Object(An.a)(n.data.id));
            return t(n);
          };
        };
      },
      Br = function (e) {
        return function (t) {
          return function (n) {
            var r,
              o = t(n);
            switch (n.type) {
              case '@@window/SEND_GTM_EVENT':
                j.b({ event: n.data, type: 'visa:gtm:event' }, 'gtm');
                break;
              case '@@window/SYNC_GTM_DATALAYER':
                j.b({ event: n.data, type: 'visa:gtm:sync' }, 'gtm');
                break;
              case '@@window/SEND_POSTMESSAGE':
                (r = e.getState()),
                  'string' == typeof n.target
                    ? ('self' === n.target || sn(r, n.target)) &&
                      j.b(n.message, n.target)
                    : n.target.forEach(function (e) {
                        sn(r, e) && j.b(n.message, e);
                      });
            }
            return o;
          };
        };
      },
      Hr = n(14);
    function Wr(e) {
      for (var t = '', n = 0, r = Object.keys(e); n < r.length; n++) {
        var o = r[n];
        t += ''.concat(o, ':').concat(e[o], ';');
      }
      return t;
    }
    var Gr = n(15);
    function Kr(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function Fr(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? Kr(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : Kr(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var qr,
      zr = Object(a.k)();
    function Yr(e) {
      if (
        !(function (e, t) {
          if (!e) return !1;
          do {
            if (e.matches(t)) return !0;
            e = e.parentElement || e.parentNode;
          } while (null !== e && 1 === e.nodeType);
          return !1;
        })(e.target, '#'.concat('vcoGhostLayer'))
      ) {
        var t = document.getElementById('visa-overlay-logo');
        t && t.focus();
      }
    }
    function Xr() {
      var e,
        t = Gr.a();
      t && t.close(),
        Gr.b(null),
        (e = document.getElementById('vcoGhostLayer')) &&
          document.body.removeChild(e),
        document.removeEventListener('focus', Yr, !0);
    }
    function Jr(e) {
      var t,
        n = null === (t = e.overlay) || void 0 === t || t;
      if (
        (!qr && e.onCancelCheckout && (qr = e.onCancelCheckout), n) &&
        !Boolean(
          performance.getEntriesByType('resource').find(function (e) {
            return -1 !== e.name.indexOf('Open+Sans');
          })
        )
      ) {
        var r = document.createElement('style');
        (r.innerHTML =
          "@import url('https://fonts.googleapis.com/css?family=Open+Sans');"),
          document.getElementsByTagName('head')[0].appendChild(r);
      }
      var o = e.query ? Object(f.b)(e.query) : '',
        i = Gr.a();
      if (i && e.replaceUrl) i.location.href = ''.concat(e.src).concat(o);
      else {
        var a = Math.min(screen.height, 640),
          s = Math.min(screen.width, 400),
          u = [
            'directories=no',
            'location=yes',
            'menubar=no',
            'scrollbars=yes',
            'status=no',
            'toolbar=no',
            'resizable=no',
            'width='.concat(s),
            'height='.concat(a),
            'top='.concat(screen.height / 2 - a / 2),
            'left='.concat(screen.width / 2 - s / 2),
          ];
        if (
          ((i = window.open(
            ''.concat(e.src).concat(o),
            Ln.g[e.id],
            u.join(',')
          )) &&
            (Gr.b(i),
            i.addEventListener('load', function () {
              Object(c.b)(''.concat(c.c.popupLoad).concat(Ln.g[e.id])),
                e.onLoad && e.onLoad();
            })),
          n)
        ) {
          var d = document.createElement('div');
          (d.id = 'vcoGhostLayer'),
            (d.style.position = 'fixed'),
            (d.style.top = '0'),
            (d.style.left = '0'),
            (d.style.background = '#000'),
            (d.style.opacity = '0.75'),
            (d.style.filter =
              'progid:DXImageTransform.Microsoft.Alpha(Opacity=75)'),
            (d.style.minWidth = '100%'),
            (d.style.minHeight = '100%'),
            (d.style.zIndex = '999999'),
            document.body.appendChild(d);
        }
        var l = zr ? 'beforeunload' : 'pagehide';
        window.addEventListener(l, function e() {
          window.removeEventListener(l, e), Xr();
        });
      }
      i &&
        (qr &&
          (function (e, t, n) {
            !(function e(n, r) {
              t.closed
                ? r()
                : n > 0 &&
                  (We = setTimeout(function () {
                    e(n - 200, r);
                  }, 200));
            })(e, n);
          })(1 / 0, i, function () {
            qr(), Xr();
          }),
        i.focus());
    }
    var Qr = { orchestration: 'orchJs', thm: 'threatmetrix_script_tag' };
    function $r(e) {
      var t,
        n = ((t = e.id), document.getElementById(Qr[t]));
      n && n.parentNode && n.parentNode.removeChild(n);
    }
    function Zr(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    var eo = function (e) {
      return function (t) {
        return function (n) {
          var r,
            o,
            i,
            a = e.getState();
          switch (n.type) {
            case '@@window/INJECT_SCRIPT':
              (o = (function (e) {
                for (var t = 1; t < arguments.length; t++) {
                  var n = null != arguments[t] ? arguments[t] : {};
                  t % 2
                    ? Zr(Object(n), !0).forEach(function (t) {
                        d()(e, t, n[t]);
                      })
                    : Object.getOwnPropertyDescriptors
                    ? Object.defineProperties(
                        e,
                        Object.getOwnPropertyDescriptors(n)
                      )
                    : Zr(Object(n)).forEach(function (t) {
                        Object.defineProperty(
                          e,
                          t,
                          Object.getOwnPropertyDescriptor(n, t)
                        );
                      });
                }
                return e;
              })({}, n.data, {
                onLoad: function (t) {
                  var r, o;
                  e.dispatch({
                    data: { id: n.data.id },
                    type: '@@window/SCRIPT_LOADED',
                  }),
                    null === (r = (o = n.data).onLoad) ||
                      void 0 === r ||
                      r.call(o, t);
                },
              })),
                (i = document.createElement('script')),
                Qr[o.id] && i.setAttribute('id', Qr[o.id]),
                i.setAttribute('src', o.src),
                document.head.appendChild(i),
                o.onLoad && (i.onload = o.onLoad),
                o.onError && (i.onerror = o.onError);
              break;
            case '@@window/REMOVE_SCRIPT':
              $r(n.data);
              break;
            case '@@window/OPEN_WINDOW':
              var c = 'preload' === un(a, n.data.id);
              if ('popup' === n.data.type) {
                c &&
                  fr({
                    id: n.data.id,
                    noscript: dn(a, n.data.id, 'noscript') || !1,
                    type: 'preload',
                  }),
                  Jr(n.data);
                break;
              }
              if (c) {
                'modal' === n.data.type
                  ? (function (e) {
                      var t = Ln.f[e.id];
                      tr(
                        'rxo-open',
                        '\n      #'
                          .concat(t, '.')
                          .concat(
                            t,
                            ' {\n        height: 100%; /*height: 100vh;*/\n        width: 100%;\n        width: 100vw;\n      }\n\n      body.rxo-open {\n        overflow: hidden;\n        position: fixed;\n        left: 0;\n        right: 0;\n      }\n\n      body.rxo-ios-android {\n        position: fixed;\n        width: 100%;\n        height: 100%;\n      }\n    '
                          )
                      ),
                        rr('rxo-open');
                      var n = cr(e.id);
                      if (
                        ((n.style.position = 'fixed'),
                        (n.style.display = 'block'),
                        (n.style.top = '0'),
                        (n.style.left = '0'),
                        (n.style.height = '100%'),
                        (n.style.width = '100%'),
                        (n.style.zIndex = '1000000'),
                        n.removeAttribute('role'),
                        e.autofocus)
                      ) {
                        var r = n.parentNode;
                        setTimeout(function () {
                          return ur(r);
                        }, 100);
                      }
                    })(n.data)
                  : 'preload' === n.data.type && pr(n.data);
                break;
              }
              'checkout' === n.data.id &&
                Ge(a, 'vdcpAddSandboxAttr') &&
                (n.data.sandbox = !0),
                lr(n.data);
              break;
            case '@@window/CLOSE_WINDOW':
              var s = un(a, n.data.id);
              'popup' === s
                ? Xr()
                : fr({
                    id: n.data.id,
                    noscript: dn(a, n.data.id, 'noscript') || !1,
                    type: s,
                  });
              break;
            case '@@window/RELOAD':
              pr(n.data);
              break;
            case '@@window/NAVIGATE':
              'popup' === un(a, n.data.id) &&
                (function (e) {
                  var t = Gr.a();
                  if (t) {
                    var n = Object(f.b)(e.query);
                    t.location.href = ''.concat(e.src).concat(n);
                  }
                })(n.data);
              break;
            case '@@window/PRELOAD_IMAGE':
              (r = n.data.url), (document.createElement('img').src = r);
              break;
            case '@@window/RECEIVED_POPUP_OVERLAY_TEXT':
              !(function (e, t) {
                var n = document.getElementById('vcoGhostLayer');
                if (n) {
                  document.addEventListener('focus', Yr, !0);
                  var r = document.createElement('div');
                  r.setAttribute('role', 'dialog'),
                    (r.style.color = '#fff'),
                    (r.style.textAlign = 'center'),
                    (r.style.zIndex = '999999'),
                    (r.style.position = 'fixed'),
                    (r.style.width = '100%'),
                    (r.style.top = '35%'),
                    (r.style.fontSize = '10px'),
                    (r.style.fontFamily = 'Open sans');
                  var o = {
                      'background-image': 'url('.concat(
                        'data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22100%22%20height%3D%2215%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M51.866%2013.902c-.511.178-.994.312-1.46.406-.466.092-.91.135-1.326.135-1.105%200-1.988-.301-2.648-.904-.662-.609-.992-1.41-.992-2.41%200-.656.104-1.277.313-1.859.209-.584.516-1.11.925-1.59.48-.564%201.06-1%201.737-1.307a5.266%205.266%200%200%201%202.188-.456c.428%200%20.854.05%201.285.15.428.103.864.253%201.31.46l-.341%201.703a3.95%203.95%200%200%200-1.062-.59%203.367%203.367%200%200%200-1.145-.19c-.851%200-1.561.328-2.13.981-.574.65-.86%201.471-.86%202.447%200%20.635.176%201.128.528%201.49.354.359.84.535%201.46.535.37%200%20.763-.065%201.18-.196a8.195%208.195%200%200%200%201.402-.634l-.364%201.824v.005zm7.982-3.373l-.734%203.756h-1.973l.619-3.215c.045-.211.077-.387.102-.53.023-.146.035-.261.035-.347%200-.234-.062-.416-.191-.543-.13-.131-.312-.195-.557-.195-.406%200-.76.16-1.049.477-.291.318-.498.76-.607%201.318l-.598%203.033H52.92l1.66-8.568h1.982L55.92%209.02c.359-.354.73-.619%201.096-.789.365-.174.75-.258%201.15-.258.566%200%201.006.147%201.314.444.31.3.459.717.459%201.256a4.093%204.093%200%200%201-.091.856m7.272.905l-.068.312h-4.614c0%20.02%200%20.055-.006.096a.967.967%200%200%200-.007.098c0%20.402.12.701.363.896.237.2.601.297%201.08.297.416%200%20.854-.06%201.315-.186a8.328%208.328%200%200%200%201.447-.557l-.3%201.529a7.91%207.91%200%200%201-1.435.393%207.991%207.991%200%200%201-1.451.131c-.961%200-1.703-.223-2.229-.666-.521-.443-.782-1.069-.782-1.885%200-.47.086-.924.25-1.365a4.08%204.08%200%200%201%20.729-1.217c.38-.436.83-.77%201.358-1%20.524-.227%201.109-.339%201.754-.339.834%200%201.496.22%201.983.666.488.443.736%201.043.736%201.793%200%20.146-.017.305-.03.471-.02.162-.05.34-.092.535m-1.861-.907c.01-.045.02-.1.024-.146.004-.05.008-.098.008-.145%200-.295-.09-.527-.271-.7-.17-.173-.41-.261-.713-.261-.385%200-.713.105-.98.32-.27.209-.479.521-.62.93h2.55l.002.002zm8.47-2.218l-.316%201.607a3.578%203.578%200%200%200-.78-.402c-.26-.092-.51-.14-.755-.14-.646%200-1.17.218-1.578.649-.404.431-.607.98-.607%201.654%200%20.43.125.764.38%201%20.254.232.61.352%201.073.352a3.095%203.095%200%200%200%201.758-.547L72.6%2014.1a6.49%206.49%200%200%201-.984.26c-.33.055-.663.08-.995.08-.97%200-1.716-.213-2.238-.649s-.783-1.053-.783-1.853c0-.5.096-.99.289-1.463.189-.477.469-.9.825-1.281.399-.412.86-.721%201.377-.922.519-.201%201.115-.3%201.79-.3a5.174%205.174%200%200%201%201.85.341m1.587-2.598h1.986l-.906%204.645%202.662-2.244h2.323L77.8%2010.973l2.603%203.312H78.15l-2-2.66-.517%202.66h-1.977l1.662-8.57zm9.162%202.253c.916%200%201.64.233%202.162.698.524.47.787%201.104.787%201.906a3.85%203.85%200%200%201-.97%202.556c-.375.436-.813.76-1.328.98-.508.22-1.075.33-1.704.33-.906%200-1.619-.23-2.146-.696-.523-.468-.785-1.103-.785-1.908%200-.46.084-.912.252-1.354.166-.442.412-.85.728-1.215.362-.427.805-.75%201.312-.972a4.277%204.277%200%200%201%201.69-.328m-.164%201.411c-.512%200-.932.233-1.26.694-.332.466-.496%201.05-.496%201.77%200%20.391.09.688.269.891.177.199.437.306.776.306.51%200%20.934-.229%201.26-.695.336-.466.498-1.054.498-1.772%200-.383-.09-.68-.268-.881-.176-.207-.436-.31-.779-.31m3.725%202.507l.72-3.768h1.979l-.622%203.21c-.043.208-.076.388-.101.533a2.764%202.764%200%200%200-.035.351c0%20.229.064.41.195.54.131.126.312.191.551.191.409%200%20.756-.156%201.056-.473.29-.316.491-.757.604-1.318l.594-3.032h1.979l-1.192%206.167h-1.988l.184-.904a3.627%203.627%200%200%201-1.064.801%202.64%202.64%200%200%201-1.172.264c-.561%200-.996-.147-1.307-.442-.311-.3-.46-.717-.46-1.265%200-.127.005-.262.021-.407a2.89%202.89%200%200%201%20.06-.444M98.134%206.366l-.336%201.75h2.017l-.279%201.409h-2.018l-.506%202.61a.795.795%200%200%200-.029.15.714.714%200%200%200-.01.11c0%20.17.057.291.166.363.11.072.301.11.561.11h1.02l-.277%201.409h-1.656c-.598%200-1.051-.125-1.36-.377-.313-.248-.468-.607-.468-1.078a3.512%203.512%200%200%201%20.067-.69l1.127-5.775%201.98.005.001.004zM16.394.902l-5.59%2013.334H7.158L4.407%203.593c-.165-.654-.31-.893-.82-1.17-.83-.45-2.197-.872-3.4-1.133l.08-.388h5.87c.748%200%201.42.498%201.59%201.36l1.45%207.716L12.773.9l3.625.002m14.286%208.98c.017-3.517-4.865-3.71-4.832-5.287.013-.476.466-.984%201.464-1.115.495-.064%201.858-.114%203.403.597l.607-2.827a9.223%209.223%200%200%200-3.228-.593c-3.41%200-5.81%201.814-5.83%204.408-.023%201.92%201.713%202.992%203.02%203.628%201.345.654%201.795%201.074%201.79%201.66-.008.894-1.07%201.285-2.064%201.299-1.734.029-2.74-.465-3.544-.84l-.623%202.924c.805.369%202.293.689%203.836.705%203.624.004%205.995-1.783%206.006-4.557m9.005%204.354h3.19L40.09.902h-2.944c-.663%200-1.22.387-1.47.98L30.5%2014.234h3.62l.722-1.991h4.424l.42%201.991.008.004zm-3.85-4.722l1.815-5.008L38.7%209.516h-2.86.004zM21.323.902L18.47%2014.236h-3.45L17.87.902h3.453z%22%2F%3E%3C%2Fsvg%3E',
                        ')'
                      ),
                      'background-repeat': 'no-repeat',
                      height: '18px',
                      margin: '0px auto 20px',
                      width: '100px',
                    },
                    i = {
                      '-moz-user-select': 'none',
                      '-ms-user-select': 'none',
                      '-webkit-user-select': 'none',
                      'user-select': 'none',
                    },
                    a = Fr({}, i, { opacity: '0' }),
                    c = Fr({}, i, {
                      'font-family': 'Open Sans',
                      'font-size': '11px',
                      'font-weight': 'bold',
                      margin: '0px auto',
                      'margin-bottom': '20px',
                      'max-width': '290px',
                    }),
                    s = Fr({}, i, {
                      background: 'none',
                      border: '1px solid #FED931',
                      color: '#FED931',
                      padding: '5px 20px',
                    }),
                    u = Fr({}, i, {
                      color: '#FED931',
                      cursor: 'pointer',
                      fontSize: '10px',
                    });
                  (r.innerHTML = '\n    <p style="'
                    .concat(
                      Wr(o),
                      '">\n      <a\n        aria-label="Visa Checkout"\n        id="visa-overlay-logo"\n        style="'
                    )
                    .concat(
                      Wr(a),
                      '"\n        tabindex="0"\n      >\n        Visa Checkout Logo\n      </a>\n    </p>\n    <p style="'
                    )
                    .concat(Wr(c), '" tabindex="0">\n      ')
                    .concat(
                      zr ? e.message_iOS_safari : e.message,
                      '\n    </p>\n    <button\n      id="visa-overlay-find-button"\n      style="'
                    )
                    .concat(Wr(s), '"\n      tabindex="0"\n    >\n      ')
                    .concat(
                      zr ? e.restart_button : e.find_button,
                      '\n    </button>\n    <p style="margin-top:20px;">\n      <a\n        id="visa-overlay-cancel-link"\n        style='
                    )
                    .concat(Wr(u), '\n        tabindex="0"\n      >\n        ')
                    .concat(e.cancel_and_return, '\n      </a>\n    </p>\n  ')),
                    n.appendChild(r);
                  var d = r.querySelector('#visa-overlay-find-button');
                  d &&
                    d.addEventListener('click', function (e) {
                      if ((e.stopPropagation(), e.preventDefault(), zr))
                        t.onRestartClick(e);
                      else {
                        t.onFindClick(e);
                        var n = Gr.a();
                        null == n || n.focus();
                      }
                    });
                  var l = r.querySelector('#visa-overlay-cancel-link');
                  l &&
                    l.addEventListener('click', function (e) {
                      e.stopPropagation(),
                        e.preventDefault(),
                        t.onCancelClick(e);
                    });
                }
              })(n.data, n.events);
              break;
            case '@@window/ADD_BODY_CLASS':
              rr(n.data);
              break;
            case '@@window/REMOVE_LOCALSTORAGE':
              Hr.a.removeItem(n.data.key);
              break;
            case '@@window/SET_LOCALSTORAGE':
              var u = n.data,
                l = u.key,
                p = u.value;
              Hr.a.setItem(l, p);
          }
          return t(n);
        };
      };
    };
    function to(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function no(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? to(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : to(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var ro = {
      configData: null,
      configTiming: null,
      merchantConfigResponse: null,
    };
    function oo(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function io(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? oo(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : oo(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var ao = { vInitCallStack: '', vInitClickSpySelected: !1 };
    function co(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function so(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? co(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : co(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var uo = { error: null, status: 'unloaded', vsbInitResponse: null };
    function lo(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function fo(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? lo(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : lo(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var po = {
      orchestration: { injected: !1, loaded: !1 },
      thm: { injected: !1, loaded: !1 },
    };
    function ho(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function vo(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? ho(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : ho(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    function yo(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function go(e) {
      for (var t = 1; t < arguments.length; t++) {
        var n = null != arguments[t] ? arguments[t] : {};
        t % 2
          ? yo(Object(n), !0).forEach(function (t) {
              d()(e, t, n[t]);
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
          : yo(Object(n)).forEach(function (t) {
              Object.defineProperty(
                e,
                t,
                Object.getOwnPropertyDescriptor(n, t)
              );
            });
      }
      return e;
    }
    var bo = {};
    var mo = Object(Sr.combineReducers)({
        checkout: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : Pn,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case '@@sdk/PREFILL_DATA_REQUESTED':
              return Tn({}, e, {
                prefill: { data: null, status: 'requested' },
              });
            case '@@sdk/PREFILL_DATA_RECEIVED':
              return Tn({}, e, {
                prefill: { data: t.data, status: 'received' },
              });
            case '@@sdk/CHECKOUT_VSB_INIT_BUTTONLESS':
              return Tn({}, e, { isVSBButtonless: t.data });
            case '@@sdk/CHECKOUT_VSB_INIT':
              return Tn({}, e, { isVSB: !0 });
            case '@@sdk/CHECKOUT_SETUP':
              return Tn({}, e, {
                initTimestamp:
                  0 === e.initTimestamp ? Date.now() : e.initTimestamp,
                status: 'active' === e.status ? 'active' : 'ready',
                vInit: t.data,
              });
            case '@@sdk/CHECKOUT_QUEUED':
              return Tn({}, e, {
                response: null,
                startPath: t.data ? t.data.startPath : null,
                status: 'queued',
              });
            case '@@hybrid/CHECKOUT_QUEUED':
              return Tn({}, e, {
                response: null,
                startPath: null,
                status: 'queued',
              });
            case '@@config/INVALID_INIT_OPTIONS':
            case '@@config/MERCHANT_CONFIG_FAILURE':
            case '@@sdk/UNSUPPORTED_BROWSER':
            case '@@sdk/UNSUPPORTED_HYBRID_VERSION':
            case '@@sdk/CHECKOUT_DISABLED_BY_FORM_FACTOR':
              return Tn({}, e, { status: 'locked' });
            case '@@sdk/CHECKOUT_STARTED':
            case '@@hybrid/CHECKOUT_STARTED':
              return Tn({}, e, { status: 'active' });
            case '@@sdk/CHECKOUT_COMPLETE':
              var n = Tn({}, e, { response: t.message, status: 'ready' });
              return (
                t.sessionId && (n.sessionId = t.sessionId),
                t.correlationId && (n.correlationId = t.correlationId),
                n
              );
            case '@@config/CONFIG_DATA_RECEIVED':
              return Tn({}, e, {
                correlationId: t.data.correlationId,
                sessionId: t.data.srcEnvConfig.sessionId,
              });
            case '@@button/CARD_BRAND_ORDER':
              return Tn({}, e, { buttonCardBrandOrder: t.data });
            case '@@sdk/OPTIMIZELY_FLOW':
              return Tn({}, e, { finalOptimizelyFlow: t.data });
            default:
              return e;
          }
        },
        config: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : ro,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case '@@config/CONFIG_DATA_RECEIVED':
              return no({}, e, { configData: t.data });
            case '@@config/CONFIG_TIMING_RECEIVED':
              return no({}, e, { configTiming: t.data });
            case '@@config/MERCHANT_CONFIG_SUCCESS':
              return no({}, e, { merchantConfigResponse: t.data });
            case '@@config/UPDATE_SDK_PARAMS':
              return no({}, e, {
                configData: no({}, e.configData, {
                  rememberMeType: t.data.rememberme_type,
                }),
              });
            case '@@config/UPDATE_LOCALE_COOKIE':
              return no({}, e, {
                configData: no({}, e.configData, {
                  cookieCountry: t.data.countryCode,
                  cookieLocale: t.data.locale,
                }),
              });
            default:
              return e;
          }
        },
        gtmNsmi: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : ao,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case '@@sdk/NSMI_VINIT_ERROR_STACK':
              return io({}, e, { vInitCallStack: t.payload });
            case '@@sdk/NSMI_VINIT_BUTTON_CLICK':
              return io({}, e, { vInitClickSpySelected: t.payload });
            default:
              return e;
          }
        },
        hybrid: Er,
        orchestration: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : uo,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case '@@orchestration/ERROR':
              return so({}, e, { error: t.error, status: 'error' });
            case '@@orchestration/INIT':
              return so({}, e, {
                status: 'loaded' === e.status ? 'loaded' : 'loading',
              });
            case '@@orchestration/VSB_INIT_COMPLETE':
              return so({}, e, { vsbInitResponse: t.data });
            case '@@orchestration/READY':
              return so({}, e, { status: 'loaded' });
            default:
              return e;
          }
        },
        script: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : po,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case '@@window/INJECT_SCRIPT':
              return fo(
                {},
                e,
                d()(
                  {},
                  t.data.id,
                  fo({}, e[t.data.id], { injected: Date.now() })
                )
              );
            case '@@window/SCRIPT_LOADED':
              return fo(
                {},
                e,
                d()({}, t.data.id, fo({}, e[t.data.id], { loaded: Date.now() }))
              );
            default:
              return e;
          }
        },
        thm: function () {
          var e,
            t,
            n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : null,
            r = arguments.length > 1 ? arguments[1] : void 0;
          switch (r.type) {
            case '@@thm/LAUNCH':
              return vo({}, r.data, {
                orgId:
                  null !== (e = r.data.orgId) && void 0 !== e
                    ? e
                    : null == n
                    ? void 0
                    : n.orgId,
                profilingStartTime: Date.now(),
                sessionId:
                  null !== (t = r.data.sessionId) && void 0 !== t
                    ? t
                    : null == n
                    ? void 0
                    : n.sessionId,
              });
            default:
              return n;
          }
        },
        window: function () {
          var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : bo,
            t = arguments.length > 1 ? arguments[1] : void 0;
          switch (t.type) {
            case '@@window/OPEN_WINDOW':
              return go(
                {},
                e,
                d()({}, t.data.id, {
                  noscript: 'popup' !== t.data.type && t.data.noscript,
                  type: t.data.type,
                })
              );
            case '@@window/CLOSE_WINDOW':
              return go({}, e, d()({}, t.data.id, null));
            default:
              return e;
          }
        },
      }),
      wo = function () {
        var e = (function () {
          try {
            throw new Error();
          } catch (e) {
            return e;
          }
        })();
        return e.stack ? e.stack : '';
      },
      Oo = n(19);
    function Eo(e, t) {
      return t in e;
    }
    function So(e, t) {
      return !!Eo(e, t) && 'string' == typeof e[t];
    }
    function Co(e, t) {
      return !!Eo(e, t) && 'number' == typeof e[t];
    }
    function _o(e, t) {
      return !!Eo(e, t) && 'boolean' == typeof e[t];
    }
    function ko(e, t) {
      return !!So(e, t) && ('true' === e[t] || 'false' === e[t]);
    }
    function Io(e, t) {
      return (
        !!Eo(e, t) &&
        'object' === F()(e[t]) &&
        null !== e[t] &&
        !Array.isArray(e[t])
      );
    }
    function To(e, t) {
      return !!Eo(e, t) && Array.isArray(e[t]);
    }
    function Do(e) {
      var t = { apikey: '' };
      if ('object' !== F()(e) || null === e) return t;
      if (
        (So(e, 'apikey') && (t.apikey = e.apikey),
        So(e, 'backgroundImageId') &&
          (t.backgroundImageId = e.backgroundImageId),
        So(e, 'clientId') && (t.clientId = e.clientId),
        So(e, 'encryptionKey') && (t.encryptionKey = e.encryptionKey),
        So(e, 'externalClientId') && (t.externalClientId = e.externalClientId),
        So(e, 'externalProfileId') &&
          (t.externalProfileId = e.externalProfileId),
        Io(e, 'paymentRequest'))
      ) {
        for (
          var n = e.paymentRequest,
            r = {},
            o = [
              'currencyCode',
              'customData',
              'description',
              'discount',
              'giftWrap',
              'merchantRequestId',
              'misc',
              'orderId',
              'promoCode',
              'shippingHandling',
              'subtotal',
              'tax',
              'total',
            ],
            i = 0,
            a = Object.keys(n);
          i < a.length;
          i++
        ) {
          var c = a[i];
          o.includes(c) || (r[c] = n[c]);
        }
        if (
          (So(n, 'currencyCode') && (r.currencyCode = n.currencyCode),
          So(n, 'subtotal') || Co(n, 'subtotal'))
        ) {
          var s = Object(Oo.a)(n.subtotal);
          s && (r.subtotal = s);
        }
        if (
          (So(n, 'merchantRequestId') &&
            (r.merchantRequestId = n.merchantRequestId),
          So(n, 'discount') && (r.discount = n.discount),
          So(n, 'giftWrap') && (r.giftWrap = n.giftWrap),
          So(n, 'misc') && (r.misc = n.misc),
          So(n, 'shippingHandling') &&
            (r.shippingHandling = n.shippingHandling),
          So(n, 'tax') && (r.tax = n.tax),
          Co(n, 'total') || So(n, 'total'))
        ) {
          var u = Object(Oo.a)(n.total);
          u && (r.total = u);
        }
        if (
          (So(n, 'orderId') && (r.orderId = n.orderId),
          So(n, 'description') && (r.description = n.description),
          So(n, 'promoCode') && (r.promoCode = n.promoCode),
          Io(n, 'customData'))
        ) {
          var d = n.customData;
          To(d, 'nvPair') &&
            (r.customData = {
              nvPair: d.nvPair.filter(function (e) {
                return (
                  'object' === F()(e) &&
                  null !== e &&
                  !(!So(e, 'name') || (!So(e, 'value') && !Co(e, 'value')))
                );
              }),
            });
        }
        Object.keys(r).length && (t.paymentRequest = r);
      }
      if (
        (So(e, 'referenceCallID') && (t.referenceCallID = e.referenceCallID),
        So(e, 'sourceId') && (t.sourceId = e.sourceId),
        Io(e, 'settings'))
      ) {
        var l = e.settings,
          f = {};
        if (
          (So(l, 'backgroundImageId') &&
            (f.backgroundImageId = l.backgroundImageId),
          So(l, 'countryCode') && (f.countryCode = l.countryCode),
          So(l, 'currencyFormat') && (f.currencyFormat = l.currencyFormat),
          So(l, 'customerSupportUrl') &&
            (f.customerSupportUrl = l.customerSupportUrl),
          !So(l, 'dataLevel') ||
            ('FULL' !== l.dataLevel &&
              'NONE' !== l.dataLevel &&
              'SUMMARY' !== l.dataLevel) ||
            (f.dataLevel = l.dataLevel),
          So(l, 'displayName') && (f.displayName = l.displayName),
          (_o(l, 'enableUserDataPrefill') || ko(l, 'enableUserDataPrefill')) &&
            (f.enableUserDataPrefill = l.enableUserDataPrefill),
          So(l, 'encryptionKey') && (f.encryptionKey = l.encryptionKey),
          (_o(l, 'guestCheckout') || ko(l, 'guestCheckout')) &&
            (f.guestCheckout = l.guestCheckout),
          So(l, 'locale'))
        ) {
          var p = $(l.locale);
          p && (f.locale = p);
        }
        if (
          (So(l, 'logoUrl') && (f.logoUrl = l.logoUrl),
          So(l, 'newUserWelcomeMessage') &&
            (f.newUserWelcomeMessage = l.newUserWelcomeMessage),
          So(l, 'newUserWelcomeMessageDescription') &&
            (f.newUserWelcomeMessageDescription =
              l.newUserWelcomeMessageDescription),
          So(l, 'returningUserWelcomeMessage') &&
            (f.returningUserWelcomeMessage = l.returningUserWelcomeMessage),
          Io(l, 'payment'))
        ) {
          var h = l.payment;
          if (
            ((f.payment = {}),
            To(h, 'cardBrands') &&
              (f.payment.cardBrands = h.cardBrands.filter(function (e) {
                return 'string' == typeof e;
              })),
            (_o(h, 'acceptCanadianVisaDebit') ||
              ko(h, 'acceptCanadianVisaDebit')) &&
              (f.payment.acceptCanadianVisaDebit = h.acceptCanadianVisaDebit),
            To(h, 'billingCountries'))
          ) {
            var v = h.billingCountries.filter(function (e) {
              return 'string' == typeof e;
            });
            v.length && (f.payment.billingCountries = v);
          }
        }
        if (Io(l, 'review')) {
          var y = l.review;
          if (
            ((f.review = {}),
            So(y, 'message') && (f.review.message = y.message),
            So(y, 'buttonAction'))
          ) {
            var g = y.buttonAction.toUpperCase();
            ('CONTINUE' !== g && 'PAY' !== g) || (f.review.buttonAction = g);
          }
        }
        if (Io(l, 'shipping')) {
          var b = l.shipping;
          (f.shipping = {}),
            To(b, 'acceptedRegions') &&
              (f.shipping.acceptedRegions = b.acceptedRegions.filter(function (
                e
              ) {
                return 'string' == typeof e;
              })),
            (_o(b, 'collectShipping') || ko(b, 'collectShipping')) &&
              (f.shipping.collectShipping = b.collectShipping);
        }
        if (Io(l, 'threeDSSetup')) {
          var m = l.threeDSSetup;
          (f.threeDSSetup = {}),
            (_o(m, 'threeDSActive') || ko(m, 'threeDSActive')) &&
              (f.threeDSSetup.threeDSActive = m.threeDSActive),
            (_o(m, 'threeDSSuppressChallenge') ||
              ko(m, 'threeDSSuppressChallenge')) &&
              (f.threeDSSetup.threeDSSuppressChallenge =
                m.threeDSSuppressChallenge);
        }
        if (Io(l, 'tokenizationSetup')) {
          var w = l.tokenizationSetup;
          (f.tokenizationSetup = {}),
            (_o(w, 'enableTokenization') || ko(w, 'enableTokenization')) &&
              (f.tokenizationSetup.enableTokenization = w.enableTokenization),
            So(w, 'tokenCryptogramType') &&
              (f.tokenizationSetup.tokenCryptogramType = w.tokenCryptogramType);
        }
        if (
          (So(l, 'websiteUrl') && (f.websiteUrl = l.websiteUrl),
          So(l, 'widgetStyle'))
        ) {
          var O = l.widgetStyle.toUpperCase();
          ('OVERLAY' !== O && 'LIGHTBOX' !== O && 'POPUP' !== O) ||
            (f.widgetStyle = O);
        }
        Object.keys(f).length && (t.settings = f);
      }
      if (Io(e, 'sdkLiteMerchantAppInfo')) {
        var E = e.sdkLiteMerchantAppInfo;
        So(E, 'scheme') &&
          So(E, 'package') &&
          (t.sdkLiteMerchantAppInfo = { package: E.package, scheme: E.scheme });
      }
      return t;
    }
    var Po = n(31);
    function Ro() {
      var e,
        t,
        n =
          ((e = { checkout: Pn, hybrid: Or }),
          (t = [kr, Mr, Ur, Br, eo, Vr]),
          Object(Sr.createStore)(
            mo,
            e,
            Object(Cr.composeWithDevTools)({
              name: 'Visa SDK ('.concat(Object(W.a)(), ')'),
              trace: !0,
            })(Sr.applyMiddleware.apply(void 0, t))
          )),
        r = {
          'payment.cancel': function () {},
          'payment.error': function () {},
          'payment.success': function () {},
          'pre-payment.user-data-prefill': function () {
            return null;
          },
        },
        u = function () {
          return r['pre-payment.user-data-prefill']();
        },
        d = function () {
          n.dispatch({ payload: !0, type: '@@sdk/NSMI_VINIT_BUTTON_CLICK' });
        };
      P(d);
      var l = Gn(n, ye, function (e) {
        var t;
        'pre-init' === e ||
          de(n.getState()) ||
          ((t = d),
          w().forEach(function (e) {
            return e.removeEventListener('click', t);
          }),
          l());
      });
      var f = {
          init: function (e) {
            var t = Do(e);
            return (
              Object(c.b)(c.c.vinit),
              n.dispatch({
                payload: wo(),
                type: '@@sdk/NSMI_VINIT_ERROR_STACK',
              }),
              Object(a.e)()
                ? (n.dispatch({
                    type: '@@sdk/UNSUPPORTED_BROWSER',
                    ua: Object(a.b)(),
                  }),
                  null)
                : Se(n.getState())
                ? (ue(n.getState()) || s.a.warn(o.c),
                  gr({ onPrefillRequest: u, store: n, vOptions: t }))
                : t.apikey
                ? (Wn(n, u),
                  qn(n),
                  Gn(n, ye, function (e, t) {
                    'queued' !== t &&
                      'queued' === e &&
                      (function () {
                        n.dispatch({
                          data: {
                            event: 'Visa Checkout Button State',
                            event_action:
                              'Visa Checkout Button Click Registered',
                            event_category: 'Merchant Site',
                            event_label:
                              'Visa Checkout Button Click Registered',
                          },
                          type: '@@window/SEND_GTM_EVENT',
                        });
                        var e = n.getState();
                        if (nn(e)) Xn({ onPrefillRequest: u, store: n });
                        else {
                          re(e) ||
                            ('POPUP' === en(e)
                              ? n.dispatch({
                                  data: {
                                    id: 'checkout',
                                    query: { isSRCBranded: Ht(e) },
                                    src: i.j,
                                    type: 'popup',
                                  },
                                  type: '@@window/OPEN_WINDOW',
                                })
                              : n.dispatch({
                                  message: {
                                    type: 'visa.src.show-launch-loader',
                                  },
                                  target: 'self',
                                  type: '@@window/SEND_POSTMESSAGE',
                                }));
                          var t = Gn(n, nn, function (e) {
                            e && (Xn({ onPrefillRequest: u, store: n }), t());
                          });
                        }
                      })();
                  }),
                  Gn(n, ge, function (e) {
                    if (e) {
                      e.data && delete e.data.dataLayer;
                      var t = n.getState();
                      if ('success' === e.type) {
                        var o = Jt(t);
                        'NONE' === Ee(t, 'dataLevel') &&
                          delete o.paymentMethodType,
                          r['payment.success'](o),
                          n.dispatch({
                            message: { data: o, type: 'visa.vsb.complete' },
                            target: 'self',
                            type: '@@window/SEND_POSTMESSAGE',
                          });
                      } else if ('cancel' === e.type) {
                        var i = Jt(t);
                        r['payment.cancel'](i),
                          n.dispatch({
                            message: { data: i, type: 'visa.vsb.cancel' },
                            target: 'self',
                            type: '@@window/SEND_POSTMESSAGE',
                          });
                      } else {
                        var a = Jt(t);
                        r['payment.error'](a, e.error),
                          n.dispatch({
                            message: { data: a, type: 'visa.vsb.error' },
                            target: 'self',
                            type: '@@window/SEND_POSTMESSAGE',
                          });
                      }
                    }
                  }),
                  Gn(n, le, function (e, t) {
                    var r, o, i;
                    'requested' !== t &&
                      'requested' === e &&
                      ((r = u()),
                      (o = function (e) {
                        e &&
                          (n.dispatch({
                            data: e,
                            type: '@@sdk/PREFILL_DATA_RECEIVED',
                          }),
                          n.dispatch({
                            message: { data: e, type: 'setPrefillData' },
                            target: 'checkout',
                            type: '@@window/SEND_POSTMESSAGE',
                          }));
                      }),
                      (i = r) && 'function' == typeof i.then
                        ? r.then(o).catch(console.error)
                        : o(r));
                  }),
                  gr({ onPrefillRequest: u, store: n, vOptions: t }))
                : (s.a.error(o.j),
                  n.dispatch({ type: '@@config/INVALID_INIT_OPTIONS' }),
                  n.dispatch({
                    data: { error: { reason: 'API_KEY_MISSING' } },
                    type: '@@orchestration/VSB_INIT_COMPLETE',
                  }),
                  null)
            );
          },
          initializeVsb: function (e) {
            n.dispatch({
              data: !0,
              type: '@@sdk/CHECKOUT_VSB_INIT_BUTTONLESS',
            }),
              n.dispatch({ type: '@@sdk/CHECKOUT_VSB_INIT' });
            var t = new Promise(function (e) {
              var t = Gn(n, Le, function (n) {
                n && (e(n), t());
              });
            });
            return f.init(e), t;
          },
          on: function (e, t) {
            if (r[e])
              if ('pre-payment.user-data-prefill' !== e) {
                var o = re(n.getState());
                r[e] = o
                  ? t
                  : function () {
                      for (
                        var e = arguments.length, n = new Array(e), r = 0;
                        r < e;
                        r++
                      )
                        n[r] = arguments[r];
                      setTimeout(function () {
                        return t.apply(void 0, n);
                      }, 0);
                    };
              } else r[e] = t;
          },
          setOptions: function (e) {
            if (Se(n.getState())) {
              var t = Do(e);
              n.dispatch({ data: t, type: '@@sdk/CHECKOUT_SETUP' });
              var r = n.getState();
              tn(r) &&
                n.dispatch({
                  data: {
                    attributes: { title: 'Visa Checkout' },
                    id: 'checkout',
                    onLoad: function () {
                      n.dispatch({
                        message: { data: Date.now(), type: 'rxo:render' },
                        target: 'checkout',
                        type: '@@window/SEND_POSTMESSAGE',
                      });
                    },
                    query: yn(r),
                    src: i.g,
                    type: 'preload',
                  },
                  type: '@@window/OPEN_WINDOW',
                });
            } else s.a.error(o.e);
          },
        },
        p = Z(n.getState());
      if ('5.x' === p)
        n.dispatch({ type: '@@sdk/UNSUPPORTED_HYBRID_VERSION', version: p });
      else if (Object(a.e)())
        n.dispatch({ type: '@@sdk/UNSUPPORTED_BROWSER', ua: Object(a.b)() });
      else {
        window.V = f;
        var h = !1,
          v = function () {
            return (
              'interactive' === document.readyState ||
              'complete' === document.readyState
            );
          },
          y = function () {
            var e = Object(Po.a)();
            e && !h && ((h = !0), e());
          };
        v()
          ? y()
          : document.addEventListener('readystatechange', function () {
              v() && y();
            });
      }
      return f;
    }
    n.d(t, 'default', function () {
      return Ro;
    });
  },
]);
//# sourceMappingURL=/checkout-widget/resources/js/sdk-v2.js.map
