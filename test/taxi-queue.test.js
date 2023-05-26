describe('The taxi queue app', () => {

	it ('should allow people to join the queue', () => {

		const taxiQueue = TaxiQueue();

		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();

		assert.equal(5, taxiQueue.queueLength());

	});

	it ('should allow people to leave the queue', () => {

		const taxiQueue = TaxiQueue();

		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();
		taxiQueue.joinQueue();

		assert.equal(1, taxiQueue.queueLength());

	});

	it ('should not allow the people queue to be less than 0', () => {

		const taxiQueue = TaxiQueue();

		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();

		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();

		assert.equal(0, taxiQueue.queueLength());

	});

	it ('should allow taxis to join the queue', () => {
		
		const taxiQueue = TaxiQueue();

		taxiQueue.joinTaxiQueue();
		taxiQueue.joinTaxiQueue();
		taxiQueue.joinTaxiQueue();

		assert.equal(3, taxiQueue.taxiQueueLength());

	});

	// Unnecesary test because the taxi queue will never be negative in the implemantation
	it ('should not allow the taxi queue to be less than 0', () => {

		const taxiQueue = TaxiQueue();

		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();

		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();
		taxiQueue.leaveQueue();

		assert.equal(0, taxiQueue.queueLength());

	});


	it ('should allow taxis to leave the queue if there is enough passengers queueing', () => {

		const taxiQueue = TaxiQueue();

		taxiQueue.joinQueue(); // 1
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue(); // 12
		taxiQueue.joinQueue(); 
		taxiQueue.joinQueue();
		taxiQueue.joinQueue(); 

		taxiQueue.joinTaxiQueue();
		taxiQueue.joinTaxiQueue();
		taxiQueue.joinTaxiQueue();

		// data before a taxi departs
		assert.equal(3, taxiQueue.taxiQueueLength());
		assert.equal(15, taxiQueue.queueLength());

		taxiQueue.taxiDepart();

		// data after a taxi departed
		assert.equal(2, taxiQueue.taxiQueueLength());
		assert.equal(3, taxiQueue.queueLength());

	});

	it ('should not allow a taxi to leave the queue if there is not enough passengers queueing', () => {


		const taxiQueue = TaxiQueue();

		taxiQueue.joinQueue(); // 1
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();   
		taxiQueue.joinQueue(); // 11 

		taxiQueue.joinTaxiQueue();
		taxiQueue.joinTaxiQueue();
		taxiQueue.joinTaxiQueue();

		// data before a taxi departs
		assert.equal(3, taxiQueue.taxiQueueLength());
		assert.equal(11, taxiQueue.queueLength());

		// this function call should do nothing as there is not enough passengers in the queue
		taxiQueue.taxiDepart();

		// data after a taxi departed
		assert.equal(3, taxiQueue.taxiQueueLength());
		assert.equal(11, taxiQueue.queueLength());

	});

	it ('should check that a taxi can not leave if the taxi queue is empty', () => {

		const taxiQueue = TaxiQueue();

		taxiQueue.joinQueue(); // 1
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
		taxiQueue.joinQueue(); // 12
		taxiQueue.joinQueue(); 
		taxiQueue.joinQueue();
		taxiQueue.joinQueue(); 

		// data before a taxi departs
		assert.equal(0, taxiQueue.taxiQueueLength());
		assert.equal(15, taxiQueue.queueLength());

		// this function call should do nothing as there is no taxis in the taxi queue
		taxiQueue.taxiDepart();
		
		// data after a taxi departed
		assert.equal(0, taxiQueue.taxiQueueLength());
		assert.equal(15, taxiQueue.queueLength());

	});
});

describe('LocalStorage Tests', () => {
	beforeEach(() => {
	  // Clear localStorage before each test
	  localStorage.clear();
	});
  
	it('Queue counters are stored in localStorage', () => {
	  // Simulate actions that update the queue counters
	  taxiQueue.joinQueue();
	  taxiQueue.joinTaxiQueue();
  
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
