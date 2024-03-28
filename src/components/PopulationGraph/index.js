// import React, { Component } from 'react';
// import axios from 'axios';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import "./index.css"

// class PopulationGraph extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       populationData: [],
//       loading: true,
//       error: null
//     };
//   }

//   componentDidMount() {
//     axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
//       .then(response => {
//         this.setState({ populationData: response.data.data, loading: false });
//       })
//       .catch(error => {
//         this.setState({ error: error.message, loading: false });
//       });
//   }

//   render() {
//     const { populationData, loading, error } = this.state;

//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     if (error) {
//       return <div>Error: {error}</div>;
//     }

//     // Calculate the minimum and maximum population values
//     const minPopulation = Math.min(...populationData.map(entry => entry.Population));
//     const maxPopulation = Math.max(...populationData.map(entry => entry.Population));

//     // Calculate a margin value (e.g., 5%) above and below the min and max values respectively
//     const margin = Math.max((maxPopulation - minPopulation) * 0.05, 1000000); // Adjust 0.05 to the desired margin percentage

//     // Set the domain for the y-axis with a margin
//     const yAxisDomain = [minPopulation - margin, maxPopulation + margin];

//     return (
//       <div className='population-container'>
//         <h2>Population Data by Year</h2>
//         <LineChart width={800} height={400} data={populationData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="Year" />
//           <YAxis domain={yAxisDomain} tickFormatter={(value) => value.toLocaleString()} />
//           <Tooltip formatter={(value) => value.toLocaleString()} />
//           <Legend />
//           <Line type="monotone" dataKey="Population" stroke="#8884d8" activeDot={{ r: 8 }} />
//         </LineChart>
//       </div>
//     );
//   }
// }

// export default PopulationGraph;
import React, { Component } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './index.css'; // Import CSS file for styling

class PopulationGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populationData: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
      .then(response => {
        this.setState({ populationData: response.data.data, loading: false });
      })
      .catch(error => {
        this.setState({ error: error.message, loading: false });
      });
  }

  render() {
    const { populationData, loading, error } = this.state;

    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    const minPopulation = Math.min(...populationData.map(entry => entry.Population));
    const maxPopulation = Math.max(...populationData.map(entry => entry.Population));
    const padding = (maxPopulation - minPopulation) * 0.1;

    return (
      <div className="population-container">
        <h2>Population Data by Year</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={populationData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Year" />
            <YAxis domain={[minPopulation - padding, maxPopulation + padding]} tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Line type="monotone" dataKey="Population" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default PopulationGraph;
