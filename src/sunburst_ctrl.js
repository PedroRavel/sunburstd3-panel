
import moment from 'moment';


import $ from 'jquery';
import _ from 'lodash';

import './d3min.js';
//import './d3layout.js';
import './graphics.js'


import kbn from 'app/core/utils/kbn';
import config from 'app/core/config';
import TimeSeries from 'app/core/time_series2';
import {MetricsPanelCtrl} from 'app/plugins/sdk';

export class SunburstCtrl extends MetricsPanelCtrl {
  constructor($scope,$element,$injector){
    super($scope,$injector);
    const panelDefaults = {
      legend: {
        show: true, // disable/enable legend
        values: true
      },
      width:100,
      height:100,
      fontSize: '25px',
      fontWeight: '10px',
      font: { family: 'Myriad Set Pro, Helvetica Neue, Helvetica, Arial, sans-serif' },
      statData:{},
      message:"",
      text:{
        title:'',
        name:'',
        subText:''
      }
    }
    _.defaults(this.panel, panelDefaults);
    _.defaults(this.panel.legend, panelDefaults.legend);
    this.events.on('init-edit-mode',this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));
    this.element = $element;
    this.sunburst = new Sunburst();
    this.sunburst.panelId = 'panel' + this.panel.id;


    //this.events.on('data-received', this.onDataReceived.bind(this));
    //this.events.on('panel-teardown', this.onPanelTeardown.bind(this));

  }
  onInitEditMode() {
    this.addEditorTab('Options','public/plugins/grafana-sunburst-panel/editor.html',2);
  }

  onDataReceived(dataList) {

    this.series = dataList.map(this.seriesHandler.bind(this));
    this.render();
  }

  seriesHandler(seriesData) {
    var series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target,
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);

    return series;
  }

  link(scope, elem) {
    this.events.on('render', () => {
        const $panelContainer = elem.find('.panel-container');

        var select = this.element.find(".sun");
        this.sunburst.selector = select[0];
        this.sunburst.init();


      if (this.panel.bgColor) {
        $panelContainer.css('background-color', this.panel.bgColor);
      } else {
        $panelContainer.css('background-color', '');
      }

    });

  }
}

SunburstCtrl.templateUrl = 'module.html';
