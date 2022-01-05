function checkHundredPercent(valueList, total){
	var percentList=[];
	var index = 1;
	
	for(var i=0; i<4; i++){
		percentList[i] = 0;
		for(var j=0; j<valueList.length; j++){
			percentList[i] += parseFloat(((parseFloat(valueList[j]) * 100) / total).toFixed(i));
		}
	}
	var order = [1,2,0,3];
	for(var i=0; i<order.length; i++){
		if(percentList[order[i]] == 100){
			index = order[i];
			break;
		}
	}
	
	return index;
}

function RPSAChart() {

	var region = $('.regional_patient_status_A .rpsa_map .rpsam_graph svg path');
    var btn = $('.regional_patient_status_A .rpsa_map .rpsam_graph button');
    var detail = $('.regional_patient_status_A .rpsa_detail > div');

    btn.click(function(){
        var thDataCity = $(this).attr('data-city');
        btn.removeClass('select');
        $(this).addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
        return false;
    });

    region.click(function(){
        var thDataCity = $(this).attr('class');
        btn.removeClass('select');
        $('.regional_patient_status_A .rpsa_map .rpsam_graph button[data-city="' + thDataCity + '"]').addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
    });

    var btn_pop = $('.regional_patient_status_A .rpsa_detail .mapview .menuinfo a');
    btn_pop.click(function(){
        var thDataPop = $(this).attr('data-popup');
        btn.removeClass('select');
        $(this).addClass('select');
        detail.find('> div').removeClass('zone_popup open');
        $('#' + thDataPop).addClass('zone_popup open');
        return false;
    });

    
}



function RSSChart() {

    var region = $('.regional_step_status .rss_map .rssm_graph svg path');
    var btn = $('.regional_step_status .rss_map .rssm_graph button');
    var detail = $('.regional_step_status .rss_detail > div');

    btn.click(function(){
        var thDataCity = $(this).attr('data-city');
        btn.removeClass('select');
        $(this).addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
        return false;
    });

    region.click(function(){
        var thDataCity = $(this).attr('class');
        btn.removeClass('select');
        $('.regional_step_status .rss_map .rssm_graph button[data-city="' + thDataCity + '"]').addClass('select');
        detail.find('> div').removeClass('open');
        $('#' + thDataCity).addClass('open');
    });
}


function RPSACityRatio() {

    var detail = $('.regional_patient_status_A .rpsa_detail > div > div');

    detail.each(function(){

	    var 
	        id = $(this).attr('id'),
	        data = Number($(this).find('.regional_incidence_ratio').attr('data-percentage'));
	    	
	    if("zone_popup"!=id.substring(0, 10)){
	    	if (id !== 'mapAll') {
	            RIRChart(id, data);
	        }
	    }
    });

    detail.removeAttr('style');
    
}


var  RPR_A_data = {};
function RPRAChart() {
	var RPR_A_total  = RPR_A_data.figure.reduce(function(a, b){return parseFloat(a) + parseFloat(b)}, 0);
	var i = checkHundredPercent(RPR_A_data.figure, RPR_A_total);
	
	var status	=	wCatch(); 
	if (status == 't') {	
		RPR_A_data.label[0] += "\n"; //대구		
		RPR_A_data.label[2] += "\n"; //서울
		RPR_A_data.label[3] += "\n"; //경기
	}

	new Chart(document.getElementById('regional_patient_ratio_A'), {
        type: 'pie',
        data: {
            labels: RPR_A_data.label,
            datasets: [
                {
                    data: RPR_A_data.figure,
                    backgroundColor: ['#00c2ff', '#eaeceb', '#9fa1a0', '#656565', '#babcbb']
                }
            ]
        },
        options: {
            maintainAspectRatio: false,
            title: { display: false },
            legend: { display: false },
            tooltips: { enabled: false },
            hover: { mode: null },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 20,
                    bottom: 40
                }
            },
            plugins: {
                datalabels: {
                    display: true,
                    labels: {
                        inside: {
                            align: 'end',
                            anchor: 'end',
                            textAlign: 'center',
                            offset: function(a) {
                                var leng = a.chart.config.data.datasets[0].data.length;
                                var value = a.chart.config.data.datasets[0].data[a.dataIndex];
                                var total = RPR_A_total;
                                if (((value * 100) / total) < 25) {
                                    if ((leng - 2) === a.dataIndex) {
                                        return 4;
                                    } else if ((leng - 1) === a.dataIndex) {
                                        return 0;
                                    } else {
                                        return 0;
                                    }
                                } else {
                                    return 0;
                                }
                            },
                            font: {
                                family: "'Lato', 'Noto Sans CJK kr'",
                                size: 12,
                                lineHeight: '18px'
                            },
                            color: 'black',
                            formatter: function(a, b) {
                                return (
                                    b.chart.config.data.labels[b.dataIndex] + ' ' + ((a * 100) / RPR_A_total).toFixed(i) + ' %'
                                );
                            }
                        }
                    }
                }
            }
        }
    });
}
