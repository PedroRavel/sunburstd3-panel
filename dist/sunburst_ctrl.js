'use strict';

System.register(['moment', 'jquery', 'lodash', './d3min.js', './graphics.js', 'app/core/utils/kbn', 'app/core/config', 'app/core/time_series2', 'app/plugins/sdk'], function (_export, _context) {
  "use strict";

  var moment, $, _, kbn, config, TimeSeries, MetricsPanelCtrl, _createClass, SunburstCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }, function (_jquery) {
      $ = _jquery.default;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_d3minJs) {}, function (_graphicsJs) {}, function (_appCoreUtilsKbn) {
      kbn = _appCoreUtilsKbn.default;
    }, function (_appCoreConfig) {
      config = _appCoreConfig.default;
    }, function (_appCoreTime_series) {
      TimeSeries = _appCoreTime_series.default;
    }, function (_appPluginsSdk) {
      MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
    }],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('SunburstCtrl', SunburstCtrl = function (_MetricsPanelCtrl) {
        _inherits(SunburstCtrl, _MetricsPanelCtrl);

        function SunburstCtrl($scope, $element, $injector) {
          _classCallCheck(this, SunburstCtrl);

          var _this = _possibleConstructorReturn(this, (SunburstCtrl.__proto__ || Object.getPrototypeOf(SunburstCtrl)).call(this, $scope, $injector));

          var panelDefaults = {
            legend: {
              show: true, // disable/enable legend
              values: true
            },
            width: 100,
            height: 100,
            fontSize: '25px',
            fontWeight: '10px',
            font: { family: 'Myriad Set Pro, Helvetica Neue, Helvetica, Arial, sans-serif' },
            statData: {},
            message: "",
            text: {
              title: '',
              name: '',
              subText: ''
            }
          };
          _.defaults(_this.panel, panelDefaults);
          _.defaults(_this.panel.legend, panelDefaults.legend);
          _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
          _this.events.on('panel-initialized', _this.render.bind(_this));
          _this.element = $element;
          _this.sunburst = new Sunburst();
          _this.sunburst.panelId = 'panel' + _this.panel.id;

          //this.events.on('data-received', this.onDataReceived.bind(this));
          //this.events.on('panel-teardown', this.onPanelTeardown.bind(this));

          return _this;
        }

        _createClass(SunburstCtrl, [{
          key: 'onInitEditMode',
          value: function onInitEditMode() {
            this.addEditorTab('Options', 'public/plugins/grafana-sunburst-panel/editor.html', 2);
          }
        }, {
          key: 'onDataReceived',
          value: function onDataReceived(dataList) {

            this.series = dataList.map(this.seriesHandler.bind(this));
            this.render();
          }
        }, {
          key: 'seriesHandler',
          value: function seriesHandler(seriesData) {
            var series = new TimeSeries({
              datapoints: seriesData.datapoints,
              alias: seriesData.target
            });
            series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

            return series;
          }
        }, {
          key: 'link',
          value: function link(scope, elem) {
            var _this2 = this;

            this.events.on('render', function () {
              var $panelContainer = elem.find('.panel-container');

              var select = _this2.element.find(".sun");
              _this2.sunburst.selector = select[0];
              _this2.sunburst.init();

              if (_this2.panel.bgColor) {
                $panelContainer.css('background-color', _this2.panel.bgColor);
              } else {
                $panelContainer.css('background-color', '');
              }
            });
          }
        }]);

        return SunburstCtrl;
      }(MetricsPanelCtrl));

      _export('SunburstCtrl', SunburstCtrl);

      SunburstCtrl.templateUrl = 'module.html';
    }
  };
});
//# sourceMappingURL=sunburst_ctrl.js.map
