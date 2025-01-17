import {create} from zustand

export const AuthStore = create ((set) => ({
    authUser:null,
    isSigningUp:false,
    isSiginingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
  
    checkAuth : () =>{

    }

}));