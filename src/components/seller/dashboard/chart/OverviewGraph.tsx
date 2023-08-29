import './graph.css'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 100, pv: 2400, amt: 2400},
{name: 'Page B', uv: 200, pv: 2400, amt: 2400},
{name: 'Page C', uv: 200, pv: 2400, amt: 2400},
{name: 'Page D', uv: 300, pv: 2400, amt: 2400},{name: 'Page E', uv: 400, pv: 2400, amt: 2400}];

const OverviewGraph = () => {
  return (
    <div className='chart'>
    <LineChart width={600} height={300} data={data} >
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
  </div>
  )
}

export default OverviewGraph