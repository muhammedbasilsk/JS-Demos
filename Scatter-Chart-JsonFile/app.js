/*global Ext:false */
Ext.onReady(function() {
	function createHandler(fieldName) {
        return function(sprite, record, attr, index, store) {
            var circleRad = record.get('size');
            var value = (record.get('size') >> 0) % 8;
            var color = ['rgb(213, 70, 121)', 
                         'rgb(44, 153, 201)', 
                         'rgb(146, 6, 157)', 
                         'rgb(49, 149, 0)', 
                         'rgb(249, 153, 0)',
                         'rgb(0, 0, 0)',
                         'rgb(120, 120, 120)',
                         'rgb(200, 200, 200)'][value];
            return Ext.apply(attr, {
                radius: 35,
                fill: color
            });
        };
    }
    var store = new Ext.data.JsonStore({
	 autoLoad :true,
         proxy : new Ext.data.HttpProxy({
             method: 'GET',
             url: 'data/output_twitter.json',
        }),
	fields : ['date' ,'data' ,'size'],
    });
Ext.create('Ext.panel.Panel',{
    width: '80%',
    height: '80%',
    margin : 10,
    title: 'Scatter chart example',
    layout: 'fit',
    renderTo : 'graph',
	items : [
	         new Ext.chart.Chart({
			width : '900px',
		    	height : '650px',
		        animate: true,
		        theme: 'Category2',
			    store: store,
			    renderTo: Ext.getBody(),
			    axes: [{
		            type: 'Numeric',
		            position: 'left',
		            title: 'Number Of Tweets',
		            grid: true,
		            minimum: 0,
		        }, {
		            type: 'Category',
		            position: 'bottom',
		            fields: ['date'],
		            title: 'Date'
		        }],
			    insetPadding: 50,
			    series: [{
				        type: 'scatter',
				        xField: 'date',
				        yField: 'size',
				        label: {
				            display: 'middle',
				            field: 'size',

				            renderer: function (n) {
				            		return n; 
				            },
				            'text-anchor': 'middle',
				            contrast: true
				        },
				        renderer: createHandler('data'),
				        markerCfg: {
				            type: 'circle',
				            size: 5,
				            fill: '#a00',
				            'stroke-width': 0
				        }		        
				    }]
				})
			]
	});
});
