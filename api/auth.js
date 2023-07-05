// api/auth.js
export const loginUser = async (credentials) => {
    try {
      // Make API request to login endpoint and retrieve authentication token
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
  
      return data; // Return the response data (authentication token)
    } catch (error) {
      throw new Error('Failed to login');
    }
  };
  