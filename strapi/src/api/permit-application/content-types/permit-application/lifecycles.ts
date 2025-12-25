module.exports = {
  beforeCreate(event) {
    event.params.data.submitted_at = new Date(); // Set submission timestamp
    event.params.data.application_status = "pending"; // Set default status, I might use strapi generated types later
  },
  beforeUpdate(event) {
    // Prevent updating submitted_at on updates
     delete event.params.data.submitted_at;
  }
};
