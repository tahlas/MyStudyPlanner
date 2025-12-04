export const model = {

    userInfo : {
    },

    setUserInfo(user){
        this.userInfo.user_id = user.user_id;
        this.userInfo.email = user.email;
        this.userInfo.name = user.name;
        this.photoURL= user.photoURL;
        this.token = user.token;
    }
}