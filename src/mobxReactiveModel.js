import { observable, configure } from "mobx";
import { reaction } from "mobx";
import {model} from "/src/studyModel.js";
import { connectToPersistence } from "./firestoreModel.js";
import {connectToAuthentication} from "./authModel.js";


configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab

export const reactiveModel= observable(model);

// for debugging in console
// DELETE IN FINAL VERSION!!!!!!!!!!!!!!!!!!!!!!!!!!!!
window.myModel = reactiveModel;
import { taskConstants } from "/src/taskConstants.js";
window.taskConstants = taskConstants;

connectToPersistence(reactiveModel,reaction);
connectToAuthentication(reactiveModel);


