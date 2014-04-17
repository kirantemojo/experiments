(function($){
				$.fn.jkefexMultiSortSel = function(options){
					var settings = {
						data: [],
						empty:true,
						selElem:''
					};
					if(options)
					{
						$.extend(true,settings,options);
					}
					$('select[id^='+(settings.selElem)+']').each(function(){
						var $this = $(this);
						$this.html('');
						$.map((settings.data),function(val,index){
						  $this.append('<option val='+val+'>'+val+'</option>');
						});
					});
					var previous;
					$('select[id^='+(settings.selElem)+']').focus(function(){ 
						previous = $(this).val();
					}).change(function(){
						var delta;
						var $this = $(this);
						var inx = this.selectedIndex;
						$('select[id^='+(settings.selElem)+']').not(this).each(function(){
								var $this_t = $(this);
								$.map($(this).children(),function(val,index){
									if(($(val).text() == $this.val()) && ($(val).text() != ''))
									{
										$(val).remove();
										delta = true;
									}
									if($(val).text() != previous)
									{	
										delta = false;
									}
								});
								if(!delta && (previous != ''))
								{
									delta = true;
									if(inx > 0)
									{
										if($(this).children()[inx])
										{
										  $($(this).children()[inx]).before('<option val='+previous+'>'+previous+'</option>');
										}
										else{
										  $($(this).children()[inx-1]).before('<option val='+previous+'>'+previous+'</option>');
										}
									}
									else{
										if($(this).children()[inx])
										{
										  $($(this).children()[inx]).after('<option val='+previous+'>'+previous+'</option>');
										}
									}
								}
							$('select[id^='+(settings.selElem)+']').blur();
						});		
					});
				};
		})(jQuery);