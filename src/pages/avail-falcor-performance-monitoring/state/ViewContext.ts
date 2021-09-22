//  Based on example found here:
//    https://reactjs.org/docs/context.html#updating-context-from-a-nested-component

import { createContext } from "react";

import { ApiRequestTimeFrame } from "../../../api/getters";

export default createContext(ApiRequestTimeFrame.ALL_TIME);
