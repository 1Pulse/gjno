async function fetchData() {
    try {
      const response = await fetch('/api/getData');
      const data = await response.json();
      // Populate the map or widgets with this data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  fetchData();
  