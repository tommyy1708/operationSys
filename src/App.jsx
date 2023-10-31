import React, { useState } from 'react';
const App = () => {
  const [available, setAvailable] = useState([3, 3, 2]);
  const [sequence, setSequence] = useState([]);
  const [showResult, setShowResult] = useState('none');
  const [showAddition, setShowAddition] = useState('none');
  let tSet = [
    {
      id: 1,
      thread_number: 0,
      need: [7, 4, 3],
      allocation: [0, 1, 0],
      max: [7, 5, 3],
      tf: null,
    },
    {
      id: 2,
      thread_number: 1,
      need: [1, 2, 2],
      allocation: [2, 0, 0],
      max: [3, 2, 2],
      tf: null,
    },
    {
      id: 3,
      thread_number: 2,
      need: [6, 0, 0],
      allocation: [3, 0, 2],
      max: [9, 0, 2],
      tf: null,
    },
    {
      id: 4,
      thread_number: 3,
      need: [0, 1, 1],
      allocation: [2, 1, 1],
      max: [2, 2, 2],
      tf: null,
    },
    {
      id: 5,
      thread_number: 4,
      need: [4, 3, 1],
      allocation: [0, 0, 2],
      max: [4, 3, 3],
      tf: null,
    },
  ];

  function handleCalculate(
    tnumber,
    allocation,
    need,
    max,
    available,
    tf
  ) {
    let newAvailable = [];
    let singleAvailable = '';
    for (let i = 0; i < need.length; i++) {
      if (need[i] <= available[i]) {
        singleAvailable = available[i] + allocation[i];
        newAvailable[i] = singleAvailable;
      } else {
        tf = false;
        alert('This thread not satisfied');
        return;
      }
    }
    if (newAvailable.length === need.length) {
      setAvailable(newAvailable);
      setSequence([...sequence, tnumber]);
    }
    if (sequence.length === tSet.length - 1) {
      setTimeout(() => {
        alert('Congratulation!!! You got Offer From Google.');
      }, 1500);
    }

    return;
  }

  return (
    <div>
      <h2>Banker's Algorithm</h2>
      <p>A resource allocation and deadlock avoidance algorithm.</p>
      <table id="myTable">
        <thead>
          <tr>
            <th>Threads</th>
            <th>Allocation</th>
            <th>Need</th>
            <th>Checking</th>
            <th>Max</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th></th>
            <th>A B C</th>
            <th>A B C</th>
            <th></th>
            <th>A B C</th>
          </tr>
          <tr>
            <th>T0</th>
            <th>(0, 1, 0)</th>
            <th>(7, 4, 3)</th>
            <th>
              <button
                onClick={() =>
                  handleCalculate(
                    tSet[0].thread_number,
                    tSet[0].allocation,
                    tSet[0].need,
                    tSet[0].max,
                    available,
                    tSet[0].tf
                  )
                }
              >
                check
              </button>
            </th>
            <th>(7, 5, 3)</th>
          </tr>
          <tr>
            <th>T1</th>
            <th>(2, 0, 0)</th>
            <th>(1, 2, 2)</th>
            <th>
              <button
                onClick={() =>
                  handleCalculate(
                    tSet[1].thread_number,
                    tSet[1].allocation,
                    tSet[1].need,
                    tSet[1].max,
                    available
                  )
                }
              >
                check
              </button>
            </th>
            <th>(3, 2, 2)</th>
          </tr>
          <tr>
            <th>T2</th>
            <th>(3, 0, 2)</th>
            <th>(6, 0, 0)</th>
            <th>
              <button
                onClick={() =>
                  handleCalculate(
                    tSet[2].thread_number,
                    tSet[2].allocation,
                    tSet[2].need,
                    tSet[2].max,
                    available
                  )
                }
              >
                check
              </button>
            </th>
            <th>(9, 0, 2)</th>
          </tr>
          <tr>
            <th>T3</th>
            <th>(2, 1, 1)</th>
            <th>(0, 1, 1)</th>
            <th>
              <button
                onClick={() =>
                  handleCalculate(
                    tSet[3].thread_number,
                    tSet[3].allocation,
                    tSet[3].need,
                    tSet[3].max,
                    available
                  )
                }
              >
                check
              </button>
            </th>
            <th>(2, 2, 2)</th>
          </tr>
          <tr>
            <th>T4</th>
            <th>(0, 0, 2)</th>
            <th>(4, 3, 1)</th>
            <th>
              <button
                onClick={() =>
                  handleCalculate(
                    tSet[4].thread_number,
                    tSet[4].allocation,
                    tSet[4].need,
                    tSet[4].max,
                    available
                  )
                }
              >
                check
              </button>
            </th>
            <th>(4, 3, 3)</th>
          </tr>
        </tbody>
      </table>
      <p> Need = Max - Allocated</p>
      <p>
        Available Resources = ( {available[0]}, {available[1]},{' '}
        {available[2]} )
      </p>
      <p>Safe Sequence =&#123;{sequence.join(',')}&#125;</p>
      <div
        className="resultOfSequence"
        style={{
          border: '1px solid red',
          padding: '10px',
          display: `${showResult}`,
        }}
      >
        <p>All possible safe sequence below:</p>
        <p>Safe Sequence 1: T3 -> T1 -> T4 -> T2 -> T0</p>
        <p>Safe Sequence 2: T1 -> T3 -> T4 -> T2 -> T0</p>
      </div>
      <button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reset
      </button>
      <button onClick={() => setShowResult('block')}>
        Show Answer
      </button>
      <button onClick={() => setShowAddition('block')}>
        Addition for request
      </button>
      <div
        className="addition"
        style={{
          border: '1px solid red',
          padding: '10px',
          display: `${showAddition}`,
        }}
      >
        Request T1 = (1, 0, 2);
        <p>
          Step 1 Checking Request(1, 0, 2) Small than T1 Need(1, 2, 2)
          ?
        </p>
        <p>
          Step 2 Checking Request(1, 0, 2) Small than Available(3, 3,
          2) ?
        </p>
        <p>
          Step 3
          <br /> Update T1 Allocation = Allocation + Request goes
          to(3, 0, 2),
          <br /> Update T1 Need = Need - Request goes to(0, 2, 0),
          <br /> Update Available = Available - Request goes to(2, 3,
          0)
        </p>
      </div>
    </div>
  );
};

export default App;
