// API Base URL (프록시 사용 시 빈 문자열, 프로덕션에서는 실제 URL 설정)
const API_BASE_URL = process.env.REACT_APP_API_URL || "";

// HTTP 요청 유틸리티 함수
const request = async (endpoint, options = {}) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    // 토큰이 있으면 Authorization 헤더 추가
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.data?.message || errorData.message || `API request failed: ${response.status} ${response.statusText}`
      );
    }

    // 204 No Content 처리
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

const getRequest = (endpoint) => request(endpoint, { method: "GET" });

const postRequest = (endpoint, body) =>
  request(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });

// Profile API
export const profileApi = {
  getProfile: (nickname) => getRequest(`/profile/info/${nickname}`),
  createProfile: (profileData) => postRequest(`/profile/create`, profileData),
  updateProfile: (profileData) => postRequest(`/profile/edit`, profileData),
  deleteProfile: () => postRequest(`/profile/remove`),
};

// Awards API
export const awardsApi = {
  getAwards: (nickname) => getRequest(`/award/${nickname}/info`),
  createAward: (awardData) => postRequest(`/award/create`, awardData),
  updateAward: (awardData) => postRequest(`/award/edit`, awardData),
  deleteAward: (awardId) => postRequest(`/award/${awardId}/remove`),
};

// Projects API
export const projectsApi = {
  getProjects: (nickname) => getRequest(`/project/${nickname}/all`),
  createProject: (projectData) => postRequest(`/project/create`, projectData),
  updateProject: (projectId, projectData) => postRequest(`/project/${projectId}/modify`, projectData),
  deleteProject: (projectId) => postRequest(`/project/${projectId}/remove`),
};

// Skills API
export const skillsApi = {
  getSkills: (nickname) => getRequest(`/skill/${nickname}/info`),
  createSkill: (skillData) => postRequest(`/skill/create`, skillData),
  updateSkill: (skillData) => postRequest(`/skill/edit`, skillData),
  deleteSkill: (skillId) => postRequest(`/skill/remove/${skillId}`),
};

// Auth API
export const authApi = {
  login: (credentials) => postRequest(`/auth/login`, credentials),
  refresh: (refreshToken) =>
    request(`/auth/refresh`, {
      method: "GET",
      headers: {
        "Refresh-Token": refreshToken,
      },
    }),
};

// User API
export const userApi = {
  register: (userData) => postRequest(`/register`, userData),
};
