document.addEventListener("DOMContentLoaded", function () {
    // Simulated data - replace this with data from your database
    const data = [
      {
        name: "Destination 1",
        activities: [
          { name: "Sightseeing A", time: "10:00 AM" },
          { name: "Activity B", time: "02:30 PM" },
        ],
      },
      {
        name: "Destination 2",
        activities: [
          { name: "Activity C", time: "09:00 AM" },
          { name: "Sightseeing D", time: "01:00 PM" },
        ],
      },
      // Add more destinations and activities as needed
    ];
  
    // Get the Handlebars template
    const scheduleTemplate = document.getElementById("schedule-template").innerHTML;
  
    // Compile the Handlebars template
    const compiledTemplate = Handlebars.compile(scheduleTemplate);
  
    // Generate the HTML content with the data
    const generatedHTML = compiledTemplate({ destinations: data });
  
    // Insert the generated HTML into the schedule container
    const scheduleContainer = document.getElementById("schedule-container");
    scheduleContainer.innerHTML = generatedHTML;
  });
  
