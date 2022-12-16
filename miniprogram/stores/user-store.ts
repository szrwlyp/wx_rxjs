import { Store } from "westore";
import { User, UserOptions } from "../models/user";

class UserStore extends Store {
  options: UserOptions | undefined;
  user: User;
  constructor(options?: UserOptions) {
    super();
    this.options = options;
    this.data = {
      motto: "",
      userInfo: {},
    };

    this.user = new User({
      onUserInfoLoaded: () => {
        this.data.motto = this.user.motto;
        this.data.userInfo = this.user.userInfo;
        console.log(this.user.userInfo);
        this.update("userPage");
      },
    });
  }

  getUserProfile() {
    this.user.getUserProfile();
  }
}

const userStore = new UserStore();
export default userStore;
