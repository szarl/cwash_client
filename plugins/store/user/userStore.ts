import { Action, Module, Mutation, VuexModule, getModule } from "vuex-module-decorators"
import { store } from "../storeHelper"
import { User } from "~/model/user/User";
import { userService } from "~/mod/user/userService";
import { LoginEmailRequest } from "~/model/user/LoginEmailRequest";


@Module({ dynamic: true, name: 'UserStore', store: store.storeInstance, namespaced: true })
export class UserStore extends VuexModule {
  user: User | null = null;

  @Mutation
  setUser(user: User) {
    this.user = user;
  }

  @Action
  private setUserAndPush(user: User) {
    this.setUser(user);
    const router = useRouter();
    router.push('/dashboard');
  }

  @Action
  async registerUser(user: User) {
    const registerdUser = await userService.registerUser(user);
    if (registerdUser) {
      this.setUserAndPush(registerdUser);
    }
  }

  @Action
  async loginEmail(userLoginReq: LoginEmailRequest) {
    const user = await userService.login(userLoginReq);
    if (user) {
      this.setUserAndPush(user);
    }
  }
}

export const userStore = getModule(UserStore, store.storeInstance);
