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
		const taxiQueue = TaxiQueue();
	
		// Simulate actions that update the queue counters
		taxiQueue.joinQueue();
		taxiQueue.joinTaxiQueue();
	
		// Check if the values are correctly stored in localStorage
		assert.strictEqual(localStorage.getItem('queue'), JSON.stringify(['passenger']));
		assert.strictEqual(localStorage.getItem('taxiQueue'), JSON.stringify(['taxi']));
	});
  
	it('Factory Function constructor initializes passenger queue counters from localStorage', () => {
		// Simulate stored passenger queue counters in localStorage
		localStorage.setItem('queue', JSON.stringify(['passenger', 'passenger', 'passenger']));
		
		const testQueue = TaxiQueue();

		testQueue.initializeQueueCountersFromLocalStorage();

		// Check the initialized values of the passanger queue counters
		assert.strictEqual(testQueue.queueLength(), 3);
	});

	it('Factory Function constructor initializes taxi queue counters from localStorage', () => {
		// Simulate stored taxi queue counters in localStorage
		localStorage.setItem('taxiQueue', JSON.stringify(['taxi', 'taxi']));
		
		const testTaxiQueue = TaxiQueue();
  
		testTaxiQueue.initializeQueueCountersFromLocalStorage();
  
		// Check the initialized values of the taxi queue counters
		assert.strictEqual(testTaxiQueue.taxiQueueLength(), 2);
	  });
  
	it('Updating queue counters updates localStorage', () => {
		const taxiQueue = TaxiQueue();
	
		// Simulate actions that update the queue counters
		taxiQueue.joinQueue();
		taxiQueue.joinQueue();
	
		// Check if the updated values are correctly stored in localStorage
		assert.strictEqual(localStorage.getItem('queue'), JSON.stringify(['passenger', 'passenger']));
		assert.strictEqual(localStorage.getItem('taxiQueue'), JSON.stringify([]));
	});
  
	it('Removing passenger from the queue updates localStorage', () => {
		// Simulate stored queue counters in localStorage
		localStorage.setItem('queue', JSON.stringify(['passenger', 'passenger', 'passenger']));
	
		const taxiQueue = TaxiQueue();

		taxiQueue.initializeQueueCountersFromLocalStorage();
	
		// Simulate removing a passenger from the queue
		taxiQueue.leaveQueue();
	
		// Check if the updated values are correctly stored in localStorage
		assert.strictEqual(localStorage.getItem('queue'), JSON.stringify(['passenger', 'passenger']));
		assert.strictEqual(localStorage.getItem('taxiQueue'), JSON.stringify([]));
	});
  
	it('Simulating taxi departure updates queue counters in localStorage', () => {
		// Simulate stored queue counters in localStorage
		localStorage.setItem('queue', JSON.stringify(['passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger', 'passenger']));
		localStorage.setItem('taxiQueue', JSON.stringify(['taxi']));
	
		const taxiQueue = TaxiQueue();

		taxiQueue.initializeQueueCountersFromLocalStorage();
	
		// Simulate a taxi departure
		taxiQueue.taxiDepart();
	
		// Check if the updated values are correctly stored in localStorage
		assert.strictEqual(localStorage.getItem('queue'), JSON.stringify(['passenger', 'passenger', 'passenger', 'passenger']));
		assert.strictEqual(localStorage.getItem('taxiQueue'), JSON.stringify([]));
	});
  });
  