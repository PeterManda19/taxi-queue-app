describe('LocalStorage Tests', () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
	});
  
	it('Queue counters are stored in localStorage', () => {
	  	const taxiQueue = TaxiQueue();

		// Simulate actions that update the queue counters
		taxiQueue.joinQueue();
		taxiQueue.joinTaxiQueue();
	
        initializeQueueCountersFromLocalStorage();
        
		// Update queue counters in localStorage
		updateQueueCountersInLocalStorage();
	
		// Check if the values are correctly stored in localStorage
		assert.strictEqual(localStorage.getItem('passengerQueueCount'), '1');
		assert.strictEqual(localStorage.getItem('taxiQueueCount'), '1');
	});
  
	it('Factory Function constructor initializes queue counters', () => {
		const testTaxiQueue = TaxiQueue();
	
		// Check the initial values of the queue counters
		assert.strictEqual(testTaxiQueue.queueLength(), 0);
		assert.strictEqual(testTaxiQueue.taxiQueueLength(), 0);
	});  
});
