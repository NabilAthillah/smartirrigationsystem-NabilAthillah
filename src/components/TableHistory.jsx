const TableHistory = ({datas}) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Moisture</th>
            <th>TimeStamp</th>
          </tr>
        </thead>
        <tbody>
          {datas.slice(-13).map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.temperature}&deg;C</td>
              <td>{data.humidity}%</td>
              <td>{data.moist}%</td>
              <td>{data.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableHistory;
