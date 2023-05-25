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

// DOM events
joinQueueButton.addEventListener("click", () => {
    taxiQueue.joinQueue();
    passengerQueueCount.textContent = taxiQueue.queueLength();
});
  
leaveQueueButton.addEventListener("click", () => {
    taxiQueue.leaveQueue();
    passengerQueueCount.textContent = taxiQueue.queueLength();
});

joinTaxiQueueButton.addEventListener("click", () => {
    taxiQueue.joinTaxiQueue();
    passengerQueueCount.textContent = taxiQueue.queueLength();
    taxiQueueCount.textContent = taxiQueue.taxiQueueLength();
});

departButton.addEventListener("click", () => {
    taxiQueue.taxiDepart();
    passengerQueueCount.textContent = taxiQueue.queueLength();
    taxiQueueCount.textContent = taxiQueue.taxiQueueLength(); 
});
