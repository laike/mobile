$(document).on("pageInit", function(e, pageId, $page) {
   if(pageId ==='page-wtdcard'){
               $('#add-card-list').click(function(event){
                    $('#pj-wtdCard-container').hide();
                    $('#card-list-container').show('slow');
                });
                $('#add-card-submit-btn').click(function(event){

                });
                $('#add-card-cancel-btn').click(function(event){
                    $('#card-list-container').hide();
                    $('#pj-wtdCard-container').show('slow');

                });
   }else if(pageId === 'page-deposit-info'){
                   
                $("#datetime-picker").calendar({
                  value: ['1990-02-2']
              });
   }else if(pageId === 'page-register'){
             $("input[type='date']").calendar({
                value: ['2015-12-05']
            });
   }
   else if(pageId === 'page-transfer'){
            
            $("#transfer-in").click(function(event){
            var buttons1 = [
                {
                    text: '转入平台',
                    label: true
                },
                {
                    text: '主账户'
                },
                {
                    text: 'MG'
                }
                ,
                {
                    text: '沙巴体育'
                }
                ,
                {
                    text: 'GD真人'
                }
                ,
                {
                    text: 'BBIN'
                }
                ,
                {
                    text: '欧博真人'
                }
                ,
                {
                    text: '皇冠彩票'
                }
                ,
                {
                    text: 'PT'
                }
                ,
                {
                    text: '皇冠体育'
                }
                ,
                {
                    text: 'AG真人'
                }
            ];
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);

        });
        $("#transfer-out").click(function(event){
            var buttons1 = [
                {
                    text: '转出平台',
                    label: true
                },
                {
                    text: '主账户'
                },
                {
                    text: 'MG'
                }
                ,
                {
                    text: '沙巴体育'
                }
                ,
                {
                    text: 'GD真人'
                }
                ,
                {
                    text: 'BBIN'
                }
                ,
                {
                    text: '欧博真人'
                }
                ,
                {
                    text: '皇冠彩票'
                }
                ,
                {
                    text: 'PT'
                }
                ,
                {
                    text: '皇冠体育'
                }
                ,
                {
                    text: 'AG真人'
                }
            ];
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);

        });
}else if(pageId === 'page-settings'){
$("#onekey-recycle").click(function(){
            $.showPreloader('正在回收...');
            setTimeout(function () {
                $.toast('回收成功！', 2345, 'success top');
                $.hidePreloader();
            }, 2000);
        });
       
}
else if(pageId === 'page-history'){
         $('#search-data').click(function(){
            $.showPreloader('正在加载，请稍后...')
            setTimeout(function () {
                $.hidePreloader();
                $.toast("已经全部加载！");
            }, 2000);
        });
        $("#transfer-in").click(function(event){
            var buttons1 = [
                {
                    text: '选择平台',
                    label: true
                },
                {
                    text: '主账户',
                    onClick: function() {
                        $('#transfer-type').html('主账户');
                    }
                },
                {
                    text: 'MG',
                    onClick: function() {
                        $('#transfer-type').html('MG');
                    }

                }
                ,
                {
                    text: '沙巴体育',
                    onClick: function() {
                        $('#transfer-type').html('沙巴体育');
                    }
                }
                ,
                {
                    text: 'GD真人',
                    onClick: function() {
                        $('#transfer-type').html('GD真人');
                    }
                }
                ,
                {
                    text: 'BBIN',
                    onClick: function() {
                        $('#transfer-type').html('BBIN');
                    }
                }
                ,
                {
                    text: '欧博真人',
                    onClick: function() {
                        $('#transfer-type').html('欧博真人');
                    }
                }
                ,
                {
                    text: '皇冠彩票',
                    onClick: function() {
                        $('#transfer-type').html('皇冠彩票');
                    }
                }
                ,
                {
                    text: 'PT',
                    onClick: function() {
                        $('#transfer-type').html('PT');
                    }
                }
                ,
                {
                    text: '皇冠体育',
                    onClick: function() {
                        $('#transfer-type').html('皇冠体育');
                    }
                }
                ,
                {
                    text: 'AG真人',
                    onClick: function() {
                        $('#transfer-type').html('AG真人');
                    }
                }
            ];
            var buttons2 = [
                {
                    text: '取消',
                    bg: 'danger'
                }
            ];
            var groups = [buttons1, buttons2];
            $.actions(groups);

        });
}
});