/** Converts the classes to APIs for use here and externally. */

import Users from "./users";
import Game from "./games";
import { getParamNames, getFuncsOfClass } from "./utils";

function classToAPI(clss) {
  return getFuncsOfClass(clss).reduce((acc, funcName) => {
    return {
      ...acc,
      [funcName]: getParamNames(clss[funcName])[2] || [],
    };
  }, {});
}

const spec = {
  users: classToAPI(Users),
  game: classToAPI(Game),
};

const classes = {
  users: Users,
  game: Game,
};

export { spec, classes };
