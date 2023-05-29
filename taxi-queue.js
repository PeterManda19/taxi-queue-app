/**
 * Factory function for the TaxiQueue.
 * Manages the queue of passengers and taxis.
 * @returns {Object} Object with methods to interact with the queue.
 */
function TaxiQueue() {
	// Check if localStorage is supported
	const localStorageSupported = typeof Storage !== 'undefined';
	
	// Internal variables to track the queue and taxi queue
	let queue = [];
	let taxiQueue = [];

	 /**
	 * Retrieve queue counters from localStorage on initialization.
	 * Populates the internal variables 'queue' and 'taxiQueue' with the stored values from localStorage if available.
	 * @returns {Array} The retrieved values for 'taxiQueue' and 'queue' in the format [taxiQueue, queue].
	 */
	function initializeQueueCountersFromLocalStorage() {
		if (localStorageSupported) {
			const storedQueue = localStorage.getItem('queue');
			const storedTaxiQueue = localStorage.getItem('taxiQueue');
		
			if (storedTaxiQueue) {
				taxiQueue = JSON.parse(storedTaxiQueue);
			}

			if (storedQueue) {
				queue = JSON.parse(storedQueue);
			}
			
			return taxiQueue, queue;
		}
	}

	/**
	 * Update queue counters in localStorage.
	 * Stores the current values of 'queue' and 'taxiQueue' in localStorage.
	 */
	function updateQueueCountersInLocalStorage() {
		if (localStorageSupported) {
			localStorage.setItem('queue', JSON.stringify(queue));
			localStorage.setItem('taxiQueue', JSON.stringify(taxiQueue));
		}
	}

	/**
	 * Adds a passenger to the queue.
	 * @returns {number} The length of the passenger queue.
	 */
	function joinQueue() {
		queue.push("passenger");
		updateQueueCountersInLocalStorage();
		return queueLength();
	}

	/**
	 * Removes a passenger from the queue if the queue is not empty.
	 * @returns {number} The length of the passenger queue.
	 */
	function leaveQueue() {
		if (queue.length > 0) {
			queue.pop();
			updateQueueCountersInLocalStorage();
		}
		return queueLength();
	}

	/**
	 * Adds a taxi to the taxi queue.
	 * @returns {number} The length of the taxi queue.
	 */
	function joinTaxiQueue() {
		taxiQueue.push("taxi");
		updateQueueCountersInLocalStorage();
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
			updateQueueCountersInLocalStorage();
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
		taxiDepart,
		initializeQueueCountersFromLocalStorage,
		updateQueueCountersInLocalStorage
	}
}
