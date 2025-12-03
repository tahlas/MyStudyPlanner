//import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { observable, configure } from "mobx";
import { reaction } from "mobx";
import {model} from "/src/studyModel.js";
configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab

export const reactiveModel= observable(model);//"make a reactive object out of the model exported from DinnerModel";s