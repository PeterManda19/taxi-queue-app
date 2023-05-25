/**
 * Factory function for the TaxiQueue.
 * Manages the queue of passengers and taxis.
 * @returns {Object} Object with methods to interact with the queue.
 */
function TaxiQueue() {
	// Internal variables to track the queue and taxi queue
	let queue = [];
	let taxiQueue = [];


	/**
	 * Adds a passenger to the queue.
	 * @returns {number} The length of the passenger queue.
	 */
	function joinQueue() {
		queue.push("passenger");
		return queueLength();
	}

	/**
	 * Removes a passenger from the queue if the queue is not empty.
	 * @returns {number} The length of the passenger queue.
	 */
	function leaveQueue() {
		if (queue.length > 0) {
			queue.pop();
		}
		return queueLength();
	}

	/**
	 * Adds a taxi to the taxi queue.
	 * @returns {number} The length of the taxi queue.
	 */
	function joinTaxiQueue() {
		taxiQueue.push("taxi");
		return taxiQueueLength();
	}

	/**
	 * Returns the length of the passenger queue.
	 * @returns {number} The length of the passenger queue.
	 */
	function queueLength() {
		return queue.length;
	}

	/**
	 * Returns the length of the taxi queue.
	 * @returns {number} The length of the taxi queue.
	 */
	function taxiQueueLength() {
		return taxiQueue.length;
	}

	/**
	 * Simulates a taxi departing if there are enough passengers in the queue.
	 * Removes the taxi from the taxi queue and removes passengers from the passenger queue.
	 * @returns {number} The length of the taxi queue.
	 */
	function taxiDepart(){
		if (taxiQueue.length > 0 && queue.length >= 12) {
			taxiQueue.pop();
			queue.splice(0,12);
		} 
		return taxiQueueLength();
	}

	// Return an object with public methods
	return {
		joinQueue,
		leaveQueue,
		joinTaxiQueue,
		queueLength,
		taxiQueueLength,
		taxiDepart
	}
}
