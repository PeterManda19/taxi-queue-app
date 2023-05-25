function TaxiQueue() {
	let queue = [];
	let taxiQueue = [];

	function joinQueue() {
		queue.push("passenger");
	}

	function leaveQueue() {

	}

	function joinTaxiQueue() {

	}

	function queueLength() {
		return queue.length;

	}

	function taxiQueueLength() {

	}

	function taxiDepart(){

	}

	return {
		joinQueue,
		leaveQueue,
		joinTaxiQueue,
		queueLength,
		taxiQueueLength,
		taxiDepart
	}
}