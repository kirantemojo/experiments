'use strict';

//Command Console

function command()
{
	if(arguments.length > 0)
	{
		switch(arguments[0])
		{
			case 'login' : 
					login('mkdir');
				break;
			case 'logout' : 
					logout('cd');
				break;
			default : 
					alert('Terminal Unable to find the Command');

		}
	}
}

function login()
{
	window.location = "http://kiranml1.github.io/demos/yoangular/app/#/dashboard";
}

function logout()
{
	window.location = "http://kiranml1.github.io/demos/yoangular/app/#/";
}

$(function(){
	$('#console input:text').val('Command line .............');
	$('#console input:text').focusin(function(){
		$('#console input:text').val(' ');
	});
	$('#console input:text').focusout(function(){
		$('#console input:text').val('Command line .............');
	});
	$('#console input:text').keyup(function(e){
		if(e.which === 13)
		{
			var args = $(this).val().split(' ');
			if(args[0] === '') 
				args.shift();
			command.apply(this,args);
		}
	});
});
