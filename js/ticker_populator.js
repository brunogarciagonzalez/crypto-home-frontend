function populateTicker(){
	console.log("heyy!");
	var pusher = new Pusher('de504dc5763aeef9ff52');
	pusher.connection.bind( 'error', function( err ) {
	  if( err.error.data.code === 4004 ) {
	    log('>>> detected limit error');
	  }
	});

	var channel = pusher.subscribe('live_trades');

	//            option,   callback function
	channel.bind('trade', obj=>console.log(obj));
}