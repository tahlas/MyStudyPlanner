import { observer } from "mobx-react-lite";
import { TestView } from "../views/Testview";
const ReactRoot = observer(
    function ReactRoot(props) {
        return (
                <div>hello</div>
            );
    }
)

export { ReactRoot }
