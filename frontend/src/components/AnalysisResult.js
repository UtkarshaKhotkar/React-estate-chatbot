import React from 'react';
import { Tabs, Tab, Table, Button } from 'react-bootstrap';
import PriceChart from './PriceChart';
import './AnalysisResult.css';

function AnalysisResult({ data }) {
  const { summary, chart_data, table_data } = data;

  const downloadCSV = () => {
    if (!table_data || table_data.length === 0) return;

    const headers = Object.keys(table_data[0]);
    const csvContent = [
      headers.join(','),
      ...table_data.map(row => headers.map(h => row[h]).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'real_estate_data.csv';
    a.click();
  };

  return (
    <div className="analysis-result">
      <div className="summary-section mb-3">
        <h6 className="text-primary mb-2">📊 Summary</h6>
        <div className="summary-text">
          {summary.split('\n').map((line, idx) => (
            <p key={idx} className="mb-1">{line}</p>
          ))}
        </div>
      </div>

      {(chart_data?.length > 0 || table_data?.length > 0) && (
        <Tabs defaultActiveKey="chart" className="mb-3">
          {chart_data?.length > 0 && (
            <Tab eventKey="chart" title="📈 Chart">
              <PriceChart data={chart_data} />
            </Tab>
          )}
          
          {table_data?.length > 0 && (
            <Tab eventKey="table" title="📋 Data Table">
              <div className="table-container">
                <div className="d-flex justify-content-end mb-2">
                  <Button size="sm" variant="outline-primary" onClick={downloadCSV}>
                    ⬇️ Download CSV
                  </Button>
                </div>
                <Table striped bordered hover size="sm" responsive>
                  <thead>
                    <tr>
                      {Object.keys(table_data[0]).map((key, idx) => (
                        <th key={idx}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table_data.slice(0, 20).map((row, idx) => (
                      <tr key={idx}>
                        {Object.values(row).map((val, i) => (
                          <td key={i}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {table_data.length > 20 && (
                  <small className="text-muted">
                    Showing 20 of {table_data.length} rows
                  </small>
                )}
              </div>
            </Tab>
          )}
        </Tabs>
      )}
    </div>
  );
}

export default AnalysisResult;
