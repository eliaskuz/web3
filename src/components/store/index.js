import { SnackModel } from '../snack-bar/model'
import { AppModel, TokenModel } from '../main/model'

const stores = {
  appModel: new AppModel(),
  tokenModel: new TokenModel(),
  snackModel: new SnackModel(),

}

export default stores