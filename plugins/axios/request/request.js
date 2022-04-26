export default {
  userRequest(ctx, userOpera) {
    localStorage.setItem("request",
      localStorage.getItem("request") !== null? 
        localStorage.getItem("request") : 
        JSON.stringify([])
    )

    const current = new Date();
    const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
    const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
    const dateTime = date +' '+ time;

    const userAgent = ctx.req
    ? ctx.req.headers["user-agent"]
    : navigator.userAgent;
    const customIsTabet =
    ctx.isTablet || (userAgent && userAgent.includes("iPad"));
    console.log(customIsTabet)
    const userRequest = JSON.parse(localStorage.getItem("request"))
    const requestObj = { datetime: dateTime, operation: userOpera, user_agent: userAgent }
    userRequest.push(requestObj)
    localStorage.setItem("request", JSON.stringify(userRequest))
  }
}