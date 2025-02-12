const initialState = [
    { id: 1, name: 'Connection 1' },
    { id: 2, name: 'Connection 2' },
  ];
  
  const connectionReducer = (state = initialState, action) => {
    switch (action.type) {
      // Ajoutez des cas pour gérer les actions
      default:
        return state;
    }
  };
  
  export default connectionReducer;
  