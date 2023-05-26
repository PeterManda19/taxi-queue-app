// write your DOM code here.
// DOM element references
const passengerQueueCount = document.querySelector(".passenger_queue_count");
const taxiQueueCount = document.querySelector(".taxi_queue_count");
const joinQueueButton = document.querySelector(".join_queue");
const leaveQueueButton = document.querySelector(".leave_queue");
const joinTaxiQueueButton = document.querySelector(".join_taxi_queue");
const departButton = document.querySelector(".depart");

// create Factory Function instance

const taxiQueue = TaxiQueue();

// Initialize queue counters from localStorage
function initializeQueueCountersFromLocalStorage() {
    const storedPassengerQueueCount = localStorage.getItem('passengerQueueCount');
    const storedTaxiQueueCount = localStorage.getItem('taxiQueueCount');
  
    if (storedPassengerQueueCount !== null) {
      passengerQueueCount.textContent = storedPassengerQueueCount;
    }
  
    if (storedTaxiQueueCount !== null) {
      taxiQueueCount.textContent = storedTaxiQueueCount;
    }
}

// Update queue counters in localStorage
function updateQueueCountersInLocalStorage() {
    localStorage.setItem('passengerQueueCount', passengerQueueCount.textContent);
    localStorage.setItem('taxiQueueCount', taxiQueueCount.textContent);
}

// DOM events
joinQueueButton.addEventListener("click", () => {
    taxiQueue.joinQueue();
    passengerQueueCount.textContent = taxiQueue.queueLength();
    updateQueueCountersInLocalStorage();
});
  
leaveQueueButton.addEventListener("click", () => {
    taxiQueue.leaveQueue();
    passengerQueueCount.textContent = taxiQueue.queueLength();
    updateQueueCountersInLocalStorage();
});

joinTaxiQueueButton.addEventListener("click", () => {
    taxiQueue.joinTaxiQueue();
    passengerQueueCount.textContent = taxiQueue.queueLength();
    taxiQueueCount.textContent = taxiQueue.taxiQueueLength();
    updateQueueCountersInLocalStorage();
});

departButton.addEventListener("click", () => {
    taxiQueue.taxiDepart();
    passengerQueueCount.textContent = taxiQueue.queueLength();
    taxiQueueCount.textContent = taxiQueue.taxiQueueLength(); 
    updateQueueCountersInLocalStorage();
});

