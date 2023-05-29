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

// Update the passenger and taxi queue counts on the DOM
function updateQueueCountsOnDOM() {
    passengerQueueCount.textContent = taxiQueue.queueLength();
    taxiQueueCount.textContent = taxiQueue.taxiQueueLength();
}

// DOM events
joinQueueButton.addEventListener("click", () => {
    taxiQueue.joinQueue();
    // passengerQueueCount.textContent = taxiQueue.queueLength();
    updateQueueCountsOnDOM();
});
  
leaveQueueButton.addEventListener("click", () => {
    taxiQueue.leaveQueue();
    // passengerQueueCount.textContent = taxiQueue.queueLength();
    updateQueueCountsOnDOM();
});

joinTaxiQueueButton.addEventListener("click", () => {
    taxiQueue.joinTaxiQueue();
    // passengerQueueCount.textContent = taxiQueue.queueLength();
    // taxiQueueCount.textContent = taxiQueue.taxiQueueLength();
    updateQueueCountsOnDOM();
});

departButton.addEventListener("click", () => {
    taxiQueue.taxiDepart();
    // passengerQueueCount.textContent = taxiQueue.queueLength();
    // taxiQueueCount.textContent = taxiQueue.taxiQueueLength(); 
    updateQueueCountsOnDOM();
});

// Initial update of queue counts on the DOM
updateQueueCountsOnDOM();

// Invoke initializeQueueCountersFromLocalStorage on page load
window.addEventListener('load', taxiQueue.initializeQueueCountersFromLocalStorage());
