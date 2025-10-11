

// actions.js

export const setVerificationSuccess = (success) => ({
  type: 'SET_VERIFICATION_SUCCESS',
  payload: success,
});

export const verificationfalse = () => ({
  type: 'VERIFICATION_FALSE',
});

export const setUserId = (userId) => ({ // Define setUserId action
  type: 'SET_USER_ID',
  payload: userId,
});


// actions.js

export const loginSuccess = (emailId, token) => ({
  type: 'LOGIN_SUCCESS',
  payload: { emailId, token },
});


export const logout = () => ({
  type: 'LOGOUT',
});

export const setIsLoggedIn = (isLoggedIn) => ({ // Define setIsLoggedIn action
  type: 'SET_IS_LOGGED_IN',
  payload: isLoggedIn,
});



/*

// actions.js

export const loginSuccess = (emailId, token) => ({
  type: 'LOGIN_SUCCESS',
  payload: { emailId, token },
});

export const logout = () => ({
  type: 'LOGOUT',
});

/*


//actions.js
export const loginSuccess = (emailId) => ({
    type: 'LOGIN_SUCCESS',
    payload: emailId,
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  /*
  */