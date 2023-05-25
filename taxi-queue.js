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
		taxiQueue.push("taxi");
	}

	function queueLength() {
		return queue.length;
	}

	function taxiQueueLength() {
		return taxiQueue.length;
	}

	function taxiDepart(){
		if (taxiQueue.length > 0 && queue.length >= 12) {
			taxiQueue.pop();
			queue.splice(0,12);
		} return taxiQueueLength();
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