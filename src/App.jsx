import "./App.css";
import BasicTable from "./components/BasicTable";
import GlobalFilter from "./components/GlobalFilter";
import SortingTable from "./components/SortingTable";
import PaginationTable from "./components/PaginationTable";
import RowSelection from "./components/RowSelection";
import { FilteringTable } from "./components/FilteringTable";

function App() {
  return (
    <div>
      <PaginationTable />
    </div>
  );
}

export default App;
