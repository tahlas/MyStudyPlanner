import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";

const Overview = observer(function OverviewRender() {
    return <OverviewView />;
});

export { Overview };
