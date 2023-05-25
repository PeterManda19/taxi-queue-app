function TaxiQueue() {
	let queue = [];
	let taxiQueue = [];

	function joinQueue() {
		queue.push("passenger");
	}

	function leaveQueue() {
		if (queue.length > 0) {
			queue.pop();
		}
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