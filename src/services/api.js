const apiRequest = async (endpoint) => {
  try {
    const response = await fetch(`${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

export const profileApi = {
  getProfile: (nickname) => apiRequest(`/profile/${nickname}/info`),
};

export const awardsApi = {
  getAwards: (nickname) => apiRequest(`/award/${nickname}/info`),
};

export const projectsApi = {
  getProjects: (nickname) => apiRequest(`/project/${nickname}/all`),
};

export const skillsApi = {
  getSkills: (nickname) => apiRequest(`/skill/${nickname}/info`),
};