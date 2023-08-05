$(document).ready(function () {
    const calendar = dayjs().format('MMMM D, YYYY');
    $("#calendar").text(calendar); // Display current date from dayjs
  
    $(".saveBtn").on("click", function () {
      const text = $(this).siblings(".description").val();
      const time = $(this).parent().find(".hour").text();
  
      // Check if the selected date is in the future
      const selectedDate = dayjs(calendar, 'MMMM D, YYYY');
      const currentDate = dayjs().startOf('day');
      if (selectedDate.isAfter(currentDate, 'day')) {
        localStorage.setItem(time, text);
        alert("Activity saved successfully!");
      } else {
        alert("You can only add activities for future dates!");
      }
    });
  
    // Load itinerary for the selected date from local storage
    function loadItinerary() {
      $(".time-block .description").each(function () {
        const time = $(this).parent().find(".hour").text();
        const activity = localStorage.getItem(time);
        $(this).val(activity);
      });
    }
    loadItinerary();
  });
  
  