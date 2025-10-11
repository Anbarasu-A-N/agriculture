
const initialState = {
  isLoggedIn: false,
  emailId: null,
  token: null,
  userId: null, // Initialize userId to null
  verificationSuccess: false, // New state to handle reCAPTCHA verification
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const { emailId, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        emailId,
        token,
      };
    case 'SET_USER_ID':
      return {
        ...state,
        userId: action.payload, // Set userId
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        emailId: null,
        token: null,
        userId: null, // Reset userId to null
        verificationSuccess: false,
      };
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case 'SET_VERIFICATION_SUCCESS': // Handle reCAPTCHA verification success
      return {
        ...state,
        verificationSuccess: action.payload,
      };
    case 'VERIFICATION_FALSE':
      return {
        ...state,
        verificationSuccess: false,
      };
    default:
      return state;
  }
};

export default reducer;



/*

// reducer.js

const initialState = {
  isLoggedIn: false,
  emailId: null,
  token: null,
  verificationSuccess: false, // New state to handle reCAPTCHA verification
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const { emailId, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        emailId,
        token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        emailId: null,
        token: null,
        verificationSuccess: false,
      };
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case 'SET_VERIFICATION_SUCCESS': // Handle reCAPTCHA verification success
      return {
        ...state,
        verificationSuccess: action.payload,
      };
      case 'VERIFICATION_FALSE':
        return {
          ...state,
          verificationSuccess: false,
        };
    default:
      return state;
  }
};

export default reducer;

/*

// reducer.js

const initialState = {
  isLoggedIn: false,
  emailId: null,
  token: null, // New state to store token
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const { emailId, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        emailId,
        token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        emailId: null,
        token: null,
      };
    case 'SET_IS_LOGGED_IN': // Handle setIsLoggedIn action
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;





/*


// reducer.js

const initialState = {
  isLoggedIn: false,
  emailId: null,
  token: null, // New state to store token
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const { emailId, token } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        emailId,
        token,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        emailId: null,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;




/*
//reducer
const initialState = {
    isLoggedIn: false,
    emailId: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          emailId: action.payload,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          emailId: null,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  

  /*
  */