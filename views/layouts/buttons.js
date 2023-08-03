document.addEventListener("DOMContentLoaded", function () {
    const activityTemplate = document.getElementById("activity-template").innerHTML;
    const addActivityButton = document.getElementById("add-activity-button");
  
    // Sample activities (replace this with actual data from your database)
    const activities = [
      { id: 1, time: "10:00 am", name: "Activity 1" },
      { id: 2, time: "1:30 pm", name: "Activity 2" },
      // Add more activities as needed
    ];
  
    function renderActivities() {
      const scheduleContainer = document.getElementById("schedule-container");
      const context = { activities };
  
      // Compile the Handlebars template
      const template = Handlebars.compile(activityTemplate);
  
      // Clear the schedule before rendering activities
      scheduleContainer.innerHTML = '';
  
      // Generate HTML for each activity and add them to the schedule
      activities.forEach((activity) => {
        const activityHTML = template(activity);
        const activityElement = document.createElement("li");
        activityElement.innerHTML = activityHTML;
        scheduleContainer.appendChild(activityElement);
  
        // Attach event listeners to the move and delete buttons
        const moveButton = activityElement.querySelector(".btn-move");
        const deleteButton = activityElement.querySelector(".btn-delete");
  
        moveButton.addEventListener("click", function () {
          // Implement your code to move the activity to a different time here
          console.log(`Move activity with ID ${activity.id} to a different time`);
        });
  
        deleteButton.addEventListener("click", function () {
          // Implement your code to delete the activity from the schedule here
          console.log(`Delete activity with ID ${activity.id} from the schedule`);
          activityElement.remove();
        });
      });
    }
  
    // Initial rendering of activities
    renderActivities();
  
    addActivityButton.addEventListener("click", function () {
      // Simulate adding a new activity to the activities array (replace this with actual database update)
      const newActivity = { id: activities.length + 1, time: "2:00 pm", name: "New Activity" };
      activities.push(newActivity);
      // Re-render activities after adding a new one
      renderActivities();
    });
  });
  