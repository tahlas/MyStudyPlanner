import { observable, configure } from "mobx";
import { reaction } from "mobx";
import {model} from "/src/studyModel.js";
import { connectToPersistence } from "./firebaseModel.js";




configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab

export const reactiveModel= observable(model);

// for debugging in console
// DELETE IN FINAL VERSION!!!!!!!!!!!!!!!!!!!!!!!!!!!!
window.myModel = reactiveModel;
import { taskConstants } from "/src/taskConstants.js";
import { reactToLogin } from "./reactjs/authenticationRouting.js";
window.taskConstants = taskConstants;

connectToPersistence(reactiveModel,reaction);
reactToLogin(reactiveModel);

function taskErrorChangeACB() {
    return reactiveModel.currentTasksPromiseState.error;
}

function taskErrorSideEffectACB(){reactiveModel.taskPromiseStateErrorSideEffect()}



reaction(taskErrorChangeACB, taskErrorSideEffectACB);