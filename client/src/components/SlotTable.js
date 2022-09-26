import React from "react";
import "../styles/SlotTable.css";

const SlotTable = ({ slotOne, slotTwo, slotThree }) => {
  return (
    <table className="slotTable">
      <tbody>
        <tr>
          <td>{slotOne}</td>
          <td>{slotTwo}</td>
          <td>{slotThree}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SlotTable;
