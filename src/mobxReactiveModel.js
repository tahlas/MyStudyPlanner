import { configure, observable, reaction } from "mobx";
import { model } from "/src/studyModel.js";
import { connectToPersistence } from "./firestoreModel.js";
import { connectToAuthentication } from "./authModel.js";


configure({ enforceActions: "always" });

export const reactiveModel = observable(model);

// window.myModel = reactiveModel;


connectToPersistence(reactiveModel, reaction);
connectToAuthentication(reactiveModel);


