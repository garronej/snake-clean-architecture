

import { createReactApi } from "redux-clean-architecture/react";
import { bootstrapCore } from "core/bootstrap";

export const { createCoreProvider, useCore, useCoreState } = createReactApi({
    bootstrapCore
});