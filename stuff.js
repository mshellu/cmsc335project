
async function postJSON(data) {
    try {
      const response = await fetch("https://rhodesapi.up.railway.app/api/operator/Texas");
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  const data = { username: "example" };
  postJSON(data);