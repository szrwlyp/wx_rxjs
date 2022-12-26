// app.ts

import { User } from "./models/demo/user";
const user = new User();
App<IAppOption>({
  globalData: {},
  onLaunch() {
    // console.log(user);
    // user.wxLogin().subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    // });
  },
});
