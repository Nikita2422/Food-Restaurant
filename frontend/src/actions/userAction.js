import axios from "axios"
import { LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_SUCCESS, REGITER_USER_REQUEST } from "../constants/userConstant"
import { CLEAR_ERROR } from "../constants/restaurantConstant";

//Login
export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                "Content-Type" : "application/json",
            },
        };
        const {data} = await axios.post(`/api/v1/users/login`, {email, password }, config );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.data.user,
        });
    } catch(error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: "Login Failed",
        });
    }
};

//Register 
export const register = (userData) => async (dispatch) => {
    try{
        dispatch({ type: REGITER_USER_REQUEST });
        const config = {
            headers : {"Content-Type": "multipart/form-data"},
        };
        const {data} = await axios.post(`/api/v1/users/signup`, userData, config);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.data.user,
        });

        return data.data.user; // useful if the calling function need this data
    }catch(error){
       dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
       });
    }
};

//Load user Action

export const loaduser = () => async (dispatch) => {
    try{
        dispatch({type: LOAD_USER_REQUEST});
        const { data } = await axios.get(`/api/v1/users/me`)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    }catch(error){
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

//Logout action

export const logout = () => async (dispatch) => {
    try{
        await axios.get(`api/v1/users/logout`);
        dispatch({
            type: LOGOUT_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        });
    }
};

//clear Errors
export const clearErrors = () => async (dispatch) =>{
    dispatch({
        type: CLEAR_ERROR,
    });
};