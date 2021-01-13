import { get } from "./gateway";
import { APIs } from "./apiConstants";

const serviceMethods = {
  getTimeStamps: () => {
    return get(APIs.GET_TIME_STAMPS);
  },
};

export default serviceMethods;
