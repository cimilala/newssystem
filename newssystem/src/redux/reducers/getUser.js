const initpreState =JSON.parse(localStorage.getItem("token"))
export function userReducer(preState=initpreState,action) {
       const {type,data} = action
       switch (type) {
              case "saveUser":
              return data
              default:
              return preState
}
}